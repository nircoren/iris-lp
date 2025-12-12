# הגדרת EmailJS לשליחת אימיילים

## מה זה EmailJS?
EmailJS הוא שירות שמאפשר לשלוח אימיילים ישירות מהדפדפן ללא צורך בשרת backend.

## שלבי ההתקנה:

### 1. הרשמה לEmailJS
1. כנס לאתר: https://www.emailjs.com/
2. הירשם לחשבון חינם (עד 200 אימיילים בחודש)
3. אמת את כתובת האימייל שלך

### 2. הגדרת Email Service
1. בלוח הבקרה של EmailJS, לחץ על "Email Services"
2. לחץ על "Add Service"
3. בחר את ספק האימייל שלך (Gmail, Outlook, Yahoo, וכו')
4. עקב אחרי ההוראות להתחברות
5. שמור את **Service ID** שיווצר

### 3. יצירת Email Template
1. לחץ על "Email Templates"
2. לחץ על "Create New Template"
3. השתמש בטמפלט הזה:

```
Subject: הודעה חדשה מאתר איריס קורן - {{workshop_type}}

שלום איריס,

קיבלת הודעה חדשה מהאתר:

שם: {{from_name}}
אימייל: {{from_email}}
טלפון: {{phone}}
סוג סדנה מבוקש: {{workshop_type}}

הודעה:
{{message}}

---
הודעה זו נשלחה מטופס יצירת הקשר באתר.
```

4. שמור את **Template ID**

### 4. קבלת Public Key
1. לחץ על "Account" בתפריט העליון
2. בחלק "API Keys", מצא את ה-**Public Key**

### 5. עדכון הקוד
עדכן את הקובץ `script.js` עם הפרטים שלך:

```javascript
// החלף את הערכים האלה:
emailjs.init("YOUR_PUBLIC_KEY"); // הכנס את ה-Public Key שלך
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // הכנס Service ID ו-Template ID
```

### 6. עדכון כתובת המייל
בקובץ `script.js`, החלף את:
```javascript
to_email: 'iris.koren@example.com'
```
עם כתובת האימייל האמיתית של איריס.

## חלופות נוספות:

### 1. Formspree (קל יותר)
- אתר: https://formspree.io/
- עד 50 טפסים בחודש בחינם
- צריך רק להוסיף action לטופס

### 2. Netlify Forms (אם השרת ב-Netlify)
- מובנה בNetlify
- פשוט מאוד לשימוש

### 3. Backend שרת (מקצועי יותר)
- Node.js עם Nodemailer
- PHP עם PHPMailer
- Python עם Flask/Django

## בדיקה
לאחר ההגדרה:
1. מלא את הטופס באתר
2. בדוק שהאימייל מגיע
3. בדוק את הקונסול לשגיאות

## פתרון בעיות נפוצות:
- **שגיאת CORS**: ודא שהדומיין מורשה ב-EmailJS
- **אימייל לא מגיע**: בדוק תיקיית ספאם
- **שגיאת Template**: ודא שכל הפרמטרים קיימים בטמפלט
