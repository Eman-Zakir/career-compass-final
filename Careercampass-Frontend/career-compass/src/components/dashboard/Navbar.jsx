import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, User, CheckCircle, AlertTriangle, LogOut, Settings, Trash2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SOUND EFFECTS ---

// 1. Catchy Notification Sound (Jab msg aaye) 🎵
const playNotificationSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  audio.volume = 0.7; 
  audio.play().catch(error => console.log("Browser blocked auto-sound:", error));
};

// 2. Click Sound (Jab tum button dabao - "Takk") 🔉
const playClickSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
  audio.volume = 0.5; // Thoda halka taake kaan na phate
  audio.play().catch(error => console.log("Click sound error:", error));
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const role = user?.role ? user.role.toLowerCase() : 'student';

  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Initial Data
  const roleBasedData = {
    student: [
      { id: 1, text: "🎓 Scholarship Deadline Tomorrow!", time: "2h ago", type: "warning" },
      { id: 2, text: "New Internship: Frontend Dev", time: "5h ago", type: "info" }
    ],
    'job-seeker': [
      { id: 1, text: "💼 Interview Call from TechCorp", time: "10m ago", type: "success" },
      { id: 2, text: "Resume Review Completed", time: "1h ago", type: "info" }
    ],
    professional: [
      { id: 1, text: "🚀 Leadership Course Recommendation", time: "30m ago", type: "info" },
      { id: 2, text: "Market Salary Updated", time: "1d ago", type: "success" }
    ],
    admin: [
      { id: 1, text: "⚠️ Server Load High", time: "Now", type: "warning" },
      { id: 2, text: "New User Registration Spike", time: "10m ago", type: "info" }
    ]
  };

  useEffect(() => {
    setNotifications(roleBasedData[role] || roleBasedData['student']);
  }, [role]);

  // --- AUTOMATIC NOTIFICATION LOGIC ---
  useEffect(() => {
    const timer = setTimeout(() => {
      let newMsg = "";
      let type = "info";

      if (role === 'student') { newMsg = "🔥 New Internship Match Found!"; type = "success"; }
      else if (role === 'job-seeker') { newMsg = "🔥 Your Resume Score increased to 90%!"; type = "success"; }
      else if (role === 'professional') { newMsg = "📈 New Career Path Unlocked: CTO"; type = "info"; }
      else { newMsg = "🛡️ System Backup Completed."; type = "success"; }

      const newNotif = { id: Date.now(), text: newMsg, time: "Just now", type: type };
      
      setNotifications(prev => [newNotif, ...prev]);
      
      // Yahan Catchy Sound bajega 🎵
      playNotificationSound();
      
    }, 5000); 

    return () => clearTimeout(timer);
  }, [role]);

  // --- HANDLERS ---

  const handleLogout = () => {
    playClickSound(); // Logout par bhi awaaz
    logout();
    navigate('/login');
  };

  const toggleNotif = () => {
    playClickSound(); // <--- "Takk" Sound Here
    setShowNotifs(!showNotifs);
    setShowProfileMenu(false);
  };

  const toggleProfile = () => {
    playClickSound(); // <--- "Takk" Sound Here
    setShowProfileMenu(!showProfileMenu);
    setShowNotifs(false);
  };

  const clearNotifications = () => {
    playClickSound(); // Clear karne par bhi awaaz
    setNotifications([]);
  };

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-black/95 border-b border-gray-800 flex items-center justify-between px-8 sticky top-0 z-50 backdrop-blur-md">
      
      <div>
        <h2 className="text-gray-400 text-sm">Welcome back,</h2>
        <p className="text-white font-bold capitalize text-lg">{user?.fullName || 'Guest User'}</p>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={toggleNotif}
            className="relative p-3 text-gray-400 hover:text-white transition bg-gray-900 rounded-full hover:bg-gray-800 border border-gray-800 group"
          >
            <Bell size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Red Dot Logic */}
            {notifications.length > 0 && (
              <>
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-ping"></span>
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black"></span>
              </>
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
                  <h3 className="font-bold text-white">Notifications ({notifications.length})</h3>
                  {notifications.length > 0 && (
                    <button 
                      onClick={clearNotifications}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition font-medium"
                    >
                      <Trash2 size={12} /> Clear all
                    </button>
                  )}
                </div>
                
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center text-gray-500">
                      <Bell size={30} className="mb-2 opacity-20" />
                      <p className="text-sm">No new notifications 🎉</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={n.id} 
                        className="p-4 border-b border-gray-800 hover:bg-gray-800/50 transition flex gap-3 cursor-pointer group"
                      >
                        <div className={`mt-1 p-2 rounded-full ${n.type === 'success' ? 'bg-green-500/10 text-green-500' : n.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'}`}>
                          {n.type === 'success' ? <CheckCircle size={14} /> : n.type === 'warning' ? <AlertTriangle size={14}/> : <Info size={14} />}
                        </div>
                        <div>
                          <p className="text-gray-200 text-sm font-medium group-hover:text-white transition">{n.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative pl-6 border-l border-gray-800" ref={profileRef}>
          <button 
            onClick={toggleProfile} 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white group-hover:text-blue-400 transition">{user?.fullName || 'Guest User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Student'}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg ring-2 ring-black group-hover:ring-blue-500 transition">
              <User size={20} />
            </div>
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-56 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-2 space-y-1">
                  <Link 
                    to="/profile" 
                    onClick={() => { playClickSound(); setShowProfileMenu(false); }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition"
                  >
                    <Settings size={18} /> Profile Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};

export default Navbar;