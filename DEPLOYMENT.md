# Deployment Guide

## Pre-Deployment Checklist

- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Production build successful (`npm run build`)
- [ ] Environment variables configured
- [ ] Domain name ready (if applicable)

## Environment Variables

Required for production:

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Instant deployments

**Steps:**

1. Push code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com)

3. Click "Import Project"

4. Select your repository

5. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Add environment variable:
   - Key: `NEXT_PUBLIC_BASE_URL`
   - Value: Your domain (e.g., `https://gauravkhandelwal.com`)

7. Click "Deploy"

**Custom Domain:**
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

### 2. Netlify

**Steps:**

1. Push code to Git repository

2. Go to [netlify.com](https://netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`

5. Add environment variables in Site Settings

6. Deploy

### 3. Self-Hosted (VPS/Cloud)

**Requirements:**
- Node.js 18+
- PM2 or similar process manager

**Steps:**

1. Clone repository on server:
```bash
git clone <your-repo-url>
cd Gaurav_Khandelwal
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local`:
```bash
echo "NEXT_PUBLIC_BASE_URL=https://yourdomain.com" > .env.local
```

4. Build:
```bash
npm run build
```

5. Start with PM2:
```bash
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

6. Configure Nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Setup SSL with Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com
```

### 4. Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_BASE_URL=https://yourdomain.com
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

**Build and run:**
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Homepage loads correctly
- [ ] 3D gallery works
- [ ] Navigation functional
- [ ] About page accessible
- [ ] Projects page loads
- [ ] Individual project pages work
- [ ] Mobile responsive
- [ ] No console errors

### 2. Performance Check

Test with:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### 3. SEO Setup

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible
- [ ] Check meta tags
- [ ] Verify Open Graph tags

### 4. Analytics (Optional)

Add analytics in `src/lib/analytics.ts` or use:
- Google Analytics
- Plausible
- Umami
- Vercel Analytics

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading

- Check image paths are correct
- Verify images exist in `public/projects/`
- Check Next.js image configuration

### 3D Gallery Not Working

- Verify WebGL is supported
- Check browser console for errors
- Ensure Three.js dependencies installed

### Environment Variables Not Working

- Prefix must be `NEXT_PUBLIC_` for client-side
- Rebuild after changing env vars
- Check deployment platform env settings

## Monitoring

### Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- StatusCake

### Error Tracking

Consider:
- Sentry
- LogRocket
- Rollbar

## Updates

To update the site:

1. Make changes locally
2. Test: `npm run build`
3. Commit and push to Git
4. Deployment platform auto-deploys (Vercel/Netlify)
5. Or manually deploy on self-hosted

## Support

For issues:
- Check browser console
- Review deployment logs
- Verify environment variables
- Test locally first

## Security

- Keep dependencies updated: `npm audit`
- Use HTTPS only
- Configure security headers (already in next.config.ts)
- Regular backups
