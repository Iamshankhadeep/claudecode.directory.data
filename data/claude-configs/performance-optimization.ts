import { ClaudeMdConfig } from '../types';

export const performanceOptimizationConfigs: ClaudeMdConfig[] = [
  {
    id: 'performance-engineering',
    title: 'Performance Engineering + Profiling',
    slug: 'performance-engineering-profiling-optimization',
    description: 'Comprehensive performance engineering setup with profiling, monitoring, optimization techniques, and performance testing across the full stack.',
    category: 'Claude.md Configurations',
    tags: ['performance', 'profiling', 'optimization', 'monitoring', 'benchmarking'],
    difficulty: 'ADVANCED',
    language: 'Multiple',
    framework: 'Cross-Platform Performance',
    content: `# Claude.md - Performance Engineering + Profiling

## Project Overview

This is a comprehensive performance engineering setup covering profiling, monitoring, optimization techniques, and performance testing across frontend, backend, database, and infrastructure layers. Focus on measurable performance improvements and systematic optimization approaches.

## Performance Philosophy

### Performance Engineering Principles
1. **Measure First**: Always profile before optimizing
2. **Data-Driven Decisions**: Use metrics to guide optimization efforts
3. **Systematic Approach**: Follow a methodical performance improvement process
4. **Continuous Monitoring**: Implement ongoing performance tracking
5. **User-Centric Metrics**: Focus on user experience over technical metrics

### Performance Optimization Hierarchy
1. **Algorithm Optimization**: Choose the right algorithms and data structures
2. **Code-Level Optimization**: Optimize critical code paths
3. **System Architecture**: Design for performance from the ground up
4. **Infrastructure Scaling**: Scale horizontally and vertically as needed
5. **Caching Strategies**: Implement multi-layer caching

## Technology Stack

- **Profiling**: Chrome DevTools, Node.js Profiler, async-profiler (Java), pprof (Go)
- **Monitoring**: Prometheus, Grafana, New Relic, Datadog
- **Load Testing**: k6, Artillery, JMeter, Gatling
- **Database Profiling**: SQL Explain Plans, Database-specific tools
- **Frontend Performance**: Lighthouse, WebPageTest, Core Web Vitals
- **Infrastructure**: Docker, Kubernetes, CDN, Load Balancers

## Project Structure

\`\`\`
performance-engineering/
├── profiling/
│   ├── frontend/            # Frontend performance profiling
│   ├── backend/             # Backend application profiling
│   ├── database/            # Database query optimization
│   └── infrastructure/      # System-level profiling
├── monitoring/
│   ├── metrics/             # Custom metrics and dashboards
│   ├── alerting/            # Performance alerting rules
│   ├── logging/             # Performance logging
│   └── tracing/             # Distributed tracing setup
├── testing/
│   ├── load-tests/          # Load and stress testing
│   ├── benchmark/           # Microbenchmarks
│   ├── synthetic/           # Synthetic monitoring
│   └── chaos/               # Chaos engineering tests
├── optimization/
│   ├── algorithms/          # Algorithm optimization examples
│   ├── caching/             # Caching strategies
│   ├── database/            # Database optimization
│   └── infrastructure/      # Infrastructure optimization
└── tools/
    ├── scripts/             # Performance analysis scripts
    ├── dashboards/          # Monitoring dashboards
    └── reports/             # Performance reports
\`\`\`

## Frontend Performance Optimization

### Core Web Vitals Monitoring
\`\`\`typescript
// profiling/frontend/core-web-vitals.ts
export class CoreWebVitalsMonitor {
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeObserver();
  }

  private initializeObserver(): void {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.handlePerformanceEntry(entry);
        });
      });

      // Observe all performance entry types
      this.observer.observe({ 
        entryTypes: ['navigation', 'resource', 'paint', 'layout-shift', 'largest-contentful-paint'] 
      });
    }
  }

  private handlePerformanceEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'navigation':
        this.analyzeNavigationTiming(entry as PerformanceNavigationTiming);
        break;
      case 'resource':
        this.analyzeResourceTiming(entry as PerformanceResourceTiming);
        break;
      case 'paint':
        this.analyzePaintTiming(entry);
        break;
      case 'layout-shift':
        this.analyzeCLS(entry as any);
        break;
      case 'largest-contentful-paint':
        this.analyzeLCP(entry as any);
        break;
    }
  }

  private analyzeNavigationTiming(entry: PerformanceNavigationTiming): void {
    const metrics = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ssl: entry.connectEnd - entry.secureConnectionStart,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domProcessing: entry.domContentLoadedEventStart - entry.responseEnd,
      domReady: entry.domContentLoadedEventEnd - entry.navigationStart,
      pageLoad: entry.loadEventEnd - entry.navigationStart
    };

    console.log('Navigation Performance:', metrics);
    this.sendMetrics('navigation', metrics);
  }

  private analyzeResourceTiming(entry: PerformanceResourceTiming): void {
    const resourceMetrics = {
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize,
      cached: entry.transferSize === 0 && entry.decodedBodySize > 0,
      blocking: entry.renderBlockingStatus === 'blocking'
    };

    // Flag slow resources
    if (entry.duration > 1000) {
      console.warn('Slow resource detected:', resourceMetrics);
      this.sendAlert('slow_resource', resourceMetrics);
    }
  }

  private analyzeLCP(entry: any): void {
    const lcp = entry.startTime;
    console.log('Largest Contentful Paint:', lcp);
    
    // LCP should be under 2.5s for good user experience
    if (lcp > 2500) {
      this.sendAlert('poor_lcp', { value: lcp, threshold: 2500 });
    }
    
    this.sendMetrics('lcp', { value: lcp });
  }

  private analyzeCLS(entry: any): void {
    const cls = entry.value;
    console.log('Cumulative Layout Shift:', cls);
    
    // CLS should be under 0.1 for good user experience
    if (cls > 0.1) {
      this.sendAlert('poor_cls', { value: cls, threshold: 0.1 });
    }
    
    this.sendMetrics('cls', { value: cls });
  }

  private sendMetrics(type: string, data: any): void {
    // Send to analytics service
    fetch('/api/performance-metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data, timestamp: Date.now() })
    }).catch(console.error);
  }

  private sendAlert(type: string, data: any): void {
    // Send performance alerts
    fetch('/api/performance-alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data, timestamp: Date.now() })
    }).catch(console.error);
  }

  // Manual performance measurement
  measureCustomMetric(name: string, fn: () => void): number {
    const start = performance.now();
    fn();
    const end = performance.now();
    const duration = end - start;
    
    this.sendMetrics('custom', { name, duration });
    return duration;
  }

  // Resource loading optimization
  preloadCriticalResources(resources: string[]): void {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(jpg|jpeg|png|webp)$/)) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  }
}

// Initialize monitoring
const performanceMonitor = new CoreWebVitalsMonitor();

// Export for global use
(window as any).performanceMonitor = performanceMonitor;
\`\`\`

### Frontend Bundle Optimization
\`\`\`typescript
// optimization/frontend/bundle-analyzer.ts
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';

export const webpackOptimizationConfig = {
  // Code splitting
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    // Tree shaking
    usedExports: true,
    sideEffects: false,
    // Runtime chunk
    runtimeChunk: 'single'
  },

  // Performance budgets
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
    hints: 'warning'
  },

  plugins: [
    // Bundle analysis
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    }),

    // Compression
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    })
  ]
};

// Lazy loading utility
export class LazyLoader {
  private loadedModules = new Map<string, Promise<any>>();

  async loadModule<T>(moduleFactory: () => Promise<{ default: T }>): Promise<T> {
    const moduleKey = moduleFactory.toString();
    
    if (!this.loadedModules.has(moduleKey)) {
      this.loadedModules.set(moduleKey, moduleFactory());
    }
    
    const module = await this.loadedModules.get(moduleKey)!;
    return module.default;
  }

  // Image lazy loading
  observeImages(): void {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}
\`\`\`

## Backend Performance Profiling

### Node.js Performance Profiling
\`\`\`typescript
// profiling/backend/nodejs-profiler.ts
import { performance, PerformanceObserver } from 'perf_hooks';
import { createWriteStream } from 'fs';
import { promisify } from 'util';

export class NodeJSProfiler {
  private metricsLog = createWriteStream('performance-metrics.log', { flags: 'a' });
  private observer: PerformanceObserver;

  constructor() {
    this.initializeObserver();
  }

  private initializeObserver(): void {
    this.observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        this.logMetric({
          name: entry.name,
          duration: entry.duration,
          startTime: entry.startTime,
          timestamp: new Date().toISOString()
        });
      });
    });

    this.observer.observe({ entryTypes: ['measure', 'function'] });
  }

  // Method decorator for automatic profiling
  profile(target: any, propertyName: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const measureName = \`\${target.constructor.name}.\${propertyName}\`;
      const startMark = \`\${measureName}-start\`;
      const endMark = \`\${measureName}-end\`;

      performance.mark(startMark);
      
      try {
        const result = await method.apply(this, args);
        performance.mark(endMark);
        performance.measure(measureName, startMark, endMark);
        return result;
      } catch (error) {
        performance.mark(endMark);
        performance.measure(\`\${measureName}-error\`, startMark, endMark);
        throw error;
      }
    };
  }

  // Manual timing
  async timeFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await fn();
      const endTime = performance.now();
      
      this.logMetric({
        name,
        duration: endTime - startTime,
        status: 'success',
        timestamp: new Date().toISOString()
      });
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      
      this.logMetric({
        name: \`\${name}-error\`,
        duration: endTime - startTime,
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  }

  // Memory usage tracking
  trackMemoryUsage(): void {
    setInterval(() => {
      const memUsage = process.memoryUsage();
      this.logMetric({
        name: 'memory-usage',
        heapUsed: memUsage.heapUsed,
        heapTotal: memUsage.heapTotal,
        external: memUsage.external,
        rss: memUsage.rss,
        timestamp: new Date().toISOString()
      });
    }, 30000); // Every 30 seconds
  }

  // CPU profiling
  startCPUProfiling(): void {
    const profiler = require('v8-profiler-next');
    profiler.startProfiling('CPU');
    
    setTimeout(() => {
      const profile = profiler.stopProfiling('CPU');
      profile.export((error: any, result: string) => {
        if (!error) {
          require('fs').writeFileSync('cpu-profile.cpuprofile', result);
        }
        profile.delete();
      });
    }, 60000); // Profile for 1 minute
  }

  private logMetric(metric: any): void {
    this.metricsLog.write(JSON.stringify(metric) + '\\n');
    
    // Send to monitoring system
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(metric);
    }
  }

  private async sendToMonitoring(metric: any): Promise<void> {
    // Implementation depends on your monitoring system
    // Example: Prometheus, DataDog, New Relic, etc.
  }
}

// Usage example
export class UserService {
  private profiler = new NodeJSProfiler();

  @profile
  async createUser(userData: any): Promise<any> {
    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id: Math.random(), ...userData };
  }

  async processUsers(users: any[]): Promise<any[]> {
    return this.profiler.timeFunction('process-users', async () => {
      return Promise.all(users.map(user => this.createUser(user)));
    });
  }
}
\`\`\`

### Database Performance Optimization
\`\`\`sql
-- profiling/database/query-optimization.sql

-- Enable query logging and analysis
SET log_statement = 'all';
SET log_min_duration_statement = 1000; -- Log queries taking > 1s

-- Analyze slow queries
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    stddev_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 20;

-- Index usage analysis
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes 
ORDER BY idx_scan DESC;

-- Table bloat analysis
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) as index_size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
\`\`\`

\`\`\`typescript
// profiling/database/query-profiler.ts
import { Pool, PoolClient } from 'pg';

export class DatabaseProfiler {
  private pool: Pool;
  private slowQueryThreshold = 1000; // 1 second

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async profileQuery<T>(
    query: string, 
    params: any[] = [], 
    context: string = ''
  ): Promise<{ result: T; metrics: any }> {
    const client = await this.pool.connect();
    const startTime = performance.now();
    let result: any;
    let error: Error | null = null;

    try {
      // Enable query analysis
      await client.query('SET enable_seqscan = off'); // Force index usage for testing
      await client.query('SET work_mem = \\'4MB\\''); // Optimize for this query
      
      const queryResult = await client.query(query, params);
      result = queryResult.rows;
      
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Get query execution plan
      const explainResult = await client.query(\`EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) \${query}\`, params);
      const executionPlan = explainResult.rows[0]['QUERY PLAN'][0];

      const metrics = {
        query: query.substring(0, 100) + '...',
        context,
        duration,
        rowCount: queryResult.rowCount,
        executionTime: executionPlan['Execution Time'],
        planningTime: executionPlan['Planning Time'],
        buffers: executionPlan['Buffers'],
        isSlow: duration > this.slowQueryThreshold
      };

      this.logQueryMetrics(metrics);

      if (metrics.isSlow) {
        this.alertSlowQuery(metrics, executionPlan);
      }

      return { result, metrics };

    } catch (err) {
      error = err as Error;
      const endTime = performance.now();
      
      this.logQueryError({
        query: query.substring(0, 100) + '...',
        context,
        duration: endTime - startTime,
        error: error.message
      });
      
      throw error;
    } finally {
      client.release();
    }
  }

  // Connection pool monitoring
  monitorConnectionPool(): void {
    setInterval(() => {
      const poolStats = {
        totalCount: this.pool.totalCount,
        idleCount: this.pool.idleCount,
        waitingCount: this.pool.waitingCount,
        timestamp: new Date().toISOString()
      };

      console.log('Pool Stats:', poolStats);
      
      // Alert if pool is under pressure
      if (poolStats.waitingCount > 5) {
        this.alertPoolPressure(poolStats);
      }
    }, 30000);
  }

  // Query optimization suggestions
  async analyzeQueryPerformance(query: string): Promise<any> {
    const client = await this.pool.connect();
    
    try {
      // Get detailed execution plan
      const explainResult = await client.query(\`EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT JSON) \${query}\`);
      const plan = explainResult.rows[0]['QUERY PLAN'][0];

      const suggestions = this.generateOptimizationSuggestions(plan);
      
      return {
        executionPlan: plan,
        suggestions,
        performance: {
          executionTime: plan['Execution Time'],
          planningTime: plan['Planning Time'],
          totalTime: plan['Execution Time'] + plan['Planning Time']
        }
      };
    } finally {
      client.release();
    }
  }

  private generateOptimizationSuggestions(plan: any): string[] {
    const suggestions: string[] = [];

    // Check for sequential scans
    if (this.hasSequentialScan(plan)) {
      suggestions.push('Consider adding indexes for columns used in WHERE clauses');
    }

    // Check for expensive sorts
    if (this.hasExpensiveSort(plan)) {
      suggestions.push('Consider adding indexes to support ORDER BY clauses');
    }

    // Check for nested loops with high cost
    if (this.hasExpensiveNestedLoop(plan)) {
      suggestions.push('Consider optimizing JOIN conditions or adding appropriate indexes');
    }

    return suggestions;
  }

  private hasSequentialScan(plan: any): boolean {
    // Recursively check for Seq Scan nodes
    if (plan['Node Type'] === 'Seq Scan') {
      return true;
    }
    
    if (plan['Plans']) {
      return plan['Plans'].some((subPlan: any) => this.hasSequentialScan(subPlan));
    }
    
    return false;
  }

  private hasExpensiveSort(plan: any): boolean {
    if (plan['Node Type'] === 'Sort' && plan['Total Cost'] > 1000) {
      return true;
    }
    
    if (plan['Plans']) {
      return plan['Plans'].some((subPlan: any) => this.hasExpensiveSort(subPlan));
    }
    
    return false;
  }

  private hasExpensiveNestedLoop(plan: any): boolean {
    if (plan['Node Type'] === 'Nested Loop' && plan['Total Cost'] > 10000) {
      return true;
    }
    
    if (plan['Plans']) {
      return plan['Plans'].some((subPlan: any) => this.hasExpensiveNestedLoop(subPlan));
    }
    
    return false;
  }

  private logQueryMetrics(metrics: any): void {
    console.log('Query Metrics:', metrics);
    // Send to monitoring system
  }

  private logQueryError(error: any): void {
    console.error('Query Error:', error);
    // Send to error tracking system
  }

  private alertSlowQuery(metrics: any, plan: any): void {
    console.warn('Slow Query Detected:', { metrics, plan });
    // Send alert to monitoring system
  }

  private alertPoolPressure(stats: any): void {
    console.warn('Connection Pool Pressure:', stats);
    // Send alert to monitoring system
  }
}
\`\`\`

## Load Testing and Benchmarking

### K6 Load Testing
\`\`\`javascript
// testing/load-tests/api-load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const responseTime = new Trend('response_time');
const requestCount = new Counter('requests');

// Test configuration
export const options = {
  stages: [
    { duration: '2m', target: 10 },   // Ramp up to 10 users
    { duration: '5m', target: 10 },   // Stay at 10 users
    { duration: '2m', target: 50 },   // Ramp up to 50 users
    { duration: '5m', target: 50 },   // Stay at 50 users
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '5m', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'], // 95% of requests under 2s
    'http_req_failed': ['rate<0.1'],     // Error rate under 10%
    'errors': ['rate<0.1'],              // Custom error rate under 10%
  }
};

// Test data
const users = [
  { email: 'user1@example.com', name: 'User 1' },
  { email: 'user2@example.com', name: 'User 2' },
  { email: 'user3@example.com', name: 'User 3' }
];

export default function() {
  const baseUrl = 'http://localhost:3000/api';
  
  // Test user creation
  const createUserPayload = users[Math.floor(Math.random() * users.length)];
  const createResponse = http.post(\`\${baseUrl}/users\`, JSON.stringify(createUserPayload), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  const createSuccess = check(createResponse, {
    'user creation status is 201 or 409': (r) => r.status === 201 || r.status === 409,
    'user creation response time < 2s': (r) => r.timings.duration < 2000,
  });
  
  errorRate.add(!createSuccess);
  responseTime.add(createResponse.timings.duration);
  requestCount.add(1);
  
  if (createResponse.status === 201) {
    const userId = JSON.parse(createResponse.body).data.id;
    
    // Test user retrieval
    const getResponse = http.get(\`\${baseUrl}/users/\${userId}\`);
    
    const getSuccess = check(getResponse, {
      'user retrieval status is 200': (r) => r.status === 200,
      'user retrieval response time < 1s': (r) => r.timings.duration < 1000,
      'user data is correct': (r) => {
        const user = JSON.parse(r.body).data;
        return user.email === createUserPayload.email;
      }
    });
    
    errorRate.add(!getSuccess);
    responseTime.add(getResponse.timings.duration);
    requestCount.add(1);
  }
  
  sleep(1); // Wait 1 second between iterations
}

// Teardown function
export function teardown(data) {
  console.log('Load test completed');
  // Clean up test data if needed
}
\`\`\`

### Performance Benchmarking
\`\`\`typescript
// testing/benchmark/micro-benchmarks.ts
import { performance } from 'perf_hooks';

export class PerformanceBenchmark {
  private results: Map<string, number[]> = new Map();

  // Run a function multiple times and collect statistics
  async benchmark(
    name: string, 
    fn: () => Promise<any> | any, 
    iterations: number = 1000
  ): Promise<BenchmarkResult> {
    const times: number[] = [];
    
    // Warm up
    for (let i = 0; i < 10; i++) {
      await fn();
    }
    
    // Actual benchmark
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      await fn();
      const end = performance.now();
      times.push(end - start);
    }
    
    const result = this.calculateStatistics(name, times);
    this.results.set(name, times);
    
    return result;
  }

  // Compare multiple implementations
  async compare(implementations: { [name: string]: () => Promise<any> | any }, iterations: number = 1000): Promise<void> {
    const results: BenchmarkResult[] = [];
    
    for (const [name, fn] of Object.entries(implementations)) {
      const result = await this.benchmark(name, fn, iterations);
      results.push(result);
    }
    
    // Sort by median time
    results.sort((a, b) => a.median - b.median);
    
    console.log('\\n=== Performance Comparison ===');
    results.forEach((result, index) => {
      const fastest = results[0];
      const slowdownFactor = result.median / fastest.median;
      
      console.log(\`\${index + 1}. \${result.name}\`);
      console.log(\`   Median: \${result.median.toFixed(2)}ms\`);
      console.log(\`   Mean: \${result.mean.toFixed(2)}ms\`);
      console.log(\`   95th percentile: \${result.p95.toFixed(2)}ms\`);
      if (index > 0) {
        console.log(\`   \${slowdownFactor.toFixed(2)}x slower than fastest\`);
      }
      console.log('');
    });
  }

  private calculateStatistics(name: string, times: number[]): BenchmarkResult {
    const sorted = times.sort((a, b) => a - b);
    const sum = times.reduce((a, b) => a + b, 0);
    
    return {
      name,
      iterations: times.length,
      mean: sum / times.length,
      median: sorted[Math.floor(sorted.length / 2)],
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
      standardDeviation: this.calculateStandardDeviation(times, sum / times.length)
    };
  }

  private calculateStandardDeviation(values: number[], mean: number): number {
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  // Generate performance report
  generateReport(): string {
    let report = '# Performance Benchmark Report\\n\\n';
    
    for (const [name, times] of this.results.entries()) {
      const stats = this.calculateStatistics(name, times);
      
      report += \`## \${name}\\n\`;
      report += \`- Iterations: \${stats.iterations}\\n\`;
      report += \`- Mean: \${stats.mean.toFixed(2)}ms\\n\`;
      report += \`- Median: \${stats.median.toFixed(2)}ms\\n\`;
      report += \`- Min: \${stats.min.toFixed(2)}ms\\n\`;
      report += \`- Max: \${stats.max.toFixed(2)}ms\\n\`;
      report += \`- 95th percentile: \${stats.p95.toFixed(2)}ms\\n\`;
      report += \`- Standard deviation: \${stats.standardDeviation.toFixed(2)}ms\\n\\n\`;
    }
    
    return report;
  }
}

interface BenchmarkResult {
  name: string;
  iterations: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  p95: number;
  p99: number;
  standardDeviation: number;
}

// Example usage
async function runBenchmarks() {
  const benchmark = new PerformanceBenchmark();
  
  // Compare different sorting algorithms
  const data = Array.from({ length: 1000 }, () => Math.random());
  
  await benchmark.compare({
    'Native Sort': () => [...data].sort((a, b) => a - b),
    'Bubble Sort': () => bubbleSort([...data]),
    'Quick Sort': () => quickSort([...data])
  }, 100);
  
  // Individual benchmarks
  await benchmark.benchmark('String Concatenation', () => {
    let result = '';
    for (let i = 0; i < 1000; i++) {
      result += 'test';
    }
    return result;
  });
  
  await benchmark.benchmark('Array Join', () => {
    const parts: string[] = [];
    for (let i = 0; i < 1000; i++) {
      parts.push('test');
    }
    return parts.join('');
  });
  
  console.log(benchmark.generateReport());
}

function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}
\`\`\`

## Monitoring and Alerting

### Prometheus Configuration
\`\`\`yaml
# monitoring/prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "performance_rules.yml"

scrape_configs:
  - job_name: 'node-app'
    static_configs:
      - targets: ['localhost:3000']
    scrape_interval: 5s
    metrics_path: '/metrics'

  - job_name: 'postgres'
    static_configs:
      - targets: ['localhost:5432']

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093
\`\`\`

\`\`\`yaml
# monitoring/prometheus/performance_rules.yml
groups:
  - name: performance_alerts
    rules:
      - alert: HighResponseTime
        expr: histogram_quantile(0.95, http_request_duration_seconds_bucket) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is {{ $value }}s"

      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }}"

      - alert: DatabaseSlowQueries
        expr: pg_stat_statements_mean_time_ms > 1000
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Slow database queries detected"
          description: "Average query time is {{ $value }}ms"
\`\`\`

## Best Practices and Guidelines

### Performance Engineering Workflow
1. **Baseline Measurement**: Establish performance baselines before optimization
2. **Profiling and Analysis**: Use appropriate profiling tools for each layer
3. **Targeted Optimization**: Focus on the biggest bottlenecks first
4. **Measure Impact**: Always measure the impact of optimizations
5. **Regression Testing**: Implement performance regression testing
6. **Continuous Monitoring**: Set up ongoing performance monitoring

### Optimization Priorities
1. **Algorithm and Data Structure**: Choose the right approach from the start
2. **Database Optimization**: Optimize queries, indexes, and schema design
3. **Caching Strategy**: Implement appropriate caching layers
4. **Network Optimization**: Minimize data transfer and latency
5. **Resource Utilization**: Optimize CPU, memory, and I/O usage

### Common Performance Anti-Patterns
- Premature optimization without profiling
- Ignoring database query performance
- Not implementing proper caching strategies
- Loading unnecessary data
- Blocking the main thread in frontend applications
- Not using connection pooling for databases
- Ignoring memory leaks and resource cleanup

### Performance Testing Strategy
- **Unit Performance Tests**: Test individual function performance
- **Integration Performance Tests**: Test component interaction performance
- **Load Testing**: Test system behavior under expected load
- **Stress Testing**: Test system behavior under extreme load
- **Spike Testing**: Test system behavior during traffic spikes
- **Volume Testing**: Test system behavior with large amounts of data`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];