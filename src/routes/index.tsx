import { createContext, useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import repairCSS from "../styles/repair.css?raw";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Arthur DJATCHEU — Dev Junior" },
    { name: "description", content: "Portfolio d’Arthur DJATCHEU, développeur web junior et étudiant en Génie Informatique à Douala : compétences, formation et projets." },
    { property: "og:title", content: "Arthur DJATCHEU — Portfolio" },
    { property: "og:description", content: "Développement web, projets et parcours d’Arthur DJATCHEU à Douala." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { "lang": "fr" }, body: {  } } },
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [light, setLight] = useState(false);
  const [entered, setEntered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  function closeMenu() { setMenu(false); triggerRef.current?.focus(); }
  useEffect(() => { const id = window.setTimeout(() => setLoaded(true), 5000); return () => window.clearTimeout(id); }, []);
  useEffect(() => { document.documentElement.dataset['theme'] = light ? "light" : "dark"; return () => { delete document.documentElement.dataset['theme']; }; }, [light]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    if (!menu) return;
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab") {
        const links = menuRef.current?.querySelectorAll<HTMLElement>('button,a');
        const first = links?.[0]; const last = links?.[links.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [menu]);
  return (
    <LanguageContext.Provider value={lang}>
      <style>{capturedCSS + repairCSS}</style>
      <div className="items-center flex justify-center fixed [inset:0px] [overflow:hidden] [transition:opacity_0.8s_cubic-bezier(0.77,0,0.175,1),visibility_0.8s] [z-index:10000]" id="intro-screen" data-entered={entered}>
        <div className="intro-bg absolute [filter:brightness(0.18)_saturate(0.65)_contrast(1.1)] [inset:0px] [z-index:1]" />
        <button className="absolute [top:2rem] [right:2rem] [font-family:var(--font-mono)] [font-size:0.8rem] [cursor:pointer] [z-index:3] pointer-events-auto" style={{ background: "none", borderWidth: "medium", borderStyle: "none", borderColor: "currentcolor", borderImage: "none", color: "var(--text-muted)" } as CSSProperties} id="intro-skip" onClick={() => setEntered(true)}>Passer ✕</button>
        <div className="items-center flex flex-col gap-[2.2rem] relative text-center [z-index:2]">
          <div className="intro-photo-wrap rounded-[50%] h-[170px] relative [animation:4s_ease_0s_infinite_alternate_none_running_intro-glow]">
            <img className="intro-photo rounded-[50%] object-cover [border:3px_solid_rgb(4,6,15)] [height:100%]" src="/site-assets/57975f7faa20e0bb.jpg" alt="Arthur DJATCHEU" />
          </div>
          <div className={(loaded ? "loaded " : "") + "intro-loader-btn items-center rounded-[27px] flex h-[54px] justify-center pointer-events-auto relative [border:1px_solid_rgba(212,175,106,0.25)] [border-color:transparent]! [cursor:none] [font-family:var(--font-display)] [font-size:0.95rem] [font-weight:700] [letter-spacing:0.06em] [overflow:hidden] [transition:0.5s_cubic-bezier(0.25,0.46,0.45,0.94)]"} id="introBtn" role="button" tabIndex={loaded ? 0 : -1} aria-disabled={!loaded} onClick={() => loaded && setEntered(true)} onKeyDown={e => { if (loaded && (e.key === "Enter" || e.key === " ")) setEntered(true); }}>
            <div className="progress-fill absolute [animation:5s_linear_0s_1_normal_forwards_running_progress-fill-anim] [bottom:0px] [left:0px] [top:0px] [z-index:1]" style={{ width: "100%" }} id="progressFill" />
            <span className="relative [transition:0.3s] [z-index:2]" id="introBtnText"><Translation fr={"Let's build the future"} en={"Let's build the future"} /></span>
          </div>
        </div>
      </div>
      <div className="rounded-[50%] h-[12px] pointer-events-none fixed [mix-blend-mode:difference] [transition:width_0.2s,height_0.2s,background_0.2s] [z-index:100000]" style={{ left: pointer.x, top: pointer.y }} id="cursor" />
      <div className="rounded-[50%] h-[40px] pointer-events-none fixed [border:1.5px_solid_var(--gold-light)] [transition:transform_0.12s,width_0.3s,height_0.3s,opacity_0.3s] [z-index:99999]" style={{ left: pointer.x, top: pointer.y }} id="cursor-ring" />
      <StarField onPointer={setPointer} />
      <div className="mobile-menu items-center hidden flex-col justify-center fixed [gap:2.5rem] [inset:0px] [z-index:999]" id="mobileMenu" ref={menuRef} data-open={menu} role="dialog" aria-modal={menu} aria-label="Navigation" onClick={e => { if ((e.target as HTMLElement).closest("a")) closeMenu(); }}><button aria-label="Fermer le menu" onClick={closeMenu} className="mobile-close absolute [border-color:currentcolor] [border-image:none] [border-style:none] [border-width:medium] [cursor:none] [font-size:1.5rem] [right:2rem] [top:1.5rem]">✕</button><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#about"><Translation fr={"À propos"} en={"About"} /></a><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#skills"><Translation fr={"Compétences"} en={"Skills"} /></a><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#formation"><Translation fr={"Formation"} en={"Education"} /></a><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#projects"><Translation fr={"Projets"} en={"Projects"} /></a><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#contact"><Translation fr={"Contact"} en={"Contact"} /></a></div>
      <nav className="items-center flex justify-between fixed [backdrop-filter:blur(20px)] [border-bottom:1px_solid_var(--border)] [left:0px] [right:0px] [top:0px] [transition:background_0.5s] [z-index:1000]">
        <a className="nav-logo no-underline [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.3rem] [font-weight:800] [letter-spacing:-0.02em]" href="#hero">AD.</a>
        <ul className="nav-links list-none [gap:2.5rem]">
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#about"><Translation fr={"À propos"} en={"About"} /></a>
          </li>
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#skills"><Translation fr={"Compétences"} en={"Skills"} /></a>
          </li>
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#formation"><Translation fr={"Formation"} en={"Education"} /></a>
          </li>
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#projects"><Translation fr={"Projets"} en={"Projects"} /></a>
          </li>
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#contact"><Translation fr={"Contact"} en={"Contact"} /></a>
          </li>
        </ul>
        <div className="items-center flex [gap:1.5rem]"><button className="lang-toggle [cursor:none] [font-family:var(--font-mono)] [font-size:0.75rem] [transition:0.3s]" id="langBtn" onClick={() => setLang(lang === "fr" ? "en" : "fr")} aria-label="Changer de langue">{lang === "fr" ? "EN" : "FR"}</button><button className="theme-toggle [cursor:none] [font-family:var(--font-mono)] [font-size:0.75rem] [transition:0.3s]" id="themeBtn" onClick={() => setLight(!light)} aria-label="Changer le thème">{light ? "🌙" : "☀️"}</button><div role="button" tabIndex={0} ref={triggerRef} aria-label="Ouvrir le menu" aria-expanded={menu} aria-controls="mobileMenu" onClick={() => menu ? closeMenu() : setMenu(true)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setMenu(!menu); }} className="hamburger flex-col gap-[5px] [cursor:none]"><span className="rounded-[2px] h-[2px] [transition:0.3s]" /><span className="rounded-[2px] h-[2px] [transition:0.3s]" /><span className="rounded-[2px] h-[2px] [transition:0.3s]" /></div></div>
      </nav>
      <ImportedSectionArthurDJATCHEU />
      <ImportedSectionPropos />
      <ImportedSectionCompTences />
      <ImportedSectionFormation />
      <ImportedSectionProjets />
      <ImportedSectionContact />
      <footer className="items-center flex flex-wrap justify-between relative [border-top:1px_solid_var(--border)] [gap:1rem] [z-index:1] [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:text-center">
        <div className="footer-copy [font-family:var(--font-mono)] [font-size:0.82rem]">
            © 2026 <span>Arthur DJATCHEU</span> — Douala, Cameroun 🇨🇲
          </div>
        <div className="footer-links flex [gap:1.5rem]"><a className="no-underline [font-family:var(--font-mono)] [font-size:0.82rem]" href="https://www.linkedin.com/in/arthur-djatcheu-7397833a4" target="_blank">LinkedIn</a><a className="no-underline [font-family:var(--font-mono)] [font-size:0.82rem]" href="https://github.com" target="_blank">GitHub</a><a className="no-underline [font-family:var(--font-mono)] [font-size:0.82rem]" href="mailto:djatcheuarthur4@gmail.com">Email</a></div>
      </footer>
    </LanguageContext.Provider>
  );
}

