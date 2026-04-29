const express = require('express');
const router = express.Router();
const { optimizeResume, analyzeSkills } = require('../controllers/jobSeekerController');
const upload = require('../config/multerConfig'); // Ensure you have multer config file

// Resume Upload Route (Using Multer for PDF)
// Note: Agar multer config nahi hai, to neeche wala use karein:
const multer = require('multer');
const storage = multer.memoryStorage();
const upload2 = multer({ storage: storage });

router.post('/optimize-resume', upload2.single('resume'), optimizeResume);

// Skill Analysis Route
router.post('/analyze-skills', analyzeSkills);

module.exports = router;
