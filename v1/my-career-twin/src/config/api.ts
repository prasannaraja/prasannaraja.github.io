/**
 * Centralized API Configuration for Career Core Service & Digital Twin Backend
 */

export function getApiBaseUrl(): string {
    // 1. One-time cleanup for any legacy localStorage keys
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem('career_twin_api_url');
        } catch {
            // ignore
        }
    }

    // 2. In local development (localhost / Vite dev server), use relative path (proxied by Vite)
    if (
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1')
    ) {
        return '';
    }

    // 3. Permanent backend endpoint for all environments
    return 'https://my-digital-twin.duckdns.org';
}

export const API_BASE = getApiBaseUrl();

/**
 * Application Authentication Key for Digital Twin Backend Handshake
 */
export const TWIN_APP_KEY = (
    import.meta as unknown as { env: { VITE_TWIN_APP_KEY?: string } }
).env.VITE_TWIN_APP_KEY || 'twin_live_sec_98f12a64c87e2b109ad5c';
