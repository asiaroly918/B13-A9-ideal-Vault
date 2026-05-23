import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiPlusCircle,
  FiBookOpen,
  FiHome,
  FiList,
  FiMessageSquare,
} from "react-icons/fi";

const navLinks = [
  { to: "/", label: "Home", icon: <FiHome /> },
  { to: "/ideas", label: "Ideas", icon: <FiList /> },
  { to: "/add-idea", label: "Add Idea", icon: <FiPlusCircle />, private: true },
  { to: "/my-ideas", label: "My Ideas", icon: <FiBookOpen />, private: true },
  { to: "/my-interactions", label: "My Interactions", icon: <FiMessageSquare />, private: true },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
  };
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const visibleLinks = navLinks.filter((l) => !l.private || user);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100/95 backdrop-blur-md shadow-lg border-b border-base-300"
          : "bg-base-100/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-md group-hover:shadow-violet-300 transition-all">
              <span className="text-white text-lg">💡</span>
            </div>
            <span className="font-black text-xl tracking-tight">
              <span className="text-violet-600">Idea</span>
              <span className="text-base-content">Vault</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                      : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm btn-circle"
              title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            >
              {theme === "dark" ? (
                <FiSun className="text-yellow-400 text-lg" />
              ) : (
                <FiMoon className="text-slate-600 text-lg" />
              )}
            </button>

            {/* Auth Buttons / User Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 btn btn-ghost btn-sm rounded-full pl-1 pr-3"
                >
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full ring-2 ring-violet-400 ring-offset-1 ring-offset-base-100">
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;
                        }}
                      />
                    </div>
                  </div>
                  <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden z-50">
                    <div className="p-4 border-b border-base-300 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
                      <p className="font-semibold text-sm truncate">{user.name}</p>
                      <p className="text-xs text-base-content/50 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-base-200 transition-colors"
                      >
                        <FiUser className="text-violet-500" />
                        Profile Management
                      </Link>
                      <Link
                        to="/my-ideas"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-base-200 transition-colors"
                      >
                        <FiBookOpen className="text-blue-500" />
                        My Ideas
                      </Link>
                      <Link
                        to="/my-interactions"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-base-200 transition-colors"
                      >
                        <FiMessageSquare className="text-green-500" />
                        My Interactions
                      </Link>
                      <div className="border-t border-base-300 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-error hover:bg-error/10 transition-colors w-full text-left"
                        >
                          <FiLogOut />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white border-none hover:from-violet-700 hover:to-purple-700 shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden btn btn-ghost btn-sm btn-circle"
            >
              {menuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-base-100 border-t border-base-300 px-4 py-3 space-y-1">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                    : "text-base-content/70 hover:bg-base-200"
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}

          {!user && (
            <div className="flex gap-2 pt-2 border-t border-base-300">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn btn-outline btn-sm flex-1"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="btn btn-sm flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white border-none"
              >
                Register
              </Link>
            </div>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/10 w-full border-t border-base-300 mt-1"
            >
              <FiLogOut />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
