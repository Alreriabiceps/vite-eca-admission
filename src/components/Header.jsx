import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  NAV_LINKS,
  SCROLL_TARGETS,
  scrollToCourse,
  smoothScrollTo,
} from "../config/siteNav";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const navRef    = useRef(null);
  const topbarRef = useRef(null);
  const dropRef   = useRef(null);
  const dropTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // entrance animations
  useEffect(() => {
    gsap.fromTo(topbarRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 }
    );
    gsap.fromTo(navRef.current,
      { y: -32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.25 }
    );
  }, []);

  // dropdown GSAP entrance — use callback ref to animate on mount
  const setDropRef = (el) => {
    dropRef.current = el;
    if (el) {
      gsap.fromTo(el,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }
      );
    }
  };

  const openDrop  = () => { clearTimeout(dropTimer.current); setDropOpen(true); };
  const closeDrop = () => { dropTimer.current = setTimeout(() => setDropOpen(false), 140); };

  // SPA nav click handler
  const handleNav = (e, link) => {
    e.preventDefault();
    setMobileOpen(false);
    setDropOpen(false);
    if (link.to) { navigate(link.to); return; }
    // hash link — if already on home, just scroll; else navigate then scroll
    const targetId = SCROLL_TARGETS[link.hash];
    if (location.pathname === "/") {
      setActiveHash(link.hash);
      smoothScrollTo(targetId);
    } else {
      navigate("/");
      setTimeout(() => { setActiveHash(link.hash); smoothScrollTo(targetId); }, 400);
    }
  };

  const S = { // shared inline style tokens
    text: "rgba(255,255,255,0.78)",
    teal: "#1a4fd6",
    dim:  "rgba(255,255,255,0.35)",
  };

  return (
    <>
      {/* ── TOPBAR ── */}
      <div ref={topbarRef} style={{ background: "#060d1e", borderBottom: "1px solid rgba(26,79,214,0.14)", opacity: 0 }}>
        <div style={{ width: "85%", margin: "0 auto", padding: "7px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* left — contact */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {[
              { href: "tel:+6345123456", icon: <svg style={{width:12,height:12,color:S.teal,flexShrink:0}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>, text: "(045) 123-4567" },
              { href: "mailto:info@exactcolleges.edu.ph", icon: <svg style={{width:12,height:12,color:S.teal,flexShrink:0}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, text: "info@exactcolleges.edu.ph" },
            ].map(item => (
              <a key={item.href} href={item.href} style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:S.dim, textDecoration:"none", fontWeight:600, transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                onMouseLeave={e=>e.currentTarget.style.color=S.dim}
              >{item.icon}{item.text}</a>
            ))}
            <span style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:S.dim, fontWeight:600 }}>
              <svg style={{width:12,height:12,color:S.teal,flexShrink:0}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Suclayin, Arayat, Pampanga
            </span>
          </div>

          {/* right — badge */}
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <span style={{
              fontSize:10, fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase",
              background: `linear-gradient(90deg,${S.teal},#1234a0)`,
              color:"#fff", padding:"3px 14px",
            }}>
              Now Enrolling 2025–2026
            </span>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav
        ref={navRef}
        style={{
          position:"sticky", top:0, zIndex:100, opacity:0,
          background: scrolled ? "rgba(4,10,22,0.98)" : "rgba(4,10,22,0.85)",
          backdropFilter:"blur(22px)",
          borderBottom: scrolled ? `1px solid rgba(26,79,214,0.22)` : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.55)" : "none",
          transition:"background 0.4s, border-color 0.4s, box-shadow 0.4s",
        }}
      >
        <div style={{ width:"85%", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", height:62 }}>

          {/* LEFT — logo */}
          <a href="/" onClick={e=>handleNav(e,{hash:"#home"})} style={{ display:"flex", alignItems:"center", gap:11, textDecoration:"none", justifySelf:"start" }}>
            <img src="/logo na pogi.png" alt="ECA" style={{ width:38, height:38, filter:`drop-shadow(0 0 10px rgba(26,79,214,0.55))` }} />
            <div>
              <p style={{ fontSize:12, fontWeight:900, color:"#fff", letterSpacing:"0.05em", lineHeight:1.15, margin:0 }}>EXACT COLLEGES</p>
              <p style={{ fontSize:8, fontWeight:800, color:S.teal, letterSpacing:"0.22em", textTransform:"uppercase", margin:0 }}>OF ASIA</p>
            </div>
          </a>

          {/* CENTER — nav links */}
          <div style={{ display:"flex", alignItems:"center", gap:0 }}>
            {NAV_LINKS.map(link => (
              link.children ? (
                <div key={link.label} style={{ position:"relative" }} onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                  <button
                    onClick={e=>handleNav(e,link)}
                    style={{
                      display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer",
                      fontSize:13, fontWeight:700, letterSpacing:"0.03em",
                      color: activeHash===link.hash ? S.teal : S.text,
                      padding:"0 16px", height:62,
                      borderBottom: activeHash===link.hash ? `2px solid ${S.teal}` : "2px solid transparent",
                      transition:"color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={e=>e.currentTarget.style.color=S.teal}
                    onMouseLeave={e=>e.currentTarget.style.color=activeHash===link.hash?S.teal:S.text}
                  >
                    {link.label}
                    <svg style={{width:11,height:11,transition:"transform 0.2s",transform:dropOpen?"rotate(180deg)":""}} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {/* dropdown — no border-radius */}
                  {dropOpen && (
                    <div ref={setDropRef} style={{
                      position:"absolute", top:"100%", left:"50%", transform:"translateX(-50%)",
                      background:"rgba(4,10,22,0.99)", backdropFilter:"blur(24px)",
                      border:"1px solid rgba(26,79,214,0.18)",
                      padding:"6px 0", minWidth:240, zIndex:200,
                      boxShadow:"0 20px 60px rgba(0,0,0,0.7)",
                    }}>
                      {link.children.map((c,i) => (
                        <a key={c.id}
                          href="#programs"
                          onClick={e => {
                            e.preventDefault();
                            setDropOpen(false);
                            setMobileOpen(false);
                            if (location.pathname === "/") {
                              scrollToCourse(c.id);
                            } else {
                              navigate("/");
                              setTimeout(() => scrollToCourse(c.id), 500);
                            }
                          }}
                          style={{
                            display:"flex", alignItems:"center", gap:10,
                            padding:"9px 18px",
                            fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.65)",
                            textDecoration:"none", transition:"background 0.15s, color 0.15s", cursor:"pointer",
                            borderBottom: i<link.children.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                          }}
                          onMouseEnter={e=>{e.currentTarget.style.background="rgba(26,79,214,0.1)";e.currentTarget.style.color="#fff";}}
                          onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,255,255,0.65)";}}
                        >
                          <span style={{width:4,height:4,background:S.teal,flexShrink:0}}/>
                          {c.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.to ? (
                <Link key={link.label} to={link.to} style={{
                  fontSize:13, fontWeight:700, letterSpacing:"0.03em",
                  color: location.pathname===link.to ? S.teal : S.text,
                  textDecoration:"none", padding:"0 16px", height:62,
                  display:"flex", alignItems:"center",
                  borderBottom: location.pathname===link.to ? `2px solid ${S.teal}` : "2px solid transparent",
                  transition:"color 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={e=>e.currentTarget.style.color=S.teal}
                  onMouseLeave={e=>e.currentTarget.style.color=location.pathname===link.to?S.teal:S.text}
                >{link.label}</Link>
              ) : (
                <a key={link.label} href={link.hash} onClick={e=>handleNav(e,link)} style={{
                  fontSize:13, fontWeight:700, letterSpacing:"0.03em",
                  color: activeHash===link.hash ? S.teal : S.text,
                  textDecoration:"none", padding:"0 16px", height:62,
                  display:"flex", alignItems:"center",
                  borderBottom: activeHash===link.hash ? `2px solid ${S.teal}` : "2px solid transparent",
                  transition:"color 0.2s, border-color 0.2s",
                  cursor:"pointer",
                }}
                  onMouseEnter={e=>e.currentTarget.style.color=S.teal}
                  onMouseLeave={e=>e.currentTarget.style.color=activeHash===link.hash?S.teal:S.text}
                >{link.label}</a>
              )
            ))}
          </div>

          {/* RIGHT — Apply CTA + burger */}
          <div style={{ display:"flex", alignItems:"center", gap:12, justifySelf:"end" }}>
            <Link to="/application" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              background:`linear-gradient(135deg,${S.teal},#1234a0)`,
              color:"#fff", fontWeight:800, fontSize:12, letterSpacing:"0.06em",
              padding:"9px 22px", textDecoration:"none",
              boxShadow:"0 0 22px rgba(26,79,214,0.38)",
              transition:"transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 0 36px rgba(26,79,214,0.58)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 0 22px rgba(26,79,214,0.38)";}}
            >
              Apply Now
              <svg style={{width:13,height:13}} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </Link>

            {/* mobile burger */}
            <button className="lg:hidden" onClick={()=>setMobileOpen(v=>!v)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"#fff", padding:4 }}>
              <svg style={{width:22,height:22}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {mobileOpen && (
          <div style={{ background:"rgba(4,10,22,0.99)", borderTop:"1px solid rgba(26,79,214,0.14)", width:"85%", margin:"0 auto", paddingBottom:12 }}>
            {NAV_LINKS.map(link => (
              link.children ? link.children.map(c => (
                <a key={c.id} href="#programs"
                  onClick={e => {
                    e.preventDefault();
                    setMobileOpen(false);
                    if (location.pathname === "/") {
                      scrollToCourse(c.id);
                    } else {
                      navigate("/");
                      setTimeout(() => scrollToCourse(c.id), 500);
                    }
                  }}
                  style={{
                    display:"block", padding:"10px 20px",
                    fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.65)",
                    textDecoration:"none", cursor:"pointer", borderLeft:`3px solid rgba(26,79,214,0.3)`,
                  }}
                >{c.label}</a>
              )) : (
                <a key={link.label}
                  href={link.hash || link.to}
                  onClick={e => link.hash ? handleNav(e, link) : setMobileOpen(false)}
                  style={{
                    display:"block", padding:"12px 20px",
                    fontSize:14, fontWeight:700, color: activeHash===link.hash ? S.teal : "rgba(255,255,255,0.8)",
                    textDecoration:"none",
                    borderLeft: activeHash===link.hash ? `3px solid ${S.teal}` : "3px solid transparent",
                  }}
                >{link.label}</a>
              )
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
