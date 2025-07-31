import { ClaudeMdConfig } from '../types';

export const devContainersAdvancedConfigs: ClaudeMdConfig[] = [
  {
    id: 'devcontainers-advanced',
    title: 'DevContainers Advanced + Multi-Service',
    slug: 'devcontainers-advanced-multi-service-development',
    description: 'Advanced DevContainers setup with multi-service development environments, Docker Compose integration, and sophisticated development tooling for complex applications.',
    category: 'Claude.md Configurations',
    tags: ['devcontainers', 'docker', 'multi-service', 'development-environment', 'vscode'],
    difficulty: 'ADVANCED',
    language: 'Multiple',
    framework: 'Docker + DevContainers',
    content: `# Claude.md - DevContainers Advanced + Multi-Service

## Project Overview

This is an advanced DevContainers setup for complex, multi-service development environments. It provides consistent, portable development environments with full-stack applications, databases, message queues, and all necessary development tools pre-configured.

## Development Philosophy

### DevContainers Benefits
1. **Consistency**: Identical development environment across all team members
2. **Isolation**: Complete isolation from host system dependencies
3. **Portability**: Works on any machine with Docker and VS Code
4. **Reproducibility**: Version-controlled development environment
5. **Onboarding**: New developers can start coding immediately

### Advanced Features
- Multi-container development with Docker Compose
- Service-to-service communication setup
- Integrated databases and external services
- Pre-configured development tools and extensions
- Automated setup scripts and initialization
- Volume mounting strategies for performance
- Port forwarding and networking configuration

## Technology Stack

- **Container Runtime**: Docker Desktop
- **Orchestration**: Docker Compose
- **IDE Integration**: VS Code DevContainers extension
- **Services**: Application services, databases, caches, message queues
- **Networking**: Custom Docker networks for service communication
- **Volumes**: Named volumes and bind mounts for data persistence

## Project Structure

\`\`\`
advanced-devcontainer-setup/
├── .devcontainer/
│   ├── devcontainer.json       # Main DevContainer configuration
│   ├── docker-compose.yml      # Multi-service orchestration
│   ├── Dockerfile.dev          # Custom development image
│   ├── scripts/                # Setup and initialization scripts
│   │   ├── postCreateCommand.sh
│   │   ├── postStartCommand.sh
│   │   └── setup-services.sh
│   └── config/                 # Service configurations
│       ├── nginx/
│       ├── postgres/
│       └── redis/
├── services/
│   ├── frontend/               # Frontend service
│   ├── backend/                # Backend API service
│   ├── worker/                 # Background worker service
│   └── shared/                 # Shared libraries
├── infrastructure/
│   ├── database/              # Database schemas and migrations
│   ├── monitoring/            # Monitoring and logging setup
│   └── proxy/                 # Reverse proxy configuration
└── docs/
    ├── development-guide.md   # Development workflow documentation
    └── troubleshooting.md     # Common issues and solutions
\`\`\`

## DevContainer Configuration

### Main DevContainer Configuration
\`\`\`json
{
  "name": "Advanced Multi-Service Development",
  "dockerComposeFile": "./docker-compose.yml",
  "service": "devcontainer",
  "workspaceFolder": "/workspace",
  
  "features": {
    "ghcr.io/devcontainers/features/git:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {},
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},
    "ghcr.io/devcontainers/features/kubectl-helm-minikube:1": {},
    "ghcr.io/devcontainers/features/terraform:1": {}
  },

  "customizations": {
    "vscode": {
      "extensions": [
        "ms-vscode.vscode-typescript-next",
        "bradlc.vscode-tailwindcss",
        "ms-python.python",
        "ms-python.pylint",
        "ms-python.black-formatter",
        "golang.go",
        "rust-lang.rust-analyzer",
        "ms-vscode.vscode-json",
        "redhat.vscode-yaml",
        "ms-kubernetes-tools.vscode-kubernetes-tools",
        "ms-azuretools.vscode-docker",
        "hashicorp.terraform",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-eslint",
        "GitLab.gitlab-workflow",
        "github.copilot",
        "ms-vscode.remote-containers",
        "ms-vscode-remote.remote-ssh",
        "ms-vscode.live-server",
        "ritwickdey.liveserver",
        "ms-python.debugpy",
        "ms-vscode.cmake-tools",
        "twxs.cmake",
        "ms-vscode.cpptools-extension-pack"
      ],
      
      "settings": {
        "terminal.integrated.defaultProfile.linux": "zsh",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true,
          "source.organizeImports": true
        },
        "python.defaultInterpreterPath": "/usr/local/bin/python",
        "python.linting.enabled": true,
        "python.linting.pylintEnabled": true,
        "python.formatting.provider": "black",
        "go.toolsManagement.checkForUpdates": "local",
        "typescript.preferences.importModuleSpecifier": "relative",
        "editor.rulers": [80, 120],
        "files.exclude": {
          "**/node_modules": true,
          "**/.git": true,
          "**/.DS_Store": true,
          "**/dist": true,
          "**/build": true
        }
      }
    }
  },

  "forwardPorts": [
    3000,  // Frontend
    8000,  // Backend API
    5432,  // PostgreSQL
    6379,  // Redis
    8080,  // Nginx
    9090,  // Prometheus
    3001,  // Grafana
    5672,  // RabbitMQ
    15672  // RabbitMQ Management
  ],

  "portsAttributes": {
    "3000": {
      "label": "Frontend",
      "protocol": "http"
    },
    "8000": {
      "label": "Backend API",
      "protocol": "http"
    },
    "5432": {
      "label": "PostgreSQL",
      "protocol": "tcp"
    },
    "6379": {
      "label": "Redis",
      "protocol": "tcp"
    },
    "8080": {
      "label": "Nginx Proxy",
      "protocol": "http"
    }
  },

  "postCreateCommand": "bash .devcontainer/scripts/postCreateCommand.sh",
  "postStartCommand": "bash .devcontainer/scripts/postStartCommand.sh",

  "remoteUser": "developer",
  "containerUser": "developer",

  "mounts": [
    "source=/var/run/docker.sock,target=/var/run/docker.sock,type=bind",
    "source=\${localWorkspaceFolder}/.devcontainer/config,target=/workspace/.devcontainer/config,type=bind"
  ],

  "initializeCommand": "echo 'Initializing development environment...'",
  "onCreateCommand": "echo 'DevContainer created successfully'",

  "shutdownAction": "stopCompose"
}
\`\`\`

### Docker Compose Configuration
\`\`\`yaml
# .devcontainer/docker-compose.yml
version: '3.8'

services:
  # Main development container
  devcontainer:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - ../..:/workspace:cached
      - devcontainer-node-modules:/workspace/node_modules
      - devcontainer-python-packages:/usr/local/lib/python3.11/site-packages
    networks:
      - dev-network
    environment:
      - NODE_ENV=development
      - PYTHON_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/devdb
      - REDIS_URL=redis://redis:6379
      - RABBITMQ_URL=amqp://admin:password@rabbitmq:5672
    depends_on:
      - postgres
      - redis
      - rabbitmq
    stdin_open: true
    tty: true
    command: sleep infinity

  # Frontend service
  frontend:
    build:
      context: ../../services/frontend
      dockerfile: Dockerfile.dev
    volumes:
      - ../../services/frontend:/app:cached
      - frontend-node-modules:/app/node_modules
    ports:
      - "3000:3000"
    networks:
      - dev-network
    environment:
      - VITE_API_URL=http://backend:8000
      - VITE_WS_URL=ws://backend:8000
    depends_on:
      - backend
    command: npm run dev

  # Backend API service
  backend:
    build:
      context: ../../services/backend
      dockerfile: Dockerfile.dev
    volumes:
      - ../../services/backend:/app:cached
      - backend-node-modules:/app/node_modules
    ports:
      - "8000:8000"
      - "9229:9229"  # Node.js debugging
    networks:
      - dev-network
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/devdb
      - REDIS_URL=redis://redis:6379
      - RABBITMQ_URL=amqp://admin:password@rabbitmq:5672
      - JWT_SECRET=dev-secret-key-change-in-production
    depends_on:
      - postgres
      - redis
      - rabbitmq
    command: npm run dev:debug

  # Background worker service
  worker:
    build:
      context: ../../services/worker
      dockerfile: Dockerfile.dev
    volumes:
      - ../../services/worker:/app:cached
      - worker-packages:/app/venv
    networks:
      - dev-network
    environment:
      - PYTHON_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/devdb
      - REDIS_URL=redis://redis:6379
      - RABBITMQ_URL=amqp://admin:password@rabbitmq:5672
    depends_on:
      - postgres
      - redis
      - rabbitmq
    command: python -m app.worker

  # PostgreSQL database
  postgres:
    image: postgres:15-alpine
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./config/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    ports:
      - "5432:5432"
    networks:
      - dev-network
    environment:
      - POSTGRES_DB=devdb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Redis cache
  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
      - ./config/redis/redis.conf:/usr/local/etc/redis/redis.conf:ro
    ports:
      - "6379:6379"
    networks:
      - dev-network
    command: redis-server /usr/local/etc/redis/redis.conf
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  # RabbitMQ message broker
  rabbitmq:
    image: rabbitmq:3-management-alpine
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"
    networks:
      - dev-network
    environment:
      - RABBITMQ_DEFAULT_USER=admin
      - RABBITMQ_DEFAULT_PASS=password
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    volumes:
      - ./config/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./config/nginx/conf.d:/etc/nginx/conf.d:ro
    ports:
      - "8080:80"
    networks:
      - dev-network
    depends_on:
      - frontend
      - backend

  # Prometheus monitoring
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./config/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - dev-network
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'

  # Grafana dashboard
  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana-data:/var/lib/grafana
      - ./config/grafana/provisioning:/etc/grafana/provisioning:ro
    ports:
      - "3001:3000"
    networks:
      - dev-network
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    depends_on:
      - prometheus

  # Elasticsearch (for logging)
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    networks:
      - dev-network
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m

  # Kibana (for log visualization)
  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    ports:
      - "5601:5601"
    networks:
      - dev-network
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  devcontainer-node-modules:
  devcontainer-python-packages:
  frontend-node-modules:
  backend-node-modules:
  worker-packages:
  postgres-data:
  redis-data:
  rabbitmq-data:
  prometheus-data:
  grafana-data:
  elasticsearch-data:

networks:
  dev-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
\`\`\`

### Development Container Dockerfile
\`\`\`dockerfile
# .devcontainer/Dockerfile.dev
FROM mcr.microsoft.com/devcontainers/universal:2-linux

# Set up user
ARG USERNAME=developer
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \\
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \\
    && apt-get update \\
    && apt-get install -y sudo \\
    && echo $USERNAME ALL=\\(root\\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \\
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Install additional system packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \\
    && apt-get -y install --no-install-recommends \\
    # Development tools
    build-essential \\
    curl \\
    wget \\
    unzip \\
    git \\
    vim \\
    nano \\
    htop \\
    tree \\
    jq \\
    # Network tools
    net-tools \\
    iputils-ping \\
    telnet \\
    netcat \\
    # Database clients
    postgresql-client \\
    redis-tools \\
    # Python development
    python3-dev \\
    python3-pip \\
    python3-venv \\
    # Node.js development (already included in universal image)
    # Go development
    # Rust development
    # Additional utilities
    zsh \\
    fish \\
    tmux \\
    screen \\
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \\
    && chsh -s $(which zsh) $USERNAME

# Install additional development tools
USER $USERNAME

# Install global Node.js packages
RUN npm install -g \\
    @nestjs/cli \\
    @angular/cli \\
    @vue/cli \\
    create-react-app \\
    typescript \\
    ts-node \\
    nodemon \\
    pm2 \\
    yarn \\
    pnpm \\
    eslint \\
    prettier \\
    jest \\
    cypress \\
    playwright

# Install Python packages
RUN pip3 install --user \\
    fastapi \\
    uvicorn \\
    django \\
    flask \\
    celery \\
    pytest \\
    black \\
    flake8 \\
    mypy \\
    jupyter \\
    pandas \\
    numpy \\
    requests \\
    sqlalchemy \\
    alembic \\
    pydantic

# Install Go tools
RUN go install golang.org/x/tools/gopls@latest \\
    && go install github.com/go-delve/delve/cmd/dlv@latest \\
    && go install honnef.co/go/tools/cmd/staticcheck@latest

# Install Rust tools
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \\
    && source $HOME/.cargo/env \\
    && rustup component add rls rust-analysis rust-src

# Configure Git (will be overridden by user)
RUN git config --global init.defaultBranch main \\
    && git config --global core.editor "code --wait"

# Set up workspace
WORKDIR /workspace

# Configure shell
COPY --chown=$USERNAME:$USERNAME .zshrc /home/$USERNAME/.zshrc
COPY --chown=$USERNAME:$USERNAME .tmux.conf /home/$USERNAME/.tmux.conf

# Switch back to root for final setup
USER root

# Install Docker CLI (for Docker-in-Docker)
RUN curl -fsSL https://get.docker.com | sh

# Set ownership of workspace
RUN chown -R $USERNAME:$USERNAME /workspace

# Switch to development user
USER $USERNAME

# Default command
CMD ["zsh"]
\`\`\`

## Setup and Initialization Scripts

### Post-Create Command Script
\`\`\`bash
#!/bin/bash
# .devcontainer/scripts/postCreateCommand.sh

set -e

echo "🚀 Running post-create setup..."

# Update system packages
sudo apt-get update

# Install additional development dependencies
echo "📦 Installing additional dependencies..."

# Frontend dependencies
cd /workspace/services/frontend && npm install
cd /workspace/services/backend && npm install
cd /workspace/services/worker && pip install -r requirements.txt

# Set up Git hooks
echo "🔧 Setting up Git hooks..."
cd /workspace
if [ -d ".git" ]; then
    # Install pre-commit hooks
    pip install pre-commit
    pre-commit install
fi

# Initialize database
echo "🗄️ Initializing database..."
cd /workspace
./scripts/init-database.sh

# Set up environment files
echo "⚙️ Setting up environment files..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
fi

# Install VS Code extensions (additional to those in devcontainer.json)
echo "🎨 Installing additional VS Code extensions..."
code --install-extension ms-vscode.vscode-json
code --install-extension redhat.vscode-yaml

# Set up shell configuration
echo "🐚 Configuring shell..."
# Copy custom configurations
cp .devcontainer/config/.zshrc ~/.zshrc
cp .devcontainer/config/.tmux.conf ~/.tmux.conf

# Install tmux plugin manager
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

echo "✅ Post-create setup completed!"
\`\`\`

### Post-Start Command Script
\`\`\`bash
#!/bin/bash
# .devcontainer/scripts/postStartCommand.sh

set -e

echo "🔄 Running post-start commands..."

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."

# Wait for PostgreSQL
echo "Waiting for PostgreSQL..."
until pg_isready -h postgres -p 5432 -U postgres; do
    echo "PostgreSQL is unavailable - sleeping"
    sleep 2
done
echo "✅ PostgreSQL is ready"

# Wait for Redis
echo "Waiting for Redis..."
until redis-cli -h redis ping; do
    echo "Redis is unavailable - sleeping"
    sleep 2
done
echo "✅ Redis is ready"

# Wait for RabbitMQ
echo "Waiting for RabbitMQ..."
until curl -f http://admin:password@rabbitmq:15672/api/overview; do
    echo "RabbitMQ is unavailable - sleeping"
    sleep 2
done
echo "✅ RabbitMQ is ready"

# Run database migrations
echo "🗄️ Running database migrations..."
cd /workspace
npm run migrate

# Seed database with development data
echo "🌱 Seeding database..."
npm run seed:dev

# Start development services
echo "🚀 Starting development services..."
npm run dev:services

# Display service URLs
echo ""
echo "🌐 Development services are ready:"
echo "  Frontend:     http://localhost:3000"
echo "  Backend API:  http://localhost:8000"
echo "  Database:     postgresql://postgres:password@localhost:5432/devdb"
echo "  Redis:        redis://localhost:6379"
echo "  RabbitMQ:     http://localhost:15672 (admin/password)"
echo "  Nginx:        http://localhost:8080"
echo "  Prometheus:   http://localhost:9090"
echo "  Grafana:      http://localhost:3001 (admin/admin)"
echo "  Kibana:       http://localhost:5601"
echo ""

echo "✅ Development environment is ready! 🎉"
\`\`\`

## Service Configuration Files

### Nginx Configuration
\`\`\`nginx
# .devcontainer/config/nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:8000;
    }

    server {
        listen 80;
        server_name localhost;

        # Frontend routes
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # WebSocket support
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        # API routes
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\\n";
            add_header Content-Type text/plain;
        }
    }
}
\`\`\`

### PostgreSQL Initialization
\`\`\`sql
-- .devcontainer/config/postgres/init.sql
-- Create additional databases for different services
CREATE DATABASE testdb;
CREATE DATABASE analytics;

-- Create development user with necessary permissions
CREATE USER devuser WITH PASSWORD 'devpassword';
GRANT ALL PRIVILEGES ON DATABASE devdb TO devuser;
GRANT ALL PRIVILEGES ON DATABASE testdb TO devuser;
GRANT ALL PRIVILEGES ON DATABASE analytics TO devuser;

-- Enable necessary extensions
\\c devdb;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "hstore";

\\c testdb;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\\c analytics;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
\`\`\`

### Redis Configuration
\`\`\`conf
# .devcontainer/config/redis/redis.conf
# Basic Redis configuration for development

# Network
bind 0.0.0.0
port 6379
protected-mode no

# General
daemonize no
pidfile /var/run/redis.pid
loglevel notice
databases 16

# Persistence
save 900 1
save 300 10
save 60 10000
dbfilename dump.rdb
dir /data

# Memory management
maxmemory 256mb
maxmemory-policy allkeys-lru

# Security (development only)
# requirepass yourpassword
\`\`\`

## Development Workflow

### Package.json Scripts
\`\`\`json
{
  "name": "advanced-devcontainer-project",
  "scripts": {
    "dev": "concurrently \\"npm run dev:frontend\\" \\"npm run dev:backend\\" \\"npm run dev:worker\\"",
    "dev:frontend": "cd services/frontend && npm run dev",
    "dev:backend": "cd services/backend && npm run dev",
    "dev:worker": "cd services/worker && python -m app.worker",
    "dev:services": "docker-compose -f .devcontainer/docker-compose.yml up -d",
    
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd services/frontend && npm run build",
    "build:backend": "cd services/backend && npm run build",
    
    "test": "npm run test:frontend && npm run test:backend && npm run test:worker",
    "test:frontend": "cd services/frontend && npm test",
    "test:backend": "cd services/backend && npm test",
    "test:worker": "cd services/worker && python -m pytest",
    "test:e2e": "cd e2e-tests && npx playwright test",
    
    "migrate": "cd services/backend && npm run migrate",
    "migrate:reset": "cd services/backend && npm run migrate:reset",
    "seed:dev": "cd services/backend && npm run seed:dev",
    
    "lint": "npm run lint:frontend && npm run lint:backend && npm run lint:worker",
    "lint:frontend": "cd services/frontend && npm run lint",
    "lint:backend": "cd services/backend && npm run lint",
    "lint:worker": "cd services/worker && flake8 .",
    
    "format": "npm run format:frontend && npm run format:backend && npm run format:worker",
    "format:frontend": "cd services/frontend && npm run format",
    "format:backend": "cd services/backend && npm run format",
    "format:worker": "cd services/worker && black .",
    
    "logs": "docker-compose -f .devcontainer/docker-compose.yml logs -f",
    "logs:backend": "docker-compose -f .devcontainer/docker-compose.yml logs -f backend",
    "logs:frontend": "docker-compose -f .devcontainer/docker-compose.yml logs -f frontend",
    
    "clean": "npm run clean:frontend && npm run clean:backend && npm run clean:worker",
    "clean:frontend": "cd services/frontend && rm -rf node_modules dist",
    "clean:backend": "cd services/backend && rm -rf node_modules dist",
    "clean:worker": "cd services/worker && rm -rf __pycache__ .pytest_cache",
    
    "setup:env": "cp .env.example .env",
    "setup:hooks": "pre-commit install",
    "setup": "npm run setup:env && npm run setup:hooks && npm install"
  }
}
\`\`\`

### VS Code Tasks Configuration
\`\`\`json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start All Services",
      "type": "shell",
      "command": "npm run dev",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "runOptions": {
        "runOn": "folderOpen"
      }
    },
    {
      "label": "Run Tests",
      "type": "shell",
      "command": "npm test",
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Database Migration",
      "type": "shell",
      "command": "npm run migrate",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Format Code",
      "type": "shell",
      "command": "npm run format",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    }
  ]
}
\`\`\`

## Advanced Features

### Multi-Language Support
The DevContainer supports multiple programming languages:
- **Node.js/TypeScript**: Frontend and backend services
- **Python**: Data processing and machine learning services
- **Go**: High-performance microservices
- **Rust**: System-level components
- **SQL**: Database schemas and queries

### Service Communication
Services communicate through:
- **HTTP REST APIs**: Standard REST endpoints
- **GraphQL**: Unified API gateway
- **WebSockets**: Real-time communication
- **Message Queues**: Asynchronous processing
- **gRPC**: High-performance service communication

### Development Tools Integration
- **Debugging**: Multi-language debugging support
- **Testing**: Unit, integration, and E2E testing
- **Linting**: Code quality enforcement
- **Formatting**: Consistent code style
- **Git Hooks**: Pre-commit validation

### Performance Optimization
- **Volume Caching**: Named volumes for dependencies
- **Bind Mounts**: Efficient file syncing
- **Network Optimization**: Custom Docker networks
- **Resource Limits**: Controlled resource usage

## Troubleshooting Guide

### Common Issues
1. **Port Conflicts**: Check if ports are already in use
2. **Volume Permissions**: Ensure proper file permissions
3. **Service Dependencies**: Wait for services to be ready
4. **Memory Issues**: Adjust Docker resource limits
5. **Network Problems**: Check Docker network configuration

### Performance Tips
- Use named volumes for node_modules and package directories
- Configure Docker Desktop with adequate resources
- Use .dockerignore to exclude unnecessary files
- Implement health checks for all services
- Monitor container resource usage

### Best Practices
- Version control your devcontainer configuration
- Document environment setup procedures
- Use consistent naming conventions
- Implement proper logging and monitoring
- Regular cleanup of unused containers and volumes

This advanced DevContainer setup provides a complete, production-like development environment that enables teams to develop complex, multi-service applications with consistency and efficiency.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];