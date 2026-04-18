const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running smoothly.' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // In a real app, this would send an email or save to DB.
  console.log(`Received message from ${name} (${email}): ${message}`);
  res.status(200).json({ success: true, message: 'Message sent successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
