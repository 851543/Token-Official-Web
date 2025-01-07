import { defineMessages } from '@/types/i18n'

export default defineMessages({
  nav: {
    home: 'Home',
    team: 'Team',
    create: 'Create',
    message: 'Message',
    moreLinks: 'Links',
    blogs: 'Blogs',
    contact: 'Contact',
  },
  common: {
    loading: 'Loading',
    noData: 'No Data',
    confirm: 'Confirm',
    cancel: 'Cancel',
    notFound: 'Page Not Found',
    readMore: 'Read More',
    submit: 'Submit',
    search: 'Search',
  },
  home: {
    title: 'Welcome to Token',
    description: 'A platform full of creativity',
    banner: {
      title: 'Innovative Developer Community',
      subtitle: "Let's Create the Future Together",
      action: 'Join Now',
    },
    features: {
      title: 'Our Features',
      create: 'Create Unlimited Possibilities',
      share: 'Share Your Ideas',
      connect: 'Connect with Developers',
    },
  },
  team: {
    title: 'Our Team',
    description: 'At Token, our goal is to learn and teach. Developers, designers, and managers come together to create a team that motivates everyone to progress. Join us!',
    joinUs: 'Join Us',
    annualTeam: 'Annual Core Team',
    coreMembers: 'Core Members',
    technicalTeam: 'Technical Team',
    operationTeam: 'Operation Team',
    designTeam: 'Design Team',
    teamMembers: 'Team Members',
    expand: 'View All',
    collapse: 'Collapse',
    positions: {
      developer: 'Developer',
      designer: 'Designer',
      manager: 'Project Manager',
    },
    members: {
      ajun: {
        name: 'A-Jun',
        role: 'Team Leader'
      },
      pe: {
        name: 'Peng',
        role: 'Team Manager'
      },
      yuge: {
        name: 'Yu',
        role: 'Director'
      },
      weidong: {
        name: 'Wei Dong',
        role: 'Technical Director'
      },
      zhubb: {
        name: 'Zhu',
        role: 'Technical Director'
      },
      haoge: {
        name: 'Hao',
        role: 'Design Director'
      },
      tian: {
        name: 'Tian',
        role: 'Operations Director'
      }
    }
  },
  create: {
    hero: {
      title: 'Innovative Thinking, Smart Creation',
      subtitle: 'Creation Made Simple',
      description: 'At Token, we are committed to building a platform that inspires creativity. Enabling developers, designers, and creators to create and manage knowledge more easily, building a vibrant creative team together.',
      startButton: 'Start Creating',
    },
    partners: {
      title: 'Token Ecosystem Partners',
      subtitle: 'Building the Future Together',
      description: 'Deep cooperation with top global tech companies to provide better services for creators',
    },
    features: {
      title: 'More Freedom in Creation, More Efficiency in Collaboration',
      description: 'The Token team is dedicated to building a platform that inspires creativity. Enabling developers, designers, and creators to express their creativity more freely and create amazing works together.',
    },
    sections: {
      create: {
        title: 'Create',
        subtitle: ['Smart Creation', 'Efficient Management'],
        description: 'Use advanced AI technology to make creation smarter and more efficient.',
      },
      manage: {
        title: 'Manage',
        subtitle: ['Team Collaboration', 'Knowledge Base'],
        description: 'Powerful team collaboration features make knowledge management more convenient.',
      },
    },
    aiPartner: {
      title: 'Team',
      subtitle: 'Make Creation Easier, Make Knowledge More Valuable',
      description1: 'AI Creation Assistant, Knowledge Management Expert',
      description2: 'Make Every Creation Full of Possibilities',
      startButton: 'Get Started',
    },
  },
  message: {
    title: 'Message Board',
    description: 'Welcome to share your thoughts and suggestions',
    stats: {
      total: 'Total Messages',
      today: 'New Today',
      week: 'Active This Week'
    },
    loginPrompt: 'Please login to leave a message',
    loginTitle: 'User Login',
    loginDesc: 'Please select login method',
    qqLogin: 'Login with QQ',
    wechatLogin: 'Login with WeChat',
    official: 'Official',
    user: 'User',
    wechat: 'WeChat',
    wechatUser: 'WeChat User',
    submit: 'Send Message',
    placeholder: 'Write your message...',
    loginFirst: 'Please login first',
    selectTag: 'Select Tag',
    tips: 'Kind words bring good karma',
    delete: 'Delete',
    filterAll: 'All Messages',
    filterOfficial: 'Official Replies',
    hotTags: 'Hot Tags',
    filter: 'Filter',
    error: 'Operation failed'
  },
  contact: {
    title: 'Contact Us',
    description: 'We are the Token team, dedicated to building the next generation AI creation platform',
    description2: 'Empowering creators with technology',
    whyUs: {
      title: 'Why Choose Token',
      ai: {
        title: 'AI Creation',
        desc: 'Powerful AI models to make creation easier and more efficient'
      },
      knowledge: {
        title: 'Knowledge Management',
        desc: 'Scientific knowledge system construction and efficient information organization'
      },
      support: {
        title: 'Professional Support',
        desc: '24/7 technical support to solve any of your problems'
      }
    },
    process: {
      title: 'Service Process',
      steps: {
        submit: {
          title: 'Submit Requirements',
          desc: 'Submit your specific requirements via form or email'
        },
        evaluate: {
          title: 'Requirement Assessment',
          desc: 'Professional team evaluates and develops solutions'
        },
        confirm: {
          title: 'Solution Confirmation',
          desc: 'Confirm specific implementation plan and timeline with you'
        },
        start: {
          title: 'Start Service',
          desc: 'Officially launch service and follow up continuously'
        }
      }
    },
    highlights: {
      title: 'Our Advantages',
      response: {
        title: 'Quick Response',
        number: '2 Hours',
        desc: 'Average response time'
      },
      innovation: {
        title: 'Innovative Solutions',
        number: '200+',
        desc: 'Success cases'
      },
      team: {
        title: 'Professional Team',
        number: '50+',
        desc: 'Technical experts'
      },
      satisfaction: {
        title: 'Customer Satisfaction',
        number: '98%',
        desc: 'Positive feedback'
      }
    },
    form: {
      title: 'Send Message',
      name: 'Name',
      namePlaceholder: 'Please enter your name',
      email: 'Email',
      emailPlaceholder: 'Please enter your email',
      type: 'Inquiry Type',
      typePlaceholder: 'Please select inquiry type',
      typeOptions: {
        business: 'Business Cooperation',
        technical: 'Technical Support',
        other: 'Other Issues'
      },
      message: 'Message',
      messagePlaceholder: 'Please describe your requirements in detail',
      submit: 'Send Message',
      sending: 'Sending'
    },
    contact: {
      business: {
        title: 'Business Cooperation',
        phone: '+86 131-2355-6625'
      },
      technical: {
        title: 'Technical Support',
        support: '24/7 Online Support'
      },
      social: {
        title: 'Social Media'
      },
      workingHours: {
        title: 'Working Hours',
        weekdays: 'Monday to Friday: 10:00 - 17:00',
        weekends: 'Weekends & Holidays: Online Support'
      },
      emergency: {
        title: 'Emergency Contact',
        phone: '24/7 Emergency Hotline: +86 131-2355-6625',
        note: 'For emergency technical support only'
      }
    },
    offices: {
      title: 'National Offices',
      nanning: {
        title: 'Guangxi Nanning HQ',
        address: 'Guangxi Agricultural Vocational and Technical University',
        hours: 'Mon-Fri 10:00-17:00'
      },
      yulin: {
        title: 'Guangxi Yulin Branch',
        address: 'High-tech Park, Yuzhou District, Beiliu City',
        hours: 'Mon-Fri 10:00-17:00'
      },
      beihai: {
        title: 'Guangxi Beihai Branch',
        address: 'Science Park, Nanshan District, Beihai',
        hours: 'Mon-Fri 10:00-17:00'
      }
    },
    notification: {
      success: 'Message sent successfully! We will reply to you as soon as possible.',
      error: 'Failed to send, please try again later or contact us through other means.'
    }
  },
  blogs: {
    title: 'Blog Posts',
    readMore: 'Read More',
    categories: 'Categories',
    tags: 'Tags',
    search: 'Search Articles',
    description: 'Explore Token Team\'s Technical Innovation · Share Development Practices · Build Open Source Ecosystem',
    featured: 'Featured Articles',
    topics: 'Technical Topics',
    authors: 'Team Columns',
    articles: 'Articles',
    articleCount: 'Articles',
    viewCount: 'Views',
    date: 'Publication Date',
    author: 'Author',
    category: 'Category',
    allCategories: 'All Categories',
    latestPosts: 'Latest Posts',
    popularPosts: 'Popular Posts',
    relatedPosts: 'Related Posts',
    comments: 'Comments',
    share: 'Share',
    previous: 'Previous',
    next: 'Next',
    publishedOn: 'Published on',
    lastUpdated: 'Last Updated',
    readingTime: 'Reading Time',
    minutes: 'minutes',
    authorProfile: 'Author Profile',
    moreFromAuthor: 'More from Author',
  },
  moreLinks: {
    title: 'Our Updates',
    subtitle: 'Java Python Full-stack Embedded Technology Stack Development Projects',
    aiEra: 'AI Era',
    courses: {
      golang: {
        title: 'Go Language',
        viewOnGithub: 'View on Github',
      },
      machineLearning: {
        title: 'Machine Learning',
        viewOnGithub: 'View on Github',
      },
    },
  },
  footer: {
    copyright: 'Copyright © 2024 - {year} Token. All Rights Reserved',
    poweredBy: 'Powered by',
    and: 'and',
    theme: 'theme',
    visitCount: 'Visits: {count}',
    daysSinceCreation: 'Days Online: {days}',
  },
}) 