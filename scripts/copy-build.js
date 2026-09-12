const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const nextDir = path.join(rootDir, '.next');
const frontendNextDir = path.join(rootDir, 'frontend', '.next');

console.log('[build-sync] Ensuring Next.js build artifacts exist in both .next and frontend/.next...');

// Sync .next directories in both directions so whichever path Vercel inspects, it finds all build artifacts
if (fs.existsSync(nextDir)) {
  fs.mkdirSync(path.join(rootDir, 'frontend'), { recursive: true });
  fs.cpSync(nextDir, frontendNextDir, { recursive: true });
  console.log('[build-sync] Successfully mirrored .next -> frontend/.next');
} else if (fs.existsSync(frontendNextDir)) {
  fs.cpSync(frontendNextDir, nextDir, { recursive: true });
  console.log('[build-sync] Successfully mirrored frontend/.next -> .next');
}

// Ensure public directory is available at both root and frontend/public
const publicDir = path.join(rootDir, 'public');
const frontendPublicDir = path.join(rootDir, 'frontend', 'public');
if (fs.existsSync(publicDir) && !fs.existsSync(frontendPublicDir)) {
  fs.mkdirSync(path.join(rootDir, 'frontend'), { recursive: true });
  fs.cpSync(publicDir, frontendPublicDir, { recursive: true });
  console.log('[build-sync] Successfully mirrored public -> frontend/public');
}

// Ensure api/index.py exists in both root and frontend/api
const apiDir = path.join(rootDir, 'api');
const frontendApiDir = path.join(rootDir, 'frontend', 'api');
if (fs.existsSync(apiDir) && !fs.existsSync(frontendApiDir)) {
  fs.mkdirSync(frontendApiDir, { recursive: true });
  fs.cpSync(apiDir, frontendApiDir, { recursive: true });
  console.log('[build-sync] Successfully mirrored api -> frontend/api');
}
