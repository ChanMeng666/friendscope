// GEO Analytics - Generative Engine Optimization Tracking
// This module helps track AI referrals and GEO performance metrics

interface GEOMetrics {
  aiReferrals: {
    source: string;
    timestamp: Date;
    userAgent?: string;
    query?: string;
  }[];
  assessmentCompletions: {
    source: string;
    completionRate: number;
    timestamp: Date;
  }[];
  queryPerformance: {
    query: string;
    mentions: number;
    position: number;
    timestamp: Date;
  }[];
}

class GEOAnalytics {
  private metrics: GEOMetrics;
  private storageKey = 'friendscope-geo-metrics';

  constructor() {
    this.metrics = this.loadMetrics();
  }

  private loadMetrics(): GEOMetrics {
    if (typeof window === 'undefined') {
      return { aiReferrals: [], assessmentCompletions: [], queryPerformance: [] };
    }
    
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : { aiReferrals: [], assessmentCompletions: [], queryPerformance: [] };
    } catch {
      return { aiReferrals: [], assessmentCompletions: [], queryPerformance: [] };
    }
  }

  private saveMetrics(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.metrics));
    }
  }

  // Detect and track AI referrals
  trackAIReferral(customSource?: string): void {
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent.toLowerCase();
    const referrer = document.referrer.toLowerCase();
    
    let source = customSource || 'unknown';
    
    // Detect AI sources from user agent and referrer
    if (userAgent.includes('gptbot') || referrer.includes('openai')) {
      source = 'ChatGPT';
    } else if (userAgent.includes('claudebot') || referrer.includes('anthropic')) {
      source = 'Claude';
    } else if (userAgent.includes('bard') || referrer.includes('bard.google')) {
      source = 'Bard';
    } else if (userAgent.includes('perplexity') || referrer.includes('perplexity')) {
      source = 'Perplexity';
    } else if (referrer.includes('you.com')) {
      source = 'You.com';
    }

    this.metrics.aiReferrals.push({
      source,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      query: this.extractQuery()
    });

    this.saveMetrics();
    this.reportToAnalytics('ai_referral', { source });
  }

  // Track assessment completion rates from AI sources
  trackAssessmentCompletion(source: string, completed: boolean): void {
    const existingEntry = this.metrics.assessmentCompletions.find(
      entry => entry.source === source && 
      new Date().getTime() - new Date(entry.timestamp).getTime() < 24 * 60 * 60 * 1000 // Same day
    );

    if (existingEntry) {
      // Update completion rate
      existingEntry.completionRate = completed ? 1 : 0;
    } else {
      this.metrics.assessmentCompletions.push({
        source,
        completionRate: completed ? 1 : 0,
        timestamp: new Date()
      });
    }

    this.saveMetrics();
    this.reportToAnalytics('assessment_completion', { source, completed });
  }

  // Track query performance and AI mentions
  trackQueryPerformance(query: string, mentions: number, position: number): void {
    this.metrics.queryPerformance.push({
      query,
      mentions,
      position,
      timestamp: new Date()
    });

    this.saveMetrics();
    this.reportToAnalytics('query_performance', { query, mentions, position });
  }

  // Extract search query from URL parameters
  private extractQuery(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || urlParams.get('query') || urlParams.get('search') || undefined;
  }

  // Send data to analytics service (can be extended with actual analytics integration)
  private reportToAnalytics(event: string, data: Record<string, unknown>): void {
    // Integration point for analytics services like Google Analytics, Mixpanel, etc.
    if (typeof window !== 'undefined') {
      const windowWithGtag = window as Window & {
        gtag?: (command: string, event: string, options: Record<string, unknown>) => void;
      };
      
      if (windowWithGtag.gtag) {
        windowWithGtag.gtag('event', event, {
          custom_parameter: data,
          event_category: 'GEO',
          event_label: 'AI_Optimization'
        });
      }
    }
  }

  // Get GEO performance summary
  getGEOSummary(): {
    totalAIReferrals: number;
    topAISources: { source: string; count: number }[];
    averageCompletionRate: number;
    topQueries: { query: string; performance: number }[];
  } {
    const totalAIReferrals = this.metrics.aiReferrals.length;
    
    // Calculate top AI sources
    const sourceCount = this.metrics.aiReferrals.reduce((acc, referral) => {
      acc[referral.source] = (acc[referral.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topAISources = Object.entries(sourceCount)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate average completion rate
    const completions = this.metrics.assessmentCompletions;
    const averageCompletionRate = completions.length > 0
      ? completions.reduce((sum, entry) => sum + entry.completionRate, 0) / completions.length
      : 0;

    // Calculate top performing queries
    const queryPerformance = this.metrics.queryPerformance.reduce((acc, query) => {
      if (!acc[query.query]) {
        acc[query.query] = { mentions: 0, positions: [] };
      }
      acc[query.query].mentions += query.mentions;
      acc[query.query].positions.push(query.position);
      return acc;
    }, {} as Record<string, { mentions: number; positions: number[] }>);

    const topQueries = Object.entries(queryPerformance)
      .map(([query, data]) => ({
        query,
        performance: data.mentions / (data.positions.reduce((sum, pos) => sum + pos, 0) / data.positions.length || 1)
      }))
      .sort((a, b) => b.performance - a.performance)
      .slice(0, 10);

    return {
      totalAIReferrals,
      topAISources,
      averageCompletionRate,
      topQueries
    };
  }

  // Initialize GEO tracking on page load
  init(): void {
    if (typeof window === 'undefined') return;

    // Track initial page load as potential AI referral
    this.trackAIReferral();

    // Set up assessment completion tracking
    window.addEventListener('beforeunload', () => {
      const currentPath = window.location.pathname;
      if (currentPath === '/results') {
        // User reached results page - assessment completed
        const lastReferral = this.metrics.aiReferrals[this.metrics.aiReferrals.length - 1];
        if (lastReferral) {
          this.trackAssessmentCompletion(lastReferral.source, true);
        }
      }
    });
  }
}

// Export singleton instance
export const geoAnalytics = new GEOAnalytics();

// Utility functions for easy integration
export const trackAIVisit = (source?: string) => geoAnalytics.trackAIReferral(source);
export const trackAssessmentSuccess = (source: string) => geoAnalytics.trackAssessmentCompletion(source, true);
export const getGEOInsights = () => geoAnalytics.getGEOSummary();

// Auto-initialize on client side
if (typeof window !== 'undefined') {
  geoAnalytics.init();
}
