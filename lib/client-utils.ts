/**
 * Client-side and SSR utility functions
 * Provides safe access to browser APIs in Next.js environment
 */

/**
 * Check if code is running on the client (browser) side
 */
export const isClient = (): boolean => typeof window !== 'undefined';

/**
 * Check if code is running on the server side
 */
export const isServer = (): boolean => typeof window === 'undefined';

/**
 * Execute a function only on the client side
 * @param fn - Function to execute
 * @param fallback - Optional fallback value for server-side
 */
export function onClient<T>(fn: () => T, fallback?: T): T | undefined {
    if (isClient()) {
        return fn();
    }
    return fallback;
}

/**
 * Safe localStorage wrapper that handles SSR
 */
export const safeLocalStorage = {
    /**
     * Get an item from localStorage safely
     */
    getItem: (key: string): string | null => {
        if (isServer()) return null;
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },

    /**
     * Set an item in localStorage safely
     */
    setItem: (key: string, value: string): boolean => {
        if (isServer()) return false;
        try {
            localStorage.setItem(key, value);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Remove an item from localStorage safely
     */
    removeItem: (key: string): boolean => {
        if (isServer()) return false;
        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Clear all localStorage safely
     */
    clear: (): boolean => {
        if (isServer()) return false;
        try {
            localStorage.clear();
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Get parsed JSON from localStorage
     */
    getJSON: <T>(key: string, defaultValue: T): T => {
        const item = safeLocalStorage.getItem(key);
        if (!item) return defaultValue;
        try {
            return JSON.parse(item) as T;
        } catch {
            return defaultValue;
        }
    },

    /**
     * Set JSON in localStorage
     */
    setJSON: <T>(key: string, value: T): boolean => {
        try {
            return safeLocalStorage.setItem(key, JSON.stringify(value));
        } catch {
            return false;
        }
    }
};

/**
 * Safe sessionStorage wrapper that handles SSR
 */
export const safeSessionStorage = {
    getItem: (key: string): string | null => {
        if (isServer()) return null;
        try {
            return sessionStorage.getItem(key);
        } catch {
            return null;
        }
    },

    setItem: (key: string, value: string): boolean => {
        if (isServer()) return false;
        try {
            sessionStorage.setItem(key, value);
            return true;
        } catch {
            return false;
        }
    },

    removeItem: (key: string): boolean => {
        if (isServer()) return false;
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }
};

/**
 * Get the current URL pathname safely
 */
export const getPathname = (): string => {
    return onClient(() => window.location.pathname, '/') ?? '/';
};

/**
 * Get URL search params safely
 */
export const getSearchParams = (): URLSearchParams => {
    return onClient(
        () => new URLSearchParams(window.location.search),
        new URLSearchParams()
    ) ?? new URLSearchParams();
};

/**
 * Check if a media query matches
 * @param query - Media query string (e.g., '(prefers-color-scheme: dark)')
 */
export const matchesMediaQuery = (query: string): boolean => {
    return onClient(
        () => window.matchMedia(query).matches,
        false
    ) ?? false;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
    return matchesMediaQuery('(prefers-reduced-motion: reduce)');
};

/**
 * Check if user prefers dark color scheme
 */
export const prefersDarkMode = (): boolean => {
    return matchesMediaQuery('(prefers-color-scheme: dark)');
};

/**
 * Get viewport dimensions safely
 */
export const getViewport = (): { width: number; height: number } => {
    return onClient(
        () => ({
            width: window.innerWidth,
            height: window.innerHeight
        }),
        { width: 0, height: 0 }
    ) ?? { width: 0, height: 0 };
};

/**
 * Safely scroll to an element or position
 */
export const scrollTo = (
    options: ScrollToOptions | { top: number; left?: number; behavior?: ScrollBehavior }
): void => {
    onClient(() => window.scrollTo(options));
};

/**
 * Safely scroll element into view
 */
export const scrollIntoView = (
    element: Element | null,
    options?: ScrollIntoViewOptions
): void => {
    if (element && isClient()) {
        element.scrollIntoView(options);
    }
};

/**
 * Copy text to clipboard safely
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    if (isServer()) return false;

    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch {
            return false;
        }
    }
};
