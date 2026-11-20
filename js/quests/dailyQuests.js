// Daily & Weekly Quests Generation
export const DAILY_QUEST_TEMPLATES = [
  {
    id: 'daily_code_session',
    title: 'Luyện tập mỗi ngày',
    desc: 'Thực hiện 2 phiên tự luyện code để duy trì tính kỷ luật.',
    reqType: 'practice',
    target: 2,
    rewardExp: 80,
    rewardMoney: 15,
    rewardDiscipline: 3
  },
  {
    id: 'daily_solve_challenge',
    title: 'Thử thách tư duy',
    desc: 'Trả lời chính xác 1 câu đố lập trình tại Học viện.',
    reqType: 'challenge',
    target: 1,
    rewardExp: 100,
    rewardMoney: 20,
    rewardIntelligence: 2
  },
  {
    id: 'daily_good_sleep',
    title: 'Bảo vệ sức khỏe',
    desc: 'Ngủ đủ giấc (ngủ qua đêm) để hồi phục năng lượng trên 80%.',
    reqType: 'energy_check',
    target: 80,
    rewardExp: 60,
    rewardMentalHealth: 10
  }
];

