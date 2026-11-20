// Items, Tech Gear & Consumables Database
export const ITEMS = {
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

