import React from 'react'
import { useState } from 'react';
import { Mic, Menu } from 'lucide-react';

function Navigation() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Smooth scroll to How It Works section
    const handleHowItWorksScroll = (e) => {
        e.preventDefault();
        const section = document.getElementById('how-it-works');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            {/* Navigation */}
            <nav className="top-0 z-50 fixed bg-[#FFFBDE]/90 backdrop-blur-sm border-[#91C8E4]/20 border-b w-full">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="flex justify-center items-center bg-[#4682A9] rounded-full w-8 h-8">
                                <Mic className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-[#4682A9] text-xl">Sahayak AI</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-[#749BC2] hover:text-[#4682A9] transition-colors">Features</a>
                            <a href="/schemes" className="text-[#749BC2] hover:text-[#4682A9] transition-colors">Scheme</a>
                            <a href="#about" className="text-[#749BC2] hover:text-[#4682A9] transition-colors">About</a>
                            <a href="#how-it-works" className="text-[#749BC2] hover:text-[#4682A9] transition-colors" onClick={handleHowItWorksScroll}>How it Works</a>
                            <a href="#contact" className="text-[#749BC2] hover:text-[#4682A9] transition-colors">Contact</a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-[#749BC2]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-[#91C8E4]/20 border-t">
                            <div className="flex flex-col space-y-4">
                                <a href="#features" className="text-[#749BC2] hover:text-[#4682A9] transition-colors">Features</a>
                                <a href="#how-it-works" className="text-[#749BC2] hover:text-[#4682A9] transition-colors" onClick={(e) => { setIsMenuOpen(false); handleHowItWorksScroll(e); }}>How it Works</a>
                                <a href="#contact" className="text-[#749BC2] hover:text-[#4682A9] transition-colors">Contact</a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navigation