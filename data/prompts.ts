import { PromptTemplate } from './types';

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'api-design-architect',
    title: 'API Design & Architecture Prompt',
    slug: 'api-design-architect',
    description: 'Comprehensive prompt for designing REST APIs with proper architecture, documentation, and best practices.',
    category: 'Backend Development',
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
    category: 'Database Design',
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
    category: 'Frontend Development',
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
    category: 'DevOps & Infrastructure',
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
    category: 'Code Quality',
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
    category: 'Debugging & Troubleshooting',
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
  }
];