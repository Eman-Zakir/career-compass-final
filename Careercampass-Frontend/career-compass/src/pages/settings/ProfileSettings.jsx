import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Save, CheckCircle, UserCircle, Calendar, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || user.profile?.phone || '',
        age: user.age || user.profile?.age || '',
        gender: user.gender || user.profile?.gender || '',
        bio: user.profile?.bio || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Send all fields to backend — top-level AND nested profile
      await updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        profile: {
          phone: formData.phone,
          age: formData.age,
          gender: formData.gender,
          bio: formData.bio,
        }
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save changes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-bold text-blue-400 mb-8">Profile Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Side Card */}
          <div className="md:col-span-1 bg-gray-900 p-8 rounded-3xl border border-gray-800 text-center h-fit flex flex-col items-center justify-center">
            <div className="mb-4 p-4 bg-blue-600/20 rounded-full text-blue-500">
              <UserCircle size={80} />
            </div>
            <h2 className="text-xl font-bold mt-2 break-words">{formData.fullName || "User Name"}</h2>
            <p className="text-blue-400 text-sm uppercase font-bold tracking-widest mt-1">{user?.role || "ROLE"}</p>
            {formData.gender && (
              <p className="text-gray-500 text-xs mt-1 capitalize">{formData.gender}</p>
            )}
            {formData.age && (
              <p className="text-gray-500 text-xs mt-0.5">Age: {formData.age}</p>
            )}
          </div>

          {/* Right Side - Edit Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 bg-gray-900 p-8 rounded-3xl border border-gray-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="text-blue-500" size={20} /> Edit Details
            </h3>
            
            <div className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-black border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-blue-500 outline-none placeholder-gray-600" placeholder="Enter your name" />
                </div>
              </div>

              {/* Email (Disabled) */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="email" value={formData.email} disabled className="w-full bg-black/50 border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-gray-500 cursor-not-allowed" placeholder="email@example.com" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-blue-500 outline-none placeholder-gray-600" placeholder="03XXXXXXXXX" />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Age</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-black border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-blue-500 outline-none placeholder-gray-600" placeholder="e.g. 22" min="1" max="100" />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Gender</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-black border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-blue-500 outline-none appearance-none">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio</label>
                <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none placeholder-gray-600 resize-none" placeholder="Tell us a bit about yourself..." />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 text-red-400 p-3 rounded-xl border border-red-500/20 text-sm">
                  {error}
                </div>
              )}

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-green-500/10 text-green-400 p-3 rounded-xl flex items-center gap-2 border border-green-500/20 font-medium">
                    <CheckCircle size={18} /> Changes Saved Successfully!
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-blue-600 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-500 transition flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Save size={18} /> {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;