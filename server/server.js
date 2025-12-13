const express = require('express');
const path = require('path');
const {Resend} = require('resend');

const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${NODE_ENV}` });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }
      const resend = new Resend(process.env.RESEND_API_KEY);
      const response = await resend.emails.send({
          from: 'iris@iriscoren.co.il',
          to: 'nircoren@gmail.com',
          subject: 'Hello World',
          html: `<p>${message}</p>`
      });
      if (response.data.id) {
        console.log('Email sent successfully with ID:', response.id);
          // Check if it's a JSON request
          if (req.headers['content-type'] === 'application/json') {
              res.json({ success: true, message: 'Email sent successfully' });
          } else {
              res.redirect('/thank-you.html');
          }
      } else {
          res.status(500).send('Error sending email');
      }
  } catch (error) {
    console.error('Error sending email:', error);

    if (req.headers['content-type'] === 'application/json') {
      res.status(500).json({
        success: false,
        error: 'Failed to send email'
      });
    } else {
      res.status(500).send('Error sending email');
    }
  }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
