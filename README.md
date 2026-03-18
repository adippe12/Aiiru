# Aiiru - The Pastry Shop 🍰✨

The website for VTuber and Twitch Streamer **Aiiru**. Features live Twitch status, real-time League of Legends rank tracking, latest YouTube videos, and a Notion-powered notice board.

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion
- **Backend (API Proxy):** Express.js (handles CORS and API rate limits)
- **Integrations:** Twitch API, Riot Games API, YouTube Data API v3, Notion API

## ⚙️ Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   TWITCH_CLIENT_ID="your_twitch_client_id"
   TWITCH_CLIENT_SECRET="your_twitch_secret"
   YOUTUBE_API_KEY="your_youtube_api_key"
   RIOT_API_KEY="your_riot_api_key"
   NOTION_API_KEY="your_notion_secret"
   NOTION_DATABASE_ID="your_notion_database_id"
   ```

## Running the App

**Development Mode:**

```bash
npm run dev
```

_Starts both the Express API proxy and Vite frontend. Open `http://localhost:3000`._

**Production Build:**

```bash
npm run build
NODE_ENV=production npm start
```

_Builds the React app and serves static files through the Express server._

```

```
