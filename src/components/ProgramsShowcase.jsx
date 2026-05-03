import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";

const ANIME_MAP = {
  "marine-transportation":        "/ANIME/MARINE.png",
  "marine-engineering":           "/ANIME/MARINE.png",
  "nursing":                      "/ANIME/NURSING.png",
  "early-childhood-education":    "/ANIME/EDUC.png",
  "technical-vocational-teacher": "/ANIME/EDUC.png",
  "entrepreneurship":             "/ANIME/BUSINESS.png",
  "management-accounting":        "/ANIME/BUSINESS.png",
  "information-system":           "/ANIME/IS.png",
  "tourism-management":           "/ANIME/TOURISM.png",
  "criminology":                  "/ANIME/CRIME.png",
};

function rgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ═══════════════════════ COMPONENT ═══════════════════════ */
const ProgramsShowcase = ({ courses, onCourseClick, scrollContainerId = "programs-scroll-container" }) => {
  const sectionRef    = useRef(null);
  const animeRef      = useRef(null);
  const infoRef       = useRef(null);   // wraps ALL left-panel text content
  const glowRef       = useRef(null);
  const glowRef2      = useRef(null);
  const titleRef      = useRef(null);
  const subtitleRef   = useRef(null);
  const progressRef   = useRef(null);
  const counterRef    = useRef(null);
  const tlRef        = useRef(null);
  const activeIdxRef = useRef(0);

  const [activeIdx, setActiveIdx] = useState(0);

  const active   = courses[activeIdx] || courses[0];
  const animeImg = ANIME_MAP[active?.id];
  const from     = active?.theme?.headerFrom || "#1a4fd6";
  const to       = active?.theme?.headerTo   || "#0D4A6C";

  /* ── goTo: exit → swap state → enter, no mid-flight re-render blink ── */
  const goTo = useCallback((nextIdx) => {
    if (nextIdx < 0 || nextIdx >= courses.length) return;
    if (nextIdx === activeIdxRef.current) return;

    const dir = nextIdx > activeIdxRef.current ? 1 : -1;
    activeIdxRef.current = nextIdx;

    tlRef.current?.kill();

    const anime   = animeRef.current;
    const info    = infoRef.current;
    const counter = counterRef.current;
    const prog    = progressRef.current;

    // Phase 1 — EXIT (pure GSAP, no state change yet)
    gsap.timeline()
      .to(anime, { x: dir * -120, opacity: 0, scale: 0.88, duration: 0.28, ease: "power3.in" })
      .to(info,  { x: dir * -50,  opacity: 0, duration: 0.22, ease: "power2.in" }, "<")
      // Phase 2 — SWAP: update React state while elements are invisible
      .call(() => setActiveIdx(nextIdx))
      // Phase 3 — ENTER: elements now have new content, animate in
      .set(anime, { x: dir * 140, scale: 0.88 })
      .set(info,  { x: dir * 60 })
      .to(anime, { x: 0, opacity: 1, scale: 1, duration: 0.65, ease: "expo.out" })
      .to(info,  { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "<0.06")
      .fromTo(counter,
        { scale: 1.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.38, ease: "back.out(2.5)" }, "<0.04")
      .to(prog, {
        scaleX: (nextIdx + 1) / courses.length,
        duration: 0.45, ease: "power2.inOut",
      }, "<");

  }, [courses.length]);

  /* ── MOUNT entrance ── */
  useEffect(() => {
    const dockEls = sectionRef.current?.querySelectorAll(".prog-dock-card") ?? [];

    gsap.set([animeRef.current, infoRef.current], { opacity: 0 });
    gsap.set(dockEls, { opacity: 0, y: 50 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(titleRef.current,    { opacity: 0, y: 60, skewY: 5 });
    gsap.set(progressRef.current, { scaleX: 0, opacity: 0 });

    gsap.timeline({ delay: 0.15 })
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" })
      .to(titleRef.current,    { y: 0, opacity: 1, skewY: 0, duration: 1.0, ease: "expo.out" }, "-=0.35")
      .to(animeRef.current,    { opacity: 1, duration: 1.1, ease: "power2.out" }, "-=0.7")
      .to(infoRef.current,     { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.8")
      .to(dockEls,             { y: 0, opacity: 1, duration: 0.55, stagger: 0.04, ease: "back.out(1.5)" }, "-=0.5")
      .to(progressRef.current, { scaleX: 1/courses.length, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");

    /* glow breathe */
    gsap.to([glowRef.current, glowRef2.current], {
      scale: 1.2, opacity: 0.85,
      duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 1.8,
    });

    /* particles */
    gsap.to(".prog-particle", {
      y: "random(-55,55)", x: "random(-35,35)", opacity: "random(0.04,0.45)",
      duration: "random(4,9)", repeat: -1, yoyo: true, ease: "sine.inOut",
      stagger: { each: 0.25, from: "random" },
    });

    /* ── scroll-driven: read container scroll progress ── */
    const onScroll = () => {
      const container = document.getElementById(scrollContainerId);
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // how far we've scrolled INTO the container (0 → containerHeight - vh)
      const scrolled   = -rect.top;
      const stepHeight = window.innerHeight;
      if (scrolled < 0) return; // not reached yet
      const rawIdx = Math.floor(scrolled / stepHeight);
      const clamped = Math.max(0, Math.min(rawIdx, courses.length - 1));
      if (clamped !== activeIdxRef.current) goTo(clamped);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── keyboard ── */
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goTo(activeIdxRef.current + 1);
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  goTo(activeIdxRef.current - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goTo]);


  /* ── stable particles ── */
  const particles = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    width:  Math.random() * 10 + 3,
    height: Math.random() * 10 + 3,
    top:    `${Math.random() * 100}%`,
    left:   `${Math.random() * 100}%`,
    opacity: Math.random() * 0.25 + 0.04,
    filter: "blur(2px)",
    borderRadius: "50%",
    position: "absolute",
    pointerEvents: "none",
    background: i % 3 === 0 ? "rgba(255,255,255,0.16)" : i % 3 === 1 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
  })), []);

  if (!courses.length) return null;

  return (
    <section
      ref={sectionRef}
      id="programs"
      data-section="programs"
      className="relative overflow-hidden flex flex-col"
      style={{ height: "100vh", background: "#03080f" }}
    >
      {/* ── dynamic BG ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        transition: "background 0.85s ease",
        background: [
          `radial-gradient(ellipse 85% 75% at 65% 50%, ${rgba(from,0.16)} 0%, transparent 60%)`,
          `radial-gradient(ellipse 50% 60% at 10% 85%, ${rgba(to,  0.12)} 0%, transparent 50%)`,
          `radial-gradient(ellipse 30% 30% at 90%  8%, ${rgba(from,0.10)} 0%, transparent 45%)`,
          "linear-gradient(170deg,#03080f 0%,#060f1c 100%)",
        ].join(","),
      }} />

      {/* grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
        backgroundSize: "90px 90px",
      }} />

      {/* vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 100% 100% at 50% 50%,transparent 35%,rgba(0,0,0,0.6) 100%)",
      }} />

      {/* particles */}
      {particles.map((p, i) => <div key={i} className="prog-particle" style={p} />)}

      {/* ══════════════════════════════════════════
          MAIN — left info | right anime
          height = 100vh minus dock (~176px)
      ══════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col lg:flex-row" style={{ height: "100vh" }}>

        {/* ── LEFT PANEL ── */}
        <div className="flex flex-col lg:w-[45%] xl:w-[42%] px-8 sm:px-14 lg:px-16 pt-10 pb-6 order-2 lg:order-1 h-full overflow-hidden">

          {/* static header — NOT inside infoRef so it doesn't fly on every switch */}
          <div className="flex-shrink-0 mb-4">
            <div ref={subtitleRef} className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 flex-shrink-0" style={{ background: `linear-gradient(to right,transparent,${from})`, transition: "background 0.7s" }} />
              <span className="text-[11px] font-black tracking-[0.4em] uppercase" style={{ color: from, transition: "color 0.7s" }}>
                Exact Colleges of Asia
              </span>
            </div>
            <div className="overflow-visible">
              <h2
                ref={titleRef}
                className="font-black text-white leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(3rem,7vw,6rem)", textShadow: `0 0 80px ${rgba(from,0.25)}`, transition: "text-shadow 0.7s" }}
              >
                Available<br />
                <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.5)", color: "transparent" }}>
                  Programs.
                </span>
              </h2>
            </div>
          </div>

          {/* ── INFO BLOCK — this whole div slides in/out as one unit ── */}
          <div ref={infoRef} className="flex-1 flex flex-col justify-center">

            {/* logo + college */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg,${rgba(from,0.18)},${rgba(to,0.18)})`,
                  border: `2px solid ${rgba(from,0.4)}`,
                  boxShadow: `0 0 36px ${rgba(from,0.35)}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <img src={active.logo} alt={active.title} className="w-16 h-16 object-contain" draggable={false} />
              </div>
              <span
                className="inline-flex items-center gap-2 text-sm font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border"
                style={{ color: from, borderColor: rgba(from,0.38), background: rgba(from,0.08) }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: from }} />
                {active.college}
              </span>
            </div>

            {/* title */}
            <h3
              className="font-black text-white leading-tight mb-3"
              style={{ fontSize: "clamp(1.8rem,3.8vw,3rem)", textShadow: `0 0 50px ${rgba(from,0.38)}` }}
            >
              {active.title}
            </h3>

            {/* accent bar */}
            <div className="h-1.5 w-20 rounded-full mb-5"
              style={{ background: `linear-gradient(to right,${from},${to})`, boxShadow: `0 0 16px ${rgba(from,0.65)}` }}
            />

            {/* description */}
            <p className="text-white/40 text-[14px] leading-relaxed mb-6 max-w-sm">
              {active.description?.slice(0, 130)}…
            </p>

            {/* meta */}
            <div className="flex gap-3 mb-8 flex-wrap">
              {[["Duration", active.duration], ["Units", active.units]].map(([label, val]) => (
                <div key={label} className="flex flex-col px-5 py-3 rounded-xl border"
                  style={{ borderColor: rgba(from,0.16), background: rgba(from,0.07), backdropFilter: "blur(8px)" }}>
                  <span className="text-white/28 text-[9px] font-black tracking-[0.2em] uppercase mb-0.5">{label}</span>
                  <span className="text-white font-black text-base">{val}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => onCourseClick(activeIdx)}
                className="group relative overflow-hidden font-black text-sm text-white rounded-full active:scale-95 transition-transform"
                style={{ padding: "12px 30px", background: `linear-gradient(135deg,${from},${to})`, boxShadow: `0 6px 28px ${rgba(from,0.4)}` }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Program
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </button>
              <button
                className="font-black text-sm text-white/40 hover:text-white rounded-full transition-all"
                style={{ padding: "12px 30px", border: "1.5px solid rgba(255,255,255,0.10)" }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* counter + progress (static, not inside infoRef) */}
          <div className="flex-shrink-0 pt-6">
            <div className="flex items-center gap-4">
              <span
                ref={counterRef}
                className="font-black tabular-nums leading-none"
                style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: from, transition: "color 0.5s", minWidth: "3ch" }}
              >
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="h-1 rounded-full overflow-hidden mb-1" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div
                    ref={progressRef}
                    className="h-full rounded-full origin-left"
                    style={{
                      width: "100%",
                      background: `linear-gradient(to right,${from},${to})`,
                      transform: `scaleX(${(activeIdx + 1) / courses.length})`,
                      transformOrigin: "left",
                      boxShadow: `0 0 10px ${from}`,
                      transition: "background 0.7s",
                    }}
                  />
                </div>
                <span className="text-white/18 text-[11px] font-bold">
                  of {String(courses.length).padStart(2,"0")} programs · scroll or pick from the side
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — anime character + side strip ── */}
        <div className="relative lg:flex-1 flex order-1 lg:order-2 h-full">

          {/* glow blobs */}
          <div ref={glowRef} className="absolute pointer-events-none" style={{
            bottom: "-5%", left: "50%", transform: "translateX(-50%)",
            width: "80%", height: "80%",
            background: `radial-gradient(circle,${rgba(from,0.5)} 0%,${rgba(to,0.2)} 45%,transparent 70%)`,
            filter: "blur(72px)", transition: "background 0.8s",
          }} />
          <div ref={glowRef2} className="absolute pointer-events-none" style={{
            top: "5%", right: "10%", width: "40%", height: "40%",
            background: `radial-gradient(circle,${rgba(to,0.38)} 0%,transparent 70%)`,
            filter: "blur(48px)", transition: "background 0.8s",
          }} />

          {/* character */}
          <div
            ref={animeRef}
            className="absolute z-10 select-none pointer-events-none flex items-end justify-center"
            style={{ top: 0, bottom: 0, left: 0, right: 192 }}
          >
            {animeImg && (
              <img
                src={animeImg}
                alt={active.title}
                style={{
                  height: "88vh",
                  maxHeight: "88vh",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  display: "block",
                  filter: `drop-shadow(0 0 80px ${rgba(from,0.7)}) drop-shadow(0 40px 80px rgba(0,0,0,0.9))`,
                  transition: "filter 0.8s",
                }}
                draggable={false}
              />
            )}
          </div>

          {/* ── VERTICAL SIDE STRIP — 2-col grid, right edge ── */}
          <div
            className="absolute right-0 top-0 bottom-0 z-30 flex flex-col py-4 px-2 overflow-y-auto"
            style={{ width: 192, scrollbarWidth: "none", background: "rgba(0,0,0,0.38)", backdropFilter: "blur(20px)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-white/15 text-[7px] font-black tracking-[0.35em] uppercase text-center mb-3 flex-shrink-0">
              Programs
            </p>
            {/* 2-column grid */}
            <div className="grid grid-cols-2 gap-2 flex-1 content-center">
              {courses.map((course, i) => {
                const isAct = i === activeIdx;
                const f2 = course.theme?.headerFrom || "#1a4fd6";
                const t2 = course.theme?.headerTo   || "#0D4A6C";
                return (
                  <button
                    key={course.id}
                    onClick={() => goTo(i)}
                    className="prog-dock-card relative flex flex-col items-center gap-1 opacity-0 focus:outline-none"
                  >
                    {/* tile */}
                    <div style={{
                      position: "relative", width: 72, height: 72, borderRadius: 18, overflow: "hidden",
                      background: `linear-gradient(145deg,${f2},${t2})`,
                      boxShadow: isAct
                        ? `0 0 0 2px white, 0 0 18px ${rgba(f2,0.75)}, 0 4px 12px rgba(0,0,0,0.5)`
                        : `0 3px 8px rgba(0,0,0,0.5)`,
                      transform: isAct ? "scale(1.1)" : "scale(1)",
                      opacity: isAct ? 1 : 0.4,
                      transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    }}>
                      <img
                        src={course.logo}
                        alt={course.title}
                        style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",padding:10,filter:"drop-shadow(0 1px 5px rgba(0,0,0,0.55))" }}
                        draggable={false}
                      />
                      {isAct && (
                        <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,255,255,0.25) 0%,transparent 62%)" }} />
                      )}
                    </div>
                    {/* label */}
                    <span style={{
                      fontSize: 7, fontWeight: 800, textAlign: "center", lineHeight: 1.3,
                      color: isAct ? "white" : "rgba(255,255,255,0.2)",
                      width: 72, overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      transition: "color 0.3s",
                    }}>
                      {course.title}
                    </span>
                    {/* active dot */}
                    <div style={{
                      width: isAct ? 20 : 4, height: 2.5, borderRadius: 9999,
                      background: isAct ? `linear-gradient(to right,${f2},${t2})` : "rgba(255,255,255,0.1)",
                      boxShadow: isAct ? `0 0 7px ${f2}` : "none",
                      transition: "all 0.35s ease",
                    }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* arrows */}
          <button
            onClick={() => goTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-black/50 backdrop-blur-sm hover:bg-white/12 disabled:opacity-10 transition-all"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIdx + 1)}
            disabled={activeIdx === courses.length - 1}
            className="absolute z-30 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-black/50 backdrop-blur-sm hover:bg-white/12 disabled:opacity-10 transition-all"
            style={{ right: 200 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsShowcase;
