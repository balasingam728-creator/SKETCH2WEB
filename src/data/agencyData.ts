import { ComponentNode, DetectedBox } from '../types';

export const agencySketchSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%" style="background: #18181b; font-family: 'Comic Sans MS', cursive, sans-serif;">
  <rect width="800" height="1000" fill="#18181b"/>
  <!-- Nav -->
  <rect x="40" y="30" width="720" height="55" rx="8" fill="#27272a" stroke="#f43f5e" stroke-width="2"/>
  <text x="65" y="65" fill="#f43f5e" font-size="18" font-weight="bold">✦ STUDIO KINETIC</text>
  <text x="320" y="64" fill="#d4d4d8" font-size="13">Work   Services   About   Careers</text>
  <rect x="635" y="42" width="105" height="30" rx="6" fill="#f43f5e"/>
  <text x="652" y="62" fill="#ffffff" font-size="12" font-weight="bold">Let's Talk →</text>

  <!-- Split Hero -->
  <rect x="40" y="105" width="720" height="250" rx="10" fill="#27272a" stroke="#3f3f46"/>
  <text x="70" y="150" fill="#f43f5e" font-size="12" font-weight="bold">DESIGN &amp; TECHNOLOGY STUDIO</text>
  <text x="70" y="195" fill="#ffffff" font-size="24" font-weight="bold">Crafting Digital Experiences</text>
  <text x="70" y="230" fill="#ffffff" font-size="24" font-weight="bold">That Move Global Markets</text>
  <text x="70" y="265" fill="#a1a1aa" font-size="13">We partner with ambitious founders to design, build, and scale world-class software.</text>
  <rect x="70" y="290" width="140" height="38" rx="6" fill="#f43f5e"/>
  <text x="95" y="314" fill="#ffffff" font-size="13" font-weight="bold">View Our Work ↓</text>
  <!-- Right Hero Image Card -->
  <rect x="470" y="130" width="260" height="200" rx="8" fill="#3f3f46"/>
  <text x="560" y="235" fill="#a1a1aa" font-size="40">🎨</text>

  <!-- 2-Column Work Showcase -->
  <text x="40" y="385" fill="#ffffff" font-size="20" font-weight="bold">Featured Projects</text>
  <rect x="40" y="405" width="350" height="220" rx="8" fill="#27272a" stroke="#3f3f46"/>
  <rect x="55" y="420" width="320" height="110" rx="6" fill="#3f3f46"/>
  <text x="180" y="480" fill="#f43f5e" font-size="30">🚀</text>
  <text x="55" y="555" fill="#ffffff" font-size="15" font-weight="bold">Aether Protocol — DeFi OS</text>
  <text x="55" y="580" fill="#a1a1aa" font-size="12">Next-gen institutional crypto trading interface.</text>
  <text x="55" y="605" fill="#f43f5e" font-size="12" font-weight="bold">Case Study →</text>

  <rect x="410" y="405" width="350" height="220" rx="8" fill="#27272a" stroke="#3f3f46"/>
  <rect x="425" y="420" width="320" height="110" rx="6" fill="#3f3f46"/>
  <text x="550" y="480" fill="#38bdf8" font-size="30">💎</text>
  <text x="425" y="555" fill="#ffffff" font-size="15" font-weight="bold">Lumina AI — Creative Studio</text>
  <text x="425" y="580" fill="#a1a1aa" font-size="12">Generative multi-modal canvas for enterprise design teams.</text>
  <text x="425" y="605" fill="#f43f5e" font-size="12" font-weight="bold">Case Study →</text>

  <!-- Services Grid -->
  <text x="40" y="655" fill="#ffffff" font-size="20" font-weight="bold">Our Capabilities</text>
  <rect x="40" y="675" width="225" height="130" rx="8" fill="#27272a"/>
  <text x="60" y="715" fill="#f43f5e" font-size="18">01 / BRAND</text>
  <text x="60" y="745" fill="#ffffff" font-size="14" font-weight="bold">Design Systems</text>
  <text x="60" y="770" fill="#a1a1aa" font-size="11">Visual identity &amp; guidelines</text>

  <rect x="287" y="675" width="225" height="130" rx="8" fill="#27272a"/>
  <text x="307" y="715" fill="#f43f5e" font-size="18">02 / PRODUCT</text>
  <text x="307" y="745" fill="#ffffff" font-size="14" font-weight="bold">UI/UX Architecture</text>
  <text x="307" y="770" fill="#a1a1aa" font-size="11">Wireframing &amp; prototyping</text>

  <rect x="535" y="675" width="225" height="130" rx="8" fill="#27272a"/>
  <text x="555" y="715" fill="#f43f5e" font-size="18">03 / TECH</text>
  <text x="555" y="745" fill="#ffffff" font-size="14" font-weight="bold">Full-Stack Frontend</text>
  <text x="555" y="770" fill="#a1a1aa" font-size="11">Semantic HTML5, CSS3 &amp; JS</text>

  <!-- Contact Banner -->
  <rect x="40" y="825" width="720" height="90" rx="8" fill="#f43f5e"/>
  <text x="70" y="865" fill="#ffffff" font-size="18" font-weight="bold">Have an upcoming project in mind?</text>
  <text x="70" y="890" fill="#ffe4e6" font-size="13">Let's build something extraordinary together.</text>
  <rect x="580" y="850" width="150" height="40" rx="6" fill="#18181b"/>
  <text x="605" y="875" fill="#ffffff" font-size="13" font-weight="bold">Start Project →</text>

  <!-- Footer -->
  <rect x="40" y="930" width="720" height="45" rx="4" fill="#09090b"/>
  <text x="60" y="958" fill="#71717a" font-size="11">© 2026 Studio Kinetic, Inc. All rights reserved.</text>
  <text x="520" y="958" fill="#71717a" font-size="11">Twitter   Dribbble   GitHub   LinkedIn</text>
</svg>
`;

export const agencyDetectedBoxes: DetectedBox[] = [
  { id: 'det-ag-nav', label: 'Studio Navbar (Brand, Links, CTA)', type: 'navbar', confidence: 0.98, x: 40, y: 30, width: 720, height: 55, text: '✦ STUDIO KINETIC' },
  { id: 'det-ag-hero', label: 'Split Hero Section', type: 'hero', confidence: 0.97, x: 40, y: 105, width: 720, height: 250, text: 'Crafting Digital Experiences That Move Global Markets' },
  { id: 'det-ag-work', label: '2-Column Work Grid', type: 'grid', confidence: 0.96, x: 40, y: 405, width: 720, height: 220, text: 'Featured Projects' },
  { id: 'det-ag-serv', label: '3-Column Capabilities Grid', type: 'grid', confidence: 0.95, x: 40, y: 675, width: 720, height: 130, text: 'Our Capabilities' },
  { id: 'det-ag-cta', label: 'Contact Inquiry Banner', type: 'section', confidence: 0.94, x: 40, y: 825, width: 720, height: 90, text: 'Have an upcoming project?' },
  { id: 'det-ag-foot', label: 'Footer (Legal & Socials)', type: 'footer', confidence: 0.98, x: 40, y: 930, width: 720, height: 45 },
];

export const agencyRootComponent: ComponentNode = {
  id: 'agency-root',
  type: 'page',
  name: 'Studio Kinetic Home',
  props: {},
  styles: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#18181b',
    color: '#fafafa',
    gap: '2.5rem',
  },
  children: [
    // Navbar
    {
      id: 'ag-nav',
      type: 'navbar',
      name: 'Agency Navbar',
      props: {},
      styles: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 2.5rem',
        backgroundColor: '#27272a',
        borderBottom: '1px solid #3f3f46',
        position: 'sticky',
        top: '0',
      },
      children: [
        { id: 'ag-logo', type: 'heading', name: 'Logo', props: { text: '✦ STUDIO KINETIC', level: 3 }, styles: { fontSize: '1.3rem', color: '#f43f5e', fontWeight: '800' } },
        {
          id: 'ag-links',
          type: 'container',
          name: 'Links',
          props: {},
          styles: { display: 'flex', gap: '1.75rem' },
          children: [
            { id: 'l1', type: 'text', name: 'Work', props: { text: 'Work', tag: 'a', href: '#work' }, styles: { color: '#a1a1aa' } },
            { id: 'l2', type: 'text', name: 'Services', props: { text: 'Services', tag: 'a', href: '#services' }, styles: { color: '#a1a1aa' } },
            { id: 'l3', type: 'text', name: 'About', props: { text: 'About', tag: 'a', href: '#about' }, styles: { color: '#a1a1aa' } },
            { id: 'l4', type: 'text', name: 'Careers', props: { text: 'Careers', tag: 'a', href: '#careers' }, styles: { color: '#a1a1aa' } },
          ],
        },
        { id: 'ag-cta', type: 'button', name: 'CTA', props: { text: "Let's Talk →" }, styles: { backgroundColor: '#f43f5e', color: '#ffffff', padding: '0.6rem 1.25rem', borderRadius: '6px', fontWeight: '700' } },
      ],
    },

    // Split Hero
    {
      id: 'ag-hero',
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
        padding: '3rem 1.5rem',
        width: '90%',
      },
      children: [
        {
          id: 'ag-h-left',
          type: 'container',
          name: 'Hero Content',
          props: {},
          styles: { display: 'flex', flexDirection: 'column', gap: '1rem' },
          children: [
            { id: 'ag-tag', type: 'badge', name: 'Tag', props: { text: 'DESIGN & TECHNOLOGY STUDIO' }, styles: { backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', width: 'fit-content' } },
            { id: 'ag-h1', type: 'heading', name: 'H1', props: { text: 'Crafting Digital Experiences That Move Global Markets', level: 1 }, styles: { fontSize: '2.75rem', fontWeight: '800', lineHeight: '1.2' } },
            { id: 'ag-desc', type: 'text', name: 'Desc', props: { text: 'We partner with ambitious founders to design, build, and scale world-class software.' }, styles: { color: '#a1a1aa', fontSize: '1.1rem' } },
            { id: 'ag-btn', type: 'button', name: 'Button', props: { text: 'View Our Work ↓' }, styles: { backgroundColor: '#f43f5e', color: '#ffffff', padding: '0.85rem 1.75rem', borderRadius: '6px', width: 'fit-content', fontWeight: '700' } },
          ],
        },
        {
          id: 'ag-h-right',
          type: 'container',
          name: 'Hero Graphic',
          props: {},
          styles: { display: 'flex', justifyContent: 'center' },
          children: [
            { id: 'ag-img', type: 'image', name: 'Hero Visual Asset', props: { src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80', alt: 'Studio Artwork' }, styles: { borderRadius: '16px', width: '100%' } },
          ],
        },
      ],
    },

    // 2-Column Work Showcase
    {
      id: 'ag-work-section',
      type: 'section',
      name: 'Featured Projects Section',
      props: {},
      styles: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '90%' },
      children: [
        { id: 'ag-w-head', type: 'heading', name: 'Title', props: { text: 'Featured Projects', level: 2 }, styles: { fontSize: '2rem' } },
        {
          id: 'ag-w-grid',
          type: 'grid',
          name: '2-Column Project Grid',
          props: {},
          styles: { display: 'grid', gridColumns: '1fr 1fr', gap: '1.75rem' },
          children: [
            {
              id: 'proj-1',
              type: 'card',
              name: 'Project Card 1',
              props: {},
              styles: { backgroundColor: '#27272a', borderColor: '#3f3f46', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
              children: [
                { id: 'p1-img', type: 'image', name: 'Project Mockup', props: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80', alt: 'Aether Protocol' } },
                { id: 'p1-title', type: 'heading', name: 'Title', props: { text: 'Aether Protocol — DeFi OS', level: 3 }, styles: { fontSize: '1.25rem' } },
                { id: 'p1-desc', type: 'text', name: 'Desc', props: { text: 'Next-generation institutional crypto trading interface and execution engine.' }, styles: { color: '#a1a1aa', fontSize: '0.9rem' } },
                { id: 'p1-btn', type: 'button', name: 'Link', props: { text: 'Case Study →' }, styles: { color: '#f43f5e', backgroundColor: 'transparent', padding: '0.5rem 0', fontWeight: '700', width: 'fit-content' } },
              ],
            },
            {
              id: 'proj-2',
              type: 'card',
              name: 'Project Card 2',
              props: {},
              styles: { backgroundColor: '#27272a', borderColor: '#3f3f46', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
              children: [
                { id: 'p2-img', type: 'image', name: 'Project Mockup', props: { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80', alt: 'Lumina AI' } },
                { id: 'p2-title', type: 'heading', name: 'Title', props: { text: 'Lumina AI — Creative Studio', level: 3 }, styles: { fontSize: '1.25rem' } },
                { id: 'p2-desc', type: 'text', name: 'Desc', props: { text: 'Generative multi-modal canvas for enterprise design teams and creators.' }, styles: { color: '#a1a1aa', fontSize: '0.9rem' } },
                { id: 'p2-btn', type: 'button', name: 'Link', props: { text: 'Case Study →' }, styles: { color: '#f43f5e', backgroundColor: 'transparent', padding: '0.5rem 0', fontWeight: '700', width: 'fit-content' } },
              ],
            },
          ],
        },
      ],
    },

    // Services 3-Col Grid
    {
      id: 'ag-services-section',
      type: 'section',
      name: 'Capabilities Section',
      props: {},
      styles: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '90%' },
      children: [
        { id: 'ag-s-head', type: 'heading', name: 'Title', props: { text: 'Our Capabilities', level: 2 }, styles: { fontSize: '2rem' } },
        {
          id: 'ag-s-grid',
          type: 'grid',
          name: '3-Column Services Grid',
          props: {},
          styles: { display: 'grid', gridColumns: 'repeat(3, 1fr)', gap: '1.5rem' },
          children: [
            {
              id: 's1',
              type: 'card',
              name: 'Brand Strategy',
              props: {},
              styles: { backgroundColor: '#27272a', padding: '1.5rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
              children: [
                { id: 's1-num', type: 'badge', name: 'Num', props: { text: '01 / BRAND' }, styles: { color: '#f43f5e', width: 'fit-content' } },
                { id: 's1-h', type: 'heading', name: 'Heading', props: { text: 'Design Systems', level: 4 }, styles: { fontSize: '1.15rem' } },
                { id: 's1-p', type: 'text', name: 'Body', props: { text: 'Scalable multi-platform design tokens and UI component libraries.' }, styles: { color: '#a1a1aa', fontSize: '0.85rem' } },
              ],
            },
            {
              id: 's2',
              type: 'card',
              name: 'Product Design',
              props: {},
              styles: { backgroundColor: '#27272a', padding: '1.5rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
              children: [
                { id: 's2-num', type: 'badge', name: 'Num', props: { text: '02 / PRODUCT' }, styles: { color: '#f43f5e', width: 'fit-content' } },
                { id: 's2-h', type: 'heading', name: 'Heading', props: { text: 'UI/UX Architecture', level: 4 }, styles: { fontSize: '1.15rem' } },
                { id: 's2-p', type: 'text', name: 'Body', props: { text: 'Wireframing, rapid prototyping, and user journey mapping.' }, styles: { color: '#a1a1aa', fontSize: '0.85rem' } },
              ],
            },
            {
              id: 's3',
              type: 'card',
              name: 'Engineering',
              props: {},
              styles: { backgroundColor: '#27272a', padding: '1.5rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
              children: [
                { id: 's3-num', type: 'badge', name: 'Num', props: { text: '03 / TECH' }, styles: { color: '#f43f5e', width: 'fit-content' } },
                { id: 's3-h', type: 'heading', name: 'Heading', props: { text: 'Full-Stack Frontend', level: 4 }, styles: { fontSize: '1.15rem' } },
                { id: 's3-p', type: 'text', name: 'Body', props: { text: 'Production semantic HTML5, modern CSS3 Grid, and Vanilla ES6 JS.' }, styles: { color: '#a1a1aa', fontSize: '0.85rem' } },
              ],
            },
          ],
        },
      ],
    },

    // Contact CTA
    {
      id: 'ag-contact-cta',
      type: 'section',
      name: 'Contact Banner',
      props: {},
      styles: {
        maxWidth: '1100px',
        margin: '2rem auto',
        padding: '2.5rem 2rem',
        backgroundColor: '#f43f5e',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
      },
      children: [
        {
          id: 'cta-left',
          type: 'container',
          name: 'Text Container',
          props: {},
          styles: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
          children: [
            { id: 'ch1', type: 'heading', name: 'Title', props: { text: 'Have an upcoming project in mind?', level: 2 }, styles: { color: '#ffffff', fontSize: '1.75rem' } },
            { id: 'cp1', type: 'text', name: 'Desc', props: { text: "Let's build something extraordinary together." }, styles: { color: '#ffe4e6' } },
          ],
        },
        { id: 'cta-btn', type: 'button', name: 'Action', props: { text: 'Start Project →' }, styles: { backgroundColor: '#18181b', color: '#ffffff', padding: '0.85rem 1.5rem', borderRadius: '6px', fontWeight: '700' } },
      ],
    },

    // Footer
    {
      id: 'ag-footer',
      type: 'footer',
      name: 'Footer',
      props: {},
      styles: {
        backgroundColor: '#09090b',
        padding: '2rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
      },
      children: [
        { id: 'ag-f-copy', type: 'text', name: 'Copy', props: { text: '© 2026 Studio Kinetic, Inc. All rights reserved.' }, styles: { color: '#71717a', fontSize: '0.85rem' } },
        { id: 'ag-f-links', type: 'text', name: 'Socials', props: { text: 'Twitter   Dribbble   GitHub   LinkedIn' }, styles: { color: '#71717a', fontSize: '0.85rem' } },
      ],
    },
  ],
};
