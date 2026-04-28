import React, { useState } from 'react';
// Aapke hisab se imports rahenge

const ResumeOptimization = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptimize = async () => {
    if (!file) {
      alert("Please upload a resume first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      // Ye link backend wala hai (Ye baad me bataunga kaise set karna)
      const response = await fetch('http://localhost:5000/api/resume/optimize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Resume Optimization Complete! Score: " + data.score);
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server connection failed.");
    }
  };

  return (
    <div className="resume-container">
      <h2>Resume Optimization</h2>
      <p>Upload your PDF resume to get suggestions.</p>
      
      {/* File Input */}
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      
      {/* Optimize Button */}
      <button onClick={handleOptimize}>Optimize Resume</button>
      
      {/* Result Message */}
      {message && <p className="result">{message}</p>}
    </div>
  );
};

export default ResumeOptimization;
