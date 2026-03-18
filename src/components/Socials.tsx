import { motion } from 'motion/react';
import { Instagram, Youtube, Twitter, Music } from 'lucide-react';

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/aiiru_twitch/', color: 'from-pink-500 to-orange-400' },
  { name: 'TikTok', icon: Music, url: 'https://www.tiktok.com/@aiirutwitch', color: 'from-black to-gray-800' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@Aiirulol', color: 'from-red-500 to-red-600' },
  { name: 'X (Twitter)', icon: Twitter, url: 'https://x.com/Aiiru_Twitch', color: 'from-blue-400 to-blue-500' },
];

export default function Socials() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-3">Connect with Me</h2>
        <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {SOCIAL_LINKS.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br ${social.color} text-white shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <social.icon className="w-12 h-12 mb-4 drop-shadow-md" />
            <span className="font-bold text-lg tracking-wide">{social.name}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
