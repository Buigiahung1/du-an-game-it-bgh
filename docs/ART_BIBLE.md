# CODE LEGACY: FROM ZERO TO LEGEND
## OFFICIAL ART BIBLE & VISUAL DESIGN GUIDE

**Art Direction:** Cinematic Realistic 3D  
**Target Mood:** Nostalgic, Authentic, Inspiring, High-Tech  
**Visual Influences:** *Life is Strange, Persona 5, Cyberpunk IT Workspaces, Modern University Campuses*  

---

## 1. ART DIRECTION PHILOSOPHY

CODE LEGACY rejects both hyper-simplistic low-poly mannequins and sterile corporate 2D dashboards. The game immerses the player in an authentic, physically plausible world where lighting tells a story: from the warm, golden-hour sunbeams of an imperfect student dorm to the sleek, glass-and-steel corridors of a global tech empire.

### Core Visual Principles:
1. **Humanity & Relatability:** The protagonist looks like a real student—not an idealized anime character or a robotic avatar. Imperfections (messy dorm, crumpled notes, scattered books) create warmth and emotional connection.
2. **PBR Material Fidelity:** Wood has visible grain and soft specular highlights; metals reflect surrounding light; mesh chairs exhibit translucency; and screens emit true ambient radiance into dark spaces.
3. **Cinematic Lighting & Shadow Play:** Every scene uses multi-tiered lighting (ambient fill, directional key light with soft shadow mapping, and localized colored emissive lights like under-bed amber LEDs and cyan battlestation neon).

---

## 2. CHARACTER DESIGN: PROTAGONIST (NAM)

- **Age & Physique:** 20 years old, 1.75m height, slender athletic student build.
- **Hair & Face:** Natural dark layered hair with soft side fringe (matching `ref_character_fullbody.jpg` & `ref_character_portrait.jpg`), thoughtful and determined expression, natural skin tone with subsurface scattering emulation.
- **Costume Breakdown:**
  - **Hoodie:** Heavyweight dark navy blue cotton hoodie (`#223652`) with relaxed fit, rolled sleeves, hanging hood fold behind neck, front kangaroo pouch, and black drawstrings tipped with polished aluminum aglets.
  - **Inner Shirt:** Light heather gray v-neck t-shirt (`#d4d4d8`) visible beneath the hoodie neck.
  - **Bag:** Olive-drab canvas messenger bag (`#556045`) worn cross-body from left shoulder to right hip, secured with a brass buckle and adjustable webbing strap.
  - **Pants:** Slim-fit charcoal black washed denim jeans (`#27272a`) with natural knee break and stitching.
  - **Footwear:** Low-top gray canvas sneakers (`#52525b`) with white vulcanized rubber foxing soles and toe caps.
  - **Accessories:** Black digital sports wrist watch on left wrist.

---

## 3. ENVIRONMENT DESIGN

### 3.1. Student Dorm Bedroom (12m² - Act I Workspace)
- **Floor:** Light oak herringbone parquet (`#c8b59e`), reflecting sunlight and screen glow.
- **Walls:** Dark slate blue accent wall (`#334155`) behind desk and bed; warm off-white plaster (`#eeeff2`) on side walls.
- **Battlestation Desk:**
  - Solid oak desktop with beveled edge and matte dark steel legs.
  - Dual curved panoramic monitors on gas-spring articulating arms (Left: Cyan IDE/Matrix, Right: Violet System Telemetry).
  - Extended micro-weave cloth mousepad and tenkeyless mechanical keyboard with cyan underglow.
  - Tempered glass desktop PC tower with glowing internal fan.
  - Aeron-style ergonomic high-back mesh chair with 5-star castor base.
- **Platform Bed & Atmosphere:**
  - Wooden platform bed with integrated storage drawers.
  - Under-bed warm amber LED ribbon (`#ffaa44`) casting soft indirect ambient light onto the parquet floor.
  - Navy blue duvet and soft white pillows.
  - **Polaroid Photo Wall:** 4x5 nostalgic photo grid on the wall above the bed depicting memories, friends, and milestones.
  - **Fairy String Lights:** Draped garland of warm glowing paper lanterns (`#ffbb44`) above the bed.
- **Student Props & Clutter:**
  - Acoustic wooden guitar (`#935116`) leaning against the wardrobe.
  - Dark blue woven geometric floor runner rug (`#243242`).
  - Vintage movie posters and tech motivational art on the walls.
  - Window with warm volumetric morning sunbeams and floating dust particles.

### 3.2. University Campus Promenade (Act I & II Exterior)
- **Walkway:** 50m granite flagstone boulevard (`#cfd4dc`) lined with manicured lawn borders.
- **Flora:** Majestic autumn maple and ginkgo trees with dense spherical foliage in golden amber, saffron yellow, and burnt orange (`#f59e0b`, `#d97706`, `#eab308`).
- **Architecture:** Modern university faculty buildings with architectural concrete columns, floor-to-ceiling reflective blue-tinted glass curtain walls (`#1e3a5f`), and an elevated connecting skybridge.
- **Lighting:** Crisp golden autumn sunlight casting long, soft shadows across the boulevard.

---

## 4. COLOR PALETTE SYSTEM

```
[ TECH & CODE EMISSIVES ]
Cyan Neon:       #00f0ff  (IDE Active, Primary HUD Highlights)
Sky Blue:        #38bdf8  (Skills, Focus Bars)
Electric Violet: #a855f7  (Mental Energy, System Telemetry)

[ DORM AMBIENCE & WARMTH ]
Amber LED:       #ffaa44  (Under-bed Glow, Warm Atmosphere)
Fairy Lantern:   #ffbb44  (String Lights Glow)
Parquet Oak:     #c8b59e  (Floor Reflection)
Slate Wall:      #334155  (Accent Wall)

[ AUTUMN CAMPUS NATURE ]
Ginkgo Gold:     #eab308  (Autumn Tree Canopy)
Amber Foliage:   #d97706  (Fallen Leaves & Branches)
Sky Horizon:     #bfe3f7  (Daylight Campus Fog)

[ UI GLASSMORPHISM & CHROMIUM ]
Glass Surface:   rgba(15, 23, 42, 0.85)  (Backdrop Blur 16px)
Border Stroke:   rgba(56, 189, 248, 0.35)
Success Mint:    #10b981
Alert Rose:      #f43f5e
```

---

## 5. REFERENCE ASSET MAPPING

All visual elements in the 3D world correspond directly to the user-uploaded reference photographs:
1. `ref_character_fullbody.jpg` ➔ Protagonist Nam model, navy hoodie, canvas bag, slim jeans, sneakers.
2. `ref_character_portrait.jpg` ➔ Facial hair, eye styling, and dialogue portrait illustration.
3. `ref_dorm_room_messy.jpg` ➔ Acoustic guitar, floor rug, wall posters, desk clutter, window daylight.
4. `ref_dorm_photo_wall.jpg` ➔ Polaroid photo memory wall & draped glowing lantern fairy lights.
5. `ref_campus_autumn_path.jpg` ➔ Third-person camera view behind walking student down autumn campus walkway.
6. `ref_campus_quad_modern.jpg` ➔ Glass university building facades, modern concrete pillars, and yellow trees.
7. `ref_office_penthouse_sunset.jpg` ➔ High-tier corporate office penthouse for late-game Tech Lead / Founder phases.

