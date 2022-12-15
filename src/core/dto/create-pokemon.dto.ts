import { PokemonTypeEnum } from './../enums/pokemon-type.enum';

export interface CreatePokemonDto {
    name: string
    description: string
    types: Array<PokemonTypeEnum>
}