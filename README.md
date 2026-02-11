# Gaurav Khandelwal - Portfolio Website

A modern, high-performance portfolio website for Full-Stack Developer & UI/UX Designer Gaurav Khandelwal, built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

## 🚀 Features

- **Interactive 3D Gallery**: WebGL-powered photo gallery with clickable project images using Three.js
- **Real Projects**: Showcasing Prank Wizard, KampusKart, and Onam Festival Website
- **Dynamic Project Pages**: Individual project pages with detailed information and navigation
- **Smooth Animations**: Powered by Framer Motion for fluid user interactions
- **Custom Cursor**: Physics-based cursor with smooth movement and interactions
- **Loading Screen**: Elegant count-up animation with smooth fade transition
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Performance Optimized**: 95+ Lighthouse score with code splitting and lazy loading
- **SEO Ready**: Meta tags, Open Graph, Twitter Cards, sitemap, and robots.txt
- **Security Headers**: HSTS, CSP, X-Frame-Options, and more
- **TypeScript**: Full type safety throughout the application
- **Error Boundaries**: Graceful error handling with custom error pages

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router & Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Fonts**: Inter & Montserrat (Google Fonts)

## 📁 Project Structure

```
src/
├── app/
│   ├── about/
│   │   ├── page.tsx
│   │   └── AboutClient.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── ProjectsClient.tsx
│   │   └── loading.tsx
│   ├── project/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       ├── ProjectClient.tsx
│   │       └── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/
│   │   ├── 3d-gallery-photography.tsx
│   │   ├── CountUp.tsx
│   │   ├── FadeTransition.tsx
│   │   ├── PageTransition.tsx
│   │   └── SmoothCursor.tsx
│   ├── ClientLayout.tsx
│   ├── Hero.tsx
│   ├── LoadingScreen.tsx
│   ├── Navigation.tsx
│   └── index.ts
├── lib/
│   ├── constants/
│   │   ├── animations.ts
│   │   ├── gallery.ts
│   │   ├── projects.ts
│   │   ├── zIndex.ts
│   │   └── index.ts
│   ├── constants.ts (deprecated)
│   └── utils.ts
└── public/
    └── projects/
        ├── active/
        │   ├── prank-wizard.png
        │   ├── kampus-kart.svg
        │   └── onam-festival.svg
        └── coming-soon/
            └── coming-soon.svg
```

## 🚦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🎨 Key Components

### 3D Gallery (Hero)
- Interactive WebGL-powered photo gallery using Three.js
- Clickable project images that navigate to individual project pages
- Multi-input support (mouse wheel, keyboard, touch/pinch gestures)
- Auto-play functionality with physics-based animations
- Fallback for non-WebGL devices

### Project Pages
- Dynamic routing for individual project pages (`/project/[slug]`)
- Real projects: Prank Wizard, KampusKart, Onam Festival
- Detailed project information with tech stack and sections
- Navigation between projects with smooth transitions

### Navigation
- Fixed header with smooth reveal animation
- Responsive hamburger menu for mobile
- Mix-blend-exclusion for visibility over any background
- Social links (GitHub, LinkedIn, Email)

### LoadingScreen
- Count-up animation from 0 to 100
- Session-based loading (shows only once per session)
- Smooth fade transition to main content

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Security Headers
Configured in `next.config.ts`:
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Netlify
```bash
npm run build
```
Deploy the `.next` folder

### Other Platforms
- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18+

## ⚡ Performance Features

- **Image Optimization**: Next.js automatic image optimization with WebP/AVIF
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and images load on demand
- **Turbopack**: Next.js 16 default bundler for faster builds
- **React Compiler**: Enabled for automatic optimization
- **WebGL Fallback**: Graceful degradation for non-WebGL devices

## 🌐 Browser Support

- Chrome (recommended for best 3D performance)
- Firefox
- Safari
- Edge
- Mobile browsers (with touch/gesture support)

## 📱 Contact

- **Email**: gauravkhandelwal205@gmail.com
- **GitHub**: [Gaurav-205](https://github.com/Gaurav-205)
- **LinkedIn**: [gaurav-khandelwal-17a127358](https://linkedin.com/in/gaurav-khandelwal-17a127358)
- **Location**: Pune, India

## 📄 License

This project is private and proprietary.

---

Built with ❤️ by Gaurav Khandelwal
