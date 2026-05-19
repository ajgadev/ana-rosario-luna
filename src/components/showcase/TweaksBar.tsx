import { useEffect, useRef, useState } from "react";

/* ---------- Paletas (del brief) ---------- */
interface Palette {
  key: string;
  label: string;
  primary: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  bg: string;
  bgAlt: string;
  text: string;
  textLight: string;
  surface: string;
}

// Cada paleta tiene un primary Y un accent claramente distintos (antes los
// 4 accents eran casi el mismo tostado, por eso muchos diseños apenas
// cambiaban). Fondos con un tinte sutil propio para reforzar el cambio,
// manteniendo el tono calmado/profesional.
const PALETTES: Palette[] = [
  { key: "sage", label: "Sage & Cream", primary: "#7C9082", primaryDark: "#54655A", accent: "#C0714E", accentLight: "#E3C2A6", bg: "#FAF8F3", bgAlt: "#EDEFE9", text: "#2A2E2A", textLight: "#6B7268", surface: "#FFFFFF" },
  { key: "lavender", label: "Lavender & Stone", primary: "#8472A6", primaryDark: "#5E4F7E", accent: "#B0617F", accentLight: "#DCC2D2", bg: "#F8F5FA", bgAlt: "#EBE7F0", text: "#2B2630", textLight: "#6F6878", surface: "#FFFFFF" },
  { key: "ocean", label: "Ocean & Sand", primary: "#3F8888", primaryDark: "#2C6363", accent: "#CC6A45", accentLight: "#E6C7A6", bg: "#F4F8F7", bgAlt: "#E3EDEB", text: "#1E2D2D", textLight: "#587070", surface: "#FFFFFF" },
  { key: "blush", label: "Blush & Charcoal", primary: "#B27680", primaryDark: "#854E58", accent: "#C29A45", accentLight: "#E6D2B0", bg: "#FAF5F4", bgAlt: "#F0E7E6", text: "#2C2628", textLight: "#7A6E70", surface: "#FFFFFF" },
];

/* ---------- Mapeo paleta → variables propias de cada diseño ----------
   Cada diseño define sus tokens con nombres distintos (Diseño 06 usa
   --plum/--lavender, el 03 --forest/--moss, etc.). Aquí traducimos los
   roles de cada paleta a las variables reales que consume cada diseño,
   para que el recoloreado sea fiel y coherente. */
type DesignMap = (p: Palette) => Record<string, string>;

const DESIGN_VARS: Record<string, DesignMap> = {
  // 01 Editorial Warmth (styles.css)
  "01": (p) => ({
    "--bg": p.bg, "--bg-warm": p.bgAlt, "--bg-deep": p.text,
    "--ink": p.text, "--ink-soft": p.textLight, "--muted": p.textLight,
    "--line": p.bgAlt, "--accent": p.accent, "--accent-deep": p.primaryDark,
    "--tone": p.primary, "--tone-soft": p.accentLight, "--gold": p.accentLight,
  }),
  // 02 Quiet Atelier
  "02": (p) => ({
    "--bg": p.bg, "--bg-2": p.bgAlt, "--ink": p.text, "--ink-soft": p.textLight,
    "--muted": p.textLight, "--line": p.bgAlt, "--accent": p.accent,
    "--accent-deep": p.primaryDark, "--sage": p.primary,
  }),
  // 03 Forest & Cream
  "03": (p) => ({
    "--cream": p.bg, "--cream-2": p.bgAlt, "--ink": p.text,
    "--forest": p.text, "--forest-2": p.primaryDark, "--moss": p.primary,
    "--sage": p.accentLight, "--sand": p.accentLight, "--terra": p.accent,
    "--terra-deep": p.primaryDark, "--gold": p.accentLight,
  }),
  // 04 Soft Sans
  "04": (p) => ({
    "--bg": p.bg, "--bg-2": p.bgAlt, "--ink": p.text, "--ink-soft": p.textLight,
    "--muted": p.textLight, "--line": p.bgAlt, "--coral": p.accent,
    "--coral-deep": p.primaryDark,
  }),
  // 05 Vintage Bordered
  "05": (p) => ({
    "--paper": p.bg, "--paper-2": p.bgAlt, "--ink": p.text, "--ink-2": p.textLight,
    "--mute": p.textLight, "--line": p.bgAlt, "--accent": p.accent,
    "--accent-2": p.primaryDark, "--gold": p.accentLight,
  }),
  // 06 Twilight Lavender
  "06": (p) => ({
    "--bg": p.bg, "--bg-2": p.bgAlt, "--bg-3": p.bgAlt, "--ink": p.text,
    "--ink-2": p.textLight, "--mute": p.textLight, "--line": p.bgAlt,
    "--plum": p.primaryDark, "--plum-deep": p.text, "--lavender": p.primary,
    "--lilac": p.accentLight, "--blush": p.accentLight, "--gold": p.accentLight,
  }),
  // 07 Clay & Blush
  "07": (p) => ({
    "--ivory": p.bg, "--bone": p.bgAlt, "--blush": p.accentLight,
    "--blush-2": p.accent, "--clay": p.accent, "--clay-deep": p.primaryDark,
    "--terra": p.primaryDark, "--ink": p.text, "--ink-2": p.textLight,
    "--mute": p.textLight, "--line": p.bgAlt,
  }),
  // 08 Dusk & Rose
  "08": (p) => ({
    "--bone": p.bg, "--bone-2": p.bgAlt, "--dusk": p.primary,
    "--dusk-2": p.primaryDark, "--dusk-3": p.text, "--rose": p.accent,
    "--rose-deep": p.primaryDark, "--pink-soft": p.accentLight,
    "--ink": p.text, "--ink-2": p.textLight, "--mute": p.textLight,
    "--line": p.bgAlt, "--gold": p.accentLight,
  }),
};

