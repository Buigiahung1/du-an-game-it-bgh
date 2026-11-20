// 3D Humanoid Character Engine for CODE LEGACY
// Realistic proportions matching Image 1: Korean/Asian IT Student, Hoodie, Jeans, Sneakers, Canvas Bag

import { TextureGenerator } from './textureGenerator.js';

export class Character3D {
  constructor(scene) {
    this.scene = scene;
    this.mesh = new THREE.Group();
    this.mesh.name = "PlayerCharacter";

    // Movement state
    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.rotationY = 0;
    this.targetRotationY = 0;
    this.moveSpeed = 3.6; // m/s
    this.runMultiplier = 1.6;
    this.isMoving = false;
    this.isRunning = false;
    this.isSitting = false;
    this.animTime = 0;

    // Bone & Limb References for Animation
    this.limbs = {};

    this.buildHumanoidModel();
    this.scene.add(this.mesh);
  }

  buildHumanoidModel() {
    // === MATERIALS (PBR Stylized AAA) ===
    // Skin Material
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xffdfd0,
      roughness: 0.65,
      metalness: 0.05
    });

    // Dark Messy Hair Material
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.1
    });

    // Deep Navy Blue Hoodie Material (from Image 1)
    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x223652,
      roughness: 0.8,
      metalness: 0.05
    });

    // Inner V-Neck Heather Gray Shirt Material
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      roughness: 0.9,
      metalness: 0.0
    });

    // Slim-fit Dark Washed Jeans Material
    const jeansMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.75,
      metalness: 0.05
    });

    // Gray Canvas Sneakers Material
    const shoeMat = new THREE.MeshStandardMaterial({
      color: 0x52525b,
      roughness: 0.7,
      metalness: 0.1
    });

    // Olive Canvas Bag Material
    const bagMat = new THREE.MeshStandardMaterial({
      color: 0x556045,
      roughness: 0.85,
      metalness: 0.05
    });

    // === HIERARCHY ROOT (PELVIS) ===
    // Total height ~ 1.75m
    const pelvis = new THREE.Group();
    pelvis.position.y = 0.92;
    this.mesh.add(pelvis);
    this.limbs.pelvis = pelvis;

    // Pelvis Mesh (Lower Torso)
    const pelvisGeo = new THREE.BoxGeometry(0.32, 0.18, 0.22);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, jeansMat);
    pelvisMesh.castShadow = true;
    pelvis.add(pelvisMesh);

    // === SPINE & UPPER TORSO (HOODIE) ===
    const spine = new THREE.Group();
    spine.position.y = 0.12;
    pelvis.add(spine);
    this.limbs.spine = spine;

    // Chest / Upper Hoodie
    const chestGeo = new THREE.BoxGeometry(0.38, 0.36, 0.24);
    const chestMesh = new THREE.Mesh(chestGeo, hoodieMat);
    chestMesh.position.y = 0.18;
    chestMesh.castShadow = true;
    spine.add(chestMesh);

    // V-Neck opening with inner shirt
    const vneckGeo = new THREE.PlaneGeometry(0.12, 0.16);
    const vneckMesh = new THREE.Mesh(vneckGeo, shirtMat);
    vneckMesh.position.set(0, 0.22, 0.122);
    spine.add(vneckMesh);

    // Hoodie Drawstrings with Metallic Aglet Tips (Reference Image 1 & 2)
    const stringMat = new THREE.MeshStandardMaterial({ color: 0x182438, roughness: 0.7 });
    const agletMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.9, roughness: 0.2 });
    [-0.035, 0.035].forEach((x, i) => {
      const dStr = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.16, 6), stringMat);
      dStr.position.set(x, 0.15, 0.13);
      dStr.rotation.z = (i === 0 ? 0.05 : -0.05);
      spine.add(dStr);

      const aglet = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.025, 6), agletMat);
      aglet.position.set(x + (i === 0 ? 0.004 : -0.004), 0.065, 0.13);
      spine.add(aglet);
    });

    // Cross-body Bag Brass Buckle
    const buckleMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.8, roughness: 0.3 });
    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.04, 0.015), buckleMat);
    buckle.position.set(0.02, 0.22, 0.135);
    buckle.rotation.z = -0.55;
    spine.add(buckle);

    // Hoodie Pocket (Front pouch)
    const pocketGeo = new THREE.BoxGeometry(0.24, 0.12, 0.04);
    const pocketMesh = new THREE.Mesh(pocketGeo, hoodieMat);
    pocketMesh.position.set(0, 0.10, 0.13);
    spine.add(pocketMesh);

    // Cross-body Bag Strap
    const strapGeo = new THREE.BoxGeometry(0.04, 0.48, 0.02);
    const strapMesh = new THREE.Mesh(strapGeo, bagMat);
    strapMesh.position.set(0.02, 0.16, 0.125);
    strapMesh.rotation.z = -0.55;
    spine.add(strapMesh);

    // Cross-body Canvas Bag (hanging on right hip)
    const bagGeo = new THREE.BoxGeometry(0.22, 0.20, 0.08);
    const bagMesh = new THREE.Mesh(bagGeo, bagMat);
    bagMesh.position.set(-0.22, -0.05, 0.05);
    bagMesh.rotation.z = 0.15;
    spine.add(bagMesh);

    // === NECK & HEAD ===
    const neck = new THREE.Group();
    neck.position.y = 0.36;
    spine.add(neck);

    const neckGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.1, 8);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.y = 0.04;
    neck.add(neckMesh);

    const headGroup = new THREE.Group();
    headGroup.position.y = 0.12;
    neck.add(headGroup);
    this.limbs.head = headGroup;

    // Head Oval
    const headGeo = new THREE.SphereGeometry(0.11, 16, 16);
    headGeo.scale(0.9, 1.15, 1.0);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Expressive Detailed Human Face Plate (Eyes, Eyebrows, Nose, Lips)
    const faceGeo = new THREE.PlaneGeometry(0.18, 0.20);
    const faceMat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.createHumanFace(),
      transparent: true,
      roughness: 0.55
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, 0.01, 0.112);
    headGroup.add(faceMesh);

    // Hair (Layered stylized locks matching Image 1)
    const hairCapGeo = new THREE.SphereGeometry(0.12, 14, 14);
    hairCapGeo.scale(0.95, 1.15, 1.05);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
    hairCap.position.set(0, 0.03, -0.01);
    headGroup.add(hairCap);

    // Bangs / Front Hair fringe
    const bangsGeo = new THREE.BoxGeometry(0.16, 0.08, 0.06);
    const bangs = new THREE.Mesh(bangsGeo, hairMat);
    bangs.position.set(0, 0.07, 0.09);
    bangs.rotation.x = 0.2;
    headGroup.add(bangs);

    // Hanging Hoodie Hood (behind neck)
    const hoodFoldGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.14, 10);
    const hoodFold = new THREE.Mesh(hoodFoldGeo, hoodieMat);
    hoodFold.position.set(0, -0.02, -0.12);
    hoodFold.rotation.x = 0.4;
    neck.add(hoodFold);

    // === ARMS (LEFT & RIGHT) ===
    this.limbs.leftArm = this.buildArm(spine, -0.22, hoodieMat, skinMat, true);
    this.limbs.rightArm = this.buildArm(spine, 0.22, hoodieMat, skinMat, false);

    // === LEGS (LEFT & RIGHT) ===
    this.limbs.leftLeg = this.buildLeg(pelvis, -0.10, jeansMat, shoeMat);
    this.limbs.rightLeg = this.buildLeg(pelvis, 0.10, jeansMat, shoeMat);

    // Cast shadows for all children
    this.mesh.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  buildArm(parent, xOffset, sleeveMat, handMat, isLeft) {
    const shoulder = new THREE.Group();
    shoulder.position.set(xOffset, 0.32, 0);
    parent.add(shoulder);

    // Upper Arm (Hoodie Sleeve rolled slightly)
    const upperGeo = new THREE.CylinderGeometry(0.06, 0.055, 0.26, 8);
    const upperMesh = new THREE.Mesh(upperGeo, sleeveMat);
    upperMesh.position.y = -0.13;
    shoulder.add(upperMesh);

    // Elbow Joint
    const elbow = new THREE.Group();
    elbow.position.y = -0.26;
    shoulder.add(elbow);

    // Forearm
    const lowerGeo = new THREE.CylinderGeometry(0.05, 0.045, 0.24, 8);
    const lowerMesh = new THREE.Mesh(lowerGeo, sleeveMat);
    lowerMesh.position.y = -0.12;
    elbow.add(lowerMesh);

    // Wrist Watch on Left Wrist
    if (isLeft) {
      const watchGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.03, 8);
      const watchMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
      const watch = new THREE.Mesh(watchGeo, watchMat);
      watch.position.y = -0.20;
      elbow.add(watch);
    }

    // Hand
    const handGeo = new THREE.BoxGeometry(0.05, 0.08, 0.03);
    const handMesh = new THREE.Mesh(handGeo, handMat);
    handMesh.position.y = -0.26;
    elbow.add(handMesh);

    return { shoulder, elbow };
  }

  buildLeg(parent, xOffset, pantMat, shoeMat) {
    const hip = new THREE.Group();
    hip.position.set(xOffset, -0.06, 0);
    parent.add(hip);

    // Upper Leg (Thigh in slim black jeans)
    const thighGeo = new THREE.CylinderGeometry(0.08, 0.065, 0.40, 8);
    const thighMesh = new THREE.Mesh(thighGeo, pantMat);
    thighMesh.position.y = -0.20;
    hip.add(thighMesh);

    // Knee Joint
    const knee = new THREE.Group();
    knee.position.y = -0.40;
    hip.add(knee);

    // Calf / Shin
    const calfGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.40, 8);
    const calfMesh = new THREE.Mesh(calfGeo, pantMat);
    calfMesh.position.y = -0.20;
    knee.add(calfMesh);

    // Ankle & Sneaker
    const ankle = new THREE.Group();
    ankle.position.y = -0.40;
    knee.add(ankle);

    const shoeGeo = new THREE.BoxGeometry(0.09, 0.07, 0.20);
    const shoeMesh = new THREE.Mesh(shoeGeo, shoeMat);
    shoeMesh.position.set(0, 0.035, 0.04);
    ankle.add(shoeMesh);

    // White rubber sole rim
    const soleGeo = new THREE.BoxGeometry(0.095, 0.02, 0.205);
    const soleMat = new THREE.MeshStandardMaterial({ color: 0xe4e4e7, roughness: 0.5 });
    const soleMesh = new THREE.Mesh(soleGeo, soleMat);
    soleMesh.position.set(0, 0.01, 0.04);
    ankle.add(soleMesh);

    return { hip, knee, ankle };
  }

  update(delta, inputState, collisionWalls) {
    if (this.isSitting) {
      this.animateSitting(delta);
      return;
    }

    // 1. Process Input Vector
    const moveZ = (inputState.forward ? -1 : 0) + (inputState.backward ? 1 : 0);
    const moveX = (inputState.left ? -1 : 0) + (inputState.right ? 1 : 0);

    const inputDir = new THREE.Vector3(moveX, 0, moveZ);
    this.isMoving = inputDir.lengthSq() > 0.001;
    this.isRunning = inputState.shift && this.isMoving;

    if (this.isMoving) {
      inputDir.normalize();

      // Rotate input relative to camera yaw
      const camYaw = inputState.cameraYaw || 0;
      inputDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), camYaw);

      // Target character rotation
      this.targetRotationY = Math.atan2(inputDir.x, inputDir.z);

      // Smooth rotate character towards travel direction
      let diff = this.targetRotationY - this.rotationY;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.rotationY += diff * Math.min(1.0, delta * 12.0);
      this.mesh.rotation.y = this.rotationY;

      // Calculate speed
      const curSpeed = this.moveSpeed * (this.isRunning ? this.runMultiplier : 1.0);
      const moveDelta = inputDir.multiplyScalar(curSpeed * delta);

      // Collision detection against room boundaries & furniture
      const nextPos = this.position.clone().add(moveDelta);
      if (this.checkCollision(nextPos, collisionWalls)) {
        // Slide along X or Z if single axis is clear
        const slideX = this.position.clone().add(new THREE.Vector3(moveDelta.x, 0, 0));
        const slideZ = this.position.clone().add(new THREE.Vector3(0, 0, moveDelta.z));
        if (!this.checkCollision(slideX, collisionWalls)) {
          this.position.x = slideX.x;
        } else if (!this.checkCollision(slideZ, collisionWalls)) {
          this.position.z = slideZ.z;
        }
      } else {
        this.position.copy(nextPos);
      }
    }

    this.mesh.position.copy(this.position);

    // 2. Run Procedural Animations
    this.animateLocomotion(delta);
  }

  checkCollision(pos, walls) {
    if (!walls || walls.length === 0) return false;
    const playerRadius = 0.28;

    for (const w of walls) {
      // Simple 2D box collision on XZ plane
      if (pos.x + playerRadius > w.minX && pos.x - playerRadius < w.maxX &&
          pos.z + playerRadius > w.minZ && pos.z - playerRadius < w.maxZ) {
        return true;
      }
    }
    return false;
  }

  animateLocomotion(delta) {
    const l = this.limbs;
    if (!l.leftLeg || !l.rightLeg) return;

    if (this.isMoving) {
      const animFreq = this.isRunning ? 11.0 : 7.5;
      this.animTime += delta * animFreq;

      const stride = Math.sin(this.animTime);
      const strideCos = Math.cos(this.animTime);
      const amp = this.isRunning ? 0.85 : 0.55;

      // Legs alternating swing
      l.leftLeg.hip.rotation.x = stride * amp;
      l.rightLeg.hip.rotation.x = -stride * amp;

      // Knee bending on back-swing
      l.leftLeg.knee.rotation.x = Math.max(0, -stride * amp * 0.9);
      l.rightLeg.knee.rotation.x = Math.max(0, stride * amp * 0.9);

      // Arms swing in opposition to legs
      l.leftArm.shoulder.rotation.x = -stride * (amp * 0.8);
      l.rightArm.shoulder.rotation.x = stride * (amp * 0.8);
      l.leftArm.elbow.rotation.x = -0.3 + Math.abs(stride * 0.3);
      l.rightArm.elbow.rotation.x = -0.3 + Math.abs(stride * 0.3);

      // Subtle pelvis and spine bounce
      l.pelvis.position.y = 0.92 + Math.abs(strideCos) * 0.04;
      l.spine.rotation.y = -stride * 0.08;
      l.spine.rotation.z = stride * 0.03;
    } else {
      // Natural Idle breathing
      this.animTime += delta * 2.2;
      const breath = Math.sin(this.animTime);

      // Reset legs
      l.leftLeg.hip.rotation.x = 0;
      l.rightLeg.hip.rotation.x = 0;
      l.leftLeg.knee.rotation.x = 0;
      l.rightLeg.knee.rotation.x = 0;
      l.pelvis.position.y = 0.92;

      // Subtle arm idle sway
      l.leftArm.shoulder.rotation.x = 0.05 + breath * 0.02;
      l.leftArm.shoulder.rotation.z = -0.08;
      l.rightArm.shoulder.rotation.x = 0.05 + breath * 0.02;
      l.rightArm.shoulder.rotation.z = 0.08;
      l.leftArm.elbow.rotation.x = -0.15;
      l.rightArm.elbow.rotation.x = -0.15;

      // Chest breathing
      l.spine.rotation.x = breath * 0.02;
      l.head.rotation.y = Math.sin(this.animTime * 0.4) * 0.08;
    }
  }

  setSitting(isSitting, chairPos, chairRotY) {
    this.isSitting = isSitting;
    const l = this.limbs;
    if (isSitting && chairPos) {
      this.position.set(chairPos.x, 0, chairPos.z);
      this.rotationY = chairRotY || 0;
      this.mesh.position.copy(this.position);
      this.mesh.rotation.y = this.rotationY;

      // Sit pose: hips flexed 90 deg, knees bent 90 deg, hands on desk
      l.pelvis.position.y = 0.58;
      l.leftLeg.hip.rotation.x = -Math.PI / 2;
      l.rightLeg.hip.rotation.x = -Math.PI / 2;
      l.leftLeg.knee.rotation.x = Math.PI / 2;
      l.rightLeg.knee.rotation.x = Math.PI / 2;

      l.leftArm.shoulder.rotation.x = -0.9;
      l.rightArm.shoulder.rotation.x = -0.9;
      l.leftArm.elbow.rotation.x = -0.8;
      l.rightArm.elbow.rotation.x = -0.8;
    } else {
      l.pelvis.position.y = 0.92;
      l.leftLeg.hip.rotation.x = 0;
      l.rightLeg.hip.rotation.x = 0;
      l.leftLeg.knee.rotation.x = 0;
      l.rightLeg.knee.rotation.x = 0;
    }
  }

  animateSitting(delta) {
    this.animTime += delta * 12.0;
    // Rapid typing finger/elbow animation
    this.limbs.leftArm.elbow.rotation.x = -0.8 + Math.sin(this.animTime) * 0.06;
    this.limbs.rightArm.elbow.rotation.x = -0.8 + Math.cos(this.animTime * 1.2) * 0.06;
  }
}

