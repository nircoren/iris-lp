/**
 * Environment Variable Loader for Client-Side
 * This script can load .env variables in development environments
 * For production, values should be set directly in config.js
 */

class EnvLoader {
    constructor() {
        this.envVars = {};
    }

    // Load .env file (only works in development with a local server)
    async loadEnvFile() {
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            console.log('🌐 Production environment - using hardcoded config values');
            return;
        }

        try {
            const response = await fetch('/.env');
            if (!response.ok) {
                console.log('📝 No .env file found, using default config values');
                return;
            }

            const envContent = await response.text();
            this.parseEnvContent(envContent);
            this.updateConfig();
            console.log('🔧 Loaded environment variables from .env file');
        } catch (error) {
            console.log('📝 Could not load .env file, using default config values');
        }
    }

    // Parse .env file content
    parseEnvContent(content) {
        const lines = content.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                    const value = valueParts.join('=').trim();
                    this.envVars[key.trim()] = value;
                }
            }
        });
    }

    // Update APP_CONFIG with loaded environment variables
    updateConfig() {
        if (!window.APP_CONFIG) return;

        if (this.envVars.CONTACT_EMAIL) {
            window.APP_CONFIG.CONTACT_EMAIL = this.envVars.CONTACT_EMAIL;
        }
        if (this.envVars.CONTACT_PHONE) {
            window.APP_CONFIG.CONTACT_PHONE = this.envVars.CONTACT_PHONE;
        }
        if (this.envVars.CONTACT_ADDRESS) {
            window.APP_CONFIG.CONTACT_ADDRESS = this.envVars.CONTACT_ADDRESS;
        }
        if (this.envVars.SITE_TITLE) {
            window.APP_CONFIG.SITE_TITLE = this.envVars.SITE_TITLE;
        }
        if (this.envVars.SITE_NAME) {
            window.APP_CONFIG.SITE_NAME = this.envVars.SITE_NAME;
        }
        if (this.envVars.OWNER_NAME) {
            window.APP_CONFIG.OWNER_NAME = this.envVars.OWNER_NAME;
        }
    }

    // Initialize the loader
    async init() {
        await this.loadEnvFile();
    }
}

// Auto-load environment variables when this script is loaded
if (typeof window !== 'undefined') {
    const envLoader = new EnvLoader();

    // Load env vars before DOM is ready
    document.addEventListener('DOMContentLoaded', async () => {
        await envLoader.init();

        // Trigger a custom event to signal that env vars are loaded
        const event = new CustomEvent('envLoaded');
        document.dispatchEvent(event);
    });
}
