// Character Stats & Equipment Buff Computations
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { ITEMS } from '../economy/items.js';

export class StatsManager {
  static getEquippedBuffs() {
    const equipped = state.data.equipped;
    const buffs = {
      codingSpeedBonus: 0,    // % tăng tốc độ code
      focusBonus: 0,          // + điểm Focus
      energyDrainReduction: 0,// % giảm tiêu hao năng lượng
      mentalHealthBonus: 0,   // % tăng đề kháng stress
      interviewAppeal: 0,     // Uy tín khi đi phỏng vấn
    };

    Object.values(equipped).forEach(itemId => {
      if (!itemId) return;
      const item = ITEMS[itemId];
      if (item && item.buffs) {
        if (item.buffs.codingSpeed) buffs.codingSpeedBonus += item.buffs.codingSpeed;
        if (item.buffs.focus) buffs.focusBonus += item.buffs.focus;
        if (item.buffs.energyDrainReduction) buffs.energyDrainReduction += item.buffs.energyDrainReduction;
        if (item.buffs.mentalHealth) buffs.mentalHealthBonus += item.buffs.mentalHealth;
        if (item.buffs.interviewAppeal) buffs.interviewAppeal += item.buffs.interviewAppeal;
      }
    });

    return buffs;
  }

  static addExp(amount) {
    state.update(d => {
      d.character.exp += amount;
      state.log(` Nhận được +${amount} EXP nhân vật!`, 'success');

      while (d.character.exp >= d.character.expNext) {
        d.character.exp -= d.character.expNext;
        d.character.level += 1;
        d.character.expNext = Math.floor(d.character.expNext * 1.35);
        d.stats.intelligence += 2;
        d.stats.focus = Math.min(100, d.stats.focus + 5);
        
        audio.playLevelUp();
        state.log(`[SUCCESS] CHÚC MỪNG: Bạn đã thăng cấp Level ${d.character.level}! Trí tuệ và Tập trung gia tăng!`, 'success');
        
        this.checkStagePromotion(d);
      }
    });
  }

  static checkStagePromotion(d) {
    // Stage 1: Level 1-9 (Beginner)
    // Stage 2: Level 10-24 (The Developer)
    // Stage 3: Level 25-44 (The Architect)
    // Stage 4: Level 45+ (The Legend)
    let newStage = d.character.stage;
    let newTitle = d.character.stageTitle;

    if (d.character.level >= 45 && d.character.stage < 4) {
      newStage = 4;
      newTitle = 'The Legend (Nhà sáng lập công nghệ)';
      d.character.title = 'Tech Founder & Visionary';
    } else if (d.character.level >= 25 && d.character.stage < 3) {
      newStage = 3;
      newTitle = 'The Architect (Kiến trúc sư hệ thống)';
      d.character.title = 'Senior Tech Lead';
    } else if (d.character.level >= 10 && d.character.stage < 2) {
      newStage = 2;
      newTitle = 'The Developer (Lập trình viên chuyên nghiệp)';
      d.character.title = 'Software Engineer';
    }

    if (newStage !== d.character.stage) {
      d.character.stage = newStage;
      d.character.stageTitle = newTitle;
      audio.playLevelUp();
      state.log(`[ACHIEVE] BẠN ĐÃ TIẾN HÓA SANG GIAI ĐOẠN MỚI: ${newTitle}! Diện mạo và phong thái đã thay đổi!`, 'success');
    }
  }

  static consumeEnergy(amount) {
    const buffs = this.getEquippedBuffs();
    const reducedAmount = Math.max(1, Math.round(amount * (1 - buffs.energyDrainReduction / 100)));
    let exhausted = false;

    state.update(d => {
      d.stats.energy = Math.max(0, d.stats.energy - reducedAmount);
      if (d.stats.energy <= 0) {
        exhausted = true;
      }
    });

    if (exhausted) {
      state.update(d => {
        d.stats.health = Math.max(20, d.stats.health - 15);
        d.stats.mentalHealth = Math.max(15, d.stats.mentalHealth - 20);
      });
      audio.playError();
      state.log(`[WARN] CẢNH BÁO KIỆT SỨC: Bạn đã cạn kiệt năng lượng! Hãy nghỉ ngơi hoặc ngủ ngay nếu không muốn gục ngã!`, 'danger');
    }
    return !exhausted;
  }
}

