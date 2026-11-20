// 3D NPC Engine for CODE LEGACY
// Renders Mentor Minh standing near the hallway/door with animated quest marker

export class NPC3D {
  constructor(scene, options) {
    this.scene = scene;
    this.id = options.id || "mentor_minh";
    this.name = options.name || "Minh Mentor";
    this.role = options.role || "Senior Principal Engineer";
    this.position = options.position || new THREE.Vector3(0.8, 0, 1.8);
    this.rotationY = options.rotationY || -Math.PI * 0.75;

    this.mesh = new THREE.Group();
    this.mesh.name = `NPC_${this.id}`;
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.rotationY;

    this.animTime = 0;
    this.overheadMarker = null;

    this.buildNPCModel();
    this.scene.add(this.mesh);
  }

  buildNPCModel() {
    // Mature Tech Lead style: Blazer, polo, smart trousers
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdfd0, roughness: 0.6 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.8 });
    const blazerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.75 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });

    // Pelvis & Legs
    const pelvis = new THREE.Group();
    pelvis.position.y = 0.95;
    this.mesh.add(pelvis);

    const pelvisMesh = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.18, 0.22), pantsMat);
    pelvis.add(pelvisMesh);

    // Legs
    [-0.10, 0.10].forEach(x => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.88, 8), pantsMat);
      leg.position.set(x, -0.48, 0);
      leg.castShadow = true;
      pelvis.add(leg);

      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.22), shoeMat);
      shoe.position.set(x, -0.92, 0.04);
      pelvis.add(shoe);
    });

    // Torso with Smart Blazer
    const spine = new THREE.Group();
    spine.position.y = 0.15;
    pelvis.add(spine);
    this.spine = spine;

    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.40, 0.25), blazerMat);
    chest.position.y = 0.20;
    chest.castShadow = true;
    spine.add(chest);

    // Arms in polite cross-chest or relaxed leader pose
    [-0.24, 0.24].forEach((x, idx) => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.52, 8), blazerMat);
      arm.position.set(x, 0.15, 0.04);
      arm.rotation.x = -0.2;
      arm.rotation.z = idx === 0 ? 0.1 : -0.1;
      spine.add(arm);
    });

    // Head with neat professional hairstyle & glasses
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.44;
    spine.add(headGroup);
    this.head = headGroup;

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), skinMat);
    head.scale.set(0.9, 1.15, 1.0);
    head.castShadow = true;
    headGroup.add(head);

    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), hairMat);
    hair.scale.set(0.95, 1.12, 1.05);
    hair.position.set(0, 0.04, -0.01);
    headGroup.add(hair);

    // Glasses Rim
    const glassesMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, roughness: 0.2 });
    const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.02), glassesMat);
    glasses.position.set(0, 0.02, 0.11);
    headGroup.add(glasses);

    // Animated Overhead Quest Indicator [ ! ]
    const markerGroup = new THREE.Group();
    markerGroup.position.y = 1.95;
    this.overheadMarker = markerGroup;

    const ringGeo = new THREE.RingGeometry(0.12, 0.16, 16);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    markerGroup.add(ring);

    const pointGeo = new THREE.ConeGeometry(0.08, 0.20, 8);
    const pointMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 1.2 });
    const point = new THREE.Mesh(pointGeo, pointMat);
    point.rotation.x = Math.PI;
    point.position.y = -0.05;
    markerGroup.add(point);

    this.mesh.add(markerGroup);
  }

  update(delta, playerPos) {
    this.animTime += delta;

    // Overhead indicator floating bounce & rotation
    if (this.overheadMarker) {
      this.overheadMarker.position.y = 1.95 + Math.sin(this.animTime * 3.0) * 0.06;
      this.overheadMarker.rotation.y += delta * 2.0;
    }

    // Subtle idle breathing
    if (this.spine) {
      this.spine.rotation.x = Math.sin(this.animTime * 1.8) * 0.02;
    }

    // Head tracking player if close
    if (playerPos && this.head) {
      const dist = this.mesh.position.distanceTo(playerPos);
      if (dist < 3.2) {
        const localPlayerPos = this.mesh.worldToLocal(playerPos.clone());
        const angle = Math.atan2(localPlayerPos.x, localPlayerPos.z);
        this.head.rotation.y = THREE.MathUtils.clamp(angle, -0.8, 0.8);
      } else {
        this.head.rotation.y = THREE.MathUtils.lerp(this.head.rotation.y, 0, delta * 3.0);
      }
    }
  }

  getTrigger() {
    return {
      id: "npc_minh",
      name: this.name,
      prompt: `[ E ] Trò Chuyện Cùng ${this.name} (${this.role})`,
      position: this.position.clone(),
      radius: 1.6,
      action: "talk_npc"
    };
  }
}

