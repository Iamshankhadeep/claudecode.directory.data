export default {
  id: 'security-scanner',
  title: 'Security Scanner',
  slug: 'security-scanner',
  tagline: 'Comprehensive security scanning with SAST, DAST, and vulnerability assessment',
  description: 'Comprehensive security scanning and vulnerability assessment tool with SAST, DAST, dependency scanning, and compliance checking for enterprise applications.',
  category: 'Tools & CLI',
  type: 'CLI',
  url: 'https://github.com/enterprise/security-scanner',
  tags: ['security', 'vulnerability', 'scanning', 'sast', 'dast', 'compliance', 'penetration-testing'],
  author: {
    name: 'Claude Code Directory',
    url: 'https://claudecode.directory'
  },
  stats: {
    votes: 0,
    copies: 0
  },
  difficulty: 'ADVANCED',
  lastUpdated: '2024-01-31' Security Scanner

Enterprise-grade security scanning and vulnerability assessment platform with comprehensive SAST, DAST, dependency scanning, and compliance monitoring capabilities.

## Installation and Setup

\`\`\`bash
# Install Security Scanner
npm install -g @enterprise/security-scanner
# or
curl -fsSL https://releases.security-scanner.io/install.sh | bash

# Initialize security configuration
sec-scan init

# Configure scanning targets
sec-scan config setup
\`\`\`

## Core Commands

### Static Analysis Security Testing (SAST)

\`\`\`bash
# Code security analysis
sec-scan sast analyze --path=./src                # Scan source code
sec-scan sast analyze --language=javascript       # Language-specific scan
sec-scan sast analyze --rules=owasp-top-10       # Rule-based scanning
sec-scan sast analyze --severity=high            # Filter by severity

# Custom rule creation
sec-scan sast rules create --name="custom-rule"   # Create custom security rule
sec-scan sast rules import --file=rules.yml      # Import rule set
sec-scan sast rules validate --rule-id=RULE-001  # Validate rule

# Report generation
sec-scan sast report --format=sarif              # SARIF format report  
sec-scan sast report --format=html               # HTML dashboard
sec-scan sast report --format=json               # JSON for CI/CD
\`\`\`

### Dynamic Application Security Testing (DAST)

\`\`\`bash
# Web application scanning
sec-scan dast scan --url=https://app.company.com  # Basic web scan
sec-scan dast scan --authenticated                # Authenticated scan
sec-scan dast scan --comprehensive               # Full penetration test
sec-scan dast scan --api-spec=openapi.yml       # API security testing

# Network security scanning
sec-scan network scan --target=10.0.1.0/24      # Network range scan
sec-scan network ports --host=app.company.com    # Port enumeration
sec-scan network services --comprehensive        # Service discovery

# API security testing
sec-scan api test --spec=swagger.json            # Swagger-based testing
sec-scan api fuzz --endpoint=/api/users          # API fuzzing
sec-scan api auth --test-bypass                  # Authentication testing
\`\`\`

### Dependency and Container Scanning

\`\`\`bash
# Dependency vulnerability scanning
sec-scan deps scan --package-manager=npm         # NPM dependencies
sec-scan deps scan --package-manager=pip         # Python dependencies
sec-scan deps scan --package-manager=maven       # Java dependencies
sec-scan deps audit --fix-available              # Show available fixes

# Container security scanning
sec-scan container scan --image=myapp:latest     # Docker image scan
sec-scan container layers --analyze              # Layer-by-layer analysis
sec-scan container config --dockerfile=Dockerfile # Dockerfile security
sec-scan container runtime --running             # Runtime vulnerability scan

# Infrastructure as Code scanning
sec-scan iac scan --terraform                    # Terraform security
sec-scan iac scan --kubernetes                   # Kubernetes manifests
sec-scan iac scan --cloudformation               # CloudFormation templates
\`\`\`

## Configuration System

### Global Security Configuration

\`\`\`yaml
# ~/.sec-scan/config.yml
scanner:
  version: "2.0"
  default_severity: medium
  max_scan_time: 3600  # seconds
  parallel_scans: 4
  
targets:
  development:
    type: local
    base_url: http://localhost:3000
    credentials:
      username: ${DEV_USERNAME}
      password: ${DEV_PASSWORD}
    
  staging:
    type: remote
    base_url: https://staging.company.com
    api_key: ${STAGING_API_KEY}
    
  production:
    type: remote
    base_url: https://app.company.com
    api_key: ${PROD_API_KEY}
    rate_limit: 10  # requests per second

sast_config:
  languages: [javascript, typescript, python, java, go]
  exclude_patterns:
    - "*/node_modules/*"
    - "*/vendor/*"
    - "*/test/*"
    - "*.test.js"
  
  rules:
    owasp_top_10: enabled
    cwe_top_25: enabled
    custom_rules: enabled
    
  severity_mapping:
    critical: [sql_injection, rce, auth_bypass]
    high: [xss, csrf, path_traversal]
    medium: [info_disclosure, weak_crypto]
    low: [missing_headers, verbose_errors]

dast_config:
  scan_depth: 10
  follow_redirects: true
  scan_forms: true
  scan_cookies: true
  
  authentication:
    type: form  # form, basic, oauth, jwt
    login_url: /login
    username_field: email
    password_field: password
    success_indicator: "dashboard"
    
  fuzzing:
    enabled: true
    payload_sets: [xss, sqli, cmdj, path_traversal]
    max_payloads: 1000
    
  api_testing:
    test_authentication: true
    test_authorization: true
    test_input_validation: true
    test_business_logic: true

dependency_config:
  package_managers: [npm, pip, maven, gradle, composer]
  vulnerability_databases:
    - nvd
    - github_advisory
    - snyk
    - ossindex
  
  severity_thresholds:
    critical: fail_build
    high: warn
    medium: ignore
    low: ignore
    
  license_checking:
    enabled: true
    allowed_licenses: [MIT, Apache-2.0, BSD-3-Clause]
    forbidden_licenses: [GPL-3.0, AGPL-3.0]

compliance:
  frameworks:
    - owasp_top_10
    - cwe_top_25
    - pci_dss
    - gdpr
    - hipaa
    - sox
  
  reporting:
    formats: [sarif, junit, html, pdf]
    include_remediation: true
    executive_summary: true

alerting:
  enabled: true
  channels:
    slack:
      webhook: ${SLACK_WEBHOOK}
      channel: "#security-alerts"
    email:
      smtp_server: smtp.company.com
      recipients: ["security@company.com"]
    jira:
      url: https://company.atlassian.net
      project: SEC
      
  thresholds:
    critical_vulnerabilities: 0
    high_vulnerabilities: 5
    scan_failures: 1

integration:
  ci_cd:
    fail_on_critical: true
    fail_on_high: false
    export_sarif: true
    
  ticketing:
    auto_create_tickets: true
    assign_to_teams: true
    track_remediation: true
\`\`\`

### Application-Specific Security Configuration

\`\`\`yaml
# .sec-scan/app.yml
application:
  name: user-service
  type: web_application
  criticality: high
  technology_stack: [nodejs, express, postgresql]

security_requirements:
  authentication: required
  encryption: tls_1_3
  input_validation: strict
  output_encoding: contextual
  session_management: secure
  
testing_scope:
  include_paths:
    - "/api/*"
    - "/admin/*"
    - "/user/*"
  exclude_paths:
    - "/health"
    - "/metrics"
    - "/static/*"
    
  test_cases:
    - name: authentication_bypass
      priority: critical
      endpoints: ["/api/admin/*"]
      
    - name: sql_injection
      priority: critical
      parameters: ["user_id", "search", "filter"]
      
    - name: xss_testing
      priority: high
      forms: ["contact", "profile", "comment"]

custom_rules:
  - rule_id: HARDCODED_SECRETS
    severity: critical
    pattern: '(password|secret|key)\s*[:=]\s*["\'][^"\']{8,}["\']'
    description: "Hardcoded secrets detected"
    
  - rule_id: WEAK_CRYPTO
    severity: high
    pattern: '(md5|sha1|des)\('
    description: "Weak cryptographic algorithms"
    
  - rule_id: SQL_INJECTION
    severity: critical
    pattern: 'query\s*\+\s*["\''].*["\'']|\$\{.*\}'
    description: "Potential SQL injection vulnerability"

remediation:
  auto_fix: false
  generate_patches: true
  track_progress: true
  sla_days: 30  # for critical vulnerabilities
\`\`\`

## Security Scanning Features

### Comprehensive SAST Analysis

\`\`\`bash
# Full static code analysis
sec-scan sast analyze --comprehensive --path=./src
# Output:
# Static Application Security Testing Results
# ├── Files scanned: 1,234
# ├── Lines of code: 45,678
# ├── Languages detected: JavaScript (78%), TypeScript (22%)
# ├── Scan duration: 3m 45s
# ├── Rules applied: 156 (OWASP Top 10, CWE Top 25, Custom)
# 
# ├── Vulnerabilities found: 23
# │   ├── Critical: 3
# │   ├── High: 7  
# │   ├── Medium: 9
# │   └── Low: 4
# 
# ├── Critical Vulnerabilities:
# │   ├── SQL Injection (CWE-89)
# │   │   ├── File: src/controllers/user.js:45
# │   │   ├── Severity: Critical
# │   │   ├── Confidence: High
# │   │   └── Fix: Use parameterized queries
# │   ├── Hardcoded Secret (CWE-798)
# │   │   ├── File: src/config/database.js:12
# │   │   ├── Severity: Critical
# │   │   ├── Confidence: High
# │   │   └── Fix: Use environment variables
# │   └── Command Injection (CWE-78)
# │       ├── File: src/utils/file.js:78
# │       ├── Severity: Critical
# │       ├── Confidence: Medium
# │       └── Fix: Validate and sanitize input
# 
# ├── High Vulnerabilities:
# │   ├── Cross-Site Scripting (CWE-79): 3 instances
# │   ├── Path Traversal (CWE-22): 2 instances
# │   ├── Weak Cryptography (CWE-327): 1 instance
# │   └── Authentication Bypass (CWE-306): 1 instance
# 
# └── Recommendations:
#     ├── Implement input validation framework
#     ├── Use security-focused linting rules
#     ├── Conduct security code review training
#     └── Implement automated security testing in CI/CD

# Language-specific security analysis
sec-scan sast analyze --language=javascript --detailed
# JavaScript Security Analysis
# ├── Framework detected: Express.js
# ├── Security middleware: helmet (missing), cors (configured)
# ├── Common vulnerabilities:
# │   ├── eval() usage: 2 instances (avoid dynamic code execution)
# │   ├── Prototype pollution: 1 potential instance
# │   ├── RegExp DoS: 3 vulnerable patterns
# │   └── Unsafe object property access: 15 instances
# ├── NPM security audit: 5 vulnerable packages
# └── Express.js specific issues:
#     ├── Missing security headers middleware
#     ├── Unvalidated redirects: 2 instances
#     ├── Session security: weak configuration
#     └── Error handling: information disclosure risk

# Custom rule creation and testing
sec-scan sast rules create --interactive
# Interactive Rule Creation Wizard
# ├── Rule name: [custom-jwt-secret-validation]
# ├── Severity: [Critical]
# ├── CWE mapping: [CWE-798: Use of Hard-coded Credentials]
# ├── Pattern: jwt\.sign\([^,]+,\s*["\'][^"\']{8,}["\']
# ├── Description: [JWT signed with hardcoded secret]
# ├── Remediation: [Use environment variables for JWT secrets]
# ├── Test cases: [3 positive, 2 negative]
# └── Validation: [Pattern matches 2 files]
\`\`\`

### Advanced DAST Scanning

\`\`\`bash
# Comprehensive web application security testing
sec-scan dast scan --url=https://app.company.com --comprehensive
# Output:
# Dynamic Application Security Testing Results
# ├── Target: https://app.company.com
# ├── Scan type: Comprehensive
# ├── Authentication: Successful (user role)
# ├── Pages crawled: 1,245
# ├── Forms tested: 67
# ├── Parameters tested: 2,345
# ├── Payloads sent: 15,678
# ├── Scan duration: 2h 15m
# 
# ├── Vulnerabilities discovered: 18
# │   ├── Critical: 2
# │   ├── High: 5
# │   ├── Medium: 8
# │   └── Low: 3
# 
# ├── Critical Vulnerabilities:
# │   ├── SQL Injection
# │   │   ├── URL: /api/users/search?query=[PAYLOAD]
# │   │   ├── Method: GET
# │   │   ├── Parameter: query
# │   │   ├── Payload: ' UNION SELECT password FROM users--
# │   │   ├── Response: Database error revealed schema
# │   │   └── Impact: Data breach, authentication bypass
# │   └── Authentication Bypass
# │       ├── URL: /admin/dashboard
# │       ├── Method: POST
# │       ├── Vulnerability: JWT signature not verified
# │       ├── Exploit: Modified JWT payload accepted
# │       └── Impact: Unauthorized admin access
# 
# ├── High Vulnerabilities:
# │   ├── Cross-Site Scripting (Reflected): 2 instances
# │   ├── Cross-Site Request Forgery: 1 instance
# │   ├── Security Headers Missing: 1 instance
# │   └── Information Disclosure: 1 instance
# 
# └── Remediation Timeline:
#     ├── Critical vulnerabilities: Fix within 24 hours
#     ├── High vulnerabilities: Fix within 7 days
#     ├── Medium vulnerabilities: Fix within 30 days
#     └── Security assessment: Schedule follow-up scan

# API security testing with OpenAPI specification
sec-scan dast api --spec=openapi.yml --comprehensive
# Output:
# API Security Testing Results
# ├── API specification: OpenAPI 3.0.3
# ├── Endpoints tested: 45
# ├── Security schemes: JWT Bearer, API Key
# ├── Authentication tests: Passed
# ├── Authorization tests: 3 failures detected
# 
# ├── Security Issues:
# │   ├── Broken Object Level Authorization (BOLA)
# │   │   ├── Endpoint: GET /api/users/{id}
# │   │   ├── Issue: User can access other users' data
# │   │   ├── Test: Changed {id} parameter to other user ID
# │   │   ├── Response: 200 OK with other user's data
# │   │   └── Fix: Implement proper authorization checks
# │   ├── Excessive Data Exposure
# │   │   ├── Endpoint: GET /api/users/profile
# │   │   ├── Issue: Returns sensitive internal fields
# │   │   ├── Fields: internal_id, password_hash, access_logs
# │   │   └── Fix: Filter response data
# │   └── Mass Assignment
# │       ├── Endpoint: PUT /api/users/{id}
# │       ├── Issue: Can modify role and permissions
# │       ├── Test: Added "role": "admin" to request
# │       ├── Response: User role elevated to admin
# │       └── Fix: Whitelist allowed fields
# 
# ├── Rate Limiting Tests:
# │   ├── Authentication endpoints: Protected ✅
# │   ├── Data endpoints: Not protected ❌
# │   └── Recommendation: Implement rate limiting
# 
# └── OWASP API Top 10 Compliance:
#     ├── A1 - Broken Object Level Authorization: Failed
#     ├── A2 - Broken User Authentication: Passed
#     ├── A3 - Excessive Data Exposure: Failed
#     ├── A4 - Lack of Resources & Rate Limiting: Failed
#     └── Overall score: 7/10

# Network and infrastructure scanning
sec-scan network scan --target=app.company.com --comprehensive
# Network Security Assessment
# ├── Target: app.company.com (10.0.1.100)
# ├── Scan type: Comprehensive network assessment
# ├── Port scan: TCP 1-65535, UDP top 1000
# ├── Service enumeration: 15 services identified
# ├── Operating system: Linux 5.4.0 (Ubuntu 20.04)
# 
# ├── Open Ports and Services:
# │   ├── 22/tcp - SSH OpenSSH 8.2p1
# │   │   ├── Authentication: Key-based ✅
# │   │   ├── Weak ciphers: None detected ✅
# │   │   └── Recommendations: Update to OpenSSH 9.0+
# │   ├── 80/tcp - HTTP nginx 1.18.0
# │   │   ├── Redirects to HTTPS: Yes ✅
# │   │   ├── Security headers: Partial ⚠️
# │   │   └── Recommendations: Add missing security headers
# │   ├── 443/tcp - HTTPS nginx 1.18.0
# │   │   ├── TLS version: 1.3 ✅
# │   │   ├── Certificate: Valid, expires in 89 days ✅
# │   │   ├── Cipher suites: Strong ✅
# │   │   └── HSTS: Enabled ✅
# │   └── 5432/tcp - PostgreSQL 13.3
# │       ├── External access: Filtered ✅
# │       ├── Authentication: Required ✅
# │       └── Encryption: SSL/TLS enabled ✅
# 
# ├── Security Issues:
# │   ├── Medium: Missing security headers (HSTS, CSP)
# │   ├── Low: SSH version outdated
# │   └── Info: Database version disclosure
# 
# └── Compliance Status:
#     ├── PCI DSS: Compliant
#     ├── GDPR: Additional headers needed
#     └── SOC 2: Compliant
\`\`\`

### Dependency Vulnerability Management

\`\`\`bash
# NPM dependency security audit
sec-scan deps scan --package-manager=npm --detailed
# Output:
# Dependency Vulnerability Analysis
# ├── Package manager: npm
# ├── Packages scanned: 1,234 (direct: 67, transitive: 1,167)
# ├── Vulnerability databases: NVD, GitHub Advisory, Snyk, OSS Index
# ├── License compliance: 3 violations detected
# 
# ├── Critical Vulnerabilities: 2
# │   ├── lodash@4.17.15
# │   │   ├── CVE: CVE-2021-23337
# │   │   ├── Severity: Critical (CVSS 9.8)
# │   │   ├── Issue: Prototype pollution in zipObjectDeep
# │   │   ├── Affected versions: <4.17.21
# │   │   ├── Fixed version: 4.17.21
# │   │   ├── Exploitable: Yes (RCE possible)
# │   │   └── Remediation: npm update lodash
# │   └── express@4.16.0
# │       ├── CVE: CVE-2022-24999
# │       ├── Severity: Critical (CVSS 9.1)
# │       ├── Issue: Open redirect vulnerability
# │       ├── Affected versions: <4.18.2
# │       ├── Fixed version: 4.18.2
# │       └── Remediation: npm install express@latest
# 
# ├── High Vulnerabilities: 5
# │   ├── axios@0.21.0 (CVE-2021-3749) - SSRF vulnerability
# │   ├── jsonwebtoken@8.5.0 (CVE-2022-23529) - Algorithm confusion
# │   ├── moment@2.24.0 (CVE-2022-24785) - Path traversal
# │   ├── qs@6.5.2 (CVE-2022-24999) - Prototype pollution
# │   └── validator@10.11.0 (CVE-2021-3765) - ReDoS vulnerability
# 
# ├── License Violations: 3
# │   ├── copyleft-gpl@1.0.0 - GPL-3.0 (forbidden)
# │   ├── some-package@2.1.0 - AGPL-3.0 (forbidden)
# │   └── unknown-license@1.5.0 - Unknown license
# 
# ├── Outdated Packages: 23
# │   ├── Major updates available: 8
# │   ├── Minor updates available: 12
# │   └── Patch updates available: 3
# 
# └── Remediation Plan:
#     ├── Automatic fixes available: 15 vulnerabilities
#     ├── Manual intervention required: 7 vulnerabilities
#     ├── Breaking changes: 2 updates
#     └── Estimated time: 4-6 hours

# Container security scanning
sec-scan container scan --image=myapp:latest --comprehensive
# Container Security Analysis
# ├── Base image: node:16-alpine
# ├── Image size: 245 MB (8 layers)
# ├── Created: 2 days ago
# ├── Total vulnerabilities: 23
# 
# ├── Base Image Analysis:
# │   ├── OS: Alpine Linux 3.15
# │   ├── Vulnerabilities: 5 (all low severity)
# │   ├── Last updated: 15 days ago
# │   └── Recommendation: Update to node:18-alpine
# 
# ├── Application Layer Analysis:
# │   ├── Package manager: npm
# │   ├── Dependencies scanned: 456
# │   ├── Critical vulnerabilities: 2
# │   ├── High vulnerabilities: 6
# │   └── Medium vulnerabilities: 10
# 
# ├── Configuration Issues:
# │   ├── Running as root: Yes ❌
# │   ├── Sensitive files in image: 2 detected
# │   │   ├── .env file with secrets
# │   │   └── Private SSH key
# │   ├── Unnecessary packages: 15 detected
# │   ├── Missing health check: Yes ❌
# │   └── Image not signed: Yes ❌
# 
# ├── Security Best Practices:
# │   ├── Use non-root user: Failed
# │   ├── Minimal base image: Partial (Alpine used)
# │   ├── Multi-stage build: Not used
# │   ├── Scan for secrets: Failed (2 secrets found)
# │   └── Regular updates: Needs improvement
# 
# └── Remediation Dockerfile:
#     FROM node:18-alpine
#     RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
#     USER nodejs
#     COPY --chown=nodejs:nodejs . .
#     HEALTHCHECK --interval=30s CMD node healthcheck.js
\`\`\`

## Advanced Security Features

### Compliance and Governance

\`\`\`bash
# OWASP Top 10 compliance assessment
sec-scan compliance owasp-top-10 --target=app.company.com
# Output:
# OWASP Top 10 2021 Compliance Assessment
# ├── Target: app.company.com
# ├── Assessment date: 2024-02-01
# ├── Overall compliance: 70% (7/10 categories)
# 
# ├── A01 - Broken Access Control: ❌ FAILED
# │   ├── Issues found: 3
# │   ├── Critical: Horizontal privilege escalation
# │   ├── High: Missing function-level access control
# │   └── Remediation: Implement RBAC, audit all endpoints
# 
# ├── A02 - Cryptographic Failures: ✅ PASSED
# │   ├── TLS 1.3 enabled
# │   ├── Strong cipher suites
# │   ├── Proper certificate management
# │   └── No weak cryptographic algorithms detected
# 
# ├── A03 - Injection: ❌ FAILED
# │   ├── SQL injection vulnerabilities: 2
# │   ├── NoSQL injection vulnerabilities: 1
# │   ├── Command injection vulnerabilities: 1
# │   └── Remediation: Implement parameterized queries
# 
# ├── A04 - Insecure Design: ⚠️ PARTIAL
# │   ├── Security requirements: Documented
# │   ├── Threat modeling: Not conducted
# │   ├── Security architecture review: Pending
# │   └── Recommendation: Conduct threat modeling
# 
# ├── A05 - Security Misconfiguration: ⚠️ PARTIAL
# │   ├── Security headers: Partially implemented
# │   ├── Error handling: Needs improvement
# │   ├── Default credentials: None detected
# │   └── Unnecessary features: 2 detected
# 
# ├── Compliance Summary:
# │   ├── Passed: 4 categories
# │   ├── Failed: 3 categories
# │   ├── Partial: 3 categories
# │   └── Risk level: High
# 
# └── Action Items:
#     ├── Priority 1: Fix access control issues
#     ├── Priority 2: Resolve injection vulnerabilities  
#     ├── Priority 3: Complete security configuration
#     └── Timeline: 30 days for critical issues

# PCI DSS compliance check
sec-scan compliance pci-dss --environment=production
# PCI DSS Compliance Assessment
# ├── Scope: Production environment handling card data
# ├── Assessment level: Level 1 (full assessment)
# ├── Requirements tested: 12 primary, 78 sub-requirements
# 
# ├── Requirement Status:
# │   ├── 1. Firewall configuration: ✅ COMPLIANT
# │   ├── 2. Default passwords: ✅ COMPLIANT
# │   ├── 3. Cardholder data protection: ⚠️ GAPS IDENTIFIED
# │   │   ├── 3.1 Data retention policy: ✅ Compliant
# │   │   ├── 3.2 Sensitive data storage: ❌ Non-compliant
# │   │   ├── 3.3 Masking of PAN: ⚠️ Partial
# │   │   └── 3.4 Cryptographic keys: ✅ Compliant
# │   ├── 4. Encryption in transit: ✅ COMPLIANT
# │   ├── 5. Anti-virus software: ✅ COMPLIANT
# │   ├── 6. Secure development: ⚠️ GAPS IDENTIFIED
# │   └── [Additional requirements...]
# 
# ├── Critical Issues:
# │   ├── Unencrypted cardholder data in database
# │   ├── Insufficient access logging
# │   ├── Missing vulnerability management process
# │   └── Inadequate security testing
# 
# └── Compliance Timeline:
#     ├── Critical issues: 30 days
#     ├── Major gaps: 90 days
#     ├── Minor improvements: 180 days
#     └── Next assessment: 12 months

# GDPR privacy impact assessment
sec-scan compliance gdpr --data-flows=./data-flows.yml
# GDPR Compliance Assessment
# ├── Data processing activities: 15 identified
# ├── Personal data categories: 8 types
# ├── Legal basis mapping: 12/15 documented
# ├── Data subject rights: 6/8 implemented
# 
# ├── Privacy by Design Assessment:
# │   ├── Data minimization: ⚠️ Partial implementation
# │   ├── Purpose limitation: ✅ Implemented
# │   ├── Storage limitation: ❌ No retention policy
# │   ├── Accuracy: ✅ Data validation in place
# │   ├── Security: ⚠️ Encryption gaps identified
# │   └── Accountability: ⚠️ Documentation incomplete
# 
# ├── Technical Measures:
# │   ├── Encryption at rest: ⚠️ Partial (database only)
# │   ├── Encryption in transit: ✅ TLS 1.3
# │   ├── Access controls: ✅ RBAC implemented
# │   ├── Audit logging: ⚠️ Insufficient detail
# │   └── Data pseudonymization: ❌ Not implemented
# 
# └── Action Plan:
#     ├── Implement data retention policies
#     ├── Add application-level encryption
#     ├── Enhance audit logging
#     ├── Document processing activities
#     └── Train staff on GDPR requirements
\`\`\`

### Continuous Security Monitoring

\`\`\`bash
# Set up continuous security monitoring
sec-scan monitor setup --environment=production
# Continuous Security Monitoring Setup
# ├── Monitoring targets: 5 applications, 12 endpoints
# ├── Scan frequency: Every 4 hours
# ├── Alert thresholds configured
# ├── Integration with SIEM: Splunk
# ├── Vulnerability feed: Real-time updates
# 
# ├── Monitoring Components:
# │   ├── Web application scanning: Enabled
# │   ├── API security monitoring: Enabled
# │   ├── Infrastructure scanning: Enabled
# │   ├── Dependency monitoring: Enabled
# │   └── Configuration drift detection: Enabled
# 
# ├── Alerting Rules:
# │   ├── New critical vulnerability: Immediate alert
# │   ├── Authentication failures spike: 5 minutes
# │   ├── Unusual traffic patterns: 10 minutes
# │   ├── Configuration changes: Real-time
# │   └── Failed security scans: 30 minutes
# 
# └── Dashboard URL: https://security-dashboard.company.com

# Security metrics and KPIs
sec-scan metrics generate --period=30d
# Security Metrics Dashboard (Last 30 Days)
# ├── Vulnerability Metrics:
# │   ├── New vulnerabilities discovered: 45
# │   ├── Vulnerabilities remediated: 38
# │   ├── Mean time to detection: 2.3 hours
# │   ├── Mean time to remediation: 4.2 days
# │   └── Vulnerability backlog: 23 (trending down)
# 
# ├── Scan Coverage:
# │   ├── Applications scanned: 15/15 (100%)
# │   ├── Infrastructure scanned: 145/145 (100%)
# │   ├── Dependencies monitored: 2,456
# │   └── Scan success rate: 98.7%
# 
# ├── Compliance Status:
# │   ├── OWASP Top 10: 80% compliant
# │   ├── PCI DSS: 95% compliant
# │   ├── GDPR: 85% compliant
# │   └── SOC 2: 92% compliant
# 
# ├── Security Score Trend:
# │   ├── Current score: 8.2/10
# │   ├── Previous month: 7.8/10
# │   ├── Improvement: +5.1%
# │   └── Target score: 9.0/10
# 
# └── Key Performance Indicators:
#     ├── Security incidents: 2 (down from 5)
#     ├── False positive rate: 8% (target: <5%)
#     ├── Scanner uptime: 99.8%
#     └── Team response time: 1.2 hours (target: <2 hours)

# Security incident analysis
sec-scan incident analyze --id=INC-2024-001
# Security Incident Analysis: INC-2024-001
# ├── Incident type: Data exposure
# ├── Severity: High
# ├── Discovery date: 2024-01-15 09:30 UTC
# ├── Resolution date: 2024-01-15 14:45 UTC
# ├── Duration: 5h 15m
# 
# ├── Root Cause Analysis:
# │   ├── Primary cause: SQL injection vulnerability
# │   ├── Contributing factors:
# │   │   ├── Insufficient input validation
# │   │   ├── Missing parameterized queries
# │   │   ├── Inadequate security testing
# │   │   └── Delayed vulnerability patching
# │   └── Attack vector: /api/users/search endpoint
# 
# ├── Impact Assessment:
# │   ├── Data accessed: 1,234 user records
# │   ├── Data types: Email addresses, hashed passwords
# │   ├── Business impact: Medium
# │   ├── Regulatory implications: GDPR notification required
# │   └── Estimated cost: $15,000
# 
# ├── Response Timeline:
# │   ├── 09:30 - Vulnerability exploited
# │   ├── 09:45 - Anomaly detected by monitoring
# │   ├── 10:00 - Security team notified
# │   ├── 10:30 - Incident confirmed and contained
# │   ├── 12:00 - Patch developed and tested
# │   ├── 14:00 - Patch deployed to production
# │   └── 14:45 - Vulnerability verified as fixed
# 
# └── Preventive Measures:
#     ├── Implement automated SAST in CI/CD
#     ├── Enhance input validation framework
#     ├── Increase security testing frequency
#     ├── Implement WAF rules for SQL injection
#     └── Conduct security training for developers
\`\`\`

## Integration and Automation

### CI/CD Security Integration

\`\`\`yaml
# .github/workflows/security-scanning.yml
name: Security Scanning Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  sast_scan:
    name: Static Code Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Full git history for accurate analysis
      
      - name: Setup Security Scanner
        run: |
          npm install -g @enterprise/security-scanner
          sec-scan config load --file=.sec-scan/ci-config.yml
      
      - name: SAST Scanning
        run: |
          sec-scan sast analyze --path=./src --format=sarif --output=sast-results.sarif
          sec-scan sast analyze --path=./src --format=json --output=sast-results.json
      
      - name: Upload SARIF to GitHub
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: sast-results.sarif
      
      - name: Check Security Quality Gate
        run: |
          sec-scan quality-gate check --file=sast-results.json --fail-on=critical

  dependency_scan:
    name: Dependency Vulnerability Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Dependency Security Scan
        run: |
          sec-scan deps scan --package-manager=npm --format=json --output=deps-results.json
          sec-scan deps license-check --format=json --output=license-results.json
      
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: security-reports
          path: |
            deps-results.json
            license-results.json

  container_scan:
    name: Container Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker Image
        run: |
          docker build -t myapp:${{ github.sha }} .
      
      - name: Container Security Scan
        run: |
          sec-scan container scan --image=myapp:${{ github.sha }} --format=json --output=container-results.json
      
      - name: Check Container Security
        run: |
          sec-scan quality-gate check --file=container-results.json --type=container

  dast_scan:
    name: Dynamic Application Security Testing
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule' || github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Start Application
        run: |
          docker-compose up -d
          sleep 60  # Wait for app to be ready
      
      - name: DAST Scanning
        run: |
          sec-scan dast scan --url=http://localhost:3000 --format=json --output=dast-results.json
      
      - name: Stop Application
        run: docker-compose down
      
      - name: Upload DAST Results
        uses: actions/upload-artifact@v3
        with:
          name: dast-results
          path: dast-results.json

  security_report:
    name: Generate Security Report
    runs-on: ubuntu-latest
    needs: [sast_scan, dependency_scan, container_scan]
    if: always()
    steps:
      - name: Download Artifacts
        uses: actions/download-artifact@v3
      
      - name: Generate Combined Report
        run: |
          sec-scan report combine \
            --sast=security-reports/sast-results.json \
            --deps=security-reports/deps-results.json \
            --container=security-reports/container-results.json \
            --format=html \
            --output=security-report.html
      
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: security-report.html
      
      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('security-reports/sast-results.json', 'utf8'));
            const summary = \`## Security Scan Results
            
            - Critical vulnerabilities: \${report.critical || 0}
            - High vulnerabilities: \${report.high || 0}
            - Medium vulnerabilities: \${report.medium || 0}
            - Low vulnerabilities: \${report.low || 0}
            
            [View detailed report](https://github.com/\${context.repo.owner}/\${context.repo.repo}/actions/runs/\${context.runId})\`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: summary
            });
\`\`\`

## Usage Examples

### Development Security Workflow

\`\`\`bash
# Pre-commit security checks
sec-scan dev pre-commit                 # Quick security check
sec-scan sast analyze --incremental     # Scan only changed files
sec-scan deps check --fix-available     # Check for dependency updates

# During development
sec-scan dev watch                      # Watch for security issues
sec-scan rules validate --custom        # Validate custom security rules
sec-scan test security                  # Run security unit tests

# Before deployment
sec-scan full-scan --environment=staging
sec-scan compliance check --frameworks=owasp,pci
sec-scan report generate --executive-summary
\`\`\`

### Production Security Operations

\`\`\`bash
# Regular security operations
sec-scan monitor status                 # Check monitoring status
sec-scan incident list --open          # View open security incidents
sec-scan metrics dashboard              # View security dashboard

# Incident response
sec-scan incident create --severity=high
sec-scan forensics collect --incident=INC-001
sec-scan response execute --playbook=data-breach

# Compliance and reporting
sec-scan audit generate --framework=sox
sec-scan compliance report --quarterly
sec-scan risk assessment --comprehensive
\`\`\`

};