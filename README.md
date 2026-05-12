# Gaurav Khandelwal - Portfolio

A modern, high-performance portfolio website built with Next.js 16, React 19, and Three.js featuring an interactive 3D gallery.

## Features

- ⚡ Next.js 16 with React Compiler for optimal performance
- 🎨 Interactive 3D gallery with WebGL
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- ♿ Accessibility compliant
- 🔒 Security headers configured
- 🚀 Optimized for production deployment

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Unit tests (Vitest)
npm run test

# Production build and local preview
npm run build
npm start

# E2E smoke tests (Playwright; uses production server — run after build)
npm run build
npm run test:e2e
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Project Structure

```
src/
├── app/                 # Next.js App Router (routes, API, metadata)
├── features/            # Route-scoped UI: about, projects, project, gallery
├── components/          # Shared components (Hero, Navigation, forms, ui/)
├── shared/              # Cross-cutting barrels (lib, ui)
└── lib/                 # env, analytics, utils, constants
e2e/                     # Playwright smoke tests
```


## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Other Platforms

```bash
# Build the project
npm run build

# The output will be in .next folder
# Deploy the .next folder with node server
npm start
```

## Performance Optimizations

- React Compiler enabled for automatic optimizations
- Image optimization with WebP/AVIF support
- Code splitting and lazy loading
- Optimized 3D rendering with Three.js
- Minimal bundle size

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with WebGL support

## License

© 2024 Gaurav Khandelwal. All rights reserved.

## Contact

- Email: gauravkhandelwal205@gmail.com
- LinkedIn: [Gaurav Khandelwal](https://linkedin.com/in/gaurav-khandelwal-17a127358)
- GitHub: [Gaurav-205](https://github.com/Gaurav-205)
