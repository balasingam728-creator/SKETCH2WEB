import { Project, DetectedBox } from '../types';
import { defaultDesignSystem } from '../core/defaultDesignSystem';
import { saasSketchSvg, saasDetectedBoxes, saasRootComponent } from './saasData';
import { ecommerceSketchSvg, ecommerceDetectedBoxes, ecommerceRootComponent } from './ecomData';
import { agencySketchSvg, agencyDetectedBoxes, agencyRootComponent } from './agencyData';

export { saasSketchSvg, saasDetectedBoxes, saasRootComponent } from './saasData';
export { ecommerceSketchSvg, ecommerceDetectedBoxes, ecommerceRootComponent } from './ecomData';
export { agencySketchSvg, agencyDetectedBoxes, agencyRootComponent } from './agencyData';

export const sampleProjects: Record<string, { project: Project; sketchSvg: string; detectedBoxes: DetectedBox[] }> = {
  saas: {
    project: {
      id: 'proj-saas-demo',
      name: 'NovaSaaS Platform',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pages: [
        {
          id: 'page-home',
          name: 'Home',
          path: '/',
          icon: '🏠',
          rootComponent: saasRootComponent,
          seoTitle: 'NovaSaaS — AI Automation Platform',
          seoDescription: 'Build Next-Gen Web Apps 10x Faster with AI',
        },
      ],
      activePageId: 'page-home',
      designSystem: defaultDesignSystem,
      originalType: 'sketch',
      fidelityBreakdown: {
        overall: 93,
        layout: 95,
        components: 94,
        typography: 90,
        colors: 92,
        spacing: 94,
      },
      architectureRecommendation: {
        complexity: 'Medium',
        detectedComponentsCount: 22,
        sectionsCount: 6,
        interactiveElementsCount: 5,
        responsiveComplexity: 'Medium',
        recommendedHtml: 'Semantic HTML5 with landmark elements (<nav>, <section>, <article>, <footer>)',
        recommendedCss: 'CSS Grid + Flexbox with CSS Custom Properties for design tokens',
        recommendedJs: 'Vanilla ES6+ modules for smooth scroll, form validation, and interactive widgets',
        rationale: 'Your design contains 6 structured sections with multiple reusable components (cards, badges, buttons). CSS Grid/Flexbox preserves the 3-column layout while ensuring fluid responsiveness across all devices.',
      },
      detectedBoxes: saasDetectedBoxes,
    },
    sketchSvg: saasSketchSvg,
    detectedBoxes: saasDetectedBoxes,
  },
  ecommerce: {
    project: {
      id: 'proj-ecom-demo',
      name: 'UrbanAura Storefront',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pages: [
        {
          id: 'page-store-home',
          name: 'Storefront',
          path: '/',
          icon: '🛍️',
          rootComponent: ecommerceRootComponent,
          seoTitle: 'UrbanAura — Minimalist Apparel & Gear',
          seoDescription: 'Elevate your everyday style with sustainable fashion.',
        },
      ],
      activePageId: 'page-store-home',
      designSystem: {
        ...defaultDesignSystem,
        colors: {
          ...defaultDesignSystem.colors,
          primary: '#0284c7',
          primaryHover: '#0369a1',
          accent: '#f59e0b',
        },
      },
      originalType: 'sketch',
      fidelityBreakdown: {
        overall: 91,
        layout: 92,
        components: 93,
        typography: 89,
        colors: 90,
        spacing: 91,
      },
      architectureRecommendation: {
        complexity: 'Medium',
        detectedComponentsCount: 20,
        sectionsCount: 5,
        interactiveElementsCount: 7,
        responsiveComplexity: 'Medium',
        recommendedHtml: 'Semantic HTML5 with product card articles and search forms',
        recommendedCss: '4-Column CSS Grid with responsive auto-fit collapsing on mobile',
        recommendedJs: 'Vanilla ES6+ interactive cart counter and search filter controllers',
        rationale: 'The e-commerce layout features a 4-column product grid and search inputs. CSS Grid with auto-fit provides clean wrapping on mobile devices without layout distortion.',
      },
      detectedBoxes: ecommerceDetectedBoxes,
    },
    sketchSvg: ecommerceSketchSvg,
    detectedBoxes: ecommerceDetectedBoxes,
  },
  agency: {
    project: {
      id: 'proj-agency-demo',
      name: 'Studio Kinetic Portfolio',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pages: [
        {
          id: 'page-agency-home',
          name: 'Portfolio',
          path: '/',
          icon: '🎨',
          rootComponent: agencyRootComponent,
          seoTitle: 'Studio Kinetic — Design & Technology Studio',
          seoDescription: 'Crafting digital experiences that move global markets.',
        },
      ],
      activePageId: 'page-agency-home',
      designSystem: {
        ...defaultDesignSystem,
        colors: {
          ...defaultDesignSystem.colors,
          primary: '#f43f5e',
          primaryHover: '#e11d48',
          background: '#18181b',
          surface: '#27272a',
          border: '#3f3f46',
          text: '#fafafa',
          textMuted: '#a1a1aa',
        },
      },
      originalType: 'sketch',
      fidelityBreakdown: {
        overall: 94,
        layout: 96,
        components: 95,
        typography: 92,
        colors: 94,
        spacing: 93,
      },
      architectureRecommendation: {
        complexity: 'Medium',
        detectedComponentsCount: 16,
        sectionsCount: 5,
        interactiveElementsCount: 4,
        responsiveComplexity: 'Medium',
        recommendedHtml: 'Semantic HTML5 (<nav>, <header>, <section>, <article>, <footer>)',
        recommendedCss: 'Split 2-Column Grid + 3-Column Services Flexbox',
        recommendedJs: 'Vanilla ES6+ smooth scroll and interactive modal triggers',
        rationale: 'Creative portfolio layout with 2-column project showcase and split hero. CSS Grid automatically reflows to single column on mobile.',
      },
      detectedBoxes: agencyDetectedBoxes,
    },
    sketchSvg: agencySketchSvg,
    detectedBoxes: agencyDetectedBoxes,
  },
};
