'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LottieAnimation } from '@/components/LottieAnimation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    Shield,
    Heart,
    Lock,
    Sparkles,
    ArrowRight,
    Check,
    ExternalLink
} from 'lucide-react'
import GEOHead from '@/components/GEOHead'

const features = [
    {
        icon: Shield,
        title: "Our Mission",
        description: "FriendScope is dedicated to helping people understand and improve their friendships through scientific assessment and personalized insights. We believe that strong, healthy friendships are fundamental to personal well-being and happiness.",
        color: "from-blue-500 to-blue-700"
    },
    {
        icon: Heart,
        title: "How It Works",
        description: "Take our scientifically designed assessment, receive detailed insights into different aspects of your friendship, and get personalized recommendations for improvement - all in a matter of minutes.",
        color: "from-pink-500 to-pink-700"
    },
    {
        icon: Lock,
        title: "Privacy & Data",
        description: "Your privacy is our top priority. All assessments are anonymous, and we do not store any personal information. Your responses are only used to generate your results and are not saved after you close the browser.",
        color: "from-purple-500 to-purple-700"
    },
    {
        icon: Sparkles,
        title: "Scientific Basis",
        description: "Our assessment is based on established psychological research on interpersonal relationships. We continuously update our questions and algorithms to reflect the latest findings in friendship and social psychology studies.",
        color: "from-amber-500 to-amber-700"
    }
]

const benefits = [
    "Evidence-based assessment methodology",
    "Instant, personalized insights",
    "Actionable improvement recommendations",
    "Complete privacy and anonymity",
    "Regular updates based on latest research",
    "User-friendly interface"
]

export default function AboutPage() {

    return (
        <>
            <GEOHead pageType="about" />
            <div className="relative min-h-screen bg-gradient-to-b from-background to-background/80">
            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-10 md:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        About FriendScope
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Understanding and strengthening friendships through science
                    </p>

                    {/* Main Animation */}
                    <motion.div
                        className="w-64 h-64 mx-auto mb-12 relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                duration: 0.8,
                                ease: "easeOut"
                            }
                        }}
                    >
                        {/* 背景光晕效果 */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur-xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <motion.div
                            className="relative cursor-pointer"
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                }
                            }}
                            whileTap={{
                                scale: 0.9,
                                rotate: -5,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10
                                }
                            }}
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <LottieAnimation
                                path="/Lottie/interactive-star.json"
                                className="w-full h-full"
                            />

                            {/* 点击时的涟漪效果 */}
                            <motion.div
                                className="absolute inset-0 bg-primary/10 rounded-full"
                                whileTap={{
                                    scale: [1, 2],
                                    opacity: [0.5, 0],
                                    transition: { duration: 0.5 }
                                }}
                            />
                        </motion.div>
                    </motion.div>

                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="container px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-none bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-300">
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="container px-4 py-16">
                <Card className="border-none bg-white/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center relative"> {/* 新的flex容器 */}
                        <CardHeader className="pb-16 pt-2"> {/* 调整padding */}
                            <CardTitle className="text-2xl text-center">
                                Why Choose FriendScope?
                            </CardTitle>
                        </CardHeader>

                        <div className="w-64 h-8 absolute -mt-16"> {/* 调整大小和位置 */}
                            <LottieAnimation
                                path="/Lottie/wave-line.json"
                                className="w-full h-full"
                            />
                        </div>

                        <CardContent className="w-full pt-4"> {/* 调整内容区域 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={benefit}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-3 p-4 rounded-lg hover:bg-white/60 transition-colors"
                                    >
                                        <div className="flex-shrink-0">
                                            <Check className="w-5 h-5 text-primary" />
                                        </div>
                                        <span>{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>


            {/* CTA Section */}
            <div className="container px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold mb-6">Ready to Strengthen Your Friendships?</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/assess">
                            <Button
                                size="lg"
                                className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                            >
                                Start Assessment
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </Button>
                        </Link>
                        <Link href="/resources" className="group">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-primary/20 hover:border-primary/40"
                            >
                                Learn More
                                <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        </>
    )
}
