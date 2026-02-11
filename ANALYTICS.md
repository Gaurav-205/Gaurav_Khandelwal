# Portfolio Analytics

## Overview

This portfolio includes a privacy-friendly, client-side analytics system that tracks user interactions without collecting personal data or sending information to external servers.

## Features

### What We Track

1. **Page Views**: Which pages users visit
2. **Project Clicks**: Which projects get the most attention
3. **External Links**: GitHub, LinkedIn, and other external link clicks
4. **CTA Clicks**: Call-to-action button interactions

### Privacy-First Approach

- ✅ All data stored locally in browser (localStorage)
- ✅ No external analytics services
- ✅ No personal information collected
- ✅ No cookies or tracking pixels
- ✅ No data sent to servers
- ✅ User can clear data anytime

## How It Works

The analytics system uses a singleton pattern with localStorage persistence:

```typescript
import { trackPageView, trackProjectClick, trackExternalLink, trackCTAClick } from '@/lib/analytics';

// Track page views
trackPageView('/projects');

// Track project clicks
trackProjectClick('prank-wizard', 'Prank Wizard');

// Track external links
trackExternalLink('https://github.com/Gaurav-205', 'GitHub');

// Track CTA clicks
trackCTAClick('Send Email', 'About Contact Section');
```

## Viewing Analytics

Open browser console and run:

```javascript
// Get analytics summary
analytics.getSummary();

// Output example:
{
  totalEvents: 42,
  pageViews: 15,
  projectClicks: 12,
  externalLinks: 8,
  ctaClicks: 7,
  topProjects: [
    { slug: 'prank-wizard', count: 5 },
    { slug: 'kampus-kart', count: 4 },
    { slug: 'onam-festival-website', count: 3 }
  ]
}

// Clear all analytics data
analytics.clear();
```

## Implementation Details

### Storage
- Maximum 100 events stored
- Automatic cleanup of old events
- Stored in `localStorage` under key `portfolio_analytics`

### Event Structure
```typescript
{
  event: string;           // Event type
  timestamp: number;       // Unix timestamp
  data?: {                 // Optional event data
    [key: string]: string | number;
  };
}
```

## Benefits

1. **Performance Insights**: Understand which projects resonate with visitors
2. **User Behavior**: See navigation patterns and popular content
3. **Privacy Compliant**: No GDPR/CCPA concerns
4. **Zero Cost**: No analytics service fees
5. **Full Control**: All data stays in your browser

## Future Enhancements

Potential additions:
- Export analytics data as JSON
- Visual dashboard component
- Time-based analytics (daily/weekly trends)
- Session duration tracking
- Scroll depth tracking
