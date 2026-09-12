# Projects Directory

Each project in this directory is defined in its own standalone file, exporting a `Project` object.

## How to Add a New Project

1. **Create a new file**: e.g. `frontend/data/projects/my-new-project.ts`.
2. **Define your project**:
```ts
import { Project } from './types';

export const myNewProject: Project = {
  id: 'my-new-project',
  title: 'My New AI System',
  category: 'Agentic AI', // or 'Quantitative Finance' | 'Full-Stack' | 'Robotics & IoT' or custom
  period: '2026',
  tagline: 'High-impact one-liner summary.',
  description: 'Detailed description for cards and listings.',
  overview: 'Comprehensive overview of the system.',
  problemStatement: 'What challenge does this project solve?',
  solution: 'How is it engineered?',
  status: 'Production / In Development',
  githubUrl: 'https://github.com/jithendra259/...',
  liveUrl: 'https://...',
  featured: true,
  highlights: [
    'Key feature 1',
    'Key feature 2',
  ],
  techStack: ['Python', 'Next.js', 'LangGraph'],
  metrics: [
    { label: 'Latency', value: '<200ms', detail: 'Real-time response time' },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Data Ingestion',
      description: 'Fetches streaming data.',
      tech: 'Python / WebSockets',
    },
  ],
  keyCapabilities: [
    { title: 'Core Feature', description: 'Deep technical capability.' },
  ],
  challenges: [
    { challenge: 'Complex state sync', solution: 'Used optimistic concurrency.' },
  ],
  techStackCategories: [
    { category: 'Frontend', items: ['Next.js', 'Tailwind CSS'] },
  ],
};
```
3. **Register it in `frontend/data/projects/index.ts`**:
```ts
import { myNewProject } from './my-new-project';

export const ALL_PROJECTS: Project[] = [
  // ...
  myNewProject,
];
```
4. **Done!** The landing page Bento Grid, category filters, case study `/projects/my-new-project`, breadcrumbs, and previous/next project carousels will update automatically.
