# Docker Setup Guide

This guide provides detailed instructions for running the application using Docker.

## Prerequisites

### Required Software

1. **Docker Desktop**
   - **macOS:** [Download Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
   - **Windows:** [Download Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
   - **Linux:** Install Docker Engine and Docker Compose separately

2. **Verify Installation:**
   ```bash
   docker --version
   docker-compose --version
   ```

   You should see versions like:
   ```
   Docker version 24.x.x
   Docker Compose version v2.x.x
   ```

### System Requirements

- **RAM:** Minimum 4GB (8GB recommended)
- **Disk Space:** ~2GB for images and containers
- **Ports:** 3000 and 4000 must be available

---

## Quick Start

### 1. Start the Application

```bash
# Navigate to project root
cd lawnstarter-take-home-exercise

# Build and start all services
docker-compose up --build
```

**What happens:**
- Downloads Node.js base images (~300MB)
- Builds backend container (~150MB)
- Builds frontend container (~200MB)
- Starts both services
- Sets up networking

**Expected output:**
```
[+] Building ...
[+] Running 2/2
 ✔ Container starwars-backend   Started
 ✔ Container starwars-frontend  Started
```

### 2. Verify Services are Running

```bash
# Check container status
docker-compose ps

# Expected output:
NAME                  STATUS    PORTS
starwars-backend      Up        0.0.0.0:4000->4000/tcp
starwars-frontend     Up        0.0.0.0:3000->3000/tcp
```

### 3. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Swagger Docs:** http://localhost:4000/api
- **Health Check:** http://localhost:4000/api (should return JSON)

### 4. Test the API

```bash
# Search for a character
curl "http://localhost:4000/search?type=people&term=luke"

# Get person details
curl "http://localhost:4000/people/1"

# Get statistics
curl "http://localhost:4000/statistics"
```

---

## Common Commands

### Starting/Stopping

```bash
# Start in foreground (see logs)
docker-compose up

# Start in background (detached)
docker-compose up -d

# Stop services (keeps containers)
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove everything (containers, networks, volumes)
docker-compose down -v
```

### Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow specific service logs
docker-compose logs -f backend
```

### Rebuilding

```bash
# Rebuild and restart (after code changes)
docker-compose up --build

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Force rebuild (ignore cache)
docker-compose build --no-cache
```

### Cleanup

```bash
# Remove stopped containers
docker-compose rm

# Clean restart
docker-compose down -v
docker-compose up --build

# Remove all unused Docker resources
docker system prune -a
```

---

## Troubleshooting

### Port Already in Use

**Problem:** Error: "port is already allocated"

**Solution:**
```bash
# Find what's using the port (macOS/Linux)
lsof -i :3000
lsof -i :4000

# Find what's using the port (Windows)
netstat -ano | findstr :3000
netstat -ano | findstr :4000

# Kill the process or change ports in docker-compose.yml
```

### Container Won't Start

**Problem:** Container exits immediately

**Solution:**
```bash
# Check logs for errors
docker-compose logs backend
docker-compose logs frontend

# Try clean rebuild
docker-compose down -v
docker-compose up --build
```

### Build Fails

**Problem:** Build error during image creation

**Solution:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Docker has enough resources (Docker Desktop > Settings > Resources)
```

### Backend Unhealthy

**Problem:** Health check fails

**Solution:**
```bash
# Check backend logs
docker-compose logs backend

# Verify backend is running
curl http://localhost:4000/api

# Restart backend only
docker-compose restart backend
```

### Frontend Can't Connect to Backend

**Problem:** Frontend shows connection errors

**Solution:**
1. Verify backend is running: `docker-compose ps`
2. Check backend health: `curl http://localhost:4000/api`
3. Verify environment variable: Check `NEXT_PUBLIC_API_URL` in docker-compose.yml
4. Restart frontend: `docker-compose restart frontend`

---

## Advanced Usage

### Running Individual Services

```bash
# Start only backend
docker-compose up backend

# Start only frontend (requires backend)
docker-compose up frontend
```

### Accessing Container Shell

```bash
# Access backend container
docker-compose exec backend sh

# Access frontend container
docker-compose exec frontend sh

# Run commands in container
docker-compose exec backend yarn test
```

### Development Mode

For development with hot-reload:

```bash
# Backend dev mode (without Docker)
cd backend && yarn start:dev

# Frontend dev mode (without Docker)
cd frontend && yarn dev
```

---

## Production Deployment

For production deployment, consider:

1. **Environment Variables:** Use proper .env files
2. **Secrets Management:** Use Docker secrets or external vaults
3. **Reverse Proxy:** Add nginx for SSL/load balancing
4. **Monitoring:** Add health check endpoints
5. **Logging:** Centralized logging solution
6. **Scaling:** Use Docker Swarm or Kubernetes

Example production docker-compose snippet:
```yaml
services:
  backend:
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
```

---

## Docker Architecture

### Network Setup

```
starwars-network (bridge)
├── backend (starwars-backend)
│   └── Port 4000 → localhost:4000
└── frontend (starwars-frontend)
    └── Port 3000 → localhost:3000
```

### Health Checks

- **Backend:** HTTP check every 30s to `/api` endpoint
- **Frontend:** Depends on backend health

### Restart Policies

Both services use `unless-stopped`:
- Automatically restart on failure
- Don't restart if manually stopped

---

## Performance Tips

1. **First Build:** Takes 5-10 minutes (downloads images)
2. **Subsequent Builds:** Much faster (uses cache)
3. **RAM Usage:** ~1-2GB total for both containers
4. **CPU:** Minimal usage when idle

---

## Verification Checklist

Before submitting, verify:

- [ ] `docker-compose up --build` succeeds
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend API accessible at http://localhost:4000
- [ ] Swagger docs load at http://localhost:4000/api
- [ ] Search functionality works
- [ ] Statistics endpoint returns data
- [ ] No error logs in `docker-compose logs`
- [ ] Clean restart works: `docker-compose down -v && docker-compose up --build`

---

## Support

If issues persist:
1. Check Docker Desktop is running
2. Verify ports 3000 and 4000 are free
3. Try clean restart
4. Check logs for specific errors
5. Verify Docker has sufficient resources allocated
