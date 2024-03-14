// server.js

const express = require('express');
const mongoose = require('mongoose');
const nanoid = require('nanoid'); // For generating short codes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (adjust connection string)
mongoose.connect('mongodb://localhost/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define URL schema (MongoDB)
const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortCode: String,
});

const UrlModel = mongoose.model('Url', urlSchema);

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint for shortening URLs
app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // Generate a short code (e.g., using NanoID)
  const shortCode = nanoid(6); // Customize the length as needed

  // Save to database
  const newUrl = new UrlModel({ longUrl, shortCode });
  await newUrl.save();

  // Return the short URL
  const shortUrl = `http://yourdomain.com/${shortCode}`;
  res.json({ shortUrl });
});

// API endpoint for redirecting short URLs
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  // Find the long URL in the database
  const url = await UrlModel.findOne({ shortCode });

  if (!url) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  // Redirect to the original URL
  res.redirect(url.longUrl);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
