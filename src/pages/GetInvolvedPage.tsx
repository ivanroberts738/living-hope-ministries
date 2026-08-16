import React, { useEffect, useState } from 'react';
import { fetchWebsiteContent } from '../lib/api';
import { Heart, Users, Handshake, Building2, Phone, Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface GetInvolvedPageProps {
  setActiveTab: (tab: string) => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({ setActiveTab }) => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetchWebsiteContent()
      .then((data) => {
        if (data && data.getInvolved) {
          setContent(data.getInvolved.content);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
          Partner & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Get Involved & Support Our Work
        </h1>
        <p className="text-slate-600 text-base">
          Join hands with Buhugu Living Hope Ministries to empower women, protect children, and transform communities in Sironko–Bulambuli, Uganda.
        </p>
      </div>

      {/* THREE PILLAR CARDS: Volunteer, Donate, Partner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 1. Volunteer */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Volunteer With Us</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {content?.volunteerInfo ||
                'We welcome passionate community volunteers, educators, healthcare professionals, and youth leaders to join our field activities in Sironko–Bulambuli.'}
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Field workshop facilitation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Primary school learning support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Community health screening camps</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors mt-4"
          >
            <span>Express Volunteer Interest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. Donate / Support Our Work */}
        <div className="bg-gradient-to-b from-red-600 to-red-700 text-white rounded-2xl p-6 space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-red-800 text-yellow-300 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 fill-yellow-300" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">Support Our Mission</h2>
            <p className="text-red-100 text-sm leading-relaxed">
              {content?.donationNotice ||
                'Your support enables us to provide tailoring equipment for women, exercise books for primary pupils, clean water springs, and medical care for vulnerable families.'}
            </p>
          </div>

          <div className="bg-red-900/60 border border-red-400/40 rounded-xl p-4 space-y-2 text-xs">
            <span className="font-bold text-yellow-300 uppercase tracking-widest block">
              Official Contact & Support Channels:
            </span>
            <p className="text-red-100 font-medium">
              Contact us directly to support our ongoing community projects in Sironko–Bulambuli.
            </p>
            <div className="pt-2 border-t border-red-500/50 space-y-1">
              <div>📞 <strong className="text-white">+256 772 000 000</strong></div>
              <div>✉️ <strong className="text-white">hopeministriesbuhuguliving@gmail.com</strong></div>
            </div>
          </div>
        </div>

        {/* 3. Partner With Us */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Partner With Us</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {content?.partnerInfo ||
                'We collaborate with national and international NGOs, churches, local government authorities, development agencies, and corporate sponsors to expand community impact.'}
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NGO & Charity Partnerships</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Churches & Faith-Based Alliances</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Corporate Social Responsibility (CSR)</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors mt-4"
          >
            <span>Partner Contact Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* OFFICIAL BANK & MOBILE MONEY PLACEHOLDERS */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-700" />
          <span>Official Support & Transfer Details</span>
        </h2>
        <p className="text-xs text-slate-600">
          For donors and development partners wishing to direct funding or supplies to Buhugu Living Hope Ministries in Sironko–Bulambuli, Uganda:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <strong className="text-sm font-bold text-blue-900 block font-serif">Bank Account Transfer Details</strong>
            <div><strong>Account Name:</strong> {content?.bankAccountName || 'BUHUGU LIVING HOPE MINISTRIES'}</div>
            <div><strong>Bank Name:</strong> {content?.bankName || 'Stanbic Bank Uganda / Centenary Bank Uganda'}</div>
            <div><strong>Account Number:</strong> {content?.accountNumber || '[Insert official bank account number]'}</div>
            <div><strong>Location:</strong> Sironko–Bulambuli Branch, Uganda</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <strong className="text-sm font-bold text-red-600 block font-serif">Mobile Money Support (Uganda)</strong>
            <div><strong>MTN Mobile Money:</strong> {content?.mobileMoneyMTN || '+256 772 000 000 (Registered Name: Buhugu Living Hope Ministries)'}</div>
            <div><strong>Airtel Money:</strong> {content?.mobileMoneyAirtel || '+256 700 000 000 (Registered Name: Buhugu Living Hope Ministries)'}</div>
            <div className="text-slate-500 italic pt-1">
              * Please notify our team via phone or WhatsApp after sending support so we can issue an official receipt.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
