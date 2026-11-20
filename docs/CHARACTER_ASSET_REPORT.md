# CODE LEGACY: FROM ZERO TO LEGEND
## CHARACTER & ANIMATION ASSET REPORT

---

### 1. PROTAGONIST SPECIFICATION: NAM (NAM IT 20 TUỔI)

- **Source Code:** `js/3d/character.js` (Exported as `Character3D`).
- **Anatomy & Proportions:**
  - Total Height: 1.75m (Natural realistic Asian male student proportion).
  - Head/Body Ratio: 1:7.2 (Realistic anatomical standard, strictly avoiding chibi or stylized heads).
- **Material & Mesh Architecture:**
  - **Skin Material:** Physically based mesh standard material (`#ffdfd0`, roughness 0.65) with soft specular response.
  - **Hair Mesh:** Layered dark locks (`#18181b`, roughness 0.85) with frontal side bangs.
  - **Upper Body:** Deep navy blue cotton hoodie (`#223652`) with front kangaroo pouch, dropped shoulders, inner light gray v-neck shirt (`#d4d4d8`), hanging hood behind neck, and dual drawstrings tipped with polished aluminum aglets.
  - **Cross-Body Bag:** Olive canvas messenger pouch (`#556045`) hanging on the right hip with an adjustable diagonal chest strap and brass buckle (`#b45309`).
  - **Lower Body:** Slim dark washed denim jeans (`#27272a`) with natural knee joint articulation.
  - **Shoes:** Gray canvas sneakers (`#52525b`) with white vulcanized rubber foxing sole and toe caps.
  - **Accessories:** Digital sports wrist watch on left wrist.

---

### 2. ANIMATION STATE MACHINE & LOCOMOTION BLENDING

- **Idle State:**
  - Chest breathing expansion: sinusoidal scaling on Y/Z axes (`Math.sin(time * 2.0) * 0.02`).
  - Natural shoulder settling and subtle arm swing damping.
- **Walk State (Move Speed: 3.6 m/s):**
  - Leg stride cadence: `Math.sin(animTime * 7.0)` driving hip rotation (-0.45 to +0.45 rad) and knee bending (+0.55 rad on back-swing).
  - Inverse arm swing: opposite shoulder rotates synchronously with leg stride.
  - Subtle vertical pelvis bounce (0.04m amplitude).
- **Run State (`Shift` Key - Move Speed: 5.76 m/s):**
  - High cadence (`animTime * 11.0`), aggressive arm pumping (-0.75 to +0.75 rad), forward torso pitch lean (-0.18 rad).
- **Sit & Work State (Interaction at Desk or Bed):**
  - Character smoothly lowers onto chair pan, hips and knees bend 90 degrees (`-1.57 rad`), upper arms lower, elbows rest horizontally, hands move rhythmically over mechanical keyboard in typing animation (`Math.sin(animTime * 12.0)`).
