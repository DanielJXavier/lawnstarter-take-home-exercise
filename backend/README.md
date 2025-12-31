<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
