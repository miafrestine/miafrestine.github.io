import ContactForm from "./ContactForm";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Compass,
  Download,
  Eye,
  Figma,
  Github,
  Globe2,
  Layers3,
  Lightbulb,
  Zap,
  Mail,
  Menu,
  Moon,
  MousePointer2,
  Palette,
  PenTool,
  Rocket,
  Sun,
  X
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Café POS",
    category: "Web application",
    description: "A tablet-style café register built with React. It covers menu browsing with Small, Medium and Large sizes, cash and card checkout, staff PIN sign-in, and end-of-shift X and Z reports.",
    tags: ["React", "POS interface", "Shift reports"],
    theme: "peach",
    kind: "cafe",
    label: "CAFE POS / SHIFT ACTIVE",
    url: "https://cafe-pos-umber.vercel.app",
    repo: "https://github.com/miafrestine/cafe-pos",
  },
  {
    number: "02",
    title: "Pharmacy Website",
    category: "Website design",
    description: "A pharmacy website concept designed to make information and product categories easier to explore.",
    tags: ["Web design", "Responsive layout"],
    theme: "mint",
    kind: "pharmacy",
    label: "CAREPLUS / YOUR HEALTH, OUR PRIORITY",
  },
  {
    number: "03",
    title: "Department Infographics",
    category: "Graphic design",
    description: "Informative visual materials made for a school department, turning information into clear, engaging layouts.",
    tags: ["Infographics", "Layout design"],
    theme: "blue",
    kind: "infographic",
    label: "LEARN / CREATE / CONNECT",
  },
  {
    number: "04",
    title: "SubSplit",
    category: "UI & web design",
    description: "A dynamic billing ledger for boarding houses. It splits shared water and electricity costs using each tenant's own move-in cycle, so mid-month moves stop causing disputes.",
    tags: ["Billing ledger", "Pro-rata splitting", "Dark UI"],
    theme: "lavender",
    kind: "subsplit",
    label: "SUBSPLIT / DYNAMIC BILLING LEDGER",
    shots: [{ label: "Landing page", src: "/subsplit.png" }],
  },
  {
    number: "05",
    title: "SchedPlus",
    category: "UI & web design",
    description: "A web-based academic scheduling system for Fellowship Baptist College. It replaces the registrar's spreadsheets with one conflict-checked calendar and role-based views for the registrar, teachers, and students.",
    tags: ["Capstone", "Conflict detection", "Role-based views"],
    theme: "peach",
    kind: "schedplus",
    label: "SCHEDPLUS / ACADEMIC SCHEDULING",
    shots: [{ label: "The old way", src: "/schedplus-old.png" }, { label: "SchedPlus", src: "/schedplus.png" }],
  },
];

const SCHED_CELLS = ["gold", "", "gold", "maroon", "teal", "maroon", "teal", "maroon", "", "gold", "navy", "navy", "", "gold", "", "teal", "", "navy", "", ""];

