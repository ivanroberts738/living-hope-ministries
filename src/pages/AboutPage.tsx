// src/pages/AboutPage.tsx
import { 
  Heart, 
  Target, 
  Eye, 
  Shield, 
  Users, 
  Globe,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Award,
  BookOpen,
  HandHeart,
  Building2,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import OfficialLogo from '../components/OfficialLogo';

const AboutPage = () => {
  const handleNavigate = (page: string) => {
    // @ts-ignore - activeTab is set in App.tsx
    window.setActiveTab && window.setActiveTab(page);
  };

  const coreValues = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We respond with love and empathy to the needs of vulnerable children and communities.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and accountability in all our work.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of collective action and community partnership.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We create lasting change through sustainable development and empowerment.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest quality in education, health, and empowerment services.'
    },
    {
      icon: HandHeart,
      title: 'Empowerment',
      description: 'We enable individuals and communities to build better futures for themselves.'
    }
  ];

  const teamMembers = [
    {
      name: 'Pastor John Wamala',
      role: 'Founder & Executive Director',
      bio: 'A dedicated community leader with over 15 years of experience in humanitarian work and community development in Eastern Uganda.'
    },
    {
      name: 'Sarah Namusoke',
      role: 'Programs Coordinator',
      bio: 'Passionate about education and child welfare, Sarah oversees all program implementation and community outreach initiatives.'
    },
    {
      name: 'Dr. James Opio',
      role: 'Health Services Director',
      bio: 'A medical doctor with extensive experience in community health, leading our health services and medical outreach programs.'
    },
    {
      name: 'Grace Akello',
      role: 'Women\'s Empowerment Officer',
      bio: 'Advocate for women\'s rights and economic empowerment, leading our socio-economic initiatives for women and girls.'
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
              <OfficialLogo className="w-24 h-24" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Living Hope Ministries
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              Transforming lives in Sironko, Uganda through education, health, and community empowerment
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Who We Are
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <span className="font-semibold text-blue-900">Living Hope Ministries</span> is a non-profit organization 
                based in <span className="font-semibold">Sironko, Uganda</span>. We are dedicated to improving 
                the lives of vulnerable children—both girls and boys—and orphans, as well as women in marginalized communities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our work is driven by the belief that every child deserves access to quality education, 
                healthcare, and the opportunity to build a brighter future. We work alongside communities 
                to provide the support, resources, and education needed to create lasting change.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="text-blue-900 font-semibold">📍 Sironko, Uganda</span>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="text-blue-900 font-semibold">📞 0701829730</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-blue-900 mb-2">2015</div>
                <p className="text-gray-600 text-sm">Year of Foundation</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-blue-900 mb-2">500+</div>
                <p className="text-gray-600 text-sm">Children Supported</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-blue-900 mb-2">12</div>
                <p className="text-gray-600 text-sm">Communities Reached</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-blue-900 mb-2">20+</div>
                <p className="text-gray-600 text-sm">Staff & Volunteers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide opportunity for quality education, health services, counseling, 
                and social economic empowerment with special emphasis on marginalized communities 
                to eliminate discrimination and create sustainable communities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A world where every child and woman in marginalized communities has access to 
                quality education, healthcare, and opportunities to thrive, creating sustainable 
                and empowered communities across Uganda and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE WORK */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why We Work
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              We are driven by a deep commitment to justice, equality, and the belief that 
              every person deserves dignity and opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compassion in Action</h3>
              <p className="text-gray-600 text-sm">
                We respond to the urgent needs of vulnerable children and women with love, 
                dignity, and practical support.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Education as Liberation</h3>
              <p className="text-gray-600 text-sm">
                We believe education is the key to breaking the cycle of poverty and 
                creating lasting change in communities.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Partnership</h3>
              <p className="text-gray-600 text-sm">
                We work with communities, not for them, empowering local leadership and 
                sustainable solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-16 md:py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-blue-200">
              These values guide everything we do at Living Hope Ministries.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                <p className="text-blue-200 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Believe
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
              <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Every Child Deserves a Future</h3>
                <p className="text-gray-600">
                  We believe that every child, regardless of their background, deserves access 
                  to quality education, healthcare, and the opportunity to thrive.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
              <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Education Transforms Communities</h3>
                <p className="text-gray-600">
                  We believe that education is the most powerful tool for breaking the cycle 
                  of poverty and building sustainable communities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
              <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Women Are Key to Development</h3>
                <p className="text-gray-600">
                  We believe that empowering women and girls is essential to creating 
                  lasting change and sustainable development in communities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
              <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Community-Led Solutions Work</h3>
                <p className="text-gray-600">
                  We believe that the most effective solutions come from within communities, 
                  and we work alongside local leaders to create lasting change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM / STAFF */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600">
              Meet the dedicated team behind Living Hope Ministries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="font-semibold text-gray-900 text-center">{member.name}</h3>
                <p className="text-sm text-blue-900 text-center mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD OF GOVERNORS - PLACEHOLDER */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Board of Governors
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 mb-8">
            Our Board of Governors provides strategic guidance and oversight to ensure 
            we fulfill our mission with integrity and effectiveness.
          </p>
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <p className="text-gray-500">
              Board member details coming soon. We are committed to transparent governance 
              and community accountability.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Your support helps us transform lives through education, health, and empowerment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => handleNavigate('get-involved')}
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get Involved
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => handleNavigate('contact')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all"
            >
              Contact Us
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span>📍 Sironko, Uganda</span>
            <span>📞 0701829730</span>
            <span>✉️ info@livinghopeministries.org</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
