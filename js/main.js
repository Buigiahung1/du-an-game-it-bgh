// CODE LEGACY - Main Game Initialization Loop
import { state } from './engine/state.js';
import { timeManager } from './engine/time.js';
import { audio } from './engine/audio.js';
import { SaveManager } from './engine/save.js';
import { ui } from './ui/ui.js';
import { Battlestation3D } from './render3d/battlestation3d.js';
import { Customizer } from './character/customizer.js';

let battlestation = null;

function bootGame() {
  console.log('⚡ Initializing CODE LEGACY: From Zero To Legend...');

  // 1. Try to load existing save data
  SaveManager.load();

  // 2. Initialize UI
  ui.init();

  // 3. Initialize 3D Battlestation Viewport
  battlestation = new Battlestation3D('battlestation-3d-canvas');
  battlestation.init();

  // 4. Start Game Time Loop
  timeManager.start();

  // 5. Setup Header Controls (Save, Load, Export, Audio Toggle)
  setupHeaderControls();

  // 6. Setup Auto-Save every 30 seconds
  setInterval(() => {
    SaveManager.save();
  }, 30000);

  // Re-render 3D setup if equipment changes
  state.subscribe((event) => {
    if (battlestation && event === 'update') {
      battlestation.updateGearMeshes();
    }
  });

  state.log('🚀 Chào mừng đến với CODE LEGACY: From Zero To Legend. Mọi hệ thống đã sẵn sàng!', 'success');
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootGame);
} else {
  bootGame();
}

function setupHeaderControls() {
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
}
