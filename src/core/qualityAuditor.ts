import { ComponentNode, QualityAuditResult, QualityIssue } from '../types';

export function runQualityAudit(rootNode: ComponentNode): QualityAuditResult {
  const a11yIssues: QualityIssue[] = [];
  const codeIssues: QualityIssue[] = [];
  const respIssues: QualityIssue[] = [];

  const seenIds = new Set<string>();

  function inspectNode(node: ComponentNode) {
    // 1. Accessibility Checks
    if (node.type === 'image') {
      if (!node.props.alt || node.props.alt.trim() === '') {
        a11yIssues.push({
          id: `a11y-alt-${node.id}`,
          category: 'accessibility',
          severity: 'warning',
          title: 'Missing Image Alt Text',
          description: `Image component "${node.name}" is missing a descriptive alt attribute for screen readers.`,
          nodeId: node.id,
          fixable: true,
          fixAction: 'Add descriptive alt attribute',
        });
      }
    }

    if (node.type === 'input') {
      if (!node.props.ariaLabel && !node.props.placeholder) {
        a11yIssues.push({
          id: `a11y-label-${node.id}`,
          category: 'accessibility',
          severity: 'critical',
          title: 'Missing Form Input Accessible Label',
          description: `Input element "${node.name}" lacks aria-label or placeholder, making it inaccessible to assistive technology.`,
          nodeId: node.id,
          fixable: true,
          fixAction: 'Add aria-label to input',
        });
      }
    }

    if (node.type === 'button') {
      if (!node.props.text && !node.props.ariaLabel) {
        a11yIssues.push({
          id: `a11y-btn-${node.id}`,
          category: 'accessibility',
          severity: 'critical',
          title: 'Empty Button without Accessible Name',
          description: `Button "${node.name}" does not contain text or an aria-label attribute.`,
          nodeId: node.id,
          fixable: true,
          fixAction: 'Provide text label',
        });
      }
    }

    // 2. Code Quality Checks
    if (seenIds.has(node.id)) {
      codeIssues.push({
        id: `code-dup-id-${node.id}`,
        category: 'codeQuality',
        severity: 'critical',
        title: 'Duplicate Element ID Detected',
        description: `Element ID "${node.id}" is used more than once in the document structure.`,
        nodeId: node.id,
        fixable: true,
        fixAction: 'Regenerate unique ID',
      });
    } else {
      seenIds.add(node.id);
    }

    if (node.type === 'heading' && !node.props.text) {
      codeIssues.push({
        id: `code-empty-heading-${node.id}`,
        category: 'codeQuality',
        severity: 'warning',
        title: 'Empty Heading Tag',
        description: `Heading element "${node.name}" contains no text content.`,
        nodeId: node.id,
        fixable: true,
        fixAction: 'Add heading text',
      });
    }

    // 3. Responsiveness Checks
    if (node.styles) {
      const widthVal = node.styles.width || '';
      const fixedPxMatch = widthVal.match(/^(\d+)px$/);
      if (fixedPxMatch && parseInt(fixedPxMatch[1], 10) > 400 && !node.styles.maxWidth) {
        respIssues.push({
          id: `resp-fixed-width-${node.id}`,
          category: 'responsiveness',
          severity: 'warning',
          title: 'Fixed Pixel Width (>400px) on Mobile',
          description: `Element "${node.name}" uses fixed width (${widthVal}) without max-width: 100%, which may cause horizontal overflow on mobile viewports.`,
          nodeId: node.id,
          fixable: true,
          fixAction: 'Add max-width: 100%',
        });
      }
    }

    // Recurse children
    if (node.children) {
      node.children.forEach(inspectNode);
    }
  }

  inspectNode(rootNode);

  // Compute scores (100 base, deductions for issues)
  const a11yDeduction = a11yIssues.reduce((acc, issue) => acc + (issue.severity === 'critical' ? 8 : 4), 0);
  const codeDeduction = codeIssues.reduce((acc, issue) => acc + (issue.severity === 'critical' ? 8 : 4), 0);
  const respDeduction = respIssues.reduce((acc, issue) => acc + (issue.severity === 'critical' ? 8 : 4), 0);

  const a11yScore = Math.max(65, 100 - a11yDeduction);
  const codeScore = Math.max(70, 100 - codeDeduction);
  const respScore = Math.max(70, 100 - respDeduction);

  const overallScore = Math.round((a11yScore * 0.35) + (codeScore * 0.35) + (respScore * 0.3));

  return {
    overallScore,
    categories: {
      accessibility: { score: a11yScore, issues: a11yIssues },
      codeQuality: { score: codeScore, issues: codeIssues },
      responsiveness: { score: respScore, issues: respIssues },
    },
  };
}

export function autoFixQualityIssues(rootNode: ComponentNode): { fixedRoot: ComponentNode; fixCount: number } {
  let fixCount = 0;
  const seenIds = new Set<string>();

  function fixNode(node: ComponentNode): ComponentNode {
    const newNode: ComponentNode = {
      ...node,
      props: { ...node.props },
      styles: { ...node.styles },
    };

    // Duplicate ID fix
    if (seenIds.has(newNode.id)) {
      newNode.id = `${newNode.type}-${Math.random().toString(36).substring(2, 7)}`;
      fixCount++;
    }
    seenIds.add(newNode.id);

    // Image alt fix
    if (newNode.type === 'image' && (!newNode.props.alt || newNode.props.alt.trim() === '')) {
      newNode.props.alt = `${newNode.name || 'Visual illustration'} preview`;
      fixCount++;
    }

    // Input aria-label fix
    if (newNode.type === 'input' && !newNode.props.ariaLabel && !newNode.props.placeholder) {
      newNode.props.ariaLabel = `${newNode.name || 'Input field'}`;
      newNode.props.placeholder = 'Enter your input...';
      fixCount++;
    }

    // Button label fix
    if (newNode.type === 'button' && !newNode.props.text && !newNode.props.ariaLabel) {
      newNode.props.text = 'Action';
      newNode.props.ariaLabel = 'Action button';
      fixCount++;
    }

    // Fixed width responsiveness fix
    if (newNode.styles?.width && /^(\d+)px$/.test(newNode.styles.width)) {
      const px = parseInt(newNode.styles.width.replace('px', ''), 10);
      if (px > 400 && !newNode.styles.maxWidth) {
        newNode.styles.maxWidth = '100%';
        newNode.styles.width = '100%';
        fixCount++;
      }
    }

    if (node.children) {
      newNode.children = node.children.map(fixNode);
    }

    return newNode;
  }

  const fixedRoot = fixNode(rootNode);
  return { fixedRoot, fixCount };
}
