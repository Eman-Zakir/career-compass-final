import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, XCircle, CheckCircle, ExternalLink, BookOpen } from 'lucide-react';

const SkillGapIdentification = () => {
  const [openedSkill, setOpenedSkill] = useState(null);

  const handleOpenCourse = (skill) => {
    setOpenedSkill(skill);
    // Fake open new tab alert
    // window.open('https://www.udemy.com', '_blank'); 
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Target className="text-purple-500" /> Skill Gap Analysis
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Target Role: <span className="text-white font-bold">Frontend Developer</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          
          {/* Missing Skills */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-800"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-400">
              <XCircle size={24} /> Skills to Acquire
            </h2>

            <div className="space-y-4">
              {['TypeScript', 'GraphQL', 'Next.js'].map((skill, i) => (
                <div key={skill} className="p-5 bg-black/40 rounded-2xl border border-red-500/10 hover:border-red-500/40 transition group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{skill}</h3>
                      <p className="text-xs text-gray-500 mt-1">Required for Senior Roles</p>
                    </div>
                    <span className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] uppercase font-bold rounded">Priority</span>
                  </div>
                  
                  <button 
                    onClick={() => handleOpenCourse(skill)}
                    className="mt-4 w-full py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-bold border border-red-500/20 group-hover:bg-red-600 group-hover:text-white transition flex items-center justify-center gap-2"
                  >
                    {openedSkill === skill ? <><BookOpen size={14}/> Course Opened</> : <><ExternalLink size={14}/> Find Courses</>}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Acquired Skills */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-800 flex flex-col"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-400">
              <CheckCircle size={24} /> Skills You Have
            </h2>

            <div className="space-y-3 flex-1">
              {['React.js (Advanced)', 'Tailwind CSS', 'Git / GitHub', 'JavaScript (ES6+)'].map((skill) => (
                <div key={skill} className="flex items-center gap-3 p-4 bg-black/40 rounded-xl border border-green-500/10">
                  <CheckCircle className="text-green-500 shrink-0" size={18} />
                  <span className="font-medium text-gray-300 text-sm">{skill}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-center shadow-lg shadow-green-900/50">
              <h3 className="text-3xl font-extrabold">85% Match</h3>
              <p className="text-green-100 text-sm mt-1 mb-3">You are almost ready!</p>
              {/* Progress Bar */}
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '85%' }} 
                  transition={{ duration: 1.5 }}
                  className="h-full bg-white" 
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SkillGapIdentification;