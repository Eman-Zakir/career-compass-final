import React, { useState } from 'react';
import './JobSeekerDashboard.css';

const JobSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('resume'); // 'resume' or 'jobs'
  
  // --- Resume Optimizer State ---
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  // --- Job Matching State ---
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock Skills (Tumhare dashboard se aayenge)
  const userSkills = ['React', 'Node.js', 'Python', 'UI/UX'];
  
  const mockJobs = [
    { id: 1, title: 'Senior Frontend Dev', company: 'Google', type: 'Remote', salary: '$120k', match: 95, logo: 'G' },
    { id: 2, title: 'Backend Engineer', company: 'Microsoft', type: 'On-site', salary: '$110k', match: 88, logo: 'M' },
    { id: 3, title: 'Full Stack Developer', company: 'Amazon', type: 'Hybrid', salary: '$115k', match: 92, logo: 'A' },
    { id: 4, title: 'React Developer', company: 'TechStart', type: 'Remote', salary: '$80k', match: 85, logo: 'T' },
  ];

  // --- Handlers ---
  const handleResumeUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setAtsScore(null);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!file) return alert("Please select a file first!");
    setIsAnalyzing(true);
    
    // Simulate AI Processing Delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAtsScore(92); // Mock Score
      setAnalysisResult({
        keywords: ['Leadership', 'Agile', 'Cloud'],
        missing: ['Docker', 'Kubernetes'],
        suggestions: [
          "Add more quantifiable achievements (e.g., 'Increased speed by 20%').",
          "Optimize the summary section with industry-specific keywords."
        ]
      });
    }, 3000); // 3 seconds delay
  };

  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="js-dashboard-container">
      {/* Header Section */}
      <div className="js-header">
        <h1>Job Seeker Intelligence Center</h1>
        <p>AI-Powered Tools for your Career Growth</p>
        
        <div className="tab-buttons">
          <button 
            className={activeTab === 'resume' ? 'active' : ''} 
            onClick={() => setActiveTab('resume')}
          >
            📄 Resume AI Scanner
          </button>
          <button 
            className={activeTab === 'jobs' ? 'active' : ''} 
            onClick={() => setActiveTab('jobs')}
          >
            💼 Smart Job Matcher
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="js-content">
        
        {/* --- MODULE 1: RESUME OPTIMIZER --- */}
        {activeTab === 'resume' && (
          <div className="module-section fade-in">
            <div className="upload-zone">
              <div className="upload-icon">📂</div>
              <h3>Drag & Drop your Resume</h3>
              <p>Supported formats: PDF, DOCX</p>
              <input type="file" onChange={handleResumeUpload} id="file-upload" hidden />
              <label htmlFor="file-upload" className="upload-btn-label">
                {file ? file.name : "Select File"}
              </label>
              
              {file && !isAnalyzing && !atsScore && (
                <button className="analyze-btn" onClick={handleAnalyze}>
                  ✨ Run AI Analysis
                </button>
              )}
            </div>

            {/* Loading Animation */}
            {isAnalyzing && (
              <div className="loading-container">
                <div className="loader"></div>
                <p>Analyzing ATS Compatibility...</p>
                <small>Checking keywords, formatting & structure</small>
              </div>
            )}

            {/* Results */}
            {atsScore && (
              <div className="results-grid">
                <div className="score-card-glass">
                  <div className="circular-score" style={{background: `conic-gradient(#00d2ff ${atsScore}%, #e0e0e0 0)`}}>
                    <span>{atsScore}%</span>
                  </div>
                  <h3>Excellent!</h3>
                  <p>Your resume is highly optimized.</p>
                </div>

                <div className="details-card-glass">
                  <h4>🔍 AI Insights</h4>
                  <div className="insight-box">
                    <strong>✅ Strong Keywords:</strong>
                    <div className="tags">
                      {analysisResult.keywords.map(k => <span key={k} className="tag green">{k}</span>)}
                    </div>
                  </div>
                  <div className="insight-box">
                    <strong>❌ Missing Skills:</strong>
                    <div className="tags">
                      {analysisResult.missing.map(m => <span key={m} className="tag red">{m}</span>)}
                    </div>
                  </div>
                  <div className="insight-box">
                    <strong>💡 Suggestions:</strong>
                    <ul>
                      {analysisResult.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- MODULE 2: JOB MATCHING --- */}
        {activeTab === 'jobs' && (
          <div className="module-section fade-in">
            <div className="search-bar-container">
              <input 
                type="text" 
                placeholder="Search jobs, companies..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="user-skills-badge">
                Your Profile: {userSkills.join(', ')}
              </div>
            </div>

            <div className="jobs-grid-modern">
              {filteredJobs.map(job => (
                <div key={job.id} className="job-card-modern">
                  <div className="job-header-modern">
                    <div className="company-logo">{job.logo}</div>
                    <div className="match-badge">{job.match}% Match</div>
                  </div>
                  <h3>{job.title}</h3>
                  <p className="company-name">{job.company}</p>
                  <div className="job-meta">
                    <span className="meta-item">💰 {job.salary}</span>
                    <span className="meta-item">📍 {job.type}</span>
                  </div>
                  <button className="apply-btn-modern">Easy Apply</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
