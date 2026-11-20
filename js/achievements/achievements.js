// Master Achievements & Trophies Database
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { StatsManager } from '../character/stats.js';

export const ACHIEVEMENTS = [
  {
    id: 'ach_first_code',
    title: 'Hello World',
    desc: 'Thực hiện phiên tự luyện code đầu tiên trong đời.',
    category: 'learning',
    icon: '💻',
    rewardExp: 50,
    check: (d) => d.character.exp > 0
  },
  {
    id: 'ach_first_freelance',
    title: 'Bàn Tay Khéo Léo',
    desc: 'Kiếm được tiền từ hợp đồng freelance đầu tiên.',
    category: 'career',
    icon: '💵',
    rewardExp: 100,
    check: (d) => (d.freelanceCompletedCount || 0) >= 1
  },
  {
    id: 'ach_mech_keyboard',
    title: 'Gõ Phím Như Múa',
    desc: 'Sở hữu và trang bị bàn phím cơ đầu tiên.',
    category: 'hardware',
    icon: '⌨️',
    rewardExp: 80,
    check: (d) => d.equipped.keyboard && d.equipped.keyboard !== 'kb_membrane'
  },
  {
    id: 'ach_stage_developer',
    title: 'Thoát Kiếp Mất Gốc',
    desc: 'Đột phá lên Giai đoạn 2: The Developer chuyên nghiệp.',
    category: 'career',
    icon: '🚀',
    rewardExp: 200,
    check: (d) => d.character.stage >= 2
  },
  {
    id: 'ach_first_job',
    title: 'Dân Công Sở Chính Hiệu',
    desc: 'Vượt qua phỏng vấn và chính thức gia nhập một công ty công nghệ.',
    category: 'career',
    icon: '🏢',
    rewardExp: 250,
    check: (d) => d.company !== null
  },
  {
    id: 'ach_github_stargazer',
    title: 'Ngôi Sao GitHub',
    desc: 'Xây dựng dự án cá nhân đạt trên 100 lượt Stars trên GitHub.',
    category: 'community',
    icon: '⭐',
    rewardExp: 300,
    check: (d) => (d.portfolioProjects || []).some(p => p.stars >= 100)
  },
  {
    id: 'ach_wealthy_coder',
    title: 'Tự Do Tài Chính Cơ Bản',
    desc: 'Tích lũy số dư tiền mặt vượt mốc $10,000.',
    category: 'economy',
    icon: '💰',
    rewardExp: 400,
    check: (d) => d.character.money >= 10000
  },
  {
    id: 'ach_tech_founder',
    title: 'Đế Chế Công Nghệ',
    desc: 'Thành lập công ty công nghệ của riêng bạn.',
    category: 'legend',
    icon: '👑',
    rewardExp: 1000,
    check: (d) => d.startup !== null
  }
];

export class AchievementManager {
  static checkAll() {
    if (!state.data.unlockedAchievements) {
      state.data.unlockedAchievements = [];
    }

    ACHIEVEMENTS.forEach(ach => {
      if (state.data.unlockedAchievements.includes(ach.id)) return;

      if (ach.check(state.data)) {
        this.unlock(ach);
      }
    });
  }

  static unlock(ach) {
    state.update(d => {
      if (!d.unlockedAchievements) d.unlockedAchievements = [];
      d.unlockedAchievements.push(ach.id);
      StatsManager.addExp(ach.rewardExp);
      state.log(`🏆 MỞ KHÓA THÀNH TỰU: "${ach.title}"! ${ach.desc} (+${ach.rewardExp} EXP)!`, 'success');
    });
    audio.playLevelUp();
  }
}

