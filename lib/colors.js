/**
 * Generate color palette from primary color
 */

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

function darken(hex, percent) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const factor = 1 - (percent / 100);
  return rgbToHex(
    Math.round(rgb.r * factor),
    Math.round(rgb.g * factor),
    Math.round(rgb.b * factor)
  );
}

function lighten(hex, percent) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const factor = 1 + (percent / 100);
  return rgbToHex(
    Math.min(255, Math.round(rgb.r * factor)),
    Math.min(255, Math.round(rgb.g * factor)),
    Math.min(255, Math.round(rgb.b * factor))
  );
}

function generatePalette(primaryColor) {
  const primary = primaryColor;
  const primaryDark = darken(primary, 20);
  const primaryLight = lighten(primary, 20);
  
  // Generate secondary (complementary color)
  const rgb = hexToRgb(primary);
  if (rgb) {
    const secondaryRgb = {
      r: 255 - rgb.r,
      g: 255 - rgb.g,
      b: 255 - rgb.b
    };
    // Blend with primary for better contrast
    const secondary = rgbToHex(
      Math.round((rgb.r + secondaryRgb.r) / 2),
      Math.round((rgb.g + secondaryRgb.g) / 2),
      Math.round((rgb.b + secondaryRgb.b) / 2)
    );
    
    return {
      primary,
      primaryDark,
      primaryLight,
      secondary,
      accent: primaryLight,
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      white: '#ffffff',
      black: '#000000',
      gray: '#6b7280',
      lightGray: '#e5e7eb',
      darkGray: '#374151',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#d1d5db',
      shadow: 'rgba(0, 0, 0, 0.1)'
    };
  }
  
  // Fallback palette
  return {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    primaryLight: '#3b82f6',
    secondary: '#7c3aed',
    accent: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    white: '#ffffff',
    black: '#000000',
    gray: '#6b7280',
    lightGray: '#e5e7eb',
    darkGray: '#374151',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#d1d5db',
    shadow: 'rgba(0, 0, 0, 0.1)'
  };
}

function generateColorsFile(palette) {
  return `export const colors = {
  primary: "${palette.primary}",
  primaryDark: "${palette.primaryDark}",
  primaryLight: "${palette.primaryLight}",
  secondary: "${palette.secondary}",
  accent: "${palette.accent}",
  success: "${palette.success}",
  warning: "${palette.warning}",
  error: "${palette.error}",
  white: "${palette.white}",
  black: "${palette.black}",
  gray: "${palette.gray}",
  lightGray: "${palette.lightGray}",
  darkGray: "${palette.darkGray}",
  background: "${palette.background}",
  surface: "${palette.surface}",
  text: "${palette.text}",
  textSecondary: "${palette.textSecondary}",
  border: "${palette.border}",
  shadow: "${palette.shadow}",
};
`;
}

module.exports = { generatePalette, generateColorsFile };

