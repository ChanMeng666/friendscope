import { CategoryConfig, CategoryDetail } from '../types';

export const familyCategories: CategoryConfig[] = [
    { name: "Mutual Respect", weight: 1.5, description: "Level of mutual respect in the relationship" },
    { name: "Communication", weight: 1.3, description: "Quality of communication" },
    { name: "Emotional Support", weight: 1.4, description: "Emotional connection and support" },
    { name: "Boundaries", weight: 1.3, description: "Respect for personal boundaries" },
    { name: "Trust & Reliability", weight: 1.4, description: "Trust and dependability" },
    { name: "Conflict Resolution", weight: 1.2, description: "How conflicts are handled" },
    { name: "Acceptance", weight: 1.5, description: "Unconditional acceptance" },
    { name: "Quality Time", weight: 1.1, description: "Meaningful time together" }
];

export const familyCategoryDetails: Record<string, CategoryDetail> = {
    "Mutual Respect": {
        description: "Evaluates the level of mutual respect in your family relationship",
        recommendations: {
            low: [
                "Have a calm conversation about feeling disrespected",
                "Set clear expectations for respectful communication",
                "Consider family counseling if the issue persists"
            ],
            medium: [
                "Continue practicing respectful communication",
                "Acknowledge when you feel respected",
                "Work on listening without interrupting"
            ],
            high: [
                "Maintain the respectful dynamic",
                "Model this behavior for other family relationships",
                "Express appreciation for mutual respect"
            ]
        }
    },
    "Communication": {
        description: "Assesses the quality and openness of communication",
        recommendations: {
            low: [
                "Schedule regular one-on-one time to talk",
                "Practice active listening techniques",
                "Consider using 'I' statements to express feelings"
            ],
            medium: [
                "Explore deeper topics in conversations",
                "Practice vulnerability and honesty",
                "Create safe spaces for difficult discussions"
            ],
            high: [
                "Continue open and honest communication",
                "Share what works with other family members",
                "Maintain regular check-ins"
            ]
        }
    },
    "Emotional Support": {
        description: "Measures the emotional support provided in the relationship",
        recommendations: {
            low: [
                "Express your need for emotional support",
                "Share how they can better support you",
                "Consider whether professional support is needed"
            ],
            medium: [
                "Deepen emotional conversations",
                "Be more specific about your emotional needs",
                "Show appreciation when you feel supported"
            ],
            high: [
                "Continue being emotionally available",
                "Maintain the balance of support",
                "Help others in the family develop this skill"
            ]
        }
    },
    "Boundaries": {
        description: "Examines respect for personal boundaries",
        recommendations: {
            low: [
                "Clearly communicate your boundaries",
                "Be consistent in enforcing limits",
                "Explain why boundaries are important to you"
            ],
            medium: [
                "Review and adjust boundaries as needed",
                "Discuss expectations openly",
                "Practice saying 'no' when necessary"
            ],
            high: [
                "Continue respecting each other's boundaries",
                "Model healthy boundary-setting",
                "Support family members in setting their own boundaries"
            ]
        }
    },
    "Trust & Reliability": {
        description: "Evaluates trust and dependability in the relationship",
        recommendations: {
            low: [
                "Have an honest conversation about trust issues",
                "Start with small steps to rebuild trust",
                "Be consistent and follow through on commitments"
            ],
            medium: [
                "Continue building trust through actions",
                "Address any trust concerns promptly",
                "Acknowledge progress in rebuilding trust"
            ],
            high: [
                "Maintain trustworthiness and reliability",
                "Continue being dependable",
                "Protect this foundation of trust"
            ]
        }
    },
    "Conflict Resolution": {
        description: "Assesses how conflicts are handled",
        recommendations: {
            low: [
                "Address conflicts calmly and promptly",
                "Focus on solutions rather than blame",
                "Consider family mediation if needed"
            ],
            medium: [
                "Practice better conflict resolution skills",
                "Learn from past conflicts",
                "Develop compromise strategies"
            ],
            high: [
                "Continue using effective resolution strategies",
                "Share techniques with other family members",
                "Help mediate conflicts when appropriate"
            ]
        }
    },
    "Acceptance": {
        description: "Measures unconditional acceptance in the relationship",
        recommendations: {
            low: [
                "Discuss feeling pressured to change",
                "Explain your need for acceptance",
                "Set boundaries around unsolicited advice"
            ],
            medium: [
                "Work on accepting each other's differences",
                "Appreciate unique qualities",
                "Reduce judgment and criticism"
            ],
            high: [
                "Maintain unconditional acceptance",
                "Continue celebrating differences",
                "Model acceptance for other relationships"
            ]
        }
    },
    "Quality Time": {
        description: "Evaluates the quality of time spent together",
        recommendations: {
            low: [
                "Schedule regular quality time together",
                "Plan activities you both enjoy",
                "Make the relationship a priority"
            ],
            medium: [
                "Find new ways to connect",
                "Be more present during time together",
                "Create meaningful traditions"
            ],
            high: [
                "Continue prioritizing quality time",
                "Maintain meaningful connections",
                "Share your approach with other family relationships"
            ]
        }
    }
};
