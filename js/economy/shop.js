// Shop & Inventory Management
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { ITEMS } from './items.js';
import { StatsManager } from '../character/stats.js';

export class ShopManager {
  static buyItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return;

    if (state.data.character.money < item.price) {
      audio.playError();
      state.log(`❌ Bạn không đủ tiền! Cần $${item.price} nhưng chỉ có $${state.data.character.money}.`, 'danger');
      return false;
    }

    state.update(d => {
      d.character.money -= item.price;
      if (item.category === 'consumable') {
        d.inventory.push(itemId);
      } else if (item.category === 'book') {
        d.inventory.push(itemId);
      } else {
        // Gear: Equip immediately or put in inventory
        d.inventory.push(itemId);
        d.equipped[item.category] = itemId;
      }
      audio.playCoin();
      state.log(`️ Mua thành công: ${item.name} với giá $${item.price}!`, 'success');
    });

    return true;
  }

  static buyAndConsume(itemId) {
    const item = ITEMS[itemId];
    if (!item) return false;

    if (state.data.character.money < item.price) {
      audio.playError();
      state.log(`❌ Bạn không đủ tiền! Cần $${item.price} nhưng chỉ có $${state.data.character.money}.`, 'danger');
      return false;
    }

    state.update(d => {
      d.character.money -= item.price;
      if (item.category === 'consumable' && item.effect) {
        if (item.effect.energy) d.stats.energy = Math.min(d.stats.maxEnergy, d.stats.energy + item.effect.energy);
        if (item.effect.focus) d.stats.focus = Math.min(100, d.stats.focus + item.effect.focus);
        if (item.effect.health) d.stats.health = Math.min(100, Math.max(10, d.stats.health + item.effect.health));
        audio.playSuccess();
        state.log(`⚡ Mua & uống ngay ${item.name} (-$${item.price})! Nạp lại +${item.effect.energy || 0} Năng lượng!`, 'success');
      }
    });

    return true;
  }

  static quickConsumeEnergy() {
    const inv = state.data.inventory;
    const consumableIdx = inv.findIndex(id => id === 'coffee_can' || id === 'energy_drink');
    if (consumableIdx !== -1) {
      const itemId = inv[consumableIdx];
      ShopManager.useConsumable(itemId, consumableIdx);
      return;
    }

    if (state.data.character.money >= 2) {
      ShopManager.buyAndConsume('coffee_can');
    } else {
      audio.playError();
      state.log(`[WARN] Hết cà phê trong túi và không đủ $2! Hãy lại giường ngủ nhấn [E] để hồi 100% năng lượng miễn phí.`, 'warning');
    }
  }

  static equipGear(itemId) {
    const item = ITEMS[itemId];
    if (!item || !item.category || item.category === 'consumable' || item.category === 'book') return;

    state.update(d => {
      d.equipped[item.category] = itemId;
      audio.playClick();
      state.log(`Equipped: Đã trang bị ${item.name}!`, 'info');
    });
  }

  static useConsumable(itemId, indexInInventory) {
    const item = ITEMS[itemId];
    if (!item) return;

    if (item.category === 'consumable') {
      state.update(d => {
        if (item.effect.energy) d.stats.energy = Math.min(d.stats.maxEnergy, d.stats.energy + item.effect.energy);
        if (item.effect.focus) d.stats.focus = Math.min(100, d.stats.focus + item.effect.focus);
        if (item.effect.health) d.stats.health = Math.min(100, Math.max(10, d.stats.health + item.effect.health));
        d.inventory.splice(indexInInventory, 1);
        audio.playSuccess();
        state.log(` Đã sử dụng ${item.name}. Cơ thể cảm thấy sảng khoái hơn!`, 'success');
      });
    } else if (item.category === 'book') {
      // Reading book costs 20 energy, gives skill EXP
      if (state.data.stats.energy < 20) {
        audio.playError();
        state.log('[WARN] Bạn quá mệt mỏi để đọc sách! Hãy nghỉ ngơi trước.', 'warning');
        return;
      }
      StatsManager.consumeEnergy(20);
      state.update(d => {
        const skill = d.skills[item.skillTarget];
        if (skill) {
          skill.exp += item.expBonus;
          state.log(` Đã đọc xong "${item.name}". Nhận +${item.expBonus} EXP kỹ năng ${skill.name}!`, 'success');
          // Check skill level up
          while (skill.exp >= skill.expNext) {
            skill.exp -= skill.expNext;
            skill.level += 1;
            skill.expNext = Math.floor(skill.expNext * 1.4);
            state.log(`[SYS] Kỹ năng ${skill.name} đã thăng cấp Level ${skill.level}!`, 'success');
          }
        }
        StatsManager.addExp(Math.floor(item.expBonus / 2));
        d.inventory.splice(indexInInventory, 1);
        audio.playSuccess();
      });
    }
  }
}

