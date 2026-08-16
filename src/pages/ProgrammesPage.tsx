import React, { useEffect, useState } from 'react';
import { Programme } from '../types';
import { fetchProgrammes } from '../lib/api';
import {
  HeartHandshake,
  Smile,
  BookOpen,
  Users,
  TrendingUp,
  Heart,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ProgrammesPageProps {
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const ProgrammesPage: React.FC<ProgrammesPageProps> = ({
  setActiveTab,
  setSelectedCategory
}) => {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgrammes()
      .then((data) => setProgrammes(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return HeartHandshake;
      case 'Smile':
        return Smile;
      case 'BookOpen':
        return BookOpen;
      case 'Users':
        return Users;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Heart;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          Our Pillar Initiatives
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Core Programmes & Focus Areas
        </h1>
        <p className="text-slate-600 text-base">
          Targeted interventions designed to empower women, nurture children, support schools, and strengthen communities in Sironko–Bulambuli, Uganda.
        </p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-sm mt-3">Loading organizational programmes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programmes.map((prog) => {
            const IconComp = getIcon(prog.iconName);
            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Banner Photo */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={prog.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200'}
                      alt={prog.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-white">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold font-serif text-white drop-shadow-xs">
                        {prog.name}
                      </h2>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Key Objectives & Scope
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {prog.objectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Sironko–Bulambuli, Uganda</span>
                  <button
                    onClick={() => {
                      setSelectedCategory(prog.id);
                      setActiveTab('activities');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Related Activities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
