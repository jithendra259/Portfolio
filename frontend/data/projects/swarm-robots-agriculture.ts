import { Project } from './types';

export const swarmRobotsAgriculture: Project = {
  id: 'swarm-robots-agriculture',
  title: 'Swarm Robots for Precision Agriculture',
  category: 'Robotics & IoT',
  period: 'Aug 2022 – Jul 2023',
  tagline: 'Autonomous multi-robot coordination system for real-time crop health monitoring and automated plant disease diagnosis.',
  description: 'Built a swarm robotics agriculture system using embedded hardware, IoT sensors, autonomous inter-robot coordination, and image-processing concepts for precision farming.',
  overview: 'An embedded robotics and computer vision project demonstrating decentralized swarm intelligence in agriculture, utilizing coordinated mobile robots to autonomously inspect crops and flag foliage pathology. Submitted as B.Tech final-year capstone project at Presidency University (2022-23) under the guidance of Dr. M.S. Divya Rani. Also funded and accepted under the Karnataka State Council for Science and Technology (KSCST) 46th Student Project Programme (SPP).',
  problemStatement: 'Manual crop disease scouting is labor-intensive, slow, and often catches fungal or bacterial infections after irreversible crop yield loss has already occurred. Current mechanized solutions are product-specific and unable to handle multitasking — they cannot simultaneously perform irrigation, ploughing, seeding, and disease detection.',
  solution: 'Constructed an autonomous swarm of ground rovers equipped with optical cameras, DHT11 environmental sensors, DC motor-based ploughing tools, seed sowing mechanisms, and NRF-based inter-robot communication to survey agricultural plots autonomously. Integrated DenseNet-121 CNN for leaf disease classification and cloud connectivity via Blynk IoT for remote monitoring.',
  status: 'B.Tech Capstone Project | Presidency University | KSCST 46th SPP Funded',
  githubUrl: 'https://github.com/jithendra259',
  pdfUrl: '/documents/swarm-robots-agriculture/swarm-robotics-kscst-proposal.pdf',
  researchLink: '/documents/swarm-robots-agriculture/swarm-robotics-kscst-proposal.pdf',
  featured: false,
  highlights: [
    'DenseNet-121 CNN for automated plant disease diagnosis (Healthy vs Disease classification)',
    'Master-Slave swarm architecture: Master robot controls coordination, slave robots execute field tasks',
    'Full multi-function capability: ploughing, seed sowing, pesticide spraying, irrigation, disease monitoring',
    'Inter-robot communication via NRF24L01 RF modules with Raspberry Pi as compute platform',
    'Accepted and funded under KSCST 46th Student Project Programme (SPP) 2022-23',
    'B.Tech Final-Year Capstone Project at Presidency University under Dr. M.S. Divya Rani',
  ],
  techStack: [
    'Raspberry Pi',
    'Embedded C / Python',
    'DenseNet-121 CNN',
    'OpenCV',
    'NRF24L01 RF',
    'DHT11 Sensor',
    'L293D Motor Driver',
    'Blynk IoT Cloud',
    'Solar Power',
    'DC Servo Motor',
    'Camera Module',
  ],
  metrics: [
    { label: 'Disease Classification', value: '93.4% Accuracy', detail: 'DenseNet-121 trained on agricultural leaf pathology datasets' },
    { label: 'Robot Architecture', value: 'Master-Slave', detail: 'Decentralized multi-robot swarm with NRF24L01 inter-communication' },
    { label: 'Field Functions', value: '5 Capabilities', detail: 'Ploughing, seeding, pesticide spraying, irrigation, disease monitoring' },
    { label: 'KSCST SPP', value: '46th Series', detail: 'Funded project under Karnataka State Council for Science and Technology' },
  ],
  architectureSteps: [
    {
      step: '01',
      title: 'Autonomous Field Navigation',
      description: 'Master robot leads field navigation while slave robots follow coordinated paths. Differential-drive rovers navigate crop furrows using ultrasonic collision avoidance sensors (range up to 100 cm). Motor control via L293D motor driver interfaced with Raspberry Pi GPIO pins.',
      tech: 'Raspberry Pi, L293D Motor Driver, Ultrasonic Sensors',
    },
    {
      step: '02',
      title: 'Swarm Communication Protocol (NRF24L01)',
      description: 'Master-slave inter-robot communication via NRF24L01 RF modules. Master robot broadcasts task assignments and terrain boundaries to slave robots. Decentralized mesh networking enables spatial partitioning of the field among the swarm.',
      tech: 'NRF24L01 RF Modules, Raspberry Pi, Wi-Fi (Blynk Cloud)',
    },
    {
      step: '03',
      title: 'Multi-Function Agricultural Actuators',
      description: 'Ploughing: 12V DC servomotor-operated adjustable plough tool. Seed sowing: automated seed dispenser with adjustable spacing. Pesticide spraying: precision water pump relay triggered upon disease detection. Irrigation: water pump activated when DHT11 temperature/humidity crosses threshold.',
      tech: 'DC Servomotor, Relay Module, Water Pump, DHT11 Sensor',
    },
    {
      step: '04',
      title: 'Computer Vision Foliage Capture',
      description: 'High-resolution Raspberry Pi camera modules capture leaf samples under varied ambient solar illumination. Images are preprocessed and fed into the DenseNet-121 CNN classifier for plant disease detection.',
      tech: 'Raspberry Pi Camera Module, OpenCV, Python',
    },
    {
      step: '05',
      title: 'DenseNet-121 Pathology Inference & Alert',
      description: 'DenseNet-121 CNN classifies captured leaf images as Healthy or Disease. Each layer in the DenseNet architecture connects to every other layer directly, alleviating the vanishing gradient problem. Disease detections trigger pesticide spraying and geo-tag infection hotspots. Results transmitted to Blynk IoT cloud dashboard for remote farmer monitoring.',
      tech: 'DenseNet-121, TensorFlow / Keras, Blynk IoT Cloud',
    },
  ],
  keyCapabilities: [
    {
      title: 'Decentralized Swarm Coordination',
      description: 'Master robot orchestrates task allocation and field partitioning among slave robots without a single point of failure central server. Robots autonomously self-organize to cover the entire agricultural field, drawing inspiration from ant and bee colony collective behaviour.',
    },
    {
      title: 'DenseNet-121 Leaf Disease Diagnosis',
      description: 'DenseNet-121 architecture — with dense connections between all layers in each block — classifies early-stage plant diseases (rust, blight, pest damage) from leaf imagery. Enables micro-targeted pesticide application only where disease is detected, reducing chemical usage.',
    },
    {
      title: 'Micro-Climate IoT Telemetry',
      description: 'DHT11 sensors log soil moisture, ambient temperature, and humidity in real-time. When environmental thresholds are exceeded, irrigation is automatically triggered. All field data streamed to Blynk cloud for remote monitoring via Android smartphone.',
    },
    {
      title: 'Solar-Powered Autonomous Operation',
      description: 'Both master and slave robots are equipped with solar panels and battery systems for sustained field operation. Energy-efficient sleep/wake cycles and optimized motor PWM curves maximize battery longevity in extended field missions.',
    },
  ],
  challenges: [
    {
      challenge: 'Varying natural sunlight degrading computer vision accuracy',
      solution: 'Implemented adaptive histogram equalization and HSV color-space normalization before feeding images to the DenseNet-121 classifier. The dense connections within DenseNet also improve robustness to varying illumination conditions.',
    },
    {
      challenge: 'Power constraints on mobile rovers in rough terrain',
      solution: 'Designed an energy-efficient sleep/wake sensing cycle and optimized motor PWM curves to maximize battery longevity. Solar panels on each robot provide continuous charge during daylight field operations.',
    },
    {
      challenge: 'Inter-robot coordination and collision avoidance in dense crop rows',
      solution: 'NRF24L01 RF modules enable real-time master-slave position broadcasting. Ultrasonic sensors with 100 cm detection range prevent collisions. Field partitioned algorithmically by master robot to eliminate territory overlap between slave robots.',
    },
  ],
  techStackCategories: [
    { category: 'Hardware & Embedded', items: ['Raspberry Pi', 'L293D Motor Driver', 'DC Servo Motor', 'Ultrasonic Sensors', 'DHT11 Sensor', 'Solar Panel', 'Water Pump Relay'] },
    { category: 'Computer Vision & AI', items: ['Python', 'OpenCV', 'DenseNet-121', 'TensorFlow / Keras', 'CNN', 'Image Classification'] },
    { category: 'Networking & IoT', items: ['NRF24L01 RF', 'Blynk IoT Cloud', 'Wi-Fi Module', 'Android Remote Control'] },
  ],
  reportSections: [
    {
      heading: 'Project Title & Credentials',
      content: `SWARM ROBOTICS FOR IRRIGATION (SRI)
A PROJECT REPORT

Submitted by:
KANDULA JITHENDRA SUBRAMANYAM    — 20191ECE0148 (Team Leader)
KANTAGANI ARUN KUMAR              — 20191ECE0151
KANTHETI TARUN MANIKANTA          — 20191ECE0152
KATTA RAMPRASAD                   — 20191ECE0159
KESANA KASEE VISWANADH            — 20191ECE0161

In partial fulfillment for the award of the degree of
BACHELOR OF TECHNOLOGY in ELECTRONICS AND COMMUNICATION ENGINEERING
DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING
SCHOOL OF ENGINEERING

Under the Guidance of: Dr M.S. DIVYA RANI
Head-Innovative Projects and Associate Professor
PRESIDENCY UNIVERSITY, Bengaluru
Academic Year: 2022-2023

KSCST Recognition: Accepted and funded under the Karnataka State Council for Science and Technology (KSCST) 46th Student Project Programme (SPP) 2022-23
Project Title (KSCST): SWARM ROBOTICS IRRIGATION (SRI)
Processing Fee Reference: Rs. 1000/- NEFT payment submitted
Institution: Presidency University, Bengaluru
SPP Coordinator: Dr. RAMESH C S (Dean R&D)
Project Guide: Dr M.S Divya Rani | HOD: Dr. Rajiv Ranjan Singh`,
    },
    {
      heading: 'Abstract',
      content: `The project proposes an IoT-based Agribot capable of performing multiple agricultural tasks simultaneously through a coordinated swarm of autonomous robots. Swarm robotics, which emphasizes flexibility, scalability, and robustness in completing complicated tasks, is one of the multi-robot techniques particularly useful for precision farming and large-scale agricultural applications.

This Agribot offers a cutting-edge approach for harvesting and watering crops with the least amount of labour, making it a useful machine. An Android smartphone can be used to control the vehicle online. Motors and sensors interfaced with embedded computers (Raspberry Pi) are built for the entire calculation, processing, and monitoring process. The robot is managed using Internet of Things (IoT) technology via the Blynk cloud platform.

The main aim of this project is to propose an IoT-based Agribot for agricultural data acquisition, combining:
- Temperature and humidity monitoring with automatic irrigation control
- Autonomous ploughing, seed sowing, and pesticide spraying
- Plant disease detection using DenseNet-121 CNN image classification
- Inter-robot communication via NRF24L01 RF modules in a Master-Slave architecture
- Solar-powered sustained field operation

The system demonstrates that swarm robotic technology can reduce agricultural labour requirements, increase efficiency, enable precision agriculture, and improve real-time decision-making for farmers.`,
    },
    {
      heading: 'Chapter 1: Introduction',
      content: `1.1 Background

Agriculture is one of the most critical sectors globally, yet it faces challenges including labor shortages, climate variability, and the need for precision in resource application. Traditional farming methods are often inefficient, labor-intensive, and environmentally unsustainable. The emergence of robotic systems, particularly swarm robotics, presents a transformative opportunity to address these challenges.

Swarm robotics, inspired by the collective behavior of social insects like ants and bees, involves the coordination of multiple simple robots to perform complex tasks. These systems offer advantages such as scalability, robustness, and adaptability, making them well-suited for agricultural applications. By deploying swarms of robots equipped with sensors and actuators, it becomes possible to monitor crop health, perform precision tasks such as seeding and harvesting, and manage resources more efficiently.

1.2 Objectives

The primary objectives of this project are:
1. Design and develop a swarm robotic system capable of performing coordinated agricultural tasks including ploughing, seed sowing, pesticide spraying, and irrigation.
2. Implement autonomous navigation using ultrasonic collision avoidance sensors.
3. Integrate a Master-Slave communication architecture using NRF24L01 RF modules.
4. Deploy DenseNet-121 CNN for automated plant disease detection from leaf imagery.
5. Enable remote monitoring and control via Blynk IoT cloud and Android smartphone.
6. Demonstrate the feasibility of solar-powered swarm robots for sustained field operation.

1.3 History

In the 1980s, the idea of swarm robots was developed, taking cues from social insects like termites, bees, and ants. Researchers started looking into the possibility of creating robotic systems that mimic these natural swarms' cooperative behaviour. The study of collective behaviour and emergent features in swarm systems led to the development of simulation models and computer-based experiments, which helped the field of swarm robotics gain recognition in the 1990s.

The creation of the Kilobot project in 2009 marked a crucial turning point in swarm robotics. Small, inexpensive robots called Kilobots are created for swarm robotics research. Their scalability and low cost drove further research. In 2005, the RoboCup Rescue tournament established a league devoted solely to swarm robotics, encouraging search-and-rescue applications.

A variety of swarm robot platforms including the e-puck, MarXbot, and Droplet were created, opening up new research opportunities. In 2010, the Swarmanoid project sought to develop a heterogeneous swarm of robots by combining various robot types to achieve cooperative behaviour. Today, swarm robotics applications are being investigated in agriculture, construction, surveillance, and exploration industries.

1.4 Advantages of Swarm Robots in Agriculture
- Increased efficiency and speed of field operations
- Precision agriculture with targeted resource application
- Scalability to any field size
- Reduced labor requirements
- Minimized soil compaction (lightweight individual robots)
- Real-time monitoring and data collection
- Flexibility and adaptability to different crops
- Reduced chemical use through precision pesticide application
- Enhanced data-driven decision-making

1.5 Applications of Swarm Robots in Agriculture
- Crop Monitoring and Inspection
- Pollination assistance
- Precision Seeding and Planting
- Weed Management
- Crop Harvesting
- Soil Sampling and Analysis
- Irrigation Management`,
    },
    {
      heading: 'Chapter 2: Literature Review',
      content: `2.1 Development and Validation of a Deep Learning Algorithm for the Recognition of Plant Disease
Author: Sijiang Huang, Weijie Liu, Fei Qi and Kepeng Yang (2019)

Proposes a novel deep neural network structure for classifying plant types and plant diseases using a single leaf image. The model consists of two sub-models: a leaf segmentation model employing U-Net to separate leaves from the background, and a plant disease classification model based on a Two-head network. Verified using the plant disease dataset with 8 plant species and 19 plant diseases (AI Challenger 2019). Results: 0.9807 accuracy for plant classification, 0.8745 accuracy for disease recognition.

2.2 Plant Leaf Disease Diagnosis from Color Imagery Using Co-Occurrence Matrix and Artificial Intelligence System
Author: Chaowalit Khitthuk et al. (2018)

Uses colour photography and disease feature analysis. Gray-level co-occurrence matrix and texture features used in a simplified fuzzy ARTMAP classifier to categorize four different grape leaf disease image types. Results are applicable for real-world plant leaf disease identification.

2.3 Prediction Models for Identification and Diagnosis of Tomato Plant Diseases
Author: Shradha Verma, Anuradha Chug, Amit Prakash Singh (2018)

Survey on image processing and IoT-based detection and prediction models for tomato plant diseases. Identifies the biological and computational components of disease diagnosis. Proposes merging IoT sensors with imaging techniques for comprehensive disease monitoring.

2.4 Swarm Robots in Agriculture
Author: Ravi Nandan, Lokesh, Nikita Balappa Narasannavar, Pratyusha S, Sampath

SWARM robotics study of how relatively simple physically embodied robots can be designed such that desired collective behavior emerges from local interactions. Result: Developed swarm robots that internally communicate with each other and perform ploughing, seeding, and manuring operations. Collision avoidance via ultrasonic sensors (range up to 100 cm). Demonstrated reduction of farmer workload through autonomous operation.

2.5 Hybrid Feature-Based Disease Detection in Plant Leaf Using CNN, Bayesian Optimized SVM, and Random Forest Classifier
Author: Ashutosh Kumar Singh, SVN Sreenivasu, U.S.B.K. Mahalaxmi, et al.

Hybrid approach combining CNN feature extraction with Bayesian-optimized SVM and Random Forest classifiers for plant leaf disease detection. Demonstrates improved classification accuracy over single-model approaches.

2.6 Swarm Robots in Mechanized Agricultural Operations: Roadmap for Research
Author: Daniel Albiero, Angel Pontin Garcia, Claudio Kiyoshi Umezu, et al.

Roadmap for deploying swarm robotic systems across mechanized agricultural operations. Addresses challenges in coordination, scalability, and practical deployment in field environments.`,
    },
    {
      heading: 'Chapter 3: System Design & Objectives',
      content: `3.1 Measurement of Temperature and Humidity in the Field

One of the objectives is to use the swarm robots to measure temperature and humidity levels in the field. DHT11 sensors provide this data to monitor environmental conditions and determine when irrigation is required. When the temperature and humidity levels reach a certain threshold, the swarm robots activate the water pump relay to irrigate the field and maintain optimal moisture levels for the crops.

3.2 Ploughing

Ploughing is incorporated into the swarm robot's capabilities as a crucial first step in farming. The design of the plough depends on factors such as soil type and desired ploughing depth based on the crop being grown. The plough tool is operated by a 12V DC servomotor. Through coding, the initial and final positions of the plough tool are controlled, ensuring precise and controlled ploughing. The angle of inclination and length of the tool are calibrated to achieve the desired depth based on specific crop and soil conditions.

3.3 Seed Sowing and Pest Detection and Control

The swarm robots are programmed to sow seeds at appropriate intervals and depths, ensuring uniform distribution and optimal growing conditions. The robots incorporate image processing techniques (DenseNet-121 CNN) to detect pests or signs of diseases in crops. If a pest or disease is detected, the robots spray pesticides or implement appropriate control measures via a water pump relay mechanism.

3.4 Block Diagram

Master Robot Block Diagram:
BLYNK CLOUD → WI-FI MODULE → RASPBERRY PI → [CAMERA, DHT11 SENSOR, DC MOTOR1, DC MOTOR2 via L293D MOTOR DRIVER, NRF RF MODULE, WATER PUMP RELAY, SOLAR BATTERY PANEL]

Slave Robot Block Diagram:
NRF RF MODULE → RASPBERRY PI → [CAMERA, DHT11 SENSOR, DC MOTOR1, DC MOTOR2 via L293D MOTOR DRIVER, WATER PUMP RELAY, SEED SOWING, HARVESTING MODULE, SOLAR BATTERY PANEL]

The master robot communicates with the Blynk cloud for remote Android control, while slave robots receive task assignments from the master via NRF24L01 RF communication.`,
    },
    {
      heading: 'Chapter 4: Methodology',
      content: `4.1 Raspberry Pi as a Platform for Robotics

Raspberry Pi has emerged as a popular and versatile platform for robotics due to its compact size, low cost, and powerful computing capabilities. Its GPIO pins enable direct interfacing with motors, sensors, and other components. Multiple USB ports expand connectivity options for additional sensors.

Key Raspberry Pi Capabilities for Robotics:
a. Processing Power: Powerful ARM-based processor handles complex computations for sensor data processing, decision-making algorithms, and real-time control.
b. Operating System Support: Linux-based Raspbian provides a robust environment for software development with existing libraries and frameworks.
c. Camera Interface: Raspberry Pi Camera Module provides high-quality imaging for computer vision, object detection, and image processing.
d. Network Connectivity: Built-in Ethernet and Wi-Fi enable seamless integration with Blynk cloud. Supports wireless communication protocols like Bluetooth for multi-robot coordination.

4.2 Design and Fabrication of Swarm Robots

4.2.1 Requirements Analysis

Size and Shape:
- Compact and agile design for maneuvering through tight spaces and uneven terrain
- Optimized for efficient operation in agricultural fields without damaging crops
- Lightweight to minimize soil compaction

4.2.3 Ploughing System:
- 12V DC servomotor-operated plough tool with adjustable angle and depth
- Calibrated for different soil types and crop requirements
- Automated initial and final position control via Raspberry Pi

4.2.4 Seed Sowing:
- Adjustable sowing mechanism for different seed sizes and densities
- Uniform seed placement along ploughed tracks
- Precise seed depth control for optimal germination

4.2.5 Pesticide Spraying:
- Water pump relay system triggered by disease detection output
- Precision application to minimize chemical usage
- Integrated with DenseNet-121 disease detection pipeline

4.2.6 Image Capturing:
- Raspberry Pi camera modules on each robot
- High-resolution images processed by DenseNet-121 CNN
- Results transmitted to Blynk cloud dashboard for remote analysis

4.3 NRF24L01 Communication Protocol

The NRF24L01 RF transceiver module operates at 2.4 GHz and provides reliable wireless communication between master and slave robots. Key specifications:
- Operating frequency: 2.4 GHz ISM band
- Communication range: up to 100 meters in open field
- Data rate: 250 kbps to 2 Mbps
- Interface: SPI (Serial Peripheral Interface)

The master robot broadcasts task assignments and position data to all slave robots. Slave robots acknowledge receipt and report their status. This decentralized coordination prevents collisions and ensures full field coverage.

4.4 DHT11 Environmental Sensing

The DHT11 digital temperature and humidity sensor provides:
- Temperature range: 0°C to 50°C (±2°C accuracy)
- Humidity range: 20% to 80% RH (±5% accuracy)
- Digital output via single-wire interface to Raspberry Pi GPIO

When temperature or humidity exceeds programmed thresholds, the irrigation water pump relay is automatically activated. Sensor readings are also logged to the Blynk IoT cloud for historical analysis.`,
    },
    {
      heading: 'Chapter 5: DenseNet-121 CNN for Plant Disease Detection',
      content: `5.1 Introduction to DenseNet

In a standard feed-forward convolutional neural network (CNN), each convolutional layer receives only the output of the layer immediately preceding it. The vanishing gradient problem emerges when the CNN has more layers — as the channel for information from input to output lengthens, gradients become negligibly small, making training increasingly difficult.

By altering the typical CNN architecture and streamlining connectivity between layers, DenseNets alleviate this issue. Each layer in a DenseNet architecture is connected to every other layer directly in a feed-forward fashion. For an L-layer network, there are L(L+1)/2 connections — one from each layer to every subsequent layer.

5.2 DenseNet Architecture & Components

Connectivity:
The feature maps from all preceding layers are concatenated and utilized as inputs to each layer:
H_l = F_l([x_0, x_1, ..., x_{l-1}])

where [x_0, x_1, ..., x_{l-1}] represents the concatenation of feature maps from all layers prior to l. This eliminates redundant feature mappings, allowing DenseNets to require fewer parameters than traditional CNNs.

Dense Blocks:
When the size of feature maps varies, direct concatenation is not possible. DenseNets are divided into DenseBlocks where the size of feature maps within a block is kept constant. Transition Layers (1×1 Conv + Average Pool) connect blocks, reducing feature map dimensions between blocks.

Growth Rate:
Each layer adds 'K' features on top of the global state (feature maps from all previous layers). After passing through each dense layer, the feature map size increases by K. This controls the information flow and model width.

Bottleneck Layers:
Despite each layer only generating K output feature-maps, inputs can be large for higher layers. A 1×1 convolution (bottleneck) is introduced before each 3×3 convolution to reduce the number of input feature maps, increasing computational efficiency.

5.3 DenseNet-121 Architecture

DenseNet-121 contains 121 layers in total:
1. Initial 7×7 Convolution (64 filters, stride 2)
2. 3×3 Max Pooling (stride 2)
3. Dense Block 1: 2 convolutions × 6 instances
4. Transition Layer 1: 1 Conv + 1 Avg Pool
5. Dense Block 2: 2 convolutions × 12 instances
6. Transition Layer 2: 1 Conv + 1 Avg Pool
7. Dense Block 3: 2 convolutions × 24 instances
8. Transition Layer 3: 1 Conv + 1 Avg Pool
9. Dense Block 4: 2 convolutions × 16 instances
10. Global Average Pooling
11. Output Layer (Softmax classification)

Total layers: 1 (7×7 Conv) + 58 (3×3 Conv) + 61 (1×1 Conv) + 4 (Avg Pool) + 1 (FC) = 121 layers

In short, DenseNet-121 has 120 Convolutions and 4 Average Pooling layers.

5.4 Disease Detection Results

The DenseNet-121 model trained on agricultural leaf datasets achieves:
- Classification task: Healthy vs Disease (binary classification)
- Test accuracy: 93.4% on validation set
- The dense connections enable deeper layers to utilize features extracted in early layers, improving robustness to illumination variations in field conditions
- The higher weights given by deeper layers to transition layer outputs indicate that higher-level features emerge progressively deeper in the model`,
    },
    {
      heading: 'Chapter 12: Results',
      content: `12.1 Physical System Results

Robot 1 (Master): Successfully demonstrated autonomous navigation, NRF-based slave coordination, Blynk cloud connectivity, and Android remote control. Temperature and humidity readings from DHT11 correctly trigger irrigation water pump when thresholds are exceeded.

Robot 2 (Slave): Successfully demonstrates receiving task assignments from master robot via NRF24L01 RF communication. Performs independent ploughing, seed sowing, and pesticide spraying operations as directed.

12.2 Communication Results

NRF24L01 RF communication successfully established between master and slave robots at ranges up to 100 cm within crop rows. Message delivery rate: reliable under normal field conditions. Blynk cloud connection maintained via Wi-Fi for remote monitoring from Android smartphone.

12.3 Prediction Results

DenseNet-121 CNN Predictions:
- Predicted: Healthy — correctly classified as disease-free leaf
- Predicted: Disease — correctly identified diseased leaf sample

The model successfully distinguishes between healthy and diseased plant leaves in real-time field conditions.

12.4 System Performance Summary

- Swarm coordination: Master-slave architecture successfully partitions field tasks
- Disease detection: DenseNet-121 achieves 93.4% classification accuracy
- Environmental monitoring: DHT11 temperature/humidity triggers automatic irrigation
- Remote control: Blynk IoT cloud enables full smartphone control of robot swarm
- Collision avoidance: Ultrasonic sensors prevent inter-robot and obstacle collisions`,
    },
    {
      heading: 'Chapter 13: Future Work',
      content: `13.1 Future Enhancements and Extensions

Improved Communication and Coordination:
Develop advanced communication protocols and coordination mechanisms to enhance interaction and collaboration between swarm robots. This could involve optimizing the NRF24L01 protocol, exploring 5G IoT connectivity, or implementing SLAM (Simultaneous Localization and Mapping) for GPS-free navigation.

Enhanced Sensing and Perception:
Integrate advanced sensors including multispectral cameras for early-stage disease detection before visible symptoms appear, LiDAR for 3D terrain mapping, and soil moisture sensors for precision irrigation management.

Adaptive Swarm Behavior:
Implement adaptive behaviors allowing robots to dynamically adjust strategies based on environmental feedback. This includes reinforcement learning for autonomous task re-allocation when individual robots encounter obstacles or failures.

Swarm Robotic Learning:
Explore machine learning and AI techniques to enable swarm robots to learn from their interactions and improve performance over time. Federated learning approaches could allow the swarm to collectively improve the disease detection model without centralized data collection.

Fault Tolerance and Robustness:
Design built-in fault tolerance mechanisms ensuring the system continues functioning even when individual robots fail. This includes redundant communication channels and automatic task reassignment when robots go offline.

Scalability and Expansion:
Develop strategies and algorithms to scale the swarm robotic system to larger groups of robots. Address scalability challenges related to communication bandwidth, task allocation complexity, and power management.`,
    },
    {
      heading: 'Chapter 14: Conclusion',
      content: `14.1 Summary of Project Objectives and Achievements

In this project, we have successfully developed a swarm robotic system capable of performing coordinated agricultural tasks in a decentralized manner. Inspired by the collective behavior of social insects, we explored swarm intelligence principles to design a network of robots that collaboratively perform complex, multi-step agricultural operations.

The system's Master-Slave architecture allows for seamless integration of individual robots, enabling them to share information via NRF24L01 RF modules, make collective decisions, and accomplish complex missions. By leveraging advanced robotics, computer vision (DenseNet-121 CNN), and IoT cloud connectivity (Blynk), we demonstrated the practical feasibility of autonomous agricultural robots.

Key achievements:
1. Successfully built and demonstrated Master and Slave robot hardware with Raspberry Pi compute platform.
2. Implemented autonomous agricultural operations: ploughing (12V DC servomotor), seed sowing, pesticide spraying, and irrigation (water pump relay with DHT11 threshold control).
3. Deployed DenseNet-121 CNN for real-time plant disease detection, achieving 93.4% classification accuracy.
4. Established reliable NRF24L01 RF inter-robot communication for decentralized swarm coordination.
5. Integrated Blynk IoT cloud for real-time remote monitoring and Android smartphone control.
6. Solar-powered operation demonstrated for sustained field deployment.
7. Project accepted and funded under KSCST 46th Student Project Programme (SPP) 2022-23.

This project demonstrates that swarm robotic technology can meaningfully reduce agricultural labour requirements, improve crop health monitoring, enable precision resource application, and provide scalable, cost-effective solutions for modern precision farming.`,
    },
    {
      heading: 'References',
      content: `1. Antanasio D. Overview of swarm intelligence. Swarm Intelligence; 2010. Available: https://www.cpp.edu

2. Deneubourg JL, Pasteels JM, Verhaeghe JC. Probabilistic behaviour in ants: A strategy of errors. Journal of Theoretical Biology. 1983;105(2):259-271.

3. Karthik Narayanan, Vinayak Honkote, Dibyendu Ghosh, Swamy Baldev. Energy Efficient Communication with Lossless Data Encoding for Swarm Robot Coordination. 2019 IEEE. 2380-6923/19/$31.00.

4. Hybrid Feature-Based Disease Detection in Plant Leaf Using Convolutional Neural Network, Bayesian Optimized SVM, and Random Forest Classifier. Ashutosh Kumar Singh, SVN Sreenivasu, U.S.B.K. Mahalaxmi, et al.

5. Swarm Robots in Mechanized Agricultural Operations: Roadmap for Research. Daniel Albiero, Angel Pontin Garcia, Claudio Kiyoshi Umezu, Rodrigo Leme de Paulo.

6. Li Lu, Dunwei Gong. Robot Path Planning in Unknown Environments Using Particle Swarm Optimization. 978-0-7695-3304-9/08. 2008 IEEE. DOI 10.1109/ICNC.2008.923.

7. Arvin F., Samsudin K., Ramli A. Development of IR-based short-range communication techniques for swarm robot applications. Adv. Electr. Comput. Eng. 2010;10:61–68. [CrossRef]

8. Gigliotta O., Mirolli M., Nolfi S. Communication based dynamic role allocation in a group of homogeneous robots. Nat. Comput. 2014;13:391–402. [CrossRef]

9. Sijiang Huang, Weijie Liu, Fei Qi and Kepeng Yang. Development and Validation of a Deep Learning Algorithm for the Recognition of Plant Disease. 2019.

10. Chaowalit Khitthuk et al. Plant Leaf Disease Diagnosis from Color Imagery Using Co-Occurrence Matrix and AI System. 2018.

11. Shradha Verma, Anuradha Chug, Amit Prakash Singh. Prediction Models for Identification and Diagnosis of Tomato Plant Diseases. 2018.

Project submitted to: Department of Electronics and Communication Engineering, School of Engineering, Presidency University, Bengaluru.
Academic Year: 2022-2023 (B.Tech Final Year).
Under guidance of: Dr M.S. Divya Rani, Head-Innovative Projects & Associate Professor.
KSCST SPP: 46th Series, 2022-23. Karnataka State Council for Science and Technology, IISc Campus, Bengaluru.`,
    },
  ],
};
