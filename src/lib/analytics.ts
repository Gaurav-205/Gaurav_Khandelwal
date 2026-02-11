// Privacy-friendly analytics utility
// Tracks user interactions without collecting personal data

interface AnalyticsEvent {
  event: string;
  timestamp: number;
  data?: Record<string, string | number>;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private readonly MAX_EVENTS = 100;
  private readonly STORAGE_KEY = 'portfolio_analytics';

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadEvents();
    }
  }

  private loadEvents(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  }

  private saveEvents(): void {
    try {
      // Keep only the most recent events
      if (this.events.length > this.MAX_EVENTS) {
        this.events = this.events.slice(-this.MAX_EVENTS);
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }

  track(event: string, data?: Record<string, string | number>): void {
    if (typeof window === 'undefined') return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      data,
    };

    this.events.push(analyticsEvent);
    this.saveEvents();

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics:', event, data);
    }
  }

  // Track page views
  trackPageView(page: string): void {
    this.track('page_view', { page });
  }

  // Track project clicks
  trackProjectClick(projectSlug: string, projectTitle: string): void {
    this.track('project_click', { 
      slug: projectSlug, 
      title: projectTitle 
    });
  }

  // Track external link clicks
  trackExternalLink(url: string, label: string): void {
    this.track('external_link', { url, label });
  }

  // Track CTA clicks
  trackCTAClick(cta: string, location: string): void {
    this.track('cta_click', { cta, location });
  }

  // Get analytics summary
  getSummary(): {
    totalEvents: number;
    pageViews: number;
    projectClicks: number;
    externalLinks: number;
    ctaClicks: number;
    topProjects: Array<{ slug: string; count: number }>;
  } {
    const pageViews = this.events.filter(e => e.event === 'page_view').length;
    const projectClicks = this.events.filter(e => e.event === 'project_click').length;
    const externalLinks = this.events.filter(e => e.event === 'external_link').length;
    const ctaClicks = this.events.filter(e => e.event === 'cta_click').length;

    // Calculate top projects
    const projectCounts: Record<string, number> = {};
    this.events
      .filter(e => e.event === 'project_click' && e.data?.slug)
      .forEach(e => {
        const slug = e.data!.slug as string;
        projectCounts[slug] = (projectCounts[slug] || 0) + 1;
      });

    const topProjects = Object.entries(projectCounts)
      .map(([slug, count]) => ({ slug, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalEvents: this.events.length,
      pageViews,
      projectClicks,
      externalLinks,
      ctaClicks,
      topProjects,
    };
  }

  // Clear all analytics data
  clear(): void {
    this.events = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Convenience functions
export const trackPageView = (page: string) => analytics.trackPageView(page);
export const trackProjectClick = (slug: string, title: string) => analytics.trackProjectClick(slug, title);
export const trackExternalLink = (url: string, label: string) => analytics.trackExternalLink(url, label);
export const trackCTAClick = (cta: string, location: string) => analytics.trackCTAClick(cta, location);
