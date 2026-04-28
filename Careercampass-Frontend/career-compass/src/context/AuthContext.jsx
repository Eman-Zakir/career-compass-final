import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configure axios for credentials
const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  withCredentials: true // Extremely important for sending/receiving HTTP-only cookies
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check Auth Status on Load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/me');
        if (res.data.success) {
          setUser(res.data.user); // includes phone, age, gender, bio now
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 2. Login Function
  const login = async (email, password) => {
    try {
      const res = await api.post('/login', { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  // 3. Register Function
  const register = async (fullName, email, password, role) => {
    try {
      const res = await api.post('/register', { fullName, email, password, role });
      if (res.data.success) {
        setUser(res.data.user);
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  // 4. Logout Function
  const logout = async () => {
    try {
      await api.get('/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  // 5. Forgot Password
  const forgotPassword = async (email) => {
    try {
      const res = await api.post('/forgotpassword', { email });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  // 6. Reset Password
  const resetPassword = async (token, password) => {
    const res = await api.put(`/resetpassword/${token}`, { password });
    if (res.data.success) {
      setUser(res.data.user);
    }
    return res.data;
  };

  // 7. Update Profile
  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/profile', profileData);
      if (res.data.success) {
        setUser(res.data.user);
      }
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, resetPassword, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};