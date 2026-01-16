/**
 * Assessment Configuration Validator
 * Validates assessment configs to catch errors early
 */

import { AssessmentConfig, Question, CategoryConfig, HealthThreshold } from './types';
import { WEIGHT_MIN, WEIGHT_MAX, HEALTH_THRESHOLDS } from './constants';

export interface ValidationError {
    type: 'error' | 'warning';
    field: string;
    message: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationError[];
}

/**
 * Validate an assessment configuration
 */
export function validateAssessmentConfig(config: AssessmentConfig): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Validate basic config properties
    if (!config.type) {
        errors.push({
            type: 'error',
            field: 'type',
            message: 'Assessment type is required'
        });
    }

    if (!config.name) {
        errors.push({
            type: 'error',
            field: 'name',
            message: 'Assessment name is required'
        });
    }

    // Validate questions
    if (!config.questions || config.questions.length === 0) {
        errors.push({
            type: 'error',
            field: 'questions',
            message: 'At least one question is required'
        });
    } else {
        validateQuestions(config.questions, config.categories, errors, warnings);
    }

    // Validate categories
    if (!config.categories || config.categories.length === 0) {
        errors.push({
            type: 'error',
            field: 'categories',
            message: 'At least one category is required'
        });
    } else {
        validateCategories(config.categories, config.questions, errors, warnings);
    }

    // Validate health thresholds
    if (config.healthThresholds) {
        validateHealthThresholds(config.healthThresholds, errors, warnings);
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validate questions array
 */
function validateQuestions(
    questions: Question[],
    categories: CategoryConfig[],
    errors: ValidationError[],
    warnings: ValidationError[]
): void {
    const questionIds = new Set<number>();
    const categoryNames = new Set(categories.map(c => c.name));

    questions.forEach((question, index) => {
        // Check for duplicate IDs
        if (questionIds.has(question.id)) {
            errors.push({
                type: 'error',
                field: `questions[${index}].id`,
                message: `Duplicate question ID: ${question.id}`
            });
        }
        questionIds.add(question.id);

        // Check question text
        if (!question.text || question.text.trim().length === 0) {
            errors.push({
                type: 'error',
                field: `questions[${index}].text`,
                message: `Question ${question.id} has empty text`
            });
        }

        // Check category reference
        if (!categoryNames.has(question.category)) {
            errors.push({
                type: 'error',
                field: `questions[${index}].category`,
                message: `Question ${question.id} references invalid category: ${question.category}`
            });
        }

        // Check options
        if (!question.options || question.options.length < 2) {
            errors.push({
                type: 'error',
                field: `questions[${index}].options`,
                message: `Question ${question.id} must have at least 2 options`
            });
        }

        // Check weight
        if (question.weight < WEIGHT_MIN || question.weight > WEIGHT_MAX) {
            warnings.push({
                type: 'warning',
                field: `questions[${index}].weight`,
                message: `Question ${question.id} weight (${question.weight}) is outside typical range [${WEIGHT_MIN}, ${WEIGHT_MAX}]`
            });
        }
    });
}

/**
 * Validate categories array
 */
function validateCategories(
    categories: CategoryConfig[],
    questions: Question[],
    errors: ValidationError[],
    warnings: ValidationError[]
): void {
    const categoryNames = new Set<string>();
    const questionsPerCategory = new Map<string, number>();

    // Count questions per category
    questions.forEach(q => {
        questionsPerCategory.set(
            q.category,
            (questionsPerCategory.get(q.category) || 0) + 1
        );
    });

    categories.forEach((category, index) => {
        // Check for duplicate names
        if (categoryNames.has(category.name)) {
            errors.push({
                type: 'error',
                field: `categories[${index}].name`,
                message: `Duplicate category name: ${category.name}`
            });
        }
        categoryNames.add(category.name);

        // Check name
        if (!category.name || category.name.trim().length === 0) {
            errors.push({
                type: 'error',
                field: `categories[${index}].name`,
                message: `Category at index ${index} has empty name`
            });
        }

        // Check if category has questions
        const questionCount = questionsPerCategory.get(category.name) || 0;
        if (questionCount === 0) {
            warnings.push({
                type: 'warning',
                field: `categories[${index}]`,
                message: `Category "${category.name}" has no associated questions`
            });
        }
    });
}

/**
 * Validate health thresholds
 */
function validateHealthThresholds(
    thresholds: HealthThreshold[],
    errors: ValidationError[],
    warnings: ValidationError[]
): void {
    if (thresholds.length === 0) {
        warnings.push({
            type: 'warning',
            field: 'healthThresholds',
            message: 'No health thresholds defined'
        });
        return;
    }

    // Check for proper ordering (descending)
    const sortedThresholds = [...thresholds].sort((a, b) => b.threshold - a.threshold);

    for (let i = 0; i < thresholds.length; i++) {
        if (thresholds[i].threshold !== sortedThresholds[i].threshold) {
            warnings.push({
                type: 'warning',
                field: 'healthThresholds',
                message: 'Health thresholds should be ordered from highest to lowest'
            });
            break;
        }
    }

    // Check threshold values
    thresholds.forEach((threshold, index) => {
        if (threshold.threshold < 0 || threshold.threshold > 100) {
            errors.push({
                type: 'error',
                field: `healthThresholds[${index}].threshold`,
                message: `Threshold value must be between 0 and 100, got: ${threshold.threshold}`
            });
        }

        if (!threshold.message || threshold.message.trim().length === 0) {
            errors.push({
                type: 'error',
                field: `healthThresholds[${index}].message`,
                message: `Health threshold at ${threshold.threshold} has empty message`
            });
        }
    });

    // Check for standard threshold coverage
    const standardThresholds = Object.values(HEALTH_THRESHOLDS);

    standardThresholds.forEach(standard => {
        const hasClose = thresholds.some(t => Math.abs(t.threshold - standard) <= 5);
        if (!hasClose && standard !== 0) {
            warnings.push({
                type: 'warning',
                field: 'healthThresholds',
                message: `Consider adding a threshold near ${standard} (standard threshold)`
            });
        }
    });
}

/**
 * Validate all registered assessments
 */
export function validateAllAssessments(
    configs: AssessmentConfig[]
): Map<string, ValidationResult> {
    const results = new Map<string, ValidationResult>();

    configs.forEach(config => {
        results.set(config.type, validateAssessmentConfig(config));
    });

    return results;
}
