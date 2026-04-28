import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const { register, logout } = useAuth();

  // State for Inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  // State for Errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when typing
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // ── Helper: detect repetitive patterns ("aaaa", "lllll", "ababab") ──
  const isRepetitive = (str) => {
    const s = str.toLowerCase();
    if (/^(.)\1+$/.test(s)) return true;          // all same char
    if (/^(.{1,3})\1{2,}$/.test(s)) return true;  // repeating short pattern
    return false;
  };

  // ── Helper: validate email local-part (before @) ──
  const isValidEmailLocalPart = (email) => {
    const localPart = email.split('@')[0];
    if (/^\d+$/.test(localPart)) return false;             // purely numeric
    if (isRepetitive(localPart)) return false;             // e.g. lllllll
    const letterCount = (localPart.match(/[a-zA-Z]/g) || []).length;
    if (letterCount < 2) return false;                     // at least 2 letters
    return true;
  };

  // ── VALIDATION LOGIC ──
  const validate = () => {
    let newErrors = {};

    // 1. Full Name — letters and spaces only, no numbers/symbols
    const nameTrimmed = formData.fullName.trim();
    if (nameTrimmed.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(nameTrimmed)) {
      newErrors.fullName = "Name must contain only letters and spaces (no numbers or symbols).";
    } else if (isRepetitive(nameTrimmed.replace(/\s/g, ''))) {
      newErrors.fullName = "Name appears invalid or repetitive. Please enter your real name.";
    }

    // 2. Email — valid format + block numeric/repetitive local parts
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g., name@gmail.com).";
    } else if (!isValidEmailLocalPart(formData.email)) {
      newErrors.email = "Email is invalid. Avoid purely numeric or repetitive usernames like '123456@' or 'lllll@'.";
    }

    // 3. Password — uppercase + lowercase + number + special char, min 8
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be 8+ chars with uppercase, lowercase, number & special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        await register(formData.fullName, formData.email, formData.password, 'student'); // Default role 'student'
        
        // Log them out immediately so they are forced to log in manually as requested
        await logout();

        // Success! Go to Login
        navigate('/login');
      } catch (err) {
        setErrors({ email: err.message || "Registration failed." });
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-black font-sans">
      
      {/* Left Side Image */}
      <div className="hidden lg:flex w-1/2 bg-cover bg-center relative" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        <div className="absolute bottom-16 left-12 z-10">
          <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">Start Your <br/> Success Story.</h2>
          <p className="text-gray-300 text-lg max-w-md">Join thousands shaping their future with AI.</p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Sign up to get started.</p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-500 transition" size={18} />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full bg-gray-900 border text-white pl-10 pr-3 py-2.5 rounded-lg outline-none transition text-sm
                    ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-blue-500'}
                  `}
                  placeholder="e.g. Malaika Arshad" 
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-500 transition" size={18} />
                <input 
                  type="text" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-900 border text-white pl-10 pr-3 py-2.5 rounded-lg outline-none transition text-sm
                    ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-blue-500'}
                  `}
                  placeholder="name@example.com" 
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-500 transition" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-900 border text-white pl-10 pr-10 py-2.5 rounded-lg outline-none transition text-sm
                    ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-blue-500'}
                  `}
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.password}</p>}
              <p className="text-gray-600 text-[10px] mt-1">Must contain 1 special character (@, #, $)</p>
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold text-base hover:shadow-lg hover:shadow-blue-500/30 transition transform active:scale-95 flex items-center justify-center gap-2 mt-2">
              Create Account <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-400 font-bold hover:underline hover:text-blue-300">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;