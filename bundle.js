// CODE LEGACY - 3D RPG Master Bundle
(function() {
  "use strict";

// ==========================================
// MODULE: js/engine/audio.js
// ==========================================
// Procedural Sound Engine using Web Audio API (No external MP3 files required)
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.ambientPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playKeypress() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const freqs = [320, 380, 420, 480, 520];
    const randFreq = freqs[Math.floor(Math.random() * freqs.length)];
    osc.type = 'sine';
    osc.frequency.setValueAtTime(randFreq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.25);
    });
  }

  playLevelUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major fanfare
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.09);
      osc.stop(this.ctx.currentTime + idx * 0.09 + 0.4);
    });
  }

  playCoin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
    osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }
}

const audio = new AudioEngine();

// ==========================================
// MODULE: js/economy/items.js
// ==========================================
// Items, Tech Gear & Consumables Database
const ITEMS = {
  // --- LAPTOPS / WORKSTATIONS ---
  laptop_old: {
    id: 'laptop_old',
    name: 'Laptop Cũ Core i3 (2nd Hand)',
    category: 'laptop',
    rarity: 'common',
    price: 0,
    sellPrice: 30,
    desc: 'Laptop sinh viên cũ kỹ, quạt tản nhiệt kêu to, bàn phím mờ chữ. Nhưng là người bạn đồng hành đầu tiên.',
    buffs: { codingSpeed: 0, energyDrainReduction: 0 }
  },
  laptop_thinkpad: {
    id: 'laptop_thinkpad',
    name: 'ThinkPad T480 Cũ (Huyền thoại gõ phím)',
    category: 'laptop',
    rarity: 'uncommon',
    price: 320,
    sellPrice: 160,
    desc: 'Bàn phím nảy êm ái, độ bền chuẩn quân đội. Code không biết mỏi tay.',
    buffs: { codingSpeed: 15, energyDrainReduction: 10 }
  },
  laptop_macbook_pro: {
    id: 'laptop_macbook_pro',
    name: 'MacBook Pro 16" M3 Max',
    category: 'laptop',
    rarity: 'rare',
    price: 2800,
    sellPrice: 1400,
    desc: 'Cỗ máy tối thượng cho Software Engineer. Biên dịch code trong chớp mắt, pin trâu cả ngày.',
    buffs: { codingSpeed: 45, energyDrainReduction: 25, interviewAppeal: 20 }
  },
  workstation_ai: {
    id: 'workstation_ai',
    name: 'Workstation Dual RTX 4090 AI Monster',
    category: 'laptop',
    rarity: 'epic',
    price: 8500,
    sellPrice: 4200,
    desc: 'Quái vật điện toán phục vụ Deep Learning & System Architecture khổng lồ.',
    buffs: { codingSpeed: 100, energyDrainReduction: 40, focus: 25 }
  },

  // --- KEYBOARDS ---
  kb_membrane: {
    id: 'kb_membrane',
    name: 'Bàn phím cao su văn phòng',
    category: 'keyboard',
    rarity: 'common',
    price: 0,
    sellPrice: 5,
    desc: 'Cảm giác gõ nặng nề, dễ mỏi cổ tay sau 2 tiếng liên tục.',
    buffs: { codingSpeed: 0 }
  },
  kb_mechanical_entry: {
    id: 'kb_mechanical_entry',
    name: 'Bàn phím cơ Red Switch giá rẻ',
    category: 'keyboard',
    rarity: 'uncommon',
    price: 45,
    sellPrice: 20,
    desc: 'Switch êm ái, gõ lách cách vui tai, tăng tốc độ viết code đáng kể.',
    buffs: { codingSpeed: 12, mentalHealth: 5 }
  },
  kb_custom_gateron: {
    id: 'kb_custom_gateron',
    name: 'Bàn phím cơ Custom Gateron Oil King Lube',
    category: 'keyboard',
    rarity: 'rare',
    price: 220,
    sellPrice: 110,
    desc: 'Âm thanh trầm ấm (thocky), cảm giác gõ mượt như bơ. Tinh thần phấn chấn mỗi khi gõ phím.',
    buffs: { codingSpeed: 25, mentalHealth: 15 }
  },

  // --- MONITORS ---
  mon_laptop_screen: {
    id: 'mon_laptop_screen',
    name: 'Màn hình Laptop 14 inch',
    category: 'monitor',
    rarity: 'common',
    price: 0,
    sellPrice: 0,
    desc: 'Không gian chật hẹp, vừa xem tài liệu vừa gõ code phải Alt+Tab liên tục.',
    buffs: { focus: 0 }
  },
  mon_external_24: {
    id: 'mon_external_24',
    name: 'Màn hình ngoài 24" FHD Dell IPS',
    category: 'monitor',
    rarity: 'uncommon',
    price: 130,
    sellPrice: 65,
    desc: 'Có thêm màn hình thứ 2 để soi tài liệu StackOverflow song song.',
    buffs: { focus: 15, codingSpeed: 10 }
  },
  mon_dual_4k: {
    id: 'mon_dual_4k',
    name: 'Bộ đôi màn hình 27" 4K Dell UltraSharp',
    category: 'monitor',
    rarity: 'rare',
    price: 850,
    sellPrice: 420,
    desc: 'Góc nhìn bao quát toàn bộ Terminal, VS Code, Browser và Database Inspector.',
    buffs: { focus: 35, codingSpeed: 30 }
  },

  // --- CHAIRS ---
  chair_wood: {
    id: 'chair_wood',
    name: 'Ghế gỗ sinh viên cũ',
    category: 'chair',
    rarity: 'common',
    price: 0,
    sellPrice: 5,
    desc: 'Ngồi lâu đau lưng, ê mông. Cứ sau 1 tiếng phải đứng dậy giãn cơ.',
    buffs: { energyDrainReduction: 0 }
  },
  chair_ergo_mid: {
    id: 'chair_ergo_mid',
    name: 'Ghế công thái học Sihoo Doro',
    category: 'chair',
    rarity: 'uncommon',
    price: 180,
    sellPrice: 90,
    desc: 'Đỡ thắt lưng, lưới thoáng khí. Bảo vệ cột sống lập trình viên.',
    buffs: { energyDrainReduction: 15 }
  },
  chair_herman_miller: {
    id: 'chair_herman_miller',
    name: 'Ghế Herman Miller Aeron Mineral',
    category: 'chair',
    rarity: 'epic',
    price: 1600,
    sellPrice: 900,
    desc: 'Chuẩn mực ghế ngồi của các kỹ sư Thung lũng Silicon. Xua tan mọi cơn mỏi mệt.',
    buffs: { energyDrainReduction: 35, focus: 15 }
  },

  // --- CONSUMABLES & LEARNING ---
  coffee_can: {
    id: 'coffee_can',
    name: 'Cà phê lon đậm đặc',
    category: 'consumable',
    rarity: 'common',
    price: 2,
    desc: 'Tỉnh táo tức thì, nạp lại 25 Năng lượng & 10 Focus.',
    effect: { energy: 25, focus: 10 }
  },
  energy_drink: {
    id: 'energy_drink',
    name: 'Nước tăng lực CyberBoost',
    category: 'consumable',
    rarity: 'uncommon',
    price: 4,
    desc: 'Tăng 45 Năng lượng nhưng giảm nhẹ 5 Sức khỏe thể chất.',
    effect: { energy: 45, health: -5, focus: 15 }
  },
  book_c_primer: {
    id: 'book_c_primer',
    name: 'Sách: Lập trình C/C++ từ Cơ bản đến Nâng cao',
    category: 'book',
    rarity: 'common',
    price: 15,
    desc: 'Đọc kỹ từng chương để củng cố nền tảng con trỏ (pointers) và bộ nhớ.',
    skillTarget: 'c_lang',
    expBonus: 80
  },
  book_clean_code: {
    id: 'book_clean_code',
    name: 'Sách: Clean Code (Robert C. Martin)',
    category: 'book',
    rarity: 'uncommon',
    price: 28,
    desc: 'Học cách viết mã sạch, dễ bảo trì, tăng mạnh tư duy lập trình chuyên nghiệp.',
    skillTarget: 'data_struct',
    expBonus: 150
  },
  course_system_design: {
    id: 'course_system_design',
    name: 'Khóa học VIP: Large Scale Distributed Systems',
    category: 'book',
    rarity: 'rare',
    price: 199,
    desc: 'Masterclass thiết kế hệ thống hàng triệu người dùng cùng chuyên gia Big Tech.',
    skillTarget: 'backend',
    expBonus: 400
  }
};

// ==========================================
// MODULE: js/skills/challenges.js
// ==========================================
// Real Interactive Programming & Logic Challenges Database
const CHALLENGES = [
  {
    id: 'ch_c_ptr',
    title: 'C/C++: Hiểu rõ Con trỏ & Địa chỉ bộ nhớ',
    skillTarget: 'c_lang',
    tier: 1,
    difficulty: 'Cơ bản',
    question: `Đoạn mã C sau đây in ra giá trị gì trên màn hình console?`,
    codeSnippet: `int a = 10;
int *p = &a;
*p = 25;
int b = *p + a;
printf("%d", b);`,
    options: [
      { id: 'A', text: '35', correct: false },
      { id: 'B', text: '50', correct: true, explanation: '*p trỏ trực tiếp đến ô nhớ của a, nên khi *p = 25 thì a cũng biến thành 25. Do đó b = 25 + 25 = 50.' },
      { id: 'C', text: '20', correct: false },
      { id: 'D', text: 'Lỗi biên dịch Segmentation Fault', correct: false }
    ],
    rewardExp: 75,
    rewardSkillExp: 90
  },
  {
    id: 'ch_py_list_comp',
    title: 'Python: List Comprehension & Filter',
    skillTarget: 'python',
    tier: 1,
    difficulty: 'Cơ bản',
    question: `Đoạn mã Python nào sau đây tạo ra danh sách bình phương của các số chẵn từ 1 đến 10?`,
    codeSnippet: `# Cần kết quả: [4, 16, 36, 64, 100]`,
    options: [
      { id: 'A', text: '[x*2 for x in range(1, 11) if x % 2 == 0]', correct: false },
      { id: 'B', text: '[x**2 for x in range(1, 11) if x % 2 == 0]', correct: true, explanation: 'x**2 là lũy thừa 2 (bình phương), và range(1, 11) duyệt từ 1 đến 10 với điều kiện x % 2 == 0.' },
      { id: 'C', text: '[x^2 for x in range(1, 10)]', correct: false },
      { id: 'D', text: '[x*x for x in range(10) if x % 2 != 0]', correct: false }
    ],
    rewardExp: 70,
    rewardSkillExp: 85
  },
  {
    id: 'ch_js_event_loop',
    title: 'JavaScript: Cơ chế Event Loop & Bất đồng bộ',
    skillTarget: 'javascript',
    tier: 1,
    difficulty: 'Trung bình',
    question: `Thứ tự in ra các số trong console của đoạn mã JavaScript sau là gì?`,
    codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: [
      { id: 'A', text: '1 -> 2 -> 3 -> 4', correct: false },
      { id: 'B', text: '1 -> 4 -> 2 -> 3', correct: false },
      { id: 'C', text: '1 -> 4 -> 3 -> 2', correct: true, explanation: 'Call Stack đồng bộ (1, 4) chạy trước. Sau đó Microtask queue (Promise -> 3) được ưu tiên trước Macrotask queue (setTimeout -> 2).' },
      { id: 'D', text: '1 -> 3 -> 4 -> 2', correct: false }
    ],
    rewardExp: 100,
    rewardSkillExp: 120
  },
  {
    id: 'ch_dsa_twosum',
    title: 'DSA: Tối ưu độ phức tạp thuật toán Two Sum',
    skillTarget: 'data_struct',
    tier: 1,
    difficulty: 'Trung bình',
    question: `Cách tiếp cận nào giải bài toán Two Sum với mảng N phần tử đạt độ phức tạp thời gian O(N)?`,
    codeSnippet: `// Cho mảng nums và target số nguyên.
// Tìm 2 chỉ số sao cho tổng 2 phần tử bằng target.`,
    options: [
      { id: 'A', text: 'Duyệt 2 vòng lặp lồng nhau O(N^2)', correct: false },
      { id: 'B', text: 'Dùng bảng băm (Hash Map) lưu giá trị bổ sung (target - num)', correct: true, explanation: 'Với mỗi phần tử x, ta kiểm tra xem (target - x) có trong Hash Map chưa với tra cứu O(1), tổng thời gian là O(N).' },
      { id: 'C', text: 'Sắp xếp mảng QuickSort rồi duyệt tuyến tính O(N log N)', correct: false },
      { id: 'D', text: 'Đệ quy vét cạn nhị phân O(2^N)', correct: false }
    ],
    rewardExp: 110,
    rewardSkillExp: 130
  },
  {
    id: 'ch_git_conflict',
    title: 'Git: Xử lý xung đột khi Rebase / Merge',
    skillTarget: 'git_github',
    tier: 1,
    difficulty: 'Thực chiến',
    question: `Lệnh nào an toàn nhất để tích hợp các commit mới nhất từ nhánh main vào nhánh tính năng feature của bạn mà giữ lịch sử commit thẳng gọn?`,
    codeSnippet: `$ git checkout feature
# Lệnh tiếp theo nên là gì?`,
    options: [
      { id: 'A', text: 'git rebase main', correct: true, explanation: 'git rebase main đặt các commit của feature lên trên đỉnh của nhánh main, tạo lịch sử commit tuyến tính, sạch sẽ.' },
      { id: 'B', text: 'git push --force origin main', correct: false },
      { id: 'C', text: 'git reset --hard HEAD~5', correct: false },
      { id: 'D', text: 'git checkout -b new_world', correct: false }
    ],
    rewardExp: 90,
    rewardSkillExp: 100
  }
];

// ==========================================
// MODULE: js/character/customizer.js
// ==========================================
// Character Profile & Customizer



const AVATAR_OPTIONS = [
  { id: 'hoodie_student', label: 'Áo Hoodie Đen (Sinh viên)', stageMin: 1 },
  { id: 'polo_dev', label: 'Áo Polo Công Nghệ (Developer)', stageMin: 2 },
  { id: 'blazer_lead', label: 'Blazer Tối Màu (Tech Lead)', stageMin: 3 },
  { id: 'suit_legend', label: 'Bespoke Suit (Tech Founder)', stageMin: 4 },
];

