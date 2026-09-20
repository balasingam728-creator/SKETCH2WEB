import React from 'react';
import {
  Type,
  Heading,
  Square,
  Image as ImageIcon,
  Columns,
  CreditCard,
  FormInput,
  Send,
  Navigation,
  Sparkles,
  Layout,
  Minus,
  HelpCircle,
  DollarSign,
  MessageSquareQuote,
  Shield,
} from 'lucide-react';
import { ComponentType } from '../../types';

interface AddComponentsPanelProps {
  onAddComponent: (type: ComponentType) => void;
}

interface ComponentPaletteItem {
  type: ComponentType;
  label: string;
  category: 'Structure' | 'Content' | 'Interactive' | 'Sections';
  icon: React.ReactNode;
  description: string;
}

const PALETTE: ComponentPaletteItem[] = [
  // Structure
  { type: 'section', label: 'Section Container', category: 'Structure', icon: <Layout className="w-4 h-4 text-indigo-400" />, description: 'Semantic <section> wrapper' },
  { type: 'grid', label: 'Responsive Grid', category: 'Structure', icon: <Columns className="w-4 h-4 text-cyan-400" />, description: 'CSS Grid with auto-fit layout' },
  { type: 'container', label: 'Flex Container', category: 'Structure', icon: <Layout className="w-4 h-4 text-blue-400" />, description: 'Flexbox row/column wrapper' },
  { type: 'divider', label: 'Divider Line', category: 'Structure', icon: <Minus className="w-4 h-4 text-slate-400" />, description: 'Horizontal separator rule' },

  // Sections
  { type: 'navbar', label: 'Navigation Bar', category: 'Sections', icon: <Navigation className="w-4 h-4 text-indigo-400" />, description: 'Responsive nav with logo & links' },
  { type: 'hero', label: 'Hero Banner', category: 'Sections', icon: <Sparkles className="w-4 h-4 text-amber-400" />, description: 'Catchy headline + CTA buttons' },
  { type: 'pricing-table', label: '3-Tier Pricing', category: 'Sections', icon: <DollarSign className="w-4 h-4 text-emerald-400" />, description: 'Starter, Pro & Enterprise tiers' },
  { type: 'accordion', label: 'FAQ Accordions', category: 'Sections', icon: <HelpCircle className="w-4 h-4 text-purple-400" />, description: 'Collapsible QA details' },
  { type: 'footer', label: 'Global Footer', category: 'Sections', icon: <Shield className="w-4 h-4 text-slate-400" />, description: 'Copyright & navigation links' },

  // Content
  { type: 'heading', label: 'Heading (H1-H4)', category: 'Content', icon: <Heading className="w-4 h-4 text-purple-400" />, description: 'Semantic heading typography' },
  { type: 'text', label: 'Paragraph / Link', category: 'Content', icon: <Type className="w-4 h-4 text-slate-300" />, description: 'Body copy and inline links' },
  { type: 'badge', label: 'Pill Badge', category: 'Content', icon: <Sparkles className="w-4 h-4 text-cyan-400" />, description: 'Highlight tag or status label' },
  { type: 'image', label: 'Image Asset', category: 'Content', icon: <ImageIcon className="w-4 h-4 text-rose-400" />, description: 'Responsive visual media' },
  { type: 'card', label: 'Feature Card', category: 'Content', icon: <CreditCard className="w-4 h-4 text-indigo-400" />, description: 'Surface container with shadow' },

  // Interactive
  { type: 'button', label: 'Action Button', category: 'Interactive', icon: <Square className="w-4 h-4 text-blue-400" />, description: 'Primary or secondary button' },
  { type: 'input', label: 'Text Input', category: 'Interactive', icon: <FormInput className="w-4 h-4 text-emerald-400" />, description: 'Accessible form input field' },
  { type: 'form', label: 'Contact Form', category: 'Interactive', icon: <Send className="w-4 h-4 text-amber-400" />, description: 'Validated form with submit' },
  { type: 'testimonial', label: 'Testimonial Card', category: 'Interactive', icon: <MessageSquareQuote className="w-4 h-4 text-rose-400" />, description: 'Customer quote & star rating' },
];

export const AddComponentsPanel: React.FC<AddComponentsPanelProps> = ({ onAddComponent }) => {
  const categories: Array<'Sections' | 'Structure' | 'Content' | 'Interactive'> = [
    'Sections',
    'Structure',
    'Content',
    'Interactive',
  ];

  return (
    <div className="p-3 space-y-4 overflow-y-auto custom-scrollbar h-full text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
          Component Palette
        </span>
        <span className="text-[10px] text-slate-500">Click to insert</span>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="space-y-1.5">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            {cat}
          </h4>
          <div className="grid grid-cols-1 gap-1.5">
            {PALETTE.filter((item) => item.category === cat).map((item) => (
              <button
                key={item.type}
                onClick={() => onAddComponent(item.type)}
                className="group flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-indigo-500/50 hover:bg-slate-850/80 transition-all text-left cursor-pointer"
              >
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{item.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
