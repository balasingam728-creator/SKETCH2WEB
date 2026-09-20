export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') { res.statusCode = 405; res.end(JSON.stringify({ error: 'Method not allowed' })); return; }
  if (!process.env.OPENAI_API_KEY) { res.statusCode = 503; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ error: 'OPENAI_API_KEY is not configured', provider: 'openai' })); return; }
  try {
    const { createChangePlanWithOpenAI } = await import('../server/openaiApiService');
    const { request, componentTree, designSystem, referenceAnalysis, selectedNodeId } = req.body || {};
    if (typeof request !== 'string' || !componentTree || !designSystem) { res.statusCode = 400; res.end(JSON.stringify({ error: 'request, componentTree, and designSystem are required' })); return; }
    const plan = await createChangePlanWithOpenAI(request, componentTree, designSystem, referenceAnalysis, selectedNodeId);
    res.statusCode = 200; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(plan));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI change request failed';
    const status = message.includes('not configured') ? 503 : 502;
    res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ error: message, provider: 'openai' }));
  }
}
