// Datos generales de la consulta. Fuente única para header, hero, contacto y footer.
// ⚠️ Confirmar con la clienta antes de publicar (ROADMAP · Fase 2).

export interface NavLink {
  label: string;
  href: string;
}

export const SITE = {
  name: "Ana Rosario Luna",
  role: "Psicóloga General Sanitaria",
  modality: "Sesiones virtuales",
  audience: "Atención de adolescentes y adultos",
  description:
    "Ana Rosario Luna, psicóloga general sanitaria. Sesiones virtuales para adolescentes y adultos.",
  email: "anarosarioluna@hotmail.com",
  whatsapp: {
    display: "+34 645 258 749",
    url: "https://wa.me/34645258749",
  },
  /** Reserva de citas. ⚠️ Cuenta de PRUEBA (Alejandro): cambiar por la de Ana. */
  booking: {
    url: "https://calendly.com/alejandro-g-206/15min",
  },
  quote: "No hace falta estar en la misma sala para sentirte escuchada de verdad.",
} as const;

export type SocialNetwork = "linkedin";

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    network: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ana-rosario-luna-488a9328b",
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Sobre mí", href: "#sobre" },
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo trabajo", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];
