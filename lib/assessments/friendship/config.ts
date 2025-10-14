import { Heart } from 'lucide-react';
import { AssessmentConfig } from '../types';
import { friendshipQuestions } from './questions';
import { friendshipCategories, friendshipCategoryDetails } from './categories';

/**
 * 友谊评测完整配置
 */
export const friendshipConfig: AssessmentConfig = {
    // 基本信息
    type: 'friendship',
    name: 'Friendship Assessment',
    description: 'Evaluate your friendships through scientifically-backed psychological dimensions',
    icon: Heart,

    // 主题配置
    color: {
        primary: 'text-blue-600',
        gradient: 'from-primary to-purple-600',
        lightBg: 'bg-blue-50'
    },

    // 评测内容
    questions: friendshipQuestions,
    categories: friendshipCategories,
    categoryDetails: friendshipCategoryDetails,

    // 健康评估阈值
    healthThresholds: [
        {
            level: 'excellent',
            threshold: 85,
            message: 'This is a highly healthy and valuable friendship.',
            recommendation: 'Continue nurturing this meaningful connection.'
        },
        {
            level: 'good',
            threshold: 70,
            message: 'This is a generally healthy friendship with room for improvement.',
            recommendation: 'Address specific concerns while appreciating the positive aspects.'
        },
        {
            level: 'concerning',
            threshold: 50,
            message: 'There are significant concerns in this friendship.',
            recommendation: 'Consider having an honest discussion about your concerns.'
        },
        {
            level: 'unhealthy',
            threshold: 30,
            message: 'This friendship shows signs of being unhealthy.',
            recommendation: 'Consider whether this friendship is beneficial to your well-being.'
        },
        {
            level: 'toxic',
            threshold: 0,
            message: 'This relationship shows signs of being toxic.',
            recommendation: 'For your well-being, consider ending this friendship.'
        }
    ],

    // UI 配置
    estimatedTime: '5-8 minutes',
    targetEntity: 'Friend'
};
