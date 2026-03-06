import { motion } from 'motion/react';
import { Twitch, MessageCircle, Star, Coffee, Cake, Cookie, Croissant } from 'lucide-react';

const AVATAR_URL = 'https://yt3.googleusercontent.com/G0dVQHPl9WGYmn7N4ESDzmbHqHXkHkAkbZafqfjnPE9o9LwIGAg34ZTyQLNwrhqo5ZnY91VQnA=s160-c-k-c0x00ffffff-no-rj';
const BANNER_URL = 'https://yt3.googleusercontent.com/vbt1bMn1GGNIBcjU7G-M0bzeSmW2uVYGcC6IWce2g-_0teWraNravFta1VtjZcIxtwH6gsABRw=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Banner */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/80 to-blue-50 z-10" />
        <img 
          src={BANNER_URL} 
          alt="AIIRU Banner" 
          className="w-full h-full object-cover opacity-60 blur-[2px]"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Pastries */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 md:left-32 text-blue-300/50 z-10"
        >
          <Cake className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-10 md:right-32 text-cyan-300/50 z-10"
        >
          <Cookie className="w-12 h-12 md:w-20 md:h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-20 md:right-48 text-sky-300/40 z-10"
        >
          <Croissant className="w-14 h-14 md:w-20 md:h-20" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
          <img 
            src={AVATAR_URL} 
            alt="AIIRU Avatar" 
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-2xl relative z-10 object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600"
        >
          AIIRU
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-xl md:text-2xl font-semibold text-blue-800/80"
        >
          Enchanter Main · League of Legends
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed italic"
        >
          "Welcome to the Pastry Shop! Cozy vibes, cute plays, and good company on the Rift."
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a 
            href="https://twitch.tv/aiiru_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#9146FF] text-white rounded-full font-bold hover:bg-[#772ce8] transition-all hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            <Twitch className="w-5 h-5" />
            Watch Live
          </a>
          <a 
            href="https://discord.gg/DYHV36PH25" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white rounded-full font-bold hover:bg-[#4752C4] transition-all hover:scale-105 shadow-lg shadow-indigo-500/30"
          >
            <MessageCircle className="w-5 h-5" />
            Join Pastry Shop
          </a>
          <a 
            href="https://ko-fi.com/aiiru" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-500 border-2 border-blue-100 rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
          >
            <Coffee className="w-5 h-5" />
            Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
