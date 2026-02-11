/**
 * Icon Extraction Script
 *
 * Processes SVG icons from Biblioteca 1 (10K Free Icons) and generates
 * React components for the Synkra DS icon system.
 *
 * Usage:
 *   npx tsx scripts/extract-icons.ts
 *
 * Prerequisites:
 *   1. Extract ZIPs first:
 *      unzip "assets/icons/Biblioteca 1/Line/*.zip" -d "assets/icons/Biblioteca 1/Line/extracted/"
 *      unzip "assets/icons/Biblioteca 1/solid/*.zip" -d "assets/icons/Biblioteca 1/solid/extracted/"
 *
 * What this script does:
 *   1. Reads SVGs from Biblioteca 1 extracted directories
 *   2. Filters out sprite sheets (keeps only individual icons < 3KB)
 *   3. Cleans SVGs: stroke="black" → "currentColor", removes clip-path/defs
 *   4. Generates a manifest of available icons with semantic names
 *   5. Outputs a report of categorized icons
 *
 * The main icon set in src/icons/ is hand-curated for quality.
 * This script is a tool for discovering and adding new icons from the assets.
 */

import * as fs from "node:fs";
import * as path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BIB1_LINE = path.join(ROOT, "assets/icons/Biblioteca 1/Line/extracted");
const BIB1_SOLID = path.join(ROOT, "assets/icons/Biblioteca 1/solid/extracted");
const OUTPUT = path.join(ROOT, "scripts/icon-manifest.json");

interface IconEntry {
  /** Short semantic name (e.g. "alarm-clock") */
  name: string;
  /** Full original filename */
  originalFile: string;
  /** Tags extracted from the filename */
  tags: string[];
  /** Style variant */
  style: "line" | "solid";
  /** File size in bytes */
  size: number;
  /** SVG content (cleaned) */
  svg?: string;
}

function parseIconFilename(filename: string): { name: string; tags: string[] } | null {
  // Skip sprite sheets and non-icon files
  if (!filename.endsWith(".svg")) return null;

  // Remove .svg extension
  const base = filename.replace(/\.svg$/, "");

  // Skip duplicates (files ending with -1, -2, etc. that are copies)
  if (/-\d+$/.test(base) && !base.startsWith("arrow-down-")) return null;

  // Skip category sprite sheets (files starting with uppercase, multi-word titles)
  if (/^[A-Z][a-z]+ [A-Z]/.test(base)) return null;

  // Parse name and tags from "name--tag1-tag2-tag3" format
  const parts = base.split("--");
  const name = parts[0].trim();
  const tags = parts.length > 1
    ? parts[1].split("-").map(t => t.trim()).filter(Boolean)
    : [];

  return { name, tags };
}

function cleanSvg(content: string): string {
  // Replace stroke="black" with stroke="currentColor"
  let cleaned = content.replace(/stroke="black"/g, 'stroke="currentColor"');
  cleaned = cleaned.replace(/stroke="#1A1A1A"/g, 'stroke="currentColor"');
  cleaned = cleaned.replace(/fill="black"/g, 'fill="currentColor"');

  // Remove clip-path wrapper (simplify)
  cleaned = cleaned.replace(/<g clip-path="url\(#[^"]+\)">/g, "<g>");

  // Remove defs section (clip paths)
  cleaned = cleaned.replace(/<defs>[\s\S]*?<\/defs>\n?/g, "");

  return cleaned.trim();
}

function processDirectory(dir: string, style: "line" | "solid"): IconEntry[] {
  if (!fs.existsSync(dir)) {
    console.log(`  Directory not found: ${dir}`);
    return [];
  }

  const files = fs.readdirSync(dir);
  const icons: IconEntry[] = [];

  for (const file of files) {
    const parsed = parseIconFilename(file);
    if (!parsed) continue;

    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    // Skip files larger than 3KB (likely sprite sheets)
    if (stat.size > 3000) continue;

    const content = fs.readFileSync(filepath, "utf-8");
    const cleaned = cleanSvg(content);

    icons.push({
      name: parsed.name,
      originalFile: file,
      tags: parsed.tags,
      style,
      size: stat.size,
      svg: cleaned,
    });
  }

  return icons;
}

function main() {
  console.log("Synkra DS - Icon Extraction Script");
  console.log("==================================\n");

  console.log("Processing Biblioteca 1 Line...");
  const lineIcons = processDirectory(BIB1_LINE, "line");
  console.log(`  Found ${lineIcons.length} line icons\n`);

  console.log("Processing Biblioteca 1 Solid...");
  const solidIcons = processDirectory(BIB1_SOLID, "solid");
  console.log(`  Found ${solidIcons.length} solid icons\n`);

  // Combine and deduplicate by name
  const allIcons = [...lineIcons, ...solidIcons];

  // Group by name to find icons available in both styles
  const byName = new Map<string, IconEntry[]>();
  for (const icon of allIcons) {
    const existing = byName.get(icon.name) || [];
    existing.push(icon);
    byName.set(icon.name, existing);
  }

  // Generate manifest (without SVG content to keep it small)
  const manifest = Array.from(byName.entries()).map(([name, entries]) => ({
    name,
    tags: entries[0].tags,
    styles: entries.map(e => e.style),
    originalFile: entries[0].originalFile,
  }));

  // Sort alphabetically
  manifest.sort((a, b) => a.name.localeCompare(b.name));

  // Save manifest
  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));
  console.log(`Manifest saved to ${OUTPUT}`);
  console.log(`Total unique icons: ${manifest.length}`);

  // Print categories summary
  console.log("\nSample icons:");
  manifest.slice(0, 20).forEach(icon => {
    console.log(`  ${icon.name} [${icon.styles.join(", ")}] — ${icon.tags.slice(0, 5).join(", ")}`);
  });

  if (manifest.length > 20) {
    console.log(`  ... and ${manifest.length - 20} more`);
  }

  console.log("\nTo add an icon to src/icons/icons.tsx:");
  console.log("  1. Find the icon in icon-manifest.json");
  console.log("  2. Look up its SVG in the extracted directory");
  console.log("  3. Create a createIcon() call with the SVG paths");
  console.log("  4. Add it to the iconRegistry in src/icons/index.ts");
}

main();
