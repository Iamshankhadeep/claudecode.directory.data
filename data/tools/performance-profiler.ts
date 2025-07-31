export default {
  id: 'performance-profiler',
  title: 'Performance Profiler',
  slug: 'performance-profiler',
  tagline: 'Advanced performance profiling with CPU, memory, and I/O analysis for bottleneck detection',
  description: 'Advanced application performance profiling and optimization tool with CPU, memory, and I/O analysis, bottleneck detection, and automated optimization recommendations.',
  category: 'Tools & CLI',
  type: 'CLI',
  url: 'https://github.com/enterprise/performance-profiler',
  tags: ['performance', 'profiling', 'optimization', 'cpu', 'memory', 'bottleneck', 'analysis'],
  author: {
    name: 'Claude Code Directory',
    url: 'https://claudecode.directory'
  },
  stats: {
    votes: 0,
    copies: 0
  },
  difficulty: 'ADVANCED',
  lastUpdated: '2024-01-31' Performance Profiler

Comprehensive performance profiling and optimization toolkit for production applications with real-time monitoring, bottleneck detection, and automated optimization recommendations.

## Installation and Setup

\`\`\`bash
# Install Performance Profiler
npm install -g @enterprise/perf-profiler
# or
curl -fsSL https://releases.perf-profiler.io/install.sh | bash

# Initialize in project
perf-prof init

# Configure profiling targets
perf-prof config setup
\`\`\`

## Core Commands

### Basic Profiling

\`\`\`bash
# CPU profiling
perf-prof cpu start --duration=60s           # 60-second CPU profile
perf-prof cpu start --sample-rate=1000       # High-frequency sampling
perf-prof cpu analyze --flamegraph           # Generate flame graph
perf-prof cpu compare before.prof after.prof # Compare profiles

# Memory profiling
perf-prof memory start --heap                # Heap memory analysis
perf-prof memory start --leaks               # Memory leak detection
perf-prof memory snapshot --interval=10s     # Periodic snapshots
perf-prof memory analyze --report            # Generate memory report

# I/O profiling
perf-prof io start --network                 # Network I/O monitoring
perf-prof io start --disk                    # Disk I/O monitoring
perf-prof io analyze --bottlenecks           # I/O bottleneck analysis

# Application profiling
perf-prof app start --full                   # Full application profile
perf-prof app trace --requests               # Request tracing
perf-prof app analyze --performance          # Performance analysis
\`\`\`

### Advanced Analysis

\`\`\`bash
# Distributed tracing
perf-prof trace start --distributed          # Cross-service tracing
perf-prof trace analyze --spans              # Span analysis
perf-prof trace visualize --service-map      # Service dependency map

# Load testing integration
perf-prof load test --rps=1000 --duration=5m # Load test with profiling
perf-prof load analyze --percentiles         # Response time analysis
perf-prof load compare baseline current      # Performance regression detection

# Production monitoring
perf-prof monitor start --continuous         # Continuous monitoring
perf-prof monitor alert --cpu-threshold=80   # Set performance alerts
perf-prof monitor report --daily             # Generate daily reports
\`\`\`

## Configuration System

### Global Configuration

\`\`\`yaml
# ~/.perf-prof/config.yml
profiling:
  default_duration: 60s
  sample_rate: 1000  # Hz
  output_directory: ./profiles
  auto_analyze: true
  
targets:
  development:
    type: local
    pid_file: ./app.pid
    endpoint: http://localhost:3000
    
  staging:
    type: remote
    endpoint: https://staging-api.company.com
    auth_token: ${STAGING_TOKEN}
    
  production:
    type: remote
    endpoint: https://api.company.com
    auth_token: ${PROD_TOKEN}
    sampling_rate: 100  # Lower for production

cpu_profiling:
  include_kernel: false
  stack_depth: 64
  flame_graph:
    width: 1200
    height: 800
    colors: hot
    
memory_profiling:
  heap_snapshots: true
  track_allocations: true
  leak_detection: true
  gc_tracking: true
  
io_profiling:
  network_monitoring: true
  disk_monitoring: true
  database_queries: true
  external_apis: true

analysis:
  auto_detect_bottlenecks: true
  performance_budgets:
    response_time_p95: 200ms
    memory_usage_max: 512MB
    cpu_usage_avg: 70%
  
  optimization_suggestions: true
  code_hotspots: true
  regression_detection: true

alerting:
  enabled: true
  thresholds:
    cpu_usage: 85%
    memory_usage: 90%
    response_time_p95: 500ms
    error_rate: 5%
  
  notifications:
    slack: ${SLACK_WEBHOOK}
    email: devops@company.com
    pagerduty: ${PAGERDUTY_KEY}

storage:
  retention_period: 30d
  compression: gzip
  export_formats: [json, protobuf, flamegraph]
\`\`\`

### Application-Specific Configuration

\`\`\`yaml
# .perf-prof/app.yml
application:
  name: user-service
  language: node.js
  framework: express
  
instrumentation:
  automatic: true
  custom_metrics: true
  database_queries: true
  external_calls: true
  
profiling_points:
  - name: user_authentication
    pattern: "/api/auth/*"
    cpu_profile: true
    memory_profile: true
    
  - name: data_processing
    pattern: "/api/process/*"
    detailed_tracing: true
    performance_budget: 100ms
    
  - name: database_operations
    type: database
    track_queries: true
    slow_query_threshold: 50ms

monitoring:
  metrics:
    - name: request_duration
      type: histogram
      buckets: [0.1, 0.5, 1.0, 2.0, 5.0]
      
    - name: memory_usage
      type: gauge
      
    - name: active_connections
      type: gauge
      
  custom_events:
    - name: user_login
      track_performance: true
      
    - name: data_export
      track_memory: true
      detailed_profile: true

optimization:
  auto_suggestions: true
  code_analysis: true
  dependency_analysis: true
  architecture_recommendations: true
\`\`\`

## Profiling Features

### CPU Performance Analysis

\`\`\`bash
# Detailed CPU profiling
perf-prof cpu profile --app=user-service --duration=120s
# Output:
# CPU Profile Analysis: user-service
# ├── Total samples: 245,892
# ├── Sample rate: 1000 Hz  
# ├── Top functions by CPU time:
# │   ├── authenticateUser: 18.5% (45.4s)
# │   ├── validatePermissions: 12.3% (30.1s)
# │   ├── databaseQuery: 8.7% (21.3s)
# │   ├── jsonParsing: 6.2% (15.2s)
# │   └── encryption: 4.8% (11.8s)
# ├── Hot paths identified: 5
# ├── Optimization opportunities: 8
# └── Estimated improvement: 25-30%

# Flame graph generation
perf-prof cpu flamegraph --profile=latest --output=flamegraph.html
# Creates interactive flame graph showing:
# - Function call hierarchy
# - Time spent in each function
# - Call frequency
# - Performance hotspots

# CPU bottleneck analysis
perf-prof cpu bottlenecks --analyze
# Output:
# CPU Bottleneck Analysis
# ├── Main thread utilization: 87%
# ├── I/O wait time: 15%
# ├── GC overhead: 8%
# ├── Critical path analysis:
# │   └── authenticateUser → validatePermissions → databaseQuery (65ms avg)
# ├── Parallelization opportunities: 3
# └── Recommendations:
#     ├── Cache authentication results (est. 15% improvement)
#     ├── Optimize database queries (est. 20% improvement)
#     └── Implement async validation (est. 10% improvement)

# Function-level profiling
perf-prof cpu function --name=authenticateUser --detailed
# Output:
# Function Profile: authenticateUser
# ├── Total invocations: 15,234
# ├── Average execution time: 2.98ms
# ├── P95 execution time: 8.4ms
# ├── P99 execution time: 15.2ms
# ├── CPU time distribution:
# │   ├── Password hashing: 45%
# │   ├── Database lookup: 30%
# │   ├── Token generation: 15%
# │   └── Validation logic: 10%
# ├── Memory allocations: 1.2MB per call
# └── Optimization suggestions:
#     ├── Implement password hash caching
#     ├── Use connection pooling for DB lookups
#     └── Pre-allocate token buffers
\`\`\`

### Memory Analysis

\`\`\`bash
# Heap memory profiling
perf-prof memory heap --analyze --duration=300s
# Output:
# Heap Memory Analysis
# ├── Total heap size: 245 MB
# ├── Used heap: 198 MB (81%)
# ├── Free heap: 47 MB (19%)
# ├── Largest objects:
# │   ├── UserCache: 45 MB (18.4%)
# │   ├── DatabaseConnections: 32 MB (13.1%)
# │   ├── RequestBuffers: 28 MB (11.5%)
# │   ├── SessionStore: 22 MB (9.0%)
# │   └── LogBuffer: 18 MB (7.4%)
# ├── Allocation rate: 15 MB/s
# ├── GC frequency: Every 2.3s
# ├── GC pause time: 12ms average
# └── Memory leaks detected: 2

# Memory leak detection
perf-prof memory leaks --detect --threshold=10MB
# Output:
# Memory Leak Detection Report
# ├── Potential leaks found: 2
# ├── Leak 1: EventEmitter listeners
# │   ├── Growth rate: 2.1 MB/hour
# │   ├── Location: src/events/processor.js:45
# │   ├── Objects: 15,234 EventListener instances
# │   └── Recommendation: Implement listener cleanup
# ├── Leak 2: Database connections
# │   ├── Growth rate: 850 KB/hour
# │   ├── Location: src/db/connection.js:78
# │   ├── Objects: 234 Connection instances  
# │   └── Recommendation: Fix connection pool cleanup
# └── Total leaked memory: 145 MB over 48 hours

# Memory allocation profiling
perf-prof memory allocations --track --top=20
# Output:
# Top Memory Allocations
# ├── Buffer.alloc: 2,345,234 allocations (125 MB)
# ├── Object.create: 1,876,543 allocations (89 MB)
# ├── Array constructor: 987,654 allocations (67 MB)
# ├── String concatenation: 654,321 allocations (45 MB)
# ├── JSON.parse: 432,109 allocations (34 MB)
# └── Custom class instances: 234,567 allocations (28 MB)

# Garbage collection analysis
perf-prof memory gc --analyze
# Output:
# Garbage Collection Analysis
# ├── GC events: 1,234 in last hour
# ├── Total GC time: 15.2s (0.42% of runtime)
# ├── Average pause: 12.3ms
# ├── Longest pause: 67ms
# ├── GC types:
# │   ├── Scavenge (young generation): 1,156 events
# │   ├── Mark-Sweep (old generation): 78 events
# │   └── Incremental marking: 0 events
# ├── Heap growth rate: 2.1 MB/minute
# └── Recommendations:
#     ├── Increase young generation size
#     ├── Enable incremental marking
#     └── Reduce allocation rate in hot paths
\`\`\`

### I/O Performance Analysis

\`\`\`bash
# Network I/O profiling
perf-prof io network --analyze --duration=180s
# Output:
# Network I/O Performance Analysis
# ├── Total requests: 45,234
# ├── Request rate: 251 req/s
# ├── Response time distribution:
# │   ├── P50: 45ms
# │   ├── P95: 234ms
# │   ├── P99: 567ms
# │   └── Max: 1,234ms
# ├── Network utilization:
# │   ├── Inbound: 15.2 MB/s (peak: 28.9 MB/s)
# │   └── Outbound: 8.7 MB/s (peak: 16.3 MB/s)
# ├── Connection analysis:
# │   ├── Active connections: 145
# │   ├── Connection pool usage: 78%
# │   ├── Connection reuse: 87%
# │   └── Connection timeouts: 12
# └── Bottlenecks identified:
#     ├── DNS resolution: 15ms average (cacheable)
#     ├── SSL handshake: 45ms average
#     └── Keep-alive not optimized

# Database I/O analysis
perf-prof io database --analyze --slow-queries
# Output:
# Database I/O Analysis
# ├── Total queries: 12,456
# ├── Query rate: 69 queries/s
# ├── Query types:
# │   ├── SELECT: 8,234 (66.1%)
# │   ├── UPDATE: 2,345 (18.8%)
# │   ├── INSERT: 1,567 (12.6%)
# │   └── DELETE: 310 (2.5%)
# ├── Response time distribution:
# │   ├── P50: 12ms
# │   ├── P95: 89ms
# │   ├── P99: 234ms
# │   └── Max: 1,567ms
# ├── Slow queries (>100ms): 234
# ├── Connection pool:
# │   ├── Active connections: 25/50
# │   ├── Queue length: 0
# │   ├── Connection wait time: 0ms
# │   └── Connection errors: 0
# └── Optimization recommendations:
#     ├── Add index on users.email (affects 45% of queries)
#     ├── Optimize JOIN operations in analytics queries
#     └── Implement query result caching

# File system I/O analysis
perf-prof io filesystem --analyze
# Output:
# File System I/O Analysis  
# ├── Read operations: 8,456 (145 MB)
# ├── Write operations: 3,234 (89 MB)
# ├── Read throughput: 12.3 MB/s
# ├── Write throughput: 8.7 MB/s
# ├── IOPS: 456 read, 234 write
# ├── Latency:
# │   ├── Read: 2.3ms average
# │   ├── Write: 5.7ms average
# │   └── Fsync: 12.4ms average
# ├── Hot files:
# │   ├── /var/log/app.log: 234 MB written
# │   ├── /tmp/cache/*: 89 MB read/write
# │   └── /data/uploads/*: 67 MB written
# └── Recommendations:
#     ├── Use log rotation for app.log
#     ├── Implement memory caching for temp files
#     └── Consider SSD storage for hot directories
\`\`\`

## Advanced Analysis Features

### Distributed Tracing

\`\`\`bash
# Start distributed tracing
perf-prof trace distributed --services=all --duration=300s
# Output:
# Distributed Trace Analysis
# ├── Services traced: user-service, auth-service, data-service
# ├── Total traces: 15,234
# ├── Trace completion rate: 98.7%
# ├── Average trace duration: 245ms
# ├── Cross-service calls: 45,678
# ├── Service dependency graph:
# │   ├── user-service → auth-service (12,345 calls)
# │   ├── user-service → data-service (8,976 calls)
# │   ├── auth-service → redis (45,234 calls)
# │   └── data-service → postgres (23,456 calls)
# └── Critical path analysis:
#     └── user-service → auth-service → redis (45ms p95)

# Trace analysis with service map
perf-prof trace service-map --visualize
# Generates interactive service map showing:
# - Service dependencies
# - Call volumes
# - Response times
# - Error rates
# - Bottleneck identification

# Individual trace analysis
perf-prof trace analyze --trace-id=abc123 --detailed
# Output:
# Trace Analysis: abc123
# ├── Total duration: 234ms
# ├── Service calls: 5
# ├── Timeline:
# │   ├── 0ms: user-service starts request
# │   ├── 12ms: auth-service call (duration: 45ms)
# │   ├── 67ms: data-service call (duration: 123ms)
# │   ├── 198ms: response processing (duration: 23ms)
# │   └── 234ms: response sent
# ├── Slowest span: data-service query (89ms)
# ├── Database queries: 3 (total: 67ms)
# ├── External API calls: 1 (duration: 34ms)
# └── Optimization opportunities:
#     ├── Parallel auth and data calls (save 45ms)
#     ├── Database query optimization (save 20ms)
#     └── Response caching (save 123ms for similar requests)
\`\`\`

### Load Testing Integration

\`\`\`bash
# Performance testing with profiling
perf-prof load test --rps=500 --duration=300s --profile=full
# Output:
# Load Test with Profiling Results
# ├── Total requests: 150,000
# ├── Request rate: 500 RPS (target achieved)
# ├── Success rate: 99.2%
# ├── Response times:
# │   ├── P50: 45ms
# │   ├── P95: 234ms  
# │   ├── P99: 567ms
# │   └── Max: 2,345ms
# ├── Error analysis:
# │   ├── 5xx errors: 234 (0.16%)
# │   ├── Timeouts: 456 (0.3%)
# │   └── Connection errors: 123 (0.08%)
# ├── Resource utilization:
# │   ├── CPU: 78% average, 92% peak
# │   ├── Memory: 456 MB average, 612 MB peak
# │   ├── Network: 45 MB/s average, 67 MB/s peak
# │   └── Database connections: 78% pool usage
# └── Performance bottlenecks:
#     ├── Authentication service: 15% of total response time
#     ├── Database queries: 35% of total response time
#     └── JSON serialization: 8% of total response time

# Regression testing
perf-prof load compare --baseline=v1.2.0 --current=v1.3.0
# Output:
# Performance Regression Analysis
# ├── Baseline: v1.2.0 (last week)
# ├── Current: v1.3.0 (current build)
# ├── Response time changes:
# │   ├── P50: 45ms → 52ms (+15.6%) ⚠️
# │   ├── P95: 234ms → 198ms (-15.4%) ✅
# │   ├── P99: 567ms → 623ms (+9.9%) ⚠️
# │   └── Max: 2,345ms → 1,876ms (-20.0%) ✅
# ├── Throughput: 500 RPS → 485 RPS (-3.0%) ⚠️
# ├── Error rate: 0.8% → 1.2% (+50.0%) ❌
# ├── Resource usage:
# │   ├── CPU: 78% → 82% (+5.1%)
# │   ├── Memory: 456MB → 523MB (+14.7%) ⚠️
# │   └── Database: 78% → 85% (+9.0%)
# └── Regression verdict: DEGRADED
#     ├── Critical issues: 1 (error rate increase)
#     ├── Performance issues: 3
#     └── Recommendation: Investigate before deployment

# Capacity planning
perf-prof load capacity --target-rps=1000 --sla=200ms
# Output:
# Capacity Planning Analysis
# ├── Target: 1000 RPS with P95 < 200ms
# ├── Current capacity: 485 RPS
# ├── Required scaling: 2.06x
# ├── Resource projections:
# │   ├── CPU cores: 4 → 8 cores
# │   ├── Memory: 8GB → 16GB
# │   ├── Database connections: 50 → 100
# │   └── Load balancer instances: 2 → 4
# ├── Estimated costs:
# │   ├── Infrastructure: $2,400/month → $4,800/month
# │   ├── Database: $800/month → $1,600/month
# │   └── Total increase: $3,000/month
# └── Optimization alternatives:
#     ├── Implement caching (est. 40% improvement)
#     ├── Database query optimization (est. 25% improvement)
#     └── Code profiling optimizations (est. 15% improvement)
\`\`\`

## Optimization Recommendations

### Automated Performance Analysis

\`\`\`bash
# Full application analysis
perf-prof analyze application --comprehensive
# Output:
# Comprehensive Application Analysis
# ├── Overall performance score: 7.2/10
# ├── Critical issues: 2
# ├── Performance issues: 8
# ├── Optimization opportunities: 15
# 
# ├── CPU Analysis:
# │   ├── Utilization: 67% average (healthy)
# │   ├── Hot functions: 5 identified
# │   ├── Blocking operations: 3 detected
# │   └── Parallelization opportunities: 4
# 
# ├── Memory Analysis:
# │   ├── Heap usage: 81% (concerning)
# │   ├── Memory leaks: 2 confirmed
# │   ├── GC pressure: Medium
# │   └── Allocation hotspots: 8
# 
# ├── I/O Analysis:
# │   ├── Database performance: Good
# │   ├── Network efficiency: Excellent
# │   ├── File system usage: Moderate
# │   └── External API calls: Needs optimization
# 
# └── Recommendations (by impact):
#     ├── Fix memory leaks (est. 25% improvement)
#     ├── Implement response caching (est. 40% improvement)
#     ├── Optimize database queries (est. 20% improvement)
#     ├── Reduce JSON parsing overhead (est. 15% improvement)
#     └── Implement connection pooling (est. 10% improvement)

# Code-level optimization suggestions
perf-prof optimize code --analyze-hotspots
# Output:
# Code Optimization Suggestions
# 
# Hot Function: authenticateUser (src/auth/auth.js:45)
# ├── CPU time: 18.5% of total
# ├── Calls per second: 127
# ├── Average duration: 145ms
# └── Optimizations:
#     ├── Cache bcrypt results (lines 67-72)
#       └── Est. improvement: 60% faster, reduce CPU by 11%
#     ├── Batch database queries (lines 89-95)
#       └── Est. improvement: 30% faster, reduce DB load
#     ├── Pre-compile regex patterns (lines 123-128)
#       └── Est. improvement: 15% faster
# 
# Memory Hotspot: UserSession class (src/session/user.js:23)
# ├── Allocations: 2.3M objects/hour
# ├── Memory usage: 45MB
# └── Optimizations:
#     ├── Object pooling for session objects
#       └── Est. improvement: 70% less GC pressure
#     ├── Use WeakMap for temporary data
#       └── Est. improvement: 40% memory reduction
#     ├── Implement session cleanup (lines 156-162)
#       └── Est. improvement: Fix memory leak

# Architecture recommendations
perf-prof optimize architecture --analyze-patterns
# Output:
# Architecture Optimization Recommendations
# 
# ├── Caching Strategy:
# │   ├── Implement Redis for session storage (40% improvement)
# │   ├── Add CDN for static assets (60% faster static content)
# │   ├── Database query result caching (25% improvement)
# │   └── API response caching (35% improvement)
# 
# ├── Database Optimization:
# │   ├── Add composite index on (user_id, created_at)
# │   ├── Partition large tables by date
# │   ├── Implement read replicas for reporting
# │   └── Use connection pooling with proper sizing
# 
# ├── Microservices Optimization:
# │   ├── Combine related API calls (reduce network overhead)
# │   ├── Implement circuit breakers (improve resilience)
# │   ├── Use async processing for non-critical operations
# │   └── Add request coalescing for duplicate calls
# 
# └── Infrastructure Recommendations:
#     ├── Scale horizontally (add 2 more instances)
#     ├── Upgrade to SSD storage for database
#     ├── Implement auto-scaling based on CPU/memory
#     └── Add load balancer health checks
\`\`\`

## Integration and Automation

### CI/CD Integration

\`\`\`yaml
# .github/workflows/performance-testing.yml
name: Performance Testing Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  performance_test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
      redis:
        image: redis:7-alpine
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Performance Profiler
        run: |
          npm install -g @enterprise/perf-profiler
          perf-prof config set --ci-mode=true
      
      - name: Start Application
        run: |
          npm install
          npm run start:test &
          sleep 30  # Wait for app to start
      
      - name: Run Performance Tests
        run: |
          perf-prof load test --config=ci-config.yml
          perf-prof analyze performance --format=json > results.json
      
      - name: Check Performance Regressions
        run: |
          perf-prof compare --baseline=main --current=HEAD --fail-on-regression
      
      - name: Generate Reports
        run: |
          perf-prof report generate --format=html --output=performance-report.html
          perf-prof report summary --format=markdown > performance-summary.md
      
      - name: Upload Reports
        uses: actions/upload-artifact@v3
        with:
          name: performance-reports
          path: |
            performance-report.html
            performance-summary.md
            results.json

      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const summary = fs.readFileSync('performance-summary.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: \`## Performance Test Results\\n\\n\${summary}\`
            });
\`\`\`

### Monitoring Integration

\`\`\`yaml
# kubernetes/performance-profiler.yml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: performance-profiler
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: performance-profiler
  template:
    metadata:
      labels:
        app: performance-profiler
    spec:
      containers:
      - name: profiler
        image: enterprise/perf-profiler:latest
        env:
        - name: PROFILER_MODE
          value: "continuous"
        - name: PROFILER_TARGETS
          value: "user-service,auth-service,data-service"
        - name: PROFILER_SAMPLE_RATE
          value: "100"  # Lower rate for production
        volumeMounts:
        - name: profiles
          mountPath: /data/profiles
        - name: config
          mountPath: /etc/profiler
        resources:
          requests:
            cpu: 100m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi
      volumes:
      - name: profiles
        persistentVolumeClaim:
          claimName: profiler-storage
      - name: config
        configMap:
          name: profiler-config

---
apiVersion: v1
kind: Service
metadata:
  name: performance-profiler
  namespace: monitoring
spec:
  selector:
    app: performance-profiler
  ports:
  - name: metrics
    port: 8080
    targetPort: 8080
  - name: api
    port: 8081
    targetPort: 8081
\`\`\`

## Usage Examples

### Development Workflow

\`\`\`bash
# During development
perf-prof dev start                 # Start development profiling
perf-prof dev watch                 # Watch for performance changes
perf-prof dev analyze --functions   # Analyze function performance

# Before commit
perf-prof test performance          # Run performance tests
perf-prof analyze regressions       # Check for regressions
perf-prof report generate           # Create performance report

# Debugging performance issues
perf-prof debug --issue=slow-response
perf-prof trace --request-id=abc123
perf-prof compare --before=v1.0 --after=HEAD
\`\`\`

### Production Monitoring

\`\`\`bash
# Production performance monitoring
perf-prof monitor production --continuous
perf-prof alert setup --cpu=80% --memory=90% --response-time=500ms
perf-prof dashboard start --port=8080

# Incident response
perf-prof incident analyze --timestamp="2024-02-01 14:30:00"
perf-prof trace emergency --duration=60s
perf-prof report incident --id=INC-123

# Capacity planning
perf-prof capacity analyze --forecast=30d
perf-prof capacity recommend --target-growth=50%
perf-prof cost optimize --budget=10000
\`\`\`

};