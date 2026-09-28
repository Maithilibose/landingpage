import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'RESTORE', href: '/app' },
  { label: 'EXPLORE', href: '/explore' },
  { label: 'ABOUT', href: '/about' },
] as const;

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="vellum-nav">
      <div className="nav-inner">
        <Link
          to="/"
          className="vellum-brand"
          onClick={closeMenu}
          aria-label="Return to Landing Page"
        >
          <span className="brand-symbol">✦</span>

          <span className="brand-copy">
            <span className="brand-name">VELLUM NODE</span>
            <span className="brand-tagline">
              HERITAGE · KNOWLEDGE · TECHNOLOGY
            </span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={isActive(item.href) ? 'active' : ''}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/explore"
            className="nav-button"
            onClick={closeMenu}
          >
            ENTER ARCHIVE →
          </Link>
        </nav>

        <button
          type="button"
          className="nav-mobile-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="vellum-mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="vellum-mobile-navigation"
          className="nav-mobile-menu"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={isActive(item.href) ? 'active' : ''}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/explore"
            className="nav-mobile-archive"
            onClick={closeMenu}
          >
            ENTER ARCHIVE →
          </Link>
        </nav>
      )}
    </header>
  );
}
