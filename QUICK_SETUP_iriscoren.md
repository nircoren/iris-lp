# Setup Guide for iriscoren.co.il 🚀

## מה יש לכם עכשיו:

✅ **Frontend מוכן** - index.html משתמש ב-SendGrid  
✅ **Backend מוכן** - Node.js server עם SendGrid  
✅ **Domain מוגדר** - iriscoren.co.il  
✅ **Email מוכן** - iris@iriscoren.co.il  

---

## שלבים להשלמה:

### 1. הגדרת SendGrid (5 דקות)
```bash
# הרשמה ל-SendGrid
https://signup.sendgrid.com/

# קבלת API Key
Settings → API Keys → Create API Key → Restricted Access
✅ Mail Send: Full Access

# אימות Sender
Settings → Sender Authentication → Verify Single Sender
✅ From Email: iris@iriscoren.co.il
```

### 2. התקנת Backend על Hetzner
```bash
# על השרת
cd /var/www/iriscoren.co.il
git clone [your-repo]
cd iris_website/server
npm install

# הגדרת סביבה
cp .env.example .env
nano .env
# מלא את ה-SENDGRID_API_KEY
```

### 3. הרצת השרת
```bash
# עם PM2 (מומלץ)
npm install -g pm2
pm2 start server.js --name "iris-website"
pm2 startup
pm2 save

# או ישירות
npm start
```

### 4. הגדרת Nginx
```nginx
# /etc/nginx/sites-available/iriscoren.co.il
server {
    listen 80;
    server_name iriscoren.co.il www.iriscoren.co.il;
    
    # Frontend (static files)
    location / {
        root /var/www/iriscoren.co.il/iris_website;
        index index.html;
        try_files $uri $uri/ =404;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# הפעלת האתר
sudo ln -s /etc/nginx/sites-available/iriscoren.co.il /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL Certificate (Certbot)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d iriscoren.co.il -d www.iriscoren.co.il
```

---

## בדיקה מהירה:

### Local Testing (לפני העלאה):
```bash
cd server
npm install
npm start

# בדפדפן אחר:
http://localhost:3000/api/health
```

### Production Testing:
```bash
# בדיקת backend
curl https://iriscoren.co.il/api/health

# בדיקת email
curl -X POST https://iriscoren.co.il/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'
```

---

## קובץ .env הסופי:
```env
SENDGRID_API_KEY=SG.your_actual_key_here
FROM_EMAIL=iris@iriscoren.co.il
FROM_NAME=איריס קורן
TO_EMAIL=iris@iriscoren.co.il
PORT=3000
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
ALLOWED_ORIGINS=https://iriscoren.co.il,https://www.iriscoren.co.il
```

---

## מבנה קבצים סופי:
```
iriscoren.co.il/
├── index.html              # דף הבית עם SendGrid
├── styles.css              # עיצוב
├── script-sendgrid.js       # JS עם SendGrid
├── thank-you.html          # דף תודה
├── images/                 # תמונות
└── server/                 # Backend
    ├── package.json
    ├── server.js
    ├── email-templates.js
    └── .env
```

---

## פתרון בעיות:

### אם הטופס לא שולח:
1. בדקו שה-backend רץ: `pm2 list`
2. בדקו logs: `pm2 logs iris-website`
3. בדקו ש-API Key תקין ב-SendGrid

### אם האימייל לא מגיע:
1. בדקו שה-sender מאומת ב-SendGrid
2. בדקו ספאם folder
3. בדקו SendGrid Activity ב-dashboard

---

## הכל מוכן! 🎉

הטופס יעבוד עכשיו עם SendGrid על iriscoren.co.il  
צריך רק להשלים את שלבי ההגדרה על השרת.
