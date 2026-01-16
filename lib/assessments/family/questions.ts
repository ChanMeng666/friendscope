import { Question } from '../types';
import { STANDARD_OPTIONS } from '../constants';

/**
 * 家庭关系评测问题列表
 * 涵盖家庭关系的8个关键维度，共16个问题
 */
export const familyQuestions: Question[] = [
    // Mutual Respect (相互尊重)
    {
        id: 1,
        text: "This family member respects my opinions and decisions, even when they differ from their own.",
        options: STANDARD_OPTIONS,
        category: "Mutual Respect",
        weight: 1.5
    },
    {
        id: 2,
        text: "I feel valued and appreciated for who I am in this relationship.",
        options: STANDARD_OPTIONS,
        category: "Mutual Respect",
        weight: 1.5
    },

    // Communication (沟通)
    {
        id: 3,
        text: "We can have open and honest conversations without fear of judgment.",
        options: STANDARD_OPTIONS,
        category: "Communication",
        weight: 1.3
    },
    {
        id: 4,
        text: "This family member listens actively when I share my thoughts and feelings.",
        options: STANDARD_OPTIONS,
        category: "Communication",
        weight: 1.3
    },

    // Emotional Support (情感支持)
    {
        id: 5,
        text: "I feel emotionally supported by this family member during difficult times.",
        options: STANDARD_OPTIONS,
        category: "Emotional Support",
        weight: 1.4
    },
    {
        id: 6,
        text: "This person celebrates my achievements and shows genuine happiness for my success.",
        options: STANDARD_OPTIONS,
        category: "Emotional Support",
        weight: 1.2
    },

    // Boundaries (边界)
    {
        id: 7,
        text: "This family member respects my personal boundaries and privacy.",
        options: STANDARD_OPTIONS,
        category: "Boundaries",
        weight: 1.3
    },
    {
        id: 8,
        text: "I can set limits without feeling guilty or experiencing negative consequences.",
        options: STANDARD_OPTIONS,
        category: "Boundaries",
        weight: 1.3
    },

    // Trust & Reliability (信任与可靠性)
    {
        id: 9,
        text: "I can rely on this family member to keep their promises and commitments.",
        options: STANDARD_OPTIONS,
        category: "Trust & Reliability",
        weight: 1.4
    },
    {
        id: 10,
        text: "I feel safe sharing personal information with this family member.",
        options: STANDARD_OPTIONS,
        category: "Trust & Reliability",
        weight: 1.4
    },

    // Conflict Resolution (冲突解决)
    {
        id: 11,
        text: "When disagreements arise, we can resolve them in a healthy and constructive manner.",
        options: STANDARD_OPTIONS,
        category: "Conflict Resolution",
        weight: 1.2
    },
    {
        id: 12,
        text: "This family member takes responsibility for their actions and apologizes when necessary.",
        options: STANDARD_OPTIONS,
        category: "Conflict Resolution",
        weight: 1.2
    },

    // Acceptance (接纳)
    {
        id: 13,
        text: "I feel accepted for who I am, without pressure to change to meet their expectations.",
        options: STANDARD_OPTIONS,
        category: "Acceptance",
        weight: 1.5
    },
    {
        id: 14,
        text: "This family member supports my life choices, even if they're different from what they'd choose.",
        options: STANDARD_OPTIONS,
        category: "Acceptance",
        weight: 1.3
    },

    // Quality Time (相处质量)
    {
        id: 15,
        text: "The time we spend together feels meaningful and enjoyable.",
        options: STANDARD_OPTIONS,
        category: "Quality Time",
        weight: 1.1
    },
    {
        id: 16,
        text: "We make an effort to maintain our relationship despite busy schedules.",
        options: STANDARD_OPTIONS,
        category: "Quality Time",
        weight: 1.0
    }
];
