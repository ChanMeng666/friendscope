'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LottieAnimation } from '@/components/LottieAnimation';
import Link from 'next/link';
import {
    ExternalLink,
    Users,
    Book,
    Headphones,
    Globe,
    ArrowRight,
    ShieldCheck,
    Clock
} from 'lucide-react';
import GEOHead from '@/components/GEOHead';

const resources = [
    {
        title: "Professional Support",
        description: "Connect with licensed professionals who specialize in relationship counseling",
        icon: Headphones,
        gradient: "from-blue-500 to-blue-600",
        items: [
            {
                name: "BetterHelp - Online Counseling",
                description: "24/7 access to licensed therapists specializing in relationship counseling.",
                link: "https://www.betterhelp.com",
                badge: "Recommended"
            },
            {
                name: "Psychology Today - Find a Therapist",
                description: "Comprehensive directory of mental health professionals in your area.",
                link: "https://www.psychologytoday.com/us/therapists"
            }
        ]
    },
    {
        title: "Educational Resources",
        description: "Learn about building and maintaining healthy friendships",
        icon: Book,
        gradient: "from-purple-500 to-purple-600",
        items: [
            {
                name: "Healthy Friendship Guide",
                description: "Comprehensive guide on building and maintaining strong friendships.",
                link: "https://www.mindtools.com/pages/article/good-relationships.htm",
                badge: "Popular"
            },
            {
                name: "Boundary Setting Tips",
                description: "Learn how to establish and maintain healthy boundaries in friendships.",
                link: "https://www.psychologytoday.com/us/blog/boundaries-at-work"
            }
        ]
    },
    {
        title: "Community Support",
        description: "Connect with others and share experiences",
        icon: Users,
        gradient: "from-pink-500 to-pink-600",
        items: [
            {
                name: "Meetup - Friendship Groups",
                description: "Find local friendship groups and social activities in your area.",
                link: "https://www.meetup.com/topics/friendship/"
            },
            {
                name: "7 Cups - Online Support",
                description: "Free emotional support and active listening services.",
                link: "https://www.7cups.com",
                badge: "Free"
            }
        ]
    }
];

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Resources",
        description: "All resources are carefully vetted and regularly updated"
    },
    {
        icon: Globe,
        title: "Global Access",
        description: "Available 24/7 from anywhere in the world"
    },
    {
        icon: Clock,
        title: "Immediate Help",
        description: "Quick access to support when you need it"
    }
];

export default function ResourcesPage() {
    return (
        <>
            <GEOHead pageType="resources" />
            <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-10 md:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Support Resources
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Find help and guidance to strengthen your relationships
                    </p>

                    {/* Hero Animation */}
                    <div className="w-64 h-64 mx-auto mb-8">
                        <LottieAnimation
                            path="/Lottie/star-moving.json"
                            className="w-full h-full"
                        />
                    </div>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="border-none bg-white/50 backdrop-blur-sm">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <feature.icon className="w-8 h-8 text-primary" />
                                        <div>
                                            <h3 className="font-semibold">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Resources Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8">
                    {resources.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sectionIndex * 0.2 }}
                        >
                            <Card className="border-none bg-white/50 backdrop-blur-sm overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center`}>
                                            <section.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">{section.title}</CardTitle>
                                            <CardDescription>{section.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        {section.items.map((item, itemIndex) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: itemIndex * 0.1 }}
                                            >
                                                <div className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-colors">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-semibold">{item.name}</h3>
                                                                {item.badge && (
                                                                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                                                                        {item.badge}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                                        </div>
                                                        <Link
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button
                                                                size="sm"
                                                                className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                                                            >
                                                                Visit
                                                                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <Card className="border-none bg-gradient-to-r from-primary/10 to-purple-600/10">
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-bold mb-4">Need Immediate Support?</h2>
                            <p className="text-muted-foreground mb-6">
                                Our friendship assessment can help identify specific areas for improvement in your relationships.
                            </p>
                            <Link href="/assess">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                                >
                                    Take Assessment Now
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
        </>
    );
}
