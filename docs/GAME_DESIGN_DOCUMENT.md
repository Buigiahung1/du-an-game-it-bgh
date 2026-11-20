# CODE LEGACY: FROM ZERO TO LEGEND
## GAME DESIGN DOCUMENT (GDD)

**Version:** 2.0 (Cinematic Realistic 3D PC Web Edition)  
**Genre:** 3D Career Life Simulation RPG  
**Platform:** PC Web (WebGL / Three.js Standalone)  
**Control Scheme:** Third-Person Keyboard (WASD + Shift + E) & Mouse Orbit  
**Lead Designer:** Autonomous Game Development Team  
**Status:** Milestone 1 & Phase 1 Vertical Slice Playable  

---

## 1. PRODUCT VISION & CORE PILLARS

**CODE LEGACY: FROM ZERO TO LEGEND** is a realistic, narrative-driven 3D Career Life Simulation RPG that places the player inside the shoes of a 20-year-old IT student starting with weak coding skills, an old machine, empty pockets, and no industry connections.

The game is built upon five interconnected pillars:
1. **Third-Person Life Simulation:** Freely explore 3D environments (dormitory room, university campus walkway, computer labs, modern corporate offices). Manage personal health, mental energy, rest, and lifestyle.
2. **Realistic IT Academy & Coding Challenges:** Real interactive computer science problems (C/C++ memory pointers, Python list comprehensions, JS event loops, Data Structures & Algorithms, Git conflicts) with simulated compiler output, test cases, and skill trees.
3. **Dynamic Career & Economy Progression:** From zero-income student to paid freelancer, tech intern, junior software engineer, senior lead, cloud architect, and eventually tech founder.
4. **Cinematic Character & Story Adventure:** 10-chapter main campaign with evolving relationships, mentors (Mentor Minh), rivals (Lâm Đối Thủ), recruiters (Sarah Tuyển Dụng), and high-stakes milestone exams/boss encounters.
5. **Hardware & Workspace Progression:** Sắm sửa thiết bị phần cứng thật: từ laptop cũ giá rẻ đến màn hình cong kép RGB, bàn phím cơ quang học, ghế công thái học Herman Miller Aeron, và góc làm việc penthouse.

---

## 2. ART DIRECTION & VISUAL STANDARD

- **Style:** **Cinematic Realistic 3D** (photorealistic human proportions, physical PBR materials, warm volumetric sunlight, dynamic soft shadow mapping, and nostalgic student dorm life aesthetics).
- **Protagonist (Nam):** Asian IT student, dark layered hair with front fringe, dark navy blue hoodie over a light cream v-neck shirt, olive cross-body canvas messenger bag with brass buckle, slim dark charcoal jeans, gray canvas sneakers, and digital wrist watch.
- **Environments:**
  - **Dormitory Bedroom (12m²):** Light oak parquet flooring, dark slate accent wall, window with warm morning sunlight streaming in, platform bed with under-bed amber LED strip, polaroid photo memory wall with warm glowing paper lantern fairy lights, acoustic wooden guitar leaning against wardrobe, geometric floor rug, dual-monitor battlestation desk, RGB mechanical keyboard, Herman Miller Aeron-style ergonomic mesh chair.
  - **University Campus Walkway (Autumn Quad):** 50-meter paved granite promenade lined with golden autumn maple/ginkgo trees, modern faculty buildings with curtain glass facades and architectural concrete pillars, skybridge, benches, and outdoor sunlight.

---

## 3. CORE GAMEPLAY LOOP

```
[ Wake Up in Dorm / Recover Energy ]
              │
              ▼
[ Move WASD / Explore 3D World ] ────► [ Talk to Mentor Minh [E] (Get Advice & Quests) ]
              │
              ▼
[ Interact with Battlestation [E] ] ──► [ Solve Coding Challenges / Compiler Test Cases ]
              │
              ▼
[ Earn EXP, Cash & Skill Levels ] ───► [ Complete Quests & Advance Chapter ]
              │
              ▼
[ Step Out to Campus [E] / Explore Lab & Library ] ──► [ Unlock Freelance, Jobs & Upgrades ]
```

---

## 4. THE 10-CHAPTER MASTER CAMPAIGN

