// src/pages/GetInvolvedPage.tsx
import { useState } from 'react';
import { 
  Heart, 
  GraduationCap, 
  HandHeart, 
  Users, 
  Building2,
  Globe,
  ArrowRight,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  Sparkles,
  BookOpen,
  UserPlus,
  Gift
} from 'lucide-react';
import OfficialLogo from '../components/OfficialLogo';

const GetInvolvedPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    // @ts-ignore - activeTab is set in App.tsx
    window.setActiveTab && window.setActiveTab(page);
  };

  const waysToHelp = [
    {
      icon: GraduationCap,
      title: 'Support Education',
      description: 'Help provide quality education for vulnerable children and orphans in Sironko, Uganda.',
      details: 'Your support can send a child to school, provide learning materials, and create opportunities for a better future.',
      action: 'Sponsor a Child',
      color: 'blue'
    },
    {
      icon: DollarSign,
      title: 'Donate',
      description: 'Make a financial contribution to support our programmes and operations.',
      details: 'Every donation, big or small, helps us reach more children, women, and communities in need.',
      action: 'Make a Donation',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Volunteer',
      description: 'Share your time, skills, and expertise to make a difference in our communities.',
      details: 'We welcome volunteers in education, health, counseling, administration, and community outreach.',
      action: 'Volunteer Now',
      color: 'purple'
    },
    {
      icon: Building2,
      title: 'Partner With Us',
      description: 'Join us as an organizational partner to create lasting impact together.',
      details: 'We collaborate with schools, health facilities, NGOs, government agencies, and community organizations.',
      action: 'Become a Partner',
      color: 'orange'
    },
    {
      icon: HandHeart,
      title: 'Sponsor a Child',
      description: 'Make a life-changing difference by sponsoring a child\'s education and wellbeing.',
      details: 'Your sponsorship provides education, meals, healthcare, and emotional support for a vulnerable child.',
      action: 'Sponsor Now',
      color: 'red'
    },
    {
      icon: Globe,
      title: 'Community Support',
      description: 'Support community development initiatives that create sustainable change.',
      details: 'Help us build schools, health centers, and community facilities that serve entire communities.',
      action: 'Support Community',
      color: 'teal'
    }
  ];

  const impactStats = [
    { number: '500+', label: 'Children Supported' },
    { number: '12', label: 'Communities Reached' },
    { number: '50+', label: 'Volunteers Engaged' },
    { number: '20+', label: 'Partner Organizations' }
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
              <OfficialLogo className="w-20 h-20 md:w-24 md:h-24" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Involved
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              Join us in transforming lives in Sironko, Uganda through education, health, and empowerment
            </p>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-900">{stat.number}</div>
                <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Make a Difference Today
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Living Hope Ministries, we believe that everyone has something to offer. 
            Whether you have time, skills, resources, or a willing heart, there are many 
            ways to make a difference in the lives of vulnerable children and communities 
            in Sironko, Uganda.
          </p>
        </div>
      </section>

      {/* WAYS TO HELP */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ways to Get Involved
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600">
              Choose how you want to make an impact. Every contribution matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waysToHelp.map((way, index) => {
              const Icon = way.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100',
                green: 'bg-green-50 text-green-900 border-green-200 hover:bg-green-100',
                purple: 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100',
                orange: 'bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100',
                red: 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100',
                teal: 'bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100'
              };
              const color = colorClasses[way.color as keyof typeof colorClasses] || colorClasses.blue;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition cursor-pointer ${color}`}
                  onClick={() => setSelectedOption(selectedOption === way.title ? null : way.title)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-6 h-6 text-blue-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{way.title}</h3>
                      <p className="text-gray-700 text-sm mt-1">{way.description}</p>
                    </div>
                  </div>
                  
                  {selectedOption === way.title && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-700 text-sm">{way.details}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate('contact');
                        }}
                        className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition"
                      >
                        {way.action}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPORT EDUCATION FOCUS */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-blue-900 font-semibold mb-2">
                <Heart className="w-5 h-5" />
                <span>FOCUS AREA</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Support Education for Vulnerable Children
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mb-6"></div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Education is the most powerful tool for breaking the cycle of poverty. 
                When you support education, you give a child the opportunity to build 
                a brighter future.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Send a child to school</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Provide learning materials and uniforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Support nutritious meals for students</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Help build and improve school facilities</span>
                </li>
              </ul>
              <button
                onClick={() => handleNavigate('contact')}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Sponsor a Child's Education
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900 text-white p-6 rounded-xl">
                <GraduationCap className="w-10 h-10 text-yellow-400 mb-3" />
                <div className="text-3xl font-bold">500+</div>
                <p className="text-blue-200 text-sm">Children Supported</p>
              </div>
              <div className="bg-yellow-400 text-blue-900 p-6 rounded-xl">
                <BookOpen className="w-10 h-10 text-blue-900 mb-3" />
                <div className="text-3xl font-bold">10+</div>
                <p className="text-blue-800 text-sm">Schools Supported</p>
              </div>
              <div className="bg-blue-100 text-blue-900 p-6 rounded-xl">
                <Users className="w-10 h-10 text-blue-900 mb-3" />
                <div className="text-3xl font-bold">50+</div>
                <p className="text-blue-700 text-sm">Teachers Supported</p>
              </div>
              <div className="bg-green-100 text-green-900 p-6 rounded-xl">
                <Sparkles className="w-10 h-10 text-green-900 mb-3" />
                <div className="text-3xl font-bold">90%</div>
                <p className="text-green-700 text-sm">School Completion Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW YOUR SUPPORT HELPS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Your Support Helps
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600">
              Every contribution creates a ripple effect of positive change.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Immediate Impact</h3>
              <p className="text-gray-600 text-sm">
                Your support provides immediate assistance to children and families in need.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Sustainable Change</h3>
              <p className="text-gray-600 text-sm">
                We work with communities to create lasting, sustainable transformation.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Community Empowerment</h3>
              <p className="text-gray-600 text-sm">
                We empower communities to take ownership of their own development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CONNECT SECTION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600">
                Contact us to learn more about how you can make a difference.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <Phone className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">0701829730</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <Mail className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">info@livinghopeministries.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <MapPin className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Sironko, Uganda</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleNavigate('contact')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleNavigate('about')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Learn More About Us
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Join the Movement
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Together, we can create a world where every child has hope, opportunity, and a brighter future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => handleNavigate('contact')}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => handleNavigate('activities')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-blue-900 font-semibold rounded-lg transition-all shadow-lg"
            >
              See Our Activities
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <p className="mt-6 text-blue-800 text-sm">
            📞 Call us at 0701829730 for more information
          </p>
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;
