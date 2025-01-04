export interface TeamMember {
  name: string
  role: string
  img: string
  in: boolean
  links?: {
    github?: {
      url: string
      icon: string
      alt: string
    }
    csdn?: {
      url: string
      icon: string
      alt: string
    }
  }
}

export interface TeamData {
  board: TeamMember[]
  technical: TeamMember[]
  management: TeamMember[]
  design: TeamMember[]
} 

// 定义社交媒体类型
export interface SocialLink {
    url: string;
    icon: string;
    alt: string;
  }