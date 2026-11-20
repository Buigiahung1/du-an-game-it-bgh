// Skill Tree & Challenge Verification
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { StatsManager } from '../character/stats.js';
import { CHALLENGES } from './challenges.js';

export class SkillTreeManager {
  static getSkillList() {
    return Object.values(state.data.skills);
  }

  static getChallengesForSkill(skillId) {
    return CHALLENGES.filter(c => c.skillTarget === skillId);
  }

  static practiceSkill(skillId) {
    const skill = state.data.skills[skillId];
    if (!skill) return;

    if (state.data.stats.energy < 15) {
      audio.playError();
      state.log(`⚠️ Bạn quá kiệt sức để học code! Cần ít nhất 15 Năng lượng.`, 'warning');
      return false;
    }

    StatsManager.consumeEnergy(15);
    const buffs = StatsManager.getEquippedBuffs();
    const baseSkillExp = 35;
    const finalSkillExp = Math.round(baseSkillExp * (1 + buffs.codingSpeedBonus / 100));

    state.update(d => {
      const s = d.skills[skillId];
      s.exp += finalSkillExp;
      state.log(`💻 Tự học & viết code ${s.name}: +${finalSkillExp} EXP kỹ năng!`, 'info');

      // Check level up
      while (s.exp >= s.expNext) {
        s.exp -= s.expNext;
        s.level += 1;
        s.expNext = Math.floor(s.expNext * 1.35);
        d.stats.intelligence += 1;
        audio.playLevelUp();
        state.log(`🔥 Kỹ năng ${s.name} đã đột phá lên Cấp độ ${s.level}!`, 'success');
      }

      // Add general character exp
      StatsManager.addExp(Math.round(finalSkillExp / 2));
    });

    audio.playKeypress();
    return true;
  }

  static submitChallenge(challengeId, chosenOptionId) {
    const challenge = CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return { success: false, msg: 'Không tìm thấy thử thách.' };

    const selectedOption = challenge.options.find(o => o.id === chosenOptionId);
    if (!selectedOption) return { success: false, msg: 'Tùy chọn không hợp lệ.' };

    if (selectedOption.correct) {
      audio.playSuccess();
      state.update(d => {
        const skill = d.skills[challenge.skillTarget];
        if (skill) {
          skill.exp += challenge.rewardSkillExp;
          while (skill.exp >= skill.expNext) {
            skill.exp -= skill.expNext;
            skill.level += 1;
            skill.expNext = Math.floor(skill.expNext * 1.35);
          }
        }
        d.stats.discipline = Math.min(100, d.stats.discipline + 2);
        d.stats.focus = Math.min(100, d.stats.focus + 2);
        StatsManager.addExp(challenge.rewardExp);
        state.log(`✅ CHÍNH XÁC! Bạn đã vượt qua thử thách "${challenge.title}"! Nhận +${challenge.rewardExp} EXP!`, 'success');
      });

      return {
        success: true,
        explanation: selectedOption.explanation,
        rewardExp: challenge.rewardExp,
        rewardSkillExp: challenge.rewardSkillExp
      };
    } else {
      audio.playError();
      state.update(d => {
        d.stats.mentalHealth = Math.max(10, d.stats.mentalHealth - 5);
        state.log(`❌ Câu trả lời chưa chính xác cho "${challenge.title}". Đừng nản lòng, hãy xem lại lý thuyết!`, 'danger');
      });

      return {
        success: false,
        explanation: 'Đáp án bạn chọn chưa đúng. Hãy suy nghĩ lại các khía cạnh cú pháp và cơ chế hoạt động của ngôn ngữ.'
      };
    }
  }
}

