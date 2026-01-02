# backend

## Description

Star Wars API - A NestJS backend that interfaces with [SWAPI (Star Wars API)](https://swapi.tech) to provide information about Star Wars movies and characters.

## Features

- ✅ **Search** - Search for people by name or movies by title
- ✅ **Movie Details** - Get detailed information about movies including characters
- ✅ **Character Details** - Get detailed information about characters including movies
- ✅ **Query Statistics** - Automatic tracking and statistics computation
- ✅ **Input Validation** - Automatic validation using DTOs and class-validator
- ✅ **Error Handling** - Proper HTTP exceptions with meaningful error messages
- ✅ **Logging** - Comprehensive logging for debugging and monitoring
- ✅ **Swagger Documentation** - Interactive API documentation
- ✅ **Environment Configuration** - Configurable via environment variables
- ✅ **Modular Architecture** - Feature modules for better organization
- ✅ **Event-Driven Stats** - Statistics computed via scheduled events every 5 minutes
- ✅ **Comprehensive Tests** - 64 tests with excellent coverage

## API Documentation

Once the application is running, you can access the interactive Swagger documentation at:

**http://localhost:4000/api**

The Swagger UI provides:

- Complete API endpoint documentation
- Request/response schemas
- Interactive "Try it out" functionality
- Example requests and responses

## Environment Variables

Create a `.env` file in the backend directory (see `.env.example`):

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# External API Configuration
SWAPI_BASE_URL=https://swapi.tech/api
```

## Installation

```bash
$ yarn install
```

## API Endpoints

### Search

- `GET /search?type={people|movies}&term={searchTerm}`
  - Search for people by name or movies by title
  - Example: `GET /search?type=people&term=luke`

### People

- `GET /people/:id`
  - Get detailed information about a character
  - Example: `GET /people/1`

### Movies

- `GET /movies/:id`
  - Get detailed information about a movie
  - Example: `GET /movies/1`

### Statistics

- `GET /statistics`
  - Get pre-computed statistics about search queries
  - Statistics are automatically recomputed every 5 minutes
  - Includes: top queries, average response time, popular hours, and more

For complete documentation with request/response schemas, visit the Swagger UI at `/api`.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
