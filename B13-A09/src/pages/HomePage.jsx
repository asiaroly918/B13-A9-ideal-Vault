import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiStar, FiUsers, FiZap } from "react-icons/fi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import IdeaCard from "../components/IdeaCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { mockIdeas, CATEGORY_ICONS, CATEGORIES } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

// Hero Slides data
const slides = [
  {
    title: "Where Great Ideas",
    highlight: "Come to Life",
    subtitle: "Share your startup vision, get community feedback, and turn concepts into thriving businesses with the IdeaVault community.",
    cta: "Explore Ideas",
    ctaLink: "/ideas",
    bg: "from-violet-900 via-purple-900 to-indigo-900",
    emoji: "🚀",
    badge: "Over 10,000 Ideas Shared",
  },
  {
    title: "Validate Your",
    highlight: "Next Big Idea",
    subtitle: "Connect with innovators, entrepreneurs, and investors. Get real-world feedback before you invest time and money.",
    cta: "Share Your Idea",
    ctaLink: "/add-idea",
    bg: "from-blue-900 via-cyan-900 to-teal-900",
    emoji: "💡",
    badge: "Join 50,000+ Innovators",
  },
  {
    title: "Collaborate &",
    highlight: "Build Together",
    subtitle: "Find co-founders, mentors, and collaborators. The best startups are born from diverse teams with shared visions.",
    cta: "Start Collaborating",
    ctaLink: "/ideas",
    bg: "from-rose-900 via-pink-900 to-purple-900",
    emoji: "🤝",
    badge: "500+ Success Stories",
  },
];

const stats = [
  { value: "10K+", label: "Ideas Shared", icon: <FiZap className="text-yellow-400" /> },
  { value: "50K+", label: "Community Members", icon: <FiUsers className="text-blue-400" /> },
  { value: "500+", label: "Success Stories", icon: <FiStar className="text-amber-400" /> },
  { value: "8", label: "Categories", icon: <HiArrowTrendingUp className="text-green-400" /> },
];