class Customizer {
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

// ==========================================
// MODULE: js/character/characterCreation.js
// ==========================================
// Character Creation System (New Game Flow)



const BACKGROUND_ARCHETYPES = [
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

class CharacterCreationManager {
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
        { time: '08:00', text: `🌟 Nhân vật ${charName} khởi đầu với hành trình "${bg.name}". Sứ mệnh: Trở thành Huyền thoại công nghệ!`, type: 'success' }
      ];
    });

    audio.playLevelUp();
    return true;
  }
}

// ==========================================
// MODULE: js/quests/allChapters.js
// ==========================================
// Master 10 Chapters Campaign Database
const ALL_CHAPTERS = {
  1: {
    number: 1,
    title: 'The Awakening (Thức tỉnh)',
    subtitle: 'Sinh viên IT mất phương hướng & Khởi đầu từ con số 0',
    description: 'Học lại tư duy lập trình căn bản, làm quen C/C++/Python, vượt qua môn học kỳ và kiếm những đồng tiền đầu tiên.',
    unlockRequirements: 'Khởi đầu trò chơi',
    keyMilestone: 'Vượt qua kỳ thi C++ giữa kỳ',
    rewardSummary: '500 EXP, $300, Mở khóa Chợ Freelance'
  },
  2: {
    number: 2,
    title: 'The Foundation (Nền tảng vững chắc)',
    subtitle: 'Cấu trúc dữ liệu & Giải thuật, OOP, Git & SQL',
    description: 'Xây dựng tư duy giải thuật sâu sắc. Nắm vững cây, đồ thị, bảng băm, thiết kế hướng đối tượng và tối ưu hóa database.',
    unlockRequirements: 'Hoàn thành Chương 1 & Đạt Level 5',
    keyMilestone: 'Hoàn thành bài tập lớn môn Cấu trúc dữ liệu',
    rewardSummary: 'Developer Badge, Mở khóa Kho dự án cá nhân (Portfolio)'
  },
  3: {
    number: 3,
    title: 'The First Project (Dự án đầu tay)',
    subtitle: 'Đưa sản phẩm đầu tiên lên Internet',
    description: 'Tự tay xây dựng một ứng dụng web/API hoàn chỉnh, cấu hình server, xử lý CORS, domain và deploy lên production.',
    unlockRequirements: 'Hoàn thành Chương 2 & Đạt Level 8',
    keyMilestone: 'Website đạt 100 người dùng thật đầu tiên',
    rewardSummary: '+100 REP, Portfolio ấn tượng, Nhận lời khen từ cộng đồng'
  },
  4: {
    number: 4,
    title: 'The Money Hunter (Kiếm tiền từ kỹ năng)',
    subtitle: 'Thực chiến Freelance & Đối mặt khách hàng khó tính',
    description: 'Nhận hợp đồng freelance quốc tế, đàm phán thù lao, sửa bug gấp cho khách, quản lý dòng tiền và sắm sửa dàn PC mới.',
    unlockRequirements: 'Hoàn thành Chương 3 & Sở hữu ít nhất 1 dự án Portfolio',
    keyMilestone: 'Tích lũy $1,000 tiền mặt từ freelance',
    rewardSummary: 'Workstation Setup, Khả năng tự chủ tài chính'
  },
  5: {
    number: 5,
    title: 'The Competition (Đấu trường công nghệ)',
    subtitle: 'Hackathon 48 giờ thâu đêm & Đối đầu với thiên tài',
    description: 'Tham gia cuộc thi lập trình quốc gia, cạnh tranh cùng sinh viên trường chuyên và các lập trình viên kỳ cựu.',
    unlockRequirements: 'Hoàn thành Chương 4 & Đạt Level 12',
    keyMilestone: 'Giành giải Nhất Hackathon toàn quốc',
    rewardSummary: 'Cúp vô địch Hackathon, Thư giới thiệu của Ban giám khảo Big Tech'
  },
  6: {
    number: 6,
    title: 'The Internship (Cánh cửa doanh nghiệp)',
    subtitle: 'Gửi 50 CV, nhận 40 lời từ chối và vượt qua vòng phỏng vấn',
    description: 'Trải nghiệm áp lực phỏng vấn kỹ thuật thực tế (Live coding, System design, Culture fit) và ký hợp đồng thực tập sinh đầu tiên.',
    unlockRequirements: 'Hoàn thành Chương 5 & REP >= 80',
    keyMilestone: 'Nhận Offer thực tập sinh tại công ty công nghệ',
    rewardSummary: 'Thực tập sinh chính thức, Lương cứng hàng tháng'
  },
  7: {
    number: 7,
    title: 'The First Job (Lập trình viên chuyên nghiệp)',
    subtitle: 'Junior Developer & Trực chiến Bug Production lúc 2h sáng',
    description: 'Làm việc theo Sprint Scrum, Code Review nghiêm ngặt, xử lý sự cố rò rỉ bộ nhớ và hoàn thành đúng hạn các tính năng trọng yếu.',
    unlockRequirements: 'Hoàn thành Chương 6 & Đạt Level 18',
    keyMilestone: 'Cứu sập hệ thống thanh toán giờ cao điểm',
    rewardSummary: 'Thăng cấp Mid-level Developer, Tăng gấp đôi mức lương'
  },
  8: {
    number: 8,
    title: 'The Rise (Thăng tiến sự nghiệp)',
    subtitle: 'Senior Engineer, Tech Lead & System Architect',
    description: 'Dẫn dắt đội ngũ kỹ sư, thiết kế kiến trúc vi dịch vụ (microservices) chịu tải triệu người dùng, tối ưu độ trễ mili-giây.',
    unlockRequirements: 'Hoàn thành Chương 7 & Đạt Level 28',
    keyMilestone: 'Thiết kế thành công hệ thống Cloud quy mô 5 triệu người dùng',
    rewardSummary: 'Văn phòng riêng, Thu nhập khủng, Quyền chọn cổ phiếu (ESOP)'
  },
  9: {
    number: 9,
    title: 'The Empire (Đế chế khởi nghiệp)',
    subtitle: 'Thành lập Tech Startup, Tuyển dụng nhân tài & Gọi vốn Series A',
    description: 'Rời bỏ vùng an toàn, lập công ty công nghệ riêng, tuyển dụng kỹ sư giỏi, thuyết trình trước các quỹ đầu tư mạo hiểm Thung lũng Silicon.',
    unlockRequirements: 'Hoàn thành Chương 8 & Vốn tích lũy >= $20,000',
    keyMilestone: 'Gọi vốn thành công $2,000,000 Series A',
    rewardSummary: 'Tập đoàn công nghệ riêng, 50 nhân viên dưới quyền'
  },
  10: {
    number: 10,
    title: 'The Legacy (Huyền thoại công nghệ)',
    subtitle: 'Tập đoàn kỳ lân toàn cầu & Di sản cho thế hệ mai sau',
    description: 'Đưa công ty IPO lên sàn chứng khoán, xây dựng hệ sinh thái AI toàn cầu, lập quỹ học bổng đào tạo thế hệ lập trình viên tiếp theo.',
    unlockRequirements: 'Hoàn thành Chương 9 & Định giá công ty >= $50,000,000',
    keyMilestone: 'Công ty chính thức niêm yết IPO thành công',
    rewardSummary: 'Danh hiệu TECH LEGEND - Huyền Thoại Bất Tử'
  }
};

// ==========================================
// MODULE: js/quests/chapter1.js
// ==========================================
// Chapter 1: The Awakening Narrative Quests
const CHAPTER_1_QUESTS = {
  quest_ch1_hello_world: {
    id: 'quest_ch1_hello_world',
    chapter: 1,
    title: 'Bước Đầu Tiên: Vượt qua nỗi sợ lập trình',
    category: 'main',
    giver: 'Minh Mentor',
    desc: 'Bạn đang nợ môn C++ và hoang mang trước tương lai. Minh Mentor khuyên bạn hãy gạt bỏ mặc cảm, ngồi vào bàn học và tự tay giải bài toán đầu tiên.',
    dialogue: {
      intro: 'Này nhóc, ai trong ngành này cũng từng bắt đầu từ việc không biết gì cả. Đừng nhìn người khác rồi tự ti. Tối nay, hãy tự tay hoàn thành một bài thử thách C/C++ hoặc tự luyện tập 2 lần. Cứ bắt đầu đi!',
      completion: 'Làm tốt lắm! Thấy chưa, máy tính chỉ làm đúng những gì em bảo nó làm thôi. Nền tảng bắt đầu hình thành rồi đấy!'
    },
    requirements: {
      type: 'practice_or_challenge',
      targetCount: 2,
      currentCount: 0
    },
    rewards: {
      exp: 150,
      money: 40,
      skillExp: { c_lang: 50 },
      badge: 'Newbie Coder'
    }
  },
  quest_ch1_first_steps: {
    id: 'quest_ch1_first_steps',
    chapter: 1,
    title: 'Công Cụ Kiếm Cơm: Thiết lập Git & GitHub',
    category: 'main',
    giver: 'Lâm Bạn Cùng Lớp',
    desc: 'Lập trình viên không thể gửi code qua Zalo hay Google Drive. Hãy tìm hiểu Git và giải một câu đố về Git để mở khóa khả năng nhận dự án.',
    dialogue: {
      intro: 'Cậu vẫn còn zip code gửi thầy à? Thời đại nào rồi! Tìm hiểu Git Rebase và Branching đi, không có Git thì đừng mơ ai thuê freelance!',
      completion: 'Được đấy, ít nhất giờ cậu cũng biết rebase khác merge thế nào rồi. Giờ thì chuẩn bị kiếm tiền thôi.'
    },
    requirements: {
      type: 'skill_level',
      skillId: 'git_github',
      targetLevel: 2
    },
    rewards: {
      exp: 200,
      money: 50,
      rep: 10
    }
  },
  quest_ch1_earn_money: {
    id: 'quest_ch1_earn_money',
    chapter: 1,
    title: 'Kiếm Những Đồng Tiền Đầu Tiên',
    category: 'main',
    giver: 'Khách Hàng Freelance',
    desc: 'Tiền sinh hoạt sắp hết. Hãy lên bảng Freelance nhận và hoàn thành ít nhất 1 công việc nhỏ (sửa lỗi web, viết script).',
    dialogue: {
      intro: 'Website bán hàng của tôi bị vỡ giao diện trên di động. Ai sửa nhanh trong ngày được tôi trả $35 ngay lập tức!',
      completion: 'Cảm ơn cậu! Web hiển thị rất chuẩn. Đây là tiền công và đánh giá 5 sao cho cậu!'
    },
    requirements: {
      type: 'complete_freelance',
      targetCount: 1,
      currentCount: 0
    },
    rewards: {
      exp: 250,
      money: 80,
      rep: 25,
      item: 'kb_mechanical_entry'
    }
  },
  quest_ch1_exam_boss: {
    id: 'quest_ch1_exam_boss',
    chapter: 1,
    title: 'Boss Challenge: Vượt Qua Kỳ Thi Học Kỳ',
    category: 'boss',
    giver: 'Giảng viên khoa CNTT',
    desc: 'Kỳ thi môn Cấu trúc dữ liệu & Giải thuật đã tới! Bạn cần đạt Cấp độ 3 môn DSA hoặc giải thành công thử thách Two Sum để qua môn với điểm A.',
    dialogue: {
      intro: 'Đề thi hôm nay gồm lý thuyết độ phức tạp thời gian và cài đặt mảng băm. Ai gian lận sẽ bị đình chỉ thi!',
      completion: 'Xuất sắc! Điểm thi của em thuộc top 5 của lớp. Minh Mentor đã để mắt đến em cho một suất thực tập hè!'
    },
    requirements: {
      type: 'challenge_id',
      challengeId: 'ch_dsa_twosum'
    },
    rewards: {
      exp: 450,
      money: 150,
      rep: 50,
      unlockChapter: 2
    }
  }
};

// ==========================================
// MODULE: js/quests/dailyQuests.js
// ==========================================
// Daily & Weekly Quests Generation
const DAILY_QUEST_TEMPLATES = [
  {
    id: 'daily_code_session',
    title: 'Luyện tập mỗi ngày',
    desc: 'Thực hiện 2 phiên tự luyện code để duy trì tính kỷ luật.',
    reqType: 'practice',
    target: 2,
    rewardExp: 80,
    rewardMoney: 15,
    rewardDiscipline: 3
  },
  {
    id: 'daily_solve_challenge',
    title: 'Thử thách tư duy',
    desc: 'Trả lời chính xác 1 câu đố lập trình tại Học viện.',
    reqType: 'challenge',
    target: 1,
    rewardExp: 100,
    rewardMoney: 20,
    rewardIntelligence: 2
  },
  {
    id: 'daily_good_sleep',
    title: 'Bảo vệ sức khỏe',
    desc: 'Ngủ đủ giấc (ngủ qua đêm) để hồi phục năng lượng trên 80%.',
    reqType: 'energy_check',
    target: 80,
    rewardExp: 60,
    rewardMentalHealth: 10
  }
];