function ImportedSectionArthurDJATCHEU() {
  return (
    <section className="items-center flex relative [min-height:100vh] [z-index:1]" id="hero">
      <div className="hero-glow-1 rounded-[50%] h-[600px] pointer-events-none absolute right-[-100px] top-[-100px] [animation:6s_ease-in-out_0s_infinite_alternate_none_running_glow-pulse] [filter:blur(120px)]" style={{ transform: "translateY(0px)" }} />
      <div className="hero-glow-2 rounded-[50%] bottom-[-50px] h-[400px] pointer-events-none absolute [animation:8s_ease-in-out_0s_infinite_alternate-reverse_none_running_glow-pulse] [filter:blur(120px)] [left:20%]" style={{ transform: "translateY(0px)" }} />
      <div className="hero-glow-3 rounded-[50%] h-[300px] pointer-events-none absolute right-[35%] top-[30%] [animation:10s_ease-in-out_0s_infinite_alternate_none_running_glow-pulse] [filter:blur(120px)]" style={{ transform: "translateY(0px)" }} />
      <div className="hero-content items-center grid max-w-[1300px] relative [z-index:2] [@media(max-width:1024px)]:text-center">
        <div className="hero-visual items-center justify-center relative [animation:1.2s_ease_0.8s_1_normal_forwards_running_fade-in] [overflow:visible] [@media(max-width:1024px)]:justify-center" style={{ transform: "scale(1)", opacity: "1" }}>
          <div className="hero-photo-wrap relative">
            <div className="hero-photo-glow rounded-[40px] inset-[-20px] absolute [animation:4s_ease-in-out_0s_infinite_alternate_none_running_glow-pulse] [filter:blur(40px)] [z-index:1]" />
            <div className={"\x72ing-1 rounded-[50%] absolute [animation:8s_linear_0s_infinite_normal_none_running_orbit] [animation-duration:12s]! [border:1px_solid] [border-color:rgba(124,58,237,0.3)]! [left:50%] [top:50%]"}>
              <div className={"\x72ing-dot rounded-[50%] h-[8px] absolute [left:50%] [top:0px]"} />
            </div>
            <div className={"\x72ing-2 rounded-[50%] absolute [animation:8s_linear_0s_infinite_normal_none_running_orbit] [animation-direction:reverse]! [animation-duration:18s]! [border:1px_solid] [border-color:rgba(37,99,235,0.2)]! [left:50%] [top:50%]"}>
              <div className={"\x72ing-dot rounded-[50%] h-[8px] absolute [left:50%] [top:0px]"} style={{ background: "var(--blue-light)", boxShadow: "0 0 12px var(--blue-light)" }} />
            </div>
            <img className="hero-photo rounded-[30px] object-cover relative [filter:saturate(1.1)_contrast(1.05)] [height:100%] [object-position:center_top] [z-index:2]" src="/site-assets/14f6a4a1bfcfda80.jpg" alt="Arthur DJATCHEU" />
            <div className="hero-badge hero-badge-1 rounded-[16px] absolute [backdrop-filter:blur(20px)] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [z-index:3]"><span className="block [font-family:var(--font-display)] [font-weight:700]">IUT</span>
                Douala, Cameroun
              </div>
            <div className="hero-badge hero-badge-2 rounded-[16px] absolute [backdrop-filter:blur(20px)] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [z-index:3]"><span className="block [font-family:var(--font-display)] [font-weight:700]">3</span>
                Projets live
              </div>
          </div>
        </div>
        <div className="hero-text [order:1] [@media(max-width:1024px)]:[order:1]">
          <div className="hero-tag items-center inline-flex uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [gap:0.5rem] [letter-spacing:0.12em]" style={{ transform: "translateY(0px)", opacity: "1" }}><Translation fr={"Disponible pour des opportunités"} en={"Open to opportunities"} /></div>
          <h1 className="hero-name [animation:0.8s_ease_0.4s_1_normal_forwards_running_fade-up] [font-family:var(--font-display)] [font-size:clamp(2.5rem,10vw,6.5rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:0.95]" style={{ transform: "translateY(0px)", opacity: "1" }}>
              Arthur<br /><span className="block [-webkit-text-fill-color:transparent]">DJATCHEU</span></h1>
          <div className="hero-title-line [animation:0.8s_ease_0.6s_1_normal_forwards_running_fade-up] [font-family:var(--font-display)] [font-size:clamp(1.2rem,2.5vw,2rem)] [font-weight:600]" style={{ transform: "translateY(0px)", opacity: "1" }}><Translation fr={"Dev Junior · Génie Informatique"} en={"Junior Dev · Computer Engineering"} /></div>
          <div className="min-h-[1.5em] [animation:0.8s_ease_0.8s_1_normal_forwards_running_fade-up] [font-family:var(--font-mono)] [font-size:clamp(0.8rem,1.3vw,1rem)]" style={{ transform: "translateY(0px)", opacity: "1" }} id="typewriter"><Typewriter /></div>
          <p className="hero-slogan italic max-w-[480px] [animation:0.8s_ease_1s_1_normal_forwards_running_fade-up] [border-left:2px_solid_var(--gold)] [font-size:0.9rem] [line-height:1.7]" style={{ transform: "translateY(0px)", opacity: "1" }}><Translation fr={"\"La succession des choix que nous effectuons durant notre parcours détermine notre destination finale.\""} en={"\"The succession of choices we make along our journey determines our final destination.\""} /></p>
          <div className="hero-tag items-center inline-flex uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [gap:0.5rem] [letter-spacing:0.12em]" style={{ transform: "translateY(0px)", opacity: "1" }}>Let's Build the FUTURE
            </div>
          <div className="hero-ctas flex flex-wrap [animation:0.8s_ease_1.2s_1_normal_forwards_running_fade-up] [gap:1rem] [@media(max-width:1024px)]:justify-center" style={{ transform: "translateY(0px)", opacity: "1" }}><a className="btn-primary items-center rounded-[100px] inline-flex no-underline [cursor:none] [font-family:var(--font-display)] [font-size:0.9rem] [font-weight:600] [gap:0.5rem] [overflow:hidden]" href="#projects"><Translation fr={"Voir mes projets →"} en={"See my projects →"} /></a><a className="btn-secondary items-center inline-flex no-underline [backdrop-filter:blur(10px)] [cursor:none] [font-family:var(--font-display)] [font-size:0.9rem] [font-weight:600] [gap:0.5rem]" href="#contact"><Translation fr={"Me contacter"} en={"Contact me"} /></a></div>
        </div>
      </div>
      <div className={"\x73croll-hint items-center flex flex-col absolute [animation:0.8s_ease_2s_1_normal_forwards_running_fade-up] [bottom:2rem] [gap:0.5rem] [left:50%] [z-index:2]"} style={{ transform: "translateY(3.55271e-15px)", opacity: "1" }}>
        <span className="uppercase [font-family:var(--font-mono)] [font-size:0.65rem] [letter-spacing:0.15em]"><Translation fr={"Découvrir"} en={"Scroll"} /></span>
        <div className={"\x73croll-line h-[50px] [animation:2s_ease-in-out_0s_infinite_normal_none_running_scroll-line]"} />
      </div>
    </section>
  );
}

