import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import olympusCss from "../styles/olympus.css?url";
import portrait from "@/assets/arthur-portrait.jpg.asset.json";
import casual from "@/assets/arthur-casual.jpg.asset.json";
import robot from "@/assets/robot.png.asset.json";
import astronaut from "@/assets/astronaut.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arthur DJATCHEU — Le Porteur de Code" },
      { name: "description", content: "Portfolio d’Arthur DJATCHEU, développeur web junior à Douala : un voyage entre mythologie grecque, constellation du Verseau et robots." },
      { property: "og:title", content: "Arthur DJATCHEU — Le Porteur de Code" },
      { property: "og:description", content: "Reliez les étoiles du Verseau et explorez le portfolio d’Arthur, guidé par un robot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: olympusCss }],
  }),
  staticData: { importedDocument: { html: { lang: "fr" } } },
  component: Index,
});

/* ---------- Aquarius ---------- */
type Star = { id: string; name: string; x: number; y: number; r: number; info?: string };
const STARS: Star[] = [
  { id: "albali", name: "Albali", x: 120, y: 190, r: 3 },
  { id: "sadalsuud", name: "Sadalsuud", x: 290, y: 225, r: 7, info: "1re du Verseau · magnitude 2,90 — l’épaule gauche de Ganymède. Supergéante jaune à plus de 500 années-lumière. « Sadal-suud » : la chance des chances." },
  { id: "sadalmelik", name: "Sadalmelik", x: 470, y: 150, r: 7, info: "2e du Verseau · magnitude 2,95 — l’épaule droite. Supergéante jaune lointaine. « Sadal-melik » : la chance du roi." },
  { id: "sadachbia", name: "Sadachbia", x: 575, y: 200, r: 3.5 },
  { id: "zeta", name: "Zêta", x: 625, y: 168, r: 3.5 },
  { id: "eta", name: "Êta", x: 680, y: 210, r: 3 },
  { id: "ancha", name: "Ancha", x: 505, y: 290, r: 4 },
  { id: "lambda", name: "Lambda", x: 560, y: 385, r: 4 },
  { id: "skat", name: "Skat", x: 480, y: 505, r: 6, info: "3e du Verseau · magnitude 3,27 — la jambe droite, tout en bas. Étoile blanche bien plus proche : 160 années-lumière." },
  { id: "tau", name: "Tau", x: 650, y: 440, r: 3 },
  { id: "phi", name: "Phi", x: 745, y: 470, r: 3 },
  { id: "psi", name: "Psi", x: 820, y: 520, r: 3 },
];
const EDGES: [string, string][] = [
  ["albali", "sadalsuud"], ["sadalsuud", "sadalmelik"], ["sadalmelik", "sadachbia"], ["sadachbia", "zeta"], ["zeta", "eta"],
  ["sadalmelik", "ancha"], ["ancha", "lambda"], ["lambda", "skat"], ["lambda", "tau"], ["tau", "phi"], ["phi", "psi"],
];
const ORDER = ["sadalsuud", "sadalmelik", "skat", "albali", "sadachbia", "zeta", "eta", "ancha", "lambda", "tau", "phi", "psi"];
const star = (id: string) => STARS.find((s) => s.id === id)!;

/* ---------- Content ---------- */
const SECTIONS = [
  { id: "hero", label: "Olympe", bot: "Bienvenue, voyageur ! Je suis HERMÈS-01, messager des dieux… version robot. Je te guide dans l’univers d’Arthur." },
  { id: "mythos", label: "Mythos", bot: "Ici, la légende d’Arthur : un Verseau de Douala qui verse du code au lieu de l’eau." },
  { id: "arsenal", label: "Arsenal", bot: "L’arsenal d’Arthur. Chaque compétence est une arme forgée dans les forges d’Héphaïstos." },
  { id: "odyssee", label: "Odyssée", bot: "Son odyssée : du Lycée Joss à l’IUT de Douala, avec des certifications gagnées comme des trophées." },
  { id: "travaux", label: "Travaux", bot: "Les travaux d’Arthur — comme Héraclès, mais avec du JavaScript. Clique pour les visiter !" },
  { id: "oracle", label: "Oracle", bot: "Consulte l’oracle : envoie un message à Arthur, il répond plus vite qu’Hermès." },
];

