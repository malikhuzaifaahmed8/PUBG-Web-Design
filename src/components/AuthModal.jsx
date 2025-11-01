// AuthModal.jsx
import { useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo("#auth-modal",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/signup
    if (isLogin) {
      onLogin({ username: formData.username || formData.email });
    } else {
      if (formData.password === formData.confirmPassword) {
        onLogin({ username: formData.username });
      }
    }
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div id="auth-modal" className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Login to PUBG' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-300 text-sm mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              {isLogin ? 'Username or Email' : 'Email'}
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-red-600 text-white py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
          >
            {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            By continuing, you agree to PUBG Mobile's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;