import { LucideIcon } from 'lucide-react';

/**
 * 评测问题接口
 */
export interface Question {
    id: number;
    text: string;
    options: string[];
    category: string;
    weight: number;
}

/**
 * 类别配置接口
 */
export interface CategoryConfig {
    name: string;
    weight: number;
    description: string;
}

/**
 * 类别详细信息接口
 */
export interface CategoryDetail {
    description: string;
    recommendations: {
        low: string[];
        medium: string[];
        high: string[];
    };
}

/**
 * 健康评估阈值接口
 */
export interface HealthThreshold {
    level: 'excellent' | 'good' | 'concerning' | 'unhealthy' | 'toxic';
    threshold: number;
    message: string;
    recommendation: string;
}

/**
 * 评分函数接口
 */
export type ScoringFunction = (answers: Record<number, string>, questions: Question[]) => {
    categoryScores: Record<string, number>;
    overallScore: number;
    assessment: {
        threshold: number;
        message: string;
        recommendation: string;
    };
};

/**
 * 评测配置接口 - 核心配置对象
 */
export interface AssessmentConfig {
    // 基本信息
    type: string;                                      // 评测类型标识符 'friendship' | 'family' | 'workplace'
    name: string;                                       // 显示名称
    description: string;                                // 评测描述
    icon: LucideIcon;                                  // 图标组件

    // 主题配置
    color: {
        primary: string;                                // 主色调 (Tailwind class)
        gradient: string;                               // 渐变色 (Tailwind class)
        lightBg: string;                                // 浅色背景
    };

    // 评测内容
    questions: Question[];                              // 问题列表
    categories: CategoryConfig[];                       // 类别配置
    categoryDetails: Record<string, CategoryDetail>;    // 类别详细信息（建议等）

    // 评估配置
    healthThresholds: HealthThreshold[];                // 健康评估阈值

    // 自定义算法（可选）
    scoringAlgorithm?: ScoringFunction;                // 自定义评分算法

    // UI 配置
    estimatedTime?: string;                             // 预计完成时间
    targetEntity?: string;                              // 评测对象名称（朋友/家人/同事）
}

/**
 * 评测类型注册表接口
 */
export interface AssessmentRegistry {
    [key: string]: AssessmentConfig;
}
