// Chapter 1: The Awakening Narrative Quests
export const CHAPTER_1_QUESTS = {
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

