// Weekly Missions (Sprint Objectives)
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { StatsManager } from '../character/stats.js';

export const WEEKLY_MISSIONS = [
  {
    id: 'week_mission_code_mastery',
    week: 1,
    title: 'Sprint 1: Xây Dựng Kỷ Luật Thép',
    desc: 'Hoàn thành ít nhất 5 phiên tự luyện code và giữ Sức khỏe thể chất trên 75%.',
    requirements: { practiceCount: 5, minHealth: 75 },
    currentPractice: 0,
    rewardExp: 300,
    rewardMoney: 100,
    rewardRep: 20
  },
  {
    id: 'week_mission_freelance_rush',
    week: 2,
    title: 'Sprint 2: Đột Phá Thu Nhập Sinh Viên',
    desc: 'Hoàn thành thành công 3 hợp đồng freelance cho khách hàng trong tuần.',
    requirements: { freelanceCount: 3 },
    currentFreelance: 0,
    rewardExp: 450,
    rewardMoney: 250,
    rewardRep: 35
  },
  {
    id: 'week_mission_clean_architecture',
    week: 3,
    title: 'Sprint 3: Nâng Tầm Tư Duy Kiến Trúc',
    desc: 'Giải quyết 3 thử thách lập trình chuyên sâu tại Học viện với độ chính xác tuyệt đối.',
    requirements: { challengeCount: 3 },
    currentChallenges: 0,
    rewardExp: 600,
    rewardMoney: 300,
    rewardRep: 50
  }
];

export class WeeklyMissionManager {
  static getActiveWeeklyMission() {
    const week = state.data.time.week;
    const mission = WEEKLY_MISSIONS.find(m => m.week === week) || WEEKLY_MISSIONS[0];
    return mission;
  }

  static trackEvent(type) {
    const mission = this.getActiveWeeklyMission();
    if (!mission) return;

    if (type === 'practice' && mission.requirements.practiceCount) {
      mission.currentPractice = (mission.currentPractice || 0) + 1;
      if (mission.currentPractice >= mission.requirements.practiceCount && state.data.stats.health >= (mission.requirements.minHealth || 0)) {
        this.completeMission(mission);
      }
    }
  }

  static completeMission(mission) {
    if (mission.completed) return;
    mission.completed = true;

    state.update(d => {
      StatsManager.addExp(mission.rewardExp);
      d.character.money += mission.rewardMoney;
      d.character.rep += mission.rewardRep;
      d.stats.discipline = Math.min(100, d.stats.discipline + 10);
      state.log(`🎖️ HOÀN THÀNH WEEKLY SPRINT: "${mission.title}"! Nhận +$${mission.rewardMoney} và +${mission.rewardExp} EXP!`, 'success');
    });

    audio.playLevelUp();
  }
}

