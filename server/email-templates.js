/**
 * Email templates for SendGrid integration
 * Contains HTML and text templates for different email types
 */

const contactFormTemplate = (data) => {
    return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>הודעה חדשה מאתר איריס קורן</title>
        <style>
            body {
                font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                direction: rtl;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #4a90e2 0%, #7b68ee 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .header .subtitle {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 30px;
            }
            .info-grid {
                display: grid;
                gap: 15px;
                margin-bottom: 25px;
            }
            .info-item {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border-right: 4px solid #4a90e2;
            }
            .info-item strong {
                color: #2c3e50;
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
            }
            .info-item span {
                color: #34495e;
                font-size: 14px;
            }
            .message-section {
                background: #ffffff;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .message-section h3 {
                color: #4a90e2;
                margin: 0 0 15px 0;
                font-size: 18px;
            }
            .message-content {
                color: #2c3e50;
                white-space: pre-wrap;
                line-height: 1.6;
                font-size: 15px;
            }
            .footer {
                background: #f8f9fa;
                padding: 20px 30px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer .timestamp {
                color: #6c757d;
                font-size: 12px;
                margin-bottom: 10px;
            }
            .footer .note {
                color: #495057;
                font-size: 14px;
                margin: 0;
            }
            .priority-badge {
                display: inline-block;
                background: #ff6b6b;
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 12px;
                font-weight: 600;
                margin-bottom: 15px;
            }
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                }
                .content, .header, .footer {
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✨ הודעה חדשה מהאתר</h1>
                <p class="subtitle">איריס קורן - סדנאות EFT לצוותי חינוך</p>
            </div>
            
            <div class="content">
                ${data.workshopType && data.workshopType !== 'לא נבחר' ? 
                    `<div class="priority-badge">🎯 בקשה ל${data.workshopType}</div>` : ''}
                
                <div class="info-grid">
                    <div class="info-item">
                        <strong>👤 שם מלא:</strong>
                        <span>${data.name}</span>
                    </div>
                    
                    <div class="info-item">
                        <strong>📧 כתובת אימייל:</strong>
                        <span>${data.email}</span>
                    </div>
                    
                    <div class="info-item">
                        <strong>📱 טלפון:</strong>
                        <span>${data.phone}</span>
                    </div>
                    
                    <div class="info-item">
                        <strong>🎯 סוג סדנה מבוקש:</strong>
                        <span>${data.workshopType}</span>
                    </div>
                </div>
                
                <div class="message-section">
                    <h3>💬 ההודעה:</h3>
                    <div class="message-content">${data.message}</div>
                </div>
            </div>
            
            <div class="footer">
                <div class="timestamp">📅 נשלח ב: ${data.timestamp}</div>
                <p class="note">
                    הודעה זו נשלחה מטופס יצירת הקשר באתר איריס קורן.<br>
                    ניתן להשיב ישירות לאימייל זה כדי ליצור קשר עם השולח.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const contactFormTextTemplate = (data) => {
    return `
הודעה חדשה מאתר איריס קורן
==================================

שם מלא: ${data.name}
כתובת אימייל: ${data.email}  
טלפון: ${data.phone}
סוג סדנה מבוקש: ${data.workshopType}

ההודעה:
--------
${data.message}

==================================
הודעה זו נשלחה מטופס יצירת הקשר באתר איריס קורן.
    `.trim();
};

// Template for auto-reply to users (optional)
const autoReplyTemplate = (data) => {
    return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>תודה על פנייתך - איריס קורן</title>
        <style>
            body {
                font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                direction: rtl;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .content {
                padding: 30px;
                text-align: center;
            }
            .icon {
                font-size: 48px;
                margin-bottom: 20px;
            }
            h1 {
                color: #2c3e50;
                margin-bottom: 20px;
            }
            p {
                color: #34495e;
                margin-bottom: 15px;
            }
            .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #6c757d;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="icon">✨</div>
                <h2>תודה רבה, ${data.name}!</h2>
            </div>
            
            <div class="content">
                <h1>ההודעה שלך התקבלה בהצלחה</h1>
                <p>איריס תחזור אליך בהקדם האפשרי, בדרך כלל תוך 24-48 שעות.</p>
                <p>אם הבקשה שלך דחופה, ניתן ליצור קשר ישירות בטלפון.</p>
            </div>
            
            <div class="footer">
                <p>איריס קורן - מומחית EFT לצוותי חינוך והוראה</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = {
    contactFormTemplate,
    contactFormTextTemplate,
    autoReplyTemplate
};
