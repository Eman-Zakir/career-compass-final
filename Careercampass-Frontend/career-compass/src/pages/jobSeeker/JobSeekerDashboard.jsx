import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Target, Search, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const JobSeekerDashboard = () => {
  
  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
              JOB SEEKER DASHBOARD
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Let's Get You Hired 🚀
          </h1>
          <p className="text-gray-400 mt-2">Follow these steps to land your dream job.</p>
        </div>

        {/* --- VERTICAL STACK LAYOUT --- */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          
          {/* CARD 1: RESUME OPTIMIZER (Hero Card) */}
          <motion.div variants={item} className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
            <div className="absolute top-0 right-0 p-32 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-start gap-6">
                <div className="p-5 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-900/50 group-hover:scale-110 transition duration-300">
                  <FileText size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">1. Optimize Your Resume</h3>
                  <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                    Upload your CV and get an instant AI score. We'll tell you exactly which keywords are missing to pass ATS scanners.
                  </p>
                  
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-1.5 w-32 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-[70%] bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-blue-400 font-mono">Current Score: 70/100</span>
                  </div>
                </div>
              </div>

              <Link to="/job-seeker/resume" className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition flex items-center gap-2 shadow-xl whitespace-nowrap">
                Start Scan <Sparkles size={18} className="text-blue-600" />
              </Link>
            </div>
          </motion.div>

          {/* CARD 2: SKILL GAP ANALYSIS */}
          <motion.div variants={item} className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-xl">
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gray-800 rounded-2xl text-purple-400 border border-gray-700 group-hover:text-white group-hover:bg-purple-600 group-hover:border-purple-500 transition duration-300">
                  <Target size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">2. Identify Skill Gaps</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Compare your skills with market demands. Find out what you need to learn next.
                  </p>
                </div>
              </div>

              <Link to="/job-seeker/skills" className="px-6 py-3 bg-gray-800 border border-gray-700 text-white font-semibold rounded-xl hover:bg-gray-700 transition flex items-center gap-2 whitespace-nowrap">
                Analyze Skills <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* CARD 3: JOB MATCHING */}
          <motion.div variants={item} className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 hover:border-green-500/50 transition-all duration-300 shadow-xl">
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gray-800 rounded-2xl text-green-400 border border-gray-700 group-hover:text-white group-hover:bg-green-600 group-hover:border-green-500 transition duration-300">
                  <Search size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">3. Find Matches</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Browse jobs that perfectly match your optimized profile.
                  </p>
                </div>
              </div>

              <Link to="/student/internships" className="px-6 py-3 bg-gray-800 border border-gray-700 text-white font-semibold rounded-xl hover:bg-gray-700 transition flex items-center gap-2 whitespace-nowrap">
                Browse Jobs <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Optional: Progress Stats */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-2xl flex items-center gap-3">
              <TrendingUp className="text-green-500" />
              <div>
                <p className="text-xs text-gray-500">Profile Views</p>
                <p className="text-lg font-bold">12 this week</p>
              </div>
            </div>
            {/* You can add more stats here */}
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
};

export default JobSeekerDashboard;