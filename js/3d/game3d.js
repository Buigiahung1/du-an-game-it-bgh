// Master 3D Game Engine for CODE LEGACY
// Integrates Fullscreen WebGL 3D, Character Controller, Room Environment, Third-person Camera, Triggers, and Audio Footsteps

import { Character3D } from './character.js';
import { Bedroom3D } from './bedroom.js';
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
    this.npc = null;
    this.tpCamera = null;

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
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
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
    this.renderer.toneMappingExposure = 1.1;

    // 4. Build Environment & World
    this.bedroom = new Bedroom3D(this.scene);

    // 5. Build Player Character (Starts in middle of room)
    this.player = new Character3D(this.scene);
    this.player.position.set(0, 0, 0.4);

    // 6. Build NPC (Minh Mentor standing near hallway)
    this.npc = new NPC3D(this.scene, {
      id: "mentor_minh",
      name: "Minh Mentor",
      role: "Senior Principal Engineer",
      position: new THREE.Vector3(0.6, 0, 1.7),
      rotationY: -Math.PI * 0.75
    });

    // 7. Third-Person Follow Camera
    this.tpCamera = new ThirdPersonCamera(this.camera, this.player.mesh);

    // 8. Event Listeners (Keyboard & Window Resize)
    this.setupKeyboardInput();
    window.addEventListener('resize', () => this.onWindowResize());

    // 9. Start Loop
    this.isRunning = true;
    this.animate();

    console.log("🎮 3D RPG Game Engine Initialized Successfully!");
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
        // Sit at desk and open programming academy & projects
        this.player.setSitting(true, new THREE.Vector3(-1.7, 0, -0.6), Math.PI);
        ui.switchTab('skills');
        state.log("💻 Đang ngồi tại bàn máy tính Battlestation. Hãy chọn bài toán để giải hoặc code dự án!", "info");
        break;

      case 'sleep':
        // Sleep on bed & restore energy
        LifeManager.sleepFullNight();
        break;

      case 'read_book':
        // Open library / shop books
        ui.switchTab('shop');
        state.log("📖 Mở tủ sách công nghệ: Chọn sách để đọc và tích lũy EXP!", "info");
        break;

      case 'talk_npc':
        // Open NPC dialogue modal
        ui.switchTab('overview');
        state.log("💬 Đang đối thoại cùng Minh Mentor...", "info");
        break;

      case 'exit_room':
        // Show campus exploration
        ui.switchTab('quests');
        state.log("🏛️ Bước ra khuôn viên trường Đại học (Campus). Lộ trình 10 chương rộng mở!", "success");
        break;
    }
  }

  handleEscape() {
    if (this.player.isSitting) {
      this.player.setSitting(false);
    }
    // Close any open modal
    document.querySelectorAll('.fixed.inset-0').forEach(m => m.classList.add('hidden'));
  }

  checkTriggers() {
    const playerPos = this.player.position;
    const allTriggers = [
      ...this.bedroom.getTriggers(),
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

    // 2. Update Player Movement & Collisions
    const collisionBoxes = this.bedroom.getCollisionBoxes();
    this.player.update(delta, this.keys, collisionBoxes);

    // 3. Update Camera follow
    this.tpCamera.update(delta);

    // 4. Update Environment & NPC
    this.bedroom.update(delta);
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
