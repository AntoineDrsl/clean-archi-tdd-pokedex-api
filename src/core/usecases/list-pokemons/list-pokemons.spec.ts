import { pikachu, roucoups } from '../../faker/pokemon.faker';
import { Pokemon } from '../../entities/pokemon.entity';
import { InMemoryPokemonGateway } from '../../../adapters/secondary/in-memory-pokemon.gateway';
import { listPokemons } from './list-pokemons';

describe('List pokemons', () => {
    let pokemonGateway: InMemoryPokemonGateway

    beforeEach(() => {
        pokemonGateway = new InMemoryPokemonGateway()
    })
    it('should return [] when there is no pokemon', async () => {
        const pokemons = await listPokemons(pokemonGateway)
        expect(pokemons).toEqual([])
    })
    it('should return all pokemons', async () => {
        pokemonGateway.feedWith(pikachu, roucoups)
        const pokemons = await listPokemons(pokemonGateway)
        const expectedPokemons: Array<Pokemon> = [pikachu, roucoups]
        expect(pokemons).toEqual(expectedPokemons)
    })
})