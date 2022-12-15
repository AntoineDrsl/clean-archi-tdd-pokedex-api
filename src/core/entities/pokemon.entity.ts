import { PokemonTypeEnum } from "../enums/pokemon-type.enum"

export interface Pokemon {
    id: number
    name: string
    description: string
    image: string
    types: Array<PokemonTypeEnum>
}
