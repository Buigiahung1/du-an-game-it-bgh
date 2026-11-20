// Third-Person Follow Camera Controller for CODE LEGACY
// Smooth Spring Follow, Mouse Orbit, Scroll Zoom

export class ThirdPersonCamera {
  constructor(camera, targetMesh) {
    this.camera = camera;
    this.targetMesh = targetMesh;

    // Orbit Angles
    this.yaw = 0;       // Horizontal orbit (radians)
    this.pitch = 0.32;  // Vertical tilt (radians)
    this.distance = 3.6; // Distance from character
    this.minDistance = 1.8;
    this.maxDistance = 6.0;

    // Target tracking offset
    this.lookOffset = new THREE.Vector3(0, 1.45, 0); // Focus on upper chest/neck

    // Mouse control state
    this.isDragging = false;
    this.prevMouseX = 0;
    this.prevMouseY = 0;

    // Current smoothed position
    this.currentPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();

    this.setupMouseEvents();
  }

  setupMouseEvents() {
    window.addEventListener('mousedown', (e) => {
      // Only drag if not clicking UI modals or inputs
      if (e.target.tagName === 'CANVAS' || e.target.id === 'game-canvas-overlay') {
        this.isDragging = true;
        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.prevMouseX;
      const deltaY = e.clientY - this.prevMouseY;

      this.yaw -= deltaX * 0.006;
      this.pitch = THREE.MathUtils.clamp(this.pitch - deltaY * 0.005, 0.05, 1.15);

      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    window.addEventListener('wheel', (e) => {
      this.distance = THREE.MathUtils.clamp(
        this.distance + e.deltaY * 0.003,
        this.minDistance,
        this.maxDistance
      );
    }, { passive: true });
  }

  update(delta) {
    if (!this.targetMesh) return;

    // Target point to look at
    const targetPoint = this.targetMesh.position.clone().add(this.lookOffset);

    // Compute desired camera position on spherical coordinate offset
    const cosPitch = Math.cos(this.pitch);
    const sinPitch = Math.sin(this.pitch);
    const sinYaw = Math.sin(this.yaw);
    const cosYaw = Math.cos(this.yaw);

    const desiredOffset = new THREE.Vector3(
      this.distance * sinYaw * cosPitch,
      this.distance * sinPitch,
      this.distance * cosYaw * cosPitch
    );

    const desiredPosition = targetPoint.clone().add(desiredOffset);

    // Prevent camera dipping below floor
    if (desiredPosition.y < 0.4) desiredPosition.y = 0.4;

    // Smooth lerp camera movement (Spring-damper feel)
    const lerpFactor = Math.min(1.0, delta * 8.0);
    this.camera.position.lerp(desiredPosition, lerpFactor);
    this.currentLookAt.lerp(targetPoint, lerpFactor);
    this.camera.lookAt(this.currentLookAt);
  }

  getYaw() {
    return this.yaw;
  }
}
