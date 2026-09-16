/**
 * Centralized API Configuration for Career Core Service & Digital Twin Backend
 */

export function getApiBaseUrl(): string {
    // 1. Explicit environment variable
    const envUrl = (
        import.meta as unknown as { env: { VITE_API_URL?: string } }
    ).env.VITE_API_URL;
    if (envUrl) {
        return envUrl.replace(/\/+$/, '');
    }

    // 2. Clear any stale localStorage career_twin_api_url if present
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem('career_twin_api_url');
        } catch {
            // ignore
        }
    }

    // 3. In local development (localhost / Vite dev server), use relative path (proxied by Vite)
    if (
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1')
    ) {
        return '';
    }

    // 4. In production (e.g. prasannaraja.github.io), use standard HTTPS port 443
    return 'https://my-digital-twin.duckdns.org';
}

export const API_BASE = getApiBaseUrl();
