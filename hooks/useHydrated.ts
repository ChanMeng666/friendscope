'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to track client-side hydration status
 * Useful for preventing hydration mismatches with server-rendered content
 * @returns boolean indicating if the component has been hydrated on the client
 */
export function useHydrated(): boolean {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted
}
