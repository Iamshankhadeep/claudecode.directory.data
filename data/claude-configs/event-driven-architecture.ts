import { ClaudeMdConfig } from '../types';

export const eventDrivenArchitectureConfigs: ClaudeMdConfig[] = [
  {
    id: 'event-driven-architecture-cqrs',
    title: 'Event-Driven Architecture + CQRS',
    slug: 'event-driven-architecture-cqrs-messaging-patterns',
    description: 'Comprehensive event-driven architecture implementation with CQRS, Event Sourcing, Saga patterns, and advanced messaging systems for building scalable, resilient distributed applications.',
    category: 'Claude.md Configurations',
    tags: ['event-driven', 'cqrs', 'event-sourcing', 'messaging', 'saga', 'ddd', 'microservices'],
    difficulty: 'ADVANCED',
    language: 'TypeScript',
    framework: 'Node.js + Event Store + Message Bus',
    content: `# Claude.md - Event-Driven Architecture + CQRS

## Project Overview

This is an advanced event-driven architecture implementation designed for building scalable, resilient distributed systems. It combines Command Query Responsibility Segregation (CQRS), Event Sourcing, Saga patterns, and sophisticated messaging systems to create applications that can handle complex business workflows, maintain data consistency across services, and scale horizontally.

## Architectural Philosophy

### Event-Driven Principles
1. **Loose Coupling**: Services communicate through events, not direct calls
2. **Temporal Decoupling**: Producers and consumers operate independently
3. **Event Immutability**: Events are immutable facts about what happened
4. **Event Ordering**: Maintain causal ordering of related events
5. **Eventual Consistency**: Accept and manage eventual consistency patterns
6. **Resilience**: System continues to function despite partial failures

### CQRS Benefits
- **Segregated Models**: Separate read and write models optimized for their purpose
- **Independent Scaling**: Scale reads and writes independently
- **Performance Optimization**: Optimized queries and denormalized read models
- **Complex Queries**: Support complex reporting without impacting write side
- **Technology Diversity**: Use different technologies for reads and writes

### Event Sourcing Advantages
- **Complete Audit Trail**: Every change is recorded as an event
- **Time Travel**: Replay events to any point in time
- **Debugging Capabilities**: Full system state reconstruction
- **Business Intelligence**: Rich event history for analytics
- **Conflict Resolution**: Natural handling of concurrent updates

## Technology Stack

- **Application Framework**: Node.js with TypeScript
- **Event Store**: EventStore DB / Apache Kafka
- **Message Bus**: RabbitMQ / Apache Kafka / Azure Service Bus
- **Read Models**: MongoDB / PostgreSQL / Elasticsearch
- **Caching**: Redis for read model caching
- **API Gateway**: Kong / Istio for event routing
- **Monitoring**: Prometheus + Grafana for event metrics
- **Tracing**: Jaeger for distributed tracing

## Project Structure

\`\`\`
event-driven-cqrs-system/
├── src/
│   ├── shared/                    # Shared domain and infrastructure
│   │   ├── domain/                # Domain primitives and base classes
│   │   │   ├── base/              # Base domain classes
│   │   │   │   ├── AggregateRoot.ts
│   │   │   │   ├── Entity.ts
│   │   │   │   ├── ValueObject.ts
│   │   │   │   └── DomainEvent.ts
│   │   │   ├── events/            # Domain event definitions
│   │   │   └── exceptions/        # Domain exceptions
│   │   ├── infrastructure/        # Shared infrastructure
│   │   │   ├── eventstore/        # Event store implementation
│   │   │   │   ├── EventStore.ts
│   │   │   │   ├── EventStream.ts
│   │   │   │   └── Snapshot.ts
│   │   │   ├── messaging/         # Message bus implementation
│   │   │   │   ├── MessageBus.ts
│   │   │   │   ├── EventPublisher.ts
│   │   │   │   └── CommandBus.ts
│   │   │   ├── projections/       # Read model projections
│   │   │   └── sagas/             # Saga orchestration
│   │   └── application/           # Application services
│   │       ├── commands/          # Command handlers
│   │       ├── queries/           # Query handlers
│   │       └── services/          # Application services
│   ├── modules/                   # Business modules
│   │   ├── ordering/              # Order management domain
│   │   │   ├── domain/            # Domain models and logic
│   │   │   │   ├── aggregates/    # Aggregate roots
│   │   │   │   │   ├── Order.ts
│   │   │   │   │   └── Customer.ts
│   │   │   │   ├── events/        # Domain events
│   │   │   │   │   ├── OrderCreated.ts
│   │   │   │   │   ├── OrderConfirmed.ts
│   │   │   │   │   └── OrderCancelled.ts
│   │   │   │   ├── valueobjects/  # Value objects
│   │   │   │   └── services/      # Domain services
│   │   │   ├── application/       # Application layer
│   │   │   │   ├── commands/      # Command definitions and handlers
│   │   │   │   │   ├── CreateOrder/
│   │   │   │   │   ├── ConfirmOrder/
│   │   │   │   │   └── CancelOrder/
│   │   │   │   ├── queries/       # Query definitions and handlers
│   │   │   │   │   ├── GetOrder/
│   │   │   │   │   └── GetOrderHistory/
│   │   │   │   └── sagas/         # Process managers
│   │   │   │       └── OrderFulfillmentSaga.ts
│   │   │   ├── infrastructure/    # Infrastructure implementations
│   │   │   │   ├── repositories/  # Event sourced repositories
│   │   │   │   ├── projections/   # Read model projections
│   │   │   │   └── eventhandlers/ # Event handlers
│   │   │   └── presentation/      # API controllers
│   │   │       ├── controllers/   # REST controllers
│   │   │       └── graphql/       # GraphQL resolvers
│   │   ├── inventory/             # Inventory management
│   │   ├── payment/               # Payment processing
│   │   └── shipping/              # Shipping management
│   ├── readmodels/                # Read model definitions
│   │   ├── projections/           # Projection definitions
│   │   ├── views/                 # Materialized views
│   │   └── queries/               # Query implementations
│   └── sagas/                     # Cross-module sagas
│       ├── OrderProcessingSaga.ts # Order processing workflow
│       └── PaymentSaga.ts         # Payment workflow
├── config/                        # Configuration files
│   ├── eventstore.config.ts       # Event store configuration
│   ├── messagebus.config.ts       # Message bus configuration
│   └── projections.config.ts      # Projection configuration
├── migrations/                    # Database migrations
├── tests/                         # Test specifications
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   └── e2e/                       # End-to-end tests
└── docker/                        # Docker configurations
    ├── eventstore/                # EventStore DB
    ├── kafka/                     # Apache Kafka
    └── mongodb/                   # Read model storage
\`\`\`

## Core Domain Implementation

### Base Aggregate Root
\`\`\`typescript
// src/shared/domain/base/AggregateRoot.ts
import { Entity } from './Entity';
import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];
  private _version: number = 0;

  get version(): number {
    return this._version;
  }

  get domainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public markEventsAsCommitted(): void {
    this._version += this._domainEvents.length;
    this._domainEvents = [];
  }

  public loadFromHistory(events: DomainEvent[]): void {
    events.forEach(event => {
      this.apply(event);
      this._version++;
    });
  }

  protected abstract apply(event: DomainEvent): void;

  public getUncommittedEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }
}
\`\`\`

### Domain Event Base Class
\`\`\`typescript
// src/shared/domain/base/DomainEvent.ts
export abstract class DomainEvent {
  public readonly aggregateId: string;
  public readonly eventVersion: number;
  public readonly occurredOn: Date;
  public readonly eventId: string;

  constructor(
    aggregateId: string,
    eventVersion: number,
    eventId: string = crypto.randomUUID()
  ) {
    this.aggregateId = aggregateId;
    this.eventVersion = eventVersion;
    this.occurredOn = new Date();
    this.eventId = eventId;
  }

  abstract getEventName(): string;
  abstract getEventData(): Record<string, any>;
}
\`\`\`

### Order Aggregate Example
\`\`\`typescript
// src/modules/ordering/domain/aggregates/Order.ts
import { AggregateRoot } from '../../../shared/domain/base/AggregateRoot';
import { OrderCreated } from '../events/OrderCreated';
import { OrderConfirmed } from '../events/OrderConfirmed';
import { OrderCancelled } from '../events/OrderCancelled';
import { OrderItem } from '../valueobjects/OrderItem';
import { Money } from '../valueobjects/Money';
import { DomainEvent } from '../../../shared/domain/base/DomainEvent';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class Order extends AggregateRoot<string> {
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _status: OrderStatus = OrderStatus.PENDING;
  private _totalAmount: Money;
  private _createdAt: Date;
  private _confirmedAt?: Date;
  private _cancelledAt?: Date;

  private constructor(id: string) {
    super(id);
  }

  public static create(
    orderId: string,
    customerId: string,
    items: OrderItem[]
  ): Order {
    const order = new Order(orderId);
    
    const totalAmount = items.reduce(
      (sum, item) => sum.add(item.totalPrice),
      Money.zero('USD')
    );

    const event = new OrderCreated(
      orderId,
      1,
      customerId,
      items.map(item => item.toDto()),
      totalAmount.toDto(),
      new Date()
    );

    order.apply(event);
    order.addDomainEvent(event);
    
    return order;
  }

  public confirm(): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new Error(\`Cannot confirm order in \${this._status} status\`);
    }

    const event = new OrderConfirmed(
      this.id,
      this.version + 1,
      new Date()
    );

    this.apply(event);
    this.addDomainEvent(event);
  }

  public cancel(reason: string): void {
    if (this._status === OrderStatus.DELIVERED || this._status === OrderStatus.CANCELLED) {
      throw new Error(\`Cannot cancel order in \${this._status} status\`);
    }

    const event = new OrderCancelled(
      this.id,
      this.version + 1,
      reason,
      new Date()
    );

    this.apply(event);
    this.addDomainEvent(event);
  }

  protected apply(event: DomainEvent): void {
    switch (event.constructor.name) {
      case 'OrderCreated':
        this.applyOrderCreated(event as OrderCreated);
        break;
      case 'OrderConfirmed':
        this.applyOrderConfirmed(event as OrderConfirmed);
        break;
      case 'OrderCancelled':
        this.applyOrderCancelled(event as OrderCancelled);
        break;
      default:
        throw new Error(\`Unknown event type: \${event.constructor.name}\`);
    }
  }

  private applyOrderCreated(event: OrderCreated): void {
    this._customerId = event.customerId;
    this._items = event.items.map(item => OrderItem.fromDto(item));
    this._totalAmount = Money.fromDto(event.totalAmount);
    this._createdAt = event.createdAt;
    this._status = OrderStatus.PENDING;
  }

  private applyOrderConfirmed(event: OrderConfirmed): void {
    this._status = OrderStatus.CONFIRMED;
    this._confirmedAt = event.confirmedAt;
  }

  private applyOrderCancelled(event: OrderCancelled): void {
    this._status = OrderStatus.CANCELLED;
    this._cancelledAt = event.cancelledAt;
  }

  // Getters
  get customerId(): string { return this._customerId; }
  get items(): OrderItem[] { return [...this._items]; }
  get status(): OrderStatus { return this._status; }
  get totalAmount(): Money { return this._totalAmount; }
  get createdAt(): Date { return this._createdAt; }
  get confirmedAt(): Date | undefined { return this._confirmedAt; }
  get cancelledAt(): Date | undefined { return this._cancelledAt; }
}
\`\`\`

## CQRS Implementation

### Command Handler Example
\`\`\`typescript
// src/modules/ordering/application/commands/CreateOrder/CreateOrderHandler.ts
import { CommandHandler } from '../../../../shared/application/CommandHandler';
import { CreateOrderCommand } from './CreateOrderCommand';
import { OrderRepository } from '../../infrastructure/repositories/OrderRepository';
import { EventPublisher } from '../../../../shared/infrastructure/messaging/EventPublisher';
import { Order } from '../../domain/aggregates/Order';
import { OrderItem } from '../../domain/valueobjects/OrderItem';

export class CreateOrderHandler implements CommandHandler<CreateOrderCommand> {
  constructor(
    private orderRepository: OrderRepository,
    private eventPublisher: EventPublisher
  ) {}

  async handle(command: CreateOrderCommand): Promise<void> {
    // Validate command
    if (!command.customerId || command.items.length === 0) {
      throw new Error('Invalid create order command');
    }

    // Check if order already exists
    const existingOrder = await this.orderRepository.findById(command.orderId);
    if (existingOrder) {
      throw new Error(\`Order with id \${command.orderId} already exists\`);
    }

    // Create order items
    const orderItems = command.items.map(item => 
      OrderItem.create(
        item.productId,
        item.productName,
        item.quantity,
        Money.create(item.unitPrice, item.currency)
      )
    );

    // Create order aggregate
    const order = Order.create(
      command.orderId,
      command.customerId,
      orderItems
    );

    // Save to event store
    await this.orderRepository.save(order);

    // Publish domain events
    const events = order.getUncommittedEvents();
    for (const event of events) {
      await this.eventPublisher.publish(event);
    }

    order.markEventsAsCommitted();
  }
}
\`\`\`

### Query Handler Example
\`\`\`typescript
// src/modules/ordering/application/queries/GetOrder/GetOrderHandler.ts
import { QueryHandler } from '../../../../shared/application/QueryHandler';
import { GetOrderQuery } from './GetOrderQuery';
import { OrderView } from './OrderView';
import { OrderReadModelRepository } from '../../infrastructure/projections/OrderReadModelRepository';

export class GetOrderHandler implements QueryHandler<GetOrderQuery, OrderView> {
  constructor(
    private orderReadModelRepository: OrderReadModelRepository
  ) {}

  async handle(query: GetOrderQuery): Promise<OrderView | null> {
    const orderReadModel = await this.orderReadModelRepository.findById(query.orderId);
    
    if (!orderReadModel) {
      return null;
    }

    return {
      id: orderReadModel.id,
      customerId: orderReadModel.customerId,
      status: orderReadModel.status,
      items: orderReadModel.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })),
      totalAmount: orderReadModel.totalAmount,
      createdAt: orderReadModel.createdAt,
      confirmedAt: orderReadModel.confirmedAt,
      cancelledAt: orderReadModel.cancelledAt
    };
  }
}
\`\`\`

## Event Store Implementation

### Event Store Interface
\`\`\`typescript
// src/shared/infrastructure/eventstore/EventStore.ts
import { DomainEvent } from '../../domain/base/DomainEvent';
import { EventStream } from './EventStream';

export interface EventStore {
  saveEvents(
    aggregateId: string,
    events: DomainEvent[],
    expectedVersion: number
  ): Promise<void>;

  getEventsForAggregate(
    aggregateId: string,
    fromVersion?: number
  ): Promise<EventStream>;

  getAllEvents(
    fromPosition?: number,
    maxCount?: number
  ): Promise<DomainEvent[]>;

  subscribeToAll(
    onEvent: (event: DomainEvent) => Promise<void>,
    onError?: (error: Error) => void
  ): Promise<void>;

  subscribeToStream(
    streamName: string,
    onEvent: (event: DomainEvent) => Promise<void>,
    onError?: (error: Error) => void
  ): Promise<void>;
}
\`\`\`

### EventStore DB Implementation
\`\`\`typescript
// src/shared/infrastructure/eventstore/EventStoreDbImplementation.ts
import { EventStore } from './EventStore';
import { DomainEvent } from '../../domain/base/DomainEvent';
import { EventStream } from './EventStream';
import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client';

export class EventStoreDbImplementation implements EventStore {
  constructor(private client: EventStoreDBClient) {}

  async saveEvents(
    aggregateId: string,
    events: DomainEvent[],
    expectedVersion: number
  ): Promise<void> {
    const streamName = \`order-\${aggregateId}\`;
    
    const eventData = events.map(event => 
      jsonEvent({
        type: event.getEventName(),
        data: {
          ...event.getEventData(),
          aggregateId: event.aggregateId,
          eventVersion: event.eventVersion,
          occurredOn: event.occurredOn.toISOString(),
          eventId: event.eventId
        }
      })
    );

    try {
      await this.client.appendToStream(streamName, eventData, {
        expectedRevision: expectedVersion === 0 ? 'no_stream' : BigInt(expectedVersion - 1)
      });
    } catch (error) {
      if (error.type === 'wrong-expected-version') {
        throw new Error(\`Concurrency conflict for aggregate \${aggregateId}\`);
      }
      throw error;
    }
  }

  async getEventsForAggregate(
    aggregateId: string,
    fromVersion: number = 0
  ): Promise<EventStream> {
    const streamName = \`order-\${aggregateId}\`;
    
    try {
      const events = this.client.readStream(streamName, {
        fromRevision: BigInt(fromVersion),
        direction: 'forwards',
        maxCount: 1000
      });

      const domainEvents: DomainEvent[] = [];
      
      for await (const resolvedEvent of events) {
        const eventData = resolvedEvent.event?.data;
        if (eventData) {
          const domainEvent = this.deserializeEvent(
            resolvedEvent.event.type,
            eventData
          );
          domainEvents.push(domainEvent);
        }
      }

      return new EventStream(aggregateId, domainEvents, domainEvents.length);
    } catch (error) {
      if (error.type === 'stream-not-found') {
        return new EventStream(aggregateId, [], 0);
      }
      throw error;
    }
  }

  async getAllEvents(
    fromPosition: number = 0,
    maxCount: number = 1000
  ): Promise<DomainEvent[]> {
    const events = this.client.readAll({
      fromPosition: fromPosition > 0 ? { prepare: BigInt(fromPosition), commit: BigInt(fromPosition) } : 'start',
      direction: 'forwards',
      maxCount
    });

    const domainEvents: DomainEvent[] = [];
    
    for await (const resolvedEvent of events) {
      const eventData = resolvedEvent.event?.data;
      if (eventData) {
        const domainEvent = this.deserializeEvent(
          resolvedEvent.event.type,
          eventData
        );
        domainEvents.push(domainEvent);
      }
    }

    return domainEvents;
  }

  async subscribeToAll(
    onEvent: (event: DomainEvent) => Promise<void>,
    onError?: (error: Error) => void
  ): Promise<void> {
    const subscription = this.client.subscribeToAll({
      fromPosition: 'start'
    });

    for await (const resolvedEvent of subscription) {
      try {
        const eventData = resolvedEvent.event?.data;
        if (eventData) {
          const domainEvent = this.deserializeEvent(
            resolvedEvent.event.type,
            eventData
          );
          await onEvent(domainEvent);
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
        } else {
          console.error('Error processing event:', error);
        }
      }
    }
  }

  private deserializeEvent(eventType: string, eventData: any): DomainEvent {
    // Event factory to create concrete event instances
    // This would typically use a registry pattern
    switch (eventType) {
      case 'OrderCreated':
        return new OrderCreated(
          eventData.aggregateId,
          eventData.eventVersion,
          eventData.customerId,
          eventData.items,
          eventData.totalAmount,
          new Date(eventData.createdAt),
          eventData.eventId
        );
      // Add other event types...
      default:
        throw new Error(\`Unknown event type: \${eventType}\`);
    }
  }
}
\`\`\`

## Saga Pattern Implementation

### Order Processing Saga
\`\`\`typescript
// src/sagas/OrderProcessingSaga.ts
import { Saga } from '../shared/infrastructure/sagas/Saga';
import { OrderCreated } from '../modules/ordering/domain/events/OrderCreated';
import { PaymentProcessed } from '../modules/payment/domain/events/PaymentProcessed';
import { InventoryReserved } from '../modules/inventory/domain/events/InventoryReserved';
import { CommandBus } from '../shared/infrastructure/messaging/CommandBus';
import { ProcessPaymentCommand } from '../modules/payment/application/commands/ProcessPayment/ProcessPaymentCommand';
import { ReserveInventoryCommand } from '../modules/inventory/application/commands/ReserveInventory/ReserveInventoryCommand';
import { ConfirmOrderCommand } from '../modules/ordering/application/commands/ConfirmOrder/ConfirmOrderCommand';

export class OrderProcessingSaga extends Saga {
  private orderData: Map<string, any> = new Map();

  constructor(private commandBus: CommandBus) {
    super();
  }

  protected configureSaga(): void {
    this.startedBy<OrderCreated>(OrderCreated, this.handleOrderCreated.bind(this));
    this.handles<PaymentProcessed>(PaymentProcessed, this.handlePaymentProcessed.bind(this));
    this.handles<InventoryReserved>(InventoryReserved, this.handleInventoryReserved.bind(this));
  }

  private async handleOrderCreated(event: OrderCreated): Promise<void> {
    const orderId = event.aggregateId;
    
    // Store saga state
    this.orderData.set(orderId, {
      orderId,
      customerId: event.customerId,
      totalAmount: event.totalAmount,
      items: event.items,
      paymentProcessed: false,
      inventoryReserved: false
    });

    // Start payment processing
    const processPaymentCommand = new ProcessPaymentCommand(
      crypto.randomUUID(),
      orderId,
      event.customerId,
      event.totalAmount.amount,
      event.totalAmount.currency
    );

    await this.commandBus.send(processPaymentCommand);

    // Start inventory reservation
    const reserveInventoryCommand = new ReserveInventoryCommand(
      crypto.randomUUID(),
      orderId,
      event.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    );

    await this.commandBus.send(reserveInventoryCommand);
  }

  private async handlePaymentProcessed(event: PaymentProcessed): Promise<void> {
    const orderId = event.orderId;
    const orderData = this.orderData.get(orderId);

    if (!orderData) {
      console.warn(\`No saga data found for order \${orderId}\`);
      return;
    }

    orderData.paymentProcessed = true;
    this.orderData.set(orderId, orderData);

    // Check if we can complete the order
    await this.tryCompleteOrder(orderId);
  }

  private async handleInventoryReserved(event: InventoryReserved): Promise<void> {
    const orderId = event.orderId;
    const orderData = this.orderData.get(orderId);

    if (!orderData) {
      console.warn(\`No saga data found for order \${orderId}\`);
      return;
    }

    orderData.inventoryReserved = true;
    this.orderData.set(orderId, orderData);

    // Check if we can complete the order
    await this.tryCompleteOrder(orderId);
  }

  private async tryCompleteOrder(orderId: string): Promise<void> {
    const orderData = this.orderData.get(orderId);

    if (!orderData) {
      return;
    }

    // Check if all conditions are met
    if (orderData.paymentProcessed && orderData.inventoryReserved) {
      // Confirm the order
      const confirmOrderCommand = new ConfirmOrderCommand(orderId);
      await this.commandBus.send(confirmOrderCommand);

      // Clean up saga state
      this.orderData.delete(orderId);
      this.markAsComplete();
    }
  }
}
\`\`\`

## Read Model Projections

### Order Projection Handler
\`\`\`typescript
// src/modules/ordering/infrastructure/projections/OrderProjectionHandler.ts
import { EventHandler } from '../../../shared/infrastructure/EventHandler';
import { OrderCreated } from '../../domain/events/OrderCreated';
import { OrderConfirmed } from '../../domain/events/OrderConfirmed';
import { OrderCancelled } from '../../domain/events/OrderCancelled';
import { OrderReadModel } from './OrderReadModel';
import { OrderReadModelRepository } from './OrderReadModelRepository';

export class OrderProjectionHandler implements EventHandler {
  constructor(
    private orderReadModelRepository: OrderReadModelRepository
  ) {}

  async handle(event: any): Promise<void> {
    switch (event.constructor.name) {
      case 'OrderCreated':
        await this.handleOrderCreated(event as OrderCreated);
        break;
      case 'OrderConfirmed':
        await this.handleOrderConfirmed(event as OrderConfirmed);
        break;
      case 'OrderCancelled':
        await this.handleOrderCancelled(event as OrderCancelled);
        break;
    }
  }

  private async handleOrderCreated(event: OrderCreated): Promise<void> {
    const orderReadModel = new OrderReadModel(
      event.aggregateId,
      event.customerId,
      'PENDING',
      event.items,
      event.totalAmount,
      event.createdAt
    );

    await this.orderReadModelRepository.save(orderReadModel);
  }

  private async handleOrderConfirmed(event: OrderConfirmed): Promise<void> {
    const orderReadModel = await this.orderReadModelRepository.findById(event.aggregateId);
    
    if (orderReadModel) {
      orderReadModel.status = 'CONFIRMED';
      orderReadModel.confirmedAt = event.confirmedAt;
      await this.orderReadModelRepository.save(orderReadModel);
    }
  }

  private async handleOrderCancelled(event: OrderCancelled): Promise<void> {
    const orderReadModel = await this.orderReadModelRepository.findById(event.aggregateId);
    
    if (orderReadModel) {
      orderReadModel.status = 'CANCELLED';
      orderReadModel.cancelledAt = event.cancelledAt;
      orderReadModel.cancellationReason = event.reason;
      await this.orderReadModelRepository.save(orderReadModel);
    }
  }
}
\`\`\`

## Message Bus Implementation

### Event Publisher
\`\`\`typescript
// src/shared/infrastructure/messaging/EventPublisher.ts
import { DomainEvent } from '../../domain/base/DomainEvent';

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishBatch(events: DomainEvent[]): Promise<void>;
}

export class RabbitMQEventPublisher implements EventPublisher {
  constructor(
    private connection: any, // RabbitMQ connection
    private exchangeName: string = 'domain.events'
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    const channel = await this.connection.createChannel();
    
    try {
      await channel.assertExchange(this.exchangeName, 'topic', { durable: true });
      
      const routingKey = \`\${event.constructor.name.toLowerCase()}\`;
      const message = JSON.stringify({
        eventId: event.eventId,
        eventType: event.getEventName(),
        aggregateId: event.aggregateId,
        eventVersion: event.eventVersion,
        occurredOn: event.occurredOn.toISOString(),
        data: event.getEventData()
      });

      await channel.publish(
        this.exchangeName,
        routingKey,
        Buffer.from(message),
        {
          persistent: true,
          messageId: event.eventId,
          timestamp: event.occurredOn.getTime(),
          type: event.getEventName()
        }
      );

      console.log(\`Published event: \${event.getEventName()} for aggregate \${event.aggregateId}\`);
    } finally {
      await channel.close();
    }
  }

  async publishBatch(events: DomainEvent[]): Promise<void> {
    const channel = await this.connection.createChannel();
    
    try {
      await channel.assertExchange(this.exchangeName, 'topic', { durable: true });
      
      for (const event of events) {
        const routingKey = \`\${event.constructor.name.toLowerCase()}\`;
        const message = JSON.stringify({
          eventId: event.eventId,
          eventType: event.getEventName(),
          aggregateId: event.aggregateId,
          eventVersion: event.eventVersion,
          occurredOn: event.occurredOn.toISOString(),
          data: event.getEventData()
        });

        await channel.publish(
          this.exchangeName,
          routingKey,
          Buffer.from(message),
          {
            persistent: true,
            messageId: event.eventId,
            timestamp: event.occurredOn.getTime(),
            type: event.getEventName()
          }
        );
      }

      console.log(\`Published \${events.length} events in batch\`);
    } finally {
      await channel.close();
    }
  }
}
\`\`\`

## Monitoring and Observability

### Event Metrics Collection
\`\`\`typescript
// src/shared/infrastructure/monitoring/EventMetrics.ts
import { register, Counter, Histogram, Gauge } from 'prom-client';

export class EventMetrics {
  private static instance: EventMetrics;
  
  private eventsPublished = new Counter({
    name: 'events_published_total',
    help: 'Total number of events published',
    labelNames: ['event_type', 'aggregate_type']
  });

  private eventsProcessed = new Counter({
    name: 'events_processed_total',
    help: 'Total number of events processed',
    labelNames: ['event_type', 'handler_type']
  });

  private eventProcessingDuration = new Histogram({
    name: 'event_processing_duration_seconds',
    help: 'Duration of event processing',
    labelNames: ['event_type', 'handler_type'],
    buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10]
  });

  private activeProjections = new Gauge({
    name: 'active_projections',
    help: 'Number of active projection handlers'
  });

  private sagasInProgress = new Gauge({
    name: 'sagas_in_progress',
    help: 'Number of sagas currently in progress'
  });

  static getInstance(): EventMetrics {
    if (!EventMetrics.instance) {
      EventMetrics.instance = new EventMetrics();
    }
    return EventMetrics.instance;
  }

  recordEventPublished(eventType: string, aggregateType: string): void {
    this.eventsPublished.inc({ event_type: eventType, aggregate_type: aggregateType });
  }

  recordEventProcessed(eventType: string, handlerType: string): void {
    this.eventsProcessed.inc({ event_type: eventType, handler_type: handlerType });
  }

  recordEventProcessingDuration(
    eventType: string,
    handlerType: string,
    duration: number
  ): void {
    this.eventProcessingDuration
      .labels({ event_type: eventType, handler_type: handlerType })
      .observe(duration);
  }

  setActiveProjections(count: number): void {
    this.activeProjections.set(count);
  }

  setSagasInProgress(count: number): void {
    this.sagasInProgress.set(count);
  }
}
\`\`\`

## Testing Strategies

### Integration Test Example
\`\`\`typescript
// tests/integration/OrderProcessing.test.ts
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { TestContainer } from '../helpers/TestContainer';
import { CreateOrderCommand } from '../../src/modules/ordering/application/commands/CreateOrder/CreateOrderCommand';
import { GetOrderQuery } from '../../src/modules/ordering/application/queries/GetOrder/GetOrderQuery';

describe('Order Processing Integration', () => {
  let container: TestContainer;

  beforeEach(async () => {
    container = new TestContainer();
    await container.initialize();
  });

  afterEach(async () => {
    await container.cleanup();
  });

  it('should process complete order workflow', async () => {
    // Arrange
    const orderId = crypto.randomUUID();
    const customerId = crypto.randomUUID();
    
    const createOrderCommand = new CreateOrderCommand(
      orderId,
      customerId,
      [
        {
          productId: 'product-1',
          productName: 'Test Product',
          quantity: 2,
          unitPrice: 10.00,
          currency: 'USD'
        }
      ]
    );

    // Act - Create order
    await container.commandBus.send(createOrderCommand);

    // Wait for saga completion
    await container.waitForEventProcessing();

    // Assert - Check order was created and confirmed
    const getOrderQuery = new GetOrderQuery(orderId);
    const orderView = await container.queryBus.send(getOrderQuery);

    expect(orderView).toBeDefined();
    expect(orderView!.id).toBe(orderId);
    expect(orderView!.customerId).toBe(customerId);
    expect(orderView!.status).toBe('CONFIRMED');
    expect(orderView!.items).toHaveLength(1);
    expect(orderView!.totalAmount).toBe(20.00);
  });

  it('should handle inventory shortage gracefully', async () => {
    // Arrange - Configure inventory to be insufficient
    await container.inventoryService.setProductStock('product-1', 1);
    
    const createOrderCommand = new CreateOrderCommand(
      crypto.randomUUID(),
      crypto.randomUUID(),
      [
        {
          productId: 'product-1',
          productName: 'Test Product',
          quantity: 5, // More than available stock
          unitPrice: 10.00,
          currency: 'USD'
        }
      ]
    );

    // Act
    await container.commandBus.send(createOrderCommand);
    await container.waitForEventProcessing();

    // Assert - Order should be cancelled due to insufficient inventory
    const orderView = await container.queryBus.send(
      new GetOrderQuery(createOrderCommand.orderId)
    );

    expect(orderView!.status).toBe('CANCELLED');
  });
});
\`\`\`

## Performance Optimization

### Event Batching Strategy
- **Batch Size**: Optimal batch sizes for different event types
- **Temporal Batching**: Time-based batching for high-frequency events
- **Priority Queues**: Different processing priorities for event types
- **Backpressure Handling**: Graceful degradation under high load

### Read Model Optimization
- **Denormalization**: Optimized read models for specific queries
- **Caching Strategy**: Multi-level caching for frequently accessed data
- **Async Updates**: Asynchronous read model updates
- **Eventual Consistency**: Handling and monitoring consistency lag

### Saga Management
- **State Persistence**: Durable saga state storage
- **Timeout Handling**: Automatic saga timeout and compensation
- **Compensation Logic**: Rollback mechanisms for failed workflows
- **Monitoring**: Saga health and progress monitoring

This event-driven architecture with CQRS provides a robust foundation for building scalable, maintainable distributed systems that can handle complex business workflows while maintaining data consistency and system resilience.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];