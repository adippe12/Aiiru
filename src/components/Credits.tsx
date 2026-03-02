import { motion } from 'motion/react';
import { Palette, Heart } from 'lucide-react';

const CREDITS = [
  { role: "Alerts", name: "awigui" },
  { role: "Alerts Sound", name: "TOFIEmusic" },
  { role: "Offline Screen & Dolphin Emote", name: "Lillimon" },
  { role: "Channel Points & Tier Flair", name: "ShoYukia" },
  { role: "Sub Badges", name: "scrimsy" },
  { role: "League Emotes", name: "cinamoncune" },
  { role: "Animated Emotes", name: "EmoteLab" },
  { role: "Bunny Emotes", name: "LittoBug" },
  { role: "Other Emotes", name: "sonshine_arts" },
  { role: "Scenes & Panels", name: "skiiryu" },
  { role: "Background Art", name: "Kiwi" },
  { role: "Christmas Badges", name: "Ariixiu" },
  { role: "Bit Badges", name: "PegaDesign" },
  { role: "HUD League Overlay", name: "lunariachi" },
  { role: "PFP & Banner", name: "veramuki" }
];

export default function Credits() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-pink-100 rounded-full text-pink-500 mb-6 shadow-sm">
          <Palette className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Artists & Contributors</h2>
        <p className="text-lg text-gray-600 italic">Thank you for making the Pastry Shop beautiful!</p>
        <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full mt-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {CREDITS.map((credit, index) => (
          <motion.div
            key={credit.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-pink-50 hover:shadow-xl hover:border-pink-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-2">
                  {credit.role}
                </h3>
                <p className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                  {credit.name}
                </p>
              </div>
              <Heart className="w-5 h-5 text-pink-200 group-hover:text-pink-400 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
