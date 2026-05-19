// Metadatos de los 8 diseños del showcase.
// El render fiel de cada diseño vive en /public/designs/<id>/index.html
// y se muestra vía iframe en /showcase/<id>.

export interface Design {
  id: string;            // "01" .. "08"
  name: string;          // nombre corto
  title: string;         // titular de la tarjeta
  pill: string;          // etiqueta
  desc: string;          // descripción
  swatches: string[];    // colores representativos
  props: string[];       // características
  sections: string;      // "11 secciones"
}

export const DESIGNS: Design[] = [
  {
    id: "01",
    name: "Editorial Warmth",
    title: "Cálida y editorial",
    pill: "React · Tweaks",
    desc: "Hero asimétrico con foto arqueada, formas orgánicas sutiles y panel de Tweaks integrado. La dirección «luxury wellness» del brief, con más interactividad.",
    swatches: ["#FAF6F0", "#8FA08C", "#C8755A", "#2E332C"],
    props: ["Cormorant + Jakarta", "Sage · Terracotta", "Sticky nav", "Tweaks panel"],
    sections: "11 secciones",
  },
  {
    id: "02",
    name: "Quiet Atelier",
    title: "Editorial de autor",
    pill: "Magazine",
    desc: "Layout de revista impresa: masthead, índice, capitulares, pull-quotes y un grid asimétrico de lecturas. Menos botones, más respiro tipográfico.",
    swatches: ["#F8F3EA", "#9A6B47", "#7E8A6F", "#1F1B16"],
    props: ["Playfair + Outfit", "Tabaco · oliva", "Sin nav sticky", "Capitular dropcap"],
    sections: "10 secciones",
  },
  {
    id: "03",
    name: "Forest & Cream",
    title: "Bosque sobre crema",
    pill: "Premium",
    desc: "Hero a pantalla completa en verde profundo, secciones alternando crema y oscuro, marquee tipográfico y tarjeta de retrato con sello. La opción más «boutique de bienestar».",
    swatches: ["#F4EEDE", "#1F2A22", "#CB7A5A", "#A8B59A"],
    props: ["DM Serif + Inter", "Verde profundo", "Hero full-bleed", "Marquee viva"],
    sections: "11 secciones",
  },
  {
    id: "04",
    name: "Soft Sans",
    title: "Sin serifa, con calidez",
    pill: "Contemporáneo",
    desc: "Sólo sans en pesos finos y display gigante, paleta monocroma cálida con un único coral, y un bloque de contacto en tarjeta oscura. La opción más actual, sin perder suavidad.",
    swatches: ["#F5EFE6", "#D67A52", "#1C1814", "#EBE3D3"],
    props: ["Plus Jakarta sólo", "Cream · coral", "Type colosal", "Card oscura CTA"],
    sections: "9 secciones",
  },
  {
    id: "05",
    name: "Vintage Bordered",
    title: "Editorial clásica",
    pill: "Clásica",
    desc: "El tono más libresco: masthead doble línea, marcos con outline, dropcaps, numerales romanos y firma manuscrita. Para transmitir trayectoria y reposo.",
    swatches: ["#F1E9D7", "#9C4A2B", "#A87F36", "#262017"],
    props: ["Cormorant + SC", "Sepia · óxido", "Frames clásicos", "Numerales romanos", "Dropcaps"],
    sections: "10 secciones",
  },
  {
    id: "06",
    name: "Twilight Lavender",
    title: "Crepúsculo lavanda",
    pill: "Calmante",
    desc: "Paleta de ciruela y lavanda con blush y un toque de oro — el lenguaje visual del descanso. Nav flotante en píldora, hero con foto en arco, tarjeta de contacto en ciruela profundo.",
    swatches: ["#F7F3F8", "#A493B8", "#6B4C7A", "#E8C8C0"],
    props: ["Fraunces + Manrope", "Ciruela · lavanda · blush", "Nav píldora flotante", "Glow ambiental"],
    sections: "10 secciones",
  },
  {
    id: "07",
    name: "Clay & Blush",
    title: "Cerámica contemporánea",
    pill: "Cerámica",
    desc: "Formas orgánicas — blobs que respiran, foto en círculo, tarjetas con borde superior de arcilla, vasijas como numerales del proceso. Paleta cálida de arcilla y rubor.",
    swatches: ["#FBF6EF", "#E9C8B8", "#C77B5F", "#8A4332"],
    props: ["Instrument Serif", "Arcilla · rubor · marfil", "Blobs animados", "Foto circular"],
    sections: "10 secciones",
  },
  {
    id: "08",
    name: "Dusk & Rose",
    title: "Azul atardecer + rosa antiguo",
    pill: "Editorial",
    desc: "Hero dividido — texto sobre crema a la izquierda, foto sobre azul atardecer a la derecha. Servicios en grid oscuro con hover en rosa antiguo, FAQ con numerales romanos.",
    swatches: ["#F4EFE9", "#4A5A6F", "#C68A8F", "#2A3445", "#E8C5C7"],
    props: ["Cormorant + Geist", "Azul atardecer + rosa", "Split-screen hero", "Servicios oscuros"],
    sections: "11 secciones",
  },
];

export const getDesign = (id: string) => DESIGNS.find((d) => d.id === id);
