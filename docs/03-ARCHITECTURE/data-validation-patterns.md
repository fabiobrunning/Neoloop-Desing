# Data Validation & Quality Patterns

## Document Information

| Field | Value |
|-------|-------|
| **Project** | Neoloop Design System Builder |
| **Version** | 1.0.0 |
| **Date** | 2026-01-30 |
| **Author** | Data Engineer Agent |
| **Status** | Ready for Implementation |
| **Related Docs** | data-architecture-patterns.md |

---

## 1. Data Quality Framework

### 1.1 Quality Dimensions

| Dimension | Definition | Validation Rule | Priority |
|-----------|-----------|-----------------|----------|
| **Completeness** | All required fields present | Schema validation | P0 |
| **Accuracy** | Values match expected format | Type checking, regex | P0 |
| **Consistency** | Data follows business rules | Cross-field validation | P1 |
| **Timeliness** | Data is current | Timestamp validation | P2 |
| **Uniqueness** | No duplicates | ID uniqueness checks | P0 |
| **Integrity** | Referential integrity maintained | Foreign key validation | P1 |

### 1.2 Data Quality Metrics

```typescript
interface DataQualityMetrics {
  completenessScore: number;    // % of required fields filled
  accuracyScore: number;        // % of valid values
  consistencyScore: number;     // % passing business rules
  overallScore: number;         // Weighted average
  issues: ValidationIssue[];
}

interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  field: string;
  message: string;
  suggestedFix?: string;
}

// Calculate quality score
function calculateQualityScore(ds: DesignSystem): DataQualityMetrics {
  const issues: ValidationIssue[] = [];

  // Completeness checks
  const requiredFields = ['name', 'colors', 'typography'];
  const completeness = requiredFields.filter(f => ds[f]).length / requiredFields.length;

  // Accuracy checks
  const validColors = ds.tokens.colors.filter(c => isValidHex(c.hex)).length;
  const accuracy = validColors / ds.tokens.colors.length;

  // Consistency checks
  const hasConsistentSpacing = checkSpacingConsistency(ds.tokens.spacing);
  const consistency = hasConsistentSpacing ? 1 : 0.8;

  const overallScore = (completeness * 0.4) + (accuracy * 0.4) + (consistency * 0.2);

  return {
    completenessScore: completeness,
    accuracyScore: accuracy,
    consistencyScore: consistency,
    overallScore,
    issues
  };
}
```

---

## 2. Input Validation Patterns

### 2.1 Color Validation

```typescript
// Hex color validation
const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export function isValidHexColor(hex: string): boolean {
  return HEX_COLOR_REGEX.test(hex);
}

export function validateHexColor(hex: string): ValidationResult {
  if (!hex) {
    return { valid: false, error: 'Color is required' };
  }

  if (!isValidHexColor(hex)) {
    return {
      valid: false,
      error: 'Invalid hex color format. Use #RRGGBB or #RGB'
    };
  }

  return { valid: true };
}

// RGB validation
export function isValidRGB(rgb: string): boolean {
  const match = rgb.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);
  if (!match) return false;

  const [_, r, g, b] = match;
  return [r, g, b].every(v => {
    const num = parseInt(v);
    return num >= 0 && num <= 255;
  });
}

// HSL validation
export function isValidHSL(hsl: string): boolean {
  const match = hsl.match(/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/);
  if (!match) return false;

  const [_, h, s, l] = match;
  const hNum = parseInt(h);
  const sNum = parseInt(s);
  const lNum = parseInt(l);

  return hNum >= 0 && hNum <= 360 &&
         sNum >= 0 && sNum <= 100 &&
         lNum >= 0 && lNum <= 100;
}

// Contrast ratio validation (WCAG)
export function validateContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): ValidationResult {
  const ratio = calculateContrastRatio(foreground, background);
  const minRatio = level === 'AA' ? 4.5 : 7.0;

  if (ratio < minRatio) {
    return {
      valid: false,
      error: `Contrast ratio ${ratio.toFixed(2)} is below WCAG ${level} minimum of ${minRatio}`,
      suggestedFix: 'Use a darker or lighter color to improve contrast'
    };
  }

  return { valid: true, ratio };
}

function calculateContrastRatio(fg: string, bg: string): number {
  const fgLuminance = getRelativeLuminance(hexToRgb(fg));
  const bgLuminance = getRelativeLuminance(hexToRgb(bg));

  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
    const channel = val / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}
```

