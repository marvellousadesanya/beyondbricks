# Quick Start Guide - BeyondBricks Website

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

Navigate to: `http://localhost:5173`

That's it! Your website is now running locally. 🎉

---

## 📝 What You'll See

The website includes these sections (in order):

1. ✅ **Hero** - Full-screen video background with company branding
2. ✅ **About Us** - Company introduction with stats
3. ✅ **Projects** - 9 project showcases in a grid
4. ✅ **Services** - 3 main services offered
5. ✅ **Why Choose Us** - 6 key differentiators
6. ✅ **Testimonials** - 4 client reviews
7. ✅ **Contact** - Contact form and information
8. ✅ **Footer** - Company info and links

---

## 🎨 Customization Priority List

### High Priority (Do First)

1. **Replace Video** (`src/components/Hero.jsx`)

   - Find line with video source
   - Replace URL with your construction video

2. **Update Contact Info** (`src/components/Contact.jsx` and `src/components/Footer.jsx`)

   - Phone number
   - Email address
   - Physical address

3. **Replace Project Images** (`src/components/Projects.jsx`)
   - Update the `projects` array with your actual images

### Medium Priority

4. **Update About Text** (`src/components/About.jsx`)
5. **Replace About Image** (`src/components/About.jsx`)
6. **Update Testimonials** (`src/components/Testimonials.jsx`)

### Low Priority

7. **Social Media Links** (`src/components/Footer.jsx`)
8. **Services Details** (`src/components/Services.jsx`)

---

## 🏗️ Build for Production

When ready to deploy:

```bash
npm run build
```

The production files will be in the `dist` folder.

---

## 🌐 Deploy Options

### Option 1: Vercel (Easiest)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

- Drag and drop the `dist` folder to Netlify

### Option 3: Any Web Host

- Upload the `dist` folder contents to your web server

---

## ❓ Need Help?

Check the main README.md for detailed documentation.

---

**Happy Building! 🏗️**
