import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  Zap,
  Camera,
  Scissors,
  Send,
  Magnet,
  Database,
  Workflow,
  RefreshCw,
  CalendarCheck,
  BadgeDollarSign,
  BarChart3,
  TrendingUp,
  Compass,
  Sparkles,
  Building2,
  Cpu,
  Users,
  ChevronDown,
} from "lucide-react";

/* ================= HOOKS ================= */
const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, y = 30, style = {}, className = "" }) => {
  const [ref, inView] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px) scale(0.97)`,
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const CountUp = ({ end, suffix = "", prefix = "" }) => {
  const [ref, inView] = useReveal(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null,
      raf;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1500, 1);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
};

/* ================= SPOTLIGHT CARD WRAPPER ================= */
const CardSpotlight = ({ children, className = "", style = {}, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div className="spotlight-glow" />
      <div className="spotlight-content">{children}</div>
    </div>
  );
};

/* ================= TOP SCROLL PROGRESS ================= */
const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setWidth(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-bar">
      <div className="scroll-progress-fill" style={{ width: `${width}%` }} />
    </div>
  );
};

/* ================= DATA ================= */
const services = [
  {
    icon: Compass,
    title: "Brand Strategy",
    desc: "We research your audience, your niche, and your category before anything goes on camera, so every piece of content has a clear reason to exist.",
  },
  {
    icon: Sparkles,
    title: "Viral Content Engineering",
    desc: "Your hooks, scripts, and formats are built on patterns that are already proven to work in your space, not on guesswork.",
  },
  {
    icon: Camera,
    title: "Shoot, Edit & Publish",
    desc: "We direct your shoots, edit for retention, and publish on a steady schedule. You only show up for a few hours a month.",
  },
  {
    icon: Magnet,
    title: "Lead Generation",
    desc: "Every post carries a path to conversion, so the people watching you slowly turn into captured and qualified leads.",
  },
  {
    icon: Workflow,
    title: "Automation & CRM",
    desc: "Automated follow-up systems, clean pipelines, and appointment booking make sure that no lead ever slips away from you.",
  },
  {
    icon: TrendingUp,
    title: "Sales & Scale",
    desc: "Warm prospects who already trust you arrive on booked calls, and then we double down on whatever is bringing in the money.",
  },
];

const nicheGroups = [
  {
    id: "design",
    icon: Building2,
    label: "Design & Build",
    tag: "Where one project changes the whole quarter",
    items: [
      "Interior Designers",
      "Architects",
      "Construction Companies",
      "Home Builders",
      "Real Estate Developers",
      "Industrial Equipment Suppliers",
    ],
  },
  {
    id: "tech",
    icon: Cpu,
    label: "Tech & Enterprise",
    tag: "Where deals are won on trust, not ads",
    items: [
      "SaaS Companies",
      "IT Service Companies",
      "Software Development Companies",
      "Digital Agencies",
      "Manufacturing Companies",
      "Logistics Companies",
    ],
  },
  {
    id: "people",
    icon: Users,
    label: "People & Expertise",
    tag: "Where your reputation is the product",
    items: [
      "Event Planners",
      "Wedding Planners",
      "Recruitment Agencies",
      "HR Consultants",
      "Training & Education Institutes",
      "Education Consultants",
    ],
  },
];

const moreIndustriesA = [
  "Hospitals & Speciality Clinics",
  "Dental & Aesthetic Clinics",
  "Law Firms",
  "Chartered Accountants",
  "Financial Advisors",
  "Solar & EPC Companies",
  "Jewellery Brands",
];
const moreIndustriesB = [
  "Automobile Dealerships",
  "Study Abroad Consultants",
  "Export Businesses",
  "Fertility & Wellness Centres",
  "Luxury Retail Brands",
  "Property Consultants",
  "Fitness & Sports Academies",
];

const flow = [
  { icon: Compass, t: "Strategy", d: "We map your audience, study your competitors, and build a content plan made for your category.", phase: 1 },
  { icon: Camera, t: "Shoot", d: "Shoot days are planned with scripts and hooks ready, so you just show up and talk while we direct everything." },
  { icon: Scissors, t: "Edit", d: "Every video is edited for retention, with pacing, captions, and hooks tuned to how your audience actually watches." },
  { icon: Send, t: "Publish", d: "Your content goes out on a consistent calendar across platforms, timed for when your audience is most active." },
  { icon: Magnet, t: "Generate Leads", d: "Calls to action, lead magnets, and DM funnels are built into the content so viewers raise their hand on their own.", phase: 2 },
  { icon: Zap, t: "Capture Leads", d: "Every enquiry from comments, DMs, and forms is captured the moment it arrives, so nothing gets forgotten." },
  { icon: Database, t: "CRM", d: "All of your leads flow into one clean pipeline where you can see exactly who is hot, who is warm, and who is waiting." },
  { icon: Workflow, t: "Automation", d: "Automated sequences respond within minutes instead of days, because speed is what closes deals.", phase: 3 },
  { icon: RefreshCw, t: "Follow-Up", d: "Smart nurture sequences keep you on top of every lead's mind until they are ready to move." },
  { icon: CalendarCheck, t: "Appointment", d: "Qualified leads book straight into your calendar, which means you only talk to people who are ready to buy." },
  { icon: BadgeDollarSign, t: "Sales", d: "By the time a prospect reaches you, they already trust you from your content, so closing becomes the easy part." },
  { icon: BarChart3, t: "Analytics", d: "We track which content brought in which lead, and which of those leads actually became revenue.", phase: 4 },
  { icon: TrendingUp, t: "Scale", d: "We double down on the winners, cut what is not working, and grow the machine month after month." },
];

const phaseNames = {
  1: "Build the Brand",
  2: "Turn Attention Into Leads",
  3: "Convert on Autopilot",
  4: "Compound",
};

const faqs = [
  {
    q: "How much time do I actually need to commit each month?",
    a: "Only 3 to 4 hours per month. We prepare all hooks, scripts, and concepts beforehand. On shoot day, we direct everything so you just speak, and our team handles editing, publishing, CRM workflows, and lead nurturing.",
  },
  {
    q: "How quickly do we start seeing tangible results?",
    a: "Authority positioning begins with your first published videos. Most of our clients see qualified leads entering their booking pipeline within 30 to 45 days as content distribution compounds across platforms.",
  },
  {
    q: "What makes Unmute Media different from typical video production agencies?",
    a: "Traditional agencies hand you edited video files and wish you good luck. We build the full revenue funnel: content strategy, viral filming, automated DM capture, CRM integration, and booked sales meetings.",
  },
  {
    q: "Why do you limit client slots per category?",
    a: "To guarantee dominant market positioning for our partners. If we work with an interior designer or SaaS founder in a region, we won't take on their direct competitor. Slots are assigned on a first-come basis.",
  },
];

/* ================= SCROLL-DRIVEN WORKFLOW ================= */
const FlowTimeline = () => {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh * 0.35;
      const passed = Math.min(Math.max(vh * 0.65 - r.top, 0), total);
      setProgress(total > 0 ? passed / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeSteps = Math.floor(progress * flow.length + 0.4);

  return (
    <div ref={wrapRef} className="flow-wrap">
      <div className="flow-track" />
      <div className="flow-fill" style={{ height: `${Math.round(progress * 100)}%` }} />
      {flow.map((s, i) => {
        const active = i < activeSteps;
        const Icon = s.icon;
        return (
          <div key={s.t}>
            {s.phase && (
              <div className="phase-row" style={{ color: active ? "var(--accent)" : "var(--ink-muted)" }}>
                Phase {s.phase} · {phaseNames[s.phase]}
                <span className="phase-line" />
              </div>
            )}
            <div className="step-row">
              <div className={`step-node ${active ? "on" : ""}`}>
                <Icon size={17} strokeWidth={1.8} />
              </div>
              <div
                className="step-body"
                style={{
                  opacity: active ? 1 : 0.4,
                  transform: active ? "translateX(0)" : "translateX(14px)",
                }}
              >
                <div className="step-head">
                  <span className="mono step-num">{String(i + 1).padStart(2, "0")}</span>
                  <h4 style={{ color: active ? "var(--ink)" : "var(--ink-muted)" }}>{s.t}</h4>
                </div>
                <p>{s.d}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ================= FAQ ACCORDION ================= */
const FaqItem = ({ q, a, isOpen, onToggle }) => {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} onClick={onToggle}>
      <div className="faq-head">
        <h4>{q}</h4>
        <div className="faq-icon">
          <ChevronDown size={18} />
        </div>
      </div>
      <div className="faq-body">
        <p>{a}</p>
      </div>
    </div>
  );
};

/* ================= CUSTOM CURSOR ================= */
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(pointer:coarse)").matches) return;
    const dot = dotRef.current,
      ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100,
      raf;
    let hovering = false;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      const t =
        e.target.closest &&
        e.target.closest("a, button, .spotlight-card, .chip, .faq-item, .tab-btn");
      hovering = !!t;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${hovering ? 1.8 : 1
        })`;
      ring.style.borderColor = hovering ? "rgba(239,51,52,.85)" : "rgba(239,51,52,.35)";
      ring.style.background = hovering ? "rgba(239,51,52,.07)" : "transparent";
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    document.body.classList.add("has-cursor");
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

