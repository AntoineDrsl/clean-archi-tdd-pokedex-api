import { Pokemon } from './../../entities/pokemon.entity';
import { pikachu, abo, roucoups } from './../../faker/pokemon.faker';
import { InMemoryPokemonGateway } from './../../../adapters/secondary/in-memory-pokemon.gateway';
import { createPokemon } from './create-pokemon';

describe('Create a pokemon', () => {
    let pokemonGateway: InMemoryPokemonGateway
    let pokemon: Pokemon

    beforeEach(() => {
        pokemonGateway = new InMemoryPokemonGateway()
    })
    describe('There is no previous pokemon', () => {
        beforeEach(async () => {
            pokemon = await createPokemon({
                name: pikachu.name,
                description: pikachu.description,
                image: pikachu.image,
                types: pikachu.types,
            }, pokemonGateway)
        })
        it('should create a pokemon with id 1', () => {
            expect(pokemon).toEqual(pikachu)
        })
        it('should save the pokemon in the gateway', async () => {
            expect(await pokemonGateway.list()).toEqual([pikachu])
        })
    })

    describe('There is previous pokemon', () => {
        beforeEach(async () => {
            pokemonGateway.feedWith(pikachu, roucoups)
            pokemon = await createPokemon({
                name: abo.name,
                description: abo.description,
                image: abo.image,
                types: abo.types,
            }, pokemonGateway)
        })
        it('should create a pokemon with next id', () => {
            expect(pokemon).toEqual(abo)
        })
        it('should save the pokemon in the gateway', async () => {
            expect(await pokemonGateway.list()).toEqual([pikachu, roucoups, pokemon])
        })
    })
})