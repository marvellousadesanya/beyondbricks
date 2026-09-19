import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Search,
  X,
  Bookmark,
  ArrowUpRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchArticles, formatArticleDate } from "../data/blog";

const CATEGORIES = ["All", "Perspective", "Field Notes", "Craft"];

/* ─────────────────────────────────────────────
   ARTICLE CARD
───────────────────────────────────────────── */
const ArticleCard = ({ article, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{
      duration: 0.7,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="group relative"
  >
    <Link to={`/journal/${article.slug}`} className="block">
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden bg-secondary-dark relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-5 left-5 z-10">
          <span className="inline-block bg-accent-gold/90 text-primary-dark text-[0.6rem] uppercase font-black tracking-[0.25em] px-4 py-2">
            {article.category}
          </span>
        </div>

        {/* Read Time Badge */}
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white/80 text-[0.6rem] uppercase font-bold tracking-[0.2em] px-3 py-2 border border-white/10">
            <Clock size={11} />
            {article.readTime}
          </span>
        </div>

        {/* Bottom Overlay with CTA on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="inline-flex items-center gap-2 text-accent-gold text-xs uppercase tracking-[0.2em] font-bold">
            Read story <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-6 space-y-3">
        <div className="flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.25em] text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {formatArticleDate(article.date)}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>{article.readTime}</span>
        </div>

        <h2 className="text-xl md:text-2xl text-white font-semibold leading-snug group-hover:text-accent-gold transition-colors duration-300">
          {article.title}
        </h2>

        <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        <div className="pt-2">
          <span className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-accent-gold transition-colors duration-300">
            Read article
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
);

/* ─────────────────────────────────────────────
   FEATURED ARTICLE CARD (Large Hero Card)
───────────────────────────────────────────── */
const FeaturedCard = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  >
    <Link
      to={`/journal/${article.slug}`}
      className="group relative block overflow-hidden"
    >
      <div className="aspect-[3/4] sm:aspect-[16/9] lg:aspect-[21/10] overflow-hidden relative bg-secondary-dark">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
        />
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="inline-block bg-accent-gold text-primary-dark text-[0.6rem] uppercase font-black tracking-[0.25em] px-4 py-2">
                Featured story
              </span>
              <span className="text-white/50 text-[0.6rem] uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                <Clock size={12} />
                {article.readTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-[1.05] tracking-tight mb-4">
              {article.title}
            </h2>

            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-xl mb-8 hidden sm:block">
              {article.excerpt}
            </p>

            <span className="inline-flex items-center gap-3 text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-accent-gold transition-colors duration-300">
              Read the full story
              <ArrowRight
                size={16}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

/* ─────────────────────────────────────────────
   JOURNAL INDEX (Listing Page)
───────────────────────────────────────────── */
const JournalIndex = ({ articles }) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const fromArticles = [...new Set(articles.map((a) => a.category))];
    return CATEGORIES.filter(
      (c) => c === "All" || fromArticles.includes(c),
    );
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (activeCategory !== "All") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (query) {
      result = result.filter((a) =>
        `${a.title} ${a.category} ${a.excerpt}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      );
    }
    return result;
  }, [articles, query, activeCategory]);

  const featuredArticle = articles[0];

  if (!featuredArticle) {
    return (
      <main className="pt-40 min-h-screen bg-primary-dark text-center px-6 flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-2 border-accent-gold/30 rounded-full flex items-center justify-center mb-8">
          <Bookmark size={32} className="text-accent-gold/50" />
        </div>
        <p className="text-accent-gold text-xs uppercase tracking-[0.3em] font-bold mb-5">
          The Beyond Bricks Journal
        </p>
        <h1 className="text-4xl md:text-5xl text-white font-semibold tracking-tight">
          New stories are on the way.
        </h1>
        <p className="text-gray-400 mt-5 max-w-md text-lg font-light leading-relaxed">
          Check back soon for the latest perspectives, field notes, and craft
          insights from our studio.
        </p>
        <div className="w-16 h-[1px] bg-accent-gold/30 mt-10" />
      </main>
    );
  }

  return (
    <main className="pt-20 bg-primary-dark min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Background ambience */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-accent-gold/[0.02] rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-20 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 md:mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-accent-gold" />
              <p className="text-accent-gold text-[0.65rem] uppercase tracking-[0.4em] font-bold">
                The Beyond Bricks Journal
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] tracking-tight">
                Ideas with
                <br />
                <span className="text-accent-gold">a foundation.</span>
              </h1>

              <p className="text-gray-400 max-w-md text-base md:text-lg font-light leading-relaxed lg:pb-3">
                Perspectives on architecture, construction, and the considered
                details that turn a project into a lasting legacy.
              </p>
            </div>
          </motion.div>

          {/* Featured Article */}
          <FeaturedCard article={featuredArticle} />
        </div>
      </section>

      {/* ── Articles Grid Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Section Header + Filters */}
        <div className="flex flex-col gap-10 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-accent-gold text-[0.65rem] uppercase tracking-[0.35em] font-bold mb-4">
                From our desk
              </p>
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
                Latest thinking
              </h2>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative w-full md:w-80"
            >
              <Search
                size={16}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-transparent border-b border-white/15 pb-3 pl-7 pr-8 text-sm text-white outline-none placeholder:text-gray-600 focus:border-accent-gold transition-colors duration-300"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </motion.div>
          </div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] font-bold border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-accent-gold text-primary-dark border-accent-gold"
                    : "bg-transparent text-gray-400 border-white/15 hover:border-accent-gold hover:text-accent-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              key={activeCategory + query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
            >
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={24} className="text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg font-light">
                No articles match that search.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-accent-gold text-sm uppercase tracking-[0.15em] font-bold hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-accent-gold text-[0.65rem] uppercase tracking-[0.35em] font-bold mb-6">
              Stay informed
            </p>
            <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-5">
              Never miss a story.
            </h2>
            <p className="text-gray-400 text-base font-light leading-relaxed mb-10">
              Join professionals who receive our latest thinking on
              architecture, construction, and design — delivered to their inbox.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-accent-gold text-primary-dark px-8 py-4 text-xs font-black uppercase tracking-[0.18em] hover:bg-white transition-colors duration-300"
            >
              Get in touch <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

/* ─────────────────────────────────────────────
   ARTICLE DETAIL
───────────────────────────────────────────── */
const ArticleDetail = ({ article, allArticles }) => {
  const relatedArticles = useMemo(() => {
    return allArticles
      .filter((a) => a.id !== article.id && a.category === article.category)
      .slice(0, 2);
  }, [allArticles, article]);

  return (
    <main className="pt-20 bg-primary-dark min-h-screen">
      {/* ── Article Header ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-12 md:pb-16">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2.5 text-gray-400 hover:text-accent-gold text-xs uppercase tracking-[0.2em] transition-colors duration-300 mb-12 md:mb-16"
        >
          <ArrowLeft size={15} /> Back to journal
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block bg-accent-gold/10 text-accent-gold text-[0.6rem] uppercase font-bold tracking-[0.25em] px-4 py-2 border border-accent-gold/20">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-8">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-gray-500 text-xs uppercase tracking-[0.16em]">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-accent-gold/60" />
              {formatArticleDate(article.date)}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-accent-gold/60" />
              {article.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>By {article.author}</span>
          </div>
        </motion.div>
      </section>

      {/* ── Hero Image ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full aspect-[2/1] object-cover"
          />
        </div>
      </motion.div>

      {/* ── Article Body ── */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Excerpt / Lead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-14 pb-14 border-b border-white/10"
        >
          {article.excerpt}
        </motion.p>

        {/* Content Paragraphs */}
        <div className="space-y-8">
          {article.content.split("\n\n").map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-gray-300 leading-[1.9] font-light text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Article Footer Actions */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-accent-gold text-primary-dark px-8 py-4 text-xs font-black uppercase tracking-[0.18em] hover:bg-white transition-colors duration-300"
          >
            Talk to our team <ArrowRight size={15} />
          </Link>

          <Link
            to="/journal"
            className="inline-flex items-center gap-2.5 text-gray-400 hover:text-accent-gold text-xs uppercase tracking-[0.2em] transition-colors duration-300"
          >
            <ArrowLeft size={15} /> Back to all articles
          </Link>
        </div>
      </article>

      {/* ── Related Articles ── */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-14"
            >
              <p className="text-accent-gold text-[0.65rem] uppercase tracking-[0.35em] font-bold mb-4">
                Continue reading
              </p>
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
                Related stories
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">
              {relatedArticles.map((ra, index) => (
                <ArticleCard key={ra.id} article={ra} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

/* ─────────────────────────────────────────────
   BLOG PAGE (Router Component)
───────────────────────────────────────────── */
const BlogPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(() => setError("The journal is temporarily unavailable."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <main className="pt-40 min-h-screen bg-primary-dark text-center flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin mb-6" />
        <p className="text-accent-gold uppercase tracking-[0.3em] text-xs font-bold">
          Loading the journal...
        </p>
      </main>
    );
  if (error)
    return (
      <main className="pt-40 min-h-screen bg-primary-dark text-center text-gray-400 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
          <X size={24} className="text-gray-500" />
        </div>
        <p className="text-lg font-light">{error}</p>
      </main>
    );
  const article = slug ? articles.find((item) => item.slug === slug) : null;
  if (slug && !article)
    return (
      <main className="pt-40 min-h-screen bg-primary-dark text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl text-white font-semibold tracking-tight mb-4">
          Story not found
        </h1>
        <p className="text-gray-400 mb-8 font-light">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/journal"
          className="inline-flex items-center gap-3 bg-accent-gold text-primary-dark px-8 py-4 text-xs font-black uppercase tracking-[0.18em] hover:bg-white transition-colors duration-300"
        >
          <ArrowLeft size={15} /> Return to journal
        </Link>
      </main>
    );
  return article ? (
    <ArticleDetail article={article} allArticles={articles} />
  ) : (
    <JournalIndex articles={articles} />
  );
};

export default BlogPage;
