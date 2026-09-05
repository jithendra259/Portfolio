import { Project } from './types';

export const personalisedAqiSystem: Project = {
  id: 'personalised-aqi-system',
  title: 'Personalised AQI – Global Air Quality Forecasting',
  category: 'Full-Stack',
  period: 'Feb 2023 – Mar 2025',
  tagline: 'End-to-end global air quality forecasting platform combining live AQICN data across 14,107 cities, adaptive multi-model forecasting (LSTM, XGBoost, ARIMA, Markov Chains), and interactive dashboards.',
  description: 'Engineered a cloud-native platform predicting city-level air quality and pollutant trends across 14,107 cities globally with dual Ensemble-AQI & Dominant-Pollutant forecasting and 95% uncertainty intervals.',
  overview: 'M.Tech AI & Data Science research project at K. J. Somaiya School of Engineering ingesting hourly pollutant readings across 14,107 cities globally via Google Cloud Run, training four complementary forecasting models (XGBoost, LSTM, ARIMA, Markov Chain), and delivering Ensemble-AQI & Dominant-Pollutant forecasts with 95% confidence intervals.',
  problemStatement: 'Standard air quality indexes report raw retrospective figures without predictive foresight, and single-model approaches fail because distinct atmospheric pollutants exhibit vastly different volatility, persistence, and chemical half-lives.',
  solution: 'Developed an automated per-pollutant model selection architecture on Google Cloud Run and MongoDB, training four distinct model paradigms (XGBoost, LSTM/BiLSTM, ARIMA, Discrete Markov Chains) and calculating both Ensemble-AQI and Dominant-Pollutant forecasts.',
  status: 'M.Tech Mini Project (Batch 2024–2026)',
  githubUrl: 'https://github.com/jithendra259',
  liveUrl: 'https://aqicn.org',
  researchLink: '/documents/mtech-miniproject-aqi-forecasting-kandula-subramanyam.pdf',
  pdfUrl: '/documents/mtech-miniproject-aqi-forecasting-kandula-subramanyam.pdf',
  featured: true,
  highlights: [
    'Hourly automated ingestion for PM2.5, PM10, CO, SO2, NO2, and O3 covering 14,107 cities worldwide from AQICN.org',
    'Per-pollutant optimal model selection across ARIMA, XGBoost with Monte Carlo bounds, LSTM/BiLSTM, and discrete-state Markov chains',
    'Dual aggregation engine: Ensemble-AQI (max across best pollutant models) and Dominant-Pollutant AQI with 95% uncertainty intervals',
    'Submitted as M.Tech Mini Project Report under guidance of Ms. Deepti Patole & Dr. Ashwini Dalvi at K. J. Somaiya School of Engineering',
  ],
  techStack: [
    'Python',
    'XGBoost',
    'LSTM / BiLSTM',
    'ARIMA',
    'Markov Chains',
    'Google Cloud Run',
    'MongoDB',
    'Streamlit',
    'Next.js',
    'Flask',
    'AQICN API',
  ],
  metrics: [
    { label: 'Global Scale', value: '14,107 Cities', detail: 'Hourly live IAQI ingestion from AQICN.org into MongoDB' },
    { label: 'Forecast Accuracy', value: 'R² = 0.909', detail: 'Overall AQI R² score with up to 99% band classification accuracy' },
    { label: 'Model Architectures', value: '4 Frameworks', detail: 'XGBoost + Monte Carlo, LSTM, ARIMA, Discrete-State Markov Chains' },
    { label: 'Forecast Horizon', value: '48 Hours', detail: '24-hour historical window + 24-hour forward projection' },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Global Sensor Ingestion via Cloud Run',
      description: 'Google Cloud Run service triggers hourly cron jobs ingesting individual IAQI pollutant readings across 14,107 cities into MongoDB time-series collections.',
      tech: 'Google Cloud Run, Python, AQICN API, MongoDB Time-Series',
    },
    {
      step: '02',
      title: 'Breakpoint & Preprocessing Pipeline',
      description: 'Cleans raw readings, performs linear interpolation for intermittent sensor drops, and computes pollutant-specific breakpoint equations.',
      tech: 'Pandas, NumPy, EPA/CPCB Breakpoints',
    },
    {
      step: '03',
      title: 'Multi-Model Training Engine',
      description: 'Trains 4 parallel frameworks: XGBoost (lag features + Monte Carlo), LSTM/BiLSTM (temporal dynamics), ARIMA (grid search p,d,q), and Markov Chains (state transitions).',
      tech: 'XGBoost, TensorFlow/Keras, Statsmodels, Scikit-learn',
    },
    {
      step: '04',
      title: 'Dynamic Selection & Dual Aggregations',
      description: 'Automatically cross-validates each pollutant to select its best model, generating Ensemble-AQI (worst-case maximum across pollutants) and Dominant-Pollutant AQI with 95% confidence bands.',
      tech: 'Cross-Validation, Monte Carlo Bounds, Error Minimization',
    },
    {
      step: '05',
      title: 'Interactive Multi-Tier Dashboard',
      description: 'Interactive visualization platform displaying historic trends, 48-hour forward projections, side-by-side model overlays, and quantitative error tables (RMSE, MAE, R²).',
      tech: 'Streamlit, Next.js, Flask REST API, Tailwind CSS',
    },
  ],
  keyCapabilities: [
    {
      title: 'Per-Pollutant Best Model Selection',
      description: 'Automatically benchmarks ARIMA, XGBoost, LSTM, and Markov Chains for each pollutant to pick the model with lowest MAE/RMSE and highest R².',
    },
    {
      title: 'Ensemble-AQI & Dominant-Pollutant Formulations',
      description: 'Computes parallel forecasts: Ensemble-AQI (worst-case maximum across pollutants) and Dominant-Pollutant AQI with 95% uncertainty bounds.',
    },
    {
      title: '48-Hour Historical & Forward Visualization',
      description: 'Interactive overlay plotting 24 hours of actual historical readings alongside 24-hour predictive trajectories from all 4 models.',
    },
  ],
  challenges: [
    {
      challenge: 'Non-linear atmospheric dynamics across disparate pollutants',
      solution: 'Rather than forcing a single model on all pollutants, implemented decoupled model selection where LSTM handles long-term dependencies (e.g., PM2.5) while ARIMA/XGBoost handle seasonal and reactive gases.',
    },
    {
      challenge: 'Handling intermittent sensor dropouts across 14,107 cities',
      solution: 'Constructed linear interpolation pipelines and automated breakpoint computation conforming to EPA and CPCB air quality standards.',
    },
  ],
  techStackCategories: [
    { category: 'Machine Learning & Time Series', items: ['XGBoost', 'LSTM / BiLSTM', 'ARIMA', 'Markov Chains', 'Monte Carlo Simulation', 'Scikit-learn'] },
    { category: 'Data & Cloud Pipeline', items: ['Google Cloud Run', 'MongoDB Time-Series', 'AQICN API', 'Pandas', 'NumPy'] },
    { category: 'Web & Visualization', items: ['Streamlit', 'Next.js', 'Flask REST API', 'Tailwind CSS', 'Matplotlib / Seaborn'] },
  ],
};
