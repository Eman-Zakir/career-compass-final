import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Search, ArrowRight, Sparkles } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-10 font-sans selection:bg-purple-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
              Student Hub
            </h1>
            <p className="text-slate-400 text-lg">Kickstart your career with AI-driven insights.</p>
          </div>
          <div className="mt-4 md:mt-0 p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-sm font-medium text-gray-300">System Active</span>
          </div>
        </motion.div>

        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 to-blue-900 p-8 md:p-12 shadow-2xl mb-12 border border-white/10"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-yellow-400" /> Discover Your Path
            </h2>
            <p className="text-blue-100 max-w-xl text-lg mb-8">
              Not sure what to do after graduation? Let our AI analyze your academic profile and suggest the best career paths.
            </p>
            <Link to="/student/recommendations" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition transform hover:scale-105 shadow-lg shadow-blue-900/50">
              Get Recommendations <ArrowRight size={20} />
            </Link>
          </div>
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Recommendations */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-300 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition">
              <BookOpen size={100} />
            </div>
            <div className="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              🎓
            </div>
            <h3 className="text-2xl font-bold mb-3">Career Recommendations</h3>
            <p className="text-slate-400 mb-6">Explore career paths that match your grades and interests perfectly.</p>
            <Link to="/student/recommendations" className="text-purple-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Start Analysis <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Card 2: Internships */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition">
              <Search size={100} />
            </div>
            <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              🚀
            </div>
            <h3 className="text-2xl font-bold mb-3">Internship Matching</h3>
            <p className="text-slate-400 mb-6">Find internships that value your specific skills and major.</p>
            <Link to="/student/internships" className="text-blue-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Find Internships <ArrowRight size={18} />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;