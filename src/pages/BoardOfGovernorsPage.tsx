// src/pages/BoardOfGovernorsPage.tsx
import { useState } from 'react';
import {
  Users,
  Crown,
  Briefcase,
  Heart,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Target,
  Eye,
  BookOpen,
  GraduationCap,
  Building2,
  Globe
} from 'lucide-react';
import OfficialLogo from '../components/OfficialLogo';

interface Governor {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  image?: string;
  expertise: string[];
  committee: string;
  email?: string;
  phone?: string;
  termStart: string;
  termEnd: string;
}

const BoardOfGovernorsPage = () => {
  const [selectedGovernor, setSelectedGovernor] = useState<Governor | null>(null);
  const [activeCommittee, setActiveCommittee] = useState<string>('All');

  const handleNavigate = (page: string) => {
    // @ts-ignore - activeTab is set in App.tsx
    window.setActiveTab && window.setActiveTab(page);
  };

  const governors: Governor[] = [
    {
      id: '1',
      name: 'Archbishop Samuel Nsubuga',
      role: 'Chairperson',
      title: 'Archbishop Emeritus, Church of Uganda',
      bio: 'A distinguished spiritual leader and community advocate with over 40 years of service in Uganda. Archbishop Nsubuga brings extensive experience in governance, community development, and interfaith dialogue to the Board.',
      expertise: ['Governance', 'Community Leadership', 'Spiritual Guidance', 'Peacebuilding'],
      committee: 'Executive Committee',
      email: 's.nsubuga@livinghopeministries.org',
      termStart: '2021',
      termEnd: '2026'
    },
    {
      id: '2',
      name: 'Dr. Margaret Asiimwe',
      role: 'Vice Chairperson',
      title: 'Medical Doctor & Public Health Specialist',
      bio: 'A dedicated medical professional with expertise in public health, maternal health, and community healthcare systems. Dr. Asiimwe has worked extensively in rural Uganda to improve healthcare access and outcomes.',
      expertise: ['Public Health', 'Medical Services', 'Community Health', 'Policy Development'],
      committee: 'Health & Programs Committee',
      email: 'm.asiimwe@livinghopeministries.org',
      termStart: '2021',
      termEnd: '2026'
    },
    {
      id: '3',
      name: 'Mr. Peter Kaggwa',
      role: 'Secretary',
      title: 'Legal Practitioner & Corporate Governance Expert',
      bio: 'An experienced lawyer and corporate governance specialist who provides legal guidance and strategic counsel to the Board and organization.',
      expertise: ['Legal Services', 'Corporate Governance', 'Compliance', 'Risk Management'],
      committee: 'Legal & Governance Committee',
      email: 'p.kaggwa@livinghopeministries.org',
      phone: '0701829730',
      termStart: '2022',
      termEnd: '2027'
    },
    {
      id: '4',
      name: 'Mrs. Jane Nalwoga',
      role: 'Treasurer',
      title: 'Certified Accountant & Financial Consultant',
      bio: 'A highly accomplished accountant with extensive experience in financial management, auditing, and institutional oversight. Mrs. Nalwoga ensures financial accountability and sustainability for the organization.',
      expertise: ['Financial Management', 'Auditing', 'Budgeting', 'Institutional Oversight'],
      committee: 'Finance Committee',
      email: 'j.nalwoga@livinghopeministries.org',
      termStart: '2021',
      termEnd: '2026'
    },
    {
      id: '5',
      name: 'Ms. Ruth Achola',
      role: 'Member',
      title: 'Educationist & Child Rights Advocate',
      bio: 'A passionate educator and child rights advocate with over 20 years of experience in education policy, curriculum development, and child protection.',
      expertise: ['Education Policy', 'Child Rights', 'Curriculum Development', 'Teacher Training'],
      committee: 'Education Committee',
      email: 'r.achola@livinghopeministries.org',
      termStart: '2022',
      termEnd: '2027'
    },
    {
      id: '6',
      name: 'Mr. Francis Mwesigye',
      role: 'Member',
      title: 'Entrepreneur & Community Development Specialist',
      bio: 'A successful entrepreneur and community development specialist who brings business acumen and practical experience in economic empowerment programs.',
      expertise: ['Business Development', 'Entrepreneurship', 'Community Development', 'SME Support'],
      committee: 'Finance Committee',
      email: 'f.mwesigye@livinghopeministries.org',
      termStart: '2021',
      termEnd: '2026'
    },
    {
      id: '7',
      name: 'Dr. Stella Namugga',
      role: 'Member',
      title: 'Clinical Psychologist & Counselor Educator',
      bio: 'A renowned clinical psychologist who specializes in trauma-informed counseling, mental health support, and psychosocial interventions for vulnerable populations.',
      expertise: ['Clinical Psychology', 'Mental Health', 'Trauma Counseling', 'Psychosocial Support'],
      committee: 'Health & Programs Committee',
      email: 's.namugga@livinghopeministries.org',
      termStart: '2023',
      termEnd: '2028'
    },
    {
      id: '8',
      name: 'Pastor Joseph Wandera',
      role: 'Member',
      title: 'Community Pastor & Youth Development Advocate',
      bio: 'A dedicated community pastor and youth advocate who works with young people and vulnerable groups in the Sironko region, providing spiritual guidance and practical support.',
      expertise: ['Youth Development', 'Community Outreach', 'Spiritual Guidance', 'Mentoring'],
      committee: 'Executive Committee',
      email: 'j.wandera@livinghopeministries.org',
      termStart: '2022',
      termEnd: '2027'
    }
  ];

  const committees = [
    { label: 'All', icon: Users },
    { label: 'Executive Committee', icon: Crown },
    { label: 'Finance Committee', icon: Briefcase },
    { label: 'Health & Programs Committee', icon: Heart },
    { label: 'Legal & Governance Committee', icon: Shield },
    { label: 'Education Committee', icon: BookOpen }
  ];

  const filteredGovernors = activeCommittee === 'All'
    ? governors
    : governors.filter(g => g.committee === activeCommittee);

  const renderExpertise = (expertise: string[]) => {
    return expertise.map((item, index) => (
      <span key={index} className="inline-block text-xs bg-blue-50 text-blue-900 px-2 py-1 rounded-full mr-1 mb-1">
        {item}
      </span>
    ));
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
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <OfficialLogo className="w-20 h-20 md:w-24 md:h-24" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Board of Governors
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              Providing strategic leadership and governance for Living Hope Ministries, Sironko, Uganda
            </p>
          </div>
        </div>
      </section>

      {/* BOARD OVERVIEW */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Board of Governors
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mb-6"></div>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Board of Governors provides strategic guidance, governance oversight, 
                and policy direction for Living Hope Ministries. Comprised of distinguished 
                leaders from various fields, the Board ensures that the organization 
                fulfills its mission with integrity and effectiveness.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our Board members bring diverse expertise in education, health, governance, 
                finance, law, community development, and spiritual leadership to guide 
                the organization's growth and impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-blue-900">{governors.length}</div>
                  <p className="text-sm text-gray-600">Board Members</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-blue-900">5</div>
                  <p className="text-sm text-gray-600">Committees</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-blue-900">6</div>
                  <p className="text-sm text-gray-600">Years Term</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900 text-white p-6 rounded-xl">
                <Shield className="w-8 h-8 text-yellow-400 mb-2" />
                <div className="font-bold text-lg">Governance</div>
                <p className="text-blue-200 text-sm">Strategic oversight</p>
              </div>
              <div className="bg-yellow-400 text-blue-900 p-6 rounded-xl">
                <Target className="w-8 h-8 text-blue-900 mb-2" />
                <div className="font-bold text-lg">Mission-Driven</div>
                <p className="text-blue-800 text-sm">Focused on impact</p>
              </div>
              <div className="bg-blue-100 text-blue-900 p-6 rounded-xl">
                <Eye className="w-8 h-8 text-blue-900 mb-2" />
                <div className="font-bold text-lg">Vision</div>
                <p className="text-blue-700 text-sm">Sustainable communities</p>
              </div>
              <div className="bg-green-100 text-green-900 p-6 rounded-xl">
                <Heart className="w-8 h-8 text-green-900 mb-2" />
                <div className="font-bold text-lg">Compassion</div>
                <p className="text-green-700 text-sm">Serving with love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITTEE FILTERS */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {committees.map((committee) => {
              const Icon = committee.icon;
              return (
                <button
                  key={committee.label}
                  onClick={() => setActiveCommittee(committee.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                    activeCommittee === committee.label
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {committee.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOARD MEMBERS GRID */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGovernors.map((governor) => (
              <div
                key={governor.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden cursor-pointer"
                onClick={() => setSelectedGovernor(selectedGovernor?.id === governor.id ? null : governor)}
              >
                <div className="p-6">
                  {/* Role Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        governor.role === 'Chairperson' ? 'bg-yellow-100 text-yellow-800' :
                        governor.role === 'Vice Chairperson' ? 'bg-blue-100 text-blue-800' :
                        governor.role === 'Secretary' ? 'bg-purple-100 text-purple-800' :
                        governor.role === 'Treasurer' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {governor.role}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {governor.termStart} - {governor.termEnd}
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-blue-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{governor.name}</h3>
                      <p className="text-sm text-gray-600">{governor.title}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                    {governor.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mb-3">
                    {renderExpertise(governor.expertise)}
                  </div>

                  {/* Committee */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-3">
                    <Users className="w-4 h-4" />
                    <span>{governor.committee}</span>
                  </div>

                  {/* Expanded Details */}
                  {selectedGovernor?.id === governor.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                      {governor.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${governor.email}`} className="text-blue-900 hover:underline">
                            {governor.email}
                          </a>
                        </div>
                      )}
                      {governor.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${governor.phone}`} className="text-blue-900 hover:underline">
                            {governor.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Term: {governor.termStart} - {governor.termEnd}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredGovernors.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No Board Members Found</h3>
              <p className="text-gray-500">Try selecting a different committee.</p>
            </div>
          )}
        </div>
      </section>

      {/* BOARD STRUCTURE */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Board Structure
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600">
              The Board of Governors operates through a well-structured committee system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition">
              <Crown className="w-10 h-10 text-blue-900 mb-3" />
              <h3 className="font-semibold text-gray-900 text-lg">Executive Committee</h3>
              <p className="text-gray-600 text-sm mt-2">
                Provides overall leadership and strategic direction for the organization.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Chairperson, Vice Chairperson, Secretary
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition">
              <Briefcase className="w-10 h-10 text-blue-900 mb-3" />
              <h3 className="font-semibold text-gray-900 text-lg">Finance Committee</h3>
              <p className="text-gray-600 text-sm mt-2">
                Oversees financial management, budgeting, and organizational sustainability.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Treasurer, Financial Experts
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition">
              <Heart className="w-10 h-10 text-blue-900 mb-3" />
              <h3 className="font-semibold text-gray-900 text-lg">Health & Programs Committee</h3>
              <p className="text-gray-600 text-sm mt-2">
                Guides program development and health services delivery.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Health Specialists, Program Experts
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition">
              <Shield className="w-10 h-10 text-blue-900 mb-3" />
              <h3 className="font-semibold text-gray-900 text-lg">Legal & Governance Committee</h3>
              <p className="text-gray-600 text-sm mt-2">
                Ensures legal compliance and good governance practices.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Legal Experts, Governance Specialists
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition">
              <BookOpen className="w-10 h-10 text-blue-900 mb-3" />
              <h3 className="font-semibold text-gray-900 text-lg">Education Committee</h3>
              <p className="text-gray-600 text-sm mt-2">
                Guides educational programs and child development initiatives.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Educationists, Child Rights Advocates
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition">
              <Globe className="w-10 h-10 text-blue-900 mb-3" />
              <h3 className="font-semibold text-gray-900 text-lg">Community Engagement Committee</h3>
              <p className="text-gray-600 text-sm mt-2">
                Builds partnerships and community relationships.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Community Leaders, Development Specialists
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Have Questions for the Board?
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Reach out to us for governance inquiries or partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => handleNavigate('contact')}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Contact the Board
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => handleNavigate('about')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-blue-900 font-semibold rounded-lg transition-all shadow-lg"
            >
              Learn More About Us
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <p className="mt-6 text-blue-800 text-sm">
            📞 Call us at 0701829730 for governance inquiries
          </p>
        </div>
      </section>
    </div>
  );
};

export default BoardOfGovernorsPage;
