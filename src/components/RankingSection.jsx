// RankingSection.jsx
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useRef, useEffect } from "react";
import { 
  FaCrown, 
  FaTrophy, 
  FaSkull, 
  FaUser, 
  FaMedal, 
  FaChartLine,
  FaBoxOpen,
  FaGem,
  FaRocket,
  FaStar,
  FaFire,
  FaBolt,
  FaGamepad,
  FaAward,
  FaDragon,
  FaCrosshairs,
  FaCoins,
  FaGift,
  FaCar,
  FaBomb,
  FaUsers
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const RankingSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubCategory, setActiveSubCategory] = useState(0);
  const [selectedTimeframe, setSelectedTimeframe] = useState("season");
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const rankItemsRef = useRef([]);
  const autoPlayRef = useRef(null);

  const rankingCategories = [
    {
      id: "match",
      title: "MATCH RANKING",
      icon: FaGamepad,
      color: "yellow",
      gradient: "from-yellow-500/20 to-orange-600/20",
      borderColor: "border-yellow-500",
      bgGradient: "from-yellow-500/10 to-orange-600/10",
      textGradient: "from-yellow-400 via-orange-500 to-red-500",
      subCategories: [
        {
          id: "kills",
          title: "Most Kills",
          icon: FaSkull,
          description: "Top players by total eliminations"
        },
        {
          id: "wins",
          title: "Total Wins",
          icon: FaTrophy,
          description: "Players with most chicken dinners"
        },
        {
          id: "survival",
          title: "Survival Time",
          icon: FaUser,
          description: "Longest average survival time"
        },
        {
          id: "damage",
          title: "Damage Dealt",
          icon: FaBolt,
          description: "Highest damage per match"
        }
      ]
    },
    {
      id: "inventory",
      title: "INVENTORY RANKING",
      icon: FaBoxOpen,
      color: "orange",
      gradient: "from-orange-500/20 to-red-600/20",
      borderColor: "border-orange-500",
      bgGradient: "from-orange-500/10 to-red-600/10",
      textGradient: "from-orange-400 via-red-500 to-pink-500",
      subCategories: [
        {
          id: "mythic",
          title: "Mythic Items",
          icon: FaDragon,
          description: "Rarest mythic weapon skins"
        },
        {
          id: "legendary",
          title: "Legendary Items",
          icon: FaGem,
          description: "Legendary outfits and gear"
        },
        {
          id: "collectibles",
          title: "Collectibles",
          icon: FaCoins,
          description: "Unique collectible items"
        },
        {
          id: "achievements",
          title: "Achievements",
          icon: FaAward,
          description: "Most achievements unlocked"
        }
      ]
    },
    {
      id: "royal",
      title: "ROYAL PASS RANK",
      icon: FaCrown,
      color: "red",
      gradient: "from-red-500/20 to-rose-600/20",
      borderColor: "border-red-500",
      bgGradient: "from-red-500/10 to-rose-600/10",
      textGradient: "from-red-400 via-rose-500 to-pink-500",
      subCategories: [
        {
          id: "rp",
          title: "RP Points",
          icon: FaChartLine,
          description: "Highest Royal Pass points"
        },
        {
          id: "tiers",
          title: "Tier Progress",
          icon: FaRocket,
          description: "Fastest tier progression"
        },
        {
          id: "rewards",
          title: "Rewards Unlocked",
          icon: FaGift,
          description: "Most rewards collected"
        },
        {
          id: "challenges",
          title: "Challenges",
          icon: FaCrosshairs,
          description: "Challenge completion rate"
        }
      ]
    },
    {
      id: "special",
      title: "SPECIAL RANKING",
      icon: FaFire,
      color: "green",
      gradient: "from-green-500/20 to-emerald-600/20",
      borderColor: "border-green-500",
      bgGradient: "from-green-500/10 to-emerald-600/10",
      textGradient: "from-green-400 via-emerald-500 to-teal-500",
      subCategories: [
        {
          id: "grenade",
          title: "Grenade Kills",
          icon: FaBomb,
          description: "Most kills with grenades"
        },
        {
          id: "headshots",
          title: "Headshot Rate",
          icon: FaCrosshairs,
          description: "Highest headshot accuracy"
        },
        {
          id: "vehicle",
          title: "Vehicle Kills",
          icon: FaCar,
          description: "Most vehicle eliminations"
        },
        {
          id: "pistol",
          title: "Pistol Master",
          icon: FaCrosshairs,
          description: "Best pistol performance"
        }
      ]
    }
  ];

  // Sample ranking data
  const rankingData = {
    kills: [
      { rank: 1, name: "ShadowHunter", value: "12,847", level: 85, kd: 8.7, trend: "up", avatar: "/img/player1.jpg" },
      { rank: 2, name: "DeathBlade", value: "11,923", level: 82, kd: 7.9, trend: "up", avatar: "/img/player2.jpg" },
      { rank: 3, name: "Phantom", value: "11,456", level: 80, kd: 8.2, trend: "down", avatar: "/img/player3.jpg" },
      { rank: 4, name: "Viper", value: "10,892", level: 78, kd: 7.5, trend: "up", avatar: "/img/player4.jpg" },
      { rank: 5, name: "Raven", value: "10,567", level: 76, kd: 7.8, trend: "steady", avatar: "/img/player5.jpg" }
    ],
    wins: [
      { rank: 1, name: "Titan", value: "2,345", level: 90, kd: 9.2, trend: "up", avatar: "/img/player6.jpg" },
      { rank: 2, name: "Warlord", value: "2,189", level: 88, kd: 8.8, trend: "steady", avatar: "/img/player7.jpg" },
      { rank: 3, name: "Champion", value: "2,034", level: 85, kd: 8.5, trend: "up", avatar: "/img/player8.jpg" },
      { rank: 4, name: "Gladiator", value: "1,956", level: 83, kd: 8.1, trend: "down", avatar: "/img/player9.jpg" },
      { rank: 5, name: "Sentinel", value: "1,867", level: 81, kd: 7.9, trend: "up", avatar: "/img/player10.jpg" }
    ],
    mythic: [
      { rank: 1, name: "Collector", value: "47", level: 95, items: "284", trend: "up", avatar: "/img/player11.jpg" },
      { rank: 2, name: "Hoarder", value: "42", level: 92, items: "267", trend: "up", avatar: "/img/player12.jpg" },
      { rank: 3, name: "Treasure", value: "39", level: 90, items: "245", trend: "steady", avatar: "/img/player13.jpg" },
      { rank: 4, name: "Vault", value: "35", level: 88, items: "231", trend: "down", avatar: "/img/player14.jpg" },
      { rank: 5, name: "Keeper", value: "32", level: 86, items: "218", trend: "up", avatar: "/img/player15.jpg" }
    ],
    rp: [
      { rank: 1, name: "RoyalKing", value: "15,678", level: 100, tier: "MAX", trend: "up", avatar: "/img/player16.jpg" },
      { rank: 2, name: "PassMaster", value: "14,923", level: 98, tier: "98", trend: "up", avatar: "/img/player17.jpg" },
      { rank: 3, name: "Elite", value: "14,567", level: 96, tier: "96", trend: "steady", avatar: "/img/player18.jpg" },
      { rank: 4, name: "Premium", value: "14,234", level: 94, tier: "94", trend: "down", avatar: "/img/player19.jpg" },
      { rank: 5, name: "Advanced", value: "13,987", level: 92, tier: "92", trend: "up", avatar: "/img/player20.jpg" }
    ],
    grenade: [
      { rank: 1, name: "Bomber", value: "847", level: 82, accuracy: "68%", trend: "up", avatar: "/img/player21.jpg" },
      { rank: 2, name: "Explosive", value: "789", level: 80, accuracy: "65%", trend: "steady", avatar: "/img/player22.jpg" },
      { rank: 3, name: "Grenadier", value: "734", level: 78, accuracy: "62%", trend: "up", avatar: "/img/player23.jpg" },
      { rank: 4, name: "Demolition", value: "689", level: 76, accuracy: "59%", trend: "down", avatar: "/img/player24.jpg" },
      { rank: 5, name: "Blast", value: "645", level: 75, accuracy: "57%", trend: "up", avatar: "/img/player25.jpg" }
    ],
    rewards: [
      { rank: 1, name: "RewardKing", value: "156", level: 95, completed: "98%", trend: "up", avatar: "/img/player26.jpg" },
      { rank: 2, name: "CollectorPro", value: "142", level: 92, completed: "95%", trend: "up", avatar: "/img/player27.jpg" },
      { rank: 3, name: "BonusMaster", value: "138", level: 90, completed: "92%", trend: "steady", avatar: "/img/player28.jpg" },
      { rank: 4, name: "PrizeHunter", value: "127", level: 88, completed: "89%", trend: "down", avatar: "/img/player29.jpg" },
      { rank: 5, name: "LootExpert", value: "119", level: 86, completed: "85%", trend: "up", avatar: "/img/player30.jpg" }
    ]
  };

  const timeframes = [
    { id: "daily", label: "DAILY" },
    { id: "weekly", label: "WEEKLY" },
    { id: "season", label: "SEASON" },
    { id: "alltime", label: "ALL TIME" }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveCategory(prev => (prev + 1) % rankingCategories.length);
        setActiveSubCategory(0);
      }, 5000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, rankingCategories.length]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Master timeline for coordinated animations
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#ranking-section",
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

      // Title animation with advanced effects
      masterTl.fromTo(".title-char", 
        { 
          y: 100,
          opacity: 0,
          rotationX: -90,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.4,
          stagger: 0.02,
          ease: "back.out(2.2)"
        },
        "-=0.5"
      );

      // Categories entrance with 3D effect
      masterTl.fromTo(".ranking-category-card",
        { 
          y: 60,
          opacity: 0,
          scale: 0.8,
          rotationY: 15
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out"
        },
        "-=0.8"
      );

      // Ranking board 3D entrance
      masterTl.fromTo("#ranking-board",
        { 
          x: 100,
          opacity: 0,
          scale: 0.9,
          rotationY: -10
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out"
        },
        "-=0.6"
      );

      // Floating animations for background elements
      gsap.to(".float-element", {
        y: "-=15",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3
      });

      // Rotating gears
      gsap.to(".gear-1", {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".gear-2", {
        rotation: -360,
        duration: 8,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  });

  const handleCategoryChange = (index) => {
    setIsAutoPlaying(false);
    setIsLoading(true);
    
    // Magnetic click animation
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        scale: 0.9,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    // Advanced transition timeline
    const transitionTl = gsap.timeline();
    
    // Exit animation for current content
    transitionTl.to("#ranking-board, .rank-item, .ranking-sub-category-btn", {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in"
    });

    // Update state
    transitionTl.add(() => {
      setActiveCategory(index);
      setActiveSubCategory(0);
    });

    // Particle burst effect
    transitionTl.fromTo(".transition-particle",
      { scale: 0, opacity: 1 },
      {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Enter animation for new content
    transitionTl.fromTo("#ranking-board, .rank-item, .ranking-sub-category-btn", 
      { 
        opacity: 0, 
        y: -30,
        scale: 1.05
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.8)",
        onComplete: () => setIsLoading(false)
      },
      "-=0.4"
    );
  };

  const handleSubCategoryChange = (index) => {
    setIsLoading(true);
    
    const transitionTl = gsap.timeline();
    
    transitionTl.to("#ranking-board, .rank-item", {
      opacity: 0,
      x: -20,
      duration: 0.2,
      ease: "power2.in"
    });

    transitionTl.add(() => setActiveSubCategory(index));

    transitionTl.fromTo("#ranking-board, .rank-item", 
      { 
        opacity: 0, 
        x: 20
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => setIsLoading(false)
      }
    );
  };

  const handleCardHover = (index, isHover) => {
    if (cardsRef.current[index]) {
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
    }
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <FaCrown className="text-yellow-400" />;
      case 2: return <FaGem className="text-gray-300" />;
      case 3: return <FaMedal className="text-orange-400" />;
      default: return <span className="text-white font-bold">{rank}</span>;
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case "up": return <FaChartLine className="text-green-400" />;
      case "down": return <FaChartLine className="text-red-400 transform rotate-180" />;
      default: return <FaChartLine className="text-yellow-400" />;
    }
  };

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="title-char inline-block transform-style-3d">{char}</span>
    ));
  };

  const currentCategory = rankingCategories[activeCategory];
  const currentSubCategory = currentCategory.subCategories[activeSubCategory];
  const currentData = rankingData[currentSubCategory.id] || rankingData.kills;

  return (
    <section 
      id="ranking-section" 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Advanced Animated Background - Same as UpdatesSection */}
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

        {/* Transition Particles */}
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

        {/* Card Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="card-particle absolute w-1 h-1 bg-yellow-400 rounded-full opacity-0"
              style={{
                left: `${15 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 20}%`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Section Header - Same style as UpdatesSection */}
        <div className="text-center mb-12">
          <div className="inline-block relative mb-6">
            {/* Premium Badge */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase border border-red-400/30 shadow-lg">
                Leaderboards
              </span>
            </div>
            
            {/* Premium Main Title */}
            <h1 className="special-font text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              <span className="text-gray-300">{splitText("PLAYER")}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                {splitText("RANKING")}
              </span>
            </h1>
          </div>

          {/* Premium Tactical Divider */}
          <div className="flex items-center justify-center mt-8 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-500"></div>
            <div className="w-2 h-2 bg-yellow-500 rotate-45 mx-3"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-500"></div>
          </div>

          {/* Premium Timeframe Selector */}
          <div className="flex justify-center space-x-2 mb-12">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-bold text-sm tracking-wider ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 border-yellow-400 text-white shadow-lg scale-105'
                    : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-yellow-400/50 hover:text-white'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </div>

        {/* Premium Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Premium Categories Sidebar */}
          <div className="xl:col-span-1 space-y-4">
            {rankingCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  ref={el => cardsRef.current[index] = el}
                  className={`ranking-category-card group cursor-pointer relative perspective-1000 ${
                    activeCategory === index ? 'active z-10' : ''
                  }`}
                  onClick={() => handleCategoryChange(index)}
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                >
                  {/* Glass Morphism Category Card */}
                  <div className={`relative bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border-2 transition-all duration-500 p-4 ${
                    activeCategory === index 
                      ? `${category.borderColor} shadow-lg scale-105` 
                      : 'border-gray-700/50 group-hover:border-gray-500/50'
                  } group-hover:shadow-sm glass-card`}>
                    
                    {/* Premium Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${category.bgGradient} border ${category.borderColor}/30 shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="text-white text-lg" />
                        </div>
                        {activeCategory === index && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-md"></div>
                        )}
                      </div>
                      
                      <h3 className="text-white font-black text-lg mb-1 tracking-wide group-hover:text-gray-200 transition-colors duration-300">
                        {category.title}
                      </h3>
                      
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {category.subCategories.length} ranking types
                      </p>
                    </div>

                    {/* Active Indicator Bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.bgGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                      activeCategory === index ? 'scale-x-100' : ''
                    }`}></div>

                    {/* PUBG Corner Brackets */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-yellow-500/70"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-yellow-500/70"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-yellow-500/70"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-yellow-500/70"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Main Ranking Area */}
          <div className="xl:col-span-3">
            {/* Premium Sub Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
              {currentCategory.subCategories.map((subCategory, index) => {
                const SubIcon = subCategory.icon;
                return (
                  <button
                    key={subCategory.id}
                    onClick={() => handleSubCategoryChange(index)}
                    className={`ranking-sub-category-btn group relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border-2 transition-all duration-300 ${
                      activeSubCategory === index
                        ? 'border-yellow-500 shadow-lg scale-105'
                        : 'border-gray-700/50 hover:border-yellow-500/50'
                    } glass-card`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 transform group-hover:scale-110 transition-transform duration-300 ${
                        activeSubCategory === index ? 'scale-110' : ''
                      }`}>
                        <SubIcon className="text-white text-sm" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                          {subCategory.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-tight">
                          {subCategory.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Glass Morphism Ranking Board */}
            <div 
              id="ranking-board"
              className="relative bg-gray-800/40 backdrop-blur-sm rounded-2xl border-2 border-gray-700/50 overflow-hidden perspective-1000 glass-card"
            >
              {/* Premium Board Header */}
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-b-2 border-gray-700/50 p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg">
                      <currentCategory.icon className="text-white text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-white font-black text-2xl tracking-wide">
                        {currentCategory.title}
                      </h2>
                      <p className="text-yellow-400 font-semibold text-sm">
                        {currentSubCategory.title} • {selectedTimeframe.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 text-sm font-bold bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                      LIVE UPDATE
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Ranking List */}
              <div className="p-6 space-y-3 relative z-10">
                {currentData.map((player, index) => (
                  <div
                    key={player.rank}
                    ref={el => rankItemsRef.current[index] = el}
                    className="rank-item group relative bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/40 hover:border-yellow-500/30 transition-all duration-300 hover:bg-gray-800/50 hover:transform hover:scale-[1.02] glass-card"
                  >
                    <div className="flex items-center justify-between relative z-10">
                      {/* Premium Rank & Player Info */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-700/50 border border-gray-600/50 font-bold text-lg relative backdrop-blur-sm">
                          {getRankIcon(player.rank)}
                          {player.rank <= 3 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg relative overflow-hidden">
                            <span className="relative z-10">{player.name.charAt(0)}</span>
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-orange-700 opacity-50"></div>
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg group-hover:text-yellow-400 transition-colors duration-300">
                              {player.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                              <span>Lvl {player.level}</span>
                              <span>•</span>
                              <span>KD {player.kd || player.accuracy || player.completed}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Premium Stats & Value */}
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-white font-black text-xl tracking-wide">
                            {player.value}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {currentSubCategory.id === 'mythic' ? 'Mythic Items' : 
                             currentSubCategory.id === 'rp' ? 'RP Points' :
                             currentSubCategory.id === 'grenade' ? 'Kills' : 
                             currentSubCategory.id === 'rewards' ? 'Rewards' : 'Score'}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(player.trend)}
                          <div className={`w-2 h-2 rounded-full ${
                            player.trend === 'up' ? 'bg-green-400' :
                            player.trend === 'down' ? 'bg-red-400' : 'bg-yellow-400'
                          }`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Premium Hover Effect Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                ))}
              </div>

              {/* Premium Board Footer */}
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-t-2 border-gray-700/50 p-4 relative z-10">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-green-400" />
                    <span>5,284,937 Active Players</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaBolt className="text-yellow-400" />
                    <span>Updated just now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Morphism Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 hover:transform hover:scale-105 transition-all duration-300 glass-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-lg">Your Rank</h4>
                    <p className="text-yellow-400 text-2xl font-black">#4,237</p>
                  </div>
                  <FaChartLine className="text-yellow-400 text-2xl" />
                </div>
              </div>
              
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:transform hover:scale-105 transition-all duration-300 glass-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-lg">Progress</h4>
                    <p className="text-orange-400 text-2xl font-black">+127</p>
                  </div>
                  <FaRocket className="text-orange-400 text-2xl" />
                </div>
              </div>
              
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:transform hover:scale-105 transition-all duration-300 glass-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-lg">Next Tier</h4>
                    <p className="text-red-400 text-2xl font-black">2,345 RP</p>
                  </div>
                  <FaTrophy className="text-red-400 text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Navigation Controls */}
        <div className="flex flex-col items-center space-y-4 mt-12">
          <div className="flex items-center space-x-2 bg-gray-800/30 backdrop-blur-sm rounded-full p-1 border border-gray-700/40">
            {rankingCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(index)}
                className={`relative rounded-full transition-all duration-400 ${
                  activeCategory === index 
                    ? 'w-8 bg-gradient-to-r from-yellow-500 to-orange-500 scale-110' 
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                } h-2 group`}
              >
                {activeCategory === index && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded border border-yellow-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {rankingCategories[index].title}
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

        {/* Premium Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-yellow-500/30 shadow-2xl glass-card">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-white font-bold text-lg">Loading Rankings...</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium Custom Styles */}
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
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default RankingSection;