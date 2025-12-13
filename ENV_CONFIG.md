# Environment Configuration Guide

This project now supports environment-based configuration for contact information and other site settings.

## Configuration Files

### 1. `.env` file
Contains environment variables that can be modified without touching the code:

```env
# Contact Information
CONTACT_EMAIL=iris@iriscoren.co.il
CONTACT_PHONE=050-123-4567
CONTACT_ADDRESS=מושב ישראל

# Website Information
SITE_TITLE=איריס קורן - סדנת EFT לצוותי חינוך והוראה
SITE_NAME=איריס קורן
OWNER_NAME=איריס קורן

# API Configuration
API_BASE_URL_DEV=http://localhost:3333
API_BASE_URL_PROD=

# Feature Flags
ENABLE_CONTACT_FORM=true
ENABLE_FLOATING_CTA=true
```

### 2. `config.js`
Contains the actual configuration that the website uses. Values from `.env` will override these defaults in development.

### 3. `env-loader.js`
Handles loading environment variables from the `.env` file in development environments.

## How It Works

1. **Development Environment** (localhost):
   - The `env-loader.js` attempts to load the `.env` file
   - If successful, it updates the `config.js` values with the environment variables
   - Contact information and other settings are populated dynamically

2. **Production Environment**:
   - Uses the hardcoded values in `config.js`
   - No attempt is made to load the `.env` file for security reasons

## Dynamic Elements

The following HTML elements are now populated dynamically from configuration:

- **Contact Email**: `#contactEmail`
- **Contact Phone**: `#contactPhone`
- **Contact Address**: `#contactAddress`
- **Navigation Brand**: `#navBrand`
- **Copyright Text**: `#copyrightText`
- **Page Title**: `document.title`

## Benefits

✅ **Easy Updates**: Change contact information in one place (`.env` file)  
✅ **Environment Separation**: Different values for development vs production  
✅ **Security**: Sensitive information can be kept in `.env` (not committed to git)  
✅ **Flexibility**: Easy to add new configuration options  

## Usage

1. **To update contact information**: Edit the `.env` file
2. **To add new config options**: 
   - Add to `.env` file
   - Update `config.js` with default values
   - Update `env-loader.js` to handle the new variable
   - Use in your HTML/JavaScript as needed

## Git Configuration

Add `.env` to your `.gitignore` file to prevent committing sensitive information:

```gitignore
.env
```

Create a `.env.example` file with placeholder values for other developers:

```env
CONTACT_EMAIL=your-email@example.com
CONTACT_PHONE=your-phone-number
CONTACT_ADDRESS=your-address
```

## Testing

1. Open the site in a browser
2. Check the browser console for configuration messages:
   - `🔧 App Config:` - Shows the loaded configuration
   - `✅ Dynamic content initialized from config` - Confirms content was updated
   - `🔧 Loaded environment variables from .env file` - Shows env file was loaded (development only)
