import { ClaudeMdConfig } from '../types';

export const advancedArchitectureConfigs: ClaudeMdConfig[] = [
  {
    id: 'microservices-architecture',
    title: 'Microservices Architecture + Service Mesh',
    slug: 'microservices-architecture-service-mesh',
    description: 'Complete microservices architecture setup with service mesh, API gateway, service discovery, and distributed communication patterns.',
    category: 'Claude.md Configurations',
    tags: ['microservices', 'service-mesh', 'api-gateway', 'distributed-systems', 'kubernetes'],
    difficulty: 'ADVANCED',
    language: 'Multiple',
    framework: 'Kubernetes + Istio',
    content: `# Claude.md - Microservices Architecture + Service Mesh

## Project Overview

This is a comprehensive microservices architecture implementation using Kubernetes, Istio service mesh, and modern distributed systems patterns. The setup includes API gateway, service discovery, inter-service communication, and observability.

## Technology Stack

- **Orchestration**: Kubernetes
- **Service Mesh**: Istio
- **API Gateway**: Istio Gateway + Envoy Proxy
- **Service Discovery**: Kubernetes DNS + Istio
- **Communication**: gRPC, REST, Message Queues
- **Observability**: Jaeger, Prometheus, Grafana
- **Security**: mTLS, RBAC, Network Policies

## Architecture Patterns

### 1. Domain-Driven Design (DDD)
- Organize services by business domains
- Define clear bounded contexts
- Implement domain models and aggregates
- Use ubiquitous language across teams

### 2. Service Communication Patterns
- **Synchronous**: REST APIs, gRPC
- **Asynchronous**: Event-driven messaging
- **Request-Response**: Direct service calls
- **Publish-Subscribe**: Event notifications

### 3. Data Management Patterns
- Database per service
- Saga pattern for distributed transactions
- Event sourcing for audit trails
- CQRS for read/write separation

## Project Structure

\`\`\`
microservices-platform/
├── services/
│   ├── user-service/        # User management microservice
│   ├── product-service/     # Product catalog microservice
│   ├── order-service/       # Order processing microservice
│   ├── payment-service/     # Payment processing microservice
│   └── notification-service/ # Notification microservice
├── infrastructure/
│   ├── kubernetes/          # K8s manifests
│   ├── istio/              # Service mesh configuration
│   ├── monitoring/         # Observability stack
│   └── security/           # Security policies
├── api-gateway/            # API Gateway configuration
├── shared/
│   ├── proto/              # gRPC protocol definitions
│   ├── events/             # Event schemas
│   └── libraries/          # Shared libraries
└── tools/
    ├── migrations/         # Database migrations
    ├── scripts/            # Deployment scripts
    └── testing/            # Integration tests
\`\`\`

## Development Guidelines

### Service Design Principles
- Single Responsibility: Each service owns one business capability
- Loose Coupling: Minimize dependencies between services
- High Cohesion: Related functionality grouped together
- Autonomous: Services can be developed and deployed independently

### API Design Standards
- Use RESTful conventions for external APIs
- Implement gRPC for internal service communication
- Version APIs properly (v1, v2, etc.)
- Follow OpenAPI specifications
- Implement proper error handling and status codes

### Data Consistency
- Embrace eventual consistency
- Use distributed transactions sparingly
- Implement compensation patterns (Saga)
- Design for idempotency
- Handle partial failures gracefully

## Service Implementation Examples

### User Service (Node.js + Express)
\`\`\`typescript
// services/user-service/src/app.ts
import express from 'express';
import { UserController } from './controllers/UserController';
import { UserRepository } from './repositories/UserRepository';
import { UserService } from './services/UserService';
import { DatabaseConnection } from './infrastructure/database';

const app = express();
app.use(express.json());

// Dependency injection
const database = new DatabaseConnection();
const userRepository = new UserRepository(database);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Routes
app.get('/health', (req, res) => res.json({ status: 'healthy' }));
app.get('/users/:id', userController.getUser.bind(userController));
app.post('/users', userController.createUser.bind(userController));
app.put('/users/:id', userController.updateUser.bind(userController));

// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Service error:', error);
  res.status(500).json({ error: 'Internal service error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\`User service running on port \${PORT}\`);
});
\`\`\`

### Service-to-Service Communication
\`\`\`typescript
// shared/libraries/service-client.ts
import axios, { AxiosInstance } from 'axios';

export class ServiceClient {
  private client: AxiosInstance;

  constructor(baseURL: string, serviceName: string) {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'X-Service-Name': serviceName
      }
    });

    // Add request interceptor for tracing
    this.client.interceptors.request.use((config) => {
      const traceId = this.generateTraceId();
      config.headers['X-Trace-ID'] = traceId;
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Service call failed:', error.message);
        throw new Error(\`Service unavailable: \${error.message}\`);
      }
    );
  }

  async get<T>(path: string): Promise<T> {
    const response = await this.client.get(path);
    return response.data;
  }

  async post<T>(path: string, data: any): Promise<T> {
    const response = await this.client.post(path, data);
    return response.data;
  }

  private generateTraceId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

// Usage in Order Service
export class OrderService {
  private userClient: ServiceClient;
  private productClient: ServiceClient;

  constructor() {
    this.userClient = new ServiceClient('http://user-service:3001', 'order-service');
    this.productClient = new ServiceClient('http://product-service:3002', 'order-service');
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    // Validate user exists
    const user = await this.userClient.get<User>(\`/users/\${orderData.userId}\`);
    
    // Validate products exist and get prices
    const products = await Promise.all(
      orderData.items.map(item => 
        this.productClient.get<Product>(\`/products/\${item.productId}\`)
      )
    );

    // Create order with validated data
    const order = new Order({
      userId: user.id,
      items: orderData.items,
      totalAmount: this.calculateTotal(products, orderData.items)
    });

    return await this.orderRepository.save(order);
  }
}
\`\`\`

## Kubernetes Configuration

### Service Deployment
\`\`\`yaml
# infrastructure/kubernetes/user-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
      version: v1
  template:
    metadata:
      labels:
        app: user-service
        version: v1
    spec:
      containers:
      - name: user-service
        image: user-service:v1.0.0
        ports:
        - containerPort: 3001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: user-service-secrets
              key: database-url
        - name: SERVICE_MESH_ENABLED
          value: "true"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 3001
    name: http
\`\`\`

## Istio Service Mesh Configuration

### Virtual Service and Destination Rule
\`\`\`yaml
# infrastructure/istio/user-service-virtual-service.yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: user-service
spec:
  hosts:
  - user-service
  http:
  - match:
    - headers:
        x-version:
          exact: v2
    route:
    - destination:
        host: user-service
        subset: v2
      weight: 100
  - route:
    - destination:
        host: user-service
        subset: v1
      weight: 100
    timeout: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: user-service
spec:
  host: user-service
  trafficPolicy:
    circuitBreaker:
      consecutiveErrors: 3
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
    loadBalancer:
      simple: LEAST_CONN
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
\`\`\`

### API Gateway Configuration
\`\`\`yaml
# infrastructure/istio/api-gateway.yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: api-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - api.example.com
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: api-tls-secret
    hosts:
    - api.example.com
---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: api-routes
spec:
  hosts:
  - api.example.com
  gateways:
  - api-gateway
  http:
  - match:
    - uri:
        prefix: /api/v1/users
    route:
    - destination:
        host: user-service
  - match:
    - uri:
        prefix: /api/v1/products
    route:
    - destination:
        host: product-service
  - match:
    - uri:
        prefix: /api/v1/orders
    route:
    - destination:
        host: order-service
\`\`\`

## Event-Driven Communication

### Event Publisher
\`\`\`typescript
// shared/libraries/event-publisher.ts
import { EventEmitter } from 'events';

interface DomainEvent {
  id: string;
  type: string;
  aggregateId: string;
  aggregateType: string;
  version: number;
  timestamp: Date;
  data: any;
}

export class EventPublisher {
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  async publish(event: DomainEvent): Promise<void> {
    console.log(\`Publishing event: \${event.type}\`, event);
    
    // Publish to message queue (RabbitMQ, Kafka, etc.)
    await this.publishToMessageQueue(event);
    
    // Emit locally for any listeners
    this.eventEmitter.emit(event.type, event);
  }

  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void {
    this.eventEmitter.on(eventType, handler);
  }

  private async publishToMessageQueue(event: DomainEvent): Promise<void> {
    // Implementation depends on your message queue choice
    // Example with RabbitMQ or Kafka
  }
}

// Usage in User Service
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private eventPublisher: EventPublisher
  ) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    const user = new User(userData);
    await this.userRepository.save(user);

    // Publish domain event
    await this.eventPublisher.publish({
      id: generateEventId(),
      type: 'UserCreated',
      aggregateId: user.id,
      aggregateType: 'User',
      version: 1,
      timestamp: new Date(),
      data: {
        userId: user.id,
        email: user.email,
        name: user.name
      }
    });

    return user;
  }
}
\`\`\`

## Observability and Monitoring

### Distributed Tracing
\`\`\`typescript
// shared/libraries/tracing.ts
import { NodeTracerProvider } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

export function initializeTracing(serviceName: string): void {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION || '1.0.0',
    }),
  });

  provider.addSpanProcessor(
    new BatchSpanProcessor(
      new JaegerExporter({
        endpoint: process.env.JAEGER_ENDPOINT || 'http://jaeger:14268/api/traces',
      })
    )
  );

  provider.register();
  console.log(\`Tracing initialized for service: \${serviceName}\`);
}

// Usage in service
initializeTracing('user-service');
\`\`\`

### Health Checks and Metrics
\`\`\`typescript
// shared/libraries/health-check.ts
interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
}

export class HealthChecker {
  private checks: HealthCheck[] = [];

  addCheck(check: HealthCheck): void {
    this.checks.push(check);
  }

  async checkHealth(): Promise<{ status: string; checks: any[] }> {
    const results = await Promise.all(
      this.checks.map(async (check) => {
        try {
          const healthy = await check.check();
          return { name: check.name, status: healthy ? 'UP' : 'DOWN' };
        } catch (error) {
          return { name: check.name, status: 'DOWN', error: error.message };
        }
      })
    );

    const allHealthy = results.every(result => result.status === 'UP');
    
    return {
      status: allHealthy ? 'UP' : 'DOWN',
      checks: results
    };
  }
}

// Usage
const healthChecker = new HealthChecker();
healthChecker.addCheck({
  name: 'database',
  check: async () => await database.isConnected()
});
healthChecker.addCheck({
  name: 'redis',
  check: async () => await redis.ping()
});
\`\`\`

## Security Implementation

### Service-to-Service Authentication
\`\`\`yaml
# infrastructure/istio/security-policy.yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT
---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: user-service-policy
spec:
  selector:
    matchLabels:
      app: user-service
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/order-service"]
    to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/users/*"]
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/api-gateway"]
    to:
    - operation:
        methods: ["GET", "POST", "PUT", "DELETE"]
\`\`\`

## Testing Strategies

### Integration Testing
\`\`\`typescript
// tools/testing/integration-test.ts
import { TestEnvironment } from './test-environment';

describe('Order Service Integration Tests', () => {
  let testEnv: TestEnvironment;

  beforeAll(async () => {
    testEnv = new TestEnvironment();
    await testEnv.setup();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  test('should create order with valid user and products', async () => {
    // Arrange
    const user = await testEnv.createTestUser();
    const product = await testEnv.createTestProduct();

    // Act
    const order = await testEnv.orderService.createOrder({
      userId: user.id,
      items: [{ productId: product.id, quantity: 2 }]
    });

    // Assert
    expect(order.id).toBeDefined();
    expect(order.userId).toBe(user.id);
    expect(order.items).toHaveLength(1);
  });

  test('should handle user service unavailability gracefully', async () => {
    // Arrange
    await testEnv.simulateServiceDown('user-service');

    // Act & Assert
    await expect(
      testEnv.orderService.createOrder({
        userId: 'invalid-user',
        items: [{ productId: 'product-1', quantity: 1 }]
      })
    ).rejects.toThrow('Service unavailable');
  });
});
\`\`\`

## Deployment and Operations

### CI/CD Pipeline
- Use GitOps workflow with ArgoCD or Flux
- Implement canary deployments with traffic splitting
- Automated rollback on health check failures
- Blue-green deployments for zero-downtime updates

### Monitoring and Alerting
- Service-level objectives (SLOs) and error budgets
- Distributed tracing with Jaeger
- Metrics collection with Prometheus
- Log aggregation with ELK stack
- Alert management with PagerDuty/OpsGenie

### Scaling Strategies
- Horizontal Pod Autoscaler (HPA) based on CPU/memory
- Vertical Pod Autoscaler (VPA) for right-sizing
- Custom metrics autoscaling
- Cluster autoscaling for node management

## Best Practices

### Development
- Domain-driven design for service boundaries
- API-first development approach
- Contract testing between services
- Shared libraries for common functionality
- Proper error handling and circuit breakers

### Operations
- Infrastructure as Code (Terraform/Helm)
- Centralized logging and monitoring
- Security scanning in CI/CD pipeline
- Regular disaster recovery testing
- Cost optimization and resource management

### Team Organization
- Service ownership model
- Cross-functional teams
- DevOps culture and practices
- Documentation and knowledge sharing
- On-call rotation and incident response`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'clean-architecture-implementation',
    title: 'Clean Architecture + Hexagonal Architecture',
    slug: 'clean-architecture-hexagonal-implementation',
    description: 'Complete Clean Architecture implementation with hexagonal architecture, domain modeling, dependency injection, and proper separation of concerns.',
    category: 'Claude.md Configurations',
    tags: ['clean-architecture', 'hexagonal-architecture', 'domain-driven-design', 'dependency-injection', 'solid-principles'],
    difficulty: 'ADVANCED',
    language: 'TypeScript',
    framework: 'Node.js + Domain-Driven Design',
    content: `# Claude.md - Clean Architecture + Hexagonal Architecture

## Project Overview

This is a comprehensive Clean Architecture implementation using hexagonal architecture principles, domain-driven design, and SOLID principles. The project demonstrates proper separation of concerns, dependency inversion, and testable, maintainable code structure.

## Architecture Philosophy

### Clean Architecture Principles
1. **Independence of Frameworks**: The architecture doesn't depend on frameworks
2. **Testable**: Business rules can be tested without UI, database, or external elements
3. **Independent of UI**: The UI can change without changing the rest of the system
4. **Independent of Database**: Business rules are not bound to the database
5. **Independent of External Agency**: Business rules don't know about outside world

### Hexagonal Architecture (Ports and Adapters)
- **Domain Core**: Contains business logic and domain models
- **Ports**: Define interfaces for interaction with external systems
- **Adapters**: Implement the ports, providing concrete implementations
- **Application Services**: Orchestrate domain operations

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Dependency Injection**: inversify or tsyringe
- **Validation**: class-validator, joi
- **Testing**: Jest, supertest
- **Database**: Prisma/TypeORM (as adapter)
- **Web Framework**: Express (as adapter)

## Project Structure

\`\`\`
clean-architecture-app/
├── src/
│   ├── domain/              # Domain Layer (Enterprise Business Rules)
│   │   ├── entities/        # Domain entities
│   │   ├── value-objects/   # Value objects
│   │   ├── repositories/    # Repository interfaces (ports)
│   │   ├── services/        # Domain services
│   │   └── events/          # Domain events
│   ├── application/         # Application Layer (Use Cases)
│   │   ├── use-cases/       # Application use cases
│   │   ├── ports/           # Application ports (interfaces)
│   │   ├── services/        # Application services
│   │   └── dto/             # Data transfer objects
│   ├── infrastructure/      # Infrastructure Layer (Adapters)
│   │   ├── database/        # Database adapters
│   │   ├── external/        # External service adapters
│   │   ├── messaging/       # Message queue adapters
│   │   └── config/          # Configuration
│   ├── presentation/        # Presentation Layer (Controllers)
│   │   ├── http/            # HTTP controllers
│   │   ├── graphql/         # GraphQL resolvers
│   │   ├── cli/             # CLI commands
│   │   └── middleware/      # Web middleware
│   └── main/                # Main Layer (Composition Root)
│       ├── factories/       # Factory pattern implementations
│       ├── di/              # Dependency injection container
│       └── server.ts        # Application entry point
├── tests/
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── e2e/                 # End-to-end tests
└── docs/
    ├── architecture/        # Architecture documentation
    └── domain/              # Domain documentation
\`\`\`

## Domain Layer Implementation

### Domain Entity
\`\`\`typescript
// src/domain/entities/User.ts
import { Email } from '../value-objects/Email';
import { UserId } from '../value-objects/UserId';
import { DomainEvent } from '../events/DomainEvent';
import { UserCreatedEvent } from '../events/UserCreatedEvent';

export class User {
  private _domainEvents: DomainEvent[] = [];

  constructor(
    private readonly _id: UserId,
    private _email: Email,
    private _name: string,
    private _isActive: boolean = true,
    private readonly _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date()
  ) {
    this.validate();
  }

  static create(email: Email, name: string): User {
    const userId = UserId.generate();
    const user = new User(userId, email, name);
    
    // Raise domain event
    user.addDomainEvent(new UserCreatedEvent(userId, email, name));
    
    return user;
  }

  // Getters
  get id(): UserId { return this._id; }
  get email(): Email { return this._email; }
  get name(): string { return this._name; }
  get isActive(): boolean { return this._isActive; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }
  get domainEvents(): DomainEvent[] { return [...this._domainEvents]; }

  // Business methods
  updateEmail(newEmail: Email): void {
    if (this._email.equals(newEmail)) {
      return; // No change needed
    }

    const oldEmail = this._email;
    this._email = newEmail;
    this._updatedAt = new Date();
    
    this.addDomainEvent(new UserEmailUpdatedEvent(this._id, oldEmail, newEmail));
  }

  deactivate(): void {
    if (!this._isActive) {
      throw new Error('User is already inactive');
    }

    this._isActive = false;
    this._updatedAt = new Date();
    
    this.addDomainEvent(new UserDeactivatedEvent(this._id));
  }

  activate(): void {
    if (this._isActive) {
      throw new Error('User is already active');
    }

    this._isActive = true;
    this._updatedAt = new Date();
    
    this.addDomainEvent(new UserActivatedEvent(this._id));
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }

  private addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('User name cannot be empty');
    }

    if (this._name.length > 100) {
      throw new Error('User name cannot exceed 100 characters');
    }
  }

  // For persistence mapping
  toPersistence(): any {
    return {
      id: this._id.value,
      email: this._email.value,
      name: this._name,
      isActive: this._isActive,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }

  static fromPersistence(data: any): User {
    return new User(
      new UserId(data.id),
      new Email(data.email),
      data.name,
      data.isActive,
      data.createdAt,
      data.updatedAt
    );
  }
}
\`\`\`

### Value Objects
\`\`\`typescript
// src/domain/value-objects/Email.ts
export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }

  private validate(): void {
    if (!this._value) {
      throw new Error('Email cannot be empty');
    }

    if (!Email.EMAIL_REGEX.test(this._value)) {
      throw new Error('Invalid email format');
    }

    if (this._value.length > 255) {
      throw new Error('Email cannot exceed 255 characters');
    }
  }
}

// src/domain/value-objects/UserId.ts
import { v4 as uuidv4 } from 'uuid';

export class UserId {
  constructor(private readonly _value: string) {
    this.validate();
  }

  static generate(): UserId {
    return new UserId(uuidv4());
  }

  get value(): string {
    return this._value;
  }

  equals(other: UserId): boolean {
    return this._value === other._value;
  }

  private validate(): void {
    if (!this._value) {
      throw new Error('UserId cannot be empty');
    }

    // UUID validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(this._value)) {
      throw new Error('UserId must be a valid UUID');
    }
  }
}
\`\`\`

### Domain Repository Interface (Port)
\`\`\`typescript
// src/domain/repositories/UserRepository.ts
import { User } from '../entities/User';
import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findAll(offset?: number, limit?: number): Promise<User[]>;
  delete(id: UserId): Promise<void>;
  exists(id: UserId): Promise<boolean>;
}
\`\`\`

### Domain Service
\`\`\`typescript
// src/domain/services/UserDomainService.ts
import { User } from '../entities/User';
import { Email } from '../value-objects/Email';
import { UserRepository } from '../repositories/UserRepository';

export class UserDomainService {
  constructor(private readonly userRepository: UserRepository) {}

  async isEmailUnique(email: Email, excludeUserId?: UserId): Promise<boolean> {
    const existingUser = await this.userRepository.findByEmail(email);
    
    if (!existingUser) {
      return true;
    }

    if (excludeUserId && existingUser.id.equals(excludeUserId)) {
      return true;
    }

    return false;
  }

  async canUserBeDeleted(userId: UserId): Promise<{ canDelete: boolean; reason?: string }> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      return { canDelete: false, reason: 'User not found' };
    }

    // Business rule: Only inactive users can be deleted
    if (user.isActive) {
      return { canDelete: false, reason: 'Active users cannot be deleted' };
    }

    // Add more business rules as needed
    // e.g., check if user has pending orders, etc.

    return { canDelete: true };
  }
}
\`\`\`

## Application Layer Implementation

### Use Case
\`\`\`typescript
// src/application/use-cases/CreateUser.ts
import { User } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/Email';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserDomainService } from '../../domain/services/UserDomainService';
import { EventPublisher } from '../ports/EventPublisher';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UserDto } from '../dto/UserDto';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDomainService: UserDomainService,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(dto: CreateUserDto): Promise<UserDto> {
    // Validate input
    const email = new Email(dto.email);

    // Check business rules
    const isEmailUnique = await this.userDomainService.isEmailUnique(email);
    if (!isEmailUnique) {
      throw new Error('Email already exists');
    }

    // Create domain entity
    const user = User.create(email, dto.name);

    // Persist
    await this.userRepository.save(user);

    // Publish domain events
    const domainEvents = user.domainEvents;
    user.clearDomainEvents();

    for (const event of domainEvents) {
      await this.eventPublisher.publish(event);
    }

    // Return DTO
    return UserDto.fromDomain(user);
  }
}
\`\`\`

### Data Transfer Objects
\`\`\`typescript
// src/application/dto/UserDto.ts
import { User } from '../../domain/entities/User';

export class UserDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromDomain(user: User): UserDto {
    return new UserDto(
      user.id.value,
      user.email.value,
      user.name,
      user.isActive,
      user.createdAt,
      user.updatedAt
    );
  }
}

// src/application/dto/CreateUserDto.ts
export class CreateUserDto {
  constructor(
    public readonly email: string,
    public readonly name: string
  ) {}
}

// src/application/dto/UpdateUserDto.ts
export class UpdateUserDto {
  constructor(
    public readonly email?: string,
    public readonly name?: string
  ) {}
}
\`\`\`

### Application Ports
\`\`\`typescript
// src/application/ports/EventPublisher.ts
import { DomainEvent } from '../../domain/events/DomainEvent';

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}

// src/application/ports/Logger.ts
export interface Logger {
  info(message: string, context?: any): void;
  error(message: string, error?: Error, context?: any): void;
  warn(message: string, context?: any): void;
  debug(message: string, context?: any): void;
}

// src/application/ports/EmailService.ts
export interface EmailService {
  sendWelcomeEmail(to: string, name: string): Promise<void>;
  sendPasswordResetEmail(to: string, resetToken: string): Promise<void>;
}
\`\`\`

## Infrastructure Layer Implementation

### Database Adapter
\`\`\`typescript
// src/infrastructure/database/UserRepositoryImpl.ts
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';
import { Email } from '../../domain/value-objects/Email';
import { PrismaClient } from '@prisma/client';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    const userData = user.toPersistence();
    
    await this.prisma.user.upsert({
      where: { id: userData.id },
      update: {
        email: userData.email,
        name: userData.name,
        isActive: userData.isActive,
        updatedAt: userData.updatedAt
      },
      create: userData
    });
  }

  async findById(id: UserId): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id: id.value }
    });

    return userData ? User.fromPersistence(userData) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.value }
    });

    return userData ? User.fromPersistence(userData) : null;
  }

  async findAll(offset = 0, limit = 50): Promise<User[]> {
    const usersData = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    return usersData.map(userData => User.fromPersistence(userData));
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.value }
    });
  }

  async exists(id: UserId): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { id: id.value }
    });

    return count > 0;
  }
}
\`\`\`

### External Service Adapters
\`\`\`typescript
// src/infrastructure/external/EmailServiceImpl.ts
import { EmailService } from '../../application/ports/EmailService';
import { Logger } from '../../application/ports/Logger';

export class EmailServiceImpl implements EmailService {
  constructor(
    private readonly logger: Logger,
    private readonly smtpConfig: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    }
  ) {}

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    try {
      // Implementation using nodemailer or similar
      this.logger.info('Sending welcome email', { to, name });
      
      // Actual email sending logic here
      
      this.logger.info('Welcome email sent successfully', { to });
    } catch (error) {
      this.logger.error('Failed to send welcome email', error, { to, name });
      throw error;
    }
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    try {
      this.logger.info('Sending password reset email', { to });
      
      // Actual email sending logic here
      
      this.logger.info('Password reset email sent successfully', { to });
    } catch (error) {
      this.logger.error('Failed to send password reset email', error, { to });
      throw error;
    }
  }
}
\`\`\`

## Presentation Layer Implementation

### HTTP Controller
\`\`\`typescript
// src/presentation/http/UserController.ts
import { Request, Response, NextFunction } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/CreateUser';
import { GetUserUseCase } from '../../application/use-cases/GetUser';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUser';
import { CreateUserDto } from '../../application/dto/CreateUserDto';
import { UpdateUserDto } from '../../application/dto/UpdateUserDto';
import { UserId } from '../../domain/value-objects/UserId';
import { validateOrReject } from 'class-validator';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserDto = new CreateUserDto(req.body.email, req.body.name);
      
      // Validate DTO
      await validateOrReject(createUserDto);

      const userDto = await this.createUserUseCase.execute(createUserDto);
      
      res.status(201).json({
        success: true,
        data: userDto
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = new UserId(req.params.id);
      const userDto = await this.getUserUseCase.execute(userId);
      
      if (!userDto) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.json({
        success: true,
        data: userDto
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = new UserId(req.params.id);
      const updateUserDto = new UpdateUserDto(req.body.email, req.body.name);
      
      const userDto = await this.updateUserUseCase.execute(userId, updateUserDto);
      
      res.json({
        success: true,
        data: userDto
      });
    } catch (error) {
      next(error);
    }
  }
}
\`\`\`

## Dependency Injection Setup

### DI Container Configuration
\`\`\`typescript
// src/main/di/Container.ts
import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';

// Domain
import { UserDomainService } from '../../domain/services/UserDomainService';

// Application
import { CreateUserUseCase } from '../../application/use-cases/CreateUser';
import { GetUserUseCase } from '../../application/use-cases/GetUser';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUser';

// Infrastructure
import { UserRepositoryImpl } from '../../infrastructure/database/UserRepositoryImpl';
import { EmailServiceImpl } from '../../infrastructure/external/EmailServiceImpl';
import { ConsoleLoggerImpl } from '../../infrastructure/logging/ConsoleLoggerImpl';
import { EventPublisherImpl } from '../../infrastructure/messaging/EventPublisherImpl';

// Presentation
import { UserController } from '../../presentation/http/UserController';

// Interfaces
import { UserRepository } from '../../domain/repositories/UserRepository';
import { EmailService } from '../../application/ports/EmailService';
import { Logger } from '../../application/ports/Logger';
import { EventPublisher } from '../../application/ports/EventPublisher';

export const container = new Container();

// Infrastructure dependencies
container.bind<PrismaClient>(PrismaClient).toConstantValue(new PrismaClient());
container.bind<Logger>('Logger').to(ConsoleLoggerImpl).inSingletonScope();

// Repository implementations
container.bind<UserRepository>('UserRepository').to(UserRepositoryImpl);

// External service implementations
container.bind<EmailService>('EmailService').to(EmailServiceImpl);
container.bind<EventPublisher>('EventPublisher').to(EventPublisherImpl);

// Domain services
container.bind<UserDomainService>(UserDomainService).toSelf();

// Use cases
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
container.bind<GetUserUseCase>(GetUserUseCase).toSelf();
container.bind<UpdateUserUseCase>(UpdateUserUseCase).toSelf();

// Controllers
container.bind<UserController>(UserController).toSelf();
\`\`\`

### Application Bootstrap
\`\`\`typescript
// src/main/server.ts
import 'reflect-metadata';
import express from 'express';
import { container } from './di/Container';
import { UserController } from '../presentation/http/UserController';
import { errorHandler } from '../presentation/middleware/ErrorHandler';

const app = express();
app.use(express.json());

// Controllers
const userController = container.get<UserController>(UserController);

// Routes
app.post('/users', userController.createUser.bind(userController));
app.get('/users/:id', userController.getUser.bind(userController));
app.put('/users/:id', userController.updateUser.bind(userController));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Testing Strategy

### Unit Tests
\`\`\`typescript
// tests/unit/domain/entities/User.test.ts
import { User } from '../../../../src/domain/entities/User';
import { Email } from '../../../../src/domain/value-objects/Email';
import { UserId } from '../../../../src/domain/value-objects/UserId';

describe('User Entity', () => {
  describe('create', () => {
    it('should create a new user with valid data', () => {
      // Arrange
      const email = new Email('john@example.com');
      const name = 'John Doe';

      // Act
      const user = User.create(email, name);

      // Assert
      expect(user.email).toBe(email);
      expect(user.name).toBe(name);
      expect(user.isActive).toBe(true);
      expect(user.domainEvents).toHaveLength(1);
      expect(user.domainEvents[0].constructor.name).toBe('UserCreatedEvent');
    });

    it('should throw error when name is empty', () => {
      // Arrange
      const email = new Email('john@example.com');
      const name = '';

      // Act & Assert
      expect(() => User.create(email, name)).toThrow('User name cannot be empty');
    });
  });

  describe('updateEmail', () => {
    it('should update email and raise domain event', () => {
      // Arrange
      const user = User.create(new Email('john@example.com'), 'John Doe');
      user.clearDomainEvents(); // Clear creation event
      const newEmail = new Email('john.doe@example.com');

      // Act
      user.updateEmail(newEmail);

      // Assert
      expect(user.email).toBe(newEmail);
      expect(user.domainEvents).toHaveLength(1);
      expect(user.domainEvents[0].constructor.name).toBe('UserEmailUpdatedEvent');
    });
  });
});
\`\`\`

### Integration Tests
\`\`\`typescript
// tests/integration/use-cases/CreateUser.test.ts
import { CreateUserUseCase } from '../../../src/application/use-cases/CreateUser';
import { UserRepositoryImpl } from '../../../src/infrastructure/database/UserRepositoryImpl';
import { TestDatabase } from '../../helpers/TestDatabase';

describe('CreateUser Use Case Integration', () => {
  let testDb: TestDatabase;
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(async () => {
    testDb = new TestDatabase();
    await testDb.setup();
    userRepository = new UserRepositoryImpl(testDb.prisma);
  });

  afterAll(async () => {
    await testDb.cleanup();
  });

  beforeEach(async () => {
    await testDb.clearDatabase();
    
    const userDomainService = new UserDomainService(userRepository);
    const mockEventPublisher = {
      publish: jest.fn()
    };
    
    createUserUseCase = new CreateUserUseCase(
      userRepository,
      userDomainService,
      mockEventPublisher
    );
  });

  it('should create user successfully', async () => {
    // Arrange
    const createUserDto = {
      email: 'john@example.com',
      name: 'John Doe'
    };

    // Act
    const result = await createUserUseCase.execute(createUserDto);

    // Assert
    expect(result.email).toBe(createUserDto.email);
    expect(result.name).toBe(createUserDto.name);
    expect(result.isActive).toBe(true);

    // Verify persistence
    const savedUser = await userRepository.findByEmail(new Email(createUserDto.email));
    expect(savedUser).toBeTruthy();
  });

  it('should throw error when email already exists', async () => {
    // Arrange
    const createUserDto = {
      email: 'john@example.com',
      name: 'John Doe'
    };

    await createUserUseCase.execute(createUserDto);

    // Act & Assert
    await expect(createUserUseCase.execute(createUserDto))
      .rejects
      .toThrow('Email already exists');
  });
});
\`\`\`

## Benefits of This Architecture

### 1. Testability
- Domain logic is isolated and easily testable
- Dependencies are injected, allowing for easy mocking
- Clear separation enables focused unit tests

### 2. Maintainability
- Changes in one layer don't affect others
- Business rules are centralized in the domain layer
- Clear boundaries make the codebase easier to navigate

### 3. Flexibility
- Can switch databases without changing business logic
- Can add new presentation layers (GraphQL, CLI) easily
- External services can be swapped without affecting core logic

### 4. Scalability
- Clear architecture supports team growth
- Domain-driven design enables multiple bounded contexts
- Microservices can be extracted following the same patterns

## Best Practices

### Domain Layer
- Keep domain entities rich with behavior
- Use value objects for data validation
- Raise domain events for important business changes
- Keep dependencies pointing inward only

### Application Layer
- Use cases should be thin orchestrators
- Handle cross-cutting concerns (transactions, events)
- Transform between domain objects and DTOs
- Don't put business logic in use cases

### Infrastructure Layer
- Implement interfaces defined in inner layers
- Handle technical details (database, external APIs)
- Configuration should live here
- Error handling for technical failures

### Testing Strategy
- Write comprehensive unit tests for domain logic
- Integration tests for use cases and repositories
- End-to-end tests for critical user journeys
- Use test doubles for external dependencies`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];