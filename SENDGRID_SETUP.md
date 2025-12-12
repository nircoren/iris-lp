# הגדרת SendGrid לשליחת אימיילים 📧

## מה זה SendGrid?
SendGrid הוא שירות אימייל מקצועי של Twilio, מושלם לאתרים מקצועיים עם נפח גבוה של הודעות.

## יתרונות SendGrid:
- ✅ **עד 100 אימיילים ביום בחינם** לעד 30 יום
- ✅ **מהימנות גבוהה** - פחות סיכוי להיכנס לספאם
- ✅ **Analytics מפורט** - סטטיסטיקות על פתיחות ולחיצות
- ✅ **Template system** מקצועי
- ✅ **API מתקדם** עם אפשרויות רבות

---

## שלבי ההתקנה:

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
   - **From Email**: iris.koren@yourdomain.com (כתובת אמיתית!)
   - **Reply To**: אותה כתובת
   - **Address**: כתובת פיזית
4. לחץ "Create" ואמת דרך האימייל שיישלח

---

## הגדרת Backend (Node.js)

יצרתי לך שרת Node.js פשוט שמטפל בשליחת האימיילים:

### קבצים שנוצרו:
- `server/package.json` - תלויות הפרויקט
- `server/server.js` - השרת העיקרי
- `server/.env.example` - דוגמא לקובץ סביבה
- `index-sendgrid.html` - דף HTML מעודכן לSendGrid

### הרצת השרת:
```bash
cd server
npm install
# צור קובץ .env ומלא את הפרטים
npm start
```

---

## הגדרת הקבצים:

### 1. קובץ .env (ברור ב-server/)
```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=iris.koren@yourdomain.com
TO_EMAIL=iris.koren@yourdomain.com
PORT=3000
```

### 2. שימוש בקובץ החדש
השתמש ב-`index-sendgrid.html` במקום הקובץ הרגיל

---

## תכונות מתקדמות:

### 1. Email Templates
- צור templates יפים ב-SendGrid
- השתמש בהם במקום HTML פשוט

### 2. Analytics
- בדוק סטטיסטיקות בלוח הבקרה
- מי פתח, לחץ, וכו'

### 3. Webhooks
- קבל התראות על events (פתיחה, לחיצה)

---

## עלויות:
- **חינם**: 100 אימיילים/יום למשך 30 יום
- **Essential**: $14.95/חודש - 50,000 אימיילים
- **Pro**: $89.95/חודש - 100,000 אימיילים

---

## בדיקה:
1. הרץ את השרת: `npm start`
2. פתח את `index-sendgrid.html`
3. מלא את הטופס ושלח
4. בדוק שהאימייל הגיע
5. בדוק את הלוגים בקונסול

---

## השוואה עם פתרונות אחרים:

| תכונה | Formspree | EmailJS | SendGrid |
|--------|-----------|---------|----------|
| קלות הגדרה | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| בחינם | 50/חודש | 200/חודש | 100/יום |
| מהימנות | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| תכונות מתקדמות | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| דורש Backend | ❌ | ❌ | ✅ |

---

## מתי לבחור SendGrid?
- ✅ אתר מקצועי עם נפח גבוה של הודעות
- ✅ צריך analytics מפורט
- ✅ רוצה מהימנות מקסימלית
- ✅ יש ידע בNode.js או מפתח שיכול לעזור
- ❌ רוצה פתרון פשוט ומהיר

---

## פתרון בעיות:

### שגיאות נפוצות:
- **401 Unauthorized**: API Key שגוי
- **403 Forbidden**: Sender לא מאומת
- **CORS Error**: הרץ דרך שרת, לא file://

### טיפים:
- השתמש ב-HTTPS בפרודקשן
- שמור את ה-API Key במשתני סביבה
- בדוק logs ב-SendGrid Dashboard
