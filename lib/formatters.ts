/**
 * Centralized formatting utilities
 * Provides consistent formatting functions across the application
 */

/**
 * Round a score to the nearest integer
 * @param score - The score value to round
 * @returns Rounded integer score
 */
export const formatScore = (score: number): number => Math.round(score)

/**
 * Format a number as a percentage string
 * @param value - The value to format (0-100)
 * @returns Formatted percentage string (e.g., "85%")
 */
export const formatPercentage = (value: number): string => `${Math.round(value)}%`

/**
 * Format a date string for display
 * @param date - ISO date string or Date object
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string
 */
export const formatDate = (
    date: string | Date,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }
): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-US', options)
}

/**
 * Format a date for mobile display (shorter format)
 * @param date - ISO date string or Date object
 * @returns Short formatted date string (e.g., "Jan 5")
 */
export const formatDateMobile = (date: string | Date): string => {
    return formatDate(date, { month: 'short', day: 'numeric' })
}

/**
 * Format a date with time
 * @param date - ISO date string or Date object
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: string | Date): string => {
    return formatDate(date, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

/**
 * Format a relative time string (e.g., "2 days ago")
 * @param date - ISO date string or Date object
 * @returns Relative time string
 */
export const formatRelativeTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
}

/**
 * Format a number with thousand separators
 * @param value - The number to format
 * @returns Formatted number string
 */
export const formatNumber = (value: number): string => {
    return value.toLocaleString('en-US')
}
