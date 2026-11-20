import re

def clean_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    replacements = {
        '⚡ Năng Lượng': 'NĂNG LƯỢNG (ENERGY)',
        '☕ Nạp [U]': '[RECHARGE U]',
        '🧠 Tinh Thần': 'TINH THẦN (MENTAL)',
        'EXP Bar ✨': 'EXP Bar',
        '<span>⚡</span> Học Viện [K]': '<span>[DEV]</span> Học Viện [K]',
        '<span>📜</span> 10 Chương [J]': '<span>[QUEST]</span> 10 Chương [J]',
        '<span>🏢</span> Sự Nghiệp [C]': '<span>[CORP]</span> Sự Nghiệp [C]',
        '<span>🚀</span> Portfolio [P]': '<span>[REPO]</span> Portfolio [P]',
        '<span>🛍️</span> Cửa Hàng [I]': '<span>[SHOP]</span> Cửa Hàng [I]',
        '<span>👑</span> Startup': '<span>[VENTURE]</span> Startup',
        '<span>💵</span>': '<span class="text-[10px] text-emerald-500 font-mono font-bold">USD</span>',
        '<span>🌟</span>': '<span class="text-[10px] text-purple-400 font-mono font-bold">REP</span>',
        '<span>🕒</span>': '<span class="text-[10px] text-cyan-400 font-mono font-bold">SYS</span>',
        '🔊': 'AUDIO',
        '💾 Lưu': '[SAVE]',
        '✨ Mới': '[NEW]',
        '🎯 <strong>Mục tiêu:</strong>': '[MỤC TIÊU] <strong>Mục tiêu:</strong>',
        '🎮 <strong class="text-cyan-300">WASD</strong> Di chuyển': '<strong class="text-cyan-300">[WASD]</strong> Di chuyển',
        '⚡ <strong class="text-cyan-300">SHIFT</strong> Chạy': '<strong class="text-cyan-300">[SHIFT]</strong> Chạy',
        '🖱️ <strong class="text-cyan-300">Chuột</strong> Xoay 3D': '<strong class="text-cyan-300">[CHUỘT]</strong> Xoay 3D',
        '⌨️ <strong class="text-cyan-300">E</strong> Tương tác': '<strong class="text-cyan-300">[E]</strong> Tương tác',
        '❌ <strong class="text-cyan-300">ESC</strong> Đóng Menu': '<strong class="text-cyan-300">[ESC]</strong> Đóng Menu',
        '<span class="text-lg">💻</span>': '<span class="text-xs font-mono text-cyan-400">[SYS]</span>',
        '👤 Nhân Vật & Gear': '[PROFILE] Nhân Vật & Gear',
        '⚡ Học Viện Code': '[DEV] Học Viện Code',
        '📜 10 Chương': '[QUEST] 10 Chương',
        '🏢 Sự Nghiệp': '[CORP] Sự Nghiệp',
        '🚀 Portfolio': '[REPO] Portfolio',
        '👑 Startup': '[VENTURE] Startup',
        '💼 Freelance': '[CONTRACT] Freelance',
        '🛍️ Cửa Hàng': '[MARKET] Cửa Hàng',
        '🏆 Thành Tựu': '[ACHIEVE] Thành Tựu',
        '📜 Nhật Ký': '[LOGS] Nhật Ký',
        '✕ Đóng [ESC]': '[ESC] Đóng',
        '<span>🎒</span> Túi Đồ & Nạp Năng Lượng (Consumables)': '<span>[INVENTORY]</span> Túi Đồ & Nạp Năng Lượng',
        '<span>🎒</span> Túi Đồ & Nạp Năng Lượng Tức Thì': '<span>[INVENTORY]</span> Túi Đồ & Nạp Năng Lượng Tức Thì',
        '⚡ Chạy test: -8 Năng lượng': '[TEST] Chạy test: -8 Năng lượng',
        '⚠️ Phạt bug: -10⚡ | -$3 Cloud Sandbox': '[PENALTY] Phạt bug: -10 Năng lượng | -$3 Cloud Sandbox',
        '🚀 Bắt Đầu Hành Trình Huyền Thoại': '[INITIALIZE] Bắt Đầu Sự Nghiệp',
        '✕': '[X]'
    }

    count = 0
    for k, v in replacements.items():
        if k in html:
            html = html.replace(k, v)
            count += 1

    # Strip any remaining standalone emoji characters in index.html
    html = re.sub(r'[\U00010000-\U0010ffff]|[\u2600-\u27bf]', '', html)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Cleaned index.html successfully with {count} technical replacements!')

if __name__ == '__main__':
    clean_index_html()
