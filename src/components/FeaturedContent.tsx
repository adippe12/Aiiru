import { motion } from 'motion/react';
import { Youtube, Music, Star, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const LATEST_VIDEOS = {
  tiktok: "7618948263189777686"
};

interface Video {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
}

export default function FeaturedContent() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestYoutubeVideos() {
      try {
        const response = await fetch('/api/youtube/latest/UCgiEvLJ7IuMewNaE-j83-3A');
        const data = await response.json();
        
        if (response.ok && data.items) {
          const realVideos = data.items.map((item: any) => {
            const videoId = item.id; 
            const thumbnail = item.snippet.thumbnails?.maxres?.url || 
                              item.snippet.thumbnails?.high?.url || 
                              item.snippet.thumbnails?.medium?.url || 
                              `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            return {
              id: videoId,
              title: item.snippet.title,
              link: `https://www.youtube.com/watch?v=${videoId}`,
              thumbnail: thumbnail
            };
          });

          const latestVideos = realVideos.slice(0, 5);

          setVideos(latestVideos);
        } else {
          console.error("Failed to fetch YouTube videos:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestYoutubeVideos();
  }, []);

  const mainVideo = videos.length > 0 ? videos[0] : null;
  const otherVideos = videos.slice(1);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-500 mb-4 shadow-sm">
          <Star className="w-6 h-6" />
        </div>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-3">Featured Content</h2>
        <p className="text-lg text-gray-600 italic">Check out my latest videos across socials!</p>
        <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mt-4" />
      </div>

      {/* Videos Section - Asymmetric Grid for Landscape vs Portrait */}
      <div className="grid lg:grid-cols-3 gap-8">
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
          
          {loading ? (
            <div className="w-full aspect-video rounded-2xl bg-gray-50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            </div>
          ) : mainVideo ? (
            <div className="flex flex-col gap-6">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${mainVideo.id}`}
                  title={mainVideo.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {otherVideos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                  {otherVideos.map((video) => (
                    <a 
                      key={video.id} 
                      href={video.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-3 items-start rounded-2xl transition-all"
                    >
                      <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 relative shadow-sm group-hover:shadow-md transition-all">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      </div>
                      <h4 className="font-medium text-gray-800 line-clamp-2 text-sm group-hover:text-red-600 transition-colors px-1">
                        {video.title}
                      </h4>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-inner flex items-center justify-center">
              <p className="text-gray-500 font-medium">No recent videos found</p>
            </div>
          )}
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
    </section>
  );
}
