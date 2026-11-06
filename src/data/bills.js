export const categories = [
  { id: 'all', label: '为你推荐', icon: 'sparkles' },
  { id: 'daily', label: '日常生活', icon: 'coffee' },
  { id: 'rent', label: '房租水电', icon: 'home' },
  { id: 'medical', label: '医疗健康', icon: 'medical' },
  { id: 'study', label: '学习成长', icon: 'book' },
]

// ponytail: 本地演示数据；上线时由服务端返回经过审核和脱敏的账单。
export const initialBills = [
  { id: 'b1', name: '小林', age: 24, city: '杭州', category: 'daily', title: '想把日子，慢慢过好。', subtitle: '一份生活账单，也是一点重新出发的勇气。', story: '来到杭州的第三个月，终于找到了一份花店的工作。工资还没发，想先给自己补上这周的生活费。等日子好起来，我也想成为给别人递一束光的人。', amount: 128.5, raised: 48.5, people: 3, billName: '一周的生活采购', billType: '生活用品 / 食品', date: '2026.11.05', image: '/static/images/flower-shop.jpg', imagePosition: 'center', tag: '正在努力生活', color: '#6d806c', quote: '日子会慢慢变好，花也会如期开放。', created: 6 },
  { id: 'b2', name: '阿泽', age: 27, city: '成都', category: 'rent', title: '给努力的自己，一个落脚点。', subtitle: '新工作的第一个月，想跨过眼前这道小坎。', story: '做了三年的厨师，最近换了一家小餐馆重新开始。这个月的水电费比预期高了一些，想请你帮忙分担一点。下班路上的灯火，总让我觉得生活还值得期待。', amount: 236, raised: 86, people: 4, billName: '这个月的水电费', billType: '水费 / 电费', date: '2026.11.04', image: '/static/images/kitchen.jpg', imagePosition: 'center', tag: '认真生活的人', color: '#96725e', quote: '每一份热气腾腾，都是好好生活的证明。', created: 5 },
  { id: 'b3', name: '小雨', age: 21, city: '南京', category: 'study', title: '离梦想，再靠近一点点。', subtitle: '一本书，也能打开一扇新的门。', story: '白天在便利店打工，晚上准备自考。想买的这套复习资料放在购物车很久了。希望明年的这个时候，能带着录取通知书和大家分享好消息。', amount: 89, raised: 29, people: 2, billName: '自考复习资料', billType: '学习资料 / 图书', date: '2026.11.03', image: '/static/images/study.jpg', imagePosition: 'center', tag: '为梦想再努力一点', color: '#8b8162', quote: '慢一点也没关系，我一直在向前走。', created: 4 },
  { id: 'b4', name: '陈阿姨', age: 56, city: '苏州', category: 'medical', title: '照顾好自己，才能照顾生活。', subtitle: '一点小小的分担，一份实实在在的安心。', story: '在社区做保洁，平时最喜欢给楼下的流浪猫留一点吃的。这次复诊有一笔药费，想找人搭把手。谢谢每一个愿意停下来听我说说话的人。', amount: 168, raised: 68, people: 5, billName: '门诊复诊药费', billType: '门诊 / 药品', date: '2026.11.02', image: '/static/images/flower-shop.jpg', imagePosition: 'left', tag: '平凡生活里的温柔', color: '#778377', quote: '愿每一个普通的日子，都有人惦记。', created: 3 },
]

export function eligibleBills(bills, category, maxAmount, skipped, completed, order = 'recommended') {
  const result = bills.filter(b => (category === 'all' || b.category === category) && b.amount - b.raised <= maxAmount && !skipped.includes(b.id) && !completed.includes(b.id))
  return order === 'latest' ? result.sort((a, b) => b.created - a.created) : result
}

export function validatePublication(form) {
  if (!form.title.trim() || !form.story.trim() || !form.billName.trim()) return '请填写账单标题、账单名称和你的故事'
  const amount = Number(form.amount)
  if (!Number.isFinite(amount) || amount < 1 || amount > 10000 || !/^\d+(\.\d{1,2})?$/.test(String(form.amount))) return '请输入 1–10,000 元之间的金额，最多两位小数'
  if (!form.agreed) return '请确认账单真实，并同意隐私保护约定'
  return ''
}

export function validateHelpAmount(value, remaining) {
  const amount = Number(value)
  return Number.isFinite(amount) && amount > 0 && Math.round(amount * 100) <= Math.round(remaining * 100) && /^\d+(\.\d{1,2})?$/.test(String(value))
}
