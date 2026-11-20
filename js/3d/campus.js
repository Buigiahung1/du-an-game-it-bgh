// 3D University Campus Environment for CODE LEGACY
// Matches Reference Images 5 & 7: Autumn University Campus Walkway, Golden Trees, Glass Buildings, Library & Computer Lab

import { TextureGenerator } from './textureGenerator.js';

export class Campus3D {
  constructor(scene) {
    this.scene = scene;
    this.campusGroup = new THREE.Group();
    this.campusGroup.name = "CampusEnvironment";
    this.campusGroup.visible = false; // Initially hidden while in bedroom

    // Collision Boundaries
    this.collisionBoxes = [];

    // Interactive Trigger Zones
    this.triggers = [];

    // Animated elements
    this.foliageMeshes = [];

    this.buildCampus();
    this.scene.add(this.campusGroup);
  }

  buildCampus() {
    // Plaza dimensions: 20m width (X: -10 to 10), 50m length (Z: -25 to 25)
    // === MATERIALS WITH PHOTOREALISTIC PROCEDURAL TEXTURES ===
    // Granite Stone Pavers Walkway (Reference Image 3 & 7)
    const walkwayMat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createCampusPavers(3, 15),
      roughness: 0.55,
      metalness: 0.05
    });

    // Grass Lawn Borders with Golden Autumn Blades
    const grassMat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createAutumnGrass(4, 10),
      roughness: 0.85
    });

    // Modern Building Concrete Columns
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.7
    });

    // Modern Building Reflective Glass Facade
    const campusGlassMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a5f,
      roughness: 0.15,
      metalness: 0.65
    });

    // Tree Trunk Bark with Natural Grain
    const trunkMat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createTreeBark(),
      roughness: 0.8
    });

    // Autumn Leaves Colors (Yellow, Gold, Amber, Orange)
    const autumnColors = [0xf59e0b, 0xd97706, 0xeab308, 0xf97316];

    // 1. MAIN WALKWAY (Center)
    const walkwayGeo = new THREE.PlaneGeometry(8.0, 50.0);
    const walkway = new THREE.Mesh(walkwayGeo, walkwayMat);
    walkway.rotation.x = -Math.PI / 2;
    walkway.receiveShadow = true;
    this.campusGroup.add(walkway);

    // 2. GREEN LAWNS (Left & Right of Walkway)
    [-6.5, 6.5].forEach(x => {
      const lawnGeo = new THREE.PlaneGeometry(5.0, 50.0);
      const lawn = new THREE.Mesh(lawnGeo, grassMat);
      lawn.position.set(x, 0.01, 0);
      lawn.rotation.x = -Math.PI / 2;
      lawn.receiveShadow = true;
      this.campusGroup.add(lawn);
    });

    // 3. CAMPUS BUILDINGS (Left: Faculty of Computer Science & Lab; Right: Main University Library)
    // Left Building (X: -15 to -9, Z: -25 to 25, Height 14m)
    this.buildCampusBuilding(-14.5, 0, columnMat, campusGlassMat, "Khoa CNTT & Lab Máy Tính");

    // Right Building (X: 9 to 15, Z: -25 to 25, Height 14m)
    this.buildCampusBuilding(14.5, 0, columnMat, campusGlassMat, "Thư Viện Trung Tâm & Hội Trường");

    // North Entrance Building (Connecting Skybridge at Z = 24)
    const bridgeGeo = new THREE.BoxGeometry(20.0, 4.5, 6.0);
    const bridge = new THREE.Mesh(bridgeGeo, columnMat);
    bridge.position.set(0, 10.0, 22.0);
    bridge.castShadow = true;
    this.campusGroup.add(bridge);

    const bridgeGlass = new THREE.Mesh(new THREE.BoxGeometry(19.5, 3.2, 5.8), campusGlassMat);
    bridgeGlass.position.set(0, 10.0, 22.0);
    this.campusGroup.add(bridgeGlass);

    // 4. ROWS OF AUTUMN MAPLE / GINKGO TREES (Reference Images 5 & 7)
    [-4.5, 4.5].forEach((xPos, colIdx) => {
      for (let z = -20; z <= 20; z += 6.5) {
        this.buildAutumnTree(xPos, z, trunkMat, autumnColors[(Math.abs(z) + colIdx) % autumnColors.length]);
      }
    });

    // 5. WOODEN CAMPUS BENCHES & MODERN STREET LAMPS
    [-3.5, 3.5].forEach(x => {
      [-14, 0, 14].forEach(z => {
        this.buildCampusBench(x, z, x > 0 ? -Math.PI / 2 : Math.PI / 2);
      });
    });

    // 6. SUNLIGHT & SHADOWS FOR CAMPUS (Warm Autumn Sun)
    const campusSun = new THREE.DirectionalLight(0xfffaed, 1.8);
    campusSun.position.set(15, 25, -20);
    campusSun.castShadow = true;
    campusSun.shadow.mapSize.width = 2048;
    campusSun.shadow.mapSize.height = 2048;
    campusSun.shadow.camera.left = -25;
    campusSun.shadow.camera.right = 25;
    campusSun.shadow.camera.top = 30;
    campusSun.shadow.camera.bottom = -30;
    this.campusGroup.add(campusSun);

    const campusAmbLight = new THREE.AmbientLight(0xdbeafe, 0.7);
    this.campusGroup.add(campusAmbLight);

    // 7. BOUNDARIES & COLLISIONS
    this.collisionBoxes.push(
      { minX: -20, maxX: -8.8, minZ: -26, maxZ: 26 }, // Left building wall
      { minX: 8.8, maxX: 20, minZ: -26, maxZ: 26 },   // Right building wall
      { minX: -10, maxX: 10, minZ: 24, maxZ: 28 },    // North barrier
      { minX: -10, maxX: 10, minZ: -27, maxZ: -24 }   // South dorm entrance
    );

    // 8. CAMPUS INTERACTION TRIGGERS
    this.setupTriggers();
  }

  buildCampusBuilding(xCenter, zCenter, concreteMat, glassMat, buildingName) {
    const bldgGroup = new THREE.Group();
    bldgGroup.position.set(xCenter, 0, zCenter);

    const bldgW = 10.0;
    const bldgL = 50.0;
    const bldgH = 12.0;

    // Main solid structure
    const bodyGeo = new THREE.BoxGeometry(bldgW, bldgH, bldgL);
    const bodyMesh = new THREE.Mesh(bodyGeo, concreteMat);
    bodyMesh.position.y = bldgH / 2;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bldgGroup.add(bodyMesh);

    // Large glass curtain wall on the side facing the walkway
    const glassSideGeo = new THREE.PlaneGeometry(bldgL - 2, bldgH - 2);
    const glassSide = new THREE.Mesh(glassSideGeo, glassMat);
    glassSide.position.set(xCenter > 0 ? -bldgW / 2 - 0.05 : bldgW / 2 + 0.05, bldgH / 2, 0);
    glassSide.rotation.y = xCenter > 0 ? -Math.PI / 2 : Math.PI / 2;
    bldgGroup.add(glassSide);

    // Modern support pillars along the walkway
    for (let z = -22; z <= 22; z += 5.5) {
      const colGeo = new THREE.BoxGeometry(0.6, bldgH, 0.6);
      const col = new THREE.Mesh(colGeo, concreteMat);
      col.position.set(xCenter > 0 ? -bldgW / 2 - 0.3 : bldgW / 2 + 0.3, bldgH / 2, z);
      col.castShadow = true;
      bldgGroup.add(col);
    }

    this.campusGroup.add(bldgGroup);
  }

  buildAutumnTree(x, z, trunkMat, leafColor) {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, 0, z);

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.24, 3.2, 8);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.6;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Foliage (Tiered sphere clusters with autumn golden gradient)
    const leafMat = new THREE.MeshStandardMaterial({
      color: leafColor,
      roughness: 0.8,
      metalness: 0.05
    });

    const foliage1 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 10, 10), leafMat);
    foliage1.scale.set(1.0, 1.25, 1.0);
    foliage1.position.y = 3.6;
    foliage1.castShadow = true;
    treeGroup.add(foliage1);

    const foliage2 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), leafMat);
    foliage2.position.set(0.4, 4.4, 0.2);
    foliage2.castShadow = true;
    treeGroup.add(foliage2);

    this.foliageMeshes.push(foliage1);
    this.campusGroup.add(treeGroup);

    // Tree collision box
    this.collisionBoxes.push({
      minX: x - 0.4,
      maxX: x + 0.4,
      minZ: z - 0.4,
      maxZ: z + 0.4
    });
  }

  buildCampusBench(x, z, rotY) {
    const benchGroup = new THREE.Group();
    benchGroup.position.set(x, 0, z);
    benchGroup.rotation.y = rotY;

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.8 });

    // Seat Plank
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.45), woodMat);
    seat.position.y = 0.42;
    seat.castShadow = true;
    benchGroup.add(seat);

    // Backrest Plank
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 0.05), woodMat);
    back.position.set(0, 0.68, -0.2);
    benchGroup.add(back);

    // Metal Legs
    [-0.65, 0.65].forEach(lx => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 0.45), ironMat);
      leg.position.set(lx, 0.21, 0);
      benchGroup.add(leg);
    });

    this.campusGroup.add(benchGroup);
  }

  setupTriggers() {
    // 1. Return to Dorm Bedroom
    this.triggers.push({
      id: "dorm_door_entrance",
      name: "Cổng Ký Túc Xá / Phòng Trọ",
      prompt: "[ E ] Trở Về Phòng Trọ (Góc Làm Việc Battlestation)",
      position: new THREE.Vector3(0, 0, -22.5),
      radius: 1.8,
      action: "enter_bedroom"
    });

    // 2. Computer Lab (Faculty of Computer Science)
    this.triggers.push({
      id: "computer_lab",
      name: "Phòng Thực Hành Máy Tính (Lab CNTT)",
      prompt: "[ E ] Vào Lab Máy Tính (Thi Giữa Kỳ C++ & Thực Hành)",
      position: new THREE.Vector3(-8.2, 0, -5.0),
      radius: 2.0,
      action: "open_lab"
    });

    // 3. Central University Library
    this.triggers.push({
      id: "library_entrance",
      name: "Thư Viện Đại Học",
      prompt: "[ E ] Vào Thư Viện (Tra Cứu Thuật Toán & Sách Công Nghệ)",
      position: new THREE.Vector3(8.2, 0, 5.0),
      radius: 2.0,
      action: "open_library"
    });
  }

  setVisible(visible) {
    this.campusGroup.visible = visible;
  }

  getCollisionBoxes() {
    return this.collisionBoxes;
  }

  getTriggers() {
    return this.triggers;
  }

  update(delta) {
    if (!this.campusGroup.visible) return;
    const time = performance.now() * 0.002;
    // Gentle rustling of autumn tree canopies in the breeze
    this.foliageMeshes.forEach((mesh, idx) => {
      mesh.rotation.y = Math.sin(time + idx) * 0.04;
      mesh.rotation.z = Math.cos(time + idx * 0.7) * 0.03;
    });
  }
}