function ProjectArtwork({ kind }) {
  if (kind === "pos") return (
    <div className="mock-window pos-window">
      <div className="mock-top"><span className="mock-logo"><span className="logo-dot"/> pointly</span><span className="mock-pill">● System online</span></div>
      <div className="pos-content">
        <div className="mock-sidebar"><i/><i/><i/><i/></div>
        <div className="pos-main">
          <div className="mock-eyebrow">MONDAY, OCTOBER 12</div><div className="mock-title">Good morning 👋</div>
          <div className="pos-stats"><div><small>Total sales</small><b>₱24,580</b><span>↗ 12.8%</span></div><div><small>Orders</small><b>128</b><span>Today</span></div></div>
          <div className="pos-chart"><div className="chart-lines"/>{[35,55,43,72,48,82,63,92,68,76,58,88].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div>
        </div>
      </div>
    </div>
  );
  if (kind === "pharmacy") return (
    <div className="pharmacy-window">
      <div className="pharm-nav"><span className="pharm-logo">✳ careplus</span><span>Shop　 About　 Contact</span><button>Explore products ↗</button></div>
      <div className="pharm-hero"><div><span className="mock-eyebrow">WELLNESS STARTS HERE</span><h3>Your health,<br/><em>our priority.</em></h3><p>Everyday essentials for a healthier you.</p><span className="pharm-cta">Discover more <ArrowRight size={13}/></span></div><div className="pharm-bottle"><div className="bottle-cap"/><div className="bottle-label">care<span>+</span><small>DAILY CARE</small></div></div><div className="pharm-orbit"/></div>
    </div>
  );
  if (kind === "cafe") return (
    <div className="cafe-window">
      <div className="cafe-side"><i/><i/><i/><i/></div>
      <div className="cafe-menu">
        <div className="cafe-head"><span className="cafe-logo">☕ cafe pos</span><span className="mock-pill">● Shift active</span></div>
        <div className="cafe-tabs"><span className="on">Coffee</span><span>Tea</span><span>Meal</span></div>
        <div className="cafe-items">
          <div><i/><b>Espresso</b><small>₱125.00</small></div>
          <div><i/><b>Cold Brew</b><small>₱145.00</small></div>
          <div><i/><b>Caramel Macchiato</b><small>₱185.00</small></div>
        </div>
      </div>
      <div className="cafe-ticket">
        <small>ORDER #2156</small>
        <p><span>Espresso</span><b>₱125</b></p>
        <p><span>Cold Brew</span><b>₱145</b></p>
        <div className="cafe-total"><span>Total</span><b>₱270</b></div>
        <span className="cafe-pay">Pay ₱270</span>
      </div>
    </div>
  );
  if (kind === "subsplit") return (
    <div className="ss-window">
      <div className="ss-nav"><b>SubSplit</b><span className="ss-pill">Features　About　How It Works</span><span className="ss-btn">Sign Up</span></div>
      <div className="ss-hero"><div><h3><span>A dynamic billing</span><br/><em>ledger system</em> for landlord properties.</h3><span className="ss-cta">Get Started</span></div><div className="ss-orb"><Zap size={26}/></div></div>
      <div className="ss-cards"><i/><i/><i/></div>
    </div>
  );
  if (kind === "schedplus") return (
    <div className="sp-window">
      <div className="sp-nav"><b>Sched<span>Plus</span></b><span className="sp-login">Login</span></div>
      <div className="sp-bar"><span>The registrar's Monday morning</span><span className="sp-toggle"><i/></span></div>
      <div className="sp-grid">{["MON", "TUE", "WED", "THU", "FRI"].map((d) => <span className="sp-h" key={d}>{d}</span>)}{SCHED_CELLS.map((c, i) => <i key={i} className={c}/>)}</div>
    </div>
  );
  if (kind === "landing") return (
    <div className="landing-window">
      <div className="landing-nav"><span>studio<span className="landing-star">✳</span></span><span>Work　 About　 Journal</span><span>Let's talk ↗</span></div>
      <div className="landing-copy"><span className="mock-eyebrow">DESIGN THAT MOVES YOU</span><h3>Make room<br/>for <em>better ideas.</em></h3><p>Thoughtful digital experiences for curious people.</p><div className="landing-orb"><span>✳</span></div></div>
      <div className="landing-footer">CREATIVE DIRECTION <span>2025 — 2026</span></div>
    </div>
  );
  return (
    <div className="info-window">
      <div className="info-top"><span>STUDENT LIFE / INFO SERIES</span><span>VOL. 01</span></div>
      <div className="info-body"><div className="info-vertical">DESIGN • LEARN • GROW</div><div className="info-main"><span className="info-sun">✳</span><h3>Ideas into<br/><em>impact.</em></h3><p>Clear information.<br/>Creative communication.</p><div className="info-bars"><i/><i/><i/></div></div><div className="info-sticker">KEEP<br/>CURIOUS!</div></div>
      <div className="info-bottom"><span>DEPARTMENT INFOGRAPHICS</span><span>01 / 04</span></div>
    </div>
  );
}

function Viewer({ project, onClose }) {
  const [tab, setTab] = useState(0);
  const [failed, setFailed] = useState({});

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const shot = project.shots[tab];
  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`${project.title} landing page`} onClick={onClose}>
      <div className="viewer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="viewer-bar">
          <b>{project.title}</b>
          {project.shots.length > 1 && <div className="viewer-tabs">{project.shots.map((s, i) => <button type="button" key={s.label} className={i === tab ? "on" : ""} onClick={() => setTab(i)}>{s.label}</button>)}</div>}
          <button type="button" className="viewer-close" onClick={onClose} aria-label="Close"><X size={18}/></button>
        </div>
        <div className="viewer-scroll">
          {failed[shot.src]
            ? <p className="viewer-missing">Screenshot not found. Add it to the public folder as <code>{shot.src}</code>.</p>
            : <img src={shot.src} alt={`${project.title} landing page, ${shot.label}`} onError={() => setFailed((f) => ({ ...f, [shot.src]: true }))} />}
        </div>
      </div>
    </div>
  );
}

