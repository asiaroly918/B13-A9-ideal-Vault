import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Login – IdeaVault";
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const validateForm = () => {
    if (!email.trim()) {
      setFormError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    if (!password) {
      setFormError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.message || "Login failed. Please check your credentials.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google! 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">💡</span>
            </div>
            <span className="font-black text-2xl">
              <span className="text-violet-600">Idea</span>
              <span className="text-base-content">Vault</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-base-content mb-2">Welcome Back!</h1>
          <p className="text-base-content/60">Sign in to continue innovating</p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 rounded-3xl">
          <div className="card-body p-7 sm:p-8">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="btn btn-outline w-full rounded-2xl gap-3 font-semibold hover:bg-base-200 border-base-300 mb-5"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>

            <div className="divider text-xs text-base-content/40 font-semibold my-0">OR SIGN IN WITH EMAIL</div>

            {/* Form Error */}
            {formError && (
              <div className="alert bg-error/10 border-error/20 rounded-xl py-3">
                <FiAlertCircle className="text-error shrink-0" />
                <span className="text-error text-sm">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-1">
              {/* Email */}
              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFormError(""); }}
                    placeholder="you@example.com"
                    className="input input-bordered w-full pl-10 rounded-xl"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <div className="flex justify-between items-center pb-1">
                  <label className="label font-semibold text-sm p-0">Password</label>
                  <button type="button" className="text-xs text-violet-600 hover:underline font-medium">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setFormError(""); }}
                    placeholder="Enter your password"
                    className="input input-bordered w-full pl-10 pr-10 rounded-xl"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white border-none rounded-2xl font-bold hover:from-violet-700 hover:to-purple-700 mt-2"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-base-content/60 mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-violet-600 font-bold hover:underline">
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-4 p-4 bg-violet-100 dark:bg-violet-900/30 rounded-2xl border border-violet-200 dark:border-violet-700">
          <p className="text-xs text-violet-700 dark:text-violet-300 text-center font-medium">
            🎯 <strong>Demo Mode:</strong> Click "Continue with Google" or enter any email & password to login
          </p>
        </div>
      </div>
    </div>
  );
}
