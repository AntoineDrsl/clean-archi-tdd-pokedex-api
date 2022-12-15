import { PokemonGateway } from './../../gateways/pokemon-gateway';

export const listPokemons = (pokemonGateway: PokemonGateway): Promise<any> => {
    return pokemonGateway.list()
}