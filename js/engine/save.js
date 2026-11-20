// Save & Load System with LocalStorage and JSON Import/Export
import { state } from './state.js';

const SAVE_KEY = 'CODE_LEGACY_SAVE_V1';

export class SaveManager {
  static save() {
    try {
      const serialized = JSON.stringify(state.data);
      localStorage.setItem(SAVE_KEY, serialized);
      state.log('💾 Tiến trình trò chơi đã được lưu thành công.', 'success');
      return true;
    } catch (e) {
      console.error('Save error:', e);
      state.log('❌ Lỗi khi lưu dữ liệu vào LocalStorage.', 'danger');
      return false;
    }
  }

  static load() {
    try {
      const serialized = localStorage.getItem(SAVE_KEY);
      if (!serialized) return false;
      const parsed = JSON.parse(serialized);
      // Merge into state
      state.update(d => {
        Object.assign(d, parsed);
      });
      state.log('📂 Đã tải dữ liệu lưu trữ thành công.', 'success');
      return true;
    } catch (e) {
      console.error('Load error:', e);
      return false;
    }
  }

  static exportJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `code_legacy_save_day${state.data.time.day}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    state.log('📦 Xuất file dữ liệu save game thành công.', 'info');
  }

  static importJson(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && parsed.character && parsed.stats) {
            state.update(d => {
              Object.assign(d, parsed);
            });
            state.log('📥 Nhập file save thành công! Đã khôi phục trạng thái.', 'success');
            resolve(true);
          } else {
            throw new Error('Dữ liệu save không đúng định dạng');
          }
        } catch (err) {
          state.log('❌ File save không hợp lệ!', 'danger');
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  }

  static reset() {
    localStorage.removeItem(SAVE_KEY);
    state.update(d => {
      Object.assign(d, state.getDefaultState());
    });
    state.log('🔄 Đã thiết lập lại trò chơi về trạng thái ban đầu.', 'warning');
  }
}

