const express = require('express');
const router = express.Router();
const jobSeekerController = require('../controllers/jobSeekerController');

// 1. Resume Optimization Route
router.post('/optimize', jobSeekerController.optimizeResume);

// 2. Skill Gap Analysis Route
router.post('/analyze-skill-gap', jobSeekerController.analyzeSkillGap);

module.exports = router;
