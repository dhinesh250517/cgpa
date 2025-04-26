import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap as Graduation, Home, Info, LogOut, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <Graduation size={28} className="text-orange-500" />
            <span className="text-xl font-bold">SEC GPA Tracker</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`hover:text-orange-300 transition-colors ${
                    location.pathname === '/dashboard' ? 'text-orange-300' : ''
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Home size={18} />
                    Dashboard
                  </span>
                </Link>
                <Link 
                  to="/about" 
                  className={`hover:text-orange-300 transition-colors ${
                    location.pathname === '/about' ? 'text-orange-300' : ''
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Info size={18} />
                    About
                  </span>
                </Link>
                <div className="border-l border-blue-600 h-6"></div>
                <div className="flex items-center space-x-2">
                  <User size={18} />
                  <span>{user?.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-1 text-red-300 hover:text-red-200 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className={`hover:text-orange-300 transition-colors ${
                    location.pathname === '/about' ? 'text-orange-300' : ''
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Info size={18} />
                    About
                  </span>
                </Link>
                <Link 
                  to="/login" 
                  className={`hover:text-orange-300 transition-colors ${
                    location.pathname === '/login' ? 'text-orange-300' : ''
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-600">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/dashboard" 
                  className={`hover:text-orange-300 transition-colors ${
                    location.pathname === '/dashboard' ? 'text-orange-300' : ''
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <span className="flex items-center gap-1">
                    <Home size={18} />
                    Dashboard
                  </span>
                </Link>
                <Link 
                  to="/about" 
                  className={`hover:text-orange-300 transition-colors ${
                    location.pathname === '/about' ? 'text-orange-300' : ''
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <span className="flex items-center gap-1">
                    <Info size={18} />
                    About
                  </span>
                </Link>
                <div className="flex items-center space-x-2 py-2">
                  <User size={18} />
                  <span>{user?.name}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="flex items-center space-x-1 text-red-300 hover:text-red-200 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/about" 
                  className={`hover:text-orange-300 transition-colors ${
                    location.pathname === '/about' ? 'text-orange-300' : ''
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <span className="flex items-center gap-1">
                    <Info size={18} />
                    About
                  </span>
                </Link>
                <Link 
                  to="/login" 
                  className={`hover:text-orange-300 transition-colors ${
                    location.pathname === '/login' ? 'text-orange-300' : ''
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors inline-block text-center"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;