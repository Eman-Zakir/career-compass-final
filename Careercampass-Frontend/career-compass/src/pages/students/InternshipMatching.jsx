import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Clock, CheckCircle, Loader2 } from 'lucide-react';

const InternshipMatching = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});

  const internships = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Solutions', location: 'Remote', type: 'Paid', duration: '3 Months', skills: ['React', 'Tailwind'] },
    { id: 2, title: 'UI/UX Designer', company: 'Creative Minds', location: 'Lahore', type: 'Unpaid', duration: '2 Months', skills: ['Figma', 'Adobe XD'] },
    { id: 3, title: 'React Native Dev', company: 'Appify', location: 'Karachi', type: 'Paid', duration: '6 Months', skills: ['React Native', 'Firebase'] },
    { id: 4, title: 'MERN Stack Intern', company: 'DevsHouse', location: 'Islamabad', type: 'Paid', duration: '4 Months', skills: ['MongoDB', 'Express'] },
  ];

  const filteredInternships = internships.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApply = (id) => {
    setLoadingId(id);
    setTimeout(() => {
      setAppliedJobs(prev => ({ ...prev, [id]: true }));
      setLoadingId(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
              Internship Matching
            </h1>
            <p className="text-gray-400 mt-2">Find the perfect start to your career.</p>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Search (e.g. React, Remote)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-full pl-12 pr-6 py-3 text-sm text-white focus:border-blue-500 focus:outline-none transition shadow-lg"
            />
          </div>
        </div>

        {/* Job Cards List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((job) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg flex flex-col md:flex-row justify-between gap-6"
              >
                {/* Left: Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <span className="md:hidden px-2 py-1 bg-gray-800 text-xs rounded text-blue-300 border border-gray-700">{job.type}</span>
                  </div>
                  
                  <p className="text-gray-400 font-medium mb-4">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-blue-500"/> {job.location}</span>
                    <span className="hidden md:flex items-center gap-1.5"><Briefcase size={16} className="text-purple-500"/> {job.type}</span>
                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-green-500"/> {job.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Action Button */}
                <div className="flex items-center">
                  <button 
                    onClick={() => handleApply(job.id)}
                    disabled={appliedJobs[job.id] || loadingId === job.id}
                    className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-md
                      ${appliedJobs[job.id] 
                        ? 'bg-green-900/30 text-green-400 border border-green-500/50 cursor-default' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-600/20'}
                    `}
                  >
                    {loadingId === job.id ? <Loader2 size={18} className="animate-spin" /> : 
                     appliedJobs[job.id] ? <><CheckCircle size={18} /> Applied</> : 'Apply Now'}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-900 rounded-3xl border border-gray-800">
              <p className="text-gray-500 text-lg">No matching internships found.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InternshipMatching;