import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// CORS: permite cualquier puerto localhost (Angular cambia de puerto a veces)
app.use(cors({ origin: [/^http:\/\/localhost:\d+$/] }));

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_BASE = 'https://openrouter.ai/api/v1';

if (!OPENROUTER_API_KEY) {
  console.warn('[WARN] Falta OPENROUTER_API_KEY en .env');
}

// Healthcheck rápido
app.get('/api/ai/health', (_req, res) => {
  res.json({ ok: true, hasKey: !!OPENROUTER_API_KEY });
});

// Proxy principal
app.post('/api/ai/chat', async (req, res) => {
  const isStream = !!req.body?.stream;
  console.log('➡️  /api/ai/chat recibido. stream:', isStream, 'model:', req.body?.model);

  try {
    const upstream = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:4200',
        'X-Title': 'SaavedraFotografo'
      },
      body: JSON.stringify(req.body)
    });

    console.log('⬅️  Respuesta OpenRouter:', upstream.status, upstream.statusText);

    if (!isStream) {
      const text = await upstream.text();
      res.status(upstream.status).send(text);
      return;
    }

    // (streaming, por si luego lo reactivas)
    res.status(200);
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    const reader = upstream.body?.getReader();
    if (!reader) {
      const fallback = await upstream.text();
      res.write(fallback);
      res.end();
      return;
    }

    const decoder = new TextDecoder('utf-8');
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (e) {
    console.error('[Proxy Error]', e?.message || e);
    if (!res.headersSent) res.status(500).json({ error: e?.message ?? 'Proxy error' });
    else try { res.end(); } catch {}
  }
});

const PORT = Number(process.env.PORT || 5050);
app.listen(PORT, () => console.log(`✅ AI proxy listening on http://localhost:${PORT}`));
