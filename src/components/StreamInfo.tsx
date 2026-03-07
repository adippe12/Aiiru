import { motion } from 'motion/react';
import { Heart, Gift } from 'lucide-react';

const PANELS = [
  {
    id: 'about',
    titleImage: 'https://panels.twitch.tv/panel-1295086456-image-0afb4380-aa76-4fdc-9108-2b04631146e9',
  },
  {
    id: 'donate',
    titleImage: 'https://panels.twitch.tv/panel-1295086456-image-6133a5a1-b8cf-4084-b259-cec201284f72',
    content: (
      <div className="text-gray-700 space-y-4 leading-relaxed flex flex-col h-full">
        <p>Donations are never required but always incredibly appreciated! They help me improve the stream and buy more pastries.</p>
        <p className="text-xs italic text-gray-400 mt-4">*Please note that all donations are non-refundable.</p>
        <div className="mt-auto pt-6">
          <a 
            href="https://ko-fi.com/aiiru" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <Heart className="w-5 h-5" />
            Support on Ko-fi
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'wishlist',
    titleImage: 'https://panels.twitch.tv/panel-1295086456-image-3530c58a-9f42-4b29-9201-34bc50327781',
    content: (
      <div className="text-gray-700 space-y-4 leading-relaxed flex flex-col h-full">
        <p>Want to send a gift? Check out my Throne wishlist!</p>
        <div className="mt-auto pt-6">
          <a 
            href="https://throne.com/Aiiru" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <Gift className="w-5 h-5" />
            Support on Throne
          </a>
        </div>
      </div>
    )
  }
];

export default function StreamInfo() {
  return (
    <section className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Stream Info</h2>
        <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mt-6" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PANELS.map((panel, i) => (
          <motion.div 
            key={panel.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center h-full"
          >
            {/* Twitch Panel Header Image */}
            <img 
              src={panel.titleImage} 
              alt={`${panel.id} panel`} 
              className={`w-full max-w-[320px] object-contain relative z-10 drop-shadow-md hover:scale-105 transition-transform duration-300 ${panel.content ? 'mb-[-10px]' : ''}`} 
            />
            
            {/* Panel Content Box */}
            {panel.content && (
              <div className="bg-white rounded-3xl p-6 pt-8 shadow-lg border-2 border-blue-50 w-full relative z-0 flex-grow">
                {panel.content}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
