import React, { useEffect, useState } from 'react';
import { Activity, AdminUser, GalleryPhoto, ImpactStats, Programme, WebsiteContent } from '../types';
import {
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  toggleActivityStatus,
  fetchGallery,
  addGalleryPhoto,
  deleteGalleryPhoto,
  fetchProgrammes,
  fetchStats,
  fetchWebsiteContent,
  updateWebsiteContent,
  uploadImageFile,
  updateProgramme,
  updateAdminCredentials,
  clearSampleActivities,
  fetchContactMessages,
  toggleMessageRead,
  deleteContactMessage
} from '../lib/api';
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  Image as ImageIcon,
  BookOpen,
  FileText,
  Database,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Users,
  Calendar,
  MapPin,
  Heart,
  ShieldCheck,
  Save,
  Key,
  UserCheck,
  RotateCcw,
  Inbox,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onViewPublicActivity?: (activity: Activity) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onViewPublicActivity
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'overview' | 'add-activity' | 'all-activities' | 'messages' | 'gallery' | 'programmes' | 'website-content' | 'admin-account' | 'supabase'
  >('overview');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [stats, setStats] = useState<ImpactStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [websiteContent, setWebsiteContent] = useState<Record<string, WebsiteContent>>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Admin Credentials Form State
  const [adminForm, setAdminForm] = useState({
    currentEmail: adminUser.email || 'admin1@buhugu.org',
    newEmail: adminUser.email || 'admin1@buhugu.org',
    newName: adminUser.name || 'Primary Administrator',
    newPassword: '',
    confirmPassword: ''
  });
  const [updatingAdmin, setUpdatingAdmin] = useState(false);

  // Activity Edit / Delete Modal State
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [clearSampleModal, setClearSampleModal] = useState(false);

  // Add Activity Form State (Phone Optimized)
  const [newActivity, setNewActivity] = useState({
    title: '',
    activityDate: new Date().toISOString().split('T')[0],
    location: 'Sironko–Bulambuli, Uganda',
    programmeId: '',
    programmeName: 'Women Empowerment',
    description: '',
    beneficiariesTotal: 0,
    womenReached: 0,
    childrenReached: 0,
    otherBeneficiaries: 0,
    outcomes: '',
    challenges: '',
    nextSteps: '',
    mainImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200',
    status: 'published' as 'published' | 'draft',
    images: [] as Array<{ imageUrl: string; caption?: string }>
  });

  const [uploadingMain, setUploadingMain] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filter for activities list
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilterCategory, setAdminFilterCategory] = useState('all');

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      const [st, acts, progs, gal, web, msgs] = await Promise.all([
        fetchStats(),
        fetchActivities({ isAdmin: true }),
        fetchProgrammes(),
        fetchGallery(),
        fetchWebsiteContent(),
        fetchContactMessages(adminUser.token).catch(() => [])
      ]);
      setStats(st);
      setActivities(acts);
      setProgrammes(progs);
      setGallery(gal);
      setWebsiteContent(web);
      setMessages(msgs || []);

      if (progs.length > 0 && !newActivity.programmeId) {
        setNewActivity((prev) => ({
          ...prev,
          programmeId: progs[0].id,
          programmeName: progs[0].name
        }));
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleMsgRead = async (id: string) => {
    try {
      await toggleMessageRead(id, adminUser.token);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
      );
    } catch (err) {
      showToast('error', 'Failed to update message status');
    }
  };

  const handleDeleteMsg = async (id: string) => {
    try {
      await deleteContactMessage(id, adminUser.token);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showToast('success', 'Message deleted');
    } catch (err) {
      showToast('error', 'Failed to delete message');
    }
  };

  function showToast(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }

  // Handle Main Image File Upload (Phone camera / gallery)
  const handleMainImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      showToast('error', 'Photograph file size exceeds 15MB. Please choose a compressed photo.');
      return;
    }

    setUploadingMain(true);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const base64 = evt.target?.result as string;
        const res = await uploadImageFile(base64);
        setNewActivity((prev) => ({ ...prev, mainImageUrl: res.url }));
        showToast('success', 'Photograph uploaded successfully!');
      } catch (err) {
        showToast('error', 'Failed to upload photograph');
      } finally {
        setUploadingMain(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Add Activity Submit
  const handleAddActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.title || !newActivity.description || !newActivity.activityDate) {
      showToast('error', 'Please fill in all required fields (Title, Date, Description)');
      return;
    }

    setSubmitting(true);
    try {
      const created = await createActivity(newActivity, adminUser.token);
      showToast('success', `Activity "${created.title}" published successfully!`);
      // Reset form
      setNewActivity({
        title: '',
        activityDate: new Date().toISOString().split('T')[0],
        location: 'Sironko–Bulambuli, Uganda',
        programmeId: programmes[0]?.id || '',
        programmeName: programmes[0]?.name || 'Women Empowerment',
        description: '',
        beneficiariesTotal: 0,
        womenReached: 0,
        childrenReached: 0,
        otherBeneficiaries: 0,
        outcomes: '',
        challenges: '',
        nextSteps: '',
        mainImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200',
        status: 'published',
        images: []
      });
      loadAllData();
      setActiveSubTab('all-activities');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to publish activity');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Status Toggle
  const handleToggleStatus = async (act: Activity) => {
    try {
      const nextStatus = act.status === 'published' ? 'draft' : 'published';
      await toggleActivityStatus(act.id, nextStatus, adminUser.token);
      showToast('success', `Activity set to ${nextStatus.toUpperCase()}`);
      loadAllData();
    } catch (err) {
      showToast('error', 'Failed to update status');
    }
  };

  // Handle Delete Activity
  const handleDeleteActivity = async (id: string) => {
    try {
      await deleteActivity(id, adminUser.token);
      showToast('success', 'Activity deleted permanently');
      setDeleteConfirmId(null);
      loadAllData();
    } catch (err) {
      showToast('error', 'Failed to delete activity');
    }
  };

  // Handle Admin Credentials Update
  const handleUpdateAdminAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminForm.newPassword && adminForm.newPassword !== adminForm.confirmPassword) {
      showToast('error', 'New passwords do not match. Please re-enter.');
      return;
    }
    setUpdatingAdmin(true);
    try {
      await updateAdminCredentials(
        {
          currentEmail: adminUser.email,
          newEmail: adminForm.newEmail,
          newName: adminForm.newName,
          newPassword: adminForm.newPassword || undefined
        },
        adminUser.token
      );
      showToast('success', 'Administrator credentials updated successfully!');
      setAdminForm((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update administrator details');
    } finally {
      setUpdatingAdmin(false);
    }
  };

  // Handle Clear Sample Activities
  const handleClearSample = async () => {
    try {
      await clearSampleActivities(adminUser.token);
      showToast('success', 'Sample activities removed successfully');
      setClearSampleModal(false);
      loadAllData();
    } catch (err) {
      showToast('error', 'Failed to clear sample activities');
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'add-activity', label: '+ Add New Activity', icon: PlusCircle },
    { id: 'all-activities', label: 'Manage Activities', icon: ListOrdered },
    { id: 'messages', label: `Direct Messages ${unreadCount > 0 ? `(${unreadCount})` : ''}`, icon: Inbox },
    { id: 'gallery', label: 'Gallery Manager', icon: ImageIcon },
    { id: 'programmes', label: 'Programmes Info', icon: BookOpen },
    { id: 'website-content', label: 'Website Content', icon: FileText },
    { id: 'admin-account', label: 'Admin Credentials', icon: Key },
    { id: 'supabase', label: 'Supabase DB Setup', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-xl border font-semibold text-sm flex items-center gap-2 animate-in slide-in-from-top duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
              : 'bg-red-900 text-red-100 border-red-700'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm font-serif">Buhugu Admin Dashboard</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-200"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ADMIN SIDEBAR */}
      <aside
        className={`w-full lg:w-64 bg-slate-900 text-slate-300 flex-col justify-between shrink-0 transition-all ${
          sidebarOpen ? 'flex' : 'hidden lg:flex'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Header info */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-white font-bold font-serif text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Buhugu Admin</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Sironko–Bulambuli, Uganda</p>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 inline-block mt-2 font-mono">
              User: {adminUser.email}
            </span>
          </div>

          {/* Nav buttons */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSubTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
                    activeSubTab === item.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-slate-800 space-y-3">
          <button
            onClick={onLogout}
            className="w-full bg-red-950/80 hover:bg-red-900 text-red-200 font-bold text-xs py-2.5 px-3 rounded-lg border border-red-800 flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-8">
        {/* SUB-TAB 1: OVERVIEW */}
        {activeSubTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <h1 className="text-2xl font-bold font-serif text-slate-900">
                  Administrator Control Centre
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Manage everyday field activities, beneficiaries, and photographs for Buhugu Living Hope Ministries.
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('add-activity')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 shrink-0 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Upload Daily Activity</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
                <span className="block text-3xl font-black font-serif text-blue-900">
                  {stats?.totalActivities || 0}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">Total Activities</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
                <span className="block text-3xl font-black font-serif text-emerald-600">
                  {stats?.activitiesThisMonth || 0}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">This Month</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
                <span className="block text-3xl font-black font-serif text-red-600">
                  {stats?.womenReached || 0}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">Women Reached</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
                <span className="block text-3xl font-black font-serif text-purple-600">
                  {stats?.totalBeneficiaries || 0}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">Total Reached</span>
              </div>
            </div>

            {/* Quick Action Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveSubTab('add-activity')}
                className="bg-blue-900 text-white p-6 rounded-2xl shadow-md cursor-pointer hover:bg-blue-950 transition-all space-y-3"
              >
                <PlusCircle className="w-8 h-8 text-yellow-300" />
                <h3 className="text-lg font-bold font-serif">Upload Field Activity</h3>
                <p className="text-xs text-blue-200">
                  Upload daily photographs, title, beneficiaries count, outcomes and challenges directly from your mobile phone.
                </p>
              </div>

              <div
                onClick={() => setActiveSubTab('all-activities')}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs cursor-pointer hover:shadow-md transition-all space-y-3"
              >
                <ListOrdered className="w-8 h-8 text-blue-700" />
                <h3 className="text-lg font-bold font-serif text-slate-900">Manage All Activities</h3>
                <p className="text-xs text-slate-600">
                  Publish, edit, unpublish, or delete uploaded field activity records.
                </p>
              </div>

              <div
                onClick={() => setActiveSubTab('gallery')}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs cursor-pointer hover:shadow-md transition-all space-y-3"
              >
                <ImageIcon className="w-8 h-8 text-red-600" />
                <h3 className="text-lg font-bold font-serif text-slate-900">Gallery & Photographs</h3>
                <p className="text-xs text-slate-600">
                  View and manage community photographs uploaded from Sironko–Bulambuli.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 2: ADD ACTIVITY (PHONE-OPTIMIZED) */}
        {activeSubTab === 'add-activity' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-6 h-6 text-red-600" />
                  <span>Add New Organisational Activity</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload everyday field activities and photographs from Sironko–Bulambuli.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddActivitySubmit} className="space-y-6">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Activity Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Women Tailoring & Micro-Finance Workshop"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Activity Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newActivity.activityDate}
                    onChange={(e) => setNewActivity({ ...newActivity, activityDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Programme / Category *
                  </label>
                  <select
                    value={newActivity.programmeId}
                    onChange={(e) => {
                      const prog = programmes.find((p) => p.id === e.target.value);
                      setNewActivity({
                        ...newActivity,
                        programmeId: e.target.value,
                        programmeName: prog?.name || 'Women Empowerment'
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    {programmes.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={newActivity.status}
                    onChange={(e: any) => setNewActivity({ ...newActivity, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="published">Published (Visible on Website)</option>
                    <option value="draft">Draft (Saved Privately)</option>
                  </select>
                </div>
              </div>

              {/* Main Image Upload Box */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                  Main Activity Photograph *
                </label>
                <p className="text-xs text-slate-500">
                  Select a photograph from your phone gallery or take a picture.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <label className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 shadow-xs transition-colors shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Choose Photo from Phone</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageFileChange}
                      className="hidden"
                    />
                  </label>

                  {uploadingMain && (
                    <span className="text-xs text-blue-600 font-medium animate-pulse">
                      Processing photograph upload...
                    </span>
                  )}
                </div>

                {newActivity.mainImageUrl && (
                  <div className="pt-2">
                    <img
                      src={newActivity.mainImageUrl}
                      alt="Selected preview"
                      className="h-32 object-cover rounded-lg border border-slate-300 shadow-xs"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Activity Overview / Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what took place, who was involved, and the purpose of the activity..."
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Beneficiary Counts */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Beneficiaries Reached Metrics</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Women Reached
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newActivity.womenReached}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          womenReached: parseInt(e.target.value) || 0
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Children Reached
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newActivity.childrenReached}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          childrenReached: parseInt(e.target.value) || 0
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Other Beneficiaries
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newActivity.otherBeneficiaries}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          otherBeneficiaries: parseInt(e.target.value) || 0
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-blue-900 mb-1">
                      Total Beneficiaries
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Auto / Manual"
                      value={
                        newActivity.beneficiariesTotal ||
                        newActivity.womenReached + newActivity.childrenReached + newActivity.otherBeneficiaries
                      }
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          beneficiariesTotal: parseInt(e.target.value) || 0
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-blue-900"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Impact Detail Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Outcomes Achieved (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Results or outputs..."
                    value={newActivity.outcomes}
                    onChange={(e) => setNewActivity({ ...newActivity, outcomes: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Challenges (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Field challenges..."
                    value={newActivity.challenges}
                    onChange={(e) => setNewActivity({ ...newActivity, challenges: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Next Steps (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Future outlook..."
                    value={newActivity.nextSteps}
                    onChange={(e) => setNewActivity({ ...newActivity, nextSteps: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3.5 px-8 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Publish Field Activity</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SUB-TAB 3: MANAGE ALL ACTIVITIES */}
        {activeSubTab === 'all-activities' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  Manage All Field Activities
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Search, publish, edit, or delete activities ({activities.length} total).
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {activities.some((a) => a.id.startsWith('act-sample-') || a.id.startsWith('act-10') || (a as any).isSample) && (
                  <button
                    onClick={() => setClearSampleModal(true)}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
                    <span>Clear Sample Activities</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveSubTab('add-activity')}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  + Add Activity
                </button>
              </div>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search title, village..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <select
                value={adminFilterCategory}
                onChange={(e) => setAdminFilterCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
              >
                <option value="all">All Programmes</option>
                {programmes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Activities Table/List */}
            <div className="space-y-3">
              {activities
                .filter((a) => {
                  const matchesS =
                    !adminSearch ||
                    a.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
                    a.location.toLowerCase().includes(adminSearch.toLowerCase());
                  const matchesC =
                    adminFilterCategory === 'all' || a.programmeId === adminFilterCategory;
                  return matchesS && matchesC;
                })
                .map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={act.mainImageUrl}
                        alt={act.title}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                              act.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {act.status}
                          </span>
                          <span className="text-xs font-bold text-blue-900">{act.programmeName}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm font-serif">{act.title}</h3>
                        <p className="text-xs text-slate-500">
                          📍 {act.location} • 📅 {act.activityDate} • 👥 {act.beneficiariesTotal} Reached
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => handleToggleStatus(act)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                          act.status === 'published'
                            ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        {act.status === 'published' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{act.status === 'published' ? 'Unpublish' : 'Publish'}</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(act.id)}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                        title="Delete Activity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 4: GALLERY MANAGEMENT */}
        {activeSubTab === 'gallery' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Gallery & Photo Management
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map((photo) => (
                <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-40">
                  <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-xs">
                    <span className="font-bold">{photo.title}</span>
                    <button
                      onClick={async () => {
                        await deleteGalleryPhoto(photo.id, adminUser.token);
                        showToast('success', 'Photo removed');
                        loadAllData();
                      }}
                      className="bg-red-600 text-white font-bold p-1 rounded text-[10px] self-end"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 4: DIRECT MESSAGES INBOX */}
        {activeSubTab === 'messages' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Inbox className="w-6 h-6 text-blue-700" />
                  <h2 className="text-2xl font-bold font-serif text-slate-900">
                    Direct Contact Messages Inbox
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Inquiries, message submissions, and partner requests sent to <code className="font-bold text-slate-800">hopeministriesbuhuguliving@gmail.com</code> via the website contact form.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-blue-50 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold border border-blue-200">
                <Mail className="w-4 h-4 text-blue-700" />
                <span>Total Received: {messages.length} ({unreadCount} Unread)</span>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-10 text-center space-y-3">
                <Inbox className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold font-serif text-slate-800">
                  No Direct Messages Received Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  When visitors submit inquiries through the contact page, their messages will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`rounded-2xl border p-5 transition-all space-y-3 ${
                      msg.read
                        ? 'bg-white border-slate-200 opacity-90'
                        : 'bg-blue-50/70 border-blue-300 shadow-xs ring-1 ring-blue-400/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-base font-bold text-slate-900 font-serif">
                            {msg.name}
                          </strong>
                          {!msg.read && (
                            <span className="bg-blue-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1">
                          {msg.email && (
                            <a
                              href={`mailto:${msg.email}`}
                              className="flex items-center gap-1 hover:text-blue-700 font-medium text-blue-800 underline"
                            >
                              <Mail className="w-3.5 h-3.5 text-blue-600" />
                              <span>{msg.email}</span>
                            </a>
                          )}
                          {msg.phone && (
                            <span className="flex items-center gap-1 text-slate-700 font-medium">
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              <span>{msg.phone}</span>
                            </span>
                          )}
                          <span className="text-slate-400">
                            Sent: {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleMsgRead(msg.id)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                            msg.read
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                              : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-700'
                          }`}
                        >
                          {msg.read ? 'Mark Unread' : 'Mark as Read'}
                        </button>
                        <button
                          onClick={() => handleDeleteMsg(msg.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 p-1.5 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Subject: {msg.subject}
                      </span>
                      <p className="text-slate-800 text-sm whitespace-pre-line leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 font-sans">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUB-TAB 5: WEBSITE CONTENT MANAGEMENT */}
        {activeSubTab === 'website-content' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Manage Website Information Text
            </h2>
            <p className="text-xs text-slate-500">
              Update editable mission, vision, contact details, and history for Buhugu Living Hope Ministries.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <strong className="text-sm font-bold text-slate-900 block font-serif">Quick Content Settings</strong>
              <p className="text-xs text-slate-600">
                Official wording for Sironko–Bulambuli, Uganda can be modified directly in the database or via the REST API endpoints.
              </p>
            </div>
          </div>
        )}

        {/* SUB-TAB 6: ADMIN CREDENTIALS & ACCOUNT SETTINGS */}
        {activeSubTab === 'admin-account' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Key className="w-6 h-6 text-red-600" />
              <div>
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  Administrator Credentials & Password
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your login email, administrator display name, and login password.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateAdminAccount} className="space-y-5 max-w-xl">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-1">
                <strong className="font-bold block flex items-center gap-1 text-amber-950">
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  Currently Logged In Administrator
                </strong>
                <p>Email: <code className="font-bold">{adminUser.email}</code></p>
                <p>Default Accounts Available: <code className="font-mono">admin1@buhugu.org</code> / <code className="font-mono">admin2@buhugu.org</code></p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Administrator Display Name
                </label>
                <input
                  type="text"
                  required
                  value={adminForm.newName}
                  onChange={(e) => setAdminForm({ ...adminForm, newName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Administrator Email Address
                </label>
                <input
                  type="email"
                  required
                  value={adminForm.newEmail}
                  onChange={(e) => setAdminForm({ ...adminForm, newEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-200">
                <h3 className="text-sm font-bold font-serif text-slate-900 mb-3">
                  Change Login Password
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      New Password (Leave blank to keep current)
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={adminForm.newPassword}
                      onChange={(e) => setAdminForm({ ...adminForm, newPassword: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter new password"
                      value={adminForm.confirmPassword}
                      onChange={(e) => setAdminForm({ ...adminForm, confirmPassword: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={updatingAdmin}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                {updatingAdmin ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Account & Password Changes</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* SUB-TAB 7: SUPABASE DATABASE SETUP GUIDE */}
        {activeSubTab === 'supabase' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Database className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Supabase Database Setup Instructions
              </h2>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              This application is configured with zero-config local persistence for immediate preview, and is 100% ready to connect to your Supabase PostgreSQL cloud database!
            </p>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono space-y-2 overflow-x-auto">
                <strong className="text-white block font-sans">1. Copy and execute this SQL in your Supabase SQL Editor:</strong>
                <pre className="text-[11px] text-slate-300">
{`CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  location TEXT NOT NULL DEFAULT 'Sironko–Bulambuli, Uganda',
  programme_id TEXT,
  programme_name TEXT,
  beneficiaries_total INTEGER DEFAULT 0,
  women_reached INTEGER DEFAULT 0,
  children_reached INTEGER DEFAULT 0,
  other_beneficiaries INTEGER DEFAULT 0,
  outcomes TEXT,
  challenges TEXT,
  next_steps TEXT,
  main_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
                </pre>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-1 text-blue-900">
                <strong className="font-bold block">2. Add environment variables in .env:</strong>
                <div><code>VITE_SUPABASE_URL=https://your-project.supabase.co</code></div>
                <div><code>VITE_SUPABASE_ANON_KEY=your-supabase-key</code></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 text-center border border-slate-200 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
            <h3 className="text-lg font-bold font-serif text-slate-900">
              Are you sure you want to delete this activity?
            </h3>
            <p className="text-xs text-slate-600">
              This action cannot be undone. The activity report and photos will be removed from the database.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleDeleteActivity(deleteConfirmId)}
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl"
              >
                Yes, Delete Permanently
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs py-2.5 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLEAR SAMPLE ACTIVITIES MODAL */}
      {clearSampleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 text-center border border-slate-200 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
            <h3 className="text-lg font-bold font-serif text-slate-900">
              Clear All Sample / Seed Activities?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will remove all pre-seeded example activities from the database, leaving only the real activities created by your team. This action cannot be undone.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleClearSample}
                className="w-1/2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
              >
                Yes, Clear Samples
              </button>
              <button
                onClick={() => setClearSampleModal(false)}
                className="w-1/2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
