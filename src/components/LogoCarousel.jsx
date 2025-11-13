import { useEffect, useRef } from "react";

const LogoCarousel = () => {
  const logos = [
    "logo/maritime.png",
    "logo/nurse.png",
    "logo/educ.png",
    "logo/business admin.png",
    "logo/information system.png",
    "logo/tourism.png",
    "logo/crime.png",
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame (adjust for speed)
    const logoWidth = 200; // width of each logo including spacing
    const totalWidth = logoWidth * logos.length;

    const animate = () => {
      scrollPosition += scrollSpeed;

      // Reset position when we've scrolled through one complete set
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-full mx-auto">
      {/* Carousel Content */}
      <div className="relative h-48 flex items-center bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div
          ref={scrollRef}
          className="flex items-center space-x-16 px-8"
          style={{
            width: `${logos.length * 2 * 200}px`, // Double width for seamless loop
          }}
        >
          {/* Render all logos multiple times for continuous scrolling */}
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={`${logo}-${index}`}
              src={logo}
              alt={`Course Logo ${(index % logos.length) + 1}`}
              className="h-36 w-36 object-contain hover:scale-110 flex-shrink-0 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
