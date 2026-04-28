import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      
      {/* Animated Icon */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-red-500 mb-6"
      >
        <AlertTriangle size={100} />
      </motion.div>

      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-4">
        404
      </h1>
      
      <h2 className="text-3xl font-bold mb-4">Oops! Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link 
        to="/"
        className="px-8 py-3 bg-blue-600 rounded-full font-bold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-900/50 flex items-center gap-2"
      >
        <Home size={20} /> Go Back Home
      </Link>

    </div>
  );
};

export default NotFound;