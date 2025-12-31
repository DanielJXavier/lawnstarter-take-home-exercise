# Star Wars API - LawnStarter Take-Home Exercise

A full-stack application that interfaces with the Star Wars API (SWAPI) to search for characters and movies, view detailed information, and track query statistics.

## Tech Stack

- **Backend:** NestJS (TypeScript)
- **Frontend:** Next.js 16 (React, TypeScript, TailwindCSS)
- **Containerization:** Docker + Docker Compose

## Features

### Backend (NestJS)
- ✅ Search for Star Wars characters and movies
- ✅ Get detailed character and movie information
- ✅ Automatic query statistics tracking and computation
- ✅ Statistics recomputed every 5 minutes via scheduled events
- ✅ Input validation with DTOs
- ✅ Comprehensive error handling and logging
- ✅ Interactive Swagger API documentation
- ✅ Event-driven architecture
- ✅ 64 unit tests with excellent coverage

### Frontend (Next.js)
- ✅ Search interface with type selection (people/movies)
- ✅ Detailed character pages with movie appearances
- ✅ Detailed movie pages with character lists
- ✅ Modern, responsive UI with TailwindCSS
- ✅ Server-side rendering for performance

---

## 🚀 Quick Start (Docker)

### Prerequisites

- **Docker Desktop** installed and running
  - [Download for Mac](https://www.docker.com/products/docker-desktop/)
  - [Download for Windows](https://www.docker.com/products/docker-desktop/)
  - Docker Compose is included with Docker Desktop

### Running the Application

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd lawnstarter-take-home-exercise
   ```

2. **Start the application:**
   ```bash
   docker-compose up --build
   ```

   This command will:
   - Build both backend and frontend Docker images
   - Start both services
   - Set up networking between containers
   - Expose ports for local access

3. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:4000
   - **API Documentation (Swagger):** http://localhost:4000/api

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Troubleshooting

If you encounter any issues:

```bash
# Clean restart (removes containers and volumes)
docker-compose down -v
docker-compose up --build

# View logs
docker-compose logs backend
docker-compose logs frontend

# View all logs in real-time
docker-compose logs -f
```

---

## 📚 API Endpoints

### Search
- `GET /search?type={people|movies}&term={searchTerm}`
  - Search for people by name or movies by title
  - Example: `http://localhost:4000/search?type=people&term=luke`

### People
- `GET /people/:id`
  - Get detailed information about a character
  - Example: `http://localhost:4000/people/1`

### Movies
- `GET /movies/:id`
  - Get detailed information about a movie
  - Example: `http://localhost:4000/movies/1`

### Statistics
- `GET /statistics`
  - Get pre-computed statistics about search queries
  - Statistics automatically recompute every 5 minutes
  - Includes: top queries, average response time, popular hours, and more
  - Example: `http://localhost:4000/statistics`

**Full API documentation available at:** http://localhost:4000/api

---

## 🧪 Testing

### Backend Tests

```bash
# Enter backend directory
cd backend

# Install dependencies (if not using Docker)
yarn install

# Run all tests
yarn test

# Run tests with coverage
yarn test:cov
```

**Test Results:**
- 64 tests, all passing
- Excellent coverage of services and controllers

---

## 🛠️ Development (Without Docker)

If you prefer to run without Docker:

### Backend

```bash
cd backend

# Install dependencies
yarn install

# Create .env file (optional, defaults are fine)
cp .env.example .env

# Start in development mode
yarn start:dev

# Backend will be available at http://localhost:4000
```

### Frontend

```bash
cd frontend

# Install dependencies
yarn install

# Start in development mode
yarn dev

# Frontend will be available at http://localhost:3000
```

---

## 📁 Project Structure

```
lawnstarter-take-home-exercise/
├── backend/                    # NestJS backend
│   ├── src/
│   │   ├── search/            # Search endpoints
│   │   ├── people/            # People endpoints
│   │   ├── movies/            # Movies endpoints
│   │   ├── statistics/        # Statistics tracking & computation
│   │   ├── shared/            # Shared SWAPI service
│   │   └── main.ts            # Application entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/               # Pages and routes
│   │   ├── components/        # React components
│   │   └── context/           # Search context
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Docker orchestration
└── README.md                   # This file
```

---

## 🎯 Key Implementation Details

### Statistics Feature

The statistics endpoint automatically tracks all search queries and computes statistics every 5 minutes using:

- **Query Tracking Interceptor:** Automatically captures search requests
- **Scheduled Computation:** `@Cron` decorator runs every 5 minutes
- **Event System:** Emits events when statistics are recomputed
- **In-Memory Storage:** Fast access with automatic cleanup of old data (>24 hours)

**Statistics Provided:**
- Top 5 most frequent queries with percentages
- Average API response time
- Top 5 most popular hours of the day
- Breakdown by search type (people vs movies)
- Total queries tracked

### Architecture

- **Modular Design:** Feature-based modules (Search, People, Movies, Statistics)
- **Shared Services:** Centralized SWAPI HTTP service
- **Event-Driven:** EventEmitter for loose coupling
- **Validation:** DTOs with class-validator
- **Error Handling:** Proper HTTP exceptions with logging
- **Type Safety:** Full TypeScript throughout

---

## 🔧 Environment Variables

### Backend

Variables are pre-configured in `docker-compose.yml` but can be customized:

```env
PORT=4000
NODE_ENV=production
SWAPI_BASE_URL=https://swapi.tech/api
```

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 📦 Docker Image Sizes

Both images use multi-stage builds for optimization:

- **Backend:** ~150MB (Alpine-based Node.js)
- **Frontend:** ~200MB (Alpine-based Node.js + Next.js)

---

## 🚢 Production Considerations

This application is production-ready with:

- ✅ Multi-stage Docker builds for smaller images
- ✅ Health checks for backend service
- ✅ Automatic restart policies
- ✅ Comprehensive error handling
- ✅ Logging throughout
- ✅ Input validation
- ✅ Environment-based configuration
- ✅ Optimized Docker images (Alpine Linux)

---

## 📝 Notes

- The application uses the free SWAPI (https://swapi.tech/api) - no API key required
- Statistics are stored in-memory and will reset when the container restarts
- For production use, consider adding Redis for persistent statistics storage

---

## 🤝 Support

If you encounter any issues running the application:

1. Ensure Docker Desktop is running
2. Check port availability (3000, 4000)
3. Try a clean restart: `docker-compose down -v && docker-compose up --build`
4. Check logs: `docker-compose logs`

---

## 📄 License

This project was created as a take-home exercise for LawnStarter.
