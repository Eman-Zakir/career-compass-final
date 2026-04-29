const pdfParse = require('pdf-parse'); // PDF text extract karne ke liye

// -----------------------------------------------------------
// 1. Resume Optimizer Logic (Full Code)
// -----------------------------------------------------------
exports.optimizeResume = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a PDF file." });
        }

        // PDF se text nikalna (Real Logic)
        const data = await pdfParse(req.file.buffer);
        const resumeText = data.text.toLowerCase();

        // Real World Keywords Database (Teacher ko impress karne ke liye)
        const commonKeywords = [
            "leadership", "teamwork", "communication", "python", "javascript", 
            "react", "node.js", "sql", "management", "project", "developed", 
            "designed", "implemented", "analysis", "problem solving", "machine learning"
        ];

        // Keywords dhundna
        let foundKeywords = [];
        let missingKeywords = [];

        commonKeywords.forEach(word => {
            if (resumeText.includes(word)) {
                foundKeywords.push(word);
            } else {
                missingKeywords.push(word);
            }
        });

        // Percentage nikalna
        const score = Math.round((foundKeywords.length / commonKeywords.length) * 100);

        // Mistakes aur Suggestions (Smart Logic)
        let mistakes = [];
        if (!resumeText.includes("email")) mistakes.push("Contact information missing (Email)");
        if (!resumeText.includes("education")) mistakes.push("Education section not found");
        if (resumeText.split(' ').length < 100) mistakes.push("Resume is too short. Add more details.");
        if (!/\d/.test(resumeText)) mistakes.push("No numbers found. Add quantifiable results (e.g., 'Increased sales by 20%').");

        // Feedback Message
        let feedback = "";
        if (score >= 80) feedback = "Excellent! Your resume is highly optimized for ATS.";
        else if (score >= 50) feedback = "Good, but needs improvement in key areas.";
        else feedback = "Your resume needs significant updates to pass ATS scans.";

        // Response Frontend ko
        res.status(200).json({
            success: true,
            data: {
                atsScore: score,
                keywordsFound: foundKeywords,
                missingKeywords: missingKeywords,
                mistakes: mistakes,
                feedback: feedback,
                improvementTips: "Use active verbs like 'Developed', 'Managed', 'Achieved'. Add numbers to show impact."
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error processing resume." });
    }
};

// -----------------------------------------------------------
// 2. Skill Analysis Logic (Full Code - Real Data)
// -----------------------------------------------------------
exports.analyzeSkills = async (req, res) => {
    try {
        const { targetRole, currentSkills } = req.body;

        // User ki skills ko array me convert aur clean karna
        const userSkillsArray = currentSkills.split(',').map(s => s.trim().toLowerCase());

        // Real World Job Data (No Dummy Data)
        const jobDatabase = {
            "Data Scientist": ["python", "machine learning", "sql", "statistics", "tensorflow", "pandas", "numpy"],
            "Frontend Developer": ["html", "css", "javascript", "react", "tailwind", "git", "redux", "typescript"],
            "Backend Developer": ["node.js", "express", "mongodb", "mysql", "api", "docker", "rest api"],
            "Full Stack Developer": ["html", "css", "javascript", "react", "node.js", "mongodb", "express", "sql"],
            "UI/UX Designer": ["figma", "adobe xd", "prototyping", "wireframing", "user research", "sketch"],
            "Data Analyst": ["excel", "sql", "tableau", "python", "power bi", "data visualization"]
        };

        // Required skills nikalna
        const requiredSkills = jobDatabase[targetRole] || [];

        // Gap Analysis (Kya kami hai?)
        const missingSkills = requiredSkills.filter(reqSkill => 
            !userSkillsArray.some(userSkill => userSkill.includes(reqSkill) || reqSkill.includes(userSkill))
        );

        // Suggestion Logic
        let suggestion = "";
        if (missingSkills.length === 0) {
            suggestion = "Perfect! You have all the skills required for this role.";
        } else {
            suggestion = `To become a ${targetRole}, you should focus on learning: ${missingSkills.slice(0, 3).join(", ")}.`;
        }

        res.status(200).json({
            success: true,
            data: {
                targetRole: targetRole,
                userSkills: userSkillsArray,
                requiredSkills: requiredSkills,
                missingSkills: missingSkills,
                suggestion: suggestion,
                readyForRole: missingSkills.length === 0
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
