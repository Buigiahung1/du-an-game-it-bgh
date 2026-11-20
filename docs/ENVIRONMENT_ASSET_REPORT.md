# CODE LEGACY: FROM ZERO TO LEGEND
## ENVIRONMENT & AUDIO ASSET REPORT

---

### 1. ENVIRONMENT SPECIFICATION: DORMITORY ROOM (12M²)

- **Source Code:** `js/3d/bedroom.js` (Exported as `Bedroom3D`).
- **Dimensions:** 5.6m width x 5.2m depth x 3.0m height.
- **Architectural & Furniture Breakdown:**
  1. **Flooring:** Herringbone light oak parquet with subtle specularity and ambient reflection.
  2. **Accent Wall:** Dark slate blue plaster behind Battlestation desk and bed.
  3. **Battlestation Desk:** Heavy solid oak top (2.2m x 0.8m) on black steel legs, left drawer pedestal, desktop PC tower with glass window, mechanical keyboard with cyan backlighting, large micro-weave desk pad.
  4. **Dual Monitors:** Curved displays with independent gas-spring arms (Left: Cyan IDE/code screen; Right: Violet system telemetry/dashboard).
  5. **Aeron Chair:** Herman Miller Aeron-style high-back ergonomic mesh chair with gas lift cylinder, armrests, and 5-star castor base.
  6. **Platform Bed:** Solid oak platform bed with 3000K warm amber LED ribbon underglow (`#ffaa44`), navy blue duvet, and soft white pillow.
  7. **Polaroid Memory Wall:** 4x5 nostalgic polaroid photo grid pinned to the wall above the bed.
  8. **Fairy String Lights:** Garland of 7 glowing paper sphere lanterns with dynamic gentle pulse animation.
  9. **Acoustic Guitar:** Natural wooden acoustic guitar leaning against wardrobe with soundhole, neck, and headstock.
  10. **Window & Sunbeam Particles:** Large window frame with bright morning daylight and 80 volumetric dust motes gently drifting in the light cone.

---

### 2. ENVIRONMENT SPECIFICATION: UNIVERSITY CAMPUS PROMENADE

- **Source Code:** `js/3d/campus.js` (Exported as `Campus3D`).
- **Dimensions:** 20m width x 50m length.
- **Features:** Granite stone paved walkway flanked by manicured green lawns, 12 golden autumn maple/ginkgo trees with breeze-animated leaf canopies, Faculty of Computer Science building with glass curtain walls and concrete pillars, University Library building, connecting elevated skybridge, wooden campus benches, and autumn daylight sun.

---

### 3. AUDIO ENGINE SPECIFICATION

- **Source Code:** `js/engine/audio.js`.
- **Architecture:** Zero-dependency HTML5 Web Audio API `AudioContext`.
- **Sound Effects:**
  - `playKeypress()`: Short filtered noise impulse (0.015s) simulating mechanical keyboard switches and soft footstep thuds on wood floor.
  - `playClick()`: Sine oscillator sweep (800Hz ➔ 400Hz, 0.05s) for responsive UI interaction.
  - `playSuccess()`: Ascending two-tone arpeggio (C5 523Hz ➔ G5 784Hz) with gain decay on challenge pass and quest completion.
  - `playLevelUp()`: Harmonic major triad fanfare (C5 ➔ E5 ➔ G5 ➔ C6) celebrating character rank and level advancement.
