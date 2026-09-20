export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') { res.statusCode = 405; res.end(JSON.stringify({ error: 'Method not allowed' })); return; }
  if (!process.env.OPENAI_API_KEY) { res.statusCode = 503; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ error: 'OPENAI_API_KEY is not configured', provider: 'openai' })); return; }
  try {
    const { analyzeImageWithOpenAI } = await import('../server/openaiApiService');
    const { imageDataUrl, imageType } = req.body || {};
    if (typeof imageDataUrl !== 'string' || !imageDataUrl.startsWith('data:image/')) { res.statusCode = 400; res.end(JSON.stringify({ error: 'A data URL image is required' })); return; }
    const analysis = await analyzeImageWithOpenAI(imageDataUrl, imageType === 'screenshot' ? 'website screenshot' : 'hand-drawn sketch');
    res.statusCode = 200; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(analysis));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI Vision request failed';
    const status = message.includes('not configured') ? 503 : 502;
    res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ error: message, provider: 'openai' }));
  }
}
