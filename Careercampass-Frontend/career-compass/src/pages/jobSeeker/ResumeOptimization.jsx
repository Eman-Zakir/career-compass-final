import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertTriangle, FileText, Loader2 } from 'lucide-react';

const ResumeOptimization = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowResult(false);
    // Fake Processing Time (2 seconds)
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            ATS Resume Scanner
          </h1>
          <p className="text-gray-400 mt-2">Optimize your resume for AI screening algorithms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Upload Zone */}
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-xl h-full flex flex-col justify-between">
            <div className="h-64 border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center hover:border-blue-500 hover:bg-gray-800/50 transition cursor-pointer group">
              <div className="p-4 bg-black rounded-full mb-4 group-hover:scale-110 transition shadow-lg shadow-blue-900/20">
                <UploadCloud className="text-blue-400" size={32} />
              </div>
              <p className="font-bold text-gray-300">Drop your resume here</p>
              <p className="text-xs text-gray-500 mt-2">PDF or DOCX (Max 5MB)</p>
            </div>
            
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full mt-6 py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <> <Loader2 className="animate-spin" /> Scanning... </>
              ) : (
                'Analyze Resume Now'
              )}
            </button>
          </div>

          {/* Results Preview (Animated) */}
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-xl relative overflow-hidden min-h-[400px]">
            {!showResult && !isAnalyzing && (
               <div className="flex flex-col items-center justify-center h-full text-gray-600">
                  <FileText size={60} className="mb-4 opacity-20" />
                  <p>Result will appear here</p>
               </div>
            )}

            {isAnalyzing && (
               <div className="flex flex-col items-center justify-center h-full text-blue-400">
                  <Loader2 size={60} className="animate-spin mb-4" />
                  <p className="animate-pulse">AI is reading your document...</p>
               </div>
            )}

            {showResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 relative z-10"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                  <FileText className="text-purple-400" /> Analysis Report
                </h3>

                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                  <CheckCircle className="text-green-400 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold text-green-400 text-sm">Structure Passed</h4>
                    <p className="text-xs text-gray-400">Headers and bullet points are clear.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
                  <AlertTriangle className="text-yellow-400 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold text-yellow-400 text-sm">Missing Keywords</h4>
                    <p className="text-xs text-gray-400">Your resume is missing: "Agile", "TypeScript".</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-black rounded-xl text-center border border-gray-800">
                   <p className="text-gray-500 text-xs uppercase mb-1">ATS Score</p>
                   <p className="text-4xl font-extrabold text-blue-500">72/100</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeOptimization;