import React, { useEffect, useRef, useState } from "react";

const LOGO_SRC = "/logo.jpg";

const NAV_LINKS = ["About", "What You'll Do", "Register"];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.root}>
      {/* Cursor glow */}
      <div
        style={{
          ...styles.cursorGlow,
          left: mousePos.x - 200,
          top: mousePos.y - 200,
        }}
      />

      {/* NAV */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navInner}>
          <div style={styles.navLogo}>
            <img src={LOGO_SRC} alt="MLSC Logo" style={styles.logoImg} />
            <span style={styles.navBrand}>MLSC <span style={styles.navBrandAccent}>VIT Pune</span></span>
          </div>
          <div style={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                style={styles.navLink}
                onClick={() => scrollTo(l.toLowerCase().replace(/[^a-z]/g, "-"))}
              >
                {l}
              </button>
            ))}
            <a href="#register" style={styles.navCta}>Register Now →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header ref={heroRef} id="about" style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.gridOverlay} />

        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            April 4, 2025 · VIT Pune
          </div>

          <h1 style={styles.heroTitle}>
            <span style={styles.heroTitleLine1}>CLOUD</span>
            <br />
            <span style={styles.heroTitleLine2}>COMPUTING</span>
            <br />
            <span style={styles.heroTitleLine3}>WORKSHOP</span>
          </h1>

          <p style={styles.heroSub}>
            Stop learning theory. Start building on <span style={styles.accent}>real AWS infrastructure</span>.
            <br />
            3 hours · Hands-on · Deploy live.
          </p>

          <div style={styles.heroActions}>
            <a href="#register" style={styles.heroCta}>
              Claim Your Seat
            </a>
            <a href="#what-you-ll-do" style={styles.heroSecondary} onClick={(e) => { e.preventDefault(); scrollTo("what-you-ll-do"); }}>
              See What You'll Build ↓
            </a>
          </div>

          <div style={styles.heroMeta}>
            <MetaItem icon="📅" label="Date" value="April 4, 2025" />
            <MetaItem icon="⏰" label="Duration" value="3 Hours" />
            <MetaItem icon="📍" label="Venue" value="VIT Pune" />
            <MetaItem icon="🎟" label="Seats" value="Limited" accent />
          </div>
        </div>

        <div style={styles.heroVisual}>
          <TerminalWindow />
        </div>
      </header>

      {/* WHAT YOU'LL DO */}
      <section id="what-you-ll-do" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>// CURRICULUM</span>
          <h2 style={styles.sectionTitle}>What You'll <span style={styles.accent}>Actually Build</span></h2>
          <p style={styles.sectionSub}>No slides-only theory. Every concept you learn, you deploy.</p>
        </div>

        <div style={styles.modulesGrid}>
          {MODULES.map((m, i) => (
            <ModuleCard key={i} {...m} index={i} />
          ))}
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" style={styles.ctaSection}>
        <div style={styles.ctaGlow} />
        <div style={styles.ctaInner}>
          <div style={styles.ctaLogo}>
            <img src={LOGO_SRC} alt="MLSC" style={styles.ctaLogoImg} />
          </div>
          <h2 style={styles.ctaTitle}>Ready to Deploy?</h2>
          <p style={styles.ctaSub}>
            Join MLSC VIT Pune for the most hands-on cloud workshop you'll attend this semester.
            <br />No prior experience needed. Teams welcome.
          </p>
          <div style={styles.ctaStats}>
            <Stat value="3" label="Hours" />
            <Stat value="5" label="AWS Services" />
            <Stat value="0" label="Prereqs" />
            <Stat value="100%" label="Hands-On" />
          </div>
          <a
            href="#"
            style={styles.bigCta}
            onMouseEnter={(e) => (e.target.style.background = "#e5533d")}
            onMouseLeave={(e) => (e.target.style.background = "#FF6B50")}
          >
            Register Now — It's Free
          </a>
          <p style={styles.ctaNote}>⚡ Limited seats · Hands-on AWS access provided</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <img src={LOGO_SRC} alt="MLSC" style={styles.footerLogo} />
        <p style={styles.footerText}>Microsoft Learn Student Chapter · VIT Pune</p>
        <p style={styles.footerCopy}>© 2025 MLSC VIT Pune. All rights reserved.</p>
      </footer>
    </div>
  );
}

