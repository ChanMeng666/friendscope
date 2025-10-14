'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useHistoryStore } from '@/lib/history-store'
import { Card, CardContent} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import {Download, Share2, ArrowLeft, Printer, Lightbulb, Target} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { AssessmentResult } from '@/types/assessment'
import { generatePDF, shareAssessment } from '@/lib/assessment-utils';
import { motion} from 'framer-motion'
import {LottieAnimation} from "@/components/LottieAnimation";
import {downloadSVG, generateResultSVG} from "@/lib/svg-generator";
import { getAssessmentConfig } from '@/lib/assessments/registry';
import { AssessmentConfig } from '@/lib/assessments/types';

// 旧的硬编码类别详情（用于向后兼容，如果配置未找到）
const FALLBACK_CATEGORY_DETAILS = {
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
}


export default function DetailedResultPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const { getAssessment } = useHistoryStore()
    const [assessment, setAssessment] = useState<AssessmentResult | undefined>()
    const [config, setConfig] = useState<AssessmentConfig | undefined>()

    useEffect(() => {
        if (params.id) {
            const result = getAssessment(params.id as string)
            if (result) {
                setAssessment(result)
                // 加载评测配置
                const assessmentConfig = getAssessmentConfig(result.assessmentType || 'friendship');
                setConfig(assessmentConfig);
            } else {
                router.push('/history')
            }
        }
    }, [params.id, getAssessment, router])

    if (!assessment || !config) return null

    // 获取目标名称（兼容旧数据）
    const targetName = assessment.targetName || assessment.friendName || 'Unknown';
    const targetLabel = config.targetEntity || 'Target';



    const handleDownloadPDF = () => {
        if (assessment) {
            generatePDF(assessment);
        }
    };

    const handleShare = async () => {
        if (assessment) {
            const shared = await shareAssessment(assessment);
            if (!shared) {
                navigator.clipboard.writeText(window.location.href);
                toast({
                    title: "Link Copied",
                    description: "Assessment link has been copied to clipboard"
                });
            }
        }
    };

    const handlePrint = () => {
        window.print()
    }

    const getRecommendations = (category: string, score: number) => {
        // 从配置中获取类别详情
        const details = config?.categoryDetails[category] || FALLBACK_CATEGORY_DETAILS[category as keyof typeof FALLBACK_CATEGORY_DETAILS];
        if (!details) return []
        if (score >= 80) return details.recommendations.high
        if (score >= 60) return details.recommendations.medium
        return details.recommendations.low
    }

    // 添加动态评分指示器组件
    const ScoreIndicator = ({ score }: { score: number }) => {
        const getScoreColor = (value: number) => {
            if (value >= 85) return 'from-green-500 to-green-600'
            if (value >= 70) return 'from-blue-500 to-blue-600'
            if (value >= 50) return 'from-yellow-500 to-yellow-600'
            return 'from-red-500 to-red-600'
        }

        // 格式化分数到两位小数
        const formattedScore = Number(score.toFixed(2))

        return (
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-right"
            >
                <div className="flex flex-col items-end gap-1">
                    <motion.div
                        className={`
                        text-3xl font-bold
                        bg-gradient-to-r ${getScoreColor(formattedScore)}
                        bg-clip-text text-transparent
                        tabular-nums
                    `}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {formattedScore}%
                    </motion.div>
                    <motion.div
                        className="text-sm text-muted-foreground"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Overall Score
                    </motion.div>
                </div>
            </motion.div>
        )
    }


    const DetailedLottieAnimation = ({ score }: { score: number }) => {
        // 根据分数选择对应的动画文件
        const getLottieFile = (score: number) => {
            if (score >= 90) return "/Lottie/90-point-friendship.json";
            if (score >= 80) return "/Lottie/80-point-friendship.json";
            if (score >= 70) return "/Lottie/70-point-friendship.json";
            if (score >= 60) return "/Lottie/60-point-friendship.json";
            if (score >= 50) return "/Lottie/50-point-friendship.json";
            if (score >= 40) return "/Lottie/40-point-friendship.json";
            if (score >= 30) return "/Lottie/30-point-friendship.json";
            if (score >= 20) return "/Lottie/20-point-friendship.json";
            return "/Lottie/10-point-friendship.json";
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.2
                }}
                className="hidden md:block w-64 h-64"
            >
                <LottieAnimation
                    path={getLottieFile(score)}
                    className="w-full h-full"
                />
            </motion.div>
        );
    };

    // 添加详细分析卡片组件
    const AnalysisCard = ({ category, score }: { category: string; score: number }) => {
        const recommendations = getRecommendations(category, score)
        const formattedScore = Number(score.toFixed(2))

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
            >
                <div className="
                    p-6 rounded-lg
                    bg-white/50 backdrop-blur-sm
                    hover:bg-white/60
                    border border-border/50
                    transition-all duration-300
                    hover:shadow-lg hover:shadow-primary/5
                ">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">{category}</h3>
                            <div className={`
                            inline-flex items-center px-2 py-1 rounded-full text-sm
                            ${formattedScore >= 70 ? 'bg-green-100 text-green-700' :
                                formattedScore >= 50 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'}
                            tabular-nums
                            `}>
                                {formattedScore}% Proficiency
                            </div>
                        </div>
                        <motion.div
                            className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                        >
                            <Target className="h-5 w-5 text-primary"/>
                        </motion.div>
                    </div>

                    <div className="space-y-3">
                        <motion.div
                            className="w-full bg-gray-200 rounded-full h-2 mb-4"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className={`
                                    h-2 rounded-full
                                    bg-gradient-to-r from-primary to-purple-600
                                `}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${formattedScore}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            />
                        </motion.div>

                        <div className="flex flex-col gap-2">
                            {recommendations.map((rec, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="
                                        flex items-start gap-2
                                        p-3 rounded-lg
                                        bg-primary/5
                                        group-hover:bg-primary/10
                                        transition-colors duration-300
                                    "
                                >
                                    <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{rec}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hover Effect Gradient Border */}
                <div className="
                    absolute inset-0 -z-10
                    bg-gradient-to-r from-primary/20 to-purple-600/20
                    rounded-lg blur-xl
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                "/>
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12 max-w-5xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                    >
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"/>
                            Back
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        className="flex gap-2"
                    >
                        {[
                            {icon: Share2, label: 'Share', onClick: handleShare},
                            {icon: Download, label: 'Create SVG', onClick: () => {
                                    const svg = generateResultSVG(
                                        targetName,
                                        assessment.overallScore,
                                        assessment.categoryScores
                                    );
                                    downloadSVG(svg, targetName);
                                }
                            },
                            {icon: Printer, label: 'Print', onClick: handlePrint},
                            {icon: Download, label: 'Download PDF', onClick: handleDownloadPDF}
                        ].map((action, index) => (
                            <Button
                                key={action.label}
                                variant={index === 3 ? 'default' : 'outline'}
                                onClick={action.onClick}
                                className="gap-2"
                            >
                                <action.icon className="h-4 w-4"/>
                                {action.label}
                            </Button>
                        ))}
                    </motion.div>
                </div>

                {/* Overview Card */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="mb-8"
                >

                    <Card className="border-none bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="grid md:grid-cols-3 gap-6 items-center">
                                {/* 左侧信息 */}
                                <div className="md:col-span-1">
                                    <h2 className="text-2xl font-bold mb-2">
                                        {config.name} Details
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                                Assessment Date
                                            </h3>
                                            <p className="text-lg">
                                                {format(new Date(assessment.date), 'PPP')}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">
                                                {targetLabel}
                                            </h3>
                                            <p className="text-lg">{targetName}</p>
                                        </div>
                                        {assessment.notes && (
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground">
                                                    Notes
                                                </h3>
                                                <p className="text-lg">{assessment.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 中间Lottie动画 */}
                                <div className="flex justify-center md:col-span-1">
                                    <DetailedLottieAnimation score={assessment.overallScore} />
                                </div>

                                {/* 右侧分数 */}
                                <div className="flex flex-col justify-center items-end md:col-span-1">
                                    <ScoreIndicator score={assessment.overallScore} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </motion.div>

                {/* Detailed Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(assessment.categoryScores).map(([category, score]) => (
                        <AnalysisCard
                            key={category}
                            category={category}
                            score={score}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}
