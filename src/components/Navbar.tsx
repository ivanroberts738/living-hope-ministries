import React, { useState } from 'react';
import { OfficialLogo } from './OfficialLogo';
import { Menu, X, Heart, Lock, LogOut, ShieldCheck, PhoneCall } from 'lucide-react';
import { AdminUser } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  adminUser: AdminUser | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  adminUser,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programmes', label: 'Our Programmes' },
    { id: 'activities', label: 'Our Activities' },
    { id: 'impact', label: 'Impact' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-blue-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wider text-red-300">
              LOCATION:
            </span>
            <span className="font-medium">Sironko–Bulambuli, Uganda</span>
            <span className="hidden sm:inline text-blue-300">•</span>
            <span className="hidden sm:inline italic text-blue-100">
              "HOPE FOR ALL HUMAN KIND"
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+256772000000"
              className="flex items-center gap-1 hover:text-red-300 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>+256 772 000 000</span>
            </a>

            {adminUser ? (
              <div className="flex items-center gap-2 bg-blue-800/80 px-2 py-0.5 rounded text-[11px] border border-blue-700">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="font-medium text-emerald-300 hidden sm:inline">
                  Admin: {adminUser.email}
                </span>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="underline hover:text-white font-bold ml-1"
                >
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="hover:text-red-300 ml-1"
                  title="Logout"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin-login')}
                className="flex items-center gap-1 text-[11px] text-blue-200 hover:text-white transition-colors"
              >
                <Lock className="w-3 h-3 text-blue-300" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-hidden"
        >
          <OfficialLogo variant="icon" size={56} showText={false} />
          <div className="flex flex-col">
            <span className="font-extrabold text-blue-950 tracking-tight text-lg sm:text-xl leading-tight font-serif group-hover:text-blue-700 transition-colors">
              Buhugu Living Hope
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Ministries
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.2 rounded uppercase">
                Uganda
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-2 rounded-md transition-all duration-150 ${
                activeTab === link.id
                  ? 'bg-blue-50 text-blue-800 font-bold border-b-2 border-blue-700 shadow-2xs'
                  : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('get-involved')}
            className="hidden sm:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Support Our Work</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="py-2 border-b border-slate-100 mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Navigation
            </span>
            <span className="text-xs text-blue-800 font-semibold">
              Sironko–Bulambuli, Uganda
            </span>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                activeTab === link.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{link.label}</span>
              {activeTab === link.id && <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Active</span>}
            </button>
          ))}

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <button
              onClick={() => handleNavClick('get-involved')}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-sm"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support Our Work</span>
            </button>

            {adminUser ? (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 bg-blue-900 text-white font-medium py-2.5 px-4 rounded-lg"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('admin-login')}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-medium py-2 px-4 rounded-lg text-xs"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Administrator Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