// Fallback genérico (cubre nombres comunes) por si se añade un diseño nuevo.
const FALLBACK_MAP: DesignMap = (p) => ({
  "--bg": p.bg, "--bg-2": p.bgAlt, "--bg-warm": p.bgAlt, "--ink": p.text,
  "--ink-soft": p.textLight, "--ink-2": p.textLight, "--muted": p.textLight,
  "--mute": p.textLight, "--line": p.bgAlt, "--accent": p.accent,
  "--accent-deep": p.primaryDark, "--tone": p.primary,
});

const paletteVarsFor = (designId: string, p: Palette) =>
  (DESIGN_VARS[designId] ?? FALLBACK_MAP)(p);

/* ---------- Tipografías (del brief) ---------- */
interface FontPair { key: string; label: string; serif: string; sans: string; }
const FONTS: FontPair[] = [
  { key: "cormorant", label: "Cormorant + Jakarta", serif: '"Cormorant Garamond", Georgia, serif', sans: '"Plus Jakarta Sans", system-ui, sans-serif' },
  { key: "playfair", label: "Playfair + Source Sans", serif: '"Playfair Display", Georgia, serif', sans: '"Source Sans 3", system-ui, sans-serif' },
  { key: "dmserif", label: "DM Serif + DM Sans", serif: '"DM Serif Display", Georgia, serif', sans: '"DM Sans", system-ui, sans-serif' },
];
const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Source+Sans+3:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap";

interface State {
  palette: string; // "" = original
  font: string; // "" = original
  shapes: boolean;
  notes: string;
}
const DEFAULTS: State = { palette: "", font: "", shapes: true, notes: "" };

