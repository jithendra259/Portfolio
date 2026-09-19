import { NextResponse } from 'next/server';

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
  * Capstone Project: Autonomous Swarm Robotics for Precision Agriculture & Plant Pathology. Awarded Karnataka State Council for Science & Technology (KSCST) 46th Series Project Grant.
- Competitive Examination:
  * Qualified GATE 2024 in Data Science & AI (DA) and Computer Science & IT (CS).

3. THREE PEER-REVIEWED RESEARCH PUBLICATIONS (2026):
- Paper 1 (Elsevier Journal - Under Review 2026):
  * Title: "Multi-Agent Governance for Graph-Regularized Conditional Value-at-Risk Portfolio Optimization with Adaptive Contagion Penalization"
  * Journal: Elsevier Engineering Applications of Artificial Intelligence (EAAI). Manuscript ID: EAAI-26-14280.
  * Key Results: 25.9% reduction in CVaR at 95% confidence, 32.5% max drawdown containment across 2005-2025.
- Paper 2 (Springer Nature LNCS / IJCACI 2026 - Presented & Accepted):
  * Title: "Regime-Adaptive Supervisory Governance for Instability-Aware Portfolio Stabilization"
  * Conference: 5th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026), Published in Springer Nature LNCS.
  * Key Results: 32.5% max drawdown containment across 218 U.S. equities over 20 years.
- Paper 3 (Elsevier Journal - Under Review / Prepared 2026):
  * Title: "A Supervisory Portfolio Governance Framework: Composite Instability Detection, Deterministic Regime Switching & Conversational Explainability"
  * Journal: Elsevier Computers & Operations Research (CAS Journal).
  * Key Results: 7-agent DAG architecture integrating CLARABEL interior-point convex solver with conversational LLM with 100% numerical grounding.

4. KEY PROJECTS & ARCHITECTURES:
- Agentic AI Portfolio Governance Voice Assistant (This Live System)
- Multi-Agent Adaptive Portfolio Governance System (Next.js 15, TypeScript, TailwindCSS, Python backend)
- Personalised AQI Global Air Quality Forecasting (Next.js 15, Flask, XGBoost R^2 = 0.912)
- Autonomous Swarm Robots for Agriculture (ESP32, ESP-NOW mesh, DenseNet121, 98.4% field coverage)

5. AUTO-NAVIGATION & INTERACTION:
- You have the ability to navigate and scroll the visitor's screen in real time using the navigate_portfolio tool.
- When the visitor asks to see, view, scroll, or go to any section, paper, case study, or contact, ALWAYS call navigate_portfolio with the target.
- Target destinations: 'projects', 'research', 'about', 'resume', 'contact', 'skills', 'certificates', 'experience', 'home', 'case_study_adaptive_governance', 'case_study_regime_supervisory', 'case_study_supervisory_xai', 'case_study_aqi', 'case_study_swarm_robotics'.

6. VOICE RESPONSE STYLE:
- Speak naturally, warmly, conversationally, concisely, and confidently.
- Keep standard replies under 2-3 sentences.
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
    {
      name: 'get_current_page_context',
      description: "Inspect and get detailed information about the exact page, research paper, or project case study the visitor is currently viewing on their screen.",
      parameters: {
        type: 'OBJECT',
        properties: {},
      },
    },
  ],
};

