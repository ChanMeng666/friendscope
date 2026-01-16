'use client'

import { useState, useEffect } from 'react'
import { MOBILE_BREAKPOINT } from '@/lib/assessments/constants'

/**
 * Custom hook to detect if the viewport is mobile-sized
 * @param breakpoint - The width threshold in pixels (defaults to MOBILE_BREAKPOINT)
 * @returns boolean indicating if viewport width is below the breakpoint
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        // Check on mount
        checkMobile()

        // Listen for resize events
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [breakpoint])

    return isMobile
}
