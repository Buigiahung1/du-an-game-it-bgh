// Game Settings Engine
import { state } from './state.js';
import { audio } from './audio.js';

export class SettingsManager {
  static toggleAudio() {
    audio.enabled = !audio.enabled;
    state.update(d => {
      if (!d.settings) d.settings = {};
      d.settings.audioEnabled = audio.enabled;
      state.log(`Âm thanh: ${audio.enabled ? 'Đã BẬT' : 'Đã TẮT'}`, 'info');
    });
    return audio.enabled;
  }

  static setGameSpeed(speedMs) {
    state.update(d => {
      if (!d.settings) d.settings = {};
      d.settings.tickSpeed = speedMs;
      state.log(`Đã điều chỉnh tốc độ đồng hồ thế giới.`, 'info');
    });
  }
}

