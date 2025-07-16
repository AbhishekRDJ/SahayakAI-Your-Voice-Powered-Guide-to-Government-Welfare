import React, { useState } from 'react';
import { Globe, Settings, Menu, X } from 'lucide-react';

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
  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg border-b border-blue-200 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/Logo2.png"
                  alt="SahayakAI Logo"
                  className="bg-white shadow-md p-2 rounded-full ring-2 ring-blue-200 w-12 h-12"
                />
                <div className="-top-1 -right-1 absolute bg-green-500 border-2 border-white rounded-full w-4 h-4"></div>
              </div>
              <div>
                <h1 className="font-bold text-blue-800 text-2xl tracking-tight">
                  SahayakAI
                </h1>
                <p className="font-medium text-blue-600 text-sm">
                  सरकारी योजनाओं का साथी
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 bg-white hover:bg-blue-50 shadow-sm px-3 py-2 border border-blue-200 rounded-lg transition-colors duration-200">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline font-medium text-blue-800 text-sm">
                  {selectedLanguage}
                </span>
              </button>
            </div>
            <button className="bg-white hover:bg-blue-50 shadow-sm p-2 border border-blue-200 rounded-lg transition-colors duration-200">
              <Settings className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={toggleMenu}
              className="sm:hidden bg-white hover:bg-blue-50 shadow-sm p-2 border border-blue-200 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-blue-600" />
              ) : (
                <Menu className="w-5 h-5 text-blue-600" />
              )}
            </button>
          </div>
        </div>
        <div className="pt-3 pb-4 border-t border-blue-200">
          <div className="text-center">
            <p className="font-medium text-blue-700 text-sm">
              🎯 सरकारी योजनाओं की जानकारी • Voice-Guided Assistance • 15+ Languages
            </p>
            <div className="flex justify-center items-center space-x-4 mt-2 text-blue-600 text-xs">
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
          <div className="sm:hidden bg-white shadow-lg mb-4 p-4 border border-blue-200 rounded-lg">
            <div className="space-y-3">
              <div className="pb-3 border-b border-blue-100">
                <p className="mb-2 font-medium text-blue-800 text-sm">Select Language</p>
                <div className="gap-2 grid grid-cols-2">
                  {languages.slice(0, 6).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.name)}
                      className={`p-2 rounded-md text-sm transition-colors ${selectedLanguage === lang.name
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
                        }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3 text-blue-600 text-sm">
                <Settings className="w-4 h-4" />
                <span>Settings & Preferences</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;