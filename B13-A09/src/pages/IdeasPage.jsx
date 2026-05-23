import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiX, FiGrid, FiList } from "react-icons/fi";
import IdeaCard from "../components/IdeaCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { mockIdeas, CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from "../data/mockData";

export default function IdeasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "trending"
  );
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    document.title = "Browse Ideas – IdeaVault";
    setTimeout(() => setLoading(false), 700);
  }, []);

  // Filter & sort ideas
  const filteredIdeas = useMemo(() => {
    let ideas = [...mockIdeas];

    // Search filter
    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");

      ideas = ideas.filter(
        (idea) =>
          regex.test(idea.title) ||
          regex.test(idea.shortDescription)
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All") {
      ideas = ideas.filter(
        (idea) => idea.category === selectedCategory
      );
    }

    // Sort
    if (sortBy === "trending") {
      ideas.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === "newest") {
      ideas.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "oldest") {
      ideas.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
      );
    } else if (sortBy === "most-commented") {
      ideas.sort(
        (a, b) =>
          b.comments.length - a.comments.length
      );
    }

    return ideas;
  }, [search, selectedCategory, sortBy]);

  const handleSearch = (val) => {
    setSearch(val);

    const params = {};

    if (val) params.q = val;
    if (selectedCategory !== "All") {
      params.category = selectedCategory;
    }
    if (sortBy !== "trending") {
      params.sort = sortBy;
    }

    setSearchParams(params);
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);

    const params = {};

    if (search) params.q = search;
    if (cat !== "All") {
      params.category = cat;
    }
    if (sortBy !== "trending") {
      params.sort = sortBy;
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("trending");
    setSearchParams({});
  };

  const hasFilters =
    search ||
    selectedCategory !== "All" ||
    sortBy !== "trending";

  if (loading) {
    return (
      <LoadingSpinner
        fullPage
        text="Fetching ideas..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Explore Startup Ideas 💡
          </h1>

          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Discover, discuss, and support innovative ideas
            from entrepreneurs worldwide.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              placeholder="Search ideas by title or description..."
              className="input input-lg w-full pl-12 pr-4 rounded-2xl shadow-xl border-none text-base"
            />

            {search && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`btn btn-sm rounded-xl font-semibold gap-1.5 transition-all ${
                  selectedCategory === cat
                    ? "bg-violet-600 text-white border-violet-600 hover:bg-violet-700"
                    : "btn-ghost bg-base-200 hover:bg-base-300"
                }`}
              >
                {cat !== "All" && (
                  <span>
                    {CATEGORY_ICONS[cat]}
                  </span>
                )}

                {cat}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);

                const params = {};

                if (search) params.q = search;

                if (selectedCategory !== "All") {
                  params.category =
                    selectedCategory;
                }

                if (
                  e.target.value !== "trending"
                ) {
                  params.sort = e.target.value;
                }

                setSearchParams(params);
              }}
              className="select select-sm select-bordered rounded-xl font-medium"
            >
              <option value="trending">
                🔥 Trending
              </option>

              <option value="newest">
                🆕 Newest
              </option>

              <option value="oldest">
                📅 Oldest
              </option>

              <option value="most-commented">
                💬 Most Discussed
              </option>
            </select>

            {/* View toggle */}
            <div className="flex rounded-xl overflow-hidden border border-base-300">
              <button
                onClick={() =>
                  setViewMode("grid")
                }
                className={`p-2 text-sm transition-colors ${
                  viewMode === "grid"
                    ? "bg-violet-600 text-white"
                    : "bg-base-100 hover:bg-base-200"
                }`}
              >
                <FiGrid />
              </button>

              <button
                onClick={() =>
                  setViewMode("list")
                }
                className={`p-2 text-sm transition-colors ${
                  viewMode === "list"
                    ? "bg-violet-600 text-white"
                    : "bg-base-100 hover:bg-base-200"
                }`}
              >
                <FiList />
              </button>
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-sm btn-ghost text-error gap-1 rounded-xl"
              >
                <FiX /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-base-content/60">
            Showing{" "}
            <span className="font-bold text-base-content">
              {filteredIdeas.length}
            </span>{" "}
            ideas
            {search && (
              <>
                {" "}
                for{" "}
                <span className="font-semibold text-violet-600">
                  {search}
                </span>
              </>
            )}
            {selectedCategory !== "All" && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-violet-600">
                  {selectedCategory}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Ideas Grid */}
        {filteredIdeas.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">
              🔍
            </div>

            <h3 className="text-xl font-bold text-base-content mb-2">
              No ideas found
            </h3>

            <p className="text-base-content/60 mb-6">
              Try adjusting your search or
              filters
            </p>

            <button
              onClick={clearFilters}
              className="btn btn-primary rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea._id}
                idea={idea}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredIdeas.map((idea) => (
              <div
                key={idea._id}
                className="card bg-base-100 border border-base-300 hover:border-violet-300 hover:shadow-lg rounded-2xl p-4 flex flex-row gap-4 transition-all"
              >
                <img
                  src={idea.imageURL}
                  alt={idea.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror =
                      null;

                    e.currentTarget.src = `https://placehold.co/200x200/7c3aed/ffffff?text=${idea.category}`;
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="badge badge-sm font-semibold">
                      {idea.category}
                    </span>

                    <span className="text-xs text-base-content/40">
                      {idea.authorName}
                    </span>
                  </div>

                  <h3 className="font-bold text-base mb-1 truncate">
                    {idea.title}
                  </h3>

                  <p className="text-sm text-base-content/60 line-clamp-2 mb-3">
                    {idea.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-base-content/50">
                    <span>
                      🔥 {idea.upvotes}
                    </span>

                    <span>
                      💬 {idea.comments.length}
                    </span>

                    <span>
                      🔖 {idea.bookmarks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}