import { Project } from './types';
import { agenticPortfolioChatbot } from './agentic-portfolio-chatbot';
import { adaptivePortfolioGovernance } from './adaptive-portfolio-governance';
import { personalisedAqiSystem } from './personalised-aqi-system';
import { swarmRobotsAgriculture } from './swarm-robots-agriculture';

export * from './types';

/**
 * Master Registry of all portfolio projects.
 * To add a new project in the future:
 * 1. Create a new file in this folder (e.g. `my-project.ts`) adhering to the `Project` interface.
 * 2. Import it and add it to the `ALL_PROJECTS` array below.
 * Everything else (landing page, BentoGrid, categories, dynamic /projects/[id] routing) updates automatically!
 */
export const ALL_PROJECTS: Project[] = [
  agenticPortfolioChatbot,
  adaptivePortfolioGovernance,
  personalisedAqiSystem,
  swarmRobotsAgriculture,
];

/**
 * Key-Value dictionary mapping project ID to Project object for O(1) lookups.
 */
export const PROJECT_DETAILS: Record<string, Project> = Object.fromEntries(
  ALL_PROJECTS.map((project) => [project.id, project])
);

/**
 * Returns all registered projects.
 */
export function getAllProjects(): Project[] {
  return ALL_PROJECTS;
}

/**
 * Returns a specific project by its unique ID.
 */
export function getProjectById(id: string): Project | undefined {
  return PROJECT_DETAILS[id];
}

/**
 * Returns all project IDs for Next.js generateStaticParams and dynamic routing.
 */
export function getAllProjectIds(): string[] {
  return ALL_PROJECTS.map((project) => project.id);
}

/**
 * Returns the previous and next projects for carousel navigation.
 */
export function getAdjacentProjects(id: string): {
  prevProject: Project;
  nextProject: Project;
} {
  const index = ALL_PROJECTS.findIndex((project) => project.id === id);
  const prevIndex = index > 0 ? index - 1 : ALL_PROJECTS.length - 1;
  const nextIndex = index < ALL_PROJECTS.length - 1 ? index + 1 : 0;

  return {
    prevProject: ALL_PROJECTS[prevIndex],
    nextProject: ALL_PROJECTS[nextIndex],
  };
}

/**
 * Dynamically computes all unique project categories starting with 'All'.
 */
export const PROJECT_CATEGORIES: string[] = [
  'All',
  ...Array.from(new Set(ALL_PROJECTS.map((project) => project.category))),
];
