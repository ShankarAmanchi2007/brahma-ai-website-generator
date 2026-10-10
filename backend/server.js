require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const deployService = require('./services/deployService');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'BRAHMA Autonomous AI Web Engine',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

// Public Live Deployment Hosting Route
app.get('/live/:deploymentId', (req, res) => {
  const { deploymentId } = req.params;
  const html = deployService.getDeploymentHtml(deploymentId);

  if (!html) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Deployment Not Found • BRAHMA</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-[#050505] text-white min-h-screen flex items-center justify-center p-6 text-center font-sans">
        <div class="max-w-md bg-[#0c0c0c] border border-[#222222] rounded-2xl p-8 space-y-4">
          <div class="w-12 h-12 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-400 flex items-center justify-center mx-auto text-xl">⚠️</div>
          <h1 class="text-xl font-bold font-display">Deployment Not Found</h1>
          <p class="text-neutral-400 text-xs">Deployment ID <code>${deploymentId}</code> does not exist or has expired.</p>
        </div>
      </body>
      </html>
    `);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// Central Error Handler
app.use(errorHandler);

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`⚡ BRAHMA Autonomous AI Web Engine Backend is LIVE!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
    console.log(`===============================================`);
  });
}

startServer();
