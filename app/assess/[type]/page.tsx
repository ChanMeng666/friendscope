'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAssessmentStore } from '@/lib/store';
import { useHistoryStore } from '@/lib/history-store';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { LottieAnimation } from '@/components/LottieAnimation';
import GEOHead from '@/components/GEOHead';
import { getAssessmentConfig } from '@/lib/assessments/registry';
import { calculateScores } from '@/lib/core/scoring';

// 烟花动画组件
const FireworkAnimation = ({ show }: { show: boolean }) => (
    <AnimatePresence>
        {show && (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute -top-16 -right-16 w-32 h-32 pointer-events-none z-20"
            >
                <LottieAnimation
                    path="/Lottie/fireworks.json"
                    className="w-full h-full"
                    loop={false}
                />
            </motion.div>
        )}
    </AnimatePresence>
);

// 问题选项组件
const QuestionOption = ({ value, label, id, isSelected }: {
    value: string;
    label: string;
    id: string;
    isSelected: boolean;
}) => {
    const [showFirework, setShowFirework] = useState(false);

    useEffect(() => {
        if (isSelected) {
            setShowFirework(true);
            const timer = setTimeout(() => setShowFirework(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isSelected]);

    return (
        <motion.div
            className="flex-1 text-center relative min-w-0 max-w-[80px] md:max-w-[100px]"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
        >
            <div className={`
                flex flex-col items-center gap-1 md:gap-2 p-1 md:p-2 rounded-lg transition-all duration-300
                ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
            `}>
                <div className="relative">
                    <RadioGroupItem
                        value={value}
                        id={id}
                        className={`
                            h-4 w-4 md:h-6 md:w-6 transition-all duration-300
                            ${isSelected ?
                                'border-primary bg-primary scale-110' :
                                'hover:border-primary/50'
                            }
                        `}
                    />
                    {isSelected && (
                        <motion.div
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            className="absolute -top-1 -right-1"
                        >
                            <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary"/>
                        </motion.div>
                    )}
                    <FireworkAnimation show={showFirework}/>
                </div>
                <Label
                    htmlFor={id}
                    className={`
                        cursor-pointer text-xs md:text-sm transition-colors duration-300
                        ${isSelected ?
                            'text-primary font-medium' :
                            'text-muted-foreground hover:text-primary/80'
                        }
                        text-ellipsis max-w-[60px] md:max-w-full
                    `}
                >
                    {label}
                </Label>
            </div>
        </motion.div>
    );
};

export default function DynamicAssessmentPage() {
    const router = useRouter();
    const params = useParams();
    const assessmentType = params.type as string;

    const {
        questions,
        currentQuestionIndex,
        answers,
        assessmentType: currentType,
        initializeAssessment,
        setAnswer,
        nextQuestion,
        resetAssessment
    } = useAssessmentStore();
    const { addAssessment } = useHistoryStore();

    const [isLoading, setIsLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [targetName, setTargetName] = useState('');
    const [notes, setNotes] = useState('');
    const [config, setConfig] = useState(getAssessmentConfig(assessmentType));

    // 初始化评测
    useEffect(() => {
        const assessmentConfig = getAssessmentConfig(assessmentType);

        if (!assessmentConfig) {
            router.push('/assess');
            return;
        }

        setConfig(assessmentConfig);
        initializeAssessment(assessmentType);
        setIsLoading(false);
    }, [assessmentType, initializeAssessment, router]);

    // 检查是否所有问题都已回答
    useEffect(() => {
        setSelectedAnswer('');
        if (questions.length > 0 && currentQuestionIndex === questions.length - 1) {
            const allAnswered = questions.every(q => answers[q.id]);
            if (allAnswered) {
                setShowDialog(true);
            }
        }
    }, [currentQuestionIndex, questions, answers]);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

    const handleAnswer = (answer: string) => {
        if (!currentQuestion) return;

        setSelectedAnswer(answer);
        setAnswer(currentQuestion.id, answer);

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            }
        }, 1000);
    };

    const handleSubmit = () => {
        if (!targetName.trim() || !config) {
            return;
        }

        // 使用通用评分算法计算分数
        const result = calculateScores(answers, questions, config.healthThresholds);

        // 创建评测结果
        const assessmentResult = {
            id: Date.now().toString(),
            assessmentType: assessmentType,
            date: new Date().toISOString(),
            targetName: targetName.trim(),
            friendName: targetName.trim(), // 向后兼容
            notes: notes.trim(),
            overallScore: result.overallScore,
            categoryScores: result.categoryScores,
            assessment: result.assessment
        };

        // 保存到历史
        addAssessment(assessmentResult);

        // 重置评测
        resetAssessment();

        // 跳转到结果页
        router.push(`/results/${assessmentResult.id}`);
    };

    if (isLoading || !config || questions.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <>
            <GEOHead pageType="assessment" />
            <div className="container mx-auto px-4 py-8 max-w-4xl md:max-w-5xl relative">
                {/* Interactive Star Animation */}
                <div className="absolute -left-32 top-1/5 w-64 h-64 z-10 opacity-90 pointer-events-none">
                    <LottieAnimation
                        path="/Lottie/revolve.json"
                        className="w-full h-full"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm relative overflow-visible">
                        <CardHeader className="text-center mb-8">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                {config.name}
                            </CardTitle>
                            <div className="relative mt-4">
                                <Progress value={progress} className="h-2" />
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                                >
                                    <span className="text-sm text-muted-foreground text-center justify-center">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </span>
                                </motion.div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestionIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    <h2 className="text-xl text-center mb-8">
                                        {currentQuestion?.text}
                                    </h2>
                                    <RadioGroup
                                        value={selectedAnswer}
                                        onValueChange={handleAnswer}
                                        className="grid grid-cols-1 gap-4 md:flex md:gap-4 px-2 md:px-4 max-w-full overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2 md:gap-4">
                                            <div className="text-sm font-medium text-primary w-full md:w-24 text-center md:text-left">
                                                Agree
                                            </div>
                                            <div className="flex flex-row md:flex-1 justify-between w-full max-w-[600px] px-2 md:px-4 gap-1 md:gap-4">
                                                {currentQuestion?.options.map((option, index) => (
                                                    <QuestionOption
                                                        key={index}
                                                        value={option}
                                                        label={option}
                                                        id={`option-${index}`}
                                                        isSelected={selectedAnswer === option}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-sm font-medium text-primary w-full md:w-24 text-center md:text-right">
                                                Disagree
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </motion.div>
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* 完成对话框 */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Your Assessment</DialogTitle>
                        <DialogDescription>
                            Please provide some information to save your {config.name.toLowerCase()} results.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="targetName">{config.targetEntity} Name</Label>
                            <Input
                                id="targetName"
                                value={targetName}
                                onChange={(e) => setTargetName(e.target.value)}
                                placeholder={`Enter ${config.targetEntity?.toLowerCase()} name`}
                            />
                        </div>
                        <div>
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add any additional notes..."
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            disabled={!targetName.trim()}
                            className="w-full bg-gradient-to-r from-primary to-purple-600"
                        >
                            View Results
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
