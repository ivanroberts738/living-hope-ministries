import React from 'react';
import { OfficialLogo } from './OfficialLogo';
import { Heart, MapPin, Phone, Mail, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleLinkClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Organization & Emblem */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <OfficialLogo variant="icon" size={56} showText={false} />
              <div>
                <h3 className="font-bold text-white text-lg font-serif">
                  Buhugu Living Hope
                </h3>
                <p className="text-xs text-red-500 font-bold uppercase tracking-wider">
                  Ministries • Uganda
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering women, children, and vulnerable communities in Sironko–Bulambuli, Uganda through hope, education, livelihoods, and humanitarian development.
            </p>

            <div className="inline-block bg-blue-950/80 border border-blue-800/80 rounded-lg px-3 py-1.5 text-xs text-blue-200">
              <span className="font-bold text-red-400 uppercase tracking-widest mr-1">MOTTO:</span>
              <span className="italic font-serif text-white">"HOPE FOR ALL HUMAN KIND"</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 uppercase tracking-wider font-serif border-b border-blue-600/50 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'programmes', label: 'Our Programmes' },
                { id: 'activities', label: 'Our Activities' },
                { id: 'impact', label: 'Impact & Reach' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'get-involved', label: 'Get Involved / Donate' },
                { id: 'contact', label: 'Contact Us' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className="hover:text-white hover:translate-x-1 transition-all duration-150 text-slate-400 flex items-center gap-1.5"
                  >
                    <span className="text-blue-500 font-bold">›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 uppercase tracking-wider font-serif border-b border-blue-600/50 pb-2 inline-block">
              Location & Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Official Location:</strong>
                  <span>Sironko–Bulambuli, Eastern Region, Uganda</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Telephone:</strong>
                  <span>+256 772 000 000 / +256 700 000 000</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Official Email:</strong>
                  <span>hopeministriesbuhuguliving@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Admin */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base mb-2 uppercase tracking-wider font-serif border-b border-blue-600/50 pb-2 inline-block">
              Support Our Mission
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your support directly impacts women, vulnerable children, and families across Sironko–Bulambuli.
            </p>

            <button
              onClick={() => handleLinkClick('get-involved')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support Our Work</span>
            </button>

            <div className="pt-2">
              <button
                onClick={() => handleLinkClick('admin-login')}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 py-1"
              >
                <Lock className="w-3 h-3 text-blue-400" />
                <span>Authorized Admin Portal Login</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">Buhugu Living Hope Ministries</strong>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Location: Sironko–Bulambuli, Uganda</span>
            <span>•</span>
            <button
              onClick={() => handleLinkClick('contact')}
              className="hover:text-white underline"
            >
              Contact Team
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