/* ================= MAIN APP ================= */
export default function UnmuteLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filteredGroups =
    activeTab === "all" ? nicheGroups : nicheGroups.filter((g) => g.id === activeTab);

  return (
    <div className="um-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&family=Instrument+Serif:ital@0;1&family=JetBrains Mono:ital,wght@0,400..700;1,400..700&display=swap');

        :root {
          --bg: #FFFFFF;
          --bg-warm: #FFFFFF;
          --bg-card: #FFFFFF;
          --bg-dark: #211B16;
          --bg-dark-card: #2A231E;
          --ink: #211B16;
          --ink-muted: #8A8378;
          --ink-light: #575047;
          --accent: #EF3334;
          --accent-hover: #D92B2C;
          --accent-soft: rgba(239, 51, 52, 0.08);
          --accent-glow: rgba(239, 51, 52, 0.22);
          --green: #147A5C;
          --green-soft: rgba(20, 122, 92, 0.1);
          --line: rgba(33, 27, 22, 0.1);
          --line-dash: rgba(33, 27, 22, 0.12);
          --line-dark: rgba(255, 255, 255, 0.12);
          --ease-framer: cubic-bezier(0.16, 1, 0.3, 1);
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }

        .um-root {
          min-height:100vh; background:var(--bg); color:var(--ink);
          font-family:'Schibsted Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing:antialiased; overflow-x:hidden; position:relative;
        }

        ::selection { background:var(--accent); color:#FFFFFF; }

        /* Font System */
        .serif { font-family:'Instrument Serif', serif; font-style:italic; font-weight:400; letter-spacing:0; }
        .mono { font-family:'JetBrains Mono', monospace; }
        .accent { color:var(--accent); }
        .amber { color:var(--accent); }
        .wrap { max-width:1200px; margin:0 auto; padding:0 24px; }

        /* Nav Menu Bar Specific Font - Plus Jakarta Sans */
        .nav, .nav-links a, .nav-in, .nav .btn, .floating-action, .floating-btn {
          font-family:'Plus Jakarta Sans', sans-serif !important;
        }

        /* Scroll Progress Bar */
        .scroll-progress-bar { position:fixed; top:0; left:0; right:0; height:3px; z-index:1000; pointer-events:none; }
        .scroll-progress-fill { height:100%; background:linear-gradient(90deg, #EF3334, #D92B2C); box-shadow:0 0 10px rgba(239,51,52,0.6); transition:width 0.1s linear; }

        /* Styling touches */
        .hl-under { position:relative; display:inline-block; }
        .hl-under::after {
          content:""; position:absolute; left:-4%; right:-4%; bottom:6%; height:18%;
          background:var(--accent-glow); border-radius:6px;
          transform:skew(-14deg) rotate(-1.2deg); z-index:-1;
        }
        .tilt-l { transform:rotate(-0.8deg); }
        .tilt-r { transform:rotate(0.7deg); }

        /* Custom Cursor */
        .cursor-dot, .cursor-ring { position:fixed; top:0; left:0; pointer-events:none; z-index:9999; border-radius:50%; }
        .cursor-dot { width:7px; height:7px; background:var(--accent); }
        .cursor-ring { width:38px; height:38px; border:1.5px solid rgba(239,51,52,.45); transition:border-color .3s, background .3s; }
        @media (pointer:fine) {
          body.has-cursor, body.has-cursor a, body.has-cursor button { cursor:none; }
        }
        @media (pointer:coarse) {
          .cursor-dot, .cursor-ring { display:none; }
        }

        /* Ambient Background */
        section { position:relative; z-index:1; }
        .bg-grid {
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(33,27,22,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(33,27,22,.03) 1px, transparent 1px);
          background-size:84px 84px;
          -webkit-mask-image:radial-gradient(ellipse 85% 60% at 50% 0%, #000 20%, transparent 100%);
          mask-image:radial-gradient(ellipse 85% 60% at 50% 0%, #000 20%, transparent 100%);
        }
        .bg-glow-orb {
          position:fixed; top:-180px; left:30%; width:640px; height:640px; border-radius:50%;
          background:radial-gradient(circle, rgba(239,51,52,.07) 0%, transparent 70%);
          filter:blur(140px); z-index:0; pointer-events:none;
          animation:orbFloat 20s ease-in-out infinite alternate;
        }
        @keyframes orbFloat { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(40px,-30px) scale(1.1)} }

        /* Card Spotlight Component */
        .spotlight-card {
          position:relative; border-radius:24px; border:1px solid var(--line);
          background: #FFFFFF; overflow:hidden;
          transition:transform 0.45s var(--ease-framer), border-color 0.45s var(--ease-framer), box-shadow 0.45s var(--ease-framer);
        }
        .spotlight-card:hover {
          border-color:rgba(239,51,52,0.4);
          transform:translateY(-5px) scale(1.008);
          box-shadow:0 20px 40px rgba(33,27,22,0.08);
        }
        .spotlight-glow {
          position:absolute; inset:0; pointer-events:none; opacity:0;
          background:radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239,51,52,0.1), transparent 40%);
          transition:opacity 0.4s var(--ease-framer); z-index:1;
        }
        .spotlight-card:hover .spotlight-glow { opacity:1; }
        .spotlight-content { position:relative; z-index:2; height:100%; }

        /* Navigation (Apple Floating Glass Pill Header) */
        .nav {
          position:fixed; top:20px; left:0; right:0; z-index:100;
          pointer-events:none; display:flex; justify-content:center;
        }
        .nav-in {
          pointer-events:auto;
          width:calc(100% - 48px); max-width:980px; margin:0 auto;
          display:flex; align-items:center; justify-content:space-between;
          padding:10px 14px 10px 22px; border-radius:999px;
          background:rgba(255,255,255,0.85);
          backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
          border:1px solid rgba(33,27,22,0.1);
          box-shadow:0 12px 32px rgba(33,27,22,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
          transition:all 0.4s var(--ease-framer);
        }
        .nav.scrolled .nav-in {
          background:rgba(255,255,255,0.95);
          border-color:rgba(239,51,52,0.3);
          box-shadow:0 16px 40px rgba(33,27,22,0.14), inset 0 1px 0 rgba(239,51,52,0.2);
        }
        .logo { text-decoration:none; display:flex; align-items:center; }
        .logo img { height:44px; width:auto; display:block; }
        .nav-links { display:flex; gap:32px; }
        .nav-links a { position:relative; color:var(--ink-muted); text-decoration:none; font-size:14px; font-weight:600; transition:color .3s; }
        .nav-links a::after {
          content:""; position:absolute; left:0; bottom:-6px; width:100%; height:1.5px;
          background:var(--accent); transform:scaleX(0); transform-origin:right;
          transition:transform .35s var(--ease-framer);
        }
        .nav-links a:hover { color:var(--ink); }
        .nav-links a:hover::after { transform:scaleX(1); transform-origin:left; }
        @media(max-width:860px){ .nav-links{ display:none; } }

        /* Buttons */
        .btn {
          display:inline-flex; align-items:center; justify-content:center; gap:10px; cursor:pointer; border:none;
          background:var(--accent); color:#FFFFFF;
          font-weight:700; font-size:14.5px; letter-spacing:-.01em;
          padding:12px 24px; border-radius:999px; text-decoration:none;
          box-shadow:0 6px 20px rgba(239,51,52,0.25);
          transition:transform .35s var(--ease-framer), box-shadow .35s var(--ease-framer), background .3s;
          position:relative; overflow:hidden;
        }
        .btn::after {
          content:""; position:absolute; inset:0;
          background:linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
          transform:translateX(-100%); transition:transform 0.6s ease;
        }
        .btn:hover::after { transform:translateX(100%); }
        .btn:hover {
          background:var(--accent-hover);
          transform:translateY(-2px);
          box-shadow:0 14px 36px rgba(239,51,52,.38);
        }
        .btn svg { transition:transform .3s var(--ease-framer); }
        .btn:hover svg { transform:translateX(4px); }
        .btn.lg { font-size:16px; padding:16px 36px; }
        .btn.xl { font-size:18px; padding:19px 42px; }
        .btn.ghost { background:var(--bg-warm); color:var(--ink); border:1px solid var(--line); box-shadow:none; }
        .btn.ghost:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-soft); box-shadow:none; }

        /* Hero Section */
        .hero { min-height:86vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:130px 24px 50px; position:relative; z-index:1; }
        .hero h1 {
          font-size:clamp(46px, 8.5vw, 124px); font-weight:800; line-height:1.01; letter-spacing:-.04em; max-width:1200px; color:var(--ink);
        }
        .hero h1 .row { display:block; opacity:0; animation:heroRise 1.2s var(--ease-framer) forwards; }
        @keyframes heroRise { from{opacity:0; transform:translateY(36px)} to{opacity:1; transform:translateY(0)} }
        .hero h1 .serif { font-size:1.04em; }
        .hero-sub { margin-top:24px; max-width:600px; font-size:clamp(16px,1.5vw,19px); line-height:1.7; color:var(--ink-muted); opacity:0; animation:heroRise 1.2s .35s var(--ease-framer) forwards; }
        .hero-cta { margin-top:34px; display:flex; gap:14px; flex-wrap:wrap; justify-content:center; opacity:0; animation:heroRise 1.2s .55s var(--ease-framer) forwards; }
        .hero-scroll { margin-top:54px; display:flex; flex-direction:column; align-items:center; gap:8px; opacity:0; animation:heroRise 1.1s .85s var(--ease-framer) forwards; }
        .hero-scroll span { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.3em; color:var(--ink-muted); }
        .hero-scroll i { width:1px; height:38px; background:linear-gradient(to bottom, var(--accent), transparent); }

        /* Stats */
        .stats { border-top:1px solid var(--line); border-bottom:1px solid var(--line); background:var(--bg-warm); }
        .stats-grid { max-width:1240px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .stat { padding:38px 20px; text-align:center; border-right:1px solid var(--line); transition:background .35s; }
        .stat:last-child { border-right:none; }
        .stat:hover { background:rgba(255,255,255,.5); }
        .stat .num { font-size:clamp(34px,4vw,52px); font-weight:800; letter-spacing:-.03em; color:var(--accent); line-height:1; }
        .stat .lbl { margin-top:10px; font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-muted); }
        @media(max-width:860px){
          .stats-grid{ grid-template-columns:repeat(2,1fr); }
          .stat:nth-child(2){ border-right:none; }
          .stat:nth-child(1), .stat:nth-child(2){ border-bottom:1px solid var(--line); }
        }

        /* Section Layout */
        .sec { padding:85px 0; }
        .kicker {
          font-family:'JetBrains Mono', monospace;
          font-size:11.5px; font-weight:600; letter-spacing:.2em; text-transform:uppercase;
          color:var(--accent); margin-bottom:18px; display:block;
        }
        h2.title { font-size:clamp(34px,4.8vw,64px); font-weight:800; line-height:1.04; letter-spacing:-.03em; color:var(--ink); }
        .lede { margin-top:20px; max-width:600px; font-size:17px; line-height:1.7; color:var(--ink-muted); }

        /* Difference vs Grid */
        .vs-grid { margin-top:44px; display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        @media(max-width:900px){ .vs-grid{ grid-template-columns:1fr; } }
        .vs-card-in { padding:36px; height:100%; }
        .vs-label { font-family:'JetBrains Mono',monospace; font-size:10.5px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; margin-bottom:22px; }
        .them-label { color:var(--ink-muted); }
        .us-label { color:var(--accent); }
        .vs-row { display:flex; align-items:flex-start; gap:14px; padding:14px 0; border-bottom:1px dashed var(--line-dash); font-size:15px; line-height:1.55; }
        .vs-row:last-child { border-bottom:none; }
        .them-row { color:var(--ink-muted); }
        .us-row { color:var(--ink); }
        .vs-row svg { flex-shrink:0; margin-top:3px; }

        /* Tanglish Section */
        .tanglish {
          border-top:1px solid var(--line); border-bottom:1px solid var(--line);
          padding:95px 24px; text-align:center;
          background:var(--bg-warm);
        }
        .tanglish .big { font-size:clamp(40px,7.8vw,110px); font-weight:800; line-height:1.06; letter-spacing:-.04em; }
        .tanglish .muted { color:var(--ink-muted); }
        .tanglish .mid { color:var(--ink-light); }
        .tanglish .lede { margin:30px auto 0; text-align:center; max-width:480px; font-size:17px; color:var(--ink-light); }

        /* Services Grid */
        .svc-head { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:24px; }
        .svc-side { max-width:380px; font-size:16.5px; line-height:1.7; color:var(--ink-muted); }
        .svc-grid { margin-top:44px; display:grid; grid-template-columns:repeat(3,1fr); gap:18px; align-items:stretch; }
        @media(min-width:1001px){
          .svc-grid > div:nth-child(2){ margin-top:20px; }
          .svc-grid > div:nth-child(5){ margin-top:20px; }
        }
        @media(max-width:1000px){ .svc-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:640px){ .svc-grid{ grid-template-columns:1fr; } }
        .svc-in { padding:30px; display:flex; flex-direction:column; height:100%; }
        .svc-icon {
          width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(239,51,52,.25); background:var(--accent-soft); color:var(--accent);
          margin-bottom:20px; transition:background .35s var(--ease-framer), color .35s, transform .35s var(--ease-framer);
        }
        .spotlight-card:hover .svc-icon { background:var(--accent); color:#FFFFFF; transform:scale(1.08) rotate(4deg); }
        .svc-top { display:flex; align-items:flex-start; justify-content:space-between; gap:10px; }
        .svc-in h3 { font-size:19.5px; font-weight:700; letter-spacing:-.01em; line-height:1.25; color:var(--ink); }
        .svc-arrow { color:var(--ink-muted); margin-top:3px; flex-shrink:0; transition:transform .35s var(--ease-framer), color .35s; }
        .spotlight-card:hover .svc-arrow { transform:translate(4px,-4px); color:var(--accent); }
        .svc-in p { margin-top:12px; font-size:14.5px; line-height:1.65; color:var(--ink-muted); flex:1; }
        .svc-bar { position:absolute; left:0; bottom:0; height:2px; width:0; background:var(--accent); transition:width 0.45s var(--ease-framer); }
        .spotlight-card:hover .svc-bar { width:100%; }

        /* Industries Section (Who We Serve - Pure Deep Black Surface #120E0B) */
        .ind { background:#000000; border-top:1px solid rgba(255,255,255,0.1); }
        .ind-head { max-width:800px; margin:0 auto; text-align:center; }
        .ind-head .kicker { display:inline-flex; justify-content:center; color:var(--accent); }
        .ind-head h2.title { color:#FFFFFF; }
        .ind-head .lede { margin-left:auto; margin-right:auto; color:#E6E1DC; }

        .tab-bar { display:flex; justify-content:center; gap:8px; margin-top:36px; flex-wrap:wrap; }
        .tab-btn {
          background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18); border-radius:999px;
          padding:9px 20px; font-family:'Plus Jakarta Sans', sans-serif; font-size:13.5px; font-weight:600;
          color:#FFFFFF; cursor:pointer; transition:all 0.3s var(--ease-framer);
        }
        .tab-btn:hover { color:#FFFFFF; border-color:var(--accent); background:rgba(239,51,52,0.15); }
        .tab-btn.active { background:var(--accent); color:#FFFFFF; border-color:var(--accent); font-weight:700; box-shadow:0 4px 18px rgba(239,51,52,0.4); }

        .ind-grid { margin-top:40px; display:grid; grid-template-columns:repeat(3,1fr); gap:18px; align-items:stretch; }
        @media(max-width:1000px){ .ind-grid{ grid-template-columns:1fr; max-width:560px; margin-left:auto; margin-right:auto; } }
        .ind-in { padding:32px; height:100%; }
        .ind-icon {
          width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(239,51,52,.35); background:var(--accent-soft); color:var(--accent);
          transition:background .35s var(--ease-framer), color .35s;
        }
        .spotlight-card:hover .ind-icon { background:var(--accent); color:#FFFFFF; }
        .ind-in h3 { margin-top:22px; font-size:22px; font-weight:800; letter-spacing:-.01em; color:#FFFFFF; }
        .ind-tag { margin-top:6px; font-size:15.5px; color:var(--accent); }
        .ind-list { margin-top:20px; }
        .ind-row { display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px dashed rgba(255,255,255,0.14); font-size:14.5px; color:#FFFFFF; transition:color .3s, padding-left .3s var(--ease-framer); }
        .ind-row:last-child { border-bottom:none; }
        .ind-row:hover { color:var(--accent); padding-left:5px; }
        .ind-num { font-family:'JetBrains Mono',monospace; font-size:10.5px; color:#A8A096; }

        /* Drifting Belt */
        .more-head { margin-top:54px; text-align:center; font-size:clamp(20px,2.4vw,28px); }
        .chip-belt {
          margin-top:26px; display:flex; flex-direction:column; gap:12px; overflow:hidden;
          -webkit-mask-image:linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image:linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .chip-track { display:flex; width:max-content; animation:beltL 40s linear infinite; }
        .chip-track.rev { animation:beltR 46s linear infinite; }
        .chip-set { display:flex; gap:12px; padding-right:12px; }
        .chip {
          white-space:nowrap; font-size:13.5px; font-weight:500; color:#FFFFFF;
          border:1px solid rgba(255,255,255,0.18); border-radius:999px; padding:9px 18px;
          background:rgba(255,255,255,.06); transition:border-color .35s, color .35s, background .35s;
        }
        .chip:hover { border-color:var(--accent); color:var(--accent); background:rgba(239,51,52,0.15); }
        @keyframes beltL { to { transform:translateX(-50%); } }
        @keyframes beltR { from { transform:translateX(-50%); } to { transform:translateX(0); } }
        .warn {
          max-width:620px; margin:48px auto 0; text-align:center; transform:rotate(-0.5deg);
          border:1px solid rgba(239,51,52,.35); background:rgba(239,51,52,.08);
          border-radius:18px; padding:22px 30px; font-size:14.5px; line-height:1.65; color:#FFFFFF;
        }
        .warn b { color:var(--accent); }

        /* Workflow Timeline */
        .flow-wrap { position:relative; margin-top:54px; }
        .flow-track { position:absolute; left:23px; top:8px; bottom:8px; width:1px; background:var(--line); }
        .flow-fill {
          position:absolute; left:23px; top:8px; width:1px; max-height:calc(100% - 16px);
          background:linear-gradient(to bottom, #EF3334, #D92B2C);
          box-shadow:0 0 12px rgba(239,51,52,.5); transition:height .25s ease-out;
        }
        .phase-row {
          display:flex; align-items:center; gap:16px; margin:44px 0 10px 74px;
          font-family:'JetBrains Mono',monospace; font-size:10.5px; font-weight:600;
          letter-spacing:.2em; text-transform:uppercase; transition:color .5s;
        }
        .phase-row:first-of-type { margin-top:0; }
        .phase-line { flex:1; height:1px; background:linear-gradient(90deg, rgba(239,51,52,.35), transparent); }
        .step-row { display:grid; grid-template-columns:47px 1fr; gap:28px; padding:18px 0; align-items:flex-start; }
        @media(max-width:640px){ .step-row{ gap:18px; } .phase-row{ margin-left:68px; } }
        .step-node {
          position:relative; z-index:1; width:45px; height:45px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          border:1px solid var(--line); background:var(--bg-warm); color:var(--ink-muted);
          transition:all .75s var(--ease-framer);
        }
        .step-node.on {
          border-color:var(--accent); background:var(--accent); color:#FFFFFF; transform:scale(1.06);
          box-shadow:0 0 0 7px rgba(239,51,52,.12), 0 8px 24px rgba(239,51,52,.28);
        }
        .step-body { border-bottom:1px dashed var(--line-dash); padding-bottom:20px; transition:opacity .75s var(--ease-framer), transform .75s var(--ease-framer); }
        .step-row:last-child .step-body { border-bottom:none; }
        .step-head { display:flex; align-items:baseline; gap:14px; }
        .step-num { font-size:10.5px; color:var(--ink-muted); }
        .step-body h4 { font-size:clamp(18px,2vw,22px); font-weight:700; letter-spacing:-.01em; transition:color .5s; }
        .step-body p { margin-top:8px; max-width:620px; font-size:14.5px; line-height:1.65; color:var(--ink-muted); }

        /* Marquee Ticker */
        .marquee { overflow:hidden; background:var(--accent); border-top:1px solid rgba(239,51,52,.3); border-bottom:1px solid rgba(239,51,52,.3); padding:16px 0; transform:rotate(-1deg) scale(1.02); position:relative; z-index:2; }
        .mq-track { display:flex; gap:44px; width:max-content; animation:marquee 30s linear infinite; }
        .mq-track > span { display:flex; align-items:center; gap:44px; }
        .mq-track span span { display:flex; align-items:center; gap:44px; font-family:'Schibsted Grotesk', sans-serif; font-size:17px; font-weight:800; letter-spacing:0; color:#FFFFFF; white-space:nowrap; }
        .mq-track i { font-style:normal; opacity:.4; }
        @keyframes marquee { to { transform:translateX(-50%); } }

        /* Proof Section */
        .proof-grid { margin-top:44px; display:grid; grid-template-columns:1.1fr 1fr; gap:36px; align-items:start; }
        @media(max-width:960px){ .proof-grid{ grid-template-columns:1fr; } }
        .proof-quote { font-size:clamp(22px,2.8vw,34px); font-weight:400; line-height:1.45; letter-spacing:-.01em; color:var(--ink); }
        .proof-quote b { color:var(--accent); font-weight:600; }
        .proof-quote .serif { font-size:1.05em; }
        .proof-cards { display:flex; flex-direction:column; gap:14px; }
        .p-card-in { padding:26px 30px; }
        .p-card-in .k { font-size:21px; font-weight:800; letter-spacing:-.01em; color:var(--accent); }
        .p-card-in .v { margin-top:6px; font-size:14.5px; line-height:1.6; color:var(--ink-muted); }

        /* FAQ Section */
        .faq-wrap { margin-top:40px; max-width:820px; margin-left:auto; margin-right:auto; display:flex; flex-direction:column; gap:12px; }
        .faq-item {
          border:1px solid var(--line); border-radius:18px; background:var(--bg-warm); padding:20px 26px;
          cursor:pointer; transition:all 0.35s var(--ease-framer);
        }
        .faq-item:hover { border-color:rgba(239,51,52,0.35); }
        .faq-item.open { border-color:var(--accent); background:var(--accent-soft); }
        .faq-head { display:flex; align-items:center; justify-content:space-between; gap:18px; }
        .faq-head h4 { font-size:17px; font-weight:700; color:var(--ink); }
        .faq-icon {
          width:30px; height:30px; border-radius:50%; border:1px solid var(--line);
          display:flex; align-items:center; justify-content:center; color:var(--ink-muted);
          transition:transform 0.35s var(--ease-framer), color 0.35s, border-color 0.35s; flex-shrink:0;
        }
        .faq-item.open .faq-icon { transform:rotate(180deg); color:var(--accent); border-color:var(--accent); }
        .faq-body { display:grid; grid-template-rows:0fr; transition:grid-template-rows 0.35s var(--ease-framer); }
        .faq-item.open .faq-body { grid-template-rows:1fr; }
        .faq-body p { overflow:hidden; font-size:14.5px; line-height:1.65; color:var(--ink-muted); padding-top:0px; transition:padding-top 0.35s; }
        .faq-item.open .faq-body p { padding-top:12px; }

        /* Final CTA (Dark Surface Ink #211B16) */
        .final { border-top:1px solid var(--line); padding:100px 24px; text-align:center; position:relative; overflow:hidden; background:var(--bg-dark); }
        .final-glow { position:absolute; left:0; right:0; bottom:0; height:380px; background:radial-gradient(ellipse 55% 75% at 50% 100%, rgba(239,51,52,.16), transparent); pointer-events:none; }
        .final h2 { font-size:clamp(44px,7.5vw,104px); font-weight:800; line-height:1; letter-spacing:-.04em; color:#FFFFFF; }
        .final .lede { margin:24px auto 0; text-align:center; color:#D6CFCE; }
        .final-note { margin-top:24px; font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; color:#8A8378; display:flex; align-items:center; justify-content:center; gap:8px; }

        /* Sticky Action Floating Pill */
        .floating-action {
          position:fixed; bottom:24px; right:24px; z-index:90;
          display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.94);
          border:1px solid rgba(239,51,52,0.35); backdrop-filter:blur(16px);
          padding:9px 16px 9px 12px; border-radius:999px; box-shadow:0 10px 32px rgba(33,27,22,0.12);
          opacity:0; transform:translateY(24px); transition:all 0.4s var(--ease-framer);
          pointer-events:none;
        }
        .floating-action.visible { opacity:1; transform:translateY(0); pointer-events:auto; }
        .floating-dot { width:8px; height:8px; border-radius:50%; background:var(--green); box-shadow:0 0 8px var(--green); }
        .floating-text { font-size:12.5px; font-weight:600; color:var(--ink); }
        .floating-btn { background:var(--accent); color:#FFFFFF; font-weight:700; font-size:12px; padding:6px 13px; border-radius:999px; text-decoration:none; transition:transform 0.3s; }
        .floating-btn:hover { transform:scale(1.05); }

        footer { border-top:1px solid var(--line); padding:32px 0; background:var(--bg-dark); }
        .foot { max-width:1240px; margin:0 auto; padding:0 28px; display:flex; flex-wrap:wrap; justify-content:space-between; gap:14px; font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.1em; color:#8A8378; }
      `}</style>

      <ScrollProgress />
      <Cursor />
      <div className="bg-grid" />
      <div className="bg-glow-orb" />

      {/* Floating Action Pill */}
      <div className={`floating-action ${scrolled ? "visible" : ""}`}>
        <div className="floating-dot" />
        <span className="floating-text">Limited Slots Available</span>
        <a
          href="https://tally.so/r/eqjbkJ"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn"
        >
          Book Call
        </a>
      </div>

      {/* ================= NAV ================= */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-in">
          <a href="#top" className="logo" aria-label="Unmute Media">
            <img src="/unmute-logo.png" alt="Unmute Media" />
          </a>
          <div className="nav-links">
            <a href="#difference">Why Us</a>
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#system">The System</a>
            <a href="#faq">FAQ</a>
          </div>
          <a
            href="https://tally.so/r/eqjbkJ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Book a Call <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <header className="hero" id="top">
        <h1>
          <span className="row" style={{ animationDelay: ".1s" }}>
            We turn businesses
          </span>
          <span className="row" style={{ animationDelay: ".24s" }}>
            into <span className="serif accent hl-under">personal brands</span>
          </span>
          <span className="row" style={{ animationDelay: ".38s" }}>
            that print revenue.
          </span>
        </h1>
        <p className="hero-sub">
          Strategy, viral content, shoots, edits, lead capture, automation, and sales systems.
          One elite team runs the whole engine, from your first reel to closed client deals.
        </p>
        <div className="hero-cta">
          <a
            href="https://tally.so/r/eqjbkJ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn lg"
          >
            Build My Brand <ArrowRight size={18} />
          </a>
          <a href="#system" className="btn lg ghost">
            See the System
          </a>
        </div>
        <div className="hero-scroll">
          <span>SCROLL</span>
          <i />
        </div>
      </header>

      {/* ================= STATS ================= */}
      <section className="stats">
        <div className="stats-grid">
          <Reveal delay={0}>
            <div className="stat">
              <div className="num">
                <CountUp end={25} suffix="+" />
              </div>
              <div className="lbl">Brands Scaled</div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="stat">
              <div className="num">₹10Cr+</div>
              <div className="lbl">Client Revenue Generated</div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="stat">
              <div className="num">
                <CountUp end={200} suffix="K+" />
              </div>
              <div className="lbl">Followers on Our Page</div>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="stat">
              <div className="num">
                <CountUp end={2} suffix=" Yrs" />
              </div>
              <div className="lbl">In the Trenches</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= DIFFERENCE ================= */}
      <section className="sec" id="difference">
        <div className="wrap">
          <Reveal>
            <div className="kicker">The Difference</div>
            <h2 className="title">
              Not another <span className="serif accent">shoot, edit, post</span> agency.
            </h2>
            <p className="lede">
              Most agencies stop where real commercial impact begins. They hand you raw reels and
              disappear, while we stay embedded with you until revenues hit your bank account.
            </p>
          </Reveal>
          <div className="vs-grid">
            <Reveal delay={0.08}>
              <CardSpotlight style={{ background: "#FFFFFF" }}>
                <div className="vs-card-in">
                  <div className="vs-label them-label">Typical Agencies</div>
                  {[
                    "They shoot, edit, post, and then disappear.",
                    "They chase vanity views instead of qualified revenue.",
                    "They copy trending templates without brand strategy.",
                    "They have no idea what happens after a lead comes in.",
                    "They report empty metrics at the end of every month.",
                  ].map((t) => (
                    <div className="vs-row them-row" key={t}>
                      <X size={15} color="#8A8378" /> {t}
                    </div>
                  ))}
                </div>
              </CardSpotlight>
            </Reveal>

            <Reveal delay={0.16}>
              <CardSpotlight
                style={{
                  background:
                    "linear-gradient(160deg, rgba(239,51,52,.08), rgba(239,51,52,.01) 60%)",
                  borderColor: "rgba(239,51,52,.3)",
                }}
              >
                <div className="vs-card-in">
                  <div className="vs-label us-label">Unmute Media</div>
                  {[
                    "We study your audience, niche, and market before touching a camera.",
                    "We engineer viral content patterns tested for high conversion.",
                    "We give every video a job: build authority, drive leads, or gain trust.",
                    "Our automated workflows capture and follow up with every single lead.",
                    "We measure the single metric that matters: net revenue closed.",
                  ].map((t) => (
                    <div className="vs-row us-row" key={t}>
                      <Check size={15} color="var(--green)" /> {t}
                    </div>
                  ))}
                </div>
              </CardSpotlight>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= TANGLISH INTERLUDE ================= */}
      <section className="tanglish">
        <div className="big">
          <Reveal y={40}>
            <span className="muted" style={{ display: "block" }}>
              Content Podurom.
            </span>
          </Reveal>
          <Reveal y={40} delay={0.1}>
            <span className="mid tilt-l" style={{ display: "block" }}>
              Brand Aagurom.
            </span>
          </Reveal>
          <Reveal y={40} delay={0.2}>
            <span className="serif accent" style={{ display: "block" }}>
              Sales Edukurom.
            </span>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <p className="lede">
            We produce the content, build your brand authority, and turn attention into sales,
            while you focus on serving clients and running your business.
          </p>
        </Reveal>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="sec" id="services">
        <div className="wrap">
          <div className="svc-head">
            <Reveal>
              <div className="kicker">What We Do</div>
              <h2 className="title">
                One team.<br />
                <span className="serif accent">Full growth engine.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="svc-side">
                Six specialized capabilities unified into one growth machine, ensuring zero context
                loss between separate vendors.
              </p>
            </Reveal>
          </div>

          <div className="svc-grid">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.07}>
                  <CardSpotlight className="svc-in-wrap">
                    <div className="svc-in">
                      <div className="svc-icon">
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="svc-top">
                        <h3>{s.title}</h3>
                        <ArrowUpRight size={17} className="svc-arrow" />
                      </div>
                      <p>{s.desc}</p>
                      <div className="svc-bar" />
                    </div>
                  </CardSpotlight>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES & TABS ================= */}
      <section className="sec ind" id="industries">
        <div className="wrap">
          <div className="ind-head">
            <Reveal>
              <div className="kicker">Who We Serve</div>
              <h2 className="title">
                We don't work with <span className="serif accent">everyone.</span>
              </h2>
              <p className="lede">
                We partner exclusively with high-ticket businesses where one client relationship
                can alter your quarter. If buyers need to trust your expertise before spending money,
                we are your growth weapon.
              </p>
            </Reveal>

            {/* Interactive Tab Switcher */}
            <div className="tab-bar">
              <button
                className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Focus Sectors
              </button>
              {nicheGroups.map((g) => (
                <button
                  key={g.id}
                  className={`tab-btn ${activeTab === g.id ? "active" : ""}`}
                  onClick={() => setActiveTab(g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ind-grid">
            {filteredGroups.map((g, gi) => {
              const Icon = g.icon;
              return (
                <Reveal key={g.label} delay={gi * 0.08}>
                  <CardSpotlight style={{ background: "#1C1714", borderColor: "rgba(255,255,255,0.14)" }}>
                    <div className="ind-in">
                      <div className="ind-icon">
                        <Icon size={19} strokeWidth={1.8} />
                      </div>
                      <h3>{g.label}</h3>
                      <div className="ind-tag serif">{g.tag}</div>
                      <div className="ind-list">
                        {g.items.map((n, ni) => (
                          <div className="ind-row" key={n}>
                            <span className="ind-num">{String(ni + 1).padStart(2, "0")}</span> {n}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardSpotlight>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.12}>
            <div className="more-head">
              <span className="serif accent">and the client list continues...</span>
            </div>
          </Reveal>
          <div className="chip-belt">
            <div className="chip-track">
              {[0, 1].map((k) => (
                <span key={k} className="chip-set">
                  {moreIndustriesA.map((n) => (
                    <span className="chip" key={n}>
                      {n}
                    </span>
                  ))}
                </span>
              ))}
            </div>
            <div className="chip-track rev">
              {[0, 1].map((k) => (
                <span key={k} className="chip-set">
                  {moreIndustriesB.map((n) => (
                    <span className="chip" key={n}>
                      {n}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          <Reveal delay={0.16}>
            <div className="warn">
              <b>Exclusivity rule:</b> We lock category slots per geographic territory. Once your
              regional competitor signs with us, we cannot onboard your firm.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section className="sec" id="system">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <Reveal>
            <div className="kicker">The Unmute System</div>
            <h2 className="title">
              Thirteen steps.<br />
              <span className="serif accent">Zero lost opportunities.</span>
            </h2>
            <p className="lede">
              From day one strategy sessions to continuous revenue scaling, every prospect is
              engaged, qualified, and moved into your calendar. Watch the timeline fill as you scroll.
            </p>
          </Reveal>
          <FlowTimeline />
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="marquee">
        <div className="mq-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {[
                "Strategy",
                "Shoot",
                "Edit",
                "Publish",
                "Leads",
                "CRM",
                "Automation",
                "Follow-Up",
                "Sales",
                "Scale",
              ].map((w) => (
                <span key={w}>{w}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ================= PROOF ================= */}
      <section className="sec" style={{ background: "var(--bg-warm)" }}>
        <div className="wrap">
          <Reveal>
            <div className="kicker">Proof, Not Promises</div>
            <h2 className="title">
              We practice what we <span className="serif accent">sell.</span>
            </h2>
          </Reveal>
          <div className="proof-grid">
            <Reveal delay={0.08}>
              <p className="proof-quote">
                "We have executed this exact playbook for <b>25+ brands</b> over the past two years,
                generating <b>over ₹10 crores in closed client revenue</b>, while growing our own page
                past <span className="serif accent">200K followers</span>."
              </p>
            </Reveal>
            <div className="proof-cards">
              {[
                {
                  k: "25+ Brands Scaled",
                  v: "From architectural firms to B2B software and medical leaders, we know how high-ticket deals are made.",
                },
                {
                  k: "₹10+ Crores Generated",
                  v: "Directly tracked revenue resulting from organic content lead flows and CRM follow-up systems.",
                },
                {
                  k: "200K+ Followers Grown",
                  v: "Built organically on our own media pages. We execute what we preach daily.",
                },
              ].map((c, i) => (
                <Reveal key={c.k} delay={i * 0.07}>
                  <CardSpotlight style={{ background: "var(--bg-card)" }}>
                    <div className="p-card-in">
                      <div className="k">{c.k}</div>
                      <div className="v">{c.v}</div>
                    </div>
                  </CardSpotlight>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="sec" id="faq">
        <div className="wrap">
          <Reveal style={{ textAlign: "center" }}>
            <div className="kicker" style={{ justifyContent: "center" }}>
              Clarifications
            </div>
            <h2 className="title">
              Frequently Asked <span className="serif accent">Questions</span>
            </h2>
            <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Everything you need to know before initiating a brand partnership with Unmute Media.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="faq-wrap">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="final" id="contact">
        <div className="final-glow" />
        <div style={{ position: "relative" }}>
          <Reveal>
            <h2>
              Your business.<br />
              <span className="serif accent">Unmuted.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede">
              If you want to become the undisputed category leader in your region, the groundwork
              starts today.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div style={{ marginTop: 36 }}>
              <a
                href="https://tally.so/r/eqjbkJ"
                target="_blank"
                rel="noopener noreferrer"
                className="btn xl"
              >
                Book Your Free Strategy Call <ArrowRight size={20} />
              </a>
            </div>
            <div className="final-note">Limited Slots Available</div>
          </Reveal>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="foot">
          <span>© 2026 Unmute Media</span>
          <span>Content · Brand · Leads · Revenue</span>
        </div>
      </footer>
    </div>
  );
}
