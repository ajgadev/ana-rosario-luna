const { useState, useEffect, useRef } = React;

/* =================== Icons =================== */
const Icon = ({ name, size = 22, stroke = 1.6 }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "arrow": return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-up-right": return <svg {...common}><path d="M7 17L17 7M9 7h8v8"/></svg>;
    case "menu": return <svg {...common}><path d="M4 7h16M4 17h16"/></svg>;
    case "x": return <svg {...common}><path d="M6 6l12 12M18 6l-12 12"/></svg>;
    case "individual": return <svg {...common}><circle cx="12" cy="8" r="3.5"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>;
    case "couple": return <svg {...common}><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 20c0-3 2.2-5 5-5s5 2 5 5M11 20c0-3 2.2-5 5-5s5 2 5 5"/></svg>;
    case "online": return <svg {...common}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
    case "teen": return <svg {...common}><path d="M12 3l8 4v5c0 4.4-3.6 8-8 9-4.4-1-8-4.6-8-9V7l8-4z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "mail": return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case "phone": return <svg {...common}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z"/></svg>;
    case "pin": return <svg {...common}><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "instagram": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>;
    case "linkedin": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 17v-7"/></svg>;
    case "leaf": return <svg {...common}><path d="M5 19c0-9 7-14 14-14 0 9-5 14-14 14z"/><path d="M5 19c4-4 7-7 14-14"/></svg>;
    case "left": return <svg {...common}><path d="M15 6l-6 6 6 6"/></svg>;
    case "right": return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    default: return null;
  }
};

/* =================== Reveal on scroll hook =================== */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* =================== Nav =================== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#servicios", label: "Servicios" },
    { href: "#como-trabajo", label: "Cómo trabajo" },
    { href: "#blog", label: "Blog" },
    { href: "#contacto", label: "Contacto" },
  ];
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" data-comment-anchor="brand">
          <span className="brand-mark">a</span>
          <span>Ana Rosario <em style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>Luna</em></span>
        </a>
        <nav className="nav-links">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href="#contacto" className="btn btn-primary nav-cta">Reservar cita</a>
        </nav>
        <button className="hamburger" onClick={() => setOpen(true)} aria-label="Abrir menú"><Icon name="menu" size={18}/></button>
      </div>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        <div className="mobile-menu-head">
          <span className="brand"><span className="brand-mark">a</span> Ana Rosario</span>
          <button className="hamburger" onClick={() => setOpen(false)} aria-label="Cerrar menú"><Icon name="x" size={18}/></button>
        </div>
        <nav>{links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}</nav>
        <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 32, justifyContent: "center" }}>
          Reservar cita <Icon name="arrow" size={16}/>
        </a>
      </div>
    </header>
  );
}

/* =================== Hero =================== */
function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-blob" aria-hidden="true"></div>
      <div className="wrap hero-grid">
        <div className="hero-text reveal">
          <div className="eyebrow"><span className="dot"></span> Psicóloga Colegiada · Madrid</div>
          <h1 className="serif">Tu bienestar <br/>emocional <span className="italic">empieza aquí.</span></h1>
          <p className="hero-sub">
            Acompaño a personas adultas y parejas en procesos de cambio,
            ansiedad, autoestima y duelo — con escucha cercana y un enfoque
            integrador basado en la evidencia.
          </p>
          <div className="hero-ctas">
            <a href="#contacto" className="btn btn-primary">Reservar primera consulta <Icon name="arrow" size={16}/></a>
            <a href="#sobre-mi" className="btn-link">Conoce más sobre mí <Icon name="arrow" size={14}/></a>
          </div>
          <div className="hero-meta">
            <span className="line"></span>
            <span>Sesiones presenciales · online · primera consulta orientativa gratuita</span>
          </div>
        </div>
        <div className="hero-visual reveal" style={{ position: "relative" }}>
          <div className="hero-photo"><span className="placeholder-label">Retrato editorial · 4:5</span></div>
          <div className="hero-frame-ornament">
            <span style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "var(--sans)", fontStyle: "normal", letterSpacing: "0.1em", textTransform: "uppercase" }}>desde</span>
            <strong style={{ display: "block", fontStyle: "normal", fontSize: 22, color: "var(--accent-deep)", fontFamily: "var(--serif)", marginTop: 2 }}>2014</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== Trust =================== */
