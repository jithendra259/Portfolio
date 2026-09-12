import json
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        data = {
            "status": "healthy",
            "service": "Jithendra Portfolio Python Backend",
            "platform": "vercel",
            "message": "Python backend is active on Vercel."
        }
        self.wfile.write(json.dumps(data, indent=2).encode('utf-8'))
