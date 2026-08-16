import React, { useEffect, useState } from 'react';
import { Activity, Programme } from '../types';
import { fetchActivities, fetchProgrammes } from '../lib/api';
import { ActivityCard } from '../components/ActivityCard';
import { Search, Filter, Calendar, RefreshCw, Layers } from 'lucide-react';

interface ActivitiesPageProps {
  onSelectActivity: (activity: Activity) => void;
  initialCategory?: string;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({
  onSelectActivity,
  initialCategory = 'all'
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgramme, setSelectedProgramme] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [displayCount, setDisplayCount] = useState(9);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [acts, progs] = await Promise.all([
        fetchActivities({ status: 'published' }),
        fetchProgrammes()
      ]);
      setActivities(acts);
      setProgrammes(progs);
    } catch (err) {
      console.error('Failed loading activities:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter & Sort Logic
  const filteredActivities = activities
    .filter((act) => {
      const matchesSearch =
        searchQuery === '' ||
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.programmeName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProg =
        selectedProgramme === 'all' ||
        act.programmeId === selectedProgramme ||
        act.programmeName.toLowerCase() === selectedProgramme.toLowerCase();

      return matchesSearch && matchesProg;
    })
    .sort((a, b) => {
      const dateA = new Date(a.activityDate).getTime();
      const dateB = new Date(b.activityDate).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const visibleActivities = filteredActivities.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          Field Log & Reports
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Organisational Activities
        </h1>
        <p className="text-slate-600 text-base">
          Browse daily field activities, community outreach reports, and beneficiary outcomes in Sironko–Bulambuli, Uganda.
        </p>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activities by title, keyword, or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
            />
          </div>

          {/* Programme Category Dropdown */}
          <div className="md:col-span-4 relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden appearance-none cursor-pointer"
            >
              <option value="all">All Programmes ({activities.length})</option>
              {programmes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div className="md:col-span-3 relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={sortOrder}
              onChange={(e: any) => setSortOrder(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden appearance-none cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <div>
            Showing <strong className="text-slate-900">{visibleActivities.length}</strong> of{' '}
            <strong className="text-slate-900">{filteredActivities.length}</strong> activities
          </div>

          {(searchQuery || selectedProgramme !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedProgramme('all');
              }}
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Activities Grid */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-sm">Loading field activities...</p>
        </div>
      ) : visibleActivities.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-xl font-bold text-slate-800 font-serif">No published activities match your search</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Try adjusting your search terms or filter selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedProgramme('all');
            }}
            className="bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleActivities.map((act) => (
              <ActivityCard
                key={act.id}
                activity={act}
                onSelect={onSelectActivity}
              />
            ))}
          </div>

          {/* Load More Pagination Button */}
          {displayCount < filteredActivities.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setDisplayCount((prev) => prev + 6)}
                className="bg-slate-900 hover:bg-slate-950 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-md transition-colors"
              >
                Load More Activities ({filteredActivities.length - displayCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
