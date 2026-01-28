#!/usr/bin/env node

/**
 * Asset Catalog Generator
 * Creates JSON catalogs for icons, logos, charts, and backgrounds
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_ASSETS = path.join(__dirname, '..', 'public', 'assets');
const SRC_DATA = path.join(__dirname, '..', 'src', 'data');

// Ensure data directory exists
if (!fs.existsSync(SRC_DATA)) {
  fs.mkdirSync(SRC_DATA, { recursive: true });
}

function scanDirectory(dir, baseUrl = '') {
  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  function traverse(currentDir, currentUrl) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;

      const fullPath = path.join(currentDir, entry.name);
      const urlPath = currentUrl ? `${currentUrl}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        traverse(fullPath, urlPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        const name = path.basename(entry.name, ext);

        results.push({
          id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          filename: entry.name,
          path: urlPath,
          url: `/assets/${baseUrl}/${urlPath}`,
          extension: ext.substring(1),
          category: path.basename(path.dirname(fullPath))
        });
      }
    }
  }

  traverse(dir, '');
  return results;
}

// Generate Social Logos catalog (3 variants)
console.log('🔍 Scanning Social Logos...');
const socialColor = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/social/color'),
  'icons/social/color'
);
const socialWhite = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/social/white'),
  'icons/social/white'
);
const socialBlack = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/social/black'),
  'icons/social/black'
);

const socialCatalog = {
  name: 'Social Logos',
  description: 'Social media platform logos in 3 color variants',
  total: socialColor.length + socialWhite.length + socialBlack.length,
  variants: {
    color: {
      name: 'Colorida',
      total: socialColor.length,
      logos: socialColor.map(logo => ({
        ...logo,
        platform: logo.id.replace(/-/g, ''),
        variant: 'color'
      }))
    },
    white: {
      name: 'White',
      total: socialWhite.length,
      logos: socialWhite.map(logo => ({
        ...logo,
        platform: logo.id.replace(/-/g, ''),
        variant: 'white'
      }))
    },
    black: {
      name: 'Black',
      total: socialBlack.length,
      logos: socialBlack.map(logo => ({
        ...logo,
        platform: logo.id.replace(/-/g, ''),
        variant: 'black'
      }))
    }
  }
};

fs.writeFileSync(
  path.join(SRC_DATA, 'social-logos.json'),
  JSON.stringify(socialCatalog, null, 2)
);
console.log(`  ✅ Created social-logos.json (${socialColor.length + socialWhite.length + socialBlack.length} logos: ${socialColor.length} color + ${socialWhite.length} white + ${socialBlack.length} black)`);

// Generate Payment Methods catalog
console.log('🔍 Scanning Payment Methods...');
const paymentMethods = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/payment'),
  'icons/payment'
);

const paymentCatalog = {
  name: 'Payment Methods',
  description: 'Payment method logos and icons',
  total: paymentMethods.length,
  logos: paymentMethods.map(logo => ({
    ...logo,
    method: logo.id.replace(/-/g, ''),
  }))
};

fs.writeFileSync(
  path.join(SRC_DATA, 'payment-methods.json'),
  JSON.stringify(paymentCatalog, null, 2)
);
console.log(`  ✅ Created payment-methods.json (${paymentMethods.length} payment methods)`);

// Generate UI Icons catalog
console.log('🔍 Scanning UI Icons...');
const uiIcons = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/ui/10k-free'),
  'icons/ui/10k-free'
);

const iconsCatalog = {
  name: 'UI Icons',
  description: '10,000+ Free Icons from Figma Community',
  total: uiIcons.length,
  icons: uiIcons
};

fs.writeFileSync(
  path.join(SRC_DATA, 'ui-icons.json'),
  JSON.stringify(iconsCatalog, null, 2)
);
console.log(`  ✅ Created ui-icons.json (${uiIcons.length} icons)`);

// Generate Charts catalog
console.log('🔍 Scanning Charts...');
const circleCharts = scanDirectory(
  path.join(PUBLIC_ASSETS, 'charts/circle'),
  'charts/circle'
);
const tCharts = scanDirectory(
  path.join(PUBLIC_ASSETS, 'charts/t-charts'),
  'charts/t-charts'
);

const chartsCatalog = {
  name: 'Charts Library',
  description: 'Pre-built chart components from Figma',
  total: circleCharts.length + tCharts.length,
  categories: {
    circle: {
      name: 'Circle Charts',
      total: circleCharts.length,
      charts: circleCharts
    },
    tCharts: {
      name: 'T Charts',
      total: tCharts.length,
      charts: tCharts
    }
  }
};

fs.writeFileSync(
  path.join(SRC_DATA, 'charts-catalog.json'),
  JSON.stringify(chartsCatalog, null, 2)
);
console.log(`  ✅ Created charts-catalog.json (${circleCharts.length + tCharts.length} charts)`);

// Generate Backgrounds catalog
console.log('🔍 Scanning Backgrounds...');
const backstage = scanDirectory(
  path.join(PUBLIC_ASSETS, 'backgrounds/backstage'),
  'backgrounds/backstage'
);
const blackWhite = scanDirectory(
  path.join(PUBLIC_ASSETS, 'backgrounds/black-white'),
  'backgrounds/black-white'
);

const backgroundsCatalog = {
  name: 'Backgrounds Library',
  description: 'Background patterns and templates from Figma',
  total: backstage.length + blackWhite.length,
  categories: {
    backstage: {
      name: 'Backstage Design System',
      total: backstage.length,
      backgrounds: backstage
    },
    blackWhite: {
      name: 'Black & White UI Kit',
      total: blackWhite.length,
      backgrounds: blackWhite
    }
  }
};

fs.writeFileSync(
  path.join(SRC_DATA, 'backgrounds-catalog.json'),
  JSON.stringify(backgroundsCatalog, null, 2)
);
console.log(`  ✅ Created backgrounds-catalog.json (${backstage.length + blackWhite.length} backgrounds)`);

// Summary
const totalSocial = socialColor.length + socialWhite.length + socialBlack.length;
const totalAssets = totalSocial + paymentMethods.length + uiIcons.length + circleCharts.length + tCharts.length + backstage.length + blackWhite.length;

console.log('\n━'.repeat(60));
console.log('📊 Catalog Generation Summary');
console.log('━'.repeat(60));
console.log(`✅ Social Logos: ${totalSocial} (${socialColor.length} color + ${socialWhite.length} white + ${socialBlack.length} black)`);
console.log(`✅ Payment Methods: ${paymentMethods.length}`);
console.log(`✅ UI Icons: ${uiIcons.length}`);
console.log(`✅ Charts: ${circleCharts.length + tCharts.length}`);
console.log(`✅ Backgrounds: ${backstage.length + blackWhite.length}`);
console.log(`📦 Total Assets: ${totalAssets}`);
console.log('━'.repeat(60) + '\n');
console.log('✨ All catalogs generated successfully!\n');
