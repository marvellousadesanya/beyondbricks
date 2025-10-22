# BeyondBricks - Modern Construction Company Website

A modern, aesthetic real estate/construction website built with React and Tailwind CSS. This single-page application showcases BeyondBricks, a leading construction company in Lagos, Nigeria.

## 🎨 Design Features

- **Color Scheme**: Dark gray (#1a1a1a, #2a2a2a) with yellow/gold accent (#f4b942)
- **Modern Aesthetic**: Clean, professional construction company design
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Smooth Scrolling**: Seamless navigation between sections
- **Interactive Elements**: Hover effects, animations, and transitions

## 🏗️ Website Structure

1. **Hero Section** - Full-width video background with company name and CTA
2. **About Us** - Company introduction with stats and consultation CTA
3. **Projects Gallery** - Grid layout showcasing 9 completed projects
4. **Services** - 3 main services in card layout
5. **Why Choose Us** - 6 reasons highlighting company advantages
6. **Testimonials** - 4 client testimonials with ratings
7. **Contact** - Contact form and company information
8. **Footer** - Company info, quick links, and social media

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd beyondbricks
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit:

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
beyondbricks/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar with scroll behavior
│   │   ├── Hero.jsx         # Hero section with video background
│   │   ├── About.jsx        # About Us section
│   │   ├── Projects.jsx     # Projects gallery
│   │   ├── Services.jsx     # Services section
│   │   ├── WhyChooseUs.jsx  # Why Choose Us section
│   │   ├── Testimonials.jsx # Client testimonials
│   │   ├── Contact.jsx      # Contact form and info
│   │   └── Footer.jsx       # Footer component
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🎯 Key Features

### Responsive Navigation

- Fixed navbar that becomes solid on scroll
- Mobile-friendly hamburger menu
- Smooth scroll to sections
- Call-to-action button

### Video Hero Section

- Full-screen video background with overlay
- Centered text with company branding
- Multiple CTAs
- Animated scroll indicator

### Interactive Project Gallery

- 3-column responsive grid (adjusts to screen size)
- Hover effects revealing project details
- Category badges
- Placeholder images (easily replaceable)

### Services Cards

- 3 main services with icons from Lucide React
- Hover animations
- Detailed descriptions
- CTA section

### Contact Form

- Fully functional form with validation
- Success message on submission
- Contact information cards
- Office hours display

### Modern Footer

- Company information
- Quick navigation links
- Service links
- Contact details
- Social media links
- Copyright information

## 🎨 Customization Guide

### Replacing Placeholder Content

#### Images

All images use Unsplash URLs as placeholders. Replace them with your actual images:

**Projects Gallery** (`src/components/Projects.jsx`):

```javascript
const projects = [
  {
    id: 1,
    title: "Your Project Title",
    category: "Category",
    image: "/path/to/your/image.jpg", // Replace this
  },
  // ...
];
```

**About Section** (`src/components/About.jsx`):
Replace the image URL in the `<img>` tag.

#### Video Background

**Hero Section** (`src/components/Hero.jsx`):

```javascript
<source
  src="YOUR_VIDEO_URL.mp4" // Replace with your video URL
  type="video/mp4"
/>
```

#### Contact Information

**Contact Section** (`src/components/Contact.jsx`):
Update phone, email, and address in the `contactInfo` array.

**Footer** (`src/components/Footer.jsx`):
Update contact details in the Contact Us section.

#### Company Information

Update company text in:

- `src/components/About.jsx` - Company description
- `src/components/Hero.jsx` - Tagline
- `src/components/Footer.jsx` - Footer description

#### Social Media Links

**Footer** (`src/components/Footer.jsx`):

```javascript
const socialLinks = [
  {
    icon: <Facebook size={20} />,
    href: "YOUR_FACEBOOK_URL",
    label: "Facebook",
  },
  // ... update all links
];
```

### Color Customization

Colors are defined in `tailwind.config.js`:

```javascript
colors: {
  'primary-dark': '#1a1a1a',    // Main background
  'secondary-dark': '#2a2a2a',  // Secondary background
  'accent-gold': '#f4b942',     // Accent color
}
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development Notes

- The website uses React functional components with hooks
- Smooth scroll behavior is enabled globally
- All animations are CSS-based for optimal performance
- The navbar changes appearance on scroll
- Mobile menu uses a slide-down animation
- Form submission is handled with React state (backend integration needed)

## 📝 Next Steps

1. **Replace Placeholder Content**: Update all images, video, and text with actual content
2. **Backend Integration**: Connect the contact form to your backend/email service
3. **SEO Optimization**: Add meta tags, structured data, and optimize images
4. **Analytics**: Integrate Google Analytics or similar
5. **Deployment**: Deploy to Vercel, Netlify, or your preferred hosting platform

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

## 📄 License

This project is created for BeyondBricks. All rights reserved.

## 👥 Support

For support or questions, contact:

- Email: info@beyondbricks.ng
- Phone: +234 XXX XXX XXXX

---

**Built with ❤️ for BeyondBricks - Building Excellence, One Project at a Time**
