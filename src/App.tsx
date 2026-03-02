/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
      <footer className="bg-pastry-dark text-pastry-pink py-12 text-center mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <img 
            src="https://panels.twitch.tv/panel-1295086456-image-24bbaf75-1894-4db0-a109-c8360947e629" 
            alt="Pastry Shop Logo" 
            className="h-24 mx-auto mb-6 opacity-80 hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <p className="font-display font-bold text-xl mb-2">AIIRU - The Pastry Shop</p>
          <p className="text-pink-200/60 text-sm">Cozy vibes, cute plays, and good company on the Rift.</p>
        </div>
      </footer>
    </div>
  );
}
