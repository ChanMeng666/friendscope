/**
 * Centralized Framer Motion animation variants
 * Provides consistent animations across the application
 */

import type { Variants, Transition } from 'framer-motion'

/**
 * Default spring transition for smooth animations
 */
export const springTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 15
}

/**
 * Fade in and slide up animation
 */
export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    },
    exit: { opacity: 0, y: -20 }
}

/**
 * Fade in and slide down animation (for headers)
 */
export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    },
    exit: { opacity: 0, y: -20 }
}

/**
 * Fade in and scale animation
 */
export const fadeInScale: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.95 }
}

/**
 * Container variant for staggered children animations
 */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

/**
 * Item variant for staggered children (use with staggerContainer)
 */
export const staggerItem: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
}

/**
 * Slide in from left animation
 */
export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -50 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 }
    },
    exit: { opacity: 0, x: -50 }
}

/**
 * Slide in from right animation
 */
export const slideInRight: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 }
    },
    exit: { opacity: 0, x: 50 }
}

/**
 * Pulse animation for attention-grabbing elements
 */
export const pulse: Variants = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 2
        }
    }
}

/**
 * Hover scale animation (for buttons/cards)
 */
export const hoverScale = {
    scale: 1.02,
    transition: { duration: 0.2 }
}

/**
 * Tap scale animation (for buttons)
 */
export const tapScale = {
    scale: 0.98
}

/**
 * Page transition variants
 */
export const pageTransition: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 }
    }
}

/**
 * Card hover effect
 */
export const cardHover: Variants = {
    initial: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    hover: {
        y: -4,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: { duration: 0.2 }
    }
}

/**
 * Create a stagger delay for indexed items
 * @param index - Item index
 * @param baseDelay - Base delay in seconds
 * @returns Delay value in seconds
 */
export const staggerDelay = (index: number, baseDelay: number = 0.1): number => {
    return index * baseDelay
}
