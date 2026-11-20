# CODE LEGACY: FROM ZERO TO LEGEND (V1 PROTOTYPE)
**Thể loại:** Career RPG · Life Simulation · Tech Open World · Programming Sandbox  
**Công nghệ:** Pure Modern HTML5, ES6 Modules, Three.js WebGL 3D, Web Audio API, Tailwind CSS  

---

## 1. GIỚI THIỆU TỔNG QUAN

**CODE LEGACY** là tựa game nhập vai mô phỏng chân thực hành trình phát triển sự nghiệp của một sinh viên IT từ con số 0 (nghèo, mất gốc, laptop cũ) đến khi trở thành Nhà sáng lập hoặc Kiến trúc sư trưởng của tập đoàn công nghệ hàng đầu thế giới.

Game được thiết kế theo đúng yêu cầu:
- **Không phải web học tập tĩnh:** Mọi nút bấm đều có logic xử lý thực tế, tính toán EXP, Năng lượng, Kỷ luật, Tiền tệ, Danh tiếng.
- **Vật phẩm có tác dụng thực tế:** Bàn phím cơ tăng tốc độ code, Màn hình cong 4K tăng Focus, Ghế công thái học giảm hao hụt thể lực.
- **Tích hợp kiến thức lập trình thật:** Giải quyết các câu đố thuật toán, con trỏ C++, Event Loop JavaScript, Git Rebase để vượt qua thử thách và kỳ thi.
- **Mô phỏng đời sống (Life Sim):** Quản lý Năng lượng, Sức khỏe tinh thần, Thể chất, Ăn uống, Giấc ngủ và Tiền thuê trọ định kỳ.
- **Góc làm việc 3D (Three.js):** Khung nhìn 3D góc làm việc Battlestation tương tác được bằng chuột, tự động nâng cấp diện mạo khi mua sắm phần cứng mới.
- **Hệ thống âm thanh thuần Web Audio API:** Âm thanh gõ phím, tiếng ting nhận tiền, chuông thăng cấp, chuông cảnh báo mà không cần bất kỳ file MP3 tải ngoài nào!

---

## 2. HƯỚNG DẪN TRẢI NGHIỆM GAME

### Cách 1: Chạy trực tiếp (Nhanh nhất)
1. Chỉ cần nhấp đúp chuột vào file `index.html` trong thư mục này để mở trực tiếp trên trình duyệt web bất kỳ (Chrome, Edge, Firefox, Brave).

### Cách 2: Chạy qua Python Local Server
Nếu bạn muốn chạy qua giao thức HTTP:
```bash
python -m http.server 3000
```
Sau đó mở trình duyệt và truy cập: `http://localhost:3000`

---

## 3. KIẾN TRÚC MÃ NGUỒN (MODULAR CODEBASE)

```
c:\Users\ADMIN\Desktop\New folder (3)\
├── index.html                   # Giao diện chính Dark Cyberpunk Glassmorphism
├── css/
│   └── style.css                # Style animations, neon glow, custom scrollbars
├── js/
│   ├── engine/
│   │   ├── state.js             # Reactive Game State & Event Bus
│   │   ├── time.js              # Chu kỳ ngày đêm, đồng hồ, chi phí sinh hoạt tuần
│   │   ├── audio.js             # Bộ tổng hợp âm thanh Web Audio procedural
│   │   └── save.js              # Auto-save LocalStorage, Export/Import file JSON
│   ├── character/
│   │   ├── stats.js             # Tính toán Buffs phần cứng, EXP, Level Up, Tiến hóa Giai đoạn
│   │   └── customizer.js        # Đổi tên và thay đổi trang phục/avatar theo giai đoạn
│   ├── skills/
│   │   ├── challenges.js        # Ngân hàng câu hỏi/thử thách lập trình thực tế
│   │   └── skillTree.js         # Quản lý 100 cấp độ kỹ năng & tự luyện code
│   ├── quests/
│   │   ├── chapter1.js          # Tuyến nhiệm vụ cốt truyện Chương 1: The Awakening
│   │   ├── dailyQuests.js       # Nhiệm vụ hàng ngày
│   │   └── questEngine.js       # Kiểm tra điều kiện hoàn thành và trả thưởng
│   ├── economy/
│   │   ├── items.js             # Danh mục phần cứng (Laptop, Màn hình, Ghế, Sách, Cà phê)
│   │   └── shop.js              # Mua bán, trang bị và sử dụng vật phẩm
│   ├── career/
│   │   └── freelance.js         # Thị trường nhận job freelance có tỷ lệ rủi ro
│   ├── life/
│   │   └── lifeActions.js       # Giấc ngủ 8h, chợp mắt, tập gym, ăn uống, thiền định
│   ├── render3d/
│   │   └── battlestation3d.js   # Khung nhìn WebGL Three.js góc làm việc 3D
│   ├── ui/
│   │   └── ui.js                # Render DOM HUD, chuyển Tab, Modal Thử thách, Toasts
│   └── main.js                  # Khởi động game và vòng lặp chính
└── README.md                    # Tài liệu hướng dẫn
```

---

## 4. LỘ TRÌNH PHÁT TRIỂN TIẾP THEO

- [x] **V1 – Prototype (Hoàn tất):** Kiến trúc lõi, nhân vật, chu kỳ thời gian, chỉ số sinh tồn, cây kỹ năng, thử thách code thật, cửa hàng trang bị, chợ freelance, save/load, WebGL 3D battlestation.
- [ ] **V2 – Full Career:** Triển khai toàn bộ cốt truyện 10 chương, hệ thống 5 công ty công nghệ hư cấu với quy trình phỏng vấn 5 vòng (CV, Coding test, System Design, Behavioral), thăng tiến từ Junior -> Architect.
- [ ] **V3 – Ultimate:** Bản đồ thành phố 3D mở rộng, hệ thống NPC thông minh giao tiếp động, thị trường chứng khoán công nghệ, gọi vốn mạo hiểm và xây dựng kỳ lân công nghệ toàn cầu.

