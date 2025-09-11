'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LottieAnimation } from '@/components/LottieAnimation';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Brain, Heart, Trophy } from 'lucide-react';
import GEOHead from '@/components/GEOHead';

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Stagger animation variants for cards
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
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    // Feature cards data
    const features = [
        {
            title: 'Quick Start',
            description: 'Begin your assessment instantly - no registration required.',
            icon: Sparkles,
            gradient: 'from-purple-500 to-purple-700'
        },
        {
            title: 'Smart Analysis',
            description: 'Answer concise, scientifically-backed questions about your friendship.',
            icon: Brain,
            gradient: 'from-blue-500 to-blue-700'
        },
        {
            title: 'Instant Insights',
            description: 'Receive immediate results with actionable recommendations.',
            icon: Heart,
            gradient: 'from-pink-500 to-pink-700'
        }
    ];

    return (
        <>
            <GEOHead pageType="home" />
            <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 md:pt-10 md:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Welcome to FriendScope
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                        Evaluate your friendships through scientific questionnaires
                    </p>

                    {/* Main Lottie Animation */}
                    <motion.div
                        className="w-64 h-64 mx-auto mb-12 relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* 背景光环效果 */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            initial={{ opacity: 0 }}
                            whileHover={{
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.2, 1],
                                background: [
                                    "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
                                    "radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)",
                                    "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* 主动画容器 */}
                        <motion.div
                            className="relative cursor-pointer"
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, 5, -5, 0],
                                transition: {
                                    scale: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 10
                                    },
                                    rotate: {
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }
                            }}
                            whileTap={{
                                scale: 0.9,
                                rotate: -10,
                                transition: {
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 5
                                }
                            }}
                        >
                            {/* Lottie动画 */}
                            <motion.div
                                className="relative z-10"
                                animate={{
                                    y: [0, -10, 0],
                                    filter: [
                                        "drop-shadow(0 4px 6px rgba(59,130,246,0.1))",
                                        "drop-shadow(0 8px 12px rgba(147,51,234,0.2))",
                                        "drop-shadow(0 4px 6px rgba(59,130,246,0.1))"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <LottieAnimation
                                    path="/Lottie/jumping-ball.json"
                                    className="w-full h-full outline-none"
                                />
                            </motion.div>

                            {/* 点击涟漪效果 */}
                            <motion.div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                whileTap={{
                                    boxShadow: [
                                        "0 0 0 0 rgba(59,130,246,0.4)",
                                        "0 0 0 20px rgba(59,130,246,0)",
                                    ],
                                    transition: { duration: 0.5 }
                                }}
                            />

                            {/* 悬停时的装饰性粒子 */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                whileHover={{
                                    opacity: 1,
                                }}
                                initial={{ opacity: 0 }}
                            >
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600"
                                        initial={{
                                            x: "50%",
                                            y: "50%",
                                            scale: 0,
                                            opacity: 0
                                        }}
                                        whileHover={{
                                            scale: [0, 1, 0],
                                            opacity: [0, 1, 0],
                                            x: ["50%", `${50 + Math.cos(i * 60) * 100}%`],
                                            y: ["50%", `${50 + Math.sin(i * 60) * 100}%`],
                                        }}
                                        transition={{
                                            duration: 1,
                                            delay: i * 0.1,
                                            repeat: Infinity,
                                            repeatType: "loop",
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* 交互提示文字 */}
                        <motion.p
                            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            Try hovering and clicking!
                        </motion.p>
                    </motion.div>


                    {/* Animated CTA Button */}
                    <Link href="/assess">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all duration-300 px-8 py-2 text-lg"
                            >
                                Start Your Journey
                                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>

            {/* Features Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "show" : "hidden"}
                className="container mx-auto px-4 py-16 bg-black/5 rounded-3xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="h-full"
                        >
                            <Card className="h-full border-none bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-colors duration-300">
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Why Use FriendScope Section */}
            <div className="container mx-auto px-4 py-12 md:py-16 mb-8 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                        <div className="flex-1 mb-4 md:mb-0">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Trophy className="w-8 h-8 text-primary" />
                                Why Use FriendScope?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    'Gain deeper insights into your friendships',
                                    'Identify areas for improvement in your relationships',
                                    'Celebrate the strengths of your connections',
                                    'Receive personalized recommendations'
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        className="flex items-center gap-3 text-lg"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full md:w-80 h-48 md:h-80 flex items-center justify-center mb-8 md:mb-0">
                            <div className="w-3/5 md:w-full h-full">
                                <LottieAnimation
                                    path="/Lottie/graphical-transformation.json"
                                    className="w-4/5 md:w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        </>
    );
}
