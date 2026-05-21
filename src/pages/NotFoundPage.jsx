import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 – Page Not Found | IdeaVault";
  }, []);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[10rem] font-black leading-none select-none">
            <span className="text-violet-200 dark:text-violet-900">4</span>
            <span className="text-8xl relative inline-block animate-bounce">💡</span>
            <span className="text-violet-200 dark:text-violet-900">4</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent pointer-events-none" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-base-content mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-base-content/60 text-lg mb-3 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Maybe the idea behind this URL is still brewing! ☕
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline border-base-300 rounded-xl gap-2 font-semibold"
          >
            <FiArrowLeft /> Go Back
          </button>
          <Link
            to="/"
            className="btn bg-violet-600 text-white border-none rounded-xl gap-2 font-semibold hover:bg-violet-700"
          >
            <FiHome /> Back to Home
          </Link>
          <Link
            to="/ideas"
            className="btn btn-outline border-violet-300 text-violet-600 rounded-xl gap-2 font-semibold hover:bg-violet-600 hover:text-white hover:border-violet-600"
          >
            <FiSearch /> Browse Ideas
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 p-6 bg-base-200 rounded-2xl">
          <p className="text-sm font-semibold text-base-content/60 mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { to: "/ideas", label: "💡 Ideas" },
              { to: "/add-idea", label: "➕ Add Idea" },
              { to: "/login", label: "🔐 Login" },
              { to: "/register", label: "✨ Register" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="btn btn-ghost btn-sm rounded-xl text-sm font-medium hover:bg-base-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
