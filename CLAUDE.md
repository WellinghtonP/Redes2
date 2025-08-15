# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a containerized web application built with Express.js and PostgreSQL, demonstrating a 3-tier architecture using Docker containers. The project implements a simple user management REST API with database persistence.

## Architecture

**3-Tier Containerized Architecture:**
- **Presentation Layer**: Nginx reverse proxy (port 80)
- **Logic Layer**: Node.js/Express.js API server (port 3000)  
- **Data Layer**: PostgreSQL database (port 5432)
- **Management**: Adminer web interface (port 8080)

**Key Components:**
- `app/server.js`: Main Express application with REST API endpoints
- `docker-compose.yml`: Multi-container orchestration with environment variables
- `nginx/nginx.conf`: Reverse proxy configuration with health checks
- Database: PostgreSQL with automatic table initialization

## Development Commands

### Docker Operations
```bash
# Start all services
docker-compose up -d

# Start with logs
docker-compose up

# Stop all services
docker-compose down

# Rebuild containers
docker-compose build

# View logs
docker-compose logs app
docker-compose logs postgres
docker-compose logs nginx
```

### Application Development
```bash
# Enter app container for development
docker-compose exec app sh

# Install dependencies (inside container)
npm install

# Start development mode with nodemon
npm run dev

# Start production mode
npm start
```

### Database Management
- **Access Adminer**: http://localhost:8080
- **Database credentials**: Set via environment variables (DB_NAME, DB_USER, DB_PASSWORD)
- **Direct PostgreSQL access**: `docker-compose exec postgres psql -U appuser -d appdb`

## API Endpoints

The application exposes a REST API for user management:

- `GET /`: API documentation and endpoint list
- `GET /api/status`: Database connection status
- `GET /api/usuarios`: List all users
- `GET /api/usuarios/:id`: Get user by ID
- `POST /api/usuarios`: Create new user (requires nome, email)
- `DELETE /api/usuarios/:id`: Delete user

## Environment Configuration

Environment variables are configured in `docker-compose.yml`:
- `PORT`: Application port (default: 3000)
- `DB_HOST`: Database hostname (postgres service)
- `DB_PORT`: Database port (5432)
- `DB_NAME`: Database name (default: appdb)
- `DB_USER`: Database user (default: appuser)  
- `DB_PASSWORD`: Database password (default: apppassword)

## Database Schema

The application automatically creates a `usuarios` table with:
- `id`: SERIAL PRIMARY KEY
- `nome`: VARCHAR(100) NOT NULL
- `email`: VARCHAR(100) UNIQUE NOT NULL
- `criado_em`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

## Service Dependencies

Services start in dependency order:
1. PostgreSQL database (with health checks)
2. Node.js application (waits for healthy database)
3. Nginx proxy (waits for application)
4. Adminer (waits for database)

## Network Architecture

All services communicate through a custom bridge network (`app-network`), providing:
- Service discovery by container name
- Isolated network communication
- Port exposure only where needed (80, 5432, 8080)