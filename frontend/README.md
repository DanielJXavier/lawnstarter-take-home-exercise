# Frontend

A modern Next.js 16 frontend for searching and viewing Star Wars characters and movies, with statistics tracking.

## Features

- ✅ **Search Interface** - Search for people or movies with instant results
- ✅ **Character Details** - View detailed character information with movie appearances
- ✅ **Movie Details** - Browse movies with character lists and opening crawls
- ✅ **Statistics Dashboard** - Search analytics and insights
- ✅ **Responsive Design** - Modern UI built with TailwindCSS
- ✅ **Server-Side Rendering** - Optimized performance with Next.js
- ✅ **Comprehensive Tests** - 118 tests with 100% component coverage

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Jest & React Testing Library** - Testing framework
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js 24+

### Installation

```bash
yarn install
```

### Development

```bash
# Start development server
yarn dev

# Open http://localhost:3000
```

### Testing

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage
```

### Building

```bash
# Build for production
yarn build

# Start production server
yarn start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (details)/         # Details layout group
│   │   │   ├── movies/[id]/   # Movie details page
│   │   │   └── people/[id]/   # Person details page
│   │   ├── statistics/        # Statistics dashboard
│   │   └── page.tsx           # Home/search page
│   ├── components/            # React components
│   │   ├── SearchPage/        # Search interface
│   │   ├── BaseDetailsPage.tsx
│   │   ├── MovieDetailsPage.tsx
│   │   ├── PersonDetailsPage.tsx
│   │   ├── StatisticsPage.tsx
│   │   └── Section.tsx
│   ├── context/               # React Context
│   │   ├── SearchContext.tsx
│   │   └── SearchContext.types.ts
│   ├── constants.ts           # Configuration
│   └── types.ts               # TypeScript types
├── jest.config.js             # Jest configuration
├── jest.setup.ts              # Test setup
└── package.json
```

## Testing

The project includes comprehensive test coverage:

### Test Statistics

- **118 tests** across 11 test suites
- **100% coverage** of all components
- **100% coverage** of context/state management

### Test Files

- `SearchContext.test.tsx` - Context state management (22 tests)
- `Section.test.tsx` - Section component (6 tests)
- `BaseDetailsPage.test.tsx` - Base details page (5 tests)
- `StatisticsPage.test.tsx` - Statistics display (15 tests)
- `PersonDetailsPage.test.tsx` - Person details (10 tests)
- `MovieDetailsPage.test.tsx` - Movie details (14 tests)
- `SearchPage.test.tsx` - Search page layout (5 tests)
- `ResultsArea.test.tsx` - Results container (5 tests)
- `ResultsContent.test.tsx` - Results display (9 tests)
- `SearchForm.test.tsx` - Search form (18 tests)
- `SearchTypeOption.test.tsx` - Radio options (13 tests)

## Components

### SearchPage

Main search interface with:

- Type selection (People/Movies)
- Search input with dynamic placeholders
- Real-time results display
- Link to statistics page

### DetailsPages

- **PersonDetailsPage** - Character bio, physical stats, movie appearances
- **MovieDetailsPage** - Opening crawl, character list
- **StatisticsPage** - Top queries, response times, usage patterns

### Context

- **SearchContext** - Manages search state, results, and loading states
- Provides global state to search components
- Handles API calls and error states

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## API Integration

The frontend communicates with the backend API:

- `GET /search?type={people|movies}&term={term}` - Search
- `GET /people/:id` - Character details
- `GET /movies/:id` - Movie details
- `GET /statistics` - Usage statistics
