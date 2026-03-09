import { motion } from 'motion/react';
import { Heart, ExternalLink } from 'lucide-react';

const CREDITS = [
  { role: "Live 2D Art & Rig", name: "Kitto", link: "https://x.com/kitto_jpg" },
  { role: "Live 2D Design", name: "Teyyami", link: "https://x.com/teyyami" },
  { role: "Alerts", name: "Tanporo", link: "https://x.com/_tanporo_" },
  { role: "Alerts Sound", name: "TOFIEmusic", link: "https://x.com/tofiemusic" },
  { role: "offline screen art, starting and ending scene, background in lobby scene art & dolphin dance emote", name: "Lillimon", link: "https://x.com/_Lillimon_" },
  { role: "background art in game scene", name: "icorasama", link: "https://x.com/icorasama" },
  { role: "Channel Points & Tier Flair", name: "ShoYukia", link: "https://www.etsy.com/it/shop/ShoYukia?ref=shop-header-name&listing_id=1852544810&from_page=listing" },
  { role: "Badges", name: "scrimsy", link: "https://www.etsy.com/shop/scrimsy" },
  { role: "Milio & Lulu Emotes", name: "SViSHOP", link: "https://www.etsy.com/shop/SViSHOP#items" },
  { role: "Soraka & Yuumi Emotes", name: "cinamoncune", link: "https://ko-fi.com/cinamoncune" },
  { role: "Animated Emotes", name: "EmoteLab on steam", link: "" },
  { role: "Bunny Emotes", name: "LittoBug", link: "https://x.com/littobug" },
  { role: "Other Emotes", name: "sonshine_arts", link: "https://ko-fi.com/sonshine_arts" },
  { role: "Static Aiiru Emotes", name: "shylestials", link: "https://x.com/shylestials" },
  { role: "Frieren Emotes", name: "LinaKaizumi", link: "https://ko-fi.com/linakaizumi/shop" },
  { role: "Panels", name: "AssetShop", link: "https://www.etsy.com/shop/AssetShop" },
  { role: "Bit Badges", name: "PegaDesign", link: "https://www.etsy.com/shop/PegaDesign" },
  { role: "HUD League Overlay", name: "lunariachi", link: "https://x.com/lunariachi" },
  { role: "PFP", name: "velirys", link: "https://x.com/velirys" },
  { role: "Banner", name: "TishyChanVT", link: "https://x.com/TishyChanVT" },
  { role: "Logo", name: "MikaLogo", link: "https://x.com/MikaLogo" }
];

export default function Credits() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16 flex flex-col items-center">
        <img 
          src="/credits.png" 
          alt="Credits panel" 
          className="w-full max-w-[320px] object-contain mb-6 drop-shadow-md" 
        />
        <p className="text-lg text-gray-600 italic">Thank you for making the Pastry Shop beautiful!</p>
        <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mt-6" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {CREDITS.map((credit, index) => {
          const CardContent = (
            <div className="flex flex-col h-full justify-between">
              <div className="mb-2">
                <h3 
                  className="text-[10px] sm:text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 line-clamp-2 group-hover:line-clamp-none transition-all"
                  title={credit.role}
                >
                  {credit.role}
                </h3>
                <p className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate" title={credit.name}>
                  {credit.name}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-blue-50">
                <Heart className="w-4 h-4 text-blue-300 group-hover:text-blue-500 transition-colors" />
                {credit.link && (
                  <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
                )}
              </div>
            </div>
          );

          const cardClasses = "bg-white p-4 rounded-xl shadow-sm border border-blue-50 hover:shadow-md hover:border-blue-200 transition-all group h-full";

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
