#!/usr/bin/env node

/**
 * Asset Migration Script
 * Migrates Figma assets from external folder to public/assets/
 */

const fs = require('fs');
const path = require('path');

// Source and destination paths
const SOURCE_BASE = '/Users/fabiobrunning/Library/Mobile Documents/iCloud~md~obsidian/Documents/Fabio BB/10-Negócios/10.02-Produto/Desing/assets';
const DEST_BASE = path.join(__dirname, '..', 'public', 'assets');

// Migration config
const MIGRATIONS = [
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
  {
    name: 'Icons - 10k Free Icons',
    source: path.join(SOURCE_BASE, 'icons/10,000 Free Icons - Open Source Icon set (Community)'),
    dest: path.join(DEST_BASE, 'icons/ui/10k-free'),
    filter: (file) => file.endsWith('.svg')
  },
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
  return { copiedCount, skippedCount };
}

// Main migration function
function runMigration() {
  console.log('🏗️  Neo Design System - Asset Migration\n');
  console.log('━'.repeat(60));
  console.log(`📂 Source: ${SOURCE_BASE}`);
  console.log(`📁 Destination: ${DEST_BASE}`);
  console.log('━'.repeat(60) + '\n');

  const stats = {
    totalCopied: 0,
    totalSkipped: 0,
    successful: 0,
    failed: 0
  };

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

  console.log('\n' + '━'.repeat(60));
  console.log('📊 Migration Summary');
  console.log('━'.repeat(60));
  console.log(`✅ Successful migrations: ${stats.successful}`);
  console.log(`❌ Failed migrations: ${stats.failed}`);
  console.log(`📄 Total files copied: ${stats.totalCopied}`);
  console.log(`⏭️  Total files skipped: ${stats.totalSkipped}`);
  console.log('━'.repeat(60) + '\n');

  if (stats.totalCopied > 0) {
    console.log('✨ Migration completed successfully!\n');
  } else {
    console.log('⚠️  No files were migrated. Check source paths.\n');
  }
}

// Run migration
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration };
