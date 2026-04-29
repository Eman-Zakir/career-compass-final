import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

const JobMatching = () => {
  // State management
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Real World Jobs Data (Backend se ayega ye, currently frontend se for demo)
  useEffect(() => {
    setJobs([
      { id: 1, title: "Junior React Developer", company: "TechSolutions Ltd.", type: "On-site", location: "Lahore", salary: "60k - 80k", skills: ["React", "CSS", "JavaScript"], posted: "2 days ago" },
      { id: 2, title: "Data Analyst Intern", company: "Global Data Corp", type: "Remote", location: "Karachi", salary: "40k - 50k", skills: ["Python", "Excel", "SQL"], posted: "1 day ago" },
      { id: 3, title: "UI/UX Designer", company: "Creative Minds", type: "Hybrid", location: "Islamabad", salary: "75k - 90k", skills: ["Figma", "Adobe XD", "Prototyping"], posted: "Just Now" },
      { id: 4, title: "Full Stack Developer", company: "SoftTech Systems", type: "Remote", location: "Lahore", salary: "100k - 150k", skills: ["MERN Stack", "AWS", "Docker"], posted: "5 days ago" },
      { id: 5, title: "Python Backend Dev", company: "Server Masters", type: "On-site", location: "Multan", salary: "70k - 90k", skills: ["Python", "Django", "PostgreSQL"], posted: "3 days ago" }
    ]);
  }, []);

  // Filter Function
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || job.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Find Your Dream Job</h2>
          <p className="text-gray-600">We match your skills with the best opportunities.</p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-grow w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search job title or company..." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-auto">
            <select 
              className="w-full md:w-auto p-3 border border-gray-300 rounded-lg bg-white outline-none cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Job Types</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition w-full md:w-auto">
            Search
          </button>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                
                {/* Card Header */}
                <div className="bg-blue-50 p-6 border-b border-blue-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
                  <p className="text-blue-700 font-medium">{job.company}</p>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-200">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-500"/> <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-blue-500"/> <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-green-600">
                      <FaRupeeSign /> <span>{job.salary}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">{job.posted}</span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition">
                    Apply Now
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-gray-500 font-medium">No jobs found matching your criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default JobMatching;
