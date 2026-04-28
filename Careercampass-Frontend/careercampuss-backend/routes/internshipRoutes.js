const express = require('express');
const router = express.Router();

const careerQueryMap = {
  'Software Engineer':   'Software Engineer internship Pakistan',
  'Data Scientist':      'Data Science internship Pakistan',
  'Doctor/Medical':      'Medical internship Pakistan hospital',
  'Core Engineer':       'Engineering internship Pakistan',
  'Business/Management': 'Business Management internship Pakistan',
  'Finance/Accounting':  'Finance Accounting internship Pakistan',
  'Educator':            'Teaching Education internship Pakistan',
  'Designer':            'Graphic Design internship Pakistan',
  'Network Engineer':    'Network Engineer internship Pakistan',
};

router.get('/search', async (req, res) => {
  const { career } = req.query;
  const query = careerQueryMap[career] || `${career} internship Pakistan`;

  try {
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=2&date_posted=month`,
      {
        headers: {
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;