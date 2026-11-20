// 3D Battlestation & Room Viewport using Three.js (with Canvas fallback)
import { state } from '../engine/state.js';

export class Battlestation3D {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.deskGroup = null;
    this.laptopMesh = null;
    this.monitorMesh = null;
    this.chairMesh = null;
    this.ambientLight = null;
    this.neonLight = null;
    this.isDragging = false;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.rotationY = -0.4;
    this.rotationX = 0.2;
  }

  init() {
    if (!this.container) return;

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
      this.renderFallback2D();
      return;
    }

    try {
      const width = this.container.clientWidth || 400;
      const height = this.container.clientHeight || 280;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x070b14);

      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      this.camera.position.set(0, 3.2, 5.5);
      this.camera.lookAt(0, 0.8, 0);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);

      // Lights
      this.ambientLight = new THREE.AmbientLight(0x223344, 1.2);
      this.scene.add(this.ambientLight);

      this.neonLight = new THREE.PointLight(0x00f0ff, 2.5, 10);
      this.neonLight.position.set(0, 2.5, 1.2);
      this.scene.add(this.neonLight);

      const purpleBackLight = new THREE.PointLight(0xa855f7, 2.0, 10);
      purpleBackLight.position.set(2, 1.8, -2);
      this.scene.add(purpleBackLight);

      // Build Desk & Setup
      this.buildBattlestation();

      // Mouse control
      this.setupControls();

      // Start loop
      this.animate();

      window.addEventListener('resize', () => this.onResize());
    } catch (err) {
      console.warn('Three.js init error, falling back to 2D canvas', err);
      this.renderFallback2D();
    }
  }

  buildBattlestation() {
    this.deskGroup = new THREE.Group();

    // 1. Floor grid
    const floorGeo = new THREE.PlaneGeometry(8, 8);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0a101d, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    this.deskGroup.add(floor);

    // 2. Desk Top
    const deskGeo = new THREE.BoxGeometry(3.0, 0.1, 1.4);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, 1.3, 0);
    this.deskGroup.add(desk);

    // Desk Legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.3);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
    const legPositions = [
      [-1.4, 0.65, -0.6],
      [1.4, 0.65, -0.6],
      [-1.4, 0.65, 0.6],
      [1.4, 0.65, 0.6],
    ];
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(...pos);
      this.deskGroup.add(leg);
    });

    // 3. Laptop or Multi-Monitors depending on state
    this.updateGearMeshes();

    // 4. Keyboard
    const kbGeo = new THREE.BoxGeometry(0.7, 0.03, 0.25);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.position.set(0, 1.37, 0.3);
    this.deskGroup.add(kb);

    // 5. Coffee Mug
    const mugGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.12);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.2 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(0.9, 1.41, 0.2);
    this.deskGroup.add(mug);

    // Initial rotation
    this.deskGroup.rotation.y = this.rotationY;
    this.deskGroup.rotation.x = this.rotationX;
    this.scene.add(this.deskGroup);
  }

  updateGearMeshes() {
    if (!this.deskGroup) return;

    if (this.laptopMesh) this.deskGroup.remove(this.laptopMesh);
    if (this.monitorMesh) this.deskGroup.remove(this.monitorMesh);

    const equipped = state.data.equipped;

    if (equipped.monitor === 'mon_dual_4k') {
      // Dual 4K Curved Screens
      const monGroup = new THREE.Group();
      [-0.7, 0.7].forEach((xPos, idx) => {
        const screenGeo = new THREE.BoxGeometry(1.2, 0.7, 0.04);
        const screenMat = new THREE.MeshStandardMaterial({ 
          color: 0x050505, 
          emissive: idx === 0 ? 0x00f0ff : 0xa855f7, 
          emissiveIntensity: 0.4 
        });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(xPos, 1.9, -0.2);
        screen.rotation.y = idx === 0 ? 0.15 : -0.15;
        monGroup.add(screen);
      });
      this.monitorMesh = monGroup;
      this.deskGroup.add(this.monitorMesh);
    } else {
      // Laptop model
      const baseGeo = new THREE.BoxGeometry(0.65, 0.03, 0.45);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.set(0, 1.37, 0);

      const screenGeo = new THREE.BoxGeometry(0.65, 0.45, 0.02);
      const screenMat = new THREE.MeshStandardMaterial({ 
        color: 0x020617, 
        emissive: 0x00f0ff, 
        emissiveIntensity: 0.35 
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, 1.58, -0.2);
      screen.rotation.x = -0.15;

      const lapGroup = new THREE.Group();
      lapGroup.add(base);
      lapGroup.add(screen);
      this.laptopMesh = lapGroup;
      this.deskGroup.add(this.laptopMesh);
    }
  }

  setupControls() {
    const el = this.renderer.domElement;
    el.style.cursor = 'grab';

    el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
      el.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      if (el) el.style.cursor = 'grab';
    });

    el.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.deskGroup) return;
      const deltaX = e.clientX - this.prevMouseX;
      const deltaY = e.clientY - this.prevMouseY;
      this.rotationY += deltaX * 0.008;
      this.rotationX = Math.max(0.05, Math.min(0.6, this.rotationX + deltaY * 0.006));
      this.deskGroup.rotation.y = this.rotationY;
      this.deskGroup.rotation.x = this.rotationX;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.deskGroup && !this.isDragging) {
      // Gentle subtle breathing float
      this.deskGroup.rotation.y += 0.002;
    }
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  renderFallback2D() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="w-full h-full flex flex-col items-center justify-center bg-slate-900/90 rounded-lg p-4 border border-cyan-500/30 text-center">
        <div class="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 text-2xl mb-2">
          💻
        </div>
        <div class="text-sm font-bold text-cyan-300">BATTLESTATION GÓC LÀM VIỆC</div>
        <p class="text-xs text-slate-400 mt-1 max-w-xs">Phòng trọ sinh viên 12m² · Laptop Cũ · Bàn gỗ sinh viên</p>
        <span class="text-[10px] text-cyan-500 mt-2 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
          WebGL Viewport Ready
        </span>
      </div>
    `;
  }
}

