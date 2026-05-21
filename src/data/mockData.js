export type Category = "Tech" | "Health" | "AI" | "Education" | "Finance" | "Environment" | "Social" | "Entertainment";

export interface Idea {
  _id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  category: Category;
  tags: string[];
  imageURL: string;
  estimatedBudget?: string;
  targetAudience: string;
  problemStatement: string;
  proposedSolution: string;
  authorName: string;
  authorEmail: string;
  authorPhoto: string;
  createdAt: string;
  upvotes: number;
  bookmarks: number;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  createdAt: string;
}

export const CATEGORIES: Category[] = ["Tech", "Health", "AI", "Education", "Finance", "Environment", "Social", "Entertainment"];

export const CATEGORY_COLORS: Record<Category, string> = {
  Tech: "badge-primary",
  Health: "badge-success",
  AI: "badge-secondary",
  Education: "badge-info",
  Finance: "badge-warning",
  Environment: "badge-accent",
  Social: "badge-error",
  Entertainment: "badge-neutral",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Tech: "💻",
  Health: "🏥",
  AI: "🤖",
  Education: "📚",
  Finance: "💰",
  Environment: "🌿",
  Social: "👥",
  Entertainment: "🎬",
};

export const mockIdeas: Idea[] = [
  {
    _id: "1",
    title: "AI-Powered Mental Health Companion",
    shortDescription: "A conversational AI that provides 24/7 emotional support and mental health resources.",
    detailedDescription: "This platform uses advanced NLP and empathetic AI to provide personalized mental health support. Users can chat with the AI companion at any time, track their mood over time, and receive tailored coping strategies. The system also connects users with licensed therapists when professional help is needed.",
    category: "AI",
    tags: ["mental-health", "AI", "wellness", "therapy"],
    imageURL: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop",
    estimatedBudget: "$500K",
    targetAudience: "Adults aged 18-45 experiencing stress, anxiety, or depression",
    problemStatement: "Mental health services are expensive and inaccessible for millions of people worldwide.",
    proposedSolution: "An affordable AI-powered companion that bridges the gap between professional therapy and self-help resources.",
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
        text: "This is an incredible idea! The mental health space desperately needs innovation like this.",
        createdAt: "2024-12-16T09:00:00Z",
      },
    ],
  },
  {
    _id: "2",
    title: "EduChain – Decentralized Learning Credentials",
    shortDescription: "Blockchain-verified educational credentials that can't be forged or lost.",
    detailedDescription: "EduChain creates tamper-proof digital certificates for educational achievements using blockchain technology. Employers can instantly verify credentials, students own their learning history forever, and institutions reduce administrative overhead.",
    category: "Education",
    tags: ["blockchain", "education", "credentials", "web3"],
    imageURL: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop",
    estimatedBudget: "$750K",
    targetAudience: "Universities, online learning platforms, employers, and students",
    problemStatement: "Educational credential fraud costs businesses billions and traditional certificates are easily lost or forged.",
    proposedSolution: "A blockchain-based system where all credentials are cryptographically verified and permanently stored.",
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
    shortDescription: "Last-mile delivery using electric bikes and solar-powered micro-hubs.",
    detailedDescription: "GreenRoute reimagines urban logistics with a network of solar-powered micro-fulfillment centers and electric cargo bikes. The system uses AI to optimize delivery routes, reducing carbon emissions by up to 90% compared to traditional delivery services.",
    category: "Environment",
    tags: ["sustainability", "delivery", "electric", "logistics"],
    imageURL: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    estimatedBudget: "$2M",
    targetAudience: "Urban consumers, e-commerce businesses, and city governments",
    problemStatement: "Last-mile delivery is the most polluting segment of supply chains, contributing 30% of urban CO2 emissions.",
    proposedSolution: "A network of solar-powered micro-hubs and electric cargo bikes with AI route optimization.",
    authorName: "Priya Patel",
    authorEmail: "priya@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    createdAt: "2024-12-08T11:15:00Z",
    upvotes: 312,
    bookmarks: 145,
    comments: [],
  },
  {
    _id: "4",
    title: "MicroInvest – Fractional Real Estate for Everyone",
    shortDescription: "Invest in commercial real estate with as little as $10 through fractional ownership.",
    detailedDescription: "MicroInvest democratizes real estate investment by allowing anyone to buy fractional shares of commercial properties. AI handles property selection, management, and dividend distribution, making passive real estate income accessible to everyone.",
    category: "Finance",
    tags: ["fintech", "real-estate", "investment", "fractional"],
    imageURL: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&auto=format&fit=crop",
    estimatedBudget: "$3M",
    targetAudience: "Young adults aged 22-40 interested in building wealth",
    problemStatement: "Real estate investment requires large capital, excluding most people from one of the best wealth-building assets.",
    proposedSolution: "Fractional ownership platform that allows micro-investments starting at $10 with AI-managed portfolios.",
    authorName: "David Kim",
    authorEmail: "david@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    createdAt: "2024-12-05T16:45:00Z",
    upvotes: 198,
    bookmarks: 77,
    comments: [],
  },
  {
    _id: "5",
    title: "HealthSync – Unified Medical Records Platform",
    shortDescription: "One secure platform for all your medical records, accessible by any doctor worldwide.",
    detailedDescription: "HealthSync creates a patient-controlled medical record system that works across all healthcare providers globally. Using zero-knowledge encryption, patients own their data and can share it with any provider instantly, eliminating duplicate tests and medical errors.",
    category: "Health",
    tags: ["healthcare", "records", "privacy", "interoperability"],
    imageURL: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop",
    estimatedBudget: "$5M",
    targetAudience: "Patients, hospitals, clinics, and insurance companies",
    problemStatement: "Fragmented medical records lead to duplicate tests, medical errors, and poor continuity of care.",
    proposedSolution: "A unified, patient-controlled medical record platform with end-to-end encryption and global accessibility.",
    authorName: "Elena Rodriguez",
    authorEmail: "elena@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena",
    createdAt: "2024-12-01T09:30:00Z",
    upvotes: 276,
    bookmarks: 103,
    comments: [],
  },
  {
    _id: "6",
    title: "TalentMesh – Skills-First Hiring Platform",
    shortDescription: "Replace resumes with skill assessments to find the best talent regardless of background.",
    detailedDescription: "TalentMesh eliminates bias in hiring by replacing traditional resumes with anonymous skill assessments. Companies post challenges, candidates complete them, and AI matches top performers with opportunities based purely on demonstrated ability.",
    category: "Tech",
    tags: ["hiring", "skills", "diversity", "recruitment"],
    imageURL: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop",
    estimatedBudget: "$1.5M",
    targetAudience: "Companies hiring tech talent and job seekers without traditional credentials",
    problemStatement: "Traditional hiring is biased and ineffective, causing companies to miss top talent from non-traditional backgrounds.",
    proposedSolution: "Skills-based anonymous assessment platform that matches talent to opportunities purely on merit.",
    authorName: "James Wilson",
    authorEmail: "james@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    createdAt: "2024-11-28T13:20:00Z",
    upvotes: 421,
    bookmarks: 156,
    comments: [],
  },
  {
    _id: "7",
    title: "CommunityGrid – Neighborhood Energy Sharing",
    shortDescription: "Peer-to-peer solar energy trading within neighborhoods to reduce energy costs.",
    detailedDescription: "CommunityGrid enables households with solar panels to sell excess energy directly to their neighbors through a smart grid network. Using IoT sensors and blockchain for transparent billing, communities can reduce energy costs by 40% while accelerating renewable adoption.",
    category: "Environment",
    tags: ["solar", "energy", "peer-to-peer", "IoT"],
    imageURL: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop",
    estimatedBudget: "$4M",
    targetAudience: "Homeowners with solar panels and energy-conscious communities",
    problemStatement: "Excess solar energy is sold back to utilities at low prices while neighbors pay high rates for grid electricity.",
    proposedSolution: "A peer-to-peer energy trading platform that lets solar homeowners sell directly to neighbors at fair prices.",
    authorName: "Tom Anderson",
    authorEmail: "tom@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom",
    createdAt: "2024-11-25T10:00:00Z",
    upvotes: 189,
    bookmarks: 71,
    comments: [],
  },
  {
    _id: "8",
    title: "LearnLoop – Adaptive Microlearning for Professionals",
    shortDescription: "5-minute daily skill-building sessions personalized by AI to your career goals.",
    detailedDescription: "LearnLoop delivers bite-sized, adaptive learning content based on your career goals, current skill gaps, and available time. The AI engine continuously adjusts content difficulty and topics based on your progress, ensuring optimal learning efficiency for busy professionals.",
    category: "Education",
    tags: ["learning", "microlearning", "career", "AI"],
    imageURL: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop",
    estimatedBudget: "$800K",
    targetAudience: "Working professionals aged 25-50 looking to upskill",
    problemStatement: "Professionals lack time for traditional education but risk becoming obsolete without continuous learning.",
    proposedSolution: "AI-powered microlearning platform delivering personalized 5-minute daily lessons aligned with career goals.",
    authorName: "Nina Zhao",
    authorEmail: "nina@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=nina",
    createdAt: "2024-11-20T15:30:00Z",
    upvotes: 267,
    bookmarks: 98,
    comments: [],
  },
  {
    _id: "9",
    title: "SocialImpact – Crowdfunding for Community Projects",
    shortDescription: "Hyper-local crowdfunding platform for neighborhood improvement projects.",
    detailedDescription: "SocialImpact enables communities to crowdfund local improvement projects like parks, murals, and community centers. With built-in project management, transparent fund tracking, and volunteer coordination, it empowers citizens to take action on local issues.",
    category: "Social",
    tags: ["crowdfunding", "community", "social-impact", "local"],
    imageURL: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&auto=format&fit=crop",
    estimatedBudget: "$600K",
    targetAudience: "Community organizations, local governments, and engaged citizens",
    problemStatement: "Local improvement projects lack funding and coordination despite strong community interest.",
    proposedSolution: "A hyper-local crowdfunding platform with built-in project management and volunteer coordination.",
    authorName: "Maria Santos",
    authorEmail: "maria@example.com",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    createdAt: "2024-11-15T08:45:00Z",
    upvotes: 143,
    bookmarks: 54,
    comments: [],
  },
];