function ImportedSectionPropos() {
  return (
    <section className="relative [z-index:1]" id="about">
      <div className="section-inner max-w-[1200px]">
        <div className="about-grid items-center grid [gap:5rem]">
          <div className={"reveal-left \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <div className="about-photo-wrap relative [@media(max-width:1024px)]:max-w-[400px]">
              <div className="about-photo-accent2 rounded-[16px] h-[80px] left-[-15px] absolute top-[-15px] [border:2px_solid_var(--gold)]" />
              <img className="about-photo aspect-[3/4] rounded-[24px] object-cover [filter:saturate(1.05)] [object-position:center_top]" src="/site-assets/932656ab287c6dad.jpg" alt="Arthur DJATCHEU" />
              <div className="about-photo-accent rounded-[20px] bottom-[-20px] h-[120px] absolute right-[-20px] [z-index:-1]" />
            </div>
            <div className="about-stats grid grid-cols-[1fr_1fr] [gap:1rem]">
              <div className="stat-card text-center [transition:border-color_0.3s,transform_0.3s]">
                <div className="stat-number [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800]">3+</div>
                <div className="stat-label uppercase [font-family:var(--font-mono)] [font-size:0.75rem] [letter-spacing:0.05em]"><Translation fr={"Projets"} en={"Projects"} /></div>
              </div>
              <div className="stat-card text-center [transition:border-color_0.3s,transform_0.3s]">
                <div className="stat-number [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800]">3</div>
                <div className="stat-label uppercase [font-family:var(--font-mono)] [font-size:0.75rem] [letter-spacing:0.05em]"><Translation fr={"Langues"} en={"Languages"} /></div>
              </div>
              <div className="stat-card text-center [transition:border-color_0.3s,transform_0.3s]">
                <div className="stat-number [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800]">4</div>
                <div className="stat-label uppercase [font-family:var(--font-mono)] [font-size:0.75rem] [letter-spacing:0.05em]"><Translation fr={"Technos"} en={"Techs"} /></div>
              </div>
              <div className="stat-card text-center [transition:border-color_0.3s,transform_0.3s]">
                <div className="stat-number [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800]">∞</div>
                <div className="stat-label uppercase [font-family:var(--font-mono)] [font-size:0.75rem] [letter-spacing:0.05em]"><Translation fr={"Ambition"} en={"Ambition"} /></div>
              </div>
            </div>
          </div>
          <div className={"reveal-right \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]"><Translation fr={"Qui suis-je"} en={"Who am I"} /></div>
            <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
              <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}><Translation fr={"À propos"} en={"About"} /></span>
            </h2>
            <div className="section-divider rounded-[2px] h-[3px]" />
            <div className="about-text">
              <p className="[line-height:1.8]"><Translation fr={"Je suis <strong>Arthur DJATCHEU</strong>, étudiant en Génie Informatique à l'IUT de Douala, Cameroun. Passionné par le développement web depuis mes premières lignes de code, je construis des expériences digitales qui allient esthétique moderne et performance technique."} en={"I am <strong>Arthur DJATCHEU</strong>, a Computer Engineering student at IUT de Douala, Cameroon. Passionate about web development since my first lines of code, I build digital experiences that combine modern aesthetics and technical performance."} /></p>
              <p className="[line-height:1.8]"><Translation fr={"Curieux, créatif et déterminé, je crois fermement que chaque projet est une opportunité d'apprendre, d'innover et de laisser une empreinte. Ma philosophie : transformer chaque ligne de code en une solution qui impacte positivement."} en={"Curious, creative and determined, I firmly believe that every project is an opportunity to learn, innovate and leave a mark. My philosophy: transform every line of code into a solution that makes a positive impact."} /></p>
              <p className="[line-height:1.8]"><Translation fr={"Basé à <strong>Douala, Cameroun</strong>, je suis ouvert aux collaborations locales et internationales, aux stages et aux projets freelance."} en={"Based in <strong>Douala, Cameroon</strong>, I am open to local and international collaborations, internships and freelance projects."} /></p>
            </div>
            <img className="hero-photo rounded-[30px] object-cover relative [filter:saturate(1.1)_contrast(1.05)] [height:100%] [object-position:center_top] [z-index:2]" src="/site-assets/3535329b5108315f.jpg" alt="Arthur DJATCHEU" />
            <div className="about-langs flex flex-wrap gap-[0.6rem]"><span className="lang-badge rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.72rem]">🇫🇷 Français</span><span className="lang-badge rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.72rem]">🇬🇧 English</span><span className="lang-badge rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.72rem]">🇪🇸 Español</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionCompTences() {
  return (
    <section className="relative [z-index:1]" id="skills">
      <div className="section-inner max-w-[1200px]">
        <div className={"reveal \x76isible"}>
          <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]"><Translation fr={"Expertise"} en={"Expertise"} /></div>
          <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
            <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}><Translation fr={"Compétences"} en={"Skills"} /></span>
          </h2>
          <div className="section-divider rounded-[2px] h-[3px]" />
        </div>
        <div className="bento-grid grid gap-[1.2rem]">
          <div className={"bento-card wide reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.1s" }}>
            <div className="bento-icon [font-size:2rem]">⚡</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]"><Translation fr={"Compétences Techniques"} en={"Technical Skills"} /></div>
            <div className="skill-bar-wrap">
              <div className="skill-bar-item">
                <div className="skill-bar-header flex justify-between [font-family:var(--font-mono)] [font-size:0.78rem]">
                  <span>HTML</span>
                  <span>90%</span>
                </div>
                <div className="skill-bar-track rounded-[2px] h-[4px] [overflow:hidden]">
                  <div className={"skill-bar-fill \x66ill-blue rounded-[2px] [height:100%] [transition:width_1.5s_cubic-bezier(0.25,0.46,0.45,0.94)]"} style={{ width: "90%" }} />
                </div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header flex justify-between [font-family:var(--font-mono)] [font-size:0.78rem]">
                  <span>CSS</span>
                  <span>65%</span>
                </div>
                <div className="skill-bar-track rounded-[2px] h-[4px] [overflow:hidden]">
                  <div className={"skill-bar-fill \x66ill-violet rounded-[2px] [height:100%] [transition:width_1.5s_cubic-bezier(0.25,0.46,0.45,0.94)]"} style={{ width: "65%" }} />
                </div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header flex justify-between [font-family:var(--font-mono)] [font-size:0.78rem]">
                  <span><Translation fr={"JavaScript"} en={"JavaScript"} /></span>
                  <span>60%</span>
                </div>
                <div className="skill-bar-track rounded-[2px] h-[4px] [overflow:hidden]">
                  <div className={"skill-bar-fill \x66ill-gold rounded-[2px] [height:100%] [transition:width_1.5s_cubic-bezier(0.25,0.46,0.45,0.94)]"} style={{ width: "60%" }} />
                </div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header flex justify-between [font-family:var(--font-mono)] [font-size:0.78rem]">
                  <span>Python</span>
                  <span>60%</span>
                </div>
                <div className="skill-bar-track rounded-[2px] h-[4px] [overflow:hidden]">
                  <div className={"skill-bar-fill \x66ill-blue rounded-[2px] [height:100%] [transition:width_1.5s_cubic-bezier(0.25,0.46,0.45,0.94)]"} style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.2s" }}>
            <div className="bento-icon [font-size:2rem]">🧠</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]"><Translation fr={"Soft Skills"} en={"Soft Skills"} /></div>
            <ul className="soft-skill-list list-none">
              <li className="items-center flex gap-[0.6rem] [border-bottom:1px_solid_var(--border)]"><Translation fr={"Créativité & Innovation"} en={"Creativity & Innovation"} /></li>
              <li className="items-center flex gap-[0.6rem] [border-bottom:1px_solid_var(--border)]"><Translation fr={"Gestion de Projet"} en={"Project Management"} /></li>
              <li className="items-center flex gap-[0.6rem] [border-bottom:1px_solid_var(--border)]"><Translation fr={"Travail en Équipe"} en={"Teamwork"} /></li>
              <li className="items-center flex gap-[0.6rem] [border-bottom:1px_solid_var(--border)]"><Translation fr={"Résolution de Problèmes"} en={"Problem Solving"} /></li>
            </ul>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.3s", background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))" }}>
            <div className="bento-icon [font-size:2rem]">🌍</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]"><Translation fr={"Localisation"} en={"Location"} /></div>
            <div className="bento-desc [line-height:1.6] [font-family:var(--font-display)] [font-weight:700]" style={{ fontSize: "1.3rem", color: "var(--text)", marginTop: "0.5rem" }}>
                Douala<br /><span className="[font-size:0.9rem]" style={{ color: "var(--gold)" }}>Cameroun 🇨🇲</span></div>
            <div className="bento-desc [line-height:1.6]" style={{ marginTop: "1rem" }}><Translation fr={"Ouvert aux opportunités remote & locales"} en={"Open to remote & local opportunities"} /></div>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.35s" }}>
            <div className="bento-icon [font-size:2rem]">📊</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]"><Translation fr={"Marketing Digital"} en={"Digital Marketing"} /></div>
            <div className="bento-desc [line-height:1.6]"><Translation fr={"Formation Google Digital Garage en cours. Compréhension des stratégies SEO, réseaux sociaux et analytics."} en={"Google Digital Garage training in progress. Understanding of SEO strategies, social media and analytics."} /></div>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.4s", background: "linear-gradient(135deg, rgba(212, 175, 106, 0.08), rgba(124, 58, 237, 0.08))" }}>
            <div className="bento-icon [font-size:2rem]">⚡</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]"><Translation fr={"JavaScript"} en={"JavaScript"} /></div>
            <div className="bento-desc [line-height:1.6]">
                Formation JavaScript en cours.
              </div>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.45s" }}>
            <div className="bento-icon [font-size:2rem]">🛠️</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]"><Translation fr={"Outils & Plateformes"} en={"Tools & Platforms"} /></div>
            <div className="flex flex-wrap [gap:0.5rem]" style={{ marginTop: "0.8rem" }}><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Git</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">GitHub</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Vercel</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">VS Code</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Figma</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionFormation() {
  return (
    <section className="relative [z-index:1]" id="formation">
      <div className="section-inner max-w-[1200px]">
        <div className={"reveal \x76isible"}>
          <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]"><Translation fr={"Parcours académique"} en={"Academic path"} /></div>
          <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
            <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}><Translation fr={"Formation"} en={"Education"} /></span>
          </h2>
          <div className="section-divider rounded-[2px] h-[3px]" />
        </div>
        <div className="formation-grid grid">
          <div className={"reveal-left \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]"><Translation fr={"En cours · 2026 — présent"} en={"Ongoing · 2026 — present"} /></div>
                <div className="timeline-title [font-family:var(--font-display)] [font-size:1.2rem] [font-weight:700]"><Translation fr={"IUT de Douala"} en={"IUT de Douala"} /></div>
                <div className="timeline-sub [font-size:0.88rem] [line-height:1.6]">
                    Génie Informatique · Douala, Cameroun<br />Formation en développement logiciel, algorithmique, réseaux et
                    bases de données.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]"><Translation fr={"2025 · Baccalauréat"} en={"2025 · Baccalaureate"} /></div>
                <div className="timeline-title [font-family:var(--font-display)] [font-size:1.2rem] [font-weight:700]"><Translation fr={"Lycée Joss de Douala"} en={"Lycée Joss de Douala"} /></div>
                <div className="timeline-sub [font-size:0.88rem] [line-height:1.6]">
                    Enseignement secondaire · Douala, Cameroun<br />Obtention du Baccalauréat avec succès.</div>
              </div>
            </div>
          </div>
          <div className={"reveal-right \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <h3 className="[font-family:var(--font-display)] [font-size:1.3rem] [font-weight:700]" style={{ marginBottom: "1.5rem" }}><Translation fr={"Certifications"} en={"Certifications"} /></h3>
            <div className="cert-grid grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] [gap:1rem]">
              <div className="cert-card featured items-start flex [gap:1rem] [transition:0.3s]">
                <div className="cert-icon items-center rounded-[12px] flex h-[44px] justify-center [flex-shrink:0] [font-size:1.2rem]">💻</div>
                <div className="cert-info">
                  <div className="cert-name [font-family:var(--font-display)] [font-size:0.95rem] [font-weight:700]"><Translation fr={"Responsive Web Design"} en={"Responsive Web Design"} /></div>
                  <div className="cert-provider [font-family:var(--font-mono)] [font-size:0.78rem]">freeCodeCamp</div>
                  <a className="btn-cert items-start inline-flex flex-col no-underline [backdrop-filter:blur(10px)] [cursor:none] [gap:0.25rem]" href="https://freecodecamp.org/certification/aazer/responsive-web-design-v9" rel="noopener" target="_blank">{"\n                  "}<span className="btn-cert-title [font-family:var(--font-display)] [font-size:0.98rem] [font-weight:700] [letter-spacing:0.01em]"><Translation fr={"Voir le certificat"} en={"View certificate"} /></span>{"\n                  "}<span className="btn-cert-sub [font-family:var(--font-mono)] [font-size:0.75rem]"><Translation fr={"✅ Obtenu — 11 juin 2026"} en={"✅ Obtained — June 11, 2026"} /></span>{"\n                "}</a>
                </div>
              </div>
              <div className="cert-card items-start flex [gap:1rem] [transition:0.3s]">
                <div className="cert-icon items-center rounded-[12px] flex h-[44px] justify-center [flex-shrink:0] [font-size:1.2rem]">📈</div>
                <div className="cert-info">
                  <div className="cert-name [font-family:var(--font-display)] [font-size:0.95rem] [font-weight:700]"><Translation fr={"Marketing Digital"} en={"Digital Marketing"} /></div>
                  <div className="cert-provider [font-family:var(--font-mono)] [font-size:0.78rem]">Google Digital Garage</div>
                  <span className="cert-status rounded-[100px] inline-block [border:1px_solid_rgba(212,175,106,0.3)] [font-family:var(--font-mono)] [font-size:0.68rem]"><Translation fr={"En cours"} en={"In progress"} /></span>
                </div>
              </div>
              <div className="cert-card items-start flex [gap:1rem] [transition:0.3s]">
                <div className="cert-icon items-center rounded-[12px] flex h-[44px] justify-center [flex-shrink:0] [font-size:1.2rem]">⚡</div>
                <div className="cert-info">
                  <div className="cert-name [font-family:var(--font-display)] [font-size:0.95rem] [font-weight:700]"><Translation fr={"Algorithmes & Structures de Données JS"} en={"JavaScript Algorithms & Data Structures"} /></div>
                  <div className="cert-provider [font-family:var(--font-mono)] [font-size:0.78rem]">freeCodeCamp</div>
                  <span className="cert-status rounded-[100px] inline-block [border:1px_solid_rgba(212,175,106,0.3)] [font-family:var(--font-mono)] [font-size:0.68rem]"><Translation fr={"En cours"} en={"In progress"} /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionProjets() {
  return (
    <section className="relative [z-index:1]" id="projects">
      <div className="section-inner max-w-[1200px]">
        <div className={"reveal \x76isible"}>
          <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]"><Translation fr={"Mes réalisations"} en={"My work"} /></div>
          <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
            <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}><Translation fr={"Projets"} en={"Projects"} /></span>
          </h2>
          <div className="section-divider rounded-[2px] h-[3px]" />
        </div>
        <div className="projects-grid grid [gap:2rem]">
          <div className={"project-card reveal \x76isible relative [overflow:hidden]"} style={{ transitionDelay: "0.1s" }}>
            <div className="project-preview h-[260px] relative [overflow:hidden]">
              <iframe sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-popups" className="h-[200%] pointer-events-none absolute [border-color:currentcolor] [border-image:none] [border-style:none] [border-width:medium] [left:0px] [top:0px] [transition:opacity_0.5s] [z-index:1]" src="https://nuru-ashy.vercel.app/" title="NURU Preview" />
              <div className="project-preview-mock items-center flex flex-col justify-center pointer-events-none absolute [gap:1rem] [inset:0px] [transition:transform_0.5s,opacity_0.5s] [z-index:3]">
                <div className="flex gap-[6px] absolute [left:1rem] [top:1rem]">
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                </div>
                <div className="text-center">
                  <div className="[font-family:var(--font-display)] [font-size:2.5rem] [font-weight:800] [-webkit-text-fill-color:transparent]" style={{ background: "linear-gradient(135deg, rgb(124, 58, 237), rgb(37, 99, 235)) text" }}>
                      NURU</div>
                  <div className="[font-size:0.75rem] [font-family:var(--font-mono)]" style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
                      nuru-ashy.vercel.app</div>
                </div>
              </div>
              <div className="project-preview-overlay absolute [inset:0px] [transition:background_0.5s] [z-index:2]" />
            </div>
            <div className="project-body">
              <div className="project-number uppercase [font-family:var(--font-mono)] [font-size:0.68rem] [letter-spacing:0.15em]">01 — 2024</div>
              <div className="project-title [font-family:var(--font-display)] [font-size:1.5rem] [font-weight:800]">NURU</div>
              <div className="project-desc [font-size:0.88rem] [line-height:1.7]">
                  Plateforme de découverte dédiée aux génies tech africains. NURU met en lumière les talents, innovateurs et
                  visionnaires qui façonnent la technologie africaine.
                </div>
              <div className="project-tags flex flex-wrap [gap:0.5rem]"><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">HTML</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">CSS</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]"><Translation fr={"JavaScript"} en={"JavaScript"} /></span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Vercel</span></div>
              <a className="project-link items-center inline-flex no-underline [font-family:var(--font-display)] [font-size:0.85rem] [font-weight:600]" href="https://nuru-ashy.vercel.app/" target="_blank"><Translation fr={"Voir le projet →"} en={"View project →"} /></a>
            </div>
          </div>
          <div className={"project-card reveal \x76isible relative [overflow:hidden]"} style={{ transitionDelay: "0.2s" }}>
            <div className="project-preview h-[260px] relative [overflow:hidden]">
              <iframe sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-popups" className="h-[200%] pointer-events-none absolute [border-color:currentcolor] [border-image:none] [border-style:none] [border-width:medium] [left:0px] [top:0px] [transition:opacity_0.5s] [z-index:1]" src="https://maelle-beauty-glow.lovable.app/" title="Maëlle Beauty Preview" />
              <div className="project-preview-mock items-center flex flex-col justify-center pointer-events-none absolute [gap:1rem] [inset:0px] [transition:transform_0.5s,opacity_0.5s] [z-index:3]">
                <div className="flex gap-[6px] absolute [left:1rem] [top:1rem]">
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                </div>
                <div className="text-center">
                  <div className="[font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800] [-webkit-text-fill-color:transparent]" style={{ background: "linear-gradient(135deg, rgb(212, 175, 106), rgb(167, 139, 250)) text" }}>
                      Maëlle Beauty</div>
                  <div className="[font-size:0.75rem] [font-family:var(--font-mono)]" style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
                      maelle-beauty-glow.lovable.app</div>
                </div>
              </div>
              <div className="project-preview-overlay absolute [inset:0px] [transition:background_0.5s] [z-index:2]" />
            </div>
            <div className="project-body">
              <div className="project-number uppercase [font-family:var(--font-mono)] [font-size:0.68rem] [letter-spacing:0.15em]">02 — 2025</div>
              <div className="project-title [font-family:var(--font-display)] [font-size:1.5rem] [font-weight:800]">Maëlle Beauty</div>
              <div className="project-desc [font-size:0.88rem] [line-height:1.7]">
                  Site vitrine e-commerce pour une marque de cosmétiques d'inspiration africaine. Interface élégante mettant
                  en valeur des soins naturels formulés pour les peaux africaines.
                </div>
              <div className="project-tags flex flex-wrap [gap:0.5rem]"><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">React</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Tailwind CSS</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Lovable</span></div>
              <a className="project-link items-center inline-flex no-underline [font-family:var(--font-display)] [font-size:0.85rem] [font-weight:600]" href="https://maelle-beauty-glow.lovable.app/" target="_blank"><Translation fr={"Voir le projet →"} en={"View project →"} /></a>
            </div>
          </div>
          <div className={"project-card reveal \x76isible relative [overflow:hidden]"} style={{ transitionDelay: "0.3s" }}>
            <div className="project-preview h-[260px] relative [overflow:hidden]">
              <iframe sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-popups" className="h-[200%] pointer-events-none absolute [border-color:currentcolor] [border-image:none] [border-style:none] [border-width:medium] [left:0px] [top:0px] [transition:opacity_0.5s] [z-index:1]" src="https://viny-natural-juice.vercel.app/" title="Viny Natural Juice Preview" />
              <div className="project-preview-mock items-center flex flex-col justify-center pointer-events-none absolute [gap:1rem] [inset:0px] [transition:transform_0.5s,opacity_0.5s] [z-index:3]">
                <div className="flex gap-[6px] absolute [left:1rem] [top:1rem]">
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                  <div className="mock-dot rounded-[50%] h-[10px]" />
                </div>
                <div className="text-center">
                  <div className="[font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800] [-webkit-text-fill-color:transparent]" style={{ background: "linear-gradient(135deg, rgb(16, 185, 129), rgb(212, 175, 106)) text" }}>
                      Viny Juice</div>
                  <div className="[font-size:0.75rem] [font-family:var(--font-mono)]" style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
                      viny-natural-juice.vercel.app</div>
                </div>
              </div>
              <div className="project-preview-overlay absolute [inset:0px] [transition:background_0.5s] [z-index:2]" />
            </div>
            <div className="project-body">
              <div className="project-number uppercase [font-family:var(--font-mono)] [font-size:0.68rem] [letter-spacing:0.15em]">03 — 2026</div>
              <div className="project-title [font-family:var(--font-display)] [font-size:1.5rem] [font-weight:800]">Viny Natural Juice</div>
              <div className="project-desc [font-size:0.88rem] [line-height:1.7]"><Translation fr={"Site e-commerce vitrine pour Viny Natural Juice à Douala. Met en valeur des jus de fruits 100% bio et pressés à froid avec un système interactif de recettes personnalisées."} en={"E-commerce showcase website for Viny Natural Juice in Douala. Featuring 100% organic cold-pressed fruit juices with an interactive custom recipe system."} /></div>
              <div className="project-tags flex flex-wrap [gap:0.5rem]"><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Next.js</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Tailwind CSS</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">React</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Vercel</span></div>
              <a className="project-link items-center inline-flex no-underline [font-family:var(--font-display)] [font-size:0.85rem] [font-weight:600]" href="https://viny-natural-juice.vercel.app/" target="_blank"><Translation fr={"Voir le projet →"} en={"View project →"} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionContact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="relative [z-index:1]" id="contact">
      <div className="section-inner max-w-[1200px]">
        <div className={"reveal \x76isible"}>
          <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]"><Translation fr={"Travaillons ensemble"} en={"Let's work together"} /></div>
          <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
            <div className="contact-photo-wrap rounded-[50%] inline-block h-[60px] align-middle [border:2px_solid_var(--gold)] [overflow:hidden]">
              <img className="contact-photo object-cover [height:100%]" src="/site-assets/57975f7faa20e0bb.jpg" alt="Arthur DJATCHEU" />
            </div>
            <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}><Translation fr={"Contact"} en={"Contact"} /></span>
          </h2>
          <div className="section-divider rounded-[2px] h-[3px]" />
        </div>
        <div className="contact-grid items-start grid [gap:5rem]">
          <div className={"reveal-left \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <h3><Translation fr={"Discutons de votre projet"} en={"Let's discuss your project"} /></h3>
            <p><Translation fr={"Je suis ouvert à toute opportunité : stage, projet freelance, collaboration ou simplement échanger autour du développement web. N'hésitez pas à me contacter !"} en={"I am open to any opportunity: internship, freelance project, collaboration or simply chatting about web development. Feel free to reach out!"} /></p>
            <div className="flex flex-col [gap:1rem]"><a className="contact-link items-center flex no-underline [font-size:0.88rem] [gap:1rem]" href="mailto:djatcheuarthur4@gmail.com">{"\n              "}<div className="contact-link-icon items-center rounded-[10px] flex h-[40px] justify-center [flex-shrink:0] [font-size:1rem]">✉️</div>{"\n              "}<span>djatcheuarthur4@gmail.com</span>{"\n            "}</a><a className="contact-link items-center flex no-underline [font-size:0.88rem] [gap:1rem]" href="https://wa.me/237672931105" target="_blank">{"\n              "}<div className="contact-link-icon items-center rounded-[10px] flex h-[40px] justify-center [flex-shrink:0] [font-size:1rem]">💬</div>{"\n              "}<span>+237 672 931 105</span>{"\n            "}</a><a className="contact-link items-center flex no-underline [font-size:0.88rem] [gap:1rem]" href="https://www.linkedin.com/in/arthur-djatcheu-7397833a4" target="_blank">{"\n              "}<div className="contact-link-icon items-center rounded-[10px] flex h-[40px] justify-center [flex-shrink:0] [font-size:1rem]">🔗</div>{"\n              "}<span>LinkedIn — Arthur DJATCHEU</span>{"\n            "}</a></div>
          </div>
          <div className={"reveal-right \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <form className="contact-form" id="contactForm" hidden={sent} onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <div className="form-row grid [gap:1rem]">
                <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]"><Translation fr={"Prénom"} en={"First name"} /></label><input className="resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" type="text" placeholder="John" required /></div>
                <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]"><Translation fr={"Nom"} en={"Last name"} /></label><input className="resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" type="text" placeholder="Doe" required /></div>
              </div>
              <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]">Email</label><input className="resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" type="email" placeholder="john@example.com" required /></div>
              <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]"><Translation fr={"Sujet"} en={"Subject"} /></label><input className="resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" type="text" placeholder="Projet freelance, Stage..." required /></div>
              <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]"><Translation fr={"Message"} en={"Message"} /></label><textarea className="h-[140px] resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" placeholder="Décrivez votre projet ou votre demande..." required /></div>
              <button className="form-submit rounded-[12px] [border-color:currentcolor] [border-image:none] [border-style:none] [border-width:medium] [cursor:none] [font-family:var(--font-display)] [font-size:1rem] [font-weight:700] [transition:0.3s]" type="submit"><Translation fr={"Envoyer le message →"} en={"Send message →"} /></button>
            </form>
            <div className="rounded-[16px] hidden text-center [border:1px_solid_rgba(124,58,237,0.4)] [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:600]" id="form-success" role="status" data-sent={sent}><Translation fr={"✅ Message envoyé avec succès ! Je vous répondrai très bientôt."} en={"✅ Message sent successfully! I'll get back to you very soon."} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const LanguageContext = createContext<"fr" | "en">("fr");
