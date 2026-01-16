/**
 * Centralized constants for all assessment types
 * This module provides shared configuration values used across the assessment system
 */

/**
 * Standard 7-point Likert scale options
 * Used consistently across all assessment types for response uniformity
 */
export const STANDARD_OPTIONS = [
    "Strongly Agree",
    "Agree",
    "Somewhat Agree",
    "Neutral",
    "Somewhat Disagree",
    "Disagree",
    "Strongly Disagree"
] as const;

/**
 * Type for standard options
 */
export type StandardOption = typeof STANDARD_OPTIONS[number];

/**
 * Length of the Likert scale (7 points)
 */
export const LIKERT_SCALE_LENGTH = STANDARD_OPTIONS.length;

/**
 * Mobile breakpoint in pixels
 * Used for responsive design across the application
 */
export const MOBILE_BREAKPOINT = 768;

/**
 * Maximum number of assessments stored in history
 * Older assessments are automatically removed when this limit is exceeded
 */
export const MAX_ASSESSMENT_HISTORY = 50;

/**
 * Default score threshold for category descriptions
 * Scores >= this value are considered "good"
 */
export const CATEGORY_SCORE_THRESHOLD = 70;

/**
 * Question weight range constraints
 */
export const WEIGHT_MIN = 1.0;
export const WEIGHT_MAX = 1.5;

/**
 * Health assessment thresholds (used for validation)
 */
export const HEALTH_THRESHOLDS = {
    EXCELLENT: 85,
    GOOD: 70,
    CONCERNING: 50,
    UNHEALTHY: 30,
    TOXIC: 0
} as const;
