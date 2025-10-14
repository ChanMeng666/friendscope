import { CategoryConfig, CategoryDetail } from '../types';

/**
 * 友谊评测类别配置
 */
export const friendshipCategories: CategoryConfig[] = [
    { name: "Trust & Honesty", weight: 1.5, description: "Core foundation of trust and honesty" },
    { name: "Emotional Support", weight: 1.2, description: "Quality of emotional connection and support" },
    { name: "Communication", weight: 1.0, description: "Effectiveness and depth of communication" },
    { name: "Boundaries", weight: 1.3, description: "Respect for personal limits and space" },
    { name: "Reciprocity", weight: 1.1, description: "Balance of give and take" },
    { name: "Conflict Resolution", weight: 1.2, description: "How conflicts are handled" },
    { name: "Growth & Development", weight: 1.0, description: "Personal growth support" },
    { name: "Values Alignment", weight: 1.4, description: "Compatibility of core values" },
    { name: "Respect & Recognition", weight: 1.2, description: "Mutual respect and appreciation" },
    { name: "Reliability", weight: 1.3, description: "Consistency and dependability" }
];

/**
 * 友谊评测类别详细信息
 * 包含描述和针对不同分数段的建议
 */
export const friendshipCategoryDetails: Record<string, CategoryDetail> = {
    "Trust & Honesty": {
        description: "Measures the level of trust and honesty in your friendship",
        recommendations: {
            low: [
                "Have an honest conversation about trust issues",
                "Start with small trust-building exercises",
                "Be consistent in keeping your word"
            ],
            medium: [
                "Continue building trust through open communication",
                "Share more personal experiences",
                "Acknowledge and appreciate honest moments"
            ],
            high: [
                "Maintain the strong foundation of trust",
                "Continue being reliable and honest",
                "Help others build trust in their relationships"
            ]
        }
    },
    "Emotional Support": {
        description: "Evaluates the quality of emotional connection and support",
        recommendations: {
            low: [
                "Practice active listening without judgment",
                "Show more empathy during difficult times",
                "Reach out more frequently to check on their well-being"
            ],
            medium: [
                "Deepen emotional conversations",
                "Share your own vulnerabilities",
                "Celebrate their successes more actively"
            ],
            high: [
                "Continue being emotionally available",
                "Help others learn from your supportive friendship",
                "Maintain the balance of giving and receiving support"
            ]
        }
    },
    "Communication": {
        description: "Assesses the effectiveness and depth of communication",
        recommendations: {
            low: [
                "Practice more active listening",
                "Schedule regular check-ins",
                "Work on expressing feelings more clearly"
            ],
            medium: [
                "Explore deeper conversation topics",
                "Practice giving and receiving feedback",
                "Create safe spaces for difficult discussions"
            ],
            high: [
                "Maintain open communication channels",
                "Share communication strategies that work",
                "Continue fostering meaningful dialogue"
            ]
        }
    },
    "Boundaries": {
        description: "Examines respect for personal limits and space",
        recommendations: {
            low: [
                "Clearly communicate your personal boundaries",
                "Learn to say 'no' when necessary",
                "Respect others' time and space"
            ],
            medium: [
                "Review and adjust boundaries as needed",
                "Practice healthy boundary-setting",
                "Discuss expectations openly"
            ],
            high: [
                "Continue respecting established boundaries",
                "Model healthy boundary-setting for others",
                "Help others understand the importance of boundaries"
            ]
        }
    },
    "Reciprocity": {
        description: "Measures the balance of give and take in the friendship",
        recommendations: {
            low: [
                "Track the balance of giving and receiving",
                "Communicate your needs more clearly",
                "Look for opportunities to reciprocate"
            ],
            medium: [
                "Find new ways to contribute to the friendship",
                "Express appreciation more often",
                "Balance asking for and offering help"
            ],
            high: [
                "Maintain the healthy balance",
                "Share strategies for maintaining reciprocity",
                "Continue mutual support patterns"
            ]
        }
    },
    "Conflict Resolution": {
        description: "Evaluates how conflicts and disagreements are handled",
        recommendations: {
            low: [
                "Address conflicts promptly and calmly",
                "Practice active listening during disagreements",
                "Focus on solutions rather than blame"
            ],
            medium: [
                "Develop better conflict resolution skills",
                "Practice compromise and understanding",
                "Learn from past conflicts"
            ],
            high: [
                "Continue using effective resolution strategies",
                "Share conflict resolution techniques",
                "Help others learn from your approach"
            ]
        }
    },
    "Growth & Development": {
        description: "Assesses how the friendship supports personal growth",
        recommendations: {
            low: [
                "Share goals and aspirations",
                "Encourage each other's personal development",
                "Create opportunities for mutual learning"
            ],
            medium: [
                "Set mutual growth goals",
                "Share resources and opportunities",
                "Celebrate personal achievements together"
            ],
            high: [
                "Continue supporting each other's growth",
                "Share success stories and lessons learned",
                "Inspire others through your example"
            ]
        }
    },
    "Values Alignment": {
        description: "Examines the compatibility of core values and principles",
        recommendations: {
            low: [
                "Discuss core values openly",
                "Identify areas of common ground",
                "Respect differences in perspectives"
            ],
            medium: [
                "Explore shared values more deeply",
                "Build on common principles",
                "Address value conflicts constructively"
            ],
            high: [
                "Continue living shared values",
                "Strengthen value-based decisions",
                "Help others understand value alignment"
            ]
        }
    },
    "Respect & Recognition": {
        description: "Measures mutual respect and appreciation",
        recommendations: {
            low: [
                "Show more appreciation for differences",
                "Acknowledge contributions more often",
                "Practice active recognition"
            ],
            medium: [
                "Find new ways to show respect",
                "Express gratitude regularly",
                "Celebrate unique qualities"
            ],
            high: [
                "Maintain high levels of mutual respect",
                "Continue showing appreciation",
                "Model respectful behavior for others"
            ]
        }
    },
    "Reliability": {
        description: "Evaluates consistency and dependability in the friendship",
        recommendations: {
            low: [
                "Follow through on commitments",
                "Communicate when unable to meet obligations",
                "Be more consistent in response times"
            ],
            medium: [
                "Strengthen reliability patterns",
                "Build better accountability",
                "Plan and coordinate more effectively"
            ],
            high: [
                "Maintain consistent reliability",
                "Share strategies for being dependable",
                "Help others develop reliability"
            ]
        }
    }
};

