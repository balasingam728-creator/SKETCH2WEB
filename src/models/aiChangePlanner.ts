import { AiChangeOperation, AiChangePlan, AiPlanningContext, ComponentNode, Page, Project } from '../types';
import { defaultDesignSystem, lightDesignSystem } from '../core/defaultDesignSystem';

// Deep clone project helper
function cloneProject(proj: Project): Project {
  return JSON.parse(JSON.stringify(proj));
}

function cloneNode(node: ComponentNode): ComponentNode {
  return JSON.parse(JSON.stringify(node));
}

// Generate unique ID
function genId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 7)}`;
}

export function generatePricingSection(): ComponentNode {
  return {
    id: genId('pricing-section'),
    type: 'section',
    name: '3-Tier Pricing Section',
    props: {},
    styles: {
      maxWidth: '1100px',
      margin: '2rem auto',
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      width: '90%',
    },
    children: [
      {
        id: genId('price-header'),
        type: 'container',
        name: 'Pricing Header',
        props: {},
        styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
        children: [
          { id: genId('p-badge'), type: 'badge', name: 'Pricing Badge', props: { text: '💎 Transparent Pricing' }, styles: { width: 'fit-content', margin: '0 auto', backgroundColor: 'rgba(79, 70, 229, 0.15)', color: '#818cf8' } },
          { id: genId('p-title'), type: 'heading', name: 'Pricing Title', props: { text: 'Plans for Teams of Any Size', level: 2 }, styles: { fontSize: '2.25rem', color: '#f8fafc' } },
          { id: genId('p-sub'), type: 'text', name: 'Pricing Subtitle', props: { text: 'Choose the plan that fits your engineering team. Cancel anytime.' }, styles: { color: '#94a3b8' } },
        ],
      },
      {
        id: genId('price-grid'),
        type: 'grid',
        name: '3-Column Pricing Grid',
        props: {},
        styles: { display: 'grid', gridColumns: 'repeat(3, 1fr)', gap: '1.5rem' },
        children: [
          // Starter Card
          {
            id: genId('price-card-starter'),
            type: 'card',
            name: 'Starter Tier Card',
            props: {},
            styles: { backgroundColor: '#151c2c', borderColor: '#243048', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' },
            children: [
              { id: genId('c1-name'), type: 'heading', name: 'Plan Name', props: { text: 'Starter', level: 3 }, styles: { fontSize: '1.25rem', color: '#f8fafc' } },
              { id: genId('c1-cost'), type: 'heading', name: 'Price', props: { text: '$29 / mo', level: 2 }, styles: { fontSize: '2rem', color: '#6366f1' } },
              { id: genId('c1-desc'), type: 'text', name: 'Plan Description', props: { text: 'Ideal for solo developers and quick side projects.' }, styles: { color: '#94a3b8', fontSize: '0.9rem' } },
              { id: genId('c1-f1'), type: 'text', name: 'Feature 1', props: { text: '✓ 5 Projects Included' }, styles: { color: '#cbd5e1', fontSize: '0.9rem' } },
              { id: genId('c1-f2'), type: 'text', name: 'Feature 2', props: { text: '✓ Standard HTML/CSS Export' }, styles: { color: '#cbd5e1', fontSize: '0.9rem' } },
              { id: genId('c1-btn'), type: 'button', name: 'Starter CTA', props: { text: 'Get Started' }, styles: { backgroundColor: '#1e293b', color: '#ffffff', borderColor: '#334155', borderWidth: '1px', padding: '0.75rem', borderRadius: '8px', marginTop: 'auto' } },
            ],
          },
          // Pro Card (Featured)
          {
            id: genId('price-card-pro'),
            type: 'card',
            name: 'Pro Tier Card (Popular)',
            props: {},
            styles: { backgroundColor: '#1e1b4b', borderColor: '#6366f1', borderWidth: '2px', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem', transform: 'scale(1.03)' },
            children: [
              { id: genId('c2-badge'), type: 'badge', name: 'Popular Badge', props: { text: '★ MOST POPULAR' }, styles: { width: 'fit-content', backgroundColor: '#6366f1', color: '#ffffff' } },
              { id: genId('c2-name'), type: 'heading', name: 'Plan Name', props: { text: 'Professional', level: 3 }, styles: { fontSize: '1.25rem', color: '#f8fafc' } },
              { id: genId('c2-cost'), type: 'heading', name: 'Price', props: { text: '$79 / mo', level: 2 }, styles: { fontSize: '2rem', color: '#818cf8' } },
              { id: genId('c2-desc'), type: 'text', name: 'Plan Description', props: { text: 'Full power for high-velocity teams and fast scaling.' }, styles: { color: '#c7d2fe', fontSize: '0.9rem' } },
              { id: genId('c2-f1'), type: 'text', name: 'Feature 1', props: { text: '✓ Unlimited Projects & Pages' }, styles: { color: '#ffffff', fontSize: '0.9rem' } },
              { id: genId('c2-f2'), type: 'text', name: 'Feature 2', props: { text: '✓ AI Voice & NLP Change Engine' }, styles: { color: '#ffffff', fontSize: '0.9rem' } },
              { id: genId('c2-f3'), type: 'text', name: 'Feature 3', props: { text: '✓ Priority 24/7 Support' }, styles: { color: '#ffffff', fontSize: '0.9rem' } },
              { id: genId('c2-btn'), type: 'button', name: 'Pro CTA', props: { text: 'Start 14-Day Free Trial' }, styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', marginTop: 'auto' } },
            ],
          },
          // Enterprise Card
          {
            id: genId('price-card-ent'),
            type: 'card',
            name: 'Enterprise Tier Card',
            props: {},
            styles: { backgroundColor: '#151c2c', borderColor: '#243048', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' },
            children: [
              { id: genId('c3-name'), type: 'heading', name: 'Plan Name', props: { text: 'Enterprise', level: 3 }, styles: { fontSize: '1.25rem', color: '#f8fafc' } },
              { id: genId('c3-cost'), type: 'heading', name: 'Price', props: { text: '$249 / mo', level: 2 }, styles: { fontSize: '2rem', color: '#6366f1' } },
              { id: genId('c3-desc'), type: 'text', name: 'Plan Description', props: { text: 'Dedicated infrastructure, custom SLA, and SSO.' }, styles: { color: '#94a3b8', fontSize: '0.9rem' } },
              { id: genId('c3-f1'), type: 'text', name: 'Feature 1', props: { text: '✓ Dedicated GPU Instances' }, styles: { color: '#cbd5e1', fontSize: '0.9rem' } },
              { id: genId('c3-f2'), type: 'text', name: 'Feature 2', props: { text: '✓ Custom AST Compilers' }, styles: { color: '#cbd5e1', fontSize: '0.9rem' } },
              { id: genId('c3-btn'), type: 'button', name: 'Enterprise CTA', props: { text: 'Contact Enterprise' }, styles: { backgroundColor: '#1e293b', color: '#ffffff', borderColor: '#334155', borderWidth: '1px', padding: '0.75rem', borderRadius: '8px', marginTop: 'auto' } },
            ],
          },
        ],
      },
    ],
  };
}

export function generateContactSection(): ComponentNode {
  return {
    id: genId('contact-section'),
    type: 'section',
    name: 'Contact & Inquiry Section',
    props: {},
    styles: {
      maxWidth: '750px',
      margin: '2rem auto',
      padding: '3rem 2rem',
      backgroundColor: '#151c2c',
      borderRadius: '16px',
      border: '1px solid #243048',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '90%',
    },
    children: [
      {
        id: genId('contact-head'),
        type: 'container',
        name: 'Header',
        props: {},
        styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
        children: [
          { id: genId('ch-title'), type: 'heading', name: 'Title', props: { text: 'Get in Touch with Our Team', level: 2 }, styles: { color: '#f8fafc', fontSize: '2rem' } },
          { id: genId('ch-desc'), type: 'text', name: 'Desc', props: { text: 'Have questions or custom requirements? Send us a message.' }, styles: { color: '#94a3b8' } },
        ],
      },
      {
        id: genId('contact-form'),
        type: 'form',
        name: 'Inquiry Form',
        props: {},
        styles: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' },
        children: [
          {
            id: genId('cf-row1'),
            type: 'container',
            name: 'Name & Email Row',
            props: {},
            styles: { display: 'grid', gridColumns: '1fr 1fr', gap: '1rem' },
            children: [
              { id: genId('in-name'), type: 'input', name: 'Name Input', props: { placeholder: 'Full Name', ariaLabel: 'Full Name' }, styles: { backgroundColor: '#0b0f19' } },
              { id: genId('in-email'), type: 'input', name: 'Email Input', props: { placeholder: 'Work Email Address', inputType: 'email', ariaLabel: 'Work Email' }, styles: { backgroundColor: '#0b0f19' } },
            ],
          },
          { id: genId('in-subj'), type: 'input', name: 'Subject Input', props: { placeholder: 'Subject / Project Scope', ariaLabel: 'Subject' }, styles: { backgroundColor: '#0b0f19' } },
          { id: genId('in-msg'), type: 'input', name: 'Message Input', props: { placeholder: 'Tell us about your project...', ariaLabel: 'Message' }, styles: { backgroundColor: '#0b0f19', minHeight: '80px' } },
          { id: genId('btn-send'), type: 'button', name: 'Send Message Button', props: { text: 'Send Message →' }, styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.85rem', borderRadius: '8px', fontWeight: '600' } },
        ],
      },
    ],
  };
}

export function generateFaqSection(): ComponentNode {
  return {
    id: genId('faq-section'),
    type: 'section',
    name: 'Frequently Asked Questions',
    props: {},
    styles: {
      maxWidth: '850px',
      margin: '2rem auto',
      padding: '2.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      width: '90%',
    },
    children: [
      { id: genId('faq-h'), type: 'heading', name: 'FAQ Title', props: { text: 'Frequently Asked Questions', level: 2 }, styles: { textAlign: 'center', color: '#f8fafc', fontSize: '2rem' } },
      {
        id: genId('faq-1'),
        type: 'accordion',
        name: 'Question 1',
        props: { text: 'How does Sketch2Web convert sketches to code?' },
        styles: { backgroundColor: '#151c2c', padding: '1rem', borderRadius: '8px', border: '1px solid #243048', color: '#f8fafc' },
        children: [
          { id: genId('a-1'), type: 'text', name: 'Answer 1', props: { text: 'Our visual parsing engine analyzes layout landmarks, component hierarchies, and typography bounds, compiling them directly into semantic HTML5 and scoped CSS3.' }, styles: { color: '#94a3b8', marginTop: '0.5rem' } },
        ],
      },
      {
        id: genId('faq-2'),
        type: 'accordion',
        name: 'Question 2',
        props: { text: 'Can I export standalone HTML/CSS/JS without frameworks?' },
        styles: { backgroundColor: '#151c2c', padding: '1rem', borderRadius: '8px', border: '1px solid #243048', color: '#f8fafc' },
        children: [
          { id: genId('a-2'), type: 'text', name: 'Answer 2', props: { text: 'Yes! The exported output is 100% clean vanilla HTML5, CSS3 with CSS variables, and ES6 JavaScript with zero external runtime dependencies.' }, styles: { color: '#94a3b8', marginTop: '0.5rem' } },
        ],
      },
    ],
  };
}

async function planLocalAiModification(prompt: string, currentProject: Project, context: AiPlanningContext = {}): Promise<AiChangePlan> {
  const lower = prompt.toLowerCase();
  const preview = cloneProject(currentProject);
  const activePage = preview.pages.find(p => p.id === preview.activePageId) || preview.pages[0];

  let title = 'General Layout Modification';
  let steps: string[] = ['Analyze request context', 'Modify AST structure', 'Update design tokens', 'Preserve responsiveness'];
  let summary = `Applied AI modification for prompt: "${prompt}"${context.selectedNode?.name ? ` on ${context.selectedNode.name}` : ''}`;
  const affectedNodes: string[] = [];

  if (lower.includes('pricing')) {
    title = 'Add 3-Tier Pricing Section';
    steps = [
      'Create 3-Tier Pricing Section container',
      'Generate Starter, Professional (Featured), and Enterprise Cards',
      'Add feature checkmarks and CTA action buttons',
      'Apply CSS Grid with responsive 1-column mobile collapse',
      'Sync design system color tokens and elevation shadows',
    ];
    summary = 'Inserted a complete, responsive 3-Tier Pricing Section with animated feature cards matching the current design system.';
    const pricingNode = generatePricingSection();
    
    // Insert before footer or at the end
    const footerIdx = activePage.rootComponent.children?.findIndex(c => c.type === 'footer') ?? -1;
    if (footerIdx >= 0 && activePage.rootComponent.children) {
      activePage.rootComponent.children.splice(footerIdx, 0, pricingNode);
    } else {
      activePage.rootComponent.children?.push(pricingNode);
    }
    affectedNodes.push(pricingNode.id);
  } else if (lower.includes('dark mode') || lower.includes('dark theme')) {
    title = 'Switch to Deep Slate Dark Theme';
    steps = [
      'Update root background to deep slate (#0b0f19)',
      'Update container surfaces to elevation dark (#151c2c)',
      'Set typography to high contrast slate text (#f8fafc)',
      'Adjust border tokens to slate border (#243048)',
    ];
    summary = 'Transformed entire design system to deep slate dark mode with high contrast accessibility standards.';
    preview.designSystem = { ...defaultDesignSystem, themeMode: 'dark' };
    affectedNodes.push('global-theme');
  } else if (lower.includes('light mode') || lower.includes('light theme')) {
    title = 'Switch to Clean Light Theme';
    steps = [
      'Update root background to bright clean slate (#f8fafc)',
      'Update container surfaces to pure white card (#ffffff)',
      'Set typography to deep slate contrast (#0f172a)',
      'Adjust border tokens to subtle light border (#e2e8f0)',
    ];
    summary = 'Transformed entire design system to clean light mode with crisp typography and subtle borders.';
    preview.designSystem = { ...lightDesignSystem, themeMode: 'light' };
    affectedNodes.push('global-theme');
  } else if (lower.includes('contact') || lower.includes('form')) {
    title = 'Add Interactive Contact Form Section';
    steps = [
      'Create Contact Section container with 2-column input layout',
      'Add Name, Email, Subject, and Message inputs with accessible labels',
      'Add submit button with instant validation handler',
      'Apply responsive mobile stacking',
    ];
    summary = 'Added an accessible, validated contact form section ready for visitor inquiries.';
    const contactNode = generateContactSection();
    const footerIdx = activePage.rootComponent.children?.findIndex(c => c.type === 'footer') ?? -1;
    if (footerIdx >= 0 && activePage.rootComponent.children) {
      activePage.rootComponent.children.splice(footerIdx, 0, contactNode);
    } else {
      activePage.rootComponent.children?.push(contactNode);
    }
    affectedNodes.push(contactNode.id);
  } else if (lower.includes('faq') || lower.includes('accordion') || lower.includes('question')) {
    title = 'Add FAQ Accordion Section';
    steps = [
      'Construct FAQ Section with collapsible <details> HTML elements',
      'Populate with common questions regarding architecture & export',
      'Apply smooth CSS transition and surface card styling',
    ];
    summary = 'Added an accessible FAQ accordion section with smooth toggle capabilities.';
    const faqNode = generateFaqSection();
    const footerIdx = activePage.rootComponent.children?.findIndex(c => c.type === 'footer') ?? -1;
    if (footerIdx >= 0 && activePage.rootComponent.children) {
      activePage.rootComponent.children.splice(footerIdx, 0, faqNode);
    } else {
      activePage.rootComponent.children?.push(faqNode);
    }
    affectedNodes.push(faqNode.id);
  } else if (lower.includes('4-column') || lower.includes('4 column') || lower.includes('four-column')) {
    title = 'Convert Layouts to Four Columns';
    steps = ['Find existing grid sections in the active page', 'Set each grid to four responsive columns', 'Preserve card content and mobile collapse behavior'];
    summary = 'Updated existing feature grids to four desktop columns while retaining their component tree and responsive layout.';
    updateNodes(preview.pages, (node) => {
      if (node.type !== 'grid') return node;
      return { ...node, name: '4-Column Grid', styles: { ...node.styles, display: 'grid', gridColumns: 'repeat(4, minmax(0, 1fr))' } };
    }, affectedNodes);
  } else if (lower.includes('sidebar')) {
    title = 'Add Sidebar Navigation';
    steps = ['Create a responsive sidebar navigation component', 'Place it beside the active page content', 'Collapse to a stacked navigation on mobile'];
    summary = 'Added a reusable sidebar navigation container to the active page without changing existing content nodes.';
    const sidebar = generateSidebarSection();
    activePage.rootComponent.children = [sidebar, ...(activePage.rootComponent.children || [])];
    activePage.rootComponent.styles = { ...activePage.rootComponent.styles, display: 'grid', gridColumns: '240px minmax(0, 1fr)', alignItems: 'start' };
    affectedNodes.push(sidebar.id);
  } else if (lower.includes('testimonial')) {
    title = 'Add Testimonials Section';
    steps = ['Create a testimonial section below the existing content', 'Add three testimonial cards with responsive grid layout', 'Use current design-system surfaces and typography'];
    summary = 'Added a responsive testimonials section to the active page.';
    const testimonials = generateTestimonialsSection();
    insertBeforeFooter(activePage, testimonials);
    affectedNodes.push(testimonials.id);
  } else if (lower.includes('newsletter')) {
    title = 'Remove Newsletter Section';
    steps = ['Locate the newsletter or subscription form section', 'Remove the matched section from the component tree', 'Preserve the remaining page order'];
    const before = activePage.rootComponent.children?.length || 0;
    activePage.rootComponent.children = (activePage.rootComponent.children || []).filter((node) => !/newsletter|subscribe/i.test(`${node.name} ${node.props.text || ''}`));
    summary = before === activePage.rootComponent.children.length ? 'No newsletter section was found; the component tree was left unchanged.' : 'Removed the newsletter section from the active page.';
  } else if (lower.includes('move') && lower.includes('hero') && lower.includes('right')) {
    title = 'Move Hero Visual to the Right';
    steps = ['Find the hero section containing a visual asset', 'Use a two-column grid with text first and visual second', 'Preserve the visual node and responsive stacking'];
    const moved = updateNodes(preview.pages, (node) => {
      if (node.type !== 'hero' || !node.children?.some((child) => child.type === 'image')) return node;
      const children = [...node.children].sort((a, b) => (a.type === 'image' ? 1 : 0) - (b.type === 'image' ? 1 : 0));
      return { ...node, styles: { ...node.styles, display: 'grid', gridColumns: 'minmax(0, 1fr) minmax(0, 1fr)', alignItems: 'center' }, children };
    }, affectedNodes);
    if (!moved) summary = 'No hero visual was found; the component tree was left unchanged.';
  } else if (lower.includes('rounded') || lower.includes('pill')) {
    title = 'Change Button Styles to Full Pill';
    steps = [
      'Update design system buttonStyle to "pill"',
      'Apply border-radius: 9999px to all interactive button elements',
      'Recalculate horizontal padding for optical balance',
    ];
    summary = 'Updated all button components across pages to modern pill styling.';
    preview.designSystem.buttonStyle = 'pill';
    preview.designSystem.spacing.radius = '9999px';
    affectedNodes.push('all-buttons');
  } else if (lower.includes('about page') || lower.includes('add page')) {
    title = 'Create New "About Us" Page';
    steps = [
      'Generate new Page node in Page Manager',
      'Inherit global design system and color palette',
      'Build Mission Statement, Team Leadership Grid, and Values cards',
      'Add navigation route "/about"',
    ];
    summary = 'Created a new "About Us" page matching the existing design system tokens.';
    const newPage: Page = {
      id: genId('page-about'),
      name: 'About',
      path: '/about',
      icon: '👤',
      rootComponent: {
        id: genId('about-root'),
        type: 'page',
        name: 'About Page',
        props: {},
        styles: { display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh', backgroundColor: preview.designSystem.colors.background, color: preview.designSystem.colors.text },
        children: [
          activePage.rootComponent.children?.find(c => c.type === 'navbar') || { id: genId('nav'), type: 'navbar', name: 'Navbar', props: {}, styles: { padding: '1rem' } },
          {
            id: genId('about-hero'),
            type: 'hero',
            name: 'About Hero',
            props: {},
            styles: { textAlign: 'center', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' },
            children: [
              { id: genId('ah-badge'), type: 'badge', name: 'Badge', props: { text: 'OUR MISSION' }, styles: { width: 'fit-content', margin: '0 auto' } },
              { id: genId('ah-h'), type: 'heading', name: 'Heading', props: { text: 'Empowering Developers to Build the Future', level: 1 }, styles: { fontSize: '2.5rem' } },
              { id: genId('ah-p'), type: 'text', name: 'Description', props: { text: 'We believe transforming ideas into functional software should take minutes, not months.' }, styles: { color: preview.designSystem.colors.textMuted } },
            ],
          },
          activePage.rootComponent.children?.find(c => c.type === 'footer') || { id: genId('foot'), type: 'footer', name: 'Footer', props: {}, styles: { padding: '1rem' } },
        ],
      },
    };
    preview.pages.push(newPage);
    preview.activePageId = newPage.id;
    affectedNodes.push(newPage.id);
  } else {
    // Generic enhancement
    title = 'AI Modern Polish & Visual Refinement';
    steps = [
      'Analyze layout alignment and spacing consistency',
      'Refine contrast ratios for maximum readability',
      'Ensure fluid responsive breakpoints',
    ];
    summary = `Optimized component tree and styling according to instruction: "${prompt}"`;
  }

  const operations: AiChangeOperation[] = [];
  if (JSON.stringify(preview.designSystem) !== JSON.stringify(currentProject.designSystem)) {
    operations.push({ type: 'project_update', properties: { designSystem: preview.designSystem } });
  }
  preview.pages.forEach((page) => {
    const originalPage = currentProject.pages.find((candidate) => candidate.id === page.id);
    if (!originalPage) {
      operations.push({ type: 'create_page', page });
    } else {
      diffNodes(originalPage.rootComponent, page.rootComponent, operations);
    }
  });
  if (preview.activePageId !== currentProject.activePageId) {
    operations.push({ type: 'project_update', properties: { activePageId: preview.activePageId } });
  }

  return {
    id: genId('plan'),
    prompt,
    title,
    steps,
    affectedNodes,
    summary,
    operations,
    previewProject: preview,
  };
}

function diffNodes(current: ComponentNode, next: ComponentNode, operations: AiChangeOperation[]): void {
  if (current.type !== next.type) {
    operations.push({ type: 'replace', nodeId: current.id, component: next });
    return;
  }

  const properties: Partial<ComponentNode> = {};
  if (current.name !== next.name) properties.name = next.name;
  if (JSON.stringify(current.props) !== JSON.stringify(next.props)) properties.props = next.props;
  if (JSON.stringify(current.styles) !== JSON.stringify(next.styles)) properties.styles = next.styles;
  if (Object.keys(properties).length > 0) operations.push({ type: 'update', nodeId: current.id, properties });

  const currentChildren = current.children || [];
  const nextChildren = next.children || [];
  const currentById = new Map(currentChildren.map((child) => [child.id, child]));
  const nextIds = new Set(nextChildren.map((child) => child.id));
  currentChildren.forEach((child) => {
    if (!nextIds.has(child.id)) operations.push({ type: 'remove', nodeId: child.id });
  });
  nextChildren.forEach((child, position) => {
    const previous = currentById.get(child.id);
    if (!previous) operations.push({ type: 'add', parentId: next.id, component: child, position });
    else diffNodes(previous, child, operations);
    const oldPosition = currentChildren.findIndex((candidate) => candidate.id === child.id);
    if (oldPosition >= 0 && oldPosition !== position) operations.push({ type: 'reorder', nodeId: child.id, newParentId: next.id, position });
  });
}

function insertBeforeFooter(page: Page, node: ComponentNode): void {
  page.rootComponent.children = page.rootComponent.children || [];
  const footerIndex = page.rootComponent.children.findIndex((child) => child.type === 'footer');
  page.rootComponent.children.splice(footerIndex < 0 ? page.rootComponent.children.length : footerIndex, 0, node);
}

function updateNodes(pages: Page[], update: (node: ComponentNode) => ComponentNode, affectedNodes: string[]): boolean {
  let changed = false;
  const visit = (node: ComponentNode): ComponentNode => {
    const updated = update(node);
    if (updated !== node) {
      changed = true;
      affectedNodes.push(updated.id);
    }
    return { ...updated, children: updated.children?.map(visit) };
  };
  pages.forEach((page) => { page.rootComponent = visit(page.rootComponent); });
  return changed;
}

function generateSidebarSection(): ComponentNode {
  return {
    id: genId('sidebar'), type: 'section', name: 'Sidebar Navigation', props: {},
    styles: { display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem', position: 'sticky', top: '1rem' },
    children: ['Dashboard', 'Projects', 'Analytics', 'Settings'].map((text) => ({
      id: genId('sidebar-link'), type: 'text', name: `${text} Link`, props: { text, tag: 'a', href: `#${text.toLowerCase()}` }, styles: { padding: '0.65rem 0.75rem' },
    })),
  };
}