const SKILLS = [
  { name: "HTML", v: 90, god: "Athéna", note: "Structure & sagesse" },
  { name: "CSS", v: 65, god: "Aphrodite", note: "Beauté des interfaces" },
  { name: "JavaScript", v: 60, god: "Zeus", note: "La foudre de l’interactivité" },
  { name: "Python", v: 60, god: "Héphaïstos", note: "La forge des algorithmes" },
];
const PROJECTS = [
  { n: "I", year: "2024", title: "NURU", url: "https://nuru-ashy.vercel.app/", desc: "Plateforme qui met en lumière les génies tech africains : talents, innovateurs et visionnaires.", tags: ["HTML", "CSS", "JavaScript", "Vercel"], myth: "Le flambeau de Prométhée" },
  { n: "II", year: "2025", title: "Maëlle Beauty", url: "https://maelle-beauty-glow.lovable.app/", desc: "Vitrine e-commerce d’une marque de cosmétiques naturels d’inspiration africaine.", tags: ["React", "Tailwind", "Lovable"], myth: "Le miroir d’Aphrodite" },
  { n: "III", year: "2026", title: "Viny Natural Juice", url: "https://viny-natural-juice.vercel.app/", desc: "Jus 100 % bio pressés à froid à Douala, avec un créateur de recettes interactif.", tags: ["Next.js", "React", "Tailwind"], myth: "L’ambroisie de l’Olympe" },
];

/* ---------- Starfield ---------- */
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, mx = 0, my = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars = Array.from({ length: 260 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() * 0.8 + 0.2, t: Math.random() * 6 }));
    let shoot: { x: number; y: number; l: number } | null = null;
    const resize = () => { w = c.width = innerWidth * devicePixelRatio; h = c.height = innerHeight * devicePixelRatio; };
    const move = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    resize(); addEventListener("resize", resize); addEventListener("pointermove", move);
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const sy = scrollY * 0.05;
      for (const s of stars) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t / 1400 + s.t));
        const x = ((s.x * w - mx * 40 * s.z * devicePixelRatio) % w + w) % w;
        const y = ((s.y * h - (my * 40 + sy) * s.z * devicePixelRatio) % h + h) % h;
        ctx.globalAlpha = a * s.z; ctx.fillStyle = s.z > 0.85 ? "#f4d58d" : "#cfe0ff";
        ctx.beginPath(); ctx.arc(x, y, s.z * 1.4 * devicePixelRatio, 0, 7); ctx.fill();
      }
      if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * w, y: Math.random() * h * 0.4, l: 0 };
      if (shoot) {
        shoot.l += 0.02; const len = 160 * devicePixelRatio;
        const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - len, shoot.y - len * 0.4);
        g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalAlpha = 1 - shoot.l; ctx.strokeStyle = g; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - len, shoot.y - len * 0.4); ctx.stroke();
        shoot.x += 14 * devicePixelRatio; shoot.y += 5.6 * devicePixelRatio; if (shoot.l >= 1) shoot = null;
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}

