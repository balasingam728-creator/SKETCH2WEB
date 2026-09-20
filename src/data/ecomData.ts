import { ComponentNode, DetectedBox } from '../types';

export const ecommerceSketchSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 950" width="100%" height="100%" style="background: #0f172a; font-family: 'Comic Sans MS', cursive, sans-serif;">
  <rect width="800" height="950" fill="#0f172a"/>
  <!-- Promo -->
  <rect x="30" y="20" width="740" height="28" rx="4" fill="#047857" stroke="#10b981"/>
  <text x="240" y="39" fill="#ffffff" font-size="12" font-weight="bold">🎉 SUMMER SALE: 30% OFF WITH CODE "SKETCH30"</text>

  <!-- Navbar -->
  <rect x="30" y="58" width="740" height="55" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="50" y="92" fill="#38bdf8" font-size="18" font-weight="bold">🛍️ UrbanAura</text>
  <rect x="220" y="70" width="270" height="30" rx="15" fill="#0f172a" stroke="#475569"/>
  <text x="240" y="89" fill="#94a3b8" font-size="11">🔍 Search apparel &amp; gear...</text>
  <text x="520" y="90" fill="#e2e8f0" font-size="13">Shop   Deals</text>
  <rect x="670" y="70" width="85" height="30" rx="6" fill="#0284c7"/>
  <text x="688" y="90" fill="#ffffff" font-size="12">🛒 Cart (3)</text>

  <!-- Hero Promo Banner -->
  <rect x="30" y="125" width="740" height="200" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="60" y="170" fill="#fbbf24" font-size="13" font-weight="bold">NEW ARRIVALS 2026</text>
  <text x="60" y="210" fill="#f8fafc" font-size="24" font-weight="bold">Elevate Your Everyday Style</text>
  <text x="60" y="240" fill="#94a3b8" font-size="13">Minimalist aesthetic crafted with sustainable, premium materials.</text>
  <rect x="60" y="260" width="135" height="36" rx="6" fill="#f59e0b"/>
  <text x="85" y="283" fill="#0f172a" font-size="13" font-weight="bold">Shop Collection →</text>

  <!-- Products Grid Header -->
  <text x="40" y="355" fill="#f8fafc" font-size="20" font-weight="bold">Featured Products</text>
  <text x="670" y="355" fill="#38bdf8" font-size="13">View All →</text>

  <!-- 4 Product Cards Grid -->
  <rect x="30" y="375" width="170" height="240" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="95" y="445" fill="#94a3b8" font-size="26">👟</text>
  <text x="45" y="515" fill="#f8fafc" font-size="14" font-weight="bold">Aura Runner X</text>
  <text x="45" y="540" fill="#38bdf8" font-size="15" font-weight="bold">$139.00</text>
  <rect x="45" y="560" width="140" height="28" rx="4" fill="#0284c7"/>
  <text x="75" y="579" fill="#ffffff" font-size="11" font-weight="bold">+ Add to Cart</text>

  <rect x="220" y="375" width="170" height="240" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="285" y="445" fill="#94a3b8" font-size="26">🎒</text>
  <text x="235" y="515" fill="#f8fafc" font-size="14" font-weight="bold">Nomad Pack</text>
  <text x="235" y="540" fill="#38bdf8" font-size="15" font-weight="bold">$89.00</text>
  <rect x="235" y="560" width="140" height="28" rx="4" fill="#0284c7"/>
  <text x="265" y="579" fill="#ffffff" font-size="11" font-weight="bold">+ Add to Cart</text>

  <rect x="410" y="375" width="170" height="240" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="475" y="445" fill="#94a3b8" font-size="26">⌚</text>
  <text x="425" y="515" fill="#f8fafc" font-size="14" font-weight="bold">Chronos Watch</text>
  <text x="425" y="540" fill="#38bdf8" font-size="15" font-weight="bold">$199.00</text>
  <rect x="425" y="560" width="140" height="28" rx="4" fill="#0284c7"/>
  <text x="455" y="579" fill="#ffffff" font-size="11" font-weight="bold">+ Add to Cart</text>

  <rect x="600" y="375" width="170" height="240" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="665" y="445" fill="#94a3b8" font-size="26">🕶️</text>
  <text x="615" y="515" fill="#f8fafc" font-size="14" font-weight="bold">Polar Optics</text>
  <text x="615" y="540" fill="#38bdf8" font-size="15" font-weight="bold">$75.00</text>
  <rect x="615" y="560" width="140" height="28" rx="4" fill="#0284c7"/>
  <text x="645" y="579" fill="#ffffff" font-size="11" font-weight="bold">+ Add to Cart</text>

  <!-- Newsletter Signup Box -->
  <rect x="30" y="640" width="740" height="150" rx="10" fill="#0f172a" stroke="#38bdf8"/>
  <text x="260" y="685" fill="#f8fafc" font-size="18" font-weight="bold">Get 15% Off Your Next Order</text>
  <text x="220" y="710" fill="#94a3b8" font-size="12">Subscribe for VIP drops, exclusive sales, and style lookbooks.</text>
  <rect x="190" y="730" width="280" height="34" rx="6" fill="#1e293b" stroke="#475569"/>
  <text x="210" y="752" fill="#64748b" font-size="12">Enter your email address...</text>
  <rect x="480" y="730" width="120" height="34" rx="6" fill="#0284c7"/>
  <text x="510" y="752" fill="#ffffff" font-size="12" font-weight="bold">Subscribe</text>

  <!-- Footer -->
  <rect x="30" y="810" width="740" height="70" rx="4" fill="#020617"/>
  <text x="50" y="850" fill="#64748b" font-size="11">© 2026 UrbanAura Apparel. All rights reserved.</text>
  <text x="450" y="850" fill="#64748b" font-size="11">Returns   Shipping   Support   Instagram</text>
