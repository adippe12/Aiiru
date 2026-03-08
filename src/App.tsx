/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Heart, Star, Sparkles, Menu, X, Cake } from 'lucide-react';
import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Socials from './components/Socials';
import LeagueProfiles from './components/LeagueProfiles';
import FeaturedContent from './components/FeaturedContent';
import RulesPerks from './components/RulesPerks';
import TwitchEmbed from './components/TwitchEmbed';
import TwitchClips from './components/TwitchClips';
import Credits from './components/Credits';
import BunnyFollower from './components/BunnyFollower';
import StreamInfo from './components/StreamInfo';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Live', href: '#live' },
  { name: 'Socials', href: '#socials' },
  { name: 'League', href: '#league' },
  { name: 'Content', href: '#content' },
  { name: 'Clips', href: '#clips' },
  { name: 'Info', href: '#info' },
  { name: 'Credits', href: '#credits' },
];

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#home" className="font-display font-bold text-xl text-blue-600 flex items-center gap-2">
            <Cake className="w-5 h-5" />
            AIIRU
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm pt-20 px-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium text-gray-800 p-4 border-b border-gray-100 active:bg-blue-50 rounded-xl"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900">
      <Navigation />
      <BunnyFollower />
      
      <main className="flex flex-col">
        <div id="home" className="scroll-mt-20">
          <Hero />
        </div>
        
        <div id="live" className="scroll-mt-20 bg-white border-b border-blue-100/50">
          <TwitchEmbed />
        </div>

        <div id="socials" className="scroll-mt-20 bg-gradient-to-b from-blue-50/50 to-transparent">
          <Socials />
        </div>

        <div id="league" className="scroll-mt-20 bg-white border-y border-blue-100/50">
          <LeagueProfiles />
        </div>

        <div id="content" className="scroll-mt-20 bg-gradient-to-b from-blue-50/50 to-transparent">
          <FeaturedContent />
        </div>

        <div id="clips" className="scroll-mt-20 bg-white border-y border-blue-100/50">
          <TwitchClips />
        </div>

        <div id="info" className="scroll-mt-20 bg-gradient-to-b from-blue-50/50 to-transparent">
          <StreamInfo />
          <RulesPerks />
        </div>

        <div id="credits" className="scroll-mt-20 bg-white border-y border-blue-100/50">
          <Credits />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative bg-pastry-dark text-pastry-pink pt-20 pb-12 text-center mt-32 overflow-hidden">
        {/* Decorative floating icons */}
        <Heart className="absolute top-16 left-[15%] w-6 h-6 text-blue-400/40 animate-pulse" />
        <Star className="absolute top-28 right-[20%] w-5 h-5 text-yellow-300/40 animate-bounce" />
        <Sparkles className="absolute bottom-16 left-[25%] w-5 h-5 text-cyan-300/40" />
        <Heart className="absolute bottom-24 right-[15%] w-8 h-8 text-blue-400/30 -rotate-12" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: -5 }}
            src="https://panels.twitch.tv/panel-1295086456-image-a7760270-5fb0-4f5b-9b08-041bb9d15314" 
            alt="Pastry Shop Logo" 
            className="h-28 sm:h-32 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(3,144,252,0.3)] transition-all cursor-pointer"
            referrerPolicy="no-referrer"
          />
          <h3 className="font-display font-bold text-3xl mb-3 text-white tracking-wide">
            AIIRU <span className="text-blue-400 mx-1">♡</span> The Pastry Shop
          </h3>
          <p className="text-blue-100/80 text-lg max-w-md mx-auto mb-8 leading-relaxed">
            Cozy vibes, cute plays, and good company on the Rift. Grab a pastry and stay a while! 🍰✨
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200/50 font-medium">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span>for the Pastry Shop community</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