const howItWorks = [
  {
    step: "01",
    icon: "💡",
    title: "Share Your Idea",
    desc: "Post your startup concept with details about the problem you're solving and your proposed solution.",
    color: "from-violet-500 to-purple-600",
  },
  {
    step: "02",
    icon: "🔍",
    title: "Get Community Feedback",
    desc: "Receive constructive comments and upvotes from fellow entrepreneurs and industry experts.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    step: "03",
    icon: "🚀",
    title: "Refine & Launch",
    desc: "Use insights to refine your concept, find collaborators, and turn your idea into reality.",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function HomePage() {
  usePageTitle("Home");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trendingIdeas, setTrendingIdeas] = useState(mockIdeas.slice(0, 6));

  
  const slideIntervalRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrendingIdeas(mockIdeas.slice(0, 6));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // start interval
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, []);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);

    // reset interval safely
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }

    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const prevSlide = () =>
    goToSlide((currentSlide - 1 + slides.length) % slides.length);

  const nextSlide = () =>
    goToSlide((currentSlide + 1) % slides.length);

  return (
    <div className="min-h-screen">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden h-[85vh] min-h-[560px]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-br ${slide.bg} ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background image overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px"
              }}
            />

            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/90 text-sm font-medium">{slide.badge}</span>
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
                    {slide.title}{" "}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                      {slide.highlight}
                    </span>
                  </h1>

                  <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={slide.ctaLink}
                      className="btn btn-lg bg-white text-violet-700 hover:bg-violet-50 border-none font-bold rounded-2xl gap-2 shadow-xl"
                    >
                      {slide.emoji} {slide.cta}
                      <FiArrowRight />
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-lg btn-outline border-white/40 text-white hover:bg-white/10 hover:border-white rounded-2xl font-bold"
                    >
                      Join Free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all"
        >
          <MdKeyboardArrowLeft className="text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all"
        >
          <MdKeyboardArrowRight className="text-2xl" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 py-3 px-4">
                  <span className="text-xl">{stat.icon}</span>
                  <div>
                    <div className="text-white font-black text-lg">{stat.value}</div>
                    <div className="text-white/60 text-xs">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trending Ideas ─── */}
      <section className="py-16 sm:py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <HiArrowTrendingUp className="text-2xl text-orange-500" />
                <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Trending Now</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-base-content">
                Hot Startup Ideas 🔥
              </h2>
              <p className="text-base-content/60 mt-2 max-w-lg">
                Discover the most upvoted ideas from our community this week.
              </p>
            </div>
            <Link
              to="/ideas"
              className="btn btn-outline border-violet-300 text-violet-600 hover:bg-violet-600 hover:text-white hover:border-violet-600 rounded-xl gap-2 font-semibold shrink-0"
            >
              View All Ideas
              <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner size="lg" text="Loading trending ideas..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingIdeas.map((idea) => (
                <IdeaCard key={idea._id} idea={idea} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-indigo-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-violet-600 uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-black text-base-content mt-2">
              How IdeaVault Works
            </h2>
            <p className="text-base-content/60 mt-3 max-w-xl mx-auto">
              Three simple steps to bring your startup idea from concept to community validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-14 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-violet-300 via-purple-300 to-blue-300" />

            {howItWorks.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="card bg-base-100 border border-base-300 hover:border-violet-300 hover:shadow-xl transition-all duration-300 rounded-2xl p-6 text-center h-full">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-4xl shadow-lg mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-base-content/30 mb-2 tracking-widest">{step.step}</div>
                  <h3 className="text-xl font-bold text-base-content mb-3">{step.title}</h3>
                  <p className="text-base-content/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-16 sm:py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-bold text-blue-500 uppercase tracking-wider">Explore by Category</span>
            <h2 className="text-3xl sm:text-4xl font-black text-base-content mt-2">
              Browse Idea Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const catIdeas = mockIdeas.filter((i) => i.category === cat);
              return (
                <Link
                  key={cat}
                  to={`/ideas?category=${cat}`}
                  className="group card bg-base-100 border border-base-300 hover:border-violet-400 hover:shadow-lg rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {CATEGORY_ICONS[cat]}
                  </div>
                  <div className="font-bold text-sm text-base-content mb-1">{cat}</div>
                  <div className="text-xs text-base-content/50">{catIdeas.length} idea{catIdeas.length !== 1 ? "s" : ""}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Testimonials / Community ─── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 to-violet-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-violet-400 uppercase tracking-wider">Community Love</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              What Our Members Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Aisha Thompson",
                role: "Founder, EcoTech Startup",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
                text: "IdeaVault helped me validate my sustainability startup idea before I spent a single dollar. The community feedback was incredibly valuable.",
                stars: 5,
              },
              {
                name: "Raj Patel",
                role: "Serial Entrepreneur",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=raj",
                text: "I found my technical co-founder through IdeaVault. The platform is amazing for connecting with like-minded innovators.",
                stars: 5,
              },
              {
                name: "Sophie Chen",
                role: "Product Manager, TechCorp",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophie",
                text: "The quality of ideas and discussions here is unmatched. I use IdeaVault daily to stay inspired and discover emerging trends.",
                stars: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="card bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-400/40 rounded-2xl p-6 transition-all hover:bg-white/10">
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring-2 ring-violet-500/50">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-white/50 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-16 sm:py-20 bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-10 sm:p-14 shadow-2xl shadow-violet-300/30 dark:shadow-violet-900/30">
            <div className="text-5xl mb-5">🚀</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to Share Your Big Idea?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of innovators who are already building the future. Your idea could be the next big thing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/register"
                className="btn btn-lg bg-white text-violet-700 hover:bg-violet-50 border-none font-bold rounded-2xl gap-2"
              >
                Get Started Free <FiArrowRight />
              </Link>
              <Link
                to="/ideas"
                className="btn btn-lg btn-outline border-white/40 text-white hover:bg-white/10 hover:border-white rounded-2xl font-bold"
              >
                Explore Ideas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
