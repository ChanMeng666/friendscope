import { HeartHandshake } from 'lucide-react';
import { AssessmentConfig } from '../types';
import { romanticQuestions } from './questions';
import { romanticCategories, romanticCategoryDetails } from './categories';

/**
 * 恋爱关系评测完整配置
 */
export const romanticConfig: AssessmentConfig = {
    // 基本信息
    type: 'romantic',
    name: 'Romantic Relationship Assessment',
    description: 'Evaluate your romantic relationship across key dimensions of intimacy and connection',
    icon: HeartHandshake,

    // 主题配置
    color: {
        primary: 'text-pink-600',
        gradient: 'from-pink-500 to-rose-600',
        lightBg: 'bg-pink-50'
    },

    // 评测内容
    questions: romanticQuestions,
    categories: romanticCategories,
    categoryDetails: romanticCategoryDetails,

    // 健康评估阈值
    healthThresholds: [
        {
            level: 'excellent',
            threshold: 85,
            message: 'This is a deeply healthy and fulfilling romantic relationship.',
            recommendation: 'Continue nurturing this beautiful connection.'
        },
        {
            level: 'good',
            threshold: 70,
            message: 'This is a generally healthy relationship with opportunities for growth.',
            recommendation: 'Address specific areas while celebrating the strong foundation you have.'
        },
        {
            level: 'concerning',
            threshold: 50,
            message: 'There are significant concerns that need attention in this relationship.',
            recommendation: 'Consider couples counseling to address issues before they deepen.'
        },
        {
            level: 'unhealthy',
            threshold: 30,
            message: 'This relationship shows signs of being unhealthy.',
            recommendation: 'Seek professional help or seriously consider whether this relationship serves your well-being.'
        },
        {
            level: 'toxic',
            threshold: 0,
            message: 'This relationship shows concerning signs that may be harmful to your well-being.',
            recommendation: 'Consider seeking support from a therapist or counselor to evaluate this relationship and your options.'
        }
    ],

    // UI 配置
    estimatedTime: '6-9 minutes',
    targetEntity: 'Partner'
};
