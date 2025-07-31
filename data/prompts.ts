import { PromptTemplate } from './types';

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'api-design-architect',
    title: 'API Design & Architecture Prompt',
    slug: 'api-design-architect',
    description: 'Comprehensive prompt for designing REST APIs with proper architecture, documentation, and best practices.',
    category: 'Prompt Templates',
    tags: ['api-design', 'rest', 'architecture', 'documentation', 'backend'],
    difficulty: 'INTERMEDIATE',
    prompt: `You are an expert API architect and backend developer. Design a comprehensive REST API for the given requirements.

## Context
**Project:** {{PROJECT_NAME}}
**Domain:** {{DOMAIN}}
**Scale:** {{EXPECTED_SCALE}}
**Technology Stack:** {{TECH_STACK}}

## Requirements
{{REQUIREMENTS}}

## Design the API with the following considerations:

### 1. Resource Modeling
- Identify the core entities and their relationships
- Define resource hierarchies and nested resources
- Consider data consistency patterns

### 2. Endpoint Design
- Follow RESTful conventions (GET, POST, PUT, DELETE, PATCH)
- Design proper URL structures (/api/v1/resources/{id})
- Plan for versioning strategy
- Include filtering, sorting, and pagination patterns

### 3. Request/Response Schema
- Define comprehensive data models
- Include validation rules and constraints
- Plan for extensibility and backward compatibility
- Consider data transformation needs

### 4. Authentication & Authorization
- Choose appropriate auth strategy (JWT, OAuth2, API Keys)
- Design permission models and role-based access
- Plan for rate limiting and API quotas
- Consider security headers and CORS policies

### 5. Error Handling
- Design consistent error response format
- Define HTTP status code usage
- Plan for validation error details
- Include error logging and monitoring strategy

### 6. Performance & Scalability
- Design for caching opportunities
- Plan database query optimization
- Consider API response time requirements
- Design for horizontal scaling

### 7. Documentation & Testing
- Generate OpenAPI/Swagger specification
- Include example requests/responses
- Plan for API testing strategy
- Consider developer experience (DX)

## Output Format:
Provide a detailed API specification including:
1. **Overview & Architecture**
2. **Resource Models** (with relationships)
3. **Endpoint Specifications** (detailed)
4. **Authentication Strategy**
5. **Error Handling Patterns**
6. **Performance Considerations**
7. **OpenAPI Schema Sample**
8. **Implementation Roadmap**

Use clear examples and consider edge cases throughout the design.`,
    variables: ['PROJECT_NAME', 'DOMAIN', 'EXPECTED_SCALE', 'TECH_STACK', 'REQUIREMENTS'],
    examples: [
      {
        input: 'PROJECT_NAME: E-commerce Platform, DOMAIN: Online Retail, EXPECTED_SCALE: 10k daily users, TECH_STACK: Node.js + PostgreSQL',
        output: 'Comprehensive REST API design for e-commerce with user management, product catalog, cart, orders, and payment processing endpoints'
      },
      {
        input: 'PROJECT_NAME: Task Management, DOMAIN: Productivity, EXPECTED_SCALE: 1k concurrent users, TECH_STACK: Python FastAPI + MongoDB',
        output: 'RESTful API design for task management with projects, tasks, comments, and collaboration features'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'database-schema-designer',
    title: 'Database Schema Design Prompt',
    slug: 'database-schema-designer',
    description: 'Expert-level prompt for designing optimized database schemas with proper relationships, indexing, and normalization.',
    category: 'Prompt Templates',
    tags: ['database', 'schema', 'sql', 'normalization', 'optimization'],
    difficulty: 'ADVANCED',
    prompt: `You are a senior database architect with expertise in relational database design, normalization, and performance optimization.

## Context
**Application:** {{APPLICATION_TYPE}}
**Database:** {{DATABASE_TYPE}}
**Expected Data Volume:** {{DATA_VOLUME}}
**Query Patterns:** {{QUERY_PATTERNS}}
**Performance Requirements:** {{PERFORMANCE_REQUIREMENTS}}

## Business Requirements
{{BUSINESS_REQUIREMENTS}}

## Design a comprehensive database schema with the following considerations:

### 1. Entity Identification & Modeling
- Identify all entities from business requirements
- Define entity attributes and data types
- Establish entity relationships (1:1, 1:M, M:M)
- Apply appropriate normalization (up to 3NF typically)

### 2. Schema Design
- Create detailed table structures
- Define primary keys and foreign keys
- Implement appropriate constraints (NOT NULL, UNIQUE, CHECK)
- Design lookup tables and reference data
- Plan for data integrity and referential constraints

### 3. Relationship Design
- Design junction tables for many-to-many relationships
- Implement proper cascading rules (CASCADE, SET NULL, RESTRICT)
- Handle hierarchical data (adjacency list, nested sets, etc.)
- Design for soft deletes where appropriate

### 4. Indexing Strategy
- Identify query patterns and access paths
- Design primary and secondary indexes
- Plan composite indexes for multi-column queries
- Consider partial indexes for filtered queries
- Balance query performance vs. write performance

### 5. Performance Optimization
- Design for expected query patterns
- Plan partitioning strategy for large tables
- Consider denormalization for read-heavy scenarios
- Design materialized views for complex aggregations
- Plan for archival and data lifecycle management

### 6. Data Types & Constraints
- Choose optimal data types for storage efficiency
- Implement business rule constraints at database level
- Design for internationalization (UTF-8, collations)
- Handle temporal data (timestamps, time zones)
- Plan for JSON/document storage if needed

### 7. Security & Compliance
- Design role-based access control
- Plan for data encryption (at rest/in transit)
- Implement audit trails and change tracking
- Consider data privacy and GDPR compliance
- Design for secure backup and recovery

## Output Format:
Provide a complete database design including:

**Entity Relationship Diagram (textual):**
\`\`\`
[Entity1] --< [Junction] >-- [Entity2]
[Parent] ||--o{ [Child]
\`\`\`

**Schema Definition:**
\`\`\`sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

**Index Strategy:**
\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
\`\`\`

Include migration scripts, sample queries, and performance considerations.`,
    variables: ['APPLICATION_TYPE', 'DATABASE_TYPE', 'DATA_VOLUME', 'QUERY_PATTERNS', 'PERFORMANCE_REQUIREMENTS', 'BUSINESS_REQUIREMENTS'],
    examples: [
      {
        input: 'APPLICATION_TYPE: E-commerce, DATABASE_TYPE: PostgreSQL, DATA_VOLUME: 1M products, 10M orders, QUERY_PATTERNS: Product search, Order history',
        output: 'Normalized schema with users, products, categories, orders, order_items tables with proper indexing for search and reporting'
      },
      {
        input: 'APPLICATION_TYPE: Social Media, DATABASE_TYPE: MySQL, DATA_VOLUME: 100k users, 1M posts, QUERY_PATTERNS: Timeline feeds, User profiles',
        output: 'Schema design with users, posts, followers, likes tables optimized for timeline queries and social interactions'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'frontend-architecture-planner',
    title: 'Frontend Architecture & Component Design',
    slug: 'frontend-architecture-planner',
    description: 'Comprehensive prompt for designing scalable frontend architectures with component systems and state management.',
    category: 'Prompt Templates',
    tags: ['frontend', 'architecture', 'components', 'state-management', 'design-system'],
    difficulty: 'INTERMEDIATE',
    prompt: `You are a senior frontend architect specializing in modern web applications, component systems, and scalable frontend architectures.

## Project Context
**Application Type:** {{APPLICATION_TYPE}}
**Framework:** {{FRAMEWORK}}
**Complexity:** {{COMPLEXITY_LEVEL}}
**Team Size:** {{TEAM_SIZE}}
**Timeline:** {{TIMELINE}}

## Requirements
{{REQUIREMENTS}}

## Design a comprehensive frontend architecture with the following considerations:

### 1. Architecture Overview
- Define overall application structure and layers
- Choose appropriate architectural patterns (MVC, Component-based, Micro-frontends)
- Plan for scalability and maintainability
- Consider development team structure and workflow

### 2. Component System Design
- Design reusable component hierarchy
- Create component categorization (Atoms, Molecules, Organisms)
- Plan for component composition and prop interfaces
- Design consistent component API patterns
- Plan for component testing strategies

### 3. State Management Strategy
- Choose appropriate state management solution
- Design global state structure
- Plan for local component state
- Design data flow patterns (unidirectional/bidirectional)
- Handle asynchronous state (loading, error states)

### 4. Routing & Navigation
- Design application routing structure
- Plan for nested routes and route parameters
- Implement navigation guards and access control
- Handle deep linking and browser history
- Design for SEO and social sharing

### 5. Data Layer & API Integration
- Design API service layer and data fetching patterns
- Plan for caching and data synchronization
- Handle optimistic updates and conflict resolution
- Design error handling and retry mechanisms
- Plan for offline capabilities

### 6. Performance Optimization
- Plan for code splitting and lazy loading
- Design bundle optimization strategy
- Implement performance monitoring
- Plan for image and asset optimization
- Consider server-side rendering (SSR) needs

### 7. Development Experience
- Set up development tooling and build process
- Plan for hot reloading and development server
- Design component documentation system
- Set up testing infrastructure (unit, integration, e2e)
- Plan for code quality tools (linting, formatting)

### 8. Accessibility & UX
- Design for accessibility standards (WCAG)
- Plan for responsive design and mobile experience
- Design loading states and error boundaries
- Plan for internationalization (i18n)
- Consider user preferences and theming

## Output Format:
Provide a detailed frontend architecture including:

**1. Architecture Diagram (textual):**
\`\`\`
┌─ Presentation Layer ─┐
│ Components & Views   │
├─ Business Logic ─────┤
│ Services & Stores    │
├─ Data Layer ─────────┤
│ API & Persistence    │
└──────────────────────┘
\`\`\`

**2. Component Structure:**
\`\`\`
src/
├── components/
│   ├── ui/           # Base components
│   ├── forms/        # Form components
│   └── layout/       # Layout components
├── pages/            # Route components
├── services/         # API services
├── stores/           # State management
└── utils/            # Utilities
\`\`\`

**3. State Management Design:**
- Global state schema
- State update patterns
- Side effects handling

**4. Component Examples:**
- Base component interfaces
- Composition examples
- State integration patterns

**5. Implementation Roadmap:**
- Phase-by-phase development plan
- Critical path identification
- Risk mitigation strategies

Include specific code examples and consider modern best practices.`,
    variables: ['APPLICATION_TYPE', 'FRAMEWORK', 'COMPLEXITY_LEVEL', 'TEAM_SIZE', 'TIMELINE', 'REQUIREMENTS'],
    examples: [
      {
        input: 'APPLICATION_TYPE: Dashboard, FRAMEWORK: React, COMPLEXITY_LEVEL: High, TEAM_SIZE: 5 developers, TIMELINE: 6 months',
        output: 'React architecture with component library, Redux Toolkit for state, React Query for server state, and modular design system'
      },
      {
        input: 'APPLICATION_TYPE: E-commerce, FRAMEWORK: Vue.js, COMPLEXITY_LEVEL: Medium, TEAM_SIZE: 3 developers, TIMELINE: 4 months',
        output: 'Vue.js architecture with Composition API, Pinia for state management, and component-based design with shopping cart functionality'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'devops-pipeline-designer',
    title: 'DevOps Pipeline & Infrastructure Design',
    slug: 'devops-pipeline-designer',
    description: 'Expert prompt for designing CI/CD pipelines, infrastructure as code, and deployment strategies.',
    category: 'Prompt Templates',
    tags: ['devops', 'cicd', 'infrastructure', 'deployment', 'automation'],
    difficulty: 'ADVANCED',
    prompt: `You are a senior DevOps engineer and infrastructure architect with expertise in CI/CD pipelines, cloud infrastructure, and deployment automation.

## Project Context
**Application Stack:** {{APPLICATION_STACK}}
**Cloud Provider:** {{CLOUD_PROVIDER}}
**Scale:** {{SCALE_REQUIREMENTS}}
**Compliance:** {{COMPLIANCE_REQUIREMENTS}}
**Budget:** {{BUDGET_CONSTRAINTS}}

## Requirements
{{REQUIREMENTS}}

## Design a comprehensive DevOps infrastructure with the following considerations:

### 1. Infrastructure Architecture
- Design cloud infrastructure topology
- Plan for high availability and disaster recovery
- Choose appropriate compute, storage, and networking services
- Design for cost optimization and resource efficiency
- Plan for security and compliance requirements

### 2. CI/CD Pipeline Design
- Design multi-stage pipeline (build, test, deploy)
- Plan for automated testing integration
- Design deployment strategies (blue-green, canary, rolling)
- Plan for rollback and recovery procedures
- Design for multiple environments (dev, staging, prod)

### 3. Infrastructure as Code (IaC)
- Choose IaC tools (Terraform, CloudFormation, Pulumi)
- Design modular and reusable infrastructure components
- Plan for state management and remote backends
- Design for infrastructure versioning and drift detection
- Plan for infrastructure testing and validation

### 4. Container Strategy
- Design containerization strategy (Docker)
- Plan for container orchestration (Kubernetes, ECS)
- Design service mesh and networking
- Plan for container security and image management
- Design for auto-scaling and resource management

### 5. Monitoring & Observability
- Design monitoring and alerting strategy
- Plan for application and infrastructure metrics
- Design logging aggregation and analysis
- Plan for distributed tracing
- Design for performance monitoring and APM

### 6. Security & Compliance
- Design security controls and access management
- Plan for secrets management and encryption
- Design for vulnerability scanning and patching
- Plan for audit logging and compliance reporting
- Design for network security and isolation

### 7. Backup & Disaster Recovery
- Design backup strategies for data and configurations
- Plan for disaster recovery procedures
- Design for business continuity
- Plan for data retention and archival
- Design for testing and validation of recovery procedures

### 8. Cost Management
- Design for cost optimization and resource tagging
- Plan for auto-scaling and right-sizing
- Design for budget alerts and cost monitoring
- Plan for reserved instances and savings plans
- Design for resource lifecycle management

## Output Format:
Provide a comprehensive DevOps design including:

**1. Infrastructure Diagram:**
\`\`\`
┌─ Load Balancer ─┐
│                 │
├─ Web Tier ──────┤
│ App Servers     │
├─ Database ──────┤
│ RDS/Cluster     │
└─────────────────┘
\`\`\`

**2. CI/CD Pipeline:**
\`\`\`yaml
# Example GitHub Actions workflow
name: CI/CD Pipeline
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      # Build and test steps
\`\`\`

**3. Infrastructure Code:**
\`\`\`hcl
# Example Terraform configuration
resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = "t3.micro"
  
  tags = {
    Name = "web-server"
  }
}
\`\`\`

**4. Monitoring Setup:**
- Metrics and alerting configuration
- Dashboard definitions
- Log aggregation setup

**5. Security Configuration:**
- IAM policies and roles
- Network security groups
- Encryption configuration

**6. Deployment Scripts:**
- Application deployment procedures
- Database migration scripts
- Environment setup automation

**7. Implementation Timeline:**
- Phase-by-phase implementation plan
- Dependencies and prerequisites
- Testing and validation procedures

Include specific examples, best practices, and consideration for the given requirements.`,
    variables: ['APPLICATION_STACK', 'CLOUD_PROVIDER', 'SCALE_REQUIREMENTS', 'COMPLIANCE_REQUIREMENTS', 'BUDGET_CONSTRAINTS', 'REQUIREMENTS'],
    examples: [
      {
        input: 'APPLICATION_STACK: Node.js + React, CLOUD_PROVIDER: AWS, SCALE_REQUIREMENTS: 100k users, COMPLIANCE_REQUIREMENTS: SOC2',
        output: 'AWS-based infrastructure with ECS, RDS, CloudFront, comprehensive CI/CD with GitHub Actions, and SOC2 compliance controls'
      },
      {
        input: 'APPLICATION_STACK: Python Django, CLOUD_PROVIDER: Google Cloud, SCALE_REQUIREMENTS: 10k users, COMPLIANCE_REQUIREMENTS: GDPR',
        output: 'GCP infrastructure with Cloud Run, Cloud SQL, comprehensive monitoring with Cloud Operations, and GDPR compliance measures'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'code-review-expert',
    title: 'Comprehensive Code Review & Analysis',
    slug: 'code-review-expert',
    description: 'Expert-level prompt for conducting thorough code reviews with focus on quality, security, and best practices.',
    category: 'Prompt Templates',
    tags: ['code-review', 'quality', 'security', 'best-practices', 'refactoring'],
    difficulty: 'ADVANCED',
    prompt: `You are a senior software engineer and code review expert with deep knowledge of software engineering best practices, security, and code quality.

## Review Context
**Language/Framework:** {{LANGUAGE_FRAMEWORK}}
**Code Type:** {{CODE_TYPE}}
**Review Scope:** {{REVIEW_SCOPE}}
**Team Experience:** {{TEAM_EXPERIENCE}}
**Critical Level:** {{CRITICAL_LEVEL}}

## Code to Review
\`\`\`{{LANGUAGE}}
{{CODE_CONTENT}}
\`\`\`

## Conduct a comprehensive code review covering the following areas:

### 1. Code Quality & Readability
- Assess code clarity and readability
- Review naming conventions and consistency
- Evaluate code organization and structure
- Check for proper commenting and documentation
- Review function/method size and complexity

### 2. Architecture & Design Patterns
- Evaluate adherence to SOLID principles
- Review design pattern usage and appropriateness
- Assess separation of concerns
- Check for proper abstraction levels
- Review dependency management and coupling

### 3. Performance & Efficiency
- Identify potential performance bottlenecks
- Review algorithm complexity and efficiency
- Check for memory leaks and resource management
- Evaluate database query optimization
- Assess caching strategies and implementation

### 4. Security Analysis
- Check for common security vulnerabilities (OWASP Top 10)
- Review input validation and sanitization
- Assess authentication and authorization implementation
- Check for SQL injection and XSS vulnerabilities
- Review sensitive data handling and encryption

### 5. Error Handling & Resilience
- Review exception handling patterns
- Check for proper error propagation
- Assess logging and monitoring implementation
- Review timeout and retry mechanisms
- Check for graceful failure handling

### 6. Testing & Testability
- Assess testability of the code
- Review test coverage and quality
- Check for proper mocking and stubbing
- Evaluate test organization and structure
- Review integration and end-to-end test coverage

### 7. Maintainability & Technical Debt
- Identify code smells and anti-patterns
- Assess code duplication and DRY principle adherence
- Review configuration management
- Check for proper versioning and backward compatibility
- Evaluate refactoring opportunities

### 8. Language/Framework Specific
- Review language-specific best practices
- Check for proper framework usage
- Assess library and dependency choices
- Review configuration and setup
- Check for platform-specific considerations

## Output Format:
Provide a detailed code review with:

**Overall Assessment:**
- High-level summary of code quality
- Key strengths and areas for improvement
- Risk level assessment

**Detailed Findings:**

**🔴 Critical Issues** (Must fix before merge):
- Security vulnerabilities
- Performance blockers
- Architectural violations

**🟡 Major Issues** (Should fix soon):
- Code quality issues
- Maintainability concerns
- Best practice violations

**🟢 Minor Issues** (Nice to have):
- Style improvements
- Optimization opportunities
- Documentation enhancements

**Specific Recommendations:**
\`\`\`{{LANGUAGE}}
// Example: Instead of this
function badExample() {
  // problematic code
}

// Consider this approach
function betterExample() {
  // improved code
}
\`\`\`

**Action Items:**
1. Priority fixes with explanations
2. Refactoring suggestions
3. Additional testing recommendations
4. Documentation updates needed

**Learning Opportunities:**
- Educational notes for team growth
- Links to relevant resources
- Pattern recommendations

Provide constructive feedback focused on improvement and learning.`,
    variables: ['LANGUAGE_FRAMEWORK', 'CODE_TYPE', 'REVIEW_SCOPE', 'TEAM_EXPERIENCE', 'CRITICAL_LEVEL', 'LANGUAGE', 'CODE_CONTENT'],
    examples: [
      {
        input: 'LANGUAGE_FRAMEWORK: React TypeScript, CODE_TYPE: Component, REVIEW_SCOPE: Full Review, TEAM_EXPERIENCE: Intermediate',
        output: 'Comprehensive review covering React hooks usage, TypeScript typing, component architecture, performance optimizations, and testing strategies'
      },
      {
        input: 'LANGUAGE_FRAMEWORK: Python Django, CODE_TYPE: API Endpoint, REVIEW_SCOPE: Security Focus, TEAM_EXPERIENCE: Senior',
        output: 'Security-focused review examining input validation, authentication, SQL injection prevention, and Django security best practices'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'system-troubleshooter',
    title: 'System Debugging & Troubleshooting Expert',
    slug: 'system-troubleshooter',
    description: 'Advanced prompt for systematic debugging, performance analysis, and issue resolution across the full stack.',
    category: 'Prompt Templates',
    tags: ['debugging', 'troubleshooting', 'performance', 'monitoring', 'incident-response'],
    difficulty: 'ADVANCED',
    prompt: `You are a senior systems engineer and debugging expert with extensive experience in troubleshooting complex distributed systems, performance issues, and production incidents.

## Issue Context
**System Type:** {{SYSTEM_TYPE}}
**Environment:** {{ENVIRONMENT}}
**Urgency Level:** {{URGENCY_LEVEL}}
**Impact Scope:** {{IMPACT_SCOPE}}
**Available Resources:** {{AVAILABLE_RESOURCES}}

## Problem Description
{{PROBLEM_DESCRIPTION}}

## Symptoms & Observations
{{SYMPTOMS}}

## Recent Changes
{{RECENT_CHANGES}}

## Conduct systematic troubleshooting with the following approach:

### 1. Problem Analysis & Hypothesis Formation
- Analyze the symptoms and error patterns
- Form initial hypotheses about root causes
- Prioritize hypotheses by likelihood and impact
- Identify critical information gaps
- Define success criteria for resolution

### 2. Information Gathering Strategy
- Identify key logs, metrics, and monitoring data to examine
- Plan diagnostic commands and tools to use
- Determine if additional monitoring is needed
- Identify stakeholders and subject matter experts
- Plan for data collection without service disruption

### 3. Systematic Investigation Plan
- Design step-by-step investigation procedure
- Plan hypothesis testing methodology
- Identify potential investigation tools and techniques
- Plan for safe testing and validation
- Design rollback procedures if needed

### 4. Root Cause Analysis
- Apply systematic debugging methodologies
- Use divide-and-conquer approach for complex systems
- Analyze timing, dependencies, and system interactions
- Consider infrastructure, application, and data layers
- Document findings and evidence

### 5. Solution Development
- Design multiple solution approaches
- Assess solution risks and trade-offs
- Plan implementation steps and validation
- Design monitoring for solution effectiveness
- Plan for prevention of recurrence

### 6. Performance Analysis (if applicable)
- Analyze system performance metrics
- Identify bottlenecks and resource constraints
- Review scalability and capacity issues
- Analyze user experience impact
- Recommend performance optimizations

### 7. Security Considerations
- Check for security-related causes
- Analyze potential security implications
- Review access logs and authentication issues
- Check for data breach or compromise indicators
- Recommend security improvements

### 8. Communication & Documentation
- Plan stakeholder communication strategy
- Document investigation findings
- Create incident timeline and impact assessment
- Plan for post-incident review
- Document lessons learned and improvements

## Output Format:
Provide a comprehensive troubleshooting plan with:

**Immediate Actions** (First 15 minutes):
1. Critical checks to perform immediately
2. Data to collect for triage
3. Immediate mitigation steps if available

**Investigation Plan:**

**Phase 1: Information Gathering**
\`\`\`bash
# Example diagnostic commands
tail -f /var/log/application.log
top -p $(pgrep app_process)
netstat -tulpn | grep :8080
\`\`\`

**Phase 2: Hypothesis Testing**
- Hypothesis 1: [Description]
  - Test: [How to validate]
  - Expected result: [What indicates this cause]
- Hypothesis 2: [Description]
  - Test: [How to validate]
  - Expected result: [What indicates this cause]

**Phase 3: Root Cause Analysis**
- Analysis methodology
- Key areas to investigate
- Tools and techniques to use

**Diagnostic Checklist:**
- [ ] Application logs reviewed
- [ ] System resources checked (CPU, memory, disk)
- [ ] Network connectivity verified
- [ ] Database performance analyzed
- [ ] Recent deployments reviewed
- [ ] External dependencies checked

**Solution Recommendations:**
1. **Short-term fixes** (immediate relief)
2. **Medium-term solutions** (address root cause)
3. **Long-term improvements** (prevent recurrence)

**Risk Assessment:**
- Impact of each solution approach
- Potential side effects or complications
- Rollback procedures and safety measures

**Monitoring & Validation:**
- Metrics to monitor solution effectiveness
- Success criteria and key indicators
- Timeline for improvement validation

**Prevention Measures:**
- Process improvements
- Monitoring enhancements
- Code or infrastructure changes
- Training and documentation needs

Include specific commands, queries, and procedures tailored to the system type and issue.`,
    variables: ['SYSTEM_TYPE', 'ENVIRONMENT', 'URGENCY_LEVEL', 'IMPACT_SCOPE', 'AVAILABLE_RESOURCES', 'PROBLEM_DESCRIPTION', 'SYMPTOMS', 'RECENT_CHANGES'],
    examples: [
      {
        input: 'SYSTEM_TYPE: Web Application, ENVIRONMENT: Production, URGENCY_LEVEL: High, SYMPTOMS: 500 errors, slow response times',
        output: 'Systematic troubleshooting plan for web application performance issues including log analysis, database query optimization, and load testing'
      },
      {
        input: 'SYSTEM_TYPE: Microservices, ENVIRONMENT: Kubernetes, URGENCY_LEVEL: Critical, SYMPTOMS: Service timeouts, cascading failures',
        output: 'Distributed systems troubleshooting approach with service mesh analysis, dependency mapping, and circuit breaker investigation'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'system-design-interview-master',
    title: 'System Design Interview Master',
    slug: 'system-design-interview-master',
    description: 'Comprehensive system design interview prompt for designing large-scale distributed systems with detailed architecture, scalability, and trade-off analysis.',
    category: 'Prompt Templates',
    tags: ['system-design', 'distributed-systems', 'scalability', 'architecture', 'interview'],
    difficulty: 'ADVANCED',
    prompt: `You are a principal software architect and system design expert with experience building large-scale distributed systems at companies like Google, Amazon, and Meta.

## System Design Challenge
**System:** {{SYSTEM_NAME}}
**Scale:** {{SCALE_REQUIREMENTS}}
**Users:** {{USER_COUNT}}
**Data Volume:** {{DATA_VOLUME}}
**Geographic Distribution:** {{GEOGRAPHIC_SCOPE}}

## Functional Requirements
{{FUNCTIONAL_REQUIREMENTS}}

## Non-Functional Requirements
{{NON_FUNCTIONAL_REQUIREMENTS}}

## Design a comprehensive system architecture following this systematic approach:

### 1. Requirements Clarification & Scope (5 minutes)
- Clarify ambiguous requirements and assumptions
- Define system boundaries and what's in/out of scope
- Estimate scale: users, requests per second, data volume
- Identify key functional and non-functional requirements
- Determine read vs write ratio and access patterns

### 2. High-Level Architecture (10 minutes)
- Design overall system architecture with major components
- Identify core services and their responsibilities
- Design client-server communication patterns
- Plan for load balancing and traffic distribution
- Consider API gateway and service mesh needs

### 3. Database Design (10 minutes)
- Choose appropriate database types (SQL, NoSQL, Graph, Time-series)
- Design database schema and data models
- Plan for data partitioning and sharding strategies
- Consider replication and consistency requirements
- Design for backup, recovery, and data archival

### 4. Detailed Component Design (15 minutes)
- Design each major component in detail
- Define APIs and service contracts
- Plan for service discovery and configuration
- Design caching layers (CDN, application cache, database cache)
- Plan for authentication and authorization

### 5. Scalability & Performance (10 minutes)
- Design horizontal and vertical scaling strategies
- Plan for auto-scaling and load handling
- Identify potential bottlenecks and solutions
- Design for geographic distribution and CDN usage
- Plan for database scaling and read replicas

### 6. Reliability & Fault Tolerance (8 minutes)
- Design for high availability and disaster recovery
- Plan for failure handling and circuit breakers
- Design redundancy and failover mechanisms
- Plan for data consistency and eventual consistency
- Design monitoring, alerting, and health checks

### 7. Security & Compliance (5 minutes)
- Design authentication and authorization systems
- Plan for data encryption (at rest and in transit)
- Design for input validation and SQL injection prevention
- Plan for rate limiting and DDoS protection
- Consider compliance requirements (GDPR, HIPAA, etc.)

### 8. Monitoring & Observability (5 minutes)
- Design logging, metrics, and tracing systems
- Plan for performance monitoring and alerting
- Design for debugging and troubleshooting
- Plan for capacity planning and forecasting
- Design user analytics and business metrics

### 9. Trade-offs & Alternatives (5 minutes)
- Discuss major design trade-offs and decisions
- Present alternative approaches and their pros/cons
- Discuss technology choices and justifications
- Address potential future scaling challenges
- Consider cost optimization strategies

## Output Format:

**System Overview:**
\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │────│Load Balancer│────│  API Gateway │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                   ┌──────────────────────────┼──────────────────────────┐
                   │                          │                          │
            ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
            │  Service A  │          │  Service B  │          │  Service C  │
            └─────────────┘          └─────────────┘          └─────────────┘
                   │                          │                          │
            ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
            │ Database A  │          │ Database B  │          │   Cache     │
            └─────────────┘          └─────────────┘          └─────────────┘
\`\`\`

**Core Components:**

**1. Load Balancer Layer:**
- Technology: [Choice and reasoning]
- Load balancing algorithm: [Round robin, least connections, etc.]
- Health checks and failover strategy
- SSL termination and security

**2. API Gateway:**
- Authentication and authorization
- Rate limiting and throttling
- Request routing and transformation
- Response caching and compression

**3. Microservices:**
- Service A: [Purpose, APIs, responsibilities]
- Service B: [Purpose, APIs, responsibilities]
- Service C: [Purpose, APIs, responsibilities]
- Inter-service communication (REST, gRPC, message queues)

**4. Data Storage:**
- Primary database: [Technology choice, schema design]
- Secondary storage: [Cache, search index, analytics]
- Data replication and backup strategy
- Consistency model and transaction handling

**5. Caching Strategy:**
- CDN for static content
- Application-level caching (Redis, Memcached)
- Database query caching
- Cache invalidation strategies

**Scale Calculations:**
- Request per second: [Calculation and breakdown]
- Storage requirements: [Data size estimation]
- Bandwidth requirements: [Network capacity planning]
- Server capacity planning: [CPU, memory, instance counts]

**Database Schema Example:**
\`\`\`sql
-- Primary entities
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Partitioning strategy
PARTITION BY HASH(id) PARTITIONS 16;
\`\`\`

**API Design Example:**
\`\`\`
GET /api/v1/users/{id}
POST /api/v1/users
PUT /api/v1/users/{id}
DELETE /api/v1/users/{id}

Response Format:
{
  "data": {...},
  "meta": {
    "timestamp": "2024-12-01T10:00:00Z",
    "version": "v1"
  }
}
\`\`\`

**Monitoring & Alerting:**
- Key metrics to track: [Response time, error rate, throughput]
- Alert thresholds: [SLA definitions and monitoring]
- Dashboard design: [Key visualizations and insights]
- Log aggregation: [Centralized logging strategy]

**Major Trade-offs:**
1. **Consistency vs Availability:** [CAP theorem considerations]
2. **Cost vs Performance:** [Resource optimization decisions]
3. **Complexity vs Maintainability:** [Microservices vs monolith]
4. **Security vs Usability:** [Authentication and user experience]

**Future Scaling Considerations:**
- Horizontal scaling bottlenecks
- Database sharding strategies
- Cross-region replication
- Performance optimization opportunities

**Technology Stack Recommendation:**
- Frontend: [Choice and reasoning]
- Backend: [Choice and reasoning]
- Database: [Choice and reasoning]
- Caching: [Choice and reasoning]
- Message Queue: [Choice and reasoning]
- Monitoring: [Choice and reasoning]

**Risk Assessment:**
- Single points of failure
- Performance bottlenecks
- Security vulnerabilities
- Operational complexity

Provide detailed explanations for all major design decisions and quantify scale requirements with concrete numbers.`,
    variables: ['SYSTEM_NAME', 'SCALE_REQUIREMENTS', 'USER_COUNT', 'DATA_VOLUME', 'GEOGRAPHIC_SCOPE', 'FUNCTIONAL_REQUIREMENTS', 'NON_FUNCTIONAL_REQUIREMENTS'],
    examples: [
      {
        input: 'SYSTEM_NAME: Social Media Platform, USER_COUNT: 100M users, DATA_VOLUME: 10TB daily, SCALE_REQUIREMENTS: 100k RPS',
        output: 'Complete system design for social media platform with feed generation, content delivery, user management, and real-time messaging at massive scale'
      },
      {
        input: 'SYSTEM_NAME: Video Streaming Service, USER_COUNT: 50M users, DATA_VOLUME: 1PB storage, SCALE_REQUIREMENTS: Global CDN',
        output: 'Comprehensive video streaming architecture with content encoding, global distribution, adaptive bitrate streaming, and recommendation systems'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'code-review-architecture-master',
    title: 'Code Review Master + Architecture Analysis',
    slug: 'code-review-architecture-master',
    description: 'Advanced code review prompt focusing on architecture, security, performance, and maintainability with detailed analysis and improvement recommendations.',
    category: 'Prompt Templates',
    tags: ['code-review', 'architecture', 'security', 'performance', 'maintainability'],
    difficulty: 'ADVANCED',
    prompt: `You are a principal software engineer and architecture expert with 15+ years of experience in code review, system design, and technical leadership at top technology companies.

## Review Context
**Codebase:** {{CODEBASE_TYPE}}
**Language/Framework:** {{LANGUAGE_FRAMEWORK}}
**Component Type:** {{COMPONENT_TYPE}}
**Review Focus:** {{REVIEW_FOCUS}}
**Team Experience:** {{TEAM_EXPERIENCE}}
**Business Criticality:** {{BUSINESS_CRITICALITY}}

## Code Submission
\`\`\`{{LANGUAGE}}
{{CODE_CONTENT}}
\`\`\`

## Additional Context
**Purpose:** {{CODE_PURPOSE}}
**Recent Changes:** {{RECENT_CHANGES}}
**Known Issues:** {{KNOWN_ISSUES}}

## Conduct an expert-level code review with the following comprehensive analysis:

### 1. Architecture & Design Analysis (25%)
- Evaluate adherence to SOLID principles and design patterns
- Assess separation of concerns and single responsibility
- Review dependency injection and inversion of control
- Analyze abstraction levels and interface design
- Check for proper layering and architectural boundaries
- Evaluate compliance with domain-driven design principles
- Review service boundaries and cohesion

### 2. Security Assessment (20%)
- Identify OWASP Top 10 vulnerabilities
- Review input validation and sanitization
- Analyze authentication and authorization implementation
- Check for SQL injection, XSS, and CSRF vulnerabilities
- Review sensitive data handling and encryption
- Assess secrets management and configuration security
- Evaluate API security and rate limiting
- Check for insecure dependencies and known CVEs

### 3. Performance & Scalability (20%)
- Identify algorithmic complexity issues (Big O analysis)
- Review database query performance and N+1 problems
- Analyze memory usage and potential memory leaks
- Check for efficient resource utilization
- Review caching strategies and implementation
- Assess concurrent programming and thread safety
- Evaluate I/O operations and blocking calls
- Check for proper connection pooling and resource cleanup

### 4. Code Quality & Maintainability (15%)
- Review code readability and self-documenting practices
- Assess naming conventions and consistency
- Evaluate function/method size and complexity
- Check for code duplication and DRY principle violations
- Review error handling patterns and exception management
- Assess logging practices and observability
- Evaluate configuration management and environment handling

### 5. Testing Strategy & Coverage (10%)
- Review test structure and organization
- Assess test coverage for critical paths
- Evaluate unit test quality and isolation
- Check for proper mocking and test doubles
- Review integration and contract testing
- Assess test maintainability and readability
- Evaluate performance and load testing coverage

### 6. Framework & Language Best Practices (5%)
- Review framework-specific best practices
- Check for proper use of language idioms
- Assess library and dependency choices
- Review API design and REST principles
- Evaluate async/await patterns and concurrency
- Check for proper error handling patterns

### 7. DevOps & Operational Concerns (5%)
- Review deployment and configuration aspects
- Assess monitoring and alerting implementation
- Check for proper health check endpoints
- Review logging and debugging capabilities
- Evaluate container and infrastructure considerations
- Assess backup and disaster recovery implications

## Output Format:

**Executive Summary:**
- Overall code quality score (1-10)
- Primary strengths and achievements
- Critical risks and blockers
- Recommendation: [Approve/Request Changes/Major Revision]

**Detailed Analysis:**

### 🔴 CRITICAL ISSUES (Must fix before merge)
1. **[Security Vulnerability]** - [Specific issue]
   - **Impact:** [Business/security impact]
   - **Location:** [File:Line or function name]
   - **Fix:** [Specific solution]
   - **Example:**
   \`\`\`{{LANGUAGE}}
   // Current problematic code
   // Recommended solution
   \`\`\`

### 🟠 MAJOR ISSUES (Should fix soon)
2. **[Performance Issue]** - [Specific issue]
   - **Impact:** [Performance/scalability impact]
   - **Location:** [File:Line or function name]
   - **Fix:** [Specific solution]
   - **Improvement:** [Expected performance gain]

### 🟡 MODERATE ISSUES (Address in next iteration)
3. **[Architecture Concern]** - [Specific issue]
   - **Impact:** [Maintainability/extensibility impact]
   - **Refactoring:** [Suggested approach]
   - **Timeline:** [Recommended timeframe]

### 🟢 MINOR ISSUES (Nice to have)
4. **[Code Style]** - [Specific issue]
   - **Improvement:** [Style/readability enhancement]
   - **Consistency:** [Standards alignment]

**Architecture Assessment:**

**Strengths:**
- ✅ [Specific positive aspects]
- ✅ [Good design decisions]
- ✅ [Proper implementation patterns]

**Areas for Improvement:**
- ❌ [Architectural violations]
- ❌ [Design pattern misuse]
- ❌ [Coupling/cohesion issues]

**Refactoring Recommendations:**

**Phase 1 (Immediate):**
\`\`\`{{LANGUAGE}}
// Current implementation
function currentCode() {
  // problematic code
}

// Recommended refactoring
function improvedCode() {
  // better implementation
  // with explanation of benefits
}
\`\`\`

**Phase 2 (Medium-term):**
- [Strategic refactoring suggestions]
- [Architecture improvements]
- [Performance optimizations]

**Security Analysis:**

**Vulnerabilities Found:**
1. **[Vulnerability Type]** - Severity: [High/Medium/Low]
   - **Description:** [What the vulnerability is]
   - **Exploit Scenario:** [How it could be exploited]
   - **Mitigation:** [How to fix it]

**Security Recommendations:**
- [ ] Implement input validation
- [ ] Add authentication checks
- [ ] Encrypt sensitive data
- [ ] Add rate limiting
- [ ] Update vulnerable dependencies

**Performance Analysis:**

**Bottlenecks Identified:**
1. **[Performance Issue]** - Impact: [Response time/throughput]
   - **Current:** [Current performance metrics]
   - **Optimization:** [Specific improvement]
   - **Expected:** [Projected performance gain]

**Scalability Concerns:**
- [Database query optimization]
- [Memory usage patterns]
- [Concurrent access handling]

**Testing Recommendations:**

**Missing Test Coverage:**
- [ ] Unit tests for [specific functions]
- [ ] Integration tests for [specific flows]
- [ ] Performance tests for [specific scenarios]
- [ ] Security tests for [specific vulnerabilities]

**Test Quality Improvements:**
- [Better test organization]
- [More comprehensive assertions]
- [Better test data management]

**Long-term Technical Strategy:**

**Maintainability Roadmap:**
1. **Immediate (1-2 weeks):** [Critical fixes]
2. **Short-term (1-2 months):** [Architecture improvements]
3. **Long-term (3-6 months):** [Strategic refactoring]

**Knowledge Transfer:**
- **Documentation needs:** [What should be documented]
- **Team training:** [Skills to develop]
- **Code patterns:** [Standards to establish]

**Metrics & Monitoring:**
- **Key metrics to track:** [Performance indicators]
- **Alerting rules:** [What to monitor]
- **Dashboard requirements:** [Observability needs]

**Risk Assessment:**
- **Technical risks:** [Potential future problems]
- **Business risks:** [Impact on product/users]
- **Mitigation strategies:** [How to address risks]

**Approval Criteria:**
- [ ] All critical security issues resolved
- [ ] Performance bottlenecks addressed
- [ ] Test coverage meets standards (X%)
- [ ] Documentation updated
- [ ] Architecture review passed

**Additional Resources:**
- [Relevant documentation links]
- [Best practice guides]
- [Training materials]
- [Similar code examples]

Provide specific, actionable feedback with concrete examples and clear priorities for improvement.`,
    variables: ['CODEBASE_TYPE', 'LANGUAGE_FRAMEWORK', 'COMPONENT_TYPE', 'REVIEW_FOCUS', 'TEAM_EXPERIENCE', 'BUSINESS_CRITICALITY', 'LANGUAGE', 'CODE_CONTENT', 'CODE_PURPOSE', 'RECENT_CHANGES', 'KNOWN_ISSUES'],
    examples: [
      {
        input: 'LANGUAGE_FRAMEWORK: Node.js Express, COMPONENT_TYPE: API Endpoint, REVIEW_FOCUS: Security + Performance, TEAM_EXPERIENCE: Senior',
        output: 'Comprehensive review covering security vulnerabilities, performance bottlenecks, architecture patterns, and advanced Node.js best practices'
      },
      {
        input: 'LANGUAGE_FRAMEWORK: React TypeScript, COMPONENT_TYPE: UI Component, REVIEW_FOCUS: Architecture + Maintainability, TEAM_EXPERIENCE: Intermediate',
        output: 'Detailed review of React component architecture, TypeScript usage, performance optimization, and long-term maintainability strategies'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'performance-optimization-expert',
    title: 'Performance Optimization Expert',
    slug: 'performance-optimization-expert',
    description: 'Advanced performance analysis and optimization prompt for identifying bottlenecks, improving efficiency, and scaling applications across the full stack.',
    category: 'Prompt Templates',
    tags: ['performance', 'optimization', 'profiling', 'scalability', 'efficiency'],
    difficulty: 'ADVANCED',
    prompt: `You are a principal performance engineer with expertise in full-stack performance optimization, profiling, and scalability engineering at high-scale technology companies.

## Performance Analysis Context
**System Type:** {{SYSTEM_TYPE}}
**Technology Stack:** {{TECH_STACK}}
**Current Scale:** {{CURRENT_SCALE}}
**Target Scale:** {{TARGET_SCALE}}
**Performance Goals:** {{PERFORMANCE_GOALS}}
**Budget Constraints:** {{BUDGET_CONSTRAINTS}}

## Current Performance Metrics
**Response Time:** {{RESPONSE_TIME}}
**Throughput:** {{THROUGHPUT}}
**Error Rate:** {{ERROR_RATE}}
**Resource Utilization:** {{RESOURCE_UTILIZATION}}

## Performance Issues
{{PERFORMANCE_ISSUES}}

## System Information
{{SYSTEM_INFORMATION}}

## Conduct comprehensive performance analysis and optimization with the following systematic approach:

### 1. Performance Baseline & Measurement (15 minutes)
- Establish current performance baselines across all system layers
- Define key performance indicators (KPIs) and service level objectives (SLOs)
- Set up comprehensive monitoring and profiling instrumentation
- Identify performance bottlenecks using systematic profiling
- Create performance testing framework and benchmarks

### 2. Frontend Performance Analysis (20 minutes)
- Analyze Core Web Vitals (LCP, FID, CLS) and user experience metrics
- Review JavaScript bundle size, code splitting, and lazy loading
- Evaluate image optimization, compression, and CDN usage
- Analyze CSS performance, critical path rendering, and layout thrashing
- Review caching strategies (browser cache, service workers, CDN)
- Evaluate third-party script impact and loading strategies

### 3. Backend Performance Analysis (25 minutes)
- Profile CPU usage, memory consumption, and garbage collection
- Analyze API response times, database query performance
- Review concurrent request handling and thread pool utilization
- Evaluate caching layers (application, database, distributed cache)
- Analyze I/O operations, file system access, and network calls
- Review serialization/deserialization performance

### 4. Database Performance Optimization (20 minutes)
- Analyze slow query logs and execution plans
- Review indexing strategies and query optimization
- Evaluate database connection pooling and resource management
- Analyze data model efficiency and normalization/denormalization trade-offs
- Review partitioning, sharding, and replication strategies
- Evaluate read/write patterns and caching opportunities

### 5. Infrastructure & Network Performance (10 minutes)
- Analyze load balancer configuration and request distribution
- Review CDN performance and edge caching strategies
- Evaluate network latency, bandwidth utilization, and compression
- Analyze container and serverless performance characteristics
- Review auto-scaling policies and resource allocation
- Evaluate geographic distribution and edge computing opportunities

### 6. Algorithmic & Code-Level Optimization (10 minutes)
- Analyze algorithm complexity and data structure efficiency
- Review critical code paths and hot spots
- Evaluate memory allocation patterns and object lifecycle
- Analyze concurrency and parallel processing opportunities
- Review error handling performance impact
- Evaluate compiler/runtime optimizations

## Output Format:

**Executive Summary:**
- Current performance assessment (1-10 scale)
- Primary bottlenecks identified
- Expected performance improvement potential
- Implementation priority matrix
- Resource requirements and timeline

**Performance Analysis Report:**

### 🔴 CRITICAL BOTTLENECKS (Immediate Impact)

**1. [Bottleneck Type] - [Component/Layer]**
- **Current Impact:** [Response time/throughput impact]
- **Root Cause:** [Technical explanation]
- **Evidence:** [Metrics/profiling data]
- **Business Impact:** [User experience/cost impact]

**Fix Recommendation:**
\`\`\`
// Current implementation
[problematic code/configuration]

// Optimized solution
[improved implementation]
// Expected improvement: [quantified benefit]
\`\`\`

### 🟠 MAJOR PERFORMANCE ISSUES

**2. [Performance Issue] - [System Component]**
- **Performance Impact:** [Specific metrics]
- **Resource Cost:** [CPU/Memory/Network impact]
- **Optimization Strategy:** [Approach and techniques]
- **Implementation Effort:** [Time/complexity estimate]

### 🟡 OPTIMIZATION OPPORTUNITIES

**3. [Optimization Category] - [Technology/Component]**
- **Potential Gain:** [Performance improvement estimate]
- **Implementation Approach:** [Strategy and steps]
- **Trade-offs:** [Complexity vs. benefit analysis]

**Detailed Performance Analysis:**

### Frontend Optimization Plan

**Core Web Vitals Improvement:**
- **LCP Target:** < 2.5s (Current: {{CURRENT_LCP}})
  - Image optimization strategy
  - Critical resource prioritization
  - Server-side rendering optimization

- **FID Target:** < 100ms (Current: {{CURRENT_FID}})
  - JavaScript bundle optimization
  - Main thread blocking reduction
  - Event handler optimization

- **CLS Target:** < 0.1 (Current: {{CURRENT_CLS}})
  - Layout shift prevention
  - Image dimension specification
  - Dynamic content handling

**Bundle Optimization:**
\`\`\`javascript
// Code splitting strategy
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// Tree shaking optimization
import { specificFunction } from 'utility-library';

// Bundle analysis recommendations
// - Remove unused dependencies: [list]
// - Optimize heavy libraries: [alternatives]
// - Implement route-based splitting
\`\`\`

### Backend Optimization Plan

**API Performance:**
- **Response Time Target:** < {{TARGET_RESPONSE_TIME}}ms
- **Throughput Target:** {{TARGET_RPS}} requests/second
- **Error Rate Target:** < {{TARGET_ERROR_RATE}}%

**Database Optimization:**
\`\`\`sql
-- Query optimization example
-- Before: Slow query ({{CURRENT_QUERY_TIME}}ms)
SELECT * FROM users u 
JOIN orders o ON u.id = o.user_id 
WHERE u.created_at > '2024-01-01';

-- After: Optimized query ({{TARGET_QUERY_TIME}}ms)
SELECT u.id, u.name, COUNT(o.id) as order_count
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name;

-- Required indexes
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_orders_user_id ON orders(user_id);
\`\`\`

**Caching Strategy:**
\`\`\`
Layer 1: CDN Cache (Static assets)
├── TTL: 365 days for versioned assets
├── Compression: Gzip + Brotli
└── Geographic distribution: [regions]

Layer 2: Application Cache (API responses)
├── Technology: Redis Cluster
├── TTL: [time-based strategy]
├── Invalidation: [strategy]
└── Memory allocation: [size]

Layer 3: Database Cache (Query results)
├── Query result caching
├── Connection pooling optimization
└── Read replica utilization
\`\`\`

### Infrastructure Scaling Plan

**Horizontal Scaling:**
- **Auto-scaling triggers:** [CPU/Memory/Request thresholds]
- **Instance types:** [Optimized configurations]
- **Load balancing:** [Algorithm and health checks]

**Vertical Scaling:**
- **Resource optimization:** [CPU/Memory right-sizing]
- **Performance monitoring:** [Key metrics to track]

**Geographic Distribution:**
\`\`\`
Primary Region: [Main data center]
├── Application servers: [count and configuration]
├── Database: [primary with read replicas]
└── Cache: [distributed cache setup]

Edge Locations: [CDN and edge computing]
├── Static content delivery
├── API gateway functions
└── Edge caching strategy
\`\`\`

### Performance Monitoring Setup

**Key Metrics Dashboard:**
\`\`\`yaml
Frontend Metrics:
  - Core Web Vitals (LCP, FID, CLS)
  - Page load time (p50, p95, p99)
  - JavaScript error rate
  - Bundle size tracking

Backend Metrics:
  - API response time (p50, p95, p99)
  - Request throughput (RPS)
  - Error rate by endpoint
  - CPU/Memory utilization

Database Metrics:
  - Query execution time
  - Connection pool utilization
  - Lock wait time
  - Cache hit ratio

Infrastructure Metrics:
  - Network latency
  - CDN cache hit ratio
  - Auto-scaling events
  - Resource costs
\`\`\`

**Alerting Rules:**
\`\`\`yaml
Critical Alerts:
  - Response time > 5s for 2 minutes
  - Error rate > 5% for 1 minute
  - CPU usage > 80% for 5 minutes

Warning Alerts:
  - Response time > 2s for 5 minutes
  - Memory usage > 70% for 10 minutes
  - Cache hit ratio < 80% for 15 minutes
\`\`\`

### Implementation Roadmap

**Phase 1 (Week 1-2): Quick Wins**
- [ ] Implement database query optimizations
- [ ] Add missing database indexes
- [ ] Optimize image compression and CDN
- [ ] Enable gzip compression
- **Expected Improvement:** {{PHASE1_IMPROVEMENT}}

**Phase 2 (Week 3-6): Core Optimizations**
- [ ] Implement application-level caching
- [ ] Optimize JavaScript bundle
- [ ] Database connection pool tuning
- [ ] API response optimization
- **Expected Improvement:** {{PHASE2_IMPROVEMENT}}

**Phase 3 (Week 7-12): Architecture Changes**
- [ ] Implement microservices architecture
- [ ] Add read replicas and sharding
- [ ] Implement advanced caching layers
- [ ] Geographic distribution setup
- **Expected Improvement:** {{PHASE3_IMPROVEMENT}}

### Cost-Benefit Analysis

**Optimization Investment:**
\`\`\`
Development Time: [hours/weeks]
Infrastructure Costs: [monthly increase/decrease]
Maintenance Overhead: [ongoing effort]

Performance Benefits:
- Response time improvement: [percentage]
- Throughput increase: [percentage]
- Cost savings: [monthly amount]
- User experience improvement: [metrics]

ROI Calculation:
- Implementation cost: $[amount]
- Monthly savings: $[amount]
- Payback period: [months]
\`\`\`

**Risk Assessment:**
- **Technical risks:** [Implementation challenges]
- **Business risks:** [Potential service disruption]
- **Mitigation strategies:** [Risk reduction approaches]

### Testing & Validation Plan

**Performance Testing Strategy:**
\`\`\`bash
# Load testing setup
artillery run load-test-config.yml

# Stress testing
k6 run stress-test.js

# Performance regression testing
npm run perf-test:regression
\`\`\`

**Success Criteria:**
- [ ] Response time < {{TARGET_RESPONSE_TIME}}ms (p95)
- [ ] Throughput > {{TARGET_THROUGHPUT}} RPS
- [ ] Error rate < {{TARGET_ERROR_RATE}}%
- [ ] Core Web Vitals in "Good" range
- [ ] Cost reduction of {{TARGET_COST_REDUCTION}}%

**Rollback Plan:**
- [ ] Feature flags for new optimizations
- [ ] Database rollback procedures
- [ ] Infrastructure rollback automation
- [ ] Performance monitoring during rollout

Provide specific, measurable recommendations with quantified performance improvements and clear implementation steps.`,
    variables: ['SYSTEM_TYPE', 'TECH_STACK', 'CURRENT_SCALE', 'TARGET_SCALE', 'PERFORMANCE_GOALS', 'BUDGET_CONSTRAINTS', 'RESPONSE_TIME', 'THROUGHPUT', 'ERROR_RATE', 'RESOURCE_UTILIZATION', 'PERFORMANCE_ISSUES', 'SYSTEM_INFORMATION'],
    examples: [
      {
        input: 'SYSTEM_TYPE: E-commerce Website, TECH_STACK: React + Node.js + PostgreSQL, CURRENT_SCALE: 10k users, PERFORMANCE_GOALS: Sub-2s page loads',
        output: 'Comprehensive performance optimization plan covering frontend bundle optimization, database query tuning, caching strategies, and infrastructure scaling'
      },
      {
        input: 'SYSTEM_TYPE: API Service, TECH_STACK: Python FastAPI + Redis + MongoDB, CURRENT_SCALE: 1M requests/day, PERFORMANCE_GOALS: 100ms response time',
        output: 'Full-stack performance analysis with API optimization, database sharding, caching implementation, and horizontal scaling recommendations'
      }
    ],
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];