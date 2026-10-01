export interface Testimonial {
  quote: string;
  /** Opcional: los testimonios son anónimos por decisión de la clienta. */
  author?: string;
  context: string;
}

// Testimonios reales de pacientes, publicados de forma anónima.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Fue mi primera vez en terapia y gracias a este espacio aprendí a darle a mi salud mental la atención que merecía.",
    context: "Sesión virtual",
  },
  {
    quote:
      "Ana me comprendió y fue muy amable y disponible desde nuestra primera sesión. Me hizo volver a confiar en la terapia.",
    context: "Sesión virtual",
  },
  {
    quote:
      "Tenía un duelo sin afrontar y no lo sabía. Ana me ayudó en todo momento, fue muy comprensiva y me sentí siempre escuchado.",
    context: "Sesión virtual",
  },
];
