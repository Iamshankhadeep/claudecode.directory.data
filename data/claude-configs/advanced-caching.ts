import { ClaudeMdConfig } from '../types';

export const advancedCachingConfigs: ClaudeMdConfig[] = [
  {
    id: 'advanced-caching-strategies',
    title: 'Advanced Caching Strategies + Distributed Systems',
    slug: 'advanced-caching-strategies-distributed-systems',
    description: 'Comprehensive caching architecture with distributed caching, invalidation strategies, cache patterns, performance optimization, and multi-tier caching systems for high-performance applications.',
    category: 'Claude.md Configurations',
    tags: ['caching', 'redis', 'memcached', 'distributed-cache', 'performance', 'invalidation', 'cdn'],
    difficulty: 'ADVANCED',
    language: 'TypeScript',
    framework: 'Redis + CDN + Application Cache',
    content: `# Claude.md - Advanced Caching Strategies + Distributed Systems

## Project Overview

This is an advanced caching architecture designed for building high-performance, scalable applications with sophisticated caching strategies. It covers distributed caching systems, intelligent cache invalidation, cache patterns, performance optimization, and multi-tier caching architectures that can handle massive scale while maintaining consistency and optimal performance.

## Caching Philosophy

### Core Principles
1. **Cache Early, Cache Often**: Implement caching at every appropriate layer
2. **Intelligent Invalidation**: Smart cache invalidation strategies to maintain consistency
3. **Data Locality**: Keep frequently accessed data close to consumers
4. **Cache Hierarchy**: Multi-level caching from CPU to CDN
5. **Performance Monitoring**: Comprehensive cache performance analytics
6. **Graceful Degradation**: System continues to function when cache fails
7. **Cost Optimization**: Balance cache hit rates with infrastructure costs

### Caching Layers
- **Browser Cache**: Client-side caching for static assets
- **CDN Cache**: Global edge caching for content distribution
- **Load Balancer Cache**: Request-level caching at proxy layer
- **Application Cache**: In-memory application-level caching
- **Distributed Cache**: Shared cache across multiple application instances
- **Database Cache**: Query result caching and buffer pools
- **Disk Cache**: Persistent caching for larger datasets

## Technology Stack

- **Distributed Cache**: Redis Cluster, Hazelcast, Apache Ignite
- **CDN**: CloudFlare, AWS CloudFront, Azure CDN
- **In-Memory Cache**: Node.js LRU-cache, Caffeine (Java)
- **Database Cache**: PostgreSQL shared_buffers, MySQL Query Cache
- **Message Queues**: Redis Pub/Sub, Apache Kafka for invalidation
- **Monitoring**: Prometheus + Grafana for cache metrics
- **Load Testing**: Artillery, k6 for cache performance testing

## Project Structure

\`\`\`
advanced-caching-system/
├── src/
│   ├── cache/                         # Cache implementations
│   │   ├── adapters/                  # Cache adapter interfaces
│   │   │   ├── CacheAdapter.ts        # Base cache adapter interface
│   │   │   ├── RedisCacheAdapter.ts   # Redis implementation
│   │   │   ├── MemoryCacheAdapter.ts  # In-memory implementation
│   │   │   ├── HazelcastAdapter.ts    # Hazelcast implementation
│   │   │   └── CompositeCacheAdapter.ts # Multi-tier cache
│   │   ├── strategies/                # Caching strategies
│   │   │   ├── WriteThrough.ts        # Write-through strategy
│   │   │   ├── WriteBack.ts           # Write-back strategy
│   │   │   ├── WriteAround.ts         # Write-around strategy
│   │   │   ├── CacheAside.ts          # Cache-aside pattern
│   │   │   └── RefreshAhead.ts        # Refresh-ahead strategy
│   │   ├── invalidation/              # Cache invalidation
│   │   │   ├── TagBasedInvalidation.ts # Tag-based invalidation
│   │   │   ├── TimeBasedInvalidation.ts # TTL-based invalidation
│   │   │   ├── EventDrivenInvalidation.ts # Event-driven invalidation
│   │   │   ├── DependencyInvalidation.ts # Dependency-based invalidation
│   │   │   └── ManualInvalidation.ts  # Manual invalidation
│   │   ├── patterns/                  # Cache patterns
│   │   │   ├── ReadThrough.ts         # Read-through caching
│   │   │   ├── LookAside.ts           # Look-aside caching
│   │   │   ├── WriteBehind.ts         # Write-behind caching
│   │   │   ├── ReplicatedCache.ts     # Replicated caching
│   │   │   └── PartitionedCache.ts    # Partitioned caching
│   │   ├── consistency/               # Cache consistency
│   │   │   ├── EventualConsistency.ts # Eventual consistency
│   │   │   ├── StrongConsistency.ts   # Strong consistency
│   │   │   ├── CausalConsistency.ts   # Causal consistency
│   │   │   └── SessionConsistency.ts  # Session consistency
│   │   └── serialization/             # Data serialization
│   │       ├── JsonSerializer.ts      # JSON serialization
│   │       ├── MessagePackSerializer.ts # MessagePack serialization
│   │       ├── CompressedSerializer.ts # Compression support
│   │       └── CustomSerializer.ts    # Custom serialization
│   ├── distributed/                   # Distributed caching
│   │   ├── cluster/                   # Cluster management
│   │   │   ├── RedisCluster.ts        # Redis cluster setup
│   │   │   ├── ConsistentHashing.ts   # Consistent hashing
│   │   │   ├── NodeDiscovery.ts       # Node discovery
│   │   │   └── FailoverManager.ts     # Failover handling
│   │   ├── replication/               # Cache replication
│   │   │   ├── MasterSlave.ts         # Master-slave replication
│   │   │   ├── MasterMaster.ts        # Master-master replication
│   │   │   ├── AsyncReplication.ts    # Asynchronous replication
│   │   │   └── SyncReplication.ts     # Synchronous replication
│   │   ├── partitioning/              # Data partitioning
│   │   │   ├── HashPartitioning.ts    # Hash-based partitioning
│   │   │   ├── RangePartitioning.ts   # Range-based partitioning
│   │   │   ├── ConsistentHashing.ts   # Consistent hashing
│   │   │   └── VirtualNodes.ts        # Virtual node management
│   │   └── synchronization/           # Cache synchronization
│   │       ├── EventualSync.ts        # Eventual synchronization
│   │       ├── VectorClocks.ts        # Vector clock implementation
│   │       ├── MerkleTree.ts          # Merkle tree synchronization
│   │       └── AntiEntropy.ts         # Anti-entropy protocols
│   ├── performance/                   # Performance optimization
│   │   ├── optimization/              # Cache optimization
│   │   │   ├── HitRateOptimizer.ts    # Hit rate optimization
│   │   │   ├── MemoryOptimizer.ts     # Memory usage optimization
│   │   │   ├── NetworkOptimizer.ts    # Network usage optimization
│   │   │   └── LatencyOptimizer.ts    # Latency optimization
│   │   ├── warming/                   # Cache warming
│   │   │   ├── PreloadingStrategy.ts  # Cache preloading
│   │   │   ├── PredictiveWarming.ts   # Predictive cache warming
│   │   │   ├── ScheduledWarming.ts    # Scheduled cache warming
│   │   │   └── LazyWarming.ts         # Lazy cache warming
│   │   ├── eviction/                  # Eviction policies
│   │   │   ├── LRUEviction.ts         # Least Recently Used
│   │   │   ├── LFUEviction.ts         # Least Frequently Used
│   │   │   ├── TTLEviction.ts         # Time To Live
│   │   │   ├── RandomEviction.ts      # Random eviction
│   │   │   └── CustomEviction.ts      # Custom eviction policies
│   │   └── compression/               # Data compression
│   │       ├── GzipCompression.ts     # GZIP compression
│   │       ├── LZ4Compression.ts      # LZ4 compression
│   │       ├── SnappyCompression.ts   # Snappy compression
│   │       └── AdaptiveCompression.ts # Adaptive compression
│   ├── monitoring/                    # Cache monitoring
│   │   ├── metrics/                   # Metrics collection
│   │   │   ├── CacheMetrics.ts        # Cache performance metrics
│   │   │   ├── LatencyMetrics.ts      # Latency monitoring
│   │   │   ├── ThroughputMetrics.ts   # Throughput monitoring
│   │   │   └── ErrorMetrics.ts        # Error rate monitoring
│   │   ├── alerting/                  # Alert system
│   │   │   ├── HitRateAlerts.ts       # Hit rate alerts
│   │   │   ├── LatencyAlerts.ts       # Latency alerts
│   │   │   ├── MemoryAlerts.ts        # Memory usage alerts
│   │   │   └── ErrorRateAlerts.ts     # Error rate alerts
│   │   ├── dashboards/                # Monitoring dashboards
│   │   │   ├── GrafanaDashboard.json  # Grafana dashboard config
│   │   │   ├── PrometheusConfig.yml   # Prometheus configuration
│   │   │   └── AlertRules.yml         # Alert rule definitions
│   │   └── profiling/                 # Performance profiling
│   │       ├── CacheProfiler.ts       # Cache performance profiler
│   │       ├── MemoryProfiler.ts      # Memory usage profiler
│   │       └── NetworkProfiler.ts     # Network usage profiler
│   ├── cdn/                           # CDN integration
│   │   ├── providers/                 # CDN providers
│   │   │   ├── CloudFlareCDN.ts       # CloudFlare integration
│   │   │   ├── AmazonCloudFront.ts    # AWS CloudFront
│   │   │   ├── AzureCDN.ts            # Azure CDN
│   │   │   └── GenericCDN.ts          # Generic CDN interface
│   │   ├── strategies/                # CDN strategies
│   │   │   ├── EdgeCaching.ts         # Edge caching strategy
│   │   │   ├── GeoReplication.ts      # Geographic replication
│   │   │   ├── PurgeStrategy.ts       # Cache purging strategy
│   │   │   └── WarmupStrategy.ts      # CDN warmup strategy
│   │   └── optimization/              # CDN optimization
│   │       ├── CompressionStrategy.ts # Asset compression
│   │       ├── MinificationStrategy.ts # Asset minification
│   │       ├── ImageOptimization.ts   # Image optimization
│   │       └── AssetBundling.ts       # Asset bundling
│   └── testing/                       # Cache testing
│       ├── unit/                      # Unit tests
│       │   ├── CacheAdapter.test.ts   # Cache adapter tests
│       │   ├── Invalidation.test.ts   # Invalidation tests
│       │   └── Consistency.test.ts    # Consistency tests
│       ├── integration/               # Integration tests
│       │   ├── DistributedCache.test.ts # Distributed cache tests
│       │   ├── CDNIntegration.test.ts # CDN integration tests
│       │   └── PerformanceTest.ts     # Performance tests
│       ├── load-testing/              # Load testing
│       │   ├── CacheLoadTest.js       # Cache load testing
│       │   ├── ThroughputTest.js      # Throughput testing
│       │   └── LatencyTest.js         # Latency testing
│       └── chaos/                     # Chaos engineering
│           ├── CacheFailure.ts        # Cache failure simulation
│           ├── NetworkPartition.ts    # Network partition tests
│           └── NodeFailure.ts         # Node failure simulation
├── config/                            # Configuration files
│   ├── redis/                         # Redis configurations
│   │   ├── redis-cluster.conf         # Redis cluster config
│   │   ├── redis-sentinel.conf        # Redis Sentinel config
│   │   └── redis-single.conf          # Single Redis instance
│   ├── hazelcast/                     # Hazelcast configurations
│   │   ├── hazelcast-cluster.xml      # Hazelcast cluster config
│   │   └── hazelcast-client.xml       # Hazelcast client config
│   ├── cdn/                           # CDN configurations
│   │   ├── cloudflare-config.json     # CloudFlare configuration
│   │   ├── cloudfront-config.json     # AWS CloudFront config
│   │   └── azure-cdn-config.json      # Azure CDN config
│   └── monitoring/                    # Monitoring configurations
│       ├── prometheus.yml             # Prometheus config
│       ├── grafana-dashboards/        # Grafana dashboards
│       └── alert-rules.yml            # Alert rules
├── scripts/                           # Utility scripts
│   ├── setup/                         # Setup scripts
│   │   ├── setup-redis-cluster.sh     # Redis cluster setup
│   │   ├── setup-monitoring.sh        # Monitoring setup
│   │   └── setup-cdn.sh               # CDN setup
│   ├── maintenance/                   # Maintenance scripts
│   │   ├── cache-warmup.ts            # Cache warming script
│   │   ├── cache-analysis.ts          # Cache analysis script
│   │   └── cleanup-expired.ts         # Expired data cleanup
│   └── benchmarks/                    # Benchmark scripts
│       ├── cache-performance.ts       # Cache performance benchmark
│       ├── latency-benchmark.ts       # Latency benchmark
│       └── throughput-benchmark.ts    # Throughput benchmark
├── docs/                              # Documentation
│   ├── architecture.md                # Architecture documentation
│   ├── cache-patterns.md              # Cache pattern guide
│   ├── performance-tuning.md          # Performance tuning guide
│   ├── troubleshooting.md             # Troubleshooting guide
│   └── best-practices.md              # Best practices guide
└── examples/                          # Implementation examples
    ├── e-commerce/                    # E-commerce caching example
    ├── social-media/                  # Social media caching
    ├── analytics/                     # Analytics caching
    └── api-gateway/                   # API gateway caching
\`\`\`

## Advanced Cache Implementation

### Multi-Tier Cache Architecture
\`\`\`typescript
// src/cache/adapters/CompositeCacheAdapter.ts
import { EventEmitter } from 'events';

export interface CacheAdapter<T = any> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  flush(): Promise<void>;
  getMetrics(): CacheMetrics;
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  hitRate: number;
  operations: number;
  errors: number;
  avgLatency: number;
  memoryUsage: number;
  keyCount: number;
}

export interface CacheTier {
  name: string;
  adapter: CacheAdapter;
  priority: number;
  capacity: number;
  ttl: number;
  readThrough: boolean;
  writeThrough: boolean;
}

export class CompositeCacheAdapter<T = any> extends EventEmitter implements CacheAdapter<T> {
  private tiers: CacheTier[] = [];
  private metrics: Map<string, CacheMetrics> = new Map();
  private isReading = new Map<string, Promise<T | null>>();

  constructor(tiers: CacheTier[]) {
    super();
    this.tiers = tiers.sort((a, b) => a.priority - b.priority);
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    this.tiers.forEach(tier => {
      this.metrics.set(tier.name, {
        hits: 0,
        misses: 0,
        hitRate: 0,
        operations: 0,
        errors: 0,
        avgLatency: 0,
        memoryUsage: 0,
        keyCount: 0
      });
    });
  }

  async get(key: string): Promise<T | null> {
    // Prevent cache stampede by deduplicating concurrent reads
    if (this.isReading.has(key)) {
      return this.isReading.get(key)!;
    }

    const readPromise = this.performGet(key);
    this.isReading.set(key, readPromise);

    try {
      const result = await readPromise;
      return result;
    } finally {
      this.isReading.delete(key);
    }
  }

  private async performGet(key: string): Promise<T | null> {
    const startTime = Date.now();
    
    // Try each cache tier in priority order
    for (let i = 0; i < this.tiers.length; i++) {
      const tier = this.tiers[i];
      const tierStartTime = Date.now();
      
      try {
        const value = await tier.adapter.get(key);
        const latency = Date.now() - tierStartTime;
        
        if (value !== null) {
          // Cache hit - update metrics
          this.updateMetrics(tier.name, true, latency);
          
          // Populate higher-priority tiers (cache promotion)
          await this.promoteToHigherTiers(key, value, i);
          
          this.emit('cache:hit', {
            key,
            tier: tier.name,
            priority: tier.priority,
            latency: Date.now() - startTime
          });
          
          return value;
        } else {
          // Cache miss for this tier
          this.updateMetrics(tier.name, false, latency);
        }
      } catch (error) {
        // Handle cache tier error
        this.handleTierError(tier.name, error, latency);
        this.emit('cache:error', {
          key,
          tier: tier.name,
          error: error.message
        });
      }
    }

    // Complete cache miss
    this.emit('cache:miss', {
      key,
      totalLatency: Date.now() - startTime
    });

    return null;
  }

  async set(key: string, value: T, ttl?: number): Promise<void> {
    const writePromises: Promise<void>[] = [];
    
    // Write to all tiers based on their write-through configuration
    this.tiers.forEach(tier => {
      if (tier.writeThrough) {
        const effectiveTtl = ttl || tier.ttl;
        writePromises.push(
          this.writeTier(tier, key, value, effectiveTtl)
        );
      }
    });

    // Wait for all writes to complete (or handle failures gracefully)
    const results = await Promise.allSettled(writePromises);
    
    // Log any write failures
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const tier = this.tiers.filter(t => t.writeThrough)[index];
        this.emit('cache:write-error', {
          key,
          tier: tier?.name,
          error: result.reason
        });
      }
    });

    this.emit('cache:set', { key, value, ttl });
  }

  private async writeTier(tier: CacheTier, key: string, value: T, ttl: number): Promise<void> {
    const startTime = Date.now();
    
    try {
      await tier.adapter.set(key, value, ttl);
      this.updateMetrics(tier.name, true, Date.now() - startTime, 'write');
    } catch (error) {
      this.handleTierError(tier.name, error, Date.now() - startTime);
      throw error;
    }
  }

  private async promoteToHigherTiers(key: string, value: T, fromTierIndex: number): Promise<void> {
    // Promote value to higher-priority tiers
    const promotionPromises: Promise<void>[] = [];
    
    for (let i = 0; i < fromTierIndex; i++) {
      const tier = this.tiers[i];
      promotionPromises.push(
        this.writeTier(tier, key, value, tier.ttl).catch(error => {
          // Log promotion errors but don't fail the read
          this.emit('cache:promotion-error', {
            key,
            tier: tier.name,
            error: error.message
          });
        })
      );
    }

    // Execute promotions in parallel
    await Promise.allSettled(promotionPromises);
  }

  async delete(key: string): Promise<void> {
    const deletePromises = this.tiers.map(tier => 
      tier.adapter.delete(key).catch(error => {
        this.emit('cache:delete-error', {
          key,
          tier: tier.name,
          error: error.message
        });
      })
    );

    await Promise.allSettled(deletePromises);
    this.emit('cache:delete', { key });
  }

  async exists(key: string): Promise<boolean> {
    // Check existence in priority order
    for (const tier of this.tiers) {
      try {
        const exists = await tier.adapter.exists(key);
        if (exists) {
          return true;
        }
      } catch (error) {
        // Continue checking other tiers
        continue;
      }
    }
    return false;
  }

  async flush(): Promise<void> {
    const flushPromises = this.tiers.map(tier =>
      tier.adapter.flush().catch(error => {
        this.emit('cache:flush-error', {
          tier: tier.name,
          error: error.message
        });
      })
    );

    await Promise.allSettled(flushPromises);
    this.initializeMetrics(); // Reset metrics
    this.emit('cache:flush');
  }

  getMetrics(): CacheMetrics {
    // Aggregate metrics across all tiers
    const aggregated: CacheMetrics = {
      hits: 0,
      misses: 0,
      hitRate: 0,
      operations: 0,
      errors: 0,
      avgLatency: 0,
      memoryUsage: 0,
      keyCount: 0
    };

    let totalLatency = 0;
    
    this.metrics.forEach((metrics) => {
      aggregated.hits += metrics.hits;
      aggregated.misses += metrics.misses;
      aggregated.operations += metrics.operations;
      aggregated.errors += metrics.errors;
      aggregated.memoryUsage += metrics.memoryUsage;
      aggregated.keyCount += metrics.keyCount;
      totalLatency += metrics.avgLatency * metrics.operations;
    });

    aggregated.hitRate = aggregated.operations > 0 
      ? (aggregated.hits / aggregated.operations) * 100 
      : 0;
    
    aggregated.avgLatency = aggregated.operations > 0 
      ? totalLatency / aggregated.operations 
      : 0;

    return aggregated;
  }

  getTierMetrics(tierName: string): CacheMetrics | null {
    return this.metrics.get(tierName) || null;
  }

  private updateMetrics(tierName: string, hit: boolean, latency: number, operation: 'read' | 'write' = 'read'): void {
    const metrics = this.metrics.get(tierName);
    if (!metrics) return;

    metrics.operations++;
    
    if (hit) {
      metrics.hits++;
    } else {
      metrics.misses++;
    }

    metrics.hitRate = (metrics.hits / metrics.operations) * 100;
    
    // Update average latency (exponential moving average)
    const alpha = 0.1; // Smoothing factor
    metrics.avgLatency = alpha * latency + (1 - alpha) * metrics.avgLatency;
  }

  private handleTierError(tierName: string, error: any, latency: number): void {
    const metrics = this.metrics.get(tierName);
    if (metrics) {
      metrics.errors++;
      metrics.operations++;
    }

    console.error(\`Cache tier \${tierName} error:\`, error);
  }

  // Cache warming functionality
  async warmCache(keys: string[], dataLoader: (key: string) => Promise<T>): Promise<void> {
    const warmingPromises = keys.map(async (key) => {
      try {
        // Check if key already exists in any tier
        const exists = await this.exists(key);
        if (!exists) {
          // Load data and populate cache
          const data = await dataLoader(key);
          if (data !== null && data !== undefined) {
            await this.set(key, data);
          }
        }
      } catch (error) {
        this.emit('cache:warming-error', {
          key,
          error: error.message
        });
      }
    });

    await Promise.allSettled(warmingPromises);
    this.emit('cache:warmed', { keys: keys.length });
  }

  // Health check functionality
  async healthCheck(): Promise<{
    healthy: boolean;
    tiers: Array<{
      name: string;
      healthy: boolean;
      latency: number;
      error?: string;
    }>;
  }> {
    const healthChecks = await Promise.allSettled(
      this.tiers.map(async (tier) => {
        const startTime = Date.now();
        const testKey = \`health-check-\${Date.now()}\`;
        const testValue = 'health-check-value';
        
        try {
          await tier.adapter.set(testKey, testValue, 10); // 10 second TTL
          const retrieved = await tier.adapter.get(testKey);
          await tier.adapter.delete(testKey);
          
          const latency = Date.now() - startTime;
          
          return {
            name: tier.name,
            healthy: retrieved === testValue,
            latency
          };
        } catch (error) {
          return {
            name: tier.name,
            healthy: false,
            latency: Date.now() - startTime,
            error: error.message
          };
        }
      })
    );

    const results = healthChecks.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          name: this.tiers[index].name,
          healthy: false,
          latency: 0,
          error: result.reason?.message || 'Unknown error'
        };
      }
    });

    const healthy = results.every(result => result.healthy);

    return {
      healthy,
      tiers: results
    };
  }
}
\`\`\`

### Intelligent Cache Invalidation
\`\`\`typescript
// src/cache/invalidation/TagBasedInvalidation.ts
import { EventEmitter } from 'events';
import Redis from 'ioredis';

export interface InvalidationEvent {
  type: 'tag' | 'key' | 'pattern' | 'dependency';
  target: string | string[];
  reason: string;
  timestamp: number;
  source: string;
}

export interface CacheTag {
  key: string;
  tags: string[];
  dependencies: string[];
  ttl: number;
  createdAt: number;
  lastAccessed: number;
}

export class TagBasedInvalidationManager extends EventEmitter {
  private redis: Redis;
  private tagPrefix = 'cache:tag:';
  private keyPrefix = 'cache:key:';
  private dependencyPrefix = 'cache:dep:';
  private invalidationQueue = 'cache:invalidation:queue';

  constructor(redis: Redis) {
    super();
    this.redis = redis;
    this.setupInvalidationWorker();
  }

  // Tag a cache entry with multiple tags
  async tagCacheEntry(key: string, tags: string[], dependencies: string[] = [], ttl: number = 3600): Promise<void> {
    const pipeline = this.redis.pipeline();
    const now = Date.now();
    
    // Store the tag metadata
    const tagInfo: CacheTag = {
      key,
      tags,
      dependencies,
      ttl,
      createdAt: now,
      lastAccessed: now
    };
    
    pipeline.hset(\`\${this.keyPrefix}\${key}\`, tagInfo);
    pipeline.expire(\`\${this.keyPrefix}\${key}\`, ttl);
    
    // Add key to each tag set
    tags.forEach(tag => {
      pipeline.sadd(\`\${this.tagPrefix}\${tag}\`, key);
      pipeline.expire(\`\${this.tagPrefix}\${tag}\`, ttl * 2); // Tags live longer than keys
    });
    
    // Set up dependencies
    dependencies.forEach(dep => {
      pipeline.sadd(\`\${this.dependencyPrefix}\${dep}\`, key);
      pipeline.expire(\`\${this.dependencyPrefix}\${dep}\`, ttl * 2);
    });
    
    await pipeline.exec();
    
    this.emit('cache:tagged', {
      key,
      tags,
      dependencies,
      ttl
    });
  }

  // Invalidate all cache entries with specific tags
  async invalidateByTags(tags: string[], reason: string = 'Tag invalidation'): Promise<string[]> {
    const invalidatedKeys: string[] = [];
    
    for (const tag of tags) {
      const keys = await this.redis.smembers(\`\${this.tagPrefix}\${tag}\`);
      
      if (keys.length > 0) {
        // Queue invalidation for batch processing
        await this.queueInvalidation({
          type: 'tag',
          target: tag,
          reason,
          timestamp: Date.now(),
          source: 'tag-invalidation'
        });
        
        invalidatedKeys.push(...keys);
      }
    }
    
    return [...new Set(invalidatedKeys)]; // Remove duplicates
  }

  // Invalidate by dependency
  async invalidateByDependency(dependency: string, reason: string = 'Dependency change'): Promise<string[]> {
    const keys = await this.redis.smembers(\`\${this.dependencyPrefix}\${dependency}\`);
    
    if (keys.length > 0) {
      await this.queueInvalidation({
        type: 'dependency',
        target: dependency,
        reason,
        timestamp: Date.now(),
        source: 'dependency-invalidation'
      });
    }
    
    return keys;
  }

  // Invalidate by key pattern
  async invalidateByPattern(pattern: string, reason: string = 'Pattern invalidation'): Promise<string[]> {
    const keys = await this.redis.keys(pattern);
    
    if (keys.length > 0) {
      await this.queueInvalidation({
        type: 'pattern',
        target: pattern,
        reason,
        timestamp: Date.now(),
        source: 'pattern-invalidation'
      });
    }
    
    return keys;
  }

  // Smart invalidation based on cache usage patterns
  async smartInvalidation(analysisWindow: number = 3600000): Promise<{
    coldKeys: string[];
    hotKeys: string[];
    recommendations: string[];
  }> {
    const now = Date.now();
    const cutoff = now - analysisWindow;
    
    const coldKeys: string[] = [];
    const hotKeys: string[] = [];
    const recommendations: string[] = [];
    
    // Scan all cache keys for analysis
    const keyPattern = \`\${this.keyPrefix}*\`;
    const stream = this.redis.scanStream({
      match: keyPattern,
      count: 100
    });
    
    stream.on('data', async (keys: string[]) => {
      for (const keyName of keys) {
        try {
          const tagInfo = await this.redis.hgetall(keyName) as unknown as CacheTag;
          
          if (tagInfo && tagInfo.lastAccessed) {
            const lastAccessed = parseInt(tagInfo.lastAccessed.toString());
            
            if (lastAccessed < cutoff) {
              coldKeys.push(tagInfo.key);
            } else {
              hotKeys.push(tagInfo.key);
            }
          }
        } catch (error) {
          // Skip invalid entries
          continue;
        }
      }
    });
    
    return new Promise((resolve) => {
      stream.on('end', () => {
        // Generate recommendations
        if (coldKeys.length > hotKeys.length * 0.5) {
          recommendations.push('Consider reducing cache TTL or implementing more aggressive eviction');
        }
        
        if (coldKeys.length > 1000) {
          recommendations.push('Large number of cold keys detected - consider cleanup');
        }
        
        resolve({
          coldKeys,
          hotKeys,
          recommendations
        });
      });
    });
  }

  // Update access time for cache entries
  async updateAccessTime(key: string): Promise<void> {
    const keyInfo = \`\${this.keyPrefix}\${key}\`;
    await this.redis.hset(keyInfo, 'lastAccessed', Date.now());
  }

  // Get cache entry tags and metadata
  async getCacheMetadata(key: string): Promise<CacheTag | null> {
    const tagInfo = await this.redis.hgetall(\`\${this.keyPrefix}\${key}\`);
    
    if (Object.keys(tagInfo).length === 0) {
      return null;
    }
    
    return {
      key: tagInfo.key,
      tags: JSON.parse(tagInfo.tags || '[]'),
      dependencies: JSON.parse(tagInfo.dependencies || '[]'),
      ttl: parseInt(tagInfo.ttl),
      createdAt: parseInt(tagInfo.createdAt),
      lastAccessed: parseInt(tagInfo.lastAccessed)
    };
  }

  // Queue invalidation for batch processing
  private async queueInvalidation(event: InvalidationEvent): Promise<void> {
    await this.redis.lpush(this.invalidationQueue, JSON.stringify(event));
    this.emit('invalidation:queued', event);
  }

  // Process invalidation queue
  private setupInvalidationWorker(): void {
    const processQueue = async () => {
      try {
        const eventStr = await this.redis.brpop(this.invalidationQueue, 1);
        
        if (eventStr && eventStr[1]) {
          const event: InvalidationEvent = JSON.parse(eventStr[1]);
          await this.processInvalidationEvent(event);
          
          // Process next item immediately if queue is not empty
          setImmediate(processQueue);
        } else {
          // No items in queue, wait before checking again
          setTimeout(processQueue, 1000);
        }
      } catch (error) {
        console.error('Invalidation worker error:', error);
        setTimeout(processQueue, 5000); // Wait 5 seconds on error
      }
    };
    
    // Start the worker
    processQueue();
  }

  // Process individual invalidation events
  private async processInvalidationEvent(event: InvalidationEvent): Promise<void> {
    const pipeline = this.redis.pipeline();
    let keysToInvalidate: string[] = [];
    
    switch (event.type) {
      case 'tag': {
        const tag = event.target as string;
        keysToInvalidate = await this.redis.smembers(\`\${this.tagPrefix}\${tag}\`);
        
        // Remove the tag set
        pipeline.del(\`\${this.tagPrefix}\${tag}\`);
        break;
      }
      
      case 'dependency': {
        const dependency = event.target as string;
        keysToInvalidate = await this.redis.smembers(\`\${this.dependencyPrefix}\${dependency}\`);
        
        // Remove the dependency set
        pipeline.del(\`\${this.dependencyPrefix}\${dependency}\`);
        break;
      }
      
      case 'pattern': {
        const pattern = event.target as string;
        keysToInvalidate = await this.redis.keys(pattern);
        break;
      }
      
      case 'key': {
        keysToInvalidate = Array.isArray(event.target) ? event.target : [event.target];
        break;
      }
    }
    
    // Remove actual cache keys and their metadata
    keysToInvalidate.forEach(key => {
      pipeline.del(key);
      pipeline.del(\`\${this.keyPrefix}\${key}\`);
    });
    
    await pipeline.exec();
    
    this.emit('invalidation:processed', {
      event,
      keysInvalidated: keysToInvalidate.length,
      keys: keysToInvalidate
    });
  }

  // Get invalidation statistics
  async getInvalidationStats(timeWindow: number = 3600000): Promise<{
    totalInvalidations: number;
    invalidationsByType: Record<string, number>;
    averageKeysPerInvalidation: number;
    queueLength: number;
  }> {
    const queueLength = await this.redis.llen(this.invalidationQueue);
    
    // In a real implementation, you'd store invalidation history
    // For now, return basic stats
    return {
      totalInvalidations: 0,
      invalidationsByType: {
        tag: 0,
        dependency: 0,
        pattern: 0,
        key: 0
      },
      averageKeysPerInvalidation: 0,
      queueLength
    };
  }
}

// Event-driven invalidation using message queues
export class EventDrivenInvalidation extends EventEmitter {
  private tagManager: TagBasedInvalidationManager;
  private eventSubscriptions: Map<string, (data: any) => Promise<void>> = new Map();

  constructor(tagManager: TagBasedInvalidationManager, redis: Redis) {
    super();
    this.tagManager = tagManager;
    this.setupEventSubscriptions(redis);
  }

  // Subscribe to data change events
  subscribeToDataChanges(entity: string, callback: (data: any) => Promise<void>): void {
    const channel = \`data:changed:\${entity}\`;
    this.eventSubscriptions.set(channel, callback);
  }

  // Publish data change event
  async publishDataChange(entity: string, data: any): Promise<void> {
    // Publish to message queue for cache invalidation
    this.emit('data:changed', { entity, data });
    
    // Trigger cache invalidation based on entity type
    await this.handleDataChange(entity, data);
  }

  private async handleDataChange(entity: string, data: any): Promise<void> {
    // Default invalidation strategies based on entity type
    switch (entity) {
      case 'user':
        await this.tagManager.invalidateByTags([
          \`user:\${data.id}\`,
          \`user:profile:\${data.id}\`,
          'user:list'
        ], \`User \${data.id} updated\`);
        break;
        
      case 'product':
        await this.tagManager.invalidateByTags([
          \`product:\${data.id}\`,
          \`category:\${data.categoryId}\`,
          'product:list',
          'product:featured'
        ], \`Product \${data.id} updated\`);
        break;
        
      case 'order':
        await this.tagManager.invalidateByTags([
          \`order:\${data.id}\`,
          \`user:orders:\${data.userId}\`,
          'order:stats'
        ], \`Order \${data.id} updated\`);
        break;
        
      default:
        // Generic invalidation
        await this.tagManager.invalidateByTags([
          \`\${entity}:\${data.id}\`,
          \`\${entity}:list\`
        ], \`\${entity} \${data.id} updated\`);
    }
  }

  private setupEventSubscriptions(redis: Redis): void {
    // Subscribe to Redis pub/sub for data change events
    const subscriber = redis.duplicate();
    
    subscriber.on('message', async (channel: string, message: string) => {
      try {
        const data = JSON.parse(message);
        const handler = this.eventSubscriptions.get(channel);
        
        if (handler) {
          await handler(data);
        }
      } catch (error) {
        console.error('Event processing error:', error);
      }
    });
    
    // Subscribe to all data change channels
    this.eventSubscriptions.forEach((_, channel) => {
      subscriber.subscribe(channel);
    });
  }
}
\`\`\`

## Distributed Cache Cluster Management

### Redis Cluster Implementation
\`\`\`typescript
// src/distributed/cluster/RedisCluster.ts
import Redis, { Cluster } from 'ioredis';
import { EventEmitter } from 'events';

export interface ClusterNode {
  host: string;
  port: number;
  role: 'master' | 'slave';
  id: string;
  slots: number[];
  health: 'healthy' | 'degraded' | 'failed';
  lastHealthCheck: number;
}

export interface ClusterMetrics {
  totalNodes: number;
  masterNodes: number;
  slaveNodes: number;
  healthyNodes: number;
  totalSlots: number;
  coveredSlots: number;
  keyDistribution: Map<string, number>;
  networkLatency: Map<string, number>;
  memoryUsage: Map<string, number>;
}

export class RedisClusterManager extends EventEmitter {
  private cluster: Cluster;
  private nodes: Map<string, ClusterNode> = new Map();
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private rebalanceInterval: NodeJS.Timeout | null = null;

  constructor(seedNodes: Array<{ host: string; port: number }>, options?: any) {
    super();
    
    this.cluster = new Redis.Cluster(seedNodes, {
      enableReadyCheck: true,
      redisOptions: {
        password: options?.password,
        db: 0,
        family: 4,
        keepAlive: true,
        lazyConnect: true,
        maxRetriesPerRequest: 3,
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: null,
        retryDelayOnClusterDown: 300,
      },
      scaleReads: 'slave',
      maxRedirections: 16,
      retryDelayOnFailover: 100,
      enableOfflineQueue: false,
      ...options
    });

    this.setupEventListeners();
    this.startHealthMonitoring();
  }

  private setupEventListeners(): void {
    this.cluster.on('connect', () => {
      console.log('Connected to Redis cluster');
      this.updateClusterTopology();
      this.emit('cluster:connected');
    });

    this.cluster.on('ready', () => {
      console.log('Redis cluster is ready');
      this.emit('cluster:ready');
    });

    this.cluster.on('error', (error) => {
      console.error('Redis cluster error:', error);
      this.emit('cluster:error', error);
    });

    this.cluster.on('close', () => {
      console.log('Redis cluster connection closed');
      this.emit('cluster:closed');
    });

    this.cluster.on('reconnecting', () => {
      console.log('Reconnecting to Redis cluster');
      this.emit('cluster:reconnecting');
    });

    this.cluster.on('node error', (error, node) => {
      console.error(\`Node error [\${node.options.host}:\${node.options.port}]:\`, error);
      this.handleNodeError(node, error);
    });
  }

  private async updateClusterTopology(): Promise<void> {
    try {
      const clusterNodes = await this.cluster.cluster('nodes');
      const nodeLines = clusterNodes.split('\\n').filter(line => line.trim());
      
      this.nodes.clear();
      
      for (const line of nodeLines) {
        const parts = line.split(' ');
        if (parts.length < 8) continue;
        
        const [id, endpoint, flags, master, pingSent, pongRecv, configEpoch, linkState, ...slots] = parts;
        const [host, port] = endpoint.split(':');
        
        const node: ClusterNode = {
          host,
          port: parseInt(port),
          role: flags.includes('master') ? 'master' : 'slave',
          id,
          slots: this.parseSlots(slots),
          health: linkState === 'connected' ? 'healthy' : 'failed',
          lastHealthCheck: Date.now()
        };
        
        this.nodes.set(id, node);
      }
      
      this.emit('topology:updated', {
        totalNodes: this.nodes.size,
        masters: Array.from(this.nodes.values()).filter(n => n.role === 'master').length,
        slaves: Array.from(this.nodes.values()).filter(n => n.role === 'slave').length
      });
      
    } catch (error) {
      console.error('Failed to update cluster topology:', error);
    }
  }

  private parseSlots(slots: string[]): number[] {
    const slotRanges: number[] = [];
    
    for (const slot of slots) {
      if (slot.includes('-')) {
        const [start, end] = slot.split('-').map(s => parseInt(s));
        for (let i = start; i <= end; i++) {
          slotRanges.push(i);
        }
      } else {
        const slotNum = parseInt(slot);
        if (!isNaN(slotNum)) {
          slotRanges.push(slotNum);
        }
      }
    }
    
    return slotRanges;
  }

  private handleNodeError(node: any, error: Error): void {
    const nodeKey = \`\${node.options.host}:\${node.options.port}\`;
    const nodeInfo = Array.from(this.nodes.values()).find(n => 
      n.host === node.options.host && n.port === node.options.port
    );
    
    if (nodeInfo) {
      nodeInfo.health = 'failed';
      nodeInfo.lastHealthCheck = Date.now();
      
      this.emit('node:failed', {
        node: nodeInfo,
        error: error.message
      });
      
      // Attempt automatic failover if this is a master node
      if (nodeInfo.role === 'master') {
        this.handleMasterFailure(nodeInfo);
      }
    }
  }

  private async handleMasterFailure(masterNode: ClusterNode): Promise<void> {
    console.log(\`Master node \${masterNode.host}:\${masterNode.port} failed, attempting failover\`);
    
    try {
      // Find slave nodes for this master
      const slaveNodes = Array.from(this.nodes.values()).filter(node => 
        node.role === 'slave' && node.health === 'healthy'
      );
      
      if (slaveNodes.length > 0) {
        // Promote a slave to master
        const slaveToPromote = slaveNodes[0];
        await this.promoteSlaveToMaster(slaveToPromote);
        
        this.emit('failover:completed', {
          failedMaster: masterNode,
          newMaster: slaveToPromote
        });
      } else {
        console.error('No healthy slave nodes available for failover');
        this.emit('failover:failed', {
          failedMaster: masterNode,
          reason: 'No healthy slaves available'
        });
      }
    } catch (error) {
      console.error('Failover failed:', error);
      this.emit('failover:failed', {
        failedMaster: masterNode,
        error: error.message
      });
    }
  }

  private async promoteSlaveToMaster(slaveNode: ClusterNode): Promise<void> {
    // This would typically involve cluster management commands
    // Implementation depends on specific Redis cluster setup
    console.log(\`Promoting slave \${slaveNode.host}:\${slaveNode.port} to master\`);
    
    // Update local topology
    slaveNode.role = 'master';
    await this.updateClusterTopology();
  }

  private startHealthMonitoring(): void {
    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthCheck();
    }, 30000); // Check every 30 seconds

    this.rebalanceInterval = setInterval(async () => {
      await this.checkForRebalancing();
    }, 300000); // Check every 5 minutes
  }

  private async performHealthCheck(): Promise<void> {
    const healthPromises = Array.from(this.nodes.values()).map(async (node) => {
      const startTime = Date.now();
      
      try {
        // Simple ping to check node health
        const nodeClient = new Redis({
          host: node.host,
          port: node.port,
          connectTimeout: 5000,
          commandTimeout: 5000
        });
        
        await nodeClient.ping();
        await nodeClient.quit();
        
        const latency = Date.now() - startTime;
        
        node.health = latency > 1000 ? 'degraded' : 'healthy';
        node.lastHealthCheck = Date.now();
        
        return {
          node,
          healthy: true,
          latency
        };
      } catch (error) {
        node.health = 'failed';
        node.lastHealthCheck = Date.now();
        
        return {
          node,
          healthy: false,
          error: error.message
        };
      }
    });

    const results = await Promise.allSettled(healthPromises);
    const healthReport = results.map(result => 
      result.status === 'fulfilled' ? result.value : null
    ).filter(Boolean);

    this.emit('health:checked', healthReport);
  }

  private async checkForRebalancing(): Promise<void> {
    try {
      const keyDistribution = await this.getKeyDistribution();
      const threshold = 0.2; // 20% variance threshold
      
      const avgKeysPerNode = Array.from(keyDistribution.values())
        .reduce((sum, count) => sum + count, 0) / keyDistribution.size;
      
      const needsRebalancing = Array.from(keyDistribution.values())
        .some(count => Math.abs(count - avgKeysPerNode) / avgKeysPerNode > threshold);
      
      if (needsRebalancing) {
        this.emit('rebalance:needed', {
          keyDistribution,
          avgKeysPerNode,
          threshold
        });
        
        // Automatic rebalancing would be implemented here
        await this.performRebalancing();
      }
    } catch (error) {
      console.error('Rebalancing check failed:', error);
    }
  }

  private async getKeyDistribution(): Promise<Map<string, number>> {
    const distribution = new Map<string, number>();
    
    for (const node of this.nodes.values()) {
      if (node.role === 'master' && node.health === 'healthy') {
        try {
          const nodeClient = new Redis({
            host: node.host,
            port: node.port
          });
          
          const info = await nodeClient.info('keyspace');
          const keyCount = this.parseKeyCount(info);
          
          distribution.set(\`\${node.host}:\${node.port}\`, keyCount);
          
          await nodeClient.quit();
        } catch (error) {
          distribution.set(\`\${node.host}:\${node.port}\`, 0);
        }
      }
    }
    
    return distribution;
  }

  private parseKeyCount(info: string): number {
    const match = info.match(/keys=(\\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  private async performRebalancing(): Promise<void> {
    console.log('Starting cluster rebalancing...');
    
    // This would implement slot migration logic
    // For now, just emit an event
    this.emit('rebalance:started');
    
    // Simulate rebalancing work
    setTimeout(() => {
      this.emit('rebalance:completed');
    }, 10000);
  }

  // Public API methods
  async getClusterInfo(): Promise<{
    nodes: ClusterNode[];
    metrics: ClusterMetrics;
    health: 'healthy' | 'degraded' | 'critical';
  }> {
    await this.updateClusterTopology();
    
    const nodes = Array.from(this.nodes.values());
    const healthyNodes = nodes.filter(n => n.health === 'healthy');
    const totalSlots = 16384; // Redis cluster total slots
    const coveredSlots = nodes
      .filter(n => n.role === 'master')
      .reduce((sum, n) => sum + n.slots.length, 0);
    
    const keyDistribution = await this.getKeyDistribution();
    
    const metrics: ClusterMetrics = {
      totalNodes: nodes.length,
      masterNodes: nodes.filter(n => n.role === 'master').length,
      slaveNodes: nodes.filter(n => n.role === 'slave').length,
      healthyNodes: healthyNodes.length,
      totalSlots,
      coveredSlots,
      keyDistribution,
      networkLatency: new Map(), // Would be populated from health checks
      memoryUsage: new Map() // Would be populated from node info
    };
    
    let health: 'healthy' | 'degraded' | 'critical' = 'healthy';
    
    if (healthyNodes.length < nodes.length * 0.5) {
      health = 'critical';
    } else if (healthyNodes.length < nodes.length * 0.8) {
      health = 'degraded';
    }
    
    return {
      nodes,
      metrics,
      health
    };
  }

  async addNode(host: string, port: number): Promise<void> {
    try {
      // Add node to cluster
      const result = await this.cluster.cluster('meet', host, port);
      console.log(\`Added node \${host}:\${port} to cluster:, result\`);
      
      await this.updateClusterTopology();
      
      this.emit('node:added', { host, port });
    } catch (error) {
      console.error(\`Failed to add node \${host}:\${port}:\`, error);
      throw error;
    }
  }

  async removeNode(nodeId: string): Promise<void> {
    try {
      const node = this.nodes.get(nodeId);
      if (!node) {
        throw new Error(\`Node \${nodeId} not found\`);
      }
      
      // Remove node from cluster
      await this.cluster.cluster('forget', nodeId);
      console.log(\`Removed node \${nodeId} from cluster\`);
      
      this.nodes.delete(nodeId);
      
      this.emit('node:removed', { nodeId, node });
    } catch (error) {
      console.error(\`Failed to remove node \${nodeId}:\`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    if (this.rebalanceInterval) {
      clearInterval(this.rebalanceInterval);
    }
    
    await this.cluster.disconnect();
    this.emit('cluster:disconnected');
  }

  // Expose cluster client for direct operations
  getClusterClient(): Cluster {
    return this.cluster;
  }
}
\`\`\`

## Performance Monitoring and Analytics

### Comprehensive Cache Analytics
\`\`\`typescript
// src/monitoring/metrics/CacheAnalytics.ts
import { EventEmitter } from 'events';
import { promisify } from 'util';

export interface CacheOperation {
  type: 'get' | 'set' | 'delete' | 'invalidate';
  key: string;
  hit: boolean;
  latency: number;
  size?: number;
  tier?: string;
  timestamp: number;
  userId?: string;
  region?: string;
}

export interface CacheAnalysisReport {
  timeRange: {
    start: number;
    end: number;
  };
  overview: {
    totalOperations: number;
    hitRate: number;
    missRate: number;
    averageLatency: number;
    totalDataTransferred: number;
    costSavings: number;
  };
  trends: {
    hitRateOverTime: Array<{ timestamp: number; hitRate: number }>;
    latencyOverTime: Array<{ timestamp: number; latency: number }>;
    operationsOverTime: Array<{ timestamp: number; operations: number }>;
  };
  topKeys: {
    mostAccessed: Array<{ key: string; accessCount: number; hitRate: number }>;
    slowestKeys: Array<{ key: string; averageLatency: number; accessCount: number }>;
    largestKeys: Array<{ key: string; size: number; accessCount: number }>;
  };
  patterns: {
    accessPatterns: Array<{ pattern: string; frequency: number }>;
    temporalPatterns: Array<{ hour: number; operations: number; hitRate: number }>;
    geographicPatterns: Array<{ region: string; operations: number; hitRate: number }>;
  };
  recommendations: string[];
  alerts: Array<{
    type: 'performance' | 'capacity' | 'cost' | 'reliability';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    suggestion: string;
  }>;
}

export class CacheAnalytics extends EventEmitter {
  private operations: CacheOperation[] = [];
  private maxOperations: number = 100000; // Keep last 100k operations
  private analysisWindow: number = 3600000; // 1 hour default window
  private keyPatterns: Map<string, number> = new Map();
  private hourlyStats: Map<number, { operations: number; hits: number; totalLatency: number }> = new Map();

  constructor(config?: {
    maxOperations?: number;
    analysisWindow?: number;
  }) {
    super();
    
    if (config?.maxOperations) {
      this.maxOperations = config.maxOperations;
    }
    
    if (config?.analysisWindow) {
      this.analysisWindow = config.analysisWindow;
    }
    
    // Initialize hourly stats
    for (let hour = 0; hour < 24; hour++) {
      this.hourlyStats.set(hour, { operations: 0, hits: 0, totalLatency: 0 });
    }
  }

  // Record a cache operation
  recordOperation(operation: CacheOperation): void {
    // Add timestamp if not provided
    if (!operation.timestamp) {
      operation.timestamp = Date.now();
    }

    this.operations.push(operation);
    
    // Maintain size limit
    if (this.operations.length > this.maxOperations) {
      this.operations.shift();
    }

    // Update key patterns
    this.updateKeyPatterns(operation.key);
    
    // Update hourly stats
    this.updateHourlyStats(operation);
    
    // Emit operation event for real-time monitoring
    this.emit('operation:recorded', operation);
    
    // Check for performance issues
    this.checkPerformanceThresholds(operation);
  }

  private updateKeyPatterns(key: string): void {
    // Extract patterns from keys (e.g., user:*, product:category:*)
    const patterns = this.extractPatterns(key);
    
    patterns.forEach(pattern => {
      this.keyPatterns.set(pattern, (this.keyPatterns.get(pattern) || 0) + 1);
    });
  }

  private extractPatterns(key: string): string[] {
    const patterns: string[] = [];
    const parts = key.split(':');
    
    // Generate patterns at different levels
    for (let i = 1; i <= parts.length; i++) {
      const pattern = parts.slice(0, i).join(':') + (i < parts.length ? ':*' : '');
      patterns.push(pattern);
    }
    
    return patterns;
  }

  private updateHourlyStats(operation: CacheOperation): void {
    const hour = new Date(operation.timestamp).getHours();
    const stats = this.hourlyStats.get(hour)!;
    
    stats.operations++;
    stats.totalLatency += operation.latency;
    
    if (operation.hit) {
      stats.hits++;
    }
  }

  private checkPerformanceThresholds(operation: CacheOperation): void {
    // Check for slow operations
    if (operation.latency > 1000) { // 1 second threshold
      this.emit('alert:slow-operation', {
        key: operation.key,
        latency: operation.latency,
        threshold: 1000
      });
    }
    
    // Check for large objects
    if (operation.size && operation.size > 1024 * 1024) { // 1MB threshold
      this.emit('alert:large-object', {
        key: operation.key,
        size: operation.size,
        threshold: 1024 * 1024
      });
    }
  }

  // Generate comprehensive analysis report
  async generateReport(timeRange?: { start: number; end: number }): Promise<CacheAnalysisReport> {
    const now = Date.now();
    const range = timeRange || {
      start: now - this.analysisWindow,
      end: now
    };

    // Filter operations within time range
    const operationsInRange = this.operations.filter(op => 
      op.timestamp >= range.start && op.timestamp <= range.end
    );

    const overview = this.calculateOverview(operationsInRange);
    const trends = this.calculateTrends(operationsInRange, range);
    const topKeys = this.analyzeTopKeys(operationsInRange);
    const patterns = this.analyzePatterns(operationsInRange);
    const recommendations = this.generateRecommendations(operationsInRange, overview);
    const alerts = this.generateAlerts(overview, topKeys);

    return {
      timeRange: range,
      overview,
      trends,
      topKeys,
      patterns,
      recommendations,
      alerts
    };
  }

  private calculateOverview(operations: CacheOperation[]): CacheAnalysisReport['overview'] {
    if (operations.length === 0) {
      return {
        totalOperations: 0,
        hitRate: 0,
        missRate: 0,
        averageLatency: 0,
        totalDataTransferred: 0,
        costSavings: 0
      };
    }

    const hits = operations.filter(op => op.hit).length;
    const totalLatency = operations.reduce((sum, op) => sum + op.latency, 0);
    const totalSize = operations.reduce((sum, op) => sum + (op.size || 0), 0);
    
    const hitRate = (hits / operations.length) * 100;
    const averageLatency = totalLatency / operations.length;
    
    // Estimate cost savings (assuming cache hits are 10x faster than misses)
    const avgMissLatency = 500; // Estimated database query time
    const avgCacheLatency = 50; // Estimated cache response time
    const timeSaved = hits * (avgMissLatency - avgCacheLatency);
    const costSavings = timeSaved * 0.001; // Rough cost estimation

    return {
      totalOperations: operations.length,
      hitRate,
      missRate: 100 - hitRate,
      averageLatency,
      totalDataTransferred: totalSize,
      costSavings
    };
  }

  private calculateTrends(operations: CacheOperation[], range: { start: number; end: number }): CacheAnalysisReport['trends'] {
    const bucketSize = Math.max(1, Math.floor((range.end - range.start) / 50)); // 50 time buckets
    const buckets = new Map<number, { operations: number; hits: number; totalLatency: number }>();

    // Initialize buckets
    for (let time = range.start; time < range.end; time += bucketSize) {
      buckets.set(time, { operations: 0, hits: 0, totalLatency: 0 });
    }

    // Populate buckets
    operations.forEach(op => {
      const bucketTime = Math.floor((op.timestamp - range.start) / bucketSize) * bucketSize + range.start;
      const bucket = buckets.get(bucketTime);
      
      if (bucket) {
        bucket.operations++;
        bucket.totalLatency += op.latency;
        
        if (op.hit) {
          bucket.hits++;
        }
      }
    });

    // Convert to trend arrays
    const hitRateOverTime = Array.from(buckets.entries()).map(([timestamp, bucket]) => ({
      timestamp,
      hitRate: bucket.operations > 0 ? (bucket.hits / bucket.operations) * 100 : 0
    }));

    const latencyOverTime = Array.from(buckets.entries()).map(([timestamp, bucket]) => ({
      timestamp,
      latency: bucket.operations > 0 ? bucket.totalLatency / bucket.operations : 0
    }));

    const operationsOverTime = Array.from(buckets.entries()).map(([timestamp, bucket]) => ({
      timestamp,
      operations: bucket.operations
    }));

    return {
      hitRateOverTime,
      latencyOverTime,
      operationsOverTime
    };
  }

  private analyzeTopKeys(operations: CacheOperation[]): CacheAnalysisReport['topKeys'] {
    const keyStats = new Map<string, {
      accessCount: number;
      hits: number;
      totalLatency: number;
      size: number;
    }>();

    // Aggregate key statistics
    operations.forEach(op => {
      const stats = keyStats.get(op.key) || {
        accessCount: 0,
        hits: 0,
        totalLatency: 0,
        size: 0
      };

      stats.accessCount++;
      stats.totalLatency += op.latency;
      
      if (op.hit) {
        stats.hits++;
      }
      
      if (op.size) {
        stats.size = Math.max(stats.size, op.size);
      }

      keyStats.set(op.key, stats);
    });

    // Sort and extract top keys by different criteria
    const keyStatsArray = Array.from(keyStats.entries()).map(([key, stats]) => ({
      key,
      accessCount: stats.accessCount,
      hitRate: (stats.hits / stats.accessCount) * 100,
      averageLatency: stats.totalLatency / stats.accessCount,
      size: stats.size
    }));

    const mostAccessed = keyStatsArray
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 20)
      .map(({ key, accessCount, hitRate }) => ({ key, accessCount, hitRate }));

    const slowestKeys = keyStatsArray
      .sort((a, b) => b.averageLatency - a.averageLatency)
      .slice(0, 20)
      .map(({ key, averageLatency, accessCount }) => ({ key, averageLatency, accessCount }));

    const largestKeys = keyStatsArray
      .filter(k => k.size > 0)
      .sort((a, b) => b.size - a.size)
      .slice(0, 20)
      .map(({ key, size, accessCount }) => ({ key, size, accessCount }));

    return {
      mostAccessed,
      slowestKeys,
      largestKeys
    };
  }

  private analyzePatterns(operations: CacheOperation[]): CacheAnalysisReport['patterns'] {
    // Access patterns based on key patterns
    const accessPatterns = Array.from(this.keyPatterns.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([pattern, frequency]) => ({ pattern, frequency }));

    // Temporal patterns (hourly)
    const hourlyOperations = new Map<number, { operations: number; hits: number }>();
    
    operations.forEach(op => {
      const hour = new Date(op.timestamp).getHours();
      const stats = hourlyOperations.get(hour) || { operations: 0, hits: 0 };
      
      stats.operations++;
      if (op.hit) {
        stats.hits++;
      }
      
      hourlyOperations.set(hour, stats);
    });

    const temporalPatterns = Array.from(hourlyOperations.entries())
      .map(([hour, stats]) => ({
        hour,
        operations: stats.operations,
        hitRate: stats.operations > 0 ? (stats.hits / stats.operations) * 100 : 0
      }))
      .sort((a, b) => a.hour - b.hour);

    // Geographic patterns (if region data available)
    const regionOperations = new Map<string, { operations: number; hits: number }>();
    
    operations.forEach(op => {
      if (op.region) {
        const stats = regionOperations.get(op.region) || { operations: 0, hits: 0 };
        
        stats.operations++;
        if (op.hit) {
          stats.hits++;
        }
        
        regionOperations.set(op.region, stats);
      }
    });

    const geographicPatterns = Array.from(regionOperations.entries())
      .map(([region, stats]) => ({
        region,
        operations: stats.operations,
        hitRate: stats.operations > 0 ? (stats.hits / stats.operations) * 100 : 0
      }))
      .sort((a, b) => b.operations - a.operations);

    return {
      accessPatterns,
      temporalPatterns,
      geographicPatterns
    };
  }

  private generateRecommendations(operations: CacheOperation[], overview: CacheAnalysisReport['overview']): string[] {
    const recommendations: string[] = [];

    // Hit rate recommendations
    if (overview.hitRate < 70) {
      recommendations.push('Cache hit rate is below 70%. Consider increasing TTL or implementing cache warming strategies.');
    }

    // Latency recommendations
    if (overview.averageLatency > 100) {
      recommendations.push('Average cache latency is high. Consider using faster cache tier or optimizing serialization.');
    }

    // Pattern-based recommendations
    const getOperations = operations.filter(op => op.type === 'get');
    const missedGets = getOperations.filter(op => !op.hit);
    
    if (missedGets.length > getOperations.length * 0.5) {
      recommendations.push('High cache miss rate detected. Review cache expiration policies and consider predictive caching.');
    }

    // Size-based recommendations
    const largeObjects = operations.filter(op => op.size && op.size > 512 * 1024);
    if (largeObjects.length > operations.length * 0.1) {
      recommendations.push('Detected large cached objects. Consider compression or splitting large objects into smaller chunks.');
    }

    return recommendations;
  }

  private generateAlerts(overview: CacheAnalysisReport['overview'], topKeys: CacheAnalysisReport['topKeys']): CacheAnalysisReport['alerts'] {
    const alerts: CacheAnalysisReport['alerts'] = [];

    // Performance alerts
    if (overview.hitRate < 50) {
      alerts.push({
        type: 'performance',
        severity: 'critical',
        message: 'Cache hit rate is critically low',
        suggestion: 'Review cache configuration and implement cache warming'
      });
    } else if (overview.hitRate < 70) {
      alerts.push({
        type: 'performance',
        severity: 'medium',
        message: 'Cache hit rate is below optimal',
        suggestion: 'Consider adjusting TTL values or cache size'
      });
    }

    // Latency alerts
    if (overview.averageLatency > 200) {
      alerts.push({
        type: 'performance',
        severity: 'high',
        message: 'High cache latency detected',
        suggestion: 'Check network connectivity and cache server performance'
      });
    }

    // Key-specific alerts
    const slowKeys = topKeys.slowestKeys.filter(k => k.averageLatency > 500);
    if (slowKeys.length > 0) {
      alerts.push({
        type: 'performance',
        severity: 'medium',
        message: \`\${slowKeys.length} keys have high latency\`,
        suggestion: 'Review serialization efficiency for slow keys'
      });
    }

    return alerts;
  }

  // Real-time metrics
  getCurrentMetrics(): {
    hitRate: number;
    averageLatency: number;
    operationsPerSecond: number;
    activeKeys: number;
  } {
    const lastMinute = Date.now() - 60000;
    const recentOps = this.operations.filter(op => op.timestamp > lastMinute);
    
    const hits = recentOps.filter(op => op.hit).length;
    const hitRate = recentOps.length > 0 ? (hits / recentOps.length) * 100 : 0;
    
    const totalLatency = recentOps.reduce((sum, op) => sum + op.latency, 0);
    const averageLatency = recentOps.length > 0 ? totalLatency / recentOps.length : 0;
    
    const operationsPerSecond = recentOps.length / 60;
    
    const activeKeys = new Set(recentOps.map(op => op.key)).size;

    return {
      hitRate,
      averageLatency,
      operationsPerSecond,
      activeKeys
    };
  }

  // Export data for external analysis
  exportData(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['timestamp', 'type', 'key', 'hit', 'latency', 'size', 'tier', 'userId', 'region'];
      const rows = this.operations.map(op => [
        op.timestamp,
        op.type,
        op.key,
        op.hit,
        op.latency,
        op.size || '',
        op.tier || '',
        op.userId || '',
        op.region || ''
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\\n');
    }
    
    return JSON.stringify(this.operations, null, 2);
  }

  // Clear old data to manage memory
  cleanup(olderThan: number = 7 * 24 * 3600 * 1000): void { // 7 days default
    const cutoff = Date.now() - olderThan;
    this.operations = this.operations.filter(op => op.timestamp > cutoff);
    
    this.emit('cleanup:completed', {
      operationsRemoved: this.operations.length,
      cutoff
    });
  }
}
\`\`\`

This comprehensive advanced caching configuration provides enterprise-grade caching capabilities including multi-tier caching, intelligent invalidation, distributed cache management, performance monitoring, and analytics for building high-performance applications at scale.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];