// ==========================================
// MODULE: js/career/companies.js
// ==========================================
// Tech Companies & Recruitment Opportunities Database
const COMPANIES = {
  techstart: {
    id: 'techstart',
    name: 'TechStart Incubator',
    tier: 'Startup Vườn Ươm',
    logo: '🚀',
    size: '15 nhân sự',
    monthlySalary: 650,
    workCulture: 'Agile tốc chiến, làm việc linh hoạt, học full-stack từ A đến Z.',
    minLevel: 4,
    minRep: 20,
    requiredSkills: { javascript: 2, c_lang: 1 },
    positions: ['Intern Web Developer', 'Junior Fullstack Engineer'],
    techStack: ['Node.js', 'React', 'MongoDB', 'Docker'],
    interviewStages: 2
  },
  bytevanguard: {
    id: 'bytevanguard',
    name: 'ByteVanguard Outsourcing Global',
    tier: 'Tập đoàn Gia công Phần mềm',
    logo: '🌐',
    size: '1,200 kỹ sư',
    monthlySalary: 1200,
    workCulture: 'Quy trình CMMI nghiêm ngặt, rèn luyện tính kỷ luật và chịu áp lực cao.',
    minLevel: 10,
    minRep: 60,
    requiredSkills: { c_lang: 3, database: 3, git_github: 3 },
    positions: ['Junior Software Engineer', 'Automation QA Engineer'],
    techStack: ['Java Spring Boot', 'PostgreSQL', 'Git', 'Linux'],
    interviewStages: 3
  },
  fincore: {
    id: 'fincore',
    name: 'FinCore Securities & Banking',
    tier: 'Công ty Sản phẩm FinTech',
    logo: '💳',
    size: '450 nhân sự',
    monthlySalary: 2400,
    workCulture: 'Độ bảo mật tuyệt đối, xử lý hàng triệu giao dịch/giây, thưởng dự án hấp dẫn.',
    minLevel: 20,
    minRep: 120,
    requiredSkills: { backend: 4, database: 4, data_struct: 4 },
    positions: ['Mid-level Backend Engineer', 'High Frequency Trading Developer'],
    techStack: ['Go', 'Rust', 'Kafka', 'Redis', 'Kubernetes'],
    interviewStages: 4
  },
  nexuscloud: {
    id: 'nexuscloud',
    name: 'Nexus Global Cloud',
    tier: 'Tập đoàn Big Tech Đa quốc gia',
    logo: '⚡',
    size: '25,000 kỹ sư toàn cầu',
    monthlySalary: 4800,
    workCulture: 'Môi trường làm việc chuẩn Silicon Valley, đãi ngộ mơ ước, cổ phiếu thưởng hàng năm.',
    minLevel: 30,
    minRep: 250,
    requiredSkills: { backend: 6, data_struct: 6, ai_ml: 4 },
    positions: ['Senior Distributed Systems Engineer', 'Cloud Infrastructure Architect'],
    techStack: ['Distributed Systems', 'gRPC', 'AWS/GCP', 'Terraform', 'C++'],
    interviewStages: 4
  },
  apexai: {
    id: 'apexai',
    name: 'Apex Intelligence Labs',
    tier: 'Viện Nghiên cứu Frontier AI',
    logo: '🧠',
    size: '180 nhà khoa học & kỹ sư tinh hoa',
    monthlySalary: 9500,
    workCulture: 'Tập hợp các bộ óc kiệt xuất nhất nhân loại, xây dựng mô hình Trí tuệ nhân tạo tương lai.',
    minLevel: 45,
    minRep: 500,
    requiredSkills: { ai_ml: 8, python: 8, data_struct: 8 },
    positions: ['Principal AI Research Engineer', 'AGI Kernel Architect'],
    techStack: ['PyTorch', 'CUDA', 'LLM Kernels', 'Distributed GPU Clusters'],
    interviewStages: 4
  }
};

// ==========================================
// MODULE: js/career/freelance.js
// ==========================================
// Freelance Job Market & Contracts





const FREELANCE_GIGS = [
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

class FreelanceManager {
  static acceptAndExecuteGig(gigId) {
    const gig = FREELANCE_GIGS.find(g => g.id === gigId);
    if (!gig) return;

    if (state.data.stats.energy < gig.energyCost) {
      audio.playError();
      state.log(`⚠️ Bạn không đủ năng lượng để làm dự án này! Cần ${gig.energyCost} Năng lượng.`, 'warning');
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
        state.log(`🎉 HOÀN THÀNH XUẤT SẮC DỰ ÁN: "${gig.title}"! Khách hàng ${gig.client} thanh toán $${gig.payout} và khen ngợi!`, 'success');
        
        QuestEngine.checkQuestProgress('freelance_done', { gigId });
      } else {
        d.stats.mentalHealth = Math.max(10, d.stats.mentalHealth - 15);
        audio.playError();
        state.log(`❌ DỰ ÁN BỊ LỖI! Client phàn nàn code còn bug, từ chối nghiệm thu. Bạn bị trừ 15 Sức khỏe tinh thần!`, 'danger');
      }
    });
  }
}

// ==========================================
// MODULE: js/achievements/achievements.js
// ==========================================
// Master Achievements & Trophies Database




const ACHIEVEMENTS = [
  {
    id: 'ach_first_code',
    title: 'Hello World',
    desc: 'Thực hiện phiên tự luyện code đầu tiên trong đời.',
    category: 'learning',
    icon: '💻',
    rewardExp: 50,
    check: (d) => d.character.exp > 0
  },
  {
    id: 'ach_first_freelance',
    title: 'Bàn Tay Khéo Léo',
    desc: 'Kiếm được tiền từ hợp đồng freelance đầu tiên.',
    category: 'career',
    icon: '💵',
    rewardExp: 100,
    check: (d) => (d.freelanceCompletedCount || 0) >= 1
  },
  {
    id: 'ach_mech_keyboard',
    title: 'Gõ Phím Như Múa',
    desc: 'Sở hữu và trang bị bàn phím cơ đầu tiên.',
    category: 'hardware',
    icon: '⌨️',
    rewardExp: 80,
    check: (d) => d.equipped.keyboard && d.equipped.keyboard !== 'kb_membrane'
  },
  {
    id: 'ach_stage_developer',
    title: 'Thoát Kiếp Mất Gốc',
    desc: 'Đột phá lên Giai đoạn 2: The Developer chuyên nghiệp.',
    category: 'career',
    icon: '🚀',
    rewardExp: 200,
    check: (d) => d.character.stage >= 2
  },
  {
    id: 'ach_first_job',
    title: 'Dân Công Sở Chính Hiệu',
    desc: 'Vượt qua phỏng vấn và chính thức gia nhập một công ty công nghệ.',
    category: 'career',
    icon: '🏢',
    rewardExp: 250,
    check: (d) => d.company !== null
  },
  {
    id: 'ach_github_stargazer',
    title: 'Ngôi Sao GitHub',
    desc: 'Xây dựng dự án cá nhân đạt trên 100 lượt Stars trên GitHub.',
    category: 'community',
    icon: '⭐',
    rewardExp: 300,
    check: (d) => (d.portfolioProjects || []).some(p => p.stars >= 100)
  },
  {
    id: 'ach_wealthy_coder',
    title: 'Tự Do Tài Chính Cơ Bản',
    desc: 'Tích lũy số dư tiền mặt vượt mốc $10,000.',
    category: 'economy',
    icon: '💰',
    rewardExp: 400,
    check: (d) => d.character.money >= 10000
  },
  {
    id: 'ach_tech_founder',
    title: 'Đế Chế Công Nghệ',
    desc: 'Thành lập công ty công nghệ của riêng bạn.',
    category: 'legend',
    icon: '👑',
    rewardExp: 1000,
    check: (d) => d.startup !== null
  }
];

class AchievementManager {
  static checkAll() {
    if (!state.data.unlockedAchievements) {
      state.data.unlockedAchievements = [];
    }

    ACHIEVEMENTS.forEach(ach => {
      if (state.data.unlockedAchievements.includes(ach.id)) return;

      if (ach.check(state.data)) {
        this.unlock(ach);
      }
    });
  }

  static unlock(ach) {
    state.update(d => {
      if (!d.unlockedAchievements) d.unlockedAchievements = [];
      d.unlockedAchievements.push(ach.id);
      StatsManager.addExp(ach.rewardExp);
      state.log(`🏆 MỞ KHÓA THÀNH TỰU: "${ach.title}"! ${ach.desc} (+${ach.rewardExp} EXP)!`, 'success');
    });
    audio.playLevelUp();
  }
}

// ==========================================
// MODULE: js/story/dialogue.js
// ==========================================
// Dynamic NPC & Story Dialogue Engine



const NPCS = {
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

class DialogueManager {
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

// ==========================================
// MODULE: js/business/startup.js
// ==========================================
// Tech Startup & Enterprise Building Engine




const STARTUP_DOMAINS = [
  { id: 'ai_saas', name: 'Nền tảng AI Generative cho Lập trình viên', targetMRR: 8000, risk: 'Trung bình', potential: 'Cực cao' },
  { id: 'fintech_gateway', name: 'Cổng thanh toán vi mô xuyên biên giới', targetMRR: 12000, risk: 'Cao', potential: 'Khổng lồ' },
  { id: 'devops_cloud', name: 'Công cụ giám sát & Tự động hóa CI/CD Cloud', targetMRR: 6000, risk: 'Thấp', potential: 'Ổn định' }
];

const EMPLOYEES_CATALOG = [
  { id: 'dev_junior_fe', name: 'Frontend React/Vue Dev', role: 'Kỹ sư Giao diện', salary: 800, outputPoints: 15 },
  { id: 'dev_senior_be', name: 'Senior Backend & Systems Architect', role: 'Kiến trúc sư Dữ liệu', salary: 2200, outputPoints: 45 },
  { id: 'dev_ai_researcher', name: 'AI & Machine Learning Specialist', role: 'Kỹ sư Trí tuệ Nhân tạo', salary: 3500, outputPoints: 75 }
];

class StartupManager {
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

// ==========================================
// MODULE: js/engine/state.js
// ==========================================
// Global Reactive State Management for CODE LEGACY
class GameState {
  constructor() {
    this.listeners = new Set();
    this.data = this.getDefaultState();
  }

  getDefaultState() {
    return {
      character: {
        name: 'Minh Nam',
        age: 20,
        stage: 1, // 1: The Beginner, 2: The Developer, 3: The Architect, 4: The Legend
        stageTitle: 'The Beginner (Sinh viên năm 2)',
        title: 'Sinh viên IT mất gốc',
        level: 1,
        exp: 0,
        expNext: 250,
        money: 120, // USD in game
        rep: 15,    // Reputation
        avatar: 'hoodie_student',
        background: 'lost_student',
        specialty: 'fullstack'
      },
      stats: {
        energy: 90,
        maxEnergy: 100,
        mentalHealth: 80, // Sức khỏe tinh thần
        health: 85,       // Sức khỏe thể chất
        focus: 55,        // Sự tập trung
        discipline: 45,   // Tính kỷ luật
        intelligence: 40, // Trí tuệ
      },
      time: {
        day: 1,
        hour: 8,
        minute: 0,
        dayOfWeek: 'Thứ Hai',
        week: 1,
        isPaused: false,
      },
      equipped: {
        laptop: 'laptop_old',
        keyboard: 'kb_membrane',
        monitor: 'mon_laptop_screen',
        chair: 'chair_wood',
        desk: 'desk_student',
      },
      inventory: [
        'book_c_primer',
        'coffee_can',
      ],
      skills: {
        c_lang: { id: 'c_lang', name: 'C / C++', level: 1, exp: 30, expNext: 100, category: 'core' },
        python: { id: 'python', name: 'Python', level: 1, exp: 10, expNext: 100, category: 'core' },
        javascript: { id: 'javascript', name: 'JavaScript & Web', level: 1, exp: 0, expNext: 100, category: 'web' },
        data_struct: { id: 'data_struct', name: 'DSA (Thuật toán & Cấu trúc)', level: 1, exp: 0, expNext: 100, category: 'core' },
        git_github: { id: 'git_github', name: 'Git & Quản lý mã nguồn', level: 1, exp: 0, expNext: 100, category: 'devops' },
        database: { id: 'database', name: 'SQL & Database', level: 0, exp: 0, expNext: 100, category: 'backend' },
        backend: { id: 'backend', name: 'Backend & RESTful API', level: 0, exp: 0, expNext: 100, category: 'backend' },
        ai_ml: { id: 'ai_ml', name: 'AI & Machine Learning', level: 0, exp: 0, expNext: 100, category: 'ai' },
      },
      chapter: {
        current: 1,
        title: 'Chương 1: The Awakening (Thức tỉnh)',
        subtitle: 'Sinh viên IT mất phương hướng & Khởi đầu từ con số 0',
      },
      activeQuests: ['quest_ch1_hello_world', 'quest_ch1_first_steps'],
      completedQuests: [],
      dailyQuests: [],
      freelanceActive: null,
      freelanceCompletedCount: 0,
      portfolioProjects: [],
      company: null,
      startup: null,
      unlockedAchievements: [],
      settings: {
        audioEnabled: true,
        tickSpeed: 4000
      },
      logs: [
        { time: '08:00', text: 'Chào mừng đến với CODE LEGACY. Cuộc hành trình từ con số 0 chính thức bắt đầu.', type: 'info' }
      ]
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(event, payload) {
    this.listeners.forEach(cb => cb(event, payload, this.data));
  }

  log(text, type = 'info') {
    const timeStr = `${String(this.data.time.hour).padStart(2, '0')}:${String(this.data.time.minute).padStart(2, '0')}`;
    this.data.logs.unshift({ time: timeStr, text, type });
    if (this.data.logs.length > 50) this.data.logs.pop();
    this.notify('log', { text, type });
  }

  update(fn) {
    fn(this.data);
    this.notify('update', this.data);
  }
}

const state = new GameState();

// ==========================================
// MODULE: js/character/stats.js
// ==========================================
// Character Stats & Equipment Buff Computations




class StatsManager {
  static getEquippedBuffs() {
    const equipped = state.data.equipped;
    const buffs = {
      codingSpeedBonus: 0,    // % tăng tốc độ code
      focusBonus: 0,          // + điểm Focus
      energyDrainReduction: 0,// % giảm tiêu hao năng lượng
      mentalHealthBonus: 0,   // % tăng đề kháng stress
      interviewAppeal: 0,     // Uy tín khi đi phỏng vấn
    };

    Object.values(equipped).forEach(itemId => {
      if (!itemId) return;
      const item = ITEMS[itemId];
      if (item && item.buffs) {
        if (item.buffs.codingSpeed) buffs.codingSpeedBonus += item.buffs.codingSpeed;
        if (item.buffs.focus) buffs.focusBonus += item.buffs.focus;
        if (item.buffs.energyDrainReduction) buffs.energyDrainReduction += item.buffs.energyDrainReduction;
        if (item.buffs.mentalHealth) buffs.mentalHealthBonus += item.buffs.mentalHealth;
        if (item.buffs.interviewAppeal) buffs.interviewAppeal += item.buffs.interviewAppeal;
      }
    });

    return buffs;
  }

  static addExp(amount) {
    state.update(d => {
      d.character.exp += amount;
      state.log(`✨ Nhận được +${amount} EXP nhân vật!`, 'success');

      while (d.character.exp >= d.character.expNext) {
        d.character.exp -= d.character.expNext;
        d.character.level += 1;
        d.character.expNext = Math.floor(d.character.expNext * 1.35);
        d.stats.intelligence += 2;
        d.stats.focus = Math.min(100, d.stats.focus + 5);
        
        audio.playLevelUp();
        state.log(`🎉 CHÚC MỪNG! Bạn đã thăng cấp Level ${d.character.level}! Trí tuệ và Tập trung gia tăng!`, 'success');
        
        this.checkStagePromotion(d);
      }
    });
  }

  static checkStagePromotion(d) {
    // Stage 1: Level 1-9 (Beginner)
    // Stage 2: Level 10-24 (The Developer)
    // Stage 3: Level 25-44 (The Architect)
    // Stage 4: Level 45+ (The Legend)
    let newStage = d.character.stage;
    let newTitle = d.character.stageTitle;

    if (d.character.level >= 45 && d.character.stage < 4) {
      newStage = 4;
      newTitle = 'The Legend (Nhà sáng lập công nghệ)';
      d.character.title = 'Tech Founder & Visionary';
    } else if (d.character.level >= 25 && d.character.stage < 3) {
      newStage = 3;
      newTitle = 'The Architect (Kiến trúc sư hệ thống)';
      d.character.title = 'Senior Tech Lead';
    } else if (d.character.level >= 10 && d.character.stage < 2) {
      newStage = 2;
      newTitle = 'The Developer (Lập trình viên chuyên nghiệp)';
      d.character.title = 'Software Engineer';
    }

    if (newStage !== d.character.stage) {
      d.character.stage = newStage;
      d.character.stageTitle = newTitle;
      audio.playLevelUp();
      state.log(`🏆 BẠN ĐÃ TIẾN HÓA SANG GIAI ĐOẠN MỚI: ${newTitle}! Diện mạo và phong thái đã thay đổi!`, 'success');
    }
  }

  static consumeEnergy(amount) {
    const buffs = this.getEquippedBuffs();
    const reducedAmount = Math.max(1, Math.round(amount * (1 - buffs.energyDrainReduction / 100)));
    let exhausted = false;

    state.update(d => {
      d.stats.energy = Math.max(0, d.stats.energy - reducedAmount);
      if (d.stats.energy <= 0) {
        exhausted = true;
      }
    });

    if (exhausted) {
      state.update(d => {
        d.stats.health = Math.max(20, d.stats.health - 15);
        d.stats.mentalHealth = Math.max(15, d.stats.mentalHealth - 20);
      });
      audio.playError();
      state.log(`⚠️ CẢNH BÁO KIỆT SỨC: Bạn đã cạn kiệt năng lượng! Hãy nghỉ ngơi hoặc ngủ ngay nếu không muốn gục ngã!`, 'danger');
    }
    return !exhausted;
  }
}

// ==========================================
// MODULE: js/economy/shop.js
// ==========================================
// Shop & Inventory Management





class ShopManager {
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
      state.log(`🛍️ Mua thành công: ${item.name} với giá $${item.price}!`, 'success');
    });

    return true;
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
        state.log(`🥤 Đã sử dụng ${item.name}. Cơ thể cảm thấy sảng khoái hơn!`, 'success');
      });
    } else if (item.category === 'book') {
      // Reading book costs 20 energy, gives skill EXP
      if (state.data.stats.energy < 20) {
        audio.playError();
        state.log('⚠️ Bạn quá mệt mỏi để đọc sách! Hãy nghỉ ngơi trước.', 'warning');
        return;
      }
      StatsManager.consumeEnergy(20);
      state.update(d => {
        const skill = d.skills[item.skillTarget];
        if (skill) {
          skill.exp += item.expBonus;
          state.log(`📖 Đã đọc xong "${item.name}". Nhận +${item.expBonus} EXP kỹ năng ${skill.name}!`, 'success');
          // Check skill level up
          while (skill.exp >= skill.expNext) {
            skill.exp -= skill.expNext;
            skill.level += 1;
            skill.expNext = Math.floor(skill.expNext * 1.4);
            state.log(`🔥 Kỹ năng ${skill.name} đã thăng cấp Level ${skill.level}!`, 'success');
          }
        }
        StatsManager.addExp(Math.floor(item.expBonus / 2));
        d.inventory.splice(indexInInventory, 1);
        audio.playSuccess();
      });
    }
  }
}

