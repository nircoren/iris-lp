// Environment configuration for client-side
window.APP_CONFIG = {
    // Detect if we're in development (localhost) or production
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',

    // Website Information
    SITE_TITLE: 'איריס קורן - סדנת EFT לצוותי חינוך והוראה',
    SITE_NAME: 'איריס קורן',
    OWNER_NAME: 'איריס קורן',

    // API endpoints based on environment
    get API_BASE_URL() {
        if (this.isDevelopment) {
            return 'http://localhost:3333';
        } else {
            // Production - use relative path that will resolve to /api/contact
            return '';
        }
    },

    get CONTACT_ENDPOINT() {
        if (this.isDevelopment) {
            return `${this.API_BASE_URL}/api/contact`;
        } else {
            // Production - use relative path
            return '/api/contact';
        }
    }
};

console.log('🔧 App Config:', {
    isDevelopment: window.APP_CONFIG.isDevelopment,
    apiBaseUrl: window.APP_CONFIG.API_BASE_URL,
    contactEndpoint: window.APP_CONFIG.CONTACT_ENDPOINT
});
