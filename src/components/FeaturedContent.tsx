import { motion } from 'motion/react';
import { Youtube, Music, Star } from 'lucide-react';

const LATEST_VIDEOS = {
  youtube: "OMSR2LvhvlM",
  tiktok: "7607467395124301078"
};

export default function FeaturedContent() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full text-red-500 mb-6 shadow-sm">
          <Star className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Featured Content</h2>
        <p className="text-lg text-gray-600 italic">Check out my latest videos across socials!</p>
        <div className="w-24 h-1 bg-red-300 mx-auto rounded-full mt-6" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* YouTube Embed */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-8 shadow-xl border-4 border-red-50 hover:border-red-100 transition-colors flex flex-col"
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

        {/* TikTok Embed */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-8 shadow-xl border-4 border-gray-100 hover:border-gray-200 transition-colors flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-800">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Featured TikTok</h3>
          </div>
          
          <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-gray-50 shadow-inner flex items-center justify-center">
            <iframe 
              src={`https://www.tiktok.com/embed/v2/${LATEST_VIDEOS.tiktok}`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              scrolling="no"
              allow="encrypted-media;"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