### 2.2 Typography Validation

```typescript
// Font size validation
export function validateFontSize(size: string): ValidationResult {
  // Valid formats: 1rem, 16px, 1.5em
  const sizeRegex = /^(\d+(\.\d+)?)(px|rem|em)$/;

  if (!sizeRegex.test(size)) {
    return {
      valid: false,
      error: 'Invalid font size. Use px, rem, or em units'
    };
  }

  const match = size.match(sizeRegex);
  const value = parseFloat(match![1]);
  const unit = match![3];

  // Check reasonable ranges
  if (unit === 'px' && (value < 8 || value > 144)) {
    return {
      valid: false,
      error: 'Font size should be between 8px and 144px'
    };
  }

  if (unit === 'rem' && (value < 0.5 || value > 9)) {
    return {
      valid: false,
      error: 'Font size should be between 0.5rem and 9rem'
    };
  }

  return { valid: true };
}

// Font weight validation
export function validateFontWeight(weight: number | string): ValidationResult {
  const validWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const numWeight = typeof weight === 'string' ? parseInt(weight) : weight;

  if (!validWeights.includes(numWeight)) {
    return {
      valid: false,
      error: `Invalid font weight. Use one of: ${validWeights.join(', ')}`
    };
  }

  return { valid: true };
}

// Line height validation
export function validateLineHeight(lineHeight: string | number): ValidationResult {
  // Valid formats: 1.5, 24px, normal
  if (lineHeight === 'normal') {
    return { valid: true };
  }

  if (typeof lineHeight === 'number') {
    if (lineHeight < 0.8 || lineHeight > 3) {
      return {
        valid: false,
        error: 'Line height should be between 0.8 and 3'
      };
    }
    return { valid: true };
  }

  const pxMatch = lineHeight.match(/^(\d+)px$/);
  if (pxMatch) {
    const value = parseInt(pxMatch[1]);
    if (value < 12 || value > 200) {
      return {
        valid: false,
        error: 'Line height should be between 12px and 200px'
      };
    }
    return { valid: true };
  }

  return {
    valid: false,
    error: 'Invalid line height. Use a number or px value'
  };
}
```

### 2.3 Spacing Validation

```typescript
// Spacing consistency validation
export function validateSpacingScale(spacing: SpacingToken): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Check if values follow 4px base grid
  const values = Object.values(spacing).filter(v => v !== '0' && v !== '1px');

  values.forEach((value, index) => {
    const pxValue = parsePxValue(value);

    if (pxValue === null) {
      issues.push({
        severity: 'error',
        field: `spacing[${index}]`,
        message: `Invalid spacing value: ${value}`
      });
      return;
    }

    if (pxValue % 4 !== 0) {
      issues.push({
        severity: 'warning',
        field: `spacing[${index}]`,
        message: `Spacing value ${value} (${pxValue}px) is not a multiple of 4px`,
        suggestedFix: `Use ${Math.round(pxValue / 4) * 4}px instead`
      });
    }
  });

  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    issues
  };
}

function parsePxValue(value: string): number | null {
  if (value === '0') return 0;
  if (value === '1px') return 1;

  const remMatch = value.match(/^(\d+(\.\d+)?)rem$/);
  if (remMatch) {
    return parseFloat(remMatch[1]) * 16; // Assuming 1rem = 16px
  }

  const pxMatch = value.match(/^(\d+)px$/);
  if (pxMatch) {
    return parseInt(pxMatch[1]);
  }

  return null;
}
```

### 2.4 SVG Validation (Security Critical)

```typescript
// SVG sanitization and validation
export function validateSVG(svgContent: string): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Check file size
  const sizeInKB = new Blob([svgContent]).size / 1024;
  if (sizeInKB > 100) {
    issues.push({
      severity: 'error',
      field: 'svg',
      message: `SVG file is too large (${sizeInKB.toFixed(2)} KB). Maximum allowed is 100 KB`,
      suggestedFix: 'Optimize SVG using SVGO or similar tools'
    });
  }

  // Check for dangerous tags
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'foreignObject'];
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>`, 'i');
    if (regex.test(svgContent)) {
      issues.push({
        severity: 'error',
        field: 'svg',
        message: `Dangerous tag detected: <${tag}>`,
        suggestedFix: `Remove <${tag}> tags for security`
      });
    }
  });

  // Check for event handlers (XSS prevention)
  const eventHandlerRegex = /on\w+\s*=\s*["'][^"']*["']/gi;
  if (eventHandlerRegex.test(svgContent)) {
    issues.push({
      severity: 'error',
      field: 'svg',
      message: 'Event handlers detected in SVG (potential XSS)',
      suggestedFix: 'Remove all on* attributes'
    });
  }

  // Check for javascript: URLs
  const jsUrlRegex = /href\s*=\s*["']javascript:/gi;
  if (jsUrlRegex.test(svgContent)) {
    issues.push({
      severity: 'error',
      field: 'svg',
      message: 'JavaScript URLs detected in SVG',
      suggestedFix: 'Remove javascript: URLs'
    });
  }

  // Check for valid SVG structure
  const hasViewBox = /<svg[^>]*viewBox\s*=\s*["'][^"']+["']/i.test(svgContent);
  if (!hasViewBox) {
    issues.push({
      severity: 'warning',
      field: 'svg',
      message: 'SVG missing viewBox attribute',
      suggestedFix: 'Add viewBox="0 0 width height" for proper scaling'
    });
  }

  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    issues
  };
}

// SVG sanitization
export function sanitizeSVG(svgContent: string): string {
  let sanitized = svgContent;

  // Remove dangerous tags
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'foreignObject'];
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>.*?<\/${tag}>`, 'gis');
    sanitized = sanitized.replace(regex, '');
  });

  // Remove event handlers
  sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');

  // Remove javascript: URLs
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '');

  // Remove data: URLs (except safe ones like data:image/svg+xml)
  sanitized = sanitized.replace(/href\s*=\s*["']data:(?!image\/svg\+xml)[^"']*["']/gi, '');

  return sanitized;
}

// SVGO optimization
export async function optimizeSVG(svgContent: string): Promise<string> {
  // This would use SVGO library
  // For now, placeholder for implementation
  return svgContent; // TODO: Implement SVGO integration
}
```

---

## 3. Business Rules Validation

### 3.1 Design System Completeness Rules

```typescript
// Validate minimum requirements for export
export function validateDesignSystemForExport(ds: DesignSystem): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Rule 1: Must have at least 1 color
  if (!ds.tokens.colors || ds.tokens.colors.length === 0) {
    issues.push({
      severity: 'error',
      field: 'colors',
      message: 'Design system must have at least one color',
      suggestedFix: 'Select at least one color from the palette'
    });
  }

  // Rule 2: Must have at least 1 typography family
  if (!ds.tokens.typography || ds.tokens.typography.families.length === 0) {
    issues.push({
      severity: 'error',
      field: 'typography',
      message: 'Design system must have at least one font family',
      suggestedFix: 'Select at least one font family'
    });
  }

  // Rule 3: Must have a name
  if (!ds.metadata.name || ds.metadata.name.trim() === '') {
    issues.push({
      severity: 'error',
      field: 'metadata.name',
      message: 'Design system must have a name',
      suggestedFix: 'Enter a descriptive name for your design system'
    });
  }

  // Rule 4: Name length limits
  if (ds.metadata.name && ds.metadata.name.length > 100) {
    issues.push({
      severity: 'error',
      field: 'metadata.name',
      message: 'Design system name must be 100 characters or less',
      suggestedFix: 'Shorten the name'
    });
  }

  // Rule 5: Description length limits
  if (ds.metadata.description && ds.metadata.description.length > 500) {
    issues.push({
      severity: 'warning',
      field: 'metadata.description',
      message: 'Description is very long (over 500 characters)',
      suggestedFix: 'Consider shortening for better readability'
    });
  }

  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    issues
  };
}
```

### 3.2 Accessibility Rules

```typescript
// WCAG AA compliance validation
export function validateAccessibility(ds: DesignSystem): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Check contrast ratios for all selected colors
  const textColors = ds.tokens.colors.filter(c => c.selected);
  const backgrounds = ['#FFFFFF', '#000000']; // White and black

  textColors.forEach(color => {
    backgrounds.forEach(bg => {
      const contrastResult = validateContrast(color.hex, bg, 'AA');

      if (!contrastResult.valid) {
        issues.push({
          severity: 'warning',
          field: `colors.${color.id}`,
          message: `${color.name} (${color.hex}) has poor contrast against ${bg}`,
          suggestedFix: contrastResult.suggestedFix
        });
      }
    });
  });

  // Check minimum font sizes
  const scale = ds.tokens.typography.scale;
  const minFontSize = 12; // px

  Object.entries(scale).forEach(([key, value]) => {
    const pxValue = parsePxValue(value);
    if (pxValue !== null && pxValue < minFontSize) {
      issues.push({
        severity: 'warning',
        field: `typography.scale.${key}`,
        message: `Font size ${value} (${pxValue}px) is below recommended minimum of ${minFontSize}px`,
        suggestedFix: 'Increase font size for better readability'
      });
    }
  });

  // Check touch target sizes for interactive components
  const minTouchTarget = 44; // px (WCAG 2.5.5)
  if (ds.ui.buttons) {
    ds.ui.buttons.selected.forEach(button => {
      if (button.size === 'small') {
        issues.push({
          severity: 'info',
          field: 'buttons',
          message: 'Small buttons may not meet minimum touch target size (44x44px)',
          suggestedFix: 'Ensure small buttons have adequate padding'
        });
      }
    });
  }

  return {
    valid: true, // Accessibility warnings don't block export
    issues
  };
}
```

### 3.3 Consistency Rules

```typescript
// Validate design token consistency
export function validateConsistency(ds: DesignSystem): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Rule 1: Spacing scale should be consistent (multiples of 4)
  const spacingResult = validateSpacingScale(ds.tokens.spacing);
  if (!spacingResult.valid) {
    issues.push(...spacingResult.issues);
  }

  // Rule 2: Typography scale should follow a ratio
  const typographyRatios = checkTypographyRatio(ds.tokens.typography.scale);
  if (typographyRatios.inconsistent) {
    issues.push({
      severity: 'info',
      field: 'typography.scale',
      message: 'Typography scale does not follow a consistent ratio',
      suggestedFix: 'Consider using a modular scale (e.g., 1.25, 1.333, 1.5)'
    });
  }

  // Rule 3: Color palette should have balanced distribution
  const colorBalance = checkColorBalance(ds.tokens.colors);
  if (!colorBalance.balanced) {
    issues.push({
      severity: 'info',
      field: 'colors',
      message: colorBalance.message,
      suggestedFix: 'Add more variety to your color palette'
    });
  }

  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    issues
  };
}

function checkTypographyRatio(scale: TypographyScale): { inconsistent: boolean } {
  const sizes = [
    parsePxValue(scale.xs),
    parsePxValue(scale.sm),
    parsePxValue(scale.base),
    parsePxValue(scale.lg),
    parsePxValue(scale.xl),
    parsePxValue(scale['2xl']),
    parsePxValue(scale['3xl']),
    parsePxValue(scale['4xl'])
  ].filter(v => v !== null) as number[];

  // Calculate ratios between consecutive sizes
  const ratios = sizes.slice(1).map((size, i) => size / sizes[i]);

  // Check if ratios are relatively consistent (within 10% variance)
  const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  const variance = ratios.reduce((sum, r) => sum + Math.abs(r - avgRatio), 0) / ratios.length;

  return {
    inconsistent: variance > 0.1
  };
}

function checkColorBalance(colors: ColorToken[]): { balanced: boolean; message: string } {
  const selectedColors = colors.filter(c => c.selected);

  if (selectedColors.length === 0) {
    return { balanced: true, message: '' };
  }

  // Count colors by group
  const groupCounts = selectedColors.reduce((acc, color) => {
    acc[color.group] = (acc[color.group] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const groups = Object.keys(groupCounts);

  // If all colors from same group, suggest diversity
  if (groups.length === 1) {
    return {
      balanced: false,
      message: 'All selected colors are from the same group. Consider adding variety.'
    };
  }

  // If very imbalanced (one group > 80%)
  const maxGroupCount = Math.max(...Object.values(groupCounts));
  if (maxGroupCount / selectedColors.length > 0.8) {
    return {
      balanced: false,
      message: 'Color selection is heavily skewed to one group'
    };
  }

  return { balanced: true, message: '' };
}
```

---

## 4. Runtime Validation Hooks

### 4.1 React Hook for Form Validation

```typescript
// src/hooks/useFormValidation.ts
import { useState, useCallback } from 'react';

interface UseFormValidationOptions<T> {
  initialValues: T;
  validate: (values: T) => Record<string, string>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useFormValidation<T>({
  initialValues,
  validate,
  onSubmit
}: UseFormValidationOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate on blur
    const fieldErrors = validate(values);
    if (fieldErrors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: fieldErrors[field as string] }));
    }
  }, [values, validate]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate all fields
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
}

// Usage example
function ColorEditorForm() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormValidation({
      initialValues: {
        name: '',
        hex: '',
        group: ''
      },
      validate: (values) => {
        const errors: Record<string, string> = {};

        if (!values.name) {
          errors.name = 'Color name is required';
        }

        const hexValidation = validateHexColor(values.hex);
        if (!hexValidation.valid) {
          errors.hex = hexValidation.error!;
        }

        if (!values.group) {
          errors.group = 'Color group is required';
        }

        return errors;
      },
      onSubmit: async (values) => {
        console.log('Submitting:', values);
        // API call or state update
      }
    });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
        />
        {touched.name && errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <input
          value={values.hex}
          onChange={(e) => handleChange('hex', e.target.value)}
          onBlur={() => handleBlur('hex')}
        />
        {touched.hex && errors.hex && <span>{errors.hex}</span>}
      </div>

      <button type="submit">Save Color</button>
    </form>
  );
}
```

### 4.2 Real-time Validation Hook

```typescript
// src/hooks/useRealtimeValidation.ts
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export function useRealtimeValidation<T>(
  value: T,
  validator: (value: T) => ValidationResult,
  delay = 500
) {
  const [validationResult, setValidationResult] = useState<ValidationResult>({ valid: true });
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    setIsValidating(true);

    const debouncedValidate = debounce(() => {
      const result = validator(value);
      setValidationResult(result);
      setIsValidating(false);
    }, delay);

    debouncedValidate();

    return () => {
      debouncedValidate.cancel();
    };
  }, [value, validator, delay]);

  return {
    ...validationResult,
    isValidating
  };
}

// Usage
function HexColorInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const validation = useRealtimeValidation(value, validateHexColor, 300);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={!validation.valid ? 'error' : ''}
      />
      {validation.isValidating && <span>Validating...</span>}
      {!validation.valid && <span className="error">{validation.error}</span>}
      {validation.valid && value && <span className="success">✓ Valid</span>}
    </div>
  );
}
```

---

## 5. Data Monitoring & Quality Dashboards

### 5.1 Quality Metrics Collection

```typescript
// src/utils/qualityMonitoring.ts

interface QualityMetricsSnapshot {
  timestamp: string;
  designSystemId: string;
  metrics: {
    completeness: number;
    accuracy: number;
    consistency: number;
    accessibility: number;
  };
  issueCount: {
    errors: number;
    warnings: number;
    info: number;
  };
}

export class QualityMonitor {
  private snapshots: QualityMetricsSnapshot[] = [];

  captureSnapshot(ds: DesignSystem): QualityMetricsSnapshot {
    const qualityScore = calculateQualityScore(ds);
    const accessibilityScore = validateAccessibility(ds);
    const consistencyScore = validateConsistency(ds);

    const snapshot: QualityMetricsSnapshot = {
      timestamp: new Date().toISOString(),
      designSystemId: ds._id,
      metrics: {
        completeness: qualityScore.completenessScore,
        accuracy: qualityScore.accuracyScore,
        consistency: qualityScore.consistencyScore,
        accessibility: this.calculateAccessibilityScore(accessibilityScore)
      },
      issueCount: {
        errors: qualityScore.issues.filter(i => i.severity === 'error').length,
        warnings: qualityScore.issues.filter(i => i.severity === 'warning').length,
        info: qualityScore.issues.filter(i => i.severity === 'info').length
      }
    };

    this.snapshots.push(snapshot);
    this.pruneOldSnapshots();

    return snapshot;
  }

  private calculateAccessibilityScore(result: ValidationResult): number {
    const totalIssues = result.issues.length;
    const criticalIssues = result.issues.filter(i => i.severity === 'error').length;

    if (totalIssues === 0) return 1.0;

    // Penalize more for critical issues
    const score = 1 - (criticalIssues * 0.2 + (totalIssues - criticalIssues) * 0.05);
    return Math.max(0, score);
  }

  private pruneOldSnapshots() {
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    const cutoff = new Date(Date.now() - maxAge).toISOString();

    this.snapshots = this.snapshots.filter(s => s.timestamp > cutoff);
  }

  getLatestSnapshot(designSystemId: string): QualityMetricsSnapshot | undefined {
    return this.snapshots
      .filter(s => s.designSystemId === designSystemId)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];
  }

  getMetricsTrend(designSystemId: string, days = 7): QualityMetricsSnapshot[] {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    return this.snapshots
      .filter(s => s.designSystemId === designSystemId && s.timestamp > cutoff)
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }
}

export const qualityMonitor = new QualityMonitor();
```

