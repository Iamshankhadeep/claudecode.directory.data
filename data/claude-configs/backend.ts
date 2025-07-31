import { ClaudeMdConfig } from '../types';

export const backendConfigs: ClaudeMdConfig[] = [
  {
    id: 'nodejs-express-typescript',
    title: 'Node.js Express + TypeScript API',
    slug: 'nodejs-express-typescript-api',
    description: 'RESTful API built with Node.js, Express, TypeScript, and modern backend development practices.',
    category: 'Claude.md Configurations',
    tags: ['nodejs', 'express', 'typescript', 'rest-api', 'backend'],
    difficulty: 'INTERMEDIATE',
    language: 'TypeScript',
    framework: 'Express.js',
    content: `# Claude.md - Node.js Express + TypeScript API

## Project Overview

This is a RESTful API built with Node.js, Express, and TypeScript, following modern backend development practices with proper error handling, validation, and database integration.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Validation**: Zod or Joi
- **Testing**: Jest with Supertest
- **Documentation**: Swagger/OpenAPI

## Project Structure

\`\`\`
src/
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── models/            # Database models
├── routes/            # API routes
├── services/          # Business logic
├── utils/             # Utility functions
├── types/             # TypeScript types
├── config/            # Configuration files
└── app.ts            # Express app setup
\`\`\`

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow REST API conventions
- Implement proper error handling
- Use middleware for cross-cutting concerns
- Follow SOLID principles

### API Design
- Use consistent naming conventions
- Implement proper HTTP status codes
- Use pagination for list endpoints
- Implement proper filtering and sorting
- Follow REST resource patterns

### Security
- Implement authentication and authorization
- Use HTTPS in production
- Validate all inputs
- Implement rate limiting
- Use security headers

## Key Commands

- \`npm run dev\` - Start development server with nodemon
- \`npm run build\` - Compile TypeScript
- \`npm start\` - Start production server
- \`npm test\` - Run tests
- \`npm run lint\` - Run ESLint

## Environment Variables

Create a \`.env\` file:
\`\`\`
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
JWT_SECRET=your-super-secret-jwt-key
BCRYPT_ROUNDS=12
CORS_ORIGIN=http://localhost:3001
\`\`\`

## Common Patterns

### Express App Setup
\`\`\`ts
// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
\`\`\`

### Controller Pattern
\`\`\`ts
// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { CreateUserSchema, UpdateUserSchema } from '../types/user';

export const userController = {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const users = await userService.getUsers({
        page: Number(page),
        limit: Number(limit),
        search: search as string
      });
      
      res.json({
        success: true,
        data: users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: users.length
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = CreateUserSchema.parse(req.body);
      const user = await userService.createUser(validatedData);
      
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
};
\`\`\`

### Service Layer
\`\`\`ts
// src/services/userService.ts
import { prisma } from '../config/database';
import { hashPassword } from '../utils/auth';
import type { CreateUserData, UpdateUserData } from '../types/user';

export const userService = {
  async getUsers(options: {
    page: number;
    limit: number;
    search?: string;
  }) {
    const { page, limit, search } = options;
    const skip = (page - 1) * limit;
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    return await prisma.user.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  },

  async createUser(data: CreateUserData) {
    const hashedPassword = await hashPassword(data.password);
    
    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
  },

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
};
\`\`\`

### Authentication Middleware
\`\`\`ts
// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
\`\`\`

### Error Handling Middleware
\`\`\`ts
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  // Validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }

  // Database errors
  if (error.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Resource already exists'
    });
  }

  // Default error
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};
\`\`\`

### Route Definition
\`\`\`ts
// src/routes/users.ts
import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { CreateUserSchema, UpdateUserSchema } from '../types/user';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', validateRequest(CreateUserSchema), userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', authenticateToken, validateRequest(UpdateUserSchema), userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

export default router;
\`\`\`

## Testing

- Use Jest for unit and integration tests
- Test controllers, services, and middleware
- Use Supertest for API endpoint testing
- Mock database calls in unit tests
- Use test database for integration tests

## Database

- Use Prisma ORM for database operations
- Implement proper database migrations
- Use database transactions for complex operations
- Implement proper indexing
- Use connection pooling

## Deployment

- Use PM2 for process management
- Set up proper logging with Winston
- Implement health check endpoints
- Use environment-specific configurations
- Set up monitoring and alerting`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'fastapi-python',
    title: 'FastAPI + Python + SQLAlchemy',
    slug: 'fastapi-python-sqlalchemy',
    description: 'High-performance Python API with FastAPI, SQLAlchemy ORM, and modern Python development practices.',
    category: 'Claude.md Configurations',
    tags: ['python', 'fastapi', 'sqlalchemy', 'pydantic', 'async'],
    difficulty: 'INTERMEDIATE',
    language: 'Python',
    framework: 'FastAPI',
    content: `# Claude.md - FastAPI + Python + SQLAlchemy API

## Project Overview

This is a high-performance Python API built with FastAPI, SQLAlchemy ORM, and Pydantic for data validation, following modern Python development practices.

## Technology Stack

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **ORM**: SQLAlchemy 2.0 with async support
- **Validation**: Pydantic V2
- **Database**: PostgreSQL
- **Authentication**: OAuth2 with JWT
- **Testing**: Pytest with async support
- **Documentation**: Auto-generated OpenAPI/Swagger

## Project Structure

\`\`\`
app/
├── api/               # API routes
│   ├── v1/           # API version 1
│   └── dependencies.py # Route dependencies
├── core/             # Core configuration
├── crud/             # Database operations
├── db/               # Database setup
├── models/           # SQLAlchemy models
├── schemas/          # Pydantic schemas
├── services/         # Business logic
├── utils/            # Utility functions
└── main.py          # FastAPI app setup
\`\`\`

## Development Guidelines

### Code Style
- Follow PEP 8 style guide
- Use type hints throughout
- Use async/await for I/O operations
- Follow REST API conventions
- Use Pydantic for data validation

### API Design
- Use automatic API documentation
- Implement proper HTTP status codes
- Use dependency injection
- Implement proper error handling
- Use background tasks for long operations

### Performance
- Use async database operations
- Implement connection pooling
- Use caching where appropriate
- Optimize database queries
- Use pagination for large datasets

## Key Commands

- \`uvicorn app.main:app --reload\` - Start development server
- \`pytest\` - Run tests
- \`black .\` - Format code
- \`mypy .\` - Type checking
- \`flake8 .\` - Linting

## Environment Variables

Create a \`.env\` file:
\`\`\`
DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname
SECRET_KEY=your-super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=development
\`\`\`

## Common Patterns

### FastAPI App Setup
\`\`\`python
# app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api.v1.api import api_router
from app.core.config import settings
from app.db.init_db import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown
    pass


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
\`\`\`

### Pydantic Schemas
\`\`\`python
# app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=100)
    is_active: bool = True


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    is_active: Optional[bool] = None


class UserInDBBase(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class User(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    hashed_password: str
\`\`\`

### SQLAlchemy Models
\`\`\`python
# app/models/user.py
from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
\`\`\`

### CRUD Operations
\`\`\`python
# app/crud/user.py
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    async def get_by_email(
        self, db: AsyncSession, *, email: str
    ) -> Optional[User]:
        result = await db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def create(self, db: AsyncSession, *, obj_in: UserCreate) -> User:
        hashed_password = get_password_hash(obj_in.password)
        db_obj = User(
            email=obj_in.email,
            name=obj_in.name,
            hashed_password=hashed_password,
            is_active=obj_in.is_active,
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def authenticate(
        self, db: AsyncSession, *, email: str, password: str
    ) -> Optional[User]:
        user = await self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    async def is_active(self, user: User) -> bool:
        return user.is_active


user = CRUDUser(User)
\`\`\`

### API Routes
\`\`\`python
# app/api/v1/endpoints/users.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import dependencies
from app.crud import user as crud_user
from app.schemas.user import User, UserCreate, UserUpdate
from app.models.user import User as UserModel

router = APIRouter()


@router.get("/", response_model=List[User])
async def read_users(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(dependencies.get_db),
    current_user: UserModel = Depends(dependencies.get_current_active_user),
):
    """
    Retrieve users.
    """
    users = await crud_user.user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(
    *,
    db: AsyncSession = Depends(dependencies.get_db),
    user_in: UserCreate,
):
    """
    Create new user.
    """
    user = await crud_user.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists",
        )
    user = await crud_user.user.create(db, obj_in=user_in)
    return user


@router.get("/{user_id}", response_model=User)
async def read_user(
    user_id: int,
    db: AsyncSession = Depends(dependencies.get_db),
    current_user: UserModel = Depends(dependencies.get_current_active_user),
):
    """
    Get user by ID.
    """
    user = await crud_user.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )
    return user
\`\`\`

### Authentication Dependencies
\`\`\`python
# app/api/dependencies.py
from typing import AsyncGenerator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession

from app.core import security
from app.core.config import settings
from app.crud import user as crud_user
from app.db.session import async_session
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session


async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(oauth2_scheme),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await crud_user.user.get(db, id=user_id)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not crud_user.user.is_active(current_user):
        raise HTTPException(
            status_code=400, 
            detail="Inactive user"
        )
    return current_user
\`\`\`

### Background Tasks
\`\`\`python
# app/services/email.py
from fastapi import BackgroundTasks
import smtplib
from email.mime.text import MIMEText


def send_email_background(
    background_tasks: BackgroundTasks,
    email: str,
    subject: str,
    body: str,
):
    background_tasks.add_task(send_email, email, subject, body)


def send_email(email: str, subject: str, body: str):
    # Email sending logic
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = 'noreply@example.com'
    msg['To'] = email
    
    # Send email using SMTP
    with smtplib.SMTP('localhost') as server:
        server.send_message(msg)
\`\`\`

## Testing

- Use pytest with async support
- Test API endpoints with TestClient
- Use database fixtures for testing
- Mock external dependencies
- Test both success and error scenarios

## Database

- Use async SQLAlchemy for better performance
- Implement proper database migrations with Alembic
- Use connection pooling
- Implement proper indexing
- Handle database transactions properly

## Deployment

- Use Docker for containerization
- Deploy with Gunicorn + Uvicorn workers
- Set up proper logging
- Implement health checks
- Use environment-specific settings`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'go-gin-api',
    title: 'Go + Gin Framework + GORM',
    slug: 'go-gin-framework-gorm',
    description: 'Efficient Go REST API with Gin framework, GORM ORM, and Go best practices for high-performance backends.',
    category: 'Claude.md Configurations',
    tags: ['go', 'gin', 'gorm', 'rest-api', 'golang'],
    difficulty: 'INTERMEDIATE',
    language: 'Go',
    framework: 'Gin',
    content: `# Claude.md - Go + Gin Framework + GORM API

## Project Overview

This is a high-performance REST API built with Go, Gin framework, and GORM ORM, following Go best practices for scalable backend development.

## Technology Stack

- **Language**: Go 1.21+
- **Framework**: Gin Web Framework
- **ORM**: GORM
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Validation**: go-playground/validator
- **Testing**: Go built-in testing + testify
- **Documentation**: Swagger with gin-swagger

## Project Structure

\`\`\`
├── cmd/
│   └── server/
│       └── main.go      # Application entry point
├── internal/
│   ├── config/          # Configuration
│   ├── controllers/     # HTTP handlers
│   ├── middleware/      # HTTP middleware
│   ├── models/          # Database models
│   ├── repositories/    # Data access layer
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── pkg/
│   ├── database/        # Database connection
│   ├── logger/          # Logging utilities
│   └── validator/       # Custom validators
└── docs/               # Swagger documentation
\`\`\`

## Development Guidelines

### Code Style
- Follow Go conventions and gofmt
- Use meaningful package names
- Implement proper error handling
- Use interfaces for abstraction
- Follow the single responsibility principle

### API Design
- Use RESTful endpoints
- Implement proper HTTP status codes
- Use middleware for cross-cutting concerns
- Implement request validation
- Use structured logging

### Performance
- Use connection pooling
- Implement proper caching
- Use goroutines for concurrent operations
- Optimize database queries
- Use profiling for optimization

## Key Commands

- \`go run cmd/server/main.go\` - Start development server
- \`go build -o bin/server cmd/server/main.go\` - Build binary
- \`go test ./...\` - Run tests
- \`go mod tidy\` - Clean up dependencies
- \`swag init\` - Generate Swagger docs

## Environment Variables

Create a \`.env\` file:
\`\`\`
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=dbname
JWT_SECRET=your-jwt-secret
GIN_MODE=debug
LOG_LEVEL=info
\`\`\`

## Common Patterns

### Main Application Setup
\`\`\`go
// cmd/server/main.go
package main

import (
    "log"
    "os"

    "github.com/joho/godotenv"
    "your-app/internal/config"
    "your-app/internal/controllers"
    "your-app/internal/middleware"
    "your-app/pkg/database"
    "your-app/pkg/logger"
    
    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    // Initialize config
    cfg := config.Load()

    // Initialize logger
    logger.Init(cfg.LogLevel)

    // Initialize database
    db, err := database.Connect(cfg.DatabaseURL)
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    // Auto-migrate models
    database.Migrate(db)

    // Initialize Gin router
    if cfg.Environment == "production" {
        gin.SetMode(gin.ReleaseMode)
    }

    router := gin.New()
    router.Use(gin.Logger())
    router.Use(gin.Recovery())
    router.Use(middleware.CORS())

    // Initialize controllers
    userController := controllers.NewUserController(db)
    authController := controllers.NewAuthController(db)

    // Routes
    v1 := router.Group("/api/v1")
    {
        auth := v1.Group("/auth")
        {
            auth.POST("/login", authController.Login)
            auth.POST("/register", authController.Register)
        }

        users := v1.Group("/users")
        users.Use(middleware.AuthRequired())
        {
            users.GET("", userController.GetUsers)
            users.GET("/:id", userController.GetUser)
            users.PUT("/:id", userController.UpdateUser)
            users.DELETE("/:id", userController.DeleteUser)
        }
    }

    // Swagger documentation
    router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    // Health check
    router.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{"status": "healthy"})
    })

    // Start server
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Server starting on port %s", port)
    if err := router.Run(":" + port); err != nil {
        log.Fatal("Failed to start server:", err)
    }
}
\`\`\`

### Database Models
\`\`\`go
// internal/models/user.go
package models

import (
    "time"
    "gorm.io/gorm"
)

type User struct {
    ID        uint           \`json:"id" gorm:"primaryKey"\`
    Name      string         \`json:"name" gorm:"not null" validate:"required,min=1,max=100"\`
    Email     string         \`json:"email" gorm:"uniqueIndex;not null" validate:"required,email"\`
    Password  string         \`json:"-" gorm:"not null" validate:"required,min=8"\`
    IsActive  bool           \`json:"is_active" gorm:"default:true"\`
    CreatedAt time.Time      \`json:"created_at"\`
    UpdatedAt time.Time      \`json:"updated_at"\`
    DeletedAt gorm.DeletedAt \`json:"-" gorm:"index"\`
}

type CreateUserRequest struct {
    Name     string \`json:"name" validate:"required,min=1,max=100"\`
    Email    string \`json:"email" validate:"required,email"\`
    Password string \`json:"password" validate:"required,min=8"\`
}

type UpdateUserRequest struct {
    Name     *string \`json:"name,omitempty" validate:"omitempty,min=1,max=100"\`
    Email    *string \`json:"email,omitempty" validate:"omitempty,email"\`
    IsActive *bool   \`json:"is_active,omitempty"\`
}

type UserResponse struct {
    ID        uint      \`json:"id"\`
    Name      string    \`json:"name"\`
    Email     string    \`json:"email"\`
    IsActive  bool      \`json:"is_active"\`
    CreatedAt time.Time \`json:"created_at"\`
    UpdatedAt time.Time \`json:"updated_at"\`
}

func (u *User) ToResponse() UserResponse {
    return UserResponse{
        ID:        u.ID,
        Name:      u.Name,
        Email:     u.Email,
        IsActive:  u.IsActive,
        CreatedAt: u.CreatedAt,
        UpdatedAt: u.UpdatedAt,
    }
}
\`\`\`

### Repository Pattern
\`\`\`go
// internal/repositories/user_repository.go
package repositories

import (
    "your-app/internal/models"
    "gorm.io/gorm"
)

type UserRepository interface {
    Create(user *models.User) error
    GetByID(id uint) (*models.User, error)
    GetByEmail(email string) (*models.User, error)
    GetAll(offset, limit int) ([]models.User, error)
    Update(user *models.User) error
    Delete(id uint) error
    Count() (int64, error)
}

type userRepository struct {
    db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
    return &userRepository{db: db}
}

func (r *userRepository) Create(user *models.User) error {
    return r.db.Create(user).Error
}

func (r *userRepository) GetByID(id uint) (*models.User, error) {
    var user models.User
    err := r.db.First(&user, id).Error
    if err != nil {
        return nil, err
    }
    return &user, nil
}

func (r *userRepository) GetByEmail(email string) (*models.User, error) {
    var user models.User
    err := r.db.Where("email = ?", email).First(&user).Error
    if err != nil {
        return nil, err
    }
    return &user, nil
}

func (r *userRepository) GetAll(offset, limit int) ([]models.User, error) {
    var users []models.User
    err := r.db.Offset(offset).Limit(limit).Find(&users).Error
    return users, err
}

func (r *userRepository) Update(user *models.User) error {
    return r.db.Save(user).Error
}

func (r *userRepository) Delete(id uint) error {
    return r.db.Delete(&models.User{}, id).Error
}

func (r *userRepository) Count() (int64, error) {
    var count int64
    err := r.db.Model(&models.User{}).Count(&count).Error
    return count, err
}
\`\`\`

### Service Layer
\`\`\`go
// internal/services/user_service.go
package services

import (
    "errors"
    "your-app/internal/models"
    "your-app/internal/repositories"
    "your-app/pkg/utils"
    
    "golang.org/x/crypto/bcrypt"
    "gorm.io/gorm"
)

type UserService interface {
    CreateUser(req *models.CreateUserRequest) (*models.User, error)
    GetUser(id uint) (*models.User, error)
    GetUsers(page, limit int) ([]models.User, int64, error)
    UpdateUser(id uint, req *models.UpdateUserRequest) (*models.User, error)
    DeleteUser(id uint) error
    AuthenticateUser(email, password string) (*models.User, error)
}

type userService struct {
    userRepo repositories.UserRepository
}

func NewUserService(userRepo repositories.UserRepository) UserService {
    return &userService{
        userRepo: userRepo,
    }
}

func (s *userService) CreateUser(req *models.CreateUserRequest) (*models.User, error) {
    // Check if user already exists
    existingUser, err := s.userRepo.GetByEmail(req.Email)
    if err == nil && existingUser != nil {
        return nil, errors.New("user with this email already exists")
    }

    // Hash password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        return nil, err
    }

    user := &models.User{
        Name:     req.Name,
        Email:    req.Email,
        Password: string(hashedPassword),
        IsActive: true,
    }

    err = s.userRepo.Create(user)
    if err != nil {
        return nil, err
    }

    return user, nil
}

func (s *userService) GetUser(id uint) (*models.User, error) {
    return s.userRepo.GetByID(id)
}

func (s *userService) GetUsers(page, limit int) ([]models.User, int64, error) {
    offset := (page - 1) * limit
    users, err := s.userRepo.GetAll(offset, limit)
    if err != nil {
        return nil, 0, err
    }

    total, err := s.userRepo.Count()
    if err != nil {
        return nil, 0, err
    }

    return users, total, nil
}

func (s *userService) AuthenticateUser(email, password string) (*models.User, error) {
    user, err := s.userRepo.GetByEmail(email)
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, errors.New("invalid credentials")
        }
        return nil, err
    }

    err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
    if err != nil {
        return nil, errors.New("invalid credentials")
    }

    if !user.IsActive {
        return nil, errors.New("account is deactivated")
    }

    return user, nil
}
\`\`\`

### HTTP Controllers
\`\`\`go
// internal/controllers/user_controller.go
package controllers

import (
    "net/http"
    "strconv"

    "your-app/internal/models"
    "your-app/internal/services"
    "your-app/pkg/utils"

    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
)

type UserController struct {
    userService services.UserService
    validator   *validator.Validate
}

func NewUserController(userService services.UserService) *UserController {
    return &UserController{
        userService: userService,
        validator:   validator.New(),
    }
}

// GetUsers godoc
// @Summary Get users
// @Description Get list of users with pagination
// @Tags users
// @Accept json
// @Produce json
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(10)
// @Success 200 {object} utils.PaginatedResponse
// @Failure 400 {object} utils.ErrorResponse
// @Router /users [get]
func (c *UserController) GetUsers(ctx *gin.Context) {
    page, _ := strconv.Atoi(ctx.DefaultQuery("page", "1"))
    limit, _ := strconv.Atoi(ctx.DefaultQuery("limit", "10"))

    if page < 1 {
        page = 1
    }
    if limit < 1 || limit > 100 {
        limit = 10
    }

    users, total, err := c.userService.GetUsers(page, limit)
    if err != nil {
        utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to get users", err)
        return
    }

    var userResponses []models.UserResponse
    for _, user := range users {
        userResponses = append(userResponses, user.ToResponse())
    }

    utils.PaginatedResponse(ctx, userResponses, page, limit, total)
}

// CreateUser godoc
// @Summary Create user
// @Description Create a new user
// @Tags users
// @Accept json
// @Produce json
// @Param user body models.CreateUserRequest true "User data"
// @Success 201 {object} models.UserResponse
// @Failure 400 {object} utils.ErrorResponse
// @Router /users [post]
func (c *UserController) CreateUser(ctx *gin.Context) {
    var req models.CreateUserRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        utils.ValidationErrorResponse(ctx, err)
        return
    }

    if err := c.validator.Struct(&req); err != nil {
        utils.ValidationErrorResponse(ctx, err)
        return
    }

    user, err := c.userService.CreateUser(&req)
    if err != nil {
        utils.ErrorResponse(ctx, http.StatusBadRequest, "Failed to create user", err)
        return
    }

    ctx.JSON(http.StatusCreated, user.ToResponse())
}
\`\`\`

### Authentication Middleware
\`\`\`go
// internal/middleware/auth.go
package middleware

import (
    "net/http"
    "strings"

    "your-app/pkg/utils"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v4"
)

func AuthRequired() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenString := c.GetHeader("Authorization")
        if tokenString == "" {
            utils.ErrorResponse(c, http.StatusUnauthorized, "Authorization header required", nil)
            c.Abort()
            return
        }

        // Remove "Bearer " prefix
        tokenString = strings.TrimPrefix(tokenString, "Bearer ")

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return []byte(utils.GetEnv("JWT_SECRET", "secret")), nil
        })

        if err != nil || !token.Valid {
            utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid token", err)
            c.Abort()
            return
        }

        if claims, ok := token.Claims.(jwt.MapClaims); ok {
            c.Set("user_id", claims["user_id"])
            c.Set("email", claims["email"])
        }

        c.Next()
    }
}
\`\`\`

## Testing

- Use Go's built-in testing package
- Write unit tests for services and repositories
- Use testify for assertions
- Mock dependencies with interfaces
- Write integration tests for controllers

## Database

- Use GORM for ORM operations
- Implement database migrations
- Use connection pooling
- Implement proper indexing
- Handle transactions properly

## Deployment

- Build static binary with Go
- Use Docker for containerization
- Deploy with proper environment configuration
- Set up health checks and monitoring
- Use graceful shutdown`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'ruby-rails-api',
    title: 'Ruby on Rails API + ActiveRecord',
    slug: 'ruby-rails-api-activerecord',
    description: 'Ruby on Rails API application with ActiveRecord, modern Rails patterns, and comprehensive backend features.',
    category: 'Claude.md Configurations',
    tags: ['ruby', 'rails', 'activerecord', 'api', 'ruby-on-rails'],
    difficulty: 'INTERMEDIATE',
    language: 'Ruby',
    framework: 'Ruby on Rails',
    content: `# Claude.md - Ruby on Rails API + ActiveRecord

## Project Overview

This is a Ruby on Rails API application using ActiveRecord ORM, following Rails conventions and modern Ruby development practices for scalable backend systems.

## Technology Stack

- **Language**: Ruby 3.2+
- **Framework**: Ruby on Rails 7.1+
- **ORM**: ActiveRecord
- **Database**: PostgreSQL
- **Authentication**: JWT with Devise
- **Testing**: RSpec with FactoryBot
- **Documentation**: RSwag for API docs
- **Background Jobs**: Sidekiq

## Project Structure

\`\`\`
app/
├── controllers/         # API controllers
│   └── api/
│       └── v1/         # API version 1
├── models/             # ActiveRecord models
├── serializers/        # JSON serializers
├── services/           # Business logic services
├── jobs/               # Background jobs
└── lib/                # Custom libraries
config/
├── routes.rb           # Route definitions
├── database.yml        # Database configuration
└── application.rb      # Application configuration
db/
├── migrate/            # Database migrations
└── seeds.rb           # Database seeds
spec/                  # RSpec tests
\`\`\`

## Development Guidelines

### Code Style
- Follow Ruby style guide and Rails conventions
- Use Rubocop for code formatting
- Implement proper error handling
- Use ActiveRecord validations
- Follow RESTful resource patterns

### API Design
- Use Rails API mode
- Implement proper serialization
- Use consistent error responses
- Implement pagination with Kaminari
- Follow JSON API standards

### Performance
- Use database indexing
- Implement eager loading to avoid N+1 queries
- Use caching with Redis
- Implement background jobs for heavy tasks
- Use database connection pooling

## Key Commands

- \`rails server\` - Start development server
- \`rails console\` - Open Rails console
- \`rails generate\` - Generate Rails components
- \`rails db:migrate\` - Run database migrations
- \`rspec\` - Run tests
- \`rubocop\` - Run code linting

## Environment Variables

Create a \`.env\` file:
\`\`\`
DATABASE_URL=postgresql://user:password@localhost/myapp_development
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=your-jwt-secret-key
RAILS_ENV=development
SECRET_KEY_BASE=your-secret-key-base
\`\`\`

## Common Patterns

### Rails Application Configuration
\`\`\`ruby
# config/application.rb
require_relative "boot"
require "rails"

# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"

Bundler.require(*Rails.groups)

module MyApp
  class Application < Rails::Application
    config.load_defaults 7.1

    # API-only application
    config.api_only = true

    # CORS configuration
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
                 headers: :any,
                 methods: [:get, :post, :put, :patch, :delete, :options, :head],
                 credentials: false
      end
    end

    # Timezone
    config.time_zone = 'UTC'

    # Autoload paths
    config.autoload_paths += %W(#{config.root}/lib)

    # Active Job queue adapter
    config.active_job.queue_adapter = :sidekiq
  end
end
\`\`\`

### ActiveRecord Models
\`\`\`ruby
# app/models/user.rb
class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :name, presence: true, length: { minimum: 1, maximum: 100 }
  validates :email, presence: true, uniqueness: { case_sensitive: false },
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 8 }, allow_nil: true

  scope :active, -> { where(is_active: true) }
  scope :by_name, ->(name) { where('name ILIKE ?', "%#{name}%") }

  before_save :downcase_email

  def full_name
    "#{first_name} #{last_name}".strip
  end

  def active?
    is_active
  end

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end

# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 255 }
  validates :content, presence: true
  validates :status, inclusion: { in: %w[draft published archived] }

  scope :published, -> { where(status: 'published') }
  scope :by_user, ->(user) { where(user: user) }
  scope :recent, -> { order(created_at: :desc) }

  enum status: { draft: 0, published: 1, archived: 2 }

  def published?
    status == 'published'
  end
end
\`\`\`

### API Controllers
\`\`\`ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActionController::ParameterMissing, with: :parameter_missing

  private

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    
    if token.blank?
      render json: { error: 'Authorization token required' }, status: :unauthorized
      return
    end

    begin
      decoded_token = JWT.decode(token, Rails.application.secret_key_base, true, algorithm: 'HS256')
      user_id = decoded_token[0]['user_id']
      @current_user = User.find(user_id)
    rescue JWT::DecodeError, JWT::ExpiredSignature, ActiveRecord::RecordNotFound
      render json: { error: 'Invalid or expired token' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def record_not_found(exception)
    render json: { error: 'Record not found' }, status: :not_found
  end

  def record_invalid(exception)
    render json: { 
      error: 'Validation failed', 
      details: exception.record.errors.full_messages 
    }, status: :unprocessable_entity
  end

  def parameter_missing(exception)
    render json: { error: exception.message }, status: :bad_request
  end
end

# app/controllers/api/v1/users_controller.rb
class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /api/v1/users
  def index
    @users = User.active
    @users = @users.by_name(params[:search]) if params[:search].present?
    @users = @users.page(params[:page]).per(params[:per_page] || 25)

    render json: {
      data: ActiveModelSerializers::SerializableResource.new(@users),
      meta: pagination_meta(@users)
    }
  end

  # GET /api/v1/users/:id
  def show
    render json: @user, serializer: UserSerializer
  end

  # POST /api/v1/users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, serializer: UserSerializer, status: :created
    else
      render json: { 
        error: 'User creation failed', 
        details: @user.errors.full_messages 
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/users/:id
  def update
    if @user.update(user_params)
      render json: @user, serializer: UserSerializer
    else
      render json: { 
        error: 'User update failed', 
        details: @user.errors.full_messages 
      }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/users/:id
  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :is_active)
  end

  def pagination_meta(collection)
    {
      current_page: collection.current_page,
      per_page: collection.limit_value,
      total_pages: collection.total_pages,
      total_count: collection.total_count
    }
  end
end
\`\`\`

### Serializers
\`\`\`ruby
# app/serializers/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :is_active, :created_at, :updated_at

  has_many :posts, serializer: PostSerializer

  def created_at
    object.created_at.iso8601
  end

  def updated_at
    object.updated_at.iso8601
  end
end

# app/serializers/post_serializer.rb
class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :status, :created_at, :updated_at

  belongs_to :user, serializer: UserSerializer
  has_many :comments, serializer: CommentSerializer

  def created_at
    object.created_at.iso8601
  end

  def updated_at
    object.updated_at.iso8601
  end
end
\`\`\`

### Service Objects
\`\`\`ruby
# app/services/user_service.rb
class UserService
  def self.create(params)
    user = User.new(params)
    
    if user.save
      # Send welcome email in background
      UserMailer.welcome_email(user).deliver_later
      
      # Create user profile
      UserProfile.create(user: user)
      
      user
    else
      raise ActiveRecord::RecordInvalid, user
    end
  end

  def self.authenticate(email, password)
    user = User.find_by(email: email.downcase)
    
    if user&.authenticate(password) && user.active?
      user
    else
      nil
    end
  end

  def self.generate_jwt_token(user)
    payload = {
      user_id: user.id,
      email: user.email,
      exp: 24.hours.from_now.to_i
    }
    
    JWT.encode(payload, Rails.application.secret_key_base, 'HS256')
  end
end
\`\`\`

### Database Migrations
\`\`\`ruby
# db/migrate/20241201000001_create_users.rb
class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.boolean :is_active, default: true
      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :is_active
  end
end

# db/migrate/20241201000002_create_posts.rb
class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.integer :status, default: 0
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    add_index :posts, :status
    add_index :posts, :created_at
  end
end
\`\`\`

### Background Jobs
\`\`\`ruby
# app/jobs/email_job.rb
class EmailJob < ApplicationJob
  queue_as :mailers

  def perform(user_id, email_type, options = {})
    user = User.find(user_id)
    
    case email_type
    when 'welcome'
      UserMailer.welcome_email(user).deliver_now
    when 'notification'
      UserMailer.notification_email(user, options[:message]).deliver_now
    end
  end
end
\`\`\`

### Routes Configuration
\`\`\`ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :posts do
        resources :comments, only: [:index, :create, :destroy]
      end

      # Authentication routes
      post '/auth/login', to: 'authentication#login'
      post '/auth/register', to: 'authentication#register'
      delete '/auth/logout', to: 'authentication#logout'

      # Health check
      get '/health', to: 'health#check'
    end
  end

  # Sidekiq web UI
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
end
\`\`\`

### Testing with RSpec
\`\`\`ruby
# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      user = build(:user)
      expect(user).to be_valid
    end

    it 'is not valid without a name' do
      user = build(:user, name: nil)
      expect(user).not_to be_valid
    end

    it 'is not valid with duplicate email' do
      create(:user, email: 'test@example.com')
      user = build(:user, email: 'test@example.com')
      expect(user).not_to be_valid
    end
  end

  describe 'associations' do
    it 'has many posts' do
      association = described_class.reflect_on_association(:posts)
      expect(association.macro).to eq :has_many
    end
  end

  describe 'scopes' do
    let!(:active_user) { create(:user, is_active: true) }
    let!(:inactive_user) { create(:user, is_active: false) }

    it 'returns only active users' do
      expect(User.active).to include(active_user)
      expect(User.active).not_to include(inactive_user)
    end
  end
end

# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { 'password123' }
    is_active { true }
  end
end
\`\`\`

## Testing

- Use RSpec for testing framework
- Use FactoryBot for test data
- Test models, controllers, and services
- Use VCR for external API testing
- Write integration tests for API endpoints

## Database

- Use ActiveRecord for ORM operations
- Write proper database migrations
- Use database indexing for performance
- Implement database seeds for development
- Use database transactions for complex operations

## Deployment

- Use Capistrano for deployment
- Configure for production environment
- Set up background job processing
- Implement proper logging
- Use environment-specific configurations`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];