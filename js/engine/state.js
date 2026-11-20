// Global Reactive State Management for CODE LEGACY
export class GameState {
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

export const state = new GameState();
