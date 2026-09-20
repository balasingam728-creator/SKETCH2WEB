import { DesignSystem } from '../types';

export const defaultDesignSystem: DesignSystem = {
  id: 'ds-modern-indigo',
  name: 'Modern Indigo Theme',
  colors: {
    primary: '#4f46e5',       // Indigo 600
    primaryHover: '#4338ca',  // Indigo 700
    secondary: '#06b6d4',     // Cyan 500
    background: '#0b0f19',    // Deep slate dark
    surface: '#151c2c',       // Slate surface
    text: '#f8fafc',          // Slate 50
    textMuted: '#94a3b8',     // Slate 400
    accent: '#f59e0b',        // Amber 500
    border: '#243048',        // Slate border
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    headingFontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    baseFontSize: '16px',
  },
  spacing: {
    unit: '8px',
    radius: '12px',
    shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
  },
  buttonStyle: 'rounded',
  themeMode: 'dark',
};

export const lightDesignSystem: DesignSystem = {
  id: 'ds-modern-light',
  name: 'Clean Light Theme',
  colors: {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    secondary: '#0891b2',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    textMuted: '#64748b',
    accent: '#d97706',
    border: '#e2e8f0',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    headingFontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    baseFontSize: '16px',
  },
  spacing: {
    unit: '8px',
    radius: '12px',
    shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
  },
  buttonStyle: 'rounded',
  themeMode: 'light',
};
