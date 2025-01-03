export interface Category {
  id: number
  title: string
  count: number
  description: string
  gradient: string
  icon: string
}

export interface FeaturedArticle {
  id: number
  title: string
  excerpt: string
  icon: string
  date: string
  author: string
  tags: string[]
}

export interface TechTopic {
  id: number
  title: string
  icon: string
  gradient: string
  description: string
  articles: {
    id: number
    title: string
    date: string
  }[]
}

export interface Author {
  id: number
  name: string
  title: string
  avatar: string
  description: string
  articles: number
  views: number
}

export interface BlogsData {
  categories: Category[]
  featuredArticles: FeaturedArticle[]
  techTopics: TechTopic[]
  authors: Author[]
} 