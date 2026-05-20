import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiImage, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

interface PasswordStrength {
  hasLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
}

export default function RegisterPage() {
  const { register, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [strength, setStrength] = useState<PasswordStrength>({
    hasLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
  });

  useEffect(() => {
    document.title = "Register – IdeaVault";
    if (user) navigate("/");
  }, [user, navigate]);

  const checkStrength = (pwd: string) => {
    setStrength({
      hasLength: pwd.length >= 6,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
    });
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError("");
    if (field === "password") checkStrength(value);
  };

  const validateForm = (): boolean => {
    if (!form.name.trim()) { setFormError("Full name is required"); return false; }
    if (form.name.trim().length < 2) { setFormError("Name must be at least 2 characters"); return false; }
    if (!form.email.trim()) { setFormError("Email is required"); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setFormError("Please enter a valid email address"); return false; }
    if (!form.password) { setFormError("Password is required"); return false; }
    if (form.password.length < 6) { setFormError("Password must be at least 6 characters"); return false; }
    if (!strength.hasUpper) { setFormError("Password must contain at least one uppercase letter"); return false; }
    if (!strength.hasLower) { setFormError("Password must contain at least one lowercase letter"); return false; }
    if (form.password !== form.confirmPassword) { setFormError("Passwords do not match"); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(form.name, form.email, form.photoURL, form.password);
      toast.success("Account created successfully! Welcome to IdeaVault 🎉");
      navigate("/");
    } catch (err: any) {
      const msg = err.message || "Registration failed. Please try again.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Account created with Google! 🎉");
      navigate("/");
    } catch {
      toast.error("Google signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const strengthItems = [
    { key: "hasLength", label: "At least 6 characters" },
    { key: "hasUpper", label: "One uppercase letter" },
    { key: "hasLower", label: "One lowercase letter" },
    { key: "hasNumber", label: "One number (recommended)" },
  ];

  const strengthScore = Object.values(strength).filter(Boolean).length;
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "text-error", "text-warning", "text-info", "text-success"];

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
          <h1 className="text-3xl font-black text-base-content mb-2">Join IdeaVault</h1>
          <p className="text-base-content/60">Start sharing your startup ideas today</p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 rounded-3xl">
          <div className="card-body p-7 sm:p-8">
            {/* Google */}
            <button
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="btn btn-outline w-full rounded-2xl gap-3 font-semibold hover:bg-base-200 border-base-300 mb-5"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>

            <div className="divider text-xs text-base-content/40 font-semibold my-0">OR CREATE WITH EMAIL</div>

            {/* Form Error */}
            {formError && (
              <div className="alert bg-error/10 border-error/20 rounded-xl py-3">
                <FiAlertCircle className="text-error shrink-0" />
                <span className="text-error text-sm">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-1">
              {/* Name */}
              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="John Doe"
                    className="input input-bordered w-full pl-10 rounded-xl"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@example.com"
                    className="input input-bordered w-full pl-10 rounded-xl"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Photo URL
                  <span className="label-text-alt text-base-content/40">Optional</span>
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="url"
                    value={form.photoURL}
                    onChange={(e) => handleChange("photoURL", e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered w-full pl-10 rounded-xl"
                  />
                </div>
                {form.photoURL && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={form.photoURL}
                      alt="Preview"
                      className="w-8 h-8 rounded-full object-cover border-2 border-violet-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <span className="text-xs text-base-content/50">Preview</span>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Create a strong password"
                    className="input input-bordered w-full pl-10 pr-10 rounded-xl"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {/* Password strength */}
                {form.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            i <= strengthScore
                              ? strengthScore <= 1 ? "bg-error" : strengthScore <= 2 ? "bg-warning" : strengthScore <= 3 ? "bg-info" : "bg-success"
                              : "bg-base-300"
                          }`}
                        />
                      ))}
                      <span className={`text-xs font-semibold ml-1 ${strengthColors[strengthScore]}`}>
                        {strengthLabels[strengthScore]}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {strengthItems.map(({ key, label }) => (
                        <div key={key} className={`flex items-center gap-1.5 text-xs ${strength[key as keyof PasswordStrength] ? "text-success" : "text-base-content/40"}`}>
                          <FiCheckCircle className={strength[key as keyof PasswordStrength] ? "fill-current" : ""} />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    placeholder="Confirm your password"
                    className={`input input-bordered w-full pl-10 pr-10 rounded-xl ${form.confirmPassword && form.password !== form.confirmPassword ? "input-error" : ""}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-error mt-1">Passwords do not match</p>
                )}
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
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-base-content/60 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-600 font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-base-content/40 mt-4">
          By registering, you agree to our{" "}
          <Link to="/terms" className="text-violet-600 hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