// ==========================================
// MODULE: js/career/portfolio.js
// ==========================================
// Portfolio & GitHub Projects System




const PROJECT_TEMPLATES = [
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

class PortfolioManager {
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
      state.log(`⚠️ Bạn đã hoàn thành và deploy dự án "${template.name}" trước đó rồi!`, 'warning');
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
      state.log(`⚠️ Quá kiệt sức để code dự án! Cần ít nhất ${template.energyCost} Năng lượng.`, 'warning');
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
      state.log(`🚀 DEPLOY THÀNH CÔNG: "${template.name}"! Dự án đạt ${stars} Stars trên GitHub và ${users} người dùng thật! +${template.repBonus} REP!`, 'success');
    });

    return true;
  }
}

// ==========================================
// MODULE: js/career/careerManager.js
// ==========================================
// Career & Corporate Employment Engine




class CareerManager {
  static getCurrentJob() {
    return state.data.company;
  }

  static resignJob() {
    if (!state.data.company) return;
    const oldCompany = state.data.company.name;
    state.update(d => {
      d.company = null;
      state.log(`👋 Bạn đã nộp đơn từ chức tại ${oldCompany} để tìm kiếm thử thách mới.`, 'warning');
    });
    audio.playClick();
  }

  static payMonthlySalary() {
    const comp = state.data.company;
    if (!comp) return;

    state.update(d => {
      d.character.money += comp.monthlySalary;
      d.character.rep += 10;
      audio.playCoin();
      state.log(`💼 NHẬN LƯƠNG THÁNG: Công ty ${comp.name} đã chuyển khoản $${comp.monthlySalary.toLocaleString()}!`, 'success');
    });
  }

  static promoteCheck() {
    const comp = state.data.company;
    if (!comp) return;

    // Promotion if level grew significantly
    if (state.data.character.level >= comp.minLevel + 8 && !comp.isPromoted) {
      state.update(d => {
        d.company.isPromoted = true;
        d.company.monthlySalary = Math.floor(d.company.monthlySalary * 1.45);
        d.character.rep += 30;
        audio.playLevelUp();
        state.log(`🎉 CHÚC MỪNG! Ban Giám Đốc ${comp.name} quyết định thăng chức cho bạn! Mức lương mới: $${d.company.monthlySalary}/tháng!`, 'success');
      });
    }
  }
}

// ==========================================
// MODULE: js/career/interviews.js
// ==========================================
// Interactive Multi-Stage Interview Engine





