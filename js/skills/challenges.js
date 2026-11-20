// Master Database: Professional Software Engineering & Computer Science Challenges
// Pure technical challenges covering Low-Level Systems, Algorithms, Concurrency, Architecture, Security and Networking.

export const CHALLENGES = [
  {
    id: 'ch_c_ptr',
    title: 'C/C++: Con trỏ, Tham chiếu & Ô nhớ bộ nhớ vật lý',
    skillTarget: 'c_lang',
    tier: 1,
    difficulty: 'Cơ bản',
    question: 'Đoạn mã C sau đây in ra giá trị gì trên màn hình console?',
    codeSnippet: `int a = 10;
int *p = &a;
*p = 25;
int b = *p + a;
printf("%d", b);`,
    options: [
      { id: 'A', text: '35', correct: false },
      { id: 'B', text: '50', correct: true, explanation: 'Con trỏ *p trỏ trực tiếp đến địa chỉ ô nhớ của a, nên lệnh *p = 25 làm biến a đổi giá trị thành 25. Biểu thức b = 25 + 25 = 50.' },
      { id: 'C', text: '20', correct: false },
      { id: 'D', text: 'Lỗi biên dịch Segmentation Fault', correct: false }
    ],
    rewardExp: 75,
    rewardSkillExp: 90
  },
  {
    id: 'ch_c_memory_leak',
    title: 'C/C++: Quản lý bộ nhớ Heap, Dangling Pointer & Rò rỉ RAM',
    skillTarget: 'c_lang',
    tier: 1,
    difficulty: 'Trung bình',
    question: 'Đoạn mã cấp phát động dưới đây gặp phải lỗi bảo mật / quản lý tài nguyên nào?',
    codeSnippet: `void process_packet(int size) {
    char *buffer = (char *)malloc(size);
    if (!buffer) return;
    read_network(buffer, size);
    free(buffer);
    buffer[0] = 0; // Ghi vào buffer sau khi giải phóng
}`,
    options: [
      { id: 'A', text: 'Buffer Overflow', correct: false },
      { id: 'B', text: 'Use-After-Free (Dangling Pointer access)', correct: true, explanation: 'Vùng nhớ đã được giải phóng bằng free(buffer) nhưng con trỏ vẫn ghi đè buffer[0] dẫn tới lỗi Use-After-Free nguy hiểm, có thể làm hỏng heap memory layout.' },
      { id: 'C', text: 'Memory Leak', correct: false },
      { id: 'D', text: 'Stack Overflow', correct: false }
    ],
    rewardExp: 95,
    rewardSkillExp: 110
  },
  {
    id: 'ch_py_list_comp',
    title: 'Python: List Comprehension & Generator Memory Footprint',
    skillTarget: 'python',
    tier: 1,
    difficulty: 'Cơ bản',
    question: 'Khi xử lý một tập dữ liệu 10 triệu bản ghi từ file log, cách tiếp cận nào tốn ít bộ nhớ RAM nhất?',
    codeSnippet: `# Cách 1: data = [parse(x) for x in large_stream]
# Cách 2: data = (parse(x) for x in large_stream)`,
    options: [
      { id: 'A', text: 'Cách 1 vì List Comprehension chạy bằng mã C tối ưu hơn', correct: false },
      { id: 'B', text: 'Cách 2 (Generator Expression) vì cơ chế Lazy Evaluation chỉ sinh ra giá trị khi được gọi, không tải toàn bộ mảng vào RAM', correct: true, explanation: 'Generator Expression trả về một iterator sinh dữ liệu theo kiểu streaming (O(1) memory), trong khi List Comprehension sẽ phân bổ toàn bộ 10 triệu phần tử vào Heap memory (tốn hàng GB RAM).' },
      { id: 'C', text: 'Hai cách tiêu thụ bộ nhớ hoàn toàn tương đương nhau', correct: false },
      { id: 'D', text: 'Cả hai cách đều gây lỗi MemoryError trên 64-bit OS', correct: false }
    ],
    rewardExp: 80,
    rewardSkillExp: 95
  },
  {
    id: 'ch_js_event_loop',
    title: 'JavaScript: Cơ chế Vòng lặp sự kiện (Event Loop) & Microtask Queue',
    skillTarget: 'javascript',
    tier: 1,
    difficulty: 'Trung bình',
    question: 'Thứ tự in ra các số trong console của đoạn mã JavaScript runtime sau là gì?',
    codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: [
      { id: 'A', text: '1 -> 2 -> 3 -> 4', correct: false },
      { id: 'B', text: '1 -> 4 -> 2 -> 3', correct: false },
      { id: 'C', text: '1 -> 4 -> 3 -> 2', correct: true, explanation: 'Call Stack đồng bộ thực thi trước (1, 4). Sau đó Event Loop dọn sạch Microtask Queue (Promise.then -> 3) trước khi chuyển sang Macrotask Queue (setTimeout callback -> 2).' },
      { id: 'D', text: '1 -> 3 -> 4 -> 2', correct: false }
    ],
    rewardExp: 100,
    rewardSkillExp: 120
  },
  {
    id: 'ch_dsa_twosum',
    title: 'DSA: Tối ưu độ phức tạp thời gian Two Sum từ O(N^2) xuống O(N)',
    skillTarget: 'data_struct',
    tier: 1,
    difficulty: 'Trung bình',
    question: 'Thuật toán nào giải bài toán Two Sum với mảng N phần tử đạt độ phức tạp thời gian O(N)?',
    codeSnippet: `// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1] vì nums[0] + nums[1] == 9`,
    options: [
      { id: 'A', text: 'Duyệt 2 vòng lặp lồng nhau duyệt tất cả các cặp chỉ số', correct: false },
      { id: 'B', text: 'Dùng Hash Map lưu vết complement (target - num) với tra cứu trung bình O(1)', correct: true, explanation: 'Tại mỗi phần tử x, tra cứu xem giá trị (target - x) đã tồn tại trong Hash Map chưa. Do tra cứu Hash Map trung bình là O(1), toàn bộ thuật toán duyệt một lượt đạt O(N) thời gian và O(N) bộ nhớ.' },
      { id: 'C', text: 'Sắp xếp mảng QuickSort rồi duyệt tuyến tính 2 con trỏ O(N log N)', correct: false },
      { id: 'D', text: 'Quy hoạch động ma trận 2 chiều O(N * target)', correct: false }
    ],
    rewardExp: 110,
    rewardSkillExp: 130
  },
  {
    id: 'ch_git_conflict',
    title: 'Git & CI/CD: Chiến lược phân nhánh Rebase vs Merge & Linear History',
    skillTarget: 'git_github',
    tier: 1,
    difficulty: 'Thực chiến',
    question: 'Lệnh nào tích hợp các commit mới nhất từ nhánh main vào nhánh feature của bạn mà tạo lịch sử commit tuyến tính, không tạo merge commit rác?',
    codeSnippet: `$ git checkout feature
# Lệnh tiếp theo nên thực thi:`,
    options: [
      { id: 'A', text: 'git rebase main', correct: true, explanation: 'git rebase main tách các commit của nhánh feature, áp dụng các commit mới từ main vào trước, sau đó phát lại các commit của feature lên đỉnh, giữ lịch sử Git hoàn toàn tuyến tính và sạch.' },
      { id: 'B', text: 'git push --force origin main', correct: false },
      { id: 'C', text: 'git reset --hard HEAD~5', correct: false },
      { id: 'D', text: 'git merge --no-ff main', correct: false }
    ],
    rewardExp: 90,
    rewardSkillExp: 100
  },
  {
    id: 'ch_sql_index',
    title: 'Databases: B-Tree Index, Sequential Scan vs Index Scan & Sargable Queries',
    skillTarget: 'database',
    tier: 2,
    difficulty: 'Nâng cao',
    question: 'Truy vấn SQL nào sau đây làm vô hiệu hóa chỉ mục B-Tree (gây Full Table Scan) trên cột created_at có đánh index?',
    codeSnippet: `-- Table orders (id INT, created_at TIMESTAMP, amount NUMERIC)`,
    options: [
      { id: 'A', text: 'SELECT * FROM orders WHERE created_at >= \'2026-01-01\' AND created_at < \'2026-02-01\';', correct: false },
      { id: 'B', text: 'SELECT * FROM orders WHERE DATE(created_at) = \'2026-01-15\';', correct: true, explanation: 'Áp dụng hàm DATE(created_at) lên cột có index khiến truy vấn trở thành non-sargable. Database engine không thể dùng B-Tree index để nhảy trực tiếp tới node mà phải tính toán hàm DATE trên từng dòng của cả bảng (Full Table Scan).' },
      { id: 'C', text: 'SELECT id FROM orders WHERE created_at = \'2026-01-15 08:30:00\';', correct: false },
      { id: 'D', text: 'SELECT COUNT(*) FROM orders WHERE created_at IS NOT NULL;', correct: false }
    ],
    rewardExp: 130,
    rewardSkillExp: 150
  },
  {
    id: 'ch_arch_circuit_breaker',
    title: 'System Design: Circuit Breaker Pattern & Cascading Failure Mitigation',
    skillTarget: 'backend',
    tier: 2,
    difficulty: 'Nâng cao',
    question: 'Trong kiến trúc Microservices, trạng thái nào của Circuit Breaker cho phép gửi thử nghiệm một lượng nhỏ request tới service downstream để kiểm tra xem hệ thống đã hồi phục chưa?',
    codeSnippet: `[CLOSED] ---> (Lỗi vượt ngưỡng) ---> [OPEN]
  ^                                    |
  |---------- [???] <------------------|`,
    options: [
      { id: 'A', text: 'State: THROTTLED', correct: false },
      { id: 'B', text: 'State: HALF-OPEN', correct: true, explanation: 'Sau một khoảng thời gian chờ (cooldown/sleep window) ở trạng thái OPEN, Circuit Breaker chuyển sang HALF-OPEN. Trạng thái này cho phép một tỷ lệ nhỏ traffic đi qua. Nếu các request thành công, nó trở về CLOSED; nếu tiếp tục lỗi, nó quay lại OPEN.' },
      { id: 'C', text: 'State: BYPASS', correct: false },
      { id: 'D', text: 'State: DEGRADED', correct: false }
    ],
    rewardExp: 140,
    rewardSkillExp: 160
  },
  {
    id: 'ch_concurrency_race',
    title: 'Concurrency: Race Condition, Mutex Lock & Atomic Compare-And-Swap',
    skillTarget: 'c_lang',
    tier: 2,
    difficulty: 'Nâng cao',
    question: 'Trong môi trường đa luồng (Multi-threading), tại sao phép toán đơn giản counter++ vẫn có thể gây ra Race Condition mất mát dữ liệu?',
    codeSnippet: `// Luồng 1 và Luồng 2 cùng thực thi đồng thời:
counter++;`,
    options: [
      { id: 'A', text: 'Do compiler C++ tự động bỏ qua biến counter nếu không khai báo const', correct: false },
      { id: 'B', text: 'Vì counter++ ở mức mã máy gồm 3 chỉ lệnh riêng biệt: LOAD từ RAM vào thanh ghi, ADD 1, và STORE ngược lại RAM. Hai luồng có thể xen kẽ nhau giữa các bước này', correct: true, explanation: 'Phép toán counter++ không phải là atomic (nguyên tử). Khi 2 CPU core cùng đọc một giá trị cũ (VD: 5), cùng tăng lên 6 và cùng ghi đè, kết quả cuối cùng là 6 thay vì 7 (Lost Update).' },
      { id: 'C', text: 'Do bộ điều vận luồng của hệ điều hành luôn chạy ở chế độ đơn nhân', correct: false },
      { id: 'D', text: 'Vì bộ nhớ RAM không cho phép ghi số nguyên liên tục', correct: false }
    ],
    rewardExp: 135,
    rewardSkillExp: 155
  },
  {
    id: 'ch_net_tcp_handshake',
    title: 'Networking: TCP 3-Way Handshake, TIME_WAIT State & Socket Exhaustion',
    skillTarget: 'backend',
    tier: 2,
    difficulty: 'Nâng cao',
    question: 'Trạng thái TIME_WAIT trong giao thức TCP tồn tại sau khi đóng kết nối nhằm mục đích chính nào?',
    codeSnippet: `Client                  Server
  | ----- FIN (Seq=u) ----> |
  | <---- ACK (Ack=u+1) --- |
  | <---- FIN (Seq=v) ----- |
  | ----- ACK (Ack=v+1) --> |  ---> Client vào trạng thái TIME_WAIT (2MSL)`,
    options: [
      { id: 'A', text: 'Để giải phóng địa chỉ IP của Client ngay lập tức', correct: false },
      { id: 'B', text: 'Đảm bảo gói tin ACK cuối cùng đến được phía đối tác và ngăn các gói tin chậm trễ từ kết nối cũ làm hỏng kết nối mới sử dụng cùng cổng (IP/Port tuple)', correct: true, explanation: 'TIME_WAIT kéo dài 2MSL (Maximum Segment Lifetime) để đảm bảo nếu ACK cuối bị thất lạc, Server gửi lại FIN thì Client vẫn có thể phản hồi ACK, đồng thời tiêu tán hết các packet trôi nổi trên mạng.' },
      { id: 'C', text: 'Để nén dữ liệu đã truyền trong phiên làm việc', correct: false },
      { id: 'D', text: 'Chờ hệ điều hành khởi động lại card mạng', correct: false }
    ],
    rewardExp: 125,
    rewardSkillExp: 145
  },
  {
    id: 'ch_security_sql_injection',
    title: 'Security: Phòng thủ SQL Injection & Prepared Statement Parameterization',
    skillTarget: 'backend',
    tier: 1,
    difficulty: 'Thực chiến',
    question: 'Đoạn mã backend nào sau đây an toàn tuyệt đối trước lỗ hổng SQL Injection khi người dùng nhập input bất kỳ?',
    codeSnippet: `// String user_input = req.params("user");`,
    options: [
      { id: 'A', text: 'db.query("SELECT * FROM users WHERE username = \'" + user_input + "\'");', correct: false },
      { id: 'B', text: 'db.query("SELECT * FROM users WHERE username = ?", [user_input]);', correct: true, explanation: 'Prepared Statements với placeholder (?) truyền dữ liệu qua giao thức nhị phân riêng biệt với câu lệnh SQL. Database engine phân tích cú pháp trước, sau đó đối đãi user_input thuần túy là dữ liệu dạng chuỗi, không thể bị chèn mã thực thi.' },
      { id: 'C', text: 'db.query(`SELECT * FROM users WHERE username = \'${user_input.replace("\'", "")}\'`);', correct: false },
      { id: 'D', text: 'db.query("SELECT * FROM users WHERE username = " + escape(user_input));', correct: false }
    ],
    rewardExp: 115,
    rewardSkillExp: 135
  },
  {
    id: 'ch_dsa_lru_cache',
    title: 'DSA: Cấu trúc dữ liệu thiết kế LRU Cache (Least Recently Used) O(1)',
    skillTarget: 'data_struct',
    tier: 2,
    difficulty: 'Chuyên gia',
    question: 'Để xây dựng một cấu trúc dữ liệu LRU Cache đạt cả hai hàm get(key) và put(key, val) trong thời gian trung bình O(1), ta cần kết hợp hai cấu trúc nào?',
    codeSnippet: `class LRUCache {
    int get(int key); // Yêu cầu O(1)
    void put(int key, int value); // Yêu cầu O(1)
};`,
    options: [
      { id: 'A', text: 'Binary Search Tree + Mảng động (Dynamic Array)', correct: false },
      { id: 'B', text: 'Hash Map + Danh sách liên kết đôi (Doubly Linked List)', correct: true, explanation: 'Hash Map cung cấp khả năng tìm kiếm node O(1) theo key. Doubly Linked List cho phép tháo gỡ và chèn node vào đầu/cuối danh sách (đánh dấu truy cập gần nhất hoặc loại bỏ phần tử cũ nhất) trong O(1).' },
      { id: 'C', text: 'Max Heap + Min Heap', correct: false },
      { id: 'D', text: 'Queue vòng (Circular Queue) + Stack', correct: false }
    ],
    rewardExp: 160,
    rewardSkillExp: 180
  },
  {
    id: 'ch_os_virtual_memory',
    title: 'Operating Systems: Bộ nhớ ảo (Virtual Memory), Paging & TLB Miss',
    skillTarget: 'c_lang',
    tier: 2,
    difficulty: 'Nâng cao',
    question: 'Khi CPU cần truy xuất một địa chỉ bộ nhớ ảo nhưng trang tương ứng (Page) chưa được nạp vào RAM vật lý, sự kiện phần cứng nào sẽ được kích hoạt?',
    codeSnippet: `Virtual Address ---> [ MMU ] ---> Page Table Entry (Valid bit = 0) ---> ???`,
    options: [
      { id: 'A', text: 'Kernel Panic lập tức dừng toàn bộ máy tính', correct: false },
      { id: 'B', text: 'Page Fault Exception - Ngắt phần cứng để hệ điều hành đọc dữ liệu từ Disk/Swap vào RAM', correct: true, explanation: 'Khi valid bit của bảng trang = 0, MMU sinh ngắt Page Fault. CPU chuyển quyền điều khiển cho OS Kernel để load trang dữ liệu từ Disk/SSD vào một frame RAM trống, cập nhật Page Table rồi tiếp tục lệnh bị hoãn.' },
      { id: 'C', text: 'Segmentation Fault và lập tức hủy tiến trình', correct: false },
      { id: 'D', text: 'CPU tự động ghi số 0 vào thanh ghi', correct: false }
    ],
    rewardExp: 145,
    rewardSkillExp: 165
  },
  {
    id: 'ch_dist_cap_theorem',
    title: 'Distributed Systems: Định lý CAP, Network Partition & Raft Leader Quorum',
    skillTarget: 'backend',
    tier: 2,
    difficulty: 'Chuyên gia',
    question: 'Trong một cluster phân tán chạy thuật toán đồng thuận Raft gồm 5 node, nếu sự cố mạng chia cắt cluster thành 2 phân vùng (Partition A có 2 node, Partition B có 3 node), điều gì sẽ xảy ra?',
    codeSnippet: `Cluster: [N1, N2, N3, N4, N5] (Total: 5 nodes)
Mạng đứt đoạn:
Partition A: [N1, N2] (2 nodes)
Partition B: [N3, N4, N5] (3 nodes)`,
    options: [
      { id: 'A', text: 'Cả hai phân vùng cùng bầu Leader mới và chấp nhận ghi dữ liệu độc lập (Split-Brain)', correct: false },
      { id: 'B', text: 'Chỉ phân vùng B (3 nodes) đạt quá bán (Quorum >= 5/2 + 1 = 3) mới có thể bầu Leader và tiếp tục ghi dữ liệu; phân vùng A sẽ từ chối write để bảo toàn tính nhất quán', correct: true, explanation: 'Raft dựa trên nguyên lý Quorum (đa số > N/2). Chỉ phân vùng có ít nhất 3 node mới duy trì được khả năng bầu cử và cam kết log entry vào trạng thái nhất quán. Phân vùng 2 node không đủ túc số nên sẽ từ chối ghi, ngăn ngừa triệt để lỗi Split-Brain.' },
      { id: 'C', text: 'Toàn bộ hệ thống sập hoàn toàn do không đủ 100% node', correct: false },
      { id: 'D', text: 'Dữ liệu của Partition A sẽ tự động ghi đè lên Partition B', correct: false }
    ],
    rewardExp: 170,
    rewardSkillExp: 190
  },
  {
    id: 'ch_perf_cache_locality',
    title: 'Computer Architecture: CPU Cache Locality L1/L2/L3 & Spatial Cache Lines',
    skillTarget: 'c_lang',
    tier: 2,
    difficulty: 'Chuyên gia',
    question: 'Xét mảng 2 chiều kích thước lớn matrix[N][N] trong ngôn ngữ C/C++. Vòng lặp nào sau đây chạy nhanh hơn gấp nhiều lần và lý do tại sao?',
    codeSnippet: `// Loop 1 (Row-major):
for(int i = 0; i < N; i++)
    for(int j = 0; j < N; j++) sum += matrix[i][j];

// Loop 2 (Column-major):
for(int j = 0; j < N; j++)
    for(int i = 0; i < N; i++) sum += matrix[i][j];`,
    options: [
      { id: 'A', text: 'Loop 2 nhanh hơn vì biến j được duyệt trước', correct: false },
      { id: 'B', text: 'Loop 1 nhanh hơn vượt trội nhờ Spatial Locality: ngôn ngữ C lưu mảng theo thứ tự hàng (Row-major). Truy cập matrix[i][j] tải liền kề các phần tử vào Cache Line (64 bytes), tối thiểu hóa L1/L2 Cache Misses', correct: true, explanation: 'Mảng C/C++ được trải phẳng tuyến tính theo từng hàng trên bộ nhớ. Loop 1 duyệt liên tiếp từng ô nhớ kề nhau nên tận dụng trọn vẹn dữ liệu nạp sẵn vào Cache Line 64-byte. Loop 2 nhảy cóc theo cột (mỗi bước nhảy N phần tử), gây liên tục Cache Miss và ép CPU phải chờ nạp từ RAM chậm chạp.' },
      { id: 'C', text: 'Tốc độ hai vòng lặp hoàn toàn bằng nhau vì compiler luôn tối ưu như nhau', correct: false },
      { id: 'D', text: 'Loop 2 nhanh hơn trên kiến trúc 64-bit', correct: false }
    ],
    rewardExp: 155,
    rewardSkillExp: 175
  },
  {
    id: 'ch_clean_arch_dependency',
    title: 'Software Architecture: Dependency Inversion Principle (DIP) & Hexagonal Architecture',
    skillTarget: 'backend',
    tier: 2,
    difficulty: 'Nâng cao',
    question: 'Nguyên lý Dependency Inversion (chữ D trong SOLID) quy định mối quan hệ kiến trúc cốt lõi nào?',
    codeSnippet: `High-Level Modules (Business Domain / UseCases)
                vs
Low-Level Modules (MySQL, Redis, REST APIs, Third-party SDKs)`,
    options: [
      { id: 'A', text: 'High-level modules phải phụ thuộc trực tiếp vào Database driver để tăng tốc độ truy vấn', correct: false },
      { id: 'B', text: 'Các module cấp cao (Business Logic) không được phụ thuộc vào module cấp thấp (Chi tiết kỹ thuật / DB). Cả hai phải phụ thuộc vào abstraction (Interfaces/Ports)', correct: true, explanation: 'DIP đảo ngược chiều phụ thuộc: Logic nghiệp vụ cốt lõi không được biết về cơ sở dữ liệu hay framework cụ thể. Thay vào đó, Domain định nghĩa Interface (Port), còn Database layer đóng vai trò triển khai (Adapter/Plugin). Điều này cho phép thay thế DB hoặc hạ tầng mà không làm thay đổi 1 dòng code nghiệp vụ.' },
      { id: 'C', text: 'Chỉ được phép sử dụng duy nhất một class trong toàn bộ hệ thống', correct: false },
      { id: 'D', text: 'Tất cả các biến phải là biến toàn cục (global variables)', correct: false }
    ],
    rewardExp: 140,
    rewardSkillExp: 160
  }
];
