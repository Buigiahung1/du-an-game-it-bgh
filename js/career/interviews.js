// Interactive Multi-Stage Interview Engine
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { COMPANIES } from './companies.js';
import { StatsManager } from '../character/stats.js';

export const INTERVIEW_QUESTIONS = {
  techstart: [
    {
      q: 'Tại sao lại sử dụng async/await thay vì Promise chain lồng nhau trong JavaScript?',
      options: [
        { text: 'Async/await giúp code đồng bộ hóa và dễ đọc, tránh callback hell.', correct: true },
        { text: 'Async/await làm cho code chạy đa luồng trên nhiều nhân CPU.', correct: false },
        { text: 'Không có sự khác biệt, chỉ là cú pháp trang trí.', correct: false }
      ]
    },
    {
      q: 'Trong RESTful API, mã trạng thái HTTP nào biểu thị tạo tài nguyên mới thành công?',
      options: [
        { text: '200 OK', correct: false },
        { text: '201 Created', correct: true },
        { text: '204 No Content', correct: false }
      ]
    }
  ],
  bytevanguard: [
    {
      q: 'Chỉ mục (Index) trong cơ sở dữ liệu quan hệ (B-Tree Index) hoạt động như thế nào?',
      options: [
        { text: 'Tạo cấu trúc cây nhị phân để tăng tốc tìm kiếm từ O(N) thành O(log N), nhưng tốn thêm dung lượng ghi.', correct: true },
        { text: 'Nén toàn bộ bảng dữ liệu vào file zip trên RAM.', correct: false },
        { text: 'Tự động sao lưu dữ liệu sang máy chủ dự phòng.', correct: false }
      ]
    },
    {
      q: 'Nguyên lý SOLID nào khuyến khích "Lớp con phải thay thế được lớp cha mà không làm hỏng ứng dụng"?',
      options: [
        { text: 'Single Responsibility Principle', correct: false },
        { text: 'Liskov Substitution Principle (LSP)', correct: true },
        { text: 'Dependency Inversion Principle', correct: false }
      ]
    }
  ],
  fincore: [
    {
      q: 'Làm thế nào để phòng chống tình trạng Race Condition khi trừ tiền tài khoản ngân hàng trong môi trường phân tán?',
      options: [
        { text: 'Sử dụng Distributed Lock (Redis Redlock/Zookeeper) hoặc Database Pessimistic Locking với Transaction Isolation cấp cao.', correct: true },
        { text: 'Tăng tốc độ mạng cáp quang giữa các server.', correct: false },
        { text: 'Chỉ cho phép người dùng rút tiền vào ban ngày.', correct: false }
      ]
    }
  ],
  nexuscloud: [
    {
      q: 'Định lý CAP (Consistency, Availability, Partition Tolerance) chỉ ra điều gì trong hệ thống phân tán?',
      options: [
        { text: 'Một hệ thống phân tán khi gặp sự cố mạng (Partition) chỉ có thể đảm bảo hoặc Nhất quán dữ liệu (CP) hoặc Tính sẵn sàng (AP).', correct: true },
        { text: 'Một hệ thống tốt phải đạt được cả 3 yếu tố C, A, P cùng lúc 100%.', correct: false },
        { text: 'Hệ thống Cloud không bao giờ bị mất kết nối mạng.', correct: false }
      ]
    }
  ],
  apexai: [
    {
      q: 'Cơ chế Self-Attention trong kiến trúc Transformer tính toán mối quan hệ giữa các tokens bằng phép tính nào?',
      options: [
        { text: 'Scaled Dot-Product Attention: Softmax((Q * K^T) / sqrt(d_k)) * V.', correct: true },
        { text: 'Cộng ma trận đơn giản không cần chuẩn hóa.', correct: false },
        { text: 'Thuật toán di truyền ngẫu nhiên.', correct: false }
      ]
    }
  ]
};

export class InterviewManager {
  static checkEligibility(companyId) {
    const comp = COMPANIES[companyId];
    if (!comp) return { eligible: false, reason: 'Công ty không tồn tại' };

    if (state.data.character.level < comp.minLevel) {
      return { eligible: false, reason: `Cần đạt Level tối thiểu ${comp.minLevel} (Hiện tại: Lv.${state.data.character.level})` };
    }
    if (state.data.character.rep < comp.minRep) {
      return { eligible: false, reason: `Cần Danh tiếng tối thiểu ${comp.minRep} REP (Hiện tại: ${state.data.character.rep} REP)` };
    }

    // Check required skills
    for (const [skillId, minLvl] of Object.entries(comp.requiredSkills)) {
      const pLvl = state.data.skills[skillId] ? state.data.skills[skillId].level : 0;
      if (pLvl < minLvl) {
        return { eligible: false, reason: `Kỹ năng ${skillId.toUpperCase()} cần đạt Cấp ${minLvl} (Hiện tại: Cấp ${pLvl})` };
      }
    }

    return { eligible: true };
  }

  static getQuestions(companyId) {
    return INTERVIEW_QUESTIONS[companyId] || INTERVIEW_QUESTIONS.techstart;
  }

  static processInterviewResult(companyId, score, totalQuestions) {
    const comp = COMPANIES[companyId];
    if (!comp) return;

    const isPassed = (score / totalQuestions) >= 0.7;

    state.update(d => {
      if (isPassed) {
        d.company = {
          id: comp.id,
          name: comp.name,
          tier: comp.tier,
          monthlySalary: comp.monthlySalary,
          joinedDate: `Tuần ${d.time.week}, Ngày ${d.time.day}`,
          isPromoted: false
        };
        d.character.rep += 50;
        StatsManager.addExp(500);
        audio.playLevelUp();
        state.log(`🎉 CHÍNH THỨC NHẬN OFFER! Bạn đã vượt qua các vòng phỏng vấn xuất sắc và gia nhập ${comp.name}! Lương tháng: $${comp.monthlySalary.toLocaleString()}!`, 'success');
      } else {
        d.stats.mentalHealth = Math.max(15, d.stats.mentalHealth - 15);
        audio.playError();
        state.log(`❌ Phỏng vấn chưa đạt yêu cầu tại ${comp.name}. Người phỏng vấn nhận xét bạn cần ôn luyện thêm kiến thức nền tảng!`, 'danger');
      }
    });

    return isPassed;
  }
}
