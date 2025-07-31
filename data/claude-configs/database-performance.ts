import { ClaudeMdConfig } from '../types';

export const databasePerformanceConfigs: ClaudeMdConfig[] = [
  {
    id: 'database-performance-engineering',
    title: 'Database Performance Engineering',
    slug: 'database-performance-engineering-optimization',
    description: 'Advanced database performance optimization with query tuning, indexing strategies, connection pooling, monitoring, and scaling techniques for high-performance data-intensive applications.',
    category: 'Claude.md Configurations',
    tags: ['database', 'performance', 'optimization', 'indexing', 'query-tuning', 'monitoring', 'scaling'],
    difficulty: 'ADVANCED',
    language: 'SQL',
    framework: 'PostgreSQL + Redis + Monitoring Stack',
    content: `# Claude.md - Database Performance Engineering

## Project Overview

This is an advanced database performance engineering configuration designed for building high-performance, scalable data-intensive applications. It covers comprehensive database optimization strategies including query performance tuning, advanced indexing, connection pooling, caching strategies, monitoring, and horizontal scaling techniques for handling massive data workloads efficiently.

## Performance Engineering Philosophy

### Core Principles
1. **Measure First**: Always measure before optimizing
2. **Index Strategically**: Right indexes for the right queries
3. **Connection Efficiency**: Optimize connection usage and pooling
4. **Cache Intelligently**: Multi-layer caching strategies
5. **Scale Horizontally**: Design for horizontal scaling from day one
6. **Monitor Continuously**: Real-time performance monitoring and alerting
7. **Plan for Growth**: Design for 10x current load

### Performance Optimization Areas
- **Query Optimization**: Efficient SQL queries and execution plans
- **Indexing Strategy**: Optimal index design and maintenance
- **Connection Management**: Connection pooling and lifecycle management
- **Caching Layers**: Application, query, and result caching
- **Database Tuning**: Configuration optimization for workload
- **Monitoring & Alerting**: Comprehensive performance monitoring
- **Scaling Strategies**: Read replicas, sharding, and partitioning

## Technology Stack

- **Primary Database**: PostgreSQL 15+ with advanced extensions
- **Caching Layer**: Redis Cluster with persistence
- **Connection Pooling**: PgBouncer, pgpool-II
- **Monitoring**: Prometheus + Grafana + pg_stat_statements
- **Query Analysis**: EXPLAIN ANALYZE, pg_stat_statements, pgBadger
- **Load Testing**: pgbench, k6, Artillery
- **Replication**: Streaming replication with hot standby
- **Backup & Recovery**: WAL-E, pgBackRest

## Project Structure

\`\`\`
database-performance-engineering/
├── database/                      # Database configurations and schemas
│   ├── postgresql/                # PostgreSQL specific configurations
│   │   ├── postgresql.conf        # Main PostgreSQL configuration
│   │   ├── pg_hba.conf           # Authentication configuration
│   │   ├── recovery.conf         # Recovery configuration
│   │   └── extensions/           # Custom extensions and functions
│   │       ├── btree_gin.sql     # GIN index optimizations
│   │       ├── pg_stat_statements.sql
│   │       └── custom_functions.sql
│   ├── schemas/                  # Database schema definitions
│   │   ├── migrations/           # Schema migrations
│   │   ├── indexes/              # Index definitions
│   │   │   ├── btree_indexes.sql # B-tree indexes
│   │   │   ├── gin_indexes.sql   # GIN indexes for JSON/arrays
│   │   │   ├── gist_indexes.sql  # GiST indexes for geometric data
│   │   │   └── partial_indexes.sql # Conditional indexes
│   │   ├── partitions/           # Table partitioning
│   │   │   ├── time_partitions.sql
│   │   │   ├── hash_partitions.sql
│   │   │   └── range_partitions.sql
│   │   └── views/                # Materialized and regular views
│   │       ├── analytics_views.sql
│   │       └── performance_views.sql
│   └── redis/                    # Redis configuration
│       ├── redis.conf            # Redis main configuration
│       ├── cluster.conf          # Redis cluster configuration
│       └── sentinel.conf         # Redis Sentinel configuration
├── connection-pooling/           # Connection management
│   ├── pgbouncer/               # PgBouncer configuration
│   │   ├── pgbouncer.ini        # Main configuration
│   │   ├── userlist.txt         # User authentication
│   │   └── auth_query.sql       # Authentication query
│   ├── pgpool/                  # pgpool-II configuration
│   │   ├── pgpool.conf          # Main pgpool configuration
│   │   ├── pcp.conf             # PCP configuration
│   │   └── pool_hba.conf        # Host-based authentication
│   └── application/             # Application-level pooling
│       ├── connection-pool.ts    # Custom connection pool
│       ├── pool-monitor.ts      # Pool monitoring
│       └── pool-config.ts       # Pool configuration
├── optimization/                # Performance optimization
│   ├── query-optimization/      # Query optimization techniques
│   │   ├── query-analyzer.ts    # Query analysis tools
│   │   ├── index-advisor.ts     # Index recommendation engine
│   │   ├── execution-planner.ts # Execution plan analyzer
│   │   └── slow-query-detector.ts # Slow query detection
│   ├── indexing/                # Advanced indexing strategies
│   │   ├── index-strategies.sql # Index strategy examples
│   │   ├── composite-indexes.sql # Multi-column indexes
│   │   ├── functional-indexes.sql # Expression-based indexes
│   │   └── covering-indexes.sql  # Covering index examples
│   ├── caching/                 # Caching implementations
│   │   ├── query-cache.ts       # Query result caching
│   │   ├── redis-cache.ts       # Redis caching layer
│   │   ├── application-cache.ts # Application-level caching
│   │   └── cache-strategies.ts  # Cache invalidation strategies
│   └── partitioning/            # Data partitioning
│       ├── partition-manager.ts # Partition management
│       ├── time-based-partitioning.sql
│       ├── hash-partitioning.sql
│       └── partition-pruning.sql
├── monitoring/                  # Performance monitoring
│   ├── metrics/                 # Metrics collection
│   │   ├── postgres-exporter.yml # Prometheus PostgreSQL exporter
│   │   ├── redis-exporter.yml   # Redis metrics exporter
│   │   └── custom-metrics.ts    # Custom performance metrics
│   ├── dashboards/              # Grafana dashboards
│   │   ├── postgres-performance.json
│   │   ├── query-performance.json
│   │   ├── connection-pool.json
│   │   └── cache-performance.json
│   ├── alerts/                  # Alert configurations
│   │   ├── performance-alerts.yml
│   │   ├── connection-alerts.yml
│   │   └── disk-space-alerts.yml
│   └── scripts/                 # Monitoring scripts
│       ├── health-check.sh      # Database health check
│       ├── performance-report.py # Performance reporting
│       └── slow-query-analysis.sql
├── scaling/                     # Scaling strategies
│   ├── replication/             # Database replication
│   │   ├── master-slave-setup.sh
│   │   ├── streaming-replication.conf
│   │   └── failover-scripts.sh
│   ├── sharding/                # Database sharding
│   │   ├── shard-manager.ts     # Shard management
│   │   ├── consistent-hashing.ts # Consistent hashing for sharding
│   │   └── cross-shard-queries.ts # Cross-shard query handling
│   └── read-replicas/           # Read replica management
│       ├── replica-setup.sh     # Read replica setup
│       ├── load-balancer.conf   # Load balancer configuration
│       └── replica-monitoring.ts # Replica lag monitoring
├── testing/                     # Performance testing
│   ├── benchmarks/              # Database benchmarks
│   │   ├── pgbench-tests.sh     # pgbench test suites
│   │   ├── custom-benchmarks.sql # Custom benchmark queries
│   │   └── load-testing.js      # Application load testing
│   ├── stress-tests/            # Stress testing
│   │   ├── connection-stress.js # Connection pool stress test
│   │   ├── query-stress.sql     # Query stress testing
│   │   └── concurrent-writes.js # Concurrent write testing
│   └── migration-tests/         # Migration performance testing
│       ├── migration-benchmark.sql
│       └── zero-downtime-migration.sql
├── backup-recovery/             # Backup and recovery
│   ├── backup-strategies/       # Backup configurations
│   │   ├── continuous-archiving.conf
│   │   ├── point-in-time-recovery.sh
│   │   └── logical-replication.conf
│   └── disaster-recovery/       # Disaster recovery
│       ├── failover-procedures.md
│       ├── backup-verification.sh
│       └── recovery-testing.sh
└── tools/                       # Performance tools and utilities
    ├── query-analyzer/          # Query analysis tools
    │   ├── explain-analyzer.ts  # EXPLAIN output analyzer
    │   ├── query-profiler.ts    # Query performance profiler
    │   └── index-usage-analyzer.ts # Index usage analysis
    ├── migration-tools/         # Database migration tools
    │   ├── migration-planner.ts # Migration planning tool
    │   ├── schema-diff.ts       # Schema comparison tool
    │   └── data-migration.ts    # Data migration utilities
    └── maintenance/             # Database maintenance
        ├── vacuum-scheduler.ts   # Automated VACUUM scheduling
        ├── analyze-scheduler.ts  # Statistics update scheduling
        └── index-maintenance.ts  # Index maintenance automation
\`\`\`

## PostgreSQL Configuration Optimization

### High-Performance postgresql.conf
\`\`\`ini
# /etc/postgresql/15/main/postgresql.conf
# High-Performance PostgreSQL Configuration

#------------------------------------------------------------------------------
# CONNECTIONS AND AUTHENTICATION
#------------------------------------------------------------------------------
max_connections = 200                    # Adjust based on connection pooling
superuser_reserved_connections = 3

#------------------------------------------------------------------------------
# RESOURCE USAGE (except WAL)
#------------------------------------------------------------------------------
# Memory Configuration
shared_buffers = 4GB                     # 25% of RAM for dedicated server
huge_pages = try                         # Enable huge pages if available
temp_buffers = 32MB                      # Temporary table buffer
work_mem = 64MB                          # Per-operation memory (sort, hash)
maintenance_work_mem = 1GB               # VACUUM, CREATE INDEX memory
autovacuum_work_mem = 512MB             # Autovacuum memory
max_stack_depth = 7MB

# Background Writer
bgwriter_delay = 200ms                   # Background writer delay
bgwriter_lru_maxpages = 100             # Pages written per round
bgwriter_lru_multiplier = 2.0           # LRU scan multiplier
bgwriter_flush_after = 512kB            # Flush after this much data

# Asynchronous Behavior
effective_io_concurrency = 4            # Concurrent I/O operations
max_worker_processes = 8                 # Maximum worker processes
max_parallel_workers_per_gather = 4     # Parallel workers per node
max_parallel_workers = 8                # Maximum parallel workers
max_parallel_maintenance_workers = 4    # Parallel maintenance workers

#------------------------------------------------------------------------------
# WRITE AHEAD LOG (WAL)
#------------------------------------------------------------------------------
wal_level = replica                      # Enable replication
wal_buffers = 16MB                       # WAL buffer size
wal_writer_delay = 200ms                 # WAL writer delay
wal_writer_flush_after = 1MB            # WAL writer flush threshold

# Checkpoints
checkpoint_timeout = 15min               # Checkpoint timeout
checkpoint_completion_target = 0.9      # Checkpoint completion target
max_wal_size = 4GB                      # Maximum WAL size
min_wal_size = 1GB                      # Minimum WAL size
checkpoint_flush_after = 256kB          # Checkpoint flush threshold

# Archiving
archive_mode = on                        # Enable WAL archiving
archive_command = 'test ! -f /var/lib/postgresql/wal_archive/%f && cp %p /var/lib/postgresql/wal_archive/%f'
archive_timeout = 300                    # Archive timeout (5 minutes)

#------------------------------------------------------------------------------
# REPLICATION
#------------------------------------------------------------------------------
max_wal_senders = 10                     # Maximum WAL senders
wal_keep_size = 1GB                     # Keep WAL segments
max_replication_slots = 10               # Maximum replication slots
hot_standby = on                        # Enable hot standby
wal_receiver_timeout = 60s              # WAL receiver timeout
max_standby_streaming_delay = 30s       # Standby streaming delay

#------------------------------------------------------------------------------
# QUERY TUNING
#------------------------------------------------------------------------------
# Planner Configuration
random_page_cost = 1.1                  # SSD-optimized random page cost
seq_page_cost = 1.0                     # Sequential page cost
cpu_tuple_cost = 0.01                   # CPU tuple processing cost
cpu_index_tuple_cost = 0.005            # CPU index tuple cost
cpu_operator_cost = 0.0025              # CPU operator cost
parallel_tuple_cost = 0.1               # Parallel tuple cost
parallel_setup_cost = 1000.0            # Parallel setup cost

# Planner Method Configuration
enable_bitmapscan = on
enable_hashagg = on
enable_hashjoin = on
enable_indexscan = on
enable_indexonlyscan = on
enable_material = on
enable_mergejoin = on
enable_nestloop = on
enable_parallel_append = on
enable_parallel_hash = on
enable_seqscan = on
enable_sort = on
enable_tidscan = on

# Genetic Query Optimizer
geqo = on
geqo_threshold = 12
geqo_effort = 5
geqo_pool_size = 0
geqo_generations = 0
geqo_selection_bias = 2.0
geqo_seed = 0.0

#------------------------------------------------------------------------------
# ERROR REPORTING AND LOGGING
#------------------------------------------------------------------------------
logging_collector = on
log_directory = '/var/log/postgresql'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_file_mode = 0600
log_rotation_age = 1d
log_rotation_size = 100MB
log_truncate_on_rotation = on

# What to Log
log_min_duration_statement = 1000       # Log slow queries (1 second)
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on
log_temp_files = 10MB                   # Log temp files > 10MB
log_autovacuum_min_duration = 0         # Log all autovacuum activity
log_error_verbosity = default
log_hostname = off
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
log_statement = 'ddl'                   # Log DDL statements
log_replication_commands = on

#------------------------------------------------------------------------------
# RUNTIME STATISTICS
#------------------------------------------------------------------------------
track_activities = on
track_counts = on
track_io_timing = on                    # Track I/O timing
track_functions = pl                    # Track function calls
track_activity_query_size = 4096        # Query text size in pg_stat_activity
stats_temp_directory = '/var/run/postgresql/15-main.pg_stat_tmp'

#------------------------------------------------------------------------------
# AUTOVACUUM PARAMETERS
#------------------------------------------------------------------------------
autovacuum = on                         # Enable autovacuum
log_autovacuum_min_duration = 0         # Log all autovacuum activity
autovacuum_max_workers = 4              # Maximum autovacuum workers
autovacuum_naptime = 1min               # Autovacuum sleep time
autovacuum_vacuum_threshold = 50        # Minimum tuple updates for vacuum
autovacuum_analyze_threshold = 50       # Minimum tuple updates for analyze
autovacuum_vacuum_scale_factor = 0.1    # Vacuum scale factor
autovacuum_analyze_scale_factor = 0.05  # Analyze scale factor
autovacuum_freeze_max_age = 200000000   # Freeze max age
autovacuum_multixact_freeze_max_age = 400000000
autovacuum_vacuum_cost_delay = 10ms     # Vacuum cost delay
autovacuum_vacuum_cost_limit = 1000     # Vacuum cost limit

#------------------------------------------------------------------------------
# CLIENT CONNECTION DEFAULTS
#------------------------------------------------------------------------------
search_path = '"$user", public'
default_tablespace = ''
temp_tablespaces = ''
check_function_bodies = on
default_transaction_isolation = 'read committed'
default_transaction_read_only = off
default_transaction_deferrable = off
session_replication_role = 'origin'
statement_timeout = 300s                # 5 minute statement timeout
lock_timeout = 60s                      # 1 minute lock timeout
idle_in_transaction_session_timeout = 600s # 10 minute idle timeout
vacuum_freeze_min_age = 50000000
vacuum_freeze_table_age = 150000000
vacuum_multixact_freeze_min_age = 5000000
vacuum_multixact_freeze_table_age = 150000000
bytea_output = 'hex'
xmlbinary = 'base64'
xmloption = 'content'
gin_fuzzy_search_limit = 0
gin_pending_list_limit = 4MB

#------------------------------------------------------------------------------
# EXTENSIONS
#------------------------------------------------------------------------------
shared_preload_libraries = 'pg_stat_statements,auto_explain,pg_prewarm'

# pg_stat_statements configuration
pg_stat_statements.max = 10000
pg_stat_statements.track = all
pg_stat_statements.track_utility = on
pg_stat_statements.save = on

# auto_explain configuration
auto_explain.log_min_duration = 5s
auto_explain.log_analyze = on
auto_explain.log_buffers = on
auto_explain.log_timing = on
auto_explain.log_triggers = on
auto_explain.log_verbose = on
auto_explain.log_nested_statements = on
\`\`\`

## Advanced Indexing Strategies

### Composite and Covering Indexes
\`\`\`sql
-- Advanced Indexing Examples
-- covering-indexes.sql

-- Covering Index for Common Query Patterns
-- Includes all columns needed for a query to avoid table lookup
CREATE INDEX CONCURRENTLY idx_users_covering_profile 
ON users (status, created_at) 
INCLUDE (id, email, first_name, last_name, last_login_at)
WHERE status = 'active';

-- Multi-Column Index with Optimal Column Ordering
-- Most selective column first, then by query frequency
CREATE INDEX CONCURRENTLY idx_orders_customer_status_date 
ON orders (customer_id, status, created_at DESC)
WHERE status IN ('pending', 'processing', 'shipped');

-- Partial Index for Sparse Data
-- Only index rows that will be frequently queried
CREATE INDEX CONCURRENTLY idx_products_featured 
ON products (category_id, price) 
WHERE is_featured = true AND status = 'active';

-- Functional Index for Computed Values
-- Index on expression results for faster lookups
CREATE INDEX CONCURRENTLY idx_users_email_domain 
ON users (LOWER(SPLIT_PART(email, '@', 2)))
WHERE email IS NOT NULL;

-- GIN Index for Full-Text Search and Arrays
CREATE INDEX CONCURRENTLY idx_articles_search_vector 
ON articles USING gin(to_tsvector('english', title || ' ' || content));

CREATE INDEX CONCURRENTLY idx_products_tags 
ON products USING gin(tags)
WHERE array_length(tags, 1) > 0;

-- GiST Index for Range and Geometric Data
CREATE INDEX CONCURRENTLY idx_events_daterange 
ON events USING gist(tstzrange(start_time, end_time));

CREATE INDEX CONCURRENTLY idx_locations_geospatial 
ON locations USING gist(coordinates);

-- Hash Index for Equality Lookups (PostgreSQL 10+)
CREATE INDEX CONCURRENTLY idx_sessions_token_hash 
ON user_sessions USING hash(session_token);

-- BRIN Index for Large Sequential Data
-- Excellent for time-series data with natural ordering
CREATE INDEX CONCURRENTLY idx_logs_timestamp_brin 
ON application_logs USING brin(created_at, log_level);

-- Index Maintenance Query
-- Monitor index usage and identify unused indexes
CREATE OR REPLACE VIEW index_usage_stats AS
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_tup_read,
    idx_tup_fetch,
    idx_scan,
    pg_size_pretty(pg_relation_size(indexrelid)) as size,
    CASE 
        WHEN idx_scan = 0 THEN 'Never Used'
        WHEN idx_scan < 100 THEN 'Rarely Used'
        WHEN idx_scan < 1000 THEN 'Moderately Used'
        ELSE 'Frequently Used'
    END as usage_category
FROM pg_stat_user_indexes 
ORDER BY idx_scan ASC, pg_relation_size(indexrelid) DESC;

-- Index Bloat Detection
CREATE OR REPLACE VIEW index_bloat_analysis AS
WITH index_stats AS (
    SELECT 
        schemaname,
        tablename,
        indexname,
        idx_scan,
        idx_tup_read,
        idx_tup_fetch,
        pg_relation_size(indexrelid) as index_size,
        pg_stat_get_live_tuples(relid) as live_tuples,
        pg_stat_get_dead_tuples(relid) as dead_tuples
    FROM pg_stat_user_indexes
    JOIN pg_class ON pg_class.oid = indexrelid
)
SELECT 
    *,
    CASE 
        WHEN dead_tuples > live_tuples * 0.1 THEN 'High Bloat'
        WHEN dead_tuples > live_tuples * 0.05 THEN 'Medium Bloat'
        ELSE 'Low Bloat'
    END as bloat_level,
    pg_size_pretty(index_size) as formatted_size
FROM index_stats
WHERE live_tuples > 0
ORDER BY dead_tuples::float / NULLIF(live_tuples, 0) DESC;
\`\`\`

## Connection Pool Management

### Advanced Connection Pool Implementation
\`\`\`typescript
// connection-pooling/application/connection-pool.ts
import { Pool, PoolClient, PoolConfig } from 'pg';
import { EventEmitter } from 'events';

export interface ConnectionPoolMetrics {
  totalConnections: number;
  idleConnections: number;
  activeConnections: number;
  waitingClients: number;
  totalQueries: number;
  averageQueryTime: number;
  errorRate: number;
  connectionErrors: number;
  poolUptime: number;
}

export interface AdvancedPoolConfig extends PoolConfig {
  acquireTimeoutMillis?: number;
  createTimeoutMillis?: number;
  destroyTimeoutMillis?: number;
  reapIntervalMillis?: number;
  createRetryIntervalMillis?: number;
  maxUses?: number;
  maxLifetimeSeconds?: number;
  testOnBorrow?: boolean;
  testOnReturn?: boolean;
  validationQuery?: string;
  slowQueryThreshold?: number;
  monitoringInterval?: number;
}

export class AdvancedConnectionPool extends EventEmitter {
  private pool: Pool;
  private config: AdvancedPoolConfig;
  private metrics: ConnectionPoolMetrics;
  private queryTimes: number[] = [];
  private errors: Error[] = [];
  private startTime: number;
  private monitoringTimer?: NodeJS.Timeout;

  constructor(config: AdvancedPoolConfig) {
    super();
    this.config = {
      max: 20,                    // Maximum pool size
      min: 5,                     // Minimum pool size
      idleTimeoutMillis: 30000,   // 30 seconds idle timeout
      connectionTimeoutMillis: 10000, // 10 seconds connection timeout
      acquireTimeoutMillis: 60000, // 1 minute acquire timeout
      maxUses: 7500,              // Max uses per connection
      maxLifetimeSeconds: 3600,   // 1 hour max lifetime
      testOnBorrow: true,
      validationQuery: 'SELECT 1',
      slowQueryThreshold: 1000,   // 1 second
      monitoringInterval: 30000,  // 30 seconds
      ...config
    };

    this.pool = new Pool(this.config);
    this.startTime = Date.now();
    this.initializeMetrics();
    this.setupEventListeners();
    this.startMonitoring();
  }

  private initializeMetrics(): void {
    this.metrics = {
      totalConnections: 0,
      idleConnections: 0,
      activeConnections: 0,
      waitingClients: 0,
      totalQueries: 0,
      averageQueryTime: 0,
      errorRate: 0,
      connectionErrors: 0,
      poolUptime: 0
    };
  }

  private setupEventListeners(): void {
    this.pool.on('connect', (client: PoolClient) => {
      this.metrics.totalConnections++;
      this.emit('connection:created', { totalConnections: this.metrics.totalConnections });
    });

    this.pool.on('acquire', (client: PoolClient) => {
      this.emit('connection:acquired', { 
        idleCount: this.pool.idleCount,
        totalCount: this.pool.totalCount 
      });
    });

    this.pool.on('release', (client: PoolClient) => {
      this.emit('connection:released', { 
        idleCount: this.pool.idleCount,
        totalCount: this.pool.totalCount 
      });
    });

    this.pool.on('remove', (client: PoolClient) => {
      this.metrics.totalConnections--;
      this.emit('connection:removed', { totalConnections: this.metrics.totalConnections });
    });

    this.pool.on('error', (error: Error) => {
      this.metrics.connectionErrors++;
      this.errors.push(error);
      this.emit('pool:error', error);
    });
  }

  async query(text: string, params?: any[]): Promise<any> {
    const startTime = Date.now();
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();
      
      // Validate connection if configured
      if (this.config.testOnBorrow) {
        await client.query(this.config.validationQuery!);
      }

      const result = await client.query(text, params);
      const queryTime = Date.now() - startTime;
      
      this.recordQueryMetrics(queryTime, false);
      
      // Log slow queries
      if (queryTime > this.config.slowQueryThreshold!) {
        this.emit('query:slow', { query: text, duration: queryTime, params });
      }

      return result;
    } catch (error) {
      const queryTime = Date.now() - startTime;
      this.recordQueryMetrics(queryTime, true);
      this.emit('query:error', { query: text, error, duration: queryTime });
      throw error;
    } finally {
      if (client) {
        // Validate connection before returning if configured
        if (this.config.testOnReturn) {
          try {
            await client.query(this.config.validationQuery!);
          } catch (error) {
            // Connection is bad, remove it from pool
            client.release(error);
            client = null;
          }
        }
        
        if (client) {
          client.release();
        }
      }
    }
  }

  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  private recordQueryMetrics(queryTime: number, isError: boolean): void {
    this.metrics.totalQueries++;
    this.queryTimes.push(queryTime);
    
    // Keep only last 1000 query times for average calculation
    if (this.queryTimes.length > 1000) {
      this.queryTimes.shift();
    }
    
    // Calculate average query time
    this.metrics.averageQueryTime = 
      this.queryTimes.reduce((sum, time) => sum + time, 0) / this.queryTimes.length;
    
    // Calculate error rate
    if (isError) {
      this.errors.push(new Error('Query error'));
    }
    
    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors.shift();
    }
    
    this.metrics.errorRate = (this.errors.length / Math.min(this.metrics.totalQueries, 100)) * 100;
  }

  private startMonitoring(): void {
    if (this.config.monitoringInterval) {
      this.monitoringTimer = setInterval(() => {
        this.updateMetrics();
        this.emit('metrics:updated', this.getMetrics());
      }, this.config.monitoringInterval);
    }
  }

  private updateMetrics(): void {
    this.metrics.totalConnections = this.pool.totalCount;
    this.metrics.idleConnections = this.pool.idleCount;
    this.metrics.activeConnections = this.pool.totalCount - this.pool.idleCount;
    this.metrics.waitingClients = this.pool.waitingCount;
    this.metrics.poolUptime = Date.now() - this.startTime;
  }

  getMetrics(): ConnectionPoolMetrics {
    this.updateMetrics();
    return { ...this.metrics };
  }

  getPoolInfo(): {
    totalCount: number;
    idleCount: number;
    waitingCount: number;
    config: AdvancedPoolConfig;
  } {
    return {
      totalCount: this.pool.totalCount,
      idleCount: this.pool.idleCount,
      waitingCount: this.pool.waitingCount,
      config: this.config
    };
  }

  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    details: any;
  }> {
    try {
      const startTime = Date.now();
      await this.query('SELECT 1 as health_check');
      const responseTime = Date.now() - startTime;
      
      const metrics = this.getMetrics();
      
      let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
      
      // Determine health status based on metrics
      if (responseTime > 5000 || metrics.errorRate > 10 || metrics.idleConnections === 0) {
        status = 'unhealthy';
      } else if (responseTime > 1000 || metrics.errorRate > 5 || metrics.idleConnections < 2) {
        status = 'degraded';
      }
      
      return {
        status,
        details: {
          responseTime,
          metrics,
          poolInfo: this.getPoolInfo()
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          error: error.message,
          metrics: this.getMetrics()
        }
      };
    }
  }

  async close(): Promise<void> {
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
    }
    
    await this.pool.end();
    this.emit('pool:closed');
  }

  // Connection leak detection
  detectLeaks(): {
    hasLeaks: boolean;
    activeConnections: number;
    maxConnections: number;
    utilizationRate: number;
  } {
    const activeConnections = this.metrics.activeConnections;
    const maxConnections = this.config.max || 20;
    const utilizationRate = (activeConnections / maxConnections) * 100;
    
    return {
      hasLeaks: utilizationRate > 80,
      activeConnections,
      maxConnections,
      utilizationRate
    };
  }

  // Graceful pool scaling
  async scalePool(newSize: number): Promise<void> {
    // This would require custom implementation as pg doesn't support dynamic scaling
    console.log(`Scaling pool to ${newSize} connections (requires restart)`);
    this.emit('pool:scale-requested', { currentSize: this.config.max, newSize });
  }
}

// Usage Example
export class DatabaseService {
  private pool: AdvancedConnectionPool;

  constructor() {
    this.pool = new AdvancedConnectionPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'myapp',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      max: 25,
      min: 5,
      idleTimeoutMillis: 30000,
      acquireTimeoutMillis: 60000,
      slowQueryThreshold: 2000,
      monitoringInterval: 30000
    });

    // Set up event listeners for monitoring
    this.pool.on('query:slow', (event) => {
      console.warn('Slow query detected:', event);
    });

    this.pool.on('pool:error', (error) => {
      console.error('Pool error:', error);
    });

    this.pool.on('metrics:updated', (metrics) => {
      // Send metrics to monitoring system
      this.reportMetrics(metrics);
    });
  }

  private reportMetrics(metrics: ConnectionPoolMetrics): void {
    // Report to Prometheus, Grafana, etc.
    console.log('Pool metrics:', metrics);
  }

  async findUser(id: string) {
    return this.pool.query('SELECT * FROM users WHERE id = $1', [id]);
  }

  async createUser(userData: any) {
    return this.pool.transaction(async (client) => {
      const userResult = await client.query(
        'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id',
        [userData.email, userData.name]
      );
      
      await client.query(
        'INSERT INTO user_profiles (user_id, profile_data) VALUES ($1, $2)',
        [userResult.rows[0].id, userData.profile]
      );
      
      return userResult.rows[0];
    });
  }

  async getHealthStatus() {
    return this.pool.healthCheck();
  }

  async close() {
    await this.pool.close();
  }
}
\`\`\`

## Query Optimization Tools

### Query Performance Analyzer
\`\`\`typescript
// optimization/query-optimization/query-analyzer.ts
import { Pool } from 'pg';

export interface QueryPlanNode {
  nodeType: string;
  relationName?: string;
  indexName?: string;
  startupCost: number;
  totalCost: number;
  planRows: number;
  planWidth: number;
  actualTime?: [number, number];
  actualRows?: number;
  actualLoops?: number;
  buffers?: {
    shared?: { hit: number; read: number; dirtied: number; written: number };
    local?: { hit: number; read: number; dirtied: number; written: number };
    temp?: { read: number; written: number };
  };
  plans?: QueryPlanNode[];
  [key: string]: any;
}

export interface QueryAnalysis {
  query: string;
  executionTime: number;
  planningTime: number;
  totalCost: number;
  actualCost: number;
  rowsEstimate: number;
  rowsActual: number;
  indexesUsed: string[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  plan: QueryPlanNode;
}

export class QueryPerformanceAnalyzer {
  constructor(private pool: Pool) {}

  async analyzeQuery(query: string, params?: any[]): Promise<QueryAnalysis> {
    // Get execution plan with actual statistics
    const explainQuery = `EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT JSON) ${query}`;
    const result = await this.pool.query(explainQuery, params);
    
    const plan = result.rows[0]['QUERY PLAN'][0];
    const executionTime = plan['Execution Time'];
    const planningTime = plan['Planning Time'];
    
    const analysis = this.analyzePlan(plan.Plan);
    const recommendations = this.generateRecommendations(plan.Plan, query);
    const severity = this.calculateSeverity(executionTime, analysis.totalCost);

    return {
      query,
      executionTime,
      planningTime,
      totalCost: plan.Plan['Total Cost'],
      actualCost: analysis.actualCost,
      rowsEstimate: plan.Plan['Plan Rows'],
      rowsActual: analysis.actualRows,
      indexesUsed: analysis.indexesUsed,
      recommendations,
      severity,
      plan: plan.Plan
    };
  }

  private analyzePlan(plan: QueryPlanNode): {
    actualCost: number;
    actualRows: number;
    indexesUsed: string[];
  } {
    const indexesUsed: string[] = [];
    let actualCost = 0;
    let actualRows = 0;

    const traverse = (node: QueryPlanNode) => {
      if (node.actualTime) {
        actualCost += node.actualTime[1] * (node.actualLoops || 1);
      }
      
      if (node.actualRows !== undefined) {
        actualRows += node.actualRows * (node.actualLoops || 1);
      }

      if (node.indexName) {
        indexesUsed.push(node.indexName);
      }

      if (node.plans) {
        node.plans.forEach(traverse);
      }
    };

    traverse(plan);

    return {
      actualCost,
      actualRows,
      indexesUsed: [...new Set(indexesUsed)]
    };
  }

  private generateRecommendations(plan: QueryPlanNode, query: string): string[] {
    const recommendations: string[] = [];
    
    const checkNode = (node: QueryPlanNode) => {
      // Check for sequential scans on large tables
      if (node.nodeType === 'Seq Scan' && node.planRows && node.planRows > 1000) {
        recommendations.push(
          `Consider adding an index on ${node.relationName} for better performance. ` +
          `Sequential scan is processing ${node.planRows} rows.`
        );
      }

      // Check for expensive sorts
      if (node.nodeType === 'Sort' && node.totalCost > 1000) {
        recommendations.push(
          'Consider adding an index to avoid expensive sorting operation. ' +
          'Or limit the result set before sorting.'
        );
      }

      // Check for nested loops with high cost
      if (node.nodeType === 'Nested Loop' && node.totalCost > 10000) {
        recommendations.push(
          'Nested loop join is expensive. Consider optimizing join conditions ' +
          'or adding appropriate indexes.'
        );
      }

      // Check for hash joins that spill to disk
      if (node.nodeType === 'Hash Join' && node.actualTime && node.actualTime[1] > 1000) {
        recommendations.push(
          'Hash join is taking significant time. Consider increasing work_mem ' +
          'or optimizing the join condition.'
        );
      }

      // Check for row estimate accuracy
      if (node.actualRows !== undefined && node.planRows) {
        const ratio = node.actualRows / node.planRows;
        if (ratio > 10 || ratio < 0.1) {
          recommendations.push(
            `Row estimate is significantly off (estimated: ${node.planRows}, ` +
            `actual: ${node.actualRows}). Consider running ANALYZE on ${node.relationName}.`
          );
        }
      }

      // Check for buffer misses
      if (node.buffers?.shared?.read && node.buffers.shared.read > 1000) {
        recommendations.push(
          'High number of buffer reads indicates potential I/O bottleneck. ' +
          'Consider increasing shared_buffers or optimizing the query.'
        );
      }

      if (node.plans) {
        node.plans.forEach(checkNode);
      }
    };

    checkNode(plan);

    // Query-specific recommendations
    if (query.toLowerCase().includes('order by') && !query.toLowerCase().includes('limit')) {
      recommendations.push('Consider adding LIMIT clause to ORDER BY queries when possible.');
    }

    if (query.toLowerCase().includes('like') && query.includes('%')) {
      if (query.match(/'%.*%'/)) {
        recommendations.push('Leading wildcard in LIKE prevents index usage. Consider full-text search.');
      }
    }

    if (query.toLowerCase().includes('distinct') && !query.toLowerCase().includes('order by')) {
      recommendations.push('DISTINCT without ORDER BY may benefit from adding appropriate indexes.');
    }

    return recommendations;
  }

  private calculateSeverity(executionTime: number, totalCost: number): 'low' | 'medium' | 'high' | 'critical' {
    if (executionTime > 10000 || totalCost > 100000) {
      return 'critical';
    } else if (executionTime > 5000 || totalCost > 50000) {
      return 'high';
    } else if (executionTime > 1000 || totalCost > 10000) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  async getSlowQueries(limit: number = 50): Promise<Array<{
    query: string;
    calls: number;
    totalTime: number;
    meanTime: number;
    rows: number;
  }>> {
    const result = await this.pool.query(`
      SELECT 
        query,
        calls,
        total_time,
        mean_time,
        rows
      FROM pg_stat_statements 
      WHERE query NOT LIKE '%pg_stat_statements%'
        AND query NOT LIKE '%EXPLAIN%'
      ORDER BY mean_time DESC 
      LIMIT $1
    `, [limit]);

    return result.rows;
  }

  async analyzeTableStats(tableName: string): Promise<{
    rowCount: number;
    avgRowLength: number;
    indexCount: number;
    unusedIndexes: string[];
    lastAnalyzed: Date | null;
    lastVacuumed: Date | null;
  }> {
    const [statsResult, indexResult, maintenanceResult] = await Promise.all([
      this.pool.query(`
        SELECT 
          n_tup_ins + n_tup_upd + n_tup_del as row_count,
          schemaname,
          tablename
        FROM pg_stat_user_tables 
        WHERE tablename = $1
      `, [tableName]),
      
      this.pool.query(`
        SELECT 
          indexname,
          idx_scan
        FROM pg_stat_user_indexes 
        WHERE tablename = $1
      `, [tableName]),
      
      this.pool.query(`
        SELECT 
          last_analyze,
          last_vacuum
        FROM pg_stat_user_tables 
        WHERE tablename = $1
      `, [tableName])
    ]);

    const unusedIndexes = indexResult.rows
      .filter(row => row.idx_scan === 0)
      .map(row => row.indexname);

    return {
      rowCount: statsResult.rows[0]?.row_count || 0,
      avgRowLength: 0, // Would need to calculate from pg_class
      indexCount: indexResult.rows.length,
      unusedIndexes,
      lastAnalyzed: maintenanceResult.rows[0]?.last_analyze,
      lastVacuumed: maintenanceResult.rows[0]?.last_vacuum
    };
  }

  async generateIndexRecommendations(tableName: string): Promise<string[]> {
    const recommendations: string[] = [];
    
    // Analyze query patterns for this table
    const queryResult = await this.pool.query(`
      SELECT query, calls
      FROM pg_stat_statements 
      WHERE query ILIKE '%${tableName}%'
        AND query NOT LIKE '%pg_stat_statements%'
      ORDER BY calls DESC
      LIMIT 20
    `);

    // Simple heuristics for index recommendations
    for (const row of queryResult.rows) {
      const query = row.query.toLowerCase();
      
      // Look for WHERE clauses
      const whereMatch = query.match(/where\s+([\w.]+)\s*=/g);
      if (whereMatch) {
        whereMatch.forEach(match => {
          const column = match.replace(/where\s+/, '').replace(/\s*=.*/, '');
          recommendations.push(`Consider index on ${tableName}(${column}) for equality lookups`);
        });
      }

      // Look for ORDER BY clauses
      const orderMatch = query.match(/order\s+by\s+([\w.,\s]+)/g);
      if (orderMatch) {
        orderMatch.forEach(match => {
          const columns = match.replace(/order\s+by\s+/, '').replace(/\s+(asc|desc)/g, '');
          recommendations.push(`Consider index on ${tableName}(${columns}) for sorting`);
        });
      }

      // Look for JOIN conditions
      const joinMatch = query.match(/join\s+\w+\s+on\s+([\w.]+)\s*=\s*([\w.]+)/g);
      if (joinMatch) {
        joinMatch.forEach(match => {
          recommendations.push('Consider indexes on JOIN columns for better join performance');
        });
      }
    }

    return [...new Set(recommendations)]; // Remove duplicates
  }
}

// Usage Example
export async function optimizeQueryPerformance() {
  const pool = new Pool({
    // connection config
  });

  const analyzer = new QueryPerformanceAnalyzer(pool);
  
  // Analyze a specific query
  const analysis = await analyzer.analyzeQuery(
    'SELECT u.*, p.profile_data FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.email = $1',
    ['user@example.com']
  );
  
  console.log('Query Analysis:', analysis);
  
  if (analysis.severity === 'high' || analysis.severity === 'critical') {
    console.log('Recommendations:', analysis.recommendations);
  }
  
  // Get slow queries for optimization
  const slowQueries = await analyzer.getSlowQueries(10);
  console.log('Top 10 slow queries:', slowQueries);
  
  // Analyze table statistics
  const tableStats = await analyzer.analyzeTableStats('users');
  console.log('Table statistics:', tableStats);
  
  if (tableStats.unusedIndexes.length > 0) {
    console.log('Consider dropping unused indexes:', tableStats.unusedIndexes);
  }
  
  // Get index recommendations
  const indexRecommendations = await analyzer.generateIndexRecommendations('users');
  console.log('Index recommendations:', indexRecommendations);
}
\`\`\`

## Advanced Caching Strategies

### Multi-Layer Cache Implementation
\`\`\`typescript
// optimization/caching/cache-strategies.ts
import Redis from 'ioredis';
import { LRUCache } from 'lru-cache';

export interface CacheItem<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  tags: string[];
  version: number;
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  hitRate: number;
  totalOperations: number;
  averageResponseTime: number;
  memoryUsage: number;
}

export interface CacheConfig {
  levels: {
    l1?: {
      maxSize: number;
      ttl: number;
    };
    l2?: {
      redis: Redis;
      ttl: number;
    };
    l3?: {
      database: any; // Database connection
      ttl: number;
    };
  };
  compression: boolean;
  serialization: 'json' | 'msgpack';
  tags: boolean;
  metrics: boolean;
}

export class MultiLevelCache {
  private l1Cache?: LRUCache<string, CacheItem>;
  private l2Cache?: Redis;
  private l3Database?: any;
  private config: CacheConfig;
  private metrics: Map<string, CacheMetrics> = new Map();

  constructor(config: CacheConfig) {
    this.config = config;
    this.initializeCaches();
  }

  private initializeCaches(): void {
    // L1 Cache: In-memory LRU cache
    if (this.config.levels.l1) {
      this.l1Cache = new LRUCache({
        max: this.config.levels.l1.maxSize,
        ttl: this.config.levels.l1.ttl * 1000, // Convert to milliseconds
        allowStale: false,
        updateAgeOnGet: true,
        updateAgeOnHas: true
      });
    }

    // L2 Cache: Redis
    if (this.config.levels.l2) {
      this.l2Cache = this.config.levels.l2.redis;
    }

    // L3 Cache: Database
    if (this.config.levels.l3) {
      this.l3Database = this.config.levels.l3.database;
    }
  }

  async get<T>(key: string, options?: {
    tags?: string[];
    fallback?: () => Promise<T>;
    ttl?: number;
  }): Promise<T | null> {
    const startTime = Date.now();
    
    try {
      // Try L1 cache first
      if (this.l1Cache) {
        const l1Result = this.l1Cache.get(key);
        if (l1Result && this.isValid(l1Result)) {
          this.recordMetrics('L1', true, Date.now() - startTime);
          return l1Result.data;
        }
        this.recordMetrics('L1', false, Date.now() - startTime);
      }

      // Try L2 cache (Redis)
      if (this.l2Cache) {
        const l2Result = await this.l2Cache.get(key);
        if (l2Result) {
          const cacheItem = this.deserialize<CacheItem<T>>(l2Result);
          if (cacheItem && this.isValid(cacheItem)) {
            // Populate L1 cache
            if (this.l1Cache) {
              this.l1Cache.set(key, cacheItem);
            }
            this.recordMetrics('L2', true, Date.now() - startTime);
            return cacheItem.data;
          }
        }
        this.recordMetrics('L2', false, Date.now() - startTime);
      }

      // Try L3 cache (Database)
      if (this.l3Database && options?.fallback) {
        const data = await options.fallback();
        if (data !== null && data !== undefined) {
          // Store in all cache levels
          await this.set(key, data, {
            ttl: options.ttl,
            tags: options.tags
          });
          this.recordMetrics('L3', true, Date.now() - startTime);
          return data;
        }
        this.recordMetrics('L3', false, Date.now() - startTime);
      }

      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      this.recordMetrics('ERROR', false, Date.now() - startTime);
      return null;
    }
  }

  async set<T>(key: string, data: T, options?: {
    ttl?: number;
    tags?: string[];
  }): Promise<void> {
    const ttl = options?.ttl || this.getDefaultTTL();
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      tags: options?.tags || [],
      version: 1
    };

    try {
      // Set in L1 cache
      if (this.l1Cache) {
        this.l1Cache.set(key, cacheItem, { 
          ttl: ttl * 1000 // Convert to milliseconds
        });
      }

      // Set in L2 cache (Redis)
      if (this.l2Cache) {
        const serialized = this.serialize(cacheItem);
        await this.l2Cache.setex(key, ttl, serialized);
        
        // Set tags for cache invalidation
        if (options?.tags && options.tags.length > 0) {
          await this.setTags(key, options.tags);
        }
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      // Delete from L1
      if (this.l1Cache) {
        this.l1Cache.delete(key);
      }

      // Delete from L2
      if (this.l2Cache) {
        await this.l2Cache.del(key);
      }
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async invalidateByTags(tags: string[]): Promise<void> {
    if (!this.l2Cache || !this.config.tags) {
      return;
    }

    try {
      const pipeline = this.l2Cache.pipeline();
      
      for (const tag of tags) {
        const keys = await this.l2Cache.smembers(`tag:${tag}`);
        for (const key of keys) {
          pipeline.del(key);
          
          // Also remove from L1 cache
          if (this.l1Cache) {
            this.l1Cache.delete(key);
          }
        }
        pipeline.del(`tag:${tag}`);
      }
      
      await pipeline.exec();
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }

  async flush(): Promise<void> {
    try {
      if (this.l1Cache) {
        this.l1Cache.clear();
      }

      if (this.l2Cache) {
        await this.l2Cache.flushall();
      }
    } catch (error) {
      console.error('Cache flush error:', error);
    }
  }

  getMetrics(level?: string): CacheMetrics | Map<string, CacheMetrics> {
    if (level) {
      return this.metrics.get(level) || {
        hits: 0,
        misses: 0,
        hitRate: 0,
        totalOperations: 0,
        averageResponseTime: 0,
        memoryUsage: 0
      };
    }
    return this.metrics;
  }

  private isValid<T>(cacheItem: CacheItem<T>): boolean {
    const now = Date.now();
    const expiryTime = cacheItem.timestamp + (cacheItem.ttl * 1000);
    return now < expiryTime;
  }

  private async setTags(key: string, tags: string[]): Promise<void> {
    if (!this.l2Cache || !this.config.tags) {
      return;
    }

    const pipeline = this.l2Cache.pipeline();
    for (const tag of tags) {
      pipeline.sadd(`tag:${tag}`, key);
    }
    await pipeline.exec();
  }

  private serialize<T>(data: T): string {
    if (this.config.serialization === 'msgpack') {
      // Use msgpack for more efficient serialization
      // return msgpack.encode(data);
      return JSON.stringify(data); // Fallback to JSON
    }
    return JSON.stringify(data);
  }

  private deserialize<T>(data: string): T | null {
    try {
      if (this.config.serialization === 'msgpack') {
        // return msgpack.decode(Buffer.from(data));
        return JSON.parse(data); // Fallback to JSON
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Deserialization error:', error);
      return null;
    }
  }

  private getDefaultTTL(): number {
    if (this.config.levels.l2) {
      return this.config.levels.l2.ttl;
    }
    if (this.config.levels.l1) {
      return this.config.levels.l1.ttl;
    }
    return 3600; // 1 hour default
  }

  private recordMetrics(level: string, hit: boolean, responseTime: number): void {
    if (!this.config.metrics) {
      return;
    }

    let metrics = this.metrics.get(level);
    if (!metrics) {
      metrics = {
        hits: 0,
        misses: 0,
        hitRate: 0,
        totalOperations: 0,
        averageResponseTime: 0,
        memoryUsage: 0
      };
      this.metrics.set(level, metrics);
    }

    if (hit) {
      metrics.hits++;
    } else {
      metrics.misses++;
    }

    metrics.totalOperations++;
    metrics.hitRate = (metrics.hits / metrics.totalOperations) * 100;
    
    // Update average response time (simple moving average)
    metrics.averageResponseTime = 
      (metrics.averageResponseTime * (metrics.totalOperations - 1) + responseTime) / 
      metrics.totalOperations;
  }
}

// Cache-aside pattern implementation
export class CacheAsideRepository<T> {
  constructor(
    private cache: MultiLevelCache,
    private dataSource: any, // Database or API
    private keyPrefix: string = '',
    private defaultTTL: number = 3600
  ) {}

  async findById(id: string): Promise<T | null> {
    const key = `${this.keyPrefix}:id:${id}`;
    
    return this.cache.get<T>(key, {
      fallback: async () => {
        return this.dataSource.findById(id);
      },
      ttl: this.defaultTTL
    });
  }

  async save(entity: T & { id: string }): Promise<T> {
    const result = await this.dataSource.save(entity);
    
    // Invalidate cache for this entity
    const key = `${this.keyPrefix}:id:${entity.id}`;
    await this.cache.delete(key);
    
    // Invalidate related tags
    await this.cache.invalidateByTags([`${this.keyPrefix}:all`]);
    
    return result;
  }

  async findMany(criteria: any): Promise<T[]> {
    const key = `${this.keyPrefix}:query:${JSON.stringify(criteria)}`;
    
    return this.cache.get<T[]>(key, {
      fallback: async () => {
        return this.dataSource.findMany(criteria);
      },
      ttl: this.defaultTTL / 2, // Shorter TTL for query results
      tags: [`${this.keyPrefix}:all`]
    }) || [];
  }
}
\`\`\`

## Monitoring and Performance Metrics

### Comprehensive Database Monitoring
\`\`\`typescript
// monitoring/metrics/database-monitor.ts
import { Pool } from 'pg';
import { EventEmitter } from 'events';

export interface DatabaseMetrics {
  connections: {
    active: number;
    idle: number;
    total: number;
    maxConnections: number;
    utilization: number;
  };
  queries: {
    totalQueries: number;
    slowQueries: number;
    averageQueryTime: number;
    queriesPerSecond: number;
  };
  performance: {
    cacheHitRatio: number;
    indexHitRatio: number;
    bufferHitRatio: number;
    deadlocks: number;
    blockedQueries: number;
  };
  storage: {
    databaseSize: number;
    indexSize: number;
    tableSize: Map<string, number>;
    diskUsage: number;
  };
  replication: {
    replicationLag: number;
    walSize: number;
    replicationStatus: 'healthy' | 'degraded' | 'broken';
  };
}

export class DatabaseMonitor extends EventEmitter {
  private pool: Pool;
  private metrics: DatabaseMetrics;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private alertThresholds: {
    slowQueryThreshold: number;
    connectionUtilizationThreshold: number;
    replicationLagThreshold: number;
    diskUsageThreshold: number;
  };

  constructor(pool: Pool, options?: {
    monitoringIntervalMs?: number;
    alertThresholds?: Partial<typeof this.alertThresholds>;
  }) {
    super();
    this.pool = pool;
    
    this.alertThresholds = {
      slowQueryThreshold: 5000, // 5 seconds
      connectionUtilizationThreshold: 80, // 80%
      replicationLagThreshold: 1000, // 1 second
      diskUsageThreshold: 85, // 85%
      ...options?.alertThresholds
    };

    this.initializeMetrics();
    
    if (options?.monitoringIntervalMs) {
      this.startMonitoring(options.monitoringIntervalMs);
    }
  }

  private initializeMetrics(): void {
    this.metrics = {
      connections: {
        active: 0,
        idle: 0,
        total: 0,
        maxConnections: 0,
        utilization: 0
      },
      queries: {
        totalQueries: 0,
        slowQueries: 0,
        averageQueryTime: 0,
        queriesPerSecond: 0
      },
      performance: {
        cacheHitRatio: 0,
        indexHitRatio: 0,
        bufferHitRatio: 0,
        deadlocks: 0,
        blockedQueries: 0
      },
      storage: {
        databaseSize: 0,
        indexSize: 0,
        tableSize: new Map(),
        diskUsage: 0
      },
      replication: {
        replicationLag: 0,
        walSize: 0,
        replicationStatus: 'healthy'
      }
    };
  }

  async collectMetrics(): Promise<DatabaseMetrics> {
    try {
      await Promise.all([
        this.collectConnectionMetrics(),
        this.collectQueryMetrics(),
        this.collectPerformanceMetrics(),
        this.collectStorageMetrics(),
        this.collectReplicationMetrics()
      ]);

      this.checkAlerts();
      return { ...this.metrics };
    } catch (error) {
      console.error('Error collecting database metrics:', error);
      this.emit('metrics:error', error);
      return this.metrics;
    }
  }

  private async collectConnectionMetrics(): Promise<void> {
    const result = await this.pool.query(`
      SELECT 
        setting::int as max_connections,
        (SELECT count(*) FROM pg_stat_activity) as active_connections,
        (SELECT count(*) FROM pg_stat_activity WHERE state = 'idle') as idle_connections
      FROM pg_settings 
      WHERE name = 'max_connections'
    `);

    const row = result.rows[0];
    this.metrics.connections = {
      maxConnections: row.max_connections,
      total: row.active_connections,
      idle: row.idle_connections,
      active: row.active_connections - row.idle_connections,
      utilization: (row.active_connections / row.max_connections) * 100
    };
  }

  private async collectQueryMetrics(): Promise<void> {
    const [statsResult, slowQueryResult] = await Promise.all([
      this.pool.query(`
        SELECT 
          sum(calls) as total_calls,
          avg(mean_time) as avg_query_time
        FROM pg_stat_statements 
        WHERE query NOT LIKE '%pg_stat_statements%'
      `),
      this.pool.query(`
        SELECT count(*) as slow_query_count
        FROM pg_stat_statements 
        WHERE mean_time > $1
          AND query NOT LIKE '%pg_stat_statements%'
      `, [this.alertThresholds.slowQueryThreshold])
    ]);

    const stats = statsResult.rows[0];
    const slowQueries = slowQueryResult.rows[0];

    this.metrics.queries = {
      totalQueries: parseInt(stats.total_calls) || 0,
      slowQueries: parseInt(slowQueries.slow_query_count) || 0,
      averageQueryTime: parseFloat(stats.avg_query_time) || 0,
      queriesPerSecond: 0 // Would need to calculate over time
    };
  }

  private async collectPerformanceMetrics(): Promise<void> {
    const result = await this.pool.query(`
      SELECT 
        -- Buffer hit ratio
        round(
          100.0 * sum(blks_hit) / nullif(sum(blks_hit + blks_read), 0), 2
        ) as buffer_hit_ratio,
        
        -- Index hit ratio
        round(
          100.0 * sum(idx_blks_hit) / nullif(sum(idx_blks_hit + idx_blks_read), 0), 2
        ) as index_hit_ratio
        
      FROM pg_statio_user_tables;
      
      -- Get deadlock count
      SELECT 
        deadlocks,
        conflicts
      FROM pg_stat_database 
      WHERE datname = current_database();
      
      -- Get blocked queries
      SELECT count(*) as blocked_queries
      FROM pg_stat_activity 
      WHERE wait_event_type = 'Lock';
    `);

    // This is simplified - you'd need multiple queries for complete metrics
    this.metrics.performance = {
      cacheHitRatio: 0,
      indexHitRatio: parseFloat(result.rows[0]?.index_hit_ratio) || 0,
      bufferHitRatio: parseFloat(result.rows[0]?.buffer_hit_ratio) || 0,
      deadlocks: 0,
      blockedQueries: 0
    };
  }

  private async collectStorageMetrics(): Promise<void> {
    const [dbSizeResult, tableSizeResult] = await Promise.all([
      this.pool.query(`
        SELECT pg_database_size(current_database()) as db_size
      `),
      this.pool.query(`
        SELECT 
          schemaname,
          tablename,
          pg_total_relation_size(schemaname||'.'||tablename) as size
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY size DESC
        LIMIT 20
      `)
    ]);

    const tableSize = new Map<string, number>();
    tableSizeResult.rows.forEach(row => {
      tableSize.set(row.tablename, parseInt(row.size));
    });

    this.metrics.storage = {
      databaseSize: parseInt(dbSizeResult.rows[0].db_size),
      indexSize: 0, // Would need separate query
      tableSize,
      diskUsage: 0 // Would need system-level query
    };
  }

  private async collectReplicationMetrics(): Promise<void> {
    try {
      const result = await this.pool.query(`
        SELECT 
          client_addr,
          state,
          pg_wal_lsn_diff(pg_current_wal_lsn(), flush_lsn) as replication_lag_bytes
        FROM pg_stat_replication
      `);

      if (result.rows.length > 0) {
        const maxLag = Math.max(...result.rows.map(row => 
          parseInt(row.replication_lag_bytes) || 0
        ));
        
        this.metrics.replication = {
          replicationLag: maxLag,
          walSize: 0, // Would need separate query
          replicationStatus: maxLag > this.alertThresholds.replicationLagThreshold 
            ? 'degraded' : 'healthy'
        };
      }
    } catch (error) {
      // Replication might not be configured
      this.metrics.replication = {
        replicationLag: 0,
        walSize: 0,
        replicationStatus: 'healthy'
      };
    }
  }

  private checkAlerts(): void {
    const { connections, queries, replication } = this.metrics;

    // Connection utilization alert
    if (connections.utilization > this.alertThresholds.connectionUtilizationThreshold) {
      this.emit('alert:high-connection-usage', {
        utilization: connections.utilization,
        active: connections.active,
        max: connections.maxConnections
      });
    }

    // Slow queries alert
    if (queries.slowQueries > 0) {
      this.emit('alert:slow-queries', {
        count: queries.slowQueries,
        threshold: this.alertThresholds.slowQueryThreshold
      });
    }

    // Replication lag alert
    if (replication.replicationLag > this.alertThresholds.replicationLagThreshold) {
      this.emit('alert:replication-lag', {
        lag: replication.replicationLag,
        threshold: this.alertThresholds.replicationLagThreshold
      });
    }
  }

  startMonitoring(intervalMs: number = 30000): void {
    this.monitoringInterval = setInterval(async () => {
      const metrics = await this.collectMetrics();
      this.emit('metrics:collected', metrics);
    }, intervalMs);
    
    console.log(`Database monitoring started with ${intervalMs}ms interval`);
  }

  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      console.log('Database monitoring stopped');
    }
  }

  getMetrics(): DatabaseMetrics {
    return { ...this.metrics };
  }

  async getTopSlowQueries(limit: number = 10): Promise<Array<{
    query: string;
    calls: number;
    totalTime: number;
    meanTime: number;
    minTime: number;
    maxTime: number;
    rows: number;
  }>> {
    const result = await this.pool.query(`
      SELECT 
        regexp_replace(query, '\\s+', ' ', 'g') as query,
        calls,
        total_time,
        mean_time,
        min_time,
        max_time,
        rows
      FROM pg_stat_statements 
      WHERE query NOT LIKE '%pg_stat_statements%'
        AND query NOT LIKE '%EXPLAIN%'
        AND calls > 5
      ORDER BY mean_time DESC 
      LIMIT $1
    `, [limit]);

    return result.rows;
  }

  async getBlockedQueries(): Promise<Array<{
    pid: number;
    query: string;
    waitEventType: string;
    waitEvent: string;
    blockingPid: number;
    duration: string;
  }>> {
    const result = await this.pool.query(`
      SELECT 
        blocked_locks.pid AS blocked_pid,
        blocked_activity.query AS blocked_query,
        blocked_activity.wait_event_type,
        blocked_activity.wait_event,
        blocking_locks.pid AS blocking_pid,
        blocking_activity.query AS blocking_query,
        now() - blocked_activity.query_start AS duration
      FROM pg_catalog.pg_locks blocked_locks
      JOIN pg_catalog.pg_stat_activity blocked_activity  
        ON blocked_activity.pid = blocked_locks.pid
      JOIN pg_catalog.pg_locks blocking_locks 
        ON blocking_locks.locktype = blocked_locks.locktype
        AND blocking_locks.DATABASE IS NOT DISTINCT FROM blocked_locks.DATABASE
        AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
        AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
        AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
        AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
        AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
        AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
        AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
        AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
        AND blocking_locks.pid != blocked_locks.pid
      JOIN pg_catalog.pg_stat_activity blocking_activity 
        ON blocking_activity.pid = blocking_locks.pid
      WHERE NOT blocked_locks.GRANTED
      ORDER BY duration DESC
    `);

    return result.rows.map(row => ({
      pid: row.blocked_pid,
      query: row.blocked_query,
      waitEventType: row.wait_event_type,
      waitEvent: row.wait_event,
      blockingPid: row.blocking_pid,
      duration: row.duration
    }));
  }
}

// Usage Example
export async function setupDatabaseMonitoring() {
  const pool = new Pool({
    // connection config
  });

  const monitor = new DatabaseMonitor(pool, {
    monitoringIntervalMs: 30000, // 30 seconds
    alertThresholds: {
      slowQueryThreshold: 2000, // 2 seconds
      connectionUtilizationThreshold: 75, // 75%
      replicationLagThreshold: 500, // 500ms
      diskUsageThreshold: 80 // 80%
    }
  });

  // Set up event listeners
  monitor.on('metrics:collected', (metrics) => {
    console.log('Database metrics:', metrics);
    // Send to monitoring system (Prometheus, DataDog, etc.)
  });

  monitor.on('alert:high-connection-usage', (alert) => {
    console.warn('High connection usage:', alert);
    // Send alert to notification system
  });

  monitor.on('alert:slow-queries', (alert) => {
    console.warn('Slow queries detected:', alert);
    // Log slow queries for optimization
  });

  monitor.on('alert:replication-lag', (alert) => {
    console.error('Replication lag detected:', alert);
    // Critical alert for replication issues
  });

  // Start monitoring
  monitor.startMonitoring();

  // Periodic reports
  setInterval(async () => {
    const slowQueries = await monitor.getTopSlowQueries(5);
    const blockedQueries = await monitor.getBlockedQueries();
    
    if (slowQueries.length > 0) {
      console.log('Top slow queries:', slowQueries);
    }
    
    if (blockedQueries.length > 0) {
      console.log('Blocked queries:', blockedQueries);
    }
  }, 300000); // Every 5 minutes

  return monitor;
}
\`\`\`

## Performance Testing and Benchmarking

### Database Load Testing
\`\`\`sql
-- testing/benchmarks/custom-benchmarks.sql
-- Custom Database Performance Benchmarks

-- Create test data for benchmarking
CREATE TABLE IF NOT EXISTS benchmark_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INTEGER,
    city VARCHAR(100),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS benchmark_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES benchmark_users(id),
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending'
);

-- Generate test data
INSERT INTO benchmark_users (email, first_name, last_name, age, city, country)
SELECT 
    'user' || i || '@example.com',
    'First' || i,
    'Last' || i,
    20 + (i % 50),
    CASE (i % 5) 
        WHEN 0 THEN 'New York'
        WHEN 1 THEN 'London'
        WHEN 2 THEN 'Tokyo'
        WHEN 3 THEN 'Paris'
        ELSE 'Sydney'
    END,
    CASE (i % 5) 
        WHEN 0 THEN 'USA'
        WHEN 1 THEN 'UK'
        WHEN 2 THEN 'Japan'
        WHEN 3 THEN 'France'
        ELSE 'Australia'
    END
FROM generate_series(1, 100000) AS i
ON CONFLICT (email) DO NOTHING;

-- Generate orders (multiple orders per user)
INSERT INTO benchmark_orders (user_id, product_name, quantity, price, status)
SELECT 
    (i % 100000) + 1,
    'Product ' || ((i % 1000) + 1),
    (i % 5) + 1,
    (random() * 1000)::DECIMAL(10,2),
    CASE (i % 4)
        WHEN 0 THEN 'pending'
        WHEN 1 THEN 'processing'
        WHEN 2 THEN 'shipped'
        ELSE 'delivered'
    END
FROM generate_series(1, 500000) AS i;

-- Create indexes for testing
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON benchmark_users(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_city_country ON benchmark_users(city, country);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_age ON benchmark_users(age);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_id ON benchmark_orders(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_status_date ON benchmark_orders(status, order_date);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_price ON benchmark_orders(price);

-- Update table statistics
ANALYZE benchmark_users;
ANALYZE benchmark_orders;

-- Benchmark Queries

-- 1. Simple SELECT by primary key
\\timing on
SELECT * FROM benchmark_users WHERE id = 50000;

-- 2. SELECT with WHERE clause on indexed column
SELECT * FROM benchmark_users WHERE email = 'user50000@example.com';

-- 3. SELECT with WHERE clause on non-indexed column
SELECT * FROM benchmark_users WHERE first_name = 'First50000';

-- 4. Complex JOIN query
SELECT 
    u.email,
    u.first_name,
    u.last_name,
    COUNT(o.id) as order_count,
    SUM(o.price * o.quantity) as total_spent
FROM benchmark_users u
LEFT JOIN benchmark_orders o ON u.id = o.user_id
WHERE u.country = 'USA'
    AND u.age BETWEEN 25 AND 35
GROUP BY u.id, u.email, u.first_name, u.last_name
HAVING COUNT(o.id) > 5
ORDER BY total_spent DESC
LIMIT 100;

-- 5. Aggregation query
SELECT 
    country,
    city,
    COUNT(*) as user_count,
    AVG(age) as avg_age,
    MIN(created_at) as first_user,
    MAX(created_at) as latest_user
FROM benchmark_users
GROUP BY country, city
ORDER BY user_count DESC;

-- 6. Subquery performance
SELECT *
FROM benchmark_users u
WHERE u.id IN (
    SELECT DISTINCT user_id 
    FROM benchmark_orders o
    WHERE o.price > 500
        AND o.status = 'delivered'
        AND o.order_date > NOW() - INTERVAL '30 days'
);

-- 7. Window function query
SELECT 
    u.email,
    o.price,
    o.order_date,
    ROW_NUMBER() OVER (PARTITION BY u.country ORDER BY o.price DESC) as price_rank,
    SUM(o.price) OVER (PARTITION BY u.id ORDER BY o.order_date) as running_total
FROM benchmark_users u
JOIN benchmark_orders o ON u.id = o.user_id
WHERE u.country IN ('USA', 'UK', 'Japan')
ORDER BY u.country, o.price DESC;

-- 8. UPDATE performance test
UPDATE benchmark_users 
SET updated_at = NOW()
WHERE country = 'USA' AND age > 30;

-- 9. DELETE performance test (be careful with this)
DELETE FROM benchmark_orders 
WHERE status = 'cancelled' 
    AND order_date < NOW() - INTERVAL '1 year';

-- 10. INSERT performance test
INSERT INTO benchmark_orders (user_id, product_name, quantity, price)
SELECT 
    (random() * 100000)::INTEGER + 1,
    'Benchmark Product ' || i,
    (random() * 10)::INTEGER + 1,
    (random() * 500)::DECIMAL(10,2)
FROM generate_series(1, 10000) AS i;

\\timing off

-- Performance analysis queries
-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE schemaname = 'public'
    AND tablename IN ('benchmark_users', 'benchmark_orders')
ORDER BY idx_scan DESC;

-- Check table scan statistics
SELECT 
    schemaname,
    tablename,
    seq_scan,
    seq_tup_read,
    idx_scan,
    idx_tup_fetch,
    n_tup_ins,
    n_tup_upd,
    n_tup_del
FROM pg_stat_user_tables 
WHERE schemaname = 'public'
    AND tablename IN ('benchmark_users', 'benchmark_orders');

-- Check slow queries from pg_stat_statements
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements 
WHERE query LIKE '%benchmark_%'
    AND query NOT LIKE '%pg_stat_statements%'
ORDER BY mean_time DESC
LIMIT 10;

-- Cleanup (uncomment to clean up test data)
-- DROP TABLE IF EXISTS benchmark_orders;
-- DROP TABLE IF EXISTS benchmark_users;
\`\`\`

This comprehensive database performance engineering configuration provides enterprise-grade database optimization capabilities including query analysis, connection pooling, caching strategies, monitoring, and performance testing tools for building high-performance data-intensive applications.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];