### 5.2 Quality Dashboard Component

```typescript
// src/components/QualityDashboard.tsx
import { useEffect, useState } from 'react';
import { qualityMonitor } from '../utils/qualityMonitoring';

export function QualityDashboard({ designSystem }: { designSystem: DesignSystem }) {
  const [snapshot, setSnapshot] = useState<QualityMetricsSnapshot | null>(null);
  const [trend, setTrend] = useState<QualityMetricsSnapshot[]>([]);

  useEffect(() => {
    // Capture current snapshot
    const current = qualityMonitor.captureSnapshot(designSystem);
    setSnapshot(current);

    // Get trend data
    const history = qualityMonitor.getMetricsTrend(designSystem._id, 7);
    setTrend(history);
  }, [designSystem]);

  if (!snapshot) return null;

  return (
    <div className="quality-dashboard">
      <h2>Data Quality Score</h2>

      <div className="metrics-grid">
        <MetricCard
          label="Completeness"
          value={snapshot.metrics.completeness}
          trend={getTrendForMetric(trend, 'completeness')}
        />
        <MetricCard
          label="Accuracy"
          value={snapshot.metrics.accuracy}
          trend={getTrendForMetric(trend, 'accuracy')}
        />
        <MetricCard
          label="Consistency"
          value={snapshot.metrics.consistency}
          trend={getTrendForMetric(trend, 'consistency')}
        />
        <MetricCard
          label="Accessibility"
          value={snapshot.metrics.accessibility}
          trend={getTrendForMetric(trend, 'accessibility')}
        />
      </div>

      <div className="issues-summary">
        <h3>Issues</h3>
        <div className="issue-counts">
          <span className="error-count">{snapshot.issueCount.errors} Errors</span>
          <span className="warning-count">{snapshot.issueCount.warnings} Warnings</span>
          <span className="info-count">{snapshot.issueCount.info} Info</span>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend }: {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
}) {
  const percentage = (value * 100).toFixed(0);
  const color = value >= 0.8 ? 'green' : value >= 0.6 ? 'yellow' : 'red';

  return (
    <div className={`metric-card ${color}`}>
      <span className="label">{label}</span>
      <span className="value">{percentage}%</span>
      <span className={`trend ${trend}`}>{getTrendIcon(trend)}</span>
    </div>
  );
}

function getTrendForMetric(
  trend: QualityMetricsSnapshot[],
  metric: keyof QualityMetricsSnapshot['metrics']
): 'up' | 'down' | 'stable' {
  if (trend.length < 2) return 'stable';

  const latest = trend[trend.length - 1].metrics[metric];
  const previous = trend[trend.length - 2].metrics[metric];

  const diff = latest - previous;

  if (diff > 0.05) return 'up';
  if (diff < -0.05) return 'down';
  return 'stable';
}

function getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
  return trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
}
```

---

## 6. Testing Strategy for Data Validation

### 6.1 Unit Tests

