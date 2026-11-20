// Dynamic NPC & Story Dialogue Engine
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';

export const NPCS = {
  mentor_minh: {
    id: 'mentor_minh',
    name: 'Minh Mentor',
    role: 'Senior Principal Engineer @ Nexus Cloud',
    avatar: '👨‍🏫',
    dialogues: [
      {
        id: 'minh_advice_1',
        text: 'Này nhóc, đừng chỉ học vẹt syntax của framework. Công nghệ thay đổi từng năm, nhưng Cấu trúc dữ liệu, Mạng máy tính và Hệ điều hành thì 50 năm nay vẫn vậy.',
        options: [
          { text: 'Em hiểu rồi, em sẽ tập trung củng cố kiến thức gốc rễ trước!', repGain: 5, disciplineGain: 3 },
          { text: 'Nhưng học framework kiếm việc nhanh hơn chứ anh?', repGain: 1, disciplineGain: 0 }
        ]
      },
      {
        id: 'minh_advice_2',
        text: 'Khi em thiết kế hệ thống lớn, điều quan trọng nhất không phải là viết code nhanh, mà là lường trước được điểm nghẽn (bottleneck) và sự cố sẽ xảy ra ở đâu.',
        options: [
          { text: 'Em sẽ đọc thêm tài liệu về High Availability và Caching!', repGain: 8, disciplineGain: 5 }
        ]
      }
    ]
  },
  rival_lam: {
    id: 'rival_lam',
    name: 'Lâm Đối Thủ',
    role: 'Sinh viên trường chuyên & Quán quân thuật toán',
    avatar: '😎',
    dialogues: [
      {
        id: 'lam_taunt_1',
        text: 'Cậu vẫn đang loay hoay với bài toán con trỏ C++ à? Tôi vừa giải xong 5 bài Hard LeetCode sáng nay rồi đấy. Cố lên nhé!',
        options: [
          { text: 'Tôi đi theo tốc độ của tôi. Đường dài mới biết ngựa hay!', focusGain: 5, disciplineGain: 5 },
          { text: 'Cậu đừng đắc ý sớm quá, rồi tôi sẽ vượt qua!', repGain: 2 }
        ]
      }
    ]
  },
  recruiter_sarah: {
    id: 'recruiter_sarah',
    name: 'Sarah Tuyển Dụng',
    role: 'Head of Talent Acquisition @ Big Tech',
    avatar: '👩‍💼',
    dialogues: [
      {
        id: 'sarah_tip_1',
        text: 'Chào bạn! Hồ sơ của bạn sẽ nổi bật hơn rất nhiều nếu bạn có ít nhất một dự án cá nhân được deploy thực tế và có người dùng thật trên GitHub.',
        options: [
          { text: 'Cảm ơn chị, em đang hoàn thiện dự án Fullstack đưa lên production!', repGain: 5 }
        ]
      }
    ]
  }
};

export class DialogueManager {
  static getNPC(npcId) {
    return NPCS[npcId];
  }

  static selectOption(npcId, option) {
    audio.playClick();
    state.update(d => {
      if (option.repGain) d.character.rep += option.repGain;
      if (option.disciplineGain) d.stats.discipline = Math.min(100, d.stats.discipline + option.disciplineGain);
      if (option.focusGain) d.stats.focus = Math.min(100, d.stats.focus + option.focusGain);
      state.log(`💬 Trò chuyện cùng ${NPCS[npcId].name}. Nhận thức và động lực được củng cố!`, 'info');
    });
  }
}
