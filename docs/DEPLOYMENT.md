# Deployment Guide - Daily Dose of Life

## 🚀 Deployment Options

### Replit Deployment (Recommended)
The app is optimized for Replit's deployment platform:

1. **Automatic Builds**: Replit handles the build process automatically
2. **Environment Management**: Environment variables are managed through Replit's interface
3. **Domain Management**: Automatic `.replit.app` domain with optional custom domain support
4. **SSL/TLS**: Automatic HTTPS with certificate management
5. **Health Checks**: Built-in monitoring and health checks

#### Replit Deployment Steps
1. Ensure your app is running properly in development
2. Click the "Deploy" button in the Replit interface
3. Configure any required environment variables
4. Deploy to production

### Alternative Deployment Platforms

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist/public`

#### Heroku
```bash
# Install Heroku CLI and login
heroku create your-app-name
git push heroku main
```

## 🔧 Environment Configuration

### Required Environment Variables

#### Production
```env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

#### Optional Variables
```env
PORT=5000                    # Server port (default: 5000)
SESSION_SECRET=your-secret   # Session encryption key
```

### Database Setup

#### PostgreSQL (Recommended)
1. **Neon Database** (Serverless PostgreSQL)
   ```env
   DATABASE_URL=postgresql://username:password@ep-cool-name.us-east-1.aws.neon.tech/neondb
   ```

2. **Local PostgreSQL**
   ```bash
   # Install PostgreSQL locally
   createdb daily_dose_of_life
   ```

3. **Docker PostgreSQL**
   ```bash
   docker run --name postgres-db \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=daily_dose_of_life \
     -p 5432:5432 -d postgres
   ```

## 📦 Build Process

### Production Build
```bash
# Install dependencies
npm install

# Build the application
npm run build
```

This creates:
- `dist/public/` - Frontend static files
- `dist/index.js` - Backend server bundle

### Build Configuration
The build process:
1. **Frontend**: Vite builds React app to static files
2. **Backend**: esbuild bundles Express server
3. **Assets**: Optimizes images and other resources
4. **Types**: TypeScript compilation and type checking

## 🗄️ Database Migration

### Schema Setup
```bash
# Push schema to database
npm run db:push

# Generate migrations (if needed)
npm run db:generate

# Run migrations
npm run db:migrate
```

### Initial Data Seeding
The app automatically seeds initial quotes through the `MemStorage` class. For production with a real database, you may want to:

1. Create a seeding script
2. Import initial quotes from a JSON file
3. Run the seeder as part of deployment

## 🌐 Domain and SSL

### Custom Domain Setup
1. **DNS Configuration**: Point your domain to the deployment platform
2. **SSL Certificate**: Most platforms handle this automatically
3. **Subdomain Setup**: Configure www and non-www redirects

### HTTPS Enforcement
Ensure all traffic is encrypted:
```javascript
// In production, redirect HTTP to HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

## ⚡ Performance Optimization

### Production Optimizations
1. **Asset Compression**: Gzip/Brotli compression enabled
2. **Static Asset Caching**: Long cache headers for static files
3. **Bundle Splitting**: Code splitting for optimal loading
4. **Image Optimization**: Compressed images and modern formats

### Monitoring Setup
```javascript
// Add basic monitoring middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});
```

## 🔒 Security Considerations

### Production Security Headers
```javascript
// Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

### Environment Security
- Store sensitive data in environment variables
- Use secure session secrets
- Validate all user inputs
- Keep dependencies updated

## 📊 Monitoring and Analytics

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage metrics

### Health Checks
```javascript
// Add health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  });
});
```

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - run: npm test
      - name: Deploy
        run: |
          # Deployment commands here
```

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Build process completes successfully
- [ ] Security headers configured
- [ ] Monitoring setup complete
- [ ] Domain and SSL configured
- [ ] Performance optimizations applied

## 🚨 Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

#### Database Connection Issues
```bash
# Test database connection
npm run db:check

# Verify connection string format
echo $DATABASE_URL
```

#### Runtime Errors
1. Check application logs
2. Verify environment variables
3. Test API endpoints manually
4. Check database connectivity

### Performance Issues
1. **Slow Loading**: Check bundle size and optimize images
2. **High Memory Usage**: Review for memory leaks
3. **Database Slowness**: Add indexes and optimize queries

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancers for multiple instances
- Implement stateless session storage
- Consider CDN for static assets

### Database Scaling
- Connection pooling for better performance
- Read replicas for read-heavy workloads
- Database indexing for query optimization

### Caching Strategy
- Redis for session storage
- CDN for static assets
- Application-level caching for quotes

---

*For support with deployment issues, refer to your platform's documentation or contact the development team.*