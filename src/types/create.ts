export interface Section {
  title: string
  subtitle: string[]
  description: string
  image: string
}

export interface Partner {
  src: string
  alt: string
}

export interface Feature {
  icon: string
  title: string
  background: string
  color: string
}

export interface CreateData {
  sections: Section[]
  partners: Partner[]
  features: Feature[]
  images: string[]
} 