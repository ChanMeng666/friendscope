'use client'

import { motion } from 'framer-motion';
import { getAssessmentConfig } from '@/lib/assessments/registry';
import { AssessmentResult } from '@/types/assessment';
import { Trophy, Heart, Star } from 'lucide-react';

interface ShareCardProps {
    assessment: AssessmentResult;
    showName?: boolean; // Whether to show person's name (for privacy)
}

export const ShareCard = ({ assessment, showName = false }: ShareCardProps) => {
    const config = getAssessmentConfig(assessment.assessmentType || 'friendship');
    if (!config) return null;

    const Icon = config.icon;
    const score = Math.round(assessment.overallScore);

    // Get score color
    const getScoreColor = () => {
        if (score >= 85) return 'from-green-400 to-green-600';
        if (score >= 70) return 'from-blue-400 to-blue-600';
        if (score >= 50) return 'from-yellow-400 to-yellow-600';
        return 'from-red-400 to-red-600';
    };

    // Get score label
    const getScoreLabel = () => {
        if (score >= 85) return 'Excellent';
        if (score >= 70) return 'Good';
        if (score >= 50) return 'Fair';
        return 'Needs Attention';
    };

    // Get top 3 categories
    const topCategories = Object.entries(assessment.categoryScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3);

    return (
        <div
            id="share-card"
            className="w-[600px] h-[800px] bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl shadow-2xl flex flex-col"
            style={{ fontFamily: 'system-ui, sans-serif' }}
        >
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${config.color.gradient} flex items-center justify-center`}>
                        <Icon className="w-10 h-10 text-white" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {config.name}
                </h1>
                {showName && (
                    <p className="text-lg text-gray-600">
                        {assessment.targetName || assessment.friendName}
                    </p>
                )}
            </div>

            {/* Score Display */}
            <div className="flex-1 flex flex-col items-center justify-center mb-8">
                <motion.div
                    className="relative mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                >
                    {/* Outer ring */}
                    <div className="w-64 h-64 rounded-full border-8 border-gray-200 flex items-center justify-center relative">
                        {/* Inner gradient circle */}
                        <div className={`w-56 h-56 rounded-full bg-gradient-to-br ${getScoreColor()} flex items-center justify-center shadow-xl`}>
                            <div className="text-center">
                                <div className="text-7xl font-bold text-white mb-2">
                                    {score}%
                                </div>
                                <div className="text-xl text-white/90 font-medium">
                                    {getScoreLabel()}
                                </div>
                            </div>
                        </div>

                        {/* Decorative stars */}
                        {[...Array(score >= 85 ? 3 : 0)].map((_, i) => (
                            <Star
                                key={i}
                                className="absolute w-8 h-8 text-yellow-400 fill-yellow-400"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${i * 120}deg) translateY(-140px)`
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Top Categories */}
                <div className="w-full bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Top Strengths
                    </h3>
                    <div className="space-y-3">
                        {topCategories.map(([category, catScore], index) => (
                            <div key={category} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 font-medium">{category}</span>
                                </div>
                                <span className="text-lg font-bold text-gray-800">
                                    {Math.round(catScore)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center border-t border-gray-300 pt-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        FriendScope
                    </span>
                </div>
                <p className="text-sm text-gray-600">
                    Scientific Relationship Assessment
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    friendscope.vercel.app
                </p>
            </div>
        </div>
    );
};
