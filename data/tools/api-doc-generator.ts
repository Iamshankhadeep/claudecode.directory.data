export default {
  id: 'api-doc-generator',
  title: 'API Doc Generator',
  slug: 'api-doc-generator',
  tagline: 'Generate comprehensive API documentation with OpenAPI/Swagger support and SDK generation',
  description: 'Comprehensive API documentation generation tool with OpenAPI/Swagger support, interactive documentation, client SDK generation, and automated testing integration.',
  category: 'Tools & CLI',
  type: 'CLI',
  url: 'https://github.com/enterprise/api-doc-generator',
  tags: ['api', 'documentation', 'openapi', 'swagger', 'sdk-generation', 'interactive-docs'],
  author: {
    name: 'Claude Code Directory',
    url: 'https://claudecode.directory'
  },
  stats: {
    votes: 0,
    copies: 0
  },
  difficulty: 'ADVANCED',
  lastUpdated: '2024-01-31' API Doc Generator

Advanced API documentation generation platform with comprehensive OpenAPI/Swagger support, interactive documentation, client SDK generation, and automated testing integration.

## Installation and Setup

\`\`\`bash
# Install API Doc Generator
npm install -g @enterprise/api-doc-generator
# or
curl -fsSL https://releases.api-doc-generator.io/install.sh | bash

# Initialize in project
api-docs init

# Configure documentation generation
api-docs config setup
\`\`\`

## Core Commands

### Documentation Generation

\`\`\`bash
# Generate OpenAPI specification
api-docs generate --source=./src/controllers --output=openapi.yml
api-docs generate --source=./api --format=json --output=api-spec.json
api-docs generate --source=./routes --include-examples --output=docs/

# Interactive documentation
api-docs serve --spec=openapi.yml --port=3001       # Swagger UI
api-docs serve --spec=openapi.yml --theme=redoc     # ReDoc theme
api-docs serve --spec=openapi.yml --interactive     # Try-it-out enabled

# Multi-format output
api-docs export --spec=openapi.yml --format=html    # Static HTML
api-docs export --spec=openapi.yml --format=pdf     # PDF documentation
api-docs export --spec=openapi.yml --format=md      # Markdown docs
api-docs export --spec=openapi.yml --format=postman # Postman collection
\`\`\`

### Client SDK Generation

\`\`\`bash
# Generate client libraries
api-docs sdk generate --spec=openapi.yml --language=typescript
api-docs sdk generate --spec=openapi.yml --language=python --output=./clients/python
api-docs sdk generate --spec=openapi.yml --language=java --package=com.company.api

# Multi-language generation
api-docs sdk generate-all --spec=openapi.yml --languages=typescript,python,java,go
api-docs sdk validate --client=./clients/typescript
api-docs sdk publish --client=./clients/typescript --registry=npm
\`\`\`

### Advanced Features

\`\`\`bash
# API testing integration
api-docs test generate --spec=openapi.yml --framework=jest
api-docs test run --spec=openapi.yml --endpoint=http://localhost:3000
api-docs test validate --spec=openapi.yml --against-server

# API versioning
api-docs version create --from=v1.0.0 --to=v1.1.0
api-docs version compare --base=v1.0.0 --target=v1.1.0
api-docs version migrate --spec=openapi-v1.yml --to=v3

# Documentation linting
api-docs lint --spec=openapi.yml --rules=spectral
api-docs validate --spec=openapi.yml --strict
api-docs security-scan --spec=openapi.yml
\`\`\`

## Configuration System

### Global Configuration

\`\`\`yaml
# ~/.api-docs/config.yml
generator:
  version: "3.0"
  default_format: openapi
  output_directory: ./docs
  
source_discovery:
  auto_scan: true
  include_patterns:
    - "src/controllers/**/*.ts"
    - "src/routes/**/*.js"
    - "api/**/*.py"
  exclude_patterns:
    - "**/*.test.*"
    - "**/node_modules/**"
    
parsing:
  extract_from_comments: true
  extract_from_decorators: true
  extract_from_schemas: true
  infer_types: true
  
openapi:
  version: "3.0.3"
  info:
    title: "API Documentation"
    version: "1.0.0"
    description: "Generated API documentation"
    contact:
      name: "API Team"
      email: "api@company.com"
    license:
      name: "MIT"
      url: "https://opensource.org/licenses/MIT"
  
  servers:
    - url: "https://api.company.com/v1"
      description: "Production server"
    - url: "https://staging-api.company.com/v1"
      description: "Staging server"
    - url: "http://localhost:3000/v1"
      description: "Development server"

documentation:
  theme: "swagger-ui"
  custom_css: "./assets/custom.css"
  custom_logo: "./assets/logo.png"
  
  features:
    try_it_out: true
    syntax_highlighting: true
    deep_linking: true
    display_request_duration: true
    
  authentication:
    show_auth_in_examples: true
    persist_authorization: true

client_generation:
  default_languages: [typescript, python, java]
  
  typescript:
    package_name: "@company/api-client"
    version: "1.0.0"
    target: "es2020"
    module_system: "esm"
    
  python:
    package_name: "company-api-client"
    version: "1.0.0"
    python_version: "3.8+"
    
  java:
    group_id: "com.company"
    artifact_id: "api-client"
    version: "1.0.0"
    java_version: "11"

testing:
  auto_generate_tests: true
  test_frameworks:
    javascript: jest
    python: pytest
    java: junit
    
  mock_server:
    enabled: true
    port: 3001
    response_validation: true

validation:
  strict_mode: true
  rules:
    - required_fields
    - example_validation  
    - schema_consistency
    - security_definitions
    
  custom_rules: "./rules/api-rules.yml"

export_formats:
  html:
    theme: "redoc"
    custom_template: "./templates/api-docs.html"
    
  pdf:
    include_toc: true
    page_size: "A4"
    
  postman:
    collection_name: "API Collection"
    include_examples: true
    include_tests: true
\`\`\`

### Project-Specific Configuration

\`\`\`yaml
# .api-docs/project.yml
project:
  name: "User Management API"
  version: "2.1.0"
  description: "Comprehensive user management and authentication API"
  
api_design:
  rest_conventions: true
  resource_naming: plural
  http_methods: [GET, POST, PUT, PATCH, DELETE]
  status_codes: standard
  
  pagination:
    style: "offset"  # offset, cursor, page
    default_limit: 20
    max_limit: 100
    
  filtering:
    query_params: true
    operators: [eq, ne, gt, lt, in, like]
    
  sorting:
    query_param: "sort"
    multiple_fields: true
    
  versioning:
    strategy: "url"  # url, header, query
    current_version: "v2"

documentation_sections:
  - name: "Getting Started"
    description: "Introduction and quick start guide"
    include_authentication: true
    
  - name: "Authentication"
    description: "Authentication and authorization methods"
    include_examples: true
    
  - name: "User Management"
    description: "User CRUD operations"
    endpoints: ["/users", "/users/{id}"]
    
  - name: "Error Handling"
    description: "Error response formats and codes"
    include_error_examples: true

custom_types:
  User:
    properties:
      id: { type: "string", format: "uuid" }
      email: { type: "string", format: "email" }
      name: { type: "string", minLength: 1, maxLength: 100 }
      role: { type: "string", enum: ["admin", "user", "guest"] }
      createdAt: { type: "string", format: "date-time" }
      updatedAt: { type: "string", format: "date-time" }
    required: ["id", "email", "name", "role"]
    
  PaginatedResponse:
    properties:
      data: { type: "array" }
      pagination:
        type: "object"
        properties:
          page: { type: "integer", minimum: 1 }
          limit: { type: "integer", minimum: 1, maximum: 100 }
          total: { type: "integer", minimum: 0 }
          totalPages: { type: "integer", minimum: 0 }

security_schemes:
  BearerAuth:
    type: "http"
    scheme: "bearer"
    bearerFormat: "JWT"
    
  ApiKeyAuth:
    type: "apiKey"
    in: "header"
    name: "X-API-Key"
    
  OAuth2:
    type: "oauth2"
    flows:
      authorizationCode:
        authorizationUrl: "https://auth.company.com/oauth/authorize"
        tokenUrl: "https://auth.company.com/oauth/token"
        scopes:
          read: "Read access"
          write: "Write access"
          admin: "Admin access"

examples:
  auto_generate: true
  realistic_data: true
  include_edge_cases: true
  
  custom_examples:
    User:
      valid_user:
        summary: "Valid user example"
        value:
          id: "123e4567-e89b-12d3-a456-426614174000"
          email: "john.doe@company.com"
          name: "John Doe"
          role: "user"
          createdAt: "2024-02-01T10:00:00Z"
          updatedAt: "2024-02-01T10:00:00Z"
\`\`\`

## OpenAPI Generation Features

### Source Code Analysis

\`\`\`bash
# Comprehensive source analysis
api-docs analyze --source=./src --detailed
# Output:
# API Source Code Analysis
# ├── Controllers discovered: 8
# ├── Routes mapped: 45 endpoints
# ├── Models extracted: 23 types
# ├── Authentication methods: 3
# ├── Middleware identified: 12
# 
# ├── Endpoint Analysis:
# │   ├── GET endpoints: 18 (40%)
# │   ├── POST endpoints: 12 (27%)
# │   ├── PUT endpoints: 8 (18%)
# │   ├── PATCH endpoints: 4 (9%)
# │   └── DELETE endpoints: 3 (7%)
# 
# ├── Authentication Coverage:
# │   ├── Protected endpoints: 38 (84%)
# │   ├── Public endpoints: 7 (16%)
# │   ├── Role-based access: 25 endpoints
# │   └── API key required: 10 endpoints
# 
# ├── Data Models:
# │   ├── Request models: 15
# │   ├── Response models: 18
# │   ├── Error models: 5
# │   └── Shared types: 8
# 
# └── Quality Metrics:
#     ├── Documentation coverage: 87%
#     ├── Example coverage: 65%
#     ├── Schema validation: 92%
#     └── Consistency score: 8.4/10

# Framework-specific extraction
api-docs extract --framework=express --source=./routes
# Express.js Route Extraction
# ├── Router files: 6
# ├── Route definitions: 45
# ├── Middleware usage: 12 different middleware
# ├── Parameter extraction: 34 path/query parameters
# 
# ├── Generated Schema:
# │   ├── Path parameters with types
# │   ├── Query parameters with validation
# │   ├── Request body schemas
# │   ├── Response schemas with status codes
# │   └── Error response formats
# 
# ├── Middleware Documentation:
# │   ├── Authentication middleware → security requirements
# │   ├── Validation middleware → request schemas
# │   ├── Rate limiting → API limits documentation
# │   └── CORS → allowed origins and methods
# 
# └── Route Analysis:
#     ├── RESTful patterns: 89% compliance
#     ├── Consistent naming: 94%
#     ├── HTTP method usage: Appropriate
#     └── Status code usage: Standard compliant

# Type inference and validation
api-docs infer-types --source=./src/types --language=typescript
# Type Inference Results
# ├── TypeScript interfaces: 23 detected
# ├── Enum definitions: 8 found
# ├── Generic types: 5 identified
# ├── Union types: 12 processed
# 
# ├── Generated OpenAPI Schemas:
# │   ├── User schema with validation rules
# │   ├── Order schema with nested objects
# │   ├── Product schema with enum values
# │   └── Error schema with discriminator
# 
# ├── Validation Rules Applied:
# │   ├── String length constraints
# │   ├── Number range validation
# │   ├── Required field marking
# │   ├── Format validation (email, date, etc.)
# │   └── Pattern matching (regex)
# 
# └── Type Relationships:
#     ├── Inheritance mapped to allOf
#     ├── Composition mapped to oneOf
#     ├── Generic types parameterized
#     └── Circular references resolved
\`\`\`

### Interactive Documentation Generation

\`\`\`bash
# Advanced Swagger UI customization
api-docs serve --spec=openapi.yml --theme=custom --port=3001
# Interactive Documentation Server
# ├── Server: http://localhost:3001
# ├── Theme: Custom corporate theme
# ├── Features enabled:
# │   ├── Try-it-out functionality
# │   ├── Code generation samples
# │   ├── Response examples
# │   ├── Authentication testing
# │   └── Real-time validation
# 
# ├── Customizations:
# │   ├── Corporate branding and colors
# │   ├── Custom logo and favicon
# │   ├── Enhanced navigation
# │   ├── Collapsible sections
# │   └── Syntax highlighting
# 
# ├── Interactive Features:
# │   ├── Live API testing
# │   ├── Request/response inspection
# │   ├── Authentication persistence
# │   ├── Response time tracking
# │   └── Error debugging tools
# 
# └── Export Options:
#     ├── Share documentation URL
#     ├── Export as static HTML
#     ├── Generate PDF version
#     └── Create Postman collection

# Multi-version documentation
api-docs serve --versions=v1,v2,v3 --default=v3
# Multi-Version Documentation Portal
# ├── Versions available: v1.0, v2.0, v3.0 (current)
# ├── Version switcher: Dropdown navigation
# ├── Migration guides: Auto-generated between versions
# ├── Deprecation warnings: Highlighted in v1.0, v2.0
# 
# ├── Version Comparison:
# │   ├── New endpoints in v3.0: 8
# │   ├── Modified endpoints: 5
# │   ├── Deprecated endpoints: 3
# │   ├── Breaking changes: 2
# │   └── Migration complexity: Medium
# 
# ├── Features by Version:
# │   ├── v1.0: Basic CRUD operations
# │   ├── v2.0: + Pagination, filtering
# │   └── v3.0: + GraphQL, real-time subscriptions
# 
# └── Compatibility Matrix:
#     ├── Client SDK compatibility
#     ├── Database schema requirements
#     ├── Authentication method support
#     └── Rate limiting differences

# ReDoc themed documentation
api-docs serve --theme=redoc --spec=openapi.yml --config=redoc.config.json
# ReDoc Documentation
# ├── Theme: Professional ReDoc layout
# ├── Navigation: Three-panel layout
# ├── Search: Full-text search capability
# ├── Code samples: Multiple languages
# 
# ├── Enhanced Features:
# │   ├── Downloadable OpenAPI spec
# │   ├── Nested menu navigation
# │   ├── Responsive design
# │   ├── Print-friendly version
# │   └── Social sharing options
# 
# ├── Content Organization:
# │   ├── Grouped by tags/categories
# │   ├── Alphabetical sorting option
# │   ├── Method-based grouping
# │   └── Custom section ordering
# 
# └── Advanced Display:
#     ├── JSON Schema visualization
#     ├── Enum value descriptions
#     ├── Example request/response
#     └── Error code documentation
\`\`\`

### Client SDK Generation

\`\`\`bash
# TypeScript client generation
api-docs sdk generate --language=typescript --spec=openapi.yml --advanced
# TypeScript SDK Generation
# ├── Target: ES2020 with modern features
# ├── Module system: ESM with CommonJS fallback
# ├── Type safety: Strict TypeScript configuration
# ├── Bundle size: Tree-shakable exports
# 
# ├── Generated Files:
# │   ├── src/
# │   │   ├── client.ts (main client class)
# │   │   ├── types.ts (API types and interfaces)
# │   │   ├── services/ (service-specific clients)
# │   │   ├── auth/ (authentication helpers)
# │   │   └── utils/ (request/response utilities)
# │   ├── dist/ (compiled JavaScript)
# │   ├── docs/ (API client documentation)
# │   └── examples/ (usage examples)
# 
# ├── Client Features:
# │   ├── Async/await support
# │   ├── Request/response interceptors
# │   ├── Automatic retry with backoff
# │   ├── Request/response type validation
# │   ├── Built-in error handling
# │   ├── Authentication token management
# │   ├── Request timeout configuration
# │   └── Response caching options
# 
# ├── Type Safety Features:
# │   ├── Strict null checks
# │   ├── Branded types for IDs
# │   ├── Discriminated unions for responses
# │   ├── Template literal types for URLs
# │   └── Conditional types for operations
# 
# └── Integration:
#     ├── React hooks for data fetching
#     ├── Vue 3 composables
#     ├── Node.js server integration
#     └── Webpack/Vite build optimization

# Python client with advanced features
api-docs sdk generate --language=python --spec=openapi.yml --features=async,pydantic
# Python SDK Generation
# ├── Python version: 3.8+ support
# ├── Async support: asyncio and httpx
# ├── Type hints: Complete type annotations
# ├── Validation: Pydantic models
# 
# ├── Generated Structure:
# │   ├── company_api_client/
# │   │   ├── __init__.py
# │   │   ├── client.py (main client)
# │   │   ├── models.py (Pydantic models)
# │   │   ├── services/ (API services)
# │   │   ├── auth.py (authentication)
# │   │   ├── exceptions.py (custom exceptions)
# │   │   └── utils.py (utilities)
# │   ├── tests/ (unit tests)
# │   ├── examples/ (usage examples)
# │   └── docs/ (Sphinx documentation)
# 
# ├── Advanced Features:
# │   ├── Async/sync client variants
# │   ├── Automatic retry with exponential backoff
# │   ├── Request/response logging
# │   ├── Connection pooling
# │   ├── Rate limiting compliance
# │   ├── Webhook signature validation
# │   └── Custom serialization hooks
# 
# ├── Pydantic Integration:
# │   ├── Request/response validation
# │   ├── JSON Schema generation
# │   ├── Data transformation
# │   ├── Custom validators
# │   └── Serialization optimization
# 
# └── Testing Support:
#     ├── Mock server integration
#     ├── Fixture generation
#     ├── Property-based testing
#     └── Integration test helpers

# Java client with Spring Boot integration
api-docs sdk generate --language=java --spec=openapi.yml --framework=spring-boot
# Java SDK Generation
# ├── Java version: 11+ compatible
# ├── Framework: Spring Boot integration
# ├── HTTP client: WebClient (reactive)
# ├── Serialization: Jackson with custom modules
# 
# ├── Generated Maven Project:
# │   ├── src/main/java/com/company/api/
# │   │   ├── ApiClient.java (main client)
# │   │   ├── model/ (data models)
# │   │   ├── service/ (API services)
# │   │   ├── auth/ (authentication)
# │   │   └── config/ (configuration)
# │   ├── src/test/java/ (unit tests)
# │   ├── pom.xml (Maven configuration)
# │   └── README.md (usage documentation)
# 
# ├── Spring Boot Features:
# │   ├── Auto-configuration support
# │   ├── Properties-based configuration
# │   ├── Actuator health checks
# │   ├── Metrics integration (Micrometer)
# │   ├── Tracing support (Zipkin/Jaeger)
# │   └── Circuit breaker integration
# 
# ├── Reactive Support:
# │   ├── WebClient for non-blocking calls
# │   ├── Mono/Flux return types
# │   ├── Backpressure handling
# │   ├── Error recovery operators
# │   └── Custom reactive operators
# 
# └── Enterprise Features:
#     ├── Connection pooling configuration
#     ├── SSL/TLS certificate management
#     ├── Proxy support
#     ├── Custom interceptors
#     ├── Request/response logging
#     └── Performance monitoring
\`\`\`

## Testing Integration

### Automated API Testing

\`\`\`bash
# Generate comprehensive test suite
api-docs test generate --spec=openapi.yml --framework=jest --coverage=full
# API Test Suite Generation
# ├── Test framework: Jest with supertest
# ├── Test files generated: 45 (one per endpoint)
# ├── Test cases created: 180 (4 per endpoint average)
# ├── Coverage targets: 95% endpoint coverage
# 
# ├── Generated Test Types:
# │   ├── Happy path tests (45 tests)
# │   ├── Error condition tests (60 tests)
# │   ├── Authentication tests (35 tests)
# │   ├── Validation tests (25 tests)
# │   └── Edge case tests (15 tests)
# 
# ├── Test Categories:
# │   ├── Contract tests (OpenAPI compliance)
# │   ├── Integration tests (end-to-end flows)
# │   ├── Performance tests (response time limits)
# │   ├── Security tests (authentication/authorization)
# │   └── Data validation tests (schema compliance)
# 
# ├── Mock Data Generation:
# │   ├── Realistic test data based on schemas
# │   ├── Edge case data (boundary values)
# │   ├── Invalid data for error testing
# │   └── Large dataset for performance testing
# 
# └── Reporting:
#     ├── JUnit XML reports
#     ├── Coverage reports (Istanbul)
#     ├── Performance benchmarks
#     └── API compliance reports

# Contract testing with Pact
api-docs test pact --spec=openapi.yml --consumer=frontend --provider=api
# Contract Testing Setup
# ├── Pact contracts generated from OpenAPI
# ├── Consumer tests: Frontend expectations
# ├── Provider tests: API implementation verification
# ├── Contract broker: Pact Broker integration
# 
# ├── Generated Pact Files:
# │   ├── consumer-api.json (consumer expectations)
# │   ├── provider-tests.js (provider verification)
# │   ├── pact-setup.js (test configuration)
# │   └── pact-teardown.js (cleanup utilities)
# 
# ├── Contract Scenarios:
# │   ├── Successful response scenarios
# │   ├── Error response scenarios
# │   ├── Authentication scenarios
# │   ├── Rate limiting scenarios
# │   └── Data format variations
# 
# ├── CI/CD Integration:
# │   ├── Consumer contract publication
# │   ├── Provider verification pipeline
# │   ├── Contract compatibility checks
# │   └── Breaking change detection
# 
# └── Documentation:
#     ├── Contract specifications
#     ├── Test execution reports
#     ├── Compatibility matrix
#     └── Migration guides

# Performance testing generation
api-docs test performance --spec=openapi.yml --tool=k6 --scenarios=load,spike,stress
# Performance Test Generation
# ├── Testing tool: K6 performance testing
# ├── Test scenarios: Load, Spike, Stress testing
# ├── Virtual users: Configurable (10-1000)
# ├── Duration: Configurable test periods
# 
# ├── Generated K6 Scripts:
# │   ├── load-test.js (sustained load testing)
# │   ├── spike-test.js (traffic spike simulation)
# │   ├── stress-test.js (breaking point testing)
# │   ├── smoke-test.js (basic functionality)
# │   └── volume-test.js (large data processing)
# 
# ├── Test Scenarios:
# │   ├── Load Test: 100 VUs for 10 minutes
# │   ├── Spike Test: 0→500→0 VUs over 5 minutes
# │   ├── Stress Test: Gradual ramp to 1000 VUs
# │   ├── Volume Test: Large payloads and responses
# │   └── Endurance Test: 24-hour sustained load
# 
# ├── Performance Metrics:
# │   ├── Response time percentiles (p50, p95, p99)
# │   ├── Request rate (RPS)
# │   ├── Error rate percentage
# │   ├── Throughput (data transfer)
# │   └── Resource utilization
# 
# └── Reporting:
#     ├── Real-time dashboards
#     ├── HTML performance reports
#     ├── JSON metrics export
#     └── Threshold violation alerts
\`\`\`

### Mock Server Generation

\`\`\`bash
# Generate mock server from OpenAPI spec
api-docs mock generate --spec=openapi.yml --dynamic --port=3001
# Mock Server Generation
# ├── Server framework: Express.js with middleware
# ├── Port: 3001 (configurable)
# ├── Endpoints: 45 mock endpoints generated
# ├── Response types: Realistic mock data
# 
# ├── Mock Server Features:
# │   ├── Dynamic response generation
# │   ├── Realistic fake data (faker.js)
# │   ├── Stateful mock operations
# │   ├── Request validation
# │   ├── Response delay simulation
# │   ├── Error scenario simulation
# │   └── CORS support
# 
# ├── Advanced Capabilities:
# │   ├── Scenario-based responses
# │   ├── Custom response rules
# │   ├── Request/response logging
# │   ├── State persistence (in-memory)
# │   ├── Webhook simulation
# │   └── Rate limiting simulation
# 
# ├── Configuration Options:
# │   ├── Response delay ranges
# │   ├── Error rate percentages
# │   ├── Data generation rules
# │   ├── Authentication simulation
# │   └── Custom middleware
# 
# └── Integration:
#     ├── Docker container ready
#     ├── Docker Compose integration
#     ├── Kubernetes deployment
#     └── CI/CD pipeline integration

# Prism mock server with advanced features
api-docs mock prism --spec=openapi.yml --dynamic --validate
# Prism Mock Server
# ├── Server: Stoplight Prism
# ├── Validation: Request/response validation
# ├── Examples: Uses OpenAPI examples
# ├── Dynamic: Generates missing examples
# 
# ├── Validation Features:
# │   ├── Request schema validation
# │   ├── Response schema validation
# │   ├── Header validation
# │   ├── Query parameter validation
# │   └── Path parameter validation
# 
# ├── Response Generation:
# │   ├── Example-based responses
# │   ├── Schema-based generation
# │   ├── Faker.js integration
# │   ├── Realistic data patterns
# │   └── Relationship consistency
# 
# ├── Error Simulation:
# │   ├── HTTP error codes
# │   ├── Validation error responses
# │   ├── Rate limiting responses
# │   ├── Authentication failures
# │   └── Server error simulations
# 
# └── Development Integration:
#     ├── Hot reload on spec changes
#     ├── Request/response logging
#     ├── Proxy mode for partial mocking
#     └── Integration with testing frameworks
\`\`\`

## Advanced Documentation Features

### Multi-Format Export

\`\`\`bash
# Comprehensive documentation export
api-docs export --spec=openapi.yml --formats=all --output=./exports
# Multi-Format Export Results
# ├── Export formats: 8 different formats
# ├── Output directory: ./exports/
# ├── Total file size: 15.2 MB
# ├── Generation time: 45 seconds
# 
# ├── Generated Files:
# │   ├── api-docs.html (Interactive Swagger UI)
# │   ├── api-docs-redoc.html (ReDoc theme)
# │   ├── api-docs.pdf (Professional PDF, 127 pages)
# │   ├── api-docs.md (Markdown documentation)
# │   ├── api-collection.postman.json (Postman collection)
# │   ├── api-tests.har (HTTP Archive for testing)
# │   ├── api-spec.json (OpenAPI JSON)
# │   └── api-spec.yaml (OpenAPI YAML)
# 
# ├── HTML Features:
# │   ├── Offline-capable documentation
# │   ├── Search functionality
# │   ├── Responsive design
# │   ├── Print-optimized styles
# │   └── Custom branding
# 
# ├── PDF Features:
# │   ├── Table of contents with links
# │   ├── Code syntax highlighting
# │   ├── Professional formatting
# │   ├── Headers and footers
# │   └── Page numbering
# 
# └── Integration Files:
#     ├── Postman collection with tests
#     ├── Insomnia workspace export
#     ├── cURL command examples
#     └── HTTPie command examples

# Custom template-based export
api-docs export --spec=openapi.yml --template=./templates/custom.hbs --format=html
# Custom Template Export
# ├── Template engine: Handlebars
# ├── Custom template: Professional corporate theme
# ├── Brand integration: Company colors and logo
# ├── Enhanced navigation: Multi-level menu
# 
# ├── Template Features:
# │   ├── Custom CSS styling
# │   ├── JavaScript enhancements
# │   ├── Interactive code examples
# │   ├── Advanced search functionality
# │   └── Social sharing integration
# 
# ├── Content Customization:
# │   ├── Custom sections and ordering
# │   ├── Additional metadata display
# │   ├── Custom example formatting
# │   ├── Enhanced error documentation
# │   └── Integration guides
# 
# ├── Responsive Design:
# │   ├── Mobile-first approach
# │   ├── Tablet optimization
# │   ├── Desktop enhancements
# │   └── Print media queries
# 
# └── Performance Optimization:
#     ├── Minified CSS and JavaScript
#     ├── Optimized images and assets
#     ├── Lazy loading for large specs
#     └── CDN-ready static files

# Automated documentation deployment
api-docs deploy --spec=openapi.yml --target=github-pages --domain=api-docs.company.com
# Documentation Deployment
# ├── Target platform: GitHub Pages
# ├── Custom domain: api-docs.company.com
# ├── SSL certificate: Automatic (Let's Encrypt)
# ├── Build optimization: Static site generation
# 
# ├── Deployment Features:
# │   ├── Automated builds on spec changes
# │   ├── Version-based routing
# │   ├── Search index generation
# │   ├── Analytics integration (Google Analytics)
# │   └── CDN distribution
# 
# ├── SEO Optimization:
# │   ├── Meta tags for endpoints
# │   ├── Structured data markup
# │   ├── Sitemap generation
# │   ├── Open Graph tags
# │   └── Social media previews
# 
# ├── Performance Features:
# │   ├── Static site generation
# │   ├── Asset optimization
# │   ├── Service worker caching
# │   ├── Progressive loading
# │   └── Image optimization
# 
# └── Monitoring:
#     ├── Uptime monitoring
#     ├── Performance tracking
#     ├── User analytics
#     └── Error tracking
\`\`\`

## Integration and Automation

### CI/CD Pipeline Integration

\`\`\`yaml
# .github/workflows/api-documentation.yml  
name: API Documentation Pipeline

on:
  push:
    paths: ['src/**', 'api/**', 'openapi.yml']
    branches: [main, develop]
  pull_request:
    paths: ['src/**', 'api/**', 'openapi.yml']

jobs:
  generate_docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup API Doc Generator
        run: |
          npm install -g @enterprise/api-doc-generator
          api-docs config load --file=.api-docs/ci-config.yml
      
      - name: Extract API Specification
        run: |
          api-docs generate --source=./src/controllers --output=openapi.yml
          api-docs validate --spec=openapi.yml --strict
      
      - name: Generate Documentation
        run: |
          api-docs export --spec=openapi.yml --formats=html,pdf,md
          api-docs export --spec=openapi.yml --format=postman --output=api-collection.json
      
      - name: Generate Client SDKs
        run: |
          api-docs sdk generate --spec=openapi.yml --language=typescript --output=./clients/typescript
          api-docs sdk generate --spec=openapi.yml --language=python --output=./clients/python
          api-docs sdk generate --spec=openapi.yml --language=java --output=./clients/java
      
      - name: Run API Tests
        run: |
          api-docs mock start --spec=openapi.yml --port=3001 &
          sleep 10
          api-docs test run --spec=openapi.yml --endpoint=http://localhost:3001
          api-docs test validate --spec=openapi.yml
      
      - name: Security Scan
        run: |
          api-docs security-scan --spec=openapi.yml --report=security-report.json
      
      - name: Deploy Documentation
        if: github.ref == 'refs/heads/main'
        run: |
          api-docs deploy --spec=openapi.yml --target=s3 --bucket=api-docs-bucket
          api-docs deploy --spec=openapi.yml --target=github-pages
      
      - name: Publish Client SDKs
        if: github.ref == 'refs/heads/main'
        run: |
          cd clients/typescript && npm publish
          cd ../python && python setup.py sdist bdist_wheel && twine upload dist/*
          cd ../java && mvn deploy
      
      - name: Update API Registry
        run: |
          api-docs registry update --spec=openapi.yml --registry=company-api-registry
      
      - name: Notify Teams
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          fields: repo,message,commit,author,action,eventName,ref,workflow
          text: |
            API Documentation Updated
            - New endpoints: ${{ env.NEW_ENDPOINTS }}
            - Modified endpoints: ${{ env.MODIFIED_ENDPOINTS }}
            - Client SDKs published: TypeScript, Python, Java
            - Documentation: https://api-docs.company.com
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

  version_check:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Check for Breaking Changes
        run: |
          git checkout main
          api-docs generate --source=./src/controllers --output=base-spec.yml
          git checkout ${{ github.head_ref }}
          api-docs generate --source=./src/controllers --output=current-spec.yml
          api-docs version compare --base=base-spec.yml --target=current-spec.yml --output=changes.json
      
      - name: Comment PR with Changes
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const changes = JSON.parse(fs.readFileSync('changes.json', 'utf8'));
            const comment = \`## API Changes Summary
            
            ### Breaking Changes: \${changes.breaking.length}
            \${changes.breaking.map(c => \`- \${c.description}\`).join('\\n')}
            
            ### New Endpoints: \${changes.new.length}
            \${changes.new.map(c => \`- \${c.method} \${c.path}\`).join('\\n')}
            
            ### Modified Endpoints: \${changes.modified.length}
            \${changes.modified.map(c => \`- \${c.method} \${c.path}\`).join('\\n')}
            
            [View detailed changes](https://github.com/\${context.repo.owner}/\${context.repo.repo}/actions/runs/\${context.runId})\`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
\`\`\`

## Usage Examples

### Development Workflow

\`\`\`bash
# Daily development
api-docs generate --source=./src --watch      # Auto-regenerate on changes
api-docs serve --spec=openapi.yml --live      # Live documentation server
api-docs validate --spec=openapi.yml --fix   # Auto-fix validation issues

# Feature development
api-docs generate --source=./src/users --incremental
api-docs mock start --spec=openapi.yml --scenario=development
api-docs test generate --spec=openapi.yml --endpoints=/users

# Before deployment
api-docs validate --spec=openapi.yml --strict
api-docs security-scan --spec=openapi.yml
api-docs performance-test --spec=openapi.yml --quick
\`\`\`

### Team Collaboration

\`\`\`bash
# Documentation review
api-docs diff --base=v1.0.0 --target=HEAD    # Show API changes
api-docs review --spec=openapi.yml --format=html
api-docs share --spec=openapi.yml --expire=7d

# Client SDK management
api-docs sdk update --all                     # Update all client SDKs
api-docs sdk validate --client=typescript    # Validate generated clients
api-docs sdk publish --client=python --registry=pypi

# API governance
api-docs governance check --spec=openapi.yml
api-docs standards validate --spec=openapi.yml --rules=company
api-docs metrics report --period=30d
\`\`\`

};