import { CategoryConfig, CategoryDetail } from '../types';

/**
 * 恋爱关系评测类别配置
 */
export const romanticCategories: CategoryConfig[] = [
    { name: "Emotional Intimacy", weight: 1.5, description: "Depth of emotional connection and vulnerability" },
    { name: "Trust & Honesty", weight: 1.5, description: "Foundation of trust and transparent communication" },
    { name: "Communication", weight: 1.3, description: "Quality and effectiveness of relationship communication" },
    { name: "Physical Intimacy", weight: 1.0, description: "Satisfaction with physical affection and connection" },
    { name: "Conflict Resolution", weight: 1.2, description: "How disagreements are handled and resolved" },
    { name: "Values & Goals", weight: 1.4, description: "Alignment of life values and future aspirations" },
    { name: "Personal Space", weight: 1.2, description: "Balance between togetherness and independence" },
    { name: "Mutual Support", weight: 1.3, description: "Emotional and practical support for each other" },
    { name: "Commitment & Future", weight: 1.4, description: "Security in commitment and shared future vision" },
    { name: "Passion & Romance", weight: 1.0, description: "Maintenance of romance and excitement" }
];

/**
 * 恋爱关系评测类别详细信息
 * 包含描述和针对不同分数段的建议
 */
export const romanticCategoryDetails: Record<string, CategoryDetail> = {
    "Emotional Intimacy": {
        description: "Measures the depth of emotional connection and ability to be vulnerable",
        recommendations: {
            low: [
                "Create dedicated time for deeper emotional conversations",
                "Practice sharing vulnerabilities in a safe space",
                "Consider couples therapy to build emotional intimacy"
            ],
            medium: [
                "Continue deepening emotional connections",
                "Share more about your inner world and feelings",
                "Practice empathy and active listening"
            ],
            high: [
                "Maintain the beautiful emotional intimacy you've built",
                "Continue being vulnerable and open with each other",
                "Use your strong connection to weather challenges together"
            ]
        }
    },
    "Trust & Honesty": {
        description: "Evaluates the foundation of trust and transparent communication",
        recommendations: {
            low: [
                "Have honest conversations about trust concerns",
                "Consider what specific actions would rebuild trust",
                "Seek professional help if trust has been significantly broken"
            ],
            medium: [
                "Continue building trust through consistent honesty",
                "Address small trust concerns before they grow",
                "Be transparent even when it's uncomfortable"
            ],
            high: [
                "Maintain the strong foundation of trust you've built",
                "Continue being honest and reliable",
                "Protect your trust by maintaining clear boundaries with others"
            ]
        }
    },
    "Communication": {
        description: "Assesses the quality and effectiveness of relationship communication",
        recommendations: {
            low: [
                "Learn and practice active listening techniques",
                "Schedule regular check-ins to discuss feelings",
                "Consider communication workshops or couples counseling"
            ],
            medium: [
                "Refine communication during conflicts",
                "Practice expressing needs more clearly",
                "Work on listening without becoming defensive"
            ],
            high: [
                "Maintain your excellent communication patterns",
                "Continue creating safe spaces for difficult conversations",
                "Help other couples learn from your communication style"
            ]
        }
    },
    "Physical Intimacy": {
        description: "Examines satisfaction with physical affection and intimate connection",
        recommendations: {
            low: [
                "Have an open, judgment-free conversation about intimacy needs",
                "Explore what makes you both feel loved physically",
                "Consider speaking with a relationship or sex therapist"
            ],
            medium: [
                "Communicate more openly about physical needs and desires",
                "Try new ways to express physical affection",
                "Make physical intimacy a priority in your relationship"
            ],
            high: [
                "Continue nurturing your physical connection",
                "Keep exploring and communicating about intimacy",
                "Maintain the physical affection that strengthens your bond"
            ]
        }
    },
    "Conflict Resolution": {
        description: "Evaluates how disagreements and conflicts are handled",
        recommendations: {
            low: [
                "Learn healthy conflict resolution strategies together",
                "Agree on ground rules for arguments (no name-calling, etc.)",
                "Take breaks when emotions run too high, then return to discuss"
            ],
            medium: [
                "Practice repair attempts during and after conflicts",
                "Focus on understanding rather than being right",
                "Reflect on conflict patterns and work to improve them"
            ],
            high: [
                "Continue using your effective conflict resolution skills",
                "Model healthy disagreement for others",
                "Keep strengthening your ability to repair after conflicts"
            ]
        }
    },
    "Values & Goals": {
        description: "Examines alignment of core values and life aspirations",
        recommendations: {
            low: [
                "Have deep conversations about core values and non-negotiables",
                "Identify areas where compromise is possible",
                "Consider whether fundamental differences are dealbreakers"
            ],
            medium: [
                "Continue discussing values and goals regularly",
                "Find ways to honor both partners' important values",
                "Make decisions that reflect shared priorities"
            ],
            high: [
                "Continue building on your aligned values and goals",
                "Support each other in living out shared values",
                "Make major life decisions from your strong foundation"
            ]
        }
    },
    "Personal Space": {
        description: "Assesses balance between togetherness and individual independence",
        recommendations: {
            low: [
                "Discuss and respect each other's need for alone time",
                "Maintain individual hobbies and friendships",
                "Work on reducing clinginess or creating healthier boundaries"
            ],
            medium: [
                "Continue balancing together time with independence",
                "Support each other's individual growth and interests",
                "Communicate openly about space needs"
            ],
            high: [
                "Maintain your healthy balance of closeness and independence",
                "Continue supporting each other's individuality",
                "Model healthy interdependence for other couples"
            ]
        }
    },
    "Mutual Support": {
        description: "Measures the quality of emotional and practical support",
        recommendations: {
            low: [
                "Ask directly for the support you need",
                "Learn your partner's preferred ways of receiving support",
                "Make supporting each other a relationship priority"
            ],
            medium: [
                "Increase specific acts of support and encouragement",
                "Celebrate each other's wins more actively",
                "Be present during challenges without trying to 'fix' everything"
            ],
            high: [
                "Continue being each other's strongest supporters",
                "Maintain your pattern of celebrating and comforting",
                "Keep lifting each other up in all circumstances"
            ]
        }
    },
    "Commitment & Future": {
        description: "Evaluates security in commitment and shared future vision",
        recommendations: {
            low: [
                "Have honest conversations about commitment levels",
                "Discuss what commitment means to each of you",
                "Consider whether you're on the same page about the future"
            ],
            medium: [
                "Continue building security in your commitment",
                "Have more concrete conversations about future plans",
                "Show commitment through consistent actions and words"
            ],
            high: [
                "Maintain the strong commitment you've built",
                "Continue making plans and dreams together",
                "Keep reinforcing your dedication to the relationship"
            ]
        }
    },
    "Passion & Romance": {
        description: "Assesses maintenance of romance and excitement in the relationship",
        recommendations: {
            low: [
                "Schedule regular date nights to reconnect",
                "Try new activities together to build excitement",
                "Discuss what romance means to each of you"
            ],
            medium: [
                "Keep intentionally creating romantic moments",
                "Surprise each other with thoughtful gestures",
                "Maintain physical affection and playfulness"
            ],
            high: [
                "Continue keeping the romance alive",
                "Keep finding new ways to express love and desire",
                "Maintain the passion that strengthens your connection"
            ]
        }
    }
};

