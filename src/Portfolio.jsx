import { useState, useEffect, useRef } from "react";

const RESUME_BASE64 = ""; // Embed omitted for size; download link preserved

/* ─── THEME TOKENS ─────────────────────────────────────────── */
const themes = {
  dark: {
    bg:       "#0b0e13",
    bg2:      "#111520",
    bg3:      "#161b27",
    card:     "#131823",
    line:     "rgba(255,255,255,0.07)",
    accent:   "#00e5c3",
    accent2:  "#4f7fff",
    text:     "#e8ecf4",
    muted:    "#6b7794",
    sub:      "#8d98b4",
    navBg:    "rgba(11,14,19,0.88)",
    tagBg:    "rgba(79,127,255,0.08)",
    tagBorder:"rgba(79,127,255,0.22)",
  },
  light: {
    bg:       "#f4f6fb",
    bg2:      "#eaecf4",
    bg3:      "#e0e4ef",
    card:     "#ffffff",
    line:     "rgba(0,0,0,0.09)",
    accent:   "#009e88",
    accent2:  "#2f5fd0",
    text:     "#0d111c",
    muted:    "#5a637c",
    sub:      "#4a5470",
    navBg:    "rgba(244,246,251,0.92)",
    tagBg:    "rgba(47,95,208,0.07)",
    tagBorder:"rgba(47,95,208,0.22)",
  },
};

/* ─── DATA ──────────────────────────────────────────────────── */
const experience = [
  {
    date: "Jul 2025 – Present",
    company: "Hexure",
    role: "Project Manager, New Products & Platform Solutions",
    bullets: [
      "Governing end-to-end delivery of 3 concurrent enterprise platform migrations from on-premises to Azure Cloud across a 6–8 month lifecycle per engagement.",
      "Reduced contract-to-launch lead time by 10% through a standardized onboarding playbook with phased milestones, dependency maps, and RACI matrices across 5 active programs.",
      "Achieved 20% reduction in production defects via structured defect triage and weekly KPI dashboards across 3 leadership levels; managing budgets of $1.5M–$3M and mentoring 2 associate PMs.",
    ],
    tags: ["Azure Cloud", "Platform Migration", "KPI Dashboards", "RACI"],
  },
  {
    date: "Nov 2023 – Jun 2025",
    company: "Uplight",
    role: "Project Manager, Energy Platform Products",
    bullets: [
      "Managed 8 concurrent integration workstreams for 2 enterprise SaaS platforms serving 4M+ end users with zero unplanned outages during major release cycles.",
      "Developed a repeatable integration playbook for CIS, DERMS, and OpenADR dispatch, reducing average client onboarding time by 3 weeks across 5 programs.",
      "Championed third-party DER vendor integrations (smart thermostats, EVs, BESS) against IEEE 2030.5 standards; established vendor governance that cut defects by 30%.",
      "Reduced QA cycle times by 10% through restructured regression planning and automated smoke test gates across 3 consecutive release cycles.",
    ],
    tags: ["DERMS", "OpenADR", "IEEE 2030.5", "DER Integration", "SaaS"],
  },
  {
    date: "Sep 2021 – May 2022",
    company: "Revalize",
    role: "Project Manager, Enterprise SaaS Implementations",
    bullets: [
      "Managed 6 simultaneous enterprise SaaS implementation projects totaling $4M+ in contracted value, driving a 12% profit margin increase through scope discipline.",
      "Built a reusable implementation playbook with Epic/Story/Task hierarchies adopted org-wide, cutting average project setup time by 2 weeks.",
    ],
    tags: ["Enterprise SaaS", "Agile", "Scope Management"],
  },
  {
    date: "Jan 2019 – Sep 2021",
    company: "Aerojet Rocketdyne",
    role: "Systems Engineer / Project Coordinator, R&D Programs",
    bullets: [
      "Coordinated 4 concurrent R&D delivery programs with combined budgets exceeding $10M, producing monthly EAC variance reports for program directors and government clients.",
      "Championed 3 process improvement initiatives that reduced schedule variance by 8% across active workstreams.",
    ],
    tags: ["Systems Engineering", "EAC Tracking", "R&D Programs", "Gov Contracts"],
  },
];

