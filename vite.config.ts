import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function localAiApi() {
  return {
    name: 'local-ai-api',
    configureServer(server: any) {
      server.middlewares.use('/api/analyze-image', async (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(JSON.stringify({ error: 'Method not allowed' })); return; }
        try {
          const body = await readBody(req);
          const { analyzeImageWithOpenAI } = await import('./server/openaiApiService');
          const payload = JSON.parse(body);
          const result = await analyzeImageWithOpenAI(payload.imageDataUrl, payload.imageType);
          res.setHeader('Content-Type', 'application/json'); res.statusCode = 200; res.end(JSON.stringify(result));
        } catch (error) { res.setHeader('Content-Type', 'application/json'); res.statusCode = 503; res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'AI Vision unavailable' })); }
      });
      server.middlewares.use('/api/ai-change', async (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(JSON.stringify({ error: 'Method not allowed' })); return; }
        try {
          const body = await readBody(req);
          const { createChangePlanWithOpenAI } = await import('./server/openaiApiService');
          const payload = JSON.parse(body);
          const result = await createChangePlanWithOpenAI(payload.request, payload.componentTree, payload.designSystem, payload.referenceAnalysis, payload.selectedNodeId);
          res.setHeader('Content-Type', 'application/json'); res.statusCode = 200; res.end(JSON.stringify(result));
        } catch (error) { res.setHeader('Content-Type', 'application/json'); res.statusCode = 503; res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'AI changes unavailable' })); }
      });
    },
  };
}

function readBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => { let data = ''; req.on('data', (chunk: Buffer) => { data += chunk; }); req.on('end', () => resolve(data)); req.on('error', reject); });
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.OPENAI_API_KEY ||= env.OPENAI_API_KEY;
  process.env.OPENAI_MODEL ||= env.OPENAI_MODEL;

  return {
  plugins: [react(), localAiApi()],
  server: {
    port: 5173,
    open: false,
  },
  };
});
