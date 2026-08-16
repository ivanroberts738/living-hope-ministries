import React, { useState, useEffect } from 'react';
import { Activity, AdminUser } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ImpactPage } from './pages/ImpactPage';
import { GalleryPage } from './pages/GalleryPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ActivityDetailModal } from './components/ActivityDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('buhugu_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleAdminLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    try {
      localStorage.setItem('buhugu_admin_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save session to localStorage', e);
    }
    setActiveTab('admin');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem('buhugu_admin_user');
    } catch (e) {
      console.error('Failed to clear session', e);
    }
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        adminUser={adminUser}
        onLogout={handleAdminLogout}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectActivity={(act) => setSelectedActivity(act)}
          />
        )}

        {activeTab === 'about' && <AboutPage setActiveTab={setActiveTab} />}

        {activeTab === 'programmes' && (
          <ProgrammesPage
            setActiveTab={setActiveTab}
            setSelectedCategory={(cat) => setSelectedCategoryFilter(cat)}
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesPage
            onSelectActivity={(act) => setSelectedActivity(act)}
            initialCategory={selectedCategoryFilter}
          />
        )}

        {activeTab === 'impact' && <ImpactPage setActiveTab={setActiveTab} />}

        {activeTab === 'gallery' && <GalleryPage />}

        {activeTab === 'get-involved' && (
          <GetInvolvedPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'admin-login' && (
          <AdminLoginPage
            onLoginSuccess={handleAdminLoginSuccess}
            onBackToWebsite={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'admin' && (
          adminUser ? (
            <AdminDashboard
              adminUser={adminUser}
              onLogout={handleAdminLogout}
              onViewPublicActivity={(act) => setSelectedActivity(act)}
            />
          ) : (
            <AdminLoginPage
              onLoginSuccess={handleAdminLoginSuccess}
              onBackToWebsite={() => setActiveTab('home')}
            />
          )
        )}
      </main>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onSupportClick={() => {
            setSelectedActivity(null);
            setActiveTab('get-involved');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Global Footer */}
      {activeTab !== 'admin' && <Footer setActiveTab={setActiveTab} />}
    </div>
  );
}
