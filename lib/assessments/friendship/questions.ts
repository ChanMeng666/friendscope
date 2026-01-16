import { Question } from '../types';
import { STANDARD_OPTIONS } from '../constants';

/**
 * 友谊评测问题列表
 * 涵盖10个心理学维度，共20个问题
 */
export const friendshipQuestions: Question[] = [
    // Trust & Honesty (核心基础)
    {
        id: 1,
        text: "I can trust this friend with sensitive personal information without worrying about it being shared with others.",
        options: STANDARD_OPTIONS,
        category: "Trust & Honesty",
        weight: 1.5
    },
    {
        id: 2,
        text: "This friend has been consistently honest with me, even in difficult situations.",
        options: STANDARD_OPTIONS,
        category: "Trust & Honesty",
        weight: 1.5
    },

    // Emotional Support (情感支持)
    {
        id: 3,
        text: "When I'm going through tough times, this friend shows genuine concern and offers meaningful support.",
        options: STANDARD_OPTIONS,
        category: "Emotional Support",
        weight: 1.2
    },
    {
        id: 4,
        text: "This friend celebrates my successes without showing signs of jealousy or competition.",
        options: STANDARD_OPTIONS,
        category: "Emotional Support",
        weight: 1.2
    },

    // Communication (沟通质量)
    {
        id: 5,
        text: "Our conversations go beyond small talk and include meaningful exchanges about personal growth and challenges.",
        options: STANDARD_OPTIONS,
        category: "Communication",
        weight: 1.0
    },
    {
        id: 6,
        text: "We can have respectful discussions even when we disagree on important topics.",
        options: STANDARD_OPTIONS,
        category: "Communication",
        weight: 1.0
    },

    // Boundaries (边界感)
    {
        id: 7,
        text: "This friend respects my personal boundaries and doesn't make me feel guilty for saying 'no'.",
        options: STANDARD_OPTIONS,
        category: "Boundaries",
        weight: 1.3
    },
    {
        id: 8,
        text: "I feel comfortable setting limits in our friendship without fear of negative consequences.",
        options: STANDARD_OPTIONS,
        category: "Boundaries",
        weight: 1.3
    },

    // Reciprocity (互惠性)
    {
        id: 9,
        text: "Our friendship feels balanced in terms of giving and receiving support.",
        options: STANDARD_OPTIONS,
        category: "Reciprocity",
        weight: 1.1
    },
    {
        id: 10,
        text: "This friend makes an effort to maintain our friendship, not just when they need something.",
        options: STANDARD_OPTIONS,
        category: "Reciprocity",
        weight: 1.1
    },

    // Conflict Resolution (冲突处理)
    {
        id: 11,
        text: "When conflicts arise, this friend is willing to discuss issues calmly and work towards resolution.",
        options: STANDARD_OPTIONS,
        category: "Conflict Resolution",
        weight: 1.2
    },
    {
        id: 12,
        text: "Past disagreements have been resolved in a way that strengthened our friendship.",
        options: STANDARD_OPTIONS,
        category: "Conflict Resolution",
        weight: 1.2
    },

    // Growth & Development (成长空间)
    {
        id: 13,
        text: "This friendship encourages personal growth and supports my goals and aspirations.",
        options: STANDARD_OPTIONS,
        category: "Growth & Development",
        weight: 1.0
    },
    {
        id: 14,
        text: "I feel inspired and motivated after spending time with this friend.",
        options: STANDARD_OPTIONS,
        category: "Growth & Development",
        weight: 1.0
    },

    // Values Alignment (价值观契合)
    {
        id: 15,
        text: "Our core values and ethical principles are generally aligned.",
        options: STANDARD_OPTIONS,
        category: "Values Alignment",
        weight: 1.4
    },
    {
        id: 16,
        text: "This friend's behavior consistently reflects the values they claim to hold.",
        options: STANDARD_OPTIONS,
        category: "Values Alignment",
        weight: 1.4
    },

    // Respect & Recognition (尊重认可)
    {
        id: 17,
        text: "This friend shows genuine respect for my opinions and life choices, even when different from theirs.",
        options: STANDARD_OPTIONS,
        category: "Respect & Recognition",
        weight: 1.2
    },
    {
        id: 18,
        text: "I feel valued and appreciated in this friendship, not taken for granted.",
        options: STANDARD_OPTIONS,
        category: "Respect & Recognition",
        weight: 1.2
    },

    // Reliability (可靠性)
    {
        id: 19,
        text: "This friend follows through on commitments and keeps their promises.",
        options: STANDARD_OPTIONS,
        category: "Reliability",
        weight: 1.3
    },
    {
        id: 20,
        text: "I can count on this friend to be there for me in times of real need.",
        options: STANDARD_OPTIONS,
        category: "Reliability",
        weight: 1.3
    }
];