/**
 * 简化版类别描述（用于快速展示）
 */
export const romanticCategoryDescriptions: Record<string, { good: string; bad: string }> = {
    "Emotional Intimacy": {
        good: "Deep emotional connection and vulnerability",
        bad: "Emotional distance needs addressing"
    },
    "Trust & Honesty": {
        good: "Strong foundation of trust and honesty",
        bad: "Trust issues present in the relationship"
    },
    "Communication": {
        good: "Excellent open and honest communication",
        bad: "Communication barriers affecting connection"
    },
    "Physical Intimacy": {
        good: "Satisfying physical connection",
        bad: "Physical intimacy needs attention"
    },
    "Conflict Resolution": {
        good: "Healthy conflict resolution patterns",
        bad: "Destructive conflict patterns present"
    },
    "Values & Goals": {
        good: "Strong alignment of values and goals",
        bad: "Significant value or goal misalignment"
    },
    "Personal Space": {
        good: "Healthy balance of togetherness and independence",
        bad: "Imbalance in closeness and space"
    },
    "Mutual Support": {
        good: "Strong mutual support and encouragement",
        bad: "Lack of adequate support"
    },
    "Commitment & Future": {
        good: "Secure commitment with shared future vision",
        bad: "Uncertainty about commitment or future"
    },
    "Passion & Romance": {
        good: "Vibrant passion and romance",
        bad: "Loss of romance and excitement"
    }
};
