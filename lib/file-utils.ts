/**
 * File and Blob utility functions
 * Provides centralized file handling operations
 */

/**
 * Download a Blob as a file
 * @param blob - The Blob to download
 * @param filename - The name for the downloaded file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

/**
 * Copy a Blob to the clipboard
 * @param blob - The Blob to copy
 * @throws Error if clipboard write fails
 */
export const copyBlobToClipboard = async (blob: Blob): Promise<void> => {
    await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
    ])
}

/**
 * Convert a canvas element to a Blob
 * @param canvas - The canvas element
 * @param type - The MIME type (default: 'image/png')
 * @param quality - The quality for jpeg/webp (0-1)
 * @returns Promise resolving to a Blob
 */
export const canvasToBlob = (
    canvas: HTMLCanvasElement,
    type: string = 'image/png',
    quality?: number
): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob)
                } else {
                    reject(new Error('Failed to create blob from canvas'))
                }
            },
            type,
            quality
        )
    })
}

/**
 * Download an image from a canvas element
 * @param canvas - The canvas element
 * @param filename - The name for the downloaded file
 * @param type - The image MIME type (default: 'image/png')
 * @param quality - The quality for jpeg/webp (0-1)
 */
export const downloadCanvasAsImage = async (
    canvas: HTMLCanvasElement,
    filename: string,
    type: string = 'image/png',
    quality?: number
): Promise<void> => {
    const blob = await canvasToBlob(canvas, type, quality)
    downloadBlob(blob, filename)
}

/**
 * Create a data URL from a Blob
 * @param blob - The Blob to convert
 * @returns Promise resolving to a data URL string
 */
export const blobToDataURL = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

/**
 * Convert a data URL to a Blob
 * @param dataURL - The data URL string
 * @returns Blob object
 */
export const dataURLToBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(',')
    const mimeMatch = arr[0].match(/:(.*?);/)
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream'
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

/**
 * Generate a unique filename with timestamp
 * @param baseName - The base name for the file
 * @param extension - The file extension (without dot)
 * @returns Filename with timestamp
 */
export const generateTimestampedFilename = (
    baseName: string,
    extension: string
): string => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    return `${baseName}-${timestamp}.${extension}`
}

/**
 * Check if the browser supports clipboard API
 * @returns Boolean indicating support
 */
export const supportsClipboard = (): boolean => {
    return typeof navigator !== 'undefined' &&
        typeof navigator.clipboard !== 'undefined' &&
        typeof navigator.clipboard.write === 'function'
}
