# Piyusha Bhalerao - Portfolio Website

A modern, minimalist portfolio website for UI/UX Designer Piyusha Bhalerao, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Interactive 3D Gallery**: WebGL-powered photo gallery with clickable project images
- **Project Pages**: Individual project pages with detailed information and navigation
- **Portfolio Grid**: Comprehensive portfolio page showcasing all projects
- **Loading Screen**: Elegant count-up animation from 0 to 100 with smooth fade transition
- **Responsive Design**: Mobile-first approach with clean, modern aesthetics
- **Smooth Animations**: Powered by Framer Motion for fluid user interactions
- **Custom Cursor**: Physics-based cursor with smooth movement and interactions
- **Component-Based Architecture**: Well-structured, reusable components
- **TypeScript**: Full type safety throughout the application
- **Clean Code**: Following best practices and modern development standards

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font**: Inter (Google Fonts)

## Project Structure

```
src/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── project/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
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
│   ├── constants.ts
│   └── utils.ts
└── public/
    └── projects/
        ├── mobile-banking-app.svg
        ├── ecommerce-platform.svg
        └── ... (project images)
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Components

### 3D Gallery (Hero)
- Interactive WebGL-powered photo gallery using Three.js
- Clickable project images that navigate to individual project pages
- Multi-input support (mouse wheel, keyboard, touch/pinch gestures)
- Auto-play functionality with physics-based animations
- Fallback for non-WebGL devices

### Project Pages
- Dynamic routing for individual project pages (`/project/[slug]`)
- Detailed project information with sections
- Navigation between projects
- Responsive design with smooth animations

### Projects Grid
- Comprehensive projects page (`/projects`)
- Grid layout showcasing all projects
- Hover effects and smooth transitions
- Direct links to individual project pages

### LoadingScreen
- Displays a count-up animation from 0 to 100
- Smooth fade transition to main content
- Session-based loading (shows only once per session)

### Navigation
- Fixed header with smooth reveal animation
- Projects and About page links
- Responsive mobile menu
- Mix-blend-exclusion for visibility over any background

### SmoothCursor
- Custom cursor with physics-based movement
- Desktop-only with mobile detection
- Rotation based on velocity and direction
- Scale animations on interaction

### CountUp
- Reusable counter component with spring animations
- Configurable duration, direction, and formatting
- Uses Framer Motion for smooth transitions

## Design Philosophy

The website embodies Piyusha's design philosophy of creating meaningful, conversation-sparking designs. The clean, minimal aesthetic allows her work and message to take center stage while providing an excellent user experience.

## Adding Your Own Projects

To replace the placeholder projects with your own:

1. **Replace project images**: Add your project images to `public/projects/` folder
2. **Update project data**: Modify the `PROJECT_DATA` array in `src/lib/constants.ts`
3. **Update image paths**: Change the `image` property in each project to match your image filenames

### Project Data Structure
```typescript
{
  id: number,
  slug: string, // URL-friendly project identifier
  title: string,
  description: string,
  image: string, // Path to project image
  role: string,
  year: string,
  category: string,
  sections?: Array<{
    title: string,
    content: string
  }>
}
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
- **Netlify**: Use `npm run build && npm run export` for static export
- **GitHub Pages**: Use static export mode
- **Custom Server**: Use `npm run build && npm run start`

### Environment Variables
Create a `.env.local` file for local development:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **SEO Optimized**: Meta tags, sitemap, and robots.txt
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Error Handling**: Custom error pages and loading states
- **WebGL Fallback**: Graceful degradation for non-WebGL devices

## Browser Support

- Chrome (recommended for best 3D performance)
- Firefox
- Safari
- Edge
- Mobile browsers (with touch/gesture support)

## Future Enhancements

- Contact form integration
- Blog/insights section
- Dark mode toggle
- Advanced analytics integration
- Progressive Web App (PWA) features
- Content Management System (CMS) integration