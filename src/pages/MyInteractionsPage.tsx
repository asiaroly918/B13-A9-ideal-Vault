import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiArrowUpRight, FiBookmark, FiClock } from "react-icons/fi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { mockIdeas, CATEGORY_COLORS, CATEGORY_ICONS } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";

type Tab = "comments" | "bookmarks" | "upvoted";

export default function MyInteractionsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("comments");

  useEffect(() => {
    document.title = "My Interactions – IdeaVault";
    setTimeout(() => setLoading(false), 700);
  }, []);

  // Demo data for interactions
  const commentedIdeas = mockIdeas.slice(0, 4).map((idea) => ({
    idea,
    comment: {
      _id: `demo-c-${idea._id}`,
      text: `This is a really interesting concept! I think the ${idea.category.toLowerCase()} space has huge potential for this kind of innovation.`,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  }));

  const bookmarkedIdeas = mockIdeas.slice(2, 6);
  const upvotedIdeas = mockIdeas.slice(1, 5);

  const tabs = [
    { id: "comments" as Tab, label: "Commented", icon: <FiMessageSquare />, count: commentedIdeas.length },
    { id: "bookmarks" as Tab, label: "Bookmarked", icon: <FiBookmark />, count: bookmarkedIdeas.length },
    { id: "upvoted" as Tab, label: "Upvoted", icon: <HiArrowTrendingUp />, count: upvotedIdeas.length },
  ];

  if (loading) return <LoadingSpinner fullPage text="Loading your interactions..." />;

  return (
    <div className="min-h-screen bg-base-100 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">My Interactions 🗣️</h1>
          <p className="text-white/80">Track your comments, bookmarks, and upvotes across all ideas.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {tabs.map((tab) => (
            <div key={tab.id} className="card bg-base-100 border border-base-300 rounded-2xl p-4 text-center">
              <div className="text-2xl text-violet-500 flex justify-center mb-2">{tab.icon}</div>
              <div className="text-2xl font-black text-base-content">{tab.count}</div>
              <div className="text-xs text-base-content/60 font-medium">{tab.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-base-300 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-violet-600 text-violet-600 bg-violet-50 dark:bg-violet-900/20"
                  : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`badge badge-sm ${activeTab === tab.id ? "bg-violet-600 text-white border-none" : "badge-ghost"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "comments" && (
          <div className="space-y-4">
            <p className="text-sm text-base-content/60 mb-4">Ideas you've commented on</p>
            {commentedIdeas.map(({ idea, comment }) => (
              <div key={idea._id} className="card bg-base-100 border border-base-300 hover:border-violet-300 hover:shadow-lg rounded-2xl overflow-hidden transition-all">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-32 h-28 sm:h-auto shrink-0 bg-base-200 relative">
                    <img
                      src={idea.imageURL}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/200x200/7c3aed/ffffff?text=${idea.category}`; }}
                    />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`badge ${CATEGORY_COLORS[idea.category]} badge-sm font-semibold`}>
                        {CATEGORY_ICONS[idea.category]} {idea.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-base mb-2">{idea.title}</h3>

                    {/* User's comment */}
                    <div className="bg-base-200/80 rounded-xl p-3 mb-3 border-l-4 border-violet-400">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="avatar">
                          <div className="w-5 h-5 rounded-full">
                            <img src={user?.photoURL} alt={user?.name}
                              onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`; }}
                            />
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-base-content/70">Your comment</span>
                        <span className="text-xs text-base-content/40 ml-auto flex items-center gap-1">
                          <FiClock className="text-xs" />
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-base-content/80 italic line-clamp-2">"{comment.text}"</p>
                    </div>

                    <Link
                      to={`/ideas/${idea._id}`}
                      className="btn btn-xs btn-ghost gap-1 rounded-lg text-violet-600 hover:bg-violet-50 font-semibold"
                    >
                      View Full Discussion <FiArrowUpRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div>
            <p className="text-sm text-base-content/60 mb-4">Ideas you've saved for later</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bookmarkedIdeas.map((idea) => (
                <div key={idea._id} className="card bg-base-100 border border-base-300 hover:border-amber-300 hover:shadow-lg rounded-2xl overflow-hidden transition-all group">
                  <figure className="h-40 overflow-hidden bg-base-200">
                    <img
                      src={idea.imageURL}
                      alt={idea.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x200/7c3aed/ffffff?text=${idea.category}`; }}
                    />
                  </figure>
                  <div className="p-4">
                    <span className={`badge ${CATEGORY_COLORS[idea.category]} badge-sm font-semibold mb-2`}>
                      {CATEGORY_ICONS[idea.category]} {idea.category}
                    </span>
                    <h3 className="font-bold text-sm mb-1 line-clamp-2">{idea.title}</h3>
                    <p className="text-xs text-base-content/60 line-clamp-2 mb-3">{idea.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-base-content/50">
                        <span>🔥 {idea.upvotes}</span>
                        <span>💬 {idea.comments.length}</span>
                      </div>
                      <Link
                        to={`/ideas/${idea._id}`}
                        className="btn btn-xs bg-violet-600 text-white border-none rounded-lg gap-1 font-semibold"
                      >
                        View <FiArrowUpRight />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "upvoted" && (
          <div className="space-y-3">
            <p className="text-sm text-base-content/60 mb-4">Ideas you've upvoted and supported</p>
            {upvotedIdeas.map((idea) => (
              <div key={idea._id} className="card bg-base-100 border border-base-300 hover:border-orange-300 hover:shadow-lg rounded-2xl p-4 transition-all">
                <div className="flex items-center gap-4">
                  <img
                    src={idea.imageURL}
                    alt={idea.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/100x100/7c3aed/ffffff?text=${idea.category}`; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`badge ${CATEGORY_COLORS[idea.category]} badge-xs`}>
                        {idea.category}
                      </span>
                      <span className="text-xs text-base-content/40">by {idea.authorName}</span>
                    </div>
                    <h3 className="font-bold text-sm mb-1 truncate">{idea.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-base-content/50">
                      <span className="flex items-center gap-1 text-orange-500 font-semibold">
                        <HiArrowTrendingUp /> {idea.upvotes} upvotes
                      </span>
                      <span>💬 {idea.comments.length}</span>
                    </div>
                  </div>
                  <Link
                    to={`/ideas/${idea._id}`}
                    className="btn btn-xs btn-ghost gap-1 rounded-lg text-violet-600 font-semibold shrink-0"
                  >
                    View <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty States */}
        {activeTab === "comments" && commentedIdeas.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">No comments yet</h3>
            <p className="text-base-content/60 mb-5">Join the discussion on ideas that interest you!</p>
            <Link to="/ideas" className="btn bg-violet-600 text-white border-none rounded-xl">Browse Ideas</Link>
          </div>
        )}
      </div>
    </div>
  );
}