function Trust() {
  const items = [
    { num: "5", suf: "años", label: "de experiencia clínica" },
    { num: "850", suf: "+", label: "pacientes acompañados" },
    { num: "M-28432", suf: "", label: "Colegiada COP Madrid", small: true },
    { num: "UAM", suf: "", label: "Máster en Psicología Clínica", small: true },
  ];
  return (
    <section className="trust" style={{ padding: "44px 0" }}>
      <div className="wrap">
        <div className="trust-grid">
          {items.map((it, i) => (
            <div key={i} className="trust-item reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="trust-num" style={{ fontSize: it.small ? 26 : 38 }}>
                {it.num}{it.suf && <span className="plus">{it.suf}</span>}
              </span>
              <span className="trust-label">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== About =================== */
function About() {
  return (
    <section id="sobre-mi" data-screen-label="02 Sobre mí">
      <div className="wrap about-grid">
        <div className="about-photo reveal">
          <span className="about-photo-cap">Consulta · Calle Velázquez</span>
          <div className="about-photo-secondary" aria-hidden="true"></div>
        </div>
        <div className="about-text reveal">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Sobre mí</div>
          <h2 className="serif">Escuchar bien es <span className="italic">la mitad del camino.</span></h2>
          <p>
            Soy Ana Rosario Luna, psicóloga sanitaria con más de una década de
            experiencia acompañando a adultos y parejas. Mi enfoque integra la
            terapia cognitivo-conductual con herramientas de mindfulness y
            terapia centrada en compasión.
          </p>
          <div className="about-pull">
            «No vengo a darte respuestas — vengo a ayudarte a hacer las preguntas
            que estabas evitando.»
          </div>
          <p>
            Trabajo desde la convicción de que el cambio no se impone:
            se cultiva. Cada proceso es único y mi papel es crear el espacio
            seguro donde puedas mirar, sentir y elegir.
          </p>
          <div className="about-cta">
            <a href="#contacto" className="btn-link">
              Más sobre mi formación y trayectoria <Icon name="arrow" size={14}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== Services =================== */
function Services() {
  const services = [
    { icon: "individual", name: "Terapia Individual", desc: "Ansiedad, autoestima, duelo, momentos de transición. Un espacio para reencontrarte." },
    { icon: "couple",     name: "Terapia de Pareja",  desc: "Comunicación, conflictos, reconstrucción. Para parejas que quieren entenderse mejor." },
    { icon: "online",     name: "Terapia Online",     desc: "Misma calidad, donde estés. Videollamada segura, también para residentes en el extranjero." },
    { icon: "teen",       name: "Adolescentes",       desc: "Acompañamiento a jóvenes de 14 a 18 años, en colaboración cercana con la familia." },
  ];
  return (
    <section id="servicios" data-screen-label="03 Servicios">
      <div className="wrap">
        <div className="services-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}><span style={{ width: 5, height: 5, background: "var(--accent)", borderRadius: "50%", display: "inline-block", marginRight: 10, verticalAlign: "middle" }}></span>Servicios</div>
            <h2 className="serif">Cuatro formas de <span style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>empezar.</span></h2>
          </div>
          <p className="lede reveal">
            Cada modalidad está pensada para una etapa o necesidad distinta —
            siempre con la misma intención: que te sientas escuchada desde el
            primer minuto.
          </p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service reveal" key={s.name} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="service-num">0{i + 1}</span>
              <div className="service-icon"><Icon name={s.icon} size={24}/></div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-foot">
                <span>Saber más</span>
                <span className="service-arrow"><Icon name="arrow-up-right" size={18}/></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== How =================== */
function How() {
  const steps = [
    { n: "i", title: "Contacta conmigo", desc: "Escríbeme por el formulario, WhatsApp o reserva directamente una llamada orientativa gratuita de 20 minutos." },
    { n: "ii", title: "Primera sesión", desc: "Nos conocemos sin presión. Escucho tu historia, exploramos juntas qué necesitas y definimos objetivos claros." },
    { n: "iii", title: "Tu proceso", desc: "Sesiones semanales o quincenales — siempre adaptadas a tu ritmo. Revisamos avances cada pocas semanas." },
  ];
  return (
    <section id="como-trabajo" className="how" data-screen-label="04 Cómo trabajo">
      <div className="wrap">
        <div className="how-head reveal">
          <div className="eyebrow">Cómo trabajo</div>
          <h2 className="serif">Tres pasos, <span style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>sin sorpresas.</span></h2>
          <p className="lede">Saber qué esperar es la primera forma de sentirse tranquila.</p>
        </div>
        <div className="how-grid">
          {steps.map((s, i) => (
            <div className="how-step reveal" key={s.n} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="how-step-num">{s.n}</div>
              <h3 className="serif">{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== Testimonials =================== */
function Testimonials() {
  const items = [
    { body: "Llegué con la sensación de no entenderme. Ana me ayudó a poner palabras a lo que sentía, sin juicios, sin prisas. Hoy entiendo mucho mejor lo que necesito.", who: "Marta, 34 años", ctx: "Terapia individual · 8 meses" },
    { body: "Mi pareja y yo estuvimos a punto de romper. Las sesiones nos enseñaron a hablar de verdad — no a evitar. Tres años después seguimos juntos y mejor que nunca.", who: "Pablo y Cris", ctx: "Terapia de pareja · 6 meses" },
    { body: "Vivo fuera de España y dudaba mucho del formato online. Funciona exactamente igual. Lo que cambia las cosas es Ana, no el medio.", who: "Lucía, 41 años", ctx: "Terapia online · en curso" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(prev => (prev + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <section className="testimonials" data-screen-label="05 Testimonios">
      <div className="wrap">
        <div className="eyebrow">Testimonios</div>
        <h2 className="serif" style={{ marginTop: 16 }}>Lo que cuentan <span style={{ fontStyle: "italic", color: "rgba(243,236,223,.6)" }}>quienes confiaron.</span></h2>
        <div className="testimonial-stage">
          {items.map((it, idx) => (
            <div className={"t-card" + (idx === i ? " active" : "")} key={idx}>
              <span className="t-quote-mark">“</span>
              <div className="t-body">{it.body}</div>
              <div className="t-attr"><span className="dash"></span>{it.who} · <em style={{ opacity: 0.75 }}>{it.ctx}</em></div>
            </div>
          ))}
        </div>
        <div className="t-controls">
          <div className="t-dots">
            {items.map((_, idx) => (
              <button key={idx} className={"t-dot" + (idx === i ? " active" : "")} onClick={() => setI(idx)} aria-label={`Testimonio ${idx + 1}`}/>
            ))}
          </div>
          <div className="t-arrows">
            <button className="t-arrow" onClick={() => setI((i - 1 + items.length) % items.length)} aria-label="Anterior"><Icon name="left" size={18}/></button>
            <button className="t-arrow" onClick={() => setI((i + 1) % items.length)} aria-label="Siguiente"><Icon name="right" size={18}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== Blog =================== */
function Blog() {
  const posts = [
    { cat: "Ansiedad", date: "12 mayo 2026", read: "6 min", title: "Cuando la ansiedad no se calla: aprender a convivir antes de combatir", excerpt: "Por qué luchar contra la ansiedad la alimenta — y qué hacer en su lugar.", cls: "blog-thumb-1", label: "Imagen editorial 4:3" },
    { cat: "Pareja", date: "28 abril 2026", read: "8 min", title: "Las cuatro conversaciones que toda pareja debería tener cada año", excerpt: "Una guía práctica para hablar de lo importante antes de que se vuelva urgente.", cls: "blog-thumb-2", label: "Imagen editorial 4:3" },
    { cat: "Autoestima", date: "10 abril 2026", read: "5 min", title: "El crítico interior: cómo identificarlo y dejar de obedecerle", excerpt: "Esa voz que te dice que no es suficiente no es tuya — es aprendida.", cls: "blog-thumb-3", label: "Imagen editorial 4:3" },
  ];
  return (
    <section id="blog" data-screen-label="06 Blog">
      <div className="wrap">
        <div className="blog-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Blog</div>
            <h2 className="serif">Lecturas para <span style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>el camino.</span></h2>
          </div>
          <a href="#" className="btn-link">Ver todos los artículos <Icon name="arrow" size={14}/></a>
        </div>
        <div className="blog-grid">
          {posts.map((p, i) => (
            <a className="blog-card reveal" href="#" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className={"blog-thumb " + p.cls}><span className="blog-thumb-label">{p.label}</span></div>
              <div className="blog-meta">{p.cat}<span className="sep"></span>{p.date}<span className="sep"></span>{p.read}</div>
              <h3 className="blog-title">{p.title}</h3>
              <p className="blog-excerpt">{p.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== FAQ =================== */
function FAQ() {
  const items = [
    { q: "¿Cuánto dura una sesión?", a: "Cada sesión dura 50 minutos, tanto en consulta como en formato online. La primera sesión puede extenderse hasta 60 minutos para tener tiempo de conocernos." },
    { q: "¿Con qué frecuencia debo asistir?", a: "Lo habitual es una sesión semanal durante las primeras semanas, para coger ritmo. Más adelante, según el proceso, podemos pasar a sesiones quincenales o de mantenimiento mensual." },
    { q: "¿Las sesiones online son igual de efectivas?", a: "Sí. La investigación reciente y mi propia experiencia clínica confirman que la terapia online es tan efectiva como la presencial para la mayoría de motivos de consulta — siempre que se cuide el encuadre y la conexión." },
    { q: "¿Es confidencial?", a: "Absolutamente. Estoy sujeta al código deontológico del Colegio Oficial de Psicólogos y al secreto profesional. Nada de lo que hablemos sale de la consulta, salvo las excepciones legales muy concretas que te explicaré en la primera sesión." },
    { q: "¿Cuánto cuestan las sesiones?", a: "La sesión individual tiene un coste de 70€ y la de pareja 90€. La primera llamada orientativa de 20 minutos es gratuita. Cuento con bono de 4 sesiones con descuento." },
    { q: "¿Cómo sé si necesito terapia?", a: "No hace falta estar en crisis. Si sientes que algo te pesa, te bloquea o te repites patrones que no quieres — eso ya es motivo suficiente. La primera llamada nos sirve a las dos para ver si tiene sentido empezar." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section data-screen-label="07 FAQ">
      <div className="wrap faq-grid">
        <div className="faq-side reveal">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Preguntas frecuentes</div>
          <h2 className="serif">Lo que <span style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>casi todas</span> me preguntan.</h2>
          <p className="lede">No tienes por qué tenerlo claro antes de empezar. Pero si te ayuda saberlo, aquí está.</p>
          <div className="contact-mini">
            <div className="contact-mini-label">¿Otra pregunta?</div>
            <a href="mailto:hola@anarosarioluna.es">hola@anarosarioluna.es</a>
          </div>
        </div>
        <div className="faq-list reveal">
          {items.map((it, i) => (
            <div key={i} className={"faq-item" + (open === i ? " open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="faq-toggle" aria-hidden="true"></span>
              </button>
              <div className="faq-a"><div style={{ maxWidth: "60ch" }}>{it.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== Contact =================== */
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = true;
    if (form.message.trim().length < 6) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }, 5000);
  }
  return (
    <section id="contacto" className="contact" data-screen-label="08 Contacto">
      <div className="contact-blob" aria-hidden="true"></div>
      <div className="wrap contact-grid">
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Contacto</div>
          <h2 className="serif">Da el <span className="italic">primer paso.</span></h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Reserva una llamada orientativa gratuita de 20 minutos — o escríbeme
            unas líneas. Suelo responder en menos de 24 horas, de lunes a viernes.
          </p>
          <div style={{ marginTop: 36 }}>
            <a href="#" className="btn btn-primary" style={{ marginRight: 12 }}>Reservar en Calendly <Icon name="arrow" size={16}/></a>
            <a href="#" className="btn btn-ghost">Escribir por WhatsApp</a>
          </div>
          <div className="contact-info">
            <div className="contact-row">
              <div className="icon"><Icon name="mail" size={18}/></div>
              <div>
                <div className="label">Email</div>
                <div className="value"><a href="mailto:hola@anarosarioluna.es">hola@anarosarioluna.es</a></div>
              </div>
            </div>
            <div className="contact-row">
              <div className="icon"><Icon name="phone" size={18}/></div>
              <div>
                <div className="label">Teléfono</div>
                <div className="value"><a href="tel:+34611223344">+34 611 22 33 44</a></div>
              </div>
            </div>
            <div className="contact-row">
              <div className="icon"><Icon name="pin" size={18}/></div>
              <div>
                <div className="label">Consulta</div>
                <div className="value">C/ Velázquez 84, 3º D · 28006 Madrid</div>
              </div>
            </div>
            <div className="contact-row">
              <div className="icon"><Icon name="clock" size={18}/></div>
              <div>
                <div className="label">Horario</div>
                <div className="value">Lun—Vie · 10:00 a 20:00</div>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={submit} noValidate>
          {sent && (
            <div className="success-msg">
              <Icon name="leaf" size={18}/>
              <span>Gracias. Te respondo en menos de 24 horas.</span>
            </div>
          )}
          <div className="field">
            <label>Nombre</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={errors.name ? { borderBottomColor: "var(--accent)" } : null} placeholder="Cómo te llamas"/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              style={errors.email ? { borderBottomColor: "var(--accent)" } : null} placeholder="tu@email.com"/>
          </div>
          <div className="field">
            <label>Teléfono <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--muted)" }}>(opcional)</span></label>
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+34 ..."/>
          </div>
          <div className="field">
            <label>Mensaje</label>
            <textarea rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              style={errors.message ? { borderBottomColor: "var(--accent)" } : null}
              placeholder="Cuéntame brevemente qué te trae por aquí. Sin detalle, sólo una idea."/>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Enviar mensaje <Icon name="arrow" size={16}/>
          </button>
          <div className="form-foot">
            <span>Tus datos no se comparten. Política de privacidad.</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11 }}>RGPD ✓</span>
          </div>
        </form>
      </div>
    </section>
  );
}

/* =================== Footer =================== */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand" style={{ color: "#FAF6F0" }}>
              <span className="brand-mark">a</span>
              <span>Ana Rosario <em style={{ fontStyle: "italic", color: "rgba(230,222,207,.65)" }}>Luna</em></span>
            </div>
            <p>Psicóloga sanitaria. Madrid &amp; online.<br/>Colegiada COP M-28432.</p>
            <div className="foot-socials" style={{ marginTop: 24 }}>
              <a href="#" aria-label="Instagram"><Icon name="instagram" size={16}/></a>
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={16}/></a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Explora</h4>
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#servicios">Servicios</a>
            <a href="#como-trabajo">Cómo trabajo</a>
            <a href="#blog">Blog</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div className="foot-col">
            <h4>Servicios</h4>
            <a href="#">Terapia individual</a>
            <a href="#">Terapia de pareja</a>
            <a href="#">Terapia online</a>
            <a href="#">Adolescentes</a>
          </div>
          <div className="foot-col">
            <h4>Contacto</h4>
            <a href="mailto:hola@anarosarioluna.es">hola@anarosarioluna.es</a>
            <a href="tel:+34611223344">+34 611 22 33 44</a>
            <span>C/ Velázquez 84, Madrid</span>
            <span>Lun—Vie 10:00–20:00</span>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Ana Rosario Luna · Todos los derechos reservados</span>
          <span style={{ display: "flex", gap: 22 }}>
            <a href="#">Política de privacidad</a>
            <a href="#">Aviso legal</a>
            <a href="#">Cookies</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* =================== Tweaks =================== */
const PALETTES = [
  { key: "sage",       hero: "#8FA08C", swatches: ["#8FA08C", "#C8755A", "#C9D1C0"], tone: "#8FA08C", toneSoft: "#C9D1C0", accent: "#C8755A", accentDeep: "#A85E45", bgDeep: "#2E332C" },
  { key: "terracotta", hero: "#C49882", swatches: ["#C49882", "#B05A3C", "#E8D5C2"], tone: "#C49882", toneSoft: "#E8D5C2", accent: "#B05A3C", accentDeep: "#8E4628", bgDeep: "#3A2B22" },
  { key: "ochre",      hero: "#B8A37A", swatches: ["#B8A37A", "#B98D4A", "#E2D4B5"], tone: "#B8A37A", toneSoft: "#E2D4B5", accent: "#B98D4A", accentDeep: "#8E6829", bgDeep: "#322B22" },
  { key: "rose",       hero: "#C49AA0", swatches: ["#C49AA0", "#A6614A", "#E8CCD0"], tone: "#C49AA0", toneSoft: "#E8CCD0", accent: "#A6614A", accentDeep: "#84442F", bgDeep: "#322226" },
];
const SERIFS = [
  { value: "cormorant", label: "Cormorant", stack: '"Cormorant Garamond", Georgia, serif' },
  { value: "playfair",  label: "Playfair",  stack: '"Playfair Display", Georgia, serif' },
  { value: "dmserif",   label: "DM Serif",  stack: '"DM Serif Display", Georgia, serif' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sage",
  "serif": "cormorant",
  "blobs": true
}/*EDITMODE-END*/;

function TweaksWrap() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const r = document.documentElement;
    const p = PALETTES.find(p => p.key === t.palette) || PALETTES[0];
    r.style.setProperty("--tone", p.tone);
    r.style.setProperty("--tone-soft", p.toneSoft);
    r.style.setProperty("--accent", p.accent);
    r.style.setProperty("--accent-deep", p.accentDeep);
    r.style.setProperty("--bg-deep", p.bgDeep);
    const s = SERIFS.find(s => s.value === t.serif) || SERIFS[0];
    r.style.setProperty("--serif", s.stack);
    document.querySelectorAll(".hero-blob, .contact-blob").forEach(el => {
      el.style.display = t.blobs ? "block" : "none";
    });
  }, [t]);

  const { TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakToggle } = window;
  // Build palette options as color arrays; map selection back to key via hero match.
  const paletteOptions = PALETTES.map(p => p.swatches);
  const currentSwatches = (PALETTES.find(p => p.key === t.palette) || PALETTES[0]).swatches;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Paleta">
        <TweakColor
          label="Tono"
          value={currentSwatches}
          onChange={arr => {
            const match = PALETTES.find(p => p.swatches[0].toLowerCase() === String(arr[0]).toLowerCase());
            if (match) setTweak("palette", match.key);
          }}
          options={paletteOptions}
        />
      </TweakSection>
      <TweakSection label="Tipografía">
        <TweakSelect
          label="Serif"
          value={t.serif}
          onChange={v => setTweak("serif", v)}
          options={SERIFS}
        />
      </TweakSection>
      <TweakSection label="Decoración">
        <TweakToggle label="Formas orgánicas" value={t.blobs} onChange={v => setTweak("blobs", v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

/* =================== Custom TweakColor (palette swatch) =================== */
// We use base TweakColor but pass options with color arrays — base supports arrays. Good.

/* =================== Root =================== */
function App() {
  useReveal();
  return (
    <React.Fragment>
      <Nav/>
      <main>
        <Hero/>
        <Trust/>
        <About/>
        <Services/>
        <How/>
        <Testimonials/>
        <Blog/>
        <FAQ/>
        <Contact/>
      </main>
      <Footer/>
      <TweaksWrap/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
