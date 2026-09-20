import { ComponentNode, DesignSystem } from '../types';

export interface CompiledOutput {
  html: string;
  css: string;
  js: string;
  fullDocument: string;
}

// Convert camelCase style keys to kebab-case CSS properties
function styleToCssKey(key: string): string {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// Generate CSS for a single node
function generateNodeCss(node: ComponentNode, rules: Map<string, Record<string, string>>): void {
  const className = `s2w-${node.id}`;
  const cssRules: Record<string, string> = {};

  if (node.styles) {
    Object.entries(node.styles).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        const cssProp = styleToCssKey(key);
        cssRules[cssProp] = String(val);
      }
    });
  }

  if (Object.keys(cssRules).length > 0) {
    rules.set(className, cssRules);
  }

  if (node.children && node.children.length > 0) {
    node.children.forEach(child => generateNodeCss(child, rules));
  }
}

// Generate HTML for a component node recursively
function generateNodeHtml(node: ComponentNode, indent: number = 2): string {
  if (node.hidden) return '';

  const spaces = ' '.repeat(indent);
  const className = `s2w-${node.id} s2w-${node.type}`;
  const p = node.props || {};

  switch (node.type) {
    case 'page':
    case 'container':
    case 'section': {
      const tag = p.tag || (node.type === 'section' ? 'section' : 'div');
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<${tag} class="${className}" id="${node.id}">\n${innerHtml}\n${spaces}</${tag}>`;
    }

    case 'navbar': {
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<nav class="${className}" id="${node.id}" aria-label="Main Navigation">\n${innerHtml}\n${spaces}</nav>`;
    }

    case 'hero': {
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<section class="${className}" id="${node.id}" aria-label="Hero">\n${innerHtml}\n${spaces}</section>`;
    }

    case 'grid': {
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<div class="${className}" id="${node.id}">\n${innerHtml}\n${spaces}</div>`;
    }

    case 'card': {
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<article class="${className}" id="${node.id}">\n${innerHtml}\n${spaces}</article>`;
    }

    case 'heading': {
      const level = p.level || 2;
      const tag = `h${level}`;
      const text = p.text || 'Heading';
      return `${spaces}<${tag} class="${className}" id="${node.id}">${escapeHtml(text)}</${tag}>`;
    }

    case 'text': {
      const tag = p.tag || 'p';
      const text = p.text || 'Paragraph text content.';
      return `${spaces}<${tag} class="${className}" id="${node.id}">${escapeHtml(text)}</${tag}>`;
    }

    case 'badge': {
      const text = p.text || p.badge || 'Badge';
      return `${spaces}<span class="${className}" id="${node.id}">${escapeHtml(text)}</span>`;
    }

    case 'button': {
      const text = p.text || 'Click me';
      const href = p.href;
      const aria = p.ariaLabel || text;
      if (href) {
        return `${spaces}<a href="${href}" class="${className}" id="${node.id}" role="button" aria-label="${escapeHtml(aria)}">${escapeHtml(text)}</a>`;
      }
      return `${spaces}<button type="button" class="${className}" id="${node.id}" aria-label="${escapeHtml(aria)}">${escapeHtml(text)}</button>`;
    }

    case 'image': {
      const src = p.src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
      const alt = p.alt || node.name || 'Image';
      return `${spaces}<img src="${src}" alt="${escapeHtml(alt)}" class="${className}" id="${node.id}" loading="lazy" />`;
    }

    case 'input': {
      const type = p.inputType || 'text';
      const placeholder = p.placeholder || 'Enter value...';
      const aria = p.ariaLabel || placeholder;
      return `${spaces}<input type="${type}" placeholder="${escapeHtml(placeholder)}" class="${className}" id="${node.id}" aria-label="${escapeHtml(aria)}" />`;
    }

    case 'form': {
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<form class="${className}" id="${node.id}" onsubmit="handleFormSubmit(event)">\n${innerHtml}\n${spaces}</form>`;
    }

    case 'divider': {
      return `${spaces}<hr class="${className}" id="${node.id}" />`;
    }

    case 'footer': {
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<footer class="${className}" id="${node.id}" role="contentinfo">\n${innerHtml}\n${spaces}</footer>`;
    }

    case 'accordion': {
      const title = p.text || 'Accordion Title';
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<details class="${className}" id="${node.id}">\n${spaces}  <summary>${escapeHtml(title)}</summary>\n${innerHtml}\n${spaces}</details>`;
    }

    case 'pricing-table':
    case 'testimonial': {
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<div class="${className}" id="${node.id}">\n${innerHtml}\n${spaces}</div>`;
    }

    default: {
      const innerHtml = (node.children || [])
        .map(child => generateNodeHtml(child, indent + 2))
        .filter(Boolean)
        .join('\n');
      return `${spaces}<div class="${className}" id="${node.id}">\n${innerHtml}\n${spaces}</div>`;
    }
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate base reset and design system CSS
function generateBaseCss(ds: DesignSystem): string {
  return `/* ==========================================================================
   Sketch2Web - Generated Design System & Global Styles
   ========================================================================== */

:root {
  --s2w-primary: ${ds.colors.primary};
  --s2w-primary-hover: ${ds.colors.primaryHover};
  --s2w-secondary: ${ds.colors.secondary};
  --s2w-bg: ${ds.colors.background};
  --s2w-surface: ${ds.colors.surface};
  --s2w-text: ${ds.colors.text};
  --s2w-text-muted: ${ds.colors.textMuted};
  --s2w-accent: ${ds.colors.accent};
  --s2w-border: ${ds.colors.border};
  
  --s2w-font: ${ds.typography.fontFamily};
  --s2w-heading-font: ${ds.typography.headingFontFamily};
  --s2w-base-font-size: ${ds.typography.baseFontSize};
  
  --s2w-radius: ${ds.spacing.radius};
  --s2w-shadow: ${ds.spacing.shadow};
}

/* Modern CSS Reset & Base Defaults */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--s2w-font);
  font-size: var(--s2w-base-font-size);
  color: var(--s2w-text);
  background-color: var(--s2w-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--s2w-heading-font);
  color: var(--s2w-text);
  line-height: 1.25;
  font-weight: 700;
}

h1 { font-size: 2.75rem; letter-spacing: -0.025em; }
h2 { font-size: 2rem; letter-spacing: -0.02em; }
h3 { font-size: 1.5rem; letter-spacing: -0.01em; }
h4 { font-size: 1.25rem; }

p {
  color: var(--s2w-text-muted);
}

a {
  color: var(--s2w-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--s2w-primary-hover);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: var(--s2w-radius);
}

button {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

button:focus-visible, a:focus-visible {
  outline: 2px solid var(--s2w-primary);
  outline-offset: 2px;
}

input, textarea, select {
  font-family: inherit;
  font-size: 1rem;
  color: var(--s2w-text);
  background-color: var(--s2w-surface);
  border: 1px solid var(--s2w-border);
  border-radius: var(--s2w-radius);
  padding: 0.75rem 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--s2w-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

/* Component Type Base Classes */
.s2w-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--s2w-radius);
  background-color: var(--s2w-primary);
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
}

.s2w-button:hover {
  background-color: var(--s2w-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.s2w-card {
  background-color: var(--s2w-surface);
  border: 1px solid var(--s2w-border);
  border-radius: var(--s2w-radius);
  padding: 1.5rem;
  box-shadow: var(--s2w-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.s2w-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.3);
}

.s2w-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: rgba(79, 70, 229, 0.15);
  color: var(--s2w-primary);
  border: 1px solid rgba(79, 70, 229, 0.3);
}

/* Responsive Media Queries */
@media (max-width: 768px) {
  h1 { font-size: 2.125rem; }
  h2 { font-size: 1.75rem; }
  
  .s2w-grid {
    grid-template-columns: 1fr !important;
  }

  .s2w-navbar {
    flex-direction: column !important;
    gap: 1rem !important;
  }
}

@media (max-width: 480px) {
  h1 { font-size: 1.875rem; }
  .s2w-section {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}
`;
}

// Generate standard vanilla JavaScript
function generateVanillaJs(): string {
  return `/**
 * Sketch2Web - Generated Vanilla JavaScript ES6
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Sketch2Web website initialized successfully.');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Mobile menu / interactive toggle handler
  const navToggles = document.querySelectorAll('[data-nav-toggle]');
  navToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-nav-toggle');
      const target = document.getElementById(targetId || '');
      if (target) {
        target.classList.toggle('is-open');
      }
    });
  });
});

// Form submission handler
window.handleFormSubmit = function(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = form.querySelectorAll('input, textarea, select');
  let isValid = true;

  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      input.style.borderColor = '#ef4444';
    } else {
      input.style.borderColor = '';
    }
  });

  if (isValid) {
    const successBanner = document.createElement('div');
    successBanner.className = 's2w-badge';
    successBanner.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
    successBanner.style.color = '#10b981';
    successBanner.style.borderColor = '#10b981';
    successBanner.style.padding = '0.75rem 1rem';
    successBanner.style.marginTop = '1rem';
    successBanner.style.width = '100%';
    successBanner.style.textAlign = 'center';
    successBanner.textContent = '✓ Thank you! Your submission has been received.';

    form.appendChild(successBanner);
    setTimeout(() => {
      form.reset();
      successBanner.remove();
    }, 4000);
  }
};
`;
}

// Master compilation function
export function compileProject(rootNode: ComponentNode, designSystem: DesignSystem, pageTitle: string = 'Generated Website'): CompiledOutput {
  const nodeRules = new Map<string, Record<string, string>>();
  generateNodeCss(rootNode, nodeRules);

  let generatedCss = generateBaseCss(designSystem);

  // Append component-specific rules
  generatedCss += '\n/* Specific Component Layout Styles */\n';
  nodeRules.forEach((styles, className) => {
    generatedCss += `.${className} {\n`;
    Object.entries(styles).forEach(([prop, val]) => {
      generatedCss += `  ${prop}: ${val};\n`;
    });
    generatedCss += `}\n\n`;
  });

  const bodyHtml = generateNodeHtml(rootNode, 2);
  const jsCode = generateVanillaJs();

  const fullDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="Generated responsive website created with Sketch2Web">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
${generatedCss}
  </style>
</head>
<body>
${bodyHtml}

  <script>
${jsCode}
  </script>
</body>
</html>`;

  return {
    html: `<!-- Semantic HTML5 Body -->\n${bodyHtml}`,
    css: generatedCss,
    js: jsCode,
    fullDocument,
  };
}
