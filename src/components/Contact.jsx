import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ImageClipBox = ({ src, clipClass, delay = 0, glowColor = "red" }) => (
  <div 
    className={`${clipClass} opacity-0`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <img src={src} className="w-full h-full object-cover" />
    <div className={`absolute inset-0 bg-gradient-to-br from-${glowColor}-500/20 to-transparent transition-all duration-500 group-hover:opacity-100 opacity-60`}></div>
  </div>
);

const Contact = () => {
  useGSAP(() => {
    // Contact section animations
    gsap.fromTo(
      ".contact-item",
      { 
        opacity: 0, 
        y: 80,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.3,
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Floating animation for images
    gsap.to(".floating-image", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Button glow animation
    gsap.to(".contact-button", {
      boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  });

  return (
    <div id="contact" className="relative min-h-screen w-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('img/pubg-texture.jpg')] opacity-10 mix-blend-overlay"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-32 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative py-24 px-4 sm:px-10">
        {/* Main Content Container */}
        <div className="relative rounded-2xl bg-gradient-to-br from-black/95 via-red-900/20 to-black/95 py-20 text-white overflow-hidden border border-red-500/30 shadow-2xl shadow-red-500/20 backdrop-blur-sm">
          
          {/* PUBG-style Corner Brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-500/70"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-500/70"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-500/70"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-500/70"></div>

          {/* Left Combat Images */}
          <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96 contact-item">
            <div className="relative h-full floating-image">
              <ImageClipBox
                src="/img/contact-1.webp"
                clipClass="contact-clip-path-1 rounded-lg shadow-2xl shadow-red-500/40 border border-red-400/30"
                delay={200}
                glowColor="red"
              />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-400/60"></div>
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-red-400/60"></div>
            </div>
            
            <div className="relative mt-10 floating-image" style={{animationDelay: '1s'}}>
              <ImageClipBox
                src="/img/contact-2.webp"
                clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60 rounded-lg shadow-2xl shadow-yellow-500/40 border border-yellow-400/30"
                delay={400}
                glowColor="yellow"
              />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-red-400/60"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-yellow-400/60"></div>
            </div>
          </div>

          {/* Right Character Image */}
          <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80 contact-item floating-image">
            <div className="relative group">
              <ImageClipBox
                src="/img/swordman-partial.webp"
                clipClass="absolute md:scale-125 filter drop-shadow-2xl"
                delay={300}
                glowColor="red"
              />
              <ImageClipBox
                src="/img/swordman.webp"
                clipClass="sword-man-clip-path md:scale-125 filter drop-shadow-2xl"
                delay={500}
                glowColor="yellow"
              />
              {/* Combat Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-l from-red-500/10 via-yellow-500/5 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center text-center contact-item">
            {/* Section Label */}
            <div className="relative mb-10">
              <p className="font-general text-sm uppercase tracking-widest text-yellow-300 bg-gradient-to-r from-yellow-300 to-red-300 bg-clip-text text-transparent">
                Join The Battle
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full"></div>
            </div>

            {/* Animated Title */}
            <div className="relative mb-8">
              <AnimatedTitle
                title="Ready f<b>o</b>r combat? <br /> Let's d<b>o</b>minate the <br /> b<b>a</b>ttlefield t<b>o</b>gether."
                className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9] bg-gradient-to-r from-yellow-300 via-red-400 to-yellow-300 bg-clip-text text-transparent"
              />
              
              {/* Combat Text Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-red-400/20 to-yellow-300/20 blur-2xl -z-10"></div>
            </div>

            {/* Combat-themed Button */}
            <div className="relative group contact-item">
              <Button 
                title="Deploy Now" 
                containerClass="mt-10 cursor-pointer contact-button relative overflow-hidden bg-gradient-to-r from-red-600 to-yellow-500 border border-yellow-400/50 px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-white hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300"
              />
              <div className="absolute inset-0 border border-yellow-400/30 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
            </div>
            
            {/* Battle Call to Action */}
            <div className="mt-6 contact-item" style={{animationDelay: '600ms'}}>
              <p className="text-sm bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                Gear up soldier. <span className="text-yellow-300">The battle awaits.</span>
              </p>
              <div className="flex justify-center space-x-2 mt-2">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>

          {/* Animated Scan Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" 
               style={{
                 animation: 'scan 3s linear infinite',
                 boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)'
               }}></div>

          {/* Ammo Belt Decoration */}
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
        .contact-clip-path-1 {
          clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
        }
        .contact-clip-path-2 {
          clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
        }
        .sword-man-clip-path {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
      `}</style>
    </div>
  );
};

export default Contact;