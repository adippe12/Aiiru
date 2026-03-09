import { motion } from 'motion/react';
import { ShieldAlert, Star, Crown, Heart, MessageCircle, Gift, Tv, Users, PlayCircle, BadgeCheck, X, Twitch } from 'lucide-react';

const POSITIVE_RULES = [
  "English Only",
  "Follow Twitch Rules",
  "Respect Everybody",
  "Bring Good Vibes"
];

const NEGATIVE_RULES = [
  "No Negativity",
  "No Drama",
  "No Spoilers",
  "No Self Promo",
  "No Backseating",
  "No Hate/ Harassment, I am sensitive"
];

const TIER1_PERKS = [
  { icon: Tv, text: "I stream for you my offline LoL's games on discord." },
  { icon: BadgeCheck, text: "Get special roles and special badges on discord." },
  { icon: Heart, text: "Unlock the emotes and use them around Twitch and Discord channels." },
  { icon: Crown, text: "Unlock sub badges." },
  { icon: MessageCircle, text: "You can join the Pastry Shop Clients telegram." },
  { icon: Users, text: "We play together on stream." },
  { icon: ShieldAlert, text: "No AD." },
  { icon: Star, text: "You can have me in your LoL friendlist (EUW)." },
  { icon: Gift, text: "Gain ''sweets'' channel points faster to get all the rewards you want." },
  { icon: PlayCircle, text: "You can pause/go back in my LIVE stream." }
];

export default function RulesPerks() {
  return (
    <section className="pt-12 pb-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        
        {/* Subscriber Perks */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-cyan-100 relative overflow-hidden flex flex-col items-center w-full"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-200 rounded-tr-full opacity-30" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full mb-8">
            <img 
              src="/subscribe.png" 
              alt="Subscribe panel" 
              className="w-full max-w-[280px] object-contain drop-shadow-md" 
            />

            <motion.a
              href="https://www.twitch.tv/subs/aiiru_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex items-center gap-3 bg-[#9146FF] hover:bg-[#772CE8] text-white px-8 py-4 rounded-full font-bold text-xl shadow-[0_8px_20px_rgba(145,70,255,0.4)] hover:shadow-[0_12px_25px_rgba(145,70,255,0.6)] transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              <Twitch className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Subscribe Now</span>
              <Heart className="w-5 h-5 fill-white animate-pulse relative z-10" />
            </motion.a>
          </div>

          <div className="w-full relative z-10 flex flex-col gap-6">
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-3xl border border-cyan-100 shadow-sm w-full">
              <h3 className="text-xl font-bold text-cyan-800 mb-4 flex items-center gap-2 justify-center">
                <Crown className="w-6 h-6" /> Tier 1
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {TIER1_PERKS.map((perk, index) => (
                  <div key={index} className="flex flex-col items-center text-center gap-2 text-gray-700 font-medium bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <perk.icon className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                    <span className="text-xs leading-tight">{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl text-white shadow-lg relative overflow-hidden group w-full max-w-2xl mx-auto text-center">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2 justify-center">
                <Crown className="w-6 h-6 fill-white" /> Tier 2/3
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-medium text-cyan-50">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Sub badge's special decorations.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Dedicated discord role.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stream Rules */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border-4 border-blue-100 relative overflow-hidden flex flex-col items-center w-full max-w-3xl mx-auto"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100 rounded-bl-full opacity-50" />
          
          <img 
            src="/rules.png" 
            alt="Rules panel" 
            className="w-full max-w-[280px] object-contain mb-8 relative z-10 drop-shadow-md" 
          />
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 relative z-10 w-full">
            <div className="flex flex-col gap-2.5">
              {POSITIVE_RULES.map((rule, index) => (
                <motion.div 
                  key={`pos-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-blue-50/50 px-4 py-3 rounded-2xl border border-blue-100/50"
                >
                  <Heart className="w-4 h-4 text-blue-400 fill-blue-400 flex-shrink-0" />
                  <span>{rule}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col gap-2.5">
              {NEGATIVE_RULES.map((rule, index) => (
                <motion.div 
                  key={`neg-${index}`}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-red-50/50 px-4 py-3 rounded-2xl border border-red-100/50"
                >
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 stroke-[3]" />
                  <span>{rule}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
