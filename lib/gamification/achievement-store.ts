import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACHIEVEMENTS, Achievement, AchievementStats } from './achievements';
import { AssessmentResult } from '@/types/assessment';
import { getAllAssessmentTypes } from '@/lib/assessments/registry';

interface UnlockedAchievement {
    id: string;
    unlockedAt: Date;
}

interface AchievementState {
    unlockedAchievements: UnlockedAchievement[];

    // Actions
    checkAndUnlockAchievements: (assessments: AssessmentResult[]) => string[];
    getUnlockedAchievements: () => Achievement[];
    getLockedAchievements: () => Achievement[];
    isAchievementUnlocked: (achievementId: string) => boolean;
    getProgress: () => { unlocked: number; total: number; percentage: number };
}

/**
 * Calculate achievement statistics from assessments
 */
const calculateStats = (assessments: AssessmentResult[]): AchievementStats => {
    const totalAssessments = assessments.length;

    // Group by type
    const assessmentsByType: Record<string, number> = {};
    assessments.forEach(a => {
        const type = a.assessmentType || 'friendship';
        assessmentsByType[type] = (assessmentsByType[type] || 0) + 1;
    });

    // Unique people
    const uniquePeople = new Set(
        assessments.map(a => a.targetName || a.friendName || 'Unknown')
    ).size;

    // Score statistics
    const scores = assessments.map(a => a.overallScore);
    const averageScore = scores.length > 0
        ? scores.reduce((sum, s) => sum + s, 0) / scores.length
        : 0;
    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const lowestScore = scores.length > 0 ? Math.min(...scores) : 100;

    // Excellent relationships (score >= 85)
    const excellentRelationships = assessments.filter(a => a.overallScore >= 85).length;

    // Improvement tracking (compare same person assessments)
    const improvementCount = calculateImprovements(assessments);

    // Check if all types completed
    const allTypes = getAllAssessmentTypes();
    const allTypesCompleted = allTypes.every(type =>
        assessmentsByType[type.type] > 0
    );

    return {
        totalAssessments,
        assessmentsByType,
        uniquePeople,
        averageScore,
        highestScore,
        lowestScore,
        improvementCount,
        consecutiveDays: 0, // TODO: Implement consecutive days tracking
        allTypesCompleted,
        excellentRelationships
    };
};

/**
 * Calculate number of improvements on retested relationships
 */
const calculateImprovements = (assessments: AssessmentResult[]): number => {
    // Group assessments by person and type
    const byPerson = new Map<string, AssessmentResult[]>();

    assessments.forEach(assessment => {
        const key = `${assessment.targetName || assessment.friendName}-${assessment.assessmentType}`;
        if (!byPerson.has(key)) {
            byPerson.set(key, []);
        }
        byPerson.get(key)!.push(assessment);
    });

    // Count improvements
    let improvementCount = 0;

    byPerson.forEach(personAssessments => {
        if (personAssessments.length >= 2) {
            // Sort by date
            const sorted = personAssessments.sort((a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            );

            // Check for any improvement
            for (let i = 1; i < sorted.length; i++) {
                if (sorted[i].overallScore > sorted[i - 1].overallScore) {
                    improvementCount++;
                    break; // Count once per person
                }
            }
        }
    });

    return improvementCount;
};

export const useAchievementStore = create<AchievementState>()(
    persist(
        (set, get) => ({
            unlockedAchievements: [],

            /**
             * Check achievements and unlock new ones
             * Returns array of newly unlocked achievement IDs
             */
            checkAndUnlockAchievements: (assessments: AssessmentResult[]) => {
                const stats = calculateStats(assessments);
                const currentUnlocked = get().unlockedAchievements;
                const newlyUnlocked: string[] = [];

                ACHIEVEMENTS.forEach(achievement => {
                    const alreadyUnlocked = currentUnlocked.some(u => u.id === achievement.id);

                    if (!alreadyUnlocked && achievement.condition(stats)) {
                        newlyUnlocked.push(achievement.id);
                    }
                });

                if (newlyUnlocked.length > 0) {
                    set(state => ({
                        unlockedAchievements: [
                            ...state.unlockedAchievements,
                            ...newlyUnlocked.map(id => ({
                                id,
                                unlockedAt: new Date()
                            }))
                        ]
                    }));
                }

                return newlyUnlocked;
            },

            /**
             * Get all unlocked achievements with full details
             */
            getUnlockedAchievements: () => {
                const unlocked = get().unlockedAchievements;
                return ACHIEVEMENTS.filter(a =>
                    unlocked.some(u => u.id === a.id)
                ).map(achievement => {
                    const unlockData = unlocked.find(u => u.id === achievement.id);
                    return {
                        ...achievement,
                        unlockedAt: unlockData?.unlockedAt
                    };
                });
            },

            /**
             * Get all locked achievements
             */
            getLockedAchievements: () => {
                const unlocked = get().unlockedAchievements;
                return ACHIEVEMENTS.filter(a =>
                    !unlocked.some(u => u.id === a.id)
                );
            },

            /**
             * Check if specific achievement is unlocked
             */
            isAchievementUnlocked: (achievementId: string) => {
                return get().unlockedAchievements.some(u => u.id === achievementId);
            },

            /**
             * Get overall achievement progress
             */
            getProgress: () => {
                const unlocked = get().unlockedAchievements.length;
                const total = ACHIEVEMENTS.length;
                return {
                    unlocked,
                    total,
                    percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0
                };
            }
        }),
        {
            name: 'friendscope-achievements'
        }
    )
);
