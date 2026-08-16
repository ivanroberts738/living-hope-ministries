// src/components/Footer.tsx
import React from 'react';
import { OfficialLogo } from './OfficialLogo'; // Named import
import { Heart, MapPin, Phone, Mail, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab?: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <OfficialLogo className="w-12 h-12" />
              <div>
                <h3 className="font-bold text-lg">LIVING HOPE</h3>
                <p className="text-yellow-400 text-sm">MINISTRIES</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Hope For All Mankind
            </p>
            <p className="text-blue-200 text-sm">
              Sironko, Uganda
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab?.('home')} className="text-blue-200 hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab?.('about')} className="text-blue-200 hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab?.('programmes')} className="text-blue-200 hover:text-white transition">
                  Programmes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab?.('get-involved')} className="text-blue-200 hover:text-white transition">
                  Get Involved
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-blue-200">
                <Phone className="w-4 h-4" />
                <span>0701829730</span>
              </li>
              <li className="flex items-center gap-2 text-blue-200">
                <Mail className="w-4 h-4" />
                <span>info@livinghopeministries.org</span>
              </li>
              <li className="flex items-center gap-2 text-blue-200">
                <MapPin className="w-4 h-4" />
                <span>Sironko, Uganda</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <p className="text-blue-200 text-sm mb-4">
              Join us in transforming lives.
            </p>
            <button
              onClick={() => setActiveTab?.('contact')}
              className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-sm text-blue-300">
          <p>© {currentYear} LIVING HOPE MINISTRIES. All rights reserved.</p>
          <p className="mt-1">Sironko, Uganda | Hope For All Mankind</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
