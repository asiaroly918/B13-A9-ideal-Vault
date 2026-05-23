export const CATEGORIES = [
  "Tech",
  "Health",
  "AI",
  "Education",
  "Finance",
  "Environment",
  "Social",
  "Entertainment",
];

export const CATEGORY_COLORS = {
  Tech: "badge-primary",
  Health: "badge-success",
  AI: "badge-secondary",
  Education: "badge-info",
  Finance: "badge-warning",
  Environment: "badge-accent",
  Social: "badge-error",
  Entertainment: "badge-neutral",
};

export const CATEGORY_ICONS = {
  Tech: "💻",
  Health: "🏥",
  AI: "🤖",
  Education: "📚",
  Finance: "💰",
  Environment: "🌿",
  Social: "👥",
  Entertainment: "🎬",
};

export const mockIdeas = [
  {
    _id: "1",
    title: "AI-Powered Mental Health Companion",
    shortDescription:
      "A conversational AI that provides 24/7 emotional support and mental health resources.",
    detailedDescription:
      "This platform uses advanced NLP and empathetic AI...",
    category: "AI",
    tags: ["mental-health", "AI"],
    imageURL: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600",
    estimatedBudget: "$500K",
    targetAudience: "Adults aged 18-45",
    problemStatement: "Mental health services are expensive...",
    proposedSolution: "Affordable AI companion...",
    authorName: "Sarah Chen",
    authorEmail: "sarah@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    createdAt: "2024-12-15T10:30:00Z",
    upvotes: 234,
    bookmarks: 89,
    comments: [
      {
        _id: "c1",
        userId: "u2",
        userName: "Alex Rivera",
        userPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        text: "This is an incredible idea!",
        createdAt: "2024-12-16T09:00:00Z",
      },
    ],
  },

  {
    _id: "2",
    title: "EduChain – Decentralized Learning Credentials",
    shortDescription: "Blockchain verified certificates for education.",
    detailedDescription:
      "A blockchain system for tamper-proof educational certificates.",
    category: "Education",
    tags: ["blockchain", "education"],
    imageURL:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop",
    estimatedBudget: "$750K",
    targetAudience: "Students and universities",
    problemStatement: "Certificate fraud is common.",
    proposedSolution: "Blockchain verified credentials.",
    authorName: "Marcus Johnson",
    authorEmail: "marcus@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    createdAt: "2024-12-10T14:20:00Z",
    upvotes: 187,
    bookmarks: 62,
    comments: [],
  },

  {
    _id: "3",
    title: "GreenRoute – Carbon-Neutral Delivery Network",
    shortDescription: "Eco-friendly delivery system.",
    detailedDescription:
      "Electric bikes + solar hubs for green delivery.",
    category: "Environment",
    tags: ["sustainability", "delivery"],
    imageURL:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    estimatedBudget: "$2M",
    targetAudience: "Urban consumers",
    problemStatement: "High CO2 emissions from delivery.",
    proposedSolution: "Electric delivery network.",
    authorName: "Priya Patel",
    authorEmail: "priya@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    createdAt: "2024-12-08T11:15:00Z",
    upvotes: 312,
    bookmarks: 145,
    comments: [],
  },
];