// Robust, high-quality fallback responder that ensures speech replies and screen navigation always work
function generateLocalPortfolioResponse(
  userMessage: string,
  currentPage: string = '/'
): { text: string; navigationTarget?: string } {
  const query = userMessage.toLowerCase().trim();

  // 0. Page awareness queries
  if (
    query.includes('where am i') ||
    query.includes('what page') ||
    query.includes('which page') ||
    query.includes('this page') ||
    query.includes('current page') ||
    query.includes('what am i looking at') ||
    query.includes('this screen')
  ) {
    if (currentPage.includes('adaptive-portfolio-governance')) {
      return {
        text: "You are currently exploring the Adaptive Portfolio Governance case study for Jithendra's Elsevier EAAI research paper on graph-regularized CVaR optimization.",
      };
    }
    if (currentPage.includes('regime-adaptive-supervisory-governance')) {
      return {
        text: "You are viewing the Regime-Adaptive Supervisory Governance case study for his Springer Nature LNCS research publication on market instability indices.",
      };
    }
    if (currentPage.includes('supervisory-portfolio-xai-governance')) {
      return {
        text: "You are looking at the Supervisory Portfolio XAI Governance case study for his Elsevier Computers & Operations Research paper featuring CLARABEL and Mistral-7B.",
      };
    }
    if (currentPage.includes('voice-agent-portfolio-architecture')) {
      return {
        text: "You are on the Voice AI Portfolio Architecture case study detailing the sub-90 millisecond Groq LPU and LiveKit WebRTC pipeline powering this portfolio.",
      };
    }
    if (currentPage.includes('agentic-portfolio-chatbot')) {
      return {
        text: "You are viewing the Agentic AI Portfolio Chatbot case study developed for Jithendra's M.Tech thesis.",
      };
    }
    if (currentPage.includes('personalised-aqi-system')) {
      return {
        text: "You are on the Personalised AQI Global Air Quality Forecasting case study evaluating XGBoost across 10 Delhi CPCB stations.",
      };
    }
    if (currentPage.includes('swarm-robots-agriculture')) {
      return {
        text: "You are exploring the Autonomous Swarm Robots for Precision Agriculture case study funded by the Karnataka State Council for Science and Technology.",
      };
    }
    if (currentPage.includes('book-appointment')) {
      return {
        text: "You are on the meeting booking page where you can schedule a 30-minute consultation or recruiter interview with Jithendra.",
      };
    }
    return {
      text: "You are on the main portfolio overview page showing Jithendra's research publications, engineering projects, skills, and timeline.",
    };
  }

  // 1. Research & Papers
  if (
    query.includes('research') ||
    query.includes('paper') ||
    query.includes('publication') ||
    query.includes('thesis') ||
    query.includes('elsevier') ||
    query.includes('springer')
  ) {
    if (query.includes('adaptive') || query.includes('contagion') || query.includes('cvar')) {
      return {
        text: "Jithendra's paper in Elsevier Engineering Applications of Artificial Intelligence introduces multi-agent governance for graph-regularized CVaR optimization, achieving a 25.9 percent reduction in tail risk. Let me take you right to that case study.",
        navigationTarget: 'case_study_adaptive_governance',
      };
    }
    if (query.includes('regime') || query.includes('supervisory') || query.includes('ijcaci')) {
      return {
        text: "Presented at IJCACI 2026 and published in Springer Nature LNCS, this research demonstrates regime-adaptive supervisory governance containing maximum drawdown to 32.5 percent across 20 years of market regimes. Here is the case study.",
        navigationTarget: 'case_study_regime_supervisory',
      };
    }
    return {
      text: "Jithendra has authored three peer-reviewed research papers in 2026 across Elsevier and Springer Nature, focusing on multi-agent financial governance and convex optimization. Guiding your screen to the research publications section.",
      navigationTarget: 'research',
    };
  }

  // 2. Specific case studies
  if (query.includes('aqi') || query.includes('air quality')) {
    return {
      text: "Jithendra's Personalised AQI project delivers global air quality forecasting using XGBoost with an R-squared of 0.912. Navigating to the AQI case study.",
      navigationTarget: 'case_study_aqi',
    };
  }
  if (query.includes('swarm') || query.includes('robot') || query.includes('agriculture')) {
    return {
      text: "The Autonomous Swarm Robotics project was funded by the Karnataka State Council for Science and Technology, using ESP-NOW mesh networking and DenseNet for precision plant pathology. Here is the case study.",
      navigationTarget: 'case_study_swarm_robotics',
    };
  }

  // 3. Projects
  if (query.includes('project') || query.includes('work') || query.includes('built') || query.includes('portfolio')) {
    return {
      text: "Jithendra's key projects include autonomous agentic AI governance systems, machine learning forecasting engines, and decentralized robotics. Let me scroll down to his projects showcase.",
      navigationTarget: 'projects',
    };
  }

  // 4. Skills & Technologies
  if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('language') || query.includes('tools') || query.includes('python')) {
    return {
      text: "Jithendra specializes in PyTorch, convex mathematical optimization with CVXPY, Multi-Agent DAG architectures, Next.js with TypeScript, and embedded robotics. Let's examine his technical skills matrix.",
      navigationTarget: 'skills',
    };
  }

  // 5. Certificates & Credentials
  if (query.includes('certificate') || query.includes('credential') || query.includes('gate') || query.includes('somaiya')) {
    return {
      text: "Jithendra qualified GATE 2024 in Data Science and AI, and holds verified credentials in Deep Learning and Cloud Architecture. Here are his verified certificates.",
      navigationTarget: 'certificates',
    };
  }

  // 6. Experience & Education
  if (query.includes('experience') || query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('mtech') || query.includes('btech')) {
    return {
      text: "Jithendra is completing his M.Tech in AI and Data Science at K J Somaiya College of Engineering in Mumbai with an 8.06 CGPA, having earned his B.Tech at Presidency University. Here is his academic and professional journey.",
      navigationTarget: 'experience',
    };
  }

  // 7. Resume & CV
  if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
    return {
      text: "You can view and download Jithendra's detailed resume directly on this page. Guiding your screen to the resume section.",
      navigationTarget: 'resume',
    };
  }

  // 8. Contact & Hiring
  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('phone') || query.includes('meet') || query.includes('call') || query.includes('reach')) {
    return {
      text: "You can reach Jithendra at kandulajithendrasubramanyam@gmail.com, call +91-9704400336, or book an appointment directly through this modal. Opening the contact section now.",
      navigationTarget: 'contact',
    };
  }

  // 9. About / Who is Jithendra
  if (query.includes('who') || query.includes('about') || query.includes('tell me') || query.includes('jithendra')) {
    return {
      text: "Kandula Jithendra Subramanyam is an AI systems engineer and quantitative researcher bridging autonomous agentic swarms with convex mathematical optimization. Here is his background summary.",
      navigationTarget: 'about',
    };
  }

  // 10. Default conversational response
  return {
    text: "I am Jithendra's AI assistant. You can ask me about his research papers in Elsevier and Springer Nature, his engineering projects, technical skills, or schedule a conversation with him. What would you like to explore?",
    navigationTarget: undefined,
  };
}

