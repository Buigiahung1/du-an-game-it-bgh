// 3D Bedroom Environment for CODE LEGACY
// Matches Image 2: Cozy Modern Gaming Bedroom, Battlestation Desk, Bed with Under-LEDs, Window, Ergonomic Chair

export class Bedroom3D {
  constructor(scene) {
    this.scene = scene;
    this.roomGroup = new THREE.Group();
    this.roomGroup.name = "BedroomEnvironment";

    // Collision Boundaries (Bounding boxes for walls & furniture)
    this.collisionBoxes = [];

    // Interactive Trigger Zones
    this.triggers = [];

    // Screen emissive material to update dynamically
    this.screenMaterials = [];

    this.buildRoom();
    this.scene.add(this.roomGroup);
  }

  buildRoom() {
    // Dimensions: 5.6m width (X: -2.8 to 2.8), 5.2m depth (Z: -2.6 to 2.6), 3.0m height
    const roomW = 5.6;
    const roomD = 5.2;
    const roomH = 3.0;

    // === MATERIALS ===
    // Light Oak Parquet Floor
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xc8b59e,
      roughness: 0.45,
      metalness: 0.05
    });

    // Dark Slate Accent Wall (behind desk & bed)
    const slateWallMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.85
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
      emissiveIntensity: 0.9
    });
    const lightPanel = new THREE.Mesh(lightPanelGeo, lightPanelMat);
    lightPanel.position.set(0, roomH - 0.02, 0);
    this.roomGroup.add(lightPanel);

    // Ceiling Ambient Light Source
    const ceilingPointLight = new THREE.PointLight(0xffeedd, 1.8, 8.0);
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
    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.4);
    sunLight.position.set(2.0, 4.0, -5.0);
    sunLight.target.position.set(0, 0.5, 0);
    sunLight.castShadow = true;
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

    // Outer Walls Collision
    this.collisionBoxes.push(
      { minX: -roomW / 2 - 0.2, maxX: -roomW / 2 + 0.1, minZ: -roomD / 2, maxZ: roomD / 2 }, // Left
      { minX: roomW / 2 - 0.1, maxX: roomW / 2 + 0.2, minZ: -roomD / 2, maxZ: roomD / 2 },  // Right
      { minX: -roomW / 2, maxX: roomW / 2, minZ: -roomD / 2 - 0.2, maxZ: -roomD / 2 + 0.1 }, // Back
      { minX: -roomW / 2, maxX: roomW / 2, minZ: roomD / 2 - 0.1, maxZ: roomD / 2 + 0.3 }   // Front
    );

    // 4. FURNITURE: BATTLESTATION DESK SETUP (Matching Image 2)
    this.buildBattlestation(oakMat, cabinetMat);

    // 5. FURNITURE: PLATFORM BED (Matching Image 2)
    this.buildPlatformBed(oakMat, cabinetMat);

    // 6. FURNITURE: WARDROBE & STORAGE CABINETS
    this.buildWardrobe(cabinetMat, oakMat);

    // 7. SETUP INTERACTIVE TRIGGERS
    this.setupTriggers();
  }

  buildBattlestation(oakMat, cabinetMat) {
    const deskGroup = new THREE.Group();
    // Placed along the left wall (X ~ -1.7, Z ~ -1.2)
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

    // Right Desk Legs (Metal Frame)
    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.72, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
    const legR1 = new THREE.Mesh(legGeo, legMat);
    legR1.position.set(0.95, 0.36, -0.32);
    const legR2 = new THREE.Mesh(legGeo, legMat);
    legR2.position.set(0.95, 0.36, 0.32);
    deskGroup.add(legR1);
    deskGroup.add(legR2);

    // Overhead Floating Wall Cabinets & LED Light Bar (Image 2)
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

    // DUAL MONITORS (Matching Image 2)
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

      // Glowing Display
      const screenGeo = new THREE.PlaneGeometry(0.64, 0.38);
      const screenMat = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        emissive: idx === 0 ? 0x00f0ff : 0xa855f7,
        emissiveIntensity: 0.55,
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
      emissiveIntensity: 0.2,
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

    // ERGONOMIC CHAIR (Herman Miller Aeron Style from Image 2)
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0, 0.65);

    // Chair 5-Star Base
    const baseCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 8), legMat);
    baseCenter.position.y = 0.1;
    chairGroup.add(baseCenter);

    // Gas lift cylinder
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), legMat);
    cylinder.position.y = 0.28;
    chairGroup.add(cylinder);

    // Mesh Seat Pan
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.46), seatMat);
    seat.position.y = 0.46;
    seat.castShadow = true;
    chairGroup.add(seat);

    // High Ergonomic Mesh Backrest
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.55, 0.04), seatMat);
    back.position.set(0, 0.75, 0.20);
    back.rotation.x = -0.15;
    back.castShadow = true;
    chairGroup.add(back);

    // Armrests
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
    // Placed on back-right (X ~ 1.0, Z ~ -1.5) under the window
    bedGroup.position.set(1.0, 0, -1.5);

    // Wooden Platform Base with drawers (2.1m Length, 1.3m Width, 0.45m Height)
    const baseGeo = new THREE.BoxGeometry(1.3, 0.45, 2.1);
    const base = new THREE.Mesh(baseGeo, oakMat);
    base.position.set(0, 0.225, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    bedGroup.add(base);

    // Under-bed Amber Warm LED Strip (Image 2)
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

    // Comfortable Mattress
    const mattressGeo = new THREE.BoxGeometry(1.2, 0.22, 2.0);
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.set(0, 0.55, 0);
    bedGroup.add(mattress);

    // Navy Blue Duvet Blanket (Image 2)
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
    // Tall Wardrobe on right corner (X: 2.1 to 2.7, Z: 0.5 to 2.5)
    const wardrobeGeo = new THREE.BoxGeometry(0.65, 2.7, 2.0);
    const wardrobe = new THREE.Mesh(wardrobeGeo, cabinetMat);
    wardrobe.position.set(2.4, 1.35, 1.4);
    wardrobe.castShadow = true;
    this.roomGroup.add(wardrobe);

    // Bookshelves with books (X: 0.5 to 1.7, Z: -2.5)
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

  setupTriggers() {
    // 1. PC Battlestation Trigger
    this.triggers.push({
      id: "pc_desk",
      name: "Máy tính Battlestation",
      prompt: "[ E ] Sử Dụng Máy Tính (Học Code & Dự Án)",
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
    // Subtle pulsating glow on monitors
    const time = performance.now() * 0.003;
    this.screenMaterials.forEach((mat, idx) => {
      mat.emissiveIntensity = 0.5 + Math.sin(time + idx * 2.0) * 0.15;
    });
  }
}
