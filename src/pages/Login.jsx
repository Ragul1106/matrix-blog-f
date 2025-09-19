import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      nav('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full opacity-20 animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6 animate-fadeIn">Login</h2>
        <form onSubmit={submit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-500 peer-focus:text-sm transition-all">
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-500 peer-focus:text-sm transition-all">
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transform transition-transform duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-500 text-sm animate-fadeIn delay-200">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
