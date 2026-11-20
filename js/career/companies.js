// Tech Companies & Recruitment Opportunities Database
export const COMPANIES = {
  techstart: {
    id: 'techstart',
    name: 'TechStart Incubator',
    tier: 'Startup Vườn Ươm',
    logo: '[LAUNCH]',
    size: '15 nhân sự',
    monthlySalary: 650,
    workCulture: 'Agile tốc chiến, làm việc linh hoạt, học full-stack từ A đến Z.',
    minLevel: 4,
    minRep: 20,
    requiredSkills: { javascript: 2, c_lang: 1 },
    positions: ['Intern Web Developer', 'Junior Fullstack Engineer'],
    techStack: ['Node.js', 'React', 'MongoDB', 'Docker'],
    interviewStages: 2
  },
  bytevanguard: {
    id: 'bytevanguard',
    name: 'ByteVanguard Outsourcing Global',
    tier: 'Tập đoàn Gia công Phần mềm',
    logo: '',
    size: '1,200 kỹ sư',
    monthlySalary: 1200,
    workCulture: 'Quy trình CMMI nghiêm ngặt, rèn luyện tính kỷ luật và chịu áp lực cao.',
    minLevel: 10,
    minRep: 60,
    requiredSkills: { c_lang: 3, database: 3, git_github: 3 },
    positions: ['Junior Software Engineer', 'Automation QA Engineer'],
    techStack: ['Java Spring Boot', 'PostgreSQL', 'Git', 'Linux'],
    interviewStages: 3
  },
  fincore: {
    id: 'fincore',
    name: 'FinCore Securities & Banking',
    tier: 'Công ty Sản phẩm FinTech',
    logo: '',
    size: '450 nhân sự',
    monthlySalary: 2400,
    workCulture: 'Độ bảo mật tuyệt đối, xử lý hàng triệu giao dịch/giây, thưởng dự án hấp dẫn.',
    minLevel: 20,
    minRep: 120,
    requiredSkills: { backend: 4, database: 4, data_struct: 4 },
    positions: ['Mid-level Backend Engineer', 'High Frequency Trading Developer'],
    techStack: ['Go', 'Rust', 'Kafka', 'Redis', 'Kubernetes'],
    interviewStages: 4
  },
  nexuscloud: {
    id: 'nexuscloud',
    name: 'Nexus Global Cloud',
    tier: 'Tập đoàn Big Tech Đa quốc gia',
    logo: '⚡',
    size: '25,000 kỹ sư toàn cầu',
    monthlySalary: 4800,
    workCulture: 'Môi trường làm việc chuẩn Silicon Valley, đãi ngộ mơ ước, cổ phiếu thưởng hàng năm.',
    minLevel: 30,
    minRep: 250,
    requiredSkills: { backend: 6, data_struct: 6, ai_ml: 4 },
    positions: ['Senior Distributed Systems Engineer', 'Cloud Infrastructure Architect'],
    techStack: ['Distributed Systems', 'gRPC', 'AWS/GCP', 'Terraform', 'C++'],
    interviewStages: 4
  },
  apexai: {
    id: 'apexai',
    name: 'Apex Intelligence Labs',
    tier: 'Viện Nghiên cứu Frontier AI',
    logo: '',
    size: '180 nhà khoa học & kỹ sư tinh hoa',
    monthlySalary: 9500,
    workCulture: 'Tập hợp các bộ óc kiệt xuất nhất nhân loại, xây dựng mô hình Trí tuệ nhân tạo tương lai.',
    minLevel: 45,
    minRep: 500,
    requiredSkills: { ai_ml: 8, python: 8, data_struct: 8 },
    positions: ['Principal AI Research Engineer', 'AGI Kernel Architect'],
    techStack: ['PyTorch', 'CUDA', 'LLM Kernels', 'Distributed GPU Clusters'],
    interviewStages: 4
  }
};

