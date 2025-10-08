import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

type AppLayoutProps = {
  children: React.ReactNode;
};

const routes = [
  { path: '/', label: 'Overview' },
  { path: '/provider', label: 'Provider Workspace' },
  { path: '/payer', label: 'Payer Workspace' }
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const { role, organisationId, loginAs, logout } = useAuth();

  return (
    <div className="layout">
      <header className="top-nav">
        <div className="brand">
          <span className="logo-dot" aria-hidden="true" />
          <span className="brand-name">ValueCare Engine</span>
        </div>
        <nav className="nav-links" aria-label="Primary navigation">
          {routes.map((route) => (
            <Link key={route.path} to={route.path} className={location.pathname === route.path ? 'active' : ''}>
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="auth-controls">
          <span className="role-indicator" data-role={role}>
            {role === 'guest' ? 'Guest' : `${role} • ${organisationId}`}
          </span>
          {role === 'guest' ? (
            <div className="role-buttons">
              <button type="button" onClick={() => loginAs('provider')}>
                Provider Login
              </button>
              <button type="button" onClick={() => loginAs('payer')}>
                Payer Login
              </button>
            </div>
          ) : (
            <button type="button" onClick={logout}>
              Sign out
            </button>
          )}
        </div>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
}