| Chương | Tiêu Đề | Nội Dung Trọng Tâm | Đích Đến (Key Milestone) | Phần Thưởng |
|---|---|---|---|---|
| **1** | **The Awakening** | Sinh viên mất căn bản học lại từ đầu, làm quen con trỏ C/C++, giải thuật cơ sở. | Vượt qua bài kiểm tra giữa kỳ C++ | 500 EXP, $300, Mở chợ Freelance |
| **2** | **The Foundation** | DSA, OOP, Quản lý mã nguồn Git/GitHub, Cơ sở dữ liệu SQL. | Hoàn thành bài tập lớn DSA | Developer Badge, Mở Portfolio |
| **3** | **The First Project** | Xây dựng fullstack web app đầu tiên, deploy server, tên miền. | 100 người dùng thật đầu tiên | +100 REP, Portfolio ấn tượng |
| **4** | **The Money Hunter** | Nhận job freelance quốc tế, sửa bug gấp, đàm phán hợp đồng. | Tích lũy $1,000 tiền mặt | Nâng cấp Dàn PC Battlestation |
| **5** | **The Competition** | Hackathon 48 giờ xuyên đêm, cạnh tranh với các lập trình viên kỳ cựu. | Giành giải Nhất Hackathon | Thư giới thiệu của Big Tech |
| **6** | **The Internship** | Gửi 50 CV, vượt qua phỏng vấn Live Coding, nhận offer thực tập. | Trở thành Thực tập sinh chính thức | Lương cứng hàng tháng, Mentor |
| **7** | **The First Job** | Junior Developer, trực chiến bug production 2h sáng, Scrum sprint. | Cứu sập hệ thống thanh toán | Thăng cấp Mid-level Developer |
| **8** | **The Rise** | Senior Engineer, Tech Lead, System Architect vi dịch vụ triệu user. | Kiến trúc Cloud chịu tải 5M user | Văn phòng riêng, Cổ phiếu ESOP |
| **9** | **The Empire** | Thành lập Tech Startup, tuyển dụng nhân sự giỏi, pitching gọi vốn. | Vòng gọi vốn Series A thành công | Định giá công ty hàng triệu USD |
| **10** | **The Legacy** | Tập đoàn công nghệ toàn cầu, IPO niêm yết, tạo ra thế hệ tiếp nối. | Rung chuông sàn chứng khoán Nasdaq | Huyền Thoại Công Nghệ (Legacy) |

---

## 5. HARDWARE & INVENTORY PROGRESSION

- **Laptops/Desks:** Laptop Cũ Celeron 4GB ➔ Ultrabook ThinkPad ➔ Gaming Rig RTX 4070 ➔ Mac Studio M3 Max Workstation.
- **Keyboards:** Bàn phím cao su văn phòng ➔ Bàn phím cơ Blue Switch ➔ Bàn phím cơ Custom HHKB Gateron Oil King.
- **Monitors:** Màn hình 19 inch 60Hz ➔ Màn hình 27 inch 2K 144Hz ➔ Cặp màn hình kép 32 inch 4K OLED HDR.
- **Chairs:** Ghế nhựa phòng trọ ➔ Ghế gaming da PU ➔ Ghế công thái học Herman Miller Aeron Remastered.
- **Consumables:** Cà phê lon Highlands, Trà xanh, Sách Clean Code, Giáo trình Giải thuật CLRS, Pizza đêm.

---

## 6. CONTROLS & CAMERA SPECIFICATIONS

- **`W / A / S / D`:** Di chuyển nhân vật tương đối theo góc quay camera (Spring damping lerp).
- **`Shift`:** Chạy nước rút (Sprint) tốc độ x1.6.
- **`Mouse Movement`:** Xoay tự do 360° quanh nhân vật (Spherical yaw/pitch orbit).
- **`Mouse Scroll`:** Thu phóng camera gần / xa (khoảng cách 2.2m – 6.0m).
- **`E`:** Phím bấm tương tác vạn năng (Contextual Proximity Interaction Prompt).
- **`ESC`:** Đóng toàn bộ cửa sổ overlay, hủy trạng thái ngồi, quay về góc nhìn 3D.
- **`K / J / C / I / P`:** Phím tắt mở nhanh Cây Kỹ Năng, Nhiệm Vụ, Sự Nghiệp, Túi Đồ, Hồ Sơ.
