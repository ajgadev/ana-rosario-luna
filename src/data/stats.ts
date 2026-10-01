export interface Stat {
  value: string;
  /** Sufijo destacado en color de acento (%, ', +, h). */
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "100", suffix: "%", label: "Sesiones online" },
  { value: "50", suffix: "'", label: "Duración por sesión" },
  { value: "14", suffix: "+", label: "Adolescentes y adultos" },
  { value: "24", suffix: "h", label: "Tiempo de respuesta" },
];
