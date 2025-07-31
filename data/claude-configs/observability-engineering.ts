export default {
  id: 'observability-engineering',
  title: 'Observability Engineering Masters',
  description: 'Comprehensive observability engineering configuration for production-scale monitoring, logging, tracing, and performance analysis with enterprise-grade tooling.',
  category: 'Claude.md Configurations',
  tags: ['observability', 'monitoring', 'logging', 'tracing', 'metrics', 'sli-slo', 'apm', 'prometheus', 'grafana', 'opentelemetry', 'elk-stack', 'enterprise'],
  difficulty: 'ADVANCED',
  estimatedTime: '2-4 hours setup',
  type: 'claude.md',
  author: {
    name: 'Claude Code Directory',
    url: 'https://claudecode.directory'
  },
  lastUpdated: '2024-01-31',
  content: `# Observability Engineering Masters

Master-level observability engineering configuration for building comprehensive monitoring, logging, and tracing infrastructure. This configuration covers enterprise-scale observability patterns, SLI/SLO management, and production incident response.

## Prerequisites

- Production Kubernetes cluster or cloud infrastructure
- Understanding of distributed systems architecture
- Experience with monitoring and alerting concepts
- Knowledge of SRE principles and practices

## Core Observability Stack

### Metrics and Monitoring Infrastructure

\`\`\`yaml
# prometheus-stack.yaml - Complete Prometheus monitoring setup
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
      external_labels:
        cluster: 'production'
        region: 'us-west-2'
    
    rule_files:
      - "/etc/prometheus/rules/*.yml"
    
    alerting:
      alertmanagers:
        - static_configs:
            - targets:
              - alertmanager:9093
    
    scrape_configs:
      # Kubernetes API server
      - job_name: 'kubernetes-apiservers'
        kubernetes_sd_configs:
        - role: endpoints
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        relabel_configs:
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: default;kubernetes;https
      
      # Node exporter for system metrics
      - job_name: 'kubernetes-nodes'
        kubernetes_sd_configs:
        - role: node
        relabel_configs:
        - action: labelmap
          regex: __meta_kubernetes_node_label_(.+)
        - target_label: __address__
          replacement: kubernetes.default.svc:443
        - source_labels: [__meta_kubernetes_node_name]
          regex: (.+)
          target_label: __metrics_path__
          replacement: /api/v1/nodes/\${1}/proxy/metrics
      
      # Application metrics
      - job_name: 'application-metrics'
        kubernetes_sd_configs:
        - role: pod
        relabel_configs:
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
          action: replace
          regex: ([^:]+)(?::\d+)?;(\d+)
          replacement: \$1:\$2
          target_label: __address__
        - action: labelmap
          regex: __meta_kubernetes_pod_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_pod_name]
          action: replace
          target_label: kubernetes_pod_name
---
# Advanced recording rules for SLI calculations
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-rules
  namespace: monitoring
data:
  sli-rules.yml: |
    groups:
    - name: sli.rules
      interval: 30s
      rules:
      # HTTP request rate by service
      - record: http_requests:rate5m
        expr: |
          sum(rate(http_requests_total[5m])) by (service, method, status)
      
      # Error rate SLI
      - record: http_requests:error_rate5m
        expr: |
          (
            sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)
            /
            sum(rate(http_requests_total[5m])) by (service)
          ) * 100
      
      # Latency SLI (95th percentile)
      - record: http_request_duration:p95_5m
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket[5m])) by (service, le)
          )
      
      # Availability SLI
      - record: service:availability_5m
        expr: |
          (
            sum(up) by (service, instance)
            /
            count(up) by (service, instance)
          ) * 100
      
      # Database connection pool utilization
      - record: db_connections:utilization_rate5m
        expr: |
          (
            sum(db_connections_active) by (service, database)
            /
            sum(db_connections_max) by (service, database)
          ) * 100
\`\`\`

### Distributed Tracing with OpenTelemetry

\`\`\`typescript
// tracing-config.ts - OpenTelemetry configuration
import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { BatchSpanProcessor, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';

class ObservabilityService {
  private sdk: NodeSDK;
  
  constructor() {
    this.initializeSDK();
  }
  
  private initializeSDK(): void {
    // Resource identification
    const resource = new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME || 'unknown-service',
      [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION || '1.0.0',
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
      [SemanticResourceAttributes.SERVICE_NAMESPACE]: process.env.SERVICE_NAMESPACE || 'default',
    });

    // Tracing exporters
    const jaegerExporter = new JaegerExporter({
      endpoint: process.env.JAEGER_ENDPOINT || 'http://jaeger:14268/api/traces',
    });

    const otlpExporter = new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://otel-collector:4318/v1/traces',
      headers: {
        'Authorization': \`Bearer \${process.env.OTEL_AUTH_TOKEN}\`,
      },
    });

    // Metrics exporter
    const prometheusExporter = new PrometheusExporter({
      port: parseInt(process.env.METRICS_PORT || '9464'),
      endpoint: '/metrics',
    });

    this.sdk = new NodeSDK({
      resource,
      traceExporter: process.env.NODE_ENV === 'production' ? otlpExporter : jaegerExporter,
      metricReader: new PeriodicExportingMetricReader({
        exporter: prometheusExporter,
        exportIntervalMillis: 30000,
      }),
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-fs': {
            enabled: false, // Disable file system instrumentation for performance
          },
          '@opentelemetry/instrumentation-http': {
            enabled: true,
            requestHook: (span, request) => {
              span.setAttributes({
                'http.request.header.user-agent': request.headers['user-agent'],
                'http.request.header.x-forwarded-for': request.headers['x-forwarded-for'],
              });
            },
            responseHook: (span, response) => {
              span.setAttributes({
                'http.response.size': response.headers['content-length'],
              });
            },
          },
          '@opentelemetry/instrumentation-express': {
            enabled: true,
          },
          '@opentelemetry/instrumentation-pg': {
            enabled: true,
            enhancedDatabaseReporting: true,
          },
          '@opentelemetry/instrumentation-redis': {
            enabled: true,
            dbStatementSerializer: (cmdName, cmdArgs) => {
              return \`\${cmdName} \${cmdArgs.slice(0, 1).join(' ')}\`; // Only log command and first arg
            },
          },
        }),
      ],
    });
  }

  public start(): void {
    this.sdk.start();
    console.log('OpenTelemetry started successfully');
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      this.sdk.shutdown()
        .then(() => console.log('OpenTelemetry terminated'))
        .catch((error) => console.log('Error terminating OpenTelemetry', error))
        .finally(() => process.exit(0));
    });
  }

  // Custom span creation helper
  public createSpan(name: string, attributes?: Record<string, string | number | boolean>) {
    const tracer = trace.getTracer(process.env.SERVICE_NAME || 'default');
    return tracer.startSpan(name, {
      attributes: {
        'service.operation': name,
        ...attributes,
      },
    });
  }
}

export const observability = new ObservabilityService();

// Application startup
if (require.main === module) {
  observability.start();
}
\`\`\`

### Advanced Logging with Structured JSON

\`\`\`typescript
// logging-service.ts - Enterprise logging configuration
import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { AsyncLocalStorage } from 'async_hooks';

interface LogContext {
  traceId?: string;
  spanId?: string;
  userId?: string;
  requestId?: string;
  operation?: string;
}

class LoggingService {
  private logger: winston.Logger;
  private contextStorage = new AsyncLocalStorage<LogContext>();

  constructor() {
    this.initializeLogger();
  }

  private initializeLogger(): void {
    const logFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
      winston.format.printf((info) => {
        const context = this.contextStorage.getStore() || {};
        return JSON.stringify({
          timestamp: info.timestamp,
          level: info.level,
          message: info.message,
          service: process.env.SERVICE_NAME,
          version: process.env.SERVICE_VERSION,
          environment: process.env.NODE_ENV,
          traceId: context.traceId,
          spanId: context.spanId,
          userId: context.userId,
          requestId: context.requestId,
          operation: context.operation,
          ...info.meta,
          ...(info.stack && { stack: info.stack }),
        });
      })
    );

    const transports: winston.transport[] = [
      new winston.transports.Console({
        level: process.env.LOG_LEVEL || 'info',
      }),
    ];

    // Production: Add Elasticsearch transport
    if (process.env.NODE_ENV === 'production' && process.env.ELASTICSEARCH_URL) {
      transports.push(
        new ElasticsearchTransport({
          level: 'info',
          clientOpts: {
            node: process.env.ELASTICSEARCH_URL,
            auth: {
              username: process.env.ELASTICSEARCH_USERNAME!,
              password: process.env.ELASTICSEARCH_PASSWORD!,
            },
          },
          index: \`logs-\${process.env.SERVICE_NAME}-\${new Date().toISOString().slice(0, 7)}\`,
          indexTemplate: {
            name: 'application-logs',
            patterns: ['logs-*'],
            settings: {
              number_of_shards: 1,
              number_of_replicas: 1,
              'index.refresh_interval': '5s',
            },
            mappings: {
              properties: {
                '@timestamp': { type: 'date' },
                level: { type: 'keyword' },
                message: { type: 'text' },
                service: { type: 'keyword' },
                version: { type: 'keyword' },
                environment: { type: 'keyword' },
                traceId: { type: 'keyword' },
                spanId: { type: 'keyword' },
                userId: { type: 'keyword' },
                requestId: { type: 'keyword' },
                operation: { type: 'keyword' },
              },
            },
          },
        })
      );
    }

    this.logger = winston.createLogger({
      format: logFormat,
      transports,
      defaultMeta: {
        service: process.env.SERVICE_NAME,
        version: process.env.SERVICE_VERSION,
      },
    });
  }

  public withContext<T>(context: LogContext, fn: () => T): T {
    return this.contextStorage.run(context, fn);
  }

  public info(message: string, meta?: any): void {
    this.logger.info(message, { meta });
  }

  public error(message: string, error?: Error, meta?: any): void {
    this.logger.error(message, { 
      meta,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    });
  }

  public warn(message: string, meta?: any): void {
    this.logger.warn(message, { meta });
  }

  public debug(message: string, meta?: any): void {
    this.logger.debug(message, { meta });
  }

  // Performance logging helper
  public async measureAsync<T>(
    operation: string,
    fn: () => Promise<T>,
    meta?: any
  ): Promise<T> {
    const start = Date.now();
    const context = this.contextStorage.getStore();
    
    try {
      this.info(\`Starting operation: \${operation}\`, { 
        operation,
        ...meta,
      });
      
      const result = await fn();
      const duration = Date.now() - start;
      
      this.info(\`Completed operation: \${operation}\`, {
        operation,
        duration,
        success: true,
        ...meta,
      });
      
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      
      this.error(\`Failed operation: \${operation}\`, error as Error, {
        operation,
        duration,
        success: false,
        ...meta,
      });
      
      throw error;
    }
  }
}

export const logger = new LoggingService();
\`\`\`

## SLI/SLO Management

### Service Level Objectives Configuration

\`\`\`yaml
# slo-config.yaml - Service Level Objectives definition
apiVersion: v1
kind: ConfigMap
metadata:
  name: slo-definitions
  namespace: monitoring
data:
  api-service-slos.yml: |
    slos:
      - name: "API Availability"
        service: "api-service"
        description: "API should be available 99.9% of the time"
        sli:
          type: "availability"
          query: 'avg_over_time(up{job="api-service"}[5m])'
        slo:
          target: 0.999
          window: "30d"
        alerting:
          burn_rate_alerts:
            - window: "1h"
              threshold: 14.4  # 2% error budget burn in 1h
              severity: "critical"
            - window: "6h" 
              threshold: 6     # 5% error budget burn in 6h
              severity: "warning"
      
      - name: "API Latency"
        service: "api-service"
        description: "95% of API requests should complete within 200ms"
        sli:
          type: "latency"
          query: 'histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job="api-service"}[5m])) by (le))'
        slo:
          target: 0.2  # 200ms
          window: "30d"
        alerting:
          threshold_alerts:
            - threshold: 0.5   # 500ms
              duration: "5m"
              severity: "warning"
            - threshold: 1.0   # 1s
              duration: "2m"
              severity: "critical"
      
      - name: "API Error Rate"
        service: "api-service"
        description: "Error rate should be below 0.1%"
        sli:
          type: "error_rate"
          query: |
            (
              sum(rate(http_requests_total{job="api-service",status=~"5.."}[5m]))
              /
              sum(rate(http_requests_total{job="api-service"}[5m]))
            ) * 100
        slo:
          target: 0.1  # 0.1% error rate
          window: "30d"
        alerting:
          threshold_alerts:
            - threshold: 1.0   # 1% error rate
              duration: "5m"
              severity: "warning"
            - threshold: 5.0   # 5% error rate
              duration: "1m"
              severity: "critical"
\`\`\`

### Grafana Dashboard as Code

\`\`\`json
{
  "dashboard": {
    "id": null,
    "title": "Production Service Overview",
    "tags": ["production", "sli", "slo"],
    "timezone": "utc",
    "panels": [
      {
        "id": 1,
        "title": "Service Level Indicators",
        "type": "stat",
        "targets": [
          {
            "expr": "avg(service:availability_5m)",
            "legendFormat": "Availability"
          },
          {
            "expr": "avg(http_request_duration:p95_5m) * 1000",
            "legendFormat": "P95 Latency (ms)"
          },
          {
            "expr": "avg(http_requests:error_rate5m)",
            "legendFormat": "Error Rate (%)"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "thresholds": {
              "steps": [
                {"color": "red", "value": 0},
                {"color": "yellow", "value": 95},
                {"color": "green", "value": 99}
              ]
            }
          }
        }
      },
      {
        "id": 2,
        "title": "Request Rate by Service",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total[5m])) by (service)",
            "legendFormat": "{{service}}"
          }
        ]
      },
      {
        "id": 3,
        "title": "Error Budget Burn Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "1 - (sum(rate(http_requests_total{status!~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])))",
            "legendFormat": "Current Burn Rate"
          }
        ],
        "alert": {
          "conditions": [
            {
              "query": {"params": ["A", "5m", "now"]},
              "reducer": {"params": [], "type": "last"},
              "evaluator": {"params": [0.001], "type": "gt"}
            }
          ],
          "executionErrorState": "alerting",
          "for": "5m",
          "frequency": "10s",
          "handler": 1,
          "name": "Error Budget Alert",
          "noDataState": "no_data"
        }
      }
    ],
    "time": {
      "from": "now-1h",
      "to": "now"
    },
    "refresh": "5s"
  }
}
\`\`\`

## Application Performance Monitoring

### Custom APM Implementation

\`\`\`typescript
// apm-service.ts - Application Performance Monitoring
import { trace, context, SpanStatusCode, SpanKind } from '@opentelemetry/api';
import { performance } from 'perf_hooks';

interface PerformanceMetrics {
  duration: number;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
  timestamp: number;
}

interface BusinessMetrics {
  userId?: string;
  operation: string;
  feature: string;
  success: boolean;
  value?: number;
}

class APMService {
  private metrics: Map<string, PerformanceMetrics[]> = new Map();
  private businessMetrics: BusinessMetrics[] = [];
  
  // Performance monitoring decorator
  public monitor<T extends (...args: any[]) => any>(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> | void {
    const method = descriptor.value!;
    
    descriptor.value = async function (...args: any[]) {
      const tracer = trace.getTracer('apm-service');
      const operationName = \`\${target.constructor.name}.\${propertyName}\`;
      
      return tracer.startActiveSpan(operationName, async (span) => {
        const startTime = performance.now();
        const startCpu = process.cpuUsage();
        const startMemory = process.memoryUsage();
        
        try {
          span.setAttributes({
            'operation.name': operationName,
            'operation.args.count': args.length,
          });
          
          const result = await method.apply(this, args);
          
          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error) {
          span.recordException(error as Error);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: (error as Error).message,
          });
          throw error;
        } finally {
          const endTime = performance.now();
          const endCpu = process.cpuUsage(startCpu);
          const endMemory = process.memoryUsage();
          
          const metrics: PerformanceMetrics = {
            duration: endTime - startTime,
            memoryUsage: {
              rss: endMemory.rss - startMemory.rss,
              heapTotal: endMemory.heapTotal - startMemory.heapTotal,
              heapUsed: endMemory.heapUsed - startMemory.heapUsed,
              external: endMemory.external - startMemory.external,
              arrayBuffers: endMemory.arrayBuffers - startMemory.arrayBuffers,
            },
            cpuUsage: endCpu,
            timestamp: Date.now(),
          };
          
          this.recordMetrics(operationName, metrics);
          
          span.setAttributes({
            'performance.duration_ms': metrics.duration,
            'performance.memory.heap_used_mb': metrics.memoryUsage.heapUsed / 1024 / 1024,
            'performance.cpu.user_ms': metrics.cpuUsage.user / 1000,
            'performance.cpu.system_ms': metrics.cpuUsage.system / 1000,
          });
          
          span.end();
        }
      });
    } as T;
    
    return descriptor;
  }
  
  private recordMetrics(operation: string, metrics: PerformanceMetrics): void {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }
    
    const operationMetrics = this.metrics.get(operation)!;
    operationMetrics.push(metrics);
    
    // Keep only last 1000 metrics per operation
    if (operationMetrics.length > 1000) {
      operationMetrics.shift();
    }
  }
  
  public recordBusinessMetric(metric: BusinessMetrics): void {
    this.businessMetrics.push(metric);
    
    // Emit custom metric
    const tracer = trace.getTracer('business-metrics');
    tracer.startSpan('business.operation', {
      kind: SpanKind.INTERNAL,
      attributes: {
        'business.operation': metric.operation,
        'business.feature': metric.feature,
        'business.success': metric.success,
        'business.user_id': metric.userId,
        'business.value': metric.value,
      },
    }).end();
  }
  
  // Performance analysis
  public getPerformanceAnalysis(operation: string): any {
    const metrics = this.metrics.get(operation);
    if (!metrics || metrics.length === 0) return null;
    
    const durations = metrics.map(m => m.duration);
    const memoryUsages = metrics.map(m => m.memoryUsage.heapUsed);
    
    return {
      operation,
      sampleCount: metrics.length,
      duration: {
        min: Math.min(...durations),
        max: Math.max(...durations),
        avg: durations.reduce((a, b) => a + b, 0) / durations.length,
        p95: this.percentile(durations, 0.95),
        p99: this.percentile(durations, 0.99),
      },
      memory: {
        min: Math.min(...memoryUsages),
        max: Math.max(...memoryUsages),
        avg: memoryUsages.reduce((a, b) => a + b, 0) / memoryUsages.length,
      },
      lastUpdated: Math.max(...metrics.map(m => m.timestamp)),
    };
  }
  
  private percentile(arr: number[], p: number): number {
    const sorted = arr.slice().sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * p) - 1;
    return sorted[index];
  }
}

export const apm = new APMService();

// Usage example
class UserService {
  @apm.monitor
  async createUser(userData: any): Promise<any> {
    // Simulate user creation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    apm.recordBusinessMetric({
      operation: 'user_creation',
      feature: 'registration',
      success: true,
      userId: userData.id,
    });
    
    return userData;
  }
}
\`\`\`

## Alerting and Incident Response

### AlertManager Configuration

\`\`\`yaml
# alertmanager.yml - Advanced alerting configuration
global:
  smtp_smarthost: 'localhost:587'
  smtp_from: 'alerts@company.com'
  slack_api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'
  routes:
  - match:
      severity: critical
    receiver: 'critical-alerts'
    group_wait: 5s
    repeat_interval: 5m
  - match:
      severity: warning
    receiver: 'warning-alerts'
    repeat_interval: 30m

receivers:
- name: 'web.hook'
  webhook_configs:
  - url: 'http://incident-manager:8080/webhook'
    send_resolved: true

- name: 'critical-alerts'
  slack_configs:
  - channel: '#critical-alerts'
    title: 'Critical Alert - {{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'
    text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
    actions:
    - type: button
      text: 'Runbook'
      url: '{{ (index .Alerts 0).Annotations.runbook_url }}'
    - type: button
      text: 'Dashboard'
      url: '{{ (index .Alerts 0).Annotations.dashboard_url }}'
  pagerduty_configs:
  - routing_key: 'YOUR_PAGERDUTY_INTEGRATION_KEY'
    description: 'Critical alert: {{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'

- name: 'warning-alerts'
  slack_configs:
  - channel: '#alerts'
    title: 'Warning - {{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'
    text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'

inhibit_rules:
- source_match:
    severity: 'critical'
  target_match:
    severity: 'warning'
  equal: ['alertname', 'cluster', 'service']
\`\`\`

### Incident Response Automation

\`\`\`typescript
// incident-manager.ts - Automated incident response
import { WebhookEvent, IncidentSeverity, IncidentStatus } from './types';

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  service: string;
  createdAt: Date;
  resolvedAt?: Date;
  assignee?: string;
  runbook?: string;
  postmortem?: string;
}

interface Runbook {
  service: string;
  alertname: string;
  steps: RunbookStep[];
  automationLevel: 'manual' | 'semi-auto' | 'full-auto';
}

interface RunbookStep {
  description: string;
  action?: string;
  automated: boolean;
}

class IncidentManager {
  private incidents = new Map<string, Incident>();
  private runbooks = new Map<string, Runbook>();
  
  constructor() {
    this.loadRunbooks();
  }
  
  private loadRunbooks(): void {
    // Load runbooks from configuration
    const runbooks: Runbook[] = [
      {
        service: 'api-service',
        alertname: 'HighErrorRate',
        automationLevel: 'semi-auto',
        steps: [
          {
            description: 'Check recent deployments',
            action: 'kubectl rollout history deployment/api-service',
            automated: true,
          },
          {
            description: 'Scale up replicas temporarily',
            action: 'kubectl scale deployment/api-service --replicas=10',
            automated: false,
          },
          {
            description: 'Check database connection pool',
            automated: false,
          },
          {
            description: 'Review recent code changes',
            automated: false,
          },
        ],
      },
      {
        service: 'database',
        alertname: 'DatabaseConnectionsFull',
        automationLevel: 'full-auto',
        steps: [
          {
            description: 'Increase connection pool size',
            action: 'kubectl patch configmap db-config --patch=\'{"data":{"max-connections":"200"}}\' && kubectl rollout restart deployment/api-service',
            automated: true,
          },
          {
            description: 'Kill long-running queries',
            action: 'psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = \'active\' AND query_start < NOW() - INTERVAL \'5 minutes\'"',
            automated: true,
          },
        ],
      },
    ];
    
    runbooks.forEach(runbook => {
      this.runbooks.set(\`\${runbook.service}:\${runbook.alertname}\`, runbook);
    });
  }
  
  public async handleAlert(webhook: WebhookEvent): Promise<void> {
    for (const alert of webhook.alerts) {
      if (alert.status === 'firing') {
        await this.createIncident(alert);
      } else if (alert.status === 'resolved') {
        await this.resolveIncident(alert);
      }
    }
  }
  
  private async createIncident(alert: any): Promise<void> {
    const incidentId = \`\${alert.labels.service}-\${Date.now()}\`;
    const severity = this.determineSeverity(alert);
    
    const incident: Incident = {
      id: incidentId,
      title: alert.annotations.summary || alert.labels.alertname,
      description: alert.annotations.description || 'No description provided',
      severity,
      status: 'open',
      service: alert.labels.service,
      createdAt: new Date(),
      runbook: alert.annotations.runbook_url,
    };
    
    this.incidents.set(incidentId, incident);
    
    // Notify stakeholders
    await this.notifyStakeholders(incident);
    
    // Execute automated runbook steps
    await this.executeRunbook(incident, alert);
    
    console.log(\`Incident created: \${incidentId}\`);
  }
  
  private async executeRunbook(incident: Incident, alert: any): Promise<void> {
    const runbookKey = \`\${alert.labels.service}:\${alert.labels.alertname}\`;
    const runbook = this.runbooks.get(runbookKey);
    
    if (!runbook) {
      console.log(\`No runbook found for \${runbookKey}\`);
      return;
    }
    
    console.log(\`Executing runbook for incident \${incident.id}\`);
    
    for (const step of runbook.steps) {
      if (step.automated && step.action) {
        try {
          if (runbook.automationLevel === 'full-auto' || 
              (runbook.automationLevel === 'semi-auto' && incident.severity === 'critical')) {
            console.log(\`Executing automated step: \${step.description}\`);
            // Execute the command (in real implementation, use proper command execution)
            // await exec(step.action);
            console.log(\`Command would execute: \${step.action}\`);
          } else {
            console.log(\`Manual step required: \${step.description}\`);
            console.log(\`Command: \${step.action}\`);
          }
        } catch (error) {
          console.error(\`Failed to execute step: \${step.description}\`, error);
        }
      }
    }
  }
  
  private determineSeverity(alert: any): IncidentSeverity {
    if (alert.labels.severity === 'critical') return 'critical';
    if (alert.labels.severity === 'warning') return 'warning';
    return 'info';
  }
  
  private async notifyStakeholders(incident: Incident): Promise<void> {
    // Implementation would send notifications via Slack, email, PagerDuty, etc.
    console.log(\`Notifying stakeholders about incident: \${incident.id}\`);
  }
  
  private async resolveIncident(alert: any): Promise<void> {
    // Find and resolve matching incidents
    for (const [id, incident] of this.incidents) {
      if (incident.service === alert.labels.service && 
          incident.status === 'open' &&
          incident.title.includes(alert.labels.alertname)) {
        incident.status = 'resolved';
        incident.resolvedAt = new Date();
        console.log(\`Incident resolved: \${id}\`);
        
        // Schedule postmortem if critical
        if (incident.severity === 'critical') {
          await this.schedulePostmortem(incident);
        }
      }
    }
  }
  
  private async schedulePostmortem(incident: Incident): Promise<void> {
    console.log(\`Scheduling postmortem for critical incident: \${incident.id}\`);
    // Implementation would create calendar events, assign reviewers, etc.
  }
}

export const incidentManager = new IncidentManager();
\`\`\`

## Cost Monitoring and Optimization

### Cloud Cost Tracking

\`\`\`typescript
// cost-monitor.ts - Cloud resource cost monitoring
interface CostMetric {
  service: string;
  resource: string;
  cost: number;
  currency: string;
  period: string;
  tags: Record<string, string>;
  timestamp: Date;
}

interface CostAlert {
  budget: number;
  current: number;
  threshold: number;
  service: string;
  period: string;
}

class CostMonitor {
  private costHistory: CostMetric[] = [];
  private budgets = new Map<string, number>();
  
  constructor() {
    this.initializeBudgets();
    this.startCostCollection();
  }
  
  private initializeBudgets(): void {
    // Set monthly budgets per service
    this.budgets.set('api-service', 1000);
    this.budgets.set('database', 500);
    this.budgets.set('monitoring', 200);
    this.budgets.set('storage', 300);
  }
  
  private async startCostCollection(): void {
    // Collect cost data every hour
    setInterval(async () => {
      await this.collectCostMetrics();
    }, 60 * 60 * 1000);
  }
  
  private async collectCostMetrics(): Promise<void> {
    try {
      // In real implementation, fetch from AWS Cost Explorer, Azure Cost Management, etc.
      const costs = await this.fetchCloudCosts();
      
      costs.forEach(cost => {
        this.costHistory.push(cost);
        this.checkBudgetAlerts(cost);
      });
      
      // Emit cost metrics to Prometheus
      this.emitCostMetrics(costs);
      
      // Clean old data (keep 90 days)
      this.cleanOldCostData();
    } catch (error) {
      console.error('Failed to collect cost metrics:', error);
    }
  }
  
  private async fetchCloudCosts(): Promise<CostMetric[]> {
    // Mock implementation - replace with actual cloud provider APIs
    return [
      {
        service: 'api-service',
        resource: 'EC2 instances',
        cost: 250.50,
        currency: 'USD',
        period: 'daily',
        tags: { environment: 'production', team: 'backend' },
        timestamp: new Date(),
      },
      {
        service: 'database',
        resource: 'RDS PostgreSQL',
        cost: 45.30,
        currency: 'USD',
        period: 'daily',
        tags: { environment: 'production', team: 'platform' },
        timestamp: new Date(),
      },
    ];
  }
  
  private checkBudgetAlerts(cost: CostMetric): void {
    const budget = this.budgets.get(cost.service);
    if (!budget) return;
    
    // Check monthly spend
    const monthlySpend = this.getMonthlySpend(cost.service);
    const budgetUsage = (monthlySpend / budget) * 100;
    
    if (budgetUsage > 80) {
      this.sendCostAlert({
        budget,
        current: monthlySpend,
        threshold: 80,
        service: cost.service,
        period: 'monthly',
      });
    }
  }
  
  private getMonthlySpend(service: string): number {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    return this.costHistory
      .filter(cost => 
        cost.service === service && 
        cost.timestamp >= startOfMonth
      )
      .reduce((total, cost) => total + cost.cost, 0);
  }
  
  private sendCostAlert(alert: CostAlert): void {
    console.log(\`Cost Alert: \${alert.service} has exceeded \${alert.threshold}% of budget\`);
    console.log(\`Current: $\${alert.current.toFixed(2)}, Budget: $\${alert.budget}\`);
    
    // In real implementation, send to Slack, email, etc.
  }
  
  private emitCostMetrics(costs: CostMetric[]): void {
    // Emit metrics to Prometheus
    costs.forEach(cost => {
      console.log(\`# HELP cloud_cost_dollars Cloud resource cost in dollars\`);
      console.log(\`# TYPE cloud_cost_dollars gauge\`);
      console.log(\`cloud_cost_dollars{service="\${cost.service}",resource="\${cost.resource}"} \${cost.cost}\`);
    });
  }
  
  private cleanOldCostData(): void {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    
    this.costHistory = this.costHistory.filter(cost => cost.timestamp >= cutoff);
  }
  
  // Cost optimization recommendations
  public getCostOptimizationRecommendations(service: string): string[] {
    const recommendations: string[] = [];
    const monthlySpend = this.getMonthlySpend(service);
    const budget = this.budgets.get(service) || 0;
    
    if (monthlySpend > budget * 0.8) {
      recommendations.push('Consider rightsizing instances based on utilization metrics');
      recommendations.push('Review and optimize storage usage');
      recommendations.push('Evaluate reserved instance opportunities');
    }
    
    return recommendations;
  }
}

export const costMonitor = new CostMonitor();
\`\`\`

## Usage Instructions

1. **Setup Monitoring Stack**:
   \`\`\`bash
   # Deploy Prometheus and Grafana
   kubectl apply -f prometheus-stack.yaml
   
   # Apply SLO configuration
   kubectl apply -f slo-config.yaml
   \`\`\`

2. **Initialize Application Observability**:
   \`\`\`typescript
   import { observability } from './tracing-config';
   import { logger } from './logging-service';
   import { apm } from './apm-service';
   
   // Start OpenTelemetry
   observability.start();
   
   // Use structured logging
   logger.info('Application started', { version: '1.2.0' });
   
   // Monitor performance
   class MyService {
     @apm.monitor
     async criticalOperation() {
       // Your code here
     }
   }
   \`\`\`

3. **Configure Alerting**:
   \`\`\`bash
   # Deploy AlertManager configuration
   kubectl create configmap alertmanager-config --from-file=alertmanager.yml
   \`\`\`

4. **Monitor Costs**:
   \`\`\`typescript
   import { costMonitor } from './cost-monitor';
   
   // Get cost optimization recommendations
   const recommendations = costMonitor.getCostOptimizationRecommendations('api-service');
   console.log(recommendations);
   \`\`\`

## Advanced Features

- **Multi-cluster observability** with federation
- **Custom SLI/SLO dashboards** with error budget tracking
- **Automated incident response** with runbook execution
- **Cost monitoring and optimization** recommendations
- **Distributed tracing** across microservices
- **Advanced alerting** with smart grouping and escalation
- **Performance profiling** with APM integration
- **Compliance monitoring** for security and regulatory requirements

This configuration provides enterprise-grade observability with comprehensive monitoring, logging, tracing, and incident response capabilities.
`
};