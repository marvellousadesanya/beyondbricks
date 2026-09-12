import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchArticles, formatArticleDate } from "../data/blog";

const ArticleCard = ({ article, index }) => (
  <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: index * 0.08 }} className="group border-t border-white/15 pt-5">
    <Link to={`/journal/${article.slug}`} className="block">
      <div className="aspect-[1.45] overflow-hidden bg-secondary-dark mb-6"><img src={article.image} alt={article.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" /></div>
      <div className="flex items-center justify-between gap-4 mb-4 text-[0.65rem] uppercase tracking-[0.2em]"><span className="text-accent-gold">{article.category}</span><span className="text-gray-500">{article.readTime}</span></div>
      <h2 className="text-2xl md:text-3xl text-white font-semibold leading-tight group-hover:text-accent-gold transition-colors">{article.title}</h2>
      <p className="mt-4 text-gray-400 font-light leading-relaxed">{article.excerpt}</p>
      <span className="inline-flex items-center gap-2 mt-6 text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-accent-gold transition-colors">Read story <ArrowRight size={15} /></span>
    </Link>
  </motion.article>
);

const JournalIndex = ({ articles }) => {
  const [query, setQuery] = useState("");
  const filteredArticles = useMemo(() => articles.filter((article) => `${article.title} ${article.category} ${article.excerpt}`.toLowerCase().includes(query.toLowerCase())), [articles, query]);
  const featuredArticle = articles[0];

  if (!featuredArticle) {
    return <main className="pt-40 min-h-screen bg-primary-dark text-center px-6"><p className="text-accent-gold text-xs uppercase tracking-[0.3em] font-bold mb-5">The Beyond Bricks Journal</p><h1 className="text-4xl text-white font-semibold">New stories are on the way.</h1><p className="text-gray-400 mt-5">Check back soon for the latest from our studio.</p></main>;
  }

  return (
    <main className="pt-24 bg-primary-dark min-h-screen">
      <section className="border-b border-white/10 bg-secondary-dark/60 overflow-hidden"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid lg:grid-cols-[1fr_1.15fr] gap-12 items-end"><div><p className="text-accent-gold text-xs uppercase tracking-[0.35em] font-bold mb-6">The Beyond Bricks Journal</p><h1 className="text-5xl md:text-7xl font-semibold text-white leading-[0.95] tracking-tight">Ideas with<br /><span className="text-accent-gold">a foundation.</span></h1><p className="text-gray-400 max-w-md mt-8 text-lg font-light leading-relaxed">Perspectives on architecture, construction, and the considered details that turn a project into a lasting legacy.</p></div><Link to={`/journal/${featuredArticle.slug}`} className="group relative min-h-[22rem] overflow-hidden block"><img src={featuredArticle.image} alt={featuredArticle.title} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 md:p-10"><p className="text-accent-gold text-xs uppercase tracking-[0.25em] font-bold mb-3">Featured story</p><h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight max-w-xl">{featuredArticle.title}</h2><span className="inline-flex items-center gap-2 mt-6 text-white text-xs uppercase tracking-[0.2em] font-bold">Read the story <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></span></div></Link></div></section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"><div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"><div><p className="text-accent-gold text-xs uppercase tracking-[0.3em] font-bold mb-4">From our desk</p><h2 className="text-4xl text-white font-semibold">Latest thinking</h2></div><label className="flex items-center gap-3 border-b border-white/20 pb-3 w-full md:w-64 text-gray-400 focus-within:border-accent-gold transition-colors"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the journal" className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600" /></label></div>{filteredArticles.length ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">{filteredArticles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</div> : <p className="text-gray-400 py-12">No stories match that search.</p>}</section>
    </main>
  );
};

const ArticleDetail = ({ article }) => (
  <main className="pt-24 bg-primary-dark min-h-screen"><section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14"><Link to="/journal" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-gold text-xs uppercase tracking-[0.2em] transition-colors"><ArrowLeft size={15} /> Back to journal</Link><div className="mt-14 max-w-4xl"><p className="text-accent-gold text-xs uppercase tracking-[0.3em] font-bold mb-6">{article.category}</p><h1 className="text-5xl md:text-7xl font-semibold text-white leading-[0.98] tracking-tight">{article.title}</h1><div className="flex flex-wrap items-center gap-6 mt-8 text-gray-500 text-xs uppercase tracking-[0.16em]"><span className="flex items-center gap-2"><Calendar size={15} /> {formatArticleDate(article.date)}</span><span className="flex items-center gap-2"><Clock size={15} /> {article.readTime}</span><span>By {article.author}</span></div></div></section><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><img src={article.image} alt={article.title} className="w-full aspect-[2/1] object-cover" /></div><article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"><p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-12">{article.excerpt}</p>{article.content.split("\n\n").map((paragraph) => <p key={paragraph} className="text-gray-400 leading-[1.9] font-light text-lg mb-8">{paragraph}</p>)}<Link to="/contact" className="inline-flex items-center gap-3 mt-8 bg-accent-gold text-primary-dark px-7 py-4 text-xs font-black uppercase tracking-[0.18em] hover:bg-white transition-colors">Talk to our team <ArrowRight size={15} /></Link></article></main>
);

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

  if (isLoading) return <main className="pt-40 min-h-screen bg-primary-dark text-center text-accent-gold uppercase tracking-[0.3em] text-xs">Loading the journal...</main>;
  if (error) return <main className="pt-40 min-h-screen bg-primary-dark text-center text-gray-400">{error}</main>;
  const article = slug ? articles.find((item) => item.slug === slug) : null;
  if (slug && !article) return <main className="pt-40 min-h-screen bg-primary-dark text-center text-white"><h1 className="text-4xl">Story not found</h1><Link to="/journal" className="text-accent-gold inline-block mt-6">Return to journal</Link></main>;
  return article ? <ArticleDetail article={article} /> : <JournalIndex articles={articles} />;
};

export default BlogPage;