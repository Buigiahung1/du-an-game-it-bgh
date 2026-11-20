// CODE LEGACY - Main Game Initialization Loop
import { state } from './engine/state.js';
import { timeManager } from './engine/time.js';
import { audio } from './engine/audio.js';
import { SaveManager } from './engine/save.js';
import { ui } from './ui/ui.js';
import { Game3D } from './3d/game3d.js';
import { Customizer } from './character/customizer.js';

let game3D = null;

function bootGame() {
  console.log('⚡ Initializing CODE LEGACY: 3D Career RPG...');

  // 1. Try to load existing save data
  SaveManager.load();

  // 2. Initialize UI & HUD Overlays
  ui.init();

  // 3. Initialize Master 3D Engine (Fullscreen Three.js World)
  try {
    if (typeof THREE !== 'undefined') {
      game3D = new Game3D('game-canvas');
      game3D.init();
      window.game3D = game3D;
    } else {
      console.warn("Three.js not found, fallback to 2D HUD");
    }
  } catch (err) {
    console.error("3D Engine init error:", err);
  }

  // 4. Start Game Time Loop
  timeManager.start();

  // 5. Setup Header & Shortcut Controls
  setupControls();

  // 6. Setup Auto-Save every 30 seconds
  setInterval(() => {
    SaveManager.save();
  }, 30000);

  state.log('🚀 CODE LEGACY 3D sẵn sàng! Nhấn [WASD] để di chuyển, [E] để tương tác máy tính, [K] xem kỹ năng!', 'success');
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootGame);
} else {
  bootGame();
}

function setupControls() {
  const saveBtn = document.getElementById('btn-manual-save');
  const exportBtn = document.getElementById('btn-export-save');
  const importInput = document.getElementById('input-import-save');
  const resetBtn = document.getElementById('btn-reset-game');
  const audioBtn = document.getElementById('btn-toggle-audio');
  const editNameBtn = document.getElementById('btn-edit-name');

  if (saveBtn) {
    saveBtn.onclick = () => {
      SaveManager.save();
      audio.playSuccess();
    };
  }

  if (exportBtn) {
    exportBtn.onclick = () => {
      SaveManager.exportJson();
      audio.playClick();
    };
  }

  if (importInput) {
    importInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        SaveManager.importJson(file);
      }
    };
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ tiến trình và chơi lại từ đầu không?')) {
        SaveManager.reset();
        window.location.reload();
      }
    };
  }

  if (audioBtn) {
    audioBtn.onclick = () => {
      audio.enabled = !audio.enabled;
      audioBtn.textContent = audio.enabled ? '🔊 Âm thanh: Bật' : '🔇 Âm thanh: Tắt';
      audioBtn.classList.toggle('text-cyan-400', audio.enabled);
      audioBtn.classList.toggle('text-slate-500', !audio.enabled);
      if (audio.enabled) audio.playClick();
    };
  }

  if (editNameBtn) {
    editNameBtn.onclick = () => {
      const newName = prompt('Nhập tên mới cho nhân vật của bạn:', state.data.character.name);
      if (newName) {
        Customizer.setName(newName);
      }
    };
  }

  // RPG Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.code) {
      case 'KeyK': // Skills
        ui.toggleMenuModal('skills');
        break;
      case 'KeyJ': // Quests
        ui.toggleMenuModal('quests');
        break;
      case 'KeyC': // Character / Career
        ui.toggleMenuModal('career');
        break;
      case 'KeyI': // Inventory / Shop
        ui.toggleMenuModal('shop');
        break;
      case 'KeyP': // Portfolio
        ui.toggleMenuModal('portfolio');
        break;
    }
  });
}
