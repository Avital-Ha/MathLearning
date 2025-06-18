import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "./utils";
import { User } from "./entities/User";
import "./styles/Layout.css";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  React.useEffect(() => {
    // אם לא טוען, ואין משתמש, והעמוד הנוכחי הוא לא login/register/auth – הפנה ל-auth
    const unauthPages = ["/auth", "/login", "/register"];
    if (!loading && !user && !unauthPages.includes(location.pathname)) {
      navigate("/auth");
    }
  }, [loading, user, location.pathname, navigate]);
const handleLogout = async () => {
  await User.logout();
  setUser(null);
  navigate("/auth");
};


  const navItems = [
    { name: "מרכז אישי", path: "/Dashboard" },
    { name: "תרגולים", path: "/Exercises" },
    { name: "משחקים", path: "/Games" },
    { name: "התקדמות", path: "/Progress" },
  ];

  if (loading) {
    return (
      <div
        className="layout-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || !user.user_type) {
    // כבר מטופל ב-useEffect, אז לא מציג כלום
    return null;
  }

  return (
    <div className="layout-container">
      <header className="header">
        <div className="header-inner">
         

          <button
            className="button button-ghost mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <Link to="/Dashboard" className="header-logo">
            MathLearning
            <div className="header-logo-icon">📚</div>
          </Link>
           <div className="header-greeting">
            הי, {user.first_name || user.full_name}!
          </div>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button className="button button-ghost" onClick={handleLogout}>
            התנתקות
          </button>
        </div>
      </header>

      {/* תפריט צד לנייד */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className="mobile-menu">
            <div className="mobile-menu-header">
              <h2 className="mobile-menu-title">תפריט</h2>
              <button
                className="mobile-menu-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-user-info">
              <p>ברוכים השבים</p>
              <p>{user.first_name || user.full_name}</p>
              {user.grade && <p>כיתה {user.grade}</p>}
            </div>

            <nav className="mobile-nav">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <button className="button button-outline" onClick={handleLogout}>
              התנתקות
            </button>
          </aside>
        </>
      )}

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
