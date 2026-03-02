import { motion } from 'motion/react';
import { Youtube, Music, Star, Heart, Shield, Gift, CreditCard, Users } from 'lucide-react';

const LATEST_VIDEOS = {
  youtube: "OMSR2LvhvlM",
  tiktok: "7607467395124301078"
};

const PANELS = [
  {
    id: 'about',
    titleImage: 'https://panels.twitch.tv/panel-1295086456-image-0afb4380-aa76-4fdc-9108-2b04631146e9',
    
  },
  {
    id: 'donate',
    titleImage: 'https://panels.twitch.tv/panel-1295086456-image-6133a5a1-b8cf-4084-b259-cec201284f72',
    content: (
      <div className="text-gray-700 space-y-4 leading-relaxed">
        <p>Donations are never required but always incredibly appreciated! They help me improve the stream and buy more pastries.</p>
        <p className="text-xs italic text-gray-400 mt-4">*Please note that all donations are non-refundable.</p>
      </div>
    )
  },
  {
    id: 'wishlist',
    titleImage: 'https://panels.twitch.tv/panel-1295086456-image-3530c58a-9f42-4b29-9201-34bc50327781',
    content: (
      <div className="text-gray-700 space-y-4 leading-relaxed">
        <p>Want to send a gift? Check out my Throne wishlist!</p>
      </div>
    )
  }
];

export default function FeaturedContent() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-pink-100 rounded-full text-pink-500 mb-6 shadow-sm">
          <Star className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Featured Content</h2>
        <p className="text-lg text-gray-600 italic">Check out my latest videos across socials!</p>
        <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full mt-6" />
      </div>

      {/* Videos Section - Asymmetric Grid for Landscape vs Portrait */}
      <div className="grid lg:grid-cols-3 gap-8 mb-32">
        {/* YouTube Embed - Landscape (Takes 2 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white rounded-[3rem] p-6 sm:p-8 shadow-xl border-4 border-red-50 hover:border-red-100 transition-colors flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 rounded-xl text-red-600">
              <Youtube className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Latest on YouTube</h3>
          </div>
          
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${LATEST_VIDEOS.youtube}`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>

        {/* TikTok Embed - Portrait (Takes 1 column) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 bg-white rounded-[3rem] p-6 sm:p-8 shadow-xl border-4 border-gray-100 hover:border-gray-200 transition-colors flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-800">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Featured TikTok</h3>
          </div>
          
          <div className="w-full flex-grow rounded-2xl overflow-hidden bg-gray-50 shadow-inner flex items-center justify-center min-h-[500px]">
            <iframe 
              src={`https://www.tiktok.com/embed/v2/${LATEST_VIDEOS.tiktok}`}
              className="w-full h-full min-h-[500px]"
              frameBorder="0"
              allowFullScreen
              scrolling="no"
              allow="encrypted-media;"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* Info Panels Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Stream Info</h2>
        <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full mt-6" />
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
              <div className="bg-white rounded-3xl p-6 pt-8 shadow-lg border-2 border-pink-50 w-full relative z-0 flex-grow">
                {panel.content}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
