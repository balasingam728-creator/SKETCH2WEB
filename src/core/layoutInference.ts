import { ArchitectureRecommendation, ComponentNode, ComponentType, DesignSystem, DetectedBox, LayoutRelationship } from '../types';

function genId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 7)}`;
}

export interface InferredLayoutResult {
  rootComponent: ComponentNode;
  layoutRelationships: LayoutRelationship[];
  architectureRecommendation: ArchitectureRecommendation;
}

export function inferLayoutFromDetections(
  boxes: DetectedBox[],
  designSystem: DesignSystem,
  pageName: string = 'Generated Page'
): InferredLayoutResult {
  if (!boxes || boxes.length === 0) {
    // Return a clean default section if no boxes detected
    const fallbackRoot: ComponentNode = {
      id: 'page-root',
      type: 'page',
      name: pageName,
      props: {},
      styles: { display: 'flex', flexDirection: 'column', minHeight: '100vh', gap: '2rem', backgroundColor: designSystem.colors.background, color: designSystem.colors.text },
      children: [],
    };
    return {
      rootComponent: fallbackRoot,
      layoutRelationships: [],
      architectureRecommendation: {
        complexity: 'Simple',
        detectedComponentsCount: 0,
        sectionsCount: 1,
        interactiveElementsCount: 0,
        responsiveComplexity: 'Low',
        recommendedHtml: 'Semantic HTML5',
        recommendedCss: 'Flexbox layout',
        recommendedJs: 'Vanilla ES6',
        rationale: 'Minimal component structure detected.',
      },
    };
  }

  // 1. Sort bounding boxes vertically (y) then horizontally (x)
  const sortedBoxes = [...boxes].sort((a, b) => a.y - b.y || a.x - b.x);

  // 2. Group boxes into vertical bands / sections based on y coordinate clusters
  const sectionBands: DetectedBox[][] = [];
  let currentBand: DetectedBox[] = [];
  let currentBandBottom = -1;

  for (const box of sortedBoxes) {
    if (currentBand.length === 0) {
      currentBand.push(box);
      currentBandBottom = box.y + box.height;
    } else {
      // If box starts significantly below the current band, create a new band
      if (box.y > currentBandBottom + 25) {
        sectionBands.push(currentBand);
        currentBand = [box];
        currentBandBottom = box.y + box.height;
      } else {
        currentBand.push(box);
        currentBandBottom = Math.max(currentBandBottom, box.y + box.height);
      }
    }
  }
  if (currentBand.length > 0) {
    sectionBands.push(currentBand);
  }

  const layoutRelationships: LayoutRelationship[] = [];
  const rootChildren: ComponentNode[] = [];

  let interactiveElementsCount = 0;

  // 3. Process each section band
  sectionBands.forEach((band, bandIdx) => {
    // Check if this band is explicitly or positionally a navbar
    const hasNav = band.some(b => b.type === 'navbar');
    const isTopBand = bandIdx === 0 && band.some(b => b.y < 110);
    const isBottomBand = bandIdx === sectionBands.length - 1 && band.some(b => b.y > 700 || b.type === 'footer');

    if (hasNav || (isTopBand && band.length <= 4 && !band.some(b => b.type === 'hero' || b.height > 150))) {
      // Construct Navbar
      const navNode = buildNavbarSection(band, designSystem);
      decorateWithSourceGeometry(navNode, band);
      rootChildren.push(navNode);
      layoutRelationships.push({
        type: 'navbar',
        bounds: getBoundingRect(band),
        alignment: 'space-between',
        items: band,
      });
      interactiveElementsCount += band.filter(b => b.type === 'button' || b.type === 'input').length;
      return;
    }

    if (isBottomBand || band.some(b => b.type === 'footer')) {
      // Construct Footer
      const footerNode = buildFooterSection(band, designSystem);
      decorateWithSourceGeometry(footerNode, band);
      rootChildren.push(footerNode);
      layoutRelationships.push({
        type: 'footer',
        bounds: getBoundingRect(band),
        alignment: 'space-between',
        items: band,
      });
      return;
    }

    // Check for Multi-column Grid (cards / columns with similar y and width)
    const cardOrColumnBoxes = band.filter(b => b.type === 'card' || b.type === 'grid' || (b.width < 400 && b.height > 120));
    if (cardOrColumnBoxes.length >= 2) {
      const gridNode = buildGridSection(band, cardOrColumnBoxes, designSystem);
      decorateWithSourceGeometry(gridNode, band);
      rootChildren.push(gridNode);
      layoutRelationships.push({
        type: 'grid',
        bounds: getBoundingRect(band),
        alignment: 'center',
        items: band,
      });
      interactiveElementsCount += band.filter(b => b.type === 'button' || b.type === 'input').length;
      return;
    }

    // Check for Form Section
    const hasFormElements = band.some(b => b.type === 'form' || b.type === 'input');
    if (hasFormElements) {
      const formNode = buildFormSection(band, designSystem);
      decorateWithSourceGeometry(formNode, band);
      rootChildren.push(formNode);
      layoutRelationships.push({
        type: 'form',
        bounds: getBoundingRect(band),
        alignment: 'center',
        items: band,
      });
      interactiveElementsCount += band.filter(b => b.type === 'button' || b.type === 'input').length;
      return;
    }

    // Check for Hero Section
    const hasHero = band.some(b => b.type === 'hero' || (b.y < 380 && (b.type === 'heading' || b.height > 180)));
    if (hasHero) {
      const heroNode = buildHeroSection(band, designSystem);
      decorateWithSourceGeometry(heroNode, band);
      rootChildren.push(heroNode);
      layoutRelationships.push({
        type: 'hero',
        bounds: getBoundingRect(band),
        alignment: 'center',
        items: band,
      });
      interactiveElementsCount += band.filter(b => b.type === 'button').length;
      return;
    }

    // Standard Section
    const genericNode = buildGenericSection(band, designSystem, `Section ${bandIdx + 1}`);
    decorateWithSourceGeometry(genericNode, band);
    rootChildren.push(genericNode);
    layoutRelationships.push({
      type: 'section',
      bounds: getBoundingRect(band),
      alignment: 'center',
      items: band,
    });
    interactiveElementsCount += band.filter(b => b.type === 'button' || b.type === 'input').length;
  });

  const rootComponent: ComponentNode = {
    id: 'page-root',
    type: 'page',
    name: pageName,
    props: {},
    styles: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: designSystem.colors.background,
      color: designSystem.colors.text,
      gap: '2.5rem',
      overflow: 'hidden',
    },
    children: rootChildren,
  };

  // Compute realistic architecture metrics based on true detection
  const detectedCount = boxes.length;
  const sectionsCount = sectionBands.length;
  const complexity = detectedCount > 20 || sectionsCount > 5 ? 'Advanced' : detectedCount > 10 ? 'Medium' : 'Simple';
  const responsiveComplexity = sectionsCount >= 4 ? 'Medium' : 'Low';

  const architectureRecommendation: ArchitectureRecommendation = {
    complexity,
    detectedComponentsCount: detectedCount,
    sectionsCount,
    interactiveElementsCount,
    responsiveComplexity,
    recommendedHtml: `Semantic HTML5 with ${sectionsCount} structured landmarks (<nav>, <section>, <footer>)`,
    recommendedCss: 'CSS Grid + Flexbox with CSS Custom Properties for design tokens',
    recommendedJs: 'Modular Vanilla ES6+ event listeners and form handlers',
    rationale: `Analyzed ${detectedCount} detected components across ${sectionsCount} sections. CSS Grid & Flexbox preserves the horizontal card alignment and navigation while ensuring fluid collapse on mobile viewports.`,
  };

  return {
    rootComponent,
    layoutRelationships,
    architectureRecommendation,
  };
}

function getBoundingRect(boxes: DetectedBox[]): { x: number; y: number; width: number; height: number } {
  if (boxes.length === 0) return { x: 0, y: 0, width: 800, height: 100 };
  const minX = Math.min(...boxes.map(b => b.x));
  const minY = Math.min(...boxes.map(b => b.y));
  const maxX = Math.max(...boxes.map(b => b.x + b.width));
  const maxY = Math.max(...boxes.map(b => b.y + b.height));
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function decorateWithSourceGeometry(node: ComponentNode, boxes: DetectedBox[]): void {
  const bounds = getBoundingRect(boxes);
  node.sourceBounds = bounds;
  node.sourceDetectionId = boxes[0]?.id;
  node.styles = {
    ...node.styles,
    width: `${Math.min(100, Math.max(35, Math.round((bounds.width / 800) * 100)))}%`,
    minHeight: `${Math.max(48, Math.round(bounds.height))}px`,
    marginLeft: `${Math.max(0, Math.round((bounds.x / 800) * 100))}%`,
  };

  const remaining = [...boxes];
  node.children?.forEach((child) => {
    const matchIndex = remaining.findIndex((box) => box.type === child.type || (child.type === 'text' && box.text));
    if (matchIndex < 0) return;
    const [match] = remaining.splice(matchIndex, 1);
    child.sourceBounds = { x: match.x, y: match.y, width: match.width, height: match.height };
    child.sourceDetectionId = match.id;
  });
}

// -------------------------------------------------------------
// Section Builders
// -------------------------------------------------------------

function buildNavbarSection(band: DetectedBox[], ds: DesignSystem): ComponentNode {
  // Sort horizontally
  const sorted = [...band].sort((a, b) => a.x - b.x);

  const leftItem = sorted[0];
  const brandTitle = leftItem?.text || '';

  const navChildren: ComponentNode[] = [
    {
      id: genId('nav-brand'),
      type: 'heading',
      name: 'Brand Logo',
      props: { text: brandTitle, level: 3 },
      styles: {
        fontSize: '1.35rem',
        fontWeight: '700',
        color: ds.colors.primary,
      },
    },
  ];

  // Middle links
  const middleItems = sorted.slice(1, sorted.length > 2 ? sorted.length - 1 : sorted.length);
  const linksContainer: ComponentNode = {
    id: genId('nav-links'),
    type: 'container',
    name: 'Navigation Links',
    props: {},
    styles: {
      display: 'flex',
      gap: '1.75rem',
      alignItems: 'center',
    },
    children: [
      { id: genId('l1'), type: 'text', name: 'Home Link', props: { text: 'Home', tag: 'a', href: '#home' }, styles: { color: ds.colors.textMuted, fontSize: '0.95rem' } },
      { id: genId('l2'), type: 'text', name: 'Features Link', props: { text: 'Features', tag: 'a', href: '#features' }, styles: { color: ds.colors.textMuted, fontSize: '0.95rem' } },
      { id: genId('l3'), type: 'text', name: 'About Link', props: { text: 'About', tag: 'a', href: '#about' }, styles: { color: ds.colors.textMuted, fontSize: '0.95rem' } },
      { id: genId('l4'), type: 'text', name: 'Contact Link', props: { text: 'Contact', tag: 'a', href: '#contact' }, styles: { color: ds.colors.textMuted, fontSize: '0.95rem' } },
    ],
  };
  navChildren.push(linksContainer);

  // Right CTA or button
  const rightItem = sorted[sorted.length - 1];
  const btnText = rightItem?.text || '';
  navChildren.push({
    id: genId('nav-cta'),
    type: 'button',
    name: 'Nav Action Button',
    props: { text: btnText },
    styles: {
      backgroundColor: ds.colors.primary,
      color: '#ffffff',
      padding: '0.6rem 1.25rem',
      borderRadius: ds.spacing.radius || '8px',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
  });

  return {
    id: genId('navbar'),
    type: 'navbar',
    name: 'Navigation Bar',
    props: {},
    styles: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem 2.5rem',
      backgroundColor: ds.colors.surface,
      borderBottom: `1px solid ${ds.colors.border}`,
      position: 'sticky',
      top: '0',
      zIndex: '40',
    },
    children: navChildren,
  };
}

function buildHeroSection(band: DetectedBox[], ds: DesignSystem): ComponentNode {
  // Check if hero is split (side-by-side text and image)
  const hasSideBySide = band.some(b => b.type === 'image' && b.x > 380);

  if (hasSideBySide) {
    // 2-Column Split Hero
    const leftText = band.find(b => b.type === 'heading' || b.x < 380);
    const rightImg = band.find(b => b.type === 'image' || b.x >= 380);

    return {
      id: genId('hero-split'),
      type: 'hero',
      name: 'Split Hero Section',
      props: {},
      styles: {
        display: 'grid',
        gridColumns: '1fr 1fr',
        gap: '2.5rem',
        alignItems: 'center',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        width: '90%',
      },
      children: [
        {
          id: genId('hero-left'),
          type: 'container',
          name: 'Hero Text Column',
          props: {},
          styles: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
          children: [
            { id: genId('h-badge'), type: 'badge', name: 'Badge', props: { text: '✨ Launching Today' }, styles: { width: 'fit-content', backgroundColor: 'rgba(79,70,229,0.15)', color: ds.colors.primary } },
            { id: genId('h-title'), type: 'heading', name: 'Hero Title', props: { text: leftText?.text || '', level: 1 }, styles: { fontSize: '2.85rem', fontWeight: '800', lineHeight: '1.2', color: ds.colors.text } },
            { id: genId('h-desc'), type: 'text', name: 'Hero Subtitle', props: { text: 'Transform ideas and sketches directly into high-fidelity web experiences.' }, styles: { color: ds.colors.textMuted, fontSize: '1.15rem' } },
            { id: genId('h-btn'), type: 'button', name: 'CTA Button', props: { text: 'Explore Platform →' }, styles: { backgroundColor: ds.colors.primary, color: '#ffffff', padding: '0.85rem 1.75rem', borderRadius: '8px', width: 'fit-content', fontWeight: '600' } },
          ],
        },
        {
          id: genId('hero-right'),
          type: 'container',
          name: 'Hero Graphic Column',
          props: {},
          styles: { display: 'flex', justifyContent: 'center' },
          children: [
            { id: genId('hero-img'), type: 'image', name: 'Hero Visual Asset', props: { src: rightImg?.text || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80', alt: 'Platform illustration' }, styles: { width: '100%', borderRadius: '16px', boxShadow: ds.spacing.shadow } },
          ],
        },
      ],
    };
  }

  // Centered Hero Section
  const headingBox = band.find(b => b.type === 'heading') || band[0];
  const titleText = headingBox?.text || '';

  return {
    id: genId('hero-centered'),
    type: 'hero',
    name: 'Hero Showcase Section',
    props: {},
    styles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '4rem 1.5rem',
      maxWidth: '900px',
      margin: '0 auto',
      gap: '1.25rem',
      width: '90%',
    },
    children: [
      {
        id: genId('hero-badge'),
        type: 'badge',
        name: 'Product Badge',
        props: { text: '✨ Modern Web Platform' },
        styles: {
          backgroundColor: 'rgba(79, 70, 229, 0.15)',
          color: ds.colors.primary,
          padding: '0.35rem 1rem',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: '600',
        },
      },
      {
        id: genId('hero-h1'),
        type: 'heading',
        name: 'Hero Title',
        props: { text: titleText, level: 1 },
        styles: {
          fontSize: '2.85rem',
          fontWeight: '800',
          lineHeight: '1.2',
          color: ds.colors.text,
        },
      },
      {
        id: genId('hero-sub'),
        type: 'text',
        name: 'Hero Description',
        props: { text: 'Generated from analyzed visual layout with zero boilerplate and pure semantic code.' },
        styles: {
          fontSize: '1.15rem',
          color: ds.colors.textMuted,
          maxWidth: '650px',
          lineHeight: '1.6',
        },
      },
      {
        id: genId('hero-btn-row'),
        type: 'container',
        name: 'Button Row',
        props: {},
        styles: { display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' },
        children: [
          {
            id: genId('btn-1'),
            type: 'button',
            name: 'Primary CTA',
            props: { text: 'Get Started Now →' },
            styles: {
              backgroundColor: ds.colors.primary,
              color: '#ffffff',
              padding: '0.85rem 1.75rem',
              borderRadius: ds.spacing.radius || '8px',
              fontSize: '1rem',
              fontWeight: '600',
            },
          },
          {
            id: genId('btn-2'),
            type: 'button',
            name: 'Secondary Action',
            props: { text: 'Learn More' },
            styles: {
              backgroundColor: ds.colors.surface,
              color: ds.colors.text,
              borderColor: ds.colors.border,
              borderWidth: '1px',
              padding: '0.85rem 1.75rem',
              borderRadius: ds.spacing.radius || '8px',
              fontSize: '1rem',
              fontWeight: '500',
            },
          },
        ],
      },
    ],
  };
}

function buildGridSection(band: DetectedBox[], cardBoxes: DetectedBox[], ds: DesignSystem): ComponentNode {
  const columnCount = Math.min(4, Math.max(2, cardBoxes.length));
  const headerBox = band.find(b => b.type === 'heading');
  const sectionTitle = headerBox?.text || '';

  const cardNodes: ComponentNode[] = cardBoxes.map((cardBox, idx) => {
    const cardTitle = cardBox.text || `Item Card ${idx + 1}`;
    return {
      id: genId('card'),
      type: 'card',
      name: `Card ${idx + 1}`,
      props: {},
      styles: {
        backgroundColor: ds.colors.surface,
        borderColor: ds.colors.border,
        borderWidth: '1px',
        padding: '1.75rem',
        borderRadius: ds.spacing.radius || '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        boxShadow: ds.spacing.shadow,
      },
      children: [
        {
          id: genId('c-icon'),
          type: 'badge',
          name: 'Category Tag',
          props: { text: idx === 0 ? '⚡ Performance' : idx === 1 ? '🎯 Precision' : idx === 2 ? '🚀 Velocity' : '💎 Premium' },
          styles: { width: 'fit-content', backgroundColor: 'rgba(79, 70, 229, 0.15)', color: ds.colors.primary },
        },
        {
          id: genId('c-title'),
          type: 'heading',
          name: 'Card Title',
          props: { text: cardTitle, level: 3 },
          styles: { fontSize: '1.25rem', color: ds.colors.text, fontWeight: '700' },
        },
        {
          id: genId('c-desc'),
          type: 'text',
          name: 'Card Body',
          props: { text: 'Engineered with responsive modularity and optimal semantic frontend structure.' },
          styles: { color: ds.colors.textMuted, fontSize: '0.9rem', lineHeight: '1.5' },
        },
        {
          id: genId('c-btn'),
          type: 'button',
          name: 'Card Action',
          props: { text: 'View Details →' },
          styles: { backgroundColor: 'transparent', color: ds.colors.primary, padding: '0.5rem 0', fontWeight: '600', width: 'fit-content', marginTop: 'auto' },
        },
      ],
    };
  });

  return {
    id: genId('grid-section'),
    type: 'section',
    name: 'Responsive Grid Section',
    props: {},
    styles: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      width: '90%',
    },
    children: [
      {
        id: genId('grid-header'),
        type: 'container',
        name: 'Section Header',
        props: {},
        styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
        children: [
          { id: genId('gh-title'), type: 'heading', name: 'Title', props: { text: sectionTitle, level: 2 }, styles: { fontSize: '2rem', color: ds.colors.text } },
          { id: genId('gh-sub'), type: 'text', name: 'Subtitle', props: { text: 'Multi-column layout inferred from sketch structure.' }, styles: { color: ds.colors.textMuted } },
        ],
      },
      {
        id: genId('grid-container'),
        type: 'grid',
        name: `${columnCount}-Column Grid`,
        props: {},
        styles: {
          display: 'grid',
          gridColumns: `repeat(${columnCount}, 1fr)`,
          gap: '1.5rem',
        },
        children: cardNodes,
      },
    ],
  };
}

function buildFormSection(band: DetectedBox[], ds: DesignSystem): ComponentNode {
  const headingBox = band.find(b => b.type === 'heading');
  const title = headingBox?.text || '';

  return {
    id: genId('form-section'),
    type: 'section',
    name: 'Form Container Section',
    props: {},
    styles: {
      maxWidth: '700px',
      margin: '2rem auto',
      padding: '3rem 2rem',
      backgroundColor: ds.colors.surface,
      borderRadius: '16px',
      border: `1px solid ${ds.colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '90%',
    },
    children: [
      {
        id: genId('fh-head'),
        type: 'container',
        name: 'Form Header',
        props: {},
        styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
        children: [
          { id: genId('fh-title'), type: 'heading', name: 'Title', props: { text: title, level: 2 }, styles: { color: ds.colors.text, fontSize: '2rem' } },
          { id: genId('fh-desc'), type: 'text', name: 'Subtitle', props: { text: 'Fill out the form below and our team will respond shortly.' }, styles: { color: ds.colors.textMuted } },
        ],
      },
      {
        id: genId('form-body'),
        type: 'form',
        name: 'Interactive Form',
        props: {},
        styles: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' },
        children: [
          { id: genId('in-1'), type: 'input', name: 'Name Field', props: { placeholder: 'Your Full Name', ariaLabel: 'Full Name' }, styles: { backgroundColor: ds.colors.background } },
          { id: genId('in-2'), type: 'input', name: 'Email Field', props: { placeholder: 'Email Address', inputType: 'email', ariaLabel: 'Email' }, styles: { backgroundColor: ds.colors.background } },
          { id: genId('in-3'), type: 'input', name: 'Message Field', props: { placeholder: 'Your Message...', ariaLabel: 'Message' }, styles: { backgroundColor: ds.colors.background, minHeight: '80px' } },
          { id: genId('in-btn'), type: 'button', name: 'Submit Button', props: { text: 'Submit Form →' }, styles: { backgroundColor: ds.colors.primary, color: '#ffffff', padding: '0.85rem', borderRadius: '8px', fontWeight: '600' } },
        ],
      },
    ],
  };
}

