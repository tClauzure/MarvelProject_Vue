import axios from 'axios'
import md5 from 'md5'
import type { Character, CharacterDetails } from '../types/CharacterType'
import type { Comics, ComicsDetails, Creators } from '../types/ComicsType'
import type { Series, SeriesDetails } from '../types/SeriesType'

class MarvelAPI {
  private publicKey: string
  private privateKey: string
  private baseUrl: string

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey
    this.privateKey = privateKey
    this.baseUrl = 'https://gateway.marvel.com:443/v1/public'
  }

  private generateHash(timestamp: string): string {
    return md5(`${timestamp}${this.privateKey}${this.publicKey}`)
  }

  /********************************************************************
   *********************************************************************
   ********************************************************************/
  async getCharacters(): Promise<Character[]> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/characters?limit=40`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })

      // Récupérer les personnages depuis la réponse
      const characters: Character[] = response.data.data.results
      return characters
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  async getCharactersSearch(name: string): Promise<Character[]> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/characters?name=${name}`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })

      // Récupérer les personnages depuis la réponse
      const characters: Character[] = response.data.data.results
      return characters
    } catch (error) {
      console.error('Erreur lors de la récupération du personnages :', error)
      throw error
    }
  }

  async getCharacter(id: string): Promise<CharacterDetails> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/characters/${id}`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const characterData: CharacterDetails[] = response.data.data.results
      return characterData[0]
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  async getCharacterComics(id: string): Promise<Comics[] | undefined> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/characters/${id}/comics`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const characterData: Comics[] = response.data.data.results
      return characterData
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  async getCharacterSeries(id: string): Promise<Series[] | undefined> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/characters/${id}/series`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const characterData: Series[] = response.data.data.results
      return characterData
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  /********************************************************************
   *********************************************************************
   ********************************************************************/

  async getComics(): Promise<Comics[]> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/comics?limit=40`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })

      const comics: Comics[] = response.data.data.results
      return comics
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  async getComic(id: string): Promise<ComicsDetails> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/comics/${id}`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const comicsData: ComicsDetails[] = response.data.data.results
      return comicsData[0]
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  async getComicsCharacters(id: string): Promise<Character[] | undefined> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/comics/${id}/characters`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const comicsData: Character[] = response.data.data.results
      return comicsData
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  async getComicsSeries(id: string): Promise<Series[] | undefined> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/series?comics=${id}`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const comicsData: Series[] = response.data.data.results
      return comicsData
    } catch (error) {
      console.error('Erreur lors de la récupération des séries:', error)
      throw error
    }
  }

  async getComicsCreators(id: string): Promise<Creators[] | undefined> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/comics/${id}/creators`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const comicsData: Creators[] = response.data.data.results
      return comicsData
    } catch (error) {
      console.error('Erreur lors de la récupération des créateurs :', error)
      throw error
    }
  }

  /********************************************************************
   *********************************************************************
   ********************************************************************/

  async getSeries(): Promise<Series[]> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/series?limit=40`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })

      const series: Series[] = response.data.data.results
      return series
    } catch (error) {
      console.error('Erreur lors de la récupération des séries :', error)
      throw error
    }
  }

  async getSerie(id: string): Promise<SeriesDetails> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/series/${id}`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const seriesData: SeriesDetails[] = response.data.data.results
      return seriesData[0]
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  async getSeriesCharacters(id: string): Promise<Character[] | undefined> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/series/${id}/characters`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const seriesData: Character[] = response.data.data.results
      return seriesData
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error)
      throw error
    }
  }

  async getSeriesComics(id: string): Promise<Comics[] | undefined> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/comics?series=${id}`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const seriesData: Comics[] = response.data.data.results
      return seriesData
    } catch (error) {
      console.error('Erreur lors de la récupération des comics:', error)
      throw error
    }
  }

  async getSeriesCreators(id: string): Promise<Creators[] | undefined> {
    const timestamp = new Date().getTime().toString()
    const hash = this.generateHash(timestamp)

    try {
      const response = await axios.get(`${this.baseUrl}/series/${id}/creators`, {
        params: {
          ts: timestamp,
          apikey: this.publicKey,
          hash: hash
        }
      })
      const seriesData: Creators[] = response.data.data.results
      return seriesData
    } catch (error) {
      console.error('Erreur lors de la récupération des créateurs :', error)
      throw error
    }
  }
}
export const marvelAPI = new MarvelAPI(
  '9c1c09fd337f87d13f02e0c2be12ffe3',
  'a0772c024f60e5c7b0fc3e42dd4f4b4c3af989c7'
)
