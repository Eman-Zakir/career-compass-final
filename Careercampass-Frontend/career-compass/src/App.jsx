import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './Layouts/MainLayout';

// Common Components
import Preloader from './components/common/Preloader';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import SetupProfile from './pages/auth/SetupProfile';

// Settings
import ProfileSettings from './pages/settings/ProfileSettings';

// Student Pages
import StudentDashboard from './pages/students/StudentDashboard';
import CareerRecommendation from './pages/students/CareerRecommendation';
import InternshipMatching from './pages/students/InternshipMatching';
import CareerQuiz from './pages/students/CareerQuiz';

// Job Seeker Pages
import JobSeekerDashboard from './pages/jobSeeker/JobSeekerDashboard';
import ResumeOptimization from './pages/jobSeeker/ResumeOptimization';
import SkillGapIdentification from './pages/jobSeeker/SkillGapIdentification';

// Professional Pages
import ProfessionalDashboard from './pages/professional/ProfessionalDashboard';
import CareerProgression from './pages/professional/CareerProgression';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resettoken" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/setup-profile" element={<SetupProfile />} />

            <Route element={<MainLayout />}>
              <Route path="/profile" element={<ProfileSettings />} />

              {/* Student Role Routes */}
             <Route element={<PrivateRoute allowedRoles={['student']} />}>
             <Route path="/student/dashboard" element={<StudentDashboard />} />
             <Route path="/student/recommendations" element={<CareerRecommendation />} />
             <Route path="/student/internships" element={<InternshipMatching />} />
             <Route path="/student/career-quiz" element={<CareerQuiz />} />  {/* ← YEH ADD KARO */}
             </Route>
              {/* Job Seeker Role Routes */}
              <Route element={<PrivateRoute allowedRoles={['job-seeker']} />}>
                <Route path="/job-seeker/dashboard" element={<JobSeekerDashboard />} />
                <Route path="/job-seeker/resume" element={<ResumeOptimization />} />
                <Route path="/job-seeker/skills" element={<SkillGapIdentification />} />
              </Route>

              {/* Professional Role Routes */}
              <Route element={<PrivateRoute allowedRoles={['professional']} />}>
                <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
                <Route path="/professional/progression" element={<CareerProgression />} />
              </Route>

              {/* Admin Role Routes */}
              <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Route>

          <Route path="/unauthorized" element={<div className="min-h-screen flex items-center justify-center text-white bg-black"><h1>403 - Unauthorized</h1></div>} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;