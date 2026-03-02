import { motion } from 'motion/react';
import { Heart, ExternalLink } from 'lucide-react';

const CREDITS = [
  { role: "Alerts", name: "awigui", link: "https://ko-fi.com/awigui" },
  { role: "Alerts Sound", name: "TOFIEmusic", link: "https://x.com/tofiemusic" },
  { role: "Offline Screen & Dolphin Emote", name: "Lillimon", link: "https://x.com/_Lillimon_" },
  { role: "Channel Points & Tier Flair", name: "ShoYukia", link: "https://www.etsy.com/it/shop/ShoYukia" },
  { role: "Sub Badges", name: "scrimsy", link: "https://www.etsy.com/shop/scrimsy" },
  { role: "League Emotes", name: "cinamoncune", link: "https://ko-fi.com/cinamoncune" },
  { role: "Animated Emotes", name: "EmoteLab", link: "" },
  { role: "Bunny Emotes", name: "LittoBug", link: "https://x.com/littobug" },
  { role: "Other Emotes", name: "sonshine_arts", link: "https://ko-fi.com/sonshine_arts" },
  { role: "Scenes & Panels", name: "skiiryu", link: "https://vgen.co/skiiryu/shop" },
  { role: "Background Art", name: "Kiwi", link: "https://x.com/kiwiqwq0" },
  { role: "Christmas Badges", name: "Ariixiu", link: "https://www.etsy.com/shop/Ariixiu" },
  { role: "Bit Badges", name: "PegaDesign", link: "https://www.etsy.com/shop/PegaDesign" },
  { role: "HUD League Overlay", name: "lunariachi", link: "https://x.com/lunariachi" },
  { role: "PFP & Banner", name: "veramuki", link: "https://x.com/vera_muki" }
];

export default function Credits() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16 flex flex-col items-center">
        <img 
          src="https://panels.twitch.tv/panel-1295086456-image-713d0ce1-08eb-4cec-9cdf-ceb120c0cd07" 
          alt="Credits panel" 
          className="w-full max-w-[320px] object-contain mb-6 drop-shadow-md" 
        />
        <p className="text-lg text-gray-600 italic">Thank you for making the Pastry Shop beautiful!</p>
        <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full mt-6" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {CREDITS.map((credit, index) => {
          const CardContent = (
            <div className="flex flex-col h-full justify-between">
              <div className="mb-2">
                <h3 className="text-[10px] sm:text-xs font-bold text-pink-400 uppercase tracking-wider mb-1 line-clamp-2">
                  {credit.role}
                </h3>
                <p className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-pink-600 transition-colors truncate">
                  {credit.name}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-pink-50">
                <Heart className="w-4 h-4 text-pink-200 group-hover:text-pink-400 transition-colors" />
                {credit.link && (
                  <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-pink-400 transition-colors" />
                )}
              </div>
            </div>
          );

          const cardClasses = "bg-white p-4 rounded-xl shadow-sm border border-pink-50 hover:shadow-md hover:border-pink-200 transition-all group h-full";

          return (
            <motion.div
              key={credit.role}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -3, scale: 1.02 }}
            >
              {credit.link ? (
                <a 
                  href={credit.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block ${cardClasses}`}
                >
                  {CardContent}
                </a>
              ) : (
                <div className={cardClasses}>
                  {CardContent}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
