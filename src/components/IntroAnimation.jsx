import { useState, useEffect } from "react";

const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-200 via-blue-100 to-yellow-200 flex items-center justify-center">
      {/* Background Design Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-yellow-300 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-yellow-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="text-center max-w-4xl px-6 relative z-10">
        {/* Logo */}
        <div className="mb-12">
          <img
            src="/logo na pogi.png"
            alt="Exact Colleges of Asia Logo"
            className="h-32 w-32 md:h-40 md:w-40 mx-auto object-contain"
          />
        </div>

        {/* College Name */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-none">
          <span className="text-blue-600">EXACT</span>
          <span className="text-gray-900 mx-2 md:mx-3">COLLEGES</span>
          <span className="text-gray-900 mx-2">OF</span>
          <span className="text-yellow-500">ASIA</span>
        </h1>

        {/* Location */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-gray-700 font-light">
            Suclayin Arayat Pampanga
          </p>
        </div>

        {/* Divider with accent colors */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full mx-2"></div>
          <div className="w-8 h-1 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Welcome Text with background */}
        <div className="inline-block px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
          <p className="text-base md:text-lg text-gray-600 font-light tracking-widest uppercase">
            Welcome to Excellence in Education
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
