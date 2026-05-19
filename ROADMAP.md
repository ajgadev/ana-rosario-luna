# ROADMAP — Web de Ana Rosario Luna (Psicóloga)

Sitio web profesional para una psicóloga en España. Construido con **Astro 5 + Tailwind CSS v4**, islas de React mínimas. Todo el texto de UI en **español (España)**.

El trabajo está dividido en fases. **Fase 1 es la prioridad actual**: que la clienta pueda ver los 8 diseños y jugar con paletas y tipografías. SEO y producción vienen después, una vez elegido el diseño.

---

> **Decisión de enfoque (Fase 1):** para revisión rápida y 100% fiel, cada
> diseño se sirve tal cual desde `/public/designs/<id>/` y se muestra a pantalla
> completa vía `<iframe>` en `/showcase/<id>`, con un **Tweaks Bar** unificado
> superpuesto que controla las CSS custom properties que todos los diseños ya
> usan (`--serif`, `--sans`, `--accent`, …). El porte a componentes Astro reales
> (que pide el brief) se traslada a Fase 3, donde importa para SEO/producción.

## Fase 0 — Andamiaje del proyecto ✅ COMPLETADA

- [x] Scaffold Astro 6 (`output: 'static'`) en la raíz del repo
- [x] Integraciones: `@tailwindcss/vite` (Tailwind v4), `@astrojs/react`
- [~] Fuentes: por ahora vía Google Fonts CDN (fidelidad exacta del mockup); migración a `@fontsource` → Fase 4
- [x] Tweaks Bar controla CSS custom properties (colores + tipografías)
- [x] `src/data/designs.ts` con metadatos de los 8 diseños

## Fase 1 — Showcase de diseños ✅ COMPLETADA (base)

Galería interactiva para que la clienta elija. **Sin SEO.**

- [x] `/` → redirige a `/showcase`
- [x] `/showcase` — galería en grid con los 8 diseños (preview iframe + nombre + "Abrir diseño →")
- [x] `/showcase/[id]` — cada diseño a pantalla completa (8 rutas estáticas)
- [x] **Los 8 diseños** servidos con fidelidad total desde `public/designs/`
- [x] **Tweaks Bar** (isla React `client:load`), flotante, frosted glass:
  - [x] Selector de paleta (4 paletas del brief + «Original»)
  - [x] Selector de tipografía (3 pares del brief + «Original»)
  - [x] Toggle de formas orgánicas
  - [x] Selección actual como texto + botón «Copiar selección»
  - [x] Campo de notas por diseño
  - [x] Persistencia en `localStorage` (por diseño)
- [x] Mapeo de paletas **por diseño** (cada uno traduce los roles de la paleta
      a sus propias variables: 03 `--forest/--moss`, 06 `--plum/--lavender`,
      08 `--dusk/--rose`, etc.) → recoloreado fiel en los 8
- [ ] Pendiente de pulido: `astro:transitions` entre diseños y repaso de
      fidelidad visual diseño por diseño con la clienta.

**Entregable de Fase 1:** ✅ `npm run dev` → `http://localhost:4321` — la clienta
recorre los 8 diseños, prueba paletas/fuentes, apunta notas y copia su selección.

## Fase 2 — Decisión y consolidación

Una vez la clienta elige.

- [ ] Recoger feedback (qué diseño, qué paleta, qué tipografía, mezclas)
- [ ] Fijar el diseño elegido como `index.astro` de producción
- [ ] Limpiar diseños descartados (o conservarlos archivados)
- [ ] Confirmar contenido real con la clienta (datos de contacto, bio, colegiado, precios)

## Fase 3 — Sitio de producción + SEO

- [ ] Estructura de producción (`layouts/`, `components/sections/`, `components/seo/`)
- [ ] `SEOHead.astro` (meta, Open Graph, Twitter, geo)
- [ ] `SchemaOrg.astro` (JSON-LD: WebSite, LocalBusiness, Person)
- [ ] `@astrojs/sitemap` (excluir `/showcase`) + `robots.txt`
- [ ] Blog con Content Collections (3 artículos markdown placeholder)
- [ ] Páginas legales: `aviso-legal.astro`, `politica-privacidad.astro`
- [ ] Página 404 personalizada

## Fase 4 — Rendimiento y despliegue

- [ ] Imágenes con `<Image />` de Astro (WebP/AVIF, lazy below-the-fold)
- [ ] Preload de hero image y fuente primaria
- [ ] Lighthouse 95+ en todas las categorías (Performance, LCP < 2.5s, CLS < 0.1)
- [ ] Accesibilidad (contraste, jerarquía de headings, skip-link, focus states)
- [ ] Despliegue estático (Netlify / Vercel / Cloudflare Pages)

---

## Restricciones permanentes

- Solo Tailwind como framework CSS. Sin Bootstrap/MUI.
- Sin librerías JS pesadas (no jQuery, no GSAP). CSS para animaciones.
- Sin routing client-side. Astro maneja el routing.
- React solo para islas interactivas (Tweaks Bar, menú móvil, acordeón FAQ).
- Todo el texto en español de España.
- Mobile-first.

## Referencia

- `ana_build_prompt.md` — brief original detallado
- `ana_design_1/` — mockups fuente (Diseño 1 = app React con `styles.css` + `app.jsx` + `tweaks-panel.jsx`; Diseños 2–8 = HTML autónomo con estilos inline)
