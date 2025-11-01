// Hero.jsx
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import {
  FaPlay,
  FaUsers,
  FaChevronDown,
  FaTrophy,
  FaSkull,
  FaCrosshairs,
  FaAward,
} from "react-icons/fa";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useGSAP(() => {
    // Initial clipPath setup
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
      willChange: "transform, opacity, clip-path",
    });

    // Main timeline — same as before, but smoother
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1, force3D: true },
    });

    tl.from("#main-title", {
      y: 80,
      opacity: 0,
      duration: 1.2,
    })
      .from(
        "#subtitle",
        {
          y: 40,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.6"
      )
      .from(
        "#cta-button",
        {
          scale: 0.8,
          rotation: -120,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.6)",
        },
        "-=0.5"
      )
      .from(
        ".stat-item",
        {
          y: 25,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
        },
        "-=0.5"
      );

    // Smooth Scroll animation (same look, smoother motion)
    gsap.fromTo(
      "#video-frame",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0%",
        willChange: "clip-path, border-radius",
      },
      {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
        ease: "expo.out",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: 0.8,
          smoothChildTiming: true,
        },
      }
    );

    // Floating title (same, smoother)
    gsap.to("#floating-title", {
      y: -20,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true,
    });

    // Shining text (same)
    gsap.to("#main-title .shining-text", {
      backgroundPositionX: "100%",
      duration: 4,
      repeat: -1,
      ease: "linear",
      force3D: true,
    });
  });

  // Faster preloader fade-out
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    // Much faster fade out - reduced from 0.4s to 0.2s
    gsap.to("#video-loading", {
      opacity: 0,
      duration: 0.2, // Faster duration
      ease: "power1.out",
      onComplete: () => {
        const loader = document.getElementById("video-loading");
        if (loader) loader.style.display = "none";
      },
    });
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-gray-900 transition-all duration-700 ease-in-out"
      >
        {/* Loading Overlay - Added faster transition */}
        <div
          id="video-loading"
          className="absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-200 ease-in-out" // Faster transition
        >
          <div className="text-center">
            {/* Faster spinner animation */}
            <div className="w-12 h-12 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ animationDuration: '0.6s' }}></div>
            <p className="text-yellow-400 font-semibold text-xs tracking-widest">
              LOADING BATTLEGROUNDS...
            </p>
          </div>
        </div>

        {/* Hero Video - Added onLoadStart for faster detection */}
        <video
          ref={videoRef}
          src="/videos/PUBG Xbox 2018 E3 Trailer.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadStart={handleVideoLoad} // Added for faster loading detection
          onLoadedData={handleVideoLoad}
          className="absolute left-0 top-0 size-full object-cover object-center transition-all duration-700 ease-in-out"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-20"></div>

        {/* Floating Title */}
        <h1
          id="floating-title"
          className="special-font absolute bottom-5 right-5 z-40 text-white/20 text-6xl md:text-8xl font-black tracking-wider select-none"
        >
          PUBG
        </h1>

        {/* Main Text Content */}
        <div className="absolute left-0 top-0 z-40 size-full flex items-center">
          <div className="mt-16 px-5 sm:px-10 max-w-4xl">
            <h1 id="main-title" className="special-font text-white mb-6">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black block leading-tight tracking-tight">
                WELCOME TO
              </span>
              <span className="shining-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-[length:200%_auto] bg-clip-text text-transparent text-4xl sm:text-6xl md:text-7xl font-black block leading-tight tracking-tighter">
                PLAYER UNKNOWN BATTLEGROUND
              </span>
            </h1>

            <div id="subtitle" className="mb-8 max-w-2xl">
              <p className="font-semibold text-white/90 text-lg sm:text-xl mb-4 tracking-wide flex items-center gap-3">
                <FaCrosshairs className="text-red-500" />
                SURVIVE • LOOT • CONQUER
              </p>
            </div>

            <div id="cta-button" className="mb-12">
              <Button
                id="play-now"
                title="JOIN BATTLE"
                leftIcon={<FaPlay className="text-white" />}
                containerClass="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 flex-center gap-3 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 ease-in-out shadow-2xl"
              />
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 text-white transition-all duration-500 ease-in-out">
              <div className="stat-item text-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[100px] hover:bg-white/20 transition-all duration-500 ease-in-out">
                <FaUsers className="text-yellow-400 text-xl mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold">100M+</div>
                <div className="text-xs opacity-80 tracking-wide">PLAYERS</div>
              </div>
              <div className="stat-item text-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[100px] hover:bg-white/20 transition-all duration-500 ease-in-out">
                <FaTrophy className="text-yellow-400 text-xl mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold">#1</div>
                <div className="text-xs opacity-80 tracking-wide">BATTLE ROYALE</div>
              </div>
              <div className="stat-item text-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[100px] hover:bg-white/20 transition-all duration-500 ease-in-out">
                <FaSkull className="text-yellow-400 text-xl mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold">100</div>
                <div className="text-xs opacity-80 tracking-wide">PLAYERS PER MATCH</div>
              </div>
              <div className="stat-item text-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[100px] hover:bg-white/20 transition-all duration-500 ease-in-out">
                <FaAward className="text-yellow-400 text-xl mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold">4.8</div>
                <div className="text-xs opacity-80 tracking-wide">RATING</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-700 ease-in-out">
        <div className="flex flex-col items-center">
          <span className="text-white/80 text-xs font-medium tracking-widest mb-3">
            SCROLL TO EXPLORE
          </span>
          <div className="w-5 h-8 border-2 border-white/60 rounded-full flex justify-center">
            <FaChevronDown className="text-white/60 mt-1.5 animate-bounce text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
