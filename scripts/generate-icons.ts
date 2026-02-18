/**
 * Generate React icon components from Biblioteca 1 SVG files.
 *
 * Usage: npx tsx scripts/generate-icons.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_BASE = path.resolve(__dirname, "../assets/icons/Biblioteca 1");
const OUTPUT_DIR = path.resolve(__dirname, "../src/icons");

const LINE_DIR = path.join(ASSETS_BASE, "Line/extracted");
const SOLID_DIR = path.join(ASSETS_BASE, "solid/extracted");

/** Extract semantic name from filename: "accessibility--accessibility-assistive-..." → "accessibility" */
function extractName(filename: string): string {
  const base = filename.replace(/\.svg$/, "");
  const name = base.split("--")[0];
  // Lowercase, replace spaces with hyphens and clean up
  return name.toLowerCase().replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

/** Convert SVG attributes to JSX (kebab-case → camelCase) */
function svgToJsx(content: string): string {
  return content
    .replace(/stroke-width/g, "strokeWidth")
    .replace(/stroke-linecap/g, "strokeLinecap")
    .replace(/stroke-linejoin/g, "strokeLinejoin")
    .replace(/stroke-dasharray/g, "strokeDasharray")
    .replace(/stroke-dashoffset/g, "strokeDashoffset")
    .replace(/stroke-miterlimit/g, "strokeMiterlimit")
    .replace(/stroke-opacity/g, "strokeOpacity")
    .replace(/fill-rule/g, "fillRule")
    .replace(/fill-opacity/g, "fillOpacity")
    .replace(/clip-rule/g, "clipRule")
    .replace(/clip-path/g, "clipPath")
    .replace(/font-size/g, "fontSize")
    .replace(/font-family/g, "fontFamily")
    .replace(/font-weight/g, "fontWeight")
    .replace(/text-anchor/g, "textAnchor")
    .replace(/stop-color/g, "stopColor")
    .replace(/stop-opacity/g, "stopOpacity")
    // Replace stroke="black" and fill="black" with currentColor
    .replace(/stroke="black"/g, 'stroke="currentColor"')
    .replace(/fill="black"/g, 'fill="currentColor"')
    // Replace stroke="#000" variants
    .replace(/stroke="#(?:000|000000)"/g, 'stroke="currentColor"')
    .replace(/fill="#(?:000|000000)"/g, 'fill="currentColor"');
}

/** Extract inner content of <svg>...</svg>, removing the outer svg tag */
function extractSvgInner(svgContent: string): string {
  // Remove XML declaration if present
  let content = svgContent.replace(/<\?xml[^?]*\?>\s*/g, "");
  // Remove outer <svg ...> and </svg>
  content = content.replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return content.trim();
}

/** Make clipPath IDs unique by prefixing with icon name */
function uniquifyIds(content: string, iconName: string): string {
  // Find all id="..." references
  const idPattern = /id="([^"]+)"/g;
  const ids = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = idPattern.exec(content)) !== null) {
    ids.add(match[1]);
  }
  let result = content;
  for (const id of ids) {
    const prefixed = `${iconName}_${id}`;
    // Replace id definitions and url() references
    result = result.replace(new RegExp(`id="${id}"`, "g"), `id="${prefixed}"`);
    result = result.replace(
      new RegExp(`url\\(#${id}\\)`, "g"),
      `url(#${prefixed})`,
    );
    result = result.replace(
      new RegExp(`href="#${id}"`, "g"),
      `href="#${prefixed}"`,
    );
    result = result.replace(
      new RegExp(`xlink:href="#${id}"`, "g"),
      `href="#${prefixed}"`,
    );
  }
  return result;
}

/** Convert name to PascalCase for component name */
function toPascalCase(name: string): string {
  return name
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => {
      return part[0].toUpperCase() + part.slice(1);
    })
    .join("");
}

interface IconEntry {
  name: string; // semantic name like "accessibility"
  componentName: string; // PascalCase like "Accessibility"
  jsxContent: string; // inner SVG as JSX
}

