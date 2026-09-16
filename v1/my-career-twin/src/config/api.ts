/**
 * Centralized API Configuration for Career Core Service & Digital Twin Backend
 */

export function getApiBaseUrl(): string {
    // 1. Runtime override via localStorage (if set)
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('career_twin_api_url');
        if (stored) {
            // Clean up legacy/stale port 3000 on my-digital-twin.duckdns.org
            const cleanUrl = stored.replace(/:3000\/?$/, '').replace(/\/+$/, '');
            if (cleanUrl !== stored) {
                localStorage.setItem('career_twin_api_url', cleanUrl);
            }
            return cleanUrl;
        }
    }

    // 2. Explicit environment variable
    const envUrl = (
        import.meta as unknown as { env: { VITE_API_URL?: string } }
    ).env.VITE_API_URL;
    if (envUrl) {
        return envUrl.replace(/\/+$/, '');
    }

    // 3. In local development (localhost / Vite dev server), use relative path (proxied by Vite)
    if (
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1')
    ) {
        return '';
    }

    // 4. In production (e.g. prasannaraja.github.io), use DuckDNS HTTPS
    return 'https://my-digital-twin.duckdns.org';
}

export const API_BASE = getApiBaseUrl();
