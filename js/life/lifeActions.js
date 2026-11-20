// Life Simulation Actions: Sleep, Nutrition, Exercise, Relaxation
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { timeManager } from '../engine/time.js';

export class LifeManager {
  static sleepFullNight() {
    audio.playClick();
    state.update(d => {
      d.stats.energy = d.stats.maxEnergy;
      d.stats.mentalHealth = Math.min(100, d.stats.mentalHealth + 25);
      d.stats.focus = Math.min(100, d.stats.focus + 15);
      state.log(`💤 Bạn đã ngủ một giấc thật sâu 8 tiếng. Tỉnh dậy với 100% Năng lượng và đầu óc tỉnh táo!`, 'success');
    });
    timeManager.advanceMinutes(480); // 8 hours
  }

  static takeNap() {
    if (state.data.stats.energy >= state.data.stats.maxEnergy) {
      state.log(`Bạn vẫn còn nhiều năng lượng, không cần chợp mắt lúc này.`, 'info');
      return;
    }
    audio.playClick();
    state.update(d => {
      d.stats.energy = Math.min(d.stats.maxEnergy, d.stats.energy + 20);
      d.stats.focus = Math.min(100, d.stats.focus + 10);
      state.log(`☕ Chợp mắt 30 phút. Năng lượng hồi phục +20.`, 'info');
    });
    timeManager.advanceMinutes(30);
  }

  static workoutGym() {
    if (state.data.stats.energy < 25) {
      audio.playError();
      state.log(`⚠️ Bạn quá kiệt sức để tập thể dục!`, 'warning');
      return;
    }
    audio.playSuccess();
    state.update(d => {
      d.stats.energy -= 20;
      d.stats.health = Math.min(100, d.stats.health + 10);
      d.stats.maxEnergy = Math.min(130, d.stats.maxEnergy + 1); // Permanently expands stamina capacity
      d.stats.mentalHealth = Math.min(100, d.stats.mentalHealth + 12);
      d.stats.discipline = Math.min(100, d.stats.discipline + 2);
      state.log(`🏃‍♂️ Chạy bộ & tập thể hình 1 tiếng. Sức khỏe thể chất tăng cao, cột sống được giải tỏa!`, 'success');
    });
    timeManager.advanceMinutes(60);
  }

  static eatNutritiousMeal() {
    const cost = 8;
    if (state.data.character.money < cost) {
      audio.playError();
      state.log(`Không đủ tiền mua bữa ăn đủ chất ($${cost}).`, 'danger');
      return;
    }
    audio.playCoin();
    state.update(d => {
      d.character.money -= cost;
      d.stats.health = Math.min(100, d.stats.health + 8);
      d.stats.energy = Math.min(d.stats.maxEnergy, d.stats.energy + 15);
      state.log(`🍱 Thưởng thức bữa ăn dinh dưỡng (cơm gà, rau xanh, nước ép). Cơ thể tràn đầy sức sống!`, 'success');
    });
    timeManager.advanceMinutes(45);
  }

  static meditateAndRelax() {
    audio.playClick();
    state.update(d => {
      d.stats.mentalHealth = Math.min(100, d.stats.mentalHealth + 15);
      d.stats.focus = Math.min(100, d.stats.focus + 20);
      state.log(`🧘 Thiền định & nghe nhạc Lofi 45 phút. Giảm stress, tâm trí phẳng lặng như mặt hồ.`, 'info');
    });
    timeManager.advanceMinutes(45);
  }
}

