'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAssessmentStore } from '@/lib/store';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LottieAnimation } from '@/components/LottieAnimation';
import GEOHead from '@/components/GEOHead';

// 添加烟花动画组件
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

// 更新问题选项组件
const QuestionOption = ({ value, label, id, isSelected }: {
    value: string;
    label: string;
    id: string;
    isSelected: boolean;
}) => {
    const [showFirework, setShowFirework] = useState(false);

    // 当选项被选中时触发烟花动画
    useEffect(() => {
        if (isSelected) {
            setShowFirework(true);
            // 动画播放完毕后隐藏
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
            {/*<div className="flex flex-col items-center gap-2">*/}
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
                                'border-primary bg-primary scale-110 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground' :
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

export default function AssessmentPage() {
    const router = useRouter();
    const {questions, currentQuestionIndex, answers, setAnswer, nextQuestion, resetAssessment} = useAssessmentStore();
    const [isLoading, setIsLoading] = useState(true);
    const [showSeeResults, setShowSeeResults] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        resetAssessment();
        setIsLoading(false);
    }, [resetAssessment]);

    useEffect(() => {
        setSelectedAnswer('');
        if (currentQuestionIndex === questions.length - 1) {
            const allAnswered = questions.every(q => answers[q.id]);
            if (allAnswered) {
                setShowSeeResults(true);
            }
        }
    }, [currentQuestionIndex, questions, answers]);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setAnswer(currentQuestion.id, answer);
        // 延长切换时间，让用户能看到完整的烟花动画
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            }
        }, 1000);
    };

    if (isLoading) {
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
                            Friendship Assessment
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
                                    {currentQuestion.text}
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
                                            {currentQuestion.options.map((option, index) => (
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

                        <AnimatePresence>
                            {showSeeResults && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="mt-12 flex justify-center"
                                >
                                    <Button
                                        onClick={() => router.push('/results')}
                                        className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all duration-300 px-8 py-6 text-lg"
                                    >
                                        See Your Results
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
        </>
    );
}
