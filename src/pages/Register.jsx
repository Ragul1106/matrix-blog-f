import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({ ...form, password2: form.password });
      alert('Registered! Login now.');
      nav('/login');
    } catch (e) {
      alert('Failed to register');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 overflow-hidden">
      {/* Diagonal gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-200 via-yellow-200 to-orange-200 opacity-40 transform -rotate-12 animate-slow-slide"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] animate-slideIn">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Register</h2>
        <form onSubmit={submit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder=" "
              className="peer w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-green-500 peer-focus:text-sm transition-all">
              Email
            </label>
          </div>

          {/* Username Input */}
          <div className="relative">
            <input
              required
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder=" "
              className="peer w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-green-500 peer-focus:text-sm transition-all">
              Username
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder=" "
              className="peer w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-green-500 peer-focus:text-sm transition-all">
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transform transition-transform duration-300 hover:brightness-110"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <span className="text-green-600 hover:underline cursor-pointer" onClick={() => nav('/login')}>
            Login
          </span>
        </p>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes slideIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.7s ease-out forwards;
          }

          @keyframes slowSlide {
            0% { background-position: 0 0; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0 0; }
          }
          .animate-slow-slide {
            animation: slowSlide 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
