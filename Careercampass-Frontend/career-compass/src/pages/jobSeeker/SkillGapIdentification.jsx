import React, { useState } from 'react';
import './SkillGapIdentification.css'; // CSS file ho to rakhein

const SkillGapIdentification = () => {
  const [userSkills, setUserSkills] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!userSkills || !requiredSkills) {
      alert("Please fill both fields!");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      // Backend ko JSON data bhej rahe hain
      const response = await fetch('http://localhost:5000/api/jobseeker/analyze-skill-gap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userSkills: userSkills.split(',').map(s => s.trim()), // "a, b" -> ["a", "b"]
          requiredSkills: requiredSkills.split(',').map(s => s.trim()),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysis(data);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skill-gap-container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Skill Gap Analysis</h2>
      <p>Enter your skills and the skills required for a job to find gaps.</p>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Your Skills (comma separated):
        </label>
        <input
          type="text"
          value={userSkills}
          onChange={(e) => setUserSkills(e.target.value)}
          placeholder="e.g., Python, React, HTML"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Required Skills (comma separated):
        </label>
        <input
          type="text"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
          placeholder="e.g., Python, React, Node.js, SQL"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {loading ? "Analyzing..." : "Analyze Gap"}
      </button>

      {analysis && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f0f8ff' }}>
          <h3>Analysis Result:</h3>
          <p><strong>Missing Skills:</strong> {analysis.missingSkills.join(', ') || "None"}</p>
          <p><strong>Advice:</strong> {analysis.advice}</p>
        </div>
      )}
    </div>
  );
};

export default SkillGapIdentification;
