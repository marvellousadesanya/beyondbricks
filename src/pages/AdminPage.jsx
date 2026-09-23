import React, { useEffect, useState, useRef } from "react";
import {
  LockKeyhole,
  LogOut,
  Plus,
  Trash2,
  X,
  Edit3,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Minus,
  Eye,
  PenTool,
  UploadCloud,
  Link2,
  Image as ImageIcon,
} from "lucide-react";
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  formatArticleDate,
  updateArticle,
  uploadArticleImage,
} from "../data/blog";
import ArticleRenderer from "../components/ArticleRenderer";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const emptyForm = {
  title: "",
  category: "Perspective",
  excerpt: "",
  content: "",
  image: "",
  readTime: "5 min read",
};

const AdminPage = () => {
  const [session, setSession] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [articles, setArticles] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editorTab, setEditorTab] = useState("write"); // 'write' | 'preview'
  const [imageMode, setImageMode] = useState("upload"); // 'upload' | 'url'
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // 'info' | 'success' | 'error'
  const [isLoading, setIsLoading] = useState(true);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) =>
      setSession(nextSession)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    fetchArticles({ includeUnpublished: true })
      .then(setArticles)
      .catch(() => {
        setMessage("Could not load your articles.");
        setMessageType("error");
      });
  }, [session]);

  const authenticate = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword(credentials);
    setIsSubmitting(false);
    if (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const updateField = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const insertFormatting = (prefix, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.content;
    const selected = text.substring(start, end) || "heading";
    const before = text.substring(0, start);
    const after = text.substring(end);
    const replacement = `${prefix}${selected}${suffix}`;
    const updated = before + replacement + after;
    setForm({ ...form, content: updated });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 10);
  };

  const startNewArticle = () => {
    setEditingArticleId(null);
    setEditorTab("write");
    setImageMode("upload");
    setForm(emptyForm);
    setIsWriting(true);
    setMessage("");
  };

  const startEditing = (article) => {
    setEditingArticleId(article.id);
    setEditorTab("write");
    setImageMode("upload");
    setForm({
      title: article.title || "",
      category: article.category || "Perspective",
      readTime: article.readTime || article.read_time || "5 min read",
      image: article.image || "",
      excerpt: article.excerpt || "",
      content: article.content || "",
    });
    setIsWriting(true);
    setMessage("");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const cancelEditor = () => {
    setIsWriting(false);
    setEditingArticleId(null);
    setEditorTab("write");
    setImageMode("upload");
    setForm(emptyForm);
    setMessage("");
  };

  const handleImageFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file (JPG, PNG, WebP).");
      setMessageType("error");
      return;
    }
    setIsUploadingImage(true);
    setMessage("");
    try {
      const imageUrl = await uploadArticleImage(file);
      setForm((prev) => ({ ...prev, image: imageUrl }));
      setMessage("Cover image uploaded and optimized.");
      setMessageType("success");
    } catch (err) {
      console.error("Image upload failed:", err);
      setMessage(err.message || "Failed to process image.");
      setMessageType("error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) handleImageFile(file);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    try {
      if (editingArticleId) {
        const updated = await updateArticle(editingArticleId, { ...form, slug });
        setArticles((prev) =>
          prev.map((art) => (art.id === editingArticleId ? { ...art, ...updated } : art))
        );
        setMessage("Article updated successfully.");
        setMessageType("success");
        setIsWriting(false);
        setEditingArticleId(null);
        setForm(emptyForm);
      } else {
        const article = await createArticle({ ...form, slug }, session.user.id);
        setArticles([article, ...articles]);
        setMessage("Article published to the journal.");
        setMessageType("success");
        setIsWriting(false);
        setForm(emptyForm);
      }
    } catch (error) {
      setMessage(
        error.message || `Could not ${editingArticleId ? "update" : "publish"} this article.`
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeArticle = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title || "this article"}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((article) => article.id !== id));
      if (editingArticleId === id) {
        cancelEditor();
      }
      setMessage("Article deleted successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message || "Could not delete this article.");
      setMessageType("error");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-primary-dark flex items-center justify-center text-accent-gold text-xs uppercase tracking-[0.3em] font-medium">
        <Loader2 className="animate-spin mr-3 text-accent-gold" size={18} />
        Opening studio...
      </main>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="min-h-screen bg-primary-dark flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <LockKeyhole className="text-accent-gold mx-auto mb-6" size={30} />
          <h1 className="text-3xl text-white font-semibold">Studio setup required</h1>
          <p className="text-gray-400 leading-relaxed mt-4">
            Add your Supabase URL and anon key to the environment before using the private journal
            studio.
          </p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-primary-dark flex items-center justify-center px-6">
        <form
          onSubmit={authenticate}
          className="w-full max-w-md border border-white/10 bg-secondary-dark/50 p-8 md:p-12 shadow-2xl backdrop-blur-md"
        >
          <LockKeyhole className="text-accent-gold mb-8" size={28} />
          <p className="text-accent-gold text-xs uppercase tracking-[0.3em] font-bold mb-4">
            Private workspace
          </p>
          <h1 className="text-3xl text-white font-semibold mb-3">Beyond Bricks Studio</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Sign in with your Supabase admin account to manage the journal.
          </p>
          <input
            required
            type="email"
            value={credentials.email}
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            placeholder="Admin email"
            className="w-full bg-black/20 border border-white/15 px-4 py-4 text-white outline-none focus:border-accent-gold mb-3 transition-colors"
          />
          <input
            required
            type="password"
            value={credentials.password}
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            placeholder="Password"
            className="w-full bg-black/20 border border-white/15 px-4 py-4 text-white outline-none focus:border-accent-gold transition-colors"
          />
          {message && (
            <p className="text-red-400 text-sm mt-3 flex items-center gap-1.5">
              <AlertCircle size={15} />
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-accent-gold text-primary-dark py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-primary-dark text-white selection:bg-accent-gold selection:text-primary-dark">
      {/* Studio Header */}
      <header className="border-b border-white/10 bg-secondary-dark/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-accent-gold text-[0.65rem] uppercase tracking-[0.3em] font-bold">
              Beyond Bricks
            </p>
            <h1 className="text-xl md:text-2xl font-semibold mt-0.5">Journal Studio</h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/journal"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-gray-400 hover:text-white text-xs uppercase tracking-wider transition-colors"
            >
              <ExternalLink size={14} /> Public Journal
            </a>
            <button
              onClick={() => supabase.auth.signOut()}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-xs uppercase tracking-wider transition-colors border border-white/10 hover:border-red-400/40 px-3 py-2"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        {/* Studio Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">
              Editorial Dashboard
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mt-1">Your Journal Stories</h2>
            <p className="text-gray-500 text-sm mt-1">
              {articles.length} {articles.length === 1 ? "article" : "articles"} in database
            </p>
          </div>
          {!isWriting ? (
            <button
              onClick={startNewArticle}
              className="self-start sm:self-auto flex items-center gap-2 bg-accent-gold text-primary-dark px-5 py-3.5 text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-accent-gold/10"
            >
              <Plus size={16} /> New article
            </button>
          ) : (
            <button
              onClick={cancelEditor}
              className="self-start sm:self-auto flex items-center gap-2 border border-white/20 text-gray-300 hover:text-white px-5 py-3.5 text-xs uppercase tracking-wider hover:border-white/40 transition-colors"
            >
              <X size={16} /> Close editor
            </button>
          )}
        </div>

        {/* Global Feedback Message */}
        {message && (
          <div
            className={`p-4 mb-8 text-sm flex items-center gap-2.5 border ${
              messageType === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : messageType === "success"
                ? "bg-accent-gold/10 border-accent-gold/30 text-accent-gold"
                : "bg-white/5 border-white/10 text-gray-300"
            }`}
          >
            {messageType === "error" ? (
              <AlertCircle size={18} className="shrink-0" />
            ) : (
              <CheckCircle2 size={18} className="shrink-0" />
            )}
            <span>{message}</span>
          </div>
        )}

        {/* Article Editor Form (Create or Edit) */}
        {isWriting && (
          <form
            onSubmit={handleFormSubmit}
            className="border-2 border-accent-gold/50 bg-secondary-dark/60 backdrop-blur-md p-6 md:p-10 mb-12 shadow-2xl relative transition-all"
          >
            <div className="flex justify-between items-start mb-8 pb-4 border-b border-white/10">
              <div>
                <span className="text-accent-gold text-[0.65rem] uppercase tracking-[0.25em] font-bold flex items-center gap-1.5">
                  <Sparkles size={13} />
                  {editingArticleId ? "Editing Published Article" : "Drafting New Article"}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold mt-1.5">
                  {editingArticleId ? "Edit article" : "Write an article"}
                </h3>
                {editingArticleId && (
                  <p className="text-gray-400 text-xs mt-1">
                    Modifying existing entry. Changes will update immediately on the public journal.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={cancelEditor}
                className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded transition-colors"
                title="Cancel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-[0.68rem] uppercase tracking-[0.2em] mb-2 font-medium">
                  Article Title *
                </label>
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  placeholder="e.g. The future of luxury construction"
                  className="field"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-[0.68rem] uppercase tracking-[0.2em] mb-2 font-medium">
                  Category *
                </label>
                <input
                  required
                  list="categories-list"
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  placeholder="e.g. Perspective, Field Notes, Craft"
                  className="field"
                />
                <datalist id="categories-list">
                  <option value="Perspective" />
                  <option value="Field Notes" />
                  <option value="Craft" />
                  <option value="Architecture" />
                  <option value="Innovation" />
                </datalist>
              </div>

              <div>
                <label className="block text-gray-400 text-[0.68rem] uppercase tracking-[0.2em] mb-2 font-medium">
                  Read Time
                </label>
                <input
                  name="readTime"
                  value={form.readTime}
                  onChange={updateField}
                  placeholder="e.g. 5 min read"
                  className="field"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="text-gray-400 text-[0.68rem] uppercase tracking-[0.2em] font-medium">
                    Cover Image
                  </label>
                  {/* Mode switcher: Upload vs URL */}
                  <div className="flex items-center bg-black/40 p-0.5 border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setImageMode("upload")}
                      className={`flex items-center gap-1.5 px-3 py-1 uppercase tracking-wider text-[0.65rem] transition-colors ${
                        imageMode === "upload"
                          ? "bg-accent-gold text-primary-dark font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <UploadCloud size={12} /> Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode("url")}
                      className={`flex items-center gap-1.5 px-3 py-1 uppercase tracking-wider text-[0.65rem] transition-colors ${
                        imageMode === "url"
                          ? "bg-accent-gold text-primary-dark font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Link2 size={12} /> Image URL
                    </button>
                  </div>
                </div>

                {imageMode === "upload" ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {form.image ? (
                      /* Image preview with replace / remove controls */
                      <div className="relative border border-white/20 bg-black/40 overflow-hidden group">
                        <img
                          src={form.image}
                          alt="Cover preview"
                          className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs text-white/90 font-medium bg-black/60 px-3 py-1 border border-white/15 backdrop-blur-sm flex items-center gap-1.5">
                              <CheckCircle2 size={13} className="text-accent-gold" />
                              Cover image loaded
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploadingImage}
                                className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 uppercase tracking-wider font-semibold border border-white/20 backdrop-blur-sm transition-colors flex items-center gap-1.5"
                              >
                                <UploadCloud size={13} />
                                Replace
                              </button>
                              <button
                                type="button"
                                onClick={() => setForm({ ...form, image: "" })}
                                className="bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs px-3 py-1.5 uppercase tracking-wider font-semibold border border-red-500/30 backdrop-blur-sm transition-colors flex items-center gap-1.5"
                              >
                                <Trash2 size={13} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Drag & Drop Zone */
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingOver(true);
                        }}
                        onDragLeave={() => setIsDraggingOver(false)}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed p-8 md:p-10 text-center cursor-pointer transition-all ${
                          isDraggingOver
                            ? "border-accent-gold bg-accent-gold/10"
                            : "border-white/20 bg-black/20 hover:border-accent-gold/60 hover:bg-black/30"
                        } relative`}
                      >
                        {isUploadingImage ? (
                          <div className="flex flex-col items-center justify-center py-4">
                            <Loader2 size={32} className="animate-spin text-accent-gold mb-3" />
                            <p className="text-sm font-semibold text-white">Processing image...</p>
                            <p className="text-xs text-gray-400 mt-1">Optimizing for fast loading</p>
                          </div>
                        ) : (
                          <>
                            <UploadCloud
                              size={36}
                              className="text-accent-gold mx-auto mb-3 transition-transform group-hover:scale-110"
                            />
                            <p className="text-sm font-semibold text-white">
                              Click to upload or drag & drop cover image
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Supports JPG, PNG, WebP (automatically optimized)
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Direct URL Mode */
                  <div>
                    <input
                      name="image"
                      value={form.image}
                      onChange={updateField}
                      placeholder="https://images.unsplash.com/photo-... (or paste any image URL)"
                      className="field"
                    />
                    {form.image && (
                      <div className="mt-3 flex items-center gap-3">
                        <img
                          src={form.image}
                          alt="Preview"
                          className="w-20 h-14 object-cover border border-white/20 bg-black/40"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <span className="text-gray-400 text-xs">Live image preview</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-[0.68rem] uppercase tracking-[0.2em] mb-2 font-medium">
                  Short Excerpt *
                </label>
                <textarea
                  required
                  name="excerpt"
                  value={form.excerpt}
                  onChange={updateField}
                  placeholder="Brief synopsis shown on cards and previews..."
                  rows="3"
                  className="field resize-y"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <label className="text-gray-400 text-[0.68rem] uppercase tracking-[0.2em] font-medium">
                    Article Body *
                  </label>
                  {/* Write / Preview Tab Switcher */}
                  <div className="flex items-center bg-black/40 p-1 border border-white/10 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setEditorTab("write")}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                        editorTab === "write"
                          ? "bg-accent-gold text-primary-dark font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <PenTool size={12} /> Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab("preview")}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                        editorTab === "preview"
                          ? "bg-accent-gold text-primary-dark font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Eye size={12} /> Live Preview
                    </button>
                  </div>
                </div>

                {editorTab === "write" ? (
                  <>
                    {/* Formatting Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-black/40 border border-white/15 border-b-0">
                      <span className="text-[0.6rem] uppercase tracking-wider text-gray-500 font-bold px-1.5 mr-1 hidden sm:inline">
                        Toolbar:
                      </span>
                      <button
                        type="button"
                        onClick={() => insertFormatting("\n\n## ", "\n")}
                        title="Add Section Heading (H2)"
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300 hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <Heading2 size={13} />
                        <span className="text-[0.65rem]">H2</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("\n\n### ", "\n")}
                        title="Add Subheading (H3)"
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300 hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <Heading3 size={13} />
                        <span className="text-[0.65rem]">H3</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("**", "**")}
                        title="Bold Text"
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300 hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <Bold size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("*", "*")}
                        title="Italic Text"
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300 hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <Italic size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("\n- ")}
                        title="Bullet List Item"
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300 hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <List size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("\n1. ")}
                        title="Numbered List Item"
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300 hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <ListOrdered size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("\n> ")}
                        title="Blockquote"
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300 hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <Quote size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("\n\n---\n\n")}
                        title="Divider Line"
                        className="px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300 hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                    </div>

                    <textarea
                      ref={textareaRef}
                      required
                      name="content"
                      value={form.content}
                      onChange={updateField}
                      placeholder="Paste or type your article body here... Preserves spacing, line breaks, headings (## Heading), lists (- bullet), and bold text."
                      rows="14"
                      className="field resize-y font-mono text-sm leading-relaxed"
                    />
                  </>
                ) : (
                  <div className="border border-white/15 bg-black/40 p-6 md:p-8 min-h-[350px] max-h-[500px] overflow-y-auto">
                    {form.content?.trim() ? (
                      <ArticleRenderer content={form.content} />
                    ) : (
                      <p className="text-gray-500 italic text-sm">
                        No content written yet. Switch to "Write" tab and paste your text to preview how it looks on the site.
                      </p>
                    )}
                  </div>
                )}
                <p className="text-gray-500 text-xs mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-accent-gold font-medium">Formatting tips:</span>
                  <span>Use double Enter for paragraph spacing.</span>
                  <span>Use <code className="text-accent-gold">## Heading</code> for titles.</span>
                  <span>Use <code className="text-accent-gold">- Item</code> for bullet points.</span>
                  <span>Click <strong>Live Preview</strong> to verify before publishing.</span>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-accent-gold text-primary-dark px-7 py-3.5 text-xs font-black uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>{editingArticleId ? "Saving changes..." : "Publishing..."}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>{editingArticleId ? "Save changes" : "Publish article"}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={cancelEditor}
                className="px-6 py-3.5 text-xs uppercase tracking-wider text-gray-400 hover:text-white border border-white/15 hover:border-white/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Article List Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Published Articles
          </h3>
          <span className="text-xs text-gray-500">Actions: Edit, View, Delete</span>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {articles.length === 0 ? (
            <div className="text-center py-16 border border-white/10 bg-secondary-dark/20 p-8">
              <p className="text-gray-400 text-sm">No articles found in your journal studio.</p>
              <button
                onClick={startNewArticle}
                className="mt-4 inline-flex items-center gap-2 bg-accent-gold text-primary-dark px-4 py-2 text-xs font-black uppercase tracking-wider hover:bg-white transition-colors"
              >
                <Plus size={15} /> Write your first article
              </button>
            </div>
          ) : (
            articles.map((article) => {
              const isCurrentlyEditing = editingArticleId === article.id;
              return (
                <div
                  key={article.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 md:p-6 transition-all ${
                    isCurrentlyEditing
                      ? "border-2 border-accent-gold bg-accent-gold/10"
                      : "border border-white/10 bg-secondary-dark/30 hover:border-white/20 hover:bg-secondary-dark/50"
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    {/* Thumbnail */}
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover bg-black/40 border border-white/10 shrink-0"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-block text-accent-gold text-[0.65rem] uppercase tracking-[0.2em] font-semibold bg-accent-gold/10 px-2.5 py-0.5 border border-accent-gold/20">
                          {article.category}
                        </span>
                        {isCurrentlyEditing && (
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-accent-gold animate-pulse">
                            • Editing now
                          </span>
                        )}
                      </div>
                      <h4 className="text-base md:text-lg font-medium text-white mt-1.5 line-clamp-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-3 text-gray-500 text-xs mt-1">
                        <span>{formatArticleDate(article.date)}</span>
                        {article.readTime && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} /> {article.readTime}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => startEditing(article)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                        isCurrentlyEditing
                          ? "bg-accent-gold text-primary-dark font-black"
                          : "border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-primary-dark"
                      }`}
                      title="Edit article"
                    >
                      <Edit3 size={14} />
                      <span>{isCurrentlyEditing ? "Editing" : "Edit"}</span>
                    </button>

                    <a
                      href={`/journal/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all hover:bg-white/5"
                      title="View live article"
                    >
                      <ExternalLink size={14} />
                      <span className="hidden md:inline">View</span>
                    </a>

                    <button
                      onClick={() => removeArticle(article.id, article.title)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                      title="Delete article"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
