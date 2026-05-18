import { motion, AnimatePresence } from 'motion/react';
import { Twitch, Star, Coffee, Cake, Cookie, Croissant, Radio, Heart, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

const AVATAR_URL = '/pfp.jpg';
const BANNER_URL = '/banner.jpg';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
  </svg>
);

const FALLING_ITEMS = [Cake, Cookie, Croissant, Star, Heart, Gift];

export default function Hero() {
  const [isLive, setIsLive] = useState(false);
  const [streamInfo, setStreamInfo] = useState<any>(null);
  
  const [clicks, setClicks] = useState(0);
  const [isBirthday, setIsBirthday] = useState(false);
  const [fallingElements, setFallingElements] = useState<any[]>([]);

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
    const interval = setInterval(fetchStatus, 120000);
    return () => clearInterval(interval);
  }, []);

  // FUNZIONE EASTER EGG
  const handleAvatarClick = () => {
    if (isBirthday) return; // Evita spam se è già attivo
    
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks === 5) {
      setIsBirthday(true);
      const elements = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        Icon: FALLING_ITEMS[Math.floor(Math.random() * FALLING_ITEMS.length)],
        left: `${Math.random() * 100}vw`,
        animationDuration: 3 + Math.random() * 4, // tra 3 e 7 secondi
        delay: Math.random() * 2,
        size: 24 + Math.random() * 24, 
        color: ['text-pink-400', 'text-blue-400', 'text-yellow-400', 'text-cyan-400'][Math.floor(Math.random() * 4)]
      }));
      setFallingElements(elements);
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pb-24">
      
      <AnimatePresence>
        {isBirthday && (
          <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden fixed">
            {fallingElements.map((el) => (
              <motion.div
                key={el.id}
                initial={{ top: '-10vh', left: el.left, rotate: 0, opacity: 1 }}
                animate={{ top: '110vh', rotate: 360, opacity: 0 }}
                transition={{ 
                  duration: el.animationDuration, 
                  delay: el.delay, 
                  ease: 'linear',
                  repeat: Infinity
                }}
                className={`absolute ${el.color}`}
              >
                <el.Icon style={{ width: el.size, height: el.size }} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Background Banner */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#f0f9ff] z-10" />
        <img 
          src={BANNER_URL} 
          alt="AIIRU Banner" 
          className="w-full h-full object-cover opacity-60 blur-[2px]"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Pastries (Normali) */}
        {!isBirthday && (
          <>
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 md:left-32 text-blue-300/50 z-10">
              <Cake className="w-16 h-16 md:w-24 md:h-24" />
            </motion.div>
            <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-32 right-10 md:right-32 text-cyan-300/50 z-10">
              <Cookie className="w-12 h-12 md:w-20 md:h-20" />
            </motion.div>
            <motion.div animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-40 right-10 md:right-34 text-sky-300/40 z-10">
              <Croissant className="w-14 h-14 md:w-20 md:h-20" />
            </motion.div>
          </>
        )}
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
            <motion.div className="absolute -top-4 -right-4 z-30 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-red-500/40 border-2 border-white">
              <Radio className="w-3 h-3 animate-pulse" />
              ON AIR
            </motion.div>
          )}
          
          <div className={`absolute -inset-2 rounded-full blur-xl opacity-50 animate-pulse ${isBirthday ? 'bg-gradient-to-tr from-pink-400 to-yellow-400' : isLive ? 'bg-gradient-to-tr from-red-400 to-purple-400' : 'bg-gradient-to-tr from-blue-400 to-cyan-400'}`} />
          
          <motion.img 
            onClick={handleAvatarClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={AVATAR_URL} 
            alt="AIIRU Avatar" 
            className={`cursor-pointer w-40 h-40 md:w-48 md:h-48 rounded-full border-4 shadow-2xl relative z-10 object-cover transition-colors duration-500 ${isBirthday ? 'border-pink-400' : isLive ? 'border-red-400' : 'border-white'}`}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {!isBirthday ? (
            <motion.h1 
              key="normal"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mt-8 text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600"
            >
              AIIRU
            </motion.h1>
          ) : (
            <motion.h1 
              key="birthday"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="mt-8 text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500"
            >
              HAPPY B-DAY!
            </motion.h1>
          )}
        </AnimatePresence>

        <motion.h2 className="mt-2 text-xl md:text-2xl font-semibold text-blue-800/80">
          League of Legends · High Elo Player · Enchanter Main
        </motion.h2>
        <motion.h2 className="mt-2 text-xl md:text-2xl font-semibold text-blue-800/80">
          Riot Partner · VTuber 
        </motion.h2>

        {isBirthday && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-4 text-pink-600 font-bold bg-pink-100/80 px-6 py-2 rounded-full border border-pink-200"
          >
            Happy Birthday Ruru! Wishing the sweetest birthday to the best streamer - Adippe
          </motion.p>
        )}

        {isLive && streamInfo ? (
          <motion.div className="mt-4 bg-white/80 backdrop-blur-sm border border-red-100 px-6 py-3 rounded-2xl shadow-sm inline-block max-w-xl">
            <p className="text-red-600 font-medium text-sm mb-1">Currently streaming {streamInfo.game_name}</p>
            <p className="text-gray-800 font-bold line-clamp-1">{streamInfo.title}</p>
            <p className="text-gray-500 text-xs mt-1">{streamInfo.viewer_count} viewers</p>
          </motion.div>
        ) : (
          <motion.p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed italic">
            "Welcome to the Pastry Shop! Cozy vibes, good plays, and cute company on the Rift."
          </motion.p>
        )}

        <motion.div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="https://twitch.tv/aiiru_" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg ${isLive ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30 animate-pulse' : 'bg-[#9146FF] hover:bg-[#772ce8] shadow-purple-500/30'}`}>
            <Twitch className="w-5 h-5" />
            {isLive ? 'Watch Live Now' : 'Watch Live'}
          </a>
          <a href="https://discord.gg/DYHV36PH25" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white rounded-full font-bold hover:bg-[#4752C4] transition-all hover:scale-105 shadow-lg shadow-indigo-500/30">
            <DiscordIcon className="w-5 h-5" />
            Join Pastry Shop
          </a>
          <a href="https://ko-fi.com/aiiru" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-blue-500 border-2 border-blue-100 rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-lg">
            <Coffee className="w-5 h-5" />
            Support Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