function processDirectory(dir: string): IconEntry[] {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".svg"));
  const seen = new Map<string, IconEntry>();

  for (const file of files) {
    const name = extractName(file);

    // Skip if name ends with -1 (variant) and we already have the base
    if (name.endsWith("-1") && seen.has(name.slice(0, -2))) {
      continue;
    }

    // If this is the base and a -1 variant exists, prefer base
    const baseName = name.endsWith("-1") ? name.slice(0, -2) : name;
    if (seen.has(baseName) && baseName !== name) {
      continue;
    }

    const svgContent = fs.readFileSync(path.join(dir, file), "utf-8");
    let inner = extractSvgInner(svgContent);
    inner = uniquifyIds(inner, baseName.replace(/-/g, "_"));
    inner = svgToJsx(inner);

    // Remove fill="white" on clip rect (it's just the clip mask background)
    inner = inner.replace(
      /<rect width="14" height="14" fill="white"\s*\/>/g,
      "",
    );

    // Clean up empty defs/clipPath
    inner = inner.replace(/<defs>\s*<clipPath[^>]*>\s*<\/clipPath>\s*<\/defs>/g, "");
    inner = inner.replace(/<defs>\s*<\/defs>/g, "");

    // Remove empty g tags
    inner = inner.replace(/<g[^>]*>\s*<\/g>/g, "");

    const componentName = toPascalCase(baseName);

    seen.set(baseName, {
      name: baseName,
      componentName,
      jsxContent: inner.trim(),
    });
  }

  // Sort by name
  return Array.from(seen.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

function generateFile(
  entries: IconEntry[],
  factoryName: string,
  outputPath: string,
) {
  const lines: string[] = [
    "// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY",
    `// Generated by scripts/generate-icons.ts from Biblioteca 1`,
    `// Total: ${entries.length} icons`,
    "",
    'import * as React from "react";',
    `import { ${factoryName} } from "./create-icon";`,
    "",
  ];

  for (const entry of entries) {
    // Wrap multi-element content in fragment
    const hasMultiple =
      (entry.jsxContent.match(/<(?:path|circle|rect|line|polyline|polygon|g|ellipse|defs)/g)
        ?.length ?? 0) > 1;
    const content = hasMultiple
      ? `<>${entry.jsxContent}</>`
      : entry.jsxContent;

    lines.push(
      `export const ${entry.componentName}Icon = ${factoryName}("${entry.componentName}Icon", ${content});`,
    );
  }

  lines.push("");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf-8");
}

function generateRegistryExports(
  lineEntries: IconEntry[],
  solidEntries: IconEntry[],
) {
  const lines: string[] = [
    "// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY",
    "// Generated by scripts/generate-icons.ts",
    "",
  ];

  // Import line icons
  const lineImports = lineEntries.map((e) => `${e.componentName}Icon`);
  lines.push(
    `import { ${lineImports.join(", ")} } from "./line-icons.generated";`,
  );
  lines.push("");

  // Import solid icons (aliased to avoid conflicts)
  const solidImports = solidEntries.map(
    (e) => `${e.componentName}Icon as ${e.componentName}SolidIcon`,
  );
  lines.push(
    `import { ${solidImports.join(", ")} } from "./solid-icons.generated";`,
  );
  lines.push("");

  // Re-export all
  lines.push(`export { ${lineImports.join(", ")} };`);
  lines.push("");
  lines.push(
    `export { ${solidEntries.map((e) => `${e.componentName}SolidIcon`).join(", ")} };`,
  );
  lines.push("");

  // Line registry entries
  lines.push("export const lineIconRegistry = {");
  for (const entry of lineEntries) {
    lines.push(`  "${entry.name}": ${entry.componentName}Icon,`);
  }
  lines.push("} as const;");
  lines.push("");

  // Solid registry entries
  lines.push("export const solidIconRegistry = {");
  for (const entry of solidEntries) {
    lines.push(`  "${entry.name}-solid": ${entry.componentName}SolidIcon,`);
  }
  lines.push("} as const;");
  lines.push("");

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "generated-registry.tsx"),
    lines.join("\n"),
    "utf-8",
  );
}

// Main
console.log("Reading Line SVGs...");
const lineEntries = processDirectory(LINE_DIR);
console.log(`  Found ${lineEntries.length} unique Line icons`);

console.log("Reading Solid SVGs...");
const solidEntries = processDirectory(SOLID_DIR);
console.log(`  Found ${solidEntries.length} unique Solid icons`);

console.log("Generating line-icons.generated.tsx...");
generateFile(
  lineEntries,
  "createLineIcon",
  path.join(OUTPUT_DIR, "line-icons.generated.tsx"),
);

console.log("Generating solid-icons.generated.tsx...");
generateFile(
  solidEntries,
  "createSolidIcon",
  path.join(OUTPUT_DIR, "solid-icons.generated.tsx"),
);

console.log("Generating generated-registry.tsx...");
generateRegistryExports(lineEntries, solidEntries);

console.log("Done!");
