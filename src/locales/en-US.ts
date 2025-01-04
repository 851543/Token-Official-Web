import type { I18nSchema } from '@/types/i18n'
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
  },
  message: {
    placeholder: 'Please enter your message',
    submit: 'Submit',
    success: 'Message sent successfully',
    error: 'Failed to send message',
    empty: 'Message cannot be empty',
  },
  contact: {
    title: 'Contact Us',
    description: 'Feel free to contact us with any questions or suggestions',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send Message',
    },
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
  footer: {
    copyright: 'Copyright © 2024 - {year} Token. All Rights Reserved',
    poweredBy: 'Powered by',
    and: 'and',
    theme: 'theme',
    visitCount: 'Visits: {count}',
    daysSinceCreation: 'Days Online: {days}',
  },
}) 