function CVModal({ onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const focusableElements = () => Array.from(
      document.querySelectorAll(".cv-modal-panel a[href], .cv-modal-panel button:not([disabled]), .cv-modal-panel iframe[tabindex='0']")
    );
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = focusableElements();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousActiveElement instanceof HTMLElement) previousActiveElement.focus();
    };
  }, [onClose]);

  return (
    <div className="viewer cv-viewer" role="dialog" aria-modal="true" aria-labelledby="cv-modal-title" onClick={onClose}>
      <div className="cv-modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="cv-modal-header">
          <h2 id="cv-modal-title">Mia Patiluna — CV</h2>
          <a className="cv-download" href="/resume.pdf" download="Mia-Patiluna-CV.pdf"><Download size={16}/> Download PDF</a>
          <button ref={closeButtonRef} type="button" className="cv-close" onClick={onClose} aria-label="Close CV modal"><X size={19}/></button>
        </div>
        <iframe className="cv-pdf" src="/resume.pdf" title="Mia Patiluna resume PDF" tabIndex="0"/>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All work");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [headerTransparent, setHeaderTransparent] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [showCV, setShowCV] = useState(false);
  const closeCV = useCallback(() => setShowCV(false), []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHeaderTransparent(currentScrollY > previousScrollY && currentScrollY > 80);
      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filters = ["All work", "Web design", "Web application", "Graphic design"];
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All work") return true;
    if (activeFilter === "Web design") return ["Website design", "UI & web design"].includes(project.category);
    return project.category === activeFilter;
  });

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" data-theme={isDarkTheme ? "dark" : "light"}>
      <header className={headerTransparent ? "site-header is-transparent" : "site-header"}>
        <a href="#home" className="brand" aria-label="Mia Patiluna home"><span className="brand-mark">m<span>.</span><span>p</span></span></a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#work" onClick={closeMenu}>Selected work <span>↘</span></a>
          <a href="#about" onClick={closeMenu}>About me</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#contact" className="nav-contact mobile-connect" onClick={closeMenu}>Let's connect <ArrowUpRight size={15}/></a>
        </nav>
        <div className="header-actions">
          <a href="#contact" className="header-connect">Let's connect <ArrowUpRight size={15}/></a>
          <button className="theme-toggle" type="button" onClick={() => setIsDarkTheme(!isDarkTheme)} aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`} aria-pressed={isDarkTheme} title={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}>{isDarkTheme ? <Sun size={18}/> : <Moon size={18}/>}</button>
        </div>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow reveal"><span className="eyebrow-line"/> HELLO, I'M MIA — A DESIGN-MINDED IT STUDENT</div>
            <h1 className="hero-title reveal">I turn ideas<br/>into <span className="serif-word">digital</span><br/><span className="title-last">experiences<span className="title-period">.</span></span></h1>
            <p className="hero-description reveal">I'm Mia Patiluna, a fourth-year BSIT student passionate about UI/UX and web design. I love creating digital experiences that feel thoughtful, look beautiful, and work for real people.</p>
            <div className="hero-actions reveal"><a className="button-primary" href="#work">Explore my work <ArrowDownRight size={17}/></a><button type="button" className="button-secondary" onClick={() => setShowCV(true)}><Eye size={15}/> View CV</button></div>
            <div className="hero-meta reveal"><span className="meta-icon" aria-hidden="true"><span className="meta-dot"/></span><div><b>Currently looking for OJT</b><span>Ready to learn, collaborate, and grow.</span></div></div>
          </div>
          <div className="hero-visual reveal">
            <div className="visual-grid"/>
            <div className="floating-label label-top"><span className="label-star"><PenTool size={16}/></span> DESIGN WITH PURPOSE</div>
            <div className="portrait-card">
              <div className="portrait-top"><span>CREATIVE MINDSET</span><span>01 — 04</span></div>
              <div className="portrait-abstract"><div className="abstract-ring ring-one"/><div className="abstract-ring ring-two"/><img className="profile-image" src="/profile.png" alt="Mia Patiluna"/><div className="abstract-badge" aria-hidden="true"><MousePointer2 size={20}/></div><div className="abstract-spark">✦</div></div>
              <div className="portrait-bottom"><span>UI / UX DESIGN</span><span>WEB DEVELOPMENT</span></div>
            </div>
            <div className="floating-note"><span className="note-icon"><Palette size={16}/></span><span><b>Design + technology</b><small>Where my interests meet</small></span></div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="section-wrap strip-inner"><span>MY CREATIVE CORNER</span><div className="strip-statement">A little bit of <em>logic.</em> A little bit of <em>magic.</em> A whole lot of curiosity. <Lightbulb size={18}/></div></div>
        </section>

        <section className="work-section section-wrap section-pad" id="work">
          <div className="section-heading reveal"><div><div className="eyebrow"><span className="eyebrow-line"/> THE THINGS I'VE MADE</div><h2>Selected <span className="serif-word">work.</span></h2></div><p>A collection of school projects and creative explorations where I practiced turning ideas into useful, user-friendly experiences.</p></div>
          <div className="filter-row reveal">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={activeFilter === filter ? "filter-chip active" : "filter-chip"}>{filter}{activeFilter === filter && <span>↗</span>}</button>)}</div>
          <div className="project-grid">
            {filteredProjects.map((project, index) => <article className={`project-card reveal ${project.theme}`} key={project.number} style={{transitionDelay:`${index * 90}ms`}}>
              <a href={project.url ?? "#contact"} {...(project.url ? { target: "_blank", rel: "noreferrer" } : {})} className="project-art" onClick={project.shots ? (e) => { e.preventDefault(); setViewer(project); } : undefined} aria-label={project.shots ? `View ${project.title} landing page` : project.url ? `Open ${project.title}` : `Ask about ${project.title}`}><ProjectArtwork kind={project.kind}/><span className="project-open"><ArrowUpRight size={18}/></span></a>
              <div className="project-details"><div className="project-topline"><span>{project.category}</span><span>{project.number}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.shots && <div className="project-links"><button type="button" className="inline-link view-link" onClick={() => setViewer(project)}>View landing page <ArrowUpRight size={14}/></button></div>}{project.url && <div className="project-links"><a className="inline-link" href={project.url} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14}/></a>{project.repo && <a className="inline-link" href={project.repo} target="_blank" rel="noreferrer"><Github size={14}/> Source code</a>}</div>}</div>
            </article>)}
          </div>
          <div className="work-footnote reveal"><span className="footnote-icon"><Layers3 size={16}/></span> These projects were created as academic and group requirements. More case studies coming soon. <span className="footnote-star"><Rocket size={18}/></span></div>
        </section>

        <section className="about-section" id="about">
          <div className="section-wrap about-layout section-pad">
            <div className="about-left reveal"><div className="eyebrow"><span className="eyebrow-line"/> A LITTLE ABOUT ME</div><h2>Curious by nature.<br/><span className="serif-word">Creative</span> by choice.</h2><div className="about-stamp"><span>STUDENT</span><span>DESIGNER</span><span>BUILDER</span><Compass size={19}/></div></div>
            <div className="about-right reveal"><p className="about-lead">I enjoy the space where design meets technology.</p><p>As a fourth-year Bachelor of Science in Information Technology student, I'm building my skills in designing and developing websites that balance visual clarity with practical function.</p><p>From a point-of-sale system, a utility billing platform, and a scheduling system to pharmacy website concepts, landing pages, and infographics, every project has helped me learn how to communicate ideas, solve problems, and collaborate with others.</p><p>I'm now looking for an OJT opportunity where I can contribute, learn from experienced people, and keep growing as a designer and developer.</p><a className="inline-link" href="#contact">A little more about what I can do <ArrowRight size={16}/></a></div>
          </div>
        </section>

        <section className="skills-section section-wrap section-pad" id="skills">
          <div className="section-heading reveal"><div><div className="eyebrow"><span className="eyebrow-line"/> MY TOOLKIT</div><h2>Skills in <span className="serif-word">progress.</span></h2></div><p>I'm always learning and refining my process. Here's where I'm focusing my energy.</p></div>
          <div className="skills-grid">
            <div className="skill-card reveal"><div className="skill-icon purple"><Figma size={21}/></div><span className="skill-number">01</span><h3>UI/UX & visual design</h3><p>Designing clear interfaces, organizing content, and thinking through the user journey.</p><div className="skill-tags"><span>Wireframing</span><span>Layout</span><span>Typography</span></div></div>
            <div className="skill-card reveal"><div className="skill-icon peach"><Globe2 size={21}/></div><span className="skill-number">02</span><h3>Web design</h3><p>Building responsive page layouts with attention to hierarchy, consistency, and detail.</p><div className="skill-tags"><span>Responsive UI</span><span>Landing pages</span></div></div>
            <div className="skill-card reveal"><div className="skill-icon mint"><Code2 size={21}/></div><span className="skill-number">03</span><h3>Front-end development</h3><p>Bringing designs to life and learning through hands-on academic projects.</p><div className="skill-tags"><span>HTML / CSS</span><span>JavaScript</span><span>React</span></div></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div className="contact-decoration"><div className="contact-orbit orbit-a"/><div className="contact-orbit orbit-b"/><span><Code2 size={110} strokeWidth={1.1}/></span></div>
            <div className="contact-content reveal"><div className="eyebrow"><span className="eyebrow-line"/> YOUR NEXT INTERN?</div><h2>Let's make<br/>something <span className="serif-word">meaningful.</span></h2><p>I'm excited to learn, contribute, and take on new challenges during my OJT. Have an opportunity in mind? I'd love to hear from you.</p></div><div className="contact-form-col reveal"><ContactForm /><div className="contact-icons"><a href="mailto:patiluna.mia0@gmail.com" aria-label="Email"><Mail size={20}/></a><a href="https://github.com/mia-0p" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20}/></a></div></div>
            
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a href="#home" className="footer-brand">m<span>.</span><span>p</span></a><span className="footer-year">© 2026</span></footer>
      {viewer && <Viewer project={viewer} onClose={() => setViewer(null)} />}
      {showCV && <CVModal onClose={closeCV} />}
    </div>
  );
}

export default App;
