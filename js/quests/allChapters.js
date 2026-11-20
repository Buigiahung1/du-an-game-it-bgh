// Master 10 Chapters Campaign Database
export const ALL_CHAPTERS = {
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

