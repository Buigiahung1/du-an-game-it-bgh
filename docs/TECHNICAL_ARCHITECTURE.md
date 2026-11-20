# CODE LEGACY: FROM ZERO TO LEGEND
## TECHNICAL ARCHITECTURE SPECIFICATION

**Target Platform:** PC Web (Cross-browser, Zero-CORS, Offline Double-Click Executable)  
**Graphics Engine:** Three.js WebGL (PCF Soft Shadows, ACES Filmic Tone Mapping)  
**Audio Architecture:** Web Audio API Procedural Sound Engine  
**UI Layer:** Tailwind CSS Glassmorphism + Vanilla JS DOM Controller  
**Bundle Strategy:** Standalone Single-File Topological Bundle (`bundle.js`)  

---

## 1. ARCHITECTURAL OVERVIEW

```
┌────────────────────────────────────────────────────────────────────────┐
│                              INDEX.HTML                                │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │   #game-canvas        │  │     RPG HUD & OVERLAY MODALS          │  │
│  │   (Fullscreen WebGL)  │  │   - Glassmorphism Stat Bars (HP, EN)  │  │
│  │   - Character3D       │  │   - Interaction Prompt [E]            │  │
│  │   - Bedroom3D Scene   │  │   - Cinematic Dialogue Modal (#dialog)│  │
│  │   - Campus3D Scene    │  │   - Battlestation IDE Modal (#chal)   │  │
│  │   - ThirdPersonCamera │  │   - 10-Chapter Command Center         │  │
│  └───────────┬───────────┘  └───────────────────┬───────────────────┘  │
│              │                                  │                      │
│              ▼                                  ▼                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     BUNDLE.JS (Universal IIFE)                   │  │
│  │   ┌─────────────────────┐      ┌───────────────────────────────┐ │  │
│  │   │   3D Engine Layer   │◄────►│      Core RPG Subsystems      │ │  │
│  │   │  - Game3D Loop      │      │  - State Store (Reactive Pub) │ │  │
│  │   │  - Character Cont.  │      │  - QuestEngine (10 Chapters)  │ │  │
│  │   │  - Scene Switcher   │      │  - SkillTree & Challenges     │ │  │
│  │   │  - Collision AABB   │      │  - Economy & Shop Inventory   │ │  │
│  │   │  - Procedural Audio │      │  - Career, Freelance, Startup │ │  │
│  │   └─────────────────────┘      └───────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. 3D WEBGL GRAPHICS SUBSYSTEM

### 2.1. Master Game Engine (`js/3d/game3d.js`)
- **Render Loop:** High-frequency `requestAnimationFrame` loop with variable delta time (`THREE.Clock`).
- **Post-Processing & Lighting:**
  - `ACESFilmicToneMapping` with exposure 1.15 for cinematic photographic contrast.
  - PCF Soft Shadow Mapping (`THREE.PCFSoftShadowMap`) on key directional lights.
  - Exponential fog (`THREE.FogExp2`) with dynamic day/night & indoor/outdoor color shift (Dorm: `#070b14`, Campus: `#e0f2fe`).
- **Scene Graph Management:**
  - Seamless dual-scene architecture: `Bedroom3D` and `Campus3D` live in the same Three.js world, dynamically toggling visibility, collision sets, and camera fog on doorway transitions.

### 2.2. Humanoid Character Controller (`js/3d/character.js`)
- **Procedural Skeleton:** Hierarchical limb tree (Pelvis ➔ Spine ➔ Chest ➔ Neck ➔ Head / Shoulders ➔ Elbows ➔ Wrists / Hips ➔ Knees ➔ Ankles).
- **Locomotion Animation Blending:**
  - **Idle:** Natural chest breathing, subtle arm swaying, and shoulder settling.
  - **Walking:** Sinusoidal leg stride with inverse arm swing and vertical hip bounce.
  - **Running (`Shift`):** Higher cadence stride, forward torso lean (-0.2 rad), and aggressive arm pumping.
  - **Sitting:** Smooth IK seating transition onto ergonomic chair or bed with hands placed over keyboard.
- **Rotation Physics:** Velocity-directed yaw smoothing using spherical lerp (`Math.sin`, `Math.cos`).

### 2.3. Third-Person Follow Camera (`js/3d/cameraController.js`)
- **Spring-Damper Lerp:** Camera follows character target with smooth dampening (`t = 0.08`), eliminating jitter.
- **Spherical Mouse Orbit:** Mouse horizontal delta drives `yaw` (0 to 2π), vertical delta drives `pitch` (-0.35 to 1.15 rad).
- **Collision Avoidance:** Camera raycasts against room bounds to prevent clipping through interior walls.

---

## 3. GAMEPLAY & STATE ARCHITECTURE

### 3.1. Single Source of Truth (`js/engine/state.js`)
- All persistent player state is held in an immutable-style JavaScript object (`state.data`):
  - `character`: name, title, level, exp, money, rep, avatar.
  - `stats`: health, energy, mentalHealth, focus, discipline, intelligence.
  - `skills`: 8 tech skill trees (C/C++, Python, JS, DSA, Git, SQL, Backend, AI/ML), each with 100 levels.
  - `activeQuests` & `completedQuests`: Master campaign progression tracking.
  - `equipped`: Hardware gear (laptop, keyboard, monitor, chair).
- **Reactive Pub/Sub:** Components subscribe via `state.subscribe((event, payload, data) => ...)`. Any state mutation automatically dispatches HUD re-renders and audio cues.

### 3.2. Quest Engine & Campaign Progression (`js/quests/questEngine.js`)
- Event-driven quest tracker supporting multiple validation rules:
  - `practice_or_challenge`: Counts coding sessions.
  - `skill_level`: Verifies minimum proficiency.
  - `challenge_id`: Matches specific algorithmic questions.
  - `complete_freelance`: Verifies client project delivery.
- Completing quests unlocks chained story chapters, awards currency, items, and updates NPC dialogue branches.

---

## 4. BUNDLING & ZERO-CORS EXECUTION

Modern Chromium browsers strictly enforce CORS when running scripts via the `file:///` protocol, blocking standard ES module imports (`import ... from '...'`).

To guarantee 100% friction-free playability for the user:
1. `tools/bundle.py` scans all 34 JavaScript modules in strict topological dependency order.
2. It strips all `import` and `export` statements and wraps the code in an isolated Immediate Invoked Function Expression (IIFE).
3. The resulting `bundle.js` is loaded cleanly via standard `<script src="bundle.js"></script>`.
4. The user simply double-clicks `CHƠI_GAME.bat` or `index.html` and plays immediately without needing to configure a local web server or install node modules.