// Attempts Gemini LLM call with supported models
async function callGemini(
  apiKey: string,
  contents: any[],
  currentPage: string = '/'
): Promise<{ text: string; navigationTarget?: string } | null> {
  const models = ['gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-2.5-flash-lite'];

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
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
        const err = await response.text();
        console.warn(`Gemini model ${model} failed: ${response.status} - ${err}`);
        continue;
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
        if (part.functionCall && part.functionCall.name === 'get_current_page_context') {
          if (!text.trim()) {
            text = `You are currently viewing ${currentPage || 'the main portfolio'}.`;
          }
        }
      }

      if (!text.trim() && navigationTarget) {
        text = `Guiding your screen to the ${navigationTarget.replace(/_/g, ' ')} section.`;
      }

      if (text.trim()) {
        return {
          text: text.replace(/[*#`_~]/g, '').trim(),
          navigationTarget,
        };
      }
    } catch (e) {
      console.warn(`Error trying Gemini model ${model}:`, e);
    }
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body.message || '').trim();
    const history = body.history || [];
    const currentPage = (body.pathname || body.currentPage || '/').trim();

    if (!userMessage) {
      return NextResponse.json({
        text: "I'm listening. How can I assist you with Jithendra's portfolio today?",
      });
    }

    const apiKey = (process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || '').trim();

    // 1. If an API key is configured in environment variables, try Gemini live LLM
    if (apiKey) {
      const contents = [
        ...history.map((item: { role: string; text: string }) => ({
          role: item.role === 'agent' || item.role === 'model' ? 'model' : 'user',
          parts: [{ text: item.text }],
        })),
        {
          role: 'user',
          parts: [
            {
              text: `[Active Visitor Screen: ${currentPage}]\n${userMessage}`,
            },
          ],
        },
      ];

      const llmResult = await callGemini(apiKey, contents, currentPage);
      if (llmResult) {
        return NextResponse.json(llmResult);
      }
    }

    // 2. Seamless local knowledge-base fallback with full speech and autonavigation
    const fallbackResult = generateLocalPortfolioResponse(userMessage, currentPage);
    return NextResponse.json(fallbackResult);
  } catch (error) {
    console.error('Error in /api/voice-chat:', error);
    return NextResponse.json({
      text: "I am Jithendra's AI assistant. Feel free to explore his research publications and engineering projects on this page.",
      navigationTarget: 'projects',
    });
  }
}
