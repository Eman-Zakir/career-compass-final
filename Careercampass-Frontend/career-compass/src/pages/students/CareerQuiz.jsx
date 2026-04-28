import { useState } from "react";
import axios from "axios";

// ── Quiz Questions ────────────────────────────────────
const questions = [
  {
    id: "gender",
    question: "Tumhara gender kya hai?",
    emoji: "👤",
    options: [
      { label: "Male",   value: "male"   },
      { label: "Female", value: "female" },
    ],
  },
  {
    id: "intermediate_field",
    question: "Tumne intermediate mein kya subjects liye?",
    emoji: "📚",
    options: [
      { label: "Pre-Engineering (Math, Physics, Chemistry)", value: "Pre-Engineering"  },
      { label: "Pre-Medical (Biology, Chemistry)",           value: "Pre-Medical"      },
      { label: "Commerce (Accounts, Economics)",             value: "Commerce"         },
      { label: "Computer Science (ICS)",                     value: "Computer-Science" },
      { label: "Arts / Humanities",                          value: "Arts"             },
      { label: "General Science",                            value: "General"          },
    ],
  },
  {
    id: "grade_band",
    question: "Tumhari intermediate mein grades kaisi hain?",
    emoji: "🏆",
    options: [
      { label: "A — 80% ya upar (Excellent)", value: "A" },
      { label: "B — 65% to 79% (Good)",       value: "B" },
      { label: "C — 50% to 64% (Average)",    value: "C" },
      { label: "D — 50% se neeche",           value: "D" },
    ],
  },
  {
    id: "primary_interest",
    question: "Tumhari sabse badi interest kya hai?",
    emoji: "💡",
    options: [
      { label: "Technology & Computers",     value: "Technology"        },
      { label: "Business & Marketing",       value: "Business"          },
      { label: "Health & Medical",           value: "Health/Medical"    },
      { label: "Teaching & Research",        value: "Education/Research"},
      { label: "Arts & Design",              value: "Arts/Design"       },
      { label: "Finance & Banking",          value: "Finance"           },
      { label: "Engineering & Construction", value: "Engineering"       },
    ],
  },
  {
    id: "primary_skill",
    question: "Tumhari strongest skill kya hai?",
    emoji: "⚡",
    options: [
      { label: "Programming / Coding",    value: "Programming"    },
      { label: "Communication / Speaking",value: "Communication"  },
      { label: "Mathematics / Logical",   value: "Mathematics"    },
      { label: "Creativity / Design",     value: "Creativity"     },
      { label: "Leadership / Management", value: "Leadership"     },
      { label: "Analytical / Data",       value: "Analytical"     },
      { label: "Writing / Content",       value: "Writing"        },
      { label: "Problem Solving",         value: "Problem Solving"},
    ],
  },
];

// ── Career Icons Map ──────────────────────────────────
const careerIcons = {
  "Software Engineer":    "💻",
  "Data Scientist":       "📊",
  "Doctor/Medical":       "🏥",
  "Core Engineer":        "⚙️",
  "Business/Management":  "💼",
  "Finance/Accounting":   "💰",
  "Educator":             "🎓",
  "Designer":             "🎨",
  "Network Engineer":     "🌐",
};

export default function CareerQuiz() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);

  const current  = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  // ── Handle option select ──────────────────────────
  const handleSelect = async (value) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:5001/predict", newAnswers);
        setResult(res.data);
      } catch (err) {
        alert("❌ ML Service se connect nahi ho saka!\nCheck karo: python flask_api.py chal raha hai port 5001 pe?");
      }
      setLoading(false);
    }
  };

  // ── Reset ────────────────────────────────────────
  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  // ════════════════════════════════════════════════════
  // RESULT SCREEN
  // ════════════════════════════════════════════════════
  if (result) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">
              {careerIcons[result.recommended_career] || "🎯"}
            </div>
            <h1 className="text-3xl font-bold text-purple-400">Tumhara Best Career</h1>
            <h2 className="text-4xl font-extrabold mt-2">{result.recommended_career}</h2>
          </div>

          {/* Top 3 */}
          <div className="bg-gray-800 rounded-2xl p-5 mb-5">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">📈 Top 3 Career Matches</h3>
            {result.top_3_careers.map((c, i) => (
              <div key={i} className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{careerIcons[c.career] || "🎯"}</span>
                  <span className={i === 0 ? "font-bold text-white" : "text-gray-300"}>
                    {c.career}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${c.confidence}%` }}
                    />
                  </div>
                  <span className="text-green-400 text-sm w-12 text-right">
                    {c.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Internships */}
          <div className="bg-gray-800 rounded-2xl p-5 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">
              🏢 Pakistan Mein Internships
            </h3>
            {result.internships.length > 0 ? (
              result.internships.map((intern, i) => (
                <a
                  key={i}
                  href={intern.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 
                             rounded-xl p-3 mb-2 transition-all"
                >
                  <span>{intern.company}</span>
                  <span className="text-purple-400 text-sm">Apply →</span>
                </a>
              ))
            ) : (
              <p className="text-gray-400">Rozee.pk pe search karo internships ke liye</p>
            )}
          </div>

          {/* Retry button */}
          <button
            onClick={handleReset}
            className="w-full bg-purple-600 hover:bg-purple-700 
                       rounded-xl py-3 font-semibold transition-all"
          >
            🔄 Dobara Quiz Do
          </button>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════
  // QUIZ SCREEN
  // ════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{current.emoji}</div>
          <h2 className="text-2xl font-bold">{current.question}</h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="bg-gray-800 hover:bg-purple-700 border border-gray-700 
                         hover:border-purple-500 rounded-xl p-4 text-left 
                         transition-all duration-200 font-medium"
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-6 text-center text-purple-400 animate-pulse">
            🤖 AI tumhara career analyze kar raha hai...
          </div>
        )}
      </div>
    </div>
  );
}
