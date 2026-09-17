import { Project } from './types';

export const voiceAgentPortfolioArchitecture: Project = {
  id: 'voice-agent-portfolio-architecture',
  title: 'Real-Time Voice AI Portfolio & Agentic Web Architecture',
  category: 'Agentic AI',
  period: 'Jan 2026 – Present',
  tagline: 'Ultra-low latency (<500ms TTFT) conversational WebRTC voice assistant with real-time UI auto-navigation, Groq LPU primary inference, and resilient dual-cloud fallback architecture.',
  description: 'Architected and built this interactive voice-driven engineering portfolio. Combines Next.js 15 App Router and LiveKit WebRTC in the browser with an asynchronous Python agent backend deployed on Render, utilizing Groq LPU (Qwen 2.5/3.8) for sub-100ms LLM first-token generation, Deepgram Nova-3 speech recognition, Cartesia Sonic-3 ultra-fast text-to-speech, and automatic Google Gemini 2.5 Flash fallback.',
  overview: 'A production-grade, state-of-the-art multimodal web portfolio designed to give recruiters, researchers, and engineering leaders an instant hands-on demonstration of Jithendra’s agentic AI and systems engineering capabilities. Rather than navigating a static page, visitors can speak naturally to an AI representative that understands Jithendra’s 3 peer-reviewed research papers, engineering projects, codebases, and credentials, while automatically synchronizing the user interface via LiveKit data channels.',
  problemStatement: 'Traditional web portfolios are passive, static documents that recruiters skim for mere seconds. Conversely, existing voice assistants suffer from high round-trip latency (>2s), awkward interruptions, robotic audio glitching under network packet loss, and frequent event-loop blocking when heavy AI libraries run on constrained cloud instances.',
  solution: 'Designed an asynchronous decoupled architecture separating client-side WebRTC media capture from cloud AI inference: (1) Client browser handles WebRTC audio pre-processing (echo cancellation, noise suppression, AGC, and DTX/RED packet loss resilience); (2) LiveKit Cloud handles real-time SFU media routing and v1 turn detection with adaptive backchannel filtering; (3) Asynchronous Python backend on Render coordinates Groq LPU (<100ms TTFT) with Google Gemini 2.5 Flash fallback; (4) Bi-directional LiveKit data channels drive real-time frontend route transitions and contextual HUD displays.',
  status: 'Live Production System',
  githubUrl: 'https://github.com/jithendra259/Portfolio',
  liveUrl: 'https://portfolio-backend-ljlv.onrender.com',
  featured: true,
  highlights: [
    'Sub-500ms End-to-End Voice Roundtrip: Groq LPU (<100ms TTFT) paired with Cartesia Sonic-3 (<100ms TTS) and Deepgram Nova-3 streaming transcription',
    'Real-Time UI Auto-Navigation: Bi-directional LiveKit data channel synchronizes speech intent with Next.js 15 route transitions and scroll states',
    'Adaptive Interruption & Backchanneling: LiveKit Cloud TurnDetector v1 filters listener cues ("uh-huh", "right") from genuine barge-ins with zero local CPU load',
    'Zero-Lag Render Deployment: Event-loop architecture engineered to run smoothly on constrained Render CPU (0.1 vCPU) by offloading audio ML to specialized cloud edge providers',
    'Multi-Tier Fallback Resilience: Automatic fallback chains across LLM (Groq → Google Gemini Flash), STT (Deepgram → AssemblyAI), and TTS (Cartesia → ElevenLabs)',
  ],
  techStack: [
    'Next.js 15 (App Router)',
    'React 19',
    'TypeScript',
    'TailwindCSS',
    'LiveKit WebRTC',
    'Python 3.11',
    'Groq LPU',
    'Google Gemini 2.5 Flash',
    'Deepgram Nova-3',
    'Cartesia Sonic-3',
    'AssemblyAI',
    'ElevenLabs',
    'Render Cloud',
    'Docker',
  ],
  metrics: [
    { label: 'Voice Response TTFT', value: '<500ms', detail: 'End-to-end roundtrip from user speech endpointing to first audio byte' },
    { label: 'Primary LLM Latency', value: '<90ms', detail: 'Groq LPU delivering ultra-fast initial token generation' },
    { label: 'Fallback Reliability', value: '99.9%', detail: 'Dual-model fallback pipeline via LiveKit FallbackAdapter' },
    { label: 'Turn Detection CPU', value: '0% Local Load', detail: 'Server-side TurnDetector v1 on LiveKit Cloud prevents Render CPU saturation' },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Browser Microphone & WebRTC Transport',
      description: 'Next.js 15 client initializes an optimized WebRTC Room with echo cancellation, noise suppression, AGC, Discontinuous Transmission (DTX), and Redundant Audio Data (RED) to prevent voice breakups over lossy Wi-Fi.',
      tech: 'LiveKit Client SDK, WebRTC AudioPresets.speech, React 19',
    },
    {
      step: '02',
      title: 'LiveKit Cloud SFU & Turn Detection',
      description: 'Audio streams directly to LiveKit Cloud. Server-side TurnDetector v1 performs voice activity detection and adaptive interruption handling, distinguishing true interruptions from conversational backchanneling ("uh-huh", "okay").',
      tech: 'LiveKit Cloud SFU, TurnDetector v1, Adaptive Interruption Model',
    },
    {
      step: '03',
      title: 'Streaming Speech Recognition (STT)',
      description: 'Concurrently streams clean voice frames to Deepgram Nova-3 multilingual model. Configured with automatic server-side fallback to AssemblyAI Universal Streaming if primary provider encounters 4xx/5xx or timeouts.',
      tech: 'Deepgram Nova-3, AssemblyAI Universal Streaming',
    },
    {
      step: '04',
      title: 'Ultra-Fast Primary LLM with Automatic Fallback',
      description: 'User transcripts are ingested by LiveKit FallbackAdapter. Primary inference executes on Groq LPUs (Qwen 2.5/3.8) for sub-100ms TTFT. If rate-limited or unavailable, seamlessly switches to Google Gemini 2.5 Flash.',
      tech: 'Groq LPU API, Google Gemini 2.5 Flash, FallbackAdapter',
    },
    {
      step: '05',
      title: 'High-Fidelity Neural Speech Synthesis (TTS)',
      description: 'LLM token chunks stream directly into Cartesia Sonic-3 for ultra-low latency voice generation (<100ms), applying custom phonetic pronunciation rules for technical terms. Automatic fallback to ElevenLabs Multilingual v2.',
      tech: 'Cartesia Sonic-3, ElevenLabs Multilingual v2, Phonetic IPA Mappings',
    },
    {
      step: '06',
      title: 'Data Channel Sync & Real-Time UI Navigation',
      description: 'The agent dispatches structured JSON navigation commands over the WebRTC "navigation" data channel topic, triggering smooth client-side Next.js route changes and viewport scrolling in real time.',
      tech: 'LiveKit Data Channels, Next.js useRouter, Custom HUD Hooks',
    },
  ],
  keyCapabilities: [
    {
      title: 'Real-Time Screen & Case Study Navigation',
      description: 'The voice agent actively controls the browser viewport. Asking "show me your air quality project" or "open the EAAI paper" causes the agent to explain the work while simultaneously navigating the recruiter directly to the corresponding interactive case study.',
    },
    {
      title: 'Conversational Grounding in Verified Research',
      description: 'Pre-loaded with deep knowledge regarding Jithendra’s 3 peer-reviewed manuscripts (Elsevier EAAI, Elsevier CAS, Springer Nature LNCS), technical CVaR formulas, convex optimization solvers, and full academic metrics with 0% hallucination.',
    },
    {
      title: 'Multi-Tier Cloud Inference Fallback Chains',
      description: 'Guarantees zero downtime by chaining primary and backup AI providers: STT (Deepgram → AssemblyAI), LLM (Groq LPU → Google Gemini Flash), and TTS (Cartesia → ElevenLabs). If any API experiences disruption, the session recovers silently.',
    },
    {
      title: 'Render 0.1 vCPU Cloud Optimization',
      description: 'Eliminates event loop stalls by strictly offloading audio digital signal processing and speech models to cloud APIs, allowing the lightweight Python asyncio agent worker to run within Render’s free/starter tier constraints without degradation.',
    },
  ],
  challenges: [
    {
      challenge: 'Event Loop Blocking on Low-Resource Cloud Environments',
      solution: 'Identified that synchronous Rust FFI ML models (like local ai-coustics or local Silero VAD) blocked the Python asyncio event loop for >380ms on Render 0.1 vCPU, causing voice stream delays of 8+ seconds. Stripped local C/Rust dependencies and delegated VAD/turn detection completely to LiveKit Cloud edge infrastructure.',
    },
    {
      challenge: 'Voice Glitches and Packet Dropouts over Unstable Wi-Fi',
      solution: 'Configured client-side WebRTC publishDefaults with RED (Redundant Audio Data) and DTX (Discontinuous Transmission). RED transmits consecutive audio packets with backward-redundant payloads, reconstructing lost packets at the edge without audible distortion.',
    },
    {
      challenge: 'Unintended Mid-Sentence Interruption from Backchanneling',
      solution: 'Tuned adaptive turn-taking with backchannel_boundary=(1.0, 2.0) and false-interruption recovery. The agent ignores natural listener cues like "mm-hmm" or "got it" while still responding promptly when the user speaks a genuine query.',
    },
  ],
  techStackCategories: [
    {
      category: 'Frontend & Web Architecture',
      items: ['Next.js 15', 'React 19', 'TypeScript', 'TailwindCSS', 'LiveKit Components React', 'Framer Motion', 'Lucide Icons'],
    },
    {
      category: 'Real-Time WebRTC & Agent Framework',
      items: ['LiveKit Agents Framework', 'LiveKit Cloud SFU', 'WebRTC Data Channels', 'TurnDetector v1', 'Asynchronous Asyncio'],
    },
    {
      category: 'AI Inference & Neural Models',
      items: ['Groq LPU (Primary LLM)', 'Google Gemini 2.5 Flash (Fallback LLM)', 'Deepgram Nova-3 (STT)', 'Cartesia Sonic-3 (TTS)', 'AssemblyAI', 'ElevenLabs'],
    },
    {
      category: 'Cloud Infrastructure & DevOps',
      items: ['Render Cloud', 'Docker Containerization', 'Git / GitHub CI/CD', 'Environment Secrets Management'],
    },
  ],
};
