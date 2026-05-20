import { Link } from "react-router-dom";
import { FiArrowUpRight, FiMessageSquare, FiBookmark, FiClock } from "react-icons/fi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { Idea, CATEGORY_COLORS, CATEGORY_ICONS } from "../data/mockData";
import { formatDistanceToNow } from "date-fns";

interface IdeaCardProps {
  idea: Idea;
  compact?: boolean;
}

export default function IdeaCard({ idea, compact = false }: IdeaCardProps) {
  const timeAgo = formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true });

  return (
    <div className="idea-card card bg-base-100 border border-base-300 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20 rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Card Image */}
      <figure className="relative h-44 overflow-hidden bg-base-200">
        <img
          src={idea.imageURL}
          alt={idea.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/7c3aed/ffffff?text=${encodeURIComponent(idea.title.slice(0, 2))}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`badge ${CATEGORY_COLORS[idea.category]} badge-sm font-semibold gap-1`}>
            <span>{CATEGORY_ICONS[idea.category]}</span>
            {idea.category}
          </span>
        </div>
        {idea.upvotes > 200 && (
          <div className="absolute top-3 right-3 badge badge-warning badge-sm gap-1 font-semibold">
            <HiArrowTrendingUp className="text-xs" /> Hot
          </div>
        )}
      </figure>

      <div className="card-body p-5 flex flex-col flex-1">
        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <div className="avatar">
            <div className="w-7 h-7 rounded-full ring-1 ring-base-300">
              <img
                src={idea.authorPhoto}
                alt={idea.authorName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${idea.authorName}`;
                }}
              />
            </div>
          </div>
          <span className="text-xs text-base-content/60 font-medium">{idea.authorName}</span>
          <span className="ml-auto flex items-center gap-1 text-xs text-base-content/40">
            <FiClock className="text-xs" />
            {timeAgo}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base leading-snug mb-2 line-clamp-2 text-base-content">
          {idea.title}
        </h3>

        {/* Description */}
        {!compact && (
          <p className="text-sm text-base-content/60 leading-relaxed line-clamp-2 mb-3 flex-1">
            {idea.shortDescription}
          </p>
        )}

        {/* Tags */}
        {idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {idea.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge badge-ghost badge-xs font-medium text-violet-600 bg-violet-50 dark:bg-violet-900/20 border-violet-200">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-base-200">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-base-content/50">
              <HiArrowTrendingUp className="text-violet-500" />
              <span className="font-semibold text-base-content">{idea.upvotes}</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-base-content/50">
              <FiMessageSquare className="text-blue-400" />
              <span className="font-semibold text-base-content">{idea.comments.length}</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-base-content/50">
              <FiBookmark className="text-amber-400" />
              <span className="font-semibold text-base-content">{idea.bookmarks}</span>
            </span>
          </div>

          <Link
            to={`/ideas/${idea._id}`}
            className="btn btn-xs btn-primary gap-1 rounded-lg font-semibold bg-violet-600 hover:bg-violet-700 border-none text-white"
          >
            View Details
            <FiArrowUpRight className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}
