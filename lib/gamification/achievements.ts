import { Trophy, Target, TrendingUp, Heart, Users, Sparkles, Award, Star, Zap, Crown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    category: 'milestone' | 'quality' | 'diversity' | 'improvement' | 'dedication';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    color: string;
    condition: (stats: AchievementStats) => boolean;
    unlockedAt?: Date;
}

export interface AchievementStats {
    totalAssessments: number;
    assessmentsByType: Record<string, number>;
    uniquePeople: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    improvementCount: number; // Number of times score improved on retests
    consecutiveDays: number;
    allTypesCompleted: boolean;
    excellentRelationships: number; // Relationships with score >= 85
}

/**
 * All available achievements in the system
 */
export const ACHIEVEMENTS: Achievement[] = [
    // Milestone Achievements
    {
        id: 'first_step',
        name: 'First Step',
        description: 'Complete your first assessment',
        icon: Sparkles,
        category: 'milestone',
        rarity: 'common',
        color: 'from-blue-400 to-blue-600',
        condition: (stats) => stats.totalAssessments >= 1
    },
    {
        id: 'getting_started',
        name: 'Getting Started',
        description: 'Complete 5 assessments',
        icon: Target,
        category: 'milestone',
        rarity: 'common',
        color: 'from-green-400 to-green-600',
        condition: (stats) => stats.totalAssessments >= 5
    },
    {
        id: 'committed',
        name: 'Committed',
        description: 'Complete 10 assessments',
        icon: Award,
        category: 'milestone',
        rarity: 'rare',
        color: 'from-purple-400 to-purple-600',
        condition: (stats) => stats.totalAssessments >= 10
    },
    {
        id: 'relationship_expert',
        name: 'Relationship Expert',
        description: 'Complete 25 assessments',
        icon: Trophy,
        category: 'milestone',
        rarity: 'epic',
        color: 'from-yellow-400 to-orange-600',
        condition: (stats) => stats.totalAssessments >= 25
    },
    {
        id: 'relationship_master',
        name: 'Relationship Master',
        description: 'Complete 50 assessments',
        icon: Crown,
        category: 'milestone',
        rarity: 'legendary',
        color: 'from-pink-400 to-rose-600',
        condition: (stats) => stats.totalAssessments >= 50
    },

    // Quality Achievements
    {
        id: 'high_achiever',
        name: 'High Achiever',
        description: 'Get a score of 85% or higher on any assessment',
        icon: Star,
        category: 'quality',
        rarity: 'common',
        color: 'from-yellow-400 to-yellow-600',
        condition: (stats) => stats.highestScore >= 85
    },
    {
        id: 'excellence_seeker',
        name: 'Excellence Seeker',
        description: 'Have 3 relationships with scores of 85% or higher',
        icon: Zap,
        category: 'quality',
        rarity: 'rare',
        color: 'from-amber-400 to-amber-600',
        condition: (stats) => stats.excellentRelationships >= 3
    },
    {
        id: 'relationship_champion',
        name: 'Relationship Champion',
        description: 'Maintain an average score of 80% or higher',
        icon: Trophy,
        category: 'quality',
        rarity: 'epic',
        color: 'from-orange-400 to-red-600',
        condition: (stats) => stats.averageScore >= 80
    },

    // Diversity Achievements
    {
        id: 'explorer',
        name: 'Explorer',
        description: 'Try 2 different assessment types',
        icon: Users,
        category: 'diversity',
        rarity: 'common',
        color: 'from-cyan-400 to-cyan-600',
        condition: (stats) => Object.keys(stats.assessmentsByType).length >= 2
    },
    {
        id: 'well_rounded',
        name: 'Well Rounded',
        description: 'Try 3 different assessment types',
        icon: Heart,
        category: 'diversity',
        rarity: 'rare',
        color: 'from-pink-400 to-pink-600',
        condition: (stats) => Object.keys(stats.assessmentsByType).length >= 3
    },
    {
        id: 'relationship_polymath',
        name: 'Relationship Polymath',
        description: 'Complete all assessment types',
        icon: Crown,
        category: 'diversity',
        rarity: 'legendary',
        color: 'from-violet-400 to-purple-600',
        condition: (stats) => stats.allTypesCompleted
    },

    // Improvement Achievements
    {
        id: 'growth_mindset',
        name: 'Growth Mindset',
        description: 'Show improvement on a retested relationship',
        icon: TrendingUp,
        category: 'improvement',
        rarity: 'rare',
        color: 'from-emerald-400 to-emerald-600',
        condition: (stats) => stats.improvementCount >= 1
    },
    {
        id: 'progress_maker',
        name: 'Progress Maker',
        description: 'Show improvement on 3 retested relationships',
        icon: TrendingUp,
        category: 'improvement',
        rarity: 'epic',
        color: 'from-green-400 to-teal-600',
        condition: (stats) => stats.improvementCount >= 3
    },

    // Dedication Achievements
    {
        id: 'social_analyst',
        name: 'Social Analyst',
        description: 'Assess 5 different people',
        icon: Users,
        category: 'dedication',
        rarity: 'common',
        color: 'from-indigo-400 to-indigo-600',
        condition: (stats) => stats.uniquePeople >= 5
    },
    {
        id: 'relationship_network',
        name: 'Relationship Network',
        description: 'Assess 10 different people',
        icon: Users,
        category: 'dedication',
        rarity: 'rare',
        color: 'from-blue-400 to-purple-600',
        condition: (stats) => stats.uniquePeople >= 10
    }
];

/**
 * Get rarity display properties
 */
export const getRarityConfig = (rarity: Achievement['rarity']) => {
    switch (rarity) {
        case 'common':
            return { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Common' };
        case 'rare':
            return { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Rare' };
        case 'epic':
            return { color: 'text-purple-600', bg: 'bg-purple-100', label: 'Epic' };
        case 'legendary':
            return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Legendary' };
    }
};

/**
 * Get category display properties
 */
export const getCategoryConfig = (category: Achievement['category']) => {
    switch (category) {
        case 'milestone':
            return { color: 'text-blue-600', icon: Target, label: 'Milestone' };
        case 'quality':
            return { color: 'text-yellow-600', icon: Star, label: 'Quality' };
        case 'diversity':
            return { color: 'text-pink-600', icon: Heart, label: 'Diversity' };
        case 'improvement':
            return { color: 'text-green-600', icon: TrendingUp, label: 'Improvement' };
        case 'dedication':
            return { color: 'text-purple-600', icon: Users, label: 'Dedication' };
    }
};
