import { Briefcase } from 'lucide-react';
import { AssessmentConfig } from '../types';
import { workplaceQuestions } from './questions';
import { workplaceCategories, workplaceCategoryDetails } from './categories';

/**
 * 职场关系评测完整配置
 */
export const workplaceConfig: AssessmentConfig = {
    // 基本信息
    type: 'workplace',
    name: 'Workplace Relationship Assessment',
    description: 'Evaluate your professional relationships across key workplace dimensions',
    icon: Briefcase,

    // 主题配置
    color: {
        primary: 'text-orange-600',
        gradient: 'from-orange-500 to-amber-600',
        lightBg: 'bg-orange-50'
    },

    // 评测内容
    questions: workplaceQuestions,
    categories: workplaceCategories,
    categoryDetails: workplaceCategoryDetails,

    // 健康评估阈值
    healthThresholds: [
        {
            level: 'excellent',
            threshold: 85,
            message: 'This is an exceptionally healthy and productive workplace relationship.',
            recommendation: 'Continue fostering this valuable professional connection.'
        },
        {
            level: 'good',
            threshold: 70,
            message: 'This is a generally positive workplace relationship with room for improvement.',
            recommendation: 'Address specific concerns while maintaining professional standards.'
        },
        {
            level: 'concerning',
            threshold: 50,
            message: 'There are significant concerns in this workplace relationship.',
            recommendation: 'Consider addressing issues directly or involving HR if appropriate.'
        },
        {
            level: 'unhealthy',
            threshold: 30,
            message: 'This workplace relationship shows signs of being unhealthy.',
            recommendation: 'Consider setting stronger boundaries or seeking support from management.'
        },
        {
            level: 'toxic',
            threshold: 0,
            message: 'This relationship shows signs of being toxic to your professional well-being.',
            recommendation: 'Consider documenting concerns and seeking HR support or alternative arrangements.'
        }
    ],

    // UI 配置
    estimatedTime: '5-7 minutes',
    targetEntity: 'Colleague'
};
