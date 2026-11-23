import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Arthur DJATCHEU — Dev Junior" }] }),
  staticData: { importedDocument: { html: { "lang": "fr" }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <>
      <style>{capturedCSS}</style>
      <div className="items-center flex justify-center fixed [inset:0px] [overflow:hidden] [transition:opacity_0.8s_cubic-bezier(0.77,0,0.175,1),visibility_0.8s] [z-index:10000]" id="intro-screen">
        <div className="intro-bg absolute [filter:brightness(0.18)_saturate(0.65)_contrast(1.1)] [inset:0px] [z-index:1]" />
        <button className="absolute [top:2rem] [right:2rem] [font-family:var(--font-mono)] [font-size:0.8rem] [cursor:pointer] [z-index:3] pointer-events-auto" style={{ background: "none", borderWidth: "medium", borderStyle: "none", borderColor: "currentcolor", borderImage: "none", color: "var(--text-muted)" } as CSSProperties} id="intro-skip">Passer ✕</button>
        <div className="items-center flex flex-col gap-[2.2rem] relative text-center [z-index:2]">
          <div className="intro-photo-wrap rounded-[50%] h-[170px] relative [animation:4s_ease_0s_infinite_alternate_none_running_intro-glow]">
            <img className="intro-photo rounded-[50%] object-cover [border:3px_solid_rgb(4,6,15)] [height:100%]" src="/site-assets/57975f7faa20e0bb.jpg" alt="Arthur DJATCHEU" />
          </div>
          <div className="intro-loader-btn loaded items-center rounded-[27px] flex h-[54px] justify-center pointer-events-auto relative [border:1px_solid_rgba(212,175,106,0.25)] [border-color:transparent]! [cursor:none] [font-family:var(--font-display)] [font-size:0.95rem] [font-weight:700] [letter-spacing:0.06em] [overflow:hidden] [transition:0.5s_cubic-bezier(0.25,0.46,0.45,0.94)]" id="introBtn">
            <div className="progress-fill absolute [animation:5s_linear_0s_1_normal_forwards_running_progress-fill-anim] [bottom:0px] [left:0px] [top:0px] [z-index:1]" style={{ width: "100%" }} id="progressFill" />
            <span className="relative [transition:0.3s] [z-index:2]" id="introBtnText">Let's build the future</span>
          </div>
        </div>
      </div>
      <div className="rounded-[50%] h-[12px] pointer-events-none fixed [mix-blend-mode:difference] [transition:width_0.2s,height_0.2s,background_0.2s] [z-index:100000]" style={{ left: "768px", top: "432px" }} id="cursor" />
      <div className="rounded-[50%] h-[40px] pointer-events-none fixed [border:1.5px_solid_var(--gold-light)] [transition:transform_0.12s,width_0.3s,height_0.3s,opacity_0.3s] [z-index:99999]" style={{ left: "768px", top: "432px" }} id="cursor-ring" />
      <picture className="contents">
        <source media="(max-width: 767px)" srcSet="data:image/webp;base64,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" />
        <img className="pointer-events-none fixed [height:100%] [left:0px] [top:0px] [z-index:0]" id="stars-canvas" width="1536" height="864" src="data:image/webp;base64,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" data-site-import-static-fallback="canvas" alt="" />
      </picture>
      <div className="mobile-menu items-center hidden flex-col justify-center fixed [gap:2.5rem] [inset:0px] [z-index:999]" id="mobileMenu"><button className="mobile-close absolute [border-color:currentcolor] [border-image:none] [border-style:none] [border-width:medium] [cursor:none] [font-size:1.5rem] [right:2rem] [top:1.5rem]">✕</button><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#about">À propos</a><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#skills">Compétences</a><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#formation">Formation</a><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#projects">Projets</a><a className="no-underline [font-family:var(--font-display)] [font-size:2rem] [font-weight:800]" href="#contact">Contact</a></div>
      <nav className="items-center flex justify-between fixed [backdrop-filter:blur(20px)] [border-bottom:1px_solid_var(--border)] [left:0px] [right:0px] [top:0px] [transition:background_0.5s] [z-index:1000]">
        <a className="nav-logo no-underline [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.3rem] [font-weight:800] [letter-spacing:-0.02em]" href="#hero">AD.</a>
        <ul className="nav-links list-none [gap:2.5rem]">
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#about">À propos</a>
          </li>
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#skills">Compétences</a>
          </li>
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#formation">Formation</a>
          </li>
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#projects">Projets</a>
          </li>
          <li>
            <a className="no-underline uppercase [font-family:var(--font-mono)] [font-size:0.78rem] [letter-spacing:0.08em]" href="#contact">Contact</a>
          </li>
        </ul>
        <div className="items-center flex [gap:1.5rem]"><button className="lang-toggle [cursor:none] [font-family:var(--font-mono)] [font-size:0.75rem] [transition:0.3s]" id="langBtn">EN</button><button className="theme-toggle [cursor:none] [font-family:var(--font-mono)] [font-size:0.75rem] [transition:0.3s]" id="themeBtn">☀️</button><div className="hamburger flex-col gap-[5px] [cursor:none]"><span className="rounded-[2px] h-[2px] [transition:0.3s]" /><span className="rounded-[2px] h-[2px] [transition:0.3s]" /><span className="rounded-[2px] h-[2px] [transition:0.3s]" /></div></div>
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
    </>
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
          <div className="hero-tag items-center inline-flex uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [gap:0.5rem] [letter-spacing:0.12em]" style={{ transform: "translateY(0px)", opacity: "1" }}>Disponible pour
              des opportunités</div>
          <h1 className="hero-name [animation:0.8s_ease_0.4s_1_normal_forwards_running_fade-up] [font-family:var(--font-display)] [font-size:clamp(2.5rem,10vw,6.5rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:0.95]" style={{ transform: "translateY(0px)", opacity: "1" }}>
              Arthur<br /><span className="block [-webkit-text-fill-color:transparent]">DJATCHEU</span></h1>
          <div className="hero-title-line [animation:0.8s_ease_0.6s_1_normal_forwards_running_fade-up] [font-family:var(--font-display)] [font-size:clamp(1.2rem,2.5vw,2rem)] [font-weight:600]" style={{ transform: "translateY(0px)", opacity: "1" }}>Dev Junior · Génie Informatique</div>
          <div className="min-h-[1.5em] [animation:0.8s_ease_0.8s_1_normal_forwards_running_fade-up] [font-family:var(--font-mono)] [font-size:clamp(0.8rem,1.3vw,1rem)]" style={{ transform: "translateY(0px)", opacity: "1" }} id="typewriter">Créateur d'expériences digitales...</div>
          <p className="hero-slogan italic max-w-[480px] [animation:0.8s_ease_1s_1_normal_forwards_running_fade-up] [border-left:2px_solid_var(--gold)] [font-size:0.9rem] [line-height:1.7]" style={{ transform: "translateY(0px)", opacity: "1" }}>
              "La succession des choix que nous effectuons durant notre parcours détermine notre destination finale."
            </p>
          <div className="hero-tag items-center inline-flex uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [gap:0.5rem] [letter-spacing:0.12em]" style={{ transform: "translateY(0px)", opacity: "1" }}>Let's Build the FUTURE
            </div>
          <div className="hero-ctas flex flex-wrap [animation:0.8s_ease_1.2s_1_normal_forwards_running_fade-up] [gap:1rem] [@media(max-width:1024px)]:justify-center" style={{ transform: "translateY(0px)", opacity: "1" }}><a className="btn-primary items-center rounded-[100px] inline-flex no-underline [cursor:none] [font-family:var(--font-display)] [font-size:0.9rem] [font-weight:600] [gap:0.5rem] [overflow:hidden]" href="#projects">Voir mes
                projets →</a><a className="btn-secondary items-center inline-flex no-underline [backdrop-filter:blur(10px)] [cursor:none] [font-family:var(--font-display)] [font-size:0.9rem] [font-weight:600] [gap:0.5rem]" href="#contact">Me contacter</a></div>
        </div>
      </div>
      <div className={"\x73croll-hint items-center flex flex-col absolute [animation:0.8s_ease_2s_1_normal_forwards_running_fade-up] [bottom:2rem] [gap:0.5rem] [left:50%] [z-index:2]"} style={{ transform: "translateY(3.55271e-15px)", opacity: "1" }}>
        <span className="uppercase [font-family:var(--font-mono)] [font-size:0.65rem] [letter-spacing:0.15em]">Découvrir</span>
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
                <div className="stat-label uppercase [font-family:var(--font-mono)] [font-size:0.75rem] [letter-spacing:0.05em]">Projets</div>
              </div>
              <div className="stat-card text-center [transition:border-color_0.3s,transform_0.3s]">
                <div className="stat-number [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800]">3</div>
                <div className="stat-label uppercase [font-family:var(--font-mono)] [font-size:0.75rem] [letter-spacing:0.05em]">Langues</div>
              </div>
              <div className="stat-card text-center [transition:border-color_0.3s,transform_0.3s]">
                <div className="stat-number [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800]">4</div>
                <div className="stat-label uppercase [font-family:var(--font-mono)] [font-size:0.75rem] [letter-spacing:0.05em]">Technos</div>
              </div>
              <div className="stat-card text-center [transition:border-color_0.3s,transform_0.3s]">
                <div className="stat-number [-webkit-text-fill-color:transparent] [font-family:var(--font-display)] [font-size:1.8rem] [font-weight:800]">∞</div>
                <div className="stat-label uppercase [font-family:var(--font-mono)] [font-size:0.75rem] [letter-spacing:0.05em]">Ambition</div>
              </div>
            </div>
          </div>
          <div className={"reveal-right \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]">Qui suis-je</div>
            <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
              <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}>À propos</span>
            </h2>
            <div className="section-divider rounded-[2px] h-[3px]" />
            <div className="about-text">
              <p className="[line-height:1.8]">
                  Je suis <strong>Arthur DJATCHEU</strong>, étudiant en Génie Informatique à l'IUT de Douala, Cameroun.
                  Passionné par le développement web depuis mes premières lignes de code, je construis des expériences
                  digitales qui allient esthétique moderne et performance technique.
                </p>
              <p className="[line-height:1.8]">
                  Curieux, créatif et déterminé, je crois fermement que chaque projet est une opportunité d'apprendre,
                  d'innover et de laisser une empreinte. Ma philosophie : transformer chaque ligne de code en une solution
                  qui impacte positivement.
                </p>
              <p className="[line-height:1.8]">
                  Basé à <strong>Douala, Cameroun</strong>, je suis ouvert aux collaborations locales et internationales,
                  aux stages et aux projets freelance.
                </p>
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
          <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]">Expertise</div>
          <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
            <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}>Compétences</span>
          </h2>
          <div className="section-divider rounded-[2px] h-[3px]" />
        </div>
        <div className="bento-grid grid gap-[1.2rem]">
          <div className={"bento-card wide reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.1s" }}>
            <div className="bento-icon [font-size:2rem]">⚡</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]">Compétences Techniques
              </div>
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
                  <span>JavaScript</span>
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
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]">Soft Skills</div>
            <ul className="soft-skill-list list-none">
              <li className="items-center flex gap-[0.6rem] [border-bottom:1px_solid_var(--border)]">Créativité &amp; Innovation</li>
              <li className="items-center flex gap-[0.6rem] [border-bottom:1px_solid_var(--border)]">Gestion de Projet</li>
              <li className="items-center flex gap-[0.6rem] [border-bottom:1px_solid_var(--border)]">Travail en Équipe</li>
              <li className="items-center flex gap-[0.6rem] [border-bottom:1px_solid_var(--border)]">Résolution de Problèmes</li>
            </ul>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.3s", background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))" }}>
            <div className="bento-icon [font-size:2rem]">🌍</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]">Localisation</div>
            <div className="bento-desc [line-height:1.6] [font-family:var(--font-display)] [font-weight:700]" style={{ fontSize: "1.3rem", color: "var(--text)", marginTop: "0.5rem" }}>
                Douala<br /><span className="[font-size:0.9rem]" style={{ color: "var(--gold)" }}>Cameroun 🇨🇲</span></div>
            <div className="bento-desc [line-height:1.6]" style={{ marginTop: "1rem" }}>Ouvert aux opportunités remote &amp; locales</div>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.35s" }}>
            <div className="bento-icon [font-size:2rem]">📊</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]">Marketing Digital</div>
            <div className="bento-desc [line-height:1.6]">
                Formation Google Digital Garage en cours. Compréhension des stratégies SEO, réseaux sociaux et analytics.
              </div>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.4s", background: "linear-gradient(135deg, rgba(212, 175, 106, 0.08), rgba(124, 58, 237, 0.08))" }}>
            <div className="bento-icon [font-size:2rem]">⚡</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]">JavaScript</div>
            <div className="bento-desc [line-height:1.6]">
                Formation JavaScript en cours.
              </div>
          </div>
          <div className={"bento-card reveal \x76isible [overflow:hidden]"} style={{ transitionDelay: "0.45s" }}>
            <div className="bento-icon [font-size:2rem]">🛠️</div>
            <div className="bento-title [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:700]">Outils &amp; Plateformes</div>
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
          <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]">Parcours académique</div>
          <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
            <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}>Formation</span>
          </h2>
          <div className="section-divider rounded-[2px] h-[3px]" />
        </div>
        <div className="formation-grid grid">
          <div className={"reveal-left \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]">En cours
                    · 2026 — présent</div>
                <div className="timeline-title [font-family:var(--font-display)] [font-size:1.2rem] [font-weight:700]">IUT de Douala</div>
                <div className="timeline-sub [font-size:0.88rem] [line-height:1.6]">
                    Génie Informatique · Douala, Cameroun<br />Formation en développement logiciel, algorithmique, réseaux et
                    bases de données.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]">2025 ·
                    Baccalauréat
                  </div>
                <div className="timeline-title [font-family:var(--font-display)] [font-size:1.2rem] [font-weight:700]">Lycée Joss de
                    Douala</div>
                <div className="timeline-sub [font-size:0.88rem] [line-height:1.6]">
                    Enseignement secondaire · Douala, Cameroun<br />Obtention du Baccalauréat avec succès.</div>
              </div>
            </div>
          </div>
          <div className={"reveal-right \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <h3 className="[font-family:var(--font-display)] [font-size:1.3rem] [font-weight:700]" style={{ marginBottom: "1.5rem" }}>Certifications</h3>
            <div className="cert-grid grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] [gap:1rem]">
              <div className="cert-card featured items-start flex [gap:1rem] [transition:0.3s]">
                <div className="cert-icon items-center rounded-[12px] flex h-[44px] justify-center [flex-shrink:0] [font-size:1.2rem]">💻</div>
                <div className="cert-info">
                  <div className="cert-name [font-family:var(--font-display)] [font-size:0.95rem] [font-weight:700]">Responsive Web Design</div>
                  <div className="cert-provider [font-family:var(--font-mono)] [font-size:0.78rem]">freeCodeCamp</div>
                  <a className="btn-cert items-start inline-flex flex-col no-underline [backdrop-filter:blur(10px)] [cursor:none] [gap:0.25rem]" href="https://freecodecamp.org/certification/aazer/responsive-web-design-v9" rel="noopener" target="_blank">{"\n                  "}<span className="btn-cert-title [font-family:var(--font-display)] [font-size:0.98rem] [font-weight:700] [letter-spacing:0.01em]">Voir le certificat</span>{"\n                  "}<span className="btn-cert-sub [font-family:var(--font-mono)] [font-size:0.75rem]">✅ Obtenu — 11 juin 2026</span>{"\n                "}</a>
                </div>
              </div>
              <div className="cert-card items-start flex [gap:1rem] [transition:0.3s]">
                <div className="cert-icon items-center rounded-[12px] flex h-[44px] justify-center [flex-shrink:0] [font-size:1.2rem]">📈</div>
                <div className="cert-info">
                  <div className="cert-name [font-family:var(--font-display)] [font-size:0.95rem] [font-weight:700]">Marketing Digital</div>
                  <div className="cert-provider [font-family:var(--font-mono)] [font-size:0.78rem]">Google Digital Garage</div>
                  <span className="cert-status rounded-[100px] inline-block [border:1px_solid_rgba(212,175,106,0.3)] [font-family:var(--font-mono)] [font-size:0.68rem]">En cours</span>
                </div>
              </div>
              <div className="cert-card items-start flex [gap:1rem] [transition:0.3s]">
                <div className="cert-icon items-center rounded-[12px] flex h-[44px] justify-center [flex-shrink:0] [font-size:1.2rem]">⚡</div>
                <div className="cert-info">
                  <div className="cert-name [font-family:var(--font-display)] [font-size:0.95rem] [font-weight:700]">Algorithmes &amp; Structures de Données JS</div>
                  <div className="cert-provider [font-family:var(--font-mono)] [font-size:0.78rem]">freeCodeCamp</div>
                  <span className="cert-status rounded-[100px] inline-block [border:1px_solid_rgba(212,175,106,0.3)] [font-family:var(--font-mono)] [font-size:0.68rem]">En cours</span>
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
          <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]">Mes réalisations</div>
          <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
            <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}>Projets</span>
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
              <div className="project-tags flex flex-wrap [gap:0.5rem]"><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">HTML</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">CSS</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">JavaScript</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Vercel</span></div>
              <a className="project-link items-center inline-flex no-underline [font-family:var(--font-display)] [font-size:0.85rem] [font-weight:600]" href="https://nuru-ashy.vercel.app/" target="_blank">Voir le projet →</a>
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
              <a className="project-link items-center inline-flex no-underline [font-family:var(--font-display)] [font-size:0.85rem] [font-weight:600]" href="https://maelle-beauty-glow.lovable.app/" target="_blank">Voir le projet →</a>
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
              <div className="project-desc [font-size:0.88rem] [line-height:1.7]">
                  Site e-commerce vitrine pour Viny Natural Juice à Douala. Met en valeur des jus de fruits 100% bio et pressés à froid avec un système interactif de recettes personnalisées.
                </div>
              <div className="project-tags flex flex-wrap [gap:0.5rem]"><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Next.js</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Tailwind CSS</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">React</span><span className="project-tag rounded-[100px] [border:1px_solid_var(--border)] [font-family:var(--font-mono)] [font-size:0.7rem]">Vercel</span></div>
              <a className="project-link items-center inline-flex no-underline [font-family:var(--font-display)] [font-size:0.85rem] [font-weight:600]" href="https://viny-natural-juice.vercel.app/" target="_blank">Voir le projet →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionContact() {
  return (
    <section className="relative [z-index:1]" id="contact">
      <div className="section-inner max-w-[1200px]">
        <div className={"reveal \x76isible"}>
          <div className="section-label items-center inline-flex gap-[0.6rem] uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.15em]">Travaillons ensemble
            </div>
          <h2 className="section-title [font-family:var(--font-display)] [font-size:clamp(2rem,8vw,4rem)] [font-weight:800] [letter-spacing:-0.03em] [line-height:1]">
            <div className="contact-photo-wrap rounded-[50%] inline-block h-[60px] align-middle [border:2px_solid_var(--gold)] [overflow:hidden]">
              <img className="contact-photo object-cover [height:100%]" src="/site-assets/57975f7faa20e0bb.jpg" alt="Arthur DJATCHEU" />
            </div>
            <span className={"\x67radient-text [-webkit-text-fill-color:transparent]"}>Contact</span>
          </h2>
          <div className="section-divider rounded-[2px] h-[3px]" />
        </div>
        <div className="contact-grid items-start grid [gap:5rem]">
          <div className={"reveal-left \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <h3>Discutons de votre projet</h3>
            <p>
                Je suis ouvert à toute opportunité : stage, projet freelance, collaboration ou simplement échanger autour du
                développement web. N'hésitez pas à me contacter !
              </p>
            <div className="flex flex-col [gap:1rem]"><a className="contact-link items-center flex no-underline [font-size:0.88rem] [gap:1rem]" href="mailto:djatcheuarthur4@gmail.com">{"\n              "}<div className="contact-link-icon items-center rounded-[10px] flex h-[40px] justify-center [flex-shrink:0] [font-size:1rem]">✉️</div>{"\n              "}<span>djatcheuarthur4@gmail.com</span>{"\n            "}</a><a className="contact-link items-center flex no-underline [font-size:0.88rem] [gap:1rem]" href="https://wa.me/237672931105" target="_blank">{"\n              "}<div className="contact-link-icon items-center rounded-[10px] flex h-[40px] justify-center [flex-shrink:0] [font-size:1rem]">💬</div>{"\n              "}<span>+237 672 931 105</span>{"\n            "}</a><a className="contact-link items-center flex no-underline [font-size:0.88rem] [gap:1rem]" href="https://www.linkedin.com/in/arthur-djatcheu-7397833a4" target="_blank">{"\n              "}<div className="contact-link-icon items-center rounded-[10px] flex h-[40px] justify-center [flex-shrink:0] [font-size:1rem]">🔗</div>{"\n              "}<span>LinkedIn — Arthur DJATCHEU</span>{"\n            "}</a></div>
          </div>
          <div className={"reveal-right \x76isible [transition:opacity_0.8s_var(--transition),transform_0.8s_var(--transition)]"}>
            <form className="contact-form" id="contactForm">
              <div className="form-row grid [gap:1rem]">
                <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]">Prénom</label><input className="resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" type="text" placeholder="John" required /></div>
                <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]">Nom</label><input className="resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" type="text" placeholder="Doe" required /></div>
              </div>
              <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]">Email</label><input className="resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" type="email" placeholder="john@example.com" required /></div>
              <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]">Sujet</label><input className="resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" type="text" placeholder="Projet freelance, Stage..." required /></div>
              <div className="form-group"><label className="block uppercase [font-family:var(--font-mono)] [font-size:0.72rem] [letter-spacing:0.08em]">Message</label><textarea className="h-[140px] resize-none [font-family:var(--font-body)] [font-size:0.9rem] [outline:none] [transition:border-color_0.3s,box-shadow_0.3s]" placeholder="Décrivez votre projet ou votre demande..." required /></div>
              <button className="form-submit rounded-[12px] [border-color:currentcolor] [border-image:none] [border-style:none] [border-width:medium] [cursor:none] [font-family:var(--font-display)] [font-size:1rem] [font-weight:700] [transition:0.3s]" type="submit">Envoyer le
                  message →</button>
            </form>
            <div className="rounded-[16px] hidden text-center [border:1px_solid_rgba(124,58,237,0.4)] [font-family:var(--font-display)] [font-size:1.1rem] [font-weight:600]" id="form-success">
                ✅ Message envoyé avec succès ! Je vous répondrai très bientôt.
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
