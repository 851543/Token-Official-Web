import type { I18nSchema } from '@/types/i18n'
import { defineMessages } from '@/types/i18n'

export default defineMessages({
  nav: {
    home: '首页',
    team: '团队',
    create: '创作',
    message: '留言板',
    moreLinks: '动态',
    blogs: '博客',
    contact: '联系我们',
  },
  common: {
    loading: '加载中',
    noData: '暂无数据',
    confirm: '确认',
    cancel: '取消',
    notFound: '页面未找到',
    readMore: '阅读更多',
    submit: '提交',
    search: '搜索',
  },
  home: {
    title: '欢迎来到 Token',
    description: '这是一个充满创意的平台',
    banner: {
      title: '创新的开发者社区',
      subtitle: '让我们一起创造未来',
      action: '立即加入',
    },
    features: {
      title: '我们的特色',
      create: '创作无限可能',
      share: '分享你的想法',
      connect: '连接开发者',
    },
  },
  team: {
    title: '团队介绍',
    description: '在 Token，我们的目标是学习和教学。开发者、设计师和管理者齐聚一堂，共同创建一个激励大家进步的团队。加入我们！',
    joinUs: '加入我们',
    annualTeam: '年度核心团队',
    coreMembers: '核心成员',
    technicalTeam: '技术团队',
    operationTeam: '运营团队',
    designTeam: '设计团队',
    teamMembers: '团队成员',
    expand: '查看全部',
    collapse: '收起',
    positions: {
      developer: '开发工程师',
      designer: '设计师',
      manager: '项目经理',
    },
    members: {
      ajun: {
        name: '阿俊',
        role: '团队负责人'
      },
      pe: {
        name: '彭小文',
        role: '团队经理'
      },
      yuge: {
        name: '雨哥',
        role: '总监'
      },
      weidong: {
        name: '伟东',
        role: '技术总监'
      },
      zhubb: {
        name: '朱总',
        role: '技术总监'
      },
      haoge: {
        name: '皓哥',
        role: '设计总监'
      },
      tian: {
        name: '田小琪',
        role: '运营总监'
      }
    }
  },
  create: {
    hero: {
      title: '创新思维，智慧创作',
      subtitle: '创作更简单',
      description: '在 Token，我们致力于打造一个激发创意的平台。让开发者、设计师和创作者能够更轻松地进行创作与知识管理，共同构建充满活力的创作团队。',
      startButton: '开始创作',
    },
    partners: {
      title: 'Token 生态伙伴',
      subtitle: '携手共建创新未来',
      description: '全球顶尖科技公司深度合作，为创作者提供更优质的服务',
    },
    features: {
      title: '让创意更自由，让协作更高效',
      description: 'Token团队致力于打造一个激发灵感的平台。让开发者、设计师和创作者，能够更自由地表达创意，共同创造精彩作品。',
    },
    sections: {
      create: {
        title: '创作',
        subtitle: ['智能创作', '高效管理'],
        description: '使用先进的AI技术，让创作更加智能和高效。',
      },
      manage: {
        title: '管理',
        subtitle: ['团队协作', '知识沉淀'],
        description: '强大的团队协作功能，让知识管理更加便捷。',
      },
    },
    aiPartner: {
      title: '团队',
      subtitle: '让创作更轻松，让知识更有价值',
      description1: '智能创作辅助，知识管理专家',
      description2: '让每一次创作都充满可能',
      startButton: '开始体验',
    },
  },
  message: {
    title: '留言板',
    description: '欢迎在这里留下你的想法和建议',
    placeholder: '写下你的留言...',
    loginFirst: '请先登录后发表留言',
    submit: '发送留言',
    success: '留言成功',
    error: '发送留言失败',
    empty: '留言内容不能为空',
    hotTags: '热门标签',
    filter: '留言筛选',
    filterAll: '全部留言',
    filterOfficial: '官方回复',
    selectTag: '选择标签',
    tips: '善语结善缘，恶言伤人心',
    official: '官方',
    user: '用户',
    login: '登录',
    logout: '退出登录',
    loginPrompt: '登录后参与互动',
    loginTitle: '请登录',
    loginDesc: '登录后即可参与互动',
    qqLogin: 'QQ登录',
    wechatLogin: '微信登录',
    wechat: '微信',
    stats: {
      total: '总留言',
      today: '今日新增',
      week: '本周活跃'
    }
  },
  contact: {
    title: '联系我们',
    description: '我们是Token团队，致力于打造下一代智能创作平台',
    description2: '用科技赋能创作者',
    whyUs: {
      title: '为什么选择 Token',
      ai: {
        title: 'AI 智能创作',
        desc: '强大的 AI 模型助力，让创作更轻松高效'
      },
      knowledge: {
        title: '知识管理',
        desc: '科学的知识体系构建，高效的信息组织方式'
      },
      support: {
        title: '专业支持',
        desc: '7×24小时技术支持，解决您的任何问题'
      }
    },
    process: {
      title: '服务流程',
      steps: {
        submit: {
          title: '提交需求',
          desc: '填写表单或通过邮件提交您的具体需求'
        },
        evaluate: {
          title: '需求评估',
          desc: '专业团队评估并制定解决方案'
        },
        confirm: {
          title: '方案确认',
          desc: '与您确认具体实施方案和时间节点'
        },
        start: {
          title: '开始服务',
          desc: '正式启动服务并持续跟进反馈'
        }
      }
    },
    highlights: {
      title: '我们的优势',
      response: {
        title: '快速响应',
        number: '2小时',
        desc: '平均响应时间'
      },
      innovation: {
        title: '创新方案',
        number: '200+',
        desc: '成功案例'
      },
      team: {
        title: '专业团队',
        number: '50+',
        desc: '技术专家'
      },
      satisfaction: {
        title: '客户满意度',
        number: '98%',
        desc: '好评率'
      }
    },
    form: {
      title: '发送消息',
      name: '姓名',
      namePlaceholder: '请输入您的姓名',
      email: '邮箱',
      emailPlaceholder: '请输入您的邮箱',
      type: '咨询类型',
      typePlaceholder: '请选择咨询类型',
      typeOptions: {
        business: '商务合作',
        technical: '技术支持',
        other: '其他问题'
      },
      message: '留言内容',
      messagePlaceholder: '请详细描述您的需求',
      submit: '发送消息',
      sending: '发送中'
    },
    contact: {
      business: {
        title: '商务合作',
        email: '851543@qq.com',
        phone: '+86 131-2355-6625'
      },
      technical: {
        title: '技术支持',
        email: '851543@qq.com',
        support: '7×24小时在线支持'
      },
      social: {
        title: '社交媒体'
      },
      workingHours: {
        title: '工作时间',
        weekdays: '周一至周五：10:00 - 17:00',
        weekends: '周末及节假日：在线值班'
      },
      emergency: {
        title: '紧急联系',
        phone: '24小时紧急热线：+86 131-2355-6625',
        note: '仅用于紧急技术支持'
      }
    },
    offices: {
      title: '全国办公室',
      nanning: {
        title: '广西南宁总部',
        address: '广西农业职业技术大学',
        hours: '周一至周五 10:00-17:00'
      },
      yulin: {
        title: '广西玉林分部',
        address: '北流市玉州区高科技园区',
        hours: '周一至周五 10:00-17:00'
      },
      beihai: {
        title: '广西北海分部',
        address: '北海市南山区科技园',
        hours: '周一至周五 10:00-17:00'
      }
    },
    notification: {
      success: '消息已发送成功！我们会尽快回复您。',
      error: '发送失败，请稍后重试或通过其他方式联系我们。'
    }
  },
  blogs: {
    title: '博客文章',
    readMore: '阅读更多',
    categories: '探索领域',
    tags: '标签',
    search: '搜索文章',
    description: '探索 Token 团队的技术创新 · 分享研发实践 · 共建开源生态',
    featured: '精选专栏',
    topics: '技术专题',
    authors: '团队专栏',
    articles: '篇文章',
    articleCount: '文章',
    viewCount: '阅读',
    date: '发布日期',
    author: '作者',
    category: '分类',
    allCategories: '所有分类',
    latestPosts: '最新文章',
    popularPosts: '热门文章',
    relatedPosts: '相关文章',
    comments: '评论',
    share: '分享',
    previous: '上一篇',
    next: '下一篇',
    publishedOn: '发布于',
    lastUpdated: '最后更新',
    readingTime: '阅读时间',
    minutes: '分钟',
    authorProfile: '作者简介',
    moreFromAuthor: '作者的其他文章',
  },
  moreLinks: {
    title: '我们的动态',
    subtitle: 'Java Python 前后端 嵌入式的技术栈 研发项目',
    aiEra: 'AI时代',
    courses: {
      golang: {
        title: 'Go语言',
        viewOnGithub: 'Github 上查看',
      },
      machineLearning: {
        title: '机器学习',
        viewOnGithub: 'Github 上查看',
      },
    },
  },
  footer: {
    copyright: '版权所有 © 2024 - {year} Token. 保留所有权利',
    poweredBy: '由',
    and: '驱动 &',
    theme: '主题',
    visitCount: '浏览次数：{count}',
    daysSinceCreation: '建站天数：{days}',
  },
}) 