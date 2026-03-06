import { motion } from 'motion/react';
import { ExternalLink, Shield, Star, Loader2, Trophy, Swords } from 'lucide-react';
import { useState, useEffect } from 'react';

const PROFILES = [
  {
    ign: 'aiiru',
    tag: 'ttv',
    region: 'euw1',
    server: 'EUW',
    url: 'https://www.op.gg/summoners/euw/aiiru-ttv',
    description: 'Main Account',
    fallbackIcon: 'https://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/5496.png',
  },
  {
    ign: 'enchanter',
    tag: 'aiiru',
    region: 'euw1',
    server: 'EUW',
    url: 'https://www.op.gg/summoners/euw/enchanter-aiiru',
    description: 'Alt Account',
    fallbackIcon: 'https://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/5497.png',
  }
];

interface RiotData {
  account: { gameName: string; tagLine: string };
  summoner: { profileIconId: number; summonerLevel: number };
  league: Array<{
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
  }>;
}

function ProfileCard({ profile, index }: { profile: typeof PROFILES[0], index: number, key?: string }) {
  const [data, setData] = useState<RiotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string>('15.4.1');

  useEffect(() => {
    // Fetch latest Data Dragon version dynamically
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(res => res.json())
      .then(versions => {
        if (versions && versions.length > 0) {
          setVersion(versions[0]);
        }
      })
      .catch(() => {});

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/riot/player/${profile.region}/${profile.ign}/${profile.tag}`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          if (res.status === 403) {
            throw new Error(`Riot API Key error (403): ${errorData?.details?.status?.message || 'Forbidden'}`);
          }
          if (res.status === 401) {
            throw new Error(`Riot API Key missing or invalid (401): ${errorData?.details?.status?.message || 'Unauthorized'}`);
          }
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [profile]);

  const soloQueue = data?.league?.find(l => l.queueType === 'RANKED_SOLO_5x5');
  const winrate = soloQueue ? Math.round((soloQueue.wins / (soloQueue.wins + soloQueue.losses)) * 100) : 0;

  const iconUrl = data?.summoner?.profileIconId 
    ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data.summoner.profileIconId}.png`
    : profile.fallbackIcon;

  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative bg-[#010A13] p-[2px] shadow-2xl transition-all block"
    >
      {/* Outer Gold Border effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C8AA6E] to-[#7A5C29] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Inner Card */}
      <div className="relative h-full bg-[#091428] p-6 sm:p-8 flex flex-col gap-6">
        
        {/* Background Hextech Pattern / Glow */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#0AC8B9] rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
          {/* Profile Icon Section */}
          <div className="relative shrink-0 mt-2 sm:mt-0 flex flex-col items-center">
            <div className="relative">
              <img 
                src={iconUrl} 
                alt="Profile Icon" 
                className="w-24 h-24 rounded-full ring-2 ring-[#C8AA6E] object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Level Badge */}
              {data?.summoner?.summonerLevel && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#010A13] border border-[#C8AA6E] text-[#F0E6D2] text-xs font-bold px-3 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  {data.summoner.summonerLevel}
                </div>
              )}
            </div>
            {/* Server Badge */}
            <div className="mt-5">
              <span className="bg-[#1E2328] text-[#A09B8C] text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border border-[#3C3C41]">
                {profile.server}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 w-full flex flex-col h-full">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-2xl font-bold text-[#F0E6D2] group-hover:text-[#C8AA6E] transition-colors truncate font-display">
                {data?.account?.gameName || profile.ign} <span className="text-[#A09B8C] font-medium text-lg">#{data?.account?.tagLine || profile.tag}</span>
              </h3>
              <ExternalLink className="w-5 h-5 text-[#A09B8C] group-hover:text-[#0AC8B9] transition-colors shrink-0 ml-2" />
            </div>
            
            <p className="text-[#0AC8B9] font-medium mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Star className="w-4 h-4" />
              {profile.description}
            </p>

            {loading ? (
              <div className="flex items-center gap-2 text-[#A09B8C] text-sm mt-auto">
                <Loader2 className="w-4 h-4 animate-spin" />
                Fetching live data...
              </div>
            ) : error ? (
              <div className="text-sm p-3 rounded bg-[#1E2328] border border-[#3C3C41] text-[#A09B8C] mt-auto">
                {(error.includes('403') || error.includes('401')) ? 'Riot API Key missing or expired.' : 'Live stats unavailable.'}
              </div>
            ) : soloQueue ? (
              <div className="mt-auto bg-[#010A13]/60 rounded-xl border border-[#1E2328] p-4 sm:p-5 flex items-center gap-4 sm:gap-8 relative overflow-hidden">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                  <img 
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${soloQueue.tier.toLowerCase()}.png`}
                    alt={soloQueue.tier}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] max-w-none object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                    }}
                  />
                  <Trophy className="w-10 h-10 text-[#C8AA6E] hidden fallback-icon absolute" />
                </div>
                <div className="flex flex-col flex-1 relative z-10">
                  <span className="font-bold text-[#F0E6D2] uppercase tracking-wide text-xl sm:text-2xl leading-none mb-1.5 drop-shadow-md">
                    {soloQueue.tier} {soloQueue.rank}
                  </span>
                  <span className="text-[#C8AA6E] font-semibold text-base sm:text-lg mb-4 leading-none drop-shadow-md">{soloQueue.leaguePoints} LP</span>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm pt-3 border-t border-[#1E2328]">
                    <span className="text-[#A09B8C]">{soloQueue.wins}W <span className="mx-1">/</span> {soloQueue.losses}L</span>
                    <span className={`font-bold ${winrate >= 50 ? 'text-[#0AC8B9]' : 'text-red-400'}`}>
                      {winrate}% WR
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-[#A09B8C] bg-[#1E2328] p-3 rounded border border-[#3C3C41] mt-auto">
                Unranked in Solo/Duo
              </div>
            )}
          </div>
        </div>

        {/* OP.GG Button */}
        <div className="mt-2 pt-4 border-t border-[#1E2328] relative z-10">
          <div className="w-full py-3 bg-[#1E2328] text-[#C8AA6E] font-bold text-center group-hover:bg-[#C8AA6E] group-hover:text-[#010A13] transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-xs border border-[#3C3C41] group-hover:border-[#C8AA6E]">
            View Profile
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function LeagueProfiles() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-[#091428] border border-[#C8AA6E] rounded-full text-[#C8AA6E] mb-6 shadow-lg">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4 uppercase tracking-wider">League Profiles</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C8AA6E] to-transparent mx-auto mt-6" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {PROFILES.map((profile, index) => (
          <ProfileCard key={profile.ign} profile={profile} index={index} />
        ))}
      </div>
    </section>
  );
}
