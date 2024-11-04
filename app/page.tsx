// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { LottieAnimation } from '@/components/LottieAnimation'
//
// export default function Home() {
//     return (
//         <div className="container mx-auto px-4 py-8 md:py-16">
//             <section className="text-center mb-8 md:mb-16">
//                 <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to FriendScope</h1>
//                 <p className="text-lg md:text-xl mb-6 md:mb-8">Evaluate your friendships through scientific questionnaires</p>
//                 {/* Lottie Animation */}
//                 <div className="w-64 h-64 mx-auto mb-8">
//                     <LottieAnimation
//                         path="/Lottie/jumping-ball.json"
//                         className="w-full h-full"
//                     />
//                 </div>
//                 <Link href="/assess">
//                     <Button size="lg" className="w-full md:w-auto">Start Assessment</Button>
//                 </Link>
//             </section>
//
//             <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-16">
//                 {[
//                     { title: 'Quick Start', description: 'Begin your assessment instantly - no registration required.' },
//                     { title: 'Smart Questions', description: 'Answer concise, scientifically-backed questions about your friendship.' },
//                     { title: 'Instant Insights', description: 'Receive immediate results with actionable recommendations.' },
//                 ].map((item, index) => (
//                     <Card key={index}>
//                         <CardHeader>
//                             <CardTitle>{item.title}</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <CardDescription>{item.description}</CardDescription>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </section>
//
//             <section className="text-center">
//                 <h2 className="text-2xl font-bold mb-4">Why Use FriendScope?</h2>
//                 <ul className="list-disc list-inside text-left max-w-2xl mx-auto space-y-2">
//                     <li>Gain deeper insights into your friendships</li>
//                     <li>Identify areas for improvement in your relationships</li>
//                     <li>Celebrate the strengths of your connections</li>
//                     <li>Receive personalized recommendations for nurturing friendships</li>
//                 </ul>
//             </section>
//         </div>
//     )
// }

'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LottieAnimation } from '@/components/LottieAnimation';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Brain, Heart, Trophy } from 'lucide-react';

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
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-10 pb-10">
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
                    <div className="w-64 h-64 mx-auto mb-12 transition-transform hover:scale-105">
                        <LottieAnimation
                            path="/Lottie/jumping-ball.json"
                            className="w-full h-full"
                        />
                    </div>

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
            <div className="container mx-auto px-4 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
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
                        <div className="w-full md:w-80 h-80">
                            <LottieAnimation
                                path="/Lottie/graphical-transformation.json"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
