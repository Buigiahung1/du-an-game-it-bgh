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
      state.log(`[WARN] Bạn quá kiệt sức để học code! Cần ít nhất 15 Năng lượng.`, 'warning');
      return false;
    }

    StatsManager.consumeEnergy(15);
    const buffs = StatsManager.getEquippedBuffs();
    const baseSkillExp = 35;
    const finalSkillExp = Math.round(baseSkillExp * (1 + buffs.codingSpeedBonus / 100));

    state.update(d => {
      const s = d.skills[skillId];
      s.exp += finalSkillExp;

      // Friction: 35% chance to encounter a compiler bug when fatigued or stressed
      let bugNotice = '';
      if (d.stats.energy < 30 || d.stats.mentalHealth < 40) {
        if (Math.random() < 0.35) {
          StatsManager.consumeEnergy(6);
          let cloudFee = 0;
          if (d.character.money >= 1) {
            cloudFee = 1;
            d.character.money -= 1;
          }
          bugNotice = ` ([BUG] Gặp lỗi crash bất ngờ: tiêu tốn thêm 6⚡ và $${cloudFee} phí debug)`;
        }
      }

      state.log(`[TECH] Tự học & viết code ${s.name}: +${finalSkillExp} EXP kỹ năng!${bugNotice}`, 'info');

      // Check level up
      while (s.exp >= s.expNext) {
        s.exp -= s.expNext;
        s.level += 1;
        s.expNext = Math.floor(s.expNext * 1.35);
        d.stats.intelligence += 1;
        audio.playLevelUp();
        state.log(`[SYS] Kỹ năng ${s.name} đã đột phá lên Cấp độ ${s.level}!`, 'success');
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

    const COMPILE_ENERGY_COST = 8;
    const WRONG_PENALTY_ENERGY = 10;
    const WRONG_PENALTY_MONEY = 3;
    const WRONG_PENALTY_MENTAL = 12;

    // Minimum required energy to run compilation and test cases
    if (state.data.stats.energy < COMPILE_ENERGY_COST) {
      audio.playError();
      state.log(`[WARN] Bạn quá kiệt sức để biên dịch code! Cần tối thiểu ${COMPILE_ENERGY_COST} Năng lượng.`, 'warning');
      return {
        success: false,
        energyBlocked: true,
        msg: `Không đủ năng lượng để chạy kiểm thử (Cần tối thiểu ${COMPILE_ENERGY_COST} ⚡). Hãy uống cà phê [U] hoặc đi ngủ!`
      };
    }

    // Deduct base energy for running compiler and test suite
    StatsManager.consumeEnergy(COMPILE_ENERGY_COST);

    if (selectedOption.correct) {
      audio.playSuccess();
      state.update(d => {
        d.consecutiveChallengeFails = 0; // Reset streak
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
        state.log(`[PASSED] THỬ THÁCH VƯỢT QUA: Bạn đã giải xong "${challenge.title}"! Nhận +${challenge.rewardExp} EXP (-${COMPILE_ENERGY_COST}⚡ Năng lượng)!`, 'success');
      });

      return {
        success: true,
        explanation: selectedOption.explanation,
        rewardExp: challenge.rewardExp,
        rewardSkillExp: challenge.rewardSkillExp,
        energyCost: COMPILE_ENERGY_COST
      };
    } else {
      audio.playError();
      let deductedMoney = 0;
      let isBurnout = false;

      state.update(d => {
        // Penalty 1: Extra brain drain from debugging wrong code
        StatsManager.consumeEnergy(WRONG_PENALTY_ENERGY);

        // Penalty 2: Cloud sandbox runner / server resource fee
        if (d.character.money > 0) {
          deductedMoney = Math.min(d.character.money, WRONG_PENALTY_MONEY);
          d.character.money -= deductedMoney;
        }

        // Penalty 3: Mental health drop
        d.stats.mentalHealth = Math.max(5, d.stats.mentalHealth - WRONG_PENALTY_MENTAL);

        // Penalty 4: Consecutive fail streak & burnout
        d.consecutiveChallengeFails = (d.consecutiveChallengeFails || 0) + 1;
        if (d.consecutiveChallengeFails >= 3) {
          isBurnout = true;
          StatsManager.consumeEnergy(12);
          state.log(`[BURNOUT] CẢNH BÁO QUÁ TẢI NÃO (BURNOUT)! Bạn đã sai 3 lần liên tiếp. Đầu óc bị quá tải (-12 Năng lượng)!`, 'danger');
        }

        state.log(`[FAILED] LỖI MÃ NGUỒN: Biên dịch thất bại: Tiêu hao -${COMPILE_ENERGY_COST + WRONG_PENALTY_ENERGY}⚡ Năng lượng, -$${deductedMoney} phí Cloud Runner, -${WRONG_PENALTY_MENTAL} Tinh thần!`, 'danger');
      });

      return {
        success: false,
        penaltyEnergy: COMPILE_ENERGY_COST + WRONG_PENALTY_ENERGY,
        penaltyMoney: deductedMoney,
        isBurnout: isBurnout,
        consecutiveFails: state.data.consecutiveChallengeFails || 1,
        explanation: selectedOption.explanation || 'Đáp án bạn chọn gây ra lỗi logic hoặc cú pháp khiến test case thất bại.'
      };
    }
  }
}