function MetaItem({ icon, label, value, accent }) {
  return (
    <div style={styles.metaItem}>
      <span style={styles.metaIcon}>{icon}</span>
      <div>
        <div style={styles.metaLabel}>{label}</div>
        <div style={{ ...styles.metaValue, ...(accent ? { color: "#FF6B50" } : {}) }}>{value}</div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div style={styles.stat}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function ModuleCard({ icon, title, desc, tag, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.moduleCard,
        ...(hov ? styles.moduleCardHov : {}),
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={styles.moduleIcon}>{icon}</div>
      <div style={styles.moduleTag}>{tag}</div>
      <h3 style={styles.moduleTitle}>{title}</h3>
      <p style={styles.moduleDesc}>{desc}</p>
      <div style={{ ...styles.moduleAccentBar, width: hov ? "60px" : "30px" }} />
    </div>
  );
}

function TerminalWindow() {
  const lines = [
    { text: "$ aws ec2 run-instances --image-id ami-0123...", delay: 0 },
    { text: "  InstanceId: i-0a1b2c3d4e5f...", delay: 0.4, dim: true },
    { text: "$ ssh -i keypair.pem ec2-user@54.x.x.x", delay: 0.8 },
    { text: "  Welcome to Amazon Linux!", delay: 1.2, dim: true },
    { text: "$ sudo yum install nginx -y", delay: 1.6 },
    { text: "$ systemctl start nginx", delay: 2.0 },
    { text: "✓ Your site is LIVE on AWS 🚀", delay: 2.4, accent: true },
  ];

  return (
    <div style={styles.terminal}>
      <div style={styles.terminalBar}>
        <div style={{ ...styles.termDot, background: "#FF5F57" }} />
        <div style={{ ...styles.termDot, background: "#FFBD2E" }} />
        <div style={{ ...styles.termDot, background: "#28C840" }} />
        <span style={styles.termTitle}>workshop-session.sh</span>
      </div>
      <div style={styles.termBody}>
        {lines.map((l, i) => (
          <TermLine key={i} {...l} />
        ))}
      </div>
    </div>
  );
}

function TermLine({ text, delay, dim, accent }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay * 1000 + 500);
    return () => clearTimeout(t);
  }, [delay]);

  if (!vis) return null;
  return (
    <div
      style={{
        ...styles.termLine,
        opacity: dim ? 0.5 : 1,
        color: accent ? "#FF6B50" : dim ? "#888" : "#e2e8f0",
        fontWeight: accent ? 700 : 400,
        animation: "fadeIn 0.3s ease",
      }}
    >
      {text}
    </div>
  );
}

const MODULES = [
  {
    icon: "⚡",
    tag: "Module 01",
    title: "Launch Your EC2 Server",
    desc: "Spin up a real cloud instance on AWS. Configure instance type, storage, and networking — your first server in the cloud.",
  },
  {
    icon: "🔐",
    tag: "Module 02",
    title: "SSH Access & Security",
    desc: "Connect to your instance securely using SSH key pairs. Set up security groups and understand real cloud security practices.",
  },
  {
    icon: "🌐",
    tag: "Module 03",
    title: "Deploy a Live Website",
    desc: "Install a web server, push your code, and watch your site go live with a public IP. Real deployment, not a localhost demo.",
  },
  {
    icon: "🗄️",
    tag: "Module 04",
    title: "AWS S3 Storage",
    desc: "Store and serve files using S3 buckets. Learn object storage, access control, and static site hosting on AWS.",
  },
  {
    icon: "🛡️",
    tag: "Module 05",
    title: "Cloud Security Practices",
    desc: "IAM roles, least-privilege access, and hardening your deployment. The security knowledge every cloud practitioner needs.",
  },
  {
    icon: "👥",
    tag: "Bonus",
    title: "Team Collaboration",
    desc: "Work in guided teams with mentors from MLSC. Pair-program, debug together, and ship something real as a unit.",
  },
];

