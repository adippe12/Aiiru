import { motion } from 'motion/react';
import { Twitch } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TwitchEmbed() {
  const [parents, setParents] = useState<string>('');

  useEffect(() => {
    // Dynamically get the current hostname to satisfy Twitch embed requirements
    const hostname = window.location.hostname;
    setParents(`&parent=localhost&parent=${hostname}`);
  }, []);

  return (
    <section className="py-24 px-4 max-w-[90rem] mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-600 mb-6 shadow-sm">
          <Twitch className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Live at the Pastry Shop</h2>
        <p className="text-lg text-gray-600 italic">Come hang out and watch some cute plays!</p>
        <div className="w-24 h-1 bg-blue-300 mx-auto rounded-full mt-6" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-200 bg-black relative"
      >
        {/* Video Player */}
        <div className="w-full lg:w-3/4 aspect-video lg:aspect-auto lg:min-h-[600px] relative">
          {parents && (
            <iframe
              src={`https://player.twitch.tv/?channel=aiiru_${parents}`}
              frameBorder="0"
              allowFullScreen
              scrolling="no"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          )}
        </div>
        
        {/* Chat */}
        <div className="w-full lg:w-1/4 h-[400px] lg:h-auto border-t-4 lg:border-t-0 lg:border-l-4 border-blue-200 relative bg-white">
          {parents && (
            <iframe
              src={`https://www.twitch.tv/embed/aiiru_/chat?darkpopout${parents}`}
              frameBorder="0"
              scrolling="no"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          )}
        </div>
      </motion.div>
    </section>
  );
}
