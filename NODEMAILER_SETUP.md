# הגדרת SendGrid לשליחת אימיילים 📧

## מה זה SendGrid?
SendGrid הוא שירות אימייל מקצועי של Twilio, מושלם לאתרים מקצועיים ו-hosting על Hetzner.

## יתרונות SendGrid:
- ✅ **עד 100 אימיילים ביום בחינם** לחיים
- ✅ **מהימנות גבוהה** - פחות סיכוי להיכנס לספאם
- ✅ **Analytics מפורט** - סטטיסטיקות על פתיחות ולחיצות
- ✅ **Template system** מקצועי
- ✅ **API מתקדם** עם אפשרויות רבות
- ✅ **מושלם ל-Hetzner** - עובד מעולה עם VPS

---

## הגדרת SendGrid:

### 1. הרשמה לSendGrid
1. כנס לאתר: https://signup.sendgrid.com/
2. הירשם לחשבון חינם
3. אמת את כתובת האימייל שלך
4. השלם את תהליך ה-onboarding

### 2. יצירת API Key
1. בלוח הבקרה, לך ל-"Settings" → "API Keys"
2. לחץ על "Create API Key"
3. בחר "Restricted Access"
4. תן שם: "Iris Website Contact Form"
5. הפעל הרשאות:
   - **Mail Send** → Full Access
   - **Template Engine** → Read Access (אופציונלי)
6. שמור את ה-**API Key** במקום בטוח!

### 3. אימות Sender Identity
1. לך ל-"Settings" → "Sender Authentication"
2. לחץ על "Verify a Single Sender"
3. מלא את הפרטים:
   - **From Name**: איריס קורן
   - **From Email**: iris.koren@yourdomain.com
   - **Reply To**: אותה כתובת
   - **Address**: כתובת פיזית
4. לחץ "Create" ואמת דרך האימייל שיישלח

---

## קבצים שנוצרו:

### Backend (Node.js):
- `server/package.json` - תלויות הפרויקט
- `server/server.js` - השרת עם SendGrid
- `server/.env.example` - דוגמא לקובץ סביבה
- `server/email-templates.js` - תבניות אימייל

### Frontend:
- `index-sendgrid.html` - דף HTML מעודכן
- `script-sendgrid.js` - JavaScript לSendGrid

---

## הרצת הפרויקט על Hetzner:

### 1. העלאת קבצים ל-Hetzner:
```bash
# על השרת של Hetzner
git clone your-repo
cd iris_website
cd server
npm install
```

### 2. הגדרת משתני סביבה:
```bash
# צור קובץ .env
cp .env.example .env
nano .env
```

### 3. הרצת השרת:
```bash
npm start
# או עם PM2 לפרודקשן:
pm2 start server.js --name "iris-website"
```

### 4. הגדרת Nginx (מומלץ):
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        root /path/to/iris_website;
        index index-sendgrid.html;
        try_files $uri $uri/ =404;
    }
    
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## הגדרת .env:

```env
# SendGrid Settings
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Email Settings
FROM_EMAIL=iris.koren@yourdomain.com
FROM_NAME=איריס קורן
TO_EMAIL=iris.koren@yourdomain.com

# Server Settings
PORT=3000
NODE_ENV=production

# Optional: Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

---

## תכונות מיוחדות:

### 1. Email Templates
- HTML מעוצב עם CSS
- תמיכה בעברית מלאה
- לוגו ועיצוב מותאם
- אפשרות להשתמש ב-SendGrid Templates

### 2. Security
- Rate limiting (הגבלת שליחות)
- Input validation ו-sanitization
- CORS protection
- XSS protection

### 3. Error Handling
- Retry mechanism
- Detailed logging
- Graceful failures
- Health check endpoint

### 4. Analytics
- SendGrid analytics מובנה
- לוגים מפורטים
- מעקב אחרי delivery status

---

## עלויות SendGrid:
- **חינם**: 100 אימיילים ביום לחיים
- **Essential**: $14.95/חודש - 50,000 אימיילים
- **Pro**: $89.95/חודש - 100,000 אימיילים
- **Hetzner VPS**: החל מ-€3.29/חודש

---

## Troubleshooting על Hetzner:

### 1. API Key Issues:
```bash
# בדוק שה-API key תקין
curl -X GET https://api.sendgrid.com/v3/user/account \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 2. Firewall:
```bash
# פתח פורטים נדרשים
ufw allow 3000
ufw allow 80
ufw allow 443
```

### 3. DNS Settings:
- ודא ש-domain מצביע לשרת Hetzner
- הגדר A record ל-IP של השרת
- הגדר SPF ו-DKIM records (אופציונלי)

### 4. Sender Authentication:
- ודא שה-FROM_EMAIL מאומת ב-SendGrid
- בדוק ב-"Sender Authentication" שהסטטוס "Verified"

---

## יתרונות SendGrid על פני SMTP:
- ✅ **מהימנות גבוהה יותר** - פחות ספאם
- ✅ **Analytics מפורט** - סטטיסטיקות מלאות
- ✅ **Template system** - עיצוב מקצועי
- ✅ **Webhook support** - התראות על events
- ✅ **Reputation management** - ניהול מוניטין
- ✅ **Scalable** - מתאים לגידול

---

## בדיקה מהירה:

### Local Testing:
```bash
cd server
npm install
npm start
# פתח http://localhost:3000
```

### Production על Hetzner:
```bash
# בדוק שהשרת רץ
curl http://your-domain.com/api/health

# בדוק שליחת אימייל
curl -X POST http://your-domain.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'
```

---

## Monitoring ו-Maintenance:

### 1. לוגים:
```bash
# צפייה בלוגים
pm2 logs iris-website

# לוגים של נגינקס
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 2. Updates:
```bash
# עדכון packages
npm update

# restart השרת
pm2 restart iris-website
```

### 3. Backup:
- גיבוי קבצי .env
- גיבוי לוגים חשובים
- תיעוד של הגדרות SendGrid