const styles = {
  root: {
    fontFamily: "'Space Grotesk', sans-serif",
    background: "#050505",
    color: "#ebebeb",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
  cursorGlow: {
    position: "fixed",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,107,80,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
    transition: "left 0.1s, top 0.1s",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "20px 40px",
    transition: "all 0.3s ease",
  },
  navScrolled: {
    background: "rgba(5,5,5,0.9)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "14px 40px",
  },
  navInner: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoImg: {
    width: 38,
    height: 38,
    borderRadius: 8,
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  navBrand: {
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: "-0.02em",
    color: "#fff",
  },
  navBrandAccent: {
    color: "#FF6B50",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  },
  navLink: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'Space Grotesk', sans-serif",
    transition: "color 0.2s",
    padding: 0,
  },
  navCta: {
    background: "#FF6B50",
    color: "#000",
    padding: "10px 22px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 700,
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "background 0.2s",
  },
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "120px 80px 80px",
    maxWidth: 1280,
    margin: "0 auto",
    position: "relative",
    gap: 60,
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 20% 50%, rgba(255,107,80,0.07) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  gridOverlay: {
    position: "fixed",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },
  heroContent: {
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,107,80,0.1)",
    border: "1px solid rgba(255,107,80,0.3)",
    borderRadius: 100,
    padding: "6px 16px",
    fontSize: 12,
    fontWeight: 600,
    color: "#FF6B50",
    letterSpacing: "0.05em",
    marginBottom: 32,
    textTransform: "uppercase",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#FF6B50",
    animation: "pulse 2s infinite",
  },
  heroTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(64px, 8vw, 120px)",
    lineHeight: 0.92,
    letterSpacing: "0.02em",
    margin: "0 0 28px",
    color: "#fff",
  },
  heroTitleLine1: { color: "#fff" },
  heroTitleLine2: { color: "#FF6B50" },
  heroTitleLine3: { color: "#fff" },
  heroSub: {
    fontSize: 17,
    lineHeight: 1.7,
    color: "#888",
    marginBottom: 40,
    maxWidth: 480,
  },
  accent: { color: "#FF6B50", fontWeight: 600 },
  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    marginBottom: 56,
    flexWrap: "wrap",
  },
  heroCta: {
    background: "#FF6B50",
    color: "#000",
    padding: "16px 36px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "transform 0.2s, background 0.2s",
  },
  heroSecondary: {
    color: "#888",
    fontSize: 14,
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  heroMeta: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  metaIcon: { fontSize: 20 },
  metaLabel: { fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 },
  metaValue: { fontSize: 14, fontWeight: 600, color: "#ddd", marginTop: 2 },
  heroVisual: {
    flex: "0 0 480px",
    position: "relative",
    zIndex: 1,
  },
  terminal: {
    background: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
  },
  terminalBar: {
    background: "#1a1a1a",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  termDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
  },
  termTitle: {
    marginLeft: 8,
    fontSize: 12,
    color: "#555",
    fontFamily: "monospace",
  },
  termBody: {
    padding: "24px 20px",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    lineHeight: 1.8,
    minHeight: 200,
  },
  termLine: {
    marginBottom: 4,
  },
  section: {
    padding: "120px 80px",
    maxWidth: 1280,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  sectionHeader: {
    marginBottom: 72,
  },
  sectionTag: {
    fontSize: 11,
    fontWeight: 700,
    color: "#FF6B50",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(48px, 5vw, 80px)",
    letterSpacing: "0.02em",
    color: "#fff",
    lineHeight: 1,
    marginBottom: 20,
  },
  sectionSub: {
    color: "#666",
    fontSize: 16,
    lineHeight: 1.6,
  },
  modulesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 24,
  },
  moduleCard: {
    background: "#0f0f0f",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: "36px 32px",
    cursor: "default",
    transition: "all 0.3s ease",
    position: "relative",
  },
  moduleCardHov: {
    background: "#161616",
    border: "1px solid rgba(255,107,80,0.2)",
    transform: "translateY(-4px)",
    boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
  },
  moduleIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  moduleTag: {
    fontSize: 10,
    color: "#FF6B50",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 12,
    letterSpacing: "-0.02em",
  },
  moduleDesc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 1.7,
    marginBottom: 24,
  },
  moduleAccentBar: {
    height: 2,
    background: "#FF6B50",
    borderRadius: 2,
    transition: "width 0.4s ease",
  },
  ctaSection: {
    position: "relative",
    padding: "120px 40px",
    textAlign: "center",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  ctaGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,107,80,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  ctaInner: {
    position: "relative",
    zIndex: 1,
    maxWidth: 700,
    margin: "0 auto",
  },
  ctaLogo: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 32,
  },
  ctaLogoImg: {
    width: 72,
    height: 72,
    borderRadius: 16,
    objectFit: "cover",
    border: "2px solid rgba(255,107,80,0.3)",
  },
  ctaTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(56px, 7vw, 96px)",
    color: "#fff",
    letterSpacing: "0.03em",
    marginBottom: 24,
    lineHeight: 1,
  },
  ctaSub: {
    color: "#666",
    fontSize: 16,
    lineHeight: 1.7,
    marginBottom: 48,
  },
  ctaStats: {
    display: "flex",
    justifyContent: "center",
    gap: 48,
    marginBottom: 48,
    flexWrap: "wrap",
  },
  stat: {
    textAlign: "center",
  },
  statValue: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 48,
    color: "#FF6B50",
    lineHeight: 1,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 11,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontWeight: 700,
  },
  bigCta: {
    display: "inline-block",
    background: "#FF6B50",
    color: "#000",
    padding: "18px 52px",
    borderRadius: 12,
    fontWeight: 800,
    fontSize: 16,
    textDecoration: "none",
    letterSpacing: "0.02em",
    marginBottom: 20,
    transition: "background 0.2s",
  },
  ctaNote: {
    fontSize: 13,
    color: "#444",
    marginTop: 8,
  },
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "40px",
    textAlign: "center",
  },
  footerLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    objectFit: "cover",
    marginBottom: 12,
    opacity: 0.6,
  },
  footerText: {
    color: "#444",
    fontSize: 13,
    marginBottom: 6,
  },
  footerCopy: {
    color: "#333",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
};