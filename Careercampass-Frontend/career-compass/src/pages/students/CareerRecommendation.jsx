import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// ── 10 Smart Questions ────────────────────────────────
const questions = [
  {
    id: 'intermediate_field',
    question: 'Which subject group did you study in Intermediate?',
    subtitle: 'This helps us understand your academic background',
    emoji: '📚',
    options: [
      { label: '⚙️  Pre-Engineering — Math, Physics, Chemistry',   value: 'Pre-Engineering'  },
      { label: '🧬  Pre-Medical — Biology, Chemistry, Physics',     value: 'Pre-Medical'      },
      { label: '📊  Commerce — Accounts, Economics, Statistics',    value: 'Commerce'         },
      { label: '💻  Computer Science (ICS)',                        value: 'Computer-Science' },
      { label: '🎨  Arts & Humanities',                             value: 'Arts'             },
      { label: '🔬  General Science',                               value: 'General'          },
    ],
  },
  {
    id: 'grade_band',
    question: 'What was your overall academic performance in Intermediate?',
    subtitle: 'Be honest — this helps us give you realistic career paths',
    emoji: '🏆',
    options: [
      { label: '🌟  A+ — Above 85% (Exceptional)', value: 'A' },
      { label: '✅  A  — 70% to 85% (Very Good)',   value: 'B' },
      { label: '📈  B  — 55% to 69% (Average)',     value: 'C' },
      { label: '📉  C  — Below 55%',                value: 'D' },
    ],
  },
  {
    id: 'problem_solving_style',
    question: 'When faced with a difficult problem, what is your natural approach?',
    subtitle: 'Think about real situations — school projects, life challenges',
    emoji: '🧠',
    options: [
      { label: '🔢  I break it into numbers and analyze data logically',       value: 'Mathematics'   },
      { label: '💬  I talk to people and collaborate to find a solution',      value: 'Communication' },
      { label: '🎨  I think outside the box and try creative approaches',      value: 'Creativity'    },
      { label: '💻  I research, code or build something to solve it',          value: 'Programming'   },
      { label: '📋  I create a plan, assign tasks and lead the team',          value: 'Leadership'    },
      { label: '📝  I write it down, research deeply and document everything', value: 'Writing'       },
    ],
  },
  {
    id: 'work_environment',
    question: 'Which work environment excites you the most?',
    subtitle: 'Imagine your ideal future workplace',
    emoji: '🏢',
    options: [
      { label: '💻  Tech office — building apps, systems or AI tools',       value: 'Technology'         },
      { label: '🏥  Hospital or clinic — helping patients and saving lives', value: 'Health/Medical'     },
      { label: '📊  Corporate office — managing teams, strategy & growth',   value: 'Business'           },
      { label: '🏫  School or university — teaching and shaping minds',      value: 'Education/Research' },
      { label: '🎨  Creative studio — designing, branding or storytelling',  value: 'Arts/Design'        },
      { label: '🏗️  Field or factory — engineering real-world structures',   value: 'Engineering'        },
      { label: '🏦  Bank or firm — managing money, audits and investments',  value: 'Finance'            },
    ],
  },
  {
    id: 'strongest_subject',
    question: 'In which subject did you always score the highest?',
    subtitle: 'Natural strengths often predict career success',
    emoji: '📖',
    options: [
      { label: '🔢  Mathematics / Statistics',         value: 'Mathematics'   },
      { label: '⚗️  Physics or Chemistry',             value: 'Programming'   },
      { label: '🧬  Biology / Life Sciences',          value: 'Analytical'    },
      { label: '💰  Accounts / Economics',             value: 'Analytical'    },
      { label: '🌍  English / Social Studies / Urdu', value: 'Communication' },
      { label: '🖥️  Computer Science / IT',           value: 'Programming'   },
      { label: '🎭  Fine Arts / Drama / Design',       value: 'Creativity'    },
    ],
  },
  {
    id: 'primary_interest',
    question: 'Which of these would you happily do even without being paid?',
    subtitle: 'Passion-driven careers lead to long-term success',
    emoji: '💡',
    options: [
      { label: '🤖  Building apps, websites or AI tools',            value: 'Technology'         },
      { label: '🩺  Helping sick people or doing medical research',  value: 'Health/Medical'     },
      { label: '📈  Starting a business or managing a team',         value: 'Business'           },
      { label: '📚  Teaching, tutoring or mentoring others',         value: 'Education/Research' },
      { label: '🎨  Designing logos, videos or creative content',    value: 'Arts/Design'        },
      { label: '🧮  Working with finance, stocks or data analysis',  value: 'Finance'            },
      { label: '🏗️  Designing bridges, circuits or buildings',      value: 'Engineering'        },
    ],
  },
  {
    id: 'five_year_goal',
    question: 'Where do you see yourself in 5 years?',
    subtitle: 'Your vision shapes your career direction',
    emoji: '🔭',
    options: [
      { label: '🚀  Working at a top tech company or running a startup',  value: 'Technology'         },
      { label: '🏥  Practicing medicine or working in healthcare',        value: 'Health/Medical'     },
      { label: '💼  Leading a team in a major corporation',               value: 'Business'           },
      { label: '🎓  Completing a Masters or PhD and doing research',      value: 'Education/Research' },
      { label: '🌍  Freelancing internationally in a creative field',     value: 'Arts/Design'        },
      { label: '💰  Managing finances in a top bank or accounting firm',  value: 'Finance'            },
      { label: '🏗️  Working as a licensed professional engineer',        value: 'Engineering'        },
    ],
  },
  {
    id: 'primary_skill',
    question: 'Which skill do people around you most often praise you for?',
    subtitle: 'External feedback reveals your true strengths',
    emoji: '⭐',
    options: [
      { label: '💻  Technical skills — coding, systems or analysis',      value: 'Programming'   },
      { label: '🗣️  Communication — explaining and presenting clearly',  value: 'Communication' },
      { label: '🧮  Math or logical thinking under pressure',             value: 'Mathematics'   },
      { label: '🎨  Creative thinking — unique ideas and designs',        value: 'Creativity'    },
      { label: '👥  Leadership — organizing people and getting results',  value: 'Leadership'    },
      { label: '📊  Research & data — finding insights from information', value: 'Analytical'    },
      { label: '✍️  Writing — blogs, reports or storytelling',           value: 'Writing'       },
    ],
  },
  {
    id: 'learning_style',
    question: 'How do you learn best?',
    subtitle: 'Learning style connects deeply to career fit',
    emoji: '🎯',
    options: [
      { label: '🖥️  Watching tutorials and building projects hands-on',      value: 'Programming'   },
      { label: '📖  Reading books, research papers and taking notes',         value: 'Analytical'    },
      { label: '👥  Group discussions, teamwork and presentations',           value: 'Communication' },
      { label: '🧪  Experiments, labs and trial-and-error',                   value: 'Mathematics'   },
      { label: '🎨  Visual learning — diagrams, infographics and sketching',  value: 'Creativity'    },
      { label: '🧑‍🏫  Learning by teaching others or mentoring',            value: 'Writing'       },
    ],
  },
  {
    id: 'biggest_strength',
    question: 'Which best describes your biggest personal strength?',
    subtitle: 'Choose the one that truly resonates with you',
    emoji: '💪',
    options: [
      { label: '🔍  I notice details others miss — highly analytical',         value: 'Analytical'     },
      { label: '💬  I can convince and inspire people effortlessly',           value: 'Communication'  },
      { label: '⚡  I stay calm under pressure and solve problems fast',       value: 'Problem Solving'},
      { label: '🌱  I am empathetic and genuinely care about helping others',  value: 'Communication'  },
      { label: '🚀  I take initiative and never wait to be told what to do',   value: 'Leadership'     },
      { label: '🎨  I see patterns, beauty and creative potential everywhere', value: 'Creativity'     },
      { label: '🧮  Numbers and logic come naturally — I think in systems',    value: 'Mathematics'    },
    ],
  },
];

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

