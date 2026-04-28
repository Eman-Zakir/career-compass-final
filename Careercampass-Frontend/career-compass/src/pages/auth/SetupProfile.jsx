import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Calendar, ChevronDown, ArrowRight, Users, Smile } from 'lucide-react';

const SetupProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth(); // Get user context and updateProfile function
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    age: user?.profile?.age || '',
    gender: user?.profile?.gender || 'female',
    phone: user?.profile?.phone || '',
    role: user?.role || 'student',
    email: user?.email || '' // Read-only
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Send fields at BOTH top level AND inside profile{}
      // This ensures the backend receives them regardless of which path it reads
      await updateProfile({
        fullName: formData.fullName,
        role:     formData.role,
        phone:    formData.phone,
        age:      formData.age,
        gender:   formData.gender,
        profile: {
          phone:  formData.phone,
          age:    formData.age,
          gender: formData.gender,
        }
      });

      // Redirect based on Role
      if (formData.role === 'student')      navigate('/student/dashboard');
      else if (formData.role === 'job-seeker')   navigate('/job-seeker/dashboard');
      else if (formData.role === 'professional') navigate('/professional/dashboard');
      else if (formData.role === 'admin')        navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-gray-400">Fill in your details to get started.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-sm">
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-500" size={20} />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:border-blue-500 outline-none" placeholder="Enter Name" required />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Age</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-gray-500" size={20} />
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:border-blue-500 outline-none" placeholder="Age" required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-gray-500" size={20} />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:border-blue-500 outline-none" placeholder="03XXXXXXXXX" required />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Gender</label>
              <div className="relative">
                <Smile className="absolute left-4 top-3.5 text-gray-500" size={20} />
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-black border border-gray-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:border-blue-500 outline-none appearance-none">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                <ChevronDown className="absolute right-4 top-4 text-gray-500" size={20} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-400 mb-2">SELECT ROLE</label>
            <div className="relative">
              <Users className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:border-blue-500 outline-none appearance-none">
                <option value="student">Student</option>
                <option value="job-seeker">Job Seeker</option>
                <option value="professional">Professional</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 text-gray-500" size={20} />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading ? 'Saving...' : 'Save & Go to Dashboard'} <ArrowRight className="inline ml-2" size={20} />
          </button>

        </form>
      </div>
    </div>
  );
};

export default SetupProfile;