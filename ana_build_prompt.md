# Claude Code Build Prompt — Psychologist Website (Design Showcase + Production Build)

## Project Overview

Build a psychologist's professional website using **Astro 5 + Tailwind CSS v4**. The project has TWO phases that must be built together:

1. **Design Showcase Mode** — A gallery where the client can browse 8 design options and tweak colors/fonts in real-time to pick her favorite
2. **Production Site** — The actual SEO-optimized website using the chosen design (structure ready, design swappable)

The site is for a psychologist based in Spain. All UI text must be in **Spanish (Spain)**. The site must be mobile-first, blazing fast, and SEO-ready from day one.

---

## Phase 1: Design Showcase (Priority — Build This First)

### What to Build

Create a `/showcase` route that serves as a design gallery for the client to review designs.

### Structure

```
src/
├── pages/
│   ├── index.astro              # Redirect to /showcase during review phase
│   ├── showcase/
│   │   ├── index.astro           # Gallery grid — shows all 8 designs as cards
│   │   └── [id].astro            # Individual design preview with Tweaks Bar
│   └── ...
├── designs/
│   ├── design-1/
│   │   └── index.astro           # Full landing page — Design 1
│   ├── design-2/
│   │   └── index.astro           # Full landing page — Design 2
│   └── ... (up to design-8)
├── components/
│   ├── showcase/
│   │   ├── TweaksBar.astro       # The floating tweaks sidebar (Astro island)
│   │   ├── TweaksBar.tsx         # React island for interactivity (client:load)
│   │   └── DesignCard.astro      # Card component for gallery grid
│   └── ...
└── ...
```

### Gallery Page (`/showcase`)

- Clean grid showing all 8 designs as preview cards
- Each card shows:
  - A thumbnail/screenshot of the design (or a representative hero section preview)
  - Design name/number (e.g., "Diseño 1 — Serene", "Diseño 2 — Editorial")
  - "Ver diseño →" link
- Simple, clean layout — this is a tool for the client, not the final site
- Header: "Elige tu diseño favorito" with a brief instruction paragraph

### Individual Design View (`/showcase/[id]`)

Each design renders as a **full landing page preview** with all sections (hero, about, services, etc.) using placeholder content.

### Tweaks Bar (Critical Feature)

A **floating sidebar/toolbar** that appears on each individual design view. It should be:

- Fixed on the right side on desktop (collapsible), bottom sheet on mobile
- Semi-transparent/frosted glass background
- Does NOT interfere with the design preview
- Contains:

#### 1. Color Palette Selector (4 palettes)

Radio buttons or clickable swatches. When selected, CSS custom properties update in real-time (no page reload).

**Palette 1 — "Sage & Cream" (default)**
```css
--color-primary: #7C9082;      /* sage green */
--color-primary-dark: #5A6B5E;
--color-accent: #C4956A;       /* warm terracotta */
--color-accent-light: #D4A87C;
--color-bg: #FAF8F5;           /* warm off-white */
--color-bg-alt: #F0EDE8;       /* slightly darker warm */
--color-text: #2D2D2D;
--color-text-light: #6B6B6B;
--color-surface: #FFFFFF;
```

**Palette 2 — "Lavender & Stone"**
```css
--color-primary: #8B7FA8;      /* muted lavender */
--color-primary-dark: #6B5F8A;
--color-accent: #C9956B;       /* warm gold */
--color-accent-light: #D9AB83;
--color-bg: #F8F6F3;
--color-bg-alt: #EDEBE6;
--color-text: #2A2A2A;
--color-text-light: #7A7A7A;
--color-surface: #FFFFFF;
```

**Palette 3 — "Ocean & Sand"**
```css
--color-primary: #5B8A8A;      /* teal */
--color-primary-dark: #436868;
--color-accent: #D4926B;       /* sandy coral */
--color-accent-light: #E0A882;
--color-bg: #F9F7F4;
--color-bg-alt: #EDE9E3;
--color-text: #1E2D2D;
--color-text-light: #5E7070;
--color-surface: #FFFFFF;
```

**Palette 4 — "Blush & Charcoal"**
```css
--color-primary: #B08D8D;      /* dusty rose */
--color-primary-dark: #8A6B6B;
--color-accent: #C4A265;       /* muted gold */
--color-accent-light: #D4B87C;
--color-bg: #F7F5F2;
--color-bg-alt: #ECE8E3;
--color-text: #2C2C2C;
--color-text-light: #787878;
--color-surface: #FFFFFF;
```

