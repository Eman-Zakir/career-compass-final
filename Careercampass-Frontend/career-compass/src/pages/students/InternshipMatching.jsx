import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, ExternalLink, Briefcase, RefreshCw, AlertCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ── Career → Search Query Map ─────────────────────────
const careerQueryMap = {
  'Software Engineer':   'Software Engineer internship Pakistan',
  'Data Scientist':      'Data Science internship Pakistan',
  'Doctor/Medical':      'Medical internship Pakistan hospital',
  'Core Engineer':       'Civil Mechanical Electrical Engineering internship Pakistan',
  'Business/Management': 'Business Management internship Pakistan',
  'Finance/Accounting':  'Finance Accounting internship Pakistan',
  'Educator':            'Teaching Education internship Pakistan',
  'Designer':            'Graphic UI UX Design internship Pakistan',
  'Network Engineer':    'Network Cyber Security internship Pakistan',
};

const careerOptions = Object.keys(careerQueryMap);

const careerIcons = {
  'Software Engineer':   '💻',
  'Data Scientist':      '📊',
  'Doctor/Medical':      '🏥',
  'Core Engineer':       '⚙️',
  'Business/Management': '💼',
  'Finance/Accounting':  '💰',
  'Educator':            '🎓',
  'Designer':            '🎨',
  'Network Engineer':    '🌐',
};

// ── Time ago helper ───────────────────────────────────
const timeAgo = (dateStr) => {
  if (!dateStr) return 'Recently posted';
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};

// ── Main Component ────────────────────────────────────
const InternshipMatching = () => {
  const { user } = useAuth();

  const [selectedCareer, setSelectedCareer] = useState('Software Engineer');
  const [internships, setInternships]       = useState([]);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState(null);
  const [searchQuery, setSearchQuery]       = useState('');
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [selectedJob, setSelectedJob]       = useState(null);

  // ── Fetch internships ─────────────────────────────
  const fetchInternships = async (career) => {
    setLoading(true);
    setError(null);
    setInternships([]);

    const query = careerQueryMap[career] || `${career} internship Pakistan`;

    try {
      const response = await fetch(
  `http://localhost:5000/api/internships/search?career=${encodeURIComponent(career)}`
);

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        setInternships(data.data);
      } else {
        setError('No internships found for this career. Try another field.');
      }
    } catch (err) {
      setError('Failed to fetch internships. Check your API key or internet connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── On mount & career change ──────────────────────
  useEffect(() => {
    fetchInternships(selectedCareer);
  }, [selectedCareer]);

  // ── Filter by search ──────────────────────────────
  const filtered = internships.filter((job) => {
    const q = searchQuery.toLowerCase();
    return (
      job.job_title?.toLowerCase().includes(q) ||
      job.employer_name?.toLowerCase().includes(q) ||
      job.job_city?.toLowerCase().includes(q)
    );
  });

  // ════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans pb-20">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
            Internship Matching
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time internships powered by live job data — filtered for your career path
          </p>
        </motion.div>

        {/* ── Controls ── */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Career Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-gray-900 border border-gray-700 
                         hover:border-purple-500 rounded-xl px-5 py-3.5 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{careerIcons[selectedCareer]}</span>
                <span className="font-semibold text-white">{selectedCareer}</span>
              </div>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 
                             rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {careerOptions.map((career) => (
                    <button
                      key={career}
                      onClick={() => { setSelectedCareer(career); setDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-800 transition
                        ${selectedCareer === career ? 'bg-purple-900/30 text-purple-300' : 'text-gray-300'}`}
                    >
                      <span>{careerIcons[career]}</span>
                      <span className="font-medium">{career}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by title, company or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 focus:border-purple-500 
                         rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 
                         outline-none transition-all"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={() => fetchInternships(selectedCareer)}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 
                       disabled:opacity-50 rounded-xl font-semibold transition-all"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* ── Stats Bar ── */}
        {!loading && !error && internships.length > 0 && (
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full font-medium">
              {filtered.length} internships found
            </span>
            <span>for <strong className="text-white">{selectedCareer}</strong></span>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-800 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-3 bg-gray-800 rounded mb-2" />
                <div className="h-3 bg-gray-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Oops!</h3>
            <p className="text-gray-400 max-w-md mb-6">{error}</p>
            <button onClick={() => fetchInternships(selectedCareer)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition">
              Try Again
            </button>
          </div>
        )}

        {/* ── Internship Cards ── */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((job, index) => (
                <motion.div
                  key={job.job_id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 
                             transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20
                             flex flex-col justify-between group"
                >
                  {/* Company Info */}
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      {job.employer_logo ? (
                        <img
                          src={job.employer_logo}
                          alt={job.employer_name}
                          className="w-12 h-12 rounded-xl object-contain bg-white p-1"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl">
                          🏢
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 group-hover:text-purple-300 transition">
                          {job.job_title}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">{job.employer_name}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.job_city && (
                        <span className="flex items-center gap-1 text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full border border-gray-700">
                          <MapPin size={11} /> {job.job_city}
                        </span>
                      )}
                      {job.job_employment_type && (
                        <span className="flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full border border-blue-500/30">
                          <Briefcase size={11} /> {job.job_employment_type}
                        </span>
                      )}
                      {job.job_is_remote && (
                        <span className="text-xs bg-green-500/20 text-green-300 px-2.5 py-1 rounded-full border border-green-500/30">
                          🌐 Remote
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {job.job_description && (
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4">
                        {job.job_description.slice(0, 150)}...
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={11} /> {timeAgo(job.job_posted_at_datetime_utc)}
                      </span>
                      {job.job_min_salary && (
                        <span className="text-xs text-green-400 font-medium">
                          ${job.job_min_salary}–{job.job_max_salary}/mo
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 
                                   rounded-xl text-sm font-medium transition text-center"
                      >
                        View Details
                      </button>
                      <a
                        href={job.job_apply_link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 
                                   rounded-xl text-sm font-semibold transition"
                      >
                        Apply <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── No results ── */}
        {!loading && !error && filtered.length === 0 && internships.length > 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400">No results for "<span className="text-white">{searchQuery}</span>"</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-purple-400 hover:text-purple-300 text-sm">
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* ── Job Detail Modal ── */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 w-full max-w-lg rounded-3xl border border-gray-700 p-8 relative shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 bg-black rounded-full hover:bg-gray-800 text-gray-400 transition">
                ✕
              </button>

              {/* Company */}
              <div className="flex items-center gap-4 mb-6">
                {selectedJob.employer_logo ? (
                  <img src={selectedJob.employer_logo} alt="" className="w-14 h-14 rounded-xl object-contain bg-white p-1" />
                ) : (
                  <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center text-3xl">🏢</div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedJob.job_title}</h2>
                  <p className="text-purple-400 font-medium">{selectedJob.employer_name}</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  ['📍 Location', selectedJob.job_city || selectedJob.job_country || 'Not specified'],
                  ['💼 Type', selectedJob.job_employment_type || 'Not specified'],
                  ['🕐 Posted', timeAgo(selectedJob.job_posted_at_datetime_utc)],
                  ['🌐 Remote', selectedJob.job_is_remote ? 'Yes' : 'On-site'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-black/40 rounded-xl p-3 border border-gray-800">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Job Description</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line line-clamp-10">
                  {selectedJob.job_description?.slice(0, 800)}
                  {selectedJob.job_description?.length > 800 ? '...' : ''}
                </p>
              </div>

              <a
                href={selectedJob.job_apply_link}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                           hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold text-white transition"
              >
                Apply Now <ExternalLink size={18} />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternshipMatching;
