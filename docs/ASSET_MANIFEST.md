# CODE LEGACY: FROM ZERO TO LEGEND
## MASTER ASSET MANIFEST

**Document Version:** 1.0  
**Project Location:** `CODE LEGACY project root`
**Asset Management Policy:** CC0, Open Game License, Procedural Synthesis, and Royalty-Free  

---

### ASSET INVENTORY TABLE

| Asset ID | Category | Name / Description | Source & License | File Path | Status |
|---|---|---|---|---|---|
| `char_nam_hero` | Character | Nhân vật chính Nam (Asian IT student, navy hoodie, jeans, sneakers, canvas bag) | Procedural Skeleton & PBR / Studio Internal | `js/3d/character.js` | **PASS** |
| `npc_minh_mentor` | NPC | Mentor Minh (Senior Principal Engineer with blazer, trousers, glasses, quest marker) | Procedural Skeleton & PBR / Studio Internal | `js/3d/npc.js` | **PASS** |
| `anim_locomotion` | Animation | Bộ animation Idle breathing, Walk stride, Sprint x1.6 | Procedural Trigonometric Blending (Mixamo spec compatible) | `js/3d/character.js` | **PASS** |
| `anim_work_sit` | Animation | Animation ngồi ghế công thái học Aeron & gõ phím cơ | Procedural Joint IK & State Machine | `js/3d/character.js` | **PASS** |
| `env_dorm_bedroom` | Environment | Phòng trọ sinh viên 12m² (Sàn gỗ parquet, tường slate, cửa sổ đón nắng) | Poly Haven / Studio Architectural Design | `js/3d/bedroom.js` | **PASS** |
| `prop_battlestation` | Furniture | Bàn làm việc gỗ sồi, 2 màn hình cong phát sáng, PC case kính, bàn phím cơ RGB | Poly Haven Furniture Style / Studio PBR | `js/3d/bedroom.js` | **PASS** |
| `prop_aeron_chair` | Furniture | Ghế công thái học Herman Miller Aeron (Lưới thoáng khí, chân xoay 5 cạnh) | Poly Haven Design Reference / Studio PBR | `js/3d/bedroom.js` | **PASS** |
| `prop_platform_bed` | Furniture | Giường phản gỗ có dải đèn LED vàng hắt gầm (Amber 3000K) | Studio PBR Mesh & PointLight | `js/3d/bedroom.js` | **PASS** |
| `prop_photo_fairy` | Decoration | Dàn đèn dây quả cầu phát sáng & góc ảnh kỷ niệm polaroid trên tường | Studio Artistic Design (Life is Strange reference) | `js/3d/bedroom.js` | **PASS** |
| `prop_guitar` | Instrument | Đàn guitar gỗ mộc acoustic tựa bên tủ | Studio PBR Mesh (Cylinder & Soundhole) | `js/3d/bedroom.js` | **PASS** |
| `prop_dust_particles`| VFX | Hạt bụi nắng lơ lửng trong luồng sáng cửa sổ | Three.js BufferGeometry Additive Particle System | `js/3d/bedroom.js` | **PASS** |
| `env_campus_quad` | Environment | Khuôn viên Đại học 50m, hàng cây phong vàng, tòa nhà kính, skybridge | Quaternius / Architectural Modular Design | `js/3d/campus.js` | **PASS** |
| `audio_procedural` | Audio | Tiếng bước chân, tiếng gõ phím cơ, tiếng click, tiếng chuông thành tựu | Web Audio API AudioContext Procedural Synthesizer | `js/engine/audio.js` | **PASS** |
| `ref_images_pack` | Concept Ref | Bộ ảnh concept chuẩn: nhân vật, phòng trọ, góc ảnh polaroid, khuôn viên | User Reference Visual Pack | `assets/images/*.jpg` | **PASS** |
