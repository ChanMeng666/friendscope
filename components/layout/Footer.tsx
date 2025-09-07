'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, Code } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t">
            <div className="container py-12 px-6">
                
                {/* Main Left-Right Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* Left Side - Project Information */}
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Project Brand */}
                        <div className="flex items-center space-x-4">
                            <Image
                                src="/friendscope-logo.svg"
                                alt="FriendScope Logo"
                                width={140}
                                height={85}
                                className="hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        {/* Project Description */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-foreground">FriendScope</h3>
                            <p className="text-muted-foreground leading-relaxed max-w-md">
                                A scientific approach to evaluating and strengthening friendships through personalized insights. 
                                Built with modern web technologies for optimal user experience.
                            </p>
                            
                            {/* Project Links */}
                            <div className="flex items-center space-x-6">
                                <Link
                                    href="https://github.com/ChanMeng666/friendscope"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
                                >
                                    <Code className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">Source Code</span>
                                </Link>
                                
                                <div className="text-xs text-muted-foreground">
                                    © {currentYear} All rights reserved
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Developer Information & Services */}
                    <motion.div 
                        className="space-y-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {/* Developer Brand */}
                        <div className="flex items-center space-x-4">
                            <Image
                                src="/chan_logo.svg"
                                alt="Chan Meng Logo"
                                width={50}
                                height={50}
                                className="hover:scale-105 transition-transform duration-300"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Chan Meng</h3>
                                <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-foreground uppercase tracking-wider">Contact</h4>
                            <div className="space-y-2">
                                <Link
                                    href="mailto:chanmeng.dev@gmail.com"
                                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
                                >
                                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">chanmeng.dev@gmail.com</span>
                                </Link>
                                
                                <Link
                                    href="https://github.com/ChanMeng666"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
                                >
                                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">Portfolio & Projects</span>
                                </Link>
                            </div>
                        </div>

                        {/* Business Promotion */}
                        <div className="bg-gradient-to-r from-muted/30 to-muted/20 rounded-xl p-6 border border-muted/50">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <motion.span
                                        initial={{ scale: 1 }}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            transition: {
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                ease: "easeInOut"
                                            }
                                        }}
                                        className="text-xl"
                                    >
                                        💡
                                    </motion.span>
                                    <h4 className="font-medium text-foreground">
                                        Need a custom application?
                                    </h4>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Specializing in modern web applications with React, Next.js, and TypeScript
                                </p>
                                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center space-x-1">
                                        <span>✨</span>
                                        <span>Custom Development</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <span>🚀</span>
                                        <span>Modern Stack</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <span>📱</span>
                                        <span>Responsive Design</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Credit */}
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center pt-8 mt-8 border-t border-muted/30"
                    >
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                            <span>Crafted with</span>
                            <motion.span
                                initial={{ scale: 1 }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    transition: {
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }
                                }}
                                className="text-red-400"
                            >
                                ❤️
                            </motion.span>
                            <span>by Chan Meng using Next.js & TypeScript</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </footer>
    );
}
