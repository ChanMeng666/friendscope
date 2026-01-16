import { Question } from '../types';
import { STANDARD_OPTIONS } from '../constants';

/**
 * 恋爱关系评测问题列表
 * 涵盖10个亲密关系心理学维度，共20个问题
 */
export const romanticQuestions: Question[] = [
    // Emotional Intimacy (情感亲密) - 核心基础
    {
        id: 1,
        text: "I feel emotionally safe sharing my deepest thoughts and feelings with my partner.",
        options: STANDARD_OPTIONS,
        category: "Emotional Intimacy",
        weight: 1.5
    },
    {
        id: 2,
        text: "My partner understands and validates my emotions, even when we disagree.",
        options: STANDARD_OPTIONS,
        category: "Emotional Intimacy",
        weight: 1.5
    },

    // Trust & Honesty (信任与诚实)
    {
        id: 3,
        text: "I completely trust my partner and feel secure in our relationship.",
        options: STANDARD_OPTIONS,
        category: "Trust & Honesty",
        weight: 1.5
    },
    {
        id: 4,
        text: "My partner is honest with me, even about difficult topics, and I never feel deceived.",
        options: STANDARD_OPTIONS,
        category: "Trust & Honesty",
        weight: 1.5
    },

    // Communication (沟通质量)
    {
        id: 5,
        text: "We communicate openly about our needs, desires, and concerns without fear of judgment.",
        options: STANDARD_OPTIONS,
        category: "Communication",
        weight: 1.3
    },
    {
        id: 6,
        text: "My partner actively listens to me and makes an effort to understand my perspective.",
        options: STANDARD_OPTIONS,
        category: "Communication",
        weight: 1.3
    },

    // Physical Intimacy (身体亲密)
    {
        id: 7,
        text: "I feel satisfied with the level of physical affection and intimacy in our relationship.",
        options: STANDARD_OPTIONS,
        category: "Physical Intimacy",
        weight: 1.0
    },
    {
        id: 8,
        text: "My partner respects my physical boundaries and we're both comfortable discussing intimacy.",
        options: STANDARD_OPTIONS,
        category: "Physical Intimacy",
        weight: 1.0
    },

    // Conflict Resolution (冲突解决)
    {
        id: 9,
        text: "When we argue, we work towards resolution rather than trying to 'win' the argument.",
        options: STANDARD_OPTIONS,
        category: "Conflict Resolution",
        weight: 1.2
    },
    {
        id: 10,
        text: "After conflicts, we're able to repair our connection and move forward stronger.",
        options: STANDARD_OPTIONS,
        category: "Conflict Resolution",
        weight: 1.2
    },

    // Values & Goals (价值观与目标)
    {
        id: 11,
        text: "Our core values and life goals are aligned and compatible.",
        options: STANDARD_OPTIONS,
        category: "Values & Goals",
        weight: 1.4
    },
    {
        id: 12,
        text: "We support each other's individual goals while working towards shared future aspirations.",
        options: STANDARD_OPTIONS,
        category: "Values & Goals",
        weight: 1.4
    },

    // Personal Space (个人空间)
    {
        id: 13,
        text: "My partner respects my need for personal time and individual interests outside our relationship.",
        options: STANDARD_OPTIONS,
        category: "Personal Space",
        weight: 1.2
    },
    {
        id: 14,
        text: "We maintain a healthy balance between togetherness and independence.",
        options: STANDARD_OPTIONS,
        category: "Personal Space",
        weight: 1.2
    },

    // Mutual Support (相互支持)
    {
        id: 15,
        text: "My partner consistently supports my personal growth and celebrates my achievements.",
        options: STANDARD_OPTIONS,
        category: "Mutual Support",
        weight: 1.3
    },
    {
        id: 16,
        text: "I feel like my partner is my biggest cheerleader during both successes and challenges.",
        options: STANDARD_OPTIONS,
        category: "Mutual Support",
        weight: 1.3
    },

    // Commitment & Future (承诺与未来)
    {
        id: 17,
        text: "I feel secure in my partner's commitment to our relationship and our future together.",
        options: STANDARD_OPTIONS,
        category: "Commitment & Future",
        weight: 1.4
    },
    {
        id: 18,
        text: "We have meaningful conversations about our future and make plans together.",
        options: STANDARD_OPTIONS,
        category: "Commitment & Future",
        weight: 1.4
    },

    // Passion & Romance (激情与浪漫)
    {
        id: 19,
        text: "We maintain romance and excitement in our relationship beyond the initial honeymoon phase.",
        options: STANDARD_OPTIONS,
        category: "Passion & Romance",
        weight: 1.0
    },
    {
        id: 20,
        text: "My partner makes me feel desired, appreciated, and special in our relationship.",
        options: STANDARD_OPTIONS,
        category: "Passion & Romance",
        weight: 1.0
    }
];
