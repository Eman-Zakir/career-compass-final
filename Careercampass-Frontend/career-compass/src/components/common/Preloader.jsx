import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="text-blue-500 mb-4"
      >
        <Compass size={80} />
      </motion.div>
      
      <h2 className="text-2xl font-bold text-white tracking-widest">
        CAREER<span className="text-blue-500">COMPASS</span>
      </h2>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full"
      />
    </div>
  );
};

export default Preloader;