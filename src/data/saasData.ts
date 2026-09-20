import { ComponentNode, DetectedBox } from '../types';

export const saasSketchSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 950" width="100%" height="100%" style="background: #1e293b; font-family: 'Comic Sans MS', cursive, sans-serif;">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.5" stroke-dasharray="2,2"/>
    </pattern>
  </defs>
  <rect width="800" height="950" fill="url(#grid)" />
  <!-- Navbar -->
  <rect x="40" y="30" width="720" height="55" rx="8" fill="#0f172a" stroke="#60a5fa" stroke-width="2"/>
  <text x="65" y="65" fill="#93c5fd" font-size="18" font-weight="bold">◈ NovaSaaS</text>
  <text x="300" y="64" fill="#cbd5e1" font-size="13">Features   Solutions   Pricing   Docs</text>
  <rect x="635" y="42" width="105" height="30" rx="6" fill="#3b82f6"/>
  <text x="652" y="62" fill="#ffffff" font-size="12" font-weight="bold">Get Started</text>

  <!-- Hero Section -->
  <rect x="40" y="105" width="720" height="240" rx="10" fill="#0f172a" stroke="#818cf8" stroke-width="2"/>
  <rect x="290" y="125" width="220" height="24" rx="12" fill="#312e81"/>
  <text x="315" y="142" fill="#c7d2fe" font-size="11">✨ AI Platform 2.0 is Live</text>
  <text x="170" y="185" fill="#f8fafc" font-size="26" font-weight="bold">Build Next-Gen Web Apps</text>
  <text x="230" y="220" fill="#f8fafc" font-size="26" font-weight="bold">10x Faster with AI</text>
  <text x="180" y="255" fill="#94a3b8" font-size="13">Turn rough sketches into clean, production-ready websites in seconds.</text>
  <rect x="260" y="280" width="130" height="38" rx="6" fill="#4f46e5"/>
  <text x="282" y="304" fill="#ffffff" font-size="13" font-weight="bold">Start Free Trial →</text>
  <rect x="410" y="280" width="130" height="38" rx="6" fill="#1e293b" stroke="#475569"/>
  <text x="445" y="304" fill="#cbd5e1" font-size="13">Live Demo</text>

  <!-- Metrics Bar -->
  <rect x="40" y="365" width="720" height="65" rx="8" fill="#0f172a" stroke="#334155"/>
  <text x="110" y="398" fill="#818cf8" font-size="18" font-weight="bold">99.99%</text>
  <text x="110" y="416" fill="#64748b" font-size="11">Uptime SLA</text>
  <text x="340" y="398" fill="#818cf8" font-size="18" font-weight="bold">50,000+</text>
  <text x="340" y="416" fill="#64748b" font-size="11">Developers</text>
  <text x="590" y="398" fill="#818cf8" font-size="18" font-weight="bold">4.95 / 5.0</text>
  <text x="590" y="416" fill="#64748b" font-size="11">Rating</text>

  <!-- Features Grid -->
  <text x="310" y="465" fill="#f8fafc" font-size="20" font-weight="bold">Core Capabilities</text>
  <rect x="40" y="490" width="225" height="170" rx="8" fill="#0f172a" stroke="#475569"/>
  <text x="65" y="530" fill="#818cf8" font-size="20">⚡</text>
  <text x="65" y="560" fill="#f1f5f9" font-size="15" font-weight="bold">Visual AI Compiler</text>
  <text x="65" y="585" fill="#94a3b8" font-size="11">Direct sketch-to-code</text>
  <text x="65" y="605" fill="#94a3b8" font-size="11">with zero boilerplate.</text>

  <rect x="287" y="490" width="225" height="170" rx="8" fill="#0f172a" stroke="#475569"/>
  <text x="312" y="530" fill="#34d399" font-size="20">🎯</text>
  <text x="312" y="560" fill="#f1f5f9" font-size="15" font-weight="bold">Adaptive Layouts</text>
  <text x="312" y="585" fill="#94a3b8" font-size="11">100% responsive Grid</text>
  <text x="312" y="605" fill="#94a3b8" font-size="11">for mobile &amp; desktop.</text>

  <rect x="535" y="490" width="225" height="170" rx="8" fill="#0f172a" stroke="#475569"/>
  <text x="560" y="530" fill="#f472b6" font-size="20">🚀</text>
  <text x="560" y="560" fill="#f1f5f9" font-size="15" font-weight="bold">Instant Export</text>
  <text x="560" y="585" fill="#94a3b8" font-size="11">Pure HTML/CSS/JS</text>
  <text x="560" y="605" fill="#94a3b8" font-size="11">with zero lock-in.</text>

  <!-- CTA Box -->
  <rect x="40" y="680" width="720" height="130" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
  <text x="210" y="730" fill="#ffffff" font-size="18" font-weight="bold">Ready to build your next web application?</text>
  <text x="230" y="755" fill="#c7d2fe" font-size="13">Join over 50,000 engineers building with Sketch2Web.</text>
  <rect x="330" y="770" width="140" height="32" rx="6" fill="#4f46e5"/>
  <text x="355" y="791" fill="#ffffff" font-size="12" font-weight="bold">Get Started Now</text>

  <!-- Footer -->
  <rect x="40" y="830" width="720" height="60" rx="4" fill="#0b0f19"/>
  <text x="65" y="865" fill="#64748b" font-size="12">© 2026 NovaSaaS, Inc. All rights reserved.</text>
  <text x="520" y="865" fill="#64748b" font-size="12">Privacy   Terms   GitHub   Docs</text>
