# Daily Dose of Life - Quote App

## Overview

This is a vibrant full-stack web application that delivers daily inspiration through carefully curated quotes. The app features an energetic design with dynamic animations, category filtering, and sharing capabilities. Built with React frontend using TypeScript and Vite, Express.js backend, and Drizzle ORM with PostgreSQL for data persistence. The UI uses shadcn/ui components with a custom energetic color theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (July 10, 2025)

✓ Enhanced visual design with energetic color theme
✓ Added animated gradient background with floating elements  
✓ Implemented glass-morphism effects for modern aesthetics
✓ Created comprehensive documentation suite
✓ Added API documentation and deployment guides
✓ Built user guide and development documentation

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: shadcn/ui components based on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot reloading with tsx and Vite middleware integration

### Project Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and query client
├── server/          # Express.js backend
├── shared/          # Shared types and schemas
└── migrations/      # Database migration files
```

## Key Components

### Database Schema
- **Quotes Table**: Stores quote text, author, and category
- **Users Table**: Basic user authentication structure (username, password)
- **Schema Validation**: Zod schemas for runtime type checking

### API Endpoints
- `GET /api/quotes` - Retrieve all quotes
- `GET /api/quotes/random` - Get a random quote
- `GET /api/quotes/category/:category` - Filter quotes by category
- `GET /api/quotes/:id` - Get specific quote
- `POST /api/quotes` - Create new quote (implementation ready)

### Frontend Features
- **Quote Display**: Clean, card-based quote presentation
- **Category Filtering**: Browse quotes by philosophy, movies, famous people, etc.
- **Random Quote**: Get fresh inspiration with a click
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: User feedback for actions
- **Loading States**: Smooth UX with skeleton loaders

### Storage Layer
- **Interface-based Design**: `IStorage` interface for flexible data access
- **Memory Storage**: Development implementation with pre-seeded quotes
- **Database Ready**: Drizzle ORM configured for PostgreSQL production use

## Data Flow

1. **Client Request**: User interacts with React components
2. **Query Management**: TanStack Query handles API calls and caching
3. **API Layer**: Express routes process requests
4. **Storage Layer**: Data access through storage interface
5. **Response**: JSON data returned to client
6. **UI Update**: React components re-render with new data

### State Management
- **Server State**: TanStack Query for API data, caching, and synchronization
- **Local State**: React useState for component-level state
- **Global State**: Context API for app-wide settings (toast notifications)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production

## Deployment Strategy

### Development
- **Hot Reloading**: Vite dev server with Express middleware integration
- **Type Checking**: TypeScript compilation without emit
- **Database**: Drizzle schema push for rapid iteration

### Production Build
1. **Frontend**: Vite builds static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations for schema updates
4. **Deployment**: Node.js server serves both API and static files

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment detection for development features
- **REPL_ID**: Replit-specific development tools integration

### Database Setup
- Drizzle configuration points to PostgreSQL
- Migration files stored in `./migrations`
- Schema definitions in `./shared/schema.ts`
- Ready for Neon serverless PostgreSQL deployment