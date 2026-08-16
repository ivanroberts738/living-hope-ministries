// src/pages/ActivitiesPage.tsx
import { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Camera,
  Plus,
  Edit,
  Trash2,
  ArrowRight,
  ChevronRight,
  Filter,
  Search,
  X,
  Clock,
  Heart,
  BookOpen,
  Stethoscope,
  MessageCircle,
  Briefcase,
  HandHeart,
  GraduationCap
} from 'lucide-react';
import OfficialLogo from '../components/OfficialLogo';
import { fetchActivities, createActivity, updateActivity, deleteActivity } from '../lib/api';

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  image?: string;
  category: string;
  participants?: number;
}

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    category: '',
    participants: 0
  });

  const categories = [
    { label: 'All', icon: Filter },
    { label: 'Education', icon: GraduationCap },
    { label: 'Health', icon: Stethoscope },
    { label: 'Counseling', icon: MessageCircle },
    { label: 'Empowerment', icon: Briefcase },
    { label: 'Community', icon: Users },
    { label: 'Outreach', icon: Heart },
    { label: 'Workshop', icon: HandHeart }
  ];

  const handleNavigate = (page: string) => {
    // @ts-ignore - activeTab is set in App.tsx
    window.setActiveTab && window.setActiveTab(page);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    filterActivities();
  }, [activities, selectedCategory, searchTerm]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await fetchActivities();
      setActivities(data);
      setFilteredActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterActivities = () => {
    let filtered = activities;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(activity => activity.category === selectedCategory);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(term) ||
        activity.description.toLowerCase().includes(term) ||
        activity.location?.toLowerCase().includes(term)
      );
    }
    
    setFilteredActivities(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingActivity) {
        await updateActivity(editingActivity.id, formData);
      } else {
        await createActivity(formData);
      }
      setShowModal(false);
      setEditingActivity(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        image: '',
        category: '',
        participants: 0
      });
      await loadActivities();
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await deleteActivity(id);
        await loadActivities();
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description,
      date: activity.date,
      location: activity.location || '',
      image: activity.image || '',
      category: activity.category,
      participants: activity.participants || 0
    });
    setShowModal(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Education': 'blue',
      'Health': 'green',
      'Counseling': 'purple',
      'Empowerment': 'orange',
      'Community': 'red',
      'Outreach': 'pink',
      'Workshop': 'teal'
    };
    return colors[category] || 'gray';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
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
              Our Activities
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              Engaging communities and transforming lives in Sironko, Uganda
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS & SEARCH */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.label}
                  onClick={() => setSelectedCategory(category.label)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition ${
                    selectedCategory === category.label
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              <button
                onClick={() => {
                  setEditingActivity(null);
                  setFormData({
                    title: '',
                    description: '',
                    date: '',
                    location: '',
                    image: '',
                    category: '',
                    participants: 0
                  });
                  setShowModal(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Activity
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES GRID */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-50 rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No Activities Found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search or filters.' : 'Start by adding your first activity.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => {
                const color = getCategoryColor(activity.category);
                return (
                  <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden">
                    {activity.image ? (
                      <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className={`w-full h-48 bg-${color}-100 flex items-center justify-center`}>
                        <Camera className={`w-12 h-12 text-${color}-400`} />
                      </div>
                    )}
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${color}-100 text-${color}-800`}>
                            {activity.category}
                          </span>
                          {activity.participants && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Users className="w-3 h-3" />
                              {activity.participants}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleEdit(activity)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 transition rounded-lg hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(activity.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{activity.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{activity.description}</p>
                      
                      <div className="space-y-1.5 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(activity.date)}</span>
                        </div>
                        {activity.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {filteredActivities.length > 0 && (
            <div className="mt-8 text-center text-sm text-gray-500">
              Showing {filteredActivities.length} of {activities.length} activities
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Join Our Activities
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Be part of the change. Volunteer, participate, or support our activities.
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
            📞 Call us at 0701829730 to learn about upcoming activities
          </p>
        </div>
      </section>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingActivity ? 'Edit Activity' : 'Add New Activity'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Community Health Outreach"
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
                  {categories.filter(c => c.label !== 'All').map((cat) => (
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
                  placeholder="Describe the activity..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Participants
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of participants"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  {editingActivity ? 'Update Activity' : 'Create Activity'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingActivity(null);
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

export default ActivitiesPage;
