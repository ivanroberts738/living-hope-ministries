// src/pages/ImpactPage.tsx
import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Heart, 
  Users, 
  TrendingUp,
  Globe,
  BookOpen,
  Award,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Home,
  Briefcase,
  Stethoscope,
  MessageCircle,
  User,
  Shield,
  Target
} from 'lucide-react';
import OfficialLogo from '../components/OfficialLogo';
import { fetchStats } from '../lib/api';

interface Stats {
  childrenSupported: number;
  communitiesReached: number;
  schoolsBuilt: number;
  womenEmpowered: number;
}

const ImpactPage = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const statsData = await fetchStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleNavigate = (page: string) => {
    // @ts-ignore - activeTab is set in App.tsx
    window.setActiveTab && window.setActiveTab(page);
  };

  const impactAreas = [
    {
      icon: GraduationCap,
      title: 'Education Access',
      description: 'Providing quality education opportunities for vulnerable children and orphans who would otherwise be denied this basic right.',
      stat: '500+',
      statLabel: 'Children in School'
    },
    {
      icon: Heart,
      title: 'Health & Wellbeing',
      description: 'Ensuring access to essential health services, medical care, and health education for communities in need.',
      stat: '2000+',
      statLabel: 'Health Services Provided'
    },
    {
      icon: MessageCircle,
      title: 'Counseling Services',
      description: 'Offering professional counseling and psychosocial support to children, women, and families facing trauma and hardship.',
      stat: '800+',
      statLabel: 'Counseling Sessions'
    },
    {
      icon: Briefcase,
      title: 'Economic Empowerment',
      description: 'Creating sustainable livelihoods through skills training, vocational education, and economic opportunities.',
      stat: '300+',
      statLabel: 'Women Empowered'
    },
    {
      icon: Users,
      title: 'Community Development',
      description: 'Building stronger, more resilient communities through collaborative development initiatives and local leadership.',
      stat: '12',
      statLabel: 'Communities Reached'
    },
    {
      icon: Home,
      title: 'Vulnerable Children Support',
      description: 'Providing comprehensive support for orphans and vulnerable children, including education, nutrition, and care.',
      stat: '500+',
      statLabel: 'Children Supported'
    }
  ];

  const educationBenefits = [
    {
      title: 'Better Employment Opportunities',
      description: 'Education opens doors to meaningful careers and economic independence.',
      icon: TrendingUp
    },
    {
      title: 'Higher Lifetime Earnings',
      description: 'Quality education leads to increased earning potential and financial security.',
      icon: Award
    },
    {
      title: 'Improved Health & Life Expectancy',
      description: 'Education leads to better health awareness and longer, healthier lives.',
      icon: Stethoscope
    },
    {
      title: 'Stronger Civic Participation',
      description: 'Educated individuals participate more actively in community and democratic processes.',
      icon: Globe
    },
    {
      title: 'Greater Innovation & Growth',
      description: 'Education drives innovation, economic growth, and sustainable development.',
      icon: Sparkles
    },
    {
      title: 'Reduced Poverty & Inequality',
      description: 'Education is the most powerful tool for breaking the cycle of poverty.',
      icon: Shield
    }
  ];

  const impactStories = [
    {
      name: 'Sarah\'s Story',
      title: 'From Orphan to University Student',
      description: 'After losing both parents, Sarah was at risk of dropping out of school. With our support, she completed her education and is now pursuing a degree in Social Work.'
    },
    {
      name: 'Community Health Transformation',
      title: 'Health Outreach in Rural Communities',
      description: 'Through our health services program, over 2,000 community members have received essential medical care and health education in remote villages.'
    },
    {
      name: 'Women\'s Empowerment Group',
      title: 'Economic Independence for Women',
      description: 'Our women\'s empowerment program has trained 300+ women in vocational skills, helping them start small businesses and achieve economic independence.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <OfficialLogo className="w-20 h-20" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Impact
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              Transforming lives through education, health, and empowerment in Sironko, Uganda
            </p>
          </div>
        </div>
      </section>

      {/* IMPACT STATISTICS */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="h-12 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stats.childrenSupported}+</div>
                <p className="text-gray-600 text-sm md:text-base">Children Supported</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stats.communitiesReached}+</div>
                <p className="text-gray-600 text-sm md:text-base">Communities Reached</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stats.schoolsBuilt}+</div>
                <p className="text-gray-600 text-sm md:text-base">Schools Supported</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stats.womenEmpowered}+</div>
                <p className="text-gray-600 text-sm md:text-base">Women Empowered</p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* WHY EDUCATION MATTERS - MAIN SECTION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Education Matters
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Education is one of the most powerful drivers of social and economic development. 
              When children receive quality education, it transforms lives and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {educationBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold">Our Commitment</h3>
            </div>
            <p className="text-blue-200 text-lg">
              At Living Hope Ministries, we are committed to ensuring that every child, 
              especially the most vulnerable, has access to quality education. We believe 
              that education is not just about learning—it's about creating opportunities 
              for a better future.
            </p>
          </div>
        </div>
      </section>

      {/* IMPACT AREAS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact Areas
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600">
              We focus on key areas that create lasting change for vulnerable children, 
              women, and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactAreas.map((area, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-blue-900" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{area.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xl font-bold text-blue-900">{area.stat}</div>
                  <div className="text-sm text-gray-500">{area.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STORIES */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stories of Transformation
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600">
              Real stories of lives changed through education, health, and empowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {impactStories.map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-blue-900">{story.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{story.description}</p>
                <div className="mt-4 flex items-center gap-2 text-blue-900 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Transformation Story</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION SUPPORT FOCUS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Supporting Education for Vulnerable Children
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
              <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Breaking the Cycle of Poverty</h3>
                <p className="text-gray-600">
                  Education provides children with the tools they need to escape poverty 
                  and build better futures for themselves and their families.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
              <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Empowering Girls and Boys</h3>
                <p className="text-gray-600">
                  We ensure that both girls and boys have equal access to education, 
                  empowering them to participate meaningfully in society.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
              <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Building Sustainable Communities</h3>
                <p className="text-gray-600">
                  Educated children grow up to become community leaders, innovators, and 
                  change-makers who contribute to sustainable development.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
              <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Supporting Orphans and Vulnerable Children</h3>
                <p className="text-gray-600">
                  We provide comprehensive support to orphans and vulnerable children, 
                  ensuring they have access to education, nutrition, and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Help Us Create More Impact
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Your support can help us reach more children, more families, and more communities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => handleNavigate('get-involved')}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get Involved
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => handleNavigate('contact')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-blue-900 font-semibold rounded-lg transition-all shadow-lg"
            >
              Contact Us
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <p className="mt-6 text-blue-800 text-sm">
            📞 Call us at 0701829730 to learn more about our work
          </p>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage;