#### 2. Font Selector (3 options)

A `<select>` dropdown or clickable buttons to switch between font pairings. Fonts load from Google Fonts.

**Option A — "Cormorant Garamond"** (elegant, literary)
- Display/headings: `Cormorant Garamond` (serif)
- Body: `Plus Jakarta Sans` (sans-serif)

**Option B — "Playfair Display"** (classic, authoritative)
- Display/headings: `Playfair Display` (serif)
- Body: `Source Sans 3` (sans-serif)

**Option C — "DM Serif Display"** (modern, warm)
- Display/headings: `DM Serif Display` (serif)
- Body: `DM Sans` (sans-serif)

#### 3. Feedback Section

At the bottom of the Tweaks Bar:
- A small text area: "¿Notas o comentarios sobre este diseño?"
- Current selections displayed as text: "Paleta: Sage & Cream | Fuente: Cormorant Garamond"
- A "Copiar selección" button that copies the current config to clipboard (palette name + font choice + any notes)

### Implementation Notes for Tweaks Bar

- Use **CSS custom properties** at the `:root` level for all colors
- All design components must reference these variables (e.g., `bg-[var(--color-bg)]` or Tailwind theme extension)
- Font switching: dynamically update `<link>` tags or use `@fontsource` packages
- Use a **React island** (`client:load`) for the interactive tweaks — the rest stays as static Astro
- Store the current selection in `localStorage` so it persists across design views
- Preload all 3 font families on the showcase pages (they're only used during review)

---

## Phase 2: Production Site Structure

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 5 (static output mode — `output: 'static'`) |
| Styling | Tailwind CSS v4 |
| Interactive islands | React 19 (for Tweaks Bar, mobile menu, FAQ accordion) |
| Fonts | Google Fonts via `@fontsource` packages |
| Deployment | Static — Netlify, Vercel, or Cloudflare Pages |
| Blog content | Astro Content Collections (Markdown) |

### Project Structure

```
psicologia-web/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg              # Default Open Graph image
│   ├── robots.txt
│   └── images/
│       ├── hero-placeholder.jpg
│       ├── about-placeholder.jpg
│       └── ...
├── src/
│   ├── config/
│   │   └── site.ts               # Central site config (name, URL, social, SEO defaults)
│   ├── styles/
│   │   ├── global.css            # CSS custom properties, base styles
│   │   └── fonts.css             # Font-face declarations
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, meta tags, scripts, JSON-LD
│   │   ├── PageLayout.astro      # Base + nav + footer
│   │   └── BlogLayout.astro      # Blog post layout with article schema
│   ├── components/
│   │   ├── ui/                   # Reusable primitives (Button, Card, Section, etc.)
│   │   ├── sections/             # Page sections (Hero, About, Services, etc.)
│   │   ├── seo/
│   │   │   ├── SEOHead.astro     # All meta tags, OG, Twitter cards
│   │   │   ├── SchemaOrg.astro   # JSON-LD structured data
│   │   │   └── Breadcrumbs.astro
│   │   ├── navigation/
│   │   │   ├── Navbar.astro
│   │   │   ├── MobileMenu.tsx    # React island (client:load)
│   │   │   └── Footer.astro
│   │   └── showcase/             # (Phase 1 — Tweaks Bar components)
│   ├── content/
│   │   ├── config.ts             # Content collection schemas
│   │   └── blog/
│   │       ├── primer-articulo.md
│   │       └── ...
│   ├── pages/
│   │   ├── index.astro           # Homepage (all sections)
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog listing
│   │   │   └── [...slug].astro   # Individual blog posts
│   │   ├── contacto.astro        # Contact page (optional standalone)
│   │   ├── aviso-legal.astro     # Legal notice (required in Spain)
│   │   ├── politica-privacidad.astro # Privacy policy (required in Spain)
│   │   ├── 404.astro             # Custom 404
│   │   └── showcase/             # (Phase 1 routes)
│   ├── utils/
│   │   └── seo.ts                # Helper functions for meta generation
│   └── designs/                  # (Phase 1 design variants)
└── .github/
    └── workflows/
        └── lighthouse.yml        # Lighthouse CI on deploy
```

### Landing Page Sections (in order)

Each section is a separate component in `src/components/sections/`:

1. **`Hero.astro`** — Full-viewport hero with name, tagline, CTAs, photo placeholder
2. **`TrustBar.astro`** — Horizontal stats strip (experience, patients, credentials)
3. **`About.astro`** — Two-column: photo + bio text + philosophy
4. **`Services.astro`** — Card grid (Terapia Individual, Pareja, Online, Adolescentes)
5. **`Process.astro`** — 3-step visual (Contacto → Primera sesión → Tu proceso)
6. **`Testimonials.astro`** — Carousel/cards with anonymous reviews
7. **`BlogPreview.astro`** — 3 latest posts from Content Collection
8. **`FAQ.astro`** — Accordion with React island (`client:visible`)
9. **`ContactCTA.astro`** — Final CTA with Calendly link + contact form/WhatsApp
10. **`Footer.astro`** — Nav, social, legal links, colegiado number

---

## SEO Requirements (Critical)

### Meta Tags & Open Graph (`SEOHead.astro`)

Every page must include:

```html
<!-- Primary Meta -->
<title>{pageTitle} | {siteName}</title>
<meta name="description" content="{pageDescription}" />
<link rel="canonical" href="{canonicalURL}" />
<meta name="robots" content="index, follow" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="{canonicalURL}" />
<meta property="og:title" content="{pageTitle}" />
<meta property="og:description" content="{pageDescription}" />
<meta property="og:image" content="{ogImage}" />
<meta property="og:locale" content="es_ES" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{pageTitle}" />
<meta name="twitter:description" content="{pageDescription}" />
<meta name="twitter:image" content="{ogImage}" />

<!-- Geo (for local SEO) -->
<meta name="geo.region" content="ES" />
<meta name="geo.placename" content="{city}" />
```

### JSON-LD Structured Data (`SchemaOrg.astro`)

Include on the homepage:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "{siteName}",
      "url": "{siteURL}",
      "description": "{siteDescription}",
      "inLanguage": "es"
    },
    {
      "@type": "LocalBusiness",
      "@id": "{siteURL}#business",
      "name": "{psychologistName}",
      "description": "{businessDescription}",
      "url": "{siteURL}",
      "telephone": "{phone}",
      "email": "{email}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "{street}",
        "addressLocality": "{city}",
        "addressRegion": "{region}",
        "postalCode": "{postalCode}",
        "addressCountry": "ES"
      },
      "priceRange": "$$",
      "openingHoursSpecification": [],
      "sameAs": ["{instagram}", "{linkedin}"]
    },
    {
      "@type": "Person",
      "name": "{psychologistName}",
      "jobTitle": "Psicóloga",
      "description": "{bio}",
      "url": "{siteURL}",
      "worksFor": { "@id": "{siteURL}#business" },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Psicóloga General Sanitaria",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Colegio Oficial de Psicólogos"
        }
      }
    }
  ]
}
```

For blog posts, add `BlogPosting` schema with `author`, `datePublished`, `dateModified`, `headline`, `description`, `image`.

### Sitemap & Robots

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.example.com', // Replace with actual domain
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/showcase'), // Exclude showcase from sitemap
    }),
    tailwind(),
    react(),
  ],
  output: 'static',
});
```

