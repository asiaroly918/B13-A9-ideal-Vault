import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiEye, FiPlusCircle, FiX, FiSave } from "react-icons/fi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { mockIdeas, CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS, type Idea } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyIdeasPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [editForm, setEditForm] = useState<Partial<Idea>>({});
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    document.title = "My Ideas – IdeaVault";
    setTimeout(() => {
      // In real app: fetch from /api/ideas?author=user.email
      const userIdeas = mockIdeas.filter((i) => i.authorEmail === user?.email);
      // Add demo ideas for logged-in user
      const demoIdeas: Idea[] = [
        {
          ...mockIdeas[0],
          _id: "my-1",
          authorEmail: user?.email || "",
          authorName: user?.name || "",
          authorPhoto: user?.photoURL || "",
          title: "My First Startup Idea",
          upvotes: 42,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          ...mockIdeas[2],
          _id: "my-2",
          authorEmail: user?.email || "",
          authorName: user?.name || "",
          authorPhoto: user?.photoURL || "",
          title: "Smart Urban Farming Network",
          upvotes: 18,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setIdeas([...demoIdeas, ...userIdeas]);
      setLoading(false);
    }, 800);
  }, [user]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeletingId(deleteId);
    await new Promise((r) => setTimeout(r, 600));
    setIdeas((prev) => prev.filter((i) => i._id !== deleteId));
    setDeleteId(null);
    setDeletingId(null);
    toast.success("Idea deleted successfully");
  };

  const openEdit = (idea: Idea) => {
    setEditingIdea(idea);
    setEditForm({
      title: idea.title,
      shortDescription: idea.shortDescription,
      category: idea.category,
      imageURL: idea.imageURL,
      targetAudience: idea.targetAudience,
      estimatedBudget: idea.estimatedBudget,
      problemStatement: idea.problemStatement,
      proposedSolution: idea.proposedSolution,
    });
  };

  const handleEditSave = async () => {
    if (!editingIdea) return;
    setSavingEdit(true);
    await new Promise((r) => setTimeout(r, 700));
    setIdeas((prev) =>
      prev.map((i) => (i._id === editingIdea._id ? { ...i, ...editForm } as Idea : i))
    );
    setSavingEdit(false);
    setEditingIdea(null);
    toast.success("Idea updated successfully! ✅");
  };

  if (loading) return <LoadingSpinner fullPage text="Loading your ideas..." />;

  return (
    <div className="min-h-screen bg-base-100 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-violet-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">My Ideas 📚</h1>
              <p className="text-white/80">
                You have <span className="font-bold">{ideas.length}</span> published idea{ideas.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Link
              to="/add-idea"
              className="btn bg-white text-violet-700 hover:bg-violet-50 border-none font-bold rounded-xl gap-2 shadow-lg self-start sm:self-auto"
            >
              <FiPlusCircle /> Add New Idea
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {ideas.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💭</div>
            <h3 className="text-2xl font-bold text-base-content mb-2">No ideas yet</h3>
            <p className="text-base-content/60 mb-6">Share your first startup idea with the community!</p>
            <Link to="/add-idea" className="btn bg-violet-600 text-white border-none rounded-xl gap-2">
              <FiPlusCircle /> Share Your First Idea
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="card bg-base-100 border border-base-300 hover:border-violet-300 hover:shadow-lg rounded-2xl overflow-hidden transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 h-40 sm:h-auto shrink-0 bg-base-200 relative">
                    <img
                      src={idea.imageURL}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/200x200/7c3aed/ffffff?text=${idea.category}`;
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`badge ${CATEGORY_COLORS[idea.category]} badge-sm font-semibold`}>
                        {CATEGORY_ICONS[idea.category]} {idea.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-black text-lg mb-1.5 text-base-content">{idea.title}</h3>
                      <p className="text-sm text-base-content/60 line-clamp-2 mb-3">{idea.shortDescription}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-base-content/50">
                        <span className="flex items-center gap-1">
                          <HiArrowTrendingUp className="text-orange-400" />
                          <strong className="text-base-content">{idea.upvotes}</strong> upvotes
                        </span>
                        <span>💬 <strong className="text-base-content">{idea.comments.length}</strong> comments</span>
                        <span>🕐 {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-base-200">
                      <Link
                        to={`/ideas/${idea._id}`}
                        className="btn btn-xs btn-ghost gap-1 rounded-lg text-blue-500 hover:bg-blue-50"
                      >
                        <FiEye className="text-xs" /> View
                      </Link>
                      <button
                        onClick={() => openEdit(idea)}
                        className="btn btn-xs btn-ghost gap-1 rounded-lg text-violet-500 hover:bg-violet-50"
                      >
                        <FiEdit2 className="text-xs" /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(idea._id)}
                        className="btn btn-xs btn-ghost gap-1 rounded-lg text-error hover:bg-error/10"
                      >
                        <FiTrash2 className="text-xs" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal modal-open">
          <div className="modal-box rounded-2xl max-w-sm">
            <div className="text-4xl text-center mb-4">🗑️</div>
            <h3 className="font-bold text-lg text-center mb-2">Delete This Idea?</h3>
            <p className="text-base-content/70 text-sm text-center mb-6">
              This will permanently remove your idea and all its comments. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={!!deletingId}
                className="btn btn-ghost flex-1 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={!!deletingId}
                className="btn btn-error flex-1 rounded-xl text-white"
              >
                {deletingId ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !deletingId && setDeleteId(null)} />
        </div>
      )}

      {/* Edit Modal */}
      {editingIdea && (
        <div className="modal modal-open">
          <div className="modal-box rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl">Edit Idea ✏️</h3>
              <button onClick={() => setEditingIdea(null)} className="btn btn-ghost btn-circle btn-sm">
                <FiX />
              </button>
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title || ""}
                  onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                  className="input input-bordered rounded-xl w-full"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Short Description</label>
                <textarea
                  value={editForm.shortDescription || ""}
                  onChange={(e) => setEditForm((p) => ({ ...p, shortDescription: e.target.value }))}
                  className="textarea textarea-bordered rounded-xl w-full resize-none"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label font-semibold text-sm pb-1">Category</label>
                  <select
                    value={editForm.category || ""}
                    onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value as any }))}
                    className="select select-bordered rounded-xl w-full"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-semibold text-sm pb-1">Estimated Budget</label>
                  <input
                    type="text"
                    value={editForm.estimatedBudget || ""}
                    onChange={(e) => setEditForm((p) => ({ ...p, estimatedBudget: e.target.value }))}
                    className="input input-bordered rounded-xl w-full"
                    placeholder="e.g., $500K"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Target Audience</label>
                <input
                  type="text"
                  value={editForm.targetAudience || ""}
                  onChange={(e) => setEditForm((p) => ({ ...p, targetAudience: e.target.value }))}
                  className="input input-bordered rounded-xl w-full"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Problem Statement</label>
                <textarea
                  value={editForm.problemStatement || ""}
                  onChange={(e) => setEditForm((p) => ({ ...p, problemStatement: e.target.value }))}
                  className="textarea textarea-bordered rounded-xl w-full resize-none"
                  rows={3}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Proposed Solution</label>
                <textarea
                  value={editForm.proposedSolution || ""}
                  onChange={(e) => setEditForm((p) => ({ ...p, proposedSolution: e.target.value }))}
                  className="textarea textarea-bordered rounded-xl w-full resize-none"
                  rows={3}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editForm.imageURL || ""}
                  onChange={(e) => setEditForm((p) => ({ ...p, imageURL: e.target.value }))}
                  className="input input-bordered rounded-xl w-full"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-base-300">
              <button
                onClick={() => setEditingIdea(null)}
                disabled={savingEdit}
                className="btn btn-ghost flex-1 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={savingEdit}
                className="btn bg-violet-600 text-white border-none flex-1 rounded-xl gap-2"
              >
                {savingEdit ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <FiSave /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !savingEdit && setEditingIdea(null)} />
        </div>
      )}
    </div>
  );
}