const skills = [
  { icon: "⚡", title: "Energy & Utility Platforms",   items: "DERMS · OpenADR · IEEE 2030.5\nDER Integration · CIS Systems\nDemand Response · BESS · EV" },
  { icon: "🔄", title: "Integration Management",        items: "API Scoping · Sandbox Provisioning\nRegression Testing · Smoke Tests\nVendor Governance · SLA Mgmt" },
  { icon: "☁️", title: "Cloud & SaaS Delivery",         items: "Azure Cloud Migration\nEnterprise SaaS Implementation\nPlatform Onboarding · CI/CD" },
  { icon: "📋", title: "Program Management",             items: "PMP · RACI · Project Charters\nRisk Registers · EAC Tracking\nMilestone Sign-offs · Agile" },
  { icon: "📊", title: "Operations & Analytics",         items: "KPI Dashboards · Defect Triage\nLean Six Sigma · Variance Reports\nBudget Management · Forecasting" },
  { icon: "🤝", title: "Stakeholder Leadership",         items: "Executive Communication\nCross-functional Coordination\nClient Onboarding · Mentorship" },
];

const stats = [
  { value: "4M+",  label: "End Users Served" },
  { value: "8",    label: "Concurrent Workstreams" },
  { value: "$3M",  label: "Max Program Budget" },
  { value: "30%",  label: "Defect Reduction" },
];

