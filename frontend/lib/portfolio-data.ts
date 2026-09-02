export interface Project {
  id: string;
  title: string;
  category: 'Agentic AI' | 'Quantitative Finance' | 'Full-Stack' | 'Robotics & IoT';
  period: string;
  tagline: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ResearchPaper {
  title: string;
  publisher: string;
  status: string;
  year: string;
  description: string;
  focusAreas: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Proficient'; tag?: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  details: string;
}

export interface PortfolioData {
  developer: {
    fullName: string;
    shortName: string;
    headline: string;
    subheadline: string;
    bio: string;
    location: string;
    phone: string;
    email: string;
    status: string;
    stats: { label: string; value: string }[];
    socials: {
      github: string;
      linkedin: string;
      email: string;
      orcid?: string;
      resumeUrl?: string;
    };
    languages: { name: string; level: string }[];
  };
  promptSuggestions: {
    title: string;
    prompt: string;
    category: 'research' | 'projects' | 'finance' | 'skills' | 'contact';
  }[];
  researchPapers: ResearchPaper[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: string[];
  testScores: string[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  developer: {
    fullName: 'Kandula Jithendra Subramanyam',
    shortName: 'Jithendra Subramanyam',
    headline: 'Agentic AI & Multi-Agent Systems Engineer',
    subheadline: 'M.Tech AI & Data Science | Quantitative Finance | Explainable AI | Full-Stack Dev',
    bio: 'M.Tech Artificial Intelligence & Data Science researcher and developer specialized in agentic AI, multi-agent portfolio governance, quantitative finance risk analytics, explainable AI, and full-stack systems. Built modular multi-agent architectures with task planning, CVXPY portfolio optimization, market-regime adaptation, audit logging, and compliance-aware verification. Research manuscripts under review at Elsevier EAAI and Springer.',
    location: 'Mumbai, India',
    phone: '+91-9704400336',
    email: 'kandulajithendrasubramanyam@gmail.com',
    status: 'Open for AI Engineering & Research Roles',
    stats: [
      { label: 'Research Papers', value: '2 Under Review' },
      { label: 'M.Tech CGPA', value: '8.06' },
      { label: 'Agent Roles', value: '10+ Agents' },
      { label: 'Voice Latency', value: '<500ms' },
    ],
    socials: {
      github: 'https://github.com/jithendra259',
      linkedin: 'https://linkedin.com',
      email: 'mailto:kandulajithendrasubramanyam@gmail.com',
      orcid: 'https://orcid.org',
      resumeUrl: '#',
    },
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Telugu', level: 'Native' },
      { name: 'Hindi', level: 'Intermediate' },
    ],
  },
  promptSuggestions: [
    {
      title: '🤖 Agentic AI Governance',
      prompt: 'Can you explain your Agentic AI Portfolio Governance Chatbot architecture and multi-agent roles?',
      category: 'projects',
    },
    {
      title: '📈 Quantitative Finance',
      prompt: 'How do you perform portfolio optimization, CVaR analysis, and market regime detection?',
      category: 'finance',
    },
    {
      title: '📚 Research Papers',
      prompt: 'Tell me about your research papers submitted to Elsevier EAAI and Springer.',
      category: 'research',
    },
    {
      title: '⚡ Technical Skills',
      prompt: 'What are your core technical capabilities in LangGraph, Python, CVXPY, and Full-Stack?',
      category: 'skills',
    },
    {
      title: '📫 Contact Jithendra',
      prompt: 'How can I get in touch with Jithendra for job opportunities or collaborations?',
      category: 'contact',
    },
  ],
  researchPapers: [
    {
      title: 'Multi-Agent Adaptive Portfolio Governance System',
      publisher: 'Elsevier – Engineering Applications of Artificial Intelligence (EAAI)',
      status: 'Under Review, 2026',
      year: '2026',
      description: 'Pioneered an adaptive financial intelligence system integrating agentic orchestration, convex portfolio optimization (CVXPY/CLARABEL), market-regime adaptation, instability detection, anti-hallucination controls, and explainable governance validation.',
      focusAreas: ['Agentic Orchestration', 'Portfolio Optimization', 'Market-Regime Adaptation', 'Instability Detection', 'Anti-Hallucination Safeguards', 'Auditable Decision Support'],
    },
    {
      title: 'Agentic AI Portfolio Governance / Financial Intelligence',
      publisher: 'Springer Conference Proceedings',
      status: 'Under Review, 2026',
      year: '2026',
      description: 'Formulated a modular multi-agent framework delivering compliance-aware portfolio decision support, source grounding, evidence tracking, and audit-ready financial reasoning workflows.',
      focusAreas: ['Multi-Agent Governance', 'Explainable Financial Intelligence', 'Compliance-Aware AI', 'Evidence Grounding', 'Audit-Ready AI'],
    },
  ],
  projects: [
    {
      id: 'agentic-portfolio-chatbot',
      title: 'Agentic AI Portfolio Governance Chatbot',
      category: 'Agentic AI',
      period: 'Oct 2025 – Apr 2026',
      tagline: 'Multi-agent financial chatbot for stock portfolio management with audit-ready verification.',
      description: 'Built a specialized multi-agent system featuring planning, data retrieval, technical analysis, regime detection, instability analysis, portfolio optimization (CVXPY/CLARABEL), governance validation, explainability, and verification agents.',
      highlights: [
        'Modular multi-agent architecture powered by LangChain / LangGraph & Mistral-7B via Ollama',
        'Technical analysis modules for RSI, MACD, Bollinger Bands, trend, volatility, and CVaR drawdown',
        'Audit logs, confidence scores, evidence tracking, source grounding, and anti-hallucination controls',
      ],
      techStack: ['Python', 'LangChain / LangGraph', 'CVXPY', 'CLARABEL', 'NetworkX', 'MongoDB', 'Gradio', 'Ollama', 'Mistral-7B', 'YFinance', 'NumPy', 'Pandas', 'SciPy'],
      githubUrl: 'https://github.com/jithendra259',
      featured: true,
    },
    {
      id: 'adaptive-portfolio-governance',
      title: 'Multi-Agent Adaptive Portfolio Governance System',
      category: 'Quantitative Finance',
      period: 'Jan 2026 – Apr 2026',
      tagline: 'Financial decision-intelligence system combining risk-aware portfolio construction & governance.',
      description: 'Designed a financial decision-intelligence architecture combining agentic orchestration, risk-aware portfolio construction, regime-aware adaptation, instability detection, optimization, and response verification.',
      highlights: [
        'Evidence-backed responses with governance approval checks and transparent explanations',
        'Graph-based reasoning with NetworkX and convex optimization solvers',
        'Published as first-author manuscript submitted to Elsevier EAAI',
      ],
      techStack: ['Python', 'CVXPY', 'NetworkX', 'LangGraph', 'Risk Analytics', 'Financial Datasets'],
      githubUrl: 'https://github.com/jithendra259',
      featured: true,
    },
    {
      id: 'personalised-aqi-system',
      title: 'Personalised AQI – Global Air Quality Forecasting',
      category: 'Full-Stack',
      period: 'Feb 2023 – Mar 2025',
      tagline: 'Full-stack AQI forecasting platform using live AQICN.org data & explainable ML insights.',
      description: 'Engineered a full-stack platform predicting city-level air quality and pollutant trends globally with explainable health risk indicators and interactive dashboard visualizations.',
      highlights: [
        'ML models forecasting AQI, PM2.5, O3, and NO2 with health-risk explainability',
        'Interactive Next.js dashboard visualising real-time and predicted AQI trends across states and countries',
        'Live streaming ingestion from AQICN API with MongoDB caching backend',
      ],
      techStack: ['Next.js', 'Python', 'Flask', 'MongoDB', 'Machine Learning', 'Explainable AI', 'AQICN API'],
      githubUrl: 'https://github.com/jithendra259',
      featured: true,
    },
    {
      id: 'swarm-robots-agriculture',
      title: 'Swarm Robots for Agriculture',
      category: 'Robotics & IoT',
      period: 'Aug 2022 – Jul 2023',
      tagline: 'Autonomous swarm robotics system for crop monitoring and plant disease detection.',
      description: 'Built a swarm robotics agriculture system using embedded hardware, IoT sensors, autonomous inter-robot coordination, and image-processing concepts for precision farming.',
      highlights: [
        'Computer vision and image processing for automated plant disease diagnosis',
        'Sensor-based environmental monitoring and multi-robot autonomous coordination',
        'B.Tech Final-Year Capstone Project at Presidency University',
      ],
      techStack: ['Embedded Systems', 'IoT Sensors', 'Computer Vision', 'Robotics', 'Python', 'C++'],
      githubUrl: 'https://github.com/jithendra259',
      featured: false,
    },
  ],
  skillCategories: [
    {
      category: 'Agentic AI & LLM Engineering',
      skills: [
        { name: 'Agentic AI & Multi-Agent Swarms', level: 'Expert' },
        { name: 'LangChain & LangGraph', level: 'Expert' },
        { name: 'Explainable AI & Source Grounding', level: 'Expert' },
        { name: 'RAG & Prompt Engineering', level: 'Expert' },
        { name: 'Ollama & Mistral-7B', level: 'Advanced' },
        { name: 'Verification & Anti-Hallucination', level: 'Expert' },
        { name: 'Audit Logging & Governance', level: 'Expert' },
      ],
    },
    {
      category: 'Quantitative Finance & Optimization',
      skills: [
        { name: 'CVXPY & CLARABEL Solvers', level: 'Expert' },
        { name: 'Portfolio Optimization & CVaR', level: 'Expert' },
        { name: 'Market Regime Detection', level: 'Advanced' },
        { name: 'Technical Analysis (RSI, MACD, BB)', level: 'Expert' },
        { name: 'Drawdown & Volatility Modeling', level: 'Advanced' },
        { name: 'NetworkX Graph Reasoning', level: 'Advanced' },
      ],
    },
    {
      category: 'Programming & Data Science',
      skills: [
        { name: 'Python (NumPy, Pandas, SciPy)', level: 'Expert' },
        { name: 'Scikit-Learn & Machine Learning', level: 'Advanced' },
        { name: 'Deep Learning & Neural Networks', level: 'Advanced' },
        { name: 'MongoDB & SQL Databases', level: 'Advanced' },
        { name: 'Git & GitHub Workflows', level: 'Expert' },
      ],
    },
    {
      category: 'Full-Stack & Systems Dev',
      skills: [
        { name: 'React & Next.js 15', level: 'Expert' },
        { name: 'TypeScript & JavaScript', level: 'Expert' },
        { name: 'Flask & REST APIs', level: 'Advanced' },
        { name: 'HTML5, CSS3 & Tailwind CSS', level: 'Expert' },
        { name: 'Gradio UI & Dashboard Dev', level: 'Advanced' },
        { name: 'WebSockets & LiveKit WebRTC', level: 'Advanced' },
      ],
    },
  ],
  experience: [
    {
      period: 'Oct 2025 – Apr 2026',
      role: 'Thesis Researcher – Agentic AI Portfolio Governance',
      company: 'K J Somaiya College of Engineering',
      location: 'Mumbai, India',
      description: 'Conducted master thesis research developing modular multi-agent architectures for stock portfolio management, risk analytics, and compliance-aware financial intelligence.',
      achievements: [
        'Designed 10+ specialized agents for planning, data retrieval, technical analysis, regime detection, instability analysis, portfolio optimization, governance validation, explainability, and verification.',
        'Implemented audit logging, confidence scoring, evidence tracking, source grounding, and anti-hallucination controls.',
        'Integrated CVXPY, CLARABEL, NetworkX, LangGraph, MongoDB, Ollama (Mistral-7B), YFinance, NumPy, Pandas, and SciPy.',
        'Submitted research papers to Elsevier EAAI and Springer conference proceedings.',
      ],
      technologies: ['LangGraph', 'CVXPY', 'Python', 'Mistral-7B', 'NetworkX', 'MongoDB', 'Gradio', 'YFinance'],
    },
    {
      period: 'May 2025 – Aug 2025',
      role: 'Full-Stack Developer Intern',
      company: 'ScholarRankAI',
      location: 'Remote',
      description: 'Engineered responsive React-based user interfaces and integrated third-party REST APIs for production workflows.',
      achievements: [
        'Delivered responsive frontend interfaces and eliminated performance bottlenecks across application screens.',
        'Collaborated in Agile sprints, stand-ups, code reviews, and debugging cycles.',
        'Enhanced usability and streamlined data presentation across production user flows.',
      ],
      technologies: ['React', 'JavaScript', 'REST APIs', 'Tailwind CSS', 'Git', 'Agile'],
    },
    {
      period: 'Mar 2024 – May 2024',
      role: 'UI/UX Developer Intern',
      company: 'MNJ Software Pvt. Ltd.',
      location: 'India',
      description: 'Translated UI/UX wireframes into production-ready web interfaces with rigorous cross-browser consistency.',
      achievements: [
        'Improved page-load speed by 25% and increased user engagement metrics by 15% through frontend optimizations.',
        'Collaborated closely with backend engineers on seamless API integration.',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX', 'Performance Optimization'],
    },
  ],
  education: [
    {
      degree: 'M.Tech in Artificial Intelligence & Data Science',
      institution: 'K J Somaiya College of Engineering',
      location: 'Mumbai, India',
      period: 'Aug 2024 – Apr 2026',
      score: 'CGPA: 8.06',
      details: 'Thesis: Personal Chatbot for Stock Portfolio Management with Agentic AI Framework. Research focus on multi-agent governance, explainable AI, portfolio optimization (CVXPY), and compliance-aware financial intelligence.',
    },
    {
      degree: 'B.Tech in Electronics and Communication Engineering',
      institution: 'Presidency University',
      location: 'Bangalore, India',
      period: 'Aug 2019 – Jul 2023',
      score: 'CGPA: 7.77',
      details: 'Final-year project: Swarm Robots for Agriculture using embedded systems, image processing, IoT sensors, and autonomous multi-robot coordination.',
    },
    {
      degree: 'Intermediate (MPC)',
      institution: 'Sri Chaitanya Junior College',
      location: 'India',
      period: 'Jun 2017 – Jun 2019',
      score: 'CGPA: 9.28',
      details: 'Mathematics, Physics, Chemistry focus.',
    },
    {
      degree: '10th Grade (SSC)',
      institution: 'T V N R M National High School',
      location: 'India',
      period: 'Jun 2016 – Jun 2017',
      score: 'CGPA: 9.5',
      details: 'Secondary school certificate with high distinction.',
    },
  ],
  certifications: [
    'Smart Manager Certificate (CII)',
    'Python Programming Specialist',
    'Machine Learning & Deep Learning',
    'C Programming Foundations',
  ],
  testScores: [
    'GATE AI & Data Science: Score 33.3',
    'GATE Computer Science: Score 23.2',
    'JEE Mains: 85.6 Percentile',
  ],
};
