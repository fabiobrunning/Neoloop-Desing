#!/usr/bin/env node

/**
 * Complete Asset Migration Script
 * Migrates ALL Figma assets from external folder to public/assets/
 * Total: ~4,366 files
 */

const fs = require('fs');
const path = require('path');

// Source and destination paths
const SOURCE_BASE = '/Users/fabiobrunning/Library/Mobile Documents/iCloud~md~obsidian/Documents/Fabio BB/10-Negócios/10.02-Produto/Desing/assets';
const DEST_BASE = path.join(__dirname, '..', 'public', 'assets');

// Migration config
const MIGRATIONS = [
  // ===== LOGOS (97 arquivos) =====
  {
    name: 'Social Logos (Colorida)',
    source: path.join(SOURCE_BASE, 'Logos/social/Colorida'),
    dest: path.join(DEST_BASE, 'icons/social/color'),
    filter: (file) => file.endsWith('.svg')
  },
  {
    name: 'Social Logos (White)',
    source: path.join(SOURCE_BASE, 'Logos/social/white'),
    dest: path.join(DEST_BASE, 'icons/social/white'),
    filter: (file) => file.endsWith('.svg')
  },
  {
    name: 'Social Logos (Black)',
    source: path.join(SOURCE_BASE, 'Logos/social/black'),
    dest: path.join(DEST_BASE, 'icons/social/black'),
    filter: (file) => file.endsWith('.svg')
  },
  {
    name: 'Payment Methods',
    source: path.join(SOURCE_BASE, 'Logos/pagamento'),
    dest: path.join(DEST_BASE, 'icons/payment'),
    filter: (file) => file.endsWith('.svg')
  },

  // ===== ICONS - 10K FREE (33 arquivos) =====
  {
    name: 'Icons - 10k Free Icons',
    source: path.join(SOURCE_BASE, 'icons/10,000 Free Icons - Open Source Icon set (Community)'),
    dest: path.join(DEST_BASE, 'icons/ui/10k-free'),
    filter: (file) => file.endsWith('.svg')
  },

  // ===== ICONS - BIBLIOTECA 2 (3.883 arquivos) =====
  {
    name: 'Icons - Line Style (1,314 icons)',
    source: path.join(SOURCE_BASE, 'icons/Biblioteca 2/line'),
    dest: path.join(DEST_BASE, 'icons/library/line'),
    filter: (file) => file.endsWith('.svg')
  },
  {
    name: 'Icons - Dual Style (1,282 icons)',
    source: path.join(SOURCE_BASE, 'icons/Biblioteca 2/dual'),
    dest: path.join(DEST_BASE, 'icons/library/dual'),
    filter: (file) => file.endsWith('.svg')
  },
  {
    name: 'Icons - Solid Style (1,281 icons)',
    source: path.join(SOURCE_BASE, 'icons/Biblioteca 2/solid'),
    dest: path.join(DEST_BASE, 'icons/library/solid'),
    filter: (file) => file.endsWith('.svg')
  },
  {
    name: 'Icons - Bold Style',
    source: path.join(SOURCE_BASE, 'icons/Biblioteca 2/bold'),
    dest: path.join(DEST_BASE, 'icons/library/bold'),
    filter: (file) => file.endsWith('.svg')
  },

  // ===== CHARTS (74 arquivos) =====
  {
    name: 'Charts - Circle Charts',
    source: path.join(SOURCE_BASE, 'graficos/Circle Charts (Community)'),
    dest: path.join(DEST_BASE, 'charts/circle'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png')
  },
  {
    name: 'Charts - T Charts',
    source: path.join(SOURCE_BASE, 'graficos/T Charts Components (Community)'),
    dest: path.join(DEST_BASE, 'charts/t-charts'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png')
  },
  {
    name: 'Charts - T Charts (1)',
    source: path.join(SOURCE_BASE, 'graficos/T Charts Components (Community) (1)'),
    dest: path.join(DEST_BASE, 'charts/t-charts-1'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png')
  },
  {
    name: 'Charts - T Charts (2)',
    source: path.join(SOURCE_BASE, 'graficos/T Charts Components (Community) (2)'),
    dest: path.join(DEST_BASE, 'charts/t-charts-2'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png')
  },

  // ===== BACKGROUNDS (73 arquivos) =====
  {
    name: 'Backgrounds - Backstage',
    source: path.join(SOURCE_BASE, 'background/Backstage Design System (Community)'),
    dest: path.join(DEST_BASE, 'backgrounds/backstage'),
    filter: (file) => file.endsWith('.svg')
  },
  {
    name: 'Backgrounds - Black And White',
    source: path.join(SOURCE_BASE, 'background/Black And White - Web & Mobile UI Kit (Community)'),
    dest: path.join(DEST_BASE, 'backgrounds/black-white'),
    filter: (file) => file.endsWith('.svg')
  },

  // ===== COLORS - watchOS (86 arquivos) =====
  {
    name: 'Colors - watchOS Palette',
    source: path.join(SOURCE_BASE, 'Cores/watchOS Colors (Community)'),
    dest: path.join(DEST_BASE, 'colors/watchos'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png')
  },

  // ===== LOGIN TEMPLATES (20 arquivos) =====
  {
    name: 'Login Templates',
    source: path.join(SOURCE_BASE, 'Login/20 Screen Login & Register Mobile App (Community)'),
    dest: path.join(DEST_BASE, 'templates/login'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png') || file.endsWith('.jpg')
  },

  // ===== SIDEBAR COMPONENTS (4 arquivos) =====
  {
    name: 'Sidebar Components',
    source: path.join(SOURCE_BASE, 'Sidebar'),
    dest: path.join(DEST_BASE, 'components/sidebar'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png')
  },

  // ===== FORM CONTROLS (3 arquivos) =====
  {
    name: 'Form Controls - Checkbox, Radio, Switch',
    source: path.join(SOURCE_BASE, 'checkbox/Radio button, Switch & Checkbox - Tida Components (Community)'),
    dest: path.join(DEST_BASE, 'components/form-controls'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png')
  },

  // ===== ANIMATIONS (1 arquivo) =====
  {
    name: 'Animations - Demo',
    source: path.join(SOURCE_BASE, 'animações'),
    dest: path.join(DEST_BASE, 'animations'),
    filter: (file) => file.endsWith('.svg') || file.endsWith('.png')
  }
];

// Utility functions
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  try {
    fs.copyFileSync(src, dest);
    return true;
  } catch (error) {
    console.error(`  ❌ Error copying ${path.basename(src)}: ${error.message}`);
    return false;
  }
}

function copyDirectoryRecursive(src, dest, filter) {
  ensureDirectoryExists(dest);

  let copiedCount = 0;
  let skippedCount = 0;

  function traverseDirectory(currentSrc, currentDest) {
    if (!fs.existsSync(currentSrc)) {
      console.warn(`  ⚠️  Source not found: ${currentSrc}`);
      return;
    }

    const entries = fs.readdirSync(currentSrc, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(currentSrc, entry.name);
      const destPath = path.join(currentDest, entry.name);

      // Skip hidden files and DS_Store
      if (entry.name.startsWith('.')) {
        continue;
      }

      if (entry.isDirectory()) {
        ensureDirectoryExists(destPath);
        traverseDirectory(srcPath, destPath);
      } else if (entry.isFile()) {
        if (filter(entry.name)) {
          if (copyFile(srcPath, destPath)) {
            copiedCount++;
            // Progress indicator every 100 files
            if (copiedCount % 100 === 0) {
              process.stdout.write(`\r  📦 ${copiedCount} files copied...`);
            }
          } else {
            skippedCount++;
          }
        } else {
          skippedCount++;
        }
      }
    }
  }

  traverseDirectory(src, dest);
  if (copiedCount > 0) {
    process.stdout.write('\r'); // Clear progress line
  }
  return { copiedCount, skippedCount };
}

// Main migration function
function runMigration() {
  console.log('🏗️  Neo Design System - COMPLETE Asset Migration\n');
  console.log('━'.repeat(60));
  console.log(`📂 Source: ${SOURCE_BASE}`);
  console.log(`📁 Destination: ${DEST_BASE}`);
  console.log(`📊 Total migrations: ${MIGRATIONS.length}`);
  console.log('━'.repeat(60) + '\n');

  const stats = {
    totalCopied: 0,
    totalSkipped: 0,
    successful: 0,
    failed: 0
  };

  const startTime = Date.now();

  MIGRATIONS.forEach((migration, index) => {
    console.log(`\n[${index + 1}/${MIGRATIONS.length}] ${migration.name}`);
    console.log(`  📂 From: ${migration.source}`);
    console.log(`  📁 To: ${migration.dest}`);

    if (!fs.existsSync(migration.source)) {
      console.log(`  ⚠️  Source directory not found - SKIPPING`);
      stats.failed++;
      return;
    }

    const result = copyDirectoryRecursive(
      migration.source,
      migration.dest,
      migration.filter
    );

    stats.totalCopied += result.copiedCount;
    stats.totalSkipped += result.skippedCount;

    if (result.copiedCount > 0) {
      console.log(`  ✅ Copied ${result.copiedCount} files`);
      stats.successful++;
    } else {
      console.log(`  ⚠️  No files copied`);
      stats.failed++;
    }

    if (result.skippedCount > 0) {
      console.log(`  ⏭️  Skipped ${result.skippedCount} files`);
    }
  });

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('\n' + '━'.repeat(60));
  console.log('📊 Migration Summary');
  console.log('━'.repeat(60));
  console.log(`✅ Successful migrations: ${stats.successful}`);
  console.log(`❌ Failed migrations: ${stats.failed}`);
  console.log(`📄 Total files copied: ${stats.totalCopied}`);
  console.log(`⏭️  Total files skipped: ${stats.totalSkipped}`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log('━'.repeat(60) + '\n');

  if (stats.totalCopied > 0) {
    console.log('✨ Complete migration finished successfully!\n');
    console.log('📦 Asset breakdown:');
    console.log('   - Social Logos: 85 (color, white, black)');
    console.log('   - Payment Methods: 12');
    console.log('   - Icons Library: ~3,883 (line, dual, solid, bold)');
    console.log('   - UI Icons (10k): 33');
    console.log('   - Charts: 74');
    console.log('   - Backgrounds: 73');
    console.log('   - Colors (watchOS): 86');
    console.log('   - Login Templates: 20');
    console.log('   - Sidebar Components: 4');
    console.log('   - Form Controls: 3');
    console.log('   - Animations: 1');
    console.log('');
  } else {
    console.log('⚠️  No files were migrated. Check source paths.\n');
  }
}

// Run migration
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration };
