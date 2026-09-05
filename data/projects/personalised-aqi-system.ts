import { Project } from './types';

export const personalisedAqiSystem: Project = {
  id: 'personalised-aqi-system',
  title: 'Personalised AQI – Global Air Quality Forecasting',
  category: 'Full-Stack',
  period: 'Feb 2023 – Mar 2025',
  tagline: 'End-to-end global air quality forecasting platform combining live AQICN data, ML prediction, and explainable health indicators.',
  description: 'Engineered a full-stack platform predicting city-level air quality and pollutant trends globally with explainable health risk indicators and interactive dashboard visualizations.',
  overview: 'A scalable full-stack platform providing real-time air quality metrics and machine learning forecasts for cities globally, translating complex chemical sensor readings into personalized, explainable health recommendations.',
  problemStatement: 'Standard air quality indexes report raw numbers without contextualizing personal health risk for vulnerable populations, and lack predictive forecasting of impending pollution spikes.',
  solution: 'Developed an automated pipeline ingesting global sensor streams, training predictive regression and time-series models, and rendering interactive geographic visual analytics with actionable medical guidelines.',
  status: 'Production System',
  githubUrl: 'https://github.com/jithendra259',
  liveUrl: 'https://aqicn.org',
  featured: true,
  highlights: [
    'ML models forecasting AQI, PM2.5, O3, and NO2 with health-risk explainability',
    'Interactive Next.js dashboard visualising real-time and predicted AQI trends across states and countries',
    'Live streaming ingestion from AQICN API with MongoDB caching backend',
  ],
  techStack: [
    'Next.js',
    'Python',
    'Flask',
    'MongoDB',
    'Machine Learning',
    'Explainable AI',
    'AQICN API',
    'Tailwind CSS',
    'Recharts',
  ],
  metrics: [
    { label: 'Forecast Horizon', value: '48 Hours', detail: 'Predictive modeling for PM2.5, PM10, O3, NO2' },
    { label: 'Data Sources', value: 'Global AQICN', detail: 'Live streaming from hundreds of global monitoring stations' },
    { label: 'Model Accuracy', value: 'R² > 0.91', detail: 'Trained on historical meteorological & pollutant records' },
    { label: 'Architecture', value: 'Next.js + Flask', detail: 'High-throughput microservices architecture' },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Global Sensor Ingestion',
      description: 'Scheduled asynchronous jobs pull particulate and gas concentrations from global AQICN endpoints.',
      tech: 'Python, Requests, Crontab, Celery',
    },
    {
      step: '02',
      title: 'Time-Series Feature Pipeline',
      description: 'Processes pollutant history, humidity, wind velocity, and seasonal indicators into normalized training matrices.',
      tech: 'Pandas, NumPy, Scikit-learn',
    },
    {
      step: '03',
      title: 'Machine Learning Forecasting',
      description: 'Ensemble models predict multi-day particulate trajectory with confidence intervals and anomaly detection.',
      tech: 'Gradient Boosting, Random Forest, Flask REST API',
    },
    {
      step: '04',
      title: 'Explainable Health Translation',
      description: 'Maps forecasted pollutant combinations to WHO health impact scales and vulnerable demographic warnings.',
      tech: 'Explainable AI, WHO Guidelines',
    },
    {
      step: '05',
      title: 'Interactive Web Dashboard',
      description: 'Next.js frontend renders dynamic geospatial maps, trend charts, and real-time alerts with dark mode support.',
      tech: 'Next.js, Tailwind CSS, Recharts, MongoDB',
    },
  ],
  keyCapabilities: [
    {
      title: 'Real-Time Global Mapping',
      description: 'Visualizes AQI levels across international cities with color-coded severity heatmaps.',
    },
    {
      title: 'Personalized Health Recommendations',
      description: 'Tailors outdoor exercise and mask advice based on user respiratory sensitivity profiles.',
    },
    {
      title: 'Multi-Pollutant Decomposition',
      description: 'Breaks down composite AQI into specific contributions from PM2.5, PM10, Carbon Monoxide, and Ozone.',
    },
  ],
  challenges: [
    {
      challenge: 'Handling intermittent sensor drops in remote regions',
      solution: 'Built spatial interpolation and Kalman filtering to maintain unbroken forecast trends across sensor outages.',
    },
    {
      challenge: 'Delivering responsive charting for high-density time series',
      solution: 'Implemented client-side data downsampling and MongoDB aggregation pipelines with automated indexing.',
    },
  ],
  techStackCategories: [
    { category: 'Frontend & UI', items: ['Next.js', 'React', 'Tailwind CSS', 'Recharts', 'Lucide Icons'] },
    { category: 'Backend & ML', items: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'NumPy', 'Explainable AI'] },
    { category: 'Database & Ingestion', items: ['MongoDB', 'AQICN REST API', 'Docker', 'Vercel'] },
  ],
};
