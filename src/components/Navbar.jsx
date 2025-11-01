import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

import Button from "./Button";
import AuthModal from "./AuthModal";
import UserProfile from "./UserProfile";

const navItems = [
  { name: "Maps", link: "#maps-section" },
  { name: "Weapons", link: "#weapons-section" },
  { name: "Ranking", link: "#ranking-board" },
  { name: "Updates", link: "#updates-section" },
  { name: "About", link: "#about-section" },
  { name: "Contact", link: "#contact" },
  { name: "Download", link: "#footer" },
];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const userMenuRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    setShowUserMenu(false);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [isNavVisible]);

  // Smooth scroll behavior for section links
  const handleSmoothScroll = (e, link) => {
    e.preventDefault();
    const target = document.querySelector(link);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo and Game Modes button */}
            <div className="flex items-center gap-7">
              <img src="/img/images (1).png" alt="PUBG Mobile" className="w-10 h-10" />
              <Button
                id="product-button"
                title="Game Modes"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-red-600 md:flex hidden items-center justify-center gap-1 hover:bg-red-700"
              />
            </div>

            {/* Navigation Links and User/Audio Section */}
            <div className="flex h-full items-center space-x-6">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    onClick={(e) => handleSmoothScroll(e, item.link)}
                    className="nav-hover-btn text-white hover:text-yellow-400 mx-3 font-semibold cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* User Section */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-gray-800 rounded-full pl-3 pr-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {user.username}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                      <button
                        onClick={() => {
                          setIsProfileOpen(true);
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-700"
                      >
                        <FaUser className="mr-3" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileOpen(true);
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-700"
                      >
                        <FaCog className="mr-3" />
                        Settings
                      </button>
                      <hr className="border-gray-700 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-700"
                      >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-yellow-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:from-yellow-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  LOGIN
                </button>
              )}

              {/* Audio Button */}
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("w-1 h-6 bg-white transition-all duration-300", {
                      "h-8 bg-yellow-400": isIndicatorActive,
                    })}
                    style={{
                      animation: isIndicatorActive ? `bounce 0.5s infinite ${bar * 0.1}s` : "none",
                    }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* User Profile Modal */}
      {isProfileOpen && user && (
        <UserProfile
          user={user}
          onLogout={handleLogout}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.3); }
        }
      `}</style>
    </>
  );
};

export default NavBar;
