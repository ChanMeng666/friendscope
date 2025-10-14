import { AssessmentResult } from '@/types/assessment';
import { differenceInDays } from 'date-fns';

/**
 * Calculate days since assessment
 */
export const getDaysSinceAssessment = (assessment: AssessmentResult): number => {
    return differenceInDays(new Date(), new Date(assessment.date));
};

/**
 * Check if assessment needs retesting
 */
export const needsRetest = (assessment: AssessmentResult, thresholdDays: number = 90): boolean => {
    const days = getDaysSinceAssessment(assessment);
    return days >= thresholdDays;
};

/**
 * Get retest status with message
 */
export const getRetestStatus = (assessment: AssessmentResult): {
    needsRetest: boolean;
    daysSince: number;
    message: string;
    urgency: 'none' | 'low' | 'medium' | 'high';
} => {
    const daysSince = getDaysSinceAssessment(assessment);

    if (daysSince >= 180) {
        return {
            needsRetest: true,
            daysSince,
            message: 'Long overdue for retest',
            urgency: 'high'
        };
    }

    if (daysSince >= 120) {
        return {
            needsRetest: true,
            daysSince,
            message: 'Consider retesting soon',
            urgency: 'medium'
        };
    }

    if (daysSince >= 90) {
        return {
            needsRetest: true,
            daysSince,
            message: 'Due for retest',
            urgency: 'low'
        };
    }

    return {
        needsRetest: false,
        daysSince,
        message: 'Recent assessment',
        urgency: 'none'
    };
};

/**
 * Get color class based on urgency
 */
export const getUrgencyColor = (urgency: 'none' | 'low' | 'medium' | 'high'): string => {
    switch (urgency) {
        case 'high':
            return 'bg-red-100 text-red-700 border-red-300';
        case 'medium':
            return 'bg-orange-100 text-orange-700 border-orange-300';
        case 'low':
            return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        default:
            return 'bg-green-100 text-green-700 border-green-300';
    }
};

/**
 * Format days message
 */
export const formatDaysMessage = (days: number): string => {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    if (days < 60) return 'About a month ago';
    if (days < 90) return `About ${Math.round(days / 30)} months ago`;
    if (days < 365) return `${Math.round(days / 30)} months ago`;
    const years = Math.floor(days / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
};