```typescript
// src/utils/__tests__/validation.test.ts
import { describe, it, expect } from 'vitest';
import { validateHexColor, validateContrast, validateFontSize } from '../validation';

describe('validateHexColor', () => {
  it('should accept valid 6-digit hex colors', () => {
    expect(validateHexColor('#FF453A').valid).toBe(true);
    expect(validateHexColor('#000000').valid).toBe(true);
    expect(validateHexColor('#FFFFFF').valid).toBe(true);
  });

  it('should accept valid 3-digit hex colors', () => {
    expect(validateHexColor('#FFF').valid).toBe(true);
    expect(validateHexColor('#000').valid).toBe(true);
  });

  it('should reject invalid formats', () => {
    expect(validateHexColor('FF453A').valid).toBe(false);      // Missing #
    expect(validateHexColor('#FF453').valid).toBe(false);      // 5 digits
    expect(validateHexColor('#GG0000').valid).toBe(false);     // Invalid chars
    expect(validateHexColor('').valid).toBe(false);            // Empty
  });

  it('should provide helpful error messages', () => {
    const result = validateHexColor('FF453A');
    expect(result.error).toContain('Invalid hex color format');
  });
});

describe('validateContrast', () => {
  it('should pass for sufficient contrast', () => {
    const result = validateContrast('#000000', '#FFFFFF', 'AA');
    expect(result.valid).toBe(true);
    expect(result.ratio).toBeGreaterThan(4.5);
  });

  it('should fail for insufficient contrast', () => {
    const result = validateContrast('#CCCCCC', '#FFFFFF', 'AA');
    expect(result.valid).toBe(false);
  });

  it('should have stricter rules for AAA', () => {
    const result = validateContrast('#767676', '#FFFFFF', 'AAA');
    expect(result.valid).toBe(false);
  });
});

describe('validateFontSize', () => {
  it('should accept valid rem values', () => {
    expect(validateFontSize('1rem').valid).toBe(true);
    expect(validateFontSize('1.5rem').valid).toBe(true);
  });

  it('should accept valid px values', () => {
    expect(validateFontSize('16px').valid).toBe(true);
    expect(validateFontSize('24px').valid).toBe(true);
  });

  it('should reject invalid units', () => {
    expect(validateFontSize('16pt').valid).toBe(false);
    expect(validateFontSize('1.5').valid).toBe(false);
  });

  it('should reject unreasonable sizes', () => {
    expect(validateFontSize('4px').valid).toBe(false);      // Too small
    expect(validateFontSize('200px').valid).toBe(false);    // Too large
  });
});
```

### 6.2 Integration Tests

```typescript
// src/utils/__tests__/validation.integration.test.ts
describe('Design System Validation (Integration)', () => {
  it('should validate complete design system', () => {
    const ds = createMockDesignSystem();
    const result = validateDesignSystemForExport(ds);

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('should catch missing required fields', () => {
    const ds = createMockDesignSystem();
    ds.metadata.name = '';

    const result = validateDesignSystemForExport(ds);

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual(
      expect.objectContaining({
        severity: 'error',
        field: 'metadata.name'
      })
    );
  });

  it('should validate accessibility across all colors', () => {
    const ds = createMockDesignSystem();
    ds.tokens.colors = [
      { id: 'c1', name: 'Light Gray', hex: '#EEEEEE', group: 'neutrals', selected: true }
    ];

    const result = validateAccessibility(ds);

    expect(result.issues).toContainEqual(
      expect.objectContaining({
        severity: 'warning',
        field: expect.stringContaining('colors.c1')
      })
    );
  });
});
```

---

## Summary

This document defines comprehensive data validation patterns for the Neoloop Design System Builder:

✅ **Input Validation**
- Color validation (Hex, RGB, HSL, Contrast)
- Typography validation (Size, Weight, Line Height)
- Spacing validation (4px grid consistency)
- SVG validation (Security-critical)

✅ **Business Rules**
- Export requirements
- Accessibility compliance (WCAG AA/AAA)
- Design consistency rules

✅ **Runtime Validation**
- React hooks for form validation
- Real-time validation with debouncing
- Error handling patterns

✅ **Quality Monitoring**
- Quality metrics collection
- Trend analysis
- Dashboard visualization

✅ **Testing**
- Unit tests for all validators
- Integration tests for complete workflows
- Security testing for SVG uploads

---

**Next Steps:**
1. Implement validation utilities in `src/utils/validation.ts`
2. Create validation hooks in `src/hooks/`
3. Add quality monitoring service
4. Write comprehensive test suite
5. Integrate validation into all forms

---

**Status:** ✅ Ready for Implementation
**Author:** Data Engineer Agent
**Date:** 2026-01-30
