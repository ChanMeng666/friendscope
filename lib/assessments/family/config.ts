import { Users } from 'lucide-react';
import { AssessmentConfig } from '../types';
import { familyQuestions } from './questions';
import { familyCategories, familyCategoryDetails } from './categories';

/**
 * 家庭关系评测完整配置
 */
export const familyConfig: AssessmentConfig = {
    // 基本信息
    type: 'family',
    name: 'Family Relationship Assessment',
    description: 'Evaluate your family relationships across key psychological dimensions',
    icon: Users,

    // 主题配置
    color: {
        primary: 'text-green-600',
        gradient: 'from-green-500 to-emerald-600',
        lightBg: 'bg-green-50'
    },

    // 评测内容
    questions: familyQuestions,
    categories: familyCategories,
    categoryDetails: familyCategoryDetails,

    // 健康评估阈值
    healthThresholds: [
        {
            level: 'excellent',
            threshold: 85,
            message: 'This is a highly healthy and supportive family relationship.',
            recommendation: 'Continue nurturing this valuable connection.'
        },
        {
            level: 'good',
            threshold: 70,
            message: 'This is a generally healthy family relationship with room for growth.',
            recommendation: 'Address specific concerns while appreciating the positive aspects.'
        },
        {
            level: 'concerning',
            threshold: 50,
            message: 'There are significant concerns in this family relationship.',
            recommendation: 'Consider having an honest conversation or seeking family counseling.'
        },
        {
            level: 'unhealthy',
            threshold: 30,
            message: 'This family relationship shows signs of being unhealthy.',
            recommendation: 'Consider whether professional support or setting stronger boundaries is needed.'
        },
        {
            level: 'toxic',
            threshold: 0,
            message: 'This relationship shows signs of being toxic.',
            recommendation: 'For your well-being, consider limiting contact or seeking professional guidance.'
        }
    ],

    // UI 配置
    estimatedTime: '5-7 minutes',
    targetEntity: 'Family Member'
};
