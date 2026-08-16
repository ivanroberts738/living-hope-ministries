// src/components/Navbar.tsx
// ... existing imports ...

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  adminUser: any | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, adminUser, onLogout }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'impact', label: 'Impact' },
    { id: 'programmes', label: 'Programmes' },
    { id: 'activities', label: 'Activities' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'board-of-governors', label: 'Board of Governors' },
    { id: 'contact', label: 'Contact' },
  ];

  // Only show Admin tab if user is logged in
  const adminTab = adminUser ? { id: 'admin', label: 'Admin' } : { id: 'admin-login', label: 'Admin' };

  // Show login button if not logged in, or admin if logged in
  const showAdminTab = adminUser ? 'admin' : 'admin-login';

  return (
    // ... your navbar JSX ...
    // Make sure to include the admin tab:
    // ... tabs.map(...) ...
    // Then add the admin tab at the end
  );
};

export default Navbar;
