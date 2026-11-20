// Master UI Controller for CODE LEGACY
import { state } from '../engine/state.js';
import { audio } from '../engine/audio.js';
import { ITEMS } from '../economy/items.js';
import { ShopManager } from '../economy/shop.js';
import { SkillTreeManager } from '../skills/skillTree.js';
import { CHALLENGES } from '../skills/challenges.js';
import { QuestEngine } from '../quests/questEngine.js';
import { ALL_CHAPTERS } from '../quests/allChapters.js';
import { WEEKLY_MISSIONS, WeeklyMissionManager } from '../quests/weeklyQuests.js';
import { FREELANCE_GIGS, FreelanceManager } from '../career/freelance.js';
import { COMPANIES } from '../career/companies.js';
import { InterviewManager } from '../career/interviews.js';
import { CareerManager } from '../career/careerManager.js';
import { PROJECT_TEMPLATES, PortfolioManager } from '../career/portfolio.js';
import { STARTUP_DOMAINS, EMPLOYEES_CATALOG, StartupManager } from '../business/startup.js';
import { ACHIEVEMENTS, AchievementManager } from '../achievements/achievements.js';
import { NPCS, DialogueManager } from '../story/dialogue.js';
import { LifeManager } from '../life/lifeActions.js';
import { Customizer, AVATAR_OPTIONS } from '../character/customizer.js';
import { BACKGROUND_ARCHETYPES, CharacterCreationManager } from '../character/characterCreation.js';

export class UIManager {
  constructor() {
    this.currentTab = 'overview';
    this.activeChallenge = null;
    this.activeInterview = null;
  }

  init() {
    this.renderAll();
    this.setupTabEvents();
    this.setupModalEvents();
    this.setupCreationModal();
    state.subscribe((event, payload, data) => this.onStateChange(event, payload, data));
  }

