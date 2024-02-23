export interface Character {
  id: number
  name: string
  thumbnail: Thumbnail
}

export interface Thumbnail {
  path: string
  extension: string
}

export interface CharacterDetails {
  name: string
  description: string
  thumbnail: Thumbnail
}
