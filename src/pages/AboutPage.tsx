import React, { useEffect, useState } from 'react';
import { fetchWebsiteContent } from '../lib/api';
import { OfficialLogo } from '../components/OfficialLogo';
import { ShieldCheck, Heart, Target, Eye, Compass, Users, MapPin, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    fetchWebsiteContent()
      .then((data) => {
        if (data && data.about) {
          setAboutData(data.about.content);
        }
      })
      .catch((err) => console.error('Failed loading about content:', err));
  }, []);

  const coreValues = [
    { title: 'Faith & Compassion', desc: 'Bringing compassionate, holistic hope to all human kind with unconditional care.' },
    { title: 'Integrity & Transparency', desc: 'Upholding strict financial and operational accountability to communities and partners.' },
    { title: 'Community Empowerment', desc: 'Fostering long-term self-reliance, practical skills, and dignity.' },
    { title: 'Inclusion & Equity', desc: 'Serving all vulnerable individuals across Sironko–Bulambuli regardless of background.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          About Our Organisation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Buhugu Living Hope Ministries
        </h1>
        <div className="inline-block bg-red-600 text-white font-serif italic text-sm font-bold px-4 py-1 rounded-md">
          "HOPE FOR ALL HUMAN KIND"
        </div>
        <p className="text-slate-600 text-base leading-relaxed">
          Operating in Sironko–Bulambuli, Uganda to empower women, protect children, and foster sustainable community development.
        </p>
      </div>

      {/* Main Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-2xl font-bold font-serif text-slate-900 border-l-4 border-blue-600 pl-3">
            Who We Are
          </h2>
          <p className="text-slate-700 text-base leading-relaxed">
            {aboutData?.whoWeAre ||
              'Buhugu Living Hope Ministries is a community-based non-governmental organisation operating in Sironko–Bulambuli, Eastern Uganda. We are dedicated to supporting and empowering women, children, and vulnerable communities through practical education, livelihood skills, health outreach, and sustainable development.'}
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Geographic Focus & Service Area</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our ongoing field activities cover rural villages, trading centers, and mountain foothill communities across Sironko and Bulambuli districts in Eastern Uganda.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center max-w-sm w-full space-y-4">
            <OfficialLogo variant="full" size={200} className="mx-auto" />
            <p className="text-xs text-slate-500 italic">
              Official emblem representing faith, open-book learning, and hope for all human kind.
            </p>
          </div>
        </div>
      </div>

      {/* MISSION AND VISION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-2xl p-8 shadow-md space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-800 flex items-center justify-center text-yellow-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">OUR MISSION</h2>
          </div>

          <p className="text-blue-100 text-base leading-relaxed pt-2">
            {aboutData?.mission ||
              '[Insert official mission statement - Working with communities to create hope, opportunity and a better future for women, children and vulnerable people in Sironko–Bulambuli and beyond.]'}
          </p>
          <span className="inline-block text-xs font-semibold text-blue-300 bg-blue-900/60 px-3 py-1 rounded border border-blue-700/60">
            Sironko–Bulambuli, Uganda
          </span>
        </div>

        {/* Vision Card */}
        <div className="bg-gradient-to-br from-red-700 to-red-900 text-white rounded-2xl p-8 shadow-md space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-800 flex items-center justify-center text-yellow-300">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">OUR VISION</h2>
          </div>

          <p className="text-red-100 text-base leading-relaxed pt-2">
            {aboutData?.vision ||
              '[Insert official vision statement - A resilient, empowered and dignified community where every woman, child and family thrives with hope, health and self-reliance.]'}
          </p>
          <span className="inline-block text-xs font-semibold text-red-200 bg-red-950/60 px-3 py-1 rounded border border-red-800/60">
            Hope for All Human Kind
          </span>
        </div>
      </div>

      {/* OUR STORY */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
        <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
          <Compass className="w-6 h-6 text-blue-700" />
          <span>Our Organisational Story</span>
        </h2>
        <p className="text-slate-700 text-base leading-relaxed">
          {aboutData?.ourStory ||
            '[Insert official organisation history here - Founded in Sironko–Bulambuli to address community challenges, poverty, child vulnerability, and economic hardship through grassroots partnership and holistic care.]'}
        </p>
      </section>

      {/* CORE VALUES */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Our Core Values
          </h2>
          <p className="text-slate-600 text-sm">
            Principles that guide every field decision, workshop, and community outreach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-slate-900 font-serif text-lg">{val.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARGET COMMUNITIES & APPROACH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-700" />
            <span>Target Communities</span>
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            {aboutData?.targetCommunities ||
              'Women, orphaned and vulnerable children, low-income farming households, widows, and elderly residents across Sironko and Bulambuli districts in Eastern Uganda.'}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600" />
            <span>Our Grassroots Approach</span>
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            {aboutData?.ourApproach ||
              'We work directly at the grass-roots level, consulting community leaders and families to design practical interventions that foster long-term self-sufficiency rather than temporary dependency.'}
          </p>
        </div>
      </div>
    </div>
  );
};
