import { FakeStorageGateway } from './../../../adapters/secondary/fake-storage.gateway';
import { Pokemon } from './../../entities/pokemon.entity';
import { pikachu, abo, roucoups } from './../../faker/pokemon.faker';
import { InMemoryPokemonGateway } from './../../../adapters/secondary/in-memory-pokemon.gateway';
import { createPokemon } from './create-pokemon';
import { File } from '../../entities/file.entity';

describe('Create a pokemon', () => {
    let pokemonGateway: InMemoryPokemonGateway
    let storageGateway: FakeStorageGateway
    let pokemon: Pokemon

    beforeEach(() => {
        storageGateway = new FakeStorageGateway()
        pokemonGateway = new InMemoryPokemonGateway(storageGateway)
    })
    describe('There is no previous pokemon', () => {
        beforeEach(async () => {
            pokemon = await createPokemon({
                name: pikachu.name,
                description: pikachu.description,
                types: pikachu.types,
            }, pokemonGateway)
        })
        it('should create a pokemon with id 1', () => {
            expect(pokemon).toEqual(pikachu)
        })
        it('should save the pokemon in the gateway', async () => {
            expect(await pokemonGateway.list()).toEqual([pikachu])
        })
        it('should upload the file in the storage gateway', async () => {
            const expectedFile: File = {
                name: pokemon.image
            }
            expect(await storageGateway.getFiles()).toEqual([expectedFile])
        })
    })

    describe('There is previous pokemon', () => {
        const pikachuImage: File = {
            name: pikachu.image
        }
        const roucoupsImage: File = {
            name: roucoups.image
        }

        beforeEach(async () => {
            pokemonGateway.feedWith(pikachu, roucoups)
            storageGateway.feedWith(pikachuImage, roucoupsImage)
            
            pokemon = await createPokemon({
                name: abo.name,
                description: abo.description,
                types: abo.types,
            }, pokemonGateway)
        })
        it('should create a pokemon with next id', () => {
            expect(pokemon).toEqual(abo)
        })
        it('should save the pokemon in the gateway', async () => {
            expect(await pokemonGateway.list()).toEqual([pikachu, roucoups, pokemon])
        })
        it('should upload the file in the storage gateway', async () => {
            const expectedFile: File = {
                name: pokemon.image
            }
            expect(await storageGateway.getFiles()).toEqual([pikachuImage, roucoupsImage, expectedFile])
        })
    })

    it('should throw an error if name has unexpected characters', () => {
        expect(async () => await createPokemon({
            name: 'Pokemon#',
            description: pikachu.description,
            types: pikachu.types,
        }, pokemonGateway)).rejects.toThrow(Error)
    })
})