import { motion } from 'framer-motion';
import { Briefcase, Star, TrendingUp, Lock } from 'lucide-react';

const CareerProgression = () => {
  const steps = [
    { title: 'Junior Developer', status: 'completed', date: '2021 - 2022' },
    { title: 'Mid-Level Developer', status: 'completed', date: '2022 - 2024' },
    { title: 'Senior Developer', status: 'current', date: 'Present' },
    { title: 'Tech Lead', status: 'locked', date: 'Goal: 2026' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-2">Career Roadmap</h1>
          <p className="text-gray-500">Your journey to the top.</p>
        </div>

        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-8 md:left-1/2 h-full w-0.5 bg-gray-800 transform -translate-x-1/2"></div>
          <div className="absolute left-8 md:left-1/2 h-1/2 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                <div className="hidden md:block w-5/12"></div>

                {/* Timeline Dot (Glowing Node) */}
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.8)]
                  ${step.status === 'completed' ? 'bg-gray-900 border-green-500 text-green-500' : 
                    step.status === 'current' ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]' : 
                    'bg-gray-900 border-gray-700 text-gray-600'}
                `}>
                  {step.status === 'completed' && <Star size={18} />}
                  {step.status === 'current' && <TrendingUp size={20} />}
                  {step.status === 'locked' && <Lock size={18} />}
                </div>

                {/* Card */}
                <div className="ml-24 md:ml-0 w-full md:w-5/12">
                  <div className={`p-6 rounded-2xl border transition hover:scale-105
                    ${step.status === 'current' ? 'bg-gradient-to-br from-indigo-900/50 to-gray-900 border-indigo-500/50 shadow-lg shadow-indigo-900/20' : 
                      'bg-gray-900 border-gray-800'}
                  `}>
                    <h3 className={`text-xl font-bold ${step.status === 'current' ? 'text-indigo-400' : 'text-gray-300'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{step.date}</p>
                    
                    {step.status === 'current' && (
                      <div className="mt-4 text-xs font-bold text-green-400 bg-green-400/10 py-1 px-3 rounded-full inline-block">
                        Current Role
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerProgression;