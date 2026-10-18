import ContactForm from "./ContactForm";
import React from "react";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Compass,
  Download,
  Figma,
  Github,
  Globe2,
  Layers3,
  Lightbulb,
  Linkedin,
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
    title: "Point of Sale System",
    category: "Web application",
    description: "A school project focused on making everyday sales tasks and product tracking more organized.",
    tags: ["UI design", "Web development"],
    theme: "lavender",
    kind: "pos",
    label: "POS / SALES OVERVIEW",
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
    title: "Landing Page Collection",
    category: "UI & web design",
    description: "Landing pages created for individual and group projects, exploring hierarchy, content, and visual storytelling.",
    tags: ["Landing pages", "Visual design"],
    theme: "peach",
    kind: "landing",
    label: "DIGITAL EXPERIENCES",
  },
  {
    number: "04",
    title: "Department Infographics",
    category: "Graphic design",
    description: "Informative visual materials made for a school department, turning information into clear, engaging layouts.",
    tags: ["Infographics", "Layout design"],
    theme: "blue",
    kind: "infographic",
    label: "LEARN / CREATE / CONNECT",
  },
];

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All work");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [headerTransparent, setHeaderTransparent] = useState(false);

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
            <div className="hero-actions reveal"><a className="button-primary" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="button-secondary" href="/resume.pdf" download="Mia-Patiluna-CV.pdf"><Download size={15}/> Download CV</a></div>
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
              <a href="#contact" className="project-art" aria-label={`Ask about ${project.title}`}><ProjectArtwork kind={project.kind}/><span className="project-open"><ArrowUpRight size={18}/></span></a>
              <div className="project-details"><div className="project-topline"><span>{project.category}</span><span>{project.number}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            </article>)}
          </div>
          <div className="work-footnote reveal"><span className="footnote-icon"><Layers3 size={16}/></span> These projects were created as academic and group requirements. More case studies coming soon. <span className="footnote-star"><Rocket size={18}/></span></div>
        </section>

        <section className="about-section" id="about">
          <div className="section-wrap about-layout section-pad">
            <div className="about-left reveal"><div className="eyebrow"><span className="eyebrow-line"/> A LITTLE ABOUT ME</div><h2>Curious by nature.<br/><span className="serif-word">Creative</span> by choice.</h2><div className="about-stamp"><span>STUDENT</span><span>DESIGNER</span><span>BUILDER</span><Compass size={19}/></div></div>
            <div className="about-right reveal"><p className="about-lead">I enjoy the space where design meets technology.</p><p>As a fourth-year Bachelor of Science in Information Technology student, I'm building my skills in designing and developing websites that balance visual clarity with practical function.</p><p>From a point-of-sale system to pharmacy website concepts, landing pages, and infographics, every project has helped me learn how to communicate ideas, solve problems, and collaborate with others.</p><p>I'm now looking for an OJT opportunity where I can contribute, learn from experienced people, and keep growing as a designer and developer.</p><a className="inline-link" href="#contact">A little more about what I can do <ArrowRight size={16}/></a></div>
          </div>
        </section>

        <section className="skills-section section-wrap section-pad" id="skills">
          <div className="section-heading reveal"><div><div className="eyebrow"><span className="eyebrow-line"/> MY TOOLKIT</div><h2>Skills in <span className="serif-word">progress.</span></h2></div><p>I'm always learning and refining my process. Here's where I'm focusing my energy.</p></div>
          <div className="skills-grid">
            <div className="skill-card reveal"><div className="skill-icon purple"><Figma size={21}/></div><span className="skill-number">01</span><h3>UI/UX & visual design</h3><p>Designing clear interfaces, organizing content, and thinking through the user journey.</p><div className="skill-tags"><span>Wireframing</span><span>Layout</span><span>Typography</span></div></div>
            <div className="skill-card reveal"><div className="skill-icon peach"><Globe2 size={21}/></div><span className="skill-number">02</span><h3>Web design</h3><p>Building responsive page layouts with attention to hierarchy, consistency, and detail.</p><div className="skill-tags"><span>Responsive UI</span><span>Landing pages</span></div></div>
            <div className="skill-card reveal"><div className="skill-icon mint"><Code2 size={21}/></div><span className="skill-number">03</span><h3>Front-end development</h3><p>Bringing designs to life and learning through hands-on academic projects.</p><div className="skill-tags"><span>HTML / CSS</span><span>JavaScript</span><span>React*</span></div></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div className="contact-decoration"><div className="contact-orbit orbit-a"/><div className="contact-orbit orbit-b"/><span><Code2 size={110} strokeWidth={1.1}/></span></div>
            <div className="contact-content reveal"><div className="eyebrow"><span className="eyebrow-line"/> YOUR NEXT INTERN?</div><h2>Let's make<br/>something <span className="serif-word">meaningful.</span></h2><p>I'm excited to learn, contribute, and take on new challenges during my OJT. Have an opportunity in mind? I'd love to hear from you.</p></div><div className="contact-form-col reveal"><ContactForm /><div className="contact-icons"><a href="mailto:patiluna.mia0@gmail.com" aria-label="Email"><Mail size={20}/></a><a href="https://github.com/t3n747" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20}/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20}/></a></div></div>
            
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a href="#home" className="footer-brand">m<span>.</span><span>p</span></a><span className="footer-year">© 2026</span></footer>
    </div>
  );
}

export default App;