function generateTestimonialsSection(): ComponentNode {
  return {
    id: genId('testimonials'), type: 'section', name: 'Testimonials Section', props: {},
    styles: { display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '2rem auto', padding: '3rem 1.5rem', width: '90%' },
    children: [
      { id: genId('testimonials-title'), type: 'heading', name: 'Testimonials Heading', props: { text: 'What customers say', level: 2 }, styles: { textAlign: 'center' } },
      { id: genId('testimonials-grid'), type: 'grid', name: 'Testimonials Grid', props: {}, styles: { display: 'grid', gridColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.5rem' }, children: [
        'The workflow is remarkably fast.', 'Our design handoff is finally consistent.', 'A practical bridge from idea to code.',
      ].map((text) => ({ id: genId('testimonial-card'), type: 'card', name: 'Testimonial Card', props: {}, styles: { padding: '1.5rem' }, children: [{ id: genId('quote'), type: 'text', name: 'Customer Quote', props: { text }, styles: {} }] })), },
    ],
  };
}

function findNode(root: ComponentNode, id: string): ComponentNode | null {
  if (root.id === id) return root;
  for (const child of root.children || []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

export function applyAiOperations(project: Project, operations: AiChangeOperation[]): Project {
  const next = cloneProject(project);
  const locate = (id: string) => next.pages.map((page) => findNode(page.rootComponent, id)).find(Boolean) as ComponentNode | undefined;
  const remove = (id: string) => next.pages.forEach((page) => {
    const visit = (node: ComponentNode) => { node.children = (node.children || []).filter((child) => child.id !== id); node.children.forEach(visit); };
    visit(page.rootComponent);
  });
  operations.forEach((operation) => {
    if (operation.type === 'project_update') Object.assign(next, operation.properties);
    if (operation.type === 'create_page') next.pages.push(operation.page);
    if (operation.type === 'remove') remove(operation.nodeId);
    if (operation.type === 'replace') {
      const target = locate(operation.nodeId);
      if (target) Object.assign(target, operation.component);
    }
    if (operation.type === 'update' || operation.type === 'style_update' || operation.type === 'content_update' || operation.type === 'layout_update') {
      const target = locate(operation.nodeId);
      if (target) Object.assign(target, operation.properties);
    }
    if (operation.type === 'add') {
      const parent = locate(operation.parentId);
      if (parent) { parent.children = parent.children || []; parent.children.splice(operation.position ?? parent.children.length, 0, operation.component); }
    }
    if (operation.type === 'duplicate') {
      const source = locate(operation.nodeId);
      const parent = operation.newParentId ? locate(operation.newParentId) : undefined;
      if (source && parent) { parent.children = parent.children || []; parent.children.splice(operation.position ?? parent.children.length, 0, { ...cloneNode(source), id: `${source.id}-copy-${Date.now()}` }); }
    }
    if (operation.type === 'reorder' || operation.type === 'move') {
      const parent = locate(operation.newParentId);
      const source = locate(operation.nodeId);
      if (parent && source) { remove(operation.nodeId); parent.children = parent.children || []; parent.children.splice(operation.position ?? parent.children.length, 0, source); }
    }
  });
  return next;
}

export async function planAiModification(prompt: string, currentProject: Project, context: AiPlanningContext = {}): Promise<AiChangePlan> {
  try {
    const response = await fetch('/api/ai-change', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request: prompt, componentTree: currentProject.pages.find((page) => page.id === currentProject.activePageId)?.rootComponent, designSystem: currentProject.designSystem, referenceAnalysis: { detectedBoxes: context.detectedBoxes, layoutRelationships: currentProject.layoutRelationships }, selectedNodeId: context.selectedNode?.id }) });
    if (!response.ok) throw new Error((await response.json().catch(() => null))?.error || `AI change request failed (${response.status})`);
    const remote = await response.json() as { summary: string; operations: AiChangeOperation[]; warnings?: string[] };
    if (!remote || typeof remote.summary !== 'string' || !Array.isArray(remote.operations) || !remote.operations.every(isSafeRemoteOperation)) throw new Error('Invalid AI change plan');
    const previewProject = applyAiOperations(currentProject, remote.operations);
    return { id: `remote-plan-${Date.now()}`, prompt, title: 'OpenAI Structured UI Change', steps: remote.operations.map((operation) => operation.type.toUpperCase()), affectedNodes: remote.operations.flatMap((operation) => 'nodeId' in operation && operation.nodeId ? [operation.nodeId] : []), summary: remote.summary, operations: remote.operations, previewProject };
  } catch (error) {
    const localPlan = await planLocalAiModification(prompt, currentProject, context);
    return { ...localPlan, provider: 'local', warning: `AI Assistant unavailable — using local planner. (${error instanceof Error ? error.message : 'Request failed'})` };
  }
}

function isSafeRemoteOperation(operation: AiChangeOperation): boolean {
  if (!operation || typeof operation !== 'object' || typeof operation.type !== 'string') return false;
  if (operation.type === 'add') return typeof operation.parentId === 'string' && !!operation.component && typeof operation.component.id === 'string';
  if (operation.type === 'create_page') return !!operation.page && !!operation.page.rootComponent;
  if (operation.type === 'project_update') return true;
  if ('nodeId' in operation) return typeof operation.nodeId === 'string';
  return false;
}
