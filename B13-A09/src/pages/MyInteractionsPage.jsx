import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiArrowUpRight, FiBookmark, FiClock } from "react-icons/fi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { mockIdeas, CATEGORY_COLORS, CATEGORY_ICONS } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyInteractionsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("comments");

  useEffect(() => {
    document.title = "My Interactions – IdeaVault";
    setTimeout(() => setLoading(false), 700);
  }, []);

  const commentedIdeas = mockIdeas.slice(0, 4).map((idea) => ({
    idea,
    comment: {
      _id: `demo-c-${idea._id}`,
      text: `This is a really interesting concept!`,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  }));

  const bookmarkedIdeas = mockIdeas.slice(2, 6);
  const upvotedIdeas = mockIdeas.slice(1, 5);

  const tabs = [
    { id: "comments", label: "Commented", icon: <FiMessageSquare />, count: commentedIdeas.length },
    { id: "bookmarks", label: "Bookmarked", icon: <FiBookmark />, count: bookmarkedIdeas.length },
    { id: "upvoted", label: "Upvoted", icon: <HiArrowTrendingUp />, count: upvotedIdeas.length },
  ];

  if (loading) return <LoadingSpinner fullPage text="Loading your interactions..." />;

  return (
    <div className="min-h-screen bg-base-100 pb-12">

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-base-300 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 ${
              activeTab === tab.id
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* COMMENTS */}
      {activeTab === "comments" && (
        <div>
          {commentedIdeas.map(({ idea, comment }) => (
            <div key={idea._id} className="card p-4 border">
              <h3>{idea.title}</h3>

              <p className="italic">"{comment.text}"</p>

              <span className="text-xs flex items-center gap-1">
                <FiClock />
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>

              <Link to={`/ideas/${idea._id}`}>
                View <FiArrowUpRight />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* BOOKMARKS */}
      {activeTab === "bookmarks" && (
        <div>
          {bookmarkedIdeas.map((idea) => (
            <div key={idea._id}>
              <h3>{idea.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* UPVOTED */}
      {activeTab === "upvoted" && (
        <div>
          {upvotedIdeas.map((idea) => (
            <div key={idea._id}>
              <h3>{idea.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}