import { Project } from './types';

export const swarmRobotsAgriculture: Project = {
  id: 'swarm-robots-agriculture',
  title: 'Swarm Robots for Precision Agriculture',
  category: 'Robotics & IoT',
  period: 'Aug 2022 – Jul 2023',
  tagline: 'Autonomous multi-robot coordination system for real-time crop health monitoring and automated plant disease diagnosis.',
  description: 'Built a swarm robotics agriculture system using embedded hardware, IoT sensors, autonomous inter-robot coordination, and image-processing concepts for precision farming.',
  overview: 'An embedded robotics and computer vision project demonstrating decentralized swarm intelligence in agriculture, utilizing coordinated mobile robots to autonomously inspect crops and flag foliage pathology.',
  problemStatement: 'Manual crop disease scouting is labor-intensive, slow, and often catches fungal or bacterial infections after irreversible crop yield loss has already occurred.',
  solution: 'Constructed an autonomous swarm of ground rovers equipped with optical cameras, environmental sensors, and inter-robot communication protocols to survey agricultural plots autonomously.',
  status: 'Capstone Project (Presidency University)',
  githubUrl: 'https://github.com/jithendra259',
  featured: false,
  highlights: [
    'Computer vision and image processing for automated plant disease diagnosis',
    'Sensor-based environmental monitoring and multi-robot autonomous coordination',
    'B.Tech Final-Year Capstone Project at Presidency University',
  ],
  techStack: [
    'Embedded Systems',
    'IoT Sensors',
    'Computer Vision',
    'Robotics',
    'Python',
    'C++',
    'OpenCV',
    'ESP32',
  ],
  metrics: [
    { label: 'Disease Classification', value: '93.4% Accuracy', detail: 'Trained on agricultural leaf pathology datasets' },
    { label: 'Coordination Protocol', value: 'Decentralized RF', detail: 'Autonomous inter-robot spatial separation' },
    { label: 'Inspection Coverage', value: '3x Faster', detail: 'Compared to conventional manual field inspection' },
    { label: 'Hardware Cost', value: 'Affordable IoT', detail: 'Engineered with cost-effective embedded modules' },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Autonomous Field Navigation',
      description: 'Differential-drive rovers navigate crop furrows using ultrasonic collision avoidance and odometry.',
      tech: 'Embedded C++, Arduino/ESP32, Microcontrollers',
    },
    {
      step: '02',
      title: 'Swarm Communication Protocol',
      description: 'Decentralized mesh networking shares mapped terrain boundaries and task allocation among rovers.',
      tech: 'NRF24L01 / Wi-Fi Mesh, Distributed Logic',
    },
    {
      step: '03',
      title: 'Computer Vision Foliage Capture',
      description: 'High-resolution camera modules capture leaf samples under varied ambient solar illumination.',
      tech: 'OpenCV, Camera Modules',
    },
    {
      step: '04',
      title: 'Pathology Inference & Alert',
      description: 'Embedded CNN classifier identifies rust, blight, and pest damage, geo-tagging infection hotspots for farmers.',
      tech: 'TensorFlow Lite, Python, GPS Logging',
    },
  ],
  keyCapabilities: [
    {
      title: 'Decentralized Swarm Coordination',
      description: 'Rovers partition the survey field autonomously without needing a single point of failure central controller.',
    },
    {
      title: 'Automated Leaf Pathology Diagnosis',
      description: 'Classifies early-stage plant diseases from imagery, enabling micro-targeted pesticide application.',
    },
    {
      title: 'Micro-Climate Telemetry',
      description: 'Logs soil moisture, ambient temperature, and humidity alongside visual disease coordinates.',
    },
  ],
  challenges: [
    {
      challenge: 'Varying natural sunlight degrading computer vision accuracy',
      solution: 'Implemented adaptive histogram equalization and HSV color-space normalization before feeding to the classifier.',
    },
    {
      challenge: 'Power constraints on mobile rovers in rough terrain',
      solution: 'Designed an energy-efficient sleep/wake sensing cycle and optimized motor PWM curves to maximize battery longevity.',
    },
  ],
  techStackCategories: [
    { category: 'Hardware & Embedded', items: ['Embedded C++', 'ESP32 / Arduino', 'Motor Drivers', 'Ultrasonic Sensors'] },
    { category: 'Computer Vision & AI', items: ['Python', 'OpenCV', 'TensorFlow Lite', 'Convolutional Neural Networks'] },
    { category: 'Networking & Protocols', items: ['Mesh Networking', 'RF Protocols', 'IoT Telemetry'] },
  ],
};
