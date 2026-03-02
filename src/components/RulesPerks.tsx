import { motion } from 'motion/react';
import { ShieldAlert, Star, Crown, Heart, MessageCircle, Gift, Tv, Users } from 'lucide-react';

const RULES = [
  "No backseating.",
  "No negativity in chat (I don't like complaints).",
  "Respect everybody.",
  "Follow Twitch rules."
];

const PERKS = [
  { icon: Tv, text: "Offline LoL streams on Discord" },
  { icon: Crown, text: "Special roles & badges" },
  { icon: Heart, text: "Unlock emotes everywhere" },
  { icon: ShieldAlert, text: "Ad-free viewing" },
  { icon: Users, text: "Play together on stream" },
  { icon: MessageCircle, text: "Access to Pastry Shop Telegram" },
  { icon: Star, text: "LoL friendlist (EUW)" },
  { icon: Gift, text: "Earn channel points (sweets) faster" }
];

export default function RulesPerks() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        
        {/* Stream Rules */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-4 border-pink-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full opacity-50" />
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-4 bg-pink-100 rounded-2xl text-pink-500">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Stream Rules</h2>
          </div>
          
          <ul className="space-y-6 relative z-10">
            {RULES.map((rule, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 text-lg text-gray-700 font-medium"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center font-bold border-2 border-pink-200">
                  {index + 1}
                </span>
                <span className="pt-1">{rule}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Subscriber Perks */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-[3rem] p-10 md:p-14 shadow-2xl border-4 border-purple-100 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-200 rounded-tr-full opacity-30" />
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-4 bg-purple-200 rounded-2xl text-purple-600 shadow-inner">
              <Star className="w-8 h-8 fill-purple-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Sub Perks</h2>
          </div>

          <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm">
            <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5" /> Tier 1
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {PERKS.map((perk, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700 font-medium bg-white p-3 rounded-xl shadow-sm">
                  <perk.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-sm">{perk.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5 fill-white" /> Tier 2/3
            </h3>
            <p className="font-medium text-purple-50">
              Special sub-badge decorations and a dedicated Discord role.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
