// Master 3D Game Engine for CODE LEGACY
// Integrates Fullscreen WebGL 3D, Character Controller, Dorm Bedroom, University Campus, NPC Interaction, and Audio Engine

import { Character3D } from './character.js';
import { Bedroom3D } from './bedroom.js';
import { Campus3D } from './campus.js';
import { NPC3D } from './npc.js';
import { ThirdPersonCamera } from './cameraController.js';
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { LifeManager } from '../life/lifeActions.js';
import { ui } from '../ui/ui.js';

export class Game3D {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.player = null;
    this.bedroom = null;
    this.campus = null;
    this.npc = null;
    this.tpCamera = null;

    // Current Scene Tracker ('bedroom' | 'campus')
    this.currentSceneId = 'bedroom';

    // Input state
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      shift: false,
      jump: false,
      cameraYaw: 0
    };

    // Interaction state
    this.activeTrigger = null;
    this.promptElement = document.getElementById('interaction-prompt');

    // Footstep audio timer
    this.footstepTimer = 0;

    // Clock
    this.clock = new THREE.Clock();
    this.isRunning = false;
  }

  init() {
    if (!this.canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070b14);
    this.scene.fog = new THREE.FogExp2(0x070b14, 0.04);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 120);
    this.camera.position.set(0, 2.5, 4.0);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // 4. Build Environments (Dorm Bedroom & University Campus)
    this.bedroom = new Bedroom3D(this.scene);
    this.campus = new Campus3D(this.scene);

    // 5. Build Player Character (Starts in middle of room)
    this.player = new Character3D(this.scene);
    this.player.position.set(0, 0, 0.4);

    // 6. Build NPC (Minh Mentor standing near hallway in bedroom)
    this.npc = new NPC3D(this.scene, {
      id: "mentor_minh",
      name: "Minh Mentor",
      role: "Senior Principal Engineer",
      position: new THREE.Vector3(0.6, 0, 1.7),
      rotationY: -Math.PI * 0.75
    });

    // 7. Third-Person Follow Camera
    this.tpCamera = new ThirdPersonCamera(this.camera, this.player.mesh);

    // 8. Event Listeners
    this.setupKeyboardInput();
    window.addEventListener('resize', () => this.onWindowResize());

    // 9. Start Loop
    this.isRunning = true;
    this.animate();

    console.log(" 3D RPG Game Engine Initialized Successfully with Bedroom & Campus Quad!");
  }

  setupKeyboardInput() {
    window.addEventListener('keydown', (e) => {
      // Ignore if typing in text inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.keys.shift = true;
          break;
        case 'Space':
          this.keys.jump = true;
          break;
        case 'KeyE':
          this.handleInteraction();
          break;
        case 'Escape':
          this.handleEscape();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.keys.shift = false;
          break;
        case 'Space':
          this.keys.jump = false;
          break;
      }
    });
  }

  handleInteraction() {
    if (!this.activeTrigger) return;
    audio.playClick();

    switch (this.activeTrigger.action) {
      case 'open_pc':
        // Sit at desk and open programming academy & challenges
        this.player.setSitting(true, new THREE.Vector3(-1.7, 0, -0.6), Math.PI);
        ui.switchTab('skills');
        state.log("[TECH] Đang ngồi tại bàn máy tính Battlestation. Hãy mở Đấu trường thử thách để giải quyết bài toán đầu tiên!", "info");
        break;

      case 'sleep':
        // Sleep on bed & restore energy
        LifeManager.sleepFullNight();
        break;

      case 'read_book':
        // Open library / shop books
        ui.switchTab('shop');
        state.log(" Mở tủ sách công nghệ: Chọn sách để đọc và tích lũy EXP!", "info");
        break;

      case 'talk_npc':
        // Open dedicated interactive dialogue window with Mentor Minh
        ui.openDialogueModal('mentor_minh');
        break;

      case 'exit_room':
        // Seamless transition to University Campus outdoor plaza
        this.switchScene('campus');
        break;

      case 'enter_bedroom':
        // Return back to bedroom dorm
        this.switchScene('bedroom');
        break;

      case 'open_lab':
        // Faculty of Computer Science Lab
        ui.switchTab('skills');
        state.log("️ Đang trong Phòng Lab Máy Tính Khoa CNTT. Luyện code và thi bài tập lớn!", "info");
        break;

      case 'open_library':
        // University Central Library
        ui.switchTab('shop');
        state.log(" Đang ở Thư Viện Đại Học: Mở kho giáo trình cấu trúc dữ liệu và giải thuật!", "info");
        break;
    }
  }

  switchScene(targetScene) {
    if (targetScene === 'campus') {
      this.currentSceneId = 'campus';
      this.bedroom.roomGroup.visible = false;
      this.campus.setVisible(true);

      // Reposition Player & Mentor Minh at Campus entrance
      this.player.position.set(0, 0, -21.0);
      this.player.rotationY = 0;
      this.npc.mesh.position.set(2.2, 0, -18.5);

      // Change background sky to sunny golden autumn
      this.scene.background.setHex(0xbfe3f7);
      this.scene.fog.color.setHex(0xe0f2fe);
      this.scene.fog.density = 0.012;

      state.log("️ Bạn đã bước ra khuôn viên Đại Học Công Nghệ. Hàng cây phong mùa thu rợp bóng mát! Hãy tiến về Lab Máy Tính hoặc Thư Viện.", "success");
    } else {
      this.currentSceneId = 'bedroom';
      this.campus.setVisible(false);
      this.bedroom.roomGroup.visible = true;

      // Reposition Player & Mentor Minh in Dorm
      this.player.position.set(-0.2, 0, 1.8);
      this.player.rotationY = Math.PI;
      this.npc.mesh.position.set(0.6, 0, 1.7);

      // Change background to cozy room interior tone
      this.scene.background.setHex(0x070b14);
      this.scene.fog.color.setHex(0x070b14);
      this.scene.fog.density = 0.04;

      state.log(" Bạn đã trở về góc làm việc phòng trọ thân thuộc.", "info");
    }
  }

  handleEscape() {
    if (this.player.isSitting) {
      this.player.setSitting(false);
    }
    // Close any open modal
    document.querySelectorAll('.fixed.inset-0').forEach(m => m.classList.add('hidden'));
    const dialogueModal = document.getElementById('dialogue-modal');
    if (dialogueModal) dialogueModal.classList.add('hidden');
  }

  checkTriggers() {
    const playerPos = this.player.position;
    const currentSceneTriggers = this.currentSceneId === 'campus'
      ? this.campus.getTriggers()
      : this.bedroom.getTriggers();

    const allTriggers = [
      ...currentSceneTriggers,
      this.npc.getTrigger()
    ];

    let foundTrigger = null;
    for (const trig of allTriggers) {
      const dist = playerPos.distanceTo(trig.position);
      if (dist <= trig.radius) {
        foundTrigger = trig;
        break;
      }
    }

    this.activeTrigger = foundTrigger;
    if (this.promptElement) {
      if (foundTrigger) {
        this.promptElement.textContent = foundTrigger.prompt;
        this.promptElement.classList.remove('hidden');
      } else {
        this.promptElement.classList.add('hidden');
      }
    }
  }

  onWindowResize() {
    if (!this.renderer || !this.camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(() => this.animate());

    const delta = Math.min(this.clock.getDelta(), 0.1);

    // 1. Update Camera Yaw in input
    if (this.tpCamera) {
      this.keys.cameraYaw = this.tpCamera.getYaw();
    }

    // 2. Update Player Movement & Collisions based on current active scene
    const collisionBoxes = this.currentSceneId === 'campus'
      ? this.campus.getCollisionBoxes()
      : this.bedroom.getCollisionBoxes();

    this.player.update(delta, this.keys, collisionBoxes);

    // 3. Update Camera follow
    this.tpCamera.update(delta);

    // 4. Update Environment & NPC
    if (this.currentSceneId === 'campus') {
      this.campus.update(delta);
    } else {
      this.bedroom.update(delta);
    }
    this.npc.update(delta, this.player.position);

    // 5. Check Proximity Interaction Triggers
    this.checkTriggers();

    // 6. Footsteps procedural sound
    if (this.player.isMoving && !this.player.isSitting) {
      this.footstepTimer += delta;
      const stepInterval = this.player.isRunning ? 0.28 : 0.42;
      if (this.footstepTimer >= stepInterval) {
        this.footstepTimer = 0;
        audio.playKeypress(); // Procedural soft step click
      }
    } else {
      this.footstepTimer = 0;
    }

    // 7. Render 3D Frame
    this.renderer.render(this.scene, this.camera);
  }
}