```txt
# public/robots.txt
User-agent: *
Allow: /
Disallow: /showcase/

Sitemap: https://www.example.com/sitemap-index.xml
```

### Performance Targets

- **Lighthouse Performance**: 95+
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **FID/INP**: < 200ms
- Preload hero image and primary font
- Use `loading="lazy"` on all images below the fold
- Use Astro's built-in `<Image />` component for responsive images with WebP/AVIF
- Minimize JS — only hydrate interactive islands (`client:load` for menu, `client:visible` for FAQ)

### Accessibility

- All images have descriptive `alt` text
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Proper heading hierarchy (single H1 per page)
- Skip-to-content link in BaseLayout
- Focus states on all interactive elements
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `aria-label` on navigation landmarks
- FAQ accordion keyboard-accessible (Enter/Space to toggle, arrow keys to navigate)

---

## Astro Integrations to Install

```bash
npm create astro@latest psicologia-web -- --template minimal
cd psicologia-web
npx astro add tailwind react sitemap
npm install @fontsource/cormorant-garamond @fontsource/playfair-display @fontsource/dm-serif-display @fontsource/plus-jakarta-sans @fontsource/source-sans-3 @fontsource/dm-sans
```

---

## Site Config File (`src/config/site.ts`)

```typescript
export const SITE = {
  name: 'Nombre de la Psicóloga',
  title: 'Psicóloga en [Ciudad] | Terapia Individual, Pareja y Online',
  description: 'Psicóloga colegiada en [Ciudad]. Terapia individual, de pareja y online. Primera consulta informativa. Reserva tu cita.',
  url: 'https://www.example.com',
  ogImage: '/og-image.jpg',
  language: 'es',
  locale: 'es_ES',

  // Contact
  phone: '+34 XXX XXX XXX',
  email: 'contacto@example.com',
  address: {
    street: 'Calle Example 123',
    city: '[Ciudad]',
    region: '[Comunidad Autónoma]',
    postalCode: 'XXXXX',
    country: 'ES',
  },

  // Social
  instagram: 'https://instagram.com/xxx',
  linkedin: 'https://linkedin.com/in/xxx',
  calendly: 'https://calendly.com/xxx',

  // Professional
  colegiadoNumber: 'XXXXX',
  university: '[Universidad]',
  specializations: ['Terapia Individual', 'Terapia de Pareja', 'Terapia Online'],
} as const;
```

