import { Question } from '../types';

/**
 * 标准化的7点李克特量表选项
 */
const standardOptions = [
    "Strongly Agree",
    "Agree",
    "Somewhat Agree",
    "Neutral",
    "Somewhat Disagree",
    "Disagree",
    "Strongly Disagree"
];

/**
 * 职场关系评测问题列表
 * 涵盖8个职场心理学维度，共16个问题
 */
export const workplaceQuestions: Question[] = [
    // Trust & Reliability (信任与可靠性) - 核心基础
    {
        id: 1,
        text: "I can rely on this colleague to deliver on their commitments and meet deadlines consistently.",
        options: standardOptions,
        category: "Trust & Reliability",
        weight: 1.5
    },
    {
        id: 2,
        text: "This colleague is honest and transparent in their professional interactions, even when delivering difficult news.",
        options: standardOptions,
        category: "Trust & Reliability",
        weight: 1.5
    },

    // Professional Collaboration (专业协作)
    {
        id: 3,
        text: "This colleague actively contributes to our collaborative projects and shares workload fairly.",
        options: standardOptions,
        category: "Professional Collaboration",
        weight: 1.3
    },
    {
        id: 4,
        text: "Working with this colleague on projects is productive and they are receptive to different approaches.",
        options: standardOptions,
        category: "Professional Collaboration",
        weight: 1.3
    },

    // Communication Effectiveness (沟通效率)
    {
        id: 5,
        text: "This colleague communicates clearly and provides timely responses to work-related matters.",
        options: standardOptions,
        category: "Communication Effectiveness",
        weight: 1.2
    },
    {
        id: 6,
        text: "We can have constructive professional discussions, even when we have different perspectives on work matters.",
        options: standardOptions,
        category: "Communication Effectiveness",
        weight: 1.2
    },

    // Professional Boundaries (职业边界)
    {
        id: 7,
        text: "This colleague respects my work-life balance and doesn't expect responses outside of work hours unreasonably.",
        options: standardOptions,
        category: "Professional Boundaries",
        weight: 1.4
    },
    {
        id: 8,
        text: "This colleague maintains appropriate professional boundaries and doesn't overstep their role or authority.",
        options: standardOptions,
        category: "Professional Boundaries",
        weight: 1.4
    },

    // Team Contribution (团队贡献)
    {
        id: 9,
        text: "This colleague actively contributes ideas and solutions that benefit the team.",
        options: standardOptions,
        category: "Team Contribution",
        weight: 1.1
    },
    {
        id: 10,
        text: "This colleague celebrates team successes and gives credit where it's due.",
        options: standardOptions,
        category: "Team Contribution",
        weight: 1.1
    },

    // Conflict Management (冲突管理)
    {
        id: 11,
        text: "When workplace disagreements arise, this colleague addresses them professionally and seeks constructive solutions.",
        options: standardOptions,
        category: "Conflict Management",
        weight: 1.2
    },
    {
        id: 12,
        text: "This colleague can handle critical feedback without becoming defensive or retaliatory.",
        options: standardOptions,
        category: "Conflict Management",
        weight: 1.2
    },

    // Mutual Support (互助支持)
    {
        id: 13,
        text: "This colleague is willing to help when I face work challenges, even when not directly their responsibility.",
        options: standardOptions,
        category: "Mutual Support",
        weight: 1.1
    },
    {
        id: 14,
        text: "Our working relationship feels balanced - both of us contribute and support each other professionally.",
        options: standardOptions,
        category: "Mutual Support",
        weight: 1.1
    },

    // Professional Growth (职业成长)
    {
        id: 15,
        text: "This colleague shares knowledge and expertise that helps me grow professionally.",
        options: standardOptions,
        category: "Professional Growth",
        weight: 1.0
    },
    {
        id: 16,
        text: "Working with this colleague has positively impacted my skills and career development.",
        options: standardOptions,
        category: "Professional Growth",
        weight: 1.0
    }
];
