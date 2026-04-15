# Design Brief

## Direction

Local Craft — a warm, transparent bike shop interface prioritizing service discovery and upfront pricing through editorial clarity and card-based composition.

## Tone

Warm professionalism with editorial clarity, organized and approachable but never corporate-sterile.

## Differentiation

Transparent, card-based service catalog with visible pricing hierarchy puts customer trust first; inviting cream tones + professional teal primary conveys both expertise and approachability.

## Color Palette

| Token      | OKLCH (L C H)      | Role                                  |
| ---------- | ------------------ | ------------------------------------- |
| background | 0.98 0.01 75       | Cream off-white, warm and inviting    |
| foreground | 0.18 0.025 50      | Deep brown-black, high contrast       |
| primary    | 0.42 0.14 240      | Deep teal, trustworthy and confident  |
| accent     | 0.68 0.16 70       | Warm gold, highlights craftsmanship   |
| muted      | 0.92 0.01 75       | Light cream, secondary surface        |
| card       | 0.995 0.005 75     | Pure cream, minimal separation        |

## Typography

- Display: Fraunces — editorial, craft-forward headings and hero text
- Body: DM Sans — clean, approachable, high readability for service descriptions and forms
- Mono: Geist Mono — technical pricing and booking details
- Scale: Hero `text-5xl md:text-6xl font-bold`, Section `text-3xl md:text-4xl font-bold`, Label `text-xs uppercase tracking-widest`, Body `text-base md:text-lg`

## Elevation & Depth

Minimal shadow hierarchy — subtle `shadow-sm` on cards with no border-top emphasis; depth through color contrast and layered card backgrounds, never through dramatic shadows.

## Structural Zones

| Zone    | Background        | Border              | Notes                                     |
| ------- | ----------------- | ------------------- | ----------------------------------------- |
| Header  | bg-secondary      | border-t border-b   | Cream bar with subtle border, navigation |
| Content | bg-background     | —                   | Alternating bg-card / bg-muted sections  |
| Services| bg-card/bg-muted  | border-border       | Lifted cards with `border-l` accent glow |
| Footer  | bg-muted          | border-t border     | Warm cream bar, contact info              |

## Spacing & Rhythm

Section gaps `py-12 md:py-16`, card groups `gap-6`, micro-spacing `gap-4`. Services catalog uses 3-column grid (mobile: 1, tablet: 2, desktop: 3); spacing creates visual breathing room while keeping focus on services.

## Component Patterns

- Buttons: Rounded-lg teal primary with white text, warm gold accent for secondary actions; hover state `opacity-90`
- Cards: Cream background `bg-card` with `border-border`, rounded-lg, subtle `shadow-sm`, no top-heavy styling
- Badges: Gold accents for new services, destructive red for cancellation states

## Motion

- Entrance: Fade-in on scroll, 300ms smooth transition
- Hover: Button opacity shift to 90%, card shadow lift `shadow-sm` → `shadow-md`
- Decorative: Minimal — smooth transitions only, no bouncing or drift animations

## Constraints

- Never use full-saturation colors; all accents are muted for editorial tone
- Keep border radius consistent at lg (0.625rem), avoid sharp corners
- Preserve whitespace and breathing room — information density comes through clear hierarchy, not compression
- Dark mode inverts L values, keeps hue and chroma stable (same teal/gold, darker backgrounds/lighter text)

## Signature Detail

Warm gold left-border accent on service cards creates a subtle craft-shop signature without visual clutter.

