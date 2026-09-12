import React, { useEffect, useState } from "react";
import { LockKeyhole, LogOut, Plus, Trash2, X } from "lucide-react";
import { createArticle, deleteArticle, fetchArticles, formatArticleDate } from "../data/blog";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const emptyForm = { title: "", category: "Perspective", excerpt: "", content: "", image: "", readTime: "5 min read" };

const AdminPage = () => {
  const [session, setSession] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [articles, setArticles] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setIsLoading(false); return undefined; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setIsLoading(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    fetchArticles({ includeUnpublished: true }).then(setArticles).catch(() => setMessage("Could not load your articles."));
  }, [session]);

  const authenticate = async (event) => {
    event.preventDefault(); setMessage("");
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) setMessage(error.message);
  };
  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const publishArticle = async (event) => {
    event.preventDefault(); setMessage("");
    const slug = form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    try {
      const article = await createArticle({ ...form, slug }, session.user.id);
      setArticles([article, ...articles]); setForm(emptyForm); setIsWriting(false); setMessage("Article published to the journal.");
    } catch (error) { setMessage(error.message || "Could not publish this article."); }
  };
  const removeArticle = async (id) => {
    try { await deleteArticle(id); setArticles(articles.filter((article) => article.id !== id)); }
    catch (error) { setMessage(error.message || "Could not delete this article."); }
  };

  if (isLoading) return <main className="min-h-screen bg-primary-dark flex items-center justify-center text-accent-gold text-xs uppercase tracking-[0.3em]">Opening studio...</main>;
  if (!isSupabaseConfigured) return <main className="min-h-screen bg-primary-dark flex items-center justify-center px-6"><div className="max-w-md text-center"><LockKeyhole className="text-accent-gold mx-auto mb-6" size={30} /><h1 className="text-3xl text-white font-semibold">Studio setup required</h1><p className="text-gray-400 leading-relaxed mt-4">Add your Supabase URL and anon key to the environment before using the private journal studio.</p></div></main>;
  if (!session) return <main className="min-h-screen bg-primary-dark flex items-center justify-center px-6"><form onSubmit={authenticate} className="w-full max-w-md border border-white/10 bg-secondary-dark/50 p-8 md:p-12"><LockKeyhole className="text-accent-gold mb-8" size={28} /><p className="text-accent-gold text-xs uppercase tracking-[0.3em] font-bold mb-4">Private workspace</p><h1 className="text-3xl text-white font-semibold mb-3">Beyond Bricks Studio</h1><p className="text-gray-400 text-sm leading-relaxed mb-8">Sign in with your Supabase admin account to manage the journal.</p><input required type="email" value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} placeholder="Admin email" className="w-full bg-black/20 border border-white/15 px-4 py-4 text-white outline-none focus:border-accent-gold mb-3" /><input required type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} placeholder="Password" className="w-full bg-black/20 border border-white/15 px-4 py-4 text-white outline-none focus:border-accent-gold" />{message && <p className="text-red-400 text-sm mt-3">{message}</p>}<button className="w-full mt-5 bg-accent-gold text-primary-dark py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-colors">Sign in</button></form></main>;

  return <main className="min-h-screen bg-primary-dark text-white"><header className="border-b border-white/10 bg-secondary-dark/50"><div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between"><div><p className="text-accent-gold text-[0.65rem] uppercase tracking-[0.3em] font-bold">Beyond Bricks</p><h1 className="text-2xl font-semibold mt-1">Journal Studio</h1></div><button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs uppercase tracking-wider"><LogOut size={15} /> Sign out</button></div></header><div className="max-w-6xl mx-auto px-6 py-12"><div className="flex items-center justify-between mb-10"><div><p className="text-gray-500 text-sm">{articles.length} published {articles.length === 1 ? "story" : "stories"}</p><h2 className="text-4xl font-semibold mt-2">Your journal</h2></div><button onClick={() => { setIsWriting(true); setMessage(""); }} className="flex items-center gap-2 bg-accent-gold text-primary-dark px-5 py-3 text-xs font-black uppercase tracking-wider hover:bg-white transition-colors"><Plus size={16} /> New article</button></div>{message && <p className="text-accent-gold text-sm mb-6">{message}</p>}{isWriting && <form onSubmit={publishArticle} className="border border-accent-gold/40 bg-secondary-dark/40 p-6 md:p-8 mb-10"><div className="flex justify-between items-center mb-8"><h3 className="text-xl font-semibold">Write an article</h3><button type="button" onClick={() => setIsWriting(false)} className="text-gray-400 hover:text-white"><X size={20} /></button></div><div className="grid md:grid-cols-2 gap-5"><input required name="title" value={form.title} onChange={updateField} placeholder="Article title" className="md:col-span-2 field" /><input required name="category" value={form.category} onChange={updateField} placeholder="Category" className="field" /><input name="readTime" value={form.readTime} onChange={updateField} placeholder="5 min read" className="field" /><input name="image" value={form.image} onChange={updateField} placeholder="Image URL" className="md:col-span-2 field" /><textarea required name="excerpt" value={form.excerpt} onChange={updateField} placeholder="Short excerpt" rows="3" className="md:col-span-2 field resize-y" /><textarea required name="content" value={form.content} onChange={updateField} placeholder="Article body. Separate paragraphs with a blank line." rows="10" className="md:col-span-2 field resize-y" /></div><button className="mt-6 bg-accent-gold text-primary-dark px-6 py-3 text-xs font-black uppercase tracking-wider hover:bg-white transition-colors">Publish article</button></form>}<div className="space-y-3">{articles.map((article) => <div key={article.id} className="flex items-center justify-between gap-5 border-b border-white/10 py-5"><div><p className="text-accent-gold text-[0.65rem] uppercase tracking-[0.2em]">{article.category}</p><h3 className="text-lg font-medium mt-1">{article.title}</h3><p className="text-gray-500 text-sm mt-1">{formatArticleDate(article.date)}</p></div><button onClick={() => removeArticle(article.id)} className="text-gray-500 hover:text-red-400 p-2" title="Delete article"><Trash2 size={17} /></button></div>)}</div></div></main>;
};

export default AdminPage;
