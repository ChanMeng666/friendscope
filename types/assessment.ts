export interface AssessmentResult {
    id: string;
    assessmentType: string;           // 评测类型标识符 'friendship' | 'family' | 'workplace'
    date: string;
    targetName: string;                // 评测对象名称（朋友/家人/同事等）
    friendName?: string;               // 向后兼容字段（已废弃，使用 targetName）
    notes: string;
    overallScore: number;
    categoryScores: Record<string, number>;
    assessment: {
        threshold: number;
        message: string;
        recommendation: string;
        level?: 'excellent' | 'good' | 'concerning' | 'unhealthy' | 'toxic';  // 健康等级
    };
}
