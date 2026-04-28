import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Award, ArrowUpRight } from 'lucide-react';

const ProfessionalDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans selection:bg-indigo-500">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">Executive Overview</h1>
          <p className="text-gray-500 mt-2">Track your career trajectory and milestones.</p>
        </div>

        {/* Main Progression Card */}
        <Link to="/professional/progression" className="block group">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative bg-gradient-to-r from-gray-900 to-indigo-950 rounded-3xl p-10 border border-gray-800 hover:border-indigo-500 transition-all duration-300 shadow-2xl mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
              <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-4">
                    NEXT MILESTONE
                 </div>
                 <h2 className="text-4xl font-bold mb-2 group-hover:text-indigo-400 transition">Senior Tech Lead</h2>
                 <p className="text-gray-400">Current Status: <span className="text-white font-bold">Senior Developer</span></p>
              </div>
              
              <div className="mt-6 md:mt-0 bg-indigo-600 rounded-full p-4 shadow-lg shadow-indigo-600/50 group-hover:scale-110 transition">
                <ArrowUpRight size={32} />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress to promotion</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1.5 }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <TrendingUp className="text-green-500 mb-4" size={32} />
              <h3 className="text-2xl font-bold">Market Value</h3>
              <p className="text-gray-500 mt-2">Your skill set is in top 10% demand.</p>
           </div>
           <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <Award className="text-yellow-500 mb-4" size={32} />
              <h3 className="text-2xl font-bold">Achievements</h3>
              <p className="text-gray-500 mt-2">3 Major projects completed this year.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProfessionalDashboard;