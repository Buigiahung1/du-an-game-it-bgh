// Quest Engine: Tracks, Validates, and Rewards
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { StatsManager } from '../character/stats.js';
import { CHAPTER_1_QUESTS } from './chapter1.js';
import { ITEMS } from '../economy/items.js';

export class QuestEngine {
  static getAllChapterQuests() {
    return Object.values(CHAPTER_1_QUESTS);
  }

  static getActiveQuests() {
    const activeIds = state.data.activeQuests;
    return activeIds.map(id => CHAPTER_1_QUESTS[id]).filter(Boolean);
  }

  static checkQuestProgress(eventType, payload) {
    const activeIds = [...state.data.activeQuests];

    activeIds.forEach(questId => {
      const q = CHAPTER_1_QUESTS[questId];
      if (!q) return;

      let completed = false;

      if (q.requirements.type === 'practice_or_challenge' && (eventType === 'practice' || eventType === 'challenge')) {
        q.requirements.currentCount = (q.requirements.currentCount || 0) + 1;
        if (q.requirements.currentCount >= q.requirements.targetCount) completed = true;
      } else if (q.requirements.type === 'skill_level' && eventType === 'skill_up') {
        const currentSkill = state.data.skills[q.requirements.skillId];
        if (currentSkill && currentSkill.level >= q.requirements.targetLevel) {
          completed = true;
        }
      } else if (q.requirements.type === 'complete_freelance' && eventType === 'freelance_done') {
        q.requirements.currentCount = (q.requirements.currentCount || 0) + 1;
        if (q.requirements.currentCount >= q.requirements.targetCount) completed = true;
      } else if (q.requirements.type === 'challenge_id' && eventType === 'challenge_solved') {
        if (payload && payload.challengeId === q.requirements.challengeId) {
          completed = true;
        }
      }

      if (completed) {
        this.completeQuest(questId);
      }
    });
  }

  static completeQuest(questId) {
    const q = CHAPTER_1_QUESTS[questId];
    if (!q) return;

    state.update(d => {
      // Remove from active, add to completed
      d.activeQuests = d.activeQuests.filter(id => id !== questId);
      if (!d.completedQuests.includes(questId)) {
        d.completedQuests.push(questId);
      }

      // Distribute Rewards
      if (q.rewards.exp) StatsManager.addExp(q.rewards.exp);
      if (q.rewards.money) {
        d.character.money += q.rewards.money;
        state.log(`💰 Thưởng nhiệm vụ: +$${q.rewards.money}!`, 'success');
      }
      if (q.rewards.rep) {
        d.character.rep += q.rewards.rep;
        state.log(`🌟 Danh tiếng tăng: +${q.rewards.rep} REP!`, 'info');
      }
      if (q.rewards.item && ITEMS[q.rewards.item]) {
        d.inventory.push(q.rewards.item);
        state.log(`🎁 Nhận vật phẩm thưởng: ${ITEMS[q.rewards.item].name}!`, 'success');
      }

      // Check unlock next quests in chain
      if (questId === 'quest_ch1_first_steps' && !d.activeQuests.includes('quest_ch1_earn_money')) {
        d.activeQuests.push('quest_ch1_earn_money');
        state.log(`📜 Mở khóa nhiệm vụ mới: "Kiếm Những Đồng Tiền Đầu Tiên"!`, 'info');
      } else if (questId === 'quest_ch1_earn_money' && !d.activeQuests.includes('quest_ch1_exam_boss')) {
        d.activeQuests.push('quest_ch1_exam_boss');
        state.log(`🔥 MỞ KHÓA BOSS THỬ THÁCH: "Vượt Qua Kỳ Thi Học Kỳ"!`, 'warning');
      }

      if (q.rewards.unlockChapter) {
        d.chapter.current = q.rewards.unlockChapter;
        d.chapter.title = `Chương ${q.rewards.unlockChapter}: The Foundation (Xây dựng nền tảng)`;
        state.log(`🎉 CHÚC MỪNG! BẠN ĐÃ HOÀN THÀNH CHƯƠNG 1 VÀ BƯỚC SANG CHƯƠNG 2!`, 'success');
      }
    });

    audio.playSuccess();
    state.log(`🎯 HOÀN THÀNH NHIỆM VỤ: "${q.title}"! ${q.dialogue.completion}`, 'success');
  }
}

