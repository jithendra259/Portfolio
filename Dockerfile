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

# Copy application source modules and subfolders
COPY config/ ./config/
COPY api/ ./api/
COPY voice/ ./voice/
COPY agent/ ./agent/
COPY prompts/ ./prompts/
COPY cache/ ./cache/
COPY server.py .
COPY app.py .

# Pre-download required LiveKit agent model files (e.g. Silero VAD)
RUN python -m livekit.agents download-files || python app.py download-files || true

EXPOSE 10000

# Run LiveKit agent worker in production mode
CMD ["python", "app.py", "start"]
