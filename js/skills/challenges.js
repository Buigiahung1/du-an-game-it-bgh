// Real Interactive Programming & Logic Challenges Database
export const CHALLENGES = [
  {
    id: 'ch_c_ptr',
    title: 'C/C++: Hiểu rõ Con trỏ & Địa chỉ bộ nhớ',
    skillTarget: 'c_lang',
    tier: 1,
    difficulty: 'Cơ bản',
    question: `Đoạn mã C sau đây in ra giá trị gì trên màn hình console?`,
    codeSnippet: `int a = 10;
int *p = &a;
*p = 25;
int b = *p + a;
printf("%d", b);`,
    options: [
      { id: 'A', text: '35', correct: false },
      { id: 'B', text: '50', correct: true, explanation: '*p trỏ trực tiếp đến ô nhớ của a, nên khi *p = 25 thì a cũng biến thành 25. Do đó b = 25 + 25 = 50.' },
      { id: 'C', text: '20', correct: false },
      { id: 'D', text: 'Lỗi biên dịch Segmentation Fault', correct: false }
    ],
    rewardExp: 75,
    rewardSkillExp: 90
  },
  {
    id: 'ch_py_list_comp',
    title: 'Python: List Comprehension & Filter',
    skillTarget: 'python',
    tier: 1,
    difficulty: 'Cơ bản',
    question: `Đoạn mã Python nào sau đây tạo ra danh sách bình phương của các số chẵn từ 1 đến 10?`,
    codeSnippet: `# Cần kết quả: [4, 16, 36, 64, 100]`,
    options: [
      { id: 'A', text: '[x*2 for x in range(1, 11) if x % 2 == 0]', correct: false },
      { id: 'B', text: '[x**2 for x in range(1, 11) if x % 2 == 0]', correct: true, explanation: 'x**2 là lũy thừa 2 (bình phương), và range(1, 11) duyệt từ 1 đến 10 với điều kiện x % 2 == 0.' },
      { id: 'C', text: '[x^2 for x in range(1, 10)]', correct: false },
      { id: 'D', text: '[x*x for x in range(10) if x % 2 != 0]', correct: false }
    ],
    rewardExp: 70,
    rewardSkillExp: 85
  },
  {
    id: 'ch_js_event_loop',
    title: 'JavaScript: Cơ chế Event Loop & Bất đồng bộ',
    skillTarget: 'javascript',
    tier: 1,
    difficulty: 'Trung bình',
    question: `Thứ tự in ra các số trong console của đoạn mã JavaScript sau là gì?`,
    codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: [
      { id: 'A', text: '1 -> 2 -> 3 -> 4', correct: false },
      { id: 'B', text: '1 -> 4 -> 2 -> 3', correct: false },
      { id: 'C', text: '1 -> 4 -> 3 -> 2', correct: true, explanation: 'Call Stack đồng bộ (1, 4) chạy trước. Sau đó Microtask queue (Promise -> 3) được ưu tiên trước Macrotask queue (setTimeout -> 2).' },
      { id: 'D', text: '1 -> 3 -> 4 -> 2', correct: false }
    ],
    rewardExp: 100,
    rewardSkillExp: 120
  },
  {
    id: 'ch_dsa_twosum',
    title: 'DSA: Tối ưu độ phức tạp thuật toán Two Sum',
    skillTarget: 'data_struct',
    tier: 1,
    difficulty: 'Trung bình',
    question: `Cách tiếp cận nào giải bài toán Two Sum với mảng N phần tử đạt độ phức tạp thời gian O(N)?`,
    codeSnippet: `// Cho mảng nums và target số nguyên.
// Tìm 2 chỉ số sao cho tổng 2 phần tử bằng target.`,
    options: [
      { id: 'A', text: 'Duyệt 2 vòng lặp lồng nhau O(N^2)', correct: false },
      { id: 'B', text: 'Dùng bảng băm (Hash Map) lưu giá trị bổ sung (target - num)', correct: true, explanation: 'Với mỗi phần tử x, ta kiểm tra xem (target - x) có trong Hash Map chưa với tra cứu O(1), tổng thời gian là O(N).' },
      { id: 'C', text: 'Sắp xếp mảng QuickSort rồi duyệt tuyến tính O(N log N)', correct: false },
      { id: 'D', text: 'Đệ quy vét cạn nhị phân O(2^N)', correct: false }
    ],
    rewardExp: 110,
    rewardSkillExp: 130
  },
  {
    id: 'ch_git_conflict',
    title: 'Git: Xử lý xung đột khi Rebase / Merge',
    skillTarget: 'git_github',
    tier: 1,
    difficulty: 'Thực chiến',
    question: `Lệnh nào an toàn nhất để tích hợp các commit mới nhất từ nhánh main vào nhánh tính năng feature của bạn mà giữ lịch sử commit thẳng gọn?`,
    codeSnippet: `$ git checkout feature
# Lệnh tiếp theo nên là gì?`,
    options: [
      { id: 'A', text: 'git rebase main', correct: true, explanation: 'git rebase main đặt các commit của feature lên trên đỉnh của nhánh main, tạo lịch sử commit tuyến tính, sạch sẽ.' },
      { id: 'B', text: 'git push --force origin main', correct: false },
      { id: 'C', text: 'git reset --hard HEAD~5', correct: false },
      { id: 'D', text: 'git checkout -b new_world', correct: false }
    ],
    rewardExp: 90,
    rewardSkillExp: 100
  }
];

