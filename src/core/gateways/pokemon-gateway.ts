import { Pokemon } from './../entities/pokemon';

export interface PokemonGateway {
    list(): Promise<Array<Pokemon>>
}