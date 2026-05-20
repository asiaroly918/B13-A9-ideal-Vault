import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiTag, FiX, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../data/mockData";

interface FormData {
  title: string;
  shortDescription: string;
  detailedDescription: string;
  category: string;
  tags: string[];
  imageURL: string;
  estimatedBudget: string;
  targetAudience: string;
  problemStatement: string;
  proposedSolution: string;
}

const initialForm: FormData = {
  title: "",
  shortDescription: "",
  detailedDescription: "",
  category: "",
  tags: [],
  imageURL: "",
  estimatedBudget: "",
  targetAudience: "",
  problemStatement: "",
  proposedSolution: "",
};

const steps = [
  { id: 1, title: "Basic Info", icon: "📝" },
  { id: 2, title: "Problem & Solution", icon: "💡" },
  { id: 3, title: "Additional Details", icon: "📊" },
];

export default function AddIdeaPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [currentStep, setCurrentStep] = useState(1);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    document.title = "Add Idea – IdeaVault";
  }, []);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (tag && !form.tags.includes(tag) && form.tags.length < 6) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!form.title.trim()) newErrors.title = "Title is required";
      if (!form.shortDescription.trim()) newErrors.shortDescription = "Short description is required";
      if (!form.category) newErrors.category = "Please select a category";
    }
    if (step === 2) {
      if (!form.problemStatement.trim()) newErrors.problemStatement = "Problem statement is required";
      if (!form.proposedSolution.trim()) newErrors.proposedSolution = "Proposed solution is required";
      if (!form.detailedDescription.trim()) newErrors.detailedDescription = "Detailed description is required";
    }
    if (step === 3) {
      if (!form.targetAudience.trim()) newErrors.targetAudience = "Target audience is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, 3));
    }
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));

    // In real app: POST to /api/ideas
    const newIdea = {
      ...form,
      authorName: user?.name,
      authorEmail: user?.email,
      authorPhoto: user?.photoURL,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      bookmarks: 0,
      comments: [],
    };
    console.log("Submitting idea:", newIdea);

    setSubmitting(false);
    setSubmitted(true);
    toast.success("Your idea has been published! 🎉");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-5xl text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-base-content mb-3">Idea Published! 🎉</h2>
          <p className="text-base-content/70 mb-8">
            Your startup idea "<span className="font-semibold text-violet-600">{form.title}</span>" has been shared with the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { setForm(initialForm); setSubmitted(false); setCurrentStep(1); }}
              className="btn btn-outline border-violet-300 text-violet-600 rounded-xl hover:bg-violet-600 hover:text-white hover:border-violet-600"
            >
              Add Another Idea
            </button>
            <button
              onClick={() => navigate("/ideas")}
              className="btn bg-violet-600 text-white border-none rounded-xl hover:bg-violet-700"
            >
              Browse Ideas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pb-12">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-3">💡</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Share Your Startup Idea</h1>
          <p className="text-white/80 text-base">
            Got a game-changing idea? Share it with thousands of innovators and get valuable feedback.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  currentStep === step.id
                    ? "bg-violet-600 text-white shadow-lg"
                    : currentStep > step.id
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-base-200 text-base-content/50"
                }`}
              >
                <span>{currentStep > step.id ? "✅" : step.icon}</span>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${currentStep > step.id ? "bg-green-400" : "bg-base-300"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 border border-base-300 rounded-2xl p-6 sm:p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold mb-1">📝 Basic Information</h2>
              <p className="text-sm text-base-content/60 mb-5">Start with the fundamentals of your idea.</p>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Idea Title <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., AI-Powered Mental Health Companion"
                  className={`input input-bordered rounded-xl w-full ${errors.title ? "input-error" : ""}`}
                />
                {errors.title && <span className="text-error text-xs mt-1">{errors.title}</span>}
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Short Description <span className="text-error">*</span>
                </label>
                <textarea
                  value={form.shortDescription}
                  onChange={(e) => handleChange("shortDescription", e.target.value)}
                  placeholder="A brief one-line summary of your startup idea (max 150 characters)"
                  className={`textarea textarea-bordered rounded-xl w-full resize-none ${errors.shortDescription ? "textarea-error" : ""}`}
                  rows={2}
                  maxLength={150}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.shortDescription && <span className="text-error text-xs">{errors.shortDescription}</span>}
                  <span className="text-xs text-base-content/40 ml-auto">{form.shortDescription.length}/150</span>
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Category <span className="text-error">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={`select select-bordered rounded-xl w-full ${errors.category ? "select-error" : ""}`}
                >
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="text-error text-xs mt-1">{errors.category}</span>}
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={form.imageURL}
                  onChange={(e) => handleChange("imageURL", e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="input input-bordered rounded-xl w-full"
                />
                {form.imageURL && (
                  <div className="mt-3 rounded-xl overflow-hidden h-32 bg-base-200">
                    <img
                      src={form.imageURL}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">Tags (optional, max 6)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add a tag and press Enter"
                    className="input input-bordered rounded-xl flex-1"
                    disabled={form.tags.length >= 6}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    disabled={form.tags.length >= 6 || !tagInput.trim()}
                    className="btn btn-outline border-violet-300 text-violet-600 rounded-xl gap-1"
                  >
                    <FiTag /> Add
                  </button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.tags.map((tag) => (
                      <span key={tag} className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/30 border-violet-200 gap-1.5 font-medium">
                        #{tag}
                        <button onClick={() => removeTag(tag)} className="text-violet-400 hover:text-error">
                          <FiX className="text-xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Problem & Solution */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold mb-1">💡 Problem & Solution</h2>
              <p className="text-sm text-base-content/60 mb-5">Define the problem you're solving and how.</p>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Problem Statement <span className="text-error">*</span>
                </label>
                <textarea
                  value={form.problemStatement}
                  onChange={(e) => handleChange("problemStatement", e.target.value)}
                  placeholder="What problem does your idea solve? Be specific about the pain point..."
                  className={`textarea textarea-bordered rounded-xl w-full resize-none ${errors.problemStatement ? "textarea-error" : ""}`}
                  rows={4}
                />
                {errors.problemStatement && <span className="text-error text-xs mt-1">{errors.problemStatement}</span>}
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Proposed Solution <span className="text-error">*</span>
                </label>
                <textarea
                  value={form.proposedSolution}
                  onChange={(e) => handleChange("proposedSolution", e.target.value)}
                  placeholder="How does your idea solve the problem? Describe your approach..."
                  className={`textarea textarea-bordered rounded-xl w-full resize-none ${errors.proposedSolution ? "textarea-error" : ""}`}
                  rows={4}
                />
                {errors.proposedSolution && <span className="text-error text-xs mt-1">{errors.proposedSolution}</span>}
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Detailed Description <span className="text-error">*</span>
                </label>
                <textarea
                  value={form.detailedDescription}
                  onChange={(e) => handleChange("detailedDescription", e.target.value)}
                  placeholder="Provide a comprehensive description of your startup idea, business model, and vision..."
                  className={`textarea textarea-bordered rounded-xl w-full resize-none ${errors.detailedDescription ? "textarea-error" : ""}`}
                  rows={6}
                />
                {errors.detailedDescription && <span className="text-error text-xs mt-1">{errors.detailedDescription}</span>}
              </div>
            </div>
          )}

          {/* Step 3: Additional Details */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold mb-1">📊 Additional Details</h2>
              <p className="text-sm text-base-content/60 mb-5">Help others understand your market and vision.</p>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Target Audience <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={form.targetAudience}
                  onChange={(e) => handleChange("targetAudience", e.target.value)}
                  placeholder="e.g., Small business owners aged 30-55"
                  className={`input input-bordered rounded-xl w-full ${errors.targetAudience ? "input-error" : ""}`}
                />
                {errors.targetAudience && <span className="text-error text-xs mt-1">{errors.targetAudience}</span>}
              </div>

              <div className="form-control">
                <label className="label font-semibold text-sm pb-1">
                  Estimated Budget (optional)
                </label>
                <input
                  type="text"
                  value={form.estimatedBudget}
                  onChange={(e) => handleChange("estimatedBudget", e.target.value)}
                  placeholder="e.g., $500K, $2M, Bootstrapped"
                  className="input input-bordered rounded-xl w-full"
                />
              </div>

              {/* Summary Card */}
              <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 rounded-2xl p-5 mt-4">
                <h3 className="font-bold text-sm mb-3 text-violet-700 dark:text-violet-400">📋 Idea Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="font-semibold text-base-content/60 w-20 shrink-0">Title:</span>
                    <span className="text-base-content font-medium">{form.title || "—"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-base-content/60 w-20 shrink-0">Category:</span>
                    <span className="text-base-content">{form.category || "—"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-base-content/60 w-20 shrink-0">Tags:</span>
                    <span className="text-base-content">{form.tags.length > 0 ? form.tags.map((t) => `#${t}`).join(", ") : "None"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-5 border-t border-base-300">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn btn-ghost rounded-xl disabled:opacity-30"
            >
              ← Previous
            </button>

            {currentStep < 3 ? (
              <button onClick={nextStep} className="btn bg-violet-600 text-white border-none rounded-xl hover:bg-violet-700 gap-2">
                Next Step →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn bg-gradient-to-r from-violet-600 to-purple-600 text-white border-none rounded-xl hover:from-violet-700 hover:to-purple-700 gap-2 min-w-32"
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <FiUpload />
                    Publish Idea
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
