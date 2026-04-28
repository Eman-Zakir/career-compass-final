import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, BookOpen, Briefcase, FileText, Target, TrendingUp, LogOut, Compass, ShieldAlert } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Ye line missing thi pehle
  };

  // Safe Role Check
  const role = user?.role ? user.role.toLowerCase() : 'student';

  const links = {
    student: [
      { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={20} /> },
      { name: 'Recommendations', path: '/student/recommendations', icon: <BookOpen size={20} /> },
      { name: 'Internships', path: '/student/internships', icon: <Briefcase size={20} /> },
    ],
    'job-seeker': [
      { name: 'Dashboard', path: '/job-seeker/dashboard', icon: <LayoutDashboard size={20} /> },
      { name: 'Resume Optimizer', path: '/job-seeker/resume', icon: <FileText size={20} /> },
      { name: 'Skill Analysis', path: '/job-seeker/skills', icon: <Target size={20} /> },
    ],
    professional: [
      { name: 'Dashboard', path: '/professional/dashboard', icon: <LayoutDashboard size={20} /> },
      { name: 'Career Growth', path: '/professional/progression', icon: <TrendingUp size={20} /> },
    ],
    admin: [
        { name: 'Admin Control', path: '/admin/dashboard', icon: <ShieldAlert size={20} /> },
    ]
  };

  const userLinks = links[role] || links['student'];

  return (
    <div className="h-screen w-64 bg-black border-r border-gray-800 flex flex-col justify-between p-5 fixed left-0 top-0 z-40">
      
      <div>
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Compass className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            CareerCompass
          </h1>
        </div>

        <nav className="space-y-2">
          {userLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'}
                `}
              >
                <span className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-400'}>
                  {link.icon}
                </span>
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full"
      >
        <LogOut size={20} />
        <span className="font-medium">Sign Out</span>
      </button>

    </div>
  );
};

export default Sidebar;