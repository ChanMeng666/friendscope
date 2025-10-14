import { create } from 'zustand'
import { Question } from './assessments/types'
import { getAssessmentConfig } from './assessments/registry'

interface AssessmentState {
    assessmentType: string | null;                      // 当前评测类型
    questions: Question[];                              // 当前问题列表
    currentQuestionIndex: number;                       // 当前问题索引
    answers: Record<number, string>;                    // 用户答案

    // Actions
    initializeAssessment: (type: string) => void;       // 初始化评测（加载配置）
    setAnswer: (questionId: number, answer: string) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
    assessmentType: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},

    // 初始化评测 - 根据类型加载配置
    initializeAssessment: (type: string) => {
        const config = getAssessmentConfig(type);
        if (!config) {
            console.error(`Assessment type "${type}" not found`);
            return;
        }

        set({
            assessmentType: type,
            questions: config.questions,
            currentQuestionIndex: 0,
            answers: {}
        });
    },

    setAnswer: (questionId, answer) => set((state) => ({
        answers: { ...state.answers, [questionId]: answer }
    })),

    nextQuestion: () => set((state) => ({
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
    })),

    previousQuestion: () => set((state) => ({
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
    })),

    resetAssessment: () => set({
        currentQuestionIndex: 0,
        answers: {},
        // 保留 assessmentType 和 questions，不重置它们
    }),
}))
