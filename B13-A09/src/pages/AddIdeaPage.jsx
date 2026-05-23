import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiTag, FiX, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../data/mockData";

const initialForm = {
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

  const [form, setForm] = useState(initialForm);
  const [currentStep, setCurrentStep] = useState(1);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Add Idea – IdeaVault";
  }, []);

  const handleChange = (field, value) => {
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

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!form.title.trim()) newErrors.title = "Title is required";
      if (!form.shortDescription.trim())
        newErrors.shortDescription = "Short description is required";
      if (!form.category) newErrors.category = "Please select a category";
    }

    if (step === 2) {
      if (!form.problemStatement.trim())
        newErrors.problemStatement = "Problem required";
      if (!form.proposedSolution.trim())
        newErrors.proposedSolution = "Solution required";
      if (!form.detailedDescription.trim())
        newErrors.detailedDescription = "Description required";
    }

    if (step === 3) {
      if (!form.targetAudience.trim())
        newErrors.targetAudience = "Target audience required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 1200));

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
    toast.success("Idea published!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiCheckCircle className="text-5xl text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold mt-4">Idea Published!</h2>

          <button
            onClick={() => {
              setForm(initialForm);
              setSubmitted(false);
              setCurrentStep(1);
            }}
            className="btn mt-4"
          >
            Add Another
          </button>

          <button onClick={() => navigate("/ideas")} className="btn mt-2">
            Browse Ideas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <h1 className="text-2xl font-bold">Add Idea</h1>

      <div className="mt-6 space-y-3">
        <input
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Title"
          className="input input-bordered w-full"
        />

        <textarea
          value={form.shortDescription}
          onChange={(e) => handleChange("shortDescription", e.target.value)}
          placeholder="Short description"
          className="textarea textarea-bordered w-full"
        />

        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button onClick={nextStep} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}