export default function TweaksBar({ designId }: { designId: string }) {
  const storageKey = `ana-tweaks:${designId}`;
  const [open, setOpen] = useState(true);
  const [st, setSt] = useState<State>(DEFAULTS);
  const [copied, setCopied] = useState(false);
  const loaded = useRef(false);

  // Cargar estado persistido
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSt({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
    loaded.current = true;
  }, [storageKey]);

  // Persistir
  useEffect(() => {
    if (loaded.current) {
      try { localStorage.setItem(storageKey, JSON.stringify(st)); } catch {}
    }
  }, [st, storageKey]);

  // Aplicar al iframe (en cada cambio y cuando el iframe carga)
  function apply() {
    const frame = document.getElementById("design-frame") as HTMLIFrameElement | null;
    const doc = frame?.contentDocument;
    if (!doc) return;
    const root = doc.documentElement;

    // Paleta — variables propias del diseño
    const keys = Object.keys(paletteVarsFor(designId, PALETTES[0]));
    for (const k of keys) root.style.removeProperty(k);
    if (st.palette) {
      const p = PALETTES.find((x) => x.key === st.palette);
      if (p)
        for (const [k, v] of Object.entries(paletteVarsFor(designId, p)))
          root.style.setProperty(k, v);
    }

    // Tipografía
    if (st.font) {
      const f = FONTS.find((x) => x.key === st.font);
      if (f) {
        root.style.setProperty("--serif", f.serif);
        root.style.setProperty("--sans", f.sans);
        if (!doc.getElementById("tweaks-fonts")) {
          const l = doc.createElement("link");
          l.id = "tweaks-fonts";
          l.rel = "stylesheet";
          l.href = FONT_LINK;
          doc.head.appendChild(l);
        }
      }
    } else {
      root.style.removeProperty("--serif");
      root.style.removeProperty("--sans");
    }

    // Estilos inyectados (ocultar panel propio del Diseño 01 + toggle de formas)
    let s = doc.getElementById("tweaks-inject") as HTMLStyleElement | null;
    if (!s) {
      s = doc.createElement("style");
      s.id = "tweaks-inject";
      doc.head.appendChild(s);
    }
    const hideShapes = st.shapes
      ? ""
      : `.hero-blob,.contact-blob,.blob,[class*="blob"],[aria-hidden="true"][class*="ornament"]{display:none!important}`;
    s.textContent = `.twk-panel{display:none!important}${hideShapes}`;
  }

  useEffect(() => {
    apply();
    const frame = document.getElementById("design-frame") as HTMLIFrameElement | null;
    if (!frame) return;
    const onLoad = () => apply();
    frame.addEventListener("load", onLoad);
    return () => frame.removeEventListener("load", onLoad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st]);

  const paletteLabel = st.palette ? PALETTES.find((p) => p.key === st.palette)?.label : "Original del diseño";
  const fontLabel = st.font ? FONTS.find((f) => f.key === st.font)?.label : "Original del diseño";

  function copySelection() {
    const txt = [
      `Diseño ${designId}`,
      `Paleta: ${paletteLabel}`,
      `Tipografía: ${fontLabel}`,
      `Formas orgánicas: ${st.shapes ? "sí" : "no"}`,
      st.notes.trim() ? `Notas: ${st.notes.trim()}` : "Notas: —",
    ].join("\n");
    navigator.clipboard?.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <style>{`
        .tb{position:fixed;z-index:9999;font-family:ui-sans-serif,system-ui,-apple-system,"Plus Jakarta Sans",sans-serif;color:#222}
        .tb-fab{right:20px;bottom:20px;width:52px;height:52px;border-radius:50%;
          background:rgba(28,24,20,.9);color:#fff;display:flex;align-items:center;justify-content:center;
          box-shadow:0 10px 30px -10px rgba(0,0,0,.5);backdrop-filter:blur(8px);font-size:20px;cursor:pointer;border:0}
        .tb-panel{right:20px;bottom:20px;width:300px;max-width:calc(100vw - 40px);
          background:rgba(252,250,247,.82);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border:1px solid rgba(0,0,0,.08);border-radius:18px;
          box-shadow:0 24px 60px -20px rgba(30,20,10,.35);overflow:hidden;
          max-height:calc(100vh - 40px);display:flex;flex-direction:column}
        .tb-hd{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid rgba(0,0,0,.07)}
        .tb-hd strong{font-size:14px;letter-spacing:.04em;text-transform:uppercase}
        .tb-hd .x{font-size:18px;line-height:1;background:none;border:0;cursor:pointer;color:#666}
        .tb-bd{padding:16px 18px;overflow-y:auto;display:flex;flex-direction:column;gap:20px}
        .tb-sect>label{display:block;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a8278;margin-bottom:10px;font-weight:600}
        .tb-sw{display:flex;flex-wrap:wrap;gap:8px}
        .tb-chip{display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;border:1px solid rgba(0,0,0,.12);
          background:#fff;font-size:12px;cursor:pointer;transition:.2s}
        .tb-chip.on{border-color:#1c1814;background:#1c1814;color:#fff}
        .tb-chip .dots{display:flex;gap:3px}
        .tb-chip .dots i{width:11px;height:11px;border-radius:50%;display:block}
        .tb-seg{display:flex;flex-direction:column;gap:6px}
        .tb-seg button{text-align:left;padding:9px 12px;border-radius:10px;border:1px solid rgba(0,0,0,.12);
          background:#fff;font-size:13px;cursor:pointer;transition:.2s}
        .tb-seg button.on{border-color:#1c1814;background:#1c1814;color:#fff}
        .tb-tog{display:flex;align-items:center;justify-content:space-between;font-size:13px}
        .tb-tog button{width:42px;height:24px;border-radius:999px;background:#ccc;position:relative;border:0;cursor:pointer;transition:.2s}
        .tb-tog button.on{background:#1c1814}
        .tb-tog button span{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:.2s}
        .tb-tog button.on span{left:21px}
        .tb-ta{width:100%;border:1px solid rgba(0,0,0,.14);border-radius:10px;padding:9px 11px;font-size:13px;
          font-family:inherit;resize:vertical;min-height:64px;background:#fff;box-sizing:border-box}
        .tb-cur{font-size:11px;color:#6b6b6b;line-height:1.5;background:rgba(0,0,0,.04);padding:9px 11px;border-radius:9px}
        .tb-btn{width:100%;padding:11px;border-radius:10px;background:#1c1814;color:#fff;font-size:13px;
          font-weight:500;cursor:pointer;border:0;transition:.2s}
        .tb-btn:hover{background:#3a322a}
        .tb-back{display:inline-block;font-size:12px;color:#8a8278;text-decoration:none;margin-bottom:2px}
        .tb-back:hover{color:#1c1814}
        @media(max-width:640px){
          .tb-panel{right:10px;left:10px;bottom:10px;width:auto;max-width:none;max-height:80vh}
          .tb-fab{right:14px;bottom:14px}
        }
      `}</style>

      {!open && (
        <button className="tb tb-fab" onClick={() => setOpen(true)} aria-label="Abrir panel de ajustes">
          ✦
        </button>
      )}

      {open && (
        <div className="tb tb-panel" role="dialog" aria-label="Panel de ajustes del diseño">
          <div className="tb-hd">
            <strong>Tweaks · {designId}</strong>
            <button className="x" onClick={() => setOpen(false)} aria-label="Minimizar">
              ✕
            </button>
          </div>
          <div className="tb-bd">
            <a className="tb-back" href="/showcase">
              ← Volver a la galería
            </a>

            <div className="tb-sect">
              <label>Paleta de color</label>
              <div className="tb-sw">
                <button
                  className={"tb-chip" + (st.palette === "" ? " on" : "")}
                  onClick={() => setSt({ ...st, palette: "" })}
                >
                  Original
                </button>
                {PALETTES.map((p) => (
                  <button
                    key={p.key}
                    className={"tb-chip" + (st.palette === p.key ? " on" : "")}
                    onClick={() => setSt({ ...st, palette: p.key })}
                    title={p.label}
                  >
                    <span className="dots">
                      <i style={{ background: p.primary }} />
                      <i style={{ background: p.accent }} />
                      <i style={{ background: p.bg, border: "1px solid rgba(0,0,0,.1)" }} />
                    </span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tb-sect">
              <label>Tipografía</label>
              <div className="tb-seg">
                <button
                  className={st.font === "" ? "on" : ""}
                  onClick={() => setSt({ ...st, font: "" })}
                >
                  Original del diseño
                </button>
                {FONTS.map((f) => (
                  <button
                    key={f.key}
                    className={st.font === f.key ? "on" : ""}
                    onClick={() => setSt({ ...st, font: f.key })}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tb-sect">
              <label>Decoración</label>
              <div className="tb-tog">
                <span>Formas orgánicas</span>
                <button
                  className={st.shapes ? "on" : ""}
                  onClick={() => setSt({ ...st, shapes: !st.shapes })}
                  aria-label="Alternar formas orgánicas"
                >
                  <span />
                </button>
              </div>
            </div>

            <div className="tb-sect">
              <label>Notas sobre este diseño</label>
              <textarea
                className="tb-ta"
                placeholder="¿Qué te gusta o cambiarías de este diseño?"
                value={st.notes}
                onChange={(e) => setSt({ ...st, notes: e.target.value })}
              />
            </div>

            <div className="tb-cur">
              Paleta: <b>{paletteLabel}</b>
              <br />
              Fuente: <b>{fontLabel}</b>
            </div>

            <button className="tb-btn" onClick={copySelection}>
              {copied ? "✓ Copiado" : "Copiar selección"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
