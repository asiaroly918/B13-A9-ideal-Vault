import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMessageSquare, FiBookmark, FiShare2, FiEdit2, FiTrash2, FiSend, FiClock, FiDollarSign, FiUsers, FiTarget, FiTag } from "react-icons/fi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { formatDistanceToNow, format } from "date-fns";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { mockIdeas, CATEGORY_COLORS, CATEGORY_ICONS, type Comment } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";

export default function IdeaDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [idea] = useState(mockIdeas.find((i) => i._id === id));
  const [comments, setComments] = useState<Comment[]>(idea?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [upvotes, setUpvotes] = useState(idea?.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    document.title = idea ? `${idea.title} – IdeaVault` : "Idea Details – IdeaVault";
    setTimeout(() => setLoading(false), 600);
  }, [idea]);

  if (loading) return <LoadingSpinner fullPage text="Loading idea..." />;

  if (!idea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold mb-2">Idea Not Found</h2>
        <p className="text-base-content/60 mb-6">This idea may have been removed or doesn't exist.</p>
        <Link to="/ideas" className="btn btn-primary rounded-xl">Browse Ideas</Link>
      </div>
    );
  }

  const handleUpvote = () => {
    if (!user) {
      toast.error("Please login to upvote ideas!");
      navigate("/login");
      return;
    }
    if (hasUpvoted) {
      setUpvotes((v) => v - 1);
      setHasUpvoted(false);
      toast("Upvote removed", { icon: "👋" });
    } else {
      setUpvotes((v) => v + 1);
      setHasUpvoted(true);
      toast.success("Idea upvoted! 🔥");
    }
  };

  const handleBookmark = () => {
    if (!user) {
      toast.error("Please login to bookmark ideas!");
      navigate("/login");
      return;
    }
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Bookmark removed" : "Idea bookmarked! 🔖");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleAddComment = async () => {
    if (!user) {
      toast.error("Please login to comment!");
      navigate("/login");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    setSubmittingComment(true);
    await new Promise((r) => setTimeout(r, 500));

    const comment: Comment = {
      _id: `c-${Date.now()}`,
      userId: user.uid,
      userName: user.name,
      userPhoto: user.photoURL,
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
    setSubmittingComment(false);
    toast.success("Comment added successfully!");
  };

  const handleEditComment = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setEditingText(currentText);
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editingText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    await new Promise((r) => setTimeout(r, 300));
    setComments((prev) =>
      prev.map((c) => (c._id === commentId ? { ...c, text: editingText.trim() } : c))
    );
    setEditingCommentId(null);
    toast.success("Comment updated!");
  };

  const handleDeleteComment = async (commentId: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setComments((prev) => prev.filter((c) => c._id !== commentId));
    setDeleteConfirmId(null);
    toast.success("Comment deleted");
  };

  return (
    <div className="min-h-screen bg-base-100 pb-12">
      {/* Back Navigation */}
      <div className="sticky top-16 z-30 bg-base-100/80 backdrop-blur-md border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm gap-2 rounded-xl font-medium"
          >
            <FiArrowLeft /> Back to Ideas
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="btn btn-ghost btn-sm btn-circle" title="Share">
              <FiShare2 />
            </button>
            <button
              onClick={handleBookmark}
              className={`btn btn-sm btn-circle ${isBookmarked ? "text-amber-500 bg-amber-50 hover:bg-amber-100" : "btn-ghost"}`}
            >
              <FiBookmark className={isBookmarked ? "fill-current" : ""} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden h-64 sm:h-80 relative">
              <img
                src={idea.imageURL}
                alt={idea.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x400/7c3aed/ffffff?text=${encodeURIComponent(idea.title.slice(0, 2))}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className={`badge ${CATEGORY_COLORS[idea.category]} font-bold text-sm px-3 py-1.5`}>
                  {CATEGORY_ICONS[idea.category]} {idea.category}
                </span>
                <div className="flex gap-2">
                  {idea.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="badge badge-outline border-white/50 text-white text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Title & Meta */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-base-content mb-4 leading-tight">
                {idea.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60 mb-4">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full ring-2 ring-violet-300">
                      <img src={idea.authorPhoto} alt={idea.authorName}
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${idea.authorName}`; }}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-base-content">{idea.authorName}</span>
                    <span className="text-base-content/40 text-xs block">{idea.authorEmail}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1">
                  <FiClock className="text-violet-400" />
                  {format(new Date(idea.createdAt), "MMM d, yyyy")}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleUpvote}
                  className={`btn btn-sm rounded-xl gap-2 font-semibold ${
                    hasUpvoted
                      ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                      : "btn-outline border-orange-300 text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  <HiArrowTrendingUp className="text-base" />
                  {upvotes} Upvotes
                </button>
                <button
                  onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn btn-sm rounded-xl gap-2 btn-outline border-blue-300 text-blue-500 hover:bg-blue-50"
                >
                  <FiMessageSquare />
                  {comments.length} Comments
                </button>
                <button
                  onClick={handleBookmark}
                  className={`btn btn-sm rounded-xl gap-2 ${
                    isBookmarked
                      ? "bg-amber-500 text-white border-amber-500 hover:bg-amber-600"
                      : "btn-outline border-amber-300 text-amber-500 hover:bg-amber-50"
                  }`}
                >
                  <FiBookmark className={isBookmarked ? "fill-current" : ""} />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
              </div>
            </div>

            {/* Description Cards */}
            <div className="space-y-5">
              <div className="card bg-base-100 border border-base-300 rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-sm">📋</span>
                  Overview
                </h2>
                <p className="text-base-content/70 leading-relaxed">{idea.shortDescription}</p>
              </div>

              <div className="card bg-base-100 border border-base-300 rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-sm">❗</span>
                  Problem Statement
                </h2>
                <p className="text-base-content/70 leading-relaxed">{idea.problemStatement}</p>
              </div>

              <div className="card bg-base-100 border border-base-300 rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-sm">✅</span>
                  Proposed Solution
                </h2>
                <p className="text-base-content/70 leading-relaxed">{idea.proposedSolution}</p>
              </div>

              <div className="card bg-base-100 border border-base-300 rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm">📝</span>
                  Detailed Description
                </h2>
                <p className="text-base-content/70 leading-relaxed">{idea.detailedDescription}</p>
              </div>

              {/* Tags */}
              {idea.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <FiTag className="text-base-content/40" />
                  {idea.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/ideas?q=${tag}`}
                      className="badge badge-outline hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-colors cursor-pointer font-medium"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div id="comments-section" className="space-y-5 pt-2">
              <h2 className="text-2xl font-black flex items-center gap-2">
                <FiMessageSquare className="text-violet-500" />
                Discussion ({comments.length})
              </h2>

              {/* Add Comment */}
              {user ? (
                <div className="card bg-base-100 border border-base-300 rounded-2xl p-4">
                  <div className="flex gap-3">
                    <div className="avatar shrink-0">
                      <div className="w-10 h-10 rounded-full ring-2 ring-violet-300">
                        <img src={user.photoURL} alt={user.name}
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`; }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts on this idea..."
                        className="textarea textarea-bordered w-full rounded-xl resize-none text-sm min-h-[80px]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.ctrlKey) handleAddComment();
                        }}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-base-content/40">Ctrl+Enter to submit</span>
                        <button
                          onClick={handleAddComment}
                          disabled={submittingComment || !newComment.trim()}
                          className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white border-none rounded-xl gap-2 font-semibold"
                        >
                          {submittingComment ? (
                            <span className="loading loading-spinner loading-xs" />
                          ) : (
                            <FiSend />
                          )}
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card bg-violet-50 dark:bg-violet-900/20 border border-violet-200 rounded-2xl p-6 text-center">
                  <p className="text-base-content/70 mb-3">
                    <span className="font-semibold">Join the discussion!</span> Login to add comments.
                  </p>
                  <Link to="/login" className="btn btn-sm bg-violet-600 text-white border-none rounded-xl hover:bg-violet-700">
                    Login to Comment
                  </Link>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-3">💬</div>
                    <p className="text-base-content/60">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id} className="card bg-base-100 border border-base-300 hover:border-violet-200 rounded-2xl p-4 transition-all">
                      <div className="flex gap-3">
                        <div className="avatar shrink-0">
                          <div className="w-9 h-9 rounded-full ring-1 ring-base-300">
                            <img src={comment.userPhoto} alt={comment.userName}
                              onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${comment.userName}`; }}
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div>
                              <span className="font-semibold text-sm">{comment.userName}</span>
                              <span className="text-xs text-base-content/40 ml-2 flex items-center gap-1 inline-flex">
                                <FiClock className="text-xs" />
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            {user && user.uid === comment.userId && (
                              <div className="flex gap-1 shrink-0">
                                <button
                                  onClick={() => handleEditComment(comment._id, comment.text)}
                                  className="btn btn-ghost btn-xs rounded-lg text-blue-500 hover:bg-blue-50"
                                >
                                  <FiEdit2 className="text-xs" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(comment._id)}
                                  className="btn btn-ghost btn-xs rounded-lg text-error hover:bg-error/10"
                                >
                                  <FiTrash2 className="text-xs" />
                                </button>
                              </div>
                            )}
                          </div>

                          {editingCommentId === comment._id ? (
                            <div className="space-y-2">
                              <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                className="textarea textarea-bordered w-full rounded-xl resize-none text-sm"
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSaveEdit(comment._id)}
                                  className="btn btn-xs bg-violet-600 text-white border-none rounded-lg"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingCommentId(null)}
                                  className="btn btn-xs btn-ghost rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-base-content/80 leading-relaxed">{comment.text}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            {/* Key Info Card */}
            <div className="card bg-base-100 border border-base-300 rounded-2xl p-5 sticky top-24">
              <h3 className="font-bold text-base mb-4 pb-3 border-b border-base-300">Idea Details</h3>
              <div className="space-y-4">
                {idea.estimatedBudget && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <FiDollarSign className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <div className="text-xs text-base-content/50 mb-0.5">Estimated Budget</div>
                      <div className="font-bold text-sm">{idea.estimatedBudget}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <FiUsers className="text-blue-600 text-sm" />
                  </div>
                  <div>
                    <div className="text-xs text-base-content/50 mb-0.5">Target Audience</div>
                    <div className="font-semibold text-sm">{idea.targetAudience}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                    <FiTarget className="text-violet-600 text-sm" />
                  </div>
                  <div>
                    <div className="text-xs text-base-content/50 mb-0.5">Category</div>
                    <div className="font-bold text-sm">{CATEGORY_ICONS[idea.category]} {idea.category}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-base-300">
                  {[
                    { label: "Upvotes", value: upvotes, icon: "🔥" },
                    { label: "Comments", value: comments.length, icon: "💬" },
                    { label: "Bookmarks", value: idea.bookmarks, icon: "🔖" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl mb-0.5">{stat.icon}</div>
                      <div className="font-black text-lg">{stat.value}</div>
                      <div className="text-xs text-base-content/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-base-300 space-y-2">
                <button
                  onClick={handleUpvote}
                  className={`btn btn-sm w-full rounded-xl gap-2 font-semibold ${
                    hasUpvoted ? "bg-orange-500 text-white border-none" : "btn-outline border-orange-300 text-orange-500"
                  }`}
                >
                  🔥 {hasUpvoted ? "Upvoted!" : "Upvote This Idea"}
                </button>
                <button
                  onClick={handleShare}
                  className="btn btn-sm w-full btn-ghost rounded-xl gap-2 font-medium"
                >
                  <FiShare2 /> Share Idea
                </button>
              </div>
            </div>

            {/* Related Ideas */}
            <div className="card bg-base-100 border border-base-300 rounded-2xl p-5">
              <h3 className="font-bold text-base mb-4">Similar Ideas</h3>
              <div className="space-y-3">
                {mockIdeas
                  .filter((i) => i._id !== idea._id && i.category === idea.category)
                  .slice(0, 3)
                  .map((relIdea) => (
                    <Link
                      key={relIdea._id}
                      to={`/ideas/${relIdea._id}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-base-200 transition-colors group"
                    >
                      <img
                        src={relIdea.imageURL}
                        alt={relIdea.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/100x100/7c3aed/ffffff?text=${relIdea.category}`; }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold line-clamp-2 group-hover:text-violet-600 transition-colors">{relIdea.title}</p>
                        <p className="text-xs text-base-content/50">🔥 {relIdea.upvotes}</p>
                      </div>
                    </Link>
                  ))}
                {mockIdeas.filter((i) => i._id !== idea._id && i.category === idea.category).length === 0 && (
                  <p className="text-sm text-base-content/50 text-center py-3">No similar ideas found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Comment Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal modal-open">
          <div className="modal-box rounded-2xl max-w-sm">
            <h3 className="font-bold text-lg mb-2">Delete Comment?</h3>
            <p className="text-base-content/70 text-sm mb-5">This action cannot be undone.</p>
            <div className="modal-action gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-ghost btn-sm rounded-xl">
                Cancel
              </button>
              <button
                onClick={() => handleDeleteComment(deleteConfirmId)}
                className="btn btn-error btn-sm rounded-xl text-white"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteConfirmId(null)} />
        </div>
      )}
    </div>
  );
}