</svg>
`;

export const ecommerceDetectedBoxes: DetectedBox[] = [
  { id: 'det-promo', label: 'Promo Announcement Bar', type: 'badge', confidence: 0.96, x: 30, y: 20, width: 740, height: 28 },
  { id: 'det-nav', label: 'E-Commerce Navbar (Search, Cart)', type: 'navbar', confidence: 0.98, x: 30, y: 58, width: 740, height: 55 },
  { id: 'det-hero', label: 'Hero Promotional Banner', type: 'hero', confidence: 0.97, x: 30, y: 125, width: 740, height: 200 },
  { id: 'det-products', label: 'Products 4-Col Grid', type: 'grid', confidence: 0.95, x: 30, y: 375, width: 740, height: 240 },
  { id: 'det-newsletter', label: 'Newsletter Subscription Form', type: 'form', confidence: 0.94, x: 30, y: 640, width: 740, height: 150 },
  { id: 'det-foot', label: 'Footer (Store Info & Legal)', type: 'footer', confidence: 0.97, x: 30, y: 810, width: 740, height: 70 },
];

export const ecommerceRootComponent: ComponentNode = {
  id: 'ecom-root',
  type: 'page',
  name: 'Storefront Home',
  props: {},
  styles: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    gap: '2rem',
  },
  children: [
    {
      id: 'ecom-promo',
      type: 'container',
      name: 'Announcement Bar',
      props: {},
      styles: { backgroundColor: '#047857', color: '#ffffff', padding: '0.5rem 1rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600' },
      children: [
        { id: 'promo-text', type: 'text', name: 'Promo Text', props: { text: '🎉 SUMMER SALE: 30% OFF WITH CODE "SKETCH30"' } },
      ],
    },
    {
      id: 'ecom-nav',
      type: 'navbar',
      name: 'Store Navbar',
      props: {},
      styles: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' },
      children: [
        { id: 'ecom-brand', type: 'heading', name: 'Store Brand', props: { text: '🛍️ UrbanAura', level: 3 }, styles: { fontSize: '1.4rem', color: '#38bdf8' } },
        { id: 'ecom-search', type: 'input', name: 'Product Search', props: { placeholder: 'Search products, apparel, gear...', ariaLabel: 'Search products' }, styles: { width: '320px', backgroundColor: '#0f172a', borderColor: '#475569' } },
        { id: 'ecom-cart-btn', type: 'button', name: 'Cart Button', props: { text: '🛒 Cart (3)' }, styles: { backgroundColor: '#0284c7', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '6px' } },
      ],
    },
    {
      id: 'ecom-hero',
      type: 'hero',
      name: 'Hero Promo Banner',
      props: {},
      styles: { maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #f59e0b', display: 'flex', flexDirection: 'column', gap: '1rem', width: '90%' },
      children: [
        { id: 'ecom-tag', type: 'badge', name: 'Badge', props: { text: 'NEW ARRIVALS 2026' }, styles: { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', width: 'fit-content' } },
        { id: 'ecom-h1', type: 'heading', name: 'Hero Title', props: { text: 'Elevate Your Everyday Style', level: 1 }, styles: { fontSize: '2.5rem', color: '#f8fafc' } },
        { id: 'ecom-desc', type: 'text', name: 'Hero Description', props: { text: 'Minimalist aesthetic crafted with sustainable, premium grade materials for the modern lifestyle.' }, styles: { color: '#94a3b8' } },
        { id: 'ecom-cta', type: 'button', name: 'Shop CTA', props: { text: 'Shop Collection →' }, styles: { backgroundColor: '#f59e0b', color: '#0f172a', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '700', width: 'fit-content' } },
      ],
    },
    {
      id: 'ecom-products-section',
      type: 'section',
      name: 'Featured Products Section',
      props: {},
      styles: { maxWidth: '1100px', margin: '0 auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '90%' },
      children: [
        { id: 'prod-head', type: 'heading', name: 'Products Title', props: { text: 'Featured Products', level: 2 }, styles: { fontSize: '1.8rem', color: '#f8fafc' } },
        {
          id: 'prod-grid',
          type: 'grid',
          name: 'Products 4-Col Grid',
          props: {},
          styles: { display: 'grid', gridColumns: 'repeat(4, 1fr)', gap: '1.25rem' },
          children: [
            {
              id: 'prod-1',
              type: 'card',
              name: 'Product Card 1',
              props: {},
              styles: { backgroundColor: '#1e293b', borderColor: '#334155', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
              children: [
                { id: 'p1-img', type: 'image', name: 'Product Image', props: { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80', alt: 'Aura Runner X Sneakers' } },
                { id: 'p1-title', type: 'heading', name: 'Product Title', props: { text: 'Aura Runner X', level: 4 }, styles: { fontSize: '1.1rem', color: '#f8fafc' } },
                { id: 'p1-price', type: 'text', name: 'Price', props: { text: '$139.00' }, styles: { color: '#38bdf8', fontWeight: '700', fontSize: '1.15rem' } },
                { id: 'p1-btn', type: 'button', name: 'Add Button', props: { text: '+ Add to Cart' }, styles: { backgroundColor: '#0284c7', color: '#ffffff', padding: '0.5rem', borderRadius: '4px' } },
              ],
            },
            {
              id: 'prod-2',
              type: 'card',
              name: 'Product Card 2',
              props: {},
              styles: { backgroundColor: '#1e293b', borderColor: '#334155', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
              children: [
                { id: 'p2-img', type: 'image', name: 'Product Image', props: { src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80', alt: 'Nomad Backpack' } },
                { id: 'p2-title', type: 'heading', name: 'Product Title', props: { text: 'Nomad Backpack', level: 4 }, styles: { fontSize: '1.1rem', color: '#f8fafc' } },
                { id: 'p2-price', type: 'text', name: 'Price', props: { text: '$89.00' }, styles: { color: '#38bdf8', fontWeight: '700', fontSize: '1.15rem' } },
                { id: 'p2-btn', type: 'button', name: 'Add Button', props: { text: '+ Add to Cart' }, styles: { backgroundColor: '#0284c7', color: '#ffffff', padding: '0.5rem', borderRadius: '4px' } },
              ],
            },
            {
              id: 'prod-3',
              type: 'card',
              name: 'Product Card 3',
              props: {},
              styles: { backgroundColor: '#1e293b', borderColor: '#334155', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
              children: [
                { id: 'p3-img', type: 'image', name: 'Product Image', props: { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80', alt: 'Chronos Smart Watch' } },
                { id: 'p3-title', type: 'heading', name: 'Product Title', props: { text: 'Chronos Watch', level: 4 }, styles: { fontSize: '1.1rem', color: '#f8fafc' } },
                { id: 'p3-price', type: 'text', name: 'Price', props: { text: '$199.00' }, styles: { color: '#38bdf8', fontWeight: '700', fontSize: '1.15rem' } },
                { id: 'p3-btn', type: 'button', name: 'Add Button', props: { text: '+ Add to Cart' }, styles: { backgroundColor: '#0284c7', color: '#ffffff', padding: '0.5rem', borderRadius: '4px' } },
              ],
            },
            {
              id: 'prod-4',
              type: 'card',
              name: 'Product Card 4',
              props: {},
              styles: { backgroundColor: '#1e293b', borderColor: '#334155', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
              children: [
                { id: 'p4-img', type: 'image', name: 'Product Image', props: { src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format&fit=crop&q=80', alt: 'Polarized Optics Sunglasses' } },
                { id: 'p4-title', type: 'heading', name: 'Product Title', props: { text: 'Polarized Optics', level: 4 }, styles: { fontSize: '1.1rem', color: '#f8fafc' } },
                { id: 'p4-price', type: 'text', name: 'Price', props: { text: '$75.00' }, styles: { color: '#38bdf8', fontWeight: '700', fontSize: '1.15rem' } },
                { id: 'p4-btn', type: 'button', name: 'Add Button', props: { text: '+ Add to Cart' }, styles: { backgroundColor: '#0284c7', color: '#ffffff', padding: '0.5rem', borderRadius: '4px' } },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ecom-newsletter',
      type: 'form',
      name: 'Newsletter Form',
      props: {},
      styles: { maxWidth: '800px', margin: '2rem auto', padding: '2.5rem 2rem', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #38bdf8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center', width: '90%' },
      children: [
        { id: 'news-h', type: 'heading', name: 'Title', props: { text: 'Get 15% Off Your Next Order', level: 3 }, styles: { color: '#f8fafc' } },
        { id: 'news-p', type: 'text', name: 'Text', props: { text: 'Subscribe for VIP drops, secret sales, and seasonal lookbooks.' }, styles: { color: '#94a3b8' } },
        {
          id: 'news-input-row',
          type: 'container',
          name: 'Input Row',
          props: {},
          styles: { display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '450px' },
          children: [
            { id: 'news-in', type: 'input', name: 'Email Input', props: { placeholder: 'Enter your email...', ariaLabel: 'Email Address' }, styles: { backgroundColor: '#0f172a' } },
            { id: 'news-b', type: 'button', name: 'Subscribe Button', props: { text: 'Subscribe' }, styles: { backgroundColor: '#0284c7', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '6px' } },
          ],
        },
      ],
    },
    {
      id: 'ecom-footer',
      type: 'footer',
      name: 'Store Footer',
      props: {},
      styles: { backgroundColor: '#020617', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
      children: [
        { id: 'ef-copy', type: 'text', name: 'Copy', props: { text: '© 2026 UrbanAura Apparel. All rights reserved.' }, styles: { color: '#64748b' } },
        { id: 'ef-links', type: 'text', name: 'Links', props: { text: 'Returns   Shipping   Support   Instagram' }, styles: { color: '#64748b' } },
      ],
    },
  ],
};