function Translation({ fr, en }: { fr: string; en: string }) {
  const lang = useContext(LanguageContext);
  return <span className="translation" dangerouslySetInnerHTML={{ __html: lang === "fr" ? fr : en }} />;
}
function Typewriter() {
  const lang = useContext(LanguageContext);
  const [text, setText] = useState("");
  useEffect(() => {
    const phrases = lang === "fr" ? ["Développeur Web Junior...", "Étudiant en Génie Informatique...", "Basé à Douala, Cameroun...", "Créateur d'expériences digitales..."] : ["Junior Web Developer...", "Computer Engineering Student...", "Based in Douala, Cameroon...", "Creator of digital experiences..."];
    let index = 0, count = 0, deleting = false, timer = 0;
    function tick() {
      const phrase = phrases[index % phrases.length];
      if (!phrase) return;
      setText(phrase.slice(0, count));
      count += deleting ? -1 : 1;
      let delay = deleting ? 40 : 65;
      if (count > phrase.length) { deleting = true; delay = 1800; }
      if (count < 0) { deleting = false; count = 0; index++; delay = 300; }
      timer = window.setTimeout(tick, delay);
    }
    tick(); return () => window.clearTimeout(timer);
  }, [lang]);
  return <>{text}</>;
}
function StarField({ onPointer }: { onPointer: (point: { x: number; y: number }) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let stars: { x: number; y: number; r: number; opacity: number; speed: number; phase: number }[] = [];
    const color = getComputedStyle(canvas).getPropertyValue('--star-color').trim();
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      stars = Array.from({ length: 180 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + .2, opacity: Math.random(), speed: Math.random() * .005 + .002, phase: Math.random() * Math.PI * 2 }));
    }
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) { star.phase += star.speed; ctx.globalAlpha = (Math.sin(star.phase) + 1) / 2 * star.opacity; ctx.fillStyle = color; ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2); ctx.fill(); }
      if (!reduced) frame = requestAnimationFrame(draw);
    }
    const move = (e: MouseEvent) => onPointer({ x: e.clientX, y: e.clientY });
    resize(); draw(); window.addEventListener('resize', resize); window.addEventListener('mousemove', move);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move); };
  }, [onPointer]);
  return <canvas className="portfolio-stars" id="stars-canvas" ref={ref} aria-hidden="true" />;
}
