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
  researchLink: '/documents/personalised-aqi-system/mtech-miniproject-aqi-forecasting-kandula-subramanyam.pdf',
  pdfUrl: '/documents/personalised-aqi-system/mtech-miniproject-aqi-forecasting-kandula-subramanyam.pdf',
  featured: true,
  highlights: [
    'Hourly automated ingestion for PM2.5, PM10, CO, SO2, NO2, and O3 covering 14,107 cities worldwide from AQICN.org',
    'Per-pollutant optimal model selection across ARIMA, XGBoost with Monte Carlo bounds, LSTM/BiLSTM, and discrete-state Markov chains',
    'Dual aggregation engine: Ensemble-AQI (max across best pollutant models) and Dominant-Pollutant AQI with 95% uncertainty intervals',
    'Overall AQI R² = 0.909 with up to 99% band classification accuracy in Belleville, Ontario, Canada',
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
      description: 'Google Cloud Run service triggers hourly cron jobs ingesting individual IAQI pollutant readings across 14,107 cities into MongoDB time-series collections. Retrieves hourly pollutant data (PM2.5, PM10, CO, SO2, NO2, O3) from AQICN.org for over 14,000 cities using a unique station identifier (idx). Data is stored in MongoDB via an automated Google Cloud Run service triggered hourly using Cloud Scheduler.',
      tech: 'Google Cloud Run, Python, AQICN API, MongoDB Time-Series',
    },
    {
      step: '02',
      title: 'Breakpoint & Preprocessing Pipeline',
      description: 'Cleans raw readings, performs linear interpolation for intermittent sensor drops (short gaps < 2 hours: linear interpolation; long gaps: forward-fill or mean imputation), and computes pollutant-specific IAQI values using EPA-based linear interpolation methods with standardized AQI breakpoints for all 6 pollutants.',
      tech: 'Pandas, NumPy, EPA/CPCB Breakpoints',
    },
    {
      step: '03',
      title: 'Multi-Model Training Engine',
      description: 'Trains 4 parallel frameworks: XGBoost (lag features + Monte Carlo confidence intervals), LSTM/BiLSTM (multivariate temporal dynamics, 64/128 units, dropout=0.2, epochs=50), ARIMA (grid search p,d,q after stationarity check), and Markov Chains (probabilistic AQI state transition prediction). Each model independently trained per pollutant.',
      tech: 'XGBoost, TensorFlow/Keras, Statsmodels, Scikit-learn',
    },
    {
      step: '04',
      title: 'Dynamic Selection & Dual Aggregations',
      description: 'Automatically cross-validates each pollutant to select its best model (lowest MAE/RMSE, highest R²). Generates Ensemble-AQI (worst-case maximum across pollutants) and Dominant-Pollutant AQI with 95% confidence bands from XGBoost Monte Carlo simulation.',
      tech: 'Cross-Validation, Monte Carlo Bounds, Error Minimization',
    },
    {
      step: '05',
      title: 'Interactive Multi-Tier Dashboard',
      description: 'Interactive visualization platform displaying historic trends, 48-hour forward projections (24h historical + 24h future), side-by-side model overlays with line charts and heatmaps, quantitative error tables (RMSE, MAE, R²), and AQI band heatmaps. Dropdowns for location, pollutant, and time window selection.',
      tech: 'Streamlit, Next.js, Flask REST API, Recharts / Plotly',
    },
  ],
  keyCapabilities: [
    {
      title: 'Per-Pollutant Best Model Selection',
      description: 'Automatically benchmarks ARIMA, XGBoost, LSTM, and Markov Chains for each pollutant to pick the model with lowest MAE/RMSE and highest R². Different pollutants exhibit different dynamics — LSTM handles long-term dependencies (e.g., PM2.5) while ARIMA/XGBoost handle seasonal and reactive gases like O3 and NO2.',
    },
    {
      title: 'Ensemble-AQI & Dominant-Pollutant Formulations',
      description: 'Computes parallel forecasts: Ensemble-AQI (worst-case maximum across all pollutants\' best model forecasts) and Dominant-Pollutant AQI which flags whichever pollutant has the highest individual AQI at that time, with 95% uncertainty bounds from XGBoost Monte Carlo simulation.',
    },
    {
      title: '48-Hour Historical & Forward Visualization',
      description: 'Interactive overlay plotting 24 hours of actual historical readings alongside 24-hour predictive trajectories from all 4 models. Forecast vs. actual comparison with line charts, AQI category heatmaps, and pollutant-wise trend analysis.',
    },
    {
      title: 'Cloud-Native Automated Pipeline',
      description: 'Dockerized microservices deployed on Google Cloud Run ensure scalability and fast inference. CI/CD pipelines using GitHub Actions ensure code updates are tested and deployed seamlessly. MongoDB backend with daily automated backups and replication.',
    },
  ],
  challenges: [
    {
      challenge: 'Non-linear atmospheric dynamics across disparate pollutants',
      solution: 'Rather than forcing a single model on all pollutants, implemented decoupled model selection where LSTM handles long-term dependencies (e.g., PM2.5) while ARIMA/XGBoost handle seasonal and reactive gases. Hybrid CNN-LSTM approach further improves performance by learning spatial and temporal features simultaneously.',
    },
    {
      challenge: 'Handling intermittent sensor dropouts across 14,107 cities',
      solution: 'Constructed linear interpolation pipelines for short gaps (< 2 hours) and mean-imputation for longer gaps, with automated breakpoint computation conforming to EPA and CPCB air quality standards.',
    },
    {
      challenge: 'Integrating real-time forecasting models with interactive dashboards',
      solution: 'Real-time AQI forecasting models integrated with an interactive Streamlit/Next.js dashboard offering explainability, trend comparison, and personalized health alerts. Models served via Flask REST API endpoints consumed in real-time by the frontend.',
    },
  ],
  techStackCategories: [
    { category: 'Machine Learning & Time Series', items: ['XGBoost', 'LSTM / BiLSTM', 'ARIMA', 'Markov Chains', 'Monte Carlo Simulation', 'Scikit-learn'] },
    { category: 'Data & Cloud Pipeline', items: ['Google Cloud Run', 'MongoDB Time-Series', 'AQICN API', 'Pandas', 'NumPy', 'Cloud Scheduler'] },
    { category: 'Web & Visualization', items: ['Streamlit', 'Next.js', 'Flask REST API', 'Recharts', 'Plotly', 'Matplotlib / Seaborn'] },
  ],
  reportSections: [
    {
      heading: 'Chapter 1: Introduction',
      content: `1.1 Introduction

Air pollution poses a significant risk to public health and is linked to respiratory and cardiovascular diseases, making timely air-quality information critical for both authorities and the general public. The Air Quality Index (AQI) converts complex pollutant measurements into a standardized scale from 0 to 500, facilitating clear communication of air-quality conditions and associated health concerns. However, most existing AQI reporting systems only provide real-time snapshots without predictive capabilities.

This project addresses a critical gap in current air-quality monitoring systems: the lack of accurate, real-time predictive capabilities for multiple pollutants across diverse geographic locations. By integrating machine learning, cloud-based data pipelines, and interactive visualization, this system provides a scalable and accurate global AQI forecasting platform.

1.2 Objectives of the Project

1. Ingest and Store Global IAQI Data
   - Retrieve hourly pollutant data (PM2.5, PM10, CO, SO2, NO2, O3) from AQICN.org for over 14,000 cities using a unique station identifier (idx).
   - Store this time-series data in a MongoDB database via an automated Google Cloud Run service triggered hourly using Cloud Scheduler.

2. Preprocess and Standardize Data
   - Clean, interpolate, and normalize raw pollutant measurements.
   - Compute individual pollutant AQI (IAQI) values using EPA-based linear interpolation methods.

3. Train Four Complementary Machine Learning Models
   - ARIMA: time-series regression model using historical pollutant data.
   - XGBoost: gradient boosting with lag features and Monte Carlo confidence intervals.
   - Markov Chains: probabilistic state-transition model for AQI band prediction.
   - LSTM/BiLSTM: deep learning model capturing temporal dependencies in multivariate data.

4. Select the Best Model per Pollutant
   - Cross-validate each model and select the one with the lowest MAE/RMSE and highest R² for each individual pollutant.

5. Generate Dual-Mode Forecasts
   - Ensemble-AQI: maximum across all best pollutant-model forecasts (worst-case approach).
   - Dominant-Pollutant AQI: forecast driven by whichever pollutant has the highest individual AQI at that time.

6. Serve Predictions via RESTful APIs
   - Deploy trained models on Google Cloud Run with Flask-based REST APIs.
   - Consume predictions in real-time from Next.js / Streamlit frontend dashboards.

7. Render AQI Plots for Both Prediction Modes
   - Render AQI plots for both prediction modes (best-model and dominant pollutant) via a dynamic dashboard interface.

8. Demonstrate High Accuracy and Generalizability
   - Achieve AQI prediction R² values above 0.90.
   - Ensure pollutant-band classification accuracy ≥ 95%, with top performance reaching 99% in Belleville, Ontario, Canada.

1.3 Motivation

Air pollution remains one of the most significant environmental threats to human health, contributing to millions of premature deaths each year. With rapid urbanization and industrial growth, air quality monitoring and prediction have become essential for effective policy-making and public health intervention. Most current systems provide real-time data without predictive insights, leaving authorities and citizens without the ability to take proactive action.

The motivation for this project arises from the need for a globally scalable, cloud-integrated AQI forecasting system that not only monitors current conditions but also predicts future air quality with high accuracy. By leveraging advanced machine learning techniques and cloud infrastructure, this system empowers users with actionable forecasts, improving public health outcomes.`,
    },
    {
      heading: 'Chapter 2: Literature Review',
      content: `2.1 Origin and Early Developments

Historically, the need to communicate air quality in an understandable format has driven the development of AQI systems globally. These indices have evolved not only as technical tools but also as public health communication instruments. The integration of technological advancements such as machine learning and IoT sensors has further expanded the capabilities of AQI systems, enabling more precise and timely pollution monitoring.

The Air Quality Index itself dates to the 1970s when the U.S. EPA introduced the Pollutant Standards Index (PSI). Over the decades, different countries have developed their own frameworks. The U.S. EPA includes six pollutants (PM2.5, PM10, CO, SO2, NO2, O3) with a scale up to 500. The Chinese Ministry of Ecology and Environment uses a similar six-pollutant model but with different breakpoints. India's CPCB includes eight pollutants with values mapped on a 0–500 scale but differs in breakpoint thresholds.

2.2 Pollutants and Health-Based Breakpoints

AQI values are typically computed based on concentrations of six key pollutants:
- PM2.5 (Fine Particulate Matter): particles ≤ 2.5 μm, linked to cardiovascular and respiratory disease.
- PM10 (Coarse Particulate Matter): particles ≤ 10 μm, causing breathing difficulties.
- NO2 (Nitrogen Dioxide): from combustion engines, causes inflammation of airways.
- SO2 (Sulfur Dioxide): from industrial burning, leads to acid rain and respiratory irritation.
- CO (Carbon Monoxide): from incomplete combustion, reduces oxygen delivery to organs.
- O3 (Ground-level Ozone): formed photochemically, damages lung tissue.

AQI Breakpoint Table (EPA Standard):
  AQI 0–50:    PM2.5: 0.0–12.0 μg/m³, Category: Good
  AQI 51–100:  PM2.5: 12.1–35.4 μg/m³, Category: Moderate
  AQI 101–150: PM2.5: 35.5–55.4 μg/m³, Category: Unhealthy for Sensitive Groups
  AQI 151–200: PM2.5: 55.5–150.4 μg/m³, Category: Unhealthy
  AQI 201–300: PM2.5: 150.5–250.4 μg/m³, Category: Very Unhealthy
  AQI 301–500: PM2.5: 250.5–500.4 μg/m³, Category: Hazardous

2.3 Machine Learning for AQI Prediction

Deep Learning and Recurrent Models: LSTM-based models have shown strong performance in temporal air quality prediction. They capture long-range dependencies that classical time-series models miss. A hybrid CNN-LSTM approach further improves performance by learning spatial and temporal features simultaneously. LSTM and GRU models predict AQI in Delhi, India, demonstrating improved performance over standalone models (PubMed, 2022).

Ensemble and Gradient Boosting: XGBoost and Random Forest models have been shown to improve RMSE and R² scores across benchmark datasets. They handle non-linear relationships between pollutant concentrations and temporal lag features effectively.

Probabilistic and Hybrid Models: Stochastic models like Hidden Markov Models (HMMs) and Facebook Prophet provide uncertainty quantification, which is essential for real-world forecasting. However, they may not perform as well in multi-dimensional or non-stationary AQI datasets unless hybridized with other approaches.

2.4 Identified Research Gaps

- Real-time integration: Most ML models are trained offline and are not integrated with live data streams.
- Global coverage: Most studies focus on single cities or regions, limiting generalizability.
- Multi-pollutant forecasting: Single-pollutant models are common; joint multi-pollutant prediction is underexplored.
- Dashboard integration: Real-time AQI forecasting models are rarely integrated with interactive dashboards that offer explainability, trend comparison, and personalized health alerts.`,
    },
    {
      heading: 'Chapter 3: Methodology',
      content: `3.1 System Architecture

The system follows a modular cloud-native architecture:
1. Data Ingestion Layer: AQICN API → Google Cloud Run (hourly trigger) → MongoDB
2. Preprocessing Layer: Data cleaning, interpolation, IAQI computation
3. Model Training Layer: Four parallel ML frameworks per pollutant
4. Model Selection Layer: Cross-validation and best-model selection per pollutant
5. Prediction Layer: Dual-mode forecast generation (Ensemble-AQI + Dominant-Pollutant)
6. API Layer: Flask REST endpoints serving predictions
7. Visualization Layer: Streamlit/Next.js interactive dashboards

3.2 Data Ingestion and Storage

Cloud Infrastructure:
- Hosting: Google Cloud Run (serverless, auto-scaling)
- Scheduler: Google Cloud Scheduler (hourly cron)
- Database: MongoDB (time-series collections per station)
- Backup: Daily snapshots with automated backups and replication

3.3 Data Preprocessing

Missing Data Handling:
- Short gaps (< 2 hours): Imputed via linear interpolation.
- Long gaps: Filled with forward-fill or mean imputation.

3.3.2 Final AQI Calculation:

Individual pollutant AQI (IAQI) calculated using EPA linear interpolation:
IAQI_p = ((I_high - I_low) / (BP_high - BP_low)) × (C_p - BP_low) + I_low

where C_p is the pollutant concentration, BP_high and BP_low are the breakpoint concentrations, and I_high and I_low are the corresponding AQI values.

Final AQI: maximum of all individual IAQI values at that time.
Dominant Pollutant: the pollutant with the highest individual AQI.

3.4 Machine Learning Models

3.4.1 XGBoost
- Input: Lag features of pollutant concentrations (1–24 hour lags).
- Monte Carlo simulation adds uncertainty estimation through confidence intervals (1000 simulation runs).
- Feature importance analysis clarifies which past time steps most influenced predictions.
- Hyperparameters: n_estimators=100–500, max_depth=3–7, learning_rate=0.01–0.1.

3.4.2 ARIMA
- An ARIMA model was developed using pollutant-specific AQI time series data.
- First checks stationarity of the data (ADF test), then selects optimal ARIMA parameters (p, d, q) through grid search.
- Best configurations typically: p ∈ {1,2}, d = 1, q ∈ {1,2}.

3.4.3 Markov Chain
- Discretizes AQI into bands: Good (0–50), Moderate (51–100), Unhealthy for Sensitive Groups (101–150), Unhealthy (151–200), Very Unhealthy (201–300), Hazardous (301–500).
- Computes transition probability matrix from historical AQI band sequences.
- Predicts probability of next AQI state.
- Limitation: Doesn't consider continuous pollutant data or time-lag features.

3.4.4 LSTM (Long Short-Term Memory)
- Input: Multivariate time-series (PM2.5, PM10, NO2, SO2, CO, O3).
- Architecture: Input Layer → LSTM Layers → Dense → Output.
- Can be extended to sequence-to-sequence prediction (24-hour forecast).
- Hyperparameters: units=64/128, dropout=0.2, epochs=50, batch_size=32.
- Extended to BiLSTM for capturing both forward and backward temporal dependencies.

3.5 Deployment
- CI/CD: GitHub Actions triggers build/test/deploy on push.
- Data Flow: Fetch new data → run prediction → serve via API to frontend.

3.6 Visualization and Dashboard
- Library: Recharts (React) or Plotly (Python/JS).
- Graphs: Line charts for pollutant-wise trends, heatmaps for AQI category frequency, forecast vs. actual comparison.
- UI Elements: Dropdowns for location/pollutant/time window, current AQI category badge, 48-hour forecast plot.`,
    },
    {
      heading: 'Chapter 4: Implementation',
      content: `4.1 Data Fetching and Storing

The system uses Dockerized microservices deployed on Google Cloud Run, ensuring scalability and fast inference. Model APIs are served via REST endpoints, and the frontend consumes these responses in real-time. CI/CD pipelines using GitHub Actions ensure that code updates are tested and deployed seamlessly.

4.2 Cloud-Connected Data Flow

At the core of the system is a cloud-connected data flow that retrieves, processes, and stores air quality data in real time:
1. Google Cloud Scheduler triggers the ingestion service every hour.
2. The Cloud Run service calls the AQICN API for each station (identified by unique idx).
3. Raw pollutant readings (IAQI values) are parsed and stored in MongoDB time-series collections.
4. Each document contains: station_id, timestamp, city, country, PM2.5, PM10, NO2, SO2, CO, O3, AQI.

4.3 Model Training Pipeline

The system trains four machine learning models dynamically, triggered via the user interface:
- XGBoost: trained on lag features (1–24 hours) with Monte Carlo bounds for uncertainty.
- ARIMA: automated stationarity check (ADF test), grid search for optimal (p, d, q).
- Markov Chain: computes AQI band transition probabilities from historical sequences. Predicts probability of next AQI state.
- LSTM/BiLSTM: deep learning models designed to capture temporal dependencies in multivariate pollutant data and forecast future AQI sequences.

This dynamic pipeline ensures that users always get the latest insights without needing manual retraining of the models in advance.

4.4 Historic and Real-Time Visualization

The dashboard provides two visualization modes:
- Historic Mode: Shows the past 24 hours of actual pollutant readings across all 6 pollutants with AQI category coloring.
- Forecast Mode: Overlays predictions from all 4 models for the next 24 hours with 95% confidence intervals (from XGBoost Monte Carlo).

Both modes support: location search by city name, pollutant selection dropdown, time window adjustment, and CSV export of underlying data.`,
    },
    {
      heading: 'Chapter 5: Results and Discussion',
      content: `5.1 Data Representation

The AQI forecasting system was evaluated on historical pollutant datasets across multiple stations using four models: ARIMA, XGBoost, Markov Chain, and LSTM/BiLSTM. Each model was trained on multivariate time series features and assessed using standard regression and classification metrics: R² (coefficient of determination), MAE (Mean Absolute Error), MSE (Mean Squared Error), and RMSE (Root Mean Square Error).

5.2 ML Prediction Results

5.2.1 XGBoost Results
The XGBoost model effectively forecasted short-term AQI values using a 24-hour historical window, achieving strong performance across R², MAE, MSE, and RMSE metrics. Monte Carlo simulation added uncertainty estimation through confidence intervals, enhancing forecast reliability. Feature importance analysis further clarified which past time steps most influenced predictions.

5.2.2 Markov Chain Results
The Markov Chain model predicts AQI category transitions probabilistically. It excels at identifying when AQI is likely to shift between categories (e.g., Good → Moderate) but has lower accuracy for continuous value prediction. The 48-hour forecast of the Markov model shows clear probability distributions for each AQI band.

5.2.3 ARIMA Results
An ARIMA model was developed using pollutant-specific AQI time series data. The model was trained by first checking stationarity and selecting optimal ARIMA parameters (p, d, q) through grid search. Forecasts for future AQI values were generated with R², MSE, MAE, and RMSE computed to assess performance. ARIMA performs well for pollutants with strong seasonal patterns.

5.3 ML Model Comparison

To identify the best forecasting model for each pollutant (PM2.5, PM10, O3, NO2, CO, SO2, and overall AQI), four models were evaluated and compared: Markov, LSTM, XGBoost, and ARIMA.

Summary of Model Performance by Pollutant:
- PM2.5: LSTM/BiLSTM best (captures long-term dependencies)
- PM10: XGBoost best (handles coarse particulate lag patterns)
- O3: ARIMA best (strong seasonal/diurnal pattern)
- NO2: XGBoost best (reactive gas with strong autocorrelation at short lags)
- CO: ARIMA best (stable seasonal component)
- SO2: LSTM best (complex multivariate dependencies)
- Overall AQI: XGBoost best (R² = 0.909 across evaluated stations)

5.4 Overall Best Model for Each Pollutant

The per-pollutant model selection selects the model with the highest R² and lowest RMSE. For the overall AQI, XGBoost achieves R² = 0.909 with band classification accuracy reaching up to 99% in Belleville, Ontario, Canada.

5.5 Performance Distribution

The performance distribution illustrates how each forecasting model performs across different pollutants and stations. By analyzing metrics like MAE, RMSE, and R² across all combinations:
- LSTM and XGBoost consistently excel in capturing complex temporal patterns across most pollutants.
- ARIMA performs best for pollutants with strong seasonal structure.
- Markov Chains are most useful for categorical AQI band forecasting.

Key metrics across all pollutants and models:
- Best R²: 0.909 (XGBoost, overall AQI) to 0.990 (LSTM, PM2.5 in high-quality stations)
- Best band classification accuracy: 99% (Belleville, Ontario, Canada)
- Ensemble AQI mean accuracy: ≥ 95% across all evaluated cities`,
    },
    {
      heading: 'Chapter 6: Conclusion',
      content: `6.1 Conclusion

• This project successfully built a real-time air quality prediction system combining data collection, machine learning, and dashboard visualization. Leveraging Python frameworks, cloud platforms, and deep learning models like LSTM, the system predicts AQI levels for upcoming hours using real-time and historical pollutant data.

• The results show that advanced models such as LSTM and XGBoost significantly outperform traditional models like ARIMA for most pollutants in terms of R², MAE, and RMSE. The per-pollutant model selection strategy ensures that the best-performing model is always used for each specific pollutant type.

• The cloud-based deployment on Google Cloud Run provides scalability, reliability, and automated operation. The CI/CD pipeline ensures that code updates are seamlessly integrated and deployed without manual intervention.

• The dual-mode forecasting approach (Ensemble-AQI and Dominant-Pollutant AQI) provides both conservative worst-case estimates and granular pollutant-specific insights, making the system useful for both public health authorities and individual citizens.

• The interactive dashboard with 48-hour historical and forecast visualization provides actionable insights for both authorities and the general public, enabling proactive responses to air quality deterioration.

• Future work should focus on: extending the system to include more granular station-level data; incorporating meteorological features (temperature, humidity, wind speed) as additional predictors; exploring transformer-based architectures for longer-horizon forecasting; and integrating personalized health alerts based on individual health profiles and local AQI conditions.`,
    },
    {
      heading: 'References',
      content: `1. Gupta, A. K., Chauhan, N., & Thakur, T. (2024). Air Quality Prediction using Deep Learning - A Review. SSRN. https://ssrn.com/abstract=4487002.

2. Binbusayyis, A., Khan, M. A., Ahmed, M. M., & Sam Emmanuel, W. R. (2024). A deep learning approach for prediction of air quality index in smart city. Journal of Big Data. https://doi.org/10.1007/s43621-024-00272-9.

3. Guo, Z., Jing, X., Ling, et al. (2023). Air Quality Index Prediction using Machine Learning Techniques. Applied Sciences.

4. Author(s). (2024). Air Quality Forecasting Using Machine Learning: A Global Perspective with Relevance to Low-Resource Settings. arXiv.

5. Author(s). (2024). Predictive Modelling of Air Quality Index (AQI) Across Diverse Cities and States of India using Machine Learning. IEEE.

6. Author(s). (2023). Machine Learning-based Air Pollution Prediction Model. In 2023 IEEE IAS Global Conference on Emerging Technologies (pp. 979-8-3503-3179-0). IEEE. https://doi.org/10.1109/GlobConET56651.2023.10149947.

7. Mihirani, M., Yasakethu, L., & Balasooriya, S. (2023). Machine Learning-based Air Pollution Prediction Model. In 2023 IEEE IAS Global Conference on Emerging Technologies. IEEE. https://doi.org/10.1109/GlobConET56651.2023.10150203.

8. Zayed, R., & Abbod, M. (2024). Air Quality Index Prediction Using DNN-Markov Modeling. Applied Artificial Intelligence, 38(1), 2371540. https://doi.org/10.1080/08839514.2024.2371540.

9. Sowlat, M. H., Gharibi, H., Yunesian, M., Mahmoudi, M. T., Lotfi, S., & Zhang, Y. (2011). A novel, fuzzy-based air quality index (FAQI) for air quality assessment. Environmental Health Engineering, 10(4), 123–136.

10. Horn, S. A., & Dasgupta, P. K. (2023). Air quality index: History, definitions, uses, and requirements. Trends in Analytical Chemistry.

Project submitted to: K. J. Somaiya School of Engineering, Department of Information Technology – AI & Data Science.
Academic Year: 2024–2026 (M.Tech Batch).
Under guidance of: Ms. Deepti Patole & Dr. Ashwini Dalvi.`,
    },
  ],
};
