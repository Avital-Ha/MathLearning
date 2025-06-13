
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Users, GraduationCap, Home, LogOut, Gamepad2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/entities/User";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await User.logout();
    setUser(null);
    window.location.href = createPageUrl('Home');
  };

  // Don't show layout on home and setup pages
  const noLayoutPages = ['/', '/setup'];
  if (noLayoutPages.includes(location.pathname)) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50">
      {children}
    </div>;
  }

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>;
  }

  if (!user || !user.user_type) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50">
      {children}
    </div>;
  }

  const navItems = [
    { name: "Dashboard", path: "Dashboard", icon: Home },
    { name: "Exercises", path: "Exercises", icon: BookOpen },
    { name: "Games", path: "Games", icon: Gamepad2 },
    { name: "Progress", path: "Progress", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50">
      <style>{`
        :root {
          --primary-blue: #5DADE2;
          --primary-teal: #48C9B0;
          --primary-purple: #A569BD;
          --soft-yellow: #F4D03F;
          --gentle-sky: #85C1E9;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - User info and logout */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                Hi, {user.first_name || user.full_name}!
              </span>
              
              {/* Desktop Logout */}
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Right side - Logo */}
            <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                MathLearning
              </span>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-semibold text-gray-800">Menu</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* User Info */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
                <p className="text-sm text-gray-600">Welcome back</p>
                <p className="font-semibold text-gray-800">{user.first_name || user.full_name}</p>
                {user.grade && (
                  <p className="text-xs text-gray-500">Grade {user.grade}</p>
                )}
              </div>

              {/* Navigation Links */}
              {user.user_type === 'student' && (
                <nav className="space-y-2 mb-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={createPageUrl(item.path)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        currentPageName === item.path
                          ? "bg-blue-100 text-blue-700" 
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              )}

              {/* Logout Button */}
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      {user.user_type === 'student' && (
        <nav className="bg-white/60 backdrop-blur-sm border-b border-white/20 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={createPageUrl(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    currentPageName === item.path
                      ? "bg-blue-100 text-blue-700" 
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
