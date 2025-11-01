import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Initial animation
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(".floating-element",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Floating animation
    gsap.to(".float-element", {
      y: "-=10",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 800,
      ease: "power1.out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    const element = frameRef.current;
    
    if (element) {
      gsap.to(element, {
        duration: 0.4,
        scale: 1.03,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.4,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "power2.out",
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      id="story" 
      className="relative min-h-screen w-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Background Texture - Same as Contact */}
      <div className="absolute inset-0 bg-[url('img/pubg-texture.jpg')] opacity-10 mix-blend-overlay"></div>
      
      {/* Animated Background Elements - Same as Contact */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-red-500 rounded-full animate-pulse opacity-60 float-element"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-40 float-element" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-50 float-element" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-32 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-30 float-element" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative py-16 px-4">
        {/* Main Container - Same style as Contact */}
        <div className="relative rounded-2xl bg-gradient-to-br from-black/95 via-red-900/20 to-black/95 py-16 text-white overflow-hidden border border-red-500/30 shadow-2xl shadow-red-500/20 backdrop-blur-sm max-w-6xl mx-auto">
          
          {/* PUBG-style Corner Brackets - Same as Contact */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-500/70"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-500/70"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-500/70"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-500/70"></div>

          {/* Animated Scan Line - Same as Contact */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" 
               style={{
                 animation: 'scan 3s linear infinite',
                 boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)'
               }}></div>

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Section Label - Same style as Contact */}
            <div className="relative mb-8 floating-element">
              <p className="font-general text-sm uppercase tracking-widest text-yellow-300 bg-gradient-to-r from-yellow-300 to-red-300 bg-clip-text text-transparent">
                Our Battle Vision
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full"></div>
            </div>

            {/* Animated Title - Same style as Contact */}
            <div className="relative mb-8 floating-element">
              <AnimatedTitle
                title="Strategic <b>V</b>ictory <br /> Through <b>I</b>nnovation"
                className="special-font !text-4xl md:!text-5xl !font-black !leading-[.9] bg-gradient-to-r from-yellow-300 via-red-400 to-yellow-300 bg-clip-text text-transparent"
              />
              
              {/* Combat Text Glow - Same as Contact */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-red-400/20 to-yellow-300/20 blur-2xl -z-10"></div>
            </div>

            {/* Floating Image Container */}
            <div className="story-img-container relative mt-8 mb-8 floating-element w-full max-w-2xl">
              <div className="story-img-mask relative">
                {/* Border Effects */}
                <div className="absolute -inset-3 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-xl opacity-50 blur-sm"></div>
                <div className="absolute -inset-1 border border-red-500/30 rounded-lg"></div>
                
                {/* Main Image Container */}
                <div className="story-img-content relative bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-red-500/20">
                  <img
                    ref={frameRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    src="/img/854917.jpg"
                    alt="Strategic Vision"
                    className="object-cover w-full h-full transition-all duration-400"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  {isHovering && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-yellow-500/10 to-transparent pointer-events-none"></div>
                  )}
                  
                  {/* PUBG Corner Indicators - Same style */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-yellow-400"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-red-400"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-yellow-400"></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-red-400"></div>
                  
                  {/* Ammo Counter Style Info - Same as Contact theme */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 border border-yellow-500/30 rounded px-4 py-1">
                    <span className="text-yellow-400 text-sm font-mono tracking-wider">TACTICAL BRIEFING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-4 floating-element w-full max-w-xl">
              <div className="flex flex-col items-center text-center bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 relative">
                <p className="text-gray-200 leading-relaxed font-light">
                  <span className="text-yellow-300 font-medium">Elite strategies</span> meet cutting-edge innovation in our 
                  battlefield approach. We deploy advanced tactics and precision execution 
                  to ensure <span className="text-red-300">victory in every engagement</span>.
                </p>

                <Button
                  id="mission-btn"
                  title="View Mission Brief"
                  containerClass="mt-6 contact-button relative overflow-hidden bg-gradient-to-r from-red-600 to-yellow-500 border border-yellow-400/50 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-white hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300"
                />
                
                {/* Battle Stats - Same theme */}
                <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-red-500/20">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-300">150+</div>
                    <div className="text-xs text-gray-400">Missions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-300">98%</div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-300">5+</div>
                    <div className="text-xs text-gray-400">Campaigns</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Battle Call to Action - Same as Contact */}
            <div className="mt-6 floating-element">
              <p className="text-sm bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                Ready for deployment. <span className="text-yellow-300">The mission awaits.</span>
              </p>
              <div className="flex justify-center space-x-2 mt-2">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>

          {/* Ammo Belt Decoration - Same as Contact */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-40">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-2 h-4 bg-yellow-600 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .story-img-container {
          perspective: 1000px;
        }
        
        .story-img-mask {
          transform-style: preserve-3d;
        }
        
        .story-img-content {
          transform-style: preserve-3d;
          box-shadow: 
            0 10px 30px -5px rgba(239, 68, 68, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .floating-element {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default FloatingImage;