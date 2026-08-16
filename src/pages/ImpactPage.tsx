import React, { useEffect, useState } from 'react';
import { ImpactStats } from '../types';
import { fetchStats } from '../lib/api';
import { Users, Heart, BookOpen, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, MapPin } from 'lucide-react';

interface ImpactPageProps {
  setActiveTab: (tab: string) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ setActiveTab }) => {
  const [stats, setStats] = useState<ImpactStats>({
    totalActivities: 0,
    womenReached: 0,
    childrenReached: 0,
    communitiesReached: 8,
    totalPhotos: 0,
    totalBeneficiaries: 0
  });

  useEffect(() => {
    fetchStats().then((data) => setStats(data)).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          Accountability & Results
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Our Organisational Impact
        </h1>
        <p className="text-slate-600 text-base">
          Tracking direct community reach, beneficiary counts, and real outcome metrics across Sironko–Bulambuli, Uganda.
        </p>
      </div>

      {/* Main Metrics Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 text-center">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <span className="block text-4xl font-black font-serif text-slate-900">
            {stats.womenReached}+
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Women Reached
          </span>
          <p className="text-xs text-slate-600">Tailoring skills, VSLA group savings, dignity kits</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 text-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="block text-4xl font-black font-serif text-slate-900">
            {stats.childrenReached}+
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Children Reached
          </span>
          <p className="text-xs text-slate-600">Scholastic kits, textbooks, protection & care</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
            <TrendingUp className="w-6 h-6" />
          </div>
          <span className="block text-4xl font-black font-serif text-slate-900">
            {stats.totalActivities}+
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Activities Conducted
          </span>
          <p className="text-xs text-slate-600">Field workshops & outreach initiatives</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 text-center">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <span className="block text-4xl font-black font-serif text-slate-900">
            {stats.totalBeneficiaries}+
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Beneficiaries
          </span>
          <p className="text-xs text-slate-600">Directly impacted family & community members</p>
        </div>
      </div>

      {/* Sustainable Outcomes Section */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-2xl font-bold font-serif text-white">
            Key Sustainable Outcomes in Sironko–Bulambuli
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2">
            <h3 className="font-bold text-yellow-300 font-serif">Economic Self-Reliance</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Women completing tailoring and vocational training start home micro-businesses, raising household income to meet basic family needs.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2">
            <h3 className="font-bold text-emerald-300 font-serif">Improved Primary Education</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Supplying exercise books and study materials keeps vulnerable primary school pupils enrolled and focused during school terms.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2">
            <h3 className="font-bold text-sky-300 font-serif">Community Health & Clean Water</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Rehabilitating rural water springs and hosting free health checkups reduces waterborne illnesses and supports elderly residents.
            </p>
          </div>
        </div>
      </div>

      {/* Transparency Commitment */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 text-center max-w-3xl mx-auto">
        <ShieldCheck className="w-10 h-10 text-blue-700 mx-auto" />
        <h2 className="text-xl font-bold font-serif text-slate-900">
          Our Commitment to Transparent Reporting
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Every activity published on this website is logged directly from the field by our two authorized team administrators, complete with beneficiary counts, photographs, outcomes, and challenges.
        </p>

        <button
          onClick={() => {
            setActiveTab('activities');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors"
        >
          View Field Activity Log
        </button>
      </div>
    </div>
  );
};
