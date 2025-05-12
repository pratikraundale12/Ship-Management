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

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const menuRef = useRef();
  const hamburgerRef = useRef();

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const firstBtn = menuRef.current?.querySelector('button, [tabindex="0"]');
    firstBtn && firstBtn.focus();
  }, [menuOpen]);

  const handleNavClick = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
    setMenuOpen(false);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate('/signup');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <span
        className="navbar-logo"
        onClick={() => handleNavClick('/dashboard')}
        style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.3rem', color: '#fff' }}
        tabIndex={0}
        aria-label="ShipMaster Home"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNavClick('/dashboard')}
      >
        🚢 ShipMaster
      </span>

      <ul className="navbar-links" role="menubar">
        {user && NAV_ITEMS.map(item => (
          <li key={item.path}>
            <button
              onClick={() => handleNavClick(item.path)}
              className={`nav-link${isActive(item.path) ? ' active' : ''}`}
              aria-current={isActive(item.path) ? 'page' : undefined}
              role="menuitem"
            >
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={toggleTheme}
            className="nav-btn"
            aria-label="Toggle dark mode"
            role="menuitem"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </li>
        {user && (
          <li>
            <button
              onClick={handleLogout}
              className="nav-btn"
              aria-label="Logout"
              role="menuitem"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      <button
        className="navbar-toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="navbar-links-mobile"
        onClick={() => setMenuOpen((open) => !open)}
        ref={hamburgerRef}
        tabIndex={0}
      >
        <span className="navbar-toggle-bar" />
        <span className="navbar-toggle-bar" />
        <span className="navbar-toggle-bar" />
      </button>

      <ul
        id="navbar-links-mobile"
        className={`navbar-links-mobile${menuOpen ? ' open' : ''}`}
        ref={menuRef}
        role="menu"
        aria-label="Mobile Navigation"
        style={{ background: '#2c3e50', color: '#ecf0f1', boxShadow: '0 8px 32px rgba(44,62,80,0.18)' }}
      >
        {user && NAV_ITEMS.map(item => (
          <li key={item.path}>
            <button
              onClick={() => handleNavClick(item.path)}
              className={`nav-link${isActive(item.path) ? ' active' : ''}`}
              style={{ color: '#ecf0f1' }}
              aria-current={isActive(item.path) ? 'page' : undefined}
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
            className="nav-btn"
            aria-label="Toggle dark mode"
            role="menuitem"
            tabIndex={menuOpen ? 0 : -1}
            style={{ color: '#ecf0f1' }}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </li>
        {user && (
          <li>
            <button
              onClick={handleLogout}
              className="nav-btn"
              aria-label="Logout"
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
              style={{ color: '#ecf0f1' }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {showLogoutConfirm && (
        <div className="logout-confirm-overlay" role="dialog" aria-modal="true" tabIndex={-1}>
          <div className="logout-confirm-dialog">
            <p>Are you sure you want to logout?</p>
            <div className="logout-confirm-actions">
              <button onClick={confirmLogout} className="nav-btn" autoFocus>Yes, Logout</button>
              <button onClick={cancelLogout} className="nav-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
