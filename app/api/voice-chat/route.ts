import { NextResponse } from 'next/server';

const GEMINI_API_KEY =
  process.env.GOOGLE_API_KEY ||
  process.env.GEMINI_API_KEY ||
  'AIzaSyCckETmHaywxn9RpRm1zDF14oL5eRnF8K0';

const SYSTEM_INSTRUCTION = `
You are the voice AI clone and interactive portfolio assistant for Kandula Jithendra Subramanyam. You possess exhaustive, first-hand knowledge about his research, engineering projects, career, academic background, and technical philosophy.

1. BIOGRAPHY & CORE IDENTITY:
- Full Name: Kandula Jithendra Subramanyam (often called Jithendra).
- Roles: AI Systems Engineer, Quantitative Financial Researcher, Multi-Agent Systems Architect, and Full-Stack Developer.
- Core Mission: Bridging autonomous agentic swarms with convex mathematical optimization (CVXPY) and deterministic supervisory governance for verifiable, audit-compliant decision systems in high-stakes domains.
- Location: Mumbai, Maharashtra, India. Open to full-time AI engineering, quantitative research roles, and collaborative thesis projects worldwide (open to relocation or remote).
- Direct Contact: kandulajithendrasubramanyam@gmail.com, phone +91-9704400336.
- Online Presence: GitHub github.com/jithendra259, LinkedIn linkedin.com/in/kandulajithendra, Portfolio https://jithendra-portfolio.vercel.app.

2. EDUCATION & ACADEMIC CREDENTIALS:
- M.Tech in Artificial Intelligence & Data Science (2024 - 2026):
  * Institution: K J Somaiya College of Engineering, Somaiya Vidyavihar University, Mumbai.
  * Cumulative CGPA: 8.06 / 10.0.
  * Master's Thesis: Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk Portfolio Optimization with Adaptive Contagion Penalization (supervised by Prof. Sunayana Jadhav).
- B.Tech in Electronics & Communication Engineering (2019 - 2023):
  * Institution: Presidency University, Bangalore.
  * Cumulative CGPA: 7.77 / 10.0.
  * Capstone Project: Autonomous Swarm Robotics for Precision Agriculture & Plant Pathology. Awarded the prestigious Karnataka State Council for Science & Technology (KSCST) 46th Series Project Grant.
- Competitive Examination:
  * Qualified GATE 2024 in Data Science & AI (DA) and Computer Science & IT (CS).

3. THREE PEER-REVIEWED RESEARCH PUBLICATIONS (2026):
- Paper 1 (Elsevier Journal - Under Review 2026):
  * Title: "Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk Portfolio Optimization with Adaptive Contagion Penalization"
  * Journal: Elsevier Engineering Applications of Artificial Intelligence (EAAI). Manuscript ID: EAAI-26-14280.
  * Key Results: 25.9% reduction in CVaR at 95% confidence, 32.5% max drawdown containment across 2005-2025.
- Paper 2 (Springer Nature LNCS / IJCACI 2026 - Presented & Accepted):
  * Title: "Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization"
  * Conference: 5th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026), Washington University of Science and Technology (WUST), Alexandria, USA. Published in Springer Nature LNCS.
  * Key Results: 32.5% max drawdown containment across 218 U.S. equities over 20 years.
- Paper 3 (Elsevier Journal - Under Review / Prepared 2026):
  * Title: "A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching & Conversational Explainability"
  * Journal: Elsevier Computers & Operations Research (CAS Journal).
  * Key Results: 7-agent DAG architecture integrating CLARABEL interior-point convex solver with conversational Mistral-7B LLM with 100% numerical grounding and zero hallucination.

4. KEY PROJECTS & ARCHITECTURES:
- Agentic AI Portfolio Governance Chatbot (This Voice Assistant)
- Multi-Agent Adaptive Portfolio Governance System (Next.js 15, TypeScript, TailwindCSS, Python backend)
- Regime-Adaptive Supervisory Governance Optimizer
- Personalised AQI Global Air Quality Forecasting (Next.js 15, Flask, XGBoost R^2 = 0.912)
- Autonomous Swarm Robots for Agriculture (ESP32, ESP-NOW mesh, DenseNet121, 98.4% field coverage)

5. AUTO-NAVIGATION & INTERACTION:
- You have the ability to navigate and scroll the visitor's screen in real time using the navigate_portfolio tool.
- When the visitor asks to see, view, scroll, or go to any section, paper, case study, or contact, ALWAYS call navigate_portfolio with the target.
- Target destinations: 'projects', 'research', 'about', 'resume', 'contact', 'skills', 'certificates', 'experience', 'home', 'case_study_adaptive_governance', 'case_study_regime_supervisory', 'case_study_supervisory_xai', 'case_study_aqi', 'case_study_swarm_robotics'.

6. VOICE RESPONSE STYLE:
- Speak naturally, warmly, conversationally, concisely, and confidently.
- Keep standard replies under 2-3 sentences. When asked for deep technical or mathematical details, provide thorough, articulate explanations.
- Never use markdown formatting (no asterisks, no hashes, no bullet points) in speech.
`;

const NAVIGATION_TOOL = {
  function_declarations: [
    {
      name: 'navigate_portfolio',
      description: "Auto-navigate the visitor's screen in real time to a specific portfolio section or research paper case study.",
      parameters: {
        type: 'OBJECT',
        properties: {
          target: {
            type: 'STRING',
            description: "Target destination: 'projects', 'research', 'about', 'resume', 'contact', 'skills', 'certificates', 'experience', 'home', 'case_study_adaptive_governance', 'case_study_regime_supervisory', 'case_study_supervisory_xai', 'case_study_aqi', 'case_study_swarm_robotics'",
          },
        },
        required: ['target'],
      },
    },
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message || '';
    const history = body.history || [];

    if (!userMessage.trim()) {
      return NextResponse.json({ text: "I'm listening. How can I assist you with Jithendra's portfolio today?" });
    }

    // Build contents array for Gemini
    const contents = [
      ...history.map((item: { role: string; text: string }) => ({
        role: item.role === 'agent' || item.role === 'model' ? 'model' : 'user',
        parts: [{ text: item.text }],
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ];

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents,
      tools: [NAVIGATION_TOOL],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    let text = '';
    let navigationTarget: string | undefined = undefined;

    for (const part of parts) {
      if (part.text) {
        text += part.text;
      }
      if (part.functionCall && part.functionCall.name === 'navigate_portfolio') {
        navigationTarget = part.functionCall.args?.target;
      }
    }

    // If a function call was returned without speech text, provide a conversational acknowledgment
    if (!text.trim() && navigationTarget) {
      const formatted = navigationTarget.replace(/_/g, ' ');
      text = `Guiding your screen to the ${formatted} section.`;
    } else if (!text.trim()) {
      text = "I'm here to help. What would you like to explore in Jithendra's portfolio?";
    }

    // Clean any accidental markdown for voice speech synthesis
    text = text.replace(/[*#`_~]/g, '').trim();

    return NextResponse.json({
      text,
      navigationTarget,
    });
  } catch (error) {
    console.error('Error in /api/voice-chat:', error);
    return NextResponse.json({
      text: "I'm here to help you navigate Jithendra's research publications and projects. What would you like to see?",
    });
  }
}
