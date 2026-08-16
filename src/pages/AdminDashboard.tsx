// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  Mail,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Search,
  Filter,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Award,
  Heart,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Stethoscope,
  HandHeart
} from 'lucide-react';
import {
  fetchProgrammes,
  fetchActivities,
  fetchGallery,
  fetchContactMessages,
  createProgramme,
  updateProgramme,
  deleteProgramme,
  createActivity,
  updateActivity,
  deleteActivity,
  deleteImage,
  deleteContactMessage,
  markContactMessageRead
} from '../lib/api';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onViewPublicActivity: (activity: any) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onViewPublicActivity
}) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [loading, setLoading] = useState(true);
  const [programmes, setProgrammes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Load all data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [progs, acts, galleryData, msgs] = await Promise.all([
        fetchProgrammes(),
        fetchActivities(),
        fetchGallery(),
        fetchContactMessages()
      ]);
      setProgrammes(progs);
      setActivities(acts);
      setGallery(galleryData);
      setMessages(msgs);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => ({
    totalProgrammes: programmes.length,
    totalActivities: activities.length,
    totalGallery: gallery.length,
    totalMessages: messages.length,
    unreadMessages: messages.filter(m => !m.read).length
  });

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      switch (type) {
        case 'programme':
          await deleteProgramme(id);
          setProgrammes(programmes.filter(p => p.id !== id));
          break;
        case 'activity':
          await deleteActivity(id);
          setActivities(activities.filter(a => a.id !== id));
          break;
        case 'gallery':
          await deleteImage(id);
          setGallery(gallery.filter(g => g.id !== id));
          break;
        case 'message':
          await deleteContactMessage(id);
          setMessages(messages.filter(m => m.id !== id));
          break;
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markContactMessageRead(id);
      setMessages(messages.map(m => 
        m.id === id ? { ...m, read: true } : m
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const stats = getStats();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'programmes', label: 'Programmes', icon: BookOpen },
    { id: 'activities', label: 'Activities', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'messages', label: 'Messages', icon: Mail },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Programmes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProgrammes}</p>
            </div>
            <BookOpen className="w-10 h-10 text-blue-900 opacity-50" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Activities</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-900 opacity-50" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Gallery Images</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalGallery}</p>
            </div>
            <ImageIcon className="w-10 h-10 text-blue-900 opacity-50" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
              {stats.unreadMessages > 0 && (
                <p className="text-xs text-red-500">{stats.unreadMessages} unread</p>
              )}
            </div>
            <Mail className="w-10 h-10 text-blue-900 opacity-50" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { setActiveSection('programmes'); setShowModal(true); }}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Programme
          </button>
          <button
            onClick={() => { setActiveSection('activities'); setShowModal(true); }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Activity
          </button>
          <button
            onClick={() => { setActiveSection('gallery'); setShowModal(true); }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Upload Image
          </button>
        </div>
      </div>

      {/* Recent Messages */}
      {messages.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{msg.name}</p>
                  <p className="text-sm text-gray-600">{msg.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!msg.read && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Unread</span>
                  )}
                  <button
                    onClick={() => setActiveSection('messages')}
                    className="text-sm text-blue-900 hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProgrammes = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Programmes</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ title: '', description: '', category: '', location: '', status: 'active' });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
        >
          <Plus className="w-4 h-4" /> Add Programme
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((prog) => (
                <tr key={prog.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{prog.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{prog.category}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      prog.status === 'active' ? 'bg-green-100 text-green-800' :
                      prog.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {prog.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(prog);
                          setFormData(prog);
                          setShowModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('programme', prog.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderActivities = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Activities</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ title: '', description: '', date: '', location: '', category: '', participants: 0 });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="w-4 h-4" /> Add Activity
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <tr key={act.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{act.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{act.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(act.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewPublicActivity(act)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingItem(act);
                          setFormData(act);
                          setShowModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('activity', act.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ title: '', description: '', category: '', imageFile: null });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-4 h-4" /> Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((img) => (
          <div key={img.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden group relative">
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 truncate">{img.title}</p>
              <p className="text-xs text-gray-500">{img.category}</p>
            </div>
            <button
              onClick={() => handleDelete('gallery', img.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Messages</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`bg-white rounded-xl border p-6 ${!msg.read ? 'border-blue-300 bg-blue-50/30' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                <p className="text-sm text-gray-600">{msg.email} • {msg.phone || 'No phone'}</p>
                <p className="text-sm font-medium text-gray-900 mt-2">{msg.subject}</p>
                <p className="text-gray-700 mt-2">{msg.message}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!msg.read && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-lg hover:bg-blue-200 transition"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete('message', msg.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
              <span>{new Date(msg.createdAt || msg.date).toLocaleString()}</span>
              {!msg.read && <span className="text-red-500">● Unread</span>}
              {msg.read && <span className="text-green-500">✓ Read</span>}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'programmes': return renderProgrammes();
      case 'activities': return renderActivities();
      case 'gallery': return renderGallery();
      case 'messages': return renderMessages();
      default: return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-blue-900" />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{adminUser.name} ({adminUser.role})</span>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-48 flex-shrink-0">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const count = item.id === 'messages' ? stats.unreadMessages : 0;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {count > 0 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingItem ? `Edit ${activeSection.slice(0, -1)}` : `Add New ${activeSection.slice(0, -1)}`}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  // Simplified - handle different content types
                  if (activeSection === 'programmes') {
                    if (editingItem) {
                      await updateProgramme(editingItem.id, formData);
                      setProgrammes(programmes.map(p => p.id === editingItem.id ? { ...p, ...formData } : p));
                    } else {
                      const newProg = await createProgramme(formData);
                      setProgrammes([...programmes, newProg]);
                    }
                  } else if (activeSection === 'activities') {
                    if (editingItem) {
                      await updateActivity(editingItem.id, formData);
                      setActivities(activities.map(a => a.id === editingItem.id ? { ...a, ...formData } : a));
                    } else {
                      const newAct = await createActivity(formData);
                      setActivities([...activities, newAct]);
                    }
                  }
                  setShowModal(false);
                  setEditingItem(null);
                } catch (error) {
                  console.error('Error saving:', error);
                }
              }}
              className="p-6 space-y-4"
            >
              {/* Simplified form - adapt based on section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {activeSection === 'activities' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {activeSection === 'programmes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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

export default AdminDashboard;