function buildFooterSection(band: DetectedBox[], ds: DesignSystem): ComponentNode {
  return {
    id: genId('footer-main'),
    type: 'footer',
    name: 'Global Footer',
    props: {},
    styles: {
      backgroundColor: ds.colors.surface,
      borderTop: `1px solid ${ds.colors.border}`,
      padding: '2rem 2.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    },
    children: [
      { id: genId('f-copy'), type: 'text', name: 'Copyright Notice', props: { text: `© ${new Date().getFullYear()} Generated Website. All rights reserved.` }, styles: { color: ds.colors.textMuted, fontSize: '0.875rem' } },
      {
        id: genId('f-links'),
        type: 'container',
        name: 'Footer Links',
        props: {},
        styles: { display: 'flex', gap: '1.5rem' },
        children: [
          { id: genId('fl-1'), type: 'text', name: 'Privacy Link', props: { text: 'Privacy Policy', tag: 'a', href: '#' }, styles: { color: ds.colors.textMuted, fontSize: '0.875rem' } },
          { id: genId('fl-2'), type: 'text', name: 'Terms Link', props: { text: 'Terms of Service', tag: 'a', href: '#' }, styles: { color: ds.colors.textMuted, fontSize: '0.875rem' } },
          { id: genId('fl-3'), type: 'text', name: 'Docs Link', props: { text: 'Documentation', tag: 'a', href: '#' }, styles: { color: ds.colors.textMuted, fontSize: '0.875rem' } },
        ],
      },
    ],
  };
}

function buildGenericSection(band: DetectedBox[], ds: DesignSystem, defaultTitle: string): ComponentNode {
  const children: ComponentNode[] = band.map((box, i) => {
    switch (box.type) {
      case 'heading':
        return { id: genId('h'), type: 'heading', name: 'Heading', props: { text: box.text || defaultTitle, level: 2 }, styles: { fontSize: '2rem', color: ds.colors.text } };
      case 'button':
        return { id: genId('btn'), type: 'button', name: 'Button', props: { text: box.text || '' }, styles: { backgroundColor: ds.colors.primary, color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '8px' } };
      case 'image':
        return { id: genId('img'), type: 'image', name: 'Image', props: { src: box.text || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', alt: 'Visual' }, styles: { width: '100%', borderRadius: '12px' } };
      default:
        return { id: genId('p'), type: 'text', name: 'Text', props: { text: box.text || '' }, styles: { color: ds.colors.textMuted } };
    }
  });

  return {
    id: genId('section'),
    type: 'section',
    name: defaultTitle,
    props: {},
    styles: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '90%',
    },
    children,
  };
}
