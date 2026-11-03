import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, Shield, Wrench, Eye, Cpu, User, ChevronDown, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar({ onToggleSidebar }) {
  const { user, role, logout, isMockMode } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  // Derived user details from authenticated user profile
  const firstName = user?.first_name || (user?.full_name ? user.full_name.split(' ')[0] : '') || user?.username || 'Operator';
  const lastName = user?.last_name || (user?.full_name ? user.full_name.split(' ').slice(1).join(' ') : '') || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const gmailAddress = user?.email || (user?.username?.includes('@') ? user.username : `${user?.username || 'operator'}@gmail.com`);

  const displayRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
    : 'Role Unavailable';

  // Compute initials for avatar
  const initials = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`.toUpperCase() || 'U';

  const getRoleBadge = () => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return (
          <span
            className="badge d-flex align-items-center gap-1"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.14)',
              color: '#f87171',
              border: '1px solid #7f1d1d',
              fontSize: '0.75rem'
            }}
          >
            <Shield size={12} /> Admin
          </span>
        );
      case 'engineer':
        return (
          <span
            className="badge d-flex align-items-center gap-1"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.14)',
              color: '#fbbf24',
              border: '1px solid #78350f',
              fontSize: '0.75rem'
            }}
          >
            <Wrench size={12} /> Engineer
          </span>
        );
      case 'supervisor':
        return (
          <span
            className="badge d-flex align-items-center gap-1"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.14)',
              color: '#4ade80',
              border: '1px solid #166534',
              fontSize: '0.75rem'
            }}
          >
            <Eye size={12} /> Supervisor
          </span>
        );
      default:
        return null;
    }
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="navbar navbar-expand bg-white border-bottom px-3 py-2 sticky-top">
      <div className="container-fluid p-0">
        {/* Left Side: Mobile Menu Button & App Brand */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-outline-secondary d-lg-none"
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation"
          >
            <Menu size={18} />
          </button>

          <div className="d-none d-sm-flex align-items-center gap-2">
            <Cpu size={20} style={{ color: '#f59e0b' }} />
            <span className="fw-bold text-white tracking-wide">Plant Ops</span>
            <span className="text-muted small" style={{ fontSize: '0.75rem' }}>| Industrial Intelligence</span>
          </div>
        </div>

        {/* Right Side: Demo Mode Tag, Role Badge, and User Profile Section */}
        <div className="d-flex align-items-center gap-3">
          {isMockMode && (
            <span
              className="badge bg-warning text-dark border border-warning d-none d-md-inline-block"
              title="Backend not reachable or running in mock mode. Real API requests will switch automatically once Django is up."
            >
              Demo / Mock Mode Active
            </span>
          )}

          {getRoleBadge()}

          {/* Notification Alert Bell (Matches Reference Console) */}
          <button
            type="button"
            className="btn btn-sm btn-link text-muted p-1 position-relative d-flex align-items-center"
            title="System Telemetry Notifications"
            aria-label="System Notifications"
          >
            <Bell size={18} />
            <span
              className="position-absolute top-0 end-0 translate-middle-y p-1 rounded-circle"
              style={{ width: 7, height: 7, backgroundColor: '#f59e0b' }}
            />
          </button>

          {/* User Profile Section at Top-Right Corner */}
          <div className="position-relative border-start ps-3" ref={dropdownRef}>
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-2 text-start"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-label="User Profile Menu"
              style={{ color: 'inherit' }}
            >
              {/* Profile Avatar with Warm Amber Contrast */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  fontSize: '0.85rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  color: '#f59e0b',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}
              >
                {initials}
              </div>

              {/* User Identity Details (First Name, Last Name, Gmail, Role) */}
              <div className="d-none d-sm-block text-end lh-sm">
                <div className="fw-semibold small text-white">{fullName}</div>
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                  {gmailAddress}
                </div>
                <div
                  className="fw-semibold text-uppercase"
                  style={{ fontSize: '0.64rem', letterSpacing: '0.04em', color: '#f59e0b' }}
                >
                  {displayRole}
                </div>
              </div>

              <ChevronDown size={14} className="text-muted d-none d-sm-inline" />
            </button>

            {/* Profile Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="card card-industrial shadow border position-absolute end-0 mt-2 py-2 px-3 bg-white"
                style={{ minWidth: '250px', zIndex: 1060 }}
              >
                {/* Header with Full Name and Gmail Address */}
                <div className="d-flex align-items-center gap-2 pb-2 mb-2 border-bottom">
                  <div
                    className="p-2 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}
                  >
                    <User size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="fw-bold text-dark text-truncate small">{fullName}</div>
                    <div className="text-muted text-truncate" style={{ fontSize: '0.72rem' }}>
                      {gmailAddress}
                    </div>
                  </div>
                </div>

                {/* Role Row */}
                <div className="d-flex align-items-center justify-content-between mb-3 px-1">
                  <span className="text-secondary small" style={{ fontSize: '0.75rem' }}>
                    Assigned Role:
                  </span>
                  <span className="badge bg-light text-primary border small">{displayRole}</span>
                </div>

                {/* Logout Option */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
