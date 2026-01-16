'use client'

import { useMemo, memo } from 'react'
import dynamic from 'next/dynamic'
import { format } from 'date-fns'
import { useIsMobile, useHydrated } from '@/hooks'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ComparisonChartProps {
    data: Array<{
        date: string;
        overallScore: number;
        categoryScores: Record<string, number>;
    }>
}

function ComparisonChartComponent({ data }: ComparisonChartProps) {
    const mounted = useHydrated()
    const isMobile = useIsMobile()

    const categories = useMemo(
        () => Object.keys(data[0]?.categoryScores || {}),
        [data]
    )

    const dates = useMemo(
        () => data.map(item => format(new Date(item.date), isMobile ? 'MMM d' : 'MMM d, yyyy')),
        [data, isMobile]
    )

    const series = useMemo(() => [
        {
            name: 'Overall Score',
            data: data.map(item => Math.round(item.overallScore))
        },
        ...categories.map(category => ({
            name: category,
            data: data.map(item => Math.round(item.categoryScores[category]))
        }))
    ], [data, categories])

    const options = useMemo(() => ({
        chart: {
            type: 'line' as const,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: !isMobile
            }
        },
        xaxis: {
            categories: dates,
            labels: {
                style: {
                    fontSize: isMobile ? '10px' : '12px',
                    fontFamily: 'inherit'
                },
                rotate: isMobile ? -45 : 0,
                rotateAlways: isMobile
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                style: {
                    fontSize: isMobile ? '10px' : '12px',
                    fontFamily: 'inherit'
                },
                formatter: (value: number) => `${Math.round(value)}%`
            }
        },
        stroke: {
            width: 2,
            curve: 'smooth' as const,
            dashArray: series.map((_, index) => index === 0 ? 0 : 5)
        },
        colors: [
            '#000',
            '#3b82f6',
            '#ef4444',
            '#10b981',
            '#f59e0b',
            '#6366f1',
            '#8b5cf6',
            '#ec4899',
            '#14b8a6',
            '#f97316'
        ],
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (value: number) => `${Math.round(value)}%`
            }
        },
        legend: {
            position: isMobile ? 'bottom' as const : 'right' as const,
            fontSize: isMobile ? '10px' : '12px',
            fontFamily: 'inherit'
        },
        grid: {
            padding: {
                right: isMobile ? 10 : 20,
                left: isMobile ? 5 : 15
            }
        }
    }), [isMobile, dates, series])

    if (!mounted) return (
        <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full bg-gray-100 animate-pulse rounded-lg" />
    )

    return (
        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] relative">
            <Chart
                options={options}
                series={series}
                type="line"
                height="100%"
                className="transition-all duration-300 ease-in-out"
            />
            {isMobile && (
                <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-500 pb-2">
                    Scroll horizontally to view more
                </div>
            )}
        </div>
    )
}

// Memoized export for performance optimization
export const ComparisonChart = memo(ComparisonChartComponent)
