import { motion } from 'motion/react';
import { CalendarHeart, Sparkles, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface Update {
  id: string;
  title: string;
  date: string;
  description: string;
}

const ROTATIONS = ['-rotate-2', 'rotate-2', '-rotate-1'];

export default function NoticeBoard() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/api/notion/updates', { method: 'POST' });
        if (response.ok) {
          const data = await response.json();
          setUpdates(data.updates || []);
        }
      } catch (err) {
        console.error("Failed to fetch updates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  if (!loading && updates.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-10 relative">
        <motion.div 
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center p-3 bg-pink-500 rounded-full text-white mb-4 shadow-[0_0_20px_rgba(236,72,153,0.4)] border-4 border-pink-200"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-3 tracking-wide">Latest Updates</h2>
        <p className="text-lg text-pink-600 font-medium italic">~ Today's specials & announcements ~</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
        </div>
      ) : (
        <div className="relative group/slider">
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-40 bg-white/90 p-3 rounded-full shadow-xl hover:bg-white text-pink-500 hidden md:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity border border-pink-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div 
            ref={scrollContainerRef} 
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 -mx-4 hide-scrollbar" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {updates.map((update, index) => {
              const isNew = (new Date().getTime() - new Date(update.date).getTime()) < (3 * 24 * 60 * 60 * 1000);
              const dateObj = new Date(update.date);
              const hasTime = update.date.includes('T');
              const dateStr = dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'long' });
              const timeStr = hasTime ? dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
              const displayDate = hasTime ? `${dateStr} at ${timeStr}` : dateStr;

              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 3) * 0.15, type: 'spring', bounce: 0.4 }}
                  className={`relative group shrink-0 w-full md:w-[calc(33.333%-1rem)] snap-center ${ROTATIONS[index % 3]} hover:rotate-0 transition-all duration-300 z-10 hover:z-20`}
                >
                  {/*Pin*/}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 drop-shadow-md">
                    <div className="w-6 h-6 rounded-full bg-red-400 border-2 border-red-200 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white/50" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-[#FFFBFB] rounded-2xl p-6 md:p-8 shadow-[5px_10px_20px_rgba(0,0,0,0.08)] border-t-[12px] border-pink-200 group-hover:shadow-[10px_20px_30px_rgba(0,0,0,0.12)] group-hover:-translate-y-2 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                    
                    {isNew && (
                      <div className="absolute top-4 right-[-30px] bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-10 rotate-45 shadow-sm">
                        NEW!
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-4">
                      <CalendarHeart className="w-5 h-5 text-pink-400 shrink-0" />
                      <span className="text-sm font-bold text-pink-500 uppercase tracking-widest border-b border-pink-100 pb-1 truncate">
                        {displayDate}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4 font-display leading-tight">
                      {update.title}
                    </h3>
                    
                    <div className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-wrap flex-grow bg-pink-50/50 p-4 rounded-xl border border-pink-100/50 font-medium">
                      {update.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-40 bg-white/90 p-3 rounded-full shadow-xl hover:bg-white text-pink-500 hidden md:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity border border-pink-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
