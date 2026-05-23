import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-300/50 border-t border-base-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-md">
                <span className="text-white text-xl">💡</span>
              </div>

              <span className="font-black text-2xl tracking-tight">
                <span className="text-violet-600">Idea</span>
                <span className="text-base-content">Vault</span>
              </span>
            </Link>

            <p className="text-base-content/60 text-sm leading-relaxed mb-5">
              A community-driven platform where innovators share,
              discover, and validate startup ideas together.
            </p>

            <div className="flex items-center gap-3">
              {[
                {
                  icon: <FaXTwitter />,
                  href: "#",
                  label: "X (Twitter)",
                },
                {
                  icon: <FiGithub />,
                  href: "#",
                  label: "GitHub",
                },
                {
                  icon: <FiLinkedin />,
                  href: "#",
                  label: "LinkedIn",
                },
                {
                  icon: <FiInstagram />,
                  href: "#",
                  label: "Instagram",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-base-200 flex items-center justify-center text-base-content/60 hover:bg-violet-600 hover:text-white transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-base mb-4 text-base-content">
              Platform
            </h3>

            <ul className="space-y-2.5">
              {[
                { to: "/ideas", label: "Browse Ideas" },
                { to: "/ideas?category=Tech", label: "Tech Ideas" },
                { to: "/ideas?category=AI", label: "AI Ideas" },
                { to: "/ideas?category=Health", label: "Health Ideas" },
                { to: "/add-idea", label: "Share an Idea" },
                {
                  to: "/ideas?sort=trending",
                  label: "Trending Ideas",
                },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-base-content/60 hover:text-violet-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-base mb-4 text-base-content">
              Categories
            </h3>

            <ul className="space-y-2.5">
              {[
                "Tech",
                "Health",
                "AI",
                "Education",
                "Finance",
                "Environment",
                "Social",
                "Entertainment",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/ideas?category=${cat}`}
                    className="text-sm text-base-content/60 hover:text-violet-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-4 text-base-content">
              Contact Us
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMail className="text-violet-500 mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm text-base-content/60">
                    Email
                  </p>

                  <a
                    href="mailto:hello@ideavault.io"
                    className="text-sm font-medium hover:text-violet-600 transition-colors"
                  >
                    hello@ideavault.io
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="text-violet-500 mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm text-base-content/60">
                    Phone
                  </p>

                  <a
                    href="tel:+15551234567"
                    className="text-sm font-medium hover:text-violet-600 transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FiMapPin className="text-violet-500 mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm text-base-content/60">
                    Location
                  </p>

                  <p className="text-sm font-medium">
                    San Francisco, CA 94105
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-5 p-4 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-xl border border-violet-200/50">
              <p className="text-xs font-semibold text-violet-700 dark:text-violet-400 mb-1">
                Newsletter
              </p>

              <p className="text-xs text-base-content/60 mb-3">
                Get weekly idea highlights
              </p>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input input-bordered input-sm flex-1 text-xs"
                />

                <button className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white border-none">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-base-content/50">
            © {year} IdeaVault. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-base-content/40">
            <Link
              to="/privacy"
              className="hover:text-violet-600 transition-colors"
            >
              Privacy Policy
            </Link>

            <span>·</span>

            <Link
              to="/terms"
              className="hover:text-violet-600 transition-colors"
            >
              Terms of Service
            </Link>

            <span>·</span>

            <Link
              to="/cookies"
              className="hover:text-violet-600 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}