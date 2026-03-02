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
      className="group relative bg-white rounded-[2rem] p-8 shadow-xl border-2 border-blue-50 hover:border-blue-200 hover:shadow-2xl transition-all overflow-hidden block"
    >
      {/* Background Decoration */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
        <div className="relative shrink-0">
          <img 
            src={iconUrl} 
            alt="Profile Icon" 
            className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {profile.server}
          </div>
          {data?.summoner?.summonerLevel && (
            <div className="absolute -top-3 -left-3 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
              Lvl {data.summoner.summonerLevel}
            </div>
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
              {data?.account?.gameName || profile.ign} <span className="text-gray-400 font-medium">#{data?.account?.tagLine || profile.tag}</span>
            </h3>
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0 ml-2" />
          </div>
          
          <p className="text-pink-500 font-medium mb-4 flex items-center gap-2">
            <Star className="w-4 h-4" />
            {profile.description}
          </p>

          {loading ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Fetching live data...
            </div>
          ) : error ? (
            <div className={`text-sm p-3 rounded-xl border ${(error.includes('403') || error.includes('401')) ? 'text-red-600 bg-red-50 border-red-100' : 'text-gray-500 bg-gray-50 border-gray-100'}`}>
              {(error.includes('403') || error.includes('401')) ? 'Riot API Key missing or expired. Please update it in Secrets.' : 'Live stats unavailable. Click to view on OP.GG.'}
            </div>
          ) : soloQueue ? (
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-gray-800 capitalize">
                    {soloQueue.tier.toLowerCase()} {soloQueue.rank}
                  </span>
                </div>
                <span className="text-blue-600 font-bold">{soloQueue.leaguePoints} LP</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Swords className="w-4 h-4" />
                  <span>{soloQueue.wins}W {soloQueue.losses}L</span>
                </div>
                <span className={`font-bold ${winrate >= 50 ? 'text-green-500' : 'text-red-500'}`}>
                  {winrate}% Win Rate
                </span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
              Unranked in Solo/Duo
            </div>
          )}
        </div>
      </div>

      {/* OP.GG Button */}
      <div className="mt-6 relative z-10">
        <div className="w-full py-3 bg-blue-50 text-blue-600 font-bold text-center rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors flex items-center justify-center gap-2">
          View on OP.GG
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </motion.a>
  );
}

export default function LeagueProfiles() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-500 mb-6 shadow-sm">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">League of Legends Profiles</h2>
        <div className="w-24 h-1 bg-blue-300 mx-auto rounded-full mt-6" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {PROFILES.map((profile, index) => (
          <ProfileCard key={profile.ign} profile={profile} index={index} />
        ))}
      </div>
    </section>
  );
}
