// 3D Bedroom Environment for CODE LEGACY
// Matches Reference Images: Cozy Modern Student Bedroom, Battlestation Desk, Under-LED Bed,
// Polaroid Photo Wall with Fairy Lights, Acoustic Guitar, Floor Rug, Movie Posters, and Sunbeam Dust Particles.

import { TextureGenerator } from './textureGenerator.js';

export class Bedroom3D {
  constructor(scene) {
    this.scene = scene;
    this.roomGroup = new THREE.Group();
    this.roomGroup.name = "BedroomEnvironment";

    // Collision Boundaries (Bounding boxes for walls & furniture)
    this.collisionBoxes = [];

    // Interactive Trigger Zones
    this.triggers = [];

    // Emissive materials and particle system for animation
    this.screenMaterials = [];
    this.fairyLights = [];
    this.dustParticles = null;

    this.buildRoom();
    this.scene.add(this.roomGroup);
  }

  buildRoom() {
    // Dimensions: 5.6m width (X: -2.8 to 2.8), 5.2m depth (Z: -2.6 to 2.6), 3.0m height
    const roomW = 5.6;
    const roomD = 5.2;
    const roomH = 3.0;

    // === MATERIALS WITH HIGH-DEFINITION PROCEDURAL PBR TEXTURES ===
    // Light Oak Parquet Floor (Staggered Planks & Grain)
    const floorMat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createParquetFloor(),
      roughness: 0.35,
      metalness: 0.05
    });

    // Dark Slate Accent Wall (Masonry stone texture & mortar)
    const slateWallMat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createSlateWall(),
      roughness: 0.65,
      metalness: 0.05
    });

    // Warm Off-White Wall
    const whiteWallMat = new THREE.MeshStandardMaterial({
      color: 0xeeeff2,
      roughness: 0.9
    });

    // Warm Oak Wood (for shelves, desk top, bed base)
    const oakMat = new THREE.MeshStandardMaterial({
      color: 0x9a7b56,
      roughness: 0.55
    });

    // Matt Dark Gray (for cabinets, frames)
    const cabinetMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6
    });

    // 1. FLOOR
    const floorGeo = new THREE.PlaneGeometry(roomW, roomD);
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.roomGroup.add(floor);

    // 2. CEILING
    const ceilingGeo = new THREE.PlaneGeometry(roomW, roomD);
    const ceiling = new THREE.Mesh(ceilingGeo, whiteWallMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = roomH;
    this.roomGroup.add(ceiling);

    // Ceiling Recessed Light Panel
    const lightPanelGeo = new THREE.BoxGeometry(1.6, 0.04, 1.2);
    const lightPanelMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfff3e0,
      emissiveIntensity: 0.85
    });
    const lightPanel = new THREE.Mesh(lightPanelGeo, lightPanelMat);
    lightPanel.position.set(0, roomH - 0.02, 0);
    this.roomGroup.add(lightPanel);

    // Ceiling Ambient Light Source
    const ceilingPointLight = new THREE.PointLight(0xffeedd, 1.6, 8.5);
    ceilingPointLight.position.set(0, roomH - 0.2, 0);
    ceilingPointLight.castShadow = true;
    ceilingPointLight.shadow.mapSize.width = 1024;
    ceilingPointLight.shadow.mapSize.height = 1024;
    ceilingPointLight.shadow.bias = -0.002;
    this.roomGroup.add(ceilingPointLight);

    // 3. WALLS
    // Back Wall (Z = -roomD/2 = -2.6) - Slate Accent Wall with Window
    const backWallLeft = new THREE.Mesh(new THREE.BoxGeometry(3.0, roomH, 0.1), slateWallMat);
    backWallLeft.position.set(-1.3, roomH / 2, -roomD / 2);
    backWallLeft.receiveShadow = true;
    this.roomGroup.add(backWallLeft);

    const backWallRight = new THREE.Mesh(new THREE.BoxGeometry(1.2, roomH, 0.1), slateWallMat);
    backWallRight.position.set(2.2, roomH / 2, -roomD / 2);
    backWallRight.receiveShadow = true;
    this.roomGroup.add(backWallRight);

    // Window (between back walls, from X = 0.2 to 1.6, Y = 1.0 to 2.4)
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.12), whiteWallMat);
    windowFrame.position.set(1.0, 1.7, -roomD / 2);
    this.roomGroup.add(windowFrame);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x88bbdd,
      emissive: 0xddeeff,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      transparent: true,
      opacity: 0.75
    });
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 1.25), glassMat);
    glass.position.set(1.0, 1.7, -roomD / 2 + 0.04);
    this.roomGroup.add(glass);

    // Sunlight streaming through window
    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.5);
    sunLight.position.set(2.0, 4.0, -5.0);
    sunLight.target.position.set(0, 0.5, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    this.roomGroup.add(sunLight);
    this.roomGroup.add(sunLight.target);

    // Left Wall (X = -roomW/2 = -2.8) - Behind Desk
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, roomH, roomD), slateWallMat);
    leftWall.position.set(-roomW / 2, roomH / 2, 0);
    leftWall.receiveShadow = true;
    this.roomGroup.add(leftWall);

    // Right Wall (X = roomW/2 = 2.8) - Wardrobe side
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, roomH, roomD), whiteWallMat);
    rightWall.position.set(roomW / 2, roomH / 2, 0);
    rightWall.receiveShadow = true;
    this.roomGroup.add(rightWall);

    // Front Wall (Z = roomD/2 = 2.6) with Doorway
    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(2.0, roomH, 0.1), whiteWallMat);
    frontWallLeft.position.set(-1.8, roomH / 2, roomD / 2);
    this.roomGroup.add(frontWallLeft);

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(2.4, roomH, 0.1), whiteWallMat);
    frontWallRight.position.set(1.6, roomH / 2, roomD / 2);
    this.roomGroup.add(frontWallRight);

    // Door Frame (from X = -0.8 to 0.4)
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.12), cabinetMat);
    doorFrame.position.set(-0.2, 1.1, roomD / 2);
    this.roomGroup.add(doorFrame);

    // Wooden Door Panel
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.6 });
    const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.15, 0.05), doorMat);
    doorPanel.position.set(-0.2, 1.08, roomD / 2 - 0.02);
    this.roomGroup.add(doorPanel);

    // Outer Walls Collision
    this.collisionBoxes.push(
      { minX: -roomW / 2 - 0.2, maxX: -roomW / 2 + 0.1, minZ: -roomD / 2, maxZ: roomD / 2 }, // Left
      { minX: roomW / 2 - 0.1, maxX: roomW / 2 + 0.2, minZ: -roomD / 2, maxZ: roomD / 2 },  // Right
      { minX: -roomW / 2, maxX: roomW / 2, minZ: -roomD / 2 - 0.2, maxZ: -roomD / 2 + 0.1 }, // Back
      { minX: -roomW / 2, maxX: roomW / 2, minZ: roomD / 2 - 0.1, maxZ: roomD / 2 + 0.3 }   // Front
    );

    // 4. FURNITURE: BATTLESTATION DESK SETUP
    this.buildBattlestation(oakMat, cabinetMat);

    // 5. FURNITURE: PLATFORM BED WITH UNDER-BED AMBER LED
    this.buildPlatformBed(oakMat, cabinetMat);

    // 6. FURNITURE: WARDROBE & STORAGE CABINETS
    this.buildWardrobe(cabinetMat, oakMat);

    // 7. POLAROID PHOTO WALL & WARM FAIRY STRING LIGHTS (Reference Image 4)
    this.buildPhotoWallAndFairyLights();

    // 8. ACOUSTIC GUITAR (Reference Image 3)
    this.buildAcousticGuitar();

    // 9. COZY FLOOR RUG (Reference Image 3)
    this.buildFloorRug();

    // 10. MOVIE & TECH POSTERS (Reference Image 3)
    this.buildWallPosters();

    // 11. WINDOW SUNBEAM DUST PARTICLES
    this.buildDustParticles();

    // 12. SETUP INTERACTIVE TRIGGERS
    this.setupTriggers();
  }

  buildBattlestation(oakMat, cabinetMat) {
    const deskGroup = new THREE.Group();
    deskGroup.position.set(-1.7, 0, -1.2);

    // Desk Top (Length 2.2m, Width 0.8m, Height 0.74m)
    const topGeo = new THREE.BoxGeometry(2.2, 0.05, 0.8);
    const topMesh = new THREE.Mesh(topGeo, oakMat);
    topMesh.position.set(0, 0.74, 0);
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    deskGroup.add(topMesh);

    // Desk Drawers Unit (on the left side of desk)
    const drawerGeo = new THREE.BoxGeometry(0.55, 0.70, 0.75);
    const drawerMesh = new THREE.Mesh(drawerGeo, cabinetMat);
    drawerMesh.position.set(-0.8, 0.35, 0);
    drawerMesh.castShadow = true;
    deskGroup.add(drawerMesh);

    // Metal Frame Legs
    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.72, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
    const legR1 = new THREE.Mesh(legGeo, legMat);
    legR1.position.set(0.95, 0.36, -0.32);
    const legR2 = new THREE.Mesh(legGeo, legMat);
    legR2.position.set(0.95, 0.36, 0.32);
    deskGroup.add(legR1);
    deskGroup.add(legR2);

    // Overhead Floating Wall Cabinets & LED Light Bar
    const wallCabGeo = new THREE.BoxGeometry(2.2, 0.45, 0.35);
    const wallCab = new THREE.Mesh(wallCabGeo, cabinetMat);
    wallCab.position.set(0, 2.2, -0.22);
    wallCab.castShadow = true;
    deskGroup.add(wallCab);

    // Cyan LED Light Bar under cabinet
    const ledBarGeo = new THREE.BoxGeometry(2.0, 0.02, 0.02);
    const ledBarMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.5
    });
    const ledBar = new THREE.Mesh(ledBarGeo, ledBarMat);
    ledBar.position.set(0, 1.95, -0.22);
    deskGroup.add(ledBar);

    // Ambient Cyan Glow from Desk LED
    const deskLedLight = new THREE.PointLight(0x00f0ff, 1.2, 2.5);
    deskLedLight.position.set(0, 1.9, -0.15);
    deskGroup.add(deskLedLight);

    // DUAL MONITORS (Left: Cyan Matrix/IDE, Right: Violet System Dashboard)
    [-0.38, 0.38].forEach((xOffset, idx) => {
      // Monitor Stand Arm
      const armGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8);
      const arm = new THREE.Mesh(armGeo, legMat);
      arm.position.set(xOffset * 0.4, 0.92, -0.25);
      deskGroup.add(arm);

      // Screen Frame
      const frameGeo = new THREE.BoxGeometry(0.68, 0.42, 0.03);
      const frame = new THREE.Mesh(frameGeo, legMat);
      frame.position.set(xOffset, 1.15, -0.2);
      frame.rotation.y = idx === 0 ? 0.12 : -0.12;
      frame.castShadow = true;
      deskGroup.add(frame);

      // Glowing Display with High-Res Real Code / Telemetry
      const screenGeo = new THREE.PlaneGeometry(0.64, 0.38);
      const screenTex = idx === 0 ? TextureGenerator.createIDEScreen() : TextureGenerator.createTelemetryScreen();
      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTex,
        emissive: idx === 0 ? 0x00f0ff : 0xa855f7,
        emissiveIntensity: 0.38,
        roughness: 0.2
      });
      this.screenMaterials.push(screenMat);
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(xOffset, 1.15, -0.183);
      screen.rotation.y = idx === 0 ? 0.12 : -0.12;
      deskGroup.add(screen);
    });

    // RGB Mechanical Keyboard & Mouse
    const kbGeo = new THREE.BoxGeometry(0.46, 0.015, 0.16);
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.25,
      roughness: 0.3
    });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.position.set(0, 0.77, 0.08);
    deskGroup.add(kb);

    const mouseGeo = new THREE.BoxGeometry(0.07, 0.025, 0.11);
    const mouse = new THREE.Mesh(mouseGeo, legMat);
    mouse.position.set(0.36, 0.77, 0.08);
    deskGroup.add(mouse);

    // Large Extended Mousepad
    const padGeo = new THREE.BoxGeometry(0.9, 0.005, 0.35);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.8 });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(0.12, 0.765, 0.08);
    deskGroup.add(pad);

    // Desktop PC Tower (Glass side panel with glowing fan)
    const pcGeo = new THREE.BoxGeometry(0.24, 0.45, 0.48);
    const pcMat = new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.6 });
    const pc = new THREE.Mesh(pcGeo, pcMat);
    pc.position.set(-0.85, 0.98, -0.05);
    pc.castShadow = true;
    deskGroup.add(pc);

    // Desk Clutter: Ceramic Coffee Mug
    const mugGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.09, 12);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(0.65, 0.81, 0.1);
    mug.castShadow = true;
    deskGroup.add(mug);

    // Sticky Notes on Desk
    const stickyGeo = new THREE.PlaneGeometry(0.08, 0.08);
    const stickyMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.9 });
    const sticky = new THREE.Mesh(stickyGeo, stickyMat);
    sticky.rotation.x = -Math.PI / 2;
    sticky.position.set(-0.4, 0.77, 0.25);
    deskGroup.add(sticky);

    // ERGONOMIC CHAIR (Herman Miller Aeron Style)
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0, 0.65);

    const baseCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 8), legMat);
    baseCenter.position.y = 0.1;
    chairGroup.add(baseCenter);

    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), legMat);
    cylinder.position.y = 0.28;
    chairGroup.add(cylinder);

    const seatMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.46), seatMat);
    seat.position.y = 0.46;
    seat.castShadow = true;
    chairGroup.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.55, 0.04), seatMat);
    back.position.set(0, 0.75, 0.20);
    back.rotation.x = -0.15;
    back.castShadow = true;
    chairGroup.add(back);

    [-0.25, 0.25].forEach(x => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.22), legMat);
      arm.position.set(x, 0.58, 0.05);
      chairGroup.add(arm);
    });

    deskGroup.add(chairGroup);
    this.roomGroup.add(deskGroup);

    // Desk Collision Box
    this.collisionBoxes.push({
      minX: -2.8,
      maxX: -0.6,
      minZ: -1.7,
      maxZ: -0.7
    });
  }

  buildPlatformBed(oakMat, cabinetMat) {
    const bedGroup = new THREE.Group();
    bedGroup.position.set(1.0, 0, -1.5);

    // Platform Base
    const baseGeo = new THREE.BoxGeometry(1.3, 0.45, 2.1);
    const base = new THREE.Mesh(baseGeo, oakMat);
    base.position.set(0, 0.225, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    bedGroup.add(base);

    // Under-bed Amber Warm LED Strip
    const ledStripGeo = new THREE.BoxGeometry(1.2, 0.02, 2.0);
    const ledStripMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      emissive: 0xffaa44,
      emissiveIntensity: 1.6
    });
    const ledStrip = new THREE.Mesh(ledStripGeo, ledStripMat);
    ledStrip.position.set(0, 0.04, 0);
    bedGroup.add(ledStrip);

    const underBedLight = new THREE.PointLight(0xffaa44, 1.4, 2.0);
    underBedLight.position.set(0, 0.15, 0.2);
    bedGroup.add(underBedLight);

    // Mattress
    const mattressGeo = new THREE.BoxGeometry(1.2, 0.22, 2.0);
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.set(0, 0.55, 0);
    bedGroup.add(mattress);

    // Navy Blue Duvet Blanket
    const duvetGeo = new THREE.BoxGeometry(1.22, 0.12, 1.4);
    const duvetMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75 });
    const duvet = new THREE.Mesh(duvetGeo, duvetMat);
    duvet.position.set(0, 0.66, 0.28);
    duvet.castShadow = true;
    bedGroup.add(duvet);

    // Soft Pillow
    const pillowGeo = new THREE.BoxGeometry(0.7, 0.12, 0.42);
    const pillow = new THREE.Mesh(pillowGeo, mattressMat);
    pillow.position.set(0, 0.68, -0.72);
    pillow.rotation.x = 0.1;
    bedGroup.add(pillow);

    this.roomGroup.add(bedGroup);

    // Bed Collision Box
    this.collisionBoxes.push({
      minX: 0.3,
      maxX: 1.7,
      minZ: -2.6,
      maxZ: -0.4
    });
  }

  buildWardrobe(cabinetMat, oakMat) {
    // Tall Wardrobe on right corner
    const wardrobeGeo = new THREE.BoxGeometry(0.65, 2.7, 2.0);
    const wardrobe = new THREE.Mesh(wardrobeGeo, cabinetMat);
    wardrobe.position.set(2.4, 1.35, 1.4);
    wardrobe.castShadow = true;
    this.roomGroup.add(wardrobe);

    // Floating Bookshelves on the back wall
    const shelfGeo = new THREE.BoxGeometry(1.2, 0.04, 0.25);
    [1.6, 2.0, 2.4].forEach(yPos => {
      const shelf = new THREE.Mesh(shelfGeo, oakMat);
      shelf.position.set(0.0, yPos, -2.4);
      shelf.castShadow = true;
      this.roomGroup.add(shelf);
    });

    // Wardrobe Collision
    this.collisionBoxes.push({
      minX: 2.0,
      maxX: 2.8,
      minZ: 0.3,
      maxZ: 2.5
    });
  }

  buildPhotoWallAndFairyLights() {
    // Reference Image 4: Polaroid Photo Wall with String Lantern Fairy Lights
    const photoGroup = new THREE.Group();
    photoGroup.position.set(0.9, 1.8, -2.53);

    // 1. Polaroid Photos Grid (4 rows x 5 columns)
    const cardGeo = new THREE.PlaneGeometry(0.16, 0.20);
    const colors = [0xfef08a, 0xfce7f3, 0xe0e7ff, 0xdcfce7, 0xf3f4f6, 0xffedd5];

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        const mat = new THREE.MeshStandardMaterial({
          color: colors[(r * 5 + c) % colors.length],
          roughness: 0.8
        });
        const card = new THREE.Mesh(cardGeo, mat);
        card.position.set((c - 2) * 0.22, (r - 1.5) * 0.24, 0);
        card.rotation.z = (Math.sin(r * 3 + c * 5) * 0.08); // slight natural tilt
        photoGroup.add(card);
      }
    }

    // 2. Fairy String Lights with Glowing Spheres
    const lanternGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xfff4cc,
      emissive: 0xffbb44,
      emissiveIntensity: 1.8,
      roughness: 0.3
    });

    for (let i = 0; i < 7; i++) {
      const lantern = new THREE.Mesh(lanternGeo, lanternMat);
      // Draped catenary curve: Y dips in the center
      const t = (i / 6.0) * 2.0 - 1.0;
      const x = t * 0.55;
      const y = 0.55 - (1.0 - t * t) * 0.15;
      lantern.position.set(x, y, 0.05);
      photoGroup.add(lantern);
      this.fairyLights.push(lantern);
    }

    // Warm Ambient Light from the fairy garland
    const fairyPointLight = new THREE.PointLight(0xffbb55, 1.1, 2.5);
    fairyPointLight.position.set(0, 0.4, 0.1);
    photoGroup.add(fairyPointLight);

    this.roomGroup.add(photoGroup);
  }

  buildAcousticGuitar() {
    // Reference Image 3: Acoustic Wooden Guitar leaning beside wardrobe
    const guitarGroup = new THREE.Group();
    guitarGroup.position.set(1.95, 0, 0.15);
    guitarGroup.rotation.y = -Math.PI * 0.25;
    guitarGroup.rotation.z = 0.18; // leaning against wall

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x935116,
      roughness: 0.4,
      metalness: 0.1
    });

    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: 0x3e2723,
      roughness: 0.6
    });

    // Lower Bout (Body)
    const bodyLow = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16), woodMat);
    bodyLow.rotation.x = Math.PI / 2;
    bodyLow.position.set(0, 0.22, 0);
    guitarGroup.add(bodyLow);

    // Upper Bout
    const bodyUp = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16), woodMat);
    bodyUp.rotation.x = Math.PI / 2;
    bodyUp.position.set(0, 0.42, 0);
    guitarGroup.add(bodyUp);

    // Soundhole (Black circle on body)
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.05, 16), holeMat);
    hole.position.set(0, 0.38, 0.042);
    guitarGroup.add(hole);

    // Neck
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.52, 0.03), darkWoodMat);
    neck.position.set(0, 0.72, 0);
    guitarGroup.add(neck);

    // Headstock
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.035), woodMat);
    head.position.set(0, 1.02, 0);
    guitarGroup.add(head);

    this.roomGroup.add(guitarGroup);
  }

  buildFloorRug() {
    // Reference Image 3: Moroccan Woven Rug in front of desk & bed
    const rugGeo = new THREE.PlaneGeometry(1.8, 2.2);
    const rugMat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createWovenRug(),
      roughness: 0.85,
      metalness: 0.0
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(-0.2, 0.005, 0.2);
    rug.receiveShadow = true;
    this.roomGroup.add(rug);
  }

  buildWallPosters() {
    // Reference Image 3: Detailed Tech Artwork & Movie Posters
    // Left Wall Poster ("NEO TOKYO // CYBER MATRIX")
    const poster1Geo = new THREE.PlaneGeometry(0.7, 1.05);
    const poster1Mat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createPoster("NEO CYBER", "MATRIX REVOLUTION // 2026", "#a855f7"),
      roughness: 0.4
    });
    const poster1 = new THREE.Mesh(poster1Geo, poster1Mat);
    poster1.position.set(-2.74, 1.8, 0.8);
    poster1.rotation.y = Math.PI / 2;
    this.roomGroup.add(poster1);

    // Back Wall Poster ("CODE LEGACY: FROM ZERO TO LEGEND")
    const poster2Geo = new THREE.PlaneGeometry(0.85, 0.60);
    const poster2Mat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createPoster("ZERO TO LEGEND", "THE AWAKENING", "#00f0ff"),
      roughness: 0.4
    });
    const poster2 = new THREE.Mesh(poster2Geo, poster2Mat);
    poster2.position.set(-0.3, 2.2, -2.54);
    this.roomGroup.add(poster2);
  }

  buildDustParticles() {
    // Volumetric dust motes streaming from the window in golden hour light
    const particleCount = 80;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Clustered inside the sunlight volume from window
      positions[i] = 0.2 + (Math.random() - 0.5) * 1.8;
      positions[i + 1] = 0.8 + Math.random() * 1.8;
      positions[i + 2] = -1.8 + Math.random() * 2.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffeedd,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.dustParticles = new THREE.Points(geometry, material);
    this.roomGroup.add(this.dustParticles);
  }

  setupTriggers() {
    // 1. PC Battlestation Trigger
    this.triggers.push({
      id: "pc_desk",
      name: "Máy tính Battlestation",
      prompt: "[ E ] Sử Dụng Máy Tính (Học Code & Thử Thách)",
      position: new THREE.Vector3(-1.7, 0, -0.6),
      radius: 1.3,
      action: "open_pc"
    });

    // 2. Bed Trigger (Sleep)
    this.triggers.push({
      id: "bed_sleep",
      name: "Giường ngủ",
      prompt: "[ E ] Đi Ngủ (Hồi phục 100% Năng Lượng)",
      position: new THREE.Vector3(0.6, 0, -1.0),
      radius: 1.4,
      action: "sleep"
    });

    // 3. Bookshelf Trigger
    this.triggers.push({
      id: "bookshelf",
      name: "Tủ sách công nghệ",
      prompt: "[ E ] Đọc Sách Clean Code & Kiến Trúc",
      position: new THREE.Vector3(0.0, 0, -2.0),
      radius: 1.1,
      action: "read_book"
    });

    // 4. Doorway Trigger (To Campus)
    this.triggers.push({
      id: "room_door",
      name: "Cửa phòng trọ",
      prompt: "[ E ] Ra Khuôn Viên Đại Học (Campus)",
      position: new THREE.Vector3(-0.2, 0, 2.2),
      radius: 1.2,
      action: "exit_room"
    });
  }

  getCollisionBoxes() {
    return this.collisionBoxes;
  }

  getTriggers() {
    return this.triggers;
  }

  update(delta) {
    const time = performance.now() * 0.003;

    // Subtle pulsating glow on monitors
    this.screenMaterials.forEach((mat, idx) => {
      mat.emissiveIntensity = 0.5 + Math.sin(time + idx * 2.0) * 0.15;
    });

    // Gently twinkle fairy lights
    this.fairyLights.forEach((lantern, idx) => {
      if (lantern.material) {
        lantern.material.emissiveIntensity = 1.4 + Math.sin(time * 2.0 + idx * 1.2) * 0.4;
      }
    });

    // Animate dust particles floating gently
    if (this.dustParticles) {
      const pos = this.dustParticles.geometry.attributes.position.array;
      for (let i = 1; i < pos.length; i += 3) {
        pos[i] += Math.sin(time + i) * 0.001;
        if (pos[i] > 2.7) pos[i] = 0.8;
      }
      this.dustParticles.geometry.attributes.position.needsUpdate = true;
    }
  }
}
