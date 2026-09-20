type JsonObject = Record<string, unknown>;

function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not configured');
  return key;
}

async function callOpenAI(body: JsonObject): Promise<{ output_text?: string }> {
  const response = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${getApiKey()}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!response.ok) {
    const details = await response.json().catch(() => null) as { error?: { message?: string } } | null;
    const message = details?.error?.message;
    if (response.status === 401) throw new Error(`OpenAI authentication failed. Add a valid OPENAI_API_KEY to .env.local. (${message || 'Unauthorized'})`);
    throw new Error(`OpenAI request failed (${response.status})${message ? `: ${message}` : ''}`);
  }
  return response.json() as Promise<{ output_text?: string }>;
}

const model = () => process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const nullableString = { type: ['string', 'null'] };
const componentTypes = ['page', 'section', 'container', 'grid', 'navbar', 'hero', 'heading', 'text', 'button', 'image', 'card', 'input', 'form', 'footer', 'badge', 'divider', 'video', 'accordion', 'pricing-table', 'testimonial'];
const analysisComponent = { type: 'object', additionalProperties: false, properties: { id: { type: 'string' }, label: { type: 'string' }, type: { type: 'string', enum: componentTypes }, confidence: { type: 'number' }, x: { type: 'number' }, y: { type: 'number' }, width: { type: 'number' }, height: { type: 'number' }, text: nullableString, parentId: nullableString, color: nullableString, bgColor: nullableString, alignment: nullableString, tag: nullableString }, required: ['id', 'label', 'type', 'confidence', 'x', 'y', 'width', 'height', 'text', 'parentId', 'color', 'bgColor', 'alignment', 'tag'] };
const imageAnalysisInstructions = `You are a strict UI image reconstruction agent, not a creative web designer. The image is the source of truth.

First validate that the image is present, readable, non-empty, not corrupted, and contains a UI, wireframe, sketch, or webpage. If it cannot be reliably analyzed, return an empty components array and add exactly this warning: "Unable to reliably analyze this image. Please upload a clearer UI screenshot or sketch." Do not generate or infer a website from an invalid image.

Analyze the complete image before producing the result. Identify every visible UI element and its approximate pixel geometry, hierarchy, relationships, readable text, colors, typography, borders, radius, spacing, alignment, and visual state. Include headers, navigation, sections, columns, rows, sidebars, footers, containers, cards, forms, controls, icons, images, tables, alerts, badges, and dividers only when visibly present. Preserve readable text exactly. Use null for unreadable or absent text rather than inventing content.

Represent only evidence from the image. Do not redesign, add common website sections, invent content, invent functionality, assume hidden interactions, or add components that are not visible. For uncertain elements, choose the simplest interpretation supported by visual evidence and lower its confidence. Preserve the original layout and pixel geometry; responsiveness will be handled later without changing the desktop composition.

Return only the requested structured JSON. Use relationships to express visible parent-child structure. Use warnings for uncertainty, unreadable regions, or validation limitations. Before returning, check that every visible component is represented, no unsupported component was added, text matches the image, geometry and hierarchy are coherent, and colors and spacing are consistent with the source.`;

export async function analyzeImageWithOpenAI(imageDataUrl: string, imageType: string): Promise<JsonObject> {
  const response = await callOpenAI({ model: model(), input: [{ role: 'user', content: [{ type: 'input_text', text: `${imageAnalysisInstructions}\n\nImage type: ${imageType}.` }, { type: 'input_image', image_url: imageDataUrl, detail: 'high' }] }], text: { format: { type: 'json_schema', name: 'sketch2web_analysis', strict: true, schema: { type: 'object', additionalProperties: false, properties: { pageType: { type: 'string' }, imageWidth: { type: 'number' }, imageHeight: { type: 'number' }, components: { type: 'array', items: analysisComponent }, relationships: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { parentId: { type: 'string' }, childId: { type: 'string' }, relationship: { type: 'string' } }, required: ['parentId', 'childId', 'relationship'] } }, designTokens: { type: 'object', additionalProperties: false, properties: { primaryColor: nullableString, backgroundColor: nullableString, textColor: nullableString, borderRadius: nullableString, spacingScale: nullableString }, required: ['primaryColor', 'backgroundColor', 'textColor', 'borderRadius', 'spacingScale'] }, warnings: { type: 'array', items: { type: 'string' } } }, required: ['pageType', 'imageWidth', 'imageHeight', 'components', 'relationships', 'designTokens', 'warnings'] } } } });
  if (!response.output_text) throw new Error('OpenAI returned an empty analysis');
  return JSON.parse(response.output_text) as JsonObject;
}

export async function createChangePlanWithOpenAI(request: string, componentTree: JsonObject, designSystem: JsonObject, referenceAnalysis: JsonObject = {}, selectedNodeId?: string): Promise<JsonObject> {
  const operationSchema = { type: 'object', additionalProperties: true, properties: { type: { type: 'string', enum: ['add', 'remove', 'update', 'move', 'duplicate', 'replace', 'reorder', 'style_update', 'content_update', 'layout_update', 'create_page'] }, nodeId: nullableString, parentId: nullableString, newParentId: nullableString, position: { type: ['number', 'null'] }, properties: { type: ['object', 'null'] }, component: { type: ['object', 'null'] }, page: { type: ['object', 'null'] } }, required: ['type', 'nodeId', 'parentId', 'newParentId', 'position', 'properties', 'component', 'page'] };
  const response = await callOpenAI({ model: model(), instructions: 'You are a UI AST editor. Return only safe structured operations against supplied component IDs. Do not return HTML, CSS, arbitrary JavaScript, or operations targeting unknown nodes.', input: [{ role: 'user', content: [{ type: 'input_text', text: JSON.stringify({ request, componentTree, designSystem, referenceAnalysis, selectedNodeId }) }] }], text: { format: { type: 'json_schema', name: 'sketch2web_change_plan', strict: true, schema: { type: 'object', additionalProperties: false, properties: { summary: { type: 'string' }, operations: { type: 'array', items: operationSchema }, warnings: { type: 'array', items: { type: 'string' } } }, required: ['summary', 'operations', 'warnings'] } } } });
  if (!response.output_text) throw new Error('OpenAI returned an empty change plan');
  return JSON.parse(response.output_text) as JsonObject;
}
