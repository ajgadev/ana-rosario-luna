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
  {
    quote:
      "Llegar a este espacio fue encontrar un lugar donde reencontrarme conmigo misma, sentirme segura y acompañada. Durante cada sesión online construimos genuinamente un vínculo de confianza. Ana me acompañó con mucha sensibilidad y respeto. Todo el proceso fue muy valioso para mí. Estoy profundamente agradecida por su calidez, su compromiso y la manera tan humana en la que ejerce su profesión. Recomiendo su acompañamiento para quienes estén en busca de un espacio de escucha, respeto y genuino cuidado. Muchas gracias.",
    context: "Sesión virtual",
  },
];
