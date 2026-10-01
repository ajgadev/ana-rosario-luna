# CLAUDE.md

Web profesional para **Ana Rosario Luna**, psicóloga sanitaria (Madrid & online).
Sitio en **español de España**. Construido para una amiga del usuario.

## Estado / plan

- **`ROADMAP.md`** es la fuente de verdad del plan por fases y del progreso.
  Léelo al empezar cada sesión y mantén sus checkboxes al día.
- Fase actual: **Fase 2 en curso**. La clienta eligió **Diseño 09 + paleta
  Lavender & Stone + Fraunces/Manrope**; ya está portado a `/` como landing.
  SEO es Fase 3 — **no** añadir SEO todavía.
- El brief original está en `ana_build_prompt.md`.

## Comandos

```bash
npm run dev      # http://localhost:4321 (/ = landing, /showcase = archivo de diseños)
npm run build    # build estático → ./dist
npm run preview  # sirve ./dist
npm run dev -- --host   # exponer en la red local (revisión desde el móvil)
```

## Stack

- **Astro 6** (`output` estático por defecto), **Tailwind v4** vía
  `@tailwindcss/vite` (no `@astrojs/tailwind`), **React 19** solo para islas.
- TS estricto. El proyecto vive en la **raíz del repo** (no en subcarpeta).

## Arquitectura de la landing (`/`)

Una sola página (`src/pages/index.astro`) que solo compone secciones; navegación
por anclas, sin routing cliente y **sin React** (FAQ y menú móvil con
`<details>` nativo; solo scripts vanilla para reveal y envío del formulario).

- `src/styles/global.css` — `@theme` con tokens **semánticos** (`bg`, `bg-alt`,
  `primary`, `primary-deep`, `soft`, `accent`, `ink-soft`, `line`, `font-serif`,
  `font-sans`, `radius-card`) + estilos base de h1–h3/p + `.reveal`
  (solo oculta con `.js` en `<html>`).
- `src/layouts/BaseLayout.astro` — `<head>`, fuentes (Google Fonts CDN), reveal.
- `src/data/*.ts` — **todo el contenido** tipado (`site.ts` = nombre, email,
  WhatsApp, nav; `services`, `process`, `testimonials`, `faqs`, `stats`).
  Cambiar textos aquí, no en los componentes.
- `src/components/ui/` — primitivas (`Container`, `Section`, `Button`, `Star`,
  `Kicker`, `SectionHeading`, `ContactLinks`).
- `src/components/layout/` — `Header`, `Footer`.
- `src/components/sections/` — una por bloque del diseño 09 (+ subcomponentes
  de tarjeta/ítem).
- Formulario: Web3Forms, clave en `PUBLIC_WEB3FORMS_KEY` (ver `.env.example`).
- Retrato en `src/assets/` (optimizado con `<Image />`); la copia de
  `public/pictures/` sigue ahí porque la usa `/showcase/09`.

## Arquitectura del showcase (archivo, `/showcase`)

Para revisión rápida y 100% fiel, **los 9 diseños NO se han portado a
componentes Astro todavía**. En su lugar:

- Los mockups originales se sirven tal cual desde `public/designs/<id>/`
  (Diseño 01 = app React+Babel con `styles.css`/`app.jsx`/`tweaks-panel.jsx`;
  02–09 = HTML autónomo con `<style>`/`<script>` inline).
  Los diseños nuevos se importan del proyecto de Claude Design vía el MCP
  `claude_design` (`DesignSync`), copiando el HTML tal cual a
  `public/designs/<id>/index.html`.
  El proyecto de Design tiene además `10 Lavender Sky` y `11 Peach Sage`:
  **descartadas** por ser la misma maqueta que la 09 con otro `:root`.
- `src/pages/showcase/[id].astro` muestra cada diseño a pantalla completa en un
  `<iframe id="design-frame">` y superpone `<TweaksBar client:load>`.
- `src/pages/showcase/index.astro` = galería (datos en `src/data/designs.ts`).
- El **porte a componentes Astro reales** está planificado para Fase 3, cuando
  importa para SEO/producción. No rehacerlo antes salvo que se pida.

### Cómo funciona el Tweaks Bar

`src/components/showcase/TweaksBar.tsx` (isla React). Escribe CSS custom
properties sobre `iframe.contentDocument.documentElement` (mismo origen).

- Cada diseño define sus tokens con **nombres propios** (06 `--plum/--lavender`,
  03 `--forest/--moss`, 08 `--dusk/--rose`, …). El mapeo paleta→variables es
  **por diseño** en `DESIGN_VARS` dentro de `TweaksBar.tsx`. Si se añade o
  cambia un diseño, hay que añadir/ajustar su entrada ahí (extraer su bloque
  `:root` y mapear los roles: primary/primaryDark/accent/accentLight/bg/bgAlt/
  text/textLight).
- 4 paletas y 3 pares tipográficos vienen del brief (`ana_build_prompt.md`).
- Fuentes: ahora vía Google Fonts CDN (fidelidad exacta). Migrar a
  `@fontsource` es tarea de Fase 4, no antes.
- Estado persistido en `localStorage` por diseño (`ana-tweaks:<id>`).
- El panel propio del Diseño 01 (`.twk-panel`) se oculta vía CSS inyectado
  para no duplicar controles.

## Convenciones

- Todo el texto de UI en **español de España** (no latinoamericano).
- Sin frameworks CSS además de Tailwind; sin JS pesado (no jQuery/GSAP).
- React solo para islas interactivas.
- Las rutas `/showcase/*` llevan `noindex, nofollow` (no son el sitio público).
- Datos de la consulta (Madrid, COP M-28432, etc.) son **placeholders** del
  mockup; confirmar los reales con la clienta antes de producción (Fase 2).

## Pendiente inmediato (ver ROADMAP)

Clave de Web3Forms → revisión visual de `/` con la clienta → confirmar
contenido real → Fase 3 (legales + SEO).
