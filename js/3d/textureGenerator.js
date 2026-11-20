// High-Definition Procedural PBR Texture Generator for CODE LEGACY
// Generates photorealistic canvas-backed textures for Three.js without external image dependencies

export class TextureGenerator {
  // 1. Parquet Oak Wood Flooring (Staggered planks with realistic grain and bevels)
  static createParquetFloor() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const plankH = 64;
    const plankW = 256;
    const baseColors = ['#c8ad8d', '#bfa280', '#d4baa0', '#b59775', '#c1a585'];

    for (let y = 0; y < canvas.height; y += plankH) {
      const rowIdx = Math.floor(y / plankH);
      const xOffset = (rowIdx % 2) * (plankW / 2);
      for (let x = -plankW; x < canvas.width + plankW; x += plankW) {
        const color = baseColors[(Math.abs(rowIdx * 3 + Math.floor(x / plankW))) % baseColors.length];
        ctx.fillStyle = color;
        ctx.fillRect(x + xOffset, y, plankW, plankH);

        // Wood grain lines
        ctx.strokeStyle = 'rgba(70, 45, 20, 0.08)';
        ctx.lineWidth = 1;
        for (let g = 0; g < 12; g++) {
          ctx.beginPath();
          const gy = y + g * (plankH / 12) + Math.sin(x * 0.05 + g) * 2;
          ctx.moveTo(x + xOffset, gy);
          ctx.bezierCurveTo(
            x + xOffset + 80, gy + Math.sin(g) * 3,
            x + xOffset + 180, gy - Math.cos(g) * 3,
            x + xOffset + plankW, gy
          );
          ctx.stroke();
        }

        // Plank border seam / bevel (Dark shadow and light bevel)
        ctx.strokeStyle = 'rgba(30, 20, 10, 0.45)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + xOffset, y, plankW, plankH);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + xOffset + 1, y + 1);
        ctx.lineTo(x + xOffset + plankW - 1, y + 1);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
  }

  // 2. Slate Accent Wall (Modern dark stone courses with textured flecks)
  static createSlateWall() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const stoneH = 48;
    const stoneW = 160;
    const slateTones = ['#293548', '#334155', '#1e293b', '#253346', '#2d3b50'];

    for (let y = 0; y < canvas.height; y += stoneH) {
      const row = Math.floor(y / stoneH);
      const xOffset = (row % 2) * (stoneW / 2);
      for (let x = -stoneW; x < canvas.width + stoneW; x += stoneW) {
        ctx.fillStyle = slateTones[(row * 5 + Math.floor(x / stoneW)) % slateTones.length];
        ctx.fillRect(x + xOffset, y, stoneW, stoneH);

        // Stone texture flecks
        for (let i = 0; i < 35; i++) {
          const fx = x + xOffset + Math.random() * stoneW;
          const fy = y + Math.random() * stoneH;
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.15)';
          ctx.fillRect(fx, fy, Math.random() * 3 + 1, Math.random() * 2 + 1);
        }

        // Mortar seam
        ctx.strokeStyle = 'rgba(10, 15, 25, 0.7)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + xOffset, y, stoneW, stoneH);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1.5, 1.5);
    return tex;
  }

  // 3. Realistic IDE Screen Display (Left Monitor: Real C/C++ Code with Syntax Highlighting)
  static createIDEScreen() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    // VS Code Dark Background
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title Bar / Tab Bar
    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 0, canvas.width, 42);
    ctx.fillStyle = '#21262d';
    ctx.fillRect(16, 6, 210, 36);
    ctx.fillStyle = '#58a6ff';
    ctx.fillRect(16, 6, 210, 3);

    ctx.fillStyle = '#c9d1d9';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('⚡ main.cpp - Code Legacy', 32, 28);

    // Sidebar line
    ctx.fillStyle = '#30363d';
    ctx.fillRect(52, 42, 1, canvas.height);

    // Code lines
    const lines = [
      { num: '1', text: '#include <iostream>', color: '#ff7b72' },
      { num: '2', text: '#include <memory>', color: '#ff7b72' },
      { num: '3', text: '#include "career_engine.h"', color: '#a5d6ff' },
      { num: '4', text: '', color: '#c9d1d9' },
      { num: '5', text: '// Chapter 1: The Awakening', color: '#8b949e' },
      { num: '6', text: 'int main() {', color: '#d2a8ff' },
      { num: '7', text: '    std::cout << "Starting from zero..." << std::endl;', color: '#79c0ff' },
      { num: '8', text: '    int* pointer_to_future = new int(100);', color: '#ff7b72' },
      { num: '9', text: '    if (*pointer_to_future >= 100) {', color: '#d2a8ff' },
      { num: '10', text: '        std::cout << "FOUNDATION UNLOCKED!" << std::endl;', color: '#7ee787' },
      { num: '11', text: '        Career::promote("Junior Developer");', color: '#ffa657' },
      { num: '12', text: '    }', color: '#d2a8ff' },
      { num: '13', text: '    delete pointer_to_future;', color: '#ff7b72' },
      { num: '14', text: '    return 0;', color: '#ff7b72' },
      { num: '15', text: '}', color: '#d2a8ff' }
    ];

