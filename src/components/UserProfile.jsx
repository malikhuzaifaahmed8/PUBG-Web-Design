// UserProfile.jsx
import { useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const UserProfile = ({ user, onLogout, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

  useGSAP(() => {
    gsap.fromTo("#profile-modal",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  });

  const stats = {
    matches: 1247,
    wins: 89,
    kills: 2456,
    kd: 2.1,
    rank: 'Diamond II'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div id="profile-modal" className="bg-gray-900 rounded-2xl w-full max-w-4xl border border-gray-700 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                <p className="text-white/80">Level 58 • {stats.rank}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex space-x-8 px-6">
            {['profile', 'stats', 'settings', 'inventory'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Player Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-400 text-sm">Username</label>
                    <p className="text-white font-semibold">{user.username}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Player ID</label>
                    <p className="text-white font-semibold">5169872345</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Rank</label>
                    <p className="text-yellow-500 font-semibold">{stats.rank}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">{stats.wins}</div>
                    <div className="text-gray-400 text-sm">Wins</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">{stats.kills}</div>
                    <div className="text-gray-400 text-sm">Kills</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">{stats.kd}</div>
                    <div className="text-gray-400 text-sm">K/D Ratio</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">{stats.matches}</div>
                    <div className="text-gray-400 text-sm">Matches</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Detailed Statistics</h3>
              <div className="space-y-4">
                {[
                  { label: 'Total Matches', value: stats.matches, color: 'blue' },
                  { label: 'Win Rate', value: `${((stats.wins/stats.matches)*100).toFixed(1)}%`, color: 'green' },
                  { label: 'Top 10 Rate', value: '42.3%', color: 'yellow' },
                  { label: 'Headshot Rate', value: '18.7%', color: 'red' }
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">{stat.label}</span>
                      <span className="text-white font-bold">{stat.value}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-${stat.color}-500`}
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Account Settings</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                  <span className="text-white">Push Notifications</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                  <span className="text-white">Friend Requests</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                  <span className="text-white">Show Online Status</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4 flex justify-between">
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #4B5563;
          transition: .4s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #10B981;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
};

export default UserProfile;