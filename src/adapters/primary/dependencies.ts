import { pikachu, roucoups } from '../../core/faker/pokemon.faker';
import { InMemoryPokemonGateway } from '../secondary/in-memory-pokemon.gateway';

export const pokemonGateway = () => {
    const pokemonGateway: InMemoryPokemonGateway = new InMemoryPokemonGateway()
    pokemonGateway.feedWith(pikachu, roucoups)

    return pokemonGateway
}