/* ---------- Intro game ---------- */
function ConstellationGame({ onEnter }: { onEnter: () => void }) {
  const [lit, setLit] = useState<string[]>([]);
  const [info, setInfo] = useState<Star | null>(null);
  const done = lit.length === STARS.length;
  const next = ORDER.find((id) => !lit.includes(id));
  const light = (s: Star) => { if (!lit.includes(s.id)) setLit((l) => [...l, s.id]); if (s.info) setInfo(s); };
  const autoComplete = () => { setInfo(null); ORDER.forEach((id, i) => setTimeout(() => setLit((l) => (l.includes(id) ? l : [...l, id])), i * 110)); };
  const name = "ARTHUR DJATCHEU";
  return (
    <div className={`intro ${done ? "is-done" : ""}`}>
      <div className="intro-top">
        <span className="mono">♒ CONSTELLATION DU VERSEAU</span>
        <button className="ghost-btn" onClick={onEnter}>Passer ✕</button>
      </div>
      <p className="intro-hint">
        {done ? "Le Porteur d’eau s’est éveillé." : <>Touche les étoiles pour réveiller le Verseau — commence par les trois plus brillantes. <b>{lit.length}/{STARS.length}</b></>}
      </p>
      <svg viewBox="0 0 940 600" className="sky" role="group" aria-label="Constellation du Verseau à relier">
        <defs>
          <radialGradient id="glow"><stop offset="0" stopColor="#fff8e1" /><stop offset=".35" stopColor="#f4c96b" /><stop offset="1" stopColor="#f4c96b" stopOpacity="0" /></radialGradient>
        </defs>
        {EDGES.map(([a, b]) => {
          const A = star(a), B = star(b), on = lit.includes(a) && lit.includes(b);
          return <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className={`edge ${on ? "on" : ""}`} />;
        })}
        {done && <path className="water" d="M480 505 C 520 560, 600 560, 650 580 M 505 290 C 420 360, 380 420, 300 560" />}
        {STARS.map((s) => {
          const on = lit.includes(s.id);
          return (
            <g key={s.id} className={`star ${on ? "on" : ""} ${s.id === next && !done ? "next" : ""} ${s.info ? "major" : ""}`} onClick={() => light(s)} tabIndex={0} role="button" aria-label={s.name} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && light(s)}>
              <circle cx={s.x} cy={s.y} r={28} fill="transparent" />
              <circle cx={s.x} cy={s.y} r={s.r * 4} fill="url(#glow)" className="halo" />
              <circle cx={s.x} cy={s.y} r={s.r} className="core" />
              {(on && s.info) || (s.info && !on) ? <text x={s.x + 14} y={s.y - 14} className="star-label">{s.name}</text> : null}
            </g>
          );
        })}
      </svg>
      {info && !done && (
        <div className="star-card" key={info.id}>
          <h4>✦ {info.name}</h4><p>{info.info}</p>
        </div>
      )}
      <div className="intro-bottom">
        {done ? (
          <div className="reveal-name">
            <h1>{name.split("").map((c, i) => <span key={i} style={{ animationDelay: `${i * 60}ms` }}>{c === " " ? "\u00a0" : c}</span>)}</h1>
            <p className="mono">DÉVELOPPEUR WEB JUNIOR · GÉNIE INFORMATIQUE · ♒ VERSEAU</p>
            <button className="cta" onClick={onEnter}>Entrer dans l’Olympe →</button>
          </div>
        ) : (
          <button className="ghost-btn" onClick={autoComplete}>✧ Laisser les dieux tracer</button>
        )}
      </div>
    </div>
  );
}

/* ---------- Robot guide ---------- */
function RobotGuide({ active }: { active: number }) {
  const [open, setOpen] = useState(true);
  const [typed, setTyped] = useState("");
  const msg = SECTIONS[active]?.bot ?? "";
  useEffect(() => {
    setTyped(""); let i = 0;
    const id = setInterval(() => { i++; setTyped(msg.slice(0, i)); if (i >= msg.length) clearInterval(id); }, 18);
    return () => clearInterval(id);
  }, [msg]);
  const go = (i: number) => document.getElementById(SECTIONS[i]?.id ?? "hero")?.scrollIntoView({ behavior: "smooth" });
  return (
    <aside className={`guide ${open ? "open" : ""}`} aria-live="polite">
      {open && (
        <div className="bubble">
          <span className="mono bubble-head">HERMÈS-01 · {SECTIONS[active]?.label}</span>
          <p>{typed}<span className="caret">▍</span></p>
          <div className="bubble-actions">
            {active < SECTIONS.length - 1 ? <button onClick={() => go(active + 1)}>Étape suivante →</button> : <button onClick={() => go(0)}>↺ Retour à l’Olympe</button>}
            <button className="x" onClick={() => setOpen(false)} aria-label="Fermer le guide">✕</button>
          </div>
        </div>
      )}
      <button className="bot" onClick={() => setOpen((o) => !o)} aria-label="Robot guide">
        <img src={robot.url} alt="" />
      </button>
    </aside>
  );
}

