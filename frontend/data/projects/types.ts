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

export interface ReportSection {
  heading: string;
  content: string;
}

export interface PaperAuthor {
  name: string;
  affiliationIndex: number;
  isCorresponding?: boolean;
  email?: string;
}

export interface PaperAffiliation {
  index: number;
  institution: string;
  department: string;
  location: string;
}

export interface PaperFigure {
  id: string;
  figureNumber: string; // e.g. "Fig. 1"
  title: string;
  caption: string;
  src: string;
  alt: string;
  aspectRatio?: string;
}

export interface PaperReference {
  index: number;
  citation: string;
  doi?: string;
  url?: string;
}

export interface IeeePaperData {
  venue: string;
  paperTitle?: string;
  authors: PaperAuthor[];
  affiliations: PaperAffiliation[];
  abstract: string;
  keywords: string[];
  publicationDate?: string;
  doi?: string;
  bibtex?: string;
  figures: PaperFigure[];
  references?: PaperReference[];
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
  pdfUrl?: string;
  featured?: boolean;
  reportSections?: ReportSection[];
  ieeePaper?: IeeePaperData;
}

export type ProjectDetail = Project;
