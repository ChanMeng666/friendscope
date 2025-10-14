import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AssessmentResult } from '@/types/assessment'

interface HistoryState {
    assessments: AssessmentResult[];

    // Basic CRUD operations
    addAssessment: (assessment: AssessmentResult) => void;
    removeAssessment: (id: string) => void;
    clearHistory: () => void;
    getAssessment: (id: string) => AssessmentResult | undefined;

    // Type-based filtering
    getAssessmentsByType: (type: string) => AssessmentResult[];
    clearHistoryByType: (type: string) => void;

    // Statistics
    getAssessmentCount: () => number;
    getAssessmentCountByType: (type: string) => number;
    getUniqueTypes: () => string[];
}

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set, get) => ({
            assessments: [],

            // 添加评测结果
            addAssessment: (assessment) =>
                set((state) => ({
                    assessments: [assessment, ...state.assessments].slice(0, 50) // Keep last 50 assessments
                })),

            // 删除指定评测
            removeAssessment: (id) =>
                set((state) => ({
                    assessments: state.assessments.filter((a) => a.id !== id)
                })),

            // 清空所有历史
            clearHistory: () => set({ assessments: [] }),

            // 获取指定评测
            getAssessment: (id) => get().assessments.find((a) => a.id === id),

            // 按类型筛选评测
            getAssessmentsByType: (type) =>
                get().assessments.filter((a) => a.assessmentType === type),

            // 清空指定类型的历史
            clearHistoryByType: (type) =>
                set((state) => ({
                    assessments: state.assessments.filter((a) => a.assessmentType !== type)
                })),

            // 获取评测总数
            getAssessmentCount: () => get().assessments.length,

            // 获取指定类型的评测数量
            getAssessmentCountByType: (type) =>
                get().assessments.filter((a) => a.assessmentType === type).length,

            // 获取所有唯一的评测类型
            getUniqueTypes: () => {
                const types = new Set(get().assessments.map((a) => a.assessmentType));
                return Array.from(types);
            }
        }),
        {
            name: 'friendship-assessment-history',
            // 数据迁移：为旧数据添加默认的 assessmentType
            migrate: (persistedState: unknown, _version: number) => {
                if (persistedState && typeof persistedState === 'object' && 'assessments' in persistedState) {
                    const state = persistedState as { assessments: AssessmentResult[] };
                    state.assessments = state.assessments.map((assessment: AssessmentResult) => {
                        // 如果没有 assessmentType，默认设置为 'friendship'
                        if (!assessment.assessmentType) {
                            return {
                                ...assessment,
                                assessmentType: 'friendship',
                                targetName: assessment.friendName || assessment.targetName
                            };
                        }
                        return assessment;
                    });
                }
                return persistedState;
            }
        }
    )
)
