// Portfolio & GitHub Projects System
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { StatsManager } from '../character/stats.js';

export const PROJECT_TEMPLATES = [
  {
    id: 'proj_todo_web',
    name: 'Todo App & Task Manager',
    category: 'Frontend & Utilities',
    techStack: 'HTML5, CSS3, JavaScript ES6',
    requiredSkills: { javascript: 1 },
    energyCost: 35,
    baseStars: 15,
    baseUsers: 80,
    repBonus: 20,
    desc: 'Ứng dụng quản lý công việc lưu trữ LocalStorage, giao diện dark mode bóng bẩy.'
  },
  {
    id: 'proj_ecommerce_api',
    name: 'E-Commerce Platform & Payment API',
    category: 'Fullstack Web',
    techStack: 'Node.js, PostgreSQL, Stripe API',
    requiredSkills: { javascript: 2, database: 1, backend: 1 },
    energyCost: 55,
    baseStars: 65,
    baseUsers: 450,
    repBonus: 45,
    desc: 'Hệ thống giỏ hàng, giỏ thanh toán điện tử có xác thực JWT bảo mật cao.'
  },
  {
    id: 'proj_chat_realtime',
    name: 'Real-time Chat with WebSocket & Redis',
    category: 'Distributed Systems',
    techStack: 'Go, WebSockets, Redis Pub/Sub',
    requiredSkills: { backend: 3, database: 2 },
    energyCost: 70,
    baseStars: 180,
    baseUsers: 1800,
    repBonus: 80,
    desc: 'Hệ thống nhắn tin thời gian thực chịu tải 10,000 người dùng trực tuyến đồng thời.'
  },
  {
    id: 'proj_ai_agent_rag',
    name: 'Autonomous AI Coding Agent & RAG Pipeline',
    category: 'Frontier AI & LLM',
    techStack: 'Python, LangChain, Vector Database, OpenAI API',
    requiredSkills: { python: 4, ai_ml: 3 },
    energyCost: 85,
    baseStars: 650,
    baseUsers: 7200,
    repBonus: 160,
    desc: 'Agent AI tự động đọc codebase, phát hiện lỗ hổng bảo mật và viết unit test tự động.'
  }
];

export class PortfolioManager {
  static getProjects() {
    return state.data.portfolioProjects || [];
  }

  static buildProject(templateId) {
    const template = PROJECT_TEMPLATES.find(p => p.id === templateId);
    if (!template) return false;

    // Check if already built
    const existing = (state.data.portfolioProjects || []).find(p => p.id === templateId);
    if (existing) {
      audio.playError();
      state.log(`[WARN] Bạn đã hoàn thành và deploy dự án "${template.name}" trước đó rồi!`, 'warning');
      return false;
    }

    // Check skills
    for (const [skillId, reqLevel] of Object.entries(template.requiredSkills)) {
      const currentLevel = state.data.skills[skillId] ? state.data.skills[skillId].level : 0;
      if (currentLevel < reqLevel) {
        audio.playError();
        state.log(`❌ Kỹ năng chưa đủ để xây dựng dự án này! Cần ${skillId.toUpperCase()} Cấp ${reqLevel}.`, 'danger');
        return false;
      }
    }

    // Check energy
    if (state.data.stats.energy < template.energyCost) {
      audio.playError();
      state.log(`[WARN] Quá kiệt sức để code dự án! Cần ít nhất ${template.energyCost} Năng lượng.`, 'warning');
      return false;
    }

    StatsManager.consumeEnergy(template.energyCost);
    audio.playKeypress();

    // Calculate quality based on Intelligence & Focus
    const qualityScore = Math.min(100, Math.floor(state.data.stats.intelligence * 0.6 + state.data.stats.focus * 0.4));
    const stars = Math.floor(template.baseStars * (qualityScore / 50));
    const users = Math.floor(template.baseUsers * (qualityScore / 50));

    state.update(d => {
      if (!d.portfolioProjects) d.portfolioProjects = [];
      d.portfolioProjects.push({
        id: template.id,
        name: template.name,
        category: template.category,
        techStack: template.techStack,
        stars,
        users,
        qualityScore,
        deployedDate: `Tuần ${d.time.week}, Ngày ${d.time.day}`
      });

      d.character.rep += template.repBonus;
      StatsManager.addExp(template.energyCost * 4);
      audio.playSuccess();
      state.log(`[LAUNCH] DEPLOY THÀNH CÔNG: "${template.name}"! Dự án đạt ${stars} Stars trên GitHub và ${users} người dùng thật! +${template.repBonus} REP!`, 'success');
    });

    return true;
  }
}

