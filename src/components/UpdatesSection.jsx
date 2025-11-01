import YouTubeBg from './YouTubeBg';
// UpdatesSection.jsx
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";


gsap.registerPlugin(ScrollTrigger);

// Bento Tilt Component for interactive cards
const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const UpdatesSection = () => {
  const [activeUpdate, setActiveUpdate] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const autoPlayRef = useRef(null);

  const updates = [
    {
      id: 1,
      title: "ROYAL PASS S12",
      subtitle: "Mythical Frontiers",
      description: "Unlock exclusive skins, weapon finishes, and rewards. Reach tier 100 for legendary Dragon Warrior outfit.",
      image: "/img/pubg-mobile-new-season-12-royale-pass-now-available_qek7.1248.webp",
      date: "LIVE NOW",
      features: ["Legendary Outfits", "Weapon Skins", "Vehicle Skins", "UC Rewards"],
      gradient: "from-orange-500/20 to-yellow-600/20",
      color: "orange",
      badge: "HOT",
      type: "PASS"
    },
    {
      id: 2,
      title: "CLASSIC MODE",
      subtitle: "Battle Royale",
      description: "The original 100-player battle royale experience. Loot, survive, and be the last one standing.",
      image: "/img/PUBG_Mobile_new_era_septemner_8_1598332470188.avif",
      date: "FEATURED",
      features: ["100 Players", "30-35 min", "Multiple Maps", "Squad Play"],
      gradient: "from-amber-500/20 to-brown-600/20",
      color: "amber",
      badge: "CLASSIC",
      type: "MODE"
    },
    {
      id: 3,
      title: "ARENA MODE",
      subtitle: "Team Deathmatch",
      description: "Fast-paced 4v4 team deathmatches in various combat zones with respawns.",
      image: "/img/maxresdefault.jpg",
      date: "NEW",
      features: ["8 Players", "10-15 min", "Multiple Arenas", "Ranked"],
      gradient: "from-blue-500/20 to-cyan-600/20",
      color: "blue",
      badge: "NEW",
      type: "MODE"
    },
    {
      id: 4,
      title: "ZOMBIE MODE",
      subtitle: "Survival Event",
      description: "Survive against zombie hordes in limited-time event with special rewards and challenges.",
      image: "/img/pubg-halloween-infection-mode-4k_1614860952.jpg",
      date: "COMING SOON",
      features: ["Zombie Hordes", "Special Weapons", "Event Rewards", "Team Play"],
      gradient: "from-green-500/20 to-emerald-600/20",
      color: "green",
      badge: "EVENT",
      type: "MODE"
    }
  ];

  const gameModes = [
    {
      id: 1,
      title: "CLASSIC",
      description: "100-player battle royale",
      players: "100 Players",
      duration: "30-35 min",
      image: "/img/pubg-mobile-hits-5-billion-revenue.avif",
      color: "from-red-500 to-orange-600"
    },
    {
      id: 2,
      title: "ARENA",
      description: "4v4 team deathmatch",
      players: "8 Players",
      duration: "10-15 min",
      image: "/img/thumb-1920-947388.jpg",
      color: "from-blue-500 to-cyan-600",
      isNew: true
    },
    {
      id: 3,
      title: "ZOMBIE",
      description: "Survival against hordes",
      players: "4 Players",
      duration: "15-20 min",
      image: "/img/pubg-halloween-infection-mode-4k_1614860952.jpg",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      title: "RANKED",
      description: "Competitive matches",
      players: "100 Players",
      duration: "30-35 min",
      image: "/img/hq720.jpg",
      color: "from-purple-500 to-pink-600"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveUpdate(prev => (prev + 1) % updates.length);
      }, 4000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, updates.length]);

  useGSAP(() => {
    // Master timeline for coordinated animations
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#updates-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Background elements animation
    masterTl.fromTo(".bg-circuit", 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // Title animation with stagger
    masterTl.fromTo(".title-char", 
      { 
        y: 100,
        opacity: 0,
        rotationX: -90
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "back.out(1.8)"
      },
      "-=0.5"
    );

    // Main showcase 3D entrance
    masterTl.fromTo("#main-showcase",
      { 
        x: -200,
        opacity: 0,
        rotationY: 25,
        scale: 0.9
      },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1.4,
        ease: "power3.out"
      },
      "-=0.8"
    );

    // Cards grid animation
    masterTl.fromTo(".update-card",
      { 
        y: 80,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.6"
    );

    // Game modes animation
    masterTl.fromTo(".game-mode-card",
      { 
        y: 60,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );

    // Floating animation for elements
    gsap.to(".float-element", {
      y: "-=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    // Rotating gears
    gsap.to(".gear-1", {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".gear-2", {
      rotation: -360,
      duration: 6,
      repeat: -1,
      ease: "none"
    });
  });

  const handleUpdateChange = (index) => {
    setIsAutoPlaying(false);
    
    // Magnetic click animation
    gsap.to(cardsRef.current[index], {
      scale: 0.85,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Advanced transition timeline
    const transitionTl = gsap.timeline();
    
    // Exit animation for current content
    transitionTl.to("#main-image, #main-content, .feature-item", {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in"
    });

    // Update state
    transitionTl.add(() => setActiveUpdate(index));

    // Particle burst effect
    transitionTl.fromTo(".transition-particle",
      { scale: 0, opacity: 1 },
      {
        scale: 2,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Enter animation for new content
    transitionTl.fromTo("#main-image, #main-content, .feature-item", 
      { 
        opacity: 0, 
        y: -40,
        scale: 1.05
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.8)"
      },
      "-=0.4"
    );
  };

  const handleCardHover = (index, isHover) => {
    if (isHover) {
      gsap.to(cardsRef.current[index], {
        y: -15,
        scale: 1.08,
        rotationY: 8,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true
      });
      
      // Hover particle effect
      gsap.fromTo(".card-particle",
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(cardsRef.current[index], {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  // Split text for advanced animation
  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="title-char inline-block transform-style-3d">{char}</span>
    ));
  };

  const PlayButton = ({ onClick }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
      if (!hoverButtonRef.current) return;
      const rect = hoverButtonRef.current.getBoundingClientRect();

      setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
      <div
        ref={hoverButtonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="border-hsla relative flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-yellow-500 px-6 py-3 text-sm uppercase text-black font-bold transition-all duration-300 hover:scale-105"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity: hoverOpacity,
            background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #ffffff88, #00000026)`,
          }}
        />
        <TiLocationArrow className="relative z-20 text-lg" />
        <p className="relative z-20 tracking-wider">PLAY NOW</p>
      </div>
    );
  };

  return (
    <section 
      id="updates-section" 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Advanced Animated Background */}
      <div className="absolute inset-0">
        {/* Circuit Board Pattern */}
        <div className="bg-circuit absolute inset-0 opacity-10 bg-[length:100px_100px] bg-circuit-pattern"></div>
        
        {/* Animated Gears */}
        <div className="gear-1 absolute top-20 right-20 w-32 h-32 opacity-5">
          <div className="w-full h-full border-2 border-yellow-500/30 rounded-full"></div>
        </div>
        <div className="gear-2 absolute bottom-32 left-24 w-24 h-24 opacity-5">
          <div className="w-full h-full border-2 border-red-500/30 rounded-full"></div>
        </div>

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="float-element absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}

        {/* Transition Particles (hidden until triggered) */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="transition-particle absolute w-2 h-2 bg-yellow-500 rounded-full opacity-0 pointer-events-none"
            style={{
              left: `${40 + (i % 4) * 10}%`,
              top: `${30 + Math.floor(i / 4) * 15}%`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Compact Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            {/* Badge */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase border border-red-400/30 shadow-lg">
                What's New 
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="special-font text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              <span className="text-gray-300">{splitText("LATEST")}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                {splitText("UPDATES")}
              </span>
            </h1>
          </div>

          {/* Tactical Divider */}
          <div className="flex items-center justify-center mt-8 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-500"></div>
            <div className="w-2 h-2 bg-yellow-500 rotate-45 mx-3"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-500"></div>
          </div>
        </div>

        {/* Main Updates Showcase */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
          {/* Main Showcase */}
          <div className="xl:col-span-2">
            <div 
              id="main-showcase"
              className="relative group perspective-1000"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-gray-600/40 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm transition-all duration-500 group-hover:border-yellow-500/50 h-[450px]">
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${updates[activeUpdate].gradient} opacity-20 mix-blend-overlay`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Image Background with Parallax Effect */}
                <div id="main-image" className="absolute inset-0 overflow-hidden">
                  <img
                    src={updates[activeUpdate].image}
                    alt={updates[activeUpdate].title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content Overlay */}
                <div id="main-content" className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-3 py-1 rounded-lg text-xs font-bold border border-yellow-300/30 tracking-wide">
                        {updates[activeUpdate].date}
                      </span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        {updates[activeUpdate].badge}
                      </span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                        {updates[activeUpdate].type}
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <h2 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight">
                    {updates[activeUpdate].title}
                  </h2>
                  <p className="text-yellow-400 text-lg font-semibold mb-4 tracking-wide font-mono">
                    {updates[activeUpdate].subtitle}
                  </p>
                  <p className="text-gray-200 text-sm leading-relaxed max-w-2xl mb-4">
                    {updates[activeUpdate].description}
                  </p>
                  
                  <PlayButton onClick={() => console.log(`Playing ${updates[activeUpdate].title}`)} />
                </div>

                {/* PUBG Corner Brackets */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-yellow-500/70"></div>
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-yellow-500/70"></div>
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-yellow-500/70"></div>
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-yellow-500/70"></div>

                {/* Card Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="card-particle absolute w-1 h-1 bg-yellow-400 rounded-full opacity-0"
                      style={{
                        left: `${20 + (i % 3) * 30}%`,
                        top: `${20 + Math.floor(i / 3) * 30}%`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 content-start">
            {updates[activeUpdate].features.map((feature, index) => (
              <div
                key={index}
                className="feature-item group"
              >
                <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/40 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-[1.02] h-full hover:bg-gray-800/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-md flex-shrink-0">
                      <span className="text-black font-black text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight tracking-wide">{feature}</h4>
                      <div className="w-6 h-0.5 bg-yellow-500/60 mt-1 transform origin-left group-hover:scale-x-125 transition-transform duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Update Cards Grid - Improved Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {updates.map((update, index) => (
            <div
              key={update.id}
              ref={el => cardsRef.current[index] = el}
              className={`update-card group cursor-pointer relative ${
                activeUpdate === index ? 'active z-10' : ''
              }`}
              onClick={() => handleUpdateChange(index)}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              {/* Active Indicator */}
              {activeUpdate === index && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full z-20 shadow-lg">
                  <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping"></div>
                </div>
              )}
              
              {/* Main Card */}
              <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 transition-all duration-300 h-full min-h-[280px] flex flex-col ${
                activeUpdate === index 
                  ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' 
                  : 'border-gray-700/50 hover:border-yellow-500/60'
              } group-hover:shadow-xl group-hover:shadow-yellow-500/10`}>
                
                {/* Image Container - Improved */}
                <div className="relative h-40 overflow-hidden flex-shrink-0">
                  <img
                    src={update.image}
                    alt={update.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/30"></div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20 shadow-lg">
                      {update.date}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 py-1 rounded-lg text-xs font-bold border border-white/20">
                      {update.type}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
                
                {/* Content - Improved Layout */}
                <div className="relative p-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-bold text-base leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                        {update.title}
                      </h4>
                      {update.badge === "HOT" && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0 ml-2"></div>
                      )}
                    </div>
                    <p className="text-yellow-400 text-sm font-semibold mb-2 tracking-wide leading-tight">
                      {update.subtitle}
                    </p>
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 mb-3">
                      {update.description}
                    </p>
                  </div>

                  {/* Features Indicator */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700/40">
                    <div className="flex items-center space-x-1">
                      {update.features.slice(0, 2).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-yellow-500/60 rounded-full"></div>
                      ))}
                      <span className="text-gray-400 text-xs">+{update.features.length - 2} more</span>
                    </div>
                    <div className="text-yellow-500 text-xs font-semibold">
                      {update.features.length} FEATURES
                    </div>
                  </div>
                </div>

                {/* Active Bottom Bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  activeUpdate === index ? 'scale-x-100' : ''
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Game Modes Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="special-font text-4xl md:text-5xl font-black text-white mb-4">
              GAME <span className="text-red-500">MODES</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Choose your playstyle! From classic battle royale to intense arena combat, 
              PUBG Mobile offers diverse modes for every type of player.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameModes.map((mode) => (
              <BentoTilt
                key={mode.id}
                className="game-mode-card h-64 rounded-2xl overflow-hidden border-2 border-gray-700/40 hover:border-yellow-500/40 transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  <img
                    src={mode.image}
                    alt={mode.title}
                    className="absolute left-0 top-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
                    <div>
                      {mode.isNew && (
                        <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                          NEW
                        </span>
                      )}
                      <h3 className="special-font text-2xl font-black mb-2">{mode.title}</h3>
                      <p className="text-sm text-gray-200 mb-3">{mode.description}</p>
                    </div>

                    {/* Bottom Info + Button */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3 text-xs">
                        <div className="flex items-center space-x-1">
                          <span>👥</span>
                          <span className="text-gray-300">{mode.players}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>⏱️</span>
                          <span className="text-gray-300">{mode.duration}</span>
                        </div>
                      </div>

                      <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-full text-xs font-bold transition-all duration-300 transform hover:scale-105">
                        PLAY
                      </button>
                    </div>
                  </div>
                </div>
              </BentoTilt>
            ))}
          </div>
        </div>

        {/* Compact Navigation */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 bg-gray-800/30 backdrop-blur-sm rounded-full p-1 border border-gray-700/40">
            {updates.map((_, index) => (
              <button
                key={index}
                onClick={() => handleUpdateChange(index)}
                className={`relative rounded-full transition-all duration-400 ${
                  activeUpdate === index 
                    ? 'w-8 bg-gradient-to-r from-yellow-500 to-orange-500 scale-110' 
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                } h-2 group`}
              >
                {activeUpdate === index && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded border border-yellow-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {updates[index].title}
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full border transition-all duration-300 text-xs ${
              isAutoPlaying 
                ? 'bg-green-500/10 border-green-500/40 text-green-400' 
                : 'bg-red-500/10 border-red-500/40 text-red-400'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="font-semibold tracking-wide">
              {isAutoPlaying ? 'AUTO' : 'MANUAL'}
            </span>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .bg-circuit-pattern {
          background-image: 
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default UpdatesSection;