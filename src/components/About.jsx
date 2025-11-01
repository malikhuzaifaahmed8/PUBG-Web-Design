import YouTubeBg from './YouTubeBg';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";


import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // Clip scroll animation (text transition)
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation
      .to(".pubg-bg-text", {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(
        ".battle-text",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );

    // Map fade-up animations
    gsap.fromTo(
      ".map-item",
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#maps-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Initial states
    gsap.set(".battle-text", { opacity: 0, y: 50 });
  });

  const maps = [
    {
      name: "Erangel",
      video: "videos/PUBG - Erangel Visual Update.mp4",
      thumbnail: "img/erangel.jpg",
      size: "8x8 km",
      players: "100 Players",
      description: "Original battlefield with military bases and open fields",
    },
    {
      name: "Miramar",
      video: "videos/Untitled video - Made with Clipchamp (2).mp4",
      thumbnail: "img/Untitled video - Made with Clipchamp (2).jpg",
      size: "8x8 km",
      players: "100 Players",
      description: "Desert terrain with urban combat zones",
    },
    {
      name: "Vikendi",
      video: "videos/Untitled video - Made with Clipchamp (3).mp4",
      thumbnail: "img/vikendi.jpg",
      size: "6x6 km",
      players: "100 Players",
      description: "Snowy landscape with frozen lakes and villages",
    },
    {
      name: "Sanhok",
      video: "videos/PUBG - Sanhok Map Teaser Trailer.mp4",
      thumbnail: "img/sanhok.jpg",
      size: "4x4 km",
      players: "100 Players",
      description: "Dense jungle with fast-paced combat",
    },
  ];

  return (
    <div id="about" className="min-h-screen w-screen">
      {/* Intro Section */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Battle Field
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />
      </div>

      {/* PUBG Maps Section */}
      <div
        id="maps-section"
        className="relative py-20 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900"
      >
        <div className="absolute inset-0 bg-[url('img/pubg-texture.jpg')] opacity-10 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedTitle
            title="PUBG Battlefields"
            containerClass="mb-16 !text-white text-center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {maps.map((map) => (
              <div
                key={map.name}
                className="map-item group relative overflow-hidden rounded-lg shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="aspect-video relative">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster={map.thumbnail}
                  >
                    <source src={map.video} type="video/mp4" />
                    <img
                      src={map.thumbnail}
                      alt={map.name}
                      className="w-full h-full object-cover"
                    />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-2 font-mono">
                        {map.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-white text-sm font-semibold">
                            {map.size}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-white text-sm font-semibold">
                            {map.players}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {map.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded border-l-2 border-red-600">
                    <span className="text-white text-sm font-semibold uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-lg transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-500/30 px-6 py-3 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold uppercase tracking-wider text-sm">
                Drop In • Survive • Conquer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Clip Section: Text Only Transition */}
      <div
        className="h-dvh w-screen relative bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
        id="clip"
      >
        <div className="absolute inset-0 bg-[url('img/pubg-texture.jpg')] opacity-10 mix-blend-overlay"></div>

        {/* PUBG Text */}
        <div className="pubg-bg-text absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1 className="text-[30vw] font-black uppercase tracking-tighter text-gray-700 select-none">
            PUBG
          </h1>
        </div>

        {/* BATTLEGROUND Text */}
        <div className="battle-text absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-[10vw] md:text-[8vw] font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-300 to-red-600 drop-shadow-2xl">
            BATTLEGROUND
          </h2>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 z-0 opacity-20">
          <div className="w-32 h-32 border-2 border-gray-700 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-10 right-10 z-0 opacity-20">
          <div className="w-48 h-48 border-2 border-gray-700 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
