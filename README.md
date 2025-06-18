# JoeBot – Voice Interview AI

A personality-rich, phone-like voicebot web app powered by GPT-4.1 and ElevenLabs TTS. Simulates a natural, continuous conversation for job interviews and more.

## Features
- 🎙️ **Continuous Voice Input** (no need to click to talk)
- 🧠 **GPT-4.1 Integration** (custom system prompt for Joe's personality)
- 🗣️ **ElevenLabs TTS** (supports voice cloning for realistic, emotional speech)
- 🔁 **Dialogue Loop** (auto-restarts listening after bot speaks)
- 💻 **Modern, Mobile-Friendly UI** (light/dark mode, avatar, chat bubbles)

## Setup
1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/joebot.git
   cd joebot
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Add environment variables:**
   Create a `.env` file in the root:
   ```env
   REACT_APP_OPENAI_API_KEY=your-openai-api-key-here
   REACT_APP_ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
   REACT_APP_ELEVENLABS_VOICE_ID=your-elevenlabs-voice-id-here
   ```
   - Get your OpenAI API key from https://platform.openai.com/
   - Get your ElevenLabs API key and voice ID from https://elevenlabs.io/

4. **Start the app locally:**
   ```bash
   npm start
   ```
   The app runs at [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel/Netlify)
1. **Push your code to GitHub.**
2. **Connect your repo on [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).**
3. **Add the same environment variables in the dashboard.**
4. **Deploy and get your live link!**

## Notes
- Works on Chrome (Web Speech API required for voice input).
- No login required. Just click Start and talk!
- For best TTS, use your ElevenLabs cloned voice.

---

**Built for Home.LLC interview by Joe.** 