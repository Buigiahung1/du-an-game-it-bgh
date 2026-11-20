// Character Profile & Customizer
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';

export const AVATAR_OPTIONS = [
  { id: 'hoodie_student', label: 'Áo Hoodie Đen (Sinh viên)', stageMin: 1 },
  { id: 'polo_dev', label: 'Áo Polo Công Nghệ (Developer)', stageMin: 2 },
  { id: 'blazer_lead', label: 'Blazer Tối Màu (Tech Lead)', stageMin: 3 },
  { id: 'suit_legend', label: 'Bespoke Suit (Tech Founder)', stageMin: 4 },
];

export class Customizer {
  static setAvatar(avatarId) {
    state.update(d => {
      d.character.avatar = avatarId;
      state.log(`Đã đổi phong cách trang phục sang: ${avatarId}`, 'info');
    });
    audio.playClick();
  }

  static setName(newName) {
    if (!newName || newName.trim().length === 0) return;
    state.update(d => {
      d.character.name = newName.trim();
      state.log(`Tên nhân vật cập nhật: ${d.character.name}`, 'info');
    });
  }
}

