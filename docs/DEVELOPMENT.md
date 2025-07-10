# Development Guide - Daily Dose of Life

## 🛠️ Development Setup

### Prerequisites
- Node.js 20 or higher
- npm package manager
- Git for version control

### Local Development
1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd daily-dose-of-life
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   This starts both the Express backend and Vite frontend on port 5000.

3. **Access the Application**
   Open your browser to `http://localhost:5000`

## 📁 Project Structure

```
daily-dose-of-life/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Global styles and theme
│   └── index.html         # HTML template
├── server/                # Express.js backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite middleware setup
├── shared/                # Shared code between client/server
│   └── schema.ts         # Database schema and types
├── docs/                 # Documentation
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── drizzle.config.ts     # Database configuration
```

## 🎨 Styling Guidelines

### Color System
The app uses CSS custom properties for theming:

```css
:root {
  /* Energetic color palette */
  --coral: hsl(6, 100%, 72%);
  --turquoise: hsl(174, 56%, 54%);
  --vibrant-purple: hsl(283, 39%, 53%);
  --energetic-orange: hsl(38, 86%, 51%);
  --bright-yellow: hsl(49, 86%, 62%);
}
```

### Utility Classes
Custom utility classes for the energetic theme:

- `.gradient-bg` - Animated multi-color gradient background
- `.quote-container` - Glass-morphism effect for quote display
- `.btn-energetic` - Gradient button with hover effects
- `.floating-element` - Animated floating background elements

### Animation System
The app includes several custom animations:

- `gradient` - 8-second infinite background animation
- `float` - 6-second gentle floating motion
- `fadeIn` - 0.8-second entry animation
- `scaleIn` - 0.5-second scale animation

## 🔧 Component Development

### Creating New Components
1. Use TypeScript for all components
2. Follow the existing shadcn/ui pattern
3. Include proper prop types and interfaces
4. Add hover states and animations where appropriate

Example component structure:
```typescript
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export function Component({ title, onAction }: ComponentProps) {
  return (
    <div className="component-class">
      {/* Component JSX */}
    </div>
  );
}
```

### Using shadcn/ui Components
Import components using the `@/` alias:
```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

## 🗄️ Data Management

### Storage Interface
The app uses an interface-based storage system for flexibility:

```typescript
export interface IStorage {
  getAllQuotes(): Promise<Quote[]>;
  getRandomQuote(): Promise<Quote | undefined>;
  getQuotesByCategory(category: string): Promise<Quote[]>;
  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
}
```

### Adding New Storage Methods
1. Update the `IStorage` interface in `server/storage.ts`
2. Implement the method in `MemStorage` class
3. Add corresponding API route in `server/routes.ts`
4. Update frontend queries as needed

### Quote Data Format
All quotes follow this schema:
```typescript
{
  id: number;          // Auto-generated
  text: string;        // Quote content
  author: string;      // Quote author
  category: string;    // Category classification
}
```

## 🌐 API Development

### Adding New Endpoints
1. Define the route in `server/routes.ts`
2. Use Zod schemas for validation
3. Handle errors appropriately
4. Return consistent JSON responses

Example API route:
```typescript
app.get("/api/endpoint", async (req, res) => {
  try {
    // Route logic here
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error message" });
  }
});
```

### Validation
Use Zod schemas from `shared/schema.ts` for request validation:
```typescript
const result = insertQuoteSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ 
    message: "Invalid data",
    errors: result.error.errors 
  });
}
```

## 📱 Frontend Development

### State Management
- Use TanStack Query for server state
- Use React useState for local component state
- Use React Context for global app state (themes, etc.)

### Query Management
Example query setup:
```typescript
const { data: quotes, isLoading } = useQuery<Quote[]>({
  queryKey: ["/api/quotes"],
});
```

Example mutation:
```typescript
const mutation = useMutation({
  mutationFn: async (quote: InsertQuote) => {
    const response = await apiRequest("POST", "/api/quotes", quote);
    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
  },
});
```

### Error Handling
- Use try-catch blocks for async operations
- Show user-friendly error messages via toasts
- Provide fallback UI for error states

## 🧪 Testing

### Manual Testing Checklist
- [ ] Quote displays correctly on page load
- [ ] "Get Another Quote" button works
- [ ] Category filtering functions properly
- [ ] Share functionality copies to clipboard
- [ ] Responsive design works on mobile
- [ ] Animations play smoothly
- [ ] Error states display appropriately

### API Testing
Use curl or a tool like Postman to test endpoints:
```bash
# Get random quote
curl http://localhost:5000/api/quotes/random

# Get quotes by category
curl http://localhost:5000/api/quotes/category/Philosophy

# Create new quote
curl -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{"text":"Test quote","author":"Test Author","category":"Test"}'
```

## 🚀 Production Deployment

### Build Process
```bash
npm run build
```

This creates optimized builds:
- Frontend: `dist/public/` (static files)
- Backend: `dist/index.js` (bundled server)

### Environment Variables
Required for production:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production`

### Database Setup
1. Set up PostgreSQL database
2. Run migrations: `npm run db:push`
3. Seed initial data if needed

## 🔍 Debugging

### Common Issues
1. **Port conflicts**: Change port in `server/index.ts`
2. **Build errors**: Check TypeScript types and imports
3. **API errors**: Verify request/response formats
4. **Styling issues**: Check Tailwind class names and CSS variables

### Development Tools
- React Developer Tools browser extension
- TanStack Query Developer Tools (built-in)
- Browser DevTools for debugging styles and animations

## 📊 Performance Optimization

### Best Practices
- Use React.memo for expensive components
- Implement proper query caching with TanStack Query
- Optimize images and assets
- Use CSS transforms for animations
- Minimize bundle size with tree-shaking

### Monitoring
- Monitor query performance in React Query DevTools
- Check bundle size with `npm run build`
- Test performance on slower devices/networks

## 🔧 Code Quality

### Linting and Formatting
- Follow TypeScript strict mode
- Use consistent naming conventions
- Add proper JSDoc comments for complex functions
- Maintain clean import statements

### Git Workflow
1. Create feature branches from main
2. Make atomic commits with clear messages
3. Test changes locally before pushing
4. Create pull requests for code review

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query Guide](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)