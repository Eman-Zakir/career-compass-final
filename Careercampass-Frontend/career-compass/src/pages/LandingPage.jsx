import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[180px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-20 pointer-events-none"></div>

      {/* Navbar for Home (Optional but looks pro) */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-20">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Compass className="text-blue-500" /> CareerCompass
        </div>
        <Link to="/login" className="text-gray-300 hover:text-white transition font-medium">
          Sign In
        </Link>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl"
      >
        <div className="inline-block px-4 py-1.5 mb-6 border border-gray-800 rounded-full bg-gray-900/50 backdrop-blur-sm text-sm text-blue-400 font-medium">
          🚀 AI-Powered Career Guidance
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Find Your Perfect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Career Path
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you are a student, job seeker, or professional, let our AI guide you to success with personalized roadmaps.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link to="/signup" className="px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition transform hover:-translate-y-1">
            Get Started Free
          </Link>
          <Link to="/login" className="px-10 py-4 bg-gray-900 text-white border border-gray-800 font-bold text-lg rounded-full hover:bg-gray-800 transition transform hover:-translate-y-1">
            Login
          </Link>
        </div>
      </motion.div>

      <p className="absolute bottom-8 text-gray-600 text-sm">© 2025 CareerCompass AI. All rights reserved.</p>
    </div>
  );
};

export default LandingPage;