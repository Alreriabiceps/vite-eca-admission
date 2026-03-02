import { useState, useEffect } from "react";

const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Phase transitions
    const phase1 = setTimeout(() => setAnimationPhase(1), 300);
    const phase2 = setTimeout(() => setAnimationPhase(2), 600);
    const phase3 = setTimeout(() => setAnimationPhase(3), 900);

    // Fade out
    const fadeOut = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    // Complete
    const complete = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
      clearTimeout(fadeOut);
      clearTimeout(complete);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-deep-navy-blue flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Subtle Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bright-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-warm-gold/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container with Formal Layout */}
      <div className="text-center max-w-6xl px-6 relative z-10">
        {/* University Seal/Logo Section */}
        <div
          className={`mb-12 transition-all duration-700 ease-out ${
            animationPhase >= 1
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <img
            src="/logo na pogi.png"
            alt="Exact Colleges of Asia Logo"
            className="h-40 w-40 md:h-52 md:w-52 lg:h-60 lg:w-60 mx-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* University Name - Formal Typography */}
        <div
          className={`mb-10 transition-all duration-700 ease-out delay-150 ${
            animationPhase >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold mb-6 tracking-wide leading-tight">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
              <span className="text-soft-off-white font-black">EXACT</span>
              <span className="text-warm-gold font-black">COLLEGES</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mt-3">
              <span className="text-soft-off-white font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl">OF</span>
              <span className="text-warm-gold font-black">ASIA</span>
            </div>
          </h1>
        </div>

        {/* Formal Divider with Academic Style */}
        <div
          className={`flex items-center justify-center mb-10 transition-all duration-700 ease-out delay-300 ${
            animationPhase >= 2
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-20 md:w-24 bg-gradient-to-r from-transparent to-soft-off-white"></div>
            <div className="w-2 h-2 rounded-full bg-soft-off-white"></div>
            <div className="w-2 h-2 rounded-full bg-warm-gold"></div>
            <div className="w-2 h-2 rounded-full bg-soft-off-white"></div>
            <div className="h-px w-20 md:w-24 bg-gradient-to-l from-transparent to-warm-gold"></div>
          </div>
        </div>

        {/* Location - Formal Presentation */}
        <div
          className={`mb-12 transition-all duration-700 ease-out delay-450 ${
            animationPhase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-warm-gold font-semibold tracking-widest uppercase">
            Suclayin Arayat Pampanga
          </p>
        </div>

        {/* Motto/Tagline - Institutional */}
        <div
          className={`mt-14 transition-all duration-700 ease-out delay-600 ${
            animationPhase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-block px-12 py-5 border-t-2 border-b-2 border-soft-off-white/40">
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-soft-off-white font-light tracking-[0.2em] uppercase">
              Excellence in Education
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
