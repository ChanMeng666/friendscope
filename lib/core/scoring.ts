import { Question, HealthThreshold } from '../assessments/types';

/**
 * 通用评分算法
 * 根据答案和问题权重计算类别分数和总分
 */
export const calculateScores = (
    answers: Record<number, string>,
    questions: Question[],
    healthThresholds: HealthThreshold[]
) => {
    // 初始化类别分数数组
    const categoryScores: Record<string, number[]> = {};

    // 获取所有唯一类别
    const categories = Array.from(new Set(questions.map(q => q.category)));
    categories.forEach(category => {
        categoryScores[category] = [];
    });

    // 计算每个问题的分数
    questions.forEach(question => {
        if (answers[question.id]) {
            const optionIndex = question.options.indexOf(answers[question.id]);
            // 计算加权分数：将选项转换为0-100分，然后乘以权重
            const score = ((question.options.length - 1 - optionIndex) / (question.options.length - 1)) * 100 * question.weight;

            if (categoryScores[question.category]) {
                categoryScores[question.category].push(score);
            }
        }
    });

    // 计算每个类别的平均分
    const categoryAverages = Object.entries(categoryScores).reduce((acc, [category, scores]) => {
        if (scores.length > 0) {
            acc[category] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        } else {
            acc[category] = 0;
        }
        return acc;
    }, {} as Record<string, number>);

    // 计算总分（所有类别平均分的平均值）
    const overallScore = Object.values(categoryAverages).reduce((sum, score) => sum + score, 0) /
        Object.keys(categoryAverages).length;

    // 获取健康评估
    const assessment = getHealthAssessment(overallScore, healthThresholds);

    return {
        categoryScores: categoryAverages,
        overallScore,
        assessment
    };
};

/**
 * 根据分数获取健康评估
 */
export const getHealthAssessment = (
    score: number,
    healthThresholds: HealthThreshold[]
) => {
    // 按阈值从高到低排序
    const sortedThresholds = [...healthThresholds].sort((a, b) => b.threshold - a.threshold);

    // 找到第一个满足条件的阈值
    for (const threshold of sortedThresholds) {
        if (score >= threshold.threshold) {
            return {
                threshold: threshold.threshold,
                message: threshold.message,
                recommendation: threshold.recommendation,
                level: threshold.level
            };
        }
    }

    // 默认返回最低级别
    const lowestThreshold = sortedThresholds[sortedThresholds.length - 1];
    return {
        threshold: lowestThreshold.threshold,
        message: lowestThreshold.message,
        recommendation: lowestThreshold.recommendation,
        level: lowestThreshold.level
    };
};

/**
 * 获取类别描述（根据分数）
 */
export const getCategoryDescription = (
    category: string,
    score: number,
    categoryDetails: Record<string, { good: string; bad: string }>
) => {
    const threshold = 70; // 分界线
    return score >= threshold
        ? categoryDetails[category]?.good
        : categoryDetails[category]?.bad;
};
