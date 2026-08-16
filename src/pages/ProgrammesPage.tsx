// src/pages/ProgrammesPage.tsx
import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Stethoscope, 
  MessageCircle, 
  Briefcase, 
  Users, 
  Heart,
  BookOpen,
  HandHeart,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import OfficialLogo from '../components/OfficialLogo';
import { fetchProgrammes, createProgramme, updateProgramme, deleteProgramme } from '../lib/api';

interface Programme {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  status: 'active' | 'completed' | 'upcoming';
}

const ProgrammesPage = () => {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    startDate: '',
    endDate: '',
    status: 'active' as 'active' | 'completed' | 'upcoming'
  });

  const programmeCategories = [
    { icon: GraduationCap, label: 'Education Support', color: 'blue' },
    { icon: Stethoscope, label: 'Health Services', color: 'green' },
    { icon: MessageCircle, label: 'Counseling', color: 'purple' },
    { icon: Briefcase, label: 'Socio-economic Empowerment', color: 'orange' },
    { icon: Users, label: 'Community Development', color: 'red' },
    { icon: Heart, label: 'Support for Vulnerable Children', color: 'pink' },
    { icon: HandHeart, label: "Women's Empowerment", color: 'teal' }
  ];

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    upcoming: 'bg-blue-100 text-blue-800'
  };

  const handleNavigate = (page: string) => {
    // @ts-ignore - activeTab is set in App.tsx
    window.setActiveTab && window.setActiveTab(page);
  };

  useEffect(() => {
    loadProgrammes();
  }, []);

  const loadProgrammes = async () => {
    try {
      setLoading(true);
      const data = await fetchProgrammes();
      setProgrammes(data);
    } catch (error) {
      console.error('Error loading programmes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProgramme) {
        await updateProgramme(editingProgramme.id, formData);
      } else {
        await createProgramme(formData);
      }
      setShowModal(false);
      setEditingProgramme(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        startDate: '',
        endDate: '',
        status: 'active'
      });
      await loadProgrammes();
    } catch (error) {
      console.error('Error saving programme:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this programme?')) {
      try {
        await deleteProgramme(id);
        await loadProgrammes();
      } catch (error) {
        console.error('Error deleting programme:', error);
      }
    }
  };

  const handleEdit = (programme: Programme) => {
    setEditingProgramme(programme);
    setFormData({
      title: programme.title,
      description: programme.description,
      category: programme.category,
      location: programme.location || '',
      startDate: programme.startDate || '',
      endDate: programme.endDate || '',
      status: programme.status
    });
    setShowModal(true);
  };

  const getCategoryIcon = (category: string) => {
    const found = programmeCategories.find(c => c.label === category);
    return found ? found.icon : BookOpen;
  };

  const getCategoryColor = (category: string) => {
    const found = programmeCategories.find(c => c.label === category);
    return found ? found.color : 'gray';
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
              Our Programmes
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              Transforming lives through education, health, and empowerment in Sironko, Uganda
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMMES CATEGORIES */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {programmeCategories.map((category, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer"
              >
                <category.icon className={`w-4 h-4 text-${category.color}-600`} />
                <span className="text-sm font-medium text-gray-700">{category.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMES LIST */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                All Programmes
              </h2>
              <div className="w-24 h-1 bg-yellow-400"></div>
            </div>
            <button 
              onClick={() => {
                setEditingProgramme(null);
                setFormData({
                  title: '',
                  description: '',
                  category: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  status: 'active'
                });
                setShowModal(true);
              }}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
            >
              <Plus className="w-5 h-5" />
              Add Programme
            </button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : programmes.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No Programmes Yet</h3>
              <p className="text-gray-500">Start by adding your first programme.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programmes.map((programme) => {
                const Icon = getCategoryIcon(programme.category);
                const color = getCategoryColor(programme.category);
                return (
                  <div key={programme.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden">
                    {programme.image && (
                      <img 
                        src={programme.image} 
                        alt={programme.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${color}-600`} />
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[programme.status]}`}>
                            {programme.status.charAt(0).toUpperCase() + programme.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEdit(programme)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(programme.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{programme.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{programme.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-500">
                        {programme.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{programme.location}</span>
                          </div>
                        )}
                        {programme.startDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{programme.startDate} {programme.endDate && `- ${programme.endDate}`}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs font-medium text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                          {programme.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Support Our Programmes
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Your support helps us reach more children and communities through these programmes.
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
            📞 Call us at 0701829730 to learn more about our programmes
          </p>
        </div>
      </section>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingProgramme ? 'Edit Programme' : 'Add New Programme'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programme Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Education Support Programme"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {programmeCategories.map((cat) => (
                    <option key={cat.label} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the programme..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Sironko, Uganda"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  {editingProgramme ? 'Update Programme' : 'Create Programme'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProgramme(null);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgrammesPage;