    ctx.font = '14px monospace';
    lines.forEach((l, idx) => {
      const y = 72 + idx * 24;
      ctx.fillStyle = '#484f58';
      ctx.fillText(l.num.padStart(2, ' '), 18, y);
      ctx.fillStyle = l.color;
      ctx.fillText(l.text, 68, y);
    });

    // Integrated Terminal at bottom
    ctx.fillStyle = '#090d16';
    ctx.fillRect(54, 460, canvas.width - 54, 180);
    ctx.fillStyle = '#30363d';
    ctx.fillRect(54, 460, canvas.width - 54, 1);

    ctx.fillStyle = '#7ee787';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('$ g++ -O3 main.cpp -o code_legacy && ./code_legacy', 68, 486);
    ctx.fillStyle = '#58a6ff';
    ctx.fillText('[COMPILER SUCCESS] 0 errors, 0 warnings. Build time: 0.08s', 68, 510);
    ctx.fillStyle = '#e3b341';
    ctx.fillText('>>> FOUNDATION UNLOCKED! Rank updated: Junior Developer', 68, 534);

    return new THREE.CanvasTexture(canvas);
  }

  // 4. System Telemetry / Architecture Screen (Right Monitor: Violet Dashboard)
  static createTelemetryScreen() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#090814';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#131126';
    ctx.fillRect(0, 0, canvas.width, 42);
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('⚡ SYSTEM ARCHITECTURE & REPO TELEMETRY', 24, 28);

    // Left Gauge: CPU Core Load
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(160, 160, 75, 0.8 * Math.PI, 2.2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('94%', 135, 168);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('NEURAL COMPUTING', 105, 195);

    // Right Chart: Memory Bandwidth
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(340, 220);
    for (let x = 340; x < 960; x += 30) {
      const y = 160 + Math.sin(x * 0.04) * 45 + Math.cos(x * 0.09) * 20;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Bottom Grid: Microservice Status
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(40, 280, 940, 310);
    ctx.strokeStyle = '#4338ca';
    ctx.strokeRect(40, 280, 940, 310);

    const services = [
      { name: 'Auth Gateway', status: 'ONLINE', ping: '12ms', color: '#34d399' },
      { name: 'Distributed Cache (Redis)', status: 'HEALTHY', ping: '2ms', color: '#34d399' },
      { name: 'PostgreSQL Primary Cluster', status: 'SYNCED', ping: '5ms', color: '#34d399' },
      { name: 'AI Inference Engine (CUDA)', status: 'ACTIVE', ping: '24ms', color: '#a855f7' },
      { name: 'Cloud CDN Edge Nodes', status: 'OPTIMAL', ping: '8ms', color: '#38bdf8' }
    ];

    services.forEach((s, i) => {
      const y = 330 + i * 48;
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 15px monospace';
      ctx.fillText(s.name, 70, y);
      ctx.fillStyle = s.color;
      ctx.fillText(`● ${s.status}`, 550, y);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(s.ping, 820, y);
    });

    return new THREE.CanvasTexture(canvas);
  }

  // 5. Realistic Human Face Texture (Asian Male with Defined Eyes, Eyebrows, Lips & Shading)
  static createHumanFace() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Smooth gradient skin tone
    const skinGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
    skinGrad.addColorStop(0, '#ffdfd0');
    skinGrad.addColorStop(0.7, '#f5cbb8');
    skinGrad.addColorStop(1, '#e2b39d');
    ctx.fillStyle = skinGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Eyes: Left (X: 180, Y: 220), Right (X: 332, Y: 220)
    [180, 332].forEach((x, idx) => {
      // Sclera (White of eye)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(x, 220, 24, 13, 0, 0, Math.PI * 2);
      ctx.fill();

      // Iris (Dark Coffee Brown)
      ctx.fillStyle = '#261710';
      ctx.beginPath();
      ctx.arc(x, 220, 11, 0, Math.PI * 2);
      ctx.fill();

      // Pupil
      ctx.fillStyle = '#0a0503';
      ctx.beginPath();
      ctx.arc(x, 220, 6, 0, Math.PI * 2);
      ctx.fill();

      // Eye Specular Highlight
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x - 3, 217, 3, 0, Math.PI * 2);
      ctx.fill();

      // Eyelash contour
      ctx.strokeStyle = '#1a1008';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(x, 219, 25, 14, 0, Math.PI, Math.PI * 2);
      ctx.stroke();

      // Eyebrow
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(x - 28, 196 + (idx === 0 ? 2 : -2));
      ctx.quadraticCurveTo(x, 188, x + 28, 194 + (idx === 0 ? -2 : 2));
      ctx.stroke();
    });

    // Soft Nose Bridge Shading
    ctx.fillStyle = 'rgba(180, 120, 95, 0.25)';
    ctx.beginPath();
    ctx.ellipse(256, 280, 14, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nostrils
    ctx.fillStyle = 'rgba(110, 60, 45, 0.5)';
    ctx.beginPath();
    ctx.ellipse(247, 305, 5, 3, 0.3, 0, Math.PI * 2);
    ctx.ellipse(265, 305, 5, 3, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Natural Lips
    ctx.fillStyle = '#d97d74';
    ctx.beginPath();
    ctx.ellipse(256, 355, 34, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#a84c44';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(226, 355);
    ctx.quadraticCurveTo(256, 357, 286, 355);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }

  // 6. Realistic Woven Geometric Floor Rug (Reference Image 3)
  static createWovenRug() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep Indigo Navy Base
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Borders
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

    // Diamond Motif Grid
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2;
    for (let x = 64; x < canvas.width - 32; x += 64) {
      for (let y = 64; y < canvas.height - 32; y += 64) {
        ctx.beginPath();
        ctx.moveTo(x, y - 24);
        ctx.lineTo(x + 24, y);
        ctx.lineTo(x, y + 24);
        ctx.lineTo(x - 24, y);
        ctx.closePath();
        ctx.stroke();
      }
    }

    // Fringe on top and bottom
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    for (let x = 8; x < canvas.width; x += 6) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 12);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, canvas.height - 12);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
  }

  // 7. Cinematic Tech Art Wall Poster (Reference Image 3)
  static createPoster(title, subtitle, accentColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Dark sleek background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cyber grid line
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Glowing Neon Graphic Element
    const grad = ctx.createLinearGradient(0, 100, 0, 450);
    grad.addColorStop(0, accentColor);
    grad.addColorStop(1, '#090d16');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 320, 160, 0, Math.PI * 2);
    ctx.fill();

    // Geometric lines inside circle
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(150, 320);
    ctx.lineTo(256, 214);
    ctx.lineTo(362, 320);
    ctx.lineTo(256, 426);
    ctx.closePath();
    ctx.stroke();

    // Poster Title Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 256, 560);

    ctx.fillStyle = accentColor;
    ctx.font = 'bold 15px monospace';
    ctx.fillText(subtitle, 256, 595);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.fillText('CODE LEGACY · CINEMATIC REALISTIC EDITION', 256, 720);

    return new THREE.CanvasTexture(canvas);
  }

  // 8. Architectural Granite Pavers for University Campus Plaza (Reference Image 3)
  static createCampusPavers(repeatX = 4, repeatY = 12) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const slabW = 256;
    const slabH = 128;
    const stoneTones = ['#cbd5e1', '#d8dee9', '#e2e8f0', '#b8c2d0', '#c4cdd8'];

    for (let y = 0; y < canvas.height; y += slabH) {
      const row = Math.floor(y / slabH);
      const xOffset = (row % 2) * (slabW / 2);
      for (let x = -slabW; x < canvas.width + slabW; x += slabW) {
        const tone = stoneTones[(Math.abs(row * 5 + Math.floor(x / slabW))) % stoneTones.length];
        ctx.fillStyle = tone;
        ctx.fillRect(x + xOffset, y, slabW, slabH);

        // Granite fleck noise
        for (let i = 0; i < 70; i++) {
          const fx = x + xOffset + Math.random() * slabW;
          const fy = y + Math.random() * slabH;
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(30, 41, 59, 0.08)' : 'rgba(255, 255, 255, 0.14)';
          ctx.fillRect(fx, fy, 2, 2);
        }

        // Slab bevel highlights
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + xOffset + 1, y + 1, slabW - 2, slabH - 2);

        // Dark recessed grout joint
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.strokeRect(x + xOffset, y, slabW, slabH);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    return tex;
  }

  // 9. Autumn Lawn Grass (Rich green with warm golden accents, Reference Images 3 & 7)
  static createAutumnGrass(repeatX = 4, repeatY = 8) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Rich olive/autumn green base
    ctx.fillStyle = '#3f6212';
    ctx.fillRect(0, 0, 512, 512);

    // Patchy golden/warm yellow hues
    const blades = ['#4d7c0f', '#65a30d', '#a16207', '#ca8a04', '#365314'];
    for (let i = 0; i < 18000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillStyle = blades[Math.floor(Math.random() * blades.length)];
      ctx.fillRect(x, y, 2, 4);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    return tex;
  }

  // 10. Maple Tree Trunk Bark (Vertical ridges & warm timber grain)
  static createTreeBark() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2d1e16';
    ctx.fillRect(0, 0, 512, 512);

    const barkTones = ['#3f2b1d', '#523725', '#1e140d', '#61432f'];
    for (let x = 0; x < 512; x += 4) {
      const tone = barkTones[Math.floor(Math.random() * barkTones.length)];
      ctx.fillStyle = tone;
      ctx.fillRect(x, 0, 3 + Math.floor(Math.random() * 3), 512);
    }

    // Horizontal knot flecks
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(15, 10, 6, 0.4)';
      const kx = Math.random() * 490;
      const ky = Math.random() * 500;
      ctx.fillRect(kx, ky, 18, 6);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 3);
    return tex;
  }
}
