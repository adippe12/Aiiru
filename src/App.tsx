/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Heart, Star, Sparkles } from 'lucide-react';
import Hero from './components/Hero';
import Socials from './components/Socials';
import LeagueProfiles from './components/LeagueProfiles';
import FeaturedContent from './components/FeaturedContent';
import RulesPerks from './components/RulesPerks';
import TwitchEmbed from './components/TwitchEmbed';
import Credits from './components/Credits';

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-pink-200 selection:text-pink-900">
      <Hero />
      <Socials />
      <LeagueProfiles />
      <TwitchEmbed />
      <FeaturedContent />
      <RulesPerks />
      <Credits />
      
      {/* Footer */}
      <footer className="relative bg-pastry-dark text-pastry-pink pt-20 pb-12 text-center mt-32 overflow-hidden">
        {/* Decorative floating icons */}
        <Heart className="absolute top-16 left-[15%] w-6 h-6 text-pink-400/40 animate-pulse" />
        <Star className="absolute top-28 right-[20%] w-5 h-5 text-yellow-300/40 animate-bounce" />
        <Sparkles className="absolute bottom-16 left-[25%] w-5 h-5 text-purple-300/40" />
        <Heart className="absolute bottom-24 right-[15%] w-8 h-8 text-pink-400/30 -rotate-12" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: -5 }}
            src="https://panels.twitch.tv/panel-1295086456-image-24bbaf75-1894-4db0-a109-c8360947e629" 
            alt="Pastry Shop Logo" 
            className="h-28 sm:h-32 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer"
            referrerPolicy="no-referrer"
          />
          <h3 className="font-display font-bold text-3xl mb-3 text-white tracking-wide">
            AIIRU <span className="text-pink-400 mx-1">♡</span> The Pastry Shop
          </h3>
          <p className="text-pink-100/80 text-lg max-w-md mx-auto mb-8 leading-relaxed">
            Cozy vibes, cute plays, and good company on the Rift. Grab a pastry and stay a while! 🍰✨
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-pink-200/50 font-medium">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>for the Pastry Shop community</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
