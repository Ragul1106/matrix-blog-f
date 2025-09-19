import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    nav('/');
  };

  const menuLinkClasses =
    'relative text-white font-medium hover:text-yellow-400 transition-colors duration-300 before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-yellow-400 before:transition-all before:duration-300 hover:before:w-full';

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-2xl text-white hover:scale-105 transform transition-transform duration-300">
          MatrixBlog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link className={menuLinkClasses} to="/blog">
            Blog
          </Link>

          {user ? (
            <>
              <Link className={menuLinkClasses} to="/dashboard">
                {user.username}
              </Link>
              <button
                onClick={onLogout}
                className="bg-red-500 cursor-pointer hover:bg-red-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className={menuLinkClasses} to="/login">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 text-white px-6 py-4 space-y-3 shadow-lg animate-fadeIn">
          <Link className={menuLinkClasses + ' block'} to="/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>

          {user ? (
            <>
              <Link
                className={menuLinkClasses + ' block'}
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                {user.username}
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className={menuLinkClasses + ' block'} to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
