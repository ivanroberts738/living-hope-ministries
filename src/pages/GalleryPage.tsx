import React, { useEffect, useState } from 'react';
import { GalleryPhoto } from '../types';
import { fetchGallery } from '../lib/api';
import { LightboxModal } from '../components/LightboxModal';
import { Image as ImageIcon, Filter, Layers, Maximize2 } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery()
      .then((data) => setPhotos(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(photos.map((p) => p.category)))];

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const lightboxImages = filteredPhotos.map((p) => ({
    url: p.imageUrl,
    caption: `${p.title} (${p.category}) - ${p.caption || ''}`
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          Photographic Record
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Field Activity Photo Gallery
        </h1>
        <p className="text-slate-600 text-base">
          Visual documentation of our daily outreach, women vocational training workshops, child education support, and clean water projects in Sironko–Bulambuli, Uganda.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Photographs' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-sm">Loading photo gallery...</p>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-xl font-bold text-slate-800 font-serif">No gallery photographs found</h3>
          <p className="text-slate-500 text-sm">
            Check back soon or select a different category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-60 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-2xs hover:shadow-lg transition-all duration-300"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Badge */}
              <div className="absolute top-2 left-2 bg-blue-700/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                {photo.category}
              </div>

              {/* Expand Icon */}
              <div className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white p-1.5 rounded-full backdrop-blur-xs transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Caption overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                <h3 className="font-bold text-sm font-serif truncate">{photo.title}</h3>
                {photo.caption && (
                  <p className="text-[11px] text-slate-300 line-clamp-1">{photo.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) => (prev === null || prev === 0 ? lightboxImages.length - 1 : prev - 1))
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev === null || prev === lightboxImages.length - 1 ? 0 : prev + 1))
          }
        />
      )}
    </div>
  );
};
