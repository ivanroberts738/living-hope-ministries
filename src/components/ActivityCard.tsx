import React from 'react';
import { Activity } from '../types';
import { Calendar, MapPin, Users, ArrowRight, ShieldAlert } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
  isAdmin?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onSelect,
  isAdmin = false
}) => {
  const formattedDate = new Date(activity.activityDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image Banner */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
        <img
          src={activity.mainImageUrl}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Programme Category Badge */}
        <div className="absolute top-3 left-3 bg-blue-700/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {activity.programmeName}
        </div>

        {/* Draft/Status Badge for Admin */}
        {isAdmin && (
          <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border ${
            activity.status === 'published'
              ? 'bg-emerald-600 text-white border-emerald-400'
              : 'bg-amber-500 text-white border-amber-300'
          }`}>
            {activity.status.toUpperCase()}
          </div>
        )}

        {/* Location Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-medium text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate">{activity.location}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-300 font-medium">
            <Calendar className="w-3.5 h-3.5 text-blue-300 shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-700 transition-colors font-serif line-clamp-2">
            {activity.title}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
            {activity.description}
          </p>
        </div>

        {/* Beneficiaries Reached Metrics */}
        {(activity.beneficiariesTotal > 0 || activity.womenReached > 0 || activity.childrenReached > 0) && (
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-1.5 font-semibold text-blue-900">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{activity.beneficiariesTotal} Reached</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              {activity.womenReached > 0 && <span>👩 {activity.womenReached} Women</span>}
              {activity.childrenReached > 0 && <span>👧 {activity.childrenReached} Children</span>}
            </div>
          </div>
        )}

        {/* Card Footer Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onSelect(activity)}
            className="text-blue-700 hover:text-blue-900 font-bold text-sm flex items-center gap-1.5 group/btn transition-colors"
          >
            <span>View Full Activity Details</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
