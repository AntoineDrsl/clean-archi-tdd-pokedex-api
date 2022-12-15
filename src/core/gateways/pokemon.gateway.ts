import { Pokemon } from '../entities/pokemon.entity';

export interface PokemonGateway {
    list(): Promise<Array<Pokemon>>
    find(id: number): Promise<Pokemon>
}