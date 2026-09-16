import json
import os
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

# ============================================================
# JITHENDRA'S CORE PORTFOLIO KNOWLEDGE BASE (PYTHON BACKEND)
# ============================================================
PORTFOLIO_CONTEXT = """
You are the interactive AI assistant for Kandula Jithendra Subramanyam's portfolio.
Full Name: Kandula Jithendra Subramanyam (Jithendra)
Roles: AI Systems Engineer, Quantitative Financial Researcher, Multi-Agent Systems Architect, and Full-Stack Developer.
Location: Mumbai, Maharashtra, India.
Contact: kandulajithendrasubramanyam@gmail.com, phone: +91-9704400336
GitHub: https://github.com/jithendra259
LinkedIn: https://linkedin.com/in/kandulajithendra
Portfolio: https://jithendra-portfolio.vercel.app

Education:
- M.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning), Presidency University Bangalore (2024–2026), CGPA: 9.68/10.
- B.Tech in Electronics & Communication Engineering, Sree Vidyanikethan Engineering College, Tirupati (2018–2022), CGPA: 8.64/10.

Key Research Publications:
1. "Autonomous Multi-Agent Financial Blackboard Architecture for Graph-Regularized CVaR Portfolio Optimization" (Elsevier EAAI, Under Review).
2. "Regime-Adaptive Supervisory Governance for Resilient Portfolio Construction via Composite Instability Detection" (IJCACI 2026 Proceedings).
3. "Supervisory Multi-Agent Framework for Explainable and Policy-Compliant Quantitative Portfolio Governance" (Elsevier CAS, Under Review).
4. "Swarm Robotics System for Autonomous Agriculture" (KSCST Funded Project).
5. "Personalised Real-Time Air Quality Index (AQI) Guidance System" (M.Tech Mini Project).
"""

class handler(BaseHTTPRequestHandler):
    """
    Vercel Serverless Python Handler
    Responds to /api/py/health, /api/py/profile, and /api/py/chat
    """

    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        path = self.path.split("?")[0].rstrip("/")

        if path in ("/api/py/health", "/api/py", ""):
            data = {
                "status": "healthy",
                "backend": "python",
                "platform": "vercel-serverless",
                "author": "Kandula Jithendra Subramanyam",
                "version": "1.0.0",
                "message": "Python backend is running successfully on Vercel."
            }
            self._set_headers(200)
            self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))
            return

        if path == "/api/py/profile":
            data = {
                "name": "Kandula Jithendra Subramanyam",
                "title": "AI Systems Engineer & Quantitative Researcher",
                "location": "Mumbai, Maharashtra, India",
                "education": [
                    {
                        "degree": "M.Tech in CSE (AI & ML)",
                        "institution": "Presidency University Bangalore",
                        "period": "2024 – 2026",
                        "cgpa": "9.68 / 10"
                    },
                    {
                        "degree": "B.Tech in ECE",
                        "institution": "Sree Vidyanikethan Engineering College",
                        "period": "2018 – 2022",
                        "cgpa": "8.64 / 10"
                    }
                ],
                "publications": [
                    "Elsevier EAAI (2026) - Autonomous Multi-Agent Financial Blackboard Architecture",
                    "IJCACI (2026) - Regime-Adaptive Supervisory Governance",
                    "Elsevier CAS (2026) - Supervisory Multi-Agent Framework for Explainable AI"
                ],
                "contact": {
                    "email": "kandulajithendrasubramanyam@gmail.com",
                    "phone": "+91-9704400336",
                    "github": "https://github.com/jithendra259",
                    "linkedin": "https://linkedin.com/in/kandulajithendra"
                }
            }
            self._set_headers(200)
            self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))
            return

        # Fallback for other GET requests
        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found", "path": path}).encode("utf-8"))

    def do_POST(self):
        path = self.path.split("?")[0].rstrip("/")

        if path == "/api/py/chat":
            content_length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(content_length) if content_length > 0 else b"{}"
            try:
                payload = json.loads(body_bytes.decode("utf-8"))
            except Exception:
                payload = {}

            user_message = payload.get("message", "").strip()
            if not user_message:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Missing 'message' in request body"}).encode("utf-8"))
                return

            google_api_key = os.environ.get("GOOGLE_API_KEY")
            reply_text = ""

            # If GOOGLE_API_KEY is available in Vercel environment variables, query Gemini
            if google_api_key:
                try:
                    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={google_api_key}"
                    prompt_data = {
                        "contents": [
                            {
                                "role": "user",
                                "parts": [
                                    {"text": f"{PORTFOLIO_CONTEXT}\n\nUser Question: {user_message}\nAnswer concisely, accurately, and professionally as Jithendra's AI assistant."}
                                ]
                            }
                        ]
                    }
                    req = urllib.request.Request(
                        gemini_url,
                        data=json.dumps(prompt_data).encode("utf-8"),
                        headers={"Content-Type": "application/json"}
                    )
                    with urllib.request.urlopen(req, timeout=10) as resp:
                        resp_data = json.loads(resp.read().decode("utf-8"))
                        reply_text = resp_data["candidates"][0]["content"]["parts"][0]["text"]
                except Exception as e:
                    reply_text = f"Hello! I am Jithendra's AI assistant. Kandula Jithendra Subramanyam is an AI Systems Engineer and Quantitative Financial Researcher specializing in Multi-Agent Systems, CVXPY optimization, and Full-Stack Engineering (M.Tech CGPA 9.68/10). Reach him at kandulajithendrasubramanyam@gmail.com."
            else:
                reply_text = f"Hello! I am Jithendra's AI assistant. Kandula Jithendra Subramanyam is an AI Systems Engineer and Quantitative Financial Researcher specializing in Multi-Agent Systems, CVXPY optimization, and Full-Stack Engineering (M.Tech CGPA 9.68/10). Reach him at kandulajithendrasubramanyam@gmail.com."

            response_data = {
                "reply": reply_text,
                "author": "Kandula Jithendra Subramanyam",
                "backend": "python-vercel-serverless"
            }
            self._set_headers(200)
            self.wfile.write(json.dumps(response_data).encode("utf-8"))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))
