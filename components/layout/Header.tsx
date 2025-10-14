'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Menu,
    ClipboardCheck,
    Info,
    History,
    HelpCircle,
    ChevronRight,
    Trophy
} from 'lucide-react'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigationItems = [
        { href: '/about', label: 'About', icon: Info },
        { href: '/dashboard', label: 'Dashboard', icon: ClipboardCheck },
        { href: '/achievements', label: 'Achievements', icon: Trophy },
        { href: '/history', label: 'History', icon: History },
        { href: '/resources', label: 'Resources', icon: HelpCircle },
        { href: '/assess', label: 'Assessment', icon: ClipboardCheck },
    ]

    if (!isMounted) return null

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-b shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="container flex items-center justify-between h-16 px-4 md:px-6">

                <Link href="/" className="flex items-center gap-2">
                    {/* Logo - 不带动画效果 */}
                    <div className="relative w-12 h-12 md:w-16 md:h-16">
                        <Image
                            src="/friendscope-logo.svg"
                            alt="FriendScope Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* 标题 - 带动画效果，在移动端隐藏文字 Logo */}
                    <div className="hidden md:block relative group">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                        >
                            FriendScope
                        </motion.span>
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                    {navigationItems.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={item.href}>
                                <Button
                                    variant={item.href === '/assess' ? 'default' : 'ghost'}
                                    className={`group relative ${
                                        item.href === '/assess'
                                            ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'
                                            : ''
                                    }`}
                                >
                                    <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                                    {item.href !== '/assess' ? (
                                        <div className="relative group/underline">
                                            <span>{item.label}</span>
                                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover/underline:w-full transition-all duration-300" />
                                        </div>
                                    ) : (
                                        <>
                                            <span>{item.label}</span>
                                            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle>Navigation Menu</SheetTitle>
                            <SheetDescription>Access all pages from here</SheetDescription>
                        </SheetHeader>
                        <nav className="flex flex-col space-y-4 mt-8 px-2">
                            {navigationItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="w-full" // 添加全宽度
                                >
                                    <Link href={item.href} className="w-full block">
                                        <Button
                                            variant={item.href === '/assess' ? 'default' : 'ghost'}
                                            className={`w-full justify-start group relative py-6 text-lg ${
                                                item.href === '/assess'
                                                    ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'
                                                    : ''
                                            }`}
                                        >
                                            <item.icon className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                                            {item.href !== '/assess' ? (
                                                <div className="relative group/underline">
                                                    <span>{item.label}</span>
                                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover/underline:w-full transition-all duration-300" />
                                                </div>
                                            ) : (
                                                <>
                                                    <span>{item.label}</span>
                                                    <ChevronRight className="ml-auto w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </Button>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

            </div>
        </motion.header>
    )
}
