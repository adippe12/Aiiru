import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let twitchAccessToken = "";
let twitchTokenExpiry = 0;

async function getTwitchToken() {
  if (Date.now() < twitchTokenExpiry && twitchAccessToken) {
    return twitchAccessToken;
  }
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Twitch credentials not configured");
  }
  const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`);
  twitchAccessToken = response.data.access_token;
  twitchTokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;
  return twitchAccessToken;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Twitch API Proxy
  app.get("/api/twitch/status/:username", async (req, res) => {
    try {
      const token = await getTwitchToken();
      const clientId = process.env.TWITCH_CLIENT_ID!;
      const { username } = req.params;
      
      const userRes = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!userRes.data.data.length) {
        return res.status(404).json({ error: "User not found" });
      }
      const user = userRes.data.data[0];
      
      const streamRes = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, {
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${token}`
        }
      });
      
      const isLive = streamRes.data.data.length > 0;
      const stream = isLive ? streamRes.data.data[0] : null;
      
      res.json({ user, isLive, stream });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch Twitch status", details: error.message });
    }
  });

  app.get("/api/twitch/clips/:username", async (req, res) => {
    try {
      const token = await getTwitchToken();
      const clientId = process.env.TWITCH_CLIENT_ID!;
      const { username } = req.params;
      
      const userRes = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!userRes.data.data.length) {
        return res.status(404).json({ error: "User not found" });
      }
      const user = userRes.data.data[0];
      
      const clipsRes = await axios.get(`https://api.twitch.tv/helix/clips?broadcaster_id=${user.id}&first=6`, {
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${token}`
        }
      });
      
      res.json({ clips: clipsRes.data.data });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch Twitch clips", details: error.message });
    }
  });

  // YouTube API Proxy
  app.get("/api/youtube/latest/:channelId", async (req, res) => {
    try {
      const apiKey = process.env.YOUTUBE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "YOUTUBE_API_KEY not configured" });
      }
      
      const { channelId } = req.params;
      
      // Fetch latest videos using YouTube Data API v3
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          key: apiKey,
          channelId: channelId,
          part: 'snippet',
          order: 'date',
          maxResults: 10, // Fetch a few extra to account for filtering
          type: 'video'
        }
      });
      
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch YouTube videos", details: error.message });
    }
  });

  // Riot API Proxy
  app.get("/api/riot/player/:region/:gameName/:tagLine", async (req, res) => {
    const { region, gameName, tagLine } = req.params;
    const apiKey = process.env.RIOT_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "RIOT_API_KEY not configured" });
    }

    // Map routing values (americas, asia, europe, sea) based on region
    const platformToRegion: Record<string, string> = {
      na1: 'americas',
      br1: 'americas',
      la1: 'americas',
      la2: 'americas',
      euw1: 'europe',
      eun1: 'europe',
      tr1: 'europe',
      ru: 'europe',
      kr: 'asia',
      jp1: 'asia',
      oc1: 'sea',
      ph2: 'sea',
      sg2: 'sea',
      th2: 'sea',
      tw2: 'sea',
      vn2: 'sea',
    };

    const routing = platformToRegion[region.toLowerCase()] || 'americas';

    try {
      // 1. Get PUUID via Riot ID (Account-V1)
      const accountUrl = `https://${routing}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
      
      const accountRes = await axios.get(accountUrl, { 
        headers: { "X-Riot-Token": apiKey } 
      });
      
      const { puuid, gameName: actualName, tagLine: actualTag } = accountRes.data;

      // 2. Get Summoner by PUUID (Summoner-V4)
      const summonerUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;

      const summonerRes = await axios.get(summonerUrl, { 
        headers: { "X-Riot-Token": apiKey } 
      });
      
      const summonerData = summonerRes.data;
      
      const summonerId = summonerData.id;

      // 3. Get League Entries (Rank) (League-V4)
      // Using the new by-puuid endpoint!
      const leagueUrl = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`;

      const leagueRes = await axios.get(leagueUrl, { 
        headers: { "X-Riot-Token": apiKey } 
      });
      const leagueData = leagueRes.data;

      res.json({
        account: { gameName: actualName, tagLine: actualTag },
        summoner: summonerData,
        league: leagueData,
      });
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ 
        error: "Failed to fetch Riot data",
        details: error.response?.data || error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
