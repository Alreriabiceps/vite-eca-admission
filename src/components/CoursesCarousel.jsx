import { useState, useEffect } from "react";

const CoursesCarousel = () => {
  const images = [
    "/courses-images/2.jpg",
    "/courses-images/3.jpg",
    "/courses-images/4.jpg",
    "/courses-images/5.jpg",
    "/courses-images/6.jpg",
    "/courses-images/7.jpg",
    "/courses-images/8.jpg",
  ];

  // current page index (not individual slide)
  const [pageIndex, setPageIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Determine slides per view responsively
  useEffect(() => {
    const computeSlides = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 3; // lg and up
      if (width >= 640) return 2; // sm/md
      return 1; // mobile
    };

    const apply = () => setSlidesPerView(computeSlides());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // Ensure the last page is filled by repeating from the start
  const effectiveImages = (() => {
    const arr = [...images];
    const remainder = arr.length % slidesPerView;
    if (remainder !== 0) {
      const needed = slidesPerView - remainder;
      for (let i = 0; i < needed; i += 1) {
        arr.push(images[i % images.length]);
      }
    }
    return arr;
  })();

  const totalPages = Math.max(
    1,
    Math.ceil(effectiveImages.length / slidesPerView)
  );

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  // Clamp pageIndex when layout changes
  useEffect(() => {
    setPageIndex((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const goToPrevious = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToNext = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPage = (index) => {
    setPageIndex(index);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        {/* Image Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${pageIndex * 100}%)` }}
        >
          {effectiveImages.map((image, index) => (
            <div
              key={index}
              className="relative"
              style={{ flex: `0 0 ${100 / slidesPerView}%` }}
            >
              <img
                src={image}
                alt={`Course showcase ${index + 1}`}
                className="w-full h-auto object-contain"
              />
              {/* Optional: Add overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0D1B2A] p-2 rounded-full shadow-lg transition-colors z-10"
          aria-label="Previous images"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0D1B2A] p-2 rounded-full shadow-lg transition-colors z-10"
          aria-label="Next images"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Progress Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`transition-all duration-300 ${
                index === pageIndex
                  ? "bg-white w-12 h-2"
                  : "bg-white/40 w-2 h-2"
              } rounded-full hover:bg-white/60`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesCarousel;