  setupTabEvents() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) {
          this.switchTab(tab);
          audio.playClick();
        }
      });
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    const menuModal = document.getElementById('game-menu-modal');

    if (tabId === 'overview') {
      if (menuModal) menuModal.classList.add('hidden');
      if (window.game3D && window.game3D.player && window.game3D.player.isSitting) {
        window.game3D.player.setSitting(false);
      }
    } else {
      if (menuModal) menuModal.classList.remove('hidden');
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('hidden', content.id !== `tab-${tabId}`);
    });
    this.renderCurrentTab();
  }

  toggleMenuModal(tabId) {
    const modal = document.getElementById('game-menu-modal');
    if (!modal) return;
    
    if (tabId) {
      this.switchTab(tabId);
    } else {
      if (modal.classList.contains('hidden')) {
        this.switchTab('skills');
      } else {
        this.closeMenuModal();
      }
    }
    audio.playClick();
  }

  closeMenuModal() {
    const modal = document.getElementById('game-menu-modal');
    if (modal) modal.classList.add('hidden');
    if (window.game3D && window.game3D.player && window.game3D.player.isSitting) {
      window.game3D.player.setSitting(false);
    }
    audio.playClick();
  }

  onStateChange(event, payload) {
    this.renderHUD();
    this.renderLifeBars();
    if (event === 'log') {
      this.renderLogs();
      this.showToast(payload.text, payload.type);
    } else {
      this.renderCurrentTab();
    }
  }

  renderAll() {
    this.renderHUD();
    this.renderLifeBars();
    this.renderLogs();
    this.renderCurrentTab();
  }

  renderHUD() {
    const d = state.data;
    const nameEl = document.getElementById('hud-char-name');
    const titleEl = document.getElementById('hud-char-title');
    const stageEl = document.getElementById('hud-char-stage');
    const levelEl = document.getElementById('hud-char-level');
    const expBarEl = document.getElementById('hud-exp-bar');
    const expTextEl = document.getElementById('hud-exp-text');
    const moneyEl = document.getElementById('hud-money');
    const repEl = document.getElementById('hud-rep');
    const timeEl = document.getElementById('hud-time');
    const chapterEl = document.getElementById('hud-chapter');

    if (nameEl) nameEl.textContent = d.character.name;
    if (titleEl) titleEl.textContent = d.character.title;
    if (stageEl) stageEl.textContent = d.character.stageTitle;
    if (levelEl) levelEl.textContent = `Lv. ${d.character.level}`;

    const expPercent = Math.min(100, Math.round((d.character.exp / d.character.expNext) * 100));
    if (expBarEl) expBarEl.style.width = `${expPercent}%`;
    if (expTextEl) expTextEl.textContent = `${d.character.exp} / ${d.character.expNext} EXP (${expPercent}%)`;

    if (moneyEl) moneyEl.textContent = `$${d.character.money.toLocaleString()}`;
    if (repEl) repEl.textContent = `${d.character.rep} REP`;

    const hourStr = String(d.time.hour).padStart(2, '0');
    const minStr = String(d.time.minute).padStart(2, '0');
    if (timeEl) timeEl.textContent = `${d.time.dayOfWeek} · ${hourStr}:${minStr} (Tuần ${d.time.week}, Ngày ${d.time.day})`;
    if (chapterEl) chapterEl.textContent = d.chapter.title;
  }

  renderLifeBars() {
    const s = state.data.stats;
    this.updateBar('bar-energy', 'val-energy', s.energy, s.maxEnergy, '%', '#00f0ff');
    this.updateBar('bar-mental', 'val-mental', s.mentalHealth, 100, '%', '#a855f7');
    this.updateBar('bar-health', 'val-health', s.health, 100, '%', '#10b981');
    this.updateBar('bar-focus', 'val-focus', s.focus, 100, '', '#38bdf8');
    this.updateBar('bar-discipline', 'val-discipline', s.discipline, 100, '', '#f59e0b');
    this.updateBar('bar-intel', 'val-intel', s.intelligence, 100, '', '#ec4899');
  }

  updateBar(barId, valId, current, max, unit, color) {
    const bar = document.getElementById(barId);
    const val = document.getElementById(valId);
    const pct = Math.min(100, Math.max(0, Math.round((current / max) * 100)));
    if (bar) {
      bar.style.width = `${pct}%`;
      bar.style.backgroundColor = color;
    }
    if (val) {
      val.textContent = `${Math.round(current)}/${max}${unit}`;
    }
  }

  renderCurrentTab() {
    switch (this.currentTab) {
      case 'overview': this.renderOverviewTab(); break;
      case 'skills': this.renderSkillsTab(); break;
      case 'quests': this.renderQuestsTab(); break;
      case 'career': this.renderCareerTab(); break;
      case 'portfolio': this.renderPortfolioTab(); break;
      case 'startup': this.renderStartupTab(); break;
      case 'freelance': this.renderFreelanceTab(); break;
      case 'shop': this.renderShopTab(); break;
      case 'achievements': this.renderAchievementsTab(); break;
      case 'logs': this.renderLogs(); break;
    }
    this.renderLifeActions();
  }

  renderOverviewTab() {
    const el = document.getElementById('overview-gear-list');
    if (!el) return;
    const eq = state.data.equipped;

    const gearItems = [
      { slot: 'Máy tính', id: eq.laptop },
      { slot: 'Bàn phím', id: eq.keyboard },
      { slot: 'Màn hình', id: eq.monitor },
      { slot: 'Ghế ngồi', id: eq.chair }
    ];

    el.innerHTML = gearItems.map(g => {
      const item = ITEMS[g.id] || { name: 'Chưa có', rarity: 'common' };
      return `
        <div class="flex items-center justify-between p-3 rounded bg-slate-900/60 border border-slate-800">
          <div>
            <div class="text-xs text-slate-400">${g.slot}</div>
            <div class="text-sm font-semibold text-slate-100">${item.name}</div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded badge-${item.rarity} uppercase font-bold tracking-wider">
            ${item.rarity}
          </span>
        </div>
      `;
    }).join('');

    // Avatar selector
    const avatarContainer = document.getElementById('avatar-selector-container');
    if (avatarContainer) {
      avatarContainer.innerHTML = AVATAR_OPTIONS.map(opt => {
        const isUnlocked = state.data.character.stage >= opt.stageMin;
        const isCurrent = state.data.character.avatar === opt.id;
        return `
          <button class="px-3 py-1.5 text-xs rounded border transition-all ${
            isCurrent ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold' :
            isUnlocked ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500' :
            'opacity-40 bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
          }" data-avatar-id="${opt.id}" ${!isUnlocked ? 'disabled' : ''}>
            ${opt.label} ${!isUnlocked ? `(Mở khóa Giai đoạn ${opt.stageMin})` : ''}
          </button>
        `;
      }).join('');

      avatarContainer.querySelectorAll('button[data-avatar-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          Customizer.setAvatar(e.currentTarget.dataset.avatarId);
        });
      });
    }

    // NPC Talk Box
    const npcBox = document.getElementById('npc-dialogue-box');
    if (npcBox) {
      const npcList = Object.values(NPCS);
      npcBox.innerHTML = npcList.map(npc => {
        const d = npc.dialogues[0];
        return `
          <div class="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xl">${npc.avatar}</span>
              <div>
                <div class="text-xs font-bold text-slate-100">${npc.name}</div>
                <div class="text-[10px] text-slate-400">${npc.role}</div>
              </div>
            </div>
            <p class="text-xs text-slate-300 italic mb-2">"${d.text}"</p>
            <div class="flex flex-col gap-1.5">
              ${d.options.map(opt => `
                <button class="text-left p-2 rounded bg-slate-950/80 border border-slate-800 hover:border-cyan-500 text-[11px] text-cyan-300 transition-all npc-opt-btn" data-npc="${npc.id}">
                  👉 ${opt.text}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');

      npcBox.querySelectorAll('.npc-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const npcId = e.currentTarget.dataset.npc;
          DialogueManager.selectOption(npcId, NPCS[npcId].dialogues[0].options[0]);
        });
      });
    }
  }

  renderSkillsTab() {
    const listEl = document.getElementById('skills-tree-list');
    if (!listEl) return;
    const skills = SkillTreeManager.getSkillList();

    listEl.innerHTML = skills.map(s => {
      const pct = Math.min(100, Math.round((s.exp / s.expNext) * 100));
      return `
        <div class="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-slate-200">${s.name}</span>
              <span class="text-xs px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800 font-mono">
                Cấp ${s.level}/100
              </span>
            </div>
            <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-2">
              <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full progress-fill" style="width: ${pct}%"></div>
            </div>
            <div class="text-[11px] text-slate-400 font-mono flex justify-between">
              <span>EXP: ${s.exp}/${s.expNext}</span>
              <span>${pct}%</span>
            </div>
          </div>
          <div class="mt-4 flex gap-2">
            <button class="flex-1 py-1.5 px-3 rounded text-xs font-semibold bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 transition-all practice-btn" data-skill-id="${s.id}">
              ⚡ Tự Luyện Code (-15 Năng lượng)
            </button>
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.practice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        SkillTreeManager.practiceSkill(e.currentTarget.dataset.skillId);
      });
    });

    // Render Challenges list
    const chalListEl = document.getElementById('challenges-grid');
    if (chalListEl) {
      chalListEl.innerHTML = CHALLENGES.map(c => {
        return `
          <div class="p-4 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-800">${c.difficulty}</span>
                <span class="text-xs text-amber-400 font-semibold">+${c.rewardExp} EXP</span>
              </div>
              <h4 class="text-sm font-bold text-slate-200 mb-1">${c.title}</h4>
              <p class="text-xs text-slate-400 line-clamp-2">${c.question}</p>
            </div>
            <button class="mt-4 w-full py-1.5 rounded text-xs font-bold bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 transition-all open-challenge-btn" data-chal-id="${c.id}">
              🧠 Vào Làm Thử Thách
            </button>
          </div>
        `;
      }).join('');

      chalListEl.querySelectorAll('.open-challenge-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.openChallengeModal(e.currentTarget.dataset.chalId);
        });
      });
    }
  }

  renderQuestsTab() {
    // 1. All 10 Chapters roadmap
    const chaptersRoadmap = document.getElementById('chapters-roadmap-list');
    if (chaptersRoadmap) {
      const currentCh = state.data.chapter.current;
      chaptersRoadmap.innerHTML = Object.values(ALL_CHAPTERS).map(ch => {
        const isCurrent = ch.number === currentCh;
        const isPassed = ch.number < currentCh;
        const isLocked = ch.number > currentCh;

        return `
          <div class="p-3.5 rounded-xl border transition-all ${
            isCurrent ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/10' :
            isPassed ? 'bg-slate-900/40 border-emerald-500/40 opacity-80' :
            'bg-slate-950/40 border-slate-800/80 opacity-50'
          }">
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-bold font-mono ${isCurrent ? 'text-cyan-300' : isPassed ? 'text-emerald-400' : 'text-slate-500'}">
                CHƯƠNG ${ch.number}
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                isCurrent ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-800' :
                isPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-800' :
                'bg-slate-800 text-slate-500'
              }">
                ${isCurrent ? 'Đang Thực Hiện' : isPassed ? 'Đã Hoàn Thành' : 'Chưa Mở Khóa'}
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-100">${ch.title}</h4>
            <p class="text-xs text-slate-400 mt-1">${ch.description}</p>
            <div class="mt-2 text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Đích đến: <strong class="text-slate-300">${ch.keyMilestone}</strong></span>
              <span class="text-amber-400">${ch.rewardSummary}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    // 2. Active Quests
    const listEl = document.getElementById('quests-active-list');
    if (listEl) {
      const quests = QuestEngine.getActiveQuests();
      if (quests.length === 0) {
        listEl.innerHTML = `<div class="p-4 text-center text-slate-500 text-xs">Hiện không còn nhiệm vụ nào đang chờ. Hãy tự luyện tập và giải thử thách!</div>`;
      } else {
        listEl.innerHTML = quests.map(q => `
          <div class="p-4 rounded-lg bg-slate-900/80 border ${q.category === 'boss' ? 'border-amber-500/60 shadow-lg shadow-amber-500/10' : 'border-slate-800'}">
            <div class="flex justify-between items-start mb-2">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${q.category === 'boss' ? 'bg-amber-500/20 text-amber-300 border border-amber-500' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-800'}">
                  ${q.category === 'boss' ? '🔥 BOSS THỬ THÁCH' : 'NHIỆM VỤ CHÍNH'}
                </span>
                <h4 class="text-base font-bold text-slate-100 mt-1">${q.title}</h4>
                <div class="text-xs text-slate-400 italic">Người giao: <span class="text-slate-200">${q.giver}</span></div>
              </div>
              <div class="text-right">
                <span class="text-xs text-emerald-400 font-bold block">+$${q.rewards.money || 0}</span>
                <span class="text-xs text-amber-400 font-semibold block">+${q.rewards.exp || 0} EXP</span>
              </div>
            </div>
            <p class="text-xs text-slate-300 mt-2 bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
              "${q.dialogue.intro}"
            </p>
            <div class="mt-3 text-xs text-slate-400">
              <span class="font-semibold text-cyan-400">Yêu cầu:</span> ${q.desc}
            </div>
          </div>
        `).join('');
      }
    }

    // 3. Weekly Sprint Mission
    const weeklyBox = document.getElementById('weekly-mission-box');
    if (weeklyBox) {
      const mission = WeeklyMissionManager.getActiveWeeklyMission();
      weeklyBox.innerHTML = `
        <div class="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] uppercase font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-900/50 border border-purple-700">
                WEEKLY SPRINT ${mission.week}
              </span>
              <h4 class="text-sm font-bold text-white mt-1">${mission.title}</h4>
            </div>
            <span class="text-xs font-bold text-amber-400">+${mission.rewardExp} EXP · +$${mission.rewardMoney}</span>
          </div>
          <p class="text-xs text-slate-300 mt-2">${mission.desc}</p>
          <div class="mt-3 text-xs text-purple-200 font-mono">
            Tiến độ: ${mission.currentPractice || 0} / ${mission.requirements.practiceCount || 1} phiên luyện tập
          </div>
        </div>
      `;
    }
  }

  renderCareerTab() {
    // Current Job Status
    const statusBox = document.getElementById('career-current-status');
    if (statusBox) {
      const comp = CareerManager.getCurrentJob();
      if (comp) {
        statusBox.innerHTML = `
          <div class="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 flex justify-between items-center">
            <div>
              <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider">ĐANG LÀM VIỆC TẠI:</span>
              <h3 class="text-lg font-extrabold text-white mt-0.5">${comp.name}</h3>
              <p class="text-xs text-slate-400">Lương cứng: <strong class="text-emerald-400 font-mono">$${comp.monthlySalary.toLocaleString()}/tháng</strong> · Gia nhập: ${comp.joinedDate}</p>
            </div>
            <button id="btn-resign-job" class="px-3 py-1.5 rounded bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-bold hover:bg-rose-900/50 transition-all">
              Nộp Đơn Từ Chức
            </button>
          </div>
        `;
        document.getElementById('btn-resign-job').onclick = () => {
          CareerManager.resignJob();
          this.renderCareerTab();
        };
      } else {
        statusBox.innerHTML = `
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span class="text-2xl block mb-1">👔</span>
            <div class="text-sm font-bold text-slate-200">Bạn đang là Lập trình viên tự do (Chưa vào công ty)</div>
            <p class="text-xs text-slate-400 mt-1">Hãy tích lũy kinh nghiệm, nâng cao kỹ năng và nộp hồ sơ phỏng vấn tại các tập đoàn dưới đây.</p>
          </div>
        `;
      }
    }

    // Company Recruitment List
    const compList = document.getElementById('career-companies-list');
    if (compList) {
      compList.innerHTML = Object.values(COMPANIES).map(c => {
        const check = InterviewManager.checkEligibility(c.id);
        return `
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">${c.logo}</span>
                  <div>
                    <h4 class="text-sm font-bold text-white">${c.name}</h4>
                    <span class="text-[10px] text-cyan-400 font-mono">${c.tier}</span>
                  </div>
                </div>
                <span class="text-xs font-bold text-emerald-400 font-mono">~$${c.monthlySalary.toLocaleString()}/th</span>
              </div>
              <p class="text-xs text-slate-400 mt-2">${c.workCulture}</p>
              <div class="mt-3 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                <span class="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Quy mô: ${c.size}</span>
                <span class="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Cần: Lv.${c.minLevel}</span>
                <span class="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">REP: ${c.minRep}</span>
              </div>
            </div>
            <button class="mt-4 w-full py-2 rounded text-xs font-bold transition-all ${
              check.eligible ? 'bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 apply-company-btn' :
              'bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed'
            }" data-comp-id="${c.id}" ${!check.eligible ? 'disabled' : ''}>
              ${check.eligible ? '📝 Nộp CV & Phỏng Vấn Trực Tiếp' : `Chưa Đạt Yêu Cầu (${check.reason})`}
            </button>
          </div>
        `;
      }).join('');

      compList.querySelectorAll('.apply-company-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.openInterviewModal(e.currentTarget.dataset.compId);
        });
      });
    }
  }

  renderPortfolioTab() {
    const listEl = document.getElementById('portfolio-projects-list');
    if (!listEl) return;
    const existing = PortfolioManager.getProjects();

    listEl.innerHTML = PROJECT_TEMPLATES.map(tpl => {
      const isBuilt = existing.find(p => p.id === tpl.id);
      return `
        <div class="p-4 rounded-xl bg-slate-900/80 border ${isBuilt ? 'border-cyan-500/50 bg-cyan-950/20' : 'border-slate-800'} flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] text-cyan-400 uppercase font-mono">${tpl.category}</span>
                <h4 class="text-sm font-bold text-white mt-0.5">${tpl.name}</h4>
              </div>
              <span class="text-xs font-bold text-amber-400 font-mono">+${tpl.repBonus} REP</span>
            </div>
            <p class="text-xs text-slate-400 mt-2">${tpl.desc}</p>
            <div class="mt-3 text-[11px] font-mono text-slate-400">
              <div>Tech Stack: <span class="text-slate-200">${tpl.techStack}</span></div>
              <div class="text-cyan-300 mt-0.5">Tiêu hao: ${tpl.energyCost} Năng lượng</div>
            </div>
          </div>
          <div class="mt-4">
            ${isBuilt ? `
              <div class="p-2.5 rounded bg-emerald-950/40 border border-emerald-600/50 text-xs text-emerald-300 font-mono flex justify-between items-center">
                <span>⭐ ${isBuilt.stars} Stars</span>
                <span>👥 ${isBuilt.users} Users</span>
                <span class="text-emerald-400 font-bold">ONLINE</span>
              </div>
            ` : `
              <button class="w-full py-2 rounded text-xs font-bold bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 transition-all build-project-btn" data-tpl-id="${tpl.id}">
                💻 Lập Trình & Deploy Lên Production
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.build-project-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        PortfolioManager.buildProject(e.currentTarget.dataset.tplId);
      });
    });
  }

  renderStartupTab() {
    const startupBox = document.getElementById('startup-dashboard-content');
    if (!startupBox) return;
    const s = StartupManager.getStartup();

    if (!s) {
      startupBox.innerHTML = `
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 text-center max-w-xl mx-auto">
          <span class="text-4xl block mb-2">🚀</span>
          <h3 class="text-base font-extrabold text-white">Khởi Nghiệp Doanh Nghiệp Công Nghệ</h3>
          <p class="text-xs text-slate-400 mt-1 mb-4">
            Bước ra khỏi vùng an toàn làm thuê để sáng lập công ty của chính bạn. Yêu cầu vốn khởi điểm tối thiểu $10,000 tiền mặt.
          </p>
          <div class="text-left space-y-3 mb-4">
            <div>
              <label class="text-xs text-slate-300 font-bold block mb-1">Tên công ty Startup:</label>
              <input type="text" id="input-startup-name" value="ApexNova Labs" class="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-xs text-white" />
            </div>
            <div>
              <label class="text-xs text-slate-300 font-bold block mb-1">Lĩnh vực sản phẩm cốt lõi:</label>
              <select id="select-startup-domain" class="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-xs text-white">
                ${STARTUP_DOMAINS.map(d => `<option value="${d.id}">${d.name} (${d.potential})</option>`).join('')}
              </select>
            </div>
          </div>
          <button id="btn-found-startup" class="w-full py-2.5 rounded bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-xs shadow-lg hover:opacity-90 transition-all">
            Khởi Tạo Công Ty ($10,000 Vốn Điều Lệ)
          </button>
        </div>
      `;

      const foundBtn = document.getElementById('btn-found-startup');
      if (foundBtn) {
        foundBtn.onclick = () => {
          const name = document.getElementById('input-startup-name').value;
          const domain = document.getElementById('select-startup-domain').value;
          StartupManager.foundStartup({ companyName: name, domainId: domain });
          this.renderStartupTab();
        };
      }
    } else {
      startupBox.innerHTML = `
        <div class="space-y-4">
          <!-- Startup Top Stats -->
          <div class="glass-panel p-5 rounded-xl border border-purple-500/40 bg-gradient-to-r from-purple-950/30 to-slate-900/60 flex flex-wrap justify-between items-center gap-4">
            <div>
              <span class="text-[10px] uppercase font-bold text-purple-400 font-mono tracking-wider">VÒNG GỌI VỐN: ${s.fundingRound}</span>
              <h2 class="text-xl font-extrabold text-white mt-0.5">${s.name}</h2>
              <p class="text-xs text-slate-300">Lĩnh vực: ${s.domain}</p>
            </div>
            <div class="flex gap-4 font-mono text-xs">
              <div class="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <div class="text-slate-400 text-[10px]">ĐỊNH GIÁ (VALUATION)</div>
                <div class="text-amber-400 font-bold text-sm">$${s.valuation.toLocaleString()}</div>
              </div>
              <div class="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <div class="text-slate-400 text-[10px]">DOANH THU THÁNG (MRR)</div>
                <div class="text-emerald-400 font-bold text-sm">+$${s.monthlyRevenue.toLocaleString()}/th</div>
              </div>
              <div class="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <div class="text-slate-400 text-[10px]">CHI PHÍ VẬN HÀNH (BURN RATE)</div>
                <div class="text-rose-400 font-bold text-sm">-$${s.monthlyBurnRate.toLocaleString()}/th</div>
              </div>
            </div>
          </div>

          <!-- Product MVP & Pitch VC -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="glass-panel p-4 rounded-xl border border-slate-800">
              <h4 class="text-xs uppercase font-extrabold text-slate-300 mb-2">Tiến Độ Phát Triển Sản Phẩm (MVP)</h4>
              <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2">
                <div class="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full" style="width: ${s.productProgress}%"></div>
              </div>
              <div class="flex justify-between text-xs font-mono text-slate-400">
                <span>Trạng thái: ${s.productProgress >= 80 ? 'Sẵn sàng Scale' : 'Đang hoàn thiện MVP'}</span>
                <span class="text-cyan-300 font-bold">${s.productProgress}%</span>
              </div>
              <button id="btn-pitch-vc" class="mt-4 w-full py-2 rounded text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-300 transition-all">
                💎 Thuyết Trình Gọi Vốn Series A ($1.5M)
              </button>
            </div>

            <!-- Hire Talent -->
            <div class="glass-panel p-4 rounded-xl border border-slate-800">
              <h4 class="text-xs uppercase font-extrabold text-slate-300 mb-2">Chiêu Mộ Nhân Tài Kỹ Thuật</h4>
              <div class="space-y-2">
                ${EMPLOYEES_CATALOG.map(emp => `
                  <div class="flex justify-between items-center p-2 rounded bg-slate-950/80 border border-slate-800 text-xs">
                    <div>
                      <div class="font-bold text-slate-200">${emp.name}</div>
                      <div class="text-[10px] text-slate-400">Lương: $${emp.salary}/th · +${emp.outputPoints} Pts</div>
                    </div>
                    <button class="px-2.5 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 text-xs font-bold hire-emp-btn" data-emp-id="${emp.id}">
                      Tuyển Dụng
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      document.querySelectorAll('.hire-emp-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          StartupManager.hireEmployee(e.currentTarget.dataset.empId);
        });
      });

      const pitchBtn = document.getElementById('btn-pitch-vc');
      if (pitchBtn) {
        pitchBtn.onclick = () => {
          StartupManager.pitchVC();
        };
      }
    }
  }

  renderFreelanceTab() {
    const listEl = document.getElementById('freelance-gigs-list');
    if (!listEl) return;

    listEl.innerHTML = FREELANCE_GIGS.map(g => {
      const playerSkill = state.data.skills[g.requiredSkill];
      const playerLevel = playerSkill ? playerSkill.level : 0;
      const isEligible = playerLevel >= g.requiredLevel;

      return `
        <div class="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <div>
                <span class="text-xs text-slate-400 font-mono">${g.client}</span>
                <h4 class="text-sm font-bold text-slate-100 mt-0.5">${g.title}</h4>
              </div>
              <span class="text-base font-bold text-emerald-400 font-mono">+$${g.payout}</span>
            </div>
            <p class="text-xs text-slate-400 mt-2">${g.desc}</p>
            <div class="mt-3 flex gap-3 text-xs font-mono">
              <span class="text-cyan-400">⚡ Tiêu hao: ${g.energyCost} Năng lượng</span>
              <span class="${isEligible ? 'text-emerald-400' : 'text-rose-400'}">
                🎯 Yêu cầu: ${g.requiredSkill.toUpperCase()} Lv.${g.requiredLevel} (Hiện có: Lv.${playerLevel})
              </span>
            </div>
          </div>
          <button class="mt-4 w-full py-2 rounded text-xs font-bold transition-all ${
            isEligible ? 'bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 accept-gig-btn' :
            'bg-slate-800/40 border border-slate-800 text-slate-500 cursor-not-allowed'
          }" data-gig-id="${g.id}" ${!isEligible ? 'disabled' : ''}>
            ${isEligible ? '💼 Nhận Hợp Đồng & Triển Khai Ngay' : 'Kỹ Năng Chưa Đạt Yêu Cầu'}
          </button>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.accept-gig-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        FreelanceManager.acceptAndExecuteGig(e.currentTarget.dataset.gigId);
      });
    });
  }

  renderShopTab() {
    const listEl = document.getElementById('shop-items-grid');
    if (!listEl) return;
    const items = Object.values(ITEMS);

    listEl.innerHTML = items.map(item => {
      const isEquipped = Object.values(state.data.equipped).includes(item.id);
      const isConsumable = item.category === 'consumable' || item.category === 'book';

      return `
        <div class="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <span class="text-[10px] px-2 py-0.5 rounded badge-${item.rarity} uppercase font-bold tracking-wider">
                ${item.rarity}
              </span>
              <span class="text-sm font-bold text-amber-400 font-mono">
                ${item.price === 0 ? 'Mặc định' : `$${item.price.toLocaleString()}`}
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-100 mt-2">${item.name}</h4>
            <p class="text-xs text-slate-400 mt-1">${item.desc}</p>
          </div>
          <div class="mt-4">
            ${isEquipped ? `
              <div class="w-full py-1.5 text-center text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-800 rounded">
                Đang Sử Dụng
              </div>
            ` : item.price === 0 ? `
              <div class="w-full py-1.5 text-center text-xs text-slate-500">Đã sở hữu</div>
            ` : `
              <button class="w-full py-1.5 rounded text-xs font-bold bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 transition-all buy-item-btn" data-item-id="${item.id}">
                ${isConsumable ? 'Mua Ngay' : 'Mua & Trang Bị'} ($${item.price})
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.buy-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        ShopManager.buyItem(e.currentTarget.dataset.itemId);
      });
    });

    // Render inventory
    const invEl = document.getElementById('inventory-list');
    if (invEl) {
      const inv = state.data.inventory;
      if (inv.length === 0) {
        invEl.innerHTML = `<div class="text-xs text-slate-500 p-2">Túi đồ rỗng.</div>`;
      } else {
        invEl.innerHTML = inv.map((itemId, idx) => {
          const it = ITEMS[itemId] || { name: itemId, category: 'item' };
          const isUsable = it.category === 'consumable' || it.category === 'book';
          return `
            <div class="flex items-center justify-between p-2 rounded bg-slate-950/70 border border-slate-800 text-xs">
              <span class="text-slate-200">${it.name}</span>
              ${isUsable ? `
                <button class="px-2 py-0.5 rounded bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 use-item-btn" data-item-id="${itemId}" data-index="${idx}">
                  Sử dụng
                </button>
              ` : `
                <span class="text-[10px] text-slate-500">Vật phẩm</span>
              `}
            </div>
          `;
        }).join('');

        invEl.querySelectorAll('.use-item-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            ShopManager.useConsumable(e.currentTarget.dataset.itemId, parseInt(e.currentTarget.dataset.index));
          });
        });
      }
    }
  }

  renderAchievementsTab() {
    const listEl = document.getElementById('achievements-grid-list');
    if (!listEl) return;
    const unlocked = state.data.unlockedAchievements || [];

    listEl.innerHTML = ACHIEVEMENTS.map(ach => {
      const isUnlocked = unlocked.includes(ach.id);
      return `
        <div class="p-4 rounded-xl border flex items-center gap-3 transition-all ${
          isUnlocked ? 'bg-cyan-950/30 border-cyan-400/60 shadow-lg shadow-cyan-500/10' :
          'bg-slate-950/40 border-slate-800/80 opacity-40'
        }">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
            isUnlocked ? 'bg-cyan-500/20 border border-cyan-400' : 'bg-slate-900 border border-slate-800'
          }">
            ${ach.icon}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold text-white">${ach.title}</h4>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded ${isUnlocked ? 'text-emerald-400 bg-emerald-950/60' : 'text-slate-500'}">
                ${isUnlocked ? 'ĐÃ ĐẠT' : 'KHÓA'}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">${ach.desc}</p>
            <span class="text-[10px] text-amber-400 font-mono mt-1 block">+${ach.rewardExp} EXP</span>
          </div>
        </div>
      `;
    }).join('');
  }

  renderLifeActions() {
    const sleepBtn = document.getElementById('action-sleep');
    const napBtn = document.getElementById('action-nap');
    const gymBtn = document.getElementById('action-gym');
    const mealBtn = document.getElementById('action-meal');
    const relaxBtn = document.getElementById('action-relax');

    if (sleepBtn) sleepBtn.onclick = () => LifeManager.sleepFullNight();
    if (napBtn) napBtn.onclick = () => LifeManager.takeNap();
    if (gymBtn) gymBtn.onclick = () => LifeManager.workoutGym();
    if (mealBtn) mealBtn.onclick = () => LifeManager.eatNutritiousMeal();
    if (relaxBtn) relaxBtn.onclick = () => LifeManager.meditateAndRelax();
  }

  renderLogs() {
    const listEl = document.getElementById('game-logs-container');
    if (!listEl) return;
    listEl.innerHTML = state.data.logs.map(l => {
      const color = l.type === 'success' ? 'text-emerald-400' :
                    l.type === 'danger' ? 'text-rose-400' :
                    l.type === 'warning' ? 'text-amber-400' : 'text-slate-300';
      return `
        <div class="text-xs font-mono py-1 border-b border-slate-900 flex gap-2">
          <span class="text-slate-500">[${l.time}]</span>
          <span class="${color}">${l.text}</span>
        </div>
      `;
    }).join('');
  }

  openChallengeModal(challengeId) {
    const chal = CHALLENGES.find(c => c.id === challengeId);
    if (!chal) return;
    this.activeChallenge = chal;

    const modal = document.getElementById('challenge-modal');
    const titleEl = document.getElementById('modal-chal-title');
    const qEl = document.getElementById('modal-chal-question');
    const codeEl = document.getElementById('modal-chal-code');
    const optionsEl = document.getElementById('modal-chal-options');
    const feedbackEl = document.getElementById('modal-chal-feedback');

    if (titleEl) titleEl.textContent = chal.title;
    if (qEl) qEl.textContent = chal.question;
    if (codeEl) codeEl.textContent = chal.codeSnippet;
    if (feedbackEl) feedbackEl.classList.add('hidden');

    if (optionsEl) {
      optionsEl.innerHTML = chal.options.map(opt => `
        <button class="w-full text-left p-3 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-200 transition-all option-btn" data-opt-id="${opt.id}">
          <span class="font-bold text-cyan-400 mr-2">${opt.id}.</span> ${opt.text}
        </button>
      `).join('');

      optionsEl.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.submitChallengeAnswer(e.currentTarget.dataset.optId);
        });
      });
    }

    if (modal) modal.classList.remove('hidden');
    audio.playClick();
  }

  submitChallengeAnswer(chosenOptId) {
    if (!this.activeChallenge) return;
    const res = SkillTreeManager.submitChallenge(this.activeChallenge.id, chosenOptId);
    const feedbackEl = document.getElementById('modal-chal-feedback');

    if (feedbackEl) {
      feedbackEl.classList.remove('hidden');
      if (res.success) {
        feedbackEl.className = 'p-3 rounded bg-emerald-950/80 border border-emerald-600 text-xs text-emerald-200 mt-4';
        feedbackEl.innerHTML = `<strong>✅ Chính xác!</strong> ${res.explanation}`;
        QuestEngine.checkQuestProgress('challenge_solved', { challengeId: this.activeChallenge.id });
      } else {
        feedbackEl.className = 'p-3 rounded bg-rose-950/80 border border-rose-600 text-xs text-rose-200 mt-4';
        feedbackEl.innerHTML = `<strong>❌ Chưa đúng!</strong> ${res.explanation}`;
      }
    }
  }

  openInterviewModal(companyId) {
    const comp = COMPANIES[companyId];
    if (!comp) return;
    const questions = InterviewManager.getQuestions(companyId);
    let currentQIndex = 0;
    let score = 0;

    const modal = document.getElementById('interview-modal');
    const compTitle = document.getElementById('modal-interview-company');
    const qContent = document.getElementById('modal-interview-q');
    const optionsBox = document.getElementById('modal-interview-options');
    const progressEl = document.getElementById('modal-interview-progress');

    compTitle.textContent = `Phỏng Vấn: ${comp.name}`;

    const renderQuestion = () => {
      const q = questions[currentQIndex];
      progressEl.textContent = `Câu hỏi ${currentQIndex + 1} / ${questions.length}`;
      qContent.textContent = q.q;

      optionsBox.innerHTML = q.options.map((opt, idx) => `
        <button class="w-full text-left p-3 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-200 transition-all int-opt-btn" data-idx="${idx}">
          ${opt.text}
        </button>
      `).join('');

      optionsBox.querySelectorAll('.int-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.idx);
          if (q.options[idx].correct) score += 1;

          currentQIndex += 1;
          if (currentQIndex < questions.length) {
            renderQuestion();
          } else {
            // Finished
            modal.classList.add('hidden');
            InterviewManager.processInterviewResult(companyId, score, questions.length);
          }
        });
      });
    };

    renderQuestion();
    if (modal) modal.classList.remove('hidden');
    audio.playClick();
  }

  setupCreationModal() {
    const modal = document.getElementById('character-creation-modal');
    if (!modal) return;

    // Check if player has default uncustomized character
    const newGameBtn = document.getElementById('btn-new-character-game');
    if (newGameBtn) {
      newGameBtn.onclick = () => {
        modal.classList.remove('hidden');
      };
    }

    const bgContainer = document.getElementById('create-char-backgrounds');
    if (bgContainer) {
      bgContainer.innerHTML = BACKGROUND_ARCHETYPES.map((bg, idx) => `
        <label class="p-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 cursor-pointer flex flex-col justify-between block">
          <div>
            <div class="flex items-center gap-2">
              <input type="radio" name="char-bg" value="${bg.id}" ${idx === 0 ? 'checked' : ''} />
              <span class="font-bold text-xs text-white">${bg.name}</span>
            </div>
            <p class="text-[11px] text-slate-400 mt-1">${bg.desc}</p>
          </div>
          <div class="mt-2 text-[10px] text-cyan-300 font-mono italic">"${bg.motto}"</div>
        </label>
      `).join('');
    }

    const confirmBtn = document.getElementById('btn-confirm-creation');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const nameInput = document.getElementById('create-char-name').value;
        const selectedBg = document.querySelector('input[name="char-bg"]:checked').value;
        CharacterCreationManager.createNewCharacter({ name: nameInput, backgroundId: selectedBg });
        modal.classList.add('hidden');
      };
    }
  }

  setupModalEvents() {
    const chalModal = document.getElementById('challenge-modal');
    const closeChal = document.getElementById('close-chal-modal');
    if (closeChal && chalModal) {
      closeChal.onclick = () => chalModal.classList.add('hidden');
    }

    const intModal = document.getElementById('interview-modal');
    const closeInt = document.getElementById('close-interview-modal');
    if (closeInt && intModal) {
      closeInt.onclick = () => intModal.classList.add('hidden');
    }

    const createModal = document.getElementById('character-creation-modal');
    const closeCreate = document.getElementById('close-create-modal');
    if (closeCreate && createModal) {
      closeCreate.onclick = () => createModal.classList.add('hidden');
    }

    const menuModal = document.getElementById('game-menu-modal');
    const closeMenu = document.getElementById('close-menu-modal');
    if (closeMenu && menuModal) {
      closeMenu.onclick = () => this.closeMenuModal();
    }
  }

  showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const border = type === 'success' ? 'border-emerald-500 text-emerald-300' :
                   type === 'danger' ? 'border-rose-500 text-rose-300' :
                   type === 'warning' ? 'border-amber-500 text-amber-300' : 'border-cyan-500 text-cyan-300';

    toast.className = `toast-msg max-w-sm p-3 rounded-lg bg-slate-900/95 border ${border} shadow-xl backdrop-blur-md text-xs font-mono`;
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
}

export const ui = new UIManager();
