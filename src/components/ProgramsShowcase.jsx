import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProgramsShowcase = ({ courses, onCourseClick }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".prog-card");
    if (!cards) return;
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" }
    );
  }, []);

  return (
    <div id="programs" data-section="programs" className="relative bg-[#080814] py-20 px-4 sm:px-8">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
            Exact Colleges of Asia
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Available Programs
          </h2>
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-4" />
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {courses.map((course, i) => (
            <button
              key={course.id}
              onClick={() => onCourseClick(i)}
              className="prog-card group relative overflow-hidden rounded-xl text-left opacity-0"
            >
              {/* Gradient bg */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(145deg, ${course.theme?.headerFrom || "#1B9AAA"}, ${course.theme?.headerTo || "#0D4A6C"})` }}
              />
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-black/10 rounded-full" />

              {/* Content */}
              <div className="relative z-10 p-4 flex flex-col items-center text-center" style={{ minHeight: 240 }}>
                <span className="inline-block bg-white/15 text-white/80 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full mb-4 truncate max-w-full">
                  {course.college}
                </span>

                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={course.logo}
                    alt={course.title}
                    className="w-20 h-20 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-400"
                    style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.4))" }}
                  />
                </div>

                <h3 className="text-sm font-black text-white leading-tight mt-4 mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <span className="text-white/50 text-[10px] font-medium">{course.duration}</span>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsShowcase;
