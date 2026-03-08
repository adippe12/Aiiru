import { motion } from 'motion/react';
import { Twitch, Star, Coffee, Cake, Cookie, Croissant, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

const AVATAR_URL = 'https://raw.githubusercontent.com/adippe12/aiiruData/refs/heads/main/pfp.jpg';
const BANNER_URL = 'https://raw.githubusercontent.com/adippe12/aiiruData/refs/heads/main/banner.jpg';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
  </svg>
);


export default function Hero() {
  const [isLive, setIsLive] = useState(false);
  const [streamInfo, setStreamInfo] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/twitch/status/aiiru_');
        if (response.ok) {
          const data = await response.json();
          setIsLive(data.isLive);
          setStreamInfo(data.stream);
        }
      } catch (err) {
        console.error('Failed to fetch Twitch status', err);
      }
    };

    fetchStatus();
    // Poll every 2 minutes
    const interval = setInterval(fetchStatus, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pb-24">
      {/* Background Banner */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#f0f9ff] z-10" />
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
          className="absolute top-40 right-10 md:right-34 text-sky-300/40 z-10"
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
          {isLive && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-4 -right-4 z-30 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-red-500/40 border-2 border-white"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              ON AIR
            </motion.div>
          )}
          <div className={`absolute -inset-2 rounded-full blur-xl opacity-50 animate-pulse ${isLive ? 'bg-gradient-to-tr from-red-400 to-purple-400' : 'bg-gradient-to-tr from-blue-400 to-cyan-400'}`} />
          <img 
            src={AVATAR_URL} 
            alt="AIIRU Avatar" 
            className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-4 shadow-2xl relative z-10 object-cover ${isLive ? 'border-red-400' : 'border-white'}`}
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
          League of Legends · Enchanter Main
        </motion.h2>

        {isLive && streamInfo ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-4 bg-white/80 backdrop-blur-sm border border-red-100 px-6 py-3 rounded-2xl shadow-sm inline-block max-w-xl"
          >
            <p className="text-red-600 font-medium text-sm mb-1">Currently streaming {streamInfo.game_name}</p>
            <p className="text-gray-800 font-bold line-clamp-1">{streamInfo.title}</p>
            <p className="text-gray-500 text-xs mt-1">{streamInfo.viewer_count} viewers</p>
          </motion.div>
        ) : (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed italic"
          >
            "Welcome to the Pastry Shop! Cozy vibes, cute plays, and good company on the Rift."
          </motion.p>
        )}

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
            className={`flex items-center gap-2 px-6 py-3 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg ${isLive ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30 animate-pulse' : 'bg-[#9146FF] hover:bg-[#772ce8] shadow-purple-500/30'}`}
          >
            <Twitch className="w-5 h-5" />
            {isLive ? 'Watch Live Now' : 'Watch Live'}
          </a>
          <a 
            href="https://discord.gg/DYHV36PH25" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white rounded-full font-bold hover:bg-[#4752C4] transition-all hover:scale-105 shadow-lg shadow-indigo-500/30"
          >
            <DiscordIcon className="w-5 h-5" />
            join pastry shop discord
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
