'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAssessmentStore } from '@/lib/store'
import { useHistoryStore } from '@/lib/history-store'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { v4 as uuidv4 } from 'uuid'
import { FriendInfoDialog } from '@/components/FriendInfoDialog'
import { calculateScores, getCategoryDescription } from '@/lib/assessment'
import {AlertCircle, ArrowRight, ChartPie, RotateCcw, Share2, History, Download} from 'lucide-react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AssessmentResult } from '@/types/assessment'
import ShareDialog from '@/components/dialogs/ShareDialog';
import { motion } from 'framer-motion'
import {LottieAnimation} from "@/components/LottieAnimation";
import {downloadSVG, generateResultSVG} from "@/lib/svg-generator";
import GEOHead from '@/components/GEOHead';

interface FriendInfo {
    name: string;
    notes: string;
}

type AssessmentResultData = Omit<AssessmentResult, 'id' | 'date' | 'friendName' | 'notes'>

export default function ResultsPage() {
    const router = useRouter()
    const { answers, resetAssessment } = useAssessmentStore()
    const { addAssessment } = useHistoryStore()
    const [isLoading, setIsLoading] = useState(true)
    const [assessmentResult, setAssessmentResult] = useState<AssessmentResultData | null>(null)
    const [showFriendDialog, setShowFriendDialog] = useState(true)
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [friendName, setFriendName] = useState<string>('');

    useEffect(() => {
        if (Object.keys(answers).length === 0) {
            router.push('/assess')
            return
        }

        const results = calculateScores(answers)
        setAssessmentResult(results)
        setIsLoading(false)
    }, [answers, router])

    const handleFriendInfoSubmit = (friendInfo: FriendInfo) => {
        setShowFriendDialog(false)
        setFriendName(friendInfo.name);
        if (assessmentResult) {
            const assessment: AssessmentResult = {
                id: uuidv4(),
                date: new Date().toISOString(),
                friendName: friendInfo.name,
                notes: friendInfo.notes,
                overallScore: assessmentResult.overallScore,
                categoryScores: assessmentResult.categoryScores,
                assessment: {
                    threshold: assessmentResult.assessment.threshold,
                    message: assessmentResult.assessment.message,
                    recommendation: assessmentResult.assessment.recommendation
                }
            }
            addAssessment(assessment)
        }
    }

    if (isLoading || !assessmentResult) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    const chartData = Object.entries(assessmentResult.categoryScores).map(([name, value]) => ({
        name,
        value: Math.round(value),
        description: getCategoryDescription(name, value)
    }))


    const ResultLottieAnimation = ({ score }: { score: number }) => {
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
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="w-64 h-64 mx-auto my-8"
            >
                <LottieAnimation
                    path={getLottieFile(score)}
                    className="w-full h-full"
                />
            </motion.div>
        );
    };

    return (
        <>
            <GEOHead 
                pageType="results" 
                customData={{
                    friendName: friendName,
                    score: assessmentResult.overallScore
                }}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12 max-w-4xl">
            <FriendInfoDialog
                open={showFriendDialog}
                onClose={() => setShowFriendDialog(false)}
                onSubmit={handleFriendInfoSubmit}
            />

            <Card
                className="mb-8 overflow-hidden border-none bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-300">
                <CardHeader>
                    <CardTitle
                        className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Your Friendship Score
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center space-y-6">
                        <motion.div
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <div className="relative w-32 h-32 mx-auto">
                                {/* 背景圆环 */}
                                <div className="absolute inset-0 rounded-full border-8 border-gray-100"/>
                                {/* 得分圆环 */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="url(#scoreGradient)"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={`${Math.round(assessmentResult.overallScore * 3.51)} 351`}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                    <defs>
                                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="var(--primary)"/>
                                            <stop offset="100%" stopColor="rgb(147, 51, 234)"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                {/* 分数文本 */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.span
                                        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.5}}
                                    >
                                        {Math.round(assessmentResult.overallScore)}%
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>

                        {/* 添加分数对应的Lottie动画 */}
                        <ResultLottieAnimation score={assessmentResult.overallScore} />

                        <motion.p
                            className="text-xl"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.7}}
                        >
                            {assessmentResult.assessment.message}
                        </motion.p>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.9}}
                        >
                            <Alert className="bg-gradient-to-r from-primary/5 to-purple-600/5 border-none">
                                <AlertTitle
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 font-semibold">
                                    Assessment Result
                                </AlertTitle>
                                <AlertDescription className="text-foreground/80">
                                    {assessmentResult.assessment.recommendation}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>

            <Card
                className="mb-8 border-none bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-300">
                <CardHeader>
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        className="flex items-center gap-3"
                    >
                        <div
                            className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                            <ChartPie className="h-5 w-5 text-white"/>
                        </div>
                        <CardTitle>Friendship Aspects</CardTitle>
                    </motion.div>
                </CardHeader>
                <CardContent>
                    <motion.div
                        className="w-full h-[400px]"
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.3}}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={chartData}>
                                <PolarGrid strokeOpacity={0.2}/>
                                <PolarAngleAxis
                                    dataKey="name"
                                    tick={{fill: 'var(--foreground)', fontSize: 12}}
                                />
                                <Radar
                                    name="Score"
                                    dataKey="value"
                                    stroke="url(#radarGradient)"
                                    fill="url(#radarGradient)"
                                    fillOpacity={0.3}
                                />
                                <Tooltip
                                    content={({active, payload}) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload as {
                                                name: string;
                                                value: number;
                                                description: string;
                                            }
                                            return (
                                                <div
                                                    className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
                                                    <h3 className="font-bold text-foreground">{data.name}</h3>
                                                    <p className="text-primary font-semibold">{data.value}%</p>
                                                    <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <defs>
                                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="var(--primary)"/>
                                        <stop offset="100%" stopColor="rgb(147, 51, 234)"/>
                                    </linearGradient>
                                </defs>
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </CardContent>
            </Card>

            <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1.1}}
            >
                <Button
                    size="lg"
                    onClick={() => setShowShareDialog(true)}
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                >
                    <Share2 className="mr-2 h-5 w-5"/>
                    Share Results
                    <div
                        className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>
                </Button>

                <Button
                    size="lg"
                    onClick={() => {
                        const svg = generateResultSVG(
                            friendName,
                            assessmentResult.overallScore,
                            assessmentResult.categoryScores
                        );
                        downloadSVG(svg, friendName);
                    }}
                    variant="outline"
                    className="group border-primary/20 hover:border-primary/40"
                >
                    <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                    Create Result SVG
                </Button>

                <Link href="/history">
                    <Button
                        size="lg"
                        variant="outline"
                        className="group border-primary/20 hover:border-primary/40"
                    >
                        <History className="mr-2 h-5 w-5 transition-transform group-hover:rotate-180 duration-500"/>
                        View History
                    </Button>
                </Link>

                <Link href="/">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => resetAssessment()}
                        className="group"
                    >
                        <RotateCcw className="mr-2 h-5 w-5 transition-transform group-hover:rotate-180 duration-500"/>
                        Start New Assessment
                    </Button>
                </Link>

                {assessmentResult.overallScore < 50 && (
                    <Link href="/resources">
                        <Button
                            size="lg"
                            variant="destructive"
                            className="group animate-pulse hover:animate-none"
                        >
                            <AlertCircle className="mr-2 h-5 w-5"/>
                            Get Help
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
                        </Button>
                    </Link>
                )}
            </motion.div>

            <ShareDialog
                open={showShareDialog}
                onOpenChange={setShowShareDialog}
                score={assessmentResult.overallScore}
                friendName={friendName || 'my friend'} // 添加默认值以防friendName为空
            />
        </div>
        </>
    )
}
