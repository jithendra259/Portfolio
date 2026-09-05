export interface ProjectMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ArchitectureStep {
  step: string;
  title: string;
  description: string;
  tech: string;
}

export interface KeyCapability {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface TechStackCategory {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Agentic AI' | 'Quantitative Finance' | 'Full-Stack' | 'Robotics & IoT' | string;
  period: string;
  tagline: string;
  description: string;
  overview: string;
  problemStatement: string;
  solution: string;
  highlights: string[];
  techStack: string[];
  metrics: ProjectMetric[];
  architectureSteps: ArchitectureStep[];
  keyCapabilities: KeyCapability[];
  challenges: ProjectChallenge[];
  techStackCategories: TechStackCategory[];
  githubUrl: string;
  liveUrl?: string;
  status: string;
  researchLink?: string;
  featured?: boolean;
}

export type ProjectDetail = Project;
