import { useAuth } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Admissions",
    icon: "M4 6.5h16M4 12h16M4 17.5h10",
  },
  {
    to: "/admin/analytics",
    label: "Analytics",
    icon: "M5 19V9m7 10V5m7 14v-7",
  },
  {
    to: "/admin/matched-enrolled",
    label: "Matched",
    icon: "M5 13l4 4L19 7",
  },
  {
    to: "/admin/email",
    label: "Email",
    icon: "M4 7l8 6 8-6M5 6h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z",
  },
  {
    to: "/admin/archives",
    label: "Archives",
    icon: "M5 8h14M7 8v11h10V8M9 8V5h6v3",
  },
  {
    to: "/admin/backup",
    label: "Backup",
    icon: "M12 4v9m0 0l-4-4m4 4l4-4M5 20h14",
  },
];

const AdminHeader = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <header className="admin-command-bar">
      <div className="admin-command-inner">
        <div className="admin-brand-block">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="admin-brand-mark"
            aria-label="Go to admissions dashboard"
          >
            EA
          </button>
          <div>
            <p className="admin-brand-kicker">Exact Colleges of Asia</p>
            <h1 className="admin-brand-title">Admin Console</h1>
          </div>
        </div>

        <nav className="admin-nav-strip" aria-label="Admin navigation">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`admin-nav-item ${isActive(item.to) ? "is-active" : ""}`}
            >
              <svg
                className="admin-nav-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-account-block">
          <button
            type="button"
            onClick={() => navigate("/admin/settings")}
            className="admin-account-button"
            title="Account settings"
          >
            <span className="admin-account-initial">
              {admin?.email?.charAt(0).toUpperCase() || "A"}
            </span>
            <span className="admin-account-text">
              <span>Signed in</span>
              <strong>{admin?.email || "Admin"}</strong>
            </span>
          </button>
          <button type="button" onClick={logout} className="admin-logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
