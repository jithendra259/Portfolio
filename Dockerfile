# Production Dockerfile for LiveKit Voice Agent Worker
FROM python:3.11-slim

# Install system dependencies (ffmpeg for audio streams)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download required LiveKit agent model files (e.g. Silero VAD)
RUN python -m livekit.agents.cli download-files || true

# Copy application source
COPY app.py .

# Run LiveKit agent worker in production mode
CMD ["python", "app.py", "start"]
