import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

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
