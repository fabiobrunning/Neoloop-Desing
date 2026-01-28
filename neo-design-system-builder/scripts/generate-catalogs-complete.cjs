#!/usr/bin/env node

/**
 * Complete Asset Catalog Generator
 * Creates JSON catalogs for ALL migrated assets
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_ASSETS = path.join(__dirname, '..', 'public', 'assets');
const SRC_DATA = path.join(__dirname, '..', 'src', 'data');

// Ensure data directory exists
if (!fs.existsSync(SRC_DATA)) {
  fs.mkdirSync(SRC_DATA, { recursive: true });
}

function scanDirectory(dir, baseUrl = '', limit = null) {
  const results = [];
  let count = 0;

  if (!fs.existsSync(dir)) {
    return results;
  }

  function traverse(currentDir, currentUrl) {
    if (limit && count >= limit) return;

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;

      const fullPath = path.join(currentDir, entry.name);
      const urlPath = currentUrl ? `${currentUrl}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        traverse(fullPath, urlPath);
      } else if (entry.isFile()) {
        if (limit && count >= limit) return;

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
        count++;
      }
    }
  }

  traverse(dir, '');
  return results;
}

console.log('🔍 Generating Complete Asset Catalogs...\n');

// ===== SOCIAL LOGOS (3 variants) =====
console.log('[1/11] Scanning Social Logos...');
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
      logos: socialColor.map(logo => ({ ...logo, platform: logo.id.replace(/-/g, ''), variant: 'color' }))
    },
    white: {
      name: 'White',
      total: socialWhite.length,
      logos: socialWhite.map(logo => ({ ...logo, platform: logo.id.replace(/-/g, ''), variant: 'white' }))
    },
    black: {
      name: 'Black',
      total: socialBlack.length,
      logos: socialBlack.map(logo => ({ ...logo, platform: logo.id.replace(/-/g, ''), variant: 'black' }))
    }
  }
};

fs.writeFileSync(
  path.join(SRC_DATA, 'social-logos.json'),
  JSON.stringify(socialCatalog, null, 2)
);
console.log(`  ✅ social-logos.json (${socialCatalog.total} logos)\n`);

// ===== PAYMENT METHODS =====
console.log('[2/11] Scanning Payment Methods...');
const paymentMethods = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/payment'),
  'icons/payment'
);

const paymentCatalog = {
  name: 'Payment Methods',
  description: 'Payment method logos and icons',
  total: paymentMethods.length,
  logos: paymentMethods.map(logo => ({ ...logo, method: logo.id.replace(/-/g, '') }))
};

fs.writeFileSync(
  path.join(SRC_DATA, 'payment-methods.json'),
  JSON.stringify(paymentCatalog, null, 2)
);
console.log(`  ✅ payment-methods.json (${paymentMethods.length} methods)\n`);

// ===== ICONS LIBRARY (3,883 icons in 3 styles) =====
console.log('[3/11] Scanning Icons Library (this may take a moment)...');
const iconsLine = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/library/line'),
  'icons/library/line',
  200 // Limit to 200 for catalog (too many for JSON)
);
const iconsDual = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/library/dual'),
  'icons/library/dual',
  200
);
const iconsSolid = scanDirectory(
  path.join(PUBLIC_ASSETS, 'icons/library/solid'),
  'icons/library/solid',
  200
);

const iconsLibraryCatalog = {
  name: 'Icons Library',
  description: '3,883 professional icons in 3 styles (line, dual, solid)',
  total: 3883,
  note: 'Catalog shows first 200 icons per style. All icons available in /assets/icons/library/',
  styles: {
    line: {
      name: 'Line Style',
      total: 1310,
      sample: iconsLine
    },
    dual: {
      name: 'Dual Tone',
      total: 1295,
      sample: iconsDual
    },
    solid: {
      name: 'Solid',
      total: 1278,
      sample: iconsSolid
    }
  }
};

fs.writeFileSync(
  path.join(SRC_DATA, 'icons-library.json'),
  JSON.stringify(iconsLibraryCatalog, null, 2)
);
console.log(`  ✅ icons-library.json (${iconsLibraryCatalog.total} icons, 200 samples per style)\n`);

// ===== CHARTS =====
console.log('[4/11] Scanning Charts...');
const circleCharts = scanDirectory(
  path.join(PUBLIC_ASSETS, 'charts/circle'),
  'charts/circle'
);
const tCharts = scanDirectory(
  path.join(PUBLIC_ASSETS, 'charts/t-charts'),
  'charts/t-charts'
);
const tCharts1 = scanDirectory(
  path.join(PUBLIC_ASSETS, 'charts/t-charts-1'),
  'charts/t-charts-1'
);
const tCharts2 = scanDirectory(
  path.join(PUBLIC_ASSETS, 'charts/t-charts-2'),
  'charts/t-charts-2'
);

const chartsCatalog = {
  name: 'Charts Library',
  description: 'Pre-built chart components from Figma',
  total: circleCharts.length + tCharts.length + tCharts1.length + tCharts2.length,
  categories: {
    circle: {
      name: 'Circle Charts',
      total: circleCharts.length,
      charts: circleCharts
    },
    tCharts: {
      name: 'T Charts',
      total: tCharts.length + tCharts1.length + tCharts2.length,
      charts: [...tCharts, ...tCharts1, ...tCharts2]
    }
  }
};

fs.writeFileSync(
  path.join(SRC_DATA, 'charts-catalog.json'),
  JSON.stringify(chartsCatalog, null, 2)
);
console.log(`  ✅ charts-catalog.json (${chartsCatalog.total} charts)\n`);

// ===== BACKGROUNDS =====
console.log('[5/11] Scanning Backgrounds...');
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
console.log(`  ✅ backgrounds-catalog.json (${backgroundsCatalog.total} backgrounds)\n`);

// ===== COLORS - watchOS =====
console.log('[6/11] Scanning watchOS Colors...');
const watchosColors = scanDirectory(
  path.join(PUBLIC_ASSETS, 'colors/watchos'),
  'colors/watchos'
);

const colorsCatalog = {
  name: 'watchOS Color Palette',
  description: 'Official watchOS color swatches and gradients',
  total: watchosColors.length,
  colors: watchosColors
};

fs.writeFileSync(
  path.join(SRC_DATA, 'watchos-colors.json'),
  JSON.stringify(colorsCatalog, null, 2)
);
console.log(`  ✅ watchos-colors.json (${watchosColors.length} colors)\n`);

// ===== LOGIN TEMPLATES =====
console.log('[7/11] Scanning Login Templates...');
const loginTemplates = scanDirectory(
  path.join(PUBLIC_ASSETS, 'templates/login'),
  'templates/login'
);

const loginCatalog = {
  name: 'Login & Register Templates',
  description: '20 pre-designed login and registration screens',
  total: loginTemplates.length,
  templates: loginTemplates
};

fs.writeFileSync(
  path.join(SRC_DATA, 'login-templates.json'),
  JSON.stringify(loginCatalog, null, 2)
);
console.log(`  ✅ login-templates.json (${loginTemplates.length} templates)\n`);

// ===== SIDEBAR COMPONENTS =====
console.log('[8/11] Scanning Sidebar Components...');
const sidebarComponents = scanDirectory(
  path.join(PUBLIC_ASSETS, 'components/sidebar'),
  'components/sidebar'
);

const sidebarCatalog = {
  name: 'Sidebar Components',
  description: 'Sidebar navigation components (light/dark themes)',
  total: sidebarComponents.length,
  components: sidebarComponents
};

fs.writeFileSync(
  path.join(SRC_DATA, 'sidebar-components.json'),
  JSON.stringify(sidebarCatalog, null, 2)
);
console.log(`  ✅ sidebar-components.json (${sidebarComponents.length} components)\n`);

// ===== FORM CONTROLS =====
console.log('[9/11] Scanning Form Controls...');
const formControls = scanDirectory(
  path.join(PUBLIC_ASSETS, 'components/form-controls'),
  'components/form-controls'
);

const formControlsCatalog = {
  name: 'Form Controls',
  description: 'Checkbox, Radio Button, and Switch components',
  total: formControls.length,
  components: formControls
};

fs.writeFileSync(
  path.join(SRC_DATA, 'form-controls.json'),
  JSON.stringify(formControlsCatalog, null, 2)
);
console.log(`  ✅ form-controls.json (${formControls.length} controls)\n`);

// ===== ANIMATIONS =====
console.log('[10/11] Scanning Animations...');
const animations = scanDirectory(
  path.join(PUBLIC_ASSETS, 'animations'),
  'animations'
);

const animationsCatalog = {
  name: 'Animations',
  description: 'Animation demos and motion design references',
  total: animations.length,
  animations: animations
};

fs.writeFileSync(
  path.join(SRC_DATA, 'animations-catalog.json'),
  JSON.stringify(animationsCatalog, null, 2)
);
console.log(`  ✅ animations-catalog.json (${animations.length} animations)\n`);

// ===== UI ICONS (existing 10k free - if found) =====
console.log('[11/11] Scanning UI Icons (10k Free)...');
const uiIconsPath = path.join(PUBLIC_ASSETS, 'icons/ui/10k-free');
let uiIcons = [];
if (fs.existsSync(uiIconsPath)) {
  uiIcons = scanDirectory(uiIconsPath, 'icons/ui/10k-free');
}

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
console.log(`  ✅ ui-icons.json (${uiIcons.length} icons)\n`);

// Summary
const totalAssets =
  socialCatalog.total +
  paymentCatalog.total +
  iconsLibraryCatalog.total +
  chartsCatalog.total +
  backgroundsCatalog.total +
  colorsCatalog.total +
  loginCatalog.total +
  sidebarCatalog.total +
  formControlsCatalog.total +
  animationsCatalog.total +
  iconsCatalog.total;

console.log('━'.repeat(60));
console.log('📊 Catalog Generation Summary');
console.log('━'.repeat(60));
console.log(`✅ Social Logos: ${socialCatalog.total}`);
console.log(`✅ Payment Methods: ${paymentCatalog.total}`);
console.log(`✅ Icons Library: ${iconsLibraryCatalog.total} (3 styles)`);
console.log(`✅ UI Icons (10k): ${iconsCatalog.total}`);
console.log(`✅ Charts: ${chartsCatalog.total}`);
console.log(`✅ Backgrounds: ${backgroundsCatalog.total}`);
console.log(`✅ watchOS Colors: ${colorsCatalog.total}`);
console.log(`✅ Login Templates: ${loginCatalog.total}`);
console.log(`✅ Sidebar Components: ${sidebarCatalog.total}`);
console.log(`✅ Form Controls: ${formControlsCatalog.total}`);
console.log(`✅ Animations: ${animationsCatalog.total}`);
console.log(`📦 Total Assets: ${totalAssets}`);
console.log('━'.repeat(60) + '\n');
console.log('✨ All catalogs generated successfully!\n');
