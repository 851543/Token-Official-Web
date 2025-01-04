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
  },
  message: {
    placeholder: '请输入您的留言',
    submit: '提交',
    success: '留言成功',
    error: '留言失败',
    empty: '留言内容不能为空',
  },
  contact: {
    title: '联系我们',
    description: '有任何问题或建议，欢迎随时联系我们',
    form: {
      name: '姓名',
      email: '邮箱',
      message: '留言内容',
      submit: '发送消息',
    },
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