// Character Creation System (New Game Flow)
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';

export const BACKGROUND_ARCHETYPES = [
  {
    id: 'lost_student',
    name: 'Sinh viên mất phương hướng',
    desc: 'Bị nợ môn C++, kiến thức chắp vá nhưng có sức bền thể lực tốt và khát khao đổi đời mãnh liệt.',
    startingMoney: 60,
    bonusStats: { health: 10, energy: 10, focus: 5, discipline: 0, intelligence: 0 },
    bonusSkills: { c_lang: 15, python: 5 },
    motto: 'Xuất phát điểm thấp không có nghĩa là phải dừng bước.'
  },
  {
    id: 'self_taught',
    name: 'Dân tự học kiên trì',
    desc: 'Tự mày mò gõ code thâu đêm qua YouTube và tài liệu tiếng Anh, tính kỷ luật và sự tập trung cao.',
    startingMoney: 90,
    bonusStats: { health: 0, energy: 0, focus: 15, discipline: 15, intelligence: 5 },
    bonusSkills: { javascript: 25, git_github: 20 },
    motto: 'Mọi dòng code đều là một bài học đắt giá.'
  },
  {
    id: 'career_switcher',
    name: 'Chuyển ngành quyết tâm',
    desc: 'Đã từng đi làm lĩnh vực khác và quyết định chuyển sang IT. Tư duy logic và giao tiếp vượt trội.',
    startingMoney: 150,
    bonusStats: { health: 0, energy: 5, focus: 10, discipline: 10, intelligence: 15 },
    bonusSkills: { database: 25, python: 20 },
    motto: 'Không bao giờ là quá muộn để viết lại tương lai.'
  }
];

export class CharacterCreationManager {
  static createNewCharacter({ name, backgroundId, specialtyId }) {
    const bg = BACKGROUND_ARCHETYPES.find(b => b.id === backgroundId) || BACKGROUND_ARCHETYPES[0];
    const charName = name && name.trim().length > 0 ? name.trim() : 'Alex Nam';

    state.update(d => {
      d.character.name = charName;
      d.character.stage = 1;
      d.character.stageTitle = 'The Beginner (Sinh viên năm 2)';
      d.character.title = bg.name;
      d.character.level = 1;
      d.character.exp = 0;
      d.character.expNext = 250;
      d.character.money = bg.startingMoney;
      d.character.rep = 15;
      d.character.avatar = 'hoodie_student';
      d.character.background = bg.id;
      d.character.specialty = specialtyId || 'fullstack';

      // Apply Stat Buffs
      d.stats.health = 80 + bg.bonusStats.health;
      d.stats.energy = 85 + bg.bonusStats.energy;
      d.stats.maxEnergy = 100;
      d.stats.mentalHealth = 85;
      d.stats.focus = 50 + bg.bonusStats.focus;
      d.stats.discipline = 40 + bg.bonusStats.discipline;
      d.stats.intelligence = 40 + bg.bonusStats.intelligence;

      // Apply Starting Skill Buffs
      Object.entries(bg.bonusSkills).forEach(([skillId, bonusExp]) => {
        if (d.skills[skillId]) {
          d.skills[skillId].exp += bonusExp;
        }
      });

      // Clear old state
      d.time.day = 1;
      d.time.hour = 8;
      d.time.minute = 0;
      d.time.week = 1;
      d.chapter.current = 1;
      d.chapter.title = 'Chương 1: The Awakening (Thức tỉnh)';
      d.activeQuests = ['quest_ch1_hello_world', 'quest_ch1_first_steps'];
      d.completedQuests = [];
      d.portfolioProjects = [];
      d.company = null;
      d.startup = null;

      d.logs = [
        { time: '08:00', text: `REP Nhân vật ${charName} khởi đầu với hành trình "${bg.name}". Sứ mệnh: Trở thành Huyền thoại công nghệ!`, type: 'success' }
      ];
    });

    audio.playLevelUp();
    return true;
  }
}

