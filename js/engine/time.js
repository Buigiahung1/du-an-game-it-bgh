// Time Manager: Day/Night Cycle, Tick processing, Weekly rent, Salary & Mission ticks
import { state } from './state.js';
import { CareerManager } from '../career/careerManager.js';
import { AchievementManager } from '../achievements/achievements.js';

export class TimeManager {
  constructor() {
    this.timer = null;
    this.tickIntervalMs = 4000; // 4 seconds real time = 10 game minutes
    this.daysOfWeek = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
  }

  start() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.tick(), this.tickIntervalMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  advanceMinutes(minutes) {
    state.update(d => {
      let totalMinutes = d.time.minute + minutes;
      let hoursToAdd = Math.floor(totalMinutes / 60);
      d.time.minute = totalMinutes % 60;

      if (hoursToAdd > 0) {
        let newHour = d.time.hour + hoursToAdd;
        let daysToAdd = Math.floor(newHour / 24);
        d.time.hour = newHour % 24;

        if (daysToAdd > 0) {
          d.time.day += daysToAdd;
          let currentDayIdx = (d.time.day - 1) % 7;
          d.time.dayOfWeek = this.daysOfWeek[currentDayIdx];
          d.time.week = Math.floor((d.time.day - 1) / 7) + 1;
          this.onDayPassed(d, daysToAdd);
        }
      }
    });
  }

  tick() {
    if (state.data.time.isPaused) return;
    this.advanceMinutes(10);
    // Passive slight fatigue if awake during night (0h - 6h)
    const hour = state.data.time.hour;
    if (hour >= 0 && hour < 6) {
      state.update(d => {
        if (d.stats.energy > 5) d.stats.energy -= 1;
        if (d.stats.mentalHealth > 10) d.stats.mentalHealth -= 0.5;
      });
    }

    // Check achievements
    AchievementManager.checkAll();
  }

  onDayPassed(d, daysCount) {
    state.log(`️ Một ngày mới đã bắt đầu (${d.time.dayOfWeek}, Ngày ${d.time.day}).`, 'info');
    
    // Weekly Living Expenses ($45/tuần tiền trọ và mạng)
    if (d.time.day % 7 === 1 && d.time.day > 1) {
      const rent = 45;
      if (d.character.money >= rent) {
        d.character.money -= rent;
        state.log(` Chi phí sinh hoạt & tiền trọ tuần: -$${rent}.`, 'warning');
      } else {
        d.character.money = 0;
        d.stats.mentalHealth = Math.max(10, d.stats.mentalHealth - 25);
        state.log(`[WARN] Bạn không đủ tiền trả chi phí sinh hoạt! Chủ nhà cằn nhằn, sức khỏe tinh thần sụt giảm!`, 'danger');
      }
    }

    // Monthly Salary Payment (every 30 days)
    if (d.time.day % 30 === 1 && d.time.day > 1) {
      CareerManager.payMonthlySalary();
      CareerManager.promoteCheck();
    }
  }
}

export const timeManager = new TimeManager();
