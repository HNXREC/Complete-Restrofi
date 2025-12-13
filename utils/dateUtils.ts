/**
 * Date utility functions for Indian Standard Time (IST)
 */

/**
 * Format a date to IST timezone
 * @param date - Date string or Date object or timestamp number
 * @returns Formatted date string in IST
 */
export const formatToIST = (date: string | Date | number): string => {
    const dateObj = toDate(date);

    return dateObj.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

/**
 * Get current IST timestamp
 * @returns ISO string in IST
 */
export const getCurrentIST = (): string => {
    return new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
    });
};

/**
 * Helper to convert input to Date object
 */
const toDate = (date: string | Date | number): Date => {
    if (typeof date === 'number') return new Date(date);
    if (typeof date === 'string') return new Date(date);
    return date;
};

/**
 * Format time only in IST
 * @param date - Date string or Date object or timestamp number
 * @returns Time string in IST (e.g., "6:30 PM")
 */
export const formatTimeIST = (date: string | Date | number): string => {
    const dateObj = toDate(date);

    return dateObj.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

/**
 * Format date only in IST
 * @param date - Date string or Date object or timestamp number
 * @returns Date string in IST (e.g., "10 Dec 2025")
 */
export const formatDateIST = (date: string | Date | number): string => {
    const dateObj = toDate(date);

    return dateObj.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

/**
 * Get relative time in IST (e.g., "5 minutes ago")
 * @param date - Date string or Date object or timestamp number
 * @returns Relative time string
 */
export const getRelativeTimeIST = (date: string | Date | number): string => {
    const dateObj = toDate(date);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return formatDateIST(dateObj);
};