/* ─── HOOKS ─────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── COMPONENTS ────────────────────────────────────────────── */
function RevealBox({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(22px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Tag({ label, t }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.62rem",
      color: t.accent2,
      background: t.tagBg,
      border: `1px solid ${t.tagBorder}`,
      padding: "0.2rem 0.6rem",
      borderRadius: "2px",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const [mode, setMode] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = themes[mode];

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setMenuOpen(false);
    if (menuOpen) window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const s = {
    root: { fontFamily: "'DM Sans', sans-serif", background: t.bg, color: t.text, minHeight: "100vh", overflowX: "hidden", transition: "background 0.3s, color 0.3s" },

    /* NAV */
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", background: t.navBg, backdropFilter: "blur(16px)", borderBottom: `1px solid ${t.line}`, gap: "1rem" },
    navLogo: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: t.accent, letterSpacing: "0.04em", flexShrink: 0 },
    navLinks: { display: "flex", gap: "2rem", alignItems: "center" },
    navLink: { fontFamily: "'DM Mono', monospace", fontSize: "0.76rem", color: t.muted, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", background: "none", border: "none", padding: 0 },

    /* THEME TOGGLE */
    toggle: { display: "flex", alignItems: "center", gap: "0.4rem", background: t.bg3, border: `1px solid ${t.line}`, borderRadius: "20px", padding: "0.3rem 0.7rem", cursor: "pointer", flexShrink: 0 },
    toggleLabel: { fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: t.muted, letterSpacing: "0.08em" },

    /* HAMBURGER */
    hamburger: { display: "none", flexDirection: "column", gap: "4px", cursor: "pointer", background: "none", border: "none", padding: "4px" },
    hLine: { width: "22px", height: "2px", background: t.muted, borderRadius: "2px", transition: "background 0.2s" },

    /* MOBILE MENU */
    mobileMenu: { position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99, background: t.navBg, backdropFilter: "blur(16px)", borderBottom: `1px solid ${t.line}`, padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" },

    /* HERO */
    hero: { display: "grid", gridTemplateColumns: "1fr", minHeight: "100vh", paddingTop: "4.5rem", position: "relative", overflow: "hidden" },
    heroLeft: { display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem 1.5rem 2rem" },
    heroTag: { fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: t.accent, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.6rem" },
    tagLine: { width: "24px", height: "1px", background: t.accent },
    heroName: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 8vw, 4.8rem)", lineHeight: 1.0, letterSpacing: "-0.02em", color: t.text, marginBottom: "0.6rem" },
    heroAccent: { color: t.accent },
    heroTitle: { fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: t.muted, letterSpacing: "0.06em", marginBottom: "1.4rem" },
    heroDesc: { fontSize: "0.95rem", fontWeight: 300, color: t.sub, maxWidth: "440px", marginBottom: "2rem", lineHeight: 1.8 },
    heroCta: { display: "flex", gap: "0.8rem", flexWrap: "wrap" },
    btnPrimary: { display: "inline-flex", alignItems: "center", gap: "0.4rem", background: t.accent, color: "#050709", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", padding: "0.8rem 1.5rem", border: "none", cursor: "pointer", transition: "background 0.2s" },
    btnSecondary: { display: "inline-flex", alignItems: "center", gap: "0.4rem", border: `1px solid ${t.line}`, color: t.muted, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", padding: "0.8rem 1.5rem", background: "none", cursor: "pointer", transition: "border-color 0.2s, color 0.2s" },
    btnResume: { display: "inline-flex", alignItems: "center", gap: "0.4rem", border: `1px solid ${t.accent}44`, color: t.accent, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", padding: "0.8rem 1.5rem", background: "none", cursor: "pointer" },

    /* STATS */
    statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", padding: "1.5rem 1.5rem 2.5rem" },
    stat: { background: t.card, border: `1px solid ${t.line}`, padding: "1.2rem 1.4rem", position: "relative", overflow: "hidden" },
    statBar: { position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})` },
    statValue: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.9rem", color: t.accent, lineHeight: 1, marginBottom: "0.3rem" },
    statLabel: { fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: t.muted, letterSpacing: "0.1em", textTransform: "uppercase" },

    /* SECTION */
    section: { padding: "4rem 1.5rem" },
    sectionAlt: { padding: "4rem 1.5rem", background: t.bg2 },
    sectionLabel: { fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: t.accent, letterSpacing: "0.18em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.6rem" },
    labelLine: { width: "40px", height: "1px", background: t.accent, opacity: 0.5 },
    sectionTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "2.5rem" },

    /* EXP */
    expItem: { padding: "2rem 0", borderBottom: `1px solid ${t.line}` },
    expDate: { fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: t.accent, letterSpacing: "0.08em", marginBottom: "0.3rem" },
    expCompany: { fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: t.muted, letterSpacing: "0.05em", marginBottom: "0.6rem" },
    expRole: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: t.text, marginBottom: "0.9rem", lineHeight: 1.3 },
    expBullets: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" },
    expBullet: { fontSize: "0.84rem", fontWeight: 300, color: t.sub, paddingLeft: "1.1rem", position: "relative", lineHeight: 1.7 },
    arrow: { position: "absolute", left: 0, color: t.accent, fontSize: "0.72rem" },
    expTags: { display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.9rem" },

    /* SKILLS */
    skillsGrid: { display: "grid", gridTemplateColumns: "1fr", gap: "1rem" },
    skillCard: { background: t.card, border: `1px solid ${t.line}`, padding: "1.5rem 1.6rem", transition: "border-color 0.3s" },
    skillIcon: { fontSize: "1.3rem", marginBottom: "0.8rem" },
    skillTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.6rem", color: t.text },
    skillItems: { fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: t.muted, lineHeight: 1.9, letterSpacing: "0.04em", whiteSpace: "pre-line" },

    /* EDU */
    eduGrid: { display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1.2rem" },
    eduCard: { background: t.card, border: `1px solid ${t.line}`, padding: "1.6rem 1.8rem" },
    eduDegree: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: t.text, marginBottom: "0.3rem" },
    eduSchool: { fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: t.accent, letterSpacing: "0.05em", marginBottom: "0.25rem" },
    eduYear: { fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: t.muted, letterSpacing: "0.07em" },
    certRow: { display: "flex", gap: "0.8rem", flexWrap: "wrap" },
    certBadge: { display: "flex", alignItems: "center", gap: "0.5rem", background: t.card, border: `1px solid ${t.line}`, padding: "0.7rem 1rem", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: t.text, letterSpacing: "0.05em" },
    certDot: { width: "7px", height: "7px", borderRadius: "50%", background: t.accent, flexShrink: 0, boxShadow: `0 0 7px ${t.accent}` },

    /* CONTACT */
    contactWrap: { maxWidth: "520px", margin: "0 auto", textAlign: "center" },
    contactDesc: { fontSize: "0.95rem", fontWeight: 300, color: t.sub, marginBottom: "2rem", lineHeight: 1.8 },
    contactLinks: { display: "flex", flexDirection: "column", gap: "0.7rem", alignItems: "center" },
    contactLink: { display: "flex", alignItems: "center", gap: "0.7rem", fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: t.muted, textDecoration: "none", letterSpacing: "0.05em", padding: "0.3rem 0" },
    contactIcon: { color: t.accent, opacity: 0.7 },

    /* FOOTER */
    footer: { borderTop: `1px solid ${t.line}`, padding: "1.2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" },
    footerName: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: t.muted },
    footerNote: { fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: t.muted, opacity: 0.5 },

    divider: { height: "1px", background: `linear-gradient(90deg, transparent, ${t.line}, transparent)` },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @media (min-width: 640px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .edu-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
          .exp-item { grid-template-columns: 160px 1fr !important; display: grid !important; gap: 1.5rem !important; }
        }
        @media (min-width: 900px) {
          .skills-grid { grid-template-columns: 1fr 1fr 1fr !important; }
          .hero-section { padding: 2rem 3rem 4rem !important; }
          .stats-section { padding: 2rem 3rem !important; }
          .section-pad { padding: 5rem 3.5rem !important; }
        }
        a { color: inherit; }
        button { font-family: inherit; }
        .nav-desktop { display: flex !important; }
        .nav-hamburger { display: none !important; }
        @media (max-width: 600px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <div style={s.root}>

        {/* GOOGLE FONTS LINK */}
        {/* NAV */}
        <nav style={s.nav}>
          <span style={s.navLogo}>NT</span>

          {/* Desktop links */}
          <div className="nav-desktop" style={s.navLinks}>
            {["experience","skills","education","contact"].map(id => (
              <button key={id} style={s.navLink} onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            {/* Theme toggle */}
            <button style={s.toggle} onClick={() => setMode(m => m === "dark" ? "light" : "dark")}>
              <span style={{ fontSize: "0.85rem" }}>{mode === "dark" ? "☀️" : "🌙"}</span>
              <span style={s.toggleLabel}>{mode === "dark" ? "Light" : "Dark"}</span>
            </button>

            {/* Hamburger */}
            <button className="nav-hamburger" style={{ ...s.hamburger, flexDirection: "column" }} onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}>
              <span style={s.hLine} />
              <span style={s.hLine} />
              <span style={s.hLine} />
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div style={s.mobileMenu} onClick={e => e.stopPropagation()}>
            {["experience","skills","education","contact"].map(id => (
              <button key={id} style={{ ...s.navLink, fontSize: "0.85rem", padding: "0.4rem 0" }} onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* HERO */}
        <section style={{ paddingTop: "4.5rem", background: t.bg, position: "relative", overflow: "hidden" }}>
          {/* Orbs */}
          <div style={{ position: "absolute", top: "5%", right: "-5%", width: "340px", height: "340px", borderRadius: "50%", background: `radial-gradient(circle, ${t.accent}18 0%, transparent 70%)`, filter: "blur(70px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "5%", right: "20%", width: "240px", height: "240px", borderRadius: "50%", background: `radial-gradient(circle, ${t.accent2}14 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />

          <div className="hero-section" style={{ padding: "2rem 1.5rem 1rem" }}>
            <div style={s.heroTag}>
              <span style={s.tagLine} />
              PMP · Integration Program Manager
            </div>
            <h1 style={s.heroName}>
              Nam H.<br /><span style={s.heroAccent}>Tran</span>
            </h1>
            <p style={s.heroTitle}>MBA · MSAE · Energy &amp; Utility Platforms</p>
            <p style={s.heroDesc}>
              Delivering enterprise platform programs at scale — from cloud migrations and SaaS integrations to DER dispatch systems. Based in Orlando, FL.
            </p>
            <div style={s.heroCta}>
              <button style={s.btnPrimary} onClick={() => scrollTo("experience")}>View Experience</button>
              <button style={s.btnSecondary} onClick={() => scrollTo("contact")}>Get in Touch</button>
              <a href="Nam_Tran_Resume_EnergyHub.pdf" download style={s.btnResume}>↓ Resume</a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="stats-section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", padding: "1.5rem 1.5rem 2.5rem" }}>
            {stats.map((st, i) => (
              <RevealBox key={i} delay={i * 80}>
                <div style={s.stat}>
                  <span style={s.statBar} />
                  <div style={s.statValue}>{st.value}</div>
                  <div style={s.statLabel}>{st.label}</div>
                </div>
              </RevealBox>
            ))}
          </div>
        </section>

        <div style={s.divider} />

        {/* EXPERIENCE */}
        <section id="experience" className="section-pad" style={{ ...s.sectionAlt, padding: "4rem 1.5rem" }}>
          <div style={s.sectionLabel}>Work History <span style={s.labelLine} /></div>
          <h2 style={s.sectionTitle}>Experience</h2>
          <div style={{ borderTop: `1px solid ${t.line}` }}>
            {experience.map((exp, i) => (
              <RevealBox key={i} delay={i * 60}>
                <div className="exp-item" style={{ ...s.expItem, display: "block" }}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <div style={s.expDate}>{exp.date}</div>
                    <div style={s.expCompany}>{exp.company}</div>
                  </div>
                  <div>
                    <div style={s.expRole}>{exp.role}</div>
                    <ul style={s.expBullets}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={s.expBullet}>
                          <span style={s.arrow}>→</span>{b}
                        </li>
                      ))}
                    </ul>
                    <div style={s.expTags}>
                      {exp.tags.map(tag => <Tag key={tag} label={tag} t={t} />)}
                    </div>
                  </div>
                </div>
              </RevealBox>
            ))}
          </div>
        </section>

        <div style={s.divider} />

        {/* SKILLS */}
        <section id="skills" className="section-pad" style={{ ...s.section, padding: "4rem 1.5rem" }}>
          <div style={s.sectionLabel}>Capabilities <span style={s.labelLine} /></div>
          <h2 style={s.sectionTitle}>Core Skills</h2>
          <div className="skills-grid" style={{ ...s.skillsGrid, gridTemplateColumns: "1fr" }}>
            {skills.map((sk, i) => (
              <RevealBox key={i} delay={i * 50}>
                <div style={s.skillCard}>
                  <div style={s.skillIcon}>{sk.icon}</div>
                  <div style={s.skillTitle}>{sk.title}</div>
                  <div style={s.skillItems}>{sk.items}</div>
                </div>
              </RevealBox>
            ))}
          </div>
        </section>

        <div style={s.divider} />

        {/* EDUCATION */}
        <section id="education" className="section-pad" style={{ ...s.sectionAlt, padding: "4rem 1.5rem" }}>
          <div style={s.sectionLabel}>Academic &amp; Credentials <span style={s.labelLine} /></div>
          <h2 style={s.sectionTitle}>Education</h2>
          <RevealBox>
            <div className="edu-grid" style={{ ...s.eduGrid, gridTemplateColumns: "1fr" }}>
              {[
                { degree: "Master of Business Administration", school: "University of Central Florida", year: "2023" },
                { degree: "MS / BS, Aerospace Engineering", school: "University of Central Florida", year: "2021 / 2019" },
              ].map((e, i) => (
                <div key={i} style={{ background: t.card, border: `1px solid ${t.line}`, padding: "1.6rem 1.8rem" }}>
                  <div style={s.eduDegree}>{e.degree}</div>
                  <div style={s.eduSchool}>{e.school}</div>
                  <div style={s.eduYear}>{e.year}</div>
                </div>
              ))}
            </div>
          </RevealBox>
          <RevealBox delay={120}>
            <div style={s.certRow}>
              {["PMP — Project Management Professional", "Lean Six Sigma Green Belt"].map(c => (
                <div key={c} style={s.certBadge}>
                  <span style={s.certDot} />
                  {c}
                </div>
              ))}
            </div>
          </RevealBox>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section-pad" style={{ ...s.section, padding: "4rem 1.5rem" }}>
          <div style={s.contactWrap}>
            <div style={{ ...s.sectionLabel, justifyContent: "center" }}>Let's Connect <span style={s.labelLine} /></div>
            <h2 style={s.sectionTitle}>Contact</h2>
            <p style={s.contactDesc}>
              Open to integration program leadership roles, energy platform projects, and enterprise SaaS delivery opportunities.
            </p>
            <div style={s.contactLinks}>
              {[
                { icon: "✉", text: "nhtranaero@gmail.com", href: "mailto:nhtranaero@gmail.com" },
                { icon: "☎", text: "(941) 840-3956", href: "tel:9418403956" },
                { icon: "in", text: "linkedin.com/in/nam-tran-pmp", href: "https://linkedin.com/in/nam-tran-pmp" },
              ].map(link => (
                <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} style={s.contactLink}>
                  <span style={s.contactIcon}>{link.icon}</span>
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={s.footer}>
          <span style={s.footerName}>Nam H. Tran · Orlando, FL</span>
          <span style={s.footerNote}>PMP · MBA · MSAE</span>
        </footer>

      </div>
    </>
  );
}
