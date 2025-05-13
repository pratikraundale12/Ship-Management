import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Ship Management', path: '/ships' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Components', path: '/components/' },
];

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const menuRef = useRef();
  const hamburgerRef = useRef();

  const getScreenSize = () => {
    const width = window.innerWidth;
    if (width <= BREAKPOINTS.mobile) return 'mobile';
    if (width <= BREAKPOINTS.tablet) return 'tablet';
    return 'desktop';
  };

  useEffect(() => {
    const handleResize = () => {
      const newSize = getScreenSize();
      setScreenSize(newSize);
      if (newSize === 'desktop') setMenuOpen(false);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target) && !hamburgerRef.current?.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [menuOpen]);
// Add this function before the return statement, after the styles object
const confirmLogout = async () => {
  try {
    await logout();
    setShowLogoutConfirm(false);
    navigate('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// ...rest of your code remains the same
  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: screenSize === 'mobile' ? '0.75rem' : '1rem',
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    logo: {
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: screenSize === 'mobile' ? '1.1rem' : '1.3rem',
      color: '#fff',
      zIndex: 1001,
    },
    linkList: {
      display: screenSize === 'desktop' ? 'flex' : menuOpen ? 'flex' : 'none',
      listStyle: 'none',
      margin: 0,
      padding: screenSize !== 'desktop' ? '1rem' : 0,
      gap: '1rem',
      alignItems: 'center',
      flexDirection: screenSize === 'desktop' ? 'row' : 'column',
      position: screenSize === 'desktop' ? 'static' : 'absolute',
      top: screenSize === 'desktop' ? 'auto' : '100%',
      left: 0,
      width: screenSize === 'desktop' ? 'auto' : '100%',
      backgroundColor: screenSize === 'desktop' ? 'transparent' : '#2c3e50',
      boxShadow: screenSize === 'desktop' ? 'none' : '0 4px 6px rgba(0,0,0,0.1)',
    },
    linkButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontSize: screenSize === 'mobile' ? '0.9rem' : '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      padding: screenSize === 'mobile' ? '0.4rem 1rem' : '0.5rem 1.5rem',
      width: screenSize === 'desktop' ? 'auto' : '90%',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
    },
    activeLink: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      fontWeight: 'bold',
    },
    hamburger: {
      display: screenSize === 'desktop' ? 'none' : 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: '2rem',
      height: '2rem',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0',
      zIndex: 1001,
    },
    hamburgerBar: {
      width: '2rem',
      height: '0.25rem',
      backgroundColor: '#fff',
      borderRadius: '10px',
      transition: 'all 0.3s linear',
      transformOrigin: '1px',
    },
    logoutOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    },
    logoutDialog: {
      backgroundColor: '#fff',
      padding: screenSize === 'mobile' ? '1.5rem' : '2rem',
      borderRadius: '12px',
      width: screenSize === 'mobile' ? '90%' : 'auto',
      maxWidth: '400px',
      textAlign: 'center',
    },
  };

  return (
    <nav style={styles.nav}>
      <span style={styles.logo} onClick={() => navigate('/dashboard')}>
        🚢 ShipMaster
      </span>

      <button
        ref={hamburgerRef}
        style={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span style={{
          ...styles.hamburgerBar,
          transform: menuOpen ? 'rotate(45deg)' : 'rotate(0)',
        }} />
        <span style={{
          ...styles.hamburgerBar,
          opacity: menuOpen ? '0' : '1',
        }} />
        <span style={{
          ...styles.hamburgerBar,
          transform: menuOpen ? 'rotate(-45deg)' : 'rotate(0)',
        }} />
      </button>

      <ul style={styles.linkList} ref={menuRef}>
        {NAV_ITEMS.map(item => (
          <li key={item.path}>
            <button
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
              style={{
                ...styles.linkButton,
                ...(location.pathname.startsWith(item.path) ? styles.activeLink : {}),
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            style={styles.linkButton}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </li>
        {user && (
          <li>
            <button
              onClick={() => {
                setShowLogoutConfirm(true);
                setMenuOpen(false);
              }}
              style={styles.linkButton}
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {showLogoutConfirm && (
        <div style={styles.logoutOverlay}>
          <div style={styles.logoutDialog}>
            <h2>Confirm Logout</h2>
            <p style={{ color: 'black' }}>Are you sure you want to logout?</p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={confirmLogout}
                style={{
                  ...styles.linkButton,
                  backgroundColor: '#e74c3c',
                }}
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={styles.linkButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;