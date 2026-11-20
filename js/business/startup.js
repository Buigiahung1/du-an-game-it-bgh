// Tech Startup & Enterprise Building Engine
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { StatsManager } from '../character/stats.js';

export const STARTUP_DOMAINS = [
  { id: 'ai_saas', name: 'Nền tảng AI Generative cho Lập trình viên', targetMRR: 8000, risk: 'Trung bình', potential: 'Cực cao' },
  { id: 'fintech_gateway', name: 'Cổng thanh toán vi mô xuyên biên giới', targetMRR: 12000, risk: 'Cao', potential: 'Khổng lồ' },
  { id: 'devops_cloud', name: 'Công cụ giám sát & Tự động hóa CI/CD Cloud', targetMRR: 6000, risk: 'Thấp', potential: 'Ổn định' }
];

export const EMPLOYEES_CATALOG = [
  { id: 'dev_junior_fe', name: 'Frontend React/Vue Dev', role: 'Kỹ sư Giao diện', salary: 800, outputPoints: 15 },
  { id: 'dev_senior_be', name: 'Senior Backend & Systems Architect', role: 'Kiến trúc sư Dữ liệu', salary: 2200, outputPoints: 45 },
  { id: 'dev_ai_researcher', name: 'AI & Machine Learning Specialist', role: 'Kỹ sư Trí tuệ Nhân tạo', salary: 3500, outputPoints: 75 }
];

export class StartupManager {
  static getStartup() {
    return state.data.startup;
  }

  static foundStartup({ companyName, domainId }) {
    const domain = STARTUP_DOMAINS.find(d => d.id === domainId) || STARTUP_DOMAINS[0];
    const initialCapital = 10000;

    if (state.data.character.money < initialCapital) {
      audio.playError();
      state.log(`❌ Không đủ vốn khởi nghiệp! Cần ít nhất $${initialCapital.toLocaleString()} tiền mặt.`, 'danger');
      return false;
    }

    state.update(d => {
      d.character.money -= initialCapital;
      d.startup = {
        name: companyName && companyName.trim() ? companyName.trim() : 'ApexNova Labs',
        domain: domain.name,
        valuation: 150000,
        cashReserve: 25000,
        monthlyRevenue: 1500,
        monthlyBurnRate: 800,
        employees: [],
        productProgress: 20, // 0 - 100%
        fundingRound: 'Pre-Seed'
      };

      d.character.stage = 4;
      d.character.stageTitle = 'The Legend (Tech Founder)';
      d.character.title = `Founder & CEO of ${d.startup.name}`;
      d.character.rep += 150;
      StatsManager.addExp(1000);

      audio.playLevelUp();
      state.log(`🚀 THÀNH LẬP DOANH NGHIỆP: "${d.startup.name}"! Bạn chính thức bước lên cương vị Nhà Sáng Lập Công Nghệ!`, 'success');
    });

    return true;
  }

  static hireEmployee(employeeId) {
    const s = state.data.startup;
    if (!s) return false;

    const emp = EMPLOYEES_CATALOG.find(e => e.id === employeeId);
    if (!emp) return false;

    if (s.cashReserve < emp.salary * 2) {
      audio.playError();
      state.log(`⚠️ Quỹ dự phòng công ty không đủ trả 2 tháng lương cho nhân sự này!`, 'warning');
      return false;
    }

    state.update(d => {
      d.startup.employees.push({
        id: emp.id,
        name: emp.name,
        role: emp.role,
        salary: emp.salary,
        outputPoints: emp.outputPoints
      });
      d.startup.monthlyBurnRate += emp.salary;
      d.startup.productProgress = Math.min(100, d.startup.productProgress + 15);
      d.startup.monthlyRevenue += Math.floor(emp.outputPoints * 40);
      d.startup.valuation += emp.salary * 12;

      audio.playSuccess();
      state.log(`🤝 Đã chiêu mộ nhân tài: ${emp.name} (${emp.role})! Tốc độ phát triển sản phẩm gia tăng!`, 'success');
    });

    return true;
  }

  static pitchVC() {
    const s = state.data.startup;
    if (!s) return false;

    if (s.productProgress < 80) {
      audio.playError();
      state.log(`⚠️ Sản phẩm chưa hoàn thiện đủ (cần tối thiểu 80% MVP, hiện có: ${s.productProgress}%) để gọi vốn!`, 'warning');
      return false;
    }

    const fundingAmount = 1500000; // $1.5M Series A
    state.update(d => {
      d.startup.fundingRound = 'Series A';
      d.startup.cashReserve += fundingAmount;
      d.startup.valuation = 12000000; // $12M Valuation
      d.character.rep += 300;
      StatsManager.addExp(2500);

      audio.playLevelUp();
      state.log(`💎 GỌI VỐN THÀNH CÔNG: Quỹ đầu tư mạo hiểm Silicon Valley rót $${fundingAmount.toLocaleString()} Series A! Định giá công ty đạt $12,000,000!`, 'success');
    });

    return true;
  }
}

