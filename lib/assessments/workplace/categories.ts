import { CategoryConfig, CategoryDetail } from '../types';

/**
 * 职场关系评测类别配置
 */
export const workplaceCategories: CategoryConfig[] = [
    { name: "Trust & Reliability", weight: 1.5, description: "Consistency and trustworthiness in professional commitments" },
    { name: "Professional Collaboration", weight: 1.3, description: "Quality of teamwork and joint project execution" },
    { name: "Communication Effectiveness", weight: 1.2, description: "Clarity and efficiency of workplace communication" },
    { name: "Professional Boundaries", weight: 1.4, description: "Respect for work-life balance and professional limits" },
    { name: "Team Contribution", weight: 1.1, description: "Value added to team goals and success" },
    { name: "Conflict Management", weight: 1.2, description: "How workplace disagreements are handled" },
    { name: "Mutual Support", weight: 1.1, description: "Balance of professional assistance and collaboration" },
    { name: "Professional Growth", weight: 1.0, description: "Contribution to each other's career development" }
];

/**
 * 职场关系评测类别详细信息
 * 包含描述和针对不同分数段的建议
 */
export const workplaceCategoryDetails: Record<string, CategoryDetail> = {
    "Trust & Reliability": {
        description: "Measures the consistency and trustworthiness in professional commitments",
        recommendations: {
            low: [
                "Document commitments and follow through consistently",
                "Communicate proactively when deadlines are at risk",
                "Build trust through small, reliable actions"
            ],
            medium: [
                "Continue building on established trust",
                "Be transparent about challenges affecting deliverables",
                "Maintain consistent communication patterns"
            ],
            high: [
                "Maintain your strong track record of reliability",
                "Share best practices for meeting commitments",
                "Mentor others on building professional trust"
            ]
        }
    },
    "Professional Collaboration": {
        description: "Evaluates the quality of teamwork and joint project execution",
        recommendations: {
            low: [
                "Actively participate in team discussions and decisions",
                "Seek opportunities to contribute to shared goals",
                "Practice being open to different working styles"
            ],
            medium: [
                "Strengthen collaborative skills through joint projects",
                "Seek feedback on your collaboration approach",
                "Find new ways to add value to team efforts"
            ],
            high: [
                "Continue being an effective collaborator",
                "Share collaboration strategies with the team",
                "Mentor others on effective teamwork"
            ]
        }
    },
    "Communication Effectiveness": {
        description: "Assesses the clarity and efficiency of workplace communication",
        recommendations: {
            low: [
                "Practice concise and clear communication",
                "Set expectations for response times",
                "Use appropriate communication channels for different messages"
            ],
            medium: [
                "Refine communication style for different audiences",
                "Practice active listening in meetings",
                "Seek feedback on communication clarity"
            ],
            high: [
                "Maintain excellent communication standards",
                "Share effective communication techniques",
                "Help others improve their workplace communication"
            ]
        }
    },
    "Professional Boundaries": {
        description: "Examines respect for work-life balance and professional limits",
        recommendations: {
            low: [
                "Respect others' work hours and time off",
                "Avoid making unreasonable demands outside work hours",
                "Clearly communicate your own boundaries"
            ],
            medium: [
                "Continue respecting established boundaries",
                "Discuss boundary expectations proactively",
                "Model healthy work-life balance"
            ],
            high: [
                "Maintain strong professional boundaries",
                "Advocate for healthy boundary practices in your team",
                "Help create a culture of work-life respect"
            ]
        }
    },
    "Team Contribution": {
        description: "Measures the value added to team goals and collective success",
        recommendations: {
            low: [
                "Actively share ideas in team meetings",
                "Look for ways to support team objectives",
                "Acknowledge others' contributions publicly"
            ],
            medium: [
                "Increase involvement in team initiatives",
                "Take on more responsibility for team outcomes",
                "Celebrate team wins and learn from setbacks together"
            ],
            high: [
                "Continue being a strong team contributor",
                "Lead initiatives that benefit the team",
                "Inspire others to contribute meaningfully"
            ]
        }
    },
    "Conflict Management": {
        description: "Evaluates how workplace disagreements and tensions are addressed",
        recommendations: {
            low: [
                "Address conflicts directly rather than avoiding them",
                "Practice receiving feedback without defensiveness",
                "Focus on solutions rather than blame"
            ],
            medium: [
                "Develop conflict resolution skills further",
                "Seek mediation when conflicts escalate",
                "Learn from past conflicts to prevent future issues"
            ],
            high: [
                "Continue handling conflicts constructively",
                "Share conflict resolution strategies",
                "Help mediate conflicts within your team"
            ]
        }
    },
    "Mutual Support": {
        description: "Assesses the balance of professional assistance and collaboration",
        recommendations: {
            low: [
                "Offer help proactively when colleagues face challenges",
                "Ask for help when needed to balance the relationship",
                "Look for opportunities to support others' work"
            ],
            medium: [
                "Strengthen mutual support practices",
                "Ensure the give-and-take remains balanced",
                "Express appreciation for support received"
            ],
            high: [
                "Maintain strong patterns of mutual support",
                "Foster a culture of helping within your team",
                "Continue balanced professional relationships"
            ]
        }
    },
    "Professional Growth": {
        description: "Examines contribution to each other's career and skill development",
        recommendations: {
            low: [
                "Share relevant knowledge and resources",
                "Offer constructive feedback to help others improve",
                "Create opportunities for skill-sharing"
            ],
            medium: [
                "Actively mentor or be mentored by this colleague",
                "Share learning opportunities and resources",
                "Discuss career goals and how to support each other"
            ],
            high: [
                "Continue supporting professional development",
                "Share expertise through formal or informal mentoring",
                "Help create a learning culture in your workplace"
            ]
        }
    }
};

/**
 * 简化版类别描述（用于快速展示）
 */
export const workplaceCategoryDescriptions: Record<string, { good: string; bad: string }> = {
    "Trust & Reliability": {
        good: "Highly reliable and trustworthy professional",
        bad: "Trust and reliability concerns present"
    },
    "Professional Collaboration": {
        good: "Excellent collaborative working relationship",
        bad: "Collaboration challenges need addressing"
    },
    "Communication Effectiveness": {
        good: "Clear and efficient workplace communication",
        bad: "Communication gaps affecting work"
    },
    "Professional Boundaries": {
        good: "Healthy professional boundaries maintained",
        bad: "Boundary issues impacting work-life balance"
    },
    "Team Contribution": {
        good: "Strong contributor to team success",
        bad: "Limited team engagement or contribution"
    },
    "Conflict Management": {
        good: "Constructive approach to workplace conflicts",
        bad: "Conflict resolution needs improvement"
    },
    "Mutual Support": {
        good: "Balanced professional support system",
        bad: "One-sided or lacking support"
    },
    "Professional Growth": {
        good: "Mutually beneficial for career development",
        bad: "Limited professional growth opportunity"
    }
};