const INTERVIEW_QUESTIONS = {
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

class InterviewManager {
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

// ==========================================
// MODULE: js/quests/questEngine.js
// ==========================================
// Quest Engine: Tracks, Validates, and Rewards






class QuestEngine {
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

// ==========================================
// MODULE: js/quests/weeklyQuests.js
// ==========================================
// Weekly Missions (Sprint Objectives)




const WEEKLY_MISSIONS = [
  {
    id: 'week_mission_code_mastery',
    week: 1,
    title: 'Sprint 1: Xây Dựng Kỷ Luật Thép',
    desc: 'Hoàn thành ít nhất 5 phiên tự luyện code và giữ Sức khỏe thể chất trên 75%.',
    requirements: { practiceCount: 5, minHealth: 75 },
    currentPractice: 0,
    rewardExp: 300,
    rewardMoney: 100,
    rewardRep: 20
  },
  {
    id: 'week_mission_freelance_rush',
    week: 2,
    title: 'Sprint 2: Đột Phá Thu Nhập Sinh Viên',
    desc: 'Hoàn thành thành công 3 hợp đồng freelance cho khách hàng trong tuần.',
    requirements: { freelanceCount: 3 },
    currentFreelance: 0,
    rewardExp: 450,
    rewardMoney: 250,
    rewardRep: 35
  },
  {
    id: 'week_mission_clean_architecture',
    week: 3,
    title: 'Sprint 3: Nâng Tầm Tư Duy Kiến Trúc',
    desc: 'Giải quyết 3 thử thách lập trình chuyên sâu tại Học viện với độ chính xác tuyệt đối.',
    requirements: { challengeCount: 3 },
    currentChallenges: 0,
    rewardExp: 600,
    rewardMoney: 300,
    rewardRep: 50
  }
];

class WeeklyMissionManager {
  static getActiveWeeklyMission() {
    const week = state.data.time.week;
    const mission = WEEKLY_MISSIONS.find(m => m.week === week) || WEEKLY_MISSIONS[0];
    return mission;
  }

  static trackEvent(type) {
    const mission = this.getActiveWeeklyMission();
    if (!mission) return;

    if (type === 'practice' && mission.requirements.practiceCount) {
      mission.currentPractice = (mission.currentPractice || 0) + 1;
      if (mission.currentPractice >= mission.requirements.practiceCount && state.data.stats.health >= (mission.requirements.minHealth || 0)) {
        this.completeMission(mission);
      }
    }
  }

  static completeMission(mission) {
    if (mission.completed) return;
    mission.completed = true;

    state.update(d => {
      StatsManager.addExp(mission.rewardExp);
      d.character.money += mission.rewardMoney;
      d.character.rep += mission.rewardRep;
      d.stats.discipline = Math.min(100, d.stats.discipline + 10);
      state.log(`🎖️ HOÀN THÀNH WEEKLY SPRINT: "${mission.title}"! Nhận +$${mission.rewardMoney} và +${mission.rewardExp} EXP!`, 'success');
    });

    audio.playLevelUp();
  }
}

// ==========================================
// MODULE: js/engine/time.js
// ==========================================
// Time Manager: Day/Night Cycle, Tick processing, Weekly rent, Salary & Mission ticks




class TimeManager {
  constructor() {
    this.timer = null;
    this.tickIntervalMs = 4000; // 4 seconds real time = 10 game minutes
    this.daysOfWeek = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
  }

  start() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.tick(), this.tickIntervalMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  advanceMinutes(minutes) {
    state.update(d => {
      let totalMinutes = d.time.minute + minutes;
      let hoursToAdd = Math.floor(totalMinutes / 60);
      d.time.minute = totalMinutes % 60;

      if (hoursToAdd > 0) {
        let newHour = d.time.hour + hoursToAdd;
        let daysToAdd = Math.floor(newHour / 24);
        d.time.hour = newHour % 24;

        if (daysToAdd > 0) {
          d.time.day += daysToAdd;
          let currentDayIdx = (d.time.day - 1) % 7;
          d.time.dayOfWeek = this.daysOfWeek[currentDayIdx];
          d.time.week = Math.floor((d.time.day - 1) / 7) + 1;
          this.onDayPassed(d, daysToAdd);
        }
      }
    });
  }

  tick() {
    if (state.data.time.isPaused) return;
    this.advanceMinutes(10);
    // Passive slight fatigue if awake during night (0h - 6h)
    const hour = state.data.time.hour;
    if (hour >= 0 && hour < 6) {
      state.update(d => {
        if (d.stats.energy > 5) d.stats.energy -= 1;
        if (d.stats.mentalHealth > 10) d.stats.mentalHealth -= 0.5;
      });
    }

    // Check achievements
    AchievementManager.checkAll();
  }

  onDayPassed(d, daysCount) {
    state.log(`☀️ Một ngày mới đã bắt đầu (${d.time.dayOfWeek}, Ngày ${d.time.day}).`, 'info');
    
    // Weekly Living Expenses ($45/tuần tiền trọ và mạng)
    if (d.time.day % 7 === 1 && d.time.day > 1) {
      const rent = 45;
      if (d.character.money >= rent) {
        d.character.money -= rent;
        state.log(`💸 Chi phí sinh hoạt & tiền trọ tuần: -$${rent}.`, 'warning');
      } else {
        d.character.money = 0;
        d.stats.mentalHealth = Math.max(10, d.stats.mentalHealth - 25);
        state.log(`⚠️ Bạn không đủ tiền trả chi phí sinh hoạt! Chủ nhà cằn nhằn, sức khỏe tinh thần sụt giảm!`, 'danger');
      }
    }

    // Monthly Salary Payment (every 30 days)
    if (d.time.day % 30 === 1 && d.time.day > 1) {
      CareerManager.payMonthlySalary();
      CareerManager.promoteCheck();
    }
  }
}

const timeManager = new TimeManager();

// ==========================================
// MODULE: js/engine/save.js
// ==========================================
// Save & Load System with LocalStorage and JSON Import/Export


const SAVE_KEY = 'CODE_LEGACY_SAVE_V1';

class SaveManager {
  static save() {
    try {
      const serialized = JSON.stringify(state.data);
      localStorage.setItem(SAVE_KEY, serialized);
      state.log('💾 Tiến trình trò chơi đã được lưu thành công.', 'success');
      return true;
    } catch (e) {
      console.error('Save error:', e);
      state.log('❌ Lỗi khi lưu dữ liệu vào LocalStorage.', 'danger');
      return false;
    }
  }

  static load() {
    try {
      const serialized = localStorage.getItem(SAVE_KEY);
      if (!serialized) return false;
      const parsed = JSON.parse(serialized);
      // Merge into state
      state.update(d => {
        Object.assign(d, parsed);
      });
      state.log('📂 Đã tải dữ liệu lưu trữ thành công.', 'success');
      return true;
    } catch (e) {
      console.error('Load error:', e);
      return false;
    }
  }

  static exportJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `code_legacy_save_day${state.data.time.day}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    state.log('📦 Xuất file dữ liệu save game thành công.', 'info');
  }

  static importJson(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && parsed.character && parsed.stats) {
            state.update(d => {
              Object.assign(d, parsed);
            });
            state.log('📥 Nhập file save thành công! Đã khôi phục trạng thái.', 'success');
            resolve(true);
          } else {
            throw new Error('Dữ liệu save không đúng định dạng');
          }
        } catch (err) {
          state.log('❌ File save không hợp lệ!', 'danger');
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  }

  static reset() {
    localStorage.removeItem(SAVE_KEY);
    state.update(d => {
      Object.assign(d, state.getDefaultState());
    });
    state.log('🔄 Đã thiết lập lại trò chơi về trạng thái ban đầu.', 'warning');
  }
}

// ==========================================
// MODULE: js/engine/settings.js
// ==========================================
// Game Settings Engine



class SettingsManager {
  static toggleAudio() {
    audio.enabled = !audio.enabled;
    state.update(d => {
      if (!d.settings) d.settings = {};
      d.settings.audioEnabled = audio.enabled;
      state.log(`Âm thanh: ${audio.enabled ? 'Đã BẬT' : 'Đã TẮT'}`, 'info');
    });
    return audio.enabled;
  }

  static setGameSpeed(speedMs) {
    state.update(d => {
      if (!d.settings) d.settings = {};
      d.settings.tickSpeed = speedMs;
      state.log(`Đã điều chỉnh tốc độ đồng hồ thế giới.`, 'info');
    });
  }
}

// ==========================================
// MODULE: js/skills/skillTree.js
// ==========================================
// Skill Tree & Challenge Verification





class SkillTreeManager {
  static getSkillList() {
    return Object.values(state.data.skills);
  }

  static getChallengesForSkill(skillId) {
    return CHALLENGES.filter(c => c.skillTarget === skillId);
  }

  static practiceSkill(skillId) {
    const skill = state.data.skills[skillId];
    if (!skill) return;

    if (state.data.stats.energy < 15) {
      audio.playError();
      state.log(`⚠️ Bạn quá kiệt sức để học code! Cần ít nhất 15 Năng lượng.`, 'warning');
      return false;
    }

    StatsManager.consumeEnergy(15);
    const buffs = StatsManager.getEquippedBuffs();
    const baseSkillExp = 35;
    const finalSkillExp = Math.round(baseSkillExp * (1 + buffs.codingSpeedBonus / 100));

    state.update(d => {
      const s = d.skills[skillId];
      s.exp += finalSkillExp;
      state.log(`💻 Tự học & viết code ${s.name}: +${finalSkillExp} EXP kỹ năng!`, 'info');

      // Check level up
      while (s.exp >= s.expNext) {
        s.exp -= s.expNext;
        s.level += 1;
        s.expNext = Math.floor(s.expNext * 1.35);
        d.stats.intelligence += 1;
        audio.playLevelUp();
        state.log(`🔥 Kỹ năng ${s.name} đã đột phá lên Cấp độ ${s.level}!`, 'success');
      }

      // Add general character exp
      StatsManager.addExp(Math.round(finalSkillExp / 2));
    });

    audio.playKeypress();
    return true;
  }

  static submitChallenge(challengeId, chosenOptionId) {
    const challenge = CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return { success: false, msg: 'Không tìm thấy thử thách.' };

    const selectedOption = challenge.options.find(o => o.id === chosenOptionId);
    if (!selectedOption) return { success: false, msg: 'Tùy chọn không hợp lệ.' };

    if (selectedOption.correct) {
      audio.playSuccess();
      state.update(d => {
        const skill = d.skills[challenge.skillTarget];
        if (skill) {
          skill.exp += challenge.rewardSkillExp;
          while (skill.exp >= skill.expNext) {
            skill.exp -= skill.expNext;
            skill.level += 1;
            skill.expNext = Math.floor(skill.expNext * 1.35);
          }
        }
        d.stats.discipline = Math.min(100, d.stats.discipline + 2);
        d.stats.focus = Math.min(100, d.stats.focus + 2);
        StatsManager.addExp(challenge.rewardExp);
        state.log(`✅ CHÍNH XÁC! Bạn đã vượt qua thử thách "${challenge.title}"! Nhận +${challenge.rewardExp} EXP!`, 'success');
      });

      return {
        success: true,
        explanation: selectedOption.explanation,
        rewardExp: challenge.rewardExp,
        rewardSkillExp: challenge.rewardSkillExp
      };
    } else {
      audio.playError();
      state.update(d => {
        d.stats.mentalHealth = Math.max(10, d.stats.mentalHealth - 5);
        state.log(`❌ Câu trả lời chưa chính xác cho "${challenge.title}". Đừng nản lòng, hãy xem lại lý thuyết!`, 'danger');
      });

      return {
        success: false,
        explanation: 'Đáp án bạn chọn chưa đúng. Hãy suy nghĩ lại các khía cạnh cú pháp và cơ chế hoạt động của ngôn ngữ.'
      };
    }
  }
}

// ==========================================
// MODULE: js/life/lifeActions.js
// ==========================================
// Life Simulation Actions: Sleep, Nutrition, Exercise, Relaxation




class LifeManager {
  static sleepFullNight() {
    audio.playClick();
    state.update(d => {
      d.stats.energy = d.stats.maxEnergy;
      d.stats.mentalHealth = Math.min(100, d.stats.mentalHealth + 25);
      d.stats.focus = Math.min(100, d.stats.focus + 15);
      state.log(`💤 Bạn đã ngủ một giấc thật sâu 8 tiếng. Tỉnh dậy với 100% Năng lượng và đầu óc tỉnh táo!`, 'success');
    });
    timeManager.advanceMinutes(480); // 8 hours
  }

  static takeNap() {
    if (state.data.stats.energy >= state.data.stats.maxEnergy) {
      state.log(`Bạn vẫn còn nhiều năng lượng, không cần chợp mắt lúc này.`, 'info');
      return;
    }
    audio.playClick();
    state.update(d => {
      d.stats.energy = Math.min(d.stats.maxEnergy, d.stats.energy + 20);
      d.stats.focus = Math.min(100, d.stats.focus + 10);
      state.log(`☕ Chợp mắt 30 phút. Năng lượng hồi phục +20.`, 'info');
    });
    timeManager.advanceMinutes(30);
  }

  static workoutGym() {
    if (state.data.stats.energy < 25) {
      audio.playError();
      state.log(`⚠️ Bạn quá kiệt sức để tập thể dục!`, 'warning');
      return;
    }
    audio.playSuccess();
    state.update(d => {
      d.stats.energy -= 20;
      d.stats.health = Math.min(100, d.stats.health + 10);
      d.stats.maxEnergy = Math.min(130, d.stats.maxEnergy + 1); // Permanently expands stamina capacity
      d.stats.mentalHealth = Math.min(100, d.stats.mentalHealth + 12);
      d.stats.discipline = Math.min(100, d.stats.discipline + 2);
      state.log(`🏃‍♂️ Chạy bộ & tập thể hình 1 tiếng. Sức khỏe thể chất tăng cao, cột sống được giải tỏa!`, 'success');
    });
    timeManager.advanceMinutes(60);
  }

  static eatNutritiousMeal() {
    const cost = 8;
    if (state.data.character.money < cost) {
      audio.playError();
      state.log(`Không đủ tiền mua bữa ăn đủ chất ($${cost}).`, 'danger');
      return;
    }
    audio.playCoin();
    state.update(d => {
      d.character.money -= cost;
      d.stats.health = Math.min(100, d.stats.health + 8);
      d.stats.energy = Math.min(d.stats.maxEnergy, d.stats.energy + 15);
      state.log(`🍱 Thưởng thức bữa ăn dinh dưỡng (cơm gà, rau xanh, nước ép). Cơ thể tràn đầy sức sống!`, 'success');
    });
    timeManager.advanceMinutes(45);
  }

  static meditateAndRelax() {
    audio.playClick();
    state.update(d => {
      d.stats.mentalHealth = Math.min(100, d.stats.mentalHealth + 15);
      d.stats.focus = Math.min(100, d.stats.focus + 20);
      state.log(`🧘 Thiền định & nghe nhạc Lofi 45 phút. Giảm stress, tâm trí phẳng lặng như mặt hồ.`, 'info');
    });
    timeManager.advanceMinutes(45);
  }
}

// ==========================================
// MODULE: js/3d/character.js
// ==========================================
// 3D Humanoid Character Engine for CODE LEGACY
// Realistic proportions matching Image 1: Korean/Asian IT Student, Hoodie, Jeans, Sneakers, Canvas Bag

class Character3D {
  constructor(scene) {
    this.scene = scene;
    this.mesh = new THREE.Group();
    this.mesh.name = "PlayerCharacter";

    // Movement state
    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.rotationY = 0;
    this.targetRotationY = 0;
    this.moveSpeed = 3.6; // m/s
    this.runMultiplier = 1.6;
    this.isMoving = false;
    this.isRunning = false;
    this.isSitting = false;
    this.animTime = 0;

    // Bone & Limb References for Animation
    this.limbs = {};

    this.buildHumanoidModel();
    this.scene.add(this.mesh);
  }

  buildHumanoidModel() {
    // === MATERIALS (PBR Stylized AAA) ===
    // Skin Material
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xffdfd0,
      roughness: 0.65,
      metalness: 0.05
    });

    // Dark Messy Hair Material
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.1
    });

    // Deep Navy Blue Hoodie Material (from Image 1)
    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x223652,
      roughness: 0.8,
      metalness: 0.05
    });

    // Inner V-Neck Heather Gray Shirt Material
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      roughness: 0.9,
      metalness: 0.0
    });

    // Slim-fit Dark Washed Jeans Material
    const jeansMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.75,
      metalness: 0.05
    });

    // Gray Canvas Sneakers Material
    const shoeMat = new THREE.MeshStandardMaterial({
      color: 0x52525b,
      roughness: 0.7,
      metalness: 0.1
    });

    // Olive Canvas Bag Material
    const bagMat = new THREE.MeshStandardMaterial({
      color: 0x556045,
      roughness: 0.85,
      metalness: 0.05
    });

    // === HIERARCHY ROOT (PELVIS) ===
    // Total height ~ 1.75m
    const pelvis = new THREE.Group();
    pelvis.position.y = 0.92;
    this.mesh.add(pelvis);
    this.limbs.pelvis = pelvis;

    // Pelvis Mesh (Lower Torso)
    const pelvisGeo = new THREE.BoxGeometry(0.32, 0.18, 0.22);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, jeansMat);
    pelvisMesh.castShadow = true;
    pelvis.add(pelvisMesh);

    // === SPINE & UPPER TORSO (HOODIE) ===
    const spine = new THREE.Group();
    spine.position.y = 0.12;
    pelvis.add(spine);
    this.limbs.spine = spine;

    // Chest / Upper Hoodie
    const chestGeo = new THREE.BoxGeometry(0.38, 0.36, 0.24);
    const chestMesh = new THREE.Mesh(chestGeo, hoodieMat);
    chestMesh.position.y = 0.18;
    chestMesh.castShadow = true;
    spine.add(chestMesh);

    // V-Neck opening with inner shirt
    const vneckGeo = new THREE.PlaneGeometry(0.12, 0.16);
    const vneckMesh = new THREE.Mesh(vneckGeo, shirtMat);
    vneckMesh.position.set(0, 0.22, 0.122);
    spine.add(vneckMesh);

    // Hoodie Pocket (Front pouch)
    const pocketGeo = new THREE.BoxGeometry(0.24, 0.12, 0.04);
    const pocketMesh = new THREE.Mesh(pocketGeo, hoodieMat);
    pocketMesh.position.set(0, 0.10, 0.13);
    spine.add(pocketMesh);

    // Cross-body Bag Strap
    const strapGeo = new THREE.BoxGeometry(0.04, 0.48, 0.02);
    const strapMesh = new THREE.Mesh(strapGeo, bagMat);
    strapMesh.position.set(0.02, 0.16, 0.125);
    strapMesh.rotation.z = -0.55;
    spine.add(strapMesh);

    // Cross-body Canvas Bag (hanging on right hip)
    const bagGeo = new THREE.BoxGeometry(0.22, 0.20, 0.08);
    const bagMesh = new THREE.Mesh(bagGeo, bagMat);
    bagMesh.position.set(-0.22, -0.05, 0.05);
    bagMesh.rotation.z = 0.15;
    spine.add(bagMesh);

    // === NECK & HEAD ===
    const neck = new THREE.Group();
    neck.position.y = 0.36;
    spine.add(neck);

    const neckGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.1, 8);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.y = 0.04;
    neck.add(neckMesh);

    const headGroup = new THREE.Group();
    headGroup.position.y = 0.12;
    neck.add(headGroup);
    this.limbs.head = headGroup;

    // Head Oval
    const headGeo = new THREE.SphereGeometry(0.11, 16, 16);
    headGeo.scale(0.9, 1.15, 1.0);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Hair (Layered stylized locks matching Image 1)
    const hairCapGeo = new THREE.SphereGeometry(0.12, 14, 14);
    hairCapGeo.scale(0.95, 1.15, 1.05);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
    hairCap.position.set(0, 0.03, -0.01);
    headGroup.add(hairCap);

    // Bangs / Front Hair fringe
    const bangsGeo = new THREE.BoxGeometry(0.16, 0.08, 0.06);
    const bangs = new THREE.Mesh(bangsGeo, hairMat);
    bangs.position.set(0, 0.07, 0.09);
    bangs.rotation.x = 0.2;
    headGroup.add(bangs);

    // Hanging Hoodie Hood (behind neck)
    const hoodFoldGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.14, 10);
    const hoodFold = new THREE.Mesh(hoodFoldGeo, hoodieMat);
    hoodFold.position.set(0, -0.02, -0.12);
    hoodFold.rotation.x = 0.4;
    neck.add(hoodFold);

    // === ARMS (LEFT & RIGHT) ===
    this.limbs.leftArm = this.buildArm(spine, -0.22, hoodieMat, skinMat, true);
    this.limbs.rightArm = this.buildArm(spine, 0.22, hoodieMat, skinMat, false);

    // === LEGS (LEFT & RIGHT) ===
    this.limbs.leftLeg = this.buildLeg(pelvis, -0.10, jeansMat, shoeMat);
    this.limbs.rightLeg = this.buildLeg(pelvis, 0.10, jeansMat, shoeMat);

    // Cast shadows for all children
    this.mesh.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  buildArm(parent, xOffset, sleeveMat, handMat, isLeft) {
    const shoulder = new THREE.Group();
    shoulder.position.set(xOffset, 0.32, 0);
    parent.add(shoulder);

    // Upper Arm (Hoodie Sleeve rolled slightly)
    const upperGeo = new THREE.CylinderGeometry(0.06, 0.055, 0.26, 8);
    const upperMesh = new THREE.Mesh(upperGeo, sleeveMat);
    upperMesh.position.y = -0.13;
    shoulder.add(upperMesh);

    // Elbow Joint
    const elbow = new THREE.Group();
    elbow.position.y = -0.26;
    shoulder.add(elbow);

    // Forearm
    const lowerGeo = new THREE.CylinderGeometry(0.05, 0.045, 0.24, 8);
    const lowerMesh = new THREE.Mesh(lowerGeo, sleeveMat);
    lowerMesh.position.y = -0.12;
    elbow.add(lowerMesh);

    // Wrist Watch on Left Wrist
    if (isLeft) {
      const watchGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.03, 8);
      const watchMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
      const watch = new THREE.Mesh(watchGeo, watchMat);
      watch.position.y = -0.20;
      elbow.add(watch);
    }

    // Hand
    const handGeo = new THREE.BoxGeometry(0.05, 0.08, 0.03);
    const handMesh = new THREE.Mesh(handGeo, handMat);
    handMesh.position.y = -0.26;
    elbow.add(handMesh);

    return { shoulder, elbow };
  }

  buildLeg(parent, xOffset, pantMat, shoeMat) {
    const hip = new THREE.Group();
    hip.position.set(xOffset, -0.06, 0);
    parent.add(hip);

    // Upper Leg (Thigh in slim black jeans)
    const thighGeo = new THREE.CylinderGeometry(0.08, 0.065, 0.40, 8);
    const thighMesh = new THREE.Mesh(thighGeo, pantMat);
    thighMesh.position.y = -0.20;
    hip.add(thighMesh);

    // Knee Joint
    const knee = new THREE.Group();
    knee.position.y = -0.40;
    hip.add(knee);

    // Calf / Shin
    const calfGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.40, 8);
    const calfMesh = new THREE.Mesh(calfGeo, pantMat);
    calfMesh.position.y = -0.20;
    knee.add(calfMesh);

    // Ankle & Sneaker
    const ankle = new THREE.Group();
    ankle.position.y = -0.40;
    knee.add(ankle);

    const shoeGeo = new THREE.BoxGeometry(0.09, 0.07, 0.20);
    const shoeMesh = new THREE.Mesh(shoeGeo, shoeMat);
    shoeMesh.position.set(0, 0.035, 0.04);
    ankle.add(shoeMesh);

    // White rubber sole rim
    const soleGeo = new THREE.BoxGeometry(0.095, 0.02, 0.205);
    const soleMat = new THREE.MeshStandardMaterial({ color: 0xe4e4e7, roughness: 0.5 });
    const soleMesh = new THREE.Mesh(soleGeo, soleMat);
    soleMesh.position.set(0, 0.01, 0.04);
    ankle.add(soleMesh);

    return { hip, knee, ankle };
  }

  update(delta, inputState, collisionWalls) {
    if (this.isSitting) {
      this.animateSitting(delta);
      return;
    }

    // 1. Process Input Vector
    const moveZ = (inputState.forward ? -1 : 0) + (inputState.backward ? 1 : 0);
    const moveX = (inputState.left ? -1 : 0) + (inputState.right ? 1 : 0);

    const inputDir = new THREE.Vector3(moveX, 0, moveZ);
    this.isMoving = inputDir.lengthSq() > 0.001;
    this.isRunning = inputState.shift && this.isMoving;

    if (this.isMoving) {
      inputDir.normalize();

      // Rotate input relative to camera yaw
      const camYaw = inputState.cameraYaw || 0;
      inputDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), camYaw);

      // Target character rotation
      this.targetRotationY = Math.atan2(inputDir.x, inputDir.z);

      // Smooth rotate character towards travel direction
      let diff = this.targetRotationY - this.rotationY;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.rotationY += diff * Math.min(1.0, delta * 12.0);
      this.mesh.rotation.y = this.rotationY;

      // Calculate speed
      const curSpeed = this.moveSpeed * (this.isRunning ? this.runMultiplier : 1.0);
      const moveDelta = inputDir.multiplyScalar(curSpeed * delta);

      // Collision detection against room boundaries & furniture
      const nextPos = this.position.clone().add(moveDelta);
      if (this.checkCollision(nextPos, collisionWalls)) {
        // Slide along X or Z if single axis is clear
        const slideX = this.position.clone().add(new THREE.Vector3(moveDelta.x, 0, 0));
        const slideZ = this.position.clone().add(new THREE.Vector3(0, 0, moveDelta.z));
        if (!this.checkCollision(slideX, collisionWalls)) {
          this.position.x = slideX.x;
        } else if (!this.checkCollision(slideZ, collisionWalls)) {
          this.position.z = slideZ.z;
        }
      } else {
        this.position.copy(nextPos);
      }
    }

    this.mesh.position.copy(this.position);

    // 2. Run Procedural Animations
    this.animateLocomotion(delta);
  }

  checkCollision(pos, walls) {
    if (!walls || walls.length === 0) return false;
    const playerRadius = 0.28;

    for (const w of walls) {
      // Simple 2D box collision on XZ plane
      if (pos.x + playerRadius > w.minX && pos.x - playerRadius < w.maxX &&
          pos.z + playerRadius > w.minZ && pos.z - playerRadius < w.maxZ) {
        return true;
      }
    }
    return false;
  }

  animateLocomotion(delta) {
    const l = this.limbs;
    if (!l.leftLeg || !l.rightLeg) return;

    if (this.isMoving) {
      const animFreq = this.isRunning ? 11.0 : 7.5;
      this.animTime += delta * animFreq;

      const stride = Math.sin(this.animTime);
      const strideCos = Math.cos(this.animTime);
      const amp = this.isRunning ? 0.85 : 0.55;

      // Legs alternating swing
      l.leftLeg.hip.rotation.x = stride * amp;
      l.rightLeg.hip.rotation.x = -stride * amp;

      // Knee bending on back-swing
      l.leftLeg.knee.rotation.x = Math.max(0, -stride * amp * 0.9);
      l.rightLeg.knee.rotation.x = Math.max(0, stride * amp * 0.9);

      // Arms swing in opposition to legs
      l.leftArm.shoulder.rotation.x = -stride * (amp * 0.8);
      l.rightArm.shoulder.rotation.x = stride * (amp * 0.8);
      l.leftArm.elbow.rotation.x = -0.3 + Math.abs(stride * 0.3);
      l.rightArm.elbow.rotation.x = -0.3 + Math.abs(stride * 0.3);

      // Subtle pelvis and spine bounce
      l.pelvis.position.y = 0.92 + Math.abs(strideCos) * 0.04;
      l.spine.rotation.y = -stride * 0.08;
      l.spine.rotation.z = stride * 0.03;
    } else {
      // Natural Idle breathing
      this.animTime += delta * 2.2;
      const breath = Math.sin(this.animTime);

      // Reset legs
      l.leftLeg.hip.rotation.x = 0;
      l.rightLeg.hip.rotation.x = 0;
      l.leftLeg.knee.rotation.x = 0;
      l.rightLeg.knee.rotation.x = 0;
      l.pelvis.position.y = 0.92;

      // Subtle arm idle sway
      l.leftArm.shoulder.rotation.x = 0.05 + breath * 0.02;
      l.leftArm.shoulder.rotation.z = -0.08;
      l.rightArm.shoulder.rotation.x = 0.05 + breath * 0.02;
      l.rightArm.shoulder.rotation.z = 0.08;
      l.leftArm.elbow.rotation.x = -0.15;
      l.rightArm.elbow.rotation.x = -0.15;

      // Chest breathing
      l.spine.rotation.x = breath * 0.02;
      l.head.rotation.y = Math.sin(this.animTime * 0.4) * 0.08;
    }
  }

  setSitting(isSitting, chairPos, chairRotY) {
    this.isSitting = isSitting;
    const l = this.limbs;
    if (isSitting && chairPos) {
      this.position.set(chairPos.x, 0, chairPos.z);
      this.rotationY = chairRotY || 0;
      this.mesh.position.copy(this.position);
      this.mesh.rotation.y = this.rotationY;

      // Sit pose: hips flexed 90 deg, knees bent 90 deg, hands on desk
      l.pelvis.position.y = 0.58;
      l.leftLeg.hip.rotation.x = -Math.PI / 2;
      l.rightLeg.hip.rotation.x = -Math.PI / 2;
      l.leftLeg.knee.rotation.x = Math.PI / 2;
      l.rightLeg.knee.rotation.x = Math.PI / 2;

      l.leftArm.shoulder.rotation.x = -0.9;
      l.rightArm.shoulder.rotation.x = -0.9;
      l.leftArm.elbow.rotation.x = -0.8;
      l.rightArm.elbow.rotation.x = -0.8;
    } else {
      l.pelvis.position.y = 0.92;
      l.leftLeg.hip.rotation.x = 0;
      l.rightLeg.hip.rotation.x = 0;
      l.leftLeg.knee.rotation.x = 0;
      l.rightLeg.knee.rotation.x = 0;
    }
  }

  animateSitting(delta) {
    this.animTime += delta * 12.0;
    // Rapid typing finger/elbow animation
    this.limbs.leftArm.elbow.rotation.x = -0.8 + Math.sin(this.animTime) * 0.06;
    this.limbs.rightArm.elbow.rotation.x = -0.8 + Math.cos(this.animTime * 1.2) * 0.06;
  }
}

// ==========================================
// MODULE: js/3d/bedroom.js
// ==========================================
// 3D Bedroom Environment for CODE LEGACY
// Matches Image 2: Cozy Modern Gaming Bedroom, Battlestation Desk, Bed with Under-LEDs, Window, Ergonomic Chair

class Bedroom3D {
  constructor(scene) {
    this.scene = scene;
    this.roomGroup = new THREE.Group();
    this.roomGroup.name = "BedroomEnvironment";

    // Collision Boundaries (Bounding boxes for walls & furniture)
    this.collisionBoxes = [];

    // Interactive Trigger Zones
    this.triggers = [];

    // Screen emissive material to update dynamically
    this.screenMaterials = [];

    this.buildRoom();
    this.scene.add(this.roomGroup);
  }

  buildRoom() {
    // Dimensions: 5.6m width (X: -2.8 to 2.8), 5.2m depth (Z: -2.6 to 2.6), 3.0m height
    const roomW = 5.6;
    const roomD = 5.2;
    const roomH = 3.0;

    // === MATERIALS ===
    // Light Oak Parquet Floor
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xc8b59e,
      roughness: 0.45,
      metalness: 0.05
    });

    // Dark Slate Accent Wall (behind desk & bed)
    const slateWallMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.85
    });

    // Warm Off-White Wall
    const whiteWallMat = new THREE.MeshStandardMaterial({
      color: 0xeeeff2,
      roughness: 0.9
    });

    // Warm Oak Wood (for shelves, desk top, bed base)
    const oakMat = new THREE.MeshStandardMaterial({
      color: 0x9a7b56,
      roughness: 0.55
    });

    // Matt Dark Gray (for cabinets, frames)
    const cabinetMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6
    });

    // 1. FLOOR
    const floorGeo = new THREE.PlaneGeometry(roomW, roomD);
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.roomGroup.add(floor);

    // 2. CEILING
    const ceilingGeo = new THREE.PlaneGeometry(roomW, roomD);
    const ceiling = new THREE.Mesh(ceilingGeo, whiteWallMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = roomH;
    this.roomGroup.add(ceiling);

    // Ceiling Recessed Light Panel
    const lightPanelGeo = new THREE.BoxGeometry(1.6, 0.04, 1.2);
    const lightPanelMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfff3e0,
      emissiveIntensity: 0.9
    });
    const lightPanel = new THREE.Mesh(lightPanelGeo, lightPanelMat);
    lightPanel.position.set(0, roomH - 0.02, 0);
    this.roomGroup.add(lightPanel);

    // Ceiling Ambient Light Source
    const ceilingPointLight = new THREE.PointLight(0xffeedd, 1.8, 8.0);
    ceilingPointLight.position.set(0, roomH - 0.2, 0);
    ceilingPointLight.castShadow = true;
    ceilingPointLight.shadow.mapSize.width = 1024;
    ceilingPointLight.shadow.mapSize.height = 1024;
    ceilingPointLight.shadow.bias = -0.002;
    this.roomGroup.add(ceilingPointLight);

    // 3. WALLS
    // Back Wall (Z = -roomD/2 = -2.6) - Slate Accent Wall with Window
    const backWallLeft = new THREE.Mesh(new THREE.BoxGeometry(3.0, roomH, 0.1), slateWallMat);
    backWallLeft.position.set(-1.3, roomH / 2, -roomD / 2);
    backWallLeft.receiveShadow = true;
    this.roomGroup.add(backWallLeft);

    const backWallRight = new THREE.Mesh(new THREE.BoxGeometry(1.2, roomH, 0.1), slateWallMat);
    backWallRight.position.set(2.2, roomH / 2, -roomD / 2);
    backWallRight.receiveShadow = true;
    this.roomGroup.add(backWallRight);

    // Window (between back walls, from X = 0.2 to 1.6, Y = 1.0 to 2.4)
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.12), whiteWallMat);
    windowFrame.position.set(1.0, 1.7, -roomD / 2);
    this.roomGroup.add(windowFrame);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x88bbdd,
      emissive: 0xddeeff,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      transparent: true,
      opacity: 0.75
    });
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 1.25), glassMat);
    glass.position.set(1.0, 1.7, -roomD / 2 + 0.04);
    this.roomGroup.add(glass);

    // Sunlight streaming through window
    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.4);
    sunLight.position.set(2.0, 4.0, -5.0);
    sunLight.target.position.set(0, 0.5, 0);
    sunLight.castShadow = true;
    this.roomGroup.add(sunLight);
    this.roomGroup.add(sunLight.target);

    // Left Wall (X = -roomW/2 = -2.8) - Behind Desk
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, roomH, roomD), slateWallMat);
    leftWall.position.set(-roomW / 2, roomH / 2, 0);
    leftWall.receiveShadow = true;
    this.roomGroup.add(leftWall);

    // Right Wall (X = roomW/2 = 2.8) - Wardrobe side
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, roomH, roomD), whiteWallMat);
    rightWall.position.set(roomW / 2, roomH / 2, 0);
    rightWall.receiveShadow = true;
    this.roomGroup.add(rightWall);

    // Front Wall (Z = roomD/2 = 2.6) with Doorway
    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(2.0, roomH, 0.1), whiteWallMat);
    frontWallLeft.position.set(-1.8, roomH / 2, roomD / 2);
    this.roomGroup.add(frontWallLeft);

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(2.4, roomH, 0.1), whiteWallMat);
    frontWallRight.position.set(1.6, roomH / 2, roomD / 2);
    this.roomGroup.add(frontWallRight);

    // Door Frame (from X = -0.8 to 0.4)
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.12), cabinetMat);
    doorFrame.position.set(-0.2, 1.1, roomD / 2);
    this.roomGroup.add(doorFrame);

    // Outer Walls Collision
    this.collisionBoxes.push(
      { minX: -roomW / 2 - 0.2, maxX: -roomW / 2 + 0.1, minZ: -roomD / 2, maxZ: roomD / 2 }, // Left
      { minX: roomW / 2 - 0.1, maxX: roomW / 2 + 0.2, minZ: -roomD / 2, maxZ: roomD / 2 },  // Right
      { minX: -roomW / 2, maxX: roomW / 2, minZ: -roomD / 2 - 0.2, maxZ: -roomD / 2 + 0.1 }, // Back
      { minX: -roomW / 2, maxX: roomW / 2, minZ: roomD / 2 - 0.1, maxZ: roomD / 2 + 0.3 }   // Front
    );

    // 4. FURNITURE: BATTLESTATION DESK SETUP (Matching Image 2)
    this.buildBattlestation(oakMat, cabinetMat);

    // 5. FURNITURE: PLATFORM BED (Matching Image 2)
    this.buildPlatformBed(oakMat, cabinetMat);

    // 6. FURNITURE: WARDROBE & STORAGE CABINETS
    this.buildWardrobe(cabinetMat, oakMat);

    // 7. SETUP INTERACTIVE TRIGGERS
    this.setupTriggers();
  }

  buildBattlestation(oakMat, cabinetMat) {
    const deskGroup = new THREE.Group();
    // Placed along the left wall (X ~ -1.7, Z ~ -1.2)
    deskGroup.position.set(-1.7, 0, -1.2);

    // Desk Top (Length 2.2m, Width 0.8m, Height 0.74m)
    const topGeo = new THREE.BoxGeometry(2.2, 0.05, 0.8);
    const topMesh = new THREE.Mesh(topGeo, oakMat);
    topMesh.position.set(0, 0.74, 0);
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    deskGroup.add(topMesh);

    // Desk Drawers Unit (on the left side of desk)
    const drawerGeo = new THREE.BoxGeometry(0.55, 0.70, 0.75);
    const drawerMesh = new THREE.Mesh(drawerGeo, cabinetMat);
    drawerMesh.position.set(-0.8, 0.35, 0);
    drawerMesh.castShadow = true;
    deskGroup.add(drawerMesh);

    // Right Desk Legs (Metal Frame)
    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.72, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
    const legR1 = new THREE.Mesh(legGeo, legMat);
    legR1.position.set(0.95, 0.36, -0.32);
    const legR2 = new THREE.Mesh(legGeo, legMat);
    legR2.position.set(0.95, 0.36, 0.32);
    deskGroup.add(legR1);
    deskGroup.add(legR2);

    // Overhead Floating Wall Cabinets & LED Light Bar (Image 2)
    const wallCabGeo = new THREE.BoxGeometry(2.2, 0.45, 0.35);
    const wallCab = new THREE.Mesh(wallCabGeo, cabinetMat);
    wallCab.position.set(0, 2.2, -0.22);
    wallCab.castShadow = true;
    deskGroup.add(wallCab);

    // Cyan LED Light Bar under cabinet
    const ledBarGeo = new THREE.BoxGeometry(2.0, 0.02, 0.02);
    const ledBarMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.5
    });
    const ledBar = new THREE.Mesh(ledBarGeo, ledBarMat);
    ledBar.position.set(0, 1.95, -0.22);
    deskGroup.add(ledBar);

    // Ambient Cyan Glow from Desk LED
    const deskLedLight = new THREE.PointLight(0x00f0ff, 1.2, 2.5);
    deskLedLight.position.set(0, 1.9, -0.15);
    deskGroup.add(deskLedLight);

    // DUAL MONITORS (Matching Image 2)
    [-0.38, 0.38].forEach((xOffset, idx) => {
      // Monitor Stand Arm
      const armGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8);
      const arm = new THREE.Mesh(armGeo, legMat);
      arm.position.set(xOffset * 0.4, 0.92, -0.25);
      deskGroup.add(arm);

      // Screen Frame
      const frameGeo = new THREE.BoxGeometry(0.68, 0.42, 0.03);
      const frame = new THREE.Mesh(frameGeo, legMat);
      frame.position.set(xOffset, 1.15, -0.2);
      frame.rotation.y = idx === 0 ? 0.12 : -0.12;
      frame.castShadow = true;
      deskGroup.add(frame);

      // Glowing Display
      const screenGeo = new THREE.PlaneGeometry(0.64, 0.38);
      const screenMat = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        emissive: idx === 0 ? 0x00f0ff : 0xa855f7,
        emissiveIntensity: 0.55,
        roughness: 0.2
      });
      this.screenMaterials.push(screenMat);
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(xOffset, 1.15, -0.183);
      screen.rotation.y = idx === 0 ? 0.12 : -0.12;
      deskGroup.add(screen);
    });

    // RGB Mechanical Keyboard & Mouse
    const kbGeo = new THREE.BoxGeometry(0.46, 0.015, 0.16);
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.2,
      roughness: 0.3
    });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.position.set(0, 0.77, 0.08);
    deskGroup.add(kb);

    const mouseGeo = new THREE.BoxGeometry(0.07, 0.025, 0.11);
    const mouse = new THREE.Mesh(mouseGeo, legMat);
    mouse.position.set(0.36, 0.77, 0.08);
    deskGroup.add(mouse);

    // Large Extended Mousepad
    const padGeo = new THREE.BoxGeometry(0.9, 0.005, 0.35);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.8 });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(0.12, 0.765, 0.08);
    deskGroup.add(pad);

    // Desktop PC Tower (Glass side panel with glowing fan)
    const pcGeo = new THREE.BoxGeometry(0.24, 0.45, 0.48);
    const pcMat = new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.6 });
    const pc = new THREE.Mesh(pcGeo, pcMat);
    pc.position.set(-0.85, 0.98, -0.05);
    pc.castShadow = true;
    deskGroup.add(pc);

    // ERGONOMIC CHAIR (Herman Miller Aeron Style from Image 2)
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0, 0.65);

    // Chair 5-Star Base
    const baseCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 8), legMat);
    baseCenter.position.y = 0.1;
    chairGroup.add(baseCenter);

    // Gas lift cylinder
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), legMat);
    cylinder.position.y = 0.28;
    chairGroup.add(cylinder);

    // Mesh Seat Pan
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.46), seatMat);
    seat.position.y = 0.46;
    seat.castShadow = true;
    chairGroup.add(seat);

    // High Ergonomic Mesh Backrest
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.55, 0.04), seatMat);
    back.position.set(0, 0.75, 0.20);
    back.rotation.x = -0.15;
    back.castShadow = true;
    chairGroup.add(back);

    // Armrests
    [-0.25, 0.25].forEach(x => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.22), legMat);
      arm.position.set(x, 0.58, 0.05);
      chairGroup.add(arm);
    });

    deskGroup.add(chairGroup);
    this.roomGroup.add(deskGroup);

    // Desk Collision Box
    this.collisionBoxes.push({
      minX: -2.8,
      maxX: -0.6,
      minZ: -1.7,
      maxZ: -0.7
    });
  }

  buildPlatformBed(oakMat, cabinetMat) {
    const bedGroup = new THREE.Group();
    // Placed on back-right (X ~ 1.0, Z ~ -1.5) under the window
    bedGroup.position.set(1.0, 0, -1.5);

    // Wooden Platform Base with drawers (2.1m Length, 1.3m Width, 0.45m Height)
    const baseGeo = new THREE.BoxGeometry(1.3, 0.45, 2.1);
    const base = new THREE.Mesh(baseGeo, oakMat);
    base.position.set(0, 0.225, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    bedGroup.add(base);

    // Under-bed Amber Warm LED Strip (Image 2)
    const ledStripGeo = new THREE.BoxGeometry(1.2, 0.02, 2.0);
    const ledStripMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      emissive: 0xffaa44,
      emissiveIntensity: 1.6
    });
    const ledStrip = new THREE.Mesh(ledStripGeo, ledStripMat);
    ledStrip.position.set(0, 0.04, 0);
    bedGroup.add(ledStrip);

    const underBedLight = new THREE.PointLight(0xffaa44, 1.4, 2.0);
    underBedLight.position.set(0, 0.15, 0.2);
    bedGroup.add(underBedLight);

    // Comfortable Mattress
    const mattressGeo = new THREE.BoxGeometry(1.2, 0.22, 2.0);
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.set(0, 0.55, 0);
    bedGroup.add(mattress);

    // Navy Blue Duvet Blanket (Image 2)
    const duvetGeo = new THREE.BoxGeometry(1.22, 0.12, 1.4);
    const duvetMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75 });
    const duvet = new THREE.Mesh(duvetGeo, duvetMat);
    duvet.position.set(0, 0.66, 0.28);
    duvet.castShadow = true;
    bedGroup.add(duvet);

    // Soft Pillow
    const pillowGeo = new THREE.BoxGeometry(0.7, 0.12, 0.42);
    const pillow = new THREE.Mesh(pillowGeo, mattressMat);
    pillow.position.set(0, 0.68, -0.72);
    pillow.rotation.x = 0.1;
    bedGroup.add(pillow);

    this.roomGroup.add(bedGroup);

    // Bed Collision Box
    this.collisionBoxes.push({
      minX: 0.3,
      maxX: 1.7,
      minZ: -2.6,
      maxZ: -0.4
    });
  }

  buildWardrobe(cabinetMat, oakMat) {
    // Tall Wardrobe on right corner (X: 2.1 to 2.7, Z: 0.5 to 2.5)
    const wardrobeGeo = new THREE.BoxGeometry(0.65, 2.7, 2.0);
    const wardrobe = new THREE.Mesh(wardrobeGeo, cabinetMat);
    wardrobe.position.set(2.4, 1.35, 1.4);
    wardrobe.castShadow = true;
    this.roomGroup.add(wardrobe);

    // Bookshelves with books (X: 0.5 to 1.7, Z: -2.5)
    const shelfGeo = new THREE.BoxGeometry(1.2, 0.04, 0.25);
    [1.6, 2.0, 2.4].forEach(yPos => {
      const shelf = new THREE.Mesh(shelfGeo, oakMat);
      shelf.position.set(0.0, yPos, -2.4);
      shelf.castShadow = true;
      this.roomGroup.add(shelf);
    });

    // Wardrobe Collision
    this.collisionBoxes.push({
      minX: 2.0,
      maxX: 2.8,
      minZ: 0.3,
      maxZ: 2.5
    });
  }

  setupTriggers() {
    // 1. PC Battlestation Trigger
    this.triggers.push({
      id: "pc_desk",
      name: "Máy tính Battlestation",
      prompt: "[ E ] Sử Dụng Máy Tính (Học Code & Dự Án)",
      position: new THREE.Vector3(-1.7, 0, -0.6),
      radius: 1.3,
      action: "open_pc"
    });

    // 2. Bed Trigger (Sleep)
    this.triggers.push({
      id: "bed_sleep",
      name: "Giường ngủ",
      prompt: "[ E ] Đi Ngủ (Hồi phục 100% Năng Lượng)",
      position: new THREE.Vector3(0.6, 0, -1.0),
      radius: 1.4,
      action: "sleep"
    });

    // 3. Bookshelf Trigger
    this.triggers.push({
      id: "bookshelf",
      name: "Tủ sách công nghệ",
      prompt: "[ E ] Đọc Sách Clean Code & Kiến Trúc",
      position: new THREE.Vector3(0.0, 0, -2.0),
      radius: 1.1,
      action: "read_book"
    });

    // 4. Doorway Trigger (To Campus)
    this.triggers.push({
      id: "room_door",
      name: "Cửa phòng trọ",
      prompt: "[ E ] Ra Khuôn Viên Đại Học (Campus)",
      position: new THREE.Vector3(-0.2, 0, 2.2),
      radius: 1.2,
      action: "exit_room"
    });
  }

  getCollisionBoxes() {
    return this.collisionBoxes;
  }

  getTriggers() {
    return this.triggers;
  }

  update(delta) {
    // Subtle pulsating glow on monitors
    const time = performance.now() * 0.003;
    this.screenMaterials.forEach((mat, idx) => {
      mat.emissiveIntensity = 0.5 + Math.sin(time + idx * 2.0) * 0.15;
    });
  }
}

// ==========================================
// MODULE: js/3d/npc.js
// ==========================================
// 3D NPC Engine for CODE LEGACY
// Renders Mentor Minh standing near the hallway/door with animated quest marker

class NPC3D {
  constructor(scene, options) {
    this.scene = scene;
    this.id = options.id || "mentor_minh";
    this.name = options.name || "Minh Mentor";
    this.role = options.role || "Senior Principal Engineer";
    this.position = options.position || new THREE.Vector3(0.8, 0, 1.8);
    this.rotationY = options.rotationY || -Math.PI * 0.75;

    this.mesh = new THREE.Group();
    this.mesh.name = `NPC_${this.id}`;
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.rotationY;

    this.animTime = 0;
    this.overheadMarker = null;

    this.buildNPCModel();
    this.scene.add(this.mesh);
  }

  buildNPCModel() {
    // Mature Tech Lead style: Blazer, polo, smart trousers
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdfd0, roughness: 0.6 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.8 });
    const blazerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.75 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });

    // Pelvis & Legs
    const pelvis = new THREE.Group();
    pelvis.position.y = 0.95;
    this.mesh.add(pelvis);

    const pelvisMesh = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.18, 0.22), pantsMat);
    pelvis.add(pelvisMesh);

    // Legs
    [-0.10, 0.10].forEach(x => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.88, 8), pantsMat);
      leg.position.set(x, -0.48, 0);
      leg.castShadow = true;
      pelvis.add(leg);

      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.22), shoeMat);
      shoe.position.set(x, -0.92, 0.04);
      pelvis.add(shoe);
    });

    // Torso with Smart Blazer
    const spine = new THREE.Group();
    spine.position.y = 0.15;
    pelvis.add(spine);
    this.spine = spine;

    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.40, 0.25), blazerMat);
    chest.position.y = 0.20;
    chest.castShadow = true;
    spine.add(chest);

    // Arms in polite cross-chest or relaxed leader pose
    [-0.24, 0.24].forEach((x, idx) => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.52, 8), blazerMat);
      arm.position.set(x, 0.15, 0.04);
      arm.rotation.x = -0.2;
      arm.rotation.z = idx === 0 ? 0.1 : -0.1;
      spine.add(arm);
    });

    // Head with neat professional hairstyle & glasses
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.44;
    spine.add(headGroup);
    this.head = headGroup;

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), skinMat);
    head.scale.set(0.9, 1.15, 1.0);
    head.castShadow = true;
    headGroup.add(head);

    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), hairMat);
    hair.scale.set(0.95, 1.12, 1.05);
    hair.position.set(0, 0.04, -0.01);
    headGroup.add(hair);

    // Glasses Rim
    const glassesMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, roughness: 0.2 });
    const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.02), glassesMat);
    glasses.position.set(0, 0.02, 0.11);
    headGroup.add(glasses);

    // Animated Overhead Quest Indicator [ ! ]
    const markerGroup = new THREE.Group();
    markerGroup.position.y = 1.95;
    this.overheadMarker = markerGroup;

    const ringGeo = new THREE.RingGeometry(0.12, 0.16, 16);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    markerGroup.add(ring);

    const pointGeo = new THREE.ConeGeometry(0.08, 0.20, 8);
    const pointMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 1.2 });
    const point = new THREE.Mesh(pointGeo, pointMat);
    point.rotation.x = Math.PI;
    point.position.y = -0.05;
    markerGroup.add(point);

    this.mesh.add(markerGroup);
  }

  update(delta, playerPos) {
    this.animTime += delta;

    // Overhead indicator floating bounce & rotation
    if (this.overheadMarker) {
      this.overheadMarker.position.y = 1.95 + Math.sin(this.animTime * 3.0) * 0.06;
      this.overheadMarker.rotation.y += delta * 2.0;
    }

    // Subtle idle breathing
    if (this.spine) {
      this.spine.rotation.x = Math.sin(this.animTime * 1.8) * 0.02;
    }

    // Head tracking player if close
    if (playerPos && this.head) {
      const dist = this.mesh.position.distanceTo(playerPos);
      if (dist < 3.2) {
        const localPlayerPos = this.mesh.worldToLocal(playerPos.clone());
        const angle = Math.atan2(localPlayerPos.x, localPlayerPos.z);
        this.head.rotation.y = THREE.MathUtils.clamp(angle, -0.8, 0.8);
      } else {
        this.head.rotation.y = THREE.MathUtils.lerp(this.head.rotation.y, 0, delta * 3.0);
      }
    }
  }

  getTrigger() {
    return {
      id: "npc_minh",
      name: this.name,
      prompt: `[ E ] Trò Chuyện Cùng ${this.name} (${this.role})`,
      position: this.position.clone(),
      radius: 1.6,
      action: "talk_npc"
    };
  }
}

// ==========================================
// MODULE: js/3d/cameraController.js
// ==========================================
// Third-Person Follow Camera Controller for CODE LEGACY
// Smooth Spring Follow, Mouse Orbit, Scroll Zoom

class ThirdPersonCamera {
  constructor(camera, targetMesh) {
    this.camera = camera;
    this.targetMesh = targetMesh;

    // Orbit Angles
    this.yaw = 0;       // Horizontal orbit (radians)
    this.pitch = 0.32;  // Vertical tilt (radians)
    this.distance = 3.6; // Distance from character
    this.minDistance = 1.8;
    this.maxDistance = 6.0;

    // Target tracking offset
    this.lookOffset = new THREE.Vector3(0, 1.45, 0); // Focus on upper chest/neck

    // Mouse control state
    this.isDragging = false;
    this.prevMouseX = 0;
    this.prevMouseY = 0;

    // Current smoothed position
    this.currentPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();

    this.setupMouseEvents();
  }

  setupMouseEvents() {
    window.addEventListener('mousedown', (e) => {
      // Only drag if not clicking UI modals or inputs
      if (e.target.tagName === 'CANVAS' || e.target.id === 'game-canvas-overlay') {
        this.isDragging = true;
        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.prevMouseX;
      const deltaY = e.clientY - this.prevMouseY;

      this.yaw -= deltaX * 0.006;
      this.pitch = THREE.MathUtils.clamp(this.pitch - deltaY * 0.005, 0.05, 1.15);

      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    window.addEventListener('wheel', (e) => {
      this.distance = THREE.MathUtils.clamp(
        this.distance + e.deltaY * 0.003,
        this.minDistance,
        this.maxDistance
      );
    }, { passive: true });
  }

  update(delta) {
    if (!this.targetMesh) return;

    // Target point to look at
    const targetPoint = this.targetMesh.position.clone().add(this.lookOffset);

    // Compute desired camera position on spherical coordinate offset
    const cosPitch = Math.cos(this.pitch);
    const sinPitch = Math.sin(this.pitch);
    const sinYaw = Math.sin(this.yaw);
    const cosYaw = Math.cos(this.yaw);

    const desiredOffset = new THREE.Vector3(
      this.distance * sinYaw * cosPitch,
      this.distance * sinPitch,
      this.distance * cosYaw * cosPitch
    );

    const desiredPosition = targetPoint.clone().add(desiredOffset);

    // Prevent camera dipping below floor
    if (desiredPosition.y < 0.4) desiredPosition.y = 0.4;

    // Smooth lerp camera movement (Spring-damper feel)
    const lerpFactor = Math.min(1.0, delta * 8.0);
    this.camera.position.lerp(desiredPosition, lerpFactor);
    this.currentLookAt.lerp(targetPoint, lerpFactor);
    this.camera.lookAt(this.currentLookAt);
  }

  getYaw() {
    return this.yaw;
  }
}

// ==========================================
// MODULE: js/3d/game3d.js
// ==========================================
// Master 3D Game Engine for CODE LEGACY
// Integrates Fullscreen WebGL 3D, Character Controller, Room Environment, Third-person Camera, Triggers, and Audio Footsteps










class Game3D {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.player = null;
    this.bedroom = null;
    this.npc = null;
    this.tpCamera = null;

    // Input state
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      shift: false,
      jump: false,
      cameraYaw: 0
    };

    // Interaction state
    this.activeTrigger = null;
    this.promptElement = document.getElementById('interaction-prompt');

    // Footstep audio timer
    this.footstepTimer = 0;

    // Clock
    this.clock = new THREE.Clock();
    this.isRunning = false;
  }

  init() {
    if (!this.canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070b14);
    this.scene.fog = new THREE.FogExp2(0x070b14, 0.04);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    this.camera.position.set(0, 2.5, 4.0);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 4. Build Environment & World
    this.bedroom = new Bedroom3D(this.scene);

    // 5. Build Player Character (Starts in middle of room)
    this.player = new Character3D(this.scene);
    this.player.position.set(0, 0, 0.4);

    // 6. Build NPC (Minh Mentor standing near hallway)
    this.npc = new NPC3D(this.scene, {
      id: "mentor_minh",
      name: "Minh Mentor",
      role: "Senior Principal Engineer",
      position: new THREE.Vector3(0.6, 0, 1.7),
      rotationY: -Math.PI * 0.75
    });

    // 7. Third-Person Follow Camera
    this.tpCamera = new ThirdPersonCamera(this.camera, this.player.mesh);

    // 8. Event Listeners (Keyboard & Window Resize)
    this.setupKeyboardInput();
    window.addEventListener('resize', () => this.onWindowResize());

    // 9. Start Loop
    this.isRunning = true;
    this.animate();

    console.log("🎮 3D RPG Game Engine Initialized Successfully!");
  }

  setupKeyboardInput() {
    window.addEventListener('keydown', (e) => {
      // Ignore if typing in text inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.keys.shift = true;
          break;
        case 'Space':
          this.keys.jump = true;
          break;
        case 'KeyE':
          this.handleInteraction();
          break;
        case 'Escape':
          this.handleEscape();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.keys.shift = false;
          break;
        case 'Space':
          this.keys.jump = false;
          break;
      }
    });
  }

  handleInteraction() {
    if (!this.activeTrigger) return;
    audio.playClick();

    switch (this.activeTrigger.action) {
      case 'open_pc':
        // Sit at desk and open programming academy & projects
        this.player.setSitting(true, new THREE.Vector3(-1.7, 0, -0.6), Math.PI);
        ui.switchTab('skills');
        state.log("💻 Đang ngồi tại bàn máy tính Battlestation. Hãy chọn bài toán để giải hoặc code dự án!", "info");
        break;

      case 'sleep':
        // Sleep on bed & restore energy
        LifeManager.sleepFullNight();
        break;

      case 'read_book':
        // Open library / shop books
        ui.switchTab('shop');
        state.log("📖 Mở tủ sách công nghệ: Chọn sách để đọc và tích lũy EXP!", "info");
        break;

      case 'talk_npc':
        // Open NPC dialogue modal
        ui.switchTab('overview');
        state.log("💬 Đang đối thoại cùng Minh Mentor...", "info");
        break;

      case 'exit_room':
        // Show campus exploration
        ui.switchTab('quests');
        state.log("🏛️ Bước ra khuôn viên trường Đại học (Campus). Lộ trình 10 chương rộng mở!", "success");
        break;
    }
  }

  handleEscape() {
    if (this.player.isSitting) {
      this.player.setSitting(false);
    }
    // Close any open modal
    document.querySelectorAll('.fixed.inset-0').forEach(m => m.classList.add('hidden'));
  }

  checkTriggers() {
    const playerPos = this.player.position;
    const allTriggers = [
      ...this.bedroom.getTriggers(),
      this.npc.getTrigger()
    ];

    let foundTrigger = null;
    for (const trig of allTriggers) {
      const dist = playerPos.distanceTo(trig.position);
      if (dist <= trig.radius) {
        foundTrigger = trig;
        break;
      }
    }

    this.activeTrigger = foundTrigger;
    if (this.promptElement) {
      if (foundTrigger) {
        this.promptElement.textContent = foundTrigger.prompt;
        this.promptElement.classList.remove('hidden');
      } else {
        this.promptElement.classList.add('hidden');
      }
    }
  }

  onWindowResize() {
    if (!this.renderer || !this.camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(() => this.animate());

    const delta = Math.min(this.clock.getDelta(), 0.1);

    // 1. Update Camera Yaw in input
    if (this.tpCamera) {
      this.keys.cameraYaw = this.tpCamera.getYaw();
    }

    // 2. Update Player Movement & Collisions
    const collisionBoxes = this.bedroom.getCollisionBoxes();
    this.player.update(delta, this.keys, collisionBoxes);

    // 3. Update Camera follow
    this.tpCamera.update(delta);

    // 4. Update Environment & NPC
    this.bedroom.update(delta);
    this.npc.update(delta, this.player.position);

    // 5. Check Proximity Interaction Triggers
    this.checkTriggers();

    // 6. Footsteps procedural sound
    if (this.player.isMoving && !this.player.isSitting) {
      this.footstepTimer += delta;
      const stepInterval = this.player.isRunning ? 0.28 : 0.42;
      if (this.footstepTimer >= stepInterval) {
        this.footstepTimer = 0;
        audio.playKeypress(); // Procedural soft step click
      }
    } else {
      this.footstepTimer = 0;
    }

    // 7. Render 3D Frame
    this.renderer.render(this.scene, this.camera);
  }
}

// ==========================================
// MODULE: js/ui/ui.js
// ==========================================
// Master UI Controller for CODE LEGACY





















class UIManager {
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

const ui = new UIManager();

// ==========================================
// MODULE: js/main.js
// ==========================================
// CODE LEGACY - Main Game Initialization Loop








let game3D = null;

function bootGame() {
  console.log('⚡ Initializing CODE LEGACY: 3D Career RPG...');

  // 1. Try to load existing save data
  SaveManager.load();

  // 2. Initialize UI & HUD Overlays
  ui.init();

  // 3. Initialize Master 3D Engine (Fullscreen Three.js World)
  try {
    if (typeof THREE !== 'undefined') {
      game3D = new Game3D('game-canvas');
      game3D.init();
      window.game3D = game3D;
    } else {
      console.warn("Three.js not found, fallback to 2D HUD");
    }
  } catch (err) {
    console.error("3D Engine init error:", err);
  }

  // 4. Start Game Time Loop
  timeManager.start();

  // 5. Setup Header & Shortcut Controls
  setupControls();

  // 6. Setup Auto-Save every 30 seconds
  setInterval(() => {
    SaveManager.save();
  }, 30000);

  state.log('🚀 CODE LEGACY 3D sẵn sàng! Nhấn [WASD] để di chuyển, [E] để tương tác máy tính, [K] xem kỹ năng!', 'success');
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootGame);
} else {
  bootGame();
}

function setupControls() {
  const saveBtn = document.getElementById('btn-manual-save');
  const exportBtn = document.getElementById('btn-export-save');
  const importInput = document.getElementById('input-import-save');
  const resetBtn = document.getElementById('btn-reset-game');
  const audioBtn = document.getElementById('btn-toggle-audio');
  const editNameBtn = document.getElementById('btn-edit-name');

  if (saveBtn) {
    saveBtn.onclick = () => {
      SaveManager.save();
      audio.playSuccess();
    };
  }

  if (exportBtn) {
    exportBtn.onclick = () => {
      SaveManager.exportJson();
      audio.playClick();
    };
  }

  if (importInput) {
    importInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        SaveManager.importJson(file);
      }
    };
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ tiến trình và chơi lại từ đầu không?')) {
        SaveManager.reset();
        window.location.reload();
      }
    };
  }

  if (audioBtn) {
    audioBtn.onclick = () => {
      audio.enabled = !audio.enabled;
      audioBtn.textContent = audio.enabled ? '🔊 Âm thanh: Bật' : '🔇 Âm thanh: Tắt';
      audioBtn.classList.toggle('text-cyan-400', audio.enabled);
      audioBtn.classList.toggle('text-slate-500', !audio.enabled);
      if (audio.enabled) audio.playClick();
    };
  }

  if (editNameBtn) {
    editNameBtn.onclick = () => {
      const newName = prompt('Nhập tên mới cho nhân vật của bạn:', state.data.character.name);
      if (newName) {
        Customizer.setName(newName);
      }
    };
  }

  // RPG Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.code) {
      case 'KeyK': // Skills
        ui.toggleMenuModal('skills');
        break;
      case 'KeyJ': // Quests
        ui.toggleMenuModal('quests');
        break;
      case 'KeyC': // Character / Career
        ui.toggleMenuModal('career');
        break;
      case 'KeyI': // Inventory / Shop
        ui.toggleMenuModal('shop');
        break;
      case 'KeyP': // Portfolio
        ui.toggleMenuModal('portfolio');
        break;
    }
  });
}
})();