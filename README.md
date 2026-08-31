# AI Voice Portfolio

A full-stack interactive Voice AI assistant for a developer portfolio powered by **LiveKit Agents**, **Google Gemini**, **Deepgram STT**, and **Cartesia TTS**.

---

## 🏗️ Architecture

- **Backend**: Python LiveKit Agent with Deepgram (Speech-to-Text), Silero VAD (Voice Activity Detection), Google Gemini (`gemini-3.5-flash-lite`), and Cartesia Sonic (`sonic-3` Text-to-Speech).
- **Frontend**: Next.js React voice interface using LiveKit WebRTC SDK.

---

## 🚀 Getting Started

### 1. Backend Setup

```powershell
cd backned

# Activate virtual environment
.\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Create .env.local from .env.example and populate your keys:
# LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, GOOGLE_API_KEY, DEEPGRAM_API_KEY, CARTESIA_API_KEY

# Start backend agent
python app.py start
```

### 2. Frontend Setup

```powershell
cd frontend

# Install dependencies
pnpm install # or npm install

# Create .env.local with your LiveKit credentials:
# LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, AGENT_NAME=my-agent

# Start development server
pnpm dev # or npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and click **"Start call"** to interact with the voice agent.