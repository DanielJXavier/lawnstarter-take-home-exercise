# Star Wars API - LawnStarter Take-Home Exercise

A full-stack application that interfaces with the Star Wars API (SWAPI) to search for characters and movies, view detailed information, and track query statistics.

## Tech Stack

- **Backend:** NestJS (TypeScript)
- **Frontend:** Next.js 16 (React, TypeScript, TailwindCSS)
- **Containerization:** Docker + Docker Compose

## Documentation

- **[Backend Documentation](./backend/README.md)** - NestJS API server, endpoints, testing, and architecture
- **[Frontend Documentation](./frontend/README.md)** - Next.js application, components, testing, and features

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

## 🤝 Support

If you encounter any issues running the application:

1. Ensure Docker Desktop is running
2. Check port availability (3000, 4000)
3. Try a clean restart: `docker-compose down -v && docker-compose up --build`
4. Check logs: `docker-compose logs`

---

## 📄 License

This project was created as a take-home exercise for LawnStarter.
