'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getGEOInsights } from '@/lib/geo-analytics';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Target,
  Search,
  RefreshCw,
  Bot,
  BarChart3,
  CheckCircle
} from 'lucide-react';

interface GEOInsights {
  totalAIReferrals: number;
  topAISources: { source: string; count: number }[];
  averageCompletionRate: number;
  topQueries: { query: string; performance: number }[];
}

export const GEODashboard = () => {
  const [insights, setInsights] = useState<GEOInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const data = getGEOInsights();
      setInsights(data);
    } catch (error) {
      console.error('Failed to load GEO insights:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'chatgpt':
        return '🤖';
      case 'claude':
        return '🧠';
      case 'bard':
        return '🔍';
      case 'perplexity':
        return '🔮';
      default:
        return '🌐';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading GEO insights...</span>
      </div>
    );
  }

  if (!insights) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center">
            <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No GEO Data Available</h3>
            <p className="text-muted-foreground mb-4">
              Start receiving AI referrals to see performance metrics here.
            </p>
            <Button onClick={loadInsights} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">GEO Performance Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor AI referrals and generative engine optimization metrics
          </p>
        </div>
        <Button onClick={loadInsights} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total AI Referrals</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insights.totalAIReferrals}</div>
              <p className="text-xs text-muted-foreground">
                From AI-powered search engines
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(insights.averageCompletionRate * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                AI visitors completing assessment
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top AI Sources</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insights.topAISources.length}</div>
              <p className="text-xs text-muted-foreground">
                Different AI platforms referring users
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Query Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insights.topQueries.length}</div>
              <p className="text-xs text-muted-foreground">
                Tracked query terms
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Sources Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              AI Source Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {insights.topAISources.length > 0 ? (
              <div className="space-y-4">
                {insights.topAISources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getSourceIcon(source.source)}</span>
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{source.count} referrals</Badge>
                      <div className="w-20 bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ 
                            width: `${(source.count / insights.topAISources[0].count) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No AI sources tracked yet. Data will appear as users visit from AI platforms.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Performing Queries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Top Performing Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {insights.topQueries.length > 0 ? (
              <div className="space-y-3">
                {insights.topQueries.slice(0, 5).map((query) => (
                  <div key={query.query} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{query.query}</span>
                    <Badge 
                      variant="outline"
                      className={`${query.performance > 5 ? 'border-green-500 text-green-700' : 'border-gray-300'}`}
                    >
                      Score: {query.performance.toFixed(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No query performance data available yet. Metrics will appear as AI engines reference the site.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Optimization Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Target className="h-5 w-5" />
              GEO Optimization Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-900">Improve AI Visibility</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Update llms.txt with latest features</li>
                  <li>• Add more structured data markup</li>
                  <li>• Create AI-friendly content summaries</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-900">Boost Completion Rates</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Optimize assessment flow for AI users</li>
                  <li>• Add clear value propositions</li>
                  <li>• Implement progressive disclosure</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default GEODashboard;
