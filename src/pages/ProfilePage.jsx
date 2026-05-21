import { useState, useEffect } from "react";
import { FiUser, FiMail, FiImage, FiEdit2, FiSave, FiX, FiShield } from "react-icons/fi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { mockIdeas } from "../data/mockData";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    photoURL: user?.photoURL || "",
  });

  useEffect(() => {
    document.title = "My Profile – IdeaVault";
  }, []);

  const userIdeasCount = 2;
  const totalUpvotes = 60;
  const totalComments = 12;
  const totalBookmarks = 8;

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);

    await new Promise((r) => setTimeout(r, 800));

    updateProfile({
      name: form.name.trim(),
      photoURL: form.photoURL,
    });

    setSaving(false);
    setEditing(false);

    toast.success("Profile updated successfully! ✅");
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      photoURL: user?.photoURL || "",
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-base-100 pb-12">

      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 py-16 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-white/80">Manage your account information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-6">

        {/* Profile Card */}
        <div className="card bg-base-100 border border-base-300 rounded-3xl shadow-xl overflow-hidden">

          {/* Profile Header */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-base-300">

            <div className="relative">

              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-violet-200 dark:ring-violet-800 shadow-lg">

                <img
                  src={editing ? form.photoURL || user?.photoURL : user?.photoURL}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`;
                  }}
                />

              </div>

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-lg hover:bg-violet-700 transition-colors"
                >
                  <FiEdit2 className="text-sm" />
                </button>
              )}

            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-black text-base-content">
                {user?.name}
              </h2>

              <p className="text-base-content/60 flex items-center gap-2 mt-1">
                <FiMail className="text-violet-400" />
                {user?.email}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/30 border-violet-200 gap-1">
                  <FiShield className="text-xs" /> Verified Member
                </span>

                <span className="badge badge-ghost text-xs">Joined 2024</span>
              </div>
            </div>

            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="btn bg-violet-600 text-white border-none rounded-xl gap-2 hover:bg-violet-700 shrink-0"
              >
                <FiEdit2 /> Edit Profile
              </button>
            )}

          </div>

          {/* Edit Form (FIXED wrapper) */}
          {editing && (
            <div className="p-6 sm:p-8 space-y-5">

              <h3 className="font-bold text-base text-base-content">
                Edit Information
              </h3>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="input input-bordered w-full pl-10 rounded-xl"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Photo URL
                </label>

                <div className="relative">
                  <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />

                  <input
                    type="url"
                    value={form.photoURL}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, photoURL: e.target.value }))
                    }
                    className="input input-bordered w-full pl-10 rounded-xl"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                {form.photoURL && (
                  <div className="flex items-center gap-3 mt-3">

                    <img
                      src={form.photoURL}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border-2 border-violet-300"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <span className="text-sm text-base-content/60">
                      Photo preview
                    </span>

                  </div>
                )}
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Email Address
                  <span className="label-text-alt text-base-content/40">
                    Cannot be changed
                  </span>
                </label>

                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />

                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="input input-bordered w-full pl-10 rounded-xl opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">

                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="btn btn-ghost flex-1 rounded-xl gap-2"
                >
                  <FiX /> Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn bg-violet-600 text-white border-none flex-1 rounded-xl gap-2 hover:bg-violet-700"
                >
                  {saving ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <FiSave /> Save Changes
                    </>
                  )}
                </button>

              </div>
            </div>
          )}

        </div>

        {/* Stats Card */}
        <div className="card bg-base-100 border border-base-300 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-5">Activity Statistics</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            {[
              { label: "Ideas Posted", value: userIdeasCount, icon: "💡" },
              { label: "Total Upvotes", value: totalUpvotes, icon: "🔥" },
              { label: "Comments Made", value: totalComments, icon: "💬" },
              { label: "Bookmarks", value: totalBookmarks, icon: "🔖" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-xs font-medium opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 border border-base-300 rounded-2xl p-6">

          <h3 className="font-bold text-lg mb-5">
            Recently Trending in Your Categories
          </h3>

          <div className="space-y-3">

            {mockIdeas.slice(0, 3).map((idea) => (
              <div
                key={idea._id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-200 transition-colors"
              >
                <img
                  src={idea.imageURL}
                  alt={idea.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      `https://placehold.co/100x100/7c3aed/ffffff?text=${idea.category}`;
                  }}
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {idea.title}
                  </p>

                  <p className="text-xs text-base-content/50 flex items-center gap-1">
                    <HiArrowTrendingUp className="text-orange-400" />
                    {idea.upvotes} upvotes · {idea.category}
                  </p>
                </div>

                <span className="badge badge-sm font-semibold text-violet-600 bg-violet-50 border-violet-200">
                  View
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Security */}
        <div className="card bg-base-100 border border-base-300 rounded-2xl p-6">

          <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
            <FiShield className="text-violet-500" /> Security & Privacy
          </h3>

          <div className="space-y-3">

            {[
              { label: "Authentication Method", value: "Email & Password / Google OAuth", icon: "🔐" },
              { label: "Two-Factor Authentication", value: "Not configured", icon: "📱" },
              { label: "Account Status", value: "Active & Verified", icon: "✅" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-base-200">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-xs text-base-content/50">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}