const express = require('express');
const sgMail = require('@sendgrid/mail');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const morgan = require('morgan');
require('dotenv').config();

const emailTemplates = require('./email-templates');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
            fontSrc: ["'self'", "fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"]
        }
    }
}));

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = process.env.ALLOWED_ORIGINS ?
            process.env.ALLOWED_ORIGINS.split(',') :
            ['http://localhost:3000', 'http://localhost:8000'];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // 5 requests per window
    message: {
        error: 'יותר מדי בקשות. נסו שוב בעוד כמה דקות.',
        code: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Apply rate limiting to email endpoint
app.use('/api/send-email', limiter);

// Logging
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Validation rules for contact form
const contactValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('השם חייב להכיל בין 2 ל-100 תווים')
        .escape(),
    body('email')
        .isEmail()
        .withMessage('כתובת אימייל לא תקינה')
        .normalizeEmail(),
    body('phone')
        .optional()
        .isMobilePhone('he-IL')
        .withMessage('מספר טלפון לא תקין'),
    body('workshopType')
        .optional()
        .isIn(['חד פעמית', 'ארוכת טווח', ''])
        .withMessage('סוג סדנה לא חוקי'),
    body('message')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('ההודעה חייבת להכיל בין 10 ל-1000 תווים')
        .escape()
];

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Iris Koren Website API',
        sendgrid: process.env.SENDGRID_API_KEY ? 'Configured' : 'Not configured'
    });
});

// Send email endpoint
app.post('/api/send-email', contactValidation, async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'נתונים לא תקינים',
                details: errors.array()
            });
        }

        const { name, email, phone, workshopType, message } = req.body;

        // Prepare email content
        const emailHtml = emailTemplates.contactFormTemplate({
            name,
            email,
            phone: phone || 'לא סופק',
            workshopType: workshopType || 'לא נבחר',
            message,
            timestamp: new Date().toLocaleString('he-IL', {
                timeZone: 'Asia/Jerusalem',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        });

        const emailText = emailTemplates.contactFormTextTemplate({
            name,
            email,
            phone: phone || 'לא סופק',
            workshopType: workshopType || 'לא נבחר',
            message
        });

        // Send email
        const msg = {
            to: process.env.TO_EMAIL,
            from: {
                email: process.env.FROM_EMAIL,
                name: process.env.FROM_NAME
            },
            replyTo: email,
            subject: `הודעה חדשה מאתר איריס קורן - ${workshopType || 'יצירת קשר'}`,
            text: emailText,
            html: emailHtml,
            categories: ['website-contact'],
            customArgs: {
                source: 'iris-website',
                workshop_type: workshopType || 'general'
            }
        };

        await sgMail.send(msg);

        console.log(`✅ Email sent successfully to ${process.env.TO_EMAIL} from ${email}`);

        res.json({
            success: true,
            message: 'ההודעה נשלחה בהצלחה! איריס תחזור אליכם בקרוב.'
        });

    } catch (error) {
        console.error('❌ Error sending email:', error);

        // Send detailed error info in development
        if (process.env.NODE_ENV !== 'production') {
            console.error('Full error details:', {
                message: error.message,
                code: error.code,
                response: error.response?.body
            });
        }

        let errorMessage = 'אירעה שגיאה בשליחת ההודעה. אנא נסו שוב מאוחר יותר.';

        // Handle specific SendGrid errors
        if (error.code === 401) {
            errorMessage = 'שגיאה בהגדרות השרת. אנא צרו קשר ישירות.';
        } else if (error.code === 403) {
            errorMessage = 'גישה נדחתה. אנא בדקו את פרטי ההתקשרות.';
        } else if (error.code >= 400 && error.code < 500) {
            errorMessage = 'נתונים שגויים. אנא בדקו את הפרטים שהוזנו.';
        }

        res.status(500).json({
            success: false,
            error: errorMessage,
            code: error.code || 'UNKNOWN_ERROR'
        });
    }
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'נתיב לא נמצא',
        path: req.originalUrl
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'שגיאת שרת פנימית'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 SendGrid API Key: ${process.env.SENDGRID_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
    console.log(`📬 From Email: ${process.env.FROM_EMAIL}`);
    console.log(`📮 To Email: ${process.env.TO_EMAIL}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
