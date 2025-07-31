import { ClaudeMdConfig } from '../types';

export const distributedSystemsDesignConfigs: ClaudeMdConfig[] = [
  {
    id: 'distributed-systems-design',
    title: 'Distributed Systems Design + Fault Tolerance',
    slug: 'distributed-systems-design-consistency-fault-tolerance',
    description: 'Advanced distributed systems architecture with consistency patterns, fault tolerance mechanisms, consensus algorithms, and scalability design principles for building resilient systems at scale.',
    category: 'Claude.md Configurations',
    tags: ['distributed-systems', 'consistency', 'fault-tolerance', 'consensus', 'scalability', 'cap-theorem', 'resilience'],
    difficulty: 'ADVANCED',
    language: 'Multiple',
    framework: 'Distributed Systems Patterns',
    content: `# Claude.md - Distributed Systems Design + Fault Tolerance

## Project Overview

This is an advanced distributed systems design guide focused on building resilient, scalable, and consistent distributed applications. It covers fundamental distributed systems challenges, consistency patterns, fault tolerance mechanisms, consensus algorithms, and practical implementation patterns for designing systems that can handle failures gracefully while maintaining correctness and availability.

## Distributed Systems Philosophy

### Core Principles
1. **Assume Failure**: Every component will eventually fail
2. **Design for Partitions**: Network partitions are inevitable
3. **Embrace Asynchrony**: Synchronous communication doesn't scale
4. **Idempotency**: Operations should be safely retryable
5. **Observability**: System behavior must be measurable
6. **Graceful Degradation**: Fail gracefully with reduced functionality

### Fundamental Challenges
- **Partial Failures**: Some nodes fail while others continue
- **Network Partitions**: Nodes become unreachable
- **Timing Issues**: Clocks drift, messages are delayed
- **Concurrent Updates**: Multiple nodes modify shared state
- **Data Consistency**: Maintaining correctness across replicas
- **Distributed Coordination**: Achieving consensus on actions

### CAP Theorem Trade-offs
- **Consistency (C)**: All nodes see the same data simultaneously
- **Availability (A)**: System remains operational
- **Partition Tolerance (P)**: System continues despite network failures

## Technology Stack

- **Service Discovery**: Consul, etcd, ZooKeeper
- **Load Balancers**: HAProxy, NGINX, Envoy
- **Message Queues**: Apache Kafka, RabbitMQ, NATS
- **Consensus Systems**: Raft, PBFT, etcd
- **Databases**: Cassandra, MongoDB, CockroachDB
- **Caching**: Redis Cluster, Hazelcast
- **Monitoring**: Prometheus, Grafana, Jaeger
- **Orchestration**: Kubernetes, Docker Swarm

## Architecture Overview

\`\`\`
Distributed System Architecture

                    ┌─────────────────┐
                    │   Load Balancer │
                    │   (HAProxy)     │
                    └─────────┬───────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
    ┌───▼───┐             ┌───▼───┐             ┌───▼───┐
    │Service│             │Service│             │Service│
    │ Node 1│             │ Node 2│             │ Node 3│
    └───┬───┘             └───┬───┘             └───┬───┘
        │                     │                     │
        └─────────────┬───────┴─────────┬─────────────┘
                      │                 │
              ┌───────▼───────┐ ┌───────▼───────┐
              │  Message Bus  │ │ Service Mesh  │
              │   (Kafka)     │ │   (Istio)     │
              └───────┬───────┘ └───────┬───────┘
                      │                 │
        ┌─────────────┼─────────────────┼─────────────┐
        │             │                 │             │
    ┌───▼───┐     ┌───▼───┐         ┌───▼───┐     ┌───▼───┐
    │  DB   │     │  DB   │         │ Cache │     │ Cache │
    │Primary│     │Replica│         │Node 1 │     │Node 2 │
    └───────┘     └───────┘         └───────┘     └───────┘
\`\`\`

## Project Structure

\`\`\`
distributed-systems-design/
├── src/
│   ├── consensus/                  # Consensus algorithm implementations
│   │   ├── raft/                   # Raft consensus implementation
│   │   │   ├── RaftNode.ts         # Raft node implementation
│   │   │   ├── LogEntry.ts         # Log entry structure
│   │   │   ├── StateMachine.ts     # Replicated state machine
│   │   │   └── RaftConsensus.ts    # Raft consensus protocol
│   │   ├── pbft/                   # PBFT implementation
│   │   └── common/                 # Common consensus interfaces
│   ├── consistency/                # Consistency patterns
│   │   ├── eventual/               # Eventual consistency
│   │   │   ├── CRDTs.ts           # Conflict-free replicated data types
│   │   │   ├── VectorClock.ts     # Vector clock implementation
│   │   │   └── AntiEntropy.ts     # Anti-entropy protocols
│   │   ├── strong/                 # Strong consistency
│   │   │   ├── TwoPhaseCommit.ts  # 2PC protocol
│   │   │   ├── ThreePhaseCommit.ts # 3PC protocol
│   │   │   └── Paxos.ts           # Paxos consensus
│   │   └── causal/                 # Causal consistency
│   │       ├── CausalBroadcast.ts # Causal broadcast
│   │       └── HappensBefore.ts   # Happens-before relationships
│   ├── fault-tolerance/            # Fault tolerance mechanisms
│   │   ├── circuit-breaker/        # Circuit breaker pattern
│   │   │   ├── CircuitBreaker.ts   # Circuit breaker implementation
│   │   │   ├── CircuitState.ts     # Circuit state management
│   │   │   └── FailureDetector.ts  # Failure detection
│   │   ├── bulkhead/              # Bulkhead pattern
│   │   ├── timeout/               # Timeout patterns
│   │   ├── retry/                 # Retry mechanisms
│   │   │   ├── ExponentialBackoff.ts
│   │   │   ├── JitteredRetry.ts
│   │   │   └── RetryPolicy.ts
│   │   └── graceful-degradation/  # Graceful degradation
│   ├── replication/               # Data replication strategies
│   │   ├── master-slave/          # Master-slave replication
│   │   ├── master-master/         # Master-master replication
│   │   ├── chain-replication/     # Chain replication
│   │   └── quorum/               # Quorum-based replication
│   │       ├── QuorumConsensus.ts # Quorum consensus
│   │       └── ReadWriteQuorum.ts # R/W quorum
│   ├── partitioning/              # Data partitioning strategies
│   │   ├── horizontal/            # Horizontal partitioning (sharding)
│   │   │   ├── ConsistentHashing.ts
│   │   │   ├── RangePartitioning.ts
│   │   │   └── HashPartitioning.ts
│   │   ├── vertical/              # Vertical partitioning
│   │   └── functional/            # Functional partitioning
│   ├── coordination/              # Distributed coordination
│   │   ├── leader-election/       # Leader election algorithms
│   │   │   ├── BullyAlgorithm.ts  # Bully algorithm
│   │   │   ├── RingAlgorithm.ts   # Ring-based election
│   │   │   └── RaftElection.ts    # Raft leader election
│   │   ├── distributed-locking/   # Distributed locks
│   │   │   ├── RedisLock.ts       # Redis-based locks
│   │   │   ├── ZooKeeperLock.ts   # ZooKeeper locks
│   │   │   └── EtcdLock.ts        # etcd locks
│   │   └── barriers/              # Synchronization barriers
│   ├── load-balancing/            # Load balancing strategies
│   │   ├── round-robin/           # Round-robin balancing
│   │   ├── weighted-round-robin/  # Weighted round-robin
│   │   ├── least-connections/     # Least connections
│   │   ├── consistent-hashing/    # Consistent hashing LB
│   │   └── health-check/          # Health checking
│   ├── caching/                   # Distributed caching
│   │   ├── cache-coherence/       # Cache coherence protocols
│   │   ├── cache-invalidation/    # Cache invalidation strategies
│   │   └── distributed-cache/     # Distributed cache implementation
│   └── monitoring/                # System monitoring and observability
│       ├── metrics/               # Metrics collection
│       ├── tracing/               # Distributed tracing
│       ├── logging/               # Distributed logging
│       └── health-checks/         # Health monitoring
├── examples/                      # Implementation examples
│   ├── chat-system/               # Distributed chat system
│   ├── key-value-store/           # Distributed KV store
│   ├── task-queue/                # Distributed task queue
│   └── file-system/               # Distributed file system
├── benchmarks/                    # Performance benchmarks
├── tests/                         # Test suites
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   ├── chaos/                     # Chaos engineering tests
│   └── performance/               # Performance tests
└── docs/                          # Documentation
    ├── consistency-models.md       # Consistency model explanations
    ├── consensus-algorithms.md     # Consensus algorithm details
    ├── fault-tolerance-patterns.md # Fault tolerance patterns
    └── scalability-patterns.md    # Scalability design patterns
\`\`\`

## Consensus Algorithms

### Raft Consensus Implementation
\`\`\`typescript
// src/consensus/raft/RaftNode.ts
import { EventEmitter } from 'events';

export enum RaftState {
  FOLLOWER = 'FOLLOWER',
  CANDIDATE = 'CANDIDATE',
  LEADER = 'LEADER'
}

export interface LogEntry {
  term: number;
  index: number;
  command: any;
  timestamp: number;
}

export interface RaftMessage {
  type: 'RequestVote' | 'RequestVoteResponse' | 'AppendEntries' | 'AppendEntriesResponse';
  term: number;
  from: string;
  to: string;
  data: any;
}

export class RaftNode extends EventEmitter {
  private nodeId: string;
  private state: RaftState = RaftState.FOLLOWER;
  private currentTerm: number = 0;
  private votedFor: string | null = null;
  private log: LogEntry[] = [];
  private commitIndex: number = 0;
  private lastApplied: number = 0;
  
  // Leader-specific state
  private nextIndex: Map<string, number> = new Map();
  private matchIndex: Map<string, number> = new Map();
  
  // Timers
  private electionTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  
  // Configuration
  private peers: string[] = [];
  private electionTimeoutMs: number = 150 + Math.random() * 150; // 150-300ms
  private heartbeatIntervalMs: number = 50; // 50ms

  constructor(nodeId: string, peers: string[]) {
    super();
    this.nodeId = nodeId;
    this.peers = peers.filter(p => p !== nodeId);
    this.resetElectionTimer();
  }

  public start(): void {
    console.log(\`Raft node \${this.nodeId} starting...\`);
    this.becomeFollower(0);
  }

  public stop(): void {
    this.clearTimers();
    console.log(\`Raft node \${this.nodeId} stopped\`);
  }

  public appendCommand(command: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.state !== RaftState.LEADER) {
        reject(new Error('Not leader'));
        return;
      }

      const entry: LogEntry = {
        term: this.currentTerm,
        index: this.log.length + 1,
        command,
        timestamp: Date.now()
      };

      this.log.push(entry);
      
      // Immediately try to replicate to majority
      this.replicateToMajority(entry)
        .then(success => resolve(success))
        .catch(error => reject(error));
    });
  }

  public handleMessage(message: RaftMessage): void {
    // Update term if we receive a higher term
    if (message.term > this.currentTerm) {
      this.currentTerm = message.term;
      this.votedFor = null;
      this.becomeFollower(message.term);
    }

    switch (message.type) {
      case 'RequestVote':
        this.handleRequestVote(message);
        break;
      case 'RequestVoteResponse':
        this.handleRequestVoteResponse(message);
        break;
      case 'AppendEntries':
        this.handleAppendEntries(message);
        break;
      case 'AppendEntriesResponse':
        this.handleAppendEntriesResponse(message);
        break;
    }
  }

  private becomeFollower(term: number): void {
    console.log(\`Node \${this.nodeId} becoming follower for term \${term}\`);
    this.state = RaftState.FOLLOWER;
    this.currentTerm = term;
    this.votedFor = null;
    this.clearHeartbeatTimer();
    this.resetElectionTimer();
  }

  private becomeCandidate(): void {
    console.log(\`Node \${this.nodeId} becoming candidate for term \${this.currentTerm + 1}\`);
    this.state = RaftState.CANDIDATE;
    this.currentTerm++;
    this.votedFor = this.nodeId;
    this.resetElectionTimer();
    
    // Start election
    this.startElection();
  }

  private becomeLeader(): void {
    console.log(\`Node \${this.nodeId} becoming leader for term \${this.currentTerm}\`);
    this.state = RaftState.LEADER;
    this.clearElectionTimer();
    
    // Initialize leader state
    this.peers.forEach(peer => {
      this.nextIndex.set(peer, this.log.length + 1);
      this.matchIndex.set(peer, 0);
    });
    
    // Start sending heartbeats
    this.startHeartbeats();
  }

  private startElection(): void {
    let votesReceived = 1; // Vote for self
    const votesNeeded = Math.floor((this.peers.length + 1) / 2) + 1;

    this.peers.forEach(peer => {
      const lastLogIndex = this.log.length;
      const lastLogTerm = lastLogIndex > 0 ? this.log[lastLogIndex - 1].term : 0;

      const requestVote: RaftMessage = {
        type: 'RequestVote',
        term: this.currentTerm,
        from: this.nodeId,
        to: peer,
        data: {
          candidateId: this.nodeId,
          lastLogIndex,
          lastLogTerm
        }
      };

      this.sendMessage(requestVote);
    });
  }

  private handleRequestVote(message: RaftMessage): void {
    const { candidateId, lastLogIndex, lastLogTerm } = message.data;
    let voteGranted = false;

    // Check if we can vote for this candidate
    if (message.term >= this.currentTerm && 
        (this.votedFor === null || this.votedFor === candidateId)) {
      
      // Check if candidate's log is at least as up-to-date as ours
      const ourLastLogIndex = this.log.length;
      const ourLastLogTerm = ourLastLogIndex > 0 ? this.log[ourLastLogIndex - 1].term : 0;

      if (lastLogTerm > ourLastLogTerm || 
          (lastLogTerm === ourLastLogTerm && lastLogIndex >= ourLastLogIndex)) {
        voteGranted = true;
        this.votedFor = candidateId;
        this.resetElectionTimer();
      }
    }

    const response: RaftMessage = {
      type: 'RequestVoteResponse',
      term: this.currentTerm,
      from: this.nodeId,
      to: message.from,
      data: { voteGranted }
    };

    this.sendMessage(response);
  }

  private handleRequestVoteResponse(message: RaftMessage): void {
    if (this.state !== RaftState.CANDIDATE || message.term !== this.currentTerm) {
      return;
    }

    if (message.data.voteGranted) {
      // Count votes (including our own)
      let votes = 1;
      // In a real implementation, you'd track votes from all peers
      const votesNeeded = Math.floor((this.peers.length + 1) / 2) + 1;
      
      if (votes >= votesNeeded) {
        this.becomeLeader();
      }
    }
  }

  private startHeartbeats(): void {
    this.heartbeatTimer = setInterval(() => {
      this.sendHeartbeats();
    }, this.heartbeatIntervalMs);
    
    // Send immediate heartbeat
    this.sendHeartbeats();
  }

  private sendHeartbeats(): void {
    this.peers.forEach(peer => {
      const prevLogIndex = (this.nextIndex.get(peer) || 1) - 1;
      const prevLogTerm = prevLogIndex > 0 ? this.log[prevLogIndex - 1].term : 0;
      
      const appendEntries: RaftMessage = {
        type: 'AppendEntries',
        term: this.currentTerm,
        from: this.nodeId,
        to: peer,
        data: {
          leaderId: this.nodeId,
          prevLogIndex,
          prevLogTerm,
          entries: [], // Heartbeat - no entries
          leaderCommit: this.commitIndex
        }
      };

      this.sendMessage(appendEntries);
    });
  }

  private async replicateToMajority(entry: LogEntry): Promise<boolean> {
    // Simplified implementation - in reality, this would track responses
    // and commit when majority acknowledges
    return new Promise((resolve) => {
      setTimeout(() => {
        this.commitIndex = entry.index;
        resolve(true);
      }, 10); // Simulate network delay
    });
  }

  private handleAppendEntries(message: RaftMessage): void {
    const { leaderId, prevLogIndex, prevLogTerm, entries, leaderCommit } = message.data;
    
    this.resetElectionTimer(); // Reset election timer on valid heartbeat
    
    let success = false;
    
    // Check if our log contains an entry at prevLogIndex with matching term
    if (prevLogIndex === 0 || 
        (prevLogIndex <= this.log.length && 
         this.log[prevLogIndex - 1].term === prevLogTerm)) {
      
      success = true;
      
      // Append new entries
      if (entries.length > 0) {
        // Remove conflicting entries and append new ones
        this.log = this.log.slice(0, prevLogIndex);
        this.log.push(...entries);
      }
      
      // Update commit index
      if (leaderCommit > this.commitIndex) {
        this.commitIndex = Math.min(leaderCommit, this.log.length);
      }
    }

    const response: RaftMessage = {
      type: 'AppendEntriesResponse',
      term: this.currentTerm,
      from: this.nodeId,
      to: message.from,
      data: { 
        success,
        matchIndex: success ? prevLogIndex + entries.length : 0
      }
    };

    this.sendMessage(response);
  }

  private handleAppendEntriesResponse(message: RaftMessage): void {
    if (this.state !== RaftState.LEADER || message.term !== this.currentTerm) {
      return;
    }

    const peer = message.from;
    const { success, matchIndex } = message.data;

    if (success) {
      this.matchIndex.set(peer, matchIndex);
      this.nextIndex.set(peer, matchIndex + 1);
    } else {
      // Decrement nextIndex and retry
      const currentNext = this.nextIndex.get(peer) || 1;
      this.nextIndex.set(peer, Math.max(1, currentNext - 1));
    }
  }

  private sendMessage(message: RaftMessage): void {
    // In a real implementation, this would send over network
    this.emit('message', message);
  }

  private resetElectionTimer(): void {
    this.clearElectionTimer();
    this.electionTimer = setTimeout(() => {
      if (this.state !== RaftState.LEADER) {
        this.becomeCandidate();
      }
    }, this.electionTimeoutMs);
  }

  private clearElectionTimer(): void {
    if (this.electionTimer) {
      clearTimeout(this.electionTimer);
      this.electionTimer = null;
    }
  }

  private clearHeartbeatTimer(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private clearTimers(): void {
    this.clearElectionTimer();
    this.clearHeartbeatTimer();
  }

  // Getters for testing and monitoring
  get currentState(): RaftState { return this.state; }
  get term(): number { return this.currentTerm; }
  get logLength(): number { return this.log.length; }
  get committed(): number { return this.commitIndex; }
}
\`\`\`

## Fault Tolerance Patterns

### Circuit Breaker Implementation
\`\`\`typescript
// src/fault-tolerance/circuit-breaker/CircuitBreaker.ts
export enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

export interface CircuitBreakerConfig {
  failureThreshold: number;      // Number of failures to open circuit
  recoveryTimeout: number;       // Time before attempting recovery (ms)
  monitoringWindow: number;      // Time window for failure monitoring (ms)
  expectedErrors: string[];      // Error types that should trigger circuit
  volumeThreshold: number;       // Minimum calls before circuit can open
}

export interface CircuitBreakerMetrics {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  rejectedCalls: number;
  averageResponseTime: number;
  lastFailureTime?: number;
}

export class CircuitBreaker<T = any> {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private nextAttemptTime: number = 0;
  private callHistory: { timestamp: number; success: boolean; duration: number }[] = [];
  
  constructor(
    private config: CircuitBreakerConfig,
    private name: string = 'CircuitBreaker'
  ) {}

  async execute<R>(operation: () => Promise<R>): Promise<R> {
    const canExecute = this.canExecute();
    
    if (!canExecute) {
      this.recordRejection();
      throw new Error(\`Circuit breaker '\${this.name}' is OPEN\`);
    }

    const startTime = Date.now();
    
    try {
      const result = await operation();
      this.recordSuccess(Date.now() - startTime);
      return result;
    } catch (error) {
      this.recordFailure(Date.now() - startTime);
      throw error;
    }
  }

  private canExecute(): boolean {
    const now = Date.now();
    
    switch (this.state) {
      case CircuitState.CLOSED:
        return true;
        
      case CircuitState.OPEN:
        if (now >= this.nextAttemptTime) {
          this.transitionToHalfOpen();
          return true;
        }
        return false;
        
      case CircuitState.HALF_OPEN:
        return true;
        
      default:
        return false;
    }
  }

  private recordSuccess(duration: number): void {
    this.addCallToHistory(true, duration);
    this.failureCount = 0;
    
    if (this.state === CircuitState.HALF_OPEN) {
      this.transitionToClosed();
    }
  }

  private recordFailure(duration: number): void {
    this.addCallToHistory(false, duration);
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.state === CircuitState.HALF_OPEN) {
      this.transitionToOpen();
    } else if (this.state === CircuitState.CLOSED && this.shouldOpenCircuit()) {
      this.transitionToOpen();
    }
  }

  private recordRejection(): void {
    // Rejections don't count as failures, but we track them for metrics
  }

  private shouldOpenCircuit(): boolean {
    const recentCalls = this.getRecentCalls();
    
    // Need minimum volume of calls
    if (recentCalls.length < this.config.volumeThreshold) {
      return false;
    }
    
    const failedCalls = recentCalls.filter(call => !call.success).length;
    const failureRate = failedCalls / recentCalls.length;
    
    return failureRate >= (this.config.failureThreshold / 100);
  }

  private getRecentCalls(): { timestamp: number; success: boolean; duration: number }[] {
    const cutoff = Date.now() - this.config.monitoringWindow;
    return this.callHistory.filter(call => call.timestamp >= cutoff);
  }

  private addCallToHistory(success: boolean, duration: number): void {
    const now = Date.now();
    this.callHistory.push({ timestamp: now, success, duration });
    
    // Clean up old entries
    const cutoff = now - this.config.monitoringWindow;
    this.callHistory = this.callHistory.filter(call => call.timestamp >= cutoff);
  }

  private transitionToClosed(): void {
    console.log(\`Circuit breaker '\${this.name}' transitioning to CLOSED\`);
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
  }

  private transitionToOpen(): void {
    console.log(\`Circuit breaker '\${this.name}' transitioning to OPEN\`);
    this.state = CircuitState.OPEN;
    this.nextAttemptTime = Date.now() + this.config.recoveryTimeout;
  }

  private transitionToHalfOpen(): void {
    console.log(\`Circuit breaker '\${this.name}' transitioning to HALF_OPEN\`);
    this.state = CircuitState.HALF_OPEN;
  }

  getMetrics(): CircuitBreakerMetrics {
    const recentCalls = this.getRecentCalls();
    const successfulCalls = recentCalls.filter(call => call.success).length;
    const failedCalls = recentCalls.filter(call => !call.success).length;
    const totalDuration = recentCalls.reduce((sum, call) => sum + call.duration, 0);
    
    return {
      totalCalls: recentCalls.length,
      successfulCalls,
      failedCalls,
      rejectedCalls: 0, // Would need separate tracking
      averageResponseTime: recentCalls.length > 0 ? totalDuration / recentCalls.length : 0,
      lastFailureTime: this.lastFailureTime > 0 ? this.lastFailureTime : undefined
    };
  }

  getState(): CircuitState {
    return this.state;
  }

  reset(): void {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.lastFailureTime = 0;
    this.nextAttemptTime = 0;
    this.callHistory = [];
  }
}
\`\`\`

### Retry Mechanism with Exponential Backoff
\`\`\`typescript
// src/fault-tolerance/retry/ExponentialBackoff.ts
export interface RetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  jitter: boolean;
  retryableErrors: string[];
}

export interface RetryResult<T> {
  result?: T;
  error?: Error;
  attempts: number;
  totalDuration: number;
}

export class ExponentialBackoffRetry {
  constructor(private config: RetryConfig) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: Error;
    let attempt = 0;
    const startTime = Date.now();

    while (attempt < this.config.maxAttempts) {
      attempt++;
      
      try {
        const result = await operation();
        console.log(\`Operation succeeded on attempt \${attempt}\`);
        return result;
      } catch (error) {
        lastError = error as Error;
        
        if (!this.isRetryableError(error as Error)) {
          console.log(\`Non-retryable error: \${error.message}\`);
          throw error;
        }
        
        if (attempt === this.config.maxAttempts) {
          console.log(\`Max attempts (\${this.config.maxAttempts}) reached\`);
          break;
        }
        
        const delay = this.calculateDelay(attempt);
        console.log(\`Attempt \${attempt} failed, retrying in \${delay}ms: \${error.message}\`);
        
        await this.sleep(delay);
      }
    }

    throw new Error(\`Operation failed after \${attempt} attempts. Last error: \${lastError.message}\`);
  }

  private isRetryableError(error: Error): boolean {
    if (this.config.retryableErrors.length === 0) {
      return true; // Retry all errors if none specified
    }
    
    return this.config.retryableErrors.some(errorType => 
      error.name === errorType || error.message.includes(errorType)
    );
  }

  private calculateDelay(attempt: number): number {
    const baseDelay = this.config.baseDelayMs * Math.pow(this.config.backoffMultiplier, attempt - 1);
    const cappedDelay = Math.min(baseDelay, this.config.maxDelayMs);
    
    if (this.config.jitter) {
      // Add random jitter (±25%)
      const jitterRange = cappedDelay * 0.25;
      const jitter = (Math.random() - 0.5) * 2 * jitterRange;
      return Math.max(0, cappedDelay + jitter);
    }
    
    return cappedDelay;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage example with different retry strategies
export class RetryStrategies {
  static readonly IMMEDIATE = new ExponentialBackoffRetry({
    maxAttempts: 3,
    baseDelayMs: 0,
    maxDelayMs: 0,
    backoffMultiplier: 1,
    jitter: false,
    retryableErrors: []
  });

  static readonly FAST = new ExponentialBackoffRetry({
    maxAttempts: 3,
    baseDelayMs: 100,
    maxDelayMs: 1000,
    backoffMultiplier: 2,
    jitter: true,
    retryableErrors: ['NetworkError', 'TimeoutError']
  });

  static readonly STANDARD = new ExponentialBackoffRetry({
    maxAttempts: 5,
    baseDelayMs: 1000,
    maxDelayMs: 30000,
    backoffMultiplier: 2,
    jitter: true,
    retryableErrors: ['NetworkError', 'TimeoutError', 'ServiceUnavailable']
  });

  static readonly PERSISTENT = new ExponentialBackoffRetry({
    maxAttempts: 10,
    baseDelayMs: 1000,
    maxDelayMs: 60000,
    backoffMultiplier: 1.5,
    jitter: true,
    retryableErrors: []
  });
}
\`\`\`

## Consistency Patterns

### Vector Clock Implementation
\`\`\`typescript
// src/consistency/eventual/VectorClock.ts
export class VectorClock {
  private clock: Map<string, number> = new Map();

  constructor(nodeId?: string, initialClock?: Map<string, number>) {
    if (initialClock) {
      this.clock = new Map(initialClock);
    }
    if (nodeId) {
      this.clock.set(nodeId, this.clock.get(nodeId) || 0);
    }
  }

  // Increment the clock for a specific node
  increment(nodeId: string): VectorClock {
    const newClock = new Map(this.clock);
    newClock.set(nodeId, (newClock.get(nodeId) || 0) + 1);
    return new VectorClock(undefined, newClock);
  }

  // Update clock based on received message
  update(otherClock: VectorClock, nodeId: string): VectorClock {
    const newClock = new Map();
    
    // Get all node IDs from both clocks
    const allNodes = new Set([...this.clock.keys(), ...otherClock.clock.keys()]);
    
    // For each node, take the maximum timestamp
    allNodes.forEach(node => {
      const myTime = this.clock.get(node) || 0;
      const otherTime = otherClock.clock.get(node) || 0;
      newClock.set(node, Math.max(myTime, otherTime));
    });
    
    // Increment our own clock
    newClock.set(nodeId, (newClock.get(nodeId) || 0) + 1);
    
    return new VectorClock(undefined, newClock);
  }

  // Compare two vector clocks
  compareTo(other: VectorClock): 'before' | 'after' | 'concurrent' | 'equal' {
    const allNodes = new Set([...this.clock.keys(), ...other.clock.keys()]);
    
    let thisLess = false;
    let thisGreater = false;
    
    for (const node of allNodes) {
      const thisTime = this.clock.get(node) || 0;
      const otherTime = other.clock.get(node) || 0;
      
      if (thisTime < otherTime) {
        thisLess = true;
      } else if (thisTime > otherTime) {
        thisGreater = true;
      }
    }
    
    if (thisLess && !thisGreater) {
      return 'before';
    } else if (!thisLess && thisGreater) {
      return 'after';
    } else if (!thisLess && !thisGreater) {
      return 'equal';
    } else {
      return 'concurrent';
    }
  }

  // Check if this clock happens before another
  happensBefore(other: VectorClock): boolean {
    return this.compareTo(other) === 'before';
  }

  // Check if events are concurrent
  isConcurrentWith(other: VectorClock): boolean {
    return this.compareTo(other) === 'concurrent';
  }

  // Get timestamp for a specific node
  getTime(nodeId: string): number {
    return this.clock.get(nodeId) || 0;
  }

  // Get all nodes in the clock
  getNodes(): string[] {
    return Array.from(this.clock.keys());
  }

  // Create a copy of the clock
  copy(): VectorClock {
    return new VectorClock(undefined, new Map(this.clock));
  }

  // Serialize to JSON
  toJSON(): Record<string, number> {
    const obj: Record<string, number> = {};
    this.clock.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  // Deserialize from JSON
  static fromJSON(json: Record<string, number>): VectorClock {
    const clock = new Map<string, number>();
    Object.entries(json).forEach(([key, value]) => {
      clock.set(key, value);
    });
    return new VectorClock(undefined, clock);
  }

  toString(): string {
    const entries = Array.from(this.clock.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([node, time]) => \`\${node}:\${time}\`)
      .join(', ');
    return \`{\${entries}}\`;
  }
}

// Usage example for distributed event ordering
export class DistributedEventLog {
  private events: { id: string; data: any; clock: VectorClock }[] = [];
  private nodeId: string;
  private currentClock: VectorClock;

  constructor(nodeId: string) {
    this.nodeId = nodeId;
    this.currentClock = new VectorClock(nodeId);
  }

  // Add a local event
  addLocalEvent(eventId: string, data: any): void {
    this.currentClock = this.currentClock.increment(this.nodeId);
    
    this.events.push({
      id: eventId,
      data,
      clock: this.currentClock.copy()
    });
    
    console.log(\`Added local event \${eventId} with clock \${this.currentClock}\`);
  }

  // Receive a remote event
  receiveRemoteEvent(eventId: string, data: any, remoteClock: VectorClock): void {
    this.currentClock = this.currentClock.update(remoteClock, this.nodeId);
    
    this.events.push({
      id: eventId,
      data,
      clock: remoteClock.copy()
    });
    
    console.log(\`Received remote event \${eventId} with clock \${remoteClock}\`);
    console.log(\`Updated local clock to \${this.currentClock}\`);
  }

  // Get events in causal order
  getCausallyOrderedEvents(): { id: string; data: any; clock: VectorClock }[] {
    return this.events.sort((a, b) => {
      const comparison = a.clock.compareTo(b.clock);
      switch (comparison) {
        case 'before': return -1;
        case 'after': return 1;
        case 'equal': return 0;
        case 'concurrent': 
          // For concurrent events, order by event ID for deterministic ordering
          return a.id.localeCompare(b.id);
      }
    });
  }

  getCurrentClock(): VectorClock {
    return this.currentClock.copy();
  }
}
\`\`\`

## Distributed Data Structures

### Conflict-Free Replicated Data Types (CRDTs)
\`\`\`typescript
// src/consistency/eventual/CRDTs.ts

// G-Counter: Grow-only counter CRDT
export class GCounter {
  private counters: Map<string, number> = new Map();

  constructor(private nodeId: string) {}

  // Increment the counter
  increment(amount: number = 1): void {
    const current = this.counters.get(this.nodeId) || 0;
    this.counters.set(this.nodeId, current + amount);
  }

  // Get the current value
  value(): number {
    let total = 0;
    this.counters.forEach(count => total += count);
    return total;
  }

  // Merge with another G-Counter
  merge(other: GCounter): GCounter {
    const merged = new GCounter(this.nodeId);
    
    // Get all node IDs from both counters
    const allNodes = new Set([...this.counters.keys(), ...other.counters.keys()]);
    
    // For each node, take the maximum value
    allNodes.forEach(nodeId => {
      const myValue = this.counters.get(nodeId) || 0;
      const otherValue = other.counters.get(nodeId) || 0;
      merged.counters.set(nodeId, Math.max(myValue, otherValue));
    });
    
    return merged;
  }

  // Compare with another counter
  compare(other: GCounter): 'less' | 'greater' | 'concurrent' | 'equal' {
    const allNodes = new Set([...this.counters.keys(), ...other.counters.keys()]);
    
    let thisLess = false;
    let thisGreater = false;
    
    for (const nodeId of allNodes) {
      const myValue = this.counters.get(nodeId) || 0;
      const otherValue = other.counters.get(nodeId) || 0;
      
      if (myValue < otherValue) {
        thisLess = true;
      } else if (myValue > otherValue) {
        thisGreater = true;
      }
    }
    
    if (thisLess && !thisGreater) return 'less';
    if (!thisLess && thisGreater) return 'greater';
    if (!thisLess && !thisGreater) return 'equal';
    return 'concurrent';
  }

  toJSON(): Record<string, number> {
    const obj: Record<string, number> = {};
    this.counters.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  static fromJSON(nodeId: string, json: Record<string, number>): GCounter {
    const counter = new GCounter(nodeId);
    Object.entries(json).forEach(([key, value]) => {
      counter.counters.set(key, value);
    });
    return counter;
  }
}

// OR-Set: Observed-Remove Set CRDT
export class ORSet<T> {
  private elements: Map<T, Set<string>> = new Map(); // element -> set of unique tags
  private removed: Set<string> = new Set(); // set of removed tags

  constructor(private nodeId: string) {}

  // Add an element
  add(element: T): void {
    const tag = \`\${this.nodeId}-\${Date.now()}-\${Math.random()}\`;
    
    if (!this.elements.has(element)) {
      this.elements.set(element, new Set());
    }
    
    this.elements.get(element)!.add(tag);
  }

  // Remove an element
  remove(element: T): void {
    const tags = this.elements.get(element);
    if (tags) {
      tags.forEach(tag => this.removed.add(tag));
    }
  }

  // Check if element is in the set
  has(element: T): boolean {
    const tags = this.elements.get(element);
    if (!tags) return false;
    
    // Element is present if it has at least one tag that hasn't been removed
    return Array.from(tags).some(tag => !this.removed.has(tag));
  }

  // Get all elements in the set
  values(): T[] {
    const result: T[] = [];
    
    this.elements.forEach((tags, element) => {
      if (Array.from(tags).some(tag => !this.removed.has(tag))) {
        result.push(element);
      }
    });
    
    return result;
  }

  // Merge with another OR-Set
  merge(other: ORSet<T>): ORSet<T> {
    const merged = new ORSet<T>(this.nodeId);
    
    // Merge elements
    const allElements = new Set([...this.elements.keys(), ...other.elements.keys()]);
    
    allElements.forEach(element => {
      const myTags = this.elements.get(element) || new Set();
      const otherTags = other.elements.get(element) || new Set();
      
      merged.elements.set(element, new Set([...myTags, ...otherTags]));
    });
    
    // Merge removed tags
    merged.removed = new Set([...this.removed, ...other.removed]);
    
    return merged;
  }

  size(): number {
    return this.values().length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}

// LWW-Register: Last-Write-Wins Register CRDT
export class LWWRegister<T> {
  private value: T | undefined;
  private timestamp: number = 0;
  private nodeId: string;

  constructor(nodeId: string, initialValue?: T) {
    this.nodeId = nodeId;
    if (initialValue !== undefined) {
      this.setValue(initialValue);
    }
  }

  // Set a new value
  setValue(value: T, timestamp?: number): void {
    const ts = timestamp || Date.now();
    
    if (ts > this.timestamp || (ts === this.timestamp && this.nodeId > this.getValueNodeId())) {
      this.value = value;
      this.timestamp = ts;
    }
  }

  // Get the current value
  getValue(): T | undefined {
    return this.value;
  }

  // Get the timestamp of the current value
  getTimestamp(): number {
    return this.timestamp;
  }

  // Merge with another LWW-Register
  merge(other: LWWRegister<T>): LWWRegister<T> {
    const merged = new LWWRegister<T>(this.nodeId);
    
    if (this.timestamp > other.timestamp || 
        (this.timestamp === other.timestamp && this.nodeId > other.nodeId)) {
      merged.value = this.value;
      merged.timestamp = this.timestamp;
    } else {
      merged.value = other.value;
      merged.timestamp = other.timestamp;
    }
    
    return merged;
  }

  private getValueNodeId(): string {
    return this.nodeId; // Simplified - in practice, you'd store the node ID with each write
  }
}
\`\`\`

## Load Balancing and Service Discovery

### Consistent Hashing Implementation
\`\`\`typescript
// src/load-balancing/consistent-hashing/ConsistentHashing.ts
import { createHash } from 'crypto';

export interface Node {
  id: string;
  address: string;
  weight?: number;
}

export class ConsistentHashing {
  private ring: Map<number, Node> = new Map();
  private virtualNodes: number;
  private hashRing: number[] = [];

  constructor(virtualNodes: number = 150) {
    this.virtualNodes = virtualNodes;
  }

  // Add a node to the hash ring
  addNode(node: Node): void {
    const weight = node.weight || 1;
    const virtualNodeCount = this.virtualNodes * weight;

    for (let i = 0; i < virtualNodeCount; i++) {
      const virtualNodeKey = \`\${node.id}:\${i}\`;
      const hash = this.hash(virtualNodeKey);
      this.ring.set(hash, node);
    }

    this.updateHashRing();
    console.log(\`Added node \${node.id} with \${virtualNodeCount} virtual nodes\`);
  }

  // Remove a node from the hash ring
  removeNode(nodeId: string): void {
    const toRemove: number[] = [];
    
    this.ring.forEach((node, hash) => {
      if (node.id === nodeId) {
        toRemove.push(hash);
      }
    });

    toRemove.forEach(hash => this.ring.delete(hash));
    this.updateHashRing();
    
    console.log(\`Removed node \${nodeId}\`);
  }

  // Get the node responsible for a given key
  getNode(key: string): Node | null {
    if (this.ring.size === 0) {
      return null;
    }

    const hash = this.hash(key);
    
    // Find the first node with hash >= key hash
    let nodeHash = this.findNextNode(hash);
    if (nodeHash === -1) {
      // Wrap around to the first node
      nodeHash = this.hashRing[0];
    }

    return this.ring.get(nodeHash) || null;
  }

  // Get multiple nodes for replication
  getNodes(key: string, count: number): Node[] {
    if (this.ring.size === 0 || count <= 0) {
      return [];
    }

    const hash = this.hash(key);
    const nodes: Node[] = [];
    const uniqueNodes = new Set<string>();
    let currentIndex = this.findNextNodeIndex(hash);

    while (nodes.length < count && nodes.length < this.getUniqueNodeCount()) {
      if (currentIndex === -1) {
        currentIndex = 0;
      }

      const nodeHash = this.hashRing[currentIndex];
      const node = this.ring.get(nodeHash);

      if (node && !uniqueNodes.has(node.id)) {
        nodes.push(node);
        uniqueNodes.add(node.id);
      }

      currentIndex = (currentIndex + 1) % this.hashRing.length;
    }

    return nodes;
  }

  // Get load distribution statistics
  getLoadDistribution(keys: string[]): Map<string, number> {
    const distribution = new Map<string, number>();
    
    // Initialize all nodes with 0
    const uniqueNodes = new Set<string>();
    this.ring.forEach(node => uniqueNodes.add(node.id));
    uniqueNodes.forEach(nodeId => distribution.set(nodeId, 0));

    // Count key assignments
    keys.forEach(key => {
      const node = this.getNode(key);
      if (node) {
        distribution.set(node.id, (distribution.get(node.id) || 0) + 1);
      }
    });

    return distribution;
  }

  // Analyze load balance quality
  analyzeLoadBalance(keys: string[]): {
    distribution: Map<string, number>;
    standardDeviation: number;
    maxDeviation: number;
    isBalanced: boolean;
  } {
    const distribution = this.getLoadDistribution(keys);
    const counts = Array.from(distribution.values());
    const mean = counts.reduce((sum, count) => sum + count, 0) / counts.length;
    
    const variance = counts.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / counts.length;
    const standardDeviation = Math.sqrt(variance);
    const maxDeviation = Math.max(...counts.map(count => Math.abs(count - mean)));
    
    // Consider balanced if standard deviation is less than 10% of mean
    const isBalanced = standardDeviation < (mean * 0.1);

    return {
      distribution,
      standardDeviation,
      maxDeviation,
      isBalanced
    };
  }

  private hash(key: string): number {
    return parseInt(createHash('md5').update(key).digest('hex').substring(0, 8), 16);
  }

  private updateHashRing(): void {
    this.hashRing = Array.from(this.ring.keys()).sort((a, b) => a - b);
  }

  private findNextNode(hash: number): number {
    for (const nodeHash of this.hashRing) {
      if (nodeHash >= hash) {
        return nodeHash;
      }
    }
    return -1; // Not found, should wrap around
  }

  private findNextNodeIndex(hash: number): number {
    for (let i = 0; i < this.hashRing.length; i++) {
      if (this.hashRing[i] >= hash) {
        return i;
      }
    }
    return -1; // Not found, should wrap around
  }

  private getUniqueNodeCount(): number {
    const uniqueNodes = new Set<string>();
    this.ring.forEach(node => uniqueNodes.add(node.id));
    return uniqueNodes.size;
  }

  // Get current ring statistics
  getRingStats(): {
    totalVirtualNodes: number;
    uniqueNodes: number;
    ringSize: number;
    nodes: Node[];
  } {
    const uniqueNodes = new Set<string>();
    const nodeMap = new Map<string, Node>();
    
    this.ring.forEach(node => {
      uniqueNodes.add(node.id);
      nodeMap.set(node.id, node);
    });

    return {
      totalVirtualNodes: this.ring.size,
      uniqueNodes: uniqueNodes.size,
      ringSize: this.hashRing.length,
      nodes: Array.from(nodeMap.values())
    };
  }

  // Visualize the ring (for debugging)
  visualizeRing(): string {
    const visualization: string[] = [];
    
    this.hashRing.forEach(hash => {
      const node = this.ring.get(hash);
      visualization.push(\`\${hash}: \${node?.id}\`);
    });

    return visualization.join('\\n');
  }
}
\`\`\`

## Monitoring and Observability

### Distributed System Health Monitoring
\`\`\`typescript
// src/monitoring/health-checks/SystemHealthMonitor.ts
export interface HealthCheck {
  name: string;
  check: () => Promise<HealthStatus>;
  timeout: number;
  interval: number;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  details?: any;
  timestamp: number;
  responseTime: number;
}

export interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  checks: Map<string, HealthStatus>;
  lastUpdated: number;
}

export class SystemHealthMonitor {
  private healthChecks: Map<string, HealthCheck> = new Map();
  private healthStatus: Map<string, HealthStatus> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private isRunning: boolean = false;

  // Register a health check
  registerCheck(check: HealthCheck): void {
    this.healthChecks.set(check.name, check);
    console.log(\`Registered health check: \${check.name}\`);
  }

  // Start monitoring
  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    
    this.healthChecks.forEach((check, name) => {
      this.runHealthCheck(name);
      
      const interval = setInterval(() => {
        this.runHealthCheck(name);
      }, check.interval);
      
      this.intervals.set(name, interval);
    });

    console.log('System health monitoring started');
  }

  // Stop monitoring
  stop(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    this.isRunning = false;
    console.log('System health monitoring stopped');
  }

  // Get current system health
  getSystemHealth(): SystemHealth {
    const overall = this.calculateOverallHealth();
    
    return {
      overall,
      checks: new Map(this.healthStatus),
      lastUpdated: Date.now()
    };
  }

  // Get health status for a specific check
  getCheckHealth(checkName: string): HealthStatus | null {
    return this.healthStatus.get(checkName) || null;
  }

  // Run a specific health check manually
  async runHealthCheck(checkName: string): Promise<HealthStatus> {
    const check = this.healthChecks.get(checkName);
    if (!check) {
      throw new Error(\`Health check '\${checkName}' not found\`);
    }

    const startTime = Date.now();
    
    try {
      const timeoutPromise = new Promise<HealthStatus>((_, reject) => {
        setTimeout(() => reject(new Error('Health check timeout')), check.timeout);
      });

      const checkPromise = check.check();
      const result = await Promise.race([checkPromise, timeoutPromise]);
      
      const responseTime = Date.now() - startTime;
      const status: HealthStatus = {
        ...result,
        timestamp: Date.now(),
        responseTime
      };

      this.healthStatus.set(checkName, status);
      return status;
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const status: HealthStatus = {
        status: 'unhealthy',
        details: { error: error.message },
        timestamp: Date.now(),
        responseTime
      };

      this.healthStatus.set(checkName, status);
      return status;
    }
  }

  private calculateOverallHealth(): 'healthy' | 'degraded' | 'unhealthy' {
    if (this.healthStatus.size === 0) {
      return 'unhealthy';
    }

    let healthyCount = 0;
    let degradedCount = 0;
    let unhealthyCount = 0;

    this.healthStatus.forEach(status => {
      switch (status.status) {
        case 'healthy':
          healthyCount++;
          break;
        case 'degraded':
          degradedCount++;
          break;
        case 'unhealthy':
          unhealthyCount++;
          break;
      }
    });

    // If any critical checks are unhealthy, system is unhealthy
    if (unhealthyCount > 0) {
      return 'unhealthy';
    }

    // If any checks are degraded, system is degraded
    if (degradedCount > 0) {
      return 'degraded';
    }

    return 'healthy';
  }
}

// Example health checks
export class CommonHealthChecks {
  static database(connectionPool: any): HealthCheck {
    return {
      name: 'database',
      timeout: 5000,
      interval: 30000,
      check: async (): Promise<HealthStatus> => {
        const startTime = Date.now();
        
        try {
          await connectionPool.query('SELECT 1');
          return {
            status: 'healthy',
            timestamp: Date.now(),
            responseTime: Date.now() - startTime
          };
        } catch (error) {
          return {
            status: 'unhealthy',
            details: { error: error.message },
            timestamp: Date.now(),
            responseTime: Date.now() - startTime
          };
        }
      }
    };
  }

  static externalService(serviceUrl: string): HealthCheck {
    return {
      name: \`external-service-\${serviceUrl}\`,
      timeout: 10000,
      interval: 60000,
      check: async (): Promise<HealthStatus> => {
        const startTime = Date.now();
        
        try {
          const response = await fetch(\`\${serviceUrl}/health\`);
          const responseTime = Date.now() - startTime;
          
          if (response.ok) {
            return {
              status: 'healthy',
              timestamp: Date.now(),
              responseTime
            };
          } else {
            return {
              status: 'degraded',
              details: { statusCode: response.status, statusText: response.statusText },
              timestamp: Date.now(),
              responseTime
            };
          }
        } catch (error) {
          return {
            status: 'unhealthy',
            details: { error: error.message },
            timestamp: Date.now(),
            responseTime: Date.now() - startTime
          };
        }
      }
    };
  }

  static memory(): HealthCheck {
    return {
      name: 'memory',
      timeout: 1000,
      interval: 15000,
      check: async (): Promise<HealthStatus> => {
        const memUsage = process.memoryUsage();
        const freeMemory = memUsage.heapTotal - memUsage.heapUsed;
        const memoryUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;

        let status: 'healthy' | 'degraded' | 'unhealthy';
        
        if (memoryUsagePercent > 90) {
          status = 'unhealthy';
        } else if (memoryUsagePercent > 75) {
          status = 'degraded';
        } else {
          status = 'healthy';
        }

        return {
          status,
          details: {
            heapUsed: memUsage.heapUsed,
            heapTotal: memUsage.heapTotal,
            freeMemory,
            usagePercent: memoryUsagePercent
          },
          timestamp: Date.now(),
          responseTime: 0
        };
      }
    };
  }

  static diskSpace(path: string = '/'): HealthCheck {
    return {
      name: 'disk-space',
      timeout: 2000,
      interval: 60000,
      check: async (): Promise<HealthStatus> => {
        try {
          const fs = require('fs');
          const stats = fs.statSync(path);
          
          // This is a simplified example - you'd use a proper disk space check
          const freeSpace = 1000000000; // Placeholder
          const totalSpace = 10000000000; // Placeholder
          const usagePercent = ((totalSpace - freeSpace) / totalSpace) * 100;

          let status: 'healthy' | 'degraded' | 'unhealthy';
          
          if (usagePercent > 95) {
            status = 'unhealthy';
          } else if (usagePercent > 85) {
            status = 'degraded';
          } else {
            status = 'healthy';
          }

          return {
            status,
            details: {
              path,
              freeSpace,
              totalSpace,
              usagePercent
            },
            timestamp: Date.now(),
            responseTime: 0
          };
        } catch (error) {
          return {
            status: 'unhealthy',
            details: { error: error.message },
            timestamp: Date.now(),
            responseTime: 0
          };
        }
      }
    };
  }
}
\`\`\`

## Performance Optimization Strategies

### Caching Strategies
- **Multi-level Caching**: L1 (in-memory), L2 (Redis), L3 (database)
- **Cache Coherence**: Maintain consistency across cache layers
- **Cache Warming**: Proactive cache population
- **Cache Invalidation**: Event-driven cache invalidation patterns

### Data Partitioning
- **Horizontal Partitioning**: Shard data across nodes
- **Vertical Partitioning**: Split tables by columns
- **Functional Partitioning**: Separate by feature/domain

### Load Distribution
- **Geographic Distribution**: Route requests to nearest data center
- **Read Replicas**: Scale read operations across replicas
- **Write Sharding**: Distribute writes across multiple masters

This comprehensive distributed systems design provides the foundation for building resilient, scalable applications that can handle the complexities of distributed computing while maintaining consistency, availability, and partition tolerance according to your specific requirements.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];