</svg>
`;

export const saasDetectedBoxes: DetectedBox[] = [
  { id: 'det-nav', label: 'Navbar (Logo, Links, CTA)', type: 'navbar', confidence: 0.98, x: 40, y: 30, width: 720, height: 55 },
  { id: 'det-hero', label: 'Hero Section (Badge, Title, Buttons)', type: 'hero', confidence: 0.97, x: 40, y: 105, width: 720, height: 240 },
  { id: 'det-metrics', label: 'Metrics Bar (3 Counters)', type: 'grid', confidence: 0.94, x: 40, y: 365, width: 720, height: 65 },
  { id: 'det-features', label: 'Features Grid (3 Cards)', type: 'grid', confidence: 0.96, x: 40, y: 490, width: 720, height: 170 },
  { id: 'det-cta', label: 'CTA Banner Box', type: 'section', confidence: 0.95, x: 40, y: 680, width: 720, height: 130 },
  { id: 'det-footer', label: 'Footer Section', type: 'footer', confidence: 0.97, x: 40, y: 830, width: 720, height: 60 },
];

export const saasRootComponent: ComponentNode = {
  id: 'page-root',
  type: 'page',
  name: 'Home Page',
  props: {},
  styles: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#0b0f19',
    color: '#f8fafc',
    gap: '2rem',
  },
  children: [
    {
      id: 'nav-main',
      type: 'navbar',
      name: 'Main Navigation Bar',
      props: {},
      styles: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 2.5rem',
        backgroundColor: '#151c2c',
        borderBottom: '1px solid #243048',
        position: 'sticky',
      },
      children: [
        {
          id: 'nav-logo',
          type: 'heading',
          name: 'Brand Logo',
          props: { text: '◈ NovaSaaS', level: 3 },
          styles: { fontSize: '1.35rem', fontWeight: '700', color: '#6366f1' },
        },
        {
          id: 'nav-links-container',
          type: 'container',
          name: 'Navigation Links',
          props: {},
          styles: { display: 'flex', gap: '1.75rem', alignItems: 'center' },
          children: [
            { id: 'link-features', type: 'text', name: 'Features Link', props: { text: 'Features', tag: 'a', href: '#features' }, styles: { color: '#94a3b8', fontSize: '0.95rem' } },
            { id: 'link-solutions', type: 'text', name: 'Solutions Link', props: { text: 'Solutions', tag: 'a', href: '#solutions' }, styles: { color: '#94a3b8', fontSize: '0.95rem' } },
            { id: 'link-pricing', type: 'text', name: 'Pricing Link', props: { text: 'Pricing', tag: 'a', href: '#pricing' }, styles: { color: '#94a3b8', fontSize: '0.95rem' } },
            { id: 'link-docs', type: 'text', name: 'Docs Link', props: { text: 'Docs', tag: 'a', href: '#docs' }, styles: { color: '#94a3b8', fontSize: '0.95rem' } },
          ],
        },
        {
          id: 'nav-cta-btn',
          type: 'button',
          name: 'Sign In CTA Button',
          props: { text: 'Get Started →' },
          styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.6rem 1.25rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' },
        },
      ],
    },
    {
      id: 'hero-section',
      type: 'hero',
      name: 'Hero Showcase Section',
      props: {},
      styles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        maxWidth: '900px',
        margin: '0 auto',
        gap: '1.25rem',
      },
      children: [
        {
          id: 'hero-badge',
          type: 'badge',
          name: 'Product Update Badge',
          props: { text: '✨ AI Platform 2.0 is Live' },
          styles: { backgroundColor: 'rgba(79, 70, 229, 0.15)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.4)', padding: '0.35rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '600' },
        },
        {
          id: 'hero-heading',
          type: 'heading',
          name: 'Hero Main Title',
          props: { text: 'Build Next-Gen Web Apps 10x Faster with AI', level: 1 },
          styles: { fontSize: '2.85rem', fontWeight: '800', lineHeight: '1.2', color: '#f8fafc' },
        },
        {
          id: 'hero-desc',
          type: 'text',
          name: 'Hero Subtitle Description',
          props: { text: 'Turn rough sketches and visual wireframes into clean, production-ready semantic HTML5/CSS3/JS websites with visual live editing and instant export.' },
          styles: { fontSize: '1.15rem', color: '#94a3b8', maxWidth: '650px', lineHeight: '1.6' },
        },
        {
          id: 'hero-btn-group',
          type: 'container',
          name: 'CTA Buttons Group',
          props: {},
          styles: { display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' },
          children: [
            { id: 'btn-trial', type: 'button', name: 'Primary CTA Button', props: { text: 'Start Free Trial →' }, styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600' } },
            { id: 'btn-demo', type: 'button', name: 'Secondary Demo Button', props: { text: 'Watch Live Demo' }, styles: { backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#334155', borderWidth: '1px', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '500' } },
          ],
        },
      ],
    },
    {
      id: 'metrics-section',
      type: 'grid',
      name: 'Key Platform Metrics',
      props: {},
      styles: {
        display: 'grid',
        gridColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        backgroundColor: '#151c2c',
        borderRadius: '12px',
        border: '1px solid #243048',
        width: '90%',
      },
      children: [
        {
          id: 'metric-1',
          type: 'container',
          name: 'Uptime Metric',
          props: {},
          styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.25rem' },
          children: [
            { id: 'm1-val', type: 'heading', name: 'Uptime Value', props: { text: '99.99%', level: 3 }, styles: { color: '#6366f1', fontSize: '1.75rem', fontWeight: '700' } },
            { id: 'm1-lbl', type: 'text', name: 'Uptime Label', props: { text: 'Enterprise Uptime SLA' }, styles: { color: '#64748b', fontSize: '0.85rem' } },
          ],
        },
        {
          id: 'metric-2',
          type: 'container',
          name: 'Developers Metric',
          props: {},
          styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.25rem' },
          children: [
            { id: 'm2-val', type: 'heading', name: 'Users Value', props: { text: '50,000+', level: 3 }, styles: { color: '#6366f1', fontSize: '1.75rem', fontWeight: '700' } },
            { id: 'm2-lbl', type: 'text', name: 'Users Label', props: { text: 'Active Developers Globally' }, styles: { color: '#64748b', fontSize: '0.85rem' } },
          ],
        },
        {
          id: 'metric-3',
          type: 'container',
          name: 'Rating Metric',
          props: {},
          styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.25rem' },
          children: [
            { id: 'm3-val', type: 'heading', name: 'Rating Value', props: { text: '4.95 / 5.0', level: 3 }, styles: { color: '#6366f1', fontSize: '1.75rem', fontWeight: '700' } },
            { id: 'm3-lbl', type: 'text', name: 'Rating Label', props: { text: 'Customer Satisfaction Score' }, styles: { color: '#64748b', fontSize: '0.85rem' } },
          ],
        },
      ],
    },
    {
      id: 'features-section',
      type: 'section',
      name: 'Features Showcase Section',
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
          id: 'feat-header',
          type: 'container',
          name: 'Features Section Header',
          props: {},
          styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
          children: [
            { id: 'feat-title', type: 'heading', name: 'Features Title', props: { text: 'Core Capabilities', level: 2 }, styles: { fontSize: '2rem', color: '#f8fafc' } },
            { id: 'feat-sub', type: 'text', name: 'Features Subtitle', props: { text: 'Everything you need to construct high performance web experiences.' }, styles: { color: '#94a3b8' } },
          ],
        },
        {
          id: 'feat-grid',
          type: 'grid',
          name: 'Features 3-Column Grid',
          props: {},
          styles: { display: 'grid', gridColumns: 'repeat(3, 1fr)', gap: '1.5rem' },
          children: [
            {
              id: 'card-1',
              type: 'card',
              name: 'Feature Card 1',
              props: {},
              styles: { backgroundColor: '#151c2c', borderColor: '#243048', padding: '1.75rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
              children: [
                { id: 'c1-icon', type: 'badge', name: 'Icon Badge', props: { text: '⚡ Visual Compiler' }, styles: { width: 'fit-content', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' } },
                { id: 'c1-h', type: 'heading', name: 'Card Title', props: { text: 'Direct Sketch-to-Code', level: 3 }, styles: { fontSize: '1.25rem', color: '#f8fafc' } },
                { id: 'c1-p', type: 'text', name: 'Card Description', props: { text: 'Transforms UI sketches into strict semantic HTML5 and scoped CSS3 without messy code generators.' }, styles: { color: '#94a3b8', fontSize: '0.9rem' } },
              ],
            },
            {
              id: 'card-2',
              type: 'card',
              name: 'Feature Card 2',
              props: {},
              styles: { backgroundColor: '#151c2c', borderColor: '#243048', padding: '1.75rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
              children: [
                { id: 'c2-icon', type: 'badge', name: 'Icon Badge', props: { text: '🎯 Adaptive Layout' }, styles: { width: 'fit-content', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' } },
                { id: 'c2-h', type: 'heading', name: 'Card Title', props: { text: 'Fluid Responsiveness', level: 3 }, styles: { fontSize: '1.25rem', color: '#f8fafc' } },
                { id: 'c2-p', type: 'text', name: 'Card Description', props: { text: 'Pure CSS Grid and modern Flexbox layout architecture that smoothly adapts from 320px mobile to 4K displays.' }, styles: { color: '#94a3b8', fontSize: '0.9rem' } },
              ],
            },
            {
              id: 'card-3',
              type: 'card',
              name: 'Feature Card 3',
              props: {},
              styles: { backgroundColor: '#151c2c', borderColor: '#243048', padding: '1.75rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
              children: [
                { id: 'c3-icon', type: 'badge', name: 'Icon Badge', props: { text: '🚀 Zero Frameworks' }, styles: { width: 'fit-content', backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' } },
                { id: 'c3-h', type: 'heading', name: 'Card Title', props: { text: 'Instant Clean Export', level: 3 }, styles: { fontSize: '1.25rem', color: '#f8fafc' } },
                { id: 'c3-p', type: 'text', name: 'Card Description', props: { text: 'Download pure HTML, CSS, and JS files ready to deploy anywhere with zero node_modules or dependencies.' }, styles: { color: '#94a3b8', fontSize: '0.9rem' } },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cta-section',
      type: 'section',
      name: 'Call to Action Banner',
      props: {},
      styles: {
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '3rem 2rem',
        backgroundColor: '#1e1b4b',
        borderRadius: '16px',
        border: '1px solid #6366f1',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        width: '90%',
      },
      children: [
        { id: 'cta-h', type: 'heading', name: 'CTA Heading', props: { text: 'Ready to build your next web application?', level: 2 }, styles: { color: '#ffffff', fontSize: '1.85rem' } },
        { id: 'cta-p', type: 'text', name: 'CTA Text', props: { text: 'Join over 50,000 developers creating fast, responsive websites with Sketch2Web.' }, styles: { color: '#c7d2fe', maxWidth: '600px' } },
        { id: 'cta-b', type: 'button', name: 'Action Button', props: { text: 'Start Building Now — Free' }, styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.85rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600' } },
      ],
    },
    {
      id: 'footer-main',
      type: 'footer',
      name: 'Global Footer',
      props: {},
      styles: {
        backgroundColor: '#0b0f19',
        borderTop: '1px solid #1e293b',
        padding: '2rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
      },
      children: [
        { id: 'foot-copy', type: 'text', name: 'Copyright Notice', props: { text: '© 2026 NovaSaaS, Inc. All rights reserved.' }, styles: { color: '#64748b', fontSize: '0.875rem' } },
        {
          id: 'foot-links',
          type: 'container',
          name: 'Footer Links',
          props: {},
          styles: { display: 'flex', gap: '1.5rem' },
          children: [
            { id: 'fl-1', type: 'text', name: 'Privacy', props: { text: 'Privacy Policy', tag: 'a', href: '#' }, styles: { color: '#64748b', fontSize: '0.875rem' } },
            { id: 'fl-2', type: 'text', name: 'Terms', props: { text: 'Terms of Service', tag: 'a', href: '#' }, styles: { color: '#64748b', fontSize: '0.875rem' } },
            { id: 'fl-3', type: 'text', name: 'GitHub', props: { text: 'GitHub', tag: 'a', href: '#' }, styles: { color: '#64748b', fontSize: '0.875rem' } },
          ],
        },
      ],
    },
  ],
};
