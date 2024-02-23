import type { Thumbnail } from './CharacterType'
import type { Creators } from './ComicsType'

export interface Series {
  id: string
  title: string
  creators: string
  thumbnail: Thumbnail
}

export interface SeriesDetails {
  title: string
  description: string
  thumbnail: Thumbnail
  creators: Creators[]
}
