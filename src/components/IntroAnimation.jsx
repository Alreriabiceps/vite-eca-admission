import { useState, useEffect } from "react";

const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timers = [];

    // Phase 1: Logo appears (0.5s)
    timers.push(
      setTimeout(() => {
        setAnimationPhase(1);
      }, 500)
    );

    // Phase 2: College name appears (1.2s)
    timers.push(
      setTimeout(() => {
        setAnimationPhase(2);
      }, 1200)
    );

    // Phase 3: Location appears (2s)
    timers.push(
      setTimeout(() => {
        setAnimationPhase(3);
      }, 2000)
    );

    // Phase 4: Welcome text appears (2.8s)
    timers.push(
      setTimeout(() => {
        setAnimationPhase(4);
      }, 2800)
    );

    // Phase 5: Start fade out (4.2s)
    timers.push(
      setTimeout(() => {
        setIsVisible(false);
      }, 4200)
    );

    // Phase 6: Complete animation (5s)
    timers.push(
      setTimeout(() => {
        onComplete();
      }, 5000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] flex items-center justify-center transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center">
        {/* Logo Animation - Much Bigger and No Background */}
        <div
          className={`mb-16 transition-all duration-1200 ${
            animationPhase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div className="h-56 w-56 mx-auto flex items-center justify-center mb-10 animate-pulse">
            <img
              src="/logo na pogi.png"
              alt="Exact Colleges of Asia Logo"
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* College Name Animation - Much Bigger */}
        <div
          className={`transition-all duration-1200 ${
            animationPhase >= 2
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-75"
          }`}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6 tracking-wider animate-pulse-slow">
            <span className="inline-block animate-bounce-slow">EXACT</span>
            <span
              className="inline-block mx-4 animate-bounce-slow"
              style={{ animationDelay: "0.2s" }}
            >
              COLLEGES
            </span>
            <span
              className="inline-block animate-bounce-slow"
              style={{ animationDelay: "0.4s" }}
            >
              OF
            </span>
            <span
              className="inline-block animate-bounce-slow"
              style={{ animationDelay: "0.6s" }}
            >
              ASIA
            </span>
          </h1>
        </div>

        {/* Location Animation */}
        <div
          className={`transition-all duration-1200 ${
            animationPhase >= 3
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-90"
          }`}
        >
          <p className="text-2xl md:text-3xl lg:text-4xl text-[#F5F7FA] mb-10 font-semibold tracking-wide animate-pulse-slow">
            Suclayin Arayat Pampanga
          </p>
        </div>

        {/* Welcome Text Animation */}
        <div
          className={`transition-all duration-1200 ${
            animationPhase >= 4
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          }`}
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-[#F5F7FA]/90 font-medium tracking-wide animate-pulse-slow">
            Welcome to Excellence in Education
          </p>
        </div>

        {/* Enhanced Loading Animation */}
        <div
          className={`mt-12 transition-all duration-1200 ${
            animationPhase >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="flex justify-center space-x-3">
            <div className="w-4 h-4 bg-[#1B9AAA] rounded-full animate-bounce shadow-lg"></div>
            <div
              className="w-4 h-4 bg-[#1B9AAA] rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#1B9AAA] rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#1B9AAA] rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#1B9AAA] rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#1B9AAA]/15 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#158A9A]/15 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#1B9AAA]/10 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/2 w-32 h-32 bg-[#158A9A]/10 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-[#1B9AAA]/8 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Animated lines */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#1B9AAA]/20 to-transparent animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#158A9A]/20 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-[#1B9AAA]/15 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
