export default {
  id: 'database-evolution',
  title: 'Database Evolution',
  slug: 'database-evolution',
  tagline: 'Zero-downtime database migrations with intelligent rollback and multi-environment sync',
  description: 'Advanced database schema migration and evolution management with zero-downtime deployments, rollback capabilities, and multi-environment synchronization.',
  category: 'Tools & CLI',
  type: 'CLI',
  url: 'https://github.com/enterprise/database-evolution',
  tags: ['database', 'migration', 'schema', 'evolution', 'zero-downtime', 'rollback', 'multi-environment'],
  author: {
    name: 'Claude Code Directory',
    url: 'https://claudecode.directory'
  },
  stats: {
    votes: 0,
    copies: 0
  },
  difficulty: 'ADVANCED',
  lastUpdated: '2024-01-31' Database Evolution

Advanced database schema migration and evolution management system for production environments with zero-downtime deployments, intelligent rollbacks, and comprehensive validation.

## Installation and Setup

\`\`\`bash
# Install Database Evolution CLI
npm install -g @enterprise/db-evolution
# or
curl -fsSL https://releases.db-evolution.io/install.sh | bash

# Initialize in project
db-evo init

# Configure environments
db-evo config setup
\`\`\`

## Core Commands

### Migration Management

\`\`\`bash
# Create new migration
db-evo create migration "add_user_preferences_table"
db-evo create migration "add_index_on_user_email" --type=index
db-evo create migration "update_user_schema" --type=schema-change

# Migration execution
db-evo migrate up                    # Apply pending migrations
db-evo migrate down 3               # Rollback 3 migrations
db-evo migrate to 20240201_120000    # Migrate to specific version
db-evo migrate redo                  # Rollback and reapply last migration

# Environment management
db-evo env sync staging production   # Sync staging to production state
db-evo env diff staging production   # Show differences between environments
db-evo env deploy staging           # Deploy pending changes to staging
db-evo env validate production      # Validate production state
\`\`\`

### Advanced Operations

\`\`\`bash
# Zero-downtime migrations
db-evo migrate online --strategy=blue-green
db-evo migrate online --strategy=shadow-table
db-evo migrate online --strategy=dual-write

# Data transformations
db-evo transform plan --migration=20240201_120000
db-evo transform execute --dry-run  # Preview data transformation
db-evo transform execute --parallel # Execute with parallel processing

# Schema analysis
db-evo analyze schema               # Analyze current schema
db-evo analyze performance          # Identify performance issues
db-evo analyze dependencies         # Show table dependencies
db-evo analyze unused               # Find unused indexes/columns
\`\`\`

## Configuration System

### Global Configuration

\`\`\`yaml
# ~/.db-evo/config.yml
default_database: postgresql
migration_path: ./migrations
backup_path: ./backups
log_level: info

environments:
  development:
    host: localhost
    port: 5432
    database: myapp_dev
    username: postgres
    password: ${DB_PASSWORD_DEV}
    ssl: false
    
  staging:
    host: staging-db.company.com
    port: 5432
    database: myapp_staging
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD_STAGING}
    ssl: true
    connection_pool: 10
    
  production:
    host: prod-db.company.com
    port: 5432
    database: myapp_prod
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD_PROD}
    ssl: true
    connection_pool: 20
    read_replicas:
      - host: prod-db-read1.company.com
      - host: prod-db-read2.company.com

migration_settings:
  auto_backup: true
  backup_retention: 30  # days
  transaction_per_migration: true
  parallel_execution: false
  validation_enabled: true
  rollback_enabled: true
  
safety_checks:
  require_approval: true
  max_execution_time: 3600  # seconds
  max_affected_rows: 1000000
  require_backup: true
  validate_before_apply: true

notifications:
  slack:
    webhook: ${SLACK_WEBHOOK}
    channel: "#database-ops"
  email:
    enabled: true
    recipients:
      - dba@company.com
      - devops@company.com

monitoring:
  performance_threshold: 5000  # ms
  lock_timeout: 30  # seconds
  deadlock_detection: true
  slow_query_log: true
\`\`\`

### Migration Configuration

\`\`\`yaml
# migrations/config.yml
migration_strategies:
  default: transactional
  large_tables: online
  indexes: concurrent
  data_migration: batch

table_settings:
  users:
    strategy: online
    batch_size: 1000
    max_lock_time: 10  # seconds
    
  orders:
    strategy: blue_green
    validation_queries:
      - "SELECT COUNT(*) FROM orders WHERE status IS NULL"
      - "SELECT COUNT(*) FROM orders WHERE created_at > NOW() - INTERVAL '1 day'"
    
  audit_logs:
    strategy: append_only
    partition_strategy: monthly
    retention_policy: 7  # years

validation_rules:
  - type: foreign_key_constraints
    enabled: true
  - type: data_integrity
    enabled: true
  - type: performance_impact
    enabled: true
    threshold: 20  # % performance degradation
  - type: storage_impact
    enabled: true
    max_size_increase: 50  # GB

rollback_strategies:
  schema_changes: automatic
  data_migrations: manual_approval
  index_operations: automatic
  constraint_additions: automatic
\`\`\`

## Migration Types and Patterns

### Schema Evolution Migrations

\`\`\`sql
-- migrations/20240201_120000_add_user_preferences.sql
-- Migration: Add user preferences table
-- Strategy: transactional
-- Estimated time: 5 seconds
-- Risk level: low

-- === UP Migration ===
BEGIN;

-- Create new table
CREATE TABLE user_preferences (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    preference_key VARCHAR(100) NOT NULL,
    preference_value JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT fk_user_preferences_user_id 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_preferences_user_key 
        UNIQUE (user_id, preference_key)
);

-- Create indexes
CREATE INDEX CONCURRENTLY idx_user_preferences_user_id 
    ON user_preferences(user_id);
CREATE INDEX CONCURRENTLY idx_user_preferences_key 
    ON user_preferences(preference_key);
CREATE INDEX CONCURRENTLY idx_user_preferences_created_at 
    ON user_preferences(created_at);

-- Add comments
COMMENT ON TABLE user_preferences IS 'Stores user-specific preferences and settings';
COMMENT ON COLUMN user_preferences.preference_value IS 'JSON blob containing preference data';

-- Update schema version
INSERT INTO schema_migrations (version, description, applied_at) 
VALUES ('20240201_120000', 'Add user preferences table', NOW());

COMMIT;

-- === DOWN Migration ===
BEGIN;

-- Remove from schema migrations
DELETE FROM schema_migrations WHERE version = '20240201_120000';

-- Drop indexes (CASCADE will handle dependencies)
DROP INDEX IF EXISTS idx_user_preferences_created_at;
DROP INDEX IF EXISTS idx_user_preferences_key;
DROP INDEX IF EXISTS idx_user_preferences_user_id;

-- Drop table
DROP TABLE IF EXISTS user_preferences CASCADE;

COMMIT;

-- === Validation Queries ===
-- POST_UP_VALIDATION:
-- SELECT COUNT(*) FROM user_preferences; -- Should be 0
-- SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'user_preferences'; -- Should be 1

-- POST_DOWN_VALIDATION:
-- SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'user_preferences'; -- Should be 0
\`\`\`

### Zero-Downtime Column Addition

\`\`\`sql
-- migrations/20240201_130000_add_user_avatar_column.sql
-- Migration: Add avatar column to users table
-- Strategy: online
-- Estimated time: 2 minutes
-- Risk level: medium (large table)

-- === Phase 1: Add column with default ===
BEGIN;

-- Add column with default value (non-blocking in PostgreSQL 11+)
ALTER TABLE users 
ADD COLUMN avatar_url VARCHAR(500) DEFAULT '';

-- Update schema version
INSERT INTO schema_migrations (version, description, applied_at, phase) 
VALUES ('20240201_130000', 'Add user avatar column - Phase 1', NOW(), 1);

COMMIT;

-- === Phase 2: Backfill data (if needed) ===
-- This runs as a separate transaction to avoid long locks
DO $$
DECLARE
    batch_size INTEGER := 1000;
    last_id BIGINT := 0;
    max_id BIGINT;
    affected_rows INTEGER;
BEGIN
    -- Get maximum ID for batching
    SELECT MAX(id) INTO max_id FROM users;
    
    WHILE last_id < max_id LOOP
        -- Process batch
        UPDATE users 
        SET avatar_url = 'https://avatars.company.com/default.png'
        WHERE id > last_id 
          AND id <= last_id + batch_size
          AND avatar_url = '';
        
        GET DIAGNOSTICS affected_rows = ROW_COUNT;
        
        -- Log progress
        INSERT INTO migration_progress (version, phase, last_processed_id, affected_rows)
        VALUES ('20240201_130000', 2, last_id + batch_size, affected_rows);
        
        last_id := last_id + batch_size;
        
        -- Small delay to reduce load
        PERFORM pg_sleep(0.1);
    END LOOP;
END $$;

-- Update schema version
INSERT INTO schema_migrations (version, description, applied_at, phase) 
VALUES ('20240201_130000', 'Add user avatar column - Phase 2', NOW(), 2);

-- === Phase 3: Add constraints/indexes ===
BEGIN;

-- Add index concurrently (non-blocking)
CREATE INDEX CONCURRENTLY idx_users_avatar_url ON users(avatar_url) 
WHERE avatar_url IS NOT NULL AND avatar_url != '';

-- Add check constraint (can be added without lock in PostgreSQL)
ALTER TABLE users 
ADD CONSTRAINT chk_users_avatar_url_format 
CHECK (avatar_url = '' OR avatar_url ~ '^https?://');

-- Final schema version
UPDATE schema_migrations 
SET phase = 3, description = 'Add user avatar column - Complete'
WHERE version = '20240201_130000';

COMMIT;

-- === Rollback Strategy ===
-- Phase 3 rollback
BEGIN;
ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_users_avatar_url_format;
DROP INDEX CONCURRENTLY IF EXISTS idx_users_avatar_url;
DELETE FROM schema_migrations WHERE version = '20240201_130000' AND phase = 3;
COMMIT;

-- Phase 2 rollback (reset data)
UPDATE users SET avatar_url = '' WHERE avatar_url = 'https://avatars.company.com/default.png';
DELETE FROM schema_migrations WHERE version = '20240201_130000' AND phase = 2;

-- Phase 1 rollback
BEGIN;
ALTER TABLE users DROP COLUMN IF EXISTS avatar_url;
DELETE FROM schema_migrations WHERE version = '20240201_130000';
COMMIT;
\`\`\`

### Data Migration with Transformation

\`\`\`sql
-- migrations/20240201_140000_normalize_user_addresses.sql
-- Migration: Normalize user addresses into separate table
-- Strategy: dual_write
-- Estimated time: 15 minutes
-- Risk level: high (data transformation)

-- === Phase 1: Create new normalized structure ===
BEGIN;

CREATE TABLE user_addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_type VARCHAR(20) NOT NULL DEFAULT 'primary',
    street_address VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(2) DEFAULT 'US',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT fk_user_addresses_user_id 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_addresses_user_type 
        UNIQUE (user_id, address_type)
);

CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_type ON user_addresses(address_type);

-- Create audit table for tracking changes
CREATE TABLE user_address_audit (
    id BIGSERIAL PRIMARY KEY,
    user_address_id BIGINT,
    action VARCHAR(10),
    old_data JSONB,
    new_data JSONB,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    changed_by VARCHAR(100)
);

COMMIT;

-- === Phase 2: Data migration with validation ===
DO $$
DECLARE
    migration_batch_size INTEGER := 500;
    user_record RECORD;
    address_parts TEXT[];
    total_users INTEGER;
    processed_users INTEGER := 0;
    failed_migrations INTEGER := 0;
BEGIN
    -- Get total count for progress tracking
    SELECT COUNT(*) INTO total_users FROM users WHERE address IS NOT NULL;
    
    -- Process users in batches
    FOR user_record IN 
        SELECT id, address, city, state, zip_code 
        FROM users 
        WHERE address IS NOT NULL 
        ORDER BY id
    LOOP
        BEGIN
            -- Parse address field (assuming comma-separated)
            address_parts := string_to_array(user_record.address, ',');
            
            -- Insert normalized address
            INSERT INTO user_addresses (
                user_id, 
                address_type,
                street_address,
                city,
                state,
                postal_code,
                country
            ) VALUES (
                user_record.id,
                'primary',
                TRIM(address_parts[1]),
                COALESCE(TRIM(address_parts[2]), user_record.city),
                COALESCE(TRIM(address_parts[3]), user_record.state),
                user_record.zip_code,
                'US'
            );
            
            processed_users := processed_users + 1;
            
            -- Log progress every 100 records
            IF processed_users % 100 = 0 THEN
                INSERT INTO migration_progress (
                    version, 
                    phase, 
                    total_records, 
                    processed_records,
                    failed_records,
                    progress_percentage
                ) VALUES (
                    '20240201_140000',
                    2,
                    total_users,
                    processed_users,
                    failed_migrations,
                    (processed_users::FLOAT / total_users * 100)
                );
            END IF;
            
        EXCEPTION 
            WHEN OTHERS THEN
                -- Log failed migration
                INSERT INTO migration_errors (
                    version,
                    record_id,
                    error_message,
                    record_data,
                    occurred_at
                ) VALUES (
                    '20240201_140000',
                    user_record.id,
                    SQLERRM,
                    row_to_json(user_record),
                    NOW()
                );
                
                failed_migrations := failed_migrations + 1;
        END;
    END LOOP;
    
    -- Final progress log
    INSERT INTO migration_progress (
        version, 
        phase,
        total_records,
        processed_records,
        failed_records,
        progress_percentage,
        completed_at
    ) VALUES (
        '20240201_140000',
        2,
        total_users,
        processed_users,
        failed_migrations,
        100,
        NOW()
    );
    
    -- Validation check
    IF failed_migrations > (total_users * 0.01) THEN -- More than 1% failure rate
        RAISE EXCEPTION 'Migration failed: % of % records failed migration', 
            failed_migrations, total_users;
    END IF;
    
END $$;

-- === Phase 3: Validation and cleanup ===
BEGIN;

-- Validate data integrity
DO $$
DECLARE
    user_count INTEGER;
    address_count INTEGER;
    mismatch_count INTEGER;
BEGIN
    -- Check that all users with addresses have corresponding records
    SELECT COUNT(*) INTO user_count 
    FROM users 
    WHERE address IS NOT NULL;
    
    SELECT COUNT(DISTINCT user_id) INTO address_count 
    FROM user_addresses;
    
    mismatch_count := ABS(user_count - address_count);
    
    IF mismatch_count > 0 THEN
        RAISE EXCEPTION 'Data validation failed: % users missing address records', 
            mismatch_count;
    END IF;
    
    -- Log validation success
    INSERT INTO migration_validations (
        version,
        validation_type,
        expected_count,
        actual_count,
        status,
        validated_at
    ) VALUES (
        '20240201_140000',
        'user_address_mapping',
        user_count,
        address_count,
        'PASSED',
        NOW()
    );
END $$;

-- Add application-level triggers for dual-write period
CREATE OR REPLACE FUNCTION sync_user_address_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        -- Update corresponding user_addresses record
        UPDATE user_addresses 
        SET 
            street_address = NEW.address,
            city = NEW.city,
            state = NEW.state,
            postal_code = NEW.zip_code,
            updated_at = NOW()
        WHERE user_id = NEW.id AND address_type = 'primary';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_address_sync_trigger
    AFTER UPDATE OF address, city, state, zip_code ON users
    FOR EACH ROW EXECUTE FUNCTION sync_user_address_changes();

COMMIT;

-- Mark migration as complete
INSERT INTO schema_migrations (version, description, applied_at) 
VALUES ('20240201_140000', 'Normalize user addresses', NOW());
\`\`\`

## Advanced Features

### Intelligent Migration Planning

\`\`\`bash
# Analyze migration impact
db-evo plan analyze --migration=20240201_140000
# Output:
# Migration Impact Analysis: 20240201_140000
# ├── Estimated execution time: 15-20 minutes
# ├── Affected tables: users (2.5M rows), user_addresses (new)
# ├── Lock requirements: 
# │   ├── users: ACCESS EXCLUSIVE (5 seconds)
# │   └── user_addresses: none
# ├── Storage impact: +850 MB
# ├── Performance impact: Medium (during migration)
# ├── Rollback complexity: High (data transformation)
# ├── Risk assessment: Medium-High
# └── Recommended time: Off-peak hours

# Generate execution plan
db-evo plan generate --migration=20240201_140000 --strategy=online
# Creates optimized execution plan with:
# - Batch processing strategy
# - Progress monitoring
# - Error handling
# - Rollback procedures
# - Validation checkpoints

# Simulate migration
db-evo simulate --migration=20240201_140000 --sample-size=1000
# Output:
# Migration Simulation Results
# ├── Sample data processed: 1,000 records
# ├── Average processing time: 0.5ms per record
# ├── Projected total time: 20.8 minutes
# ├── Memory usage: 45 MB peak
# ├── Errors encountered: 0
# ├── Data validation: PASSED
# └── Confidence level: 95%
\`\`\`

### Automated Rollback System

\`\`\`bash
# Create rollback plan
db-evo rollback plan --migration=20240201_140000
# Generates:
# - Reverse migration steps
# - Data backup locations
# - Dependency checks
# - Validation procedures
# - Time estimates

# Execute rollback with validation
db-evo rollback execute --migration=20240201_140000 --validate
# Steps:
# 1. Create pre-rollback backup
# 2. Validate rollback safety
# 3. Execute reverse operations
# 4. Validate data integrity
# 5. Update migration state

# Rollback simulation
db-evo rollback simulate --migration=20240201_140000
# Tests rollback without actual execution

# Emergency rollback
db-evo rollback emergency --to-version=20240201_110000
# Immediate rollback to last known good state
\`\`\`

### Performance Monitoring

\`\`\`bash
# Monitor migration progress
db-evo monitor migration --migration=20240201_140000
# Real-time output:
# Migration Progress: 20240201_140000
# ├── Status: Running (Phase 2/3)
# ├── Progress: 45% (1,125,000/2,500,000 records)
# ├── Elapsed time: 8m 23s
# ├── Estimated remaining: 10m 15s
# ├── Current rate: 2,250 records/second
# ├── Errors: 3 (0.0001%)
# ├── Database load: 75% CPU, 60% Memory
# └── Locks: 2 active, 0 blocking

# Performance impact analysis
db-evo analyze performance --during-migration
# Output:
# Performance Impact During Migration
# ├── Query response time: +15% average
# ├── Connection pool usage: 85% peak
# ├── Disk I/O: +40% read, +60% write
# ├── CPU usage: 75% average, 90% peak
# ├── Memory usage: 8.2 GB peak
# ├── Slow queries: 12 identified
# └── Recommendations:
#     ├── Reduce batch size to 750 records
#     ├── Increase migration interval to 0.2s
#     └── Consider maintenance window

# Health checks
db-evo health check --comprehensive
# Monitors:
# - Database connectivity
# - Replication lag
# - Lock contention
# - Resource utilization
# - Migration state consistency
\`\`\`

## Integration and Automation

### CI/CD Integration

\`\`\`yaml
# .github/workflows/database-migration.yml
name: Database Migration Pipeline

on:
  push:
    paths: ['migrations/**']
    branches: [main, develop]
  pull_request:
    paths: ['migrations/**']

jobs:
  validate_migrations:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Database Evolution
        run: |
          npm install -g @enterprise/db-evolution
          db-evo config set-env test postgresql://postgres:postgres@localhost:5432/test
      
      - name: Validate Migration Syntax
        run: db-evo validate syntax --all
      
      - name: Check Migration Dependencies
        run: db-evo validate dependencies --all
      
      - name: Simulate Migrations
        run: |
          db-evo simulate --all --sample-size=100
          db-evo analyze impact --all
      
      - name: Test Rollback Procedures
        run: |
          db-evo migrate up --env=test
          db-evo rollback simulate --all
          db-evo rollback execute --last-migration --env=test

  deploy_staging:
    needs: validate_migrations
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Staging
        run: |
          db-evo env deploy staging --auto-approve=false
          db-evo monitor deployment --timeout=1800
      
      - name: Validate Deployment
        run: |
          db-evo validate schema --env=staging
          db-evo health check --env=staging

  deploy_production:
    needs: deploy_staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - name: Production Deployment
        run: |
          db-evo backup create --env=production --retention=90d
          db-evo env deploy production --strategy=blue-green
          db-evo monitor deployment --timeout=3600
          db-evo validate deployment --env=production
\`\`\`

### Monitoring Integration

\`\`\`yaml
# monitoring/database-evolution.yml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: database-evolution
spec:
  selector:
    matchLabels:
      app: db-evolution
  endpoints:
  - port: metrics
    path: /metrics
    interval: 30s

---
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: database-evolution-alerts
spec:
  groups:
  - name: database-evolution
    rules:
    - alert: MigrationRunningTooLong
      expr: db_evolution_migration_duration_seconds > 3600
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "Database migration running for over 1 hour"
        description: "Migration {{ $labels.migration }} has been running for {{ $value }} seconds"

    - alert: MigrationFailed
      expr: db_evolution_migration_status{status="failed"} > 0
      for: 0m
      labels:
        severity: critical
      annotations:
        summary: "Database migration failed"
        description: "Migration {{ $labels.migration }} failed in environment {{ $labels.environment }}"

    - alert: HighMigrationErrorRate
      expr: rate(db_evolution_migration_errors_total[5m]) > 0.01
      for: 2m
      labels:
        severity: warning
      annotations:
        summary: "High migration error rate detected"
        description: "Migration error rate is {{ $value }} errors per second"
\`\`\`

## Usage Examples

### Development Workflow

\`\`\`bash
# Daily development
db-evo status                       # Check current state
db-evo create migration "add_feature_flags"
# Edit migration file
db-evo validate --migration=latest
db-evo migrate up --env=development

# Before PR
db-evo validate --all              # Validate all migrations
db-evo test rollback --last        # Test rollback capability
db-evo generate docs --migration=latest

# Review process
db-evo review generate --migration=latest
# Generates review checklist and impact analysis
\`\`\`

### Production Deployment

\`\`\`bash
# Pre-deployment
db-evo backup create --env=production
db-evo plan deployment --env=production
db-evo simulate --env=production --dry-run

# Deployment
db-evo deploy start --env=production --strategy=blue-green
db-evo monitor progress --follow
db-evo validate deployment

# Post-deployment
db-evo health check --comprehensive
db-evo cleanup old-backups --keep=30
db-evo report generate --deployment=latest
\`\`\`

};