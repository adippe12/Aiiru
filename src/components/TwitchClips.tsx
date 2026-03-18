import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Play, ExternalLink, Calendar, ArrowRightLeft } from 'lucide-react';

interface Clip {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
  vod_offset: number;
}

export default function TwitchClips() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRecent, setIsRecent] = useState(true);

  useEffect(() => {
    const fetchClips = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/twitch/clips/aiiru_?type=${isRecent ? 'recent' : 'top'}`);
        if (!response.ok) {
          throw new Error('Failed to fetch clips');
        }
        const data = await response.json();
        setClips(data.clips || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClips();
  }, [isRecent]);

  if (loading) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <button 
            onClick={() => setIsRecent(!isRecent)}
            className="relative inline-flex items-center justify-center p-4 bg-purple-100 rounded-full text-purple-600 mb-4 shadow-sm hover:scale-110 hover:bg-purple-200 transition-all cursor-pointer group"
            title={isRecent ? "Switch to Top Clips" : "Switch to Recent Vods"}
          >
            <AnimatePresence mode="wait">
              {!isRecent ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Video className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm border border-purple-100 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </div>
          </button>
          <h2 className="text-4xl font-display font-bold text-gray-800 mb-3">{isRecent ? 'Recent Vods' : 'Top Clips'}</h2>
          <div className="w-24 h-1 bg-purple-300 mx-auto rounded-full mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 animate-pulse">
              <div className="aspect-video bg-gray-200" />
              <div className="p-5">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || clips.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <button 
          onClick={() => setIsRecent(!isRecent)}
          className="relative inline-flex items-center justify-center p-4 bg-purple-100 rounded-full text-purple-600 mb-4 shadow-sm hover:scale-110 hover:bg-purple-200 transition-all cursor-pointer group"
          title={isRecent ? "Switch to Top Clips" : "Switch to Recent Vods"}
        >
          <AnimatePresence mode="wait">
            {!isRecent ? (
              <motion.div
                key="video"
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Video className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm border border-purple-100 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </div>
        </button>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-3">{isRecent ? 'Recent Vods' : 'Top Clips'}</h2>
        <p className="text-lg text-gray-600 italic">{isRecent ? 'Latest moments from the Pastry Shop!' : 'Best moments from the Pastry Shop!'}</p>
        <div className="w-24 h-1 bg-purple-300 mx-auto rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clips.map((clip, index) => (
          <motion.a
            key={clip.id}
            href={clip.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-all hover:-translate-y-1 block"
          >
            <div className="relative aspect-video overflow-hidden bg-gray-900">
              <img
                src={clip.thumbnail_url}
                alt={clip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="bg-purple-600 text-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                {clip.view_count.toLocaleString()} views
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                {clip.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Clipped by {clip.creator_name}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
