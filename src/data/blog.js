import { projects } from "./projects";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export const defaultArticles = [
  {
    id: "future-of-luxury-construction",
    slug: "future-of-luxury-construction",
    category: "Perspective",
    title: "The future of luxury construction is already taking shape",
    excerpt: "What discerning clients should look for as architecture, technology, and craftsmanship begin to speak the same language.",
    content: "The most compelling spaces are no longer defined by scale alone. They are defined by how naturally every detail works together: the structure, the light, the materials, and the way a room makes people feel.\n\nAt Beyond Bricks, we see luxury as a discipline of restraint. It is the confidence to specify fewer materials, then execute each one with absolute precision. It is the intelligence to plan for how a space will age, not only how it will photograph on completion day.\n\nThe next generation of landmark projects will bring architecture and construction closer together. Clients will expect one accountable partner from first sketch to final finish, with transparency built into every decision. That is the standard we are building toward.",
    image: projects[1].thumbnail,
    date: "2025-03-18",
    readTime: "5 min read",
    author: "Beyond Bricks",
  },
  {
    id: "building-in-lagos",
    slug: "building-in-lagos",
    category: "Field Notes",
    title: "Building in Lagos: designing for climate, character, and longevity",
    excerpt: "A considered approach to creating buildings that feel at home in the city and remain exceptional for decades.",
    content: "Lagos rewards buildings that understand their environment. The best work responds to heat, rain, movement, and the energy of the people who inhabit it. It does not fight the city; it adds to its rhythm.\n\nThat begins with the fundamentals. Orientation, shade, cross-ventilation, material selection, and careful detailing all matter before the first finish is chosen. A well-built space should feel calm because the hard work is hidden in the decisions made early.\n\nOur role is to bring that intelligence to every layer of the build, connecting local knowledge with international standards of execution.",
    image: projects[3].thumbnail,
    date: "2025-02-06",
    readTime: "4 min read",
    author: "Beyond Bricks",
  },
  {
    id: "materials-that-matter",
    slug: "materials-that-matter",
    category: "Craft",
    title: "Materials that matter: choosing finishes with intention",
    excerpt: "The quiet details that make a finished project feel considered, enduring, and unmistakably its own.",
    content: "Material is memory. The grain of a timber handrail, the coolness of stone underfoot, and the way brass catches late afternoon light all become part of how a building is experienced.\n\nGood specification is a conversation between beauty and performance. We look for materials that can carry a room visually, then test them against the realities of daily life: maintenance, climate, touch, and time.\n\nWhen those choices are made with care, a finish does more than complete a space. It gives the project a point of view.",
    image: projects[7].thumbnail,
    date: "2025-01-22",
    readTime: "3 min read",
    author: "Beyond Bricks",
  },
];

// Pool of project thumbnails to use as fallback blog images
const fallbackImages = projects.map((p) => p.thumbnail);

const getRandomFallbackImage = (id) => {
  // Deterministic fallback based on article id so the same article always gets the same image
  const hash = String(id).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbackImages[hash % fallbackImages.length];
};

const mapArticle = (article) => ({
  ...article,
  date: article.published_at || article.date,
  readTime: article.read_time || article.readTime,
  image: article.image || getRandomFallbackImage(article.id || article.slug || ""),
});

export const fetchArticles = async ({ includeUnpublished = false } = {}) => {
  if (!isSupabaseConfigured) return defaultArticles;
  let query = supabase.from("articles").select("*").order("published_at", { ascending: false });
  if (!includeUnpublished) query = query.eq("is_published", true);
  const { data, error } = await query;
  if (error) throw error;
  return data.map(mapArticle);
};

export const createArticle = async (article, userId) => {
  const { data, error } = await supabase.from("articles").insert({
    title: article.title,
    slug: article.slug,
    category: article.category,
    excerpt: article.excerpt,
    content: article.content,
    image: article.image,
    read_time: article.readTime,
    author: "Beyond Bricks",
    author_id: userId,
    is_published: true,
  }).select().single();
  if (error) throw error;
  return mapArticle(data);
};

export const updateArticle = async (id, article) => {
  if (!isSupabaseConfigured) {
    const index = defaultArticles.findIndex((a) => a.id === id);
    if (index !== -1) {
      defaultArticles[index] = { ...defaultArticles[index], ...article };
      return defaultArticles[index];
    }
    return { id, ...article };
  }
  const updatePayload = {
    title: article.title,
    slug: article.slug,
    category: article.category,
    excerpt: article.excerpt,
    content: article.content,
    image: article.image,
    read_time: article.readTime,
  };
  if (article.is_published !== undefined) {
    updatePayload.is_published = article.is_published;
  }
  const { data, error } = await supabase
    .from("articles")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapArticle(data);
};

export const deleteArticle = async (id) => {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
};

export const compressImage = (file, maxWidth = 1920, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/webp", quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Could not process image"));
    };
    reader.onerror = () => reject(new Error("Could not read image file"));
  });
};

export const uploadArticleImage = async (file) => {
  if (!file) throw new Error("No file selected");

  // Attempt Supabase storage if available
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split(".").pop() || "jpg";
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `articles/${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);
        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (err) {
      console.warn("Supabase storage upload fallback to compressed image:", err);
    }
  }

  // Reliable fallback: optimized client-side compressed image
  return await compressImage(file);
};

export const formatArticleDate = (date) =>
  new Intl.DateTimeFormat("en-NG", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));

