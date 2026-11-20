import os
import re

def clean_js_files():
    js_dir = os.path.join(os.path.dirname(__file__), '..', 'js')
    
    replacements = {
        '⚡ Luyện Code': '[DEV] Luyện Code',
        '🧠 Vào Làm Thử Thách': '[EXEC] Thử Thách Kỹ Thuật',
        '🔥 BOSS THỬ THÁCH': '[BOSS] Thử Thách Trọng Điểm',
        'NHIỆM VỤ CHÍNH': '[MISSION] Nhiệm Vụ Chính',
        '⚡ Sử Dụng': '[EXEC] Sử Dụng',
        '⚡ Nạp Luôn': '[FAST] Nạp Luôn',
        '🛒 Mua Ngay': '[BUY] Mua Ngay',
        '✅ Chính xác!': '[PASSED] Kiểm thử thành công:',
        '✅ CHÍNH XÁC!': '[PASSED] THỬ THÁCH VƯỢT QUA:',
        '❌ Code gặp bug!': '[FAILED] Lỗi mã nguồn:',
        '❌ CODE GẶP BUG!': '[FAILED] LỖI MÃ NGUỒN:',
        '❌ DỰ ÁN BỊ LỖI!': '[FAILED] DỰ ÁN BỊ LỖI:',
        '❌ Phỏng vấn chưa đạt': '[FAILED] Phỏng vấn chưa đạt',
        '🎉 CHÍNH THỨC NHẬN OFFER!': '[OFFER ACCEPTED] CHÍNH THỨC GIA NHẬP:',
        '🎉 HOÀN THÀNH XUẤT SẮC DỰ ÁN:': '[SUCCESS] HOÀN TẤT HỢP ĐỒNG:',
        '🎉 CHÚC MỪNG!': '[SUCCESS] CHÚC MỪNG:',
        '⚠️': '[WARN]',
        '🐛': '[BUG]',
        '💥': '[BURNOUT]',
        '🔥': '[SYS]',
        '💻': '[TECH]',
        '🚀': '[LAUNCH]',
        '👑': '[VENTURE]',
        '🏆': '[ACHIEVE]',
        '💵': 'USD',
        '🌟': 'REP',
        '✨': '',
        '☕': '',
        '🥤': '',
        '📖': '',
        '🛍': '',
        '📦': '',
        '💾': '',
        '🔄': '',
        '📥': '',
        '📂': '',
        '💸': '',
        '☀': '',
        '🏃': '',
        '🧘': '',
        '💤': '',
        '🍱': '',
        '🎯': '[TARGET]',
        '💎': '[VAL]',
        '🤝': '[DEAL]'
    }

    count = 0
    for root, _, files in os.walk(js_dir):
        for f in files:
            if f.endswith('.js'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as fp:
                    content = fp.read()
                
                original = content
                for k, v in replacements.items():
                    if k in content:
                        content = content.replace(k, v)
                
                # Clean any lingering non-ascii emoji ranges
                content = re.sub(r'[\U00010000-\U0010ffff]', '', content)
                
                if content != original:
                    with open(path, 'w', encoding='utf-8') as fp:
                        fp.write(content)
                    count += 1
                    print(f'Cleaned technical strings in: {os.path.basename(path)}')

    print(f'Done cleaning {count} JS modules!')

if __name__ == '__main__':
    clean_js_files()
