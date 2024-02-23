import type { Thumbnail } from './CharacterType'

export interface Comics {
  id: string
  title: string
  creators: string
  thumbnail: Thumbnail
}

export interface ComicsDetails {
  title: string
  description: string
  thumbnail: Thumbnail
  creators: Creators[]
}

export interface Creators {
  id: string
  fullName: string
  role: string
}
