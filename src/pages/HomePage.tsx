import React, { useEffect, useState } from 'react';
import { Activity, ImpactStats } from '../types';
import { OfficialLogo } from '../components/OfficialLogo';
import { ActivityCard } from '../components/ActivityCard';
import { fetchActivities, fetchStats } from '../lib/api';
import {
  Heart,
  ArrowRight,
  MapPin,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Smile,
  HeartHandshake,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onSelectActivity: (activity: Activity) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onSelectActivity
}) => {
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<ImpactStats>({
    totalActivities: 0,
    womenReached: 0,
    childrenReached: 0,
    communitiesReached: 8,
    totalPhotos: 0,
    totalBeneficiaries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [acts, st] = await Promise.all([
          fetchActivities({ status: 'published' }),
          fetchStats()
        ]);
        setRecentActivities(acts.slice(0, 6));
        setStats(st);
      } catch (err) {
        console.error('Failed loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const focusAreas = [
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      icon: HeartHandshake,
      desc: 'Supporting women with opportunities, skills, vocational tailoring, and economic self-reliance initiatives that improve social and economic wellbeing in Sironko–Bulambuli.',
      color: 'bg-red-50 text-red-600 border-red-200'
    },
    {
      id: 'children-empowerment',
      title: 'Children Empowerment',
      icon: Smile,
      desc: "Supporting children's wellbeing, primary education protection, nutritional care, and holistic development across rural villages.",
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      id: 'education',
      title: 'Education Support',
      icon: BookOpen,
      desc: 'Supporting educational opportunities, scholastic supply distributions, and conducive learning environments for primary pupils.',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'community-development',
      title: 'Community Development',
      icon: Users,
      desc: 'Working directly with rural communities in Sironko–Bulambuli to identify challenges and develop practical, clean water and infrastructure solutions.',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      id: 'livelihood-empowerment',
      title: 'Livelihood Empowerment',
      icon: TrendingUp,
      desc: 'Supporting sustainable livelihood opportunities, high-yield vegetable seeds, climate farming, and economic self-sufficiency.',
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      id: 'community-outreach',
      title: 'Community Outreach',
      icon: Heart,
      desc: 'Reaching vulnerable individuals, elderly residents, and impoverished households through direct medical and humanitarian outreach.',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white pt-12 pb-20 overflow-hidden">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"
            alt="Community children in Uganda"
            className="w-full h-full object-cover opacity-25 filter blur-xs scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline & Intro */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-800/80 border border-blue-500/50 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-100 shadow-sm">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Sironko–Bulambuli, Uganda</span>
                <span className="text-blue-300">•</span>
                <span className="text-red-300 font-bold uppercase tracking-wider">NGO & Ministry</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif text-white leading-tight">
                BUHUGU LIVING HOPE MINISTRIES
              </h1>

              <div className="inline-block bg-red-600/90 text-white font-serif italic text-lg sm:text-xl font-bold px-4 py-1.5 rounded-lg border-l-4 border-yellow-400">
                "HOPE FOR ALL HUMAN KIND"
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Working directly with communities in Sironko–Bulambuli to create hope, opportunity, and a better future for women, children, and vulnerable people.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => {
                    setActiveTab('activities');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  <span>Our Activities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('get-involved');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support Our Work</span>
                </button>
              </div>
            </div>

            {/* Right Column: Emblem Logo Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/95 backdrop-blur-md text-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-blue-600/40 max-w-sm w-full text-center space-y-4">
                <OfficialLogo variant="full" size={240} className="mx-auto" />

                <div className="border-t border-slate-200 pt-3">
                  <span className="text-xs font-extrabold text-blue-900 uppercase tracking-widest block">
                    Community Empowerment
                  </span>
                  <p className="text-xs text-slate-500 italic mt-1">
                    Serving women, children, and families across Sironko–Bulambuli, Uganda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION SECTION: WHO WE ARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Who We Are</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Community-Driven Hope & Empowerment in Eastern Uganda
            </h2>

            <p className="text-slate-700 text-base leading-relaxed">
              Buhugu Living Hope Ministries operates in the Sironko–Bulambuli area of Uganda, focusing on community empowerment and improving the wellbeing of women, children, and vulnerable families. Through direct grassroots initiatives, we partner with community members to foster self-reliance, practical education, and sustainable livelihoods.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-900 group"
              >
                <span>Learn More About Our Story & Mission</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-md border-2 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Women empowerment in Sironko"
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 p-3 text-white text-xs text-center font-medium">
                Women vocational empowerment session in Buhugu
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR FOCUS AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full inline-block">
            Our Core Programmes
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-serif">
            Major Areas of Work
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Empowering communities through six core pillar programs tailored to the needs of Sironko–Bulambuli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id}
                className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${area.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-blue-700 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {area.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('programmes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-2 border-t border-slate-100"
                >
                  <span>Explore Programme Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* IMPACT STATISTICS SECTION */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/80">
              Community Impact
            </span>
            <h2 className="text-3xl font-bold font-serif text-white">
              Demonstrated Reach in Sironko–Bulambuli
            </h2>
            <p className="text-blue-200 text-sm max-w-xl mx-auto">
              Statistics powered by published organizational activity reports and field logs.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-yellow-400 font-serif">
                {stats.womenReached}+
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                Women Reached
              </span>
              <p className="text-[11px] text-slate-300">Empowered with skills & group savings</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-emerald-400 font-serif">
                {stats.childrenReached}+
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                Children Reached
              </span>
              <p className="text-[11px] text-slate-300">Supported with education & supplies</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-red-400 font-serif">
                {stats.totalActivities}+
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                Activities Conducted
              </span>
              <p className="text-[11px] text-slate-300">Published community initiatives</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-sky-400 font-serif">
                {stats.communitiesReached}+
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                Sub-counties Served
              </span>
              <p className="text-[11px] text-slate-300">Across Sironko–Bulambuli, Uganda</p>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT PUBLISHED ACTIVITIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              Field Activity Updates
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900 mt-2">
              Recent Organisational Activities
            </h2>
            <p className="text-slate-600 text-sm">
              Live everyday updates uploaded directly by authorised team administrators in the field.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('activities');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-2 self-start md:self-auto transition-colors"
          >
            <span>View All Activities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-sm">Loading recent published activities...</p>
          </div>
        ) : recentActivities.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center space-y-3">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">No activities published yet</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Authorized administrators can log into the dashboard to publish daily field activities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentActivities.map((act) => (
              <ActivityCard
                key={act.id}
                activity={act}
                onSelect={onSelectActivity}
              />
            ))}
          </div>
        )}
      </section>

      {/* CALL TO ACTION: GET INVOLVED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
          <Sparkles className="w-12 h-12 text-yellow-300 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif max-w-2xl mx-auto">
            Partner With Us to Bring Hope to Sironko–Bulambuli
          </h2>
          <p className="text-red-100 text-base max-w-2xl mx-auto">
            Whether as a volunteer, donor, partner organisation, church, or community supporter, your contribution directly empowers women, children, and families.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setActiveTab('get-involved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white text-red-700 hover:bg-slate-100 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Get Involved & Support
            </button>

            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-red-900/80 hover:bg-red-950 text-white font-bold px-8 py-3.5 rounded-xl border border-red-400/50 shadow-md transition-all"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
