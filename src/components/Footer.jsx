// Updated Footer.jsx
import { FaDiscord, FaTwitter, FaYoutube, FaInstagram, FaFacebook, FaGooglePlay, FaAppStore } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.gg/pubg", icon: <FaDiscord />, name: "Discord" },
  { href: "https://twitter.com/PUBGMOBILE", icon: <FaTwitter />, name: "Twitter" },
  { href: "https://youtube.com/PUBGMOBILE", icon: <FaYoutube />, name: "YouTube" },
  { href: "https://instagram.com/PUBGMOBILE", icon: <FaInstagram />, name: "Instagram" },
  { href: "https://facebook.com/PUBGMOBILE", icon: <FaFacebook />, name: "Facebook" },
];

const footerSections = [
  {
    title: "GAME INFO",
    links: [
      { name: "Maps", href: "#maps" },
      { name: "Weapons", href: "#weapons" },
      { name: "Vehicles", href: "#vehicles" },
      { name: "Game Modes", href: "#modes" },
    ]
  },
  {
    title: "SUPPORT",
    links: [
      { name: "Help Center", href: "#help" },
      { name: "Contact Us", href: "#contact" },
      { name: "Report Bug", href: "#bug" },
      { name: "Community", href: "#community" },
    ]
  },
  {
    title: "LEGAL",
    links: [
      { name: "Terms of Service", href: "#terms" },
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "EULA", href: "#eula" },
    ]
  }
];

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-r from-gray-900 to-black text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/img/images (1).png" alt="PUBG Mobile" className="w-12 h-12 mr-3" />
              <div>
                <h3 className="text-2xl font-bold text-yellow-400">PUBG MOBILE</h3>
                <p className="text-gray-400 text-sm">BATTLEGROUNDS</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The most intense battle royale experience on mobile. Join 100 million players worldwide in the ultimate survival shooter.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:scale-110"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-yellow-400 font-bold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Download Section */}
          <div>
            <h4 className="text-yellow-400 font-bold text-lg mb-4">DOWNLOAD</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors duration-200"
              >
                <FaGooglePlay className="text-2xl mr-3 text-green-400" />
                <div>
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="text-white font-semibold">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors duration-200"
              >
                <FaAppStore className="text-2xl mr-3 text-blue-400" />
                <div>
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-white font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300">Get the latest news about updates, events, and tournaments</p>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-64"
              />
              <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors duration-200 whitespace-nowrap">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 PUBG MOBILE. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>1,245,897 Players Online</span>
              </div>
              <span>•</span>
              <span>Version 2.8.0</span>
            </div>
          </div>
        </div>

        {/* Age Rating */}
        <div className="text-center mt-6 pt-6 border-t border-gray-800">
          <div className="inline-flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-yellow-400 font-bold">18+</span>
            <span className="text-gray-400 text-sm">Violence • Blood • In-Game Purchases</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;