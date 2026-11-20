// Chapter 1: The Awakening - Narrative Quests Database
// Professional technical quest line with realistic software engineering scenarios.

export const CHAPTER_1_QUESTS = {
  quest_ch1_hello_world: {
    id: 'quest_ch1_hello_world',
    chapter: 1,
    title: '[SYSTEM INITIALIZATION] Nắm vững mô hình bộ nhớ C/C++',
    category: 'main',
    giver: 'Minh Mentor (Principal Engineer)',
    desc: 'Bạn đang nợ môn lập trình cơ sở và mất căn bản kiến trúc máy tính. Minh Mentor yêu cầu bạn ngồi vào máy tính, nắm rõ cơ chế địa chỉ ô nhớ vật lý và giải thử thách con trỏ C/C++ đầu tiên.',
    dialogue: {
      intro: 'Lập trình viên thực thụ không được phép coi bộ nhớ máy tính là một hộp đen ma thuật. Hãy ngồi vào bàn làm việc, phân tích rõ sự khác biệt giữa con trỏ và giá trị ô nhớ. Hoàn thành thử thách C/C++ hoặc thực hiện ít nhất 2 phiên tự luyện tập code.',
      completion: 'Phân tích rất chuẩn xác. Hiểu được cơ chế địa chỉ ô nhớ là viên gạch đầu tiên phân biệt một kỹ sư hệ thống với một người chỉ biết copy-paste mã nguồn.'
    },
    requirements: {
      type: 'practice_or_challenge',
      targetCount: 2,
      currentCount: 0
    },
    rewards: {
      exp: 160,
      money: 45,
      skillExp: { c_lang: 60 },
      badge: 'Systems Apprentice'
    }
  },
  quest_ch1_valgrind_fix: {
    id: 'quest_ch1_valgrind_fix',
    chapter: 1,
    title: '[INCIDENT RESPONSE] Điều tra lỗi bộ nhớ Use-After-Free',
    category: 'main',
    giver: 'Phòng thực hành Máy chủ Khoa CNTT',
    desc: 'Hệ thống socket trong bài lab của khoa bị sập bất ngờ với mã lỗi SIGSEGV. Quản trị viên phòng máy yêu cầu sinh viên kiểm tra vùng cấp phát Heap và sửa lỗi con trỏ treo (dangling pointer).',
    dialogue: {
      intro: 'Tiến trình nhận gói tin mạng trên server bị crash liên tục. Báo cáo từ Valgrind chỉ ra một con trỏ đang ghi vào ô nhớ sau khi đã gọi free(). Hãy tìm và xác định bản chất lỗi Use-After-Free trong danh mục thử thách.',
      completion: 'Xác nhận lỗi chính xác! Đã loại bỏ hoàn toàn nguy cơ rò rỉ và can thiệp bộ nhớ ngoài ý muốn.'
    },
    requirements: {
      type: 'challenge_id',
      challengeId: 'ch_c_memory_leak'
    },
    rewards: {
      exp: 220,
      money: 60,
      skillExp: { c_lang: 75 },
      rep: 15
    }
  },
  quest_ch1_first_steps: {
    id: 'quest_ch1_first_steps',
    chapter: 1,
    title: '[DEVOPS INFRASTRUCTURE] Kiểm soát phiên bản Git & Quy chuẩn CI/CD',
    category: 'main',
    giver: 'Lâm Đồng Môn',
    desc: 'Không một dự án phần mềm chuyên nghiệp nào lưu trữ mã nguồn thủ công qua file nén. Hãy nâng cấp kỹ năng Git lên Cấp độ 2 để chuẩn bị tham gia nhận thầu dự án freelance.',
    dialogue: {
      intro: 'Cậu vẫn gửi mã nguồn qua file zip à? Trong môi trường phát triển thực tế, mọi dòng code đều phải được quản lý qua Git branch, Pull Request và CI pipeline. Nâng trình độ Git của cậu lên Cấp 2 ngay đi.',
      completion: 'Rất tốt. Giờ cậu đã hiểu cách rebase nhánh tính năng và giữ cây commit thẳng thớm. Đủ điều kiện nhận thầu dự án đầu tiên rồi đấy.'
    },
    requirements: {
      type: 'skill_level',
      skillId: 'git_github',
      targetLevel: 2
    },
    rewards: {
      exp: 200,
      money: 50,
      rep: 15
    }
  },
  quest_ch1_earn_money: {
    id: 'quest_ch1_earn_money',
    chapter: 1,
    title: '[PRODUCTION DEPLOYMENT] Nghiệm thu hợp đồng Freelance thực tế',
    category: 'main',
    giver: 'Đối tác Thương mại Điện tử',
    desc: 'Ngân sách sinh hoạt của bạn đang cạn kiệt. Hãy truy cập sàn Freelance, nhận một hợp đồng phù hợp với năng lực kỹ thuật và bàn giao code không có bug cho khách hàng.',
    dialogue: {
      intro: 'Website bán hàng của chúng tôi đang bị vỡ giao diện trên thiết bị di động, ảnh hưởng trực tiếp tới tỷ lệ chuyển đổi giỏ hàng. Cần một lập trình viên xử lý gấp và bàn giao ngay hôm nay.',
      completion: 'Đã nghiệm thu mã nguồn thành công. Không phát sinh bug hồi quy. Tiền thù lao đã được thanh toán vào tài khoản của bạn.'
    },
    requirements: {
      type: 'complete_freelance',
      targetCount: 1,
      currentCount: 0
    },
    rewards: {
      exp: 260,
      money: 90,
      rep: 30,
      item: 'kb_mechanical_entry'
    }
  },
  quest_ch1_sql_optimize: {
    id: 'quest_ch1_sql_optimize',
    chapter: 1,
    title: '[DATABASE TUNING] Tối ưu hóa truy vấn B-Tree & Ngăn chặn Full Table Scan',
    category: 'main',
    giver: 'Kỹ sư Dữ liệu Doanh nghiệp',
    desc: 'Hệ thống hóa đơn thanh toán bắt đầu quá tải với thời gian phản hồi chạm ngưỡng 8 giây. Bạn cần giải quyết bài toán chỉ mục B-Tree và điều kiện Sargable trong danh mục thử thách.',
    dialogue: {
      intro: 'Cơ sở dữ liệu của chúng tôi đang phải quét toàn bộ bảng (Sequential Scan) vì lập trình viên viết câu lệnh WHERE bọc hàm tính toán. Hãy phân tích bản chất chỉ mục để phục hồi hiệu năng hệ thống.',
      completion: 'Tuyệt vời! Thời gian phản hồi truy vấn giảm từ 8.2s xuống còn 4ms nhờ việc phục hồi hiệu lực của B-Tree Index.'
    },
    requirements: {
      type: 'challenge_id',
      challengeId: 'ch_sql_index'
    },
    rewards: {
      exp: 300,
      money: 110,
      skillExp: { database: 90 },
      rep: 35
    }
  },
  quest_ch1_exam_boss: {
    id: 'quest_ch1_exam_boss',
    chapter: 1,
    title: '[BOSS CHALLENGE] Đột phá kỳ thi Cấu trúc Dữ liệu & Giải thuật',
    category: 'boss',
    giver: 'Hội đồng Khoa Khoa học Máy tính',
    desc: 'Kỳ thi sát hạch môn Cấu trúc dữ liệu & Giải thuật đã tới. Để đạt điểm A xuất sắc và lọt vào mắt xanh của các doanh nghiệp đối tác, bạn phải giải quyết bài toán tối ưu Two Sum đạt O(N) thời gian.',
    dialogue: {
      intro: 'Bài thi hôm nay yêu cầu thí sinh chứng minh khả năng giảm thiểu độ phức tạp thời gian từ O(N^2) xuống O(N) bằng bảng băm. Mọi phương án vét cạn lồng vòng lặp đều sẽ bị chấm trượt!',
      completion: 'Xuất sắc! Thuật toán của bạn đạt điểm tuyệt đối với độ phức tạp tối ưu O(N). Điểm tổng kết môn thuộc Top 1% của khóa. Minh Mentor đã đề cử bạn vào danh sách phỏng vấn thực tập sinh!'
    },
    requirements: {
      type: 'challenge_id',
      challengeId: 'ch_dsa_twosum'
    },
    rewards: {
      exp: 500,
      money: 200,
      rep: 60,
      unlockChapter: 2
    }
  }
};