---

## Placeholder Content

Use realistic Spanish placeholder content for all sections. Do NOT use lorem ipsum. Write text that sounds like a real psychologist's website. Examples:

- **Hero tagline**: "Tu bienestar emocional empieza aquí"
- **About excerpt**: "Soy psicóloga sanitaria colegiada con más de X años de experiencia..."
- **Service descriptions**: Real descriptions of what each therapy type involves
- **Testimonials**: 3 realistic anonymous reviews (e.g., "Después de meses sintiéndome perdida, encontré en [Nombre] el apoyo que necesitaba...")
- **FAQ answers**: Real, informative answers to common therapy questions
- **Blog posts**: Create 3 placeholder markdown posts about mental health topics (e.g., "Cómo manejar la ansiedad en el día a día", "5 señales de que podrías beneficiarte de terapia", "La importancia del autocuidado emocional")

---

## Legal Pages (Required in Spain)

### `aviso-legal.astro`
Standard Spanish legal notice template with placeholders for:
- Titular del sitio web
- NIF/CIF
- Domicilio
- Email de contacto
- Colegio profesional y número de colegiado

### `politica-privacidad.astro`
Privacy policy covering:
- Responsable del tratamiento
- Finalidad (contact forms, Calendly bookings)
- Base legal (consentimiento, interés legítimo)
- Destinatarios
- Derechos del usuario (acceso, rectificación, supresión, portabilidad)
- Reference to RGPD and LOPDGDD

---

## Development Workflow

1. **Start by scaffolding** the Astro project with all integrations
2. **Set up the CSS custom properties system** (colors + fonts as variables) — this is the foundation for both the Tweaks Bar and the final site
3. **Build the Tweaks Bar component** as a React island
4. **Implement Design 1** as a complete landing page using the variable system
5. **Create the showcase gallery** and wire up routing
6. **Implement remaining designs** (2-8) — each in its own folder, referencing the same CSS variable system
7. **Set up SEO infrastructure** (SEOHead, SchemaOrg, sitemap, robots.txt)
8. **Add blog Content Collection** with 3 placeholder posts
9. **Create legal pages**
10. **Run Lighthouse** and optimize until 95+ across all categories

---

## Important Constraints

- **NO external CSS frameworks** besides Tailwind — no Bootstrap, no Material UI
- **NO heavy JS libraries** — no jQuery, no GSAP. Use CSS animations and transitions
- **NO client-side routing** — Astro handles routing. Each page is a full HTML document
- **Minimal React** — only for interactive islands (Tweaks Bar, mobile menu toggle, FAQ accordion)
- **All text in Spanish (Spain)** — not Latin American Spanish
- **Mobile-first** — design for phone screens first, then scale up
- **Images**: Use Astro's `<Image />` component, always with `width`, `height`, and `alt`
- **Fonts**: Load via `@fontsource` packages, not Google Fonts CDN (better performance + privacy)
- The showcase routes (`/showcase/*`) must be excluded from the sitemap and blocked in robots.txt
- Use `astro:transitions` for smooth page transitions in the showcase

---

## Design Files

The 8 design HTML files are provided separately. Each one is a complete landing page mockup. When implementing them in Astro:

1. Extract the visual design (layout, spacing, decorative elements, animations)
2. Convert to Astro components using the section structure above
3. Replace hardcoded colors with CSS custom property references (`var(--color-primary)`, etc.)
4. Replace hardcoded fonts with the CSS variable font stack
5. Ensure all designs share the same HTML section structure but differ in visual treatment (layout, spacing, decorative elements, animation style)

This ensures the Tweaks Bar color/font switching works consistently across all 8 designs.
