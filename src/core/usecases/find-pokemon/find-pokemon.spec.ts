import { FakeStorageGateway } from './../../../adapters/secondary/fake-storage.gateway';
import { PokemonNotFoundError } from './../../errors/pokemon-not-found.error';
import { InMemoryPokemonGateway } from '../../../adapters/secondary/in-memory-pokemon.gateway';
import { findPokemon } from './find-pokemon';
import { pikachu, roucoups } from '../../faker/pokemon.faker';

describe('Find a pokemon with its id', () => {
    let pokemonGateway: InMemoryPokemonGateway
    const id: number = 1

    beforeEach(() => {
        pokemonGateway = new InMemoryPokemonGateway(new FakeStorageGateway())
    })
    it('should return pokemon if exists', async () => {
        pokemonGateway.feedWith(pikachu, roucoups)
        const pokemon = await findPokemon(id, pokemonGateway)
        expect(pokemon).toEqual(pikachu)
    })
    it('should throw an error if doesn\'t exist', () => {
        expect(async () => await findPokemon(id, pokemonGateway)).rejects.toThrow(PokemonNotFoundError)
    })
})