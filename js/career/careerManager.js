// Career & Corporate Employment Engine
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { COMPANIES } from './companies.js';

export class CareerManager {
  static getCurrentJob() {
    return state.data.company;
  }

  static resignJob() {
    if (!state.data.company) return;
    const oldCompany = state.data.company.name;
    state.update(d => {
      d.company = null;
      state.log(`👋 Bạn đã nộp đơn từ chức tại ${oldCompany} để tìm kiếm thử thách mới.`, 'warning');
    });
    audio.playClick();
  }

  static payMonthlySalary() {
    const comp = state.data.company;
    if (!comp) return;

    state.update(d => {
      d.character.money += comp.monthlySalary;
      d.character.rep += 10;
      audio.playCoin();
      state.log(`💼 NHẬN LƯƠNG THÁNG: Công ty ${comp.name} đã chuyển khoản $${comp.monthlySalary.toLocaleString()}!`, 'success');
    });
  }

  static promoteCheck() {
    const comp = state.data.company;
    if (!comp) return;

    // Promotion if level grew significantly
    if (state.data.character.level >= comp.minLevel + 8 && !comp.isPromoted) {
      state.update(d => {
        d.company.isPromoted = true;
        d.company.monthlySalary = Math.floor(d.company.monthlySalary * 1.45);
        d.character.rep += 30;
        audio.playLevelUp();
        state.log(`🎉 CHÚC MỪNG! Ban Giám Đốc ${comp.name} quyết định thăng chức cho bạn! Mức lương mới: $${d.company.monthlySalary}/tháng!`, 'success');
      });
    }
  }
}
