import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, GraduationCap, Trash2, Activity, ShieldAlert, Search } from 'lucide-react';

const AdminDashboard = () => {
  // Fake Database of Users
  const [users, setUsers] = useState([
    { id: 1, name: 'Malaika Arshad', role: 'Student', email: 'malaika@test.com', status: 'Active' },
    { id: 2, name: 'Ali Khan', role: 'Job Seeker', email: 'ali@test.com', status: 'Active' },
    { id: 3, name: 'Sara Ahmed', role: 'Professional', email: 'sara@test.com', status: 'Inactive' },
    { id: 4, name: 'John Doe', role: 'Student', email: 'john@test.com', status: 'Active' },
    { id: 5, name: 'Spammer User', role: 'Job Seeker', email: 'spam@fake.com', status: 'Banned' },
  ]);

  // Delete Function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
              Admin Control Panel
            </h1>
            <p className="text-gray-400">System Overview & User Management</p>
          </div>
          <div className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full border border-red-500/20 animate-pulse">
            <ShieldAlert size={18} />
            <span className="text-sm font-bold">Secure Admin Access</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <h3 className="text-3xl font-bold text-white">{users.length}</h3>
              </div>
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Users size={20} /></div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Students</p>
                <h3 className="text-3xl font-bold text-white">850</h3>
              </div>
              <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg"><GraduationCap size={20} /></div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Professionals</p>
                <h3 className="text-3xl font-bold text-white">320</h3>
              </div>
              <div className="p-3 bg-green-500/20 text-green-400 rounded-lg"><Briefcase size={20} /></div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">System Health</p>
                <h3 className="text-3xl font-bold text-green-500">98%</h3>
              </div>
              <div className="p-3 bg-green-500/20 text-green-400 rounded-lg"><Activity size={20} /></div>
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-white">Registered Users Database</h2>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search user..." 
                className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-gray-400 text-sm uppercase">
                  <th className="p-5 font-semibold">User Name</th>
                  <th className="p-5 font-semibold">Role</th>
                  <th className="p-5 font-semibold">Email</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((user) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-800/50 transition"
                  >
                    <td className="p-5 font-medium text-white">{user.name}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border
                        ${user.role === 'Student' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                          user.role === 'Job Seeker' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          'bg-green-500/10 text-green-400 border-green-500/20'}
                      `}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-5 text-gray-400">{user.email}</td>
                    <td className="p-5">
                      <span className={`flex items-center gap-2 text-sm
                        ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}
                      `}>
                        <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;