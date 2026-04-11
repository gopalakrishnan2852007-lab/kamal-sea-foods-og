# Design System Specification: High-End Editorial Seafood Retail

## 1. Overview & Creative North Star: "The Pristine Curator"
This design system moves beyond the generic "e-commerce template" to create a digital experience that feels like a high-end editorial magazine or a luxury boutique. The North Star for this system is **"The Pristine Curator"**. 

We achieve this by embracing **white space as a luxury commodity**. Instead of crowding the interface with data, we use intentional asymmetry and a "bento-box" layout philosophy to spotlight the product as art. We replace rigid structural lines with tonal depth, creating an interface that feels organic, breathable, and authoritative.

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in the cool, muted tones of the Atlantic, utilizing a sophisticated range of greys and deep charcoals to convey trust and premium quality.

### Color Tokens
- **Primary (`#4D6169`):** Deep Slate Blue. Used for core brand moments and high-intent CTAs.
- **Surface (`#F9F9F9`):** The canvas. This off-white base prevents eye strain and feels more premium than pure hex white.
- **On-Surface (`#2D3435`):** Charcoal. Used for primary headers to ensure maximum readability and authority.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off content. Traditional borders create visual noise that cheapens the brand. Instead:
- **Background Shifts:** Use `surface-container-low` (`#F2F4F4`) to define a section against the `surface` background.
- **Tonal Nesting:** Create depth by placing a `surface-container-lowest` (`#FFFFFF`) card on top of a `surface-container` (`#EBEEEF`) section. 

### The "Glass & Gradient" Rule
To add "soul" to the minimalist aesthetic:
- **Glassmorphism:** Use semi-transparent `surface` colors with a `20px` backdrop-blur for floating navigation bars or filter overlays.
- **Signature Gradients:** Apply a subtle linear gradient (from `primary` to `primary-dim`) on primary buttons to give them a soft, tactile volume that flat colors lack.

## 3. Typography: The Editorial Voice
We use **Inter** exclusively to maintain a professional, Swiss-style precision. The hierarchy is designed to feel like a premium broadsheet.

- **Display (L/M/S):** Used for hero headers. Set with tight letter-spacing (-0.02em) to feel impactful and "locked in."
- **Headline (L/M):** Used for bento grid category titles. Bold weight, high contrast against the background.
- **Body (LG/MD):** The workhorse. `Body-LG` (16px) is our standard for product descriptions to ensure a premium, readable feel.
- **Label (MD/SM):** All-caps with increased letter-spacing (+0.05em) used for "Freshness Indicators" or "Sourcing Origins."

## 4. Elevation & Depth: Tonal Layering
We avoid "drop shadows" that look like 2010-era software. We use **Ambient Shadows** and **Tonal Stacking**.

### The Layering Principle
Hierarchy is defined by "stacking" the surface tiers.
1. **Base:** `surface` (#F9F9F9)
2. **Structural Sections:** `surface-container-low` (#F2F4F4)
3. **Interactive Cards:** `surface-container-lowest` (#FFFFFF)

### Ambient Shadows
When a card requires a "lift" (e.g., on hover), use an extra-diffused shadow:
- **Shadow:** `0px 12px 32px rgba(45, 52, 53, 0.04)`
- This 4% opacity shadow uses the `on-surface` color, mimicking how light actually hits a physical object in a bright room.

### The "Ghost Border" Fallback
If a boundary is required for accessibility (e.g., in a high-glare environment), use the `outline-variant` token at **15% opacity**. It should be felt, not seen.

## 5. Components: Functional Minimalism

### Bento Grid Cards
- **Radius:** Fixed at `16px` (`xl` token).
- **Styling:** No borders. Use `surface-container-lowest` background. 
- **Interaction:** On hover, the card should lift slightly using an Ambient Shadow and scale to 101%.

### Buttons
- **Primary:** Background `primary`, text `on-primary`. 16px rounded corners.
- **Secondary:** Background `secondary-container`, text `on-secondary-container`. No border.
- **Tertiary (Ghost):** No background. Text is `primary`. Used for "Learn More" editorial links.

### Input Fields
- **Default State:** `surface-container-high` background. No border.
- **Focus State:** 1px "Ghost Border" using `primary` color at 40% opacity.
- **Floating Labels:** Use `label-md` in `on-surface-variant` for a clean, architectural look.

### Product Lists & Chips
- **Dividers:** Forbidden. Use `24px` or `32px` of vertical white space to separate items.
- **Chips:** Used for "Sustainably Sourced" or "Wild Caught" badges. Use `secondary-container` with `on-secondary-container` text.

## 6. Do’s and Don’ts

### Do:
- **Embrace Asymmetry:** In the bento grid, let some cards span two columns while others span one. This creates an "editorial" rhythm.
- **Use High-Quality Imagery:** The system relies on photography with high "white-balance." Products should look fresh and brightly lit.
- **Respect the Breathing Room:** If you think a section needs more padding, add 8px more.

### Don't:
- **Don't Use Pure Black:** Never use `#000000`. Use `on-surface` (`#2D3435`) to keep the "High-End" softness.
- **Don't Use Hard Edges:** Avoid 0px or 4px corners. Stay consistent with the `16px` (`xl`) radius to maintain the "Modern & Trustworthy" feel.
- **Don't Crowd the UI:** Avoid "Sale" banners that use high-vibrancy reds. Use the `error` token (`#9F403D`) sparingly and elegantly.