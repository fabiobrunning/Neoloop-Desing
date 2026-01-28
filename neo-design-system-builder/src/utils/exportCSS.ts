import type { DesignSystem } from '../types/design-system';

export function generateCSS(designSystem: DesignSystem): string {
  const lines: string[] = [':root {'];

  // Colors
  lines.push('  /* Colors */');
  designSystem.colors.forEach(color => {
    lines.push(`  --color-${color.id}: ${color.hex};`);
  });

  // Typography
  lines.push('');
  lines.push('  /* Typography */');
  designSystem.typography.forEach(token => {
    lines.push(`  --font-${token.id}-size: ${token.size};`);
    lines.push(`  --font-${token.id}-weight: ${token.weight};`);
    lines.push(`  --font-${token.id}-line-height: ${token.lineHeight};`);
  });

  // Spacing
  lines.push('');
  lines.push('  /* Spacing */');
  designSystem.spacing.forEach(token => {
    lines.push(`  --spacing-${token.id}: ${token.value}px;`);
  });

  // Border Radius
  lines.push('');
  lines.push('  /* Border Radius */');
  designSystem.borderRadius.forEach((value, index) => {
    lines.push(`  --radius-${index}: ${value}px;`);
  });

  // Breakpoints
  lines.push('');
  lines.push('  /* Breakpoints */');
  Object.entries(designSystem.breakpoints).forEach(([key, value]) => {
    lines.push(`  --breakpoint-${key}: ${value};`);
  });

  lines.push('}');
  return lines.join('\n');
}

export function exportCSS(designSystem: DesignSystem): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `neoloop-design-system-${timestamp}.css`;

  const css = generateCSS(designSystem);
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(`✅ Exported CSS: ${filename}`);
}