/**
 * 简化版类别描述（用于快速展示）
 */
export const friendshipCategoryDescriptions: Record<string, { good: string; bad: string }> = {
    "Trust & Honesty": {
        good: "Strong foundation of trust and honesty",
        bad: "Significant trust issues need attention"
    },
    "Emotional Support": {
        good: "Excellent emotional support and understanding",
        bad: "Lacks emotional depth and support"
    },
    "Communication": {
        good: "Open and effective communication",
        bad: "Communication barriers present"
    },
    "Boundaries": {
        good: "Healthy boundaries are maintained",
        bad: "Boundary issues need addressing"
    },
    "Reciprocity": {
        good: "Well-balanced give and take",
        bad: "Imbalanced relationship dynamic"
    },
    "Conflict Resolution": {
        good: "Constructive conflict management",
        bad: "Poor conflict resolution patterns"
    },
    "Growth & Development": {
        good: "Promotes personal growth",
        bad: "Limited growth opportunity"
    },
    "Values Alignment": {
        good: "Strong alignment of core values",
        bad: "Significant value misalignment"
    },
    "Respect & Recognition": {
        good: "High level of mutual respect",
        bad: "Lack of respect or recognition"
    },
    "Reliability": {
        good: "Consistently reliable and dependable",
        bad: "Unreliable behavior patterns"
    }
};
