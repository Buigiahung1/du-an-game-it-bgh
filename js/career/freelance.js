// Freelance Job Market & Contracts
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { StatsManager } from '../character/stats.js';
import { QuestEngine } from '../quests/questEngine.js';

export const FREELANCE_GIGS = [
  {
    id: 'gig_css_fix',
    client: 'Shop Thời Trang Online',
    title: 'Sửa lỗi vỡ layout CSS trên Safari & Mobile',
    payout: 45,
    energyCost: 25,
    requiredSkill: 'javascript',
    requiredLevel: 1,
    successRateBase: 85,
    desc: 'Banner bị tràn màn hình, nút Mua Ngay bị lệch sang góc trái trên iPhone.'
  },
  {
    id: 'gig_python_scraper',
    client: 'Chủ Cửa Hàng Đồ Công Nghệ',
    title: 'Viết tool Python cào dữ liệu giá sản phẩm đối thủ',
    payout: 90,
    energyCost: 35,
    requiredSkill: 'python',
    requiredLevel: 2,
    successRateBase: 75,
    desc: 'Cần file excel cập nhật 50 linh kiện máy tính tự động mỗi sáng.'
  },
  {
    id: 'gig_wordpress_db',
    client: 'Công ty Du Lịch Booking',
    title: 'Tối ưu truy vấn SQL & Sửa lỗi kết nối Database',
    payout: 140,
    energyCost: 40,
    requiredSkill: 'database',
    requiredLevel: 2,
    successRateBase: 70,
    desc: 'Website load quá 6 giây khi có 20 người truy cập đồng thời.'
  },
  {
    id: 'gig_rest_api_auth',
    client: 'Startup FinTech Newbie',
    title: 'Xây dựng API Xác thực JWT bằng Node.js / Go',
    payout: 220,
    energyCost: 50,
    requiredSkill: 'backend',
    requiredLevel: 2,
    successRateBase: 65,
    desc: 'Hệ thống cần phân quyền Role Admin / User bảo mật cao có mã hóa mật khẩu.'
  }
];

export class FreelanceManager {
  static acceptAndExecuteGig(gigId) {
    const gig = FREELANCE_GIGS.find(g => g.id === gigId);
    if (!gig) return;

    if (state.data.stats.energy < gig.energyCost) {
      audio.playError();
      state.log(`[WARN] Bạn không đủ năng lượng để làm dự án này! Cần ${gig.energyCost} Năng lượng.`, 'warning');
      return;
    }

    const playerSkill = state.data.skills[gig.requiredSkill];
    const skillLevel = playerSkill ? playerSkill.level : 0;

    if (skillLevel < gig.requiredLevel) {
      audio.playError();
      state.log(`❌ Trình độ kỹ năng chưa đủ! Yêu cầu ${gig.requiredSkill.toUpperCase()} Cấp ${gig.requiredLevel}, hiện tại bạn chỉ có Cấp ${skillLevel}.`, 'danger');
      return;
    }

    // Consume Energy
    StatsManager.consumeEnergy(gig.energyCost);
    audio.playKeypress();

    // Calculate success chance
    const buffs = StatsManager.getEquippedBuffs();
    const bonusFromIntelligence = Math.floor(state.data.stats.intelligence / 5);
    const bonusFromGear = Math.floor(buffs.codingSpeedBonus / 3);
    const finalSuccessRate = Math.min(98, gig.successRateBase + bonusFromIntelligence + bonusFromGear);

    const roll = Math.random() * 100;
    const isSuccess = roll <= finalSuccessRate;

    state.update(d => {
      if (isSuccess) {
        d.character.money += gig.payout;
        d.character.rep += 8;
        d.freelanceCompletedCount += 1;
        StatsManager.addExp(Math.floor(gig.payout * 1.5));
        
        audio.playCoin();
        state.log(`[SUCCESS] HOÀN TẤT HỢP ĐỒNG: "${gig.title}"! Khách hàng ${gig.client} thanh toán $${gig.payout} và khen ngợi!`, 'success');
        
        QuestEngine.checkQuestProgress('freelance_done', { gigId });
      } else {
        d.stats.mentalHealth = Math.max(10, d.stats.mentalHealth - 15);
        d.character.rep = Math.max(0, d.character.rep - 4);
        const penaltyFee = Math.min(d.character.money, Math.floor(gig.payout * 0.25));
        d.character.money -= penaltyFee;
        audio.playError();
        state.log(`[FAILED] DỰ ÁN BỊ LỖI: Client phàn nàn code còn bug, từ chối nghiệm thu: Mất ${gig.energyCost}⚡ Năng lượng, phạt -$${penaltyFee} vi phạm hợp đồng, -4 REP và -15 Tinh thần!`, 'danger');
      }
    });
  }
}

