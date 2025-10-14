'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LottieAnimation } from '@/components/LottieAnimation';
import { getAllAssessmentTypes } from '@/lib/assessments/registry';
import { Clock, ChevronRight } from 'lucide-react';
import GEOHead from '@/components/GEOHead';

export default function AssessmentSelectionPage() {
    const router = useRouter();
    const assessmentTypes = getAllAssessmentTypes();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <>
            <GEOHead pageType="assessment" />
            <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            Choose Your Assessment
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Select the type of relationship you'd like to evaluate
                        </p>
                    </motion.div>

                    {/* Assessment Type Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
                    >
                        {assessmentTypes.map((assessmentType) => {
                            const Icon = assessmentType.icon;
                            return (
                                <motion.div
                                    key={assessmentType.type}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="h-full"
                                >
                                    <Card className="h-full border-none bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 shadow-md hover:shadow-xl group cursor-pointer overflow-hidden">
                                        <CardHeader className="relative">
                                            {/* Background gradient on hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${assessmentType.color.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                            {/* Icon */}
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${assessmentType.color.gradient} flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>

                                            <CardTitle className="text-2xl relative z-10 group-hover:text-primary transition-colors">
                                                {assessmentType.name}
                                            </CardTitle>
                                            <CardDescription className="relative z-10 text-base">
                                                {assessmentType.description}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="relative z-10">
                                            <div className="space-y-4">
                                                {/* Stats */}
                                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{assessmentType.estimatedTime || '5-8 minutes'}</span>
                                                    </div>
                                                    <span>{assessmentType.questions.length} questions</span>
                                                </div>

                                                {/* CTA Button */}
                                                <Button
                                                    onClick={() => router.push(`/assess/${assessmentType.type}`)}
                                                    className="w-full group/button relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                                                    size="lg"
                                                >
                                                    Start Assessment
                                                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover/button:translate-x-1" />
                                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Decorative Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex justify-center"
                    >
                        <div className="w-48 h-48">
                            <LottieAnimation
                                path="/Lottie/jumping-ball.json"
                                className="w-full h-full"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
