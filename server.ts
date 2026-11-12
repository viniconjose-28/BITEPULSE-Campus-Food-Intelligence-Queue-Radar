import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Multi-turn Gemini Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], taskType = 'general' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        message: 'No Gemini API key detected on server, running offline campus intelligence mode.',
      });
    }

    // Select model based on task complexity
    let model = 'gemini-3.5-flash';
    if (taskType === 'complex') {
      model = 'gemini-3.1-pro-preview';
    } else if (taskType === 'fast') {
      model = 'gemini-3.1-flash-lite';
    }

    // Format multi-turn conversation history
    const contents = [];
    for (const h of history) {
      contents.push({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      });
    }
    // Append latest user turn
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const systemInstruction =
      'You are BiteBot, the smart campus food discovery and queue intelligence assistant for university students at BitePulse. ' +
      'You help students find meals within tight time limits (like 10-minute lecture breaks), pocket-friendly budgets (under ₹50, ₹100), ' +
      'recommend trending campus dishes (Double Smash Burger, Paneer Wrap, Cold Coffee), and promote end-of-day Food Rescue discounts (35%-42% off). ' +
      'Tone: energetic, witty, student-friendly, and concise. Style: Modern Black and Neon Green visual identity.';

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text,
      model,
      success: true,
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({
      error: err.message || 'Internal server error',
      fallback: true,
    });
  }
});

// ZIP Download endpoints
const serveZip = (res: express.Response) => {
  const possiblePaths = [
    path.join(__dirname, 'BitePulse.zip'),
    path.join(__dirname, 'bitepulse_final_project.zip'),
    path.join(__dirname, 'bitepulse_mad_assignment.zip'),
    path.join(__dirname, 'public', 'BitePulse.zip'),
  ];
  const found = possiblePaths.find((p) => fs.existsSync(p));
  if (found) {
    res.setHeader('Content-Type', 'application/zip');
    res.download(found, 'BitePulse_Complete_Project.zip');
  } else {
    res.status(404).json({ error: 'ZIP file not found.' });
  }
};

app.get('/api/download-zip', (req, res) => serveZip(res));
app.get('/BitePulse.zip', (req, res) => serveZip(res));
app.get('/bitepulse_final_project.zip', (req, res) => serveZip(res));
app.get('/bitepulse_mad_assignment.zip', (req, res) => serveZip(res));

// Mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`BitePulse server running on http://localhost:${PORT}`);
  });
}

startServer();
