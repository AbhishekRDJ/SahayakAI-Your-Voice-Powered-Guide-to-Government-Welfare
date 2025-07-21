import React, { useState } from 'react';
import { Globe, Settings, Menu, X } from 'lucide-react';
import colors from '../utils/colors';
// import Navigation from './Navigation'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' }
  ];
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (<>
    {/* <Navigation /> */}
    <header style={{ background: `linear-gradient(180deg, ${colors.blue1}, ${colors.light}, ${colors.white})` }} className="py-4 w-full overflow-hidden" >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/Logo2.png"
                  alt="SahayakAI Logo"
                  style={{ background: colors.light, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderRadius: '9999px', padding: '0.5rem', border: `2px solid ${colors.blue1}` }}
                  className="w-12 h-12"
                />
                <div className="-top-1 -right-1 absolute bg-green-500 border-2 border-white rounded-full w-4 h-4"></div>
              </div>
              <div>
                <h1 className="font-bold text-2xl tracking-tight" style={{ color: colors.blue3 }}>
                  SahayakAI
                </h1>
                <p className="font-medium text-sm" style={{ color: colors.blue2 }}>
                  सरकारी योजनाओं का साथी
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button style={{ background: colors.light, border: `1px solid ${colors.blue1}` }} className="flex items-center space-x-2 shadow-sm px-3 py-2 rounded-lg transition-colors duration-200">
                <Globe className="w-4 h-4" style={{ color: colors.blue3 }} />
                <span className="hidden sm:inline font-medium text-sm" style={{ color: colors.blue3 }}>
                  {selectedLanguage}
                </span>
              </button>
            </div>
            <button style={{ background: colors.light, border: `1px solid ${colors.blue1}` }} className="shadow-sm p-2 rounded-lg transition-colors duration-200">
              <Settings className="w-5 h-5" style={{ color: colors.blue3 }} />

            </button>
            <button
              onClick={toggleMenu}
              style={{ background: colors.light, border: `1px solid ${colors.blue1}` }}
              className="sm:hidden shadow-sm p-2 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" style={{ color: colors.blue3 }} />
              ) : (
                <Menu className="w-5 h-5" style={{ color: colors.blue3 }} />
              )}
            </button>
          </div>
        </div>
        <div className="pt-3 pb-4" style={{ borderTop: `1px solid ${colors.blue1}` }}>
          <div className="text-center">
            <p className="font-medium text-sm" style={{ color: colors.blue3 }}>
              🎯 सरकारी योजनाओं की जानकारी • Voice-Guided Assistance • 15+ Languages
            </p>
            <div className="flex justify-center items-center space-x-4 mt-2 text-xs" style={{ color: colors.blue3 }}>
              <span className="flex items-center">
                <div className="bg-green-500 mr-1 rounded-full w-2 h-2"></div>
                Online
              </span>
              <span>|</span>
              <span>24/7 Available</span>
              <span>|</span>
              <span>Free Service</span>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden shadow-lg mb-4 p-4 rounded-lg" style={{ background: colors.light, border: `1px solid ${colors.blue1}` }}>
            <div className="space-y-3">
              <div className="pb-3" style={{ borderBottom: `1px solid ${colors.blue1}` }}>
                <p className="mb-2 font-medium text-sm" style={{ color: colors.blue3 }}>Select Language</p>
                <div className="gap-2 grid grid-cols-2">
                  {languages.slice(0, 6).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.name)}
                      style={selectedLanguage === lang.name
                        ? { background: colors.blue1, color: colors.blue3, border: `1px solid ${colors.blue2}` }
                        : { background: colors.light, color: colors.blue3, border: `1px solid ${colors.blue1}` }}
                      className="p-2 rounded-md text-sm transition-colors"
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm" style={{ color: colors.blue3 }}>
                <Settings className="w-4 h-4" />
                <span>Settings & Preferences</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  </>
  );
}

export default Header;