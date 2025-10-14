import { AssessmentConfig, AssessmentRegistry } from './types';
import { friendshipConfig } from './friendship/config';
import { familyConfig } from './family/config';

/**
 * 评测类型注册中心
 * 所有评测类型都在此注册
 */
const assessmentRegistry: AssessmentRegistry = {
    friendship: friendshipConfig,
    family: familyConfig,
    // 其他评测类型可以继续添加
    // workplace: workplaceConfig,
};

/**
 * 获取指定类型的评测配置
 */
export const getAssessmentConfig = (type: string): AssessmentConfig | undefined => {
    return assessmentRegistry[type];
};

/**
 * 获取所有评测类型
 */
export const getAllAssessmentTypes = (): AssessmentConfig[] => {
    return Object.values(assessmentRegistry);
};

/**
 * 注册新的评测类型
 */
export const registerAssessment = (type: string, config: AssessmentConfig): void => {
    assessmentRegistry[type] = config;
};

/**
 * 检查评测类型是否存在
 */
export const hasAssessmentType = (type: string): boolean => {
    return type in assessmentRegistry;
};

/**
 * 获取所有评测类型的标识符
 */
export const getAssessmentTypeIds = (): string[] => {
    return Object.keys(assessmentRegistry);
};

export default assessmentRegistry;
