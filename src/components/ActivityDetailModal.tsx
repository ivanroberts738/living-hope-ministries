import React, { useState } from 'react';
import { Activity } from '../types';
import { LightboxModal } from './LightboxModal';
import {
  X,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Image as ImageIcon,
  Heart,
  Share2
} from 'lucide-react';

interface ActivityDetailModalProps {
  activity: Activity | null;
  onClose: () => void;
  onSupportClick?: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  onClose,
  onSupportClick
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!activity) return null;

  const formattedDate = new Date(activity.activityDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const allImages = [
    { url: activity.mainImageUrl, caption: `${activity.title} - Main Photograph` },
    ...(activity.images || []).map((img) => ({
      url: img.imageUrl,
      caption: img.caption || activity.title
    }))
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200">
        {/* Modal Header Bar */}
        <div className="bg-blue-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-blue-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {activity.programmeName}
            </span>
            <span className="text-xs text-blue-200 hidden sm:inline">• Sironko–Bulambuli, Uganda</span>
          </div>

          <button
            onClick={onClose}
            className="bg-blue-800/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Main Hero Photograph */}
          <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 bg-slate-100 group shadow-md">
            <img
              src={activity.mainImageUrl}
              alt={activity.title}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
              onClick={() => setLightboxIndex(0)}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            <button
              onClick={() => setLightboxIndex(0)}
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-blue-700" />
              <span>Expand Photograph</span>
            </button>
          </div>

          {/* Title & Metadata */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight font-serif mb-3">
              {activity.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 border-y border-slate-100 py-3">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>{activity.location}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">
                <Users className="w-4 h-4 text-blue-700" />
                <span>Total Reached: {activity.beneficiariesTotal}</span>
              </div>
            </div>
          </div>

          {/* Beneficiary Detailed Breakdown Grid */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Beneficiary Impact Breakdown</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <span className="block text-2xl font-extrabold text-blue-900 font-serif">
                  {activity.beneficiariesTotal}
                </span>
                <span className="text-xs font-medium text-slate-600">Total Beneficiaries</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <span className="block text-2xl font-extrabold text-red-600 font-serif">
                  {activity.womenReached}
                </span>
                <span className="text-xs font-medium text-slate-600">Women Reached</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <span className="block text-2xl font-extrabold text-emerald-600 font-serif">
                  {activity.childrenReached}
                </span>
                <span className="text-xs font-medium text-slate-600">Children Reached</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <span className="block text-2xl font-extrabold text-purple-600 font-serif">
                  {activity.otherBeneficiaries}
                </span>
                <span className="text-xs font-medium text-slate-600">Community / Other</span>
              </div>
            </div>
          </div>

          {/* Full Activity Story / Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 font-serif">Activity Overview & Context</h3>
            <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">
              {activity.description}
            </p>
          </div>

          {/* Results & Outcomes */}
          {activity.outcomes && (
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base font-serif">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Results & Key Outcomes Achieved</span>
              </div>
              <p className="text-emerald-950 text-sm leading-relaxed">
                {activity.outcomes}
              </p>
            </div>
          )}

          {/* Challenges Encountered */}
          {activity.challenges && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-base font-serif">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Challenges Encountered</span>
              </div>
              <p className="text-amber-950 text-sm leading-relaxed">
                {activity.challenges}
              </p>
            </div>
          )}

          {/* Next Steps / Future Plans */}
          {activity.nextSteps && (
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-base font-serif">
                <Compass className="w-5 h-5 text-blue-600" />
                <span>Next Steps & Future Outlook</span>
              </div>
              <p className="text-blue-950 text-sm leading-relaxed">
                {activity.nextSteps}
              </p>
            </div>
          )}

          {/* Activity Photo Gallery */}
          {allImages.length > 1 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <span>Activity Photo Gallery ({allImages.length} Photographs)</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative h-28 sm:h-36 rounded-lg overflow-hidden bg-slate-100 cursor-pointer border border-slate-200 group"
                  >
                    <img
                      src={img.url}
                      alt={img.caption || `Photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                    {img.caption && (
                      <span className="absolute bottom-1 left-1 right-1 bg-slate-900/80 text-white text-[10px] p-1 rounded truncate">
                        {img.caption}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            <span>Uploaded by: </span>
            <strong className="text-slate-700">{activity.createdBy || 'Buhugu Living Hope Ministries'}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onSupportClick) onSupportClick();
                onClose();
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support Activities Like This</span>
            </button>
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Popup */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) => (prev === null || prev === 0 ? allImages.length - 1 : prev - 1))
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev === null || prev === allImages.length - 1 ? 0 : prev + 1))
          }
        />
      )}
    </div>
  );
};
