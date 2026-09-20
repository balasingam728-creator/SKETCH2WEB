export type ComponentType =
  | 'page'
  | 'section'
  | 'container'
  | 'grid'
  | 'navbar'
  | 'hero'
  | 'heading'
  | 'text'
  | 'button'
  | 'image'
  | 'card'
  | 'input'
  | 'form'
  | 'footer'
  | 'badge'
  | 'divider'
  | 'video'
  | 'accordion'
  | 'pricing-table'
  | 'testimonial';

export interface ComponentStyles {
  display?: 'flex' | 'grid' | 'block' | 'inline-block' | string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | string;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | string;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | string;
  gridColumns?: string;
  gap?: string;
  width?: string;
  maxWidth?: string;
  minHeight?: string;
  height?: string;
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: 'left' | 'center' | 'right' | string;
  border?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  boxShadow?: string;
  opacity?: number;
  position?: 'relative' | 'static' | 'sticky' | string;
  overflow?: string;
  transform?: string;
  [key: string]: any;
}

export interface ComponentProps {
  text?: string;
  tag?: string;
  src?: string;
  alt?: string;
  href?: string;
  placeholder?: string;
  inputType?: string;
  icon?: string;
  badge?: string;
  ariaLabel?: string;
  target?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6 | number;
  rows?: number;
  columns?: number;
  accentColor?: string;
  [key: string]: any;
}

export interface ComponentNode {
  id: string;
  type: ComponentType;
  name: string;
  props: ComponentProps;
  styles?: ComponentStyles;
  children?: ComponentNode[];
  hidden?: boolean;
  locked?: boolean;
  isCustom?: boolean;
  aiGenerated?: boolean;
  sourceBounds?: { x: number; y: number; width: number; height: number };
  sourceDetectionId?: string;
}

export interface DesignSystem {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    accent: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    headingFontFamily: string;
    baseFontSize: string;
  };
  spacing: {
    unit: string;
    radius: string;
    shadow: string;
  };
  buttonStyle: 'rounded' | 'pill' | 'square' | 'glass';
  themeMode: 'light' | 'dark';
}

export interface Page {
  id: string;
  name: string;
  path: string;
  icon: string;
  rootComponent: ComponentNode;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ArchitectureRecommendation {
  complexity: 'Simple' | 'Medium' | 'Advanced';
  detectedComponentsCount: number;
  sectionsCount: number;
  interactiveElementsCount: number;
  responsiveComplexity: 'Low' | 'Medium' | 'High';
  recommendedHtml: string;
  recommendedCss: string;
  recommendedJs: string;
  rationale: string;
}

export interface FidelityBreakdown {
  overall: number;
  layout: number;
  components: number;
  typography: number;
  colors: number;
  spacing: number;
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  pages: Page[];
  activePageId: string;
  designSystem: DesignSystem;
  originalImage?: string;
  originalType?: 'sketch' | 'screenshot';
  fidelityBreakdown?: FidelityBreakdown;
  architectureRecommendation: ArchitectureRecommendation;
  detectedBoxes?: DetectedBox[];
  layoutRelationships?: LayoutRelationship[];
  analysisProvider?: 'openai' | 'local';
  analysisWarning?: string;
}

export interface VersionHistoryEntry {
  id: string;
  version: number;
  timestamp: string;
  label: string;
  description: string;
  snapshot: Project;
}

export interface AiChangePlan {
  id: string;
  prompt: string;
  title: string;
  steps: string[];
  affectedNodes: string[];
  summary: string;
  operations: AiChangeOperation[];
  previewProject: Project;
  provider?: 'openai' | 'local';
  warning?: string;
}

export interface AiPlanningContext {
  selectedNode?: ComponentNode | null;
  viewport?: ViewportMode;
  detectedBoxes?: DetectedBox[];
  referenceImage?: string;
}

export type AiChangeOperation =
  | { type: 'add'; parentId: string; component: ComponentNode; position?: number }
  | { type: 'remove'; nodeId: string }
  | { type: 'update' | 'style_update' | 'content_update' | 'layout_update'; nodeId: string; properties: Partial<ComponentNode> }
  | { type: 'move'; nodeId: string; newParentId: string; position?: number }
  | { type: 'duplicate'; nodeId: string; newParentId?: string; position?: number }
  | { type: 'replace'; nodeId: string; component: ComponentNode }
  | { type: 'reorder'; nodeId: string; newParentId: string; position: number }
  | { type: 'create_page'; page: Page }
  | { type: 'project_update'; properties: Partial<Pick<Project, 'designSystem' | 'activePageId'>> };

export type IssueSeverity = 'critical' | 'warning' | 'info';
export type IssueCategory = 'accessibility' | 'codeQuality' | 'responsiveness';

export interface QualityIssue {
  id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  nodeId?: string;
  fixable: boolean;
  fixAction?: string;
}

export interface QualityAuditResult {
  overallScore: number;
  categories: {
    accessibility: { score: number; issues: QualityIssue[] };
    codeQuality: { score: number; issues: QualityIssue[] };
    responsiveness: { score: number; issues: QualityIssue[] };
  };
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface DetectedBox {
  id: string;
  label: string;
  type: ComponentType;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  color?: string;
  bgColor?: string;
  alignment?: 'left' | 'center' | 'right';
  tag?: string;
  children?: DetectedBox[];
}

export interface LayoutRelationship {
  type: 'section' | 'grid' | 'flex-row' | 'flex-col' | 'card' | 'navbar' | 'hero' | 'footer' | 'form';
  bounds: { x: number; y: number; width: number; height: number };
  alignment: 'left' | 'center' | 'right' | 'space-between';
  items: DetectedBox[];
  childRelationships?: LayoutRelationship[];
}
