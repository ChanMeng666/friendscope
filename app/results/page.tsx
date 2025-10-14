'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

/**
 * Results overview page - redirects to history page
 * Individual results should be viewed at /results/[id]
 */
export default function ResultsPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to history page which shows all assessment results
        router.push('/history')
    }, [router])

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
            <LoadingSpinner />
        </div>
    )
}
