'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { LottieAnimation } from '@/components/LottieAnimation'
import { ArrowRight } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

export interface EmptyStateProps {
    /**
     * Title displayed prominently
     */
    title: string
    /**
     * Description text below the title
     */
    description: string
    /**
     * Path to Lottie animation file (defaults to empty-box)
     */
    lottieAnimation?: string
    /**
     * CTA button label (if not provided, button won't be shown)
     */
    ctaLabel?: string
    /**
     * Navigation path when CTA is clicked
     */
    ctaHref?: string
    /**
     * Custom action for CTA (overrides ctaHref)
     */
    onCtaClick?: () => void
    /**
     * Additional content to render below the CTA
     */
    children?: ReactNode
    /**
     * Custom CSS class for the container
     */
    className?: string
}

/**
 * Reusable empty state component with Lottie animation and CTA
 */
export function EmptyState({
    title,
    description,
    lottieAnimation = '/Lottie/empty-box.json',
    ctaLabel,
    ctaHref,
    onCtaClick,
    children,
    className = ''
}: EmptyStateProps) {
    const router = useRouter()

    const handleCtaClick = () => {
        if (onCtaClick) {
            onCtaClick()
        } else if (ctaHref) {
            router.push(ctaHref)
        }
    }

    return (
        <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className={`text-center py-12 md:py-16 ${className}`}
        >
            {/* Lottie Animation */}
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 md:mb-8">
                <LottieAnimation
                    path={lottieAnimation}
                    className="w-full h-full"
                />
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                {title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto px-4">
                {description}
            </p>

            {/* CTA Button */}
            {(ctaLabel && (ctaHref || onCtaClick)) && (
                <Button
                    onClick={handleCtaClick}
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                >
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
            )}

            {/* Additional Content */}
            {children}
        </motion.div>
    )
}

/**
 * Preset: No assessments state for history page
 */
export function NoAssessmentsState() {
    return (
        <EmptyState
            title="No Assessments Yet"
            description="Start your first friendship assessment to begin tracking your relationships."
            ctaLabel="Start Assessment"
            ctaHref="/assess"
        />
    )
}

/**
 * Preset: No data state for dashboard page
 */
export function NoDashboardDataState() {
    return (
        <EmptyState
            title="No Data Yet"
            description="Start taking assessments to see your relationship dashboard with insights and analytics."
            ctaLabel="Take Your First Assessment"
            ctaHref="/assess"
        />
    )
}

/**
 * Preset: Start journey state for achievements page
 */
export function StartJourneyState() {
    return (
        <EmptyState
            title="Start Your Journey"
            description="Complete assessments to unlock achievements and track your progress!"
            ctaLabel="Take Your First Assessment"
            ctaHref="/assess"
        />
    )
}
