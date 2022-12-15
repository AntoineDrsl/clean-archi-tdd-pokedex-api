import { pikachu } from '../../faker/pokemon.faker';
import { Pokemon } from '../../entities/pokemon.entity';
import { PokemonGateway } from '../../gateways/pokemon.gateway';

export const findPokemon = (id: number, pokemonGateway: PokemonGateway): Promise<Pokemon> => {
    return pokemonGateway.find(id)
}