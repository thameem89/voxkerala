---
name: VoxKerala
colors:
  surface: '#111125'
  surface-dim: '#111125'
  surface-bright: '#37374d'
  surface-container-lowest: '#0c0c1f'
  surface-container-low: '#1a1a2e'
  surface-container: '#1e1e32'
  surface-container-high: '#28283d'
  surface-container-highest: '#333348'
  on-surface: '#e2e0fc'
  on-surface-variant: '#e1bfb9'
  inverse-surface: '#e2e0fc'
  inverse-on-surface: '#2f2e43'
  outline: '#a88a85'
  outline-variant: '#59413d'
  surface-tint: '#ffb4a9'
  primary: '#ffb4a9'
  on-primary: '#690001'
  primary-container: '#c0392b'
  on-primary-container: '#ffe5e1'
  inverse-primary: '#b02d21'
  secondary: '#f6be39'
  on-secondary: '#402d00'
  secondary-container: '#c59300'
  on-secondary-container: '#433000'
  tertiary: '#4ae183'
  on-tertiary: '#003919'
  tertiary-container: '#007a3e'
  on-tertiary-container: '#a2ffb8'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a9'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#8e130c'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#f6be39'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#6bfe9c'
  tertiary-fixed-dim: '#4ae183'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005228'
  background: '#111125'
  on-background: '#e2e0fc'
  surface-variant: '#333348'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-tabular:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max-width: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  grid-columns: '12'
---

## Brand & Style

The design system embodies a "Cinematic Newsroom" aesthetic, merging the high-stakes authority of a global financial dashboard with the rich, cultural soul of Kerala. The brand personality is authoritative, sophisticated, and deeply rooted in local heritage. It seeks to evoke the feeling of a premium broadcast event—weighty, urgent, and visually stunning.

The visual style is a blend of **Corporate Modern** and **Tactile Minimalism**. It utilizes the structured density of a Bloomberg-style information architecture but softens it with organic textures like handloom cotton weaves and cool stone finishes. Gold line dividers and Kerala-inspired motifs (lotus, elephant silhouettes) act as precision accents, ensuring the high-tech polling data feels grounded in a specific sense of place. The experience is unapologetically dark-mode, emphasizing a rich, nocturnal contrast that makes data visualizations "pop" with cinematic intensity.

## Colors

The palette is anchored by **Deep Kerala Red**, used sparingly for high-priority actions and brand signifiers. The primary background is a custom **Dark Charcoal**, tiered to provide depth without losing the "infinite" cinematic feel. 

**Ivory/Cream** is reserved for typography and high-contrast highlights, providing a more sophisticated alternative to pure white. **Gold** is used exclusively for structural elements (dividers, borders) and "winner" states, while **Banana Leaf Green** signifies growth, positive polling trends, and success. A supporting set of vibrant **Party Colors** is included to distinguish political entities within data visualizations, ensuring they remain distinct against the dark canvas while maintaining a cohesive saturation level.

## Typography

This design system employs a high-contrast typographic pairing. **Playfair Display** provides the editorial "voice"—authoritative and classic—used for headlines and major poll questions. It should be typeset with tight tracking for a modern, news-header feel.

**Manrope** handles all functional duties, including body copy, data points, and UI labels. Its geometric clarity ensures legibility at small sizes, crucial for the "dashboard" energy of the platform. For data-heavy sections, use the `data-tabular` and `label-caps` styles to create a clear hierarchy that feels organized and analytical.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop, centered on the screen to maintain a cinematic, widescreen focus. We utilize a 12-column grid with generous 24px gutters to allow the content to breathe, even when data density is high. 

On mobile, the layout shifts to a single-column flow with reduced margins (20px), prioritizing verticality and thumb-friendly interaction zones. Spacing follows a 4px base unit, with consistent 8px/16px/32px jumps to maintain a rhythmic, professional alignment. Large sections are separated by 0.5px Gold dividers rather than wide gaps, maintaining the "compact authority" of a dashboard.

## Elevation & Depth

In this dark-primary environment, depth is communicated through **Tonal Layers** and **Subtle Outlines** rather than heavy shadows. 

- **Surface 0:** The Canvas (#0F0F1A).
- **Surface 1:** Container backgrounds (#1A1A2E).
- **Surface 2:** Active or hovered states, slightly lighter.

To define boundaries, we use **Low-Contrast Outlines** in Ivory (at 10% opacity) or 1px Gold lines for featured content. A subtle **Stone Texture** overlay is applied to Surface 1 containers at 5% opacity to add a tactile, premium feel. Shadows, when used for modals, should be deep, diffused, and tinted with the primary charcoal color to avoid a "muddy" look.

## Shapes

The shape language is **Soft (0.25rem)**, leaning towards a sharper, more architectural aesthetic. This reinforces the authoritative, professional tone of a news dashboard. 

- **Cards & Primary Containers:** 4px (Soft) corner radius.
- **Input Fields & Buttons:** 4px (Soft) corner radius.
- **Tags/Status Pills:** 8px (Rounded-lg) to provide a visual break from the rigid grid.
- **Iconography:** Elements are contained within square bounds, using thin 1.5px strokes that echo the gold divider lines.

## Components

### Buttons & Controls
- **Primary Button:** Solid Deep Kerala Red with Ivory text. No gradient. 4px radius.
- **Secondary Button:** Ghost style with a 1px Gold border and Ivory text.
- **Poll Selection:** Large-format tiles with a 1px border that thickens and turns Gold upon selection.

### Information Displays
- **Poll Cards:** Use Surface 1 background with a 1px top border in Gold. Headline in Playfair Display.
- **Data Bars:** Thick, flat bars using Party Colors. The "winner" bar receives a subtle Gold outer glow.
- **Live Indicator:** A small, pulsing Kerala Red dot paired with `label-caps` typography in Ivory.

### Forms & Inputs
- **Input Fields:** Dark Charcoal background with an Ivory bottom-border only (0.5px) to mimic high-end stationery or architectural drawings.

### Kerala Motifs
- **Iconography:** Use custom-drawn, minimalist icons for "Lotus" (Filter), "Elephant" (Strength/Analytics), and "Oil Lamp" (Trending/Hot Topics). These should always be rendered in Gold or Ivory.