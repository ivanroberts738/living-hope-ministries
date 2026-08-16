// src/components/Navbar.tsx
import React from 'react';
import { 
  Home, 
  Info, 
  Target, 
  BookOpen, 
  Calendar, 
  Image, 
  Heart, 
  Mail, 
  Users,
  Shield,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  adminUser: any | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  adminUser, 
  onLogout 
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'impact', label: 'Impact', icon: Target },
    { id: 'programmes', label: 'Programmes', icon: BookOpen },
    { id: 'activities', label: 'Activities', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'get-involved', label: 'Get Involved', icon: Heart },
    { id: 'board-of-governors', label: 'Board of Governors', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2"
            >
              <span className="text-xl font-bold text-blue-900">
                LIVING HOPE
                <span className="text-yellow-400"> MINISTRIES</span>
              </span>
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}

            {/* Admin Button */}
            {adminUser ? (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === 'admin'
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('admin-login')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <Shield className="w-4 h-4" />
                Login
              </button>
            )}

            {adminUser && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Hamburger - Optional */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu');
                mobileMenu?.classList.toggle('hidden');
              }}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden pb-4">
          <div className="flex flex-col space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    document.getElementById('mobile-menu')?.classList.add('hidden');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}

            {adminUser ? (
              <button
                onClick={() => {
                  setActiveTab('admin');
                  document.getElementById('mobile-menu')?.classList.add('hidden');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('admin-login');
                  document.getElementById('mobile-menu')?.classList.add('hidden');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <Shield className="w-4 h-4" />
                Login
              </button>
            )}

            {adminUser && (
              <button
                onClick={() => {
                  onLogout();
                  document.getElementById('mobile-menu')?.classList.add('hidden');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
