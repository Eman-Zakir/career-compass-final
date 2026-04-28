import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Navbar from '../components/dashboard/Navbar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side Content */}
      <div className="flex-1 flex flex-col ml-64">
        
        {/* Navbar */}
        <Navbar />

        {/* Yahan 'bg-black' zaroori hai taake white screen na aaye */}
        <main className="flex-1 p-6 bg-black min-h-screen">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;