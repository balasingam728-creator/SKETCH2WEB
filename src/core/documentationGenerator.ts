import { ComponentNode, Project } from '../types';

function renderAsciiTree(node: ComponentNode, prefix: string = '', isLast: boolean = true): string {
  const marker = isLast ? '└── ' : '├── ';
  let result = `${prefix}${marker}${node.name} (${node.type})\n`;

  const childPrefix = prefix + (isLast ? '    ' : '│   ');
  const children = node.children || [];
  children.forEach((child, index) => {
    const isChildLast = index === children.length - 1;
    result += renderAsciiTree(child, childPrefix, isChildLast);
  });

  return result;
}

function countTotalComponents(node: ComponentNode): number {
  let count = 1;
  if (node.children) {
    count += node.children.reduce((acc, c) => acc + countTotalComponents(c), 0);
  }
  return count;
}

export function generateDocumentation(project: Project): string {
  const activePage = project.pages.find(p => p.id === project.activePageId) || project.pages[0];
  const root = activePage.rootComponent;
  const ds = project.designSystem;
  const totalComponents = countTotalComponents(root);

  const asciiTree = renderAsciiTree(root);

  return `# ${project.name} — Technical Documentation
*Generated automatically by Sketch2Web on ${new Date().toLocaleDateString()}*

---

## 1. Executive Summary & Architecture

This website was synthesized directly from a hand-drawn visual sketch / website screenshot using the **Sketch2Web AI-Powered Visual Web Development Engine**.

* **Target Frontend Architecture**: Semantic HTML5, Modern CSS3 (Variables + CSS Grid/Flexbox), and Vanilla JavaScript (ES6+).
* **Total Pages**: ${project.pages.length} (${project.pages.map(p => p.name).join(', ')})
* **Active Page**: ${activePage.name}
* **Total Components Detected/Structured**: ${totalComponents}
* **Design Fidelity**: ${project.fidelityBreakdown ? `${project.fidelityBreakdown.overall}%` : 'Visual comparison available'}

---

## 2. Component Hierarchy Tree

\`\`\`text
${asciiTree}
\`\`\`

---

## 3. Global Design System & Token Specifications

The website uses a unified CSS Custom Properties token design system:

### 🎨 Color Palette
* **Primary Brand Color**: \`${ds.colors.primary}\` (Hover: \`${ds.colors.primaryHover}\`)
* **Secondary / Accent**: \`${ds.colors.secondary}\` / \`${ds.colors.accent}\`
* **Background**: \`${ds.colors.background}\`
* **Surface Container**: \`${ds.colors.surface}\`
* **Text / Typography**: \`${ds.colors.text}\` (Muted: \`${ds.colors.textMuted}\`)
* **Border Color**: \`${ds.colors.border}\`

### 🔤 Typography & Metrics
* **Font Family**: \`${ds.typography.fontFamily}\`
* **Heading Font**: \`${ds.typography.headingFontFamily}\`
* **Base Font Size**: \`${ds.typography.baseFontSize}\`
* **Default Border Radius**: \`${ds.spacing.radius}\`
* **Default Elevation Shadow**: \`${ds.spacing.shadow}\`
* **Button Style**: \`${ds.buttonStyle}\`

---

## 4. Exported File Structure

When exported as a standalone package or downloaded as a ZIP archive, the directory is structured as follows:

\`\`\`text
sketch2web-export/
├── index.html           # Production semantic HTML5 markup
├── styles/
│   └── style.css        # Scoped CSS3 stylesheet with design variables & media queries
├── scripts/
│   └── app.js           # Vanilla ES6 interactive controllers & form handlers
└── README.md            # Quick-start run guide
\`\`\`

---

## 5. Deployment Guide

### Option A: Local Run
Simply open \`index.html\` in any modern browser (Chrome, Firefox, Safari, Edge). No node server, compilers, or build steps required.

### Option B: Cloud Hosting (Netlify / Vercel / GitHub Pages)
1. Push the generated folder to a GitHub repository or drag-and-drop into **Netlify Drop**.
2. Set publish directory to \`./\`.
3. Site is immediately live worldwide on modern CDN edges.

---
*Built with Sketch2Web — "From your sketch to a working website."*
`;
}
