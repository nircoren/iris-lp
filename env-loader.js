/**
 * Environment Variable Loader for Client-Side
 * This script can load .env variables in development environments
 * For production, values should be set directly in config.js
 */

class EnvLoader {
    constructor() {
        this.envVars = {};
    }

    async loadEnvFile() {
        try {
            const response = await fetch('./.env');
            if (!response.ok) {
                console.log('📝 No .env file found, using default config values');
                return;
            }

            const envContent = await response.text();
            this.parseEnvContent(envContent);
            return this.envVars;
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
}
