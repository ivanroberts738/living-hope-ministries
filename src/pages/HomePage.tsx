// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import { 
  Heart, 
  GraduationCap, 
  Stethoscope, 
  MessageCircle, 
  Briefcase, 
  Users,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Home,
  Award,
  Sparkles
} from 'lucide-react';
import OfficialLogo from '../components/OfficialLogo';
import { fetchActivities, fetchStats } from '../lib/api';

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category: string;
}

interface Stats {
  childrenSupported: number;
  communitiesReached: number;
  schoolsBuilt: number;
  womenEmpowered: number;
}

const HomePage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [activitiesData, statsData] = await Promise.all([
          fetchActivities(),
          fetchStats()
        ]);
        setActivities(activitiesData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const areasOfWork = [
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Providing quality education opportunities for vulnerable children and orphans.'
    },
    {
      icon: Stethoscope,
      title: 'Health',
      description: 'Ensuring access to essential health services and medical care for communities.'
    },
    {
      icon: MessageCircle,
      title: 'Counseling',
      description: 'Offering professional counseling and psychosocial support to children and women.'
    },
    {
      icon: Briefcase,
      title: 'Socio-economic Empowerment',
      description: 'Creating sustainable livelihoods through skills training and economic opportunities.'
    },
    {
      icon: Users,
      title: 'Community Development',
      description: 'Building stronger, more resilient communities through collaborative initiatives.'
    },
    {
      icon: Heart,
      title: 'Support for Vulnerable Groups',
      description: 'Providing targeted support for orphans, marginalized children, and women.'
    }
  ];

  const educationBenefits = [
    {
      icon: Award,
      title: 'Better Opportunities',
      description: 'Education opens doors to brighter futures and meaningful careers.'
    },
    {
      icon: Home,
      title: 'Reduced Poverty',
      description: 'Breaking the cycle of poverty through knowledge and skills development.'
    },
    {
      icon: BookOpen,
      title: 'Improved Literacy',
      description: 'Building foundational skills that empower individuals and communities.'
    },
    {
      icon: Sparkles,
      title: 'Life Skills Development',
      description: 'Building confidence, critical thinking, and decision-making abilities.'
    }
  ];

  const handleNavigate = (page: string) => {
    // @ts-ignore - activeTab is set in App.tsx
    window.setActiveTab && window.setActiveTab(page);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <OfficialLogo className="w-16 h-16 md:w-20 md:h-20" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    LIVING HOPE
                    <span className="block text-yellow-400">MINISTRIES</span>
                  </h1>
                  <p className="text-blue-200 text-lg mt-1">Hope For All Mankind</p>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl font-light text-blue-100 max-w-xl">
                Transforming lives in <span className="text-yellow-300 font-medium">Sironko, Uganda</span> through education, health, and empowerment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleNavigate('get-involved')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Support Our Work
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleNavigate('about')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all"
                >
                  Learn More
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <GraduationCap className="w-10 h-10 text-yellow-400 mb-3" />
                  <p className="font-semibold">Education Support</p>
                  <p className="text-sm text-blue-200">Empowering children through quality education</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <Heart className="w-10 h-10 text-yellow-400 mb-3" />
                  <p className="font-semibold">Health Services</p>
                  <p className="text-sm text-blue-200">Essential healthcare for communities</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <Users className="w-10 h-10 text-yellow-400 mb-3" />
                  <p className="font-semibold">Community Development</p>
                  <p className="text-sm text-blue-200">Building sustainable communities together</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <Briefcase className="w-10 h-10 text-yellow-400 mb-3" />
                  <p className="font-semibold">Empowerment</p>
                  <p className="text-sm text-blue-200">Creating opportunities for lasting change</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are a non-profit organization based in Uganda, working together to improve 
              the lives of vulnerable children—both girls and boys—and orphans. 
              Our goal is to give children and women the support, resources, and education 
              they need to create a better future.
            </p>
          </div>

          {/* STATS */}
          {stats && !loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stats.childrenSupported}+</div>
                <p className="text-gray-600 mt-2">Children Supported</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stats.communitiesReached}+</div>
                <p className="text-gray-600 mt-2">Communities Reached</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stats.schoolsBuilt}+</div>
                <p className="text-gray-600 mt-2">Schools Supported</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stats.womenEmpowered}+</div>
                <p className="text-gray-600 mt-2">Women Empowered</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHY EDUCATION MATTERS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Supporting Education Matters
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Education is one of the most powerful drivers of social and economic development. 
              When children receive quality education, it helps:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold">01</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reduce poverty and inequality</h3>
                  <p className="text-gray-600">Breaking the cycle of poverty through knowledge and opportunity.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold">02</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Improve health and well-being</h3>
                  <p className="text-gray-600">Better health awareness and decision-making for entire communities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold">03</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Empower girls and women</h3>
                  <p className="text-gray-600">Creating equal opportunities and participation in society.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold">04</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Strengthen economies and communities</h3>
                  <p className="text-gray-600">Driving sustainable development and community resilience.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold">05</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Promote stability and peace</h3>
                  <p className="text-gray-600">Building peaceful, inclusive societies through education.</p>
                </div>
              </div>
            </div>
          </div>

          {/* BENEFITS CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationBenefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 md:py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <blockquote className="text-xl md:text-2xl font-light leading-relaxed">
            "To provide opportunity for quality education, health services, counseling, 
            and social economic empowerment with special emphasis on marginalized 
            communities to eliminate discrimination and create sustainable communities."
          </blockquote>
          <p className="mt-8 text-blue-200">
            — Living Hope Ministries, Sironko, Uganda
          </p>
        </div>
      </section>

      {/* AREAS OF WORK */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Areas of Work
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600">
              We focus on six key areas to create lasting impact in communities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areasOfWork.map((area, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <area.icon className="w-7 h-7 text-blue-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST ACTIVITIES */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Latest Activities
              </h2>
              <div className="w-24 h-1 bg-yellow-400"></div>
            </div>
            <button 
              onClick={() => handleNavigate('activities')}
              className="mt-4 sm:mt-0 text-blue-900 font-semibold hover:text-blue-700 flex items-center gap-2"
            >
              View All Activities
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {activity.image && (
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2 py-1 rounded">
                        {activity.category}
                      </span>
                      <span className="text-xs text-gray-500">{activity.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GET INVOLVED CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Make a Difference Today
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Join us in transforming lives through education, health, and empowerment.
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
            📞 Call us: 0701829730
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