const careerColors = {
  'Software Engineer':   { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500', bar: 'bg-purple-500' },
  'Data Scientist':      { text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'hover:border-blue-500',   bar: 'bg-blue-500'   },
  'Doctor/Medical':      { text: 'text-green-400',  bg: 'bg-green-500/10',  border: 'hover:border-green-500',  bar: 'bg-green-500'  },
  'Core Engineer':       { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500', bar: 'bg-yellow-500' },
  'Business/Management': { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'hover:border-orange-500', bar: 'bg-orange-500' },
  'Finance/Accounting':  { text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'hover:border-emerald-500',bar: 'bg-emerald-500'},
  'Educator':            { text: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'hover:border-pink-500',   bar: 'bg-pink-500'   },
  'Designer':            { text: 'text-rose-400',   bg: 'bg-rose-500/10',   border: 'hover:border-rose-500',   bar: 'bg-rose-500'   },
  'Network Engineer':    { text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'hover:border-cyan-500',   bar: 'bg-cyan-500'   },
};

const defaultColor = { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500', bar: 'bg-purple-500' };

const CareerRecommendation = () => {
  const { user } = useAuth();
  const [step, setStep]               = useState(0);
  const [answers, setAnswers]         = useState({});
  const [result, setResult]           = useState(null);
  const [loading, setLoading]         = useState(false);
  const [selectedCareer, setSelected] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const current  = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const gender   = user?.gender?.toLowerCase() || 'male';

  const handleSelect = async (value) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:5001/predict', { ...newAnswers, gender });
        setResult(res.data);
      } catch {
        alert('❌ ML Service not running!\nRun: python flask_api.py in ml_services folder');
      }
      setLoading(false);
    }
  };

  const handleReset = () => { setStep(0); setAnswers({}); setResult(null); setQuizStarted(false); setSelected(null); };

  // ── INTRO ─────────────────────────────────────────
  if (!quizStarted && !result) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🎯</div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-3">
            AI Career Analysis
          </h1>
          <p className="text-gray-400 text-lg">
            Hey <span className="text-white font-semibold">{user?.fullName?.split(' ')[0] || 'there'}</span>! Answer 10 smart questions to discover your best career path.
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <h3 className="font-bold text-white mb-4">What this analysis covers:</h3>
          <div className="grid grid-cols-2 gap-3">
            {[['📚','Academic background'],['🧠','Problem-solving style'],['💡','Passions & interests'],['⭐','Your core strengths'],['🔭','Future goals & vision'],['🎯','Learning style']].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2 text-gray-300 text-sm"><span>{icon}</span>{text}</div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[['10','Questions'],['2 min','Duration'],['AI','Powered']].map(([val, label]) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-extrabold text-purple-400">{val}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <button onClick={() => setQuizStarted(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg">
          Start Career Analysis <ArrowRight size={22} />
        </button>
      </motion.div>
    </div>
  );

  // ── RESULT ────────────────────────────────────────
  if (result) {
    const top3 = result.top_3_careers || [];
    const internships = result.internships || [];
    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="text-7xl mb-4">{careerIcons[result.recommended_career] || '🎯'}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Your Career Analysis</h1>
            <p className="text-gray-400 text-lg">Best match: <span className="text-white font-bold">{result.recommended_career}</span></p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {top3.map((career, index) => {
              const colors = careerColors[career.career] || defaultColor;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }}
                  className={`relative bg-gray-900 p-8 rounded-3xl border ${index === 0 ? 'border-purple-500/50' : 'border-gray-800'} ${colors.border} transition-all duration-300 hover:-translate-y-2 flex flex-col`}>
                  {index === 0 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full">⭐ BEST MATCH</div>
                  )}
                  <div className="flex justify-between items-start mb-4 mt-2">
                    <div className={`p-4 rounded-2xl ${colors.bg} text-4xl`}>{careerIcons[career.career] || '🎯'}</div>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${index === 0 ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-gray-800 text-gray-300 border border-gray-700'}`}>{career.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 mb-5">
                    <motion.div className={`${colors.bar} h-1.5 rounded-full`} initial={{ width: 0 }} animate={{ width: `${career.confidence}%` }} transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${colors.text}`}>{career.career}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1">Match confidence based on your academic profile and interests.</p>
                  <button onClick={() => setSelected(career)}
                    className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 font-semibold text-white border border-gray-700 transition flex items-center justify-center gap-2">
                    View Roadmap <ArrowRight size={16} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <button onClick={handleReset}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-2xl font-semibold transition-all text-gray-300">
              <RotateCcw size={16} /> Retake Analysis
            </button>
          </div>
        </div>

        <AnimatePresence>
          {selectedCareer && (() => {
            const roadmaps = {
              'Software Engineer': [
                { month: 'Month 1', task: 'Learn HTML, CSS & JavaScript basics', tools: 'freeCodeCamp, W3Schools' },
                { month: 'Month 2', task: 'Learn React.js + Git & GitHub',        tools: 'React Docs, GitHub' },
                { month: 'Month 3', task: 'Learn Node.js + Express + MongoDB',    tools: 'MongoDB Atlas, Postman' },
                { month: 'Month 4', task: 'Build 2 full-stack projects',           tools: 'Netlify, Vercel, Railway' },
                { month: 'Month 5', task: 'Apply for internships in Pakistan',     tools: 'Rozee.pk, LinkedIn, Rozee' },
                { month: 'Month 6', task: 'Polish resume, GitHub & interviews',    tools: 'LeetCode, Pramp' },
              ],
              'Data Scientist': [
                { month: 'Month 1', task: 'Learn Python basics + NumPy + Pandas',       tools: 'Kaggle, Google Colab' },
                { month: 'Month 2', task: 'Statistics, Data Visualization (Matplotlib)', tools: 'Seaborn, Plotly' },
                { month: 'Month 3', task: 'Machine Learning with Scikit-learn',          tools: 'Scikit-learn, Jupyter' },
                { month: 'Month 4', task: 'Complete 2 Kaggle competition projects',      tools: 'Kaggle Notebooks' },
                { month: 'Month 5', task: 'Learn SQL + Power BI / Tableau basics',       tools: 'MySQL, Power BI Free' },
                { month: 'Month 6', task: 'Apply for data roles & build portfolio',      tools: 'GitHub, LinkedIn' },
              ],
              'Doctor/Medical': [
                { month: 'Month 1', task: 'Strengthen Biology, Chemistry concepts',      tools: 'MDCAT syllabus, Kips Notes' },
                { month: 'Month 2', task: 'Start MDCAT / USMLE prep seriously',          tools: 'PakMcqs, Kips Academy' },
                { month: 'Month 3', task: 'Practice 1000+ MCQs daily, timed tests',      tools: 'Entry Test apps, Past papers' },
                { month: 'Month 4', task: 'Apply to medical colleges (NUMS, MDCAT)',      tools: 'PMC portal, UHS website' },
                { month: 'Month 5', task: 'Hospital volunteering / shadowing experience', tools: 'Local clinics, THQ hospitals' },
                { month: 'Month 6', task: 'Final exam prep + admission interviews',       tools: 'Interview prep guides' },
              ],
              'Core Engineer': [
                { month: 'Month 1', task: 'Strengthen Math, Physics fundamentals',        tools: 'Khan Academy, Brilliant.org' },
                { month: 'Month 2', task: 'Learn Engineering Drawing + AutoCAD basics',   tools: 'AutoCAD free student version' },
                { month: 'Month 3', task: 'ECAT/NTS preparation — past papers',           tools: 'ECAT prep books, past papers' },
                { month: 'Month 4', task: 'Apply to NUST, UET, NED, COMSATS',             tools: 'University portals' },
                { month: 'Month 5', task: 'Learn MATLAB or relevant engineering software',tools: 'MATLAB, SolidWorks trial' },
                { month: 'Month 6', task: 'Apply for engineering internships',             tools: 'WAPDA, NESCOM, NUST programs' },
              ],
              'Business/Management': [
                { month: 'Month 1', task: 'Learn Business fundamentals + MS Excel',       tools: 'Coursera, Excel tutorials' },
                { month: 'Month 2', task: 'Study Marketing, HR & Finance basics',         tools: 'HubSpot Academy (free)' },
                { month: 'Month 3', task: 'Learn Digital Marketing + Google Analytics',   tools: 'Google Digital Garage' },
                { month: 'Month 4', task: 'Build a mock business plan / case study',      tools: 'Canva, Google Slides' },
                { month: 'Month 5', task: 'Apply for BBA admissions or internships',      tools: 'IBA, LUMS, LinkedIn' },
                { month: 'Month 6', task: 'Polish LinkedIn profile & network actively',   tools: 'LinkedIn, Rozee.pk' },
              ],
              'Finance/Accounting': [
                { month: 'Month 1', task: 'Learn Accounting basics + MS Excel advanced',  tools: 'AccountingCoach.com' },
                { month: 'Month 2', task: 'Study Financial Statements + Bookkeeping',     tools: 'QuickBooks tutorial (free)' },
                { month: 'Month 3', task: 'Explore CA / ACCA / CMA certification paths',  tools: 'ICAP.org, ACCA global' },
                { month: 'Month 4', task: 'Complete practice sets + mock exams',           tools: 'Past papers, Kaplan notes' },
                { month: 'Month 5', task: 'Apply for finance internships in banks/firms',  tools: 'HBL, MCB, KPMG Pakistan' },
                { month: 'Month 6', task: 'Resume + interview prep for finance roles',     tools: 'LinkedIn, Rozee.pk' },
              ],
              'Educator': [
                { month: 'Month 1', task: 'Choose your subject specialty to teach',        tools: 'Your strongest subject' },
                { month: 'Month 2', task: 'Learn modern teaching methods + lesson plans',  tools: 'Coursera Teaching courses' },
                { month: 'Month 3', task: 'Start free online tutoring (Preply, Chegg)',    tools: 'Preply, Chegg Tutors' },
                { month: 'Month 4', task: 'Create YouTube / social media teaching content',tools: 'YouTube, Canva, OBS Studio' },
                { month: 'Month 5', task: 'Apply to Beaconhouse, City School, TCF',        tools: 'School career portals' },
                { month: 'Month 6', task: 'Pursue B.Ed or teaching certification',         tools: 'Allama Iqbal Open University' },
              ],
              'Designer': [
                { month: 'Month 1', task: 'Learn design principles + Canva basics',        tools: 'Canva, Pinterest for inspo' },
                { month: 'Month 2', task: 'Learn Adobe Illustrator + Photoshop',            tools: 'Adobe Creative Cloud trial' },
                { month: 'Month 3', task: 'Learn Figma for UI/UX design',                   tools: 'Figma free account' },
                { month: 'Month 4', task: 'Build a portfolio — 5 real design projects',     tools: 'Behance, Dribbble' },
                { month: 'Month 5', task: 'Start freelancing on Fiverr / Upwork',           tools: 'Fiverr, Upwork accounts' },
                { month: 'Month 6', task: 'Apply for design roles or agencies',             tools: 'LinkedIn, Rozee.pk, Behance' },
              ],
              'Network Engineer': [
                { month: 'Month 1', task: 'Learn Networking basics — OSI, TCP/IP, DNS',    tools: 'Cisco NetAcad (free)' },
                { month: 'Month 2', task: 'Start CCNA certification preparation',           tools: 'Cisco Packet Tracer' },
                { month: 'Month 3', task: 'Learn Linux fundamentals + Command Line',        tools: 'Linux Journey, Ubuntu' },
                { month: 'Month 4', task: 'Study Cybersecurity basics + ethical hacking',  tools: 'TryHackMe (free tier)' },
                { month: 'Month 5', task: 'Get CCNA certified + build home lab',            tools: 'GNS3, Packet Tracer' },
                { month: 'Month 6', task: 'Apply for network roles at PTCL, Jazz, ISPs',   tools: 'Rozee.pk, LinkedIn' },
              ],
            };

            const steps = roadmaps[selectedCareer.career] || [
              { month: 'Month 1–2', task: 'Learn core skills & tools for this field',  tools: 'Coursera, YouTube' },
              { month: 'Month 3–4', task: 'Build 2–3 portfolio projects',               tools: 'GitHub, personal website' },
              { month: 'Month 5',   task: 'Apply for internships in Pakistan',          tools: 'Rozee.pk, LinkedIn' },
              { month: 'Month 6',   task: 'Prepare resume & start interviews',          tools: 'LinkedIn, career fairs' },
            ];

            const colors = careerColors[selectedCareer.career] || defaultColor;

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gray-900 w-full max-w-lg rounded-3xl border border-gray-700 p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">

                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 bg-black rounded-full hover:bg-gray-800 text-gray-400 transition"><X size={20} /></button>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`text-4xl p-3 rounded-2xl ${colors.bg}`}>{careerIcons[selectedCareer.career] || '🎯'}</div>
                    <div>
                      <h2 className={`text-2xl font-bold ${colors.text}`}>{selectedCareer.career}</h2>
                      <p className="text-gray-400 text-sm">{selectedCareer.confidence}% Match · 6-Month Plan</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Your Personalized Roadmap</h3>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-800" />

                    <div className="space-y-4">
                      {steps.map((step, i) => (
                        <div key={i} className="flex gap-4 relative">
                          {/* Circle */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10
                            ${i === 0 ? `${colors.bg} ${colors.text} border-2 border-current` : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                            {i + 1}
                          </div>
                          {/* Content */}
                          <div className="bg-black/40 border border-gray-800 rounded-xl p-4 flex-1 hover:border-gray-600 transition">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-bold ${i === 0 ? colors.text : 'text-gray-500'}`}>{step.month}</span>
                            </div>
                            <p className="text-white text-sm font-semibold mb-1">{step.task}</p>
                            <p className="text-gray-500 text-xs">🛠️ {step.tools}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setSelected(null)}
                    className={`w-full mt-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white hover:from-purple-500 hover:to-pink-500 transition`}>
                    Got it! Let's go 🚀
                  </button>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>
      </div>
    );
  }

  // ── QUIZ ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{current.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{current.question}</h2>
              <p className="text-gray-500 text-sm">{current.subtitle}</p>
            </div>

            <div className="flex flex-col gap-3">
              {current.options.map((opt) => (
                <motion.button key={opt.value} whileHover={{ scale: 1.01, x: 4 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(opt.value)}
                  className="bg-gray-900 hover:bg-purple-900/30 border border-gray-700 hover:border-purple-500 rounded-xl p-4 text-left transition-all duration-200 font-medium text-gray-200 hover:text-white">
                  {opt.label}
                </motion.button>
              ))}
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-300 transition text-sm">
                <ArrowLeft size={16} /> Go back
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {loading && (
          <div className="mt-8 text-center">
            <div className="text-purple-400 animate-pulse text-lg mb-2">🤖 Analyzing your profile...</div>
            <p className="text-gray-600 text-sm">Our AI is processing your answers</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerRecommendation;
