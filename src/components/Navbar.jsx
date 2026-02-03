import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, UserPlus, Bell, LogOut } from 'lucide-react';
import { SellerContext } from '../Context/SellerContext';

const Navbar = () => {
  const { token, setToken } = useContext(SellerContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);
  const isAuthenticated = Boolean(token);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleNotification = () => {
    navigate('/notification');
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Seller Dashboard</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleProfile}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleNotification}
                  className="relative p-2 text-gray-400 hover:text-gray-600"
                >
                  <Bell className="w-6 h-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {notifications}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={handleRegister}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleProfile}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleNotification}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                  {notifications > 0 && (
                    <span className="absolute top-1 right-6 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {notifications}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-red-600 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
