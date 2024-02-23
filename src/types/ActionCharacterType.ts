import type { Character } from './CharacterType'

export interface ActionCharacter<T extends string> {
  type: T
  payload: Character[]
}