/* ---------- Page ---------- */
function Index() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { document.body.style.overflow = entered ? "" : "hidden"; return () => { document.body.style.overflow = ""; }; }, [entered]);
  useEffect(() => {
    if (!entered) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    const so = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(SECTIONS.findIndex((s) => s.id === e.target.id)); }), { rootMargin: "-45% 0px -45% 0px" });
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) so.observe(el); });
    return () => { io.disconnect(); so.disconnect(); };
  }, [entered]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:djatcheuarthur4@gmail.com?subject=${encodeURIComponent(String(f.get("subject") || "Contact portfolio"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="olympus">
      <Starfield />
      {!entered && <ConstellationGame onEnter={() => { setEntered(true); scrollTo(0, 0); }} />}

      <header className="nav">
        <a href="#hero" className="logo">♒ A·D</a>
        <nav className={menu ? "show" : ""}>
          {SECTIONS.slice(1).map((s, i) => <a key={s.id} href={`#${s.id}`} className={active === i + 1 ? "cur" : ""} onClick={() => setMenu(false)}>{s.label}</a>)}
        </nav>
        <button className="burger" onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu}>{menu ? "✕" : "☰"}</button>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="hero">
          <div className="hero-text rv">
            <span className="mono kicker">✦ Né sous le signe du Verseau · Douala 🇨🇲</span>
            <h1 className="title">Arthur<br /><em>Djatcheu</em></h1>
            <p className="role">Développeur Web Junior — <span>le Porteur de Code</span></p>
            <p className="lead">Comme Ganymède versait l’ambroisie aux dieux, je verse des lignes de code pour créer des expériences digitales qui brillent.</p>
            <div className="row">
              <a href="#travaux" className="cta">Voir mes travaux →</a>
              <a href="#oracle" className="ghost-btn">Consulter l’oracle</a>
            </div>
            <blockquote>« La succession des choix que nous effectuons détermine notre destination finale. »</blockquote>
          </div>
          <div className="hero-visual rv">
            <div className="orbit o1" /><div className="orbit o2" /><div className="orbit o3"><span>⚙</span></div>
            <div className="arch"><img src={portrait.url} alt="Arthur DJATCHEU en costume vert" /></div>
            <div className="badge b1"><b>IUT</b><small>Génie Informatique</small></div>
            <div className="badge b2"><b>3</b><small>projets en orbite</small></div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div>{"HTML ✦ CSS ✦ JAVASCRIPT ✦ PYTHON ✦ REACT ✦ ♒ VERSEAU ✦ SADALSUUD ✦ SADALMELIK ✦ SKAT ✦ ".repeat(3)}</div></div>

        {/* MYTHOS */}
        <section id="mythos" className="sec">
          <Heading k="Chant I" t="Le Mythe d’Arthur" />
          <div className="mythos">
            <div className="mythos-img rv"><img src={casual.url} alt="Arthur DJATCHEU en tenue décontractée" /><span className="mono">ΓΑΝΥΜΗΔΗΣ · v2026</span></div>
            <div className="mythos-text rv">
              <p className="drop">Il était une fois, à <b>Douala</b>, un jeune Verseau nommé <b>Arthur DJATCHEU</b>. Étudiant en Génie Informatique à l’IUT, il découvrit qu’on pouvait bâtir des mondes avec quelques lignes de code.</p>
              <p>Curieux, créatif et déterminé, il fait de chaque projet une quête : apprendre, innover et laisser une empreinte. Sa devise — transformer chaque ligne de code en solution qui impacte positivement.</p>
              <p>Ouvert aux stages, au freelance et aux collaborations, d’ici ou d’ailleurs.</p>
              <div className="stats">
                {[["3+", "Projets"], ["3", "Langues"], ["4", "Technos"], ["∞", "Ambition"]].map(([a, b]) => <div key={b}><b>{a}</b><small>{b}</small></div>)}
              </div>
              <div className="chips"><span>🇫🇷 Français</span><span>🇬🇧 English</span><span>🇪🇸 Español</span></div>
            </div>
          </div>
        </section>

        {/* ARSENAL */}
        <section id="arsenal" className="sec">
          <Heading k="Chant II" t="L’Arsenal des Dieux" />
          <div className="skills">
            {SKILLS.map((s, i) => (
              <div key={s.name} className="skill rv" style={{ transitionDelay: `${i * 90}ms` }}>
                <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" className="track" /><circle cx="60" cy="60" r="52" className="fill" style={{ strokeDashoffset: 327 - (327 * s.v) / 100 }} /></svg>
                <div className="skill-v">{s.v}%</div>
                <h3>{s.name}</h3><p className="mono">{s.god}</p><small>{s.note}</small>
              </div>
            ))}
          </div>
          <div className="cards3">
            <div className="card rv"><h4>🧠 Vertus</h4><div className="chips">{["Créativité", "Gestion de projet", "Travail d’équipe", "Résolution de problèmes"].map((x) => <span key={x}>{x}</span>)}</div></div>
            <div className="card rv"><h4>🛠️ Outils sacrés</h4><div className="chips">{["Git", "GitHub", "Vercel", "VS Code", "Figma"].map((x) => <span key={x}>{x}</span>)}</div></div>
            <div className="card rv"><h4>📊 Marketing digital</h4><p>Formation Google Digital Garage en cours : SEO, réseaux sociaux et analytics.</p></div>
          </div>
        </section>

        {/* ODYSSEE */}
        <section id="odyssee" className="sec">
          <Heading k="Chant III" t="L’Odyssée" />
          <div className="timeline">
            <div className="step rv"><span className="mono">2026 — présent · En cours</span><h3>IUT de Douala</h3><p>Génie Informatique : développement logiciel, algorithmique, réseaux et bases de données.</p></div>
            <div className="step rv"><span className="mono">2025</span><h3>Baccalauréat — Lycée Joss</h3><p>Enseignement secondaire à Douala, obtenu avec succès.</p></div>
          </div>
          <h3 className="sub rv">Trophées & certifications</h3>
          <div className="cards3">
            <a className="card trophy rv" href="https://freecodecamp.org/certification/aazer/responsive-web-design-v9" target="_blank" rel="noreferrer"><span>🏆</span><h4>Responsive Web Design</h4><p>freeCodeCamp · ✅ Obtenu le 11 juin 2026</p><small>Voir le certificat →</small></a>
            <div className="card trophy rv"><span>📈</span><h4>Marketing Digital</h4><p>Google Digital Garage · En cours</p></div>
            <div className="card trophy rv"><span>⚡</span><h4>Algorithmes & Structures JS</h4><p>freeCodeCamp · En cours</p></div>
          </div>
        </section>

        {/* TRAVAUX */}
        <section id="travaux" className="sec">
          <Heading k="Chant IV" t="Les Travaux d’Arthur" />
          <div className="projects">
            {PROJECTS.map((p) => (
              <a key={p.title} href={p.url} target="_blank" rel="noreferrer" className="project rv">
                <span className="roman">{p.n}</span>
                <div>
                  <span className="mono">{p.year} · {p.myth}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
                <span className="go">Voir le projet ↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* ORACLE */}
        <section id="oracle" className="sec">
          <Heading k="Chant V" t="Consulter l’Oracle" />
          <div className="oracle">
            <div className="oracle-info rv">
              <img src={astronaut.url} alt="Petit astronaute flottant" className="astro" />
              <p>Stage, freelance, collaboration ou simple échange autour du web : envoie un signal à travers les étoiles.</p>
              <a href="mailto:djatcheuarthur4@gmail.com">✉️ djatcheuarthur4@gmail.com</a>
              <a href="https://wa.me/237672931105" target="_blank" rel="noreferrer">💬 +237 672 931 105</a>
              <a href="https://www.linkedin.com/in/arthur-djatcheu-7397833a4" target="_blank" rel="noreferrer">🔗 LinkedIn — Arthur DJATCHEU</a>
            </div>
            <form className="card form rv" onSubmit={submit}>
              <label>Nom<input name="name" required /></label>
              <label>Email<input name="email" type="email" required /></label>
              <label>Sujet<input name="subject" /></label>
              <label>Message<textarea name="message" rows={5} required /></label>
              <button className="cta" type="submit">Envoyer le signal ✦</button>
              {sent && <p className="ok">Ta messagerie s’ouvre pour envoyer le message à Arthur.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="foot"><span>© 2026 Arthur DJATCHEU — Douala, Cameroun 🇨🇲</span><span className="mono">♒ Écrit dans les étoiles</span></footer>
      {entered && <RobotGuide active={Math.max(0, active)} />}
    </div>
  );
}

function Heading({ k, t }: { k: string; t: string }) {
  return <div className="heading rv"><span className="mono">✦ {k} ✦</span><h2>{t}</h2><div className="meander" /></div>;
}
