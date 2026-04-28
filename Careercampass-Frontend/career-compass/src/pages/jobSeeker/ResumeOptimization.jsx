import React, { useState } from 'react';
import './ResumeOptimization.css'; // CSS file ho to rakhein, nahi to hata dein

const ResumeOptimization = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleOptimize = async () => {
    if (!file) {
      alert("Please select a PDF resume first!");
      return;
    }

    setLoading(true);
    setResult(null);

    // Note: File upload ke liye Backend me 'multer' library ka use karna padega
    // Abhi ke liye hum ek dummy request bhej rahe hain connection check karne ke liye
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch('http://localhost:5000/api/jobseeker/optimize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server connection failed. Make sure Backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-optimization-container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Resume Optimization</h2>
      <p>Upload your resume to get AI-based suggestions.</p>

      <div style={{ margin: '20px 0' }}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="application/pdf" 
          style={{ marginBottom: '10px' }}
        />
      </div>

      <button 
        onClick={handleOptimize} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: loading ? '#ccc' : '#007bff',
