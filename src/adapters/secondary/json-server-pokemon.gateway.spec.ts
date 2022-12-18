import { PokemonNotFoundError } from './../../core/errors/pokemon-not-found.error';
import { pokemonGateway } from './../primary/dependencies';
import { Pokemon } from './../../core/entities/pokemon.entity';
import { roucoups, abo } from './../../core/faker/pokemon.faker';
import { JsonServerPokemonGateway } from './json-server-pokemon.gateway';
import { FolderStorageGateway } from './folder-storage.gateway';
import axios from 'axios'
import { pikachu } from '../../core/faker/pokemon.faker';

jest.mock('axios')

describe('Json server pokemon gateway', () => {
    describe('List pokemons', () => {
        it('should return an empty array when there is no pokemon', async () => {
            checkList([])
        })
        it('should return all pokemons', async () => {
            checkList([pikachu, roucoups])
        })

        const checkList = async (mockedPokemons: Array<Pokemon>) => {
            const mockedResponse = mockedPokemons;
            (axios.get as jest.Mock).mockResolvedValue({ data: mockedResponse});
    
            const pokemonGateway = new JsonServerPokemonGateway(new FolderStorageGateway())
            const pokemons = await pokemonGateway.list()
    
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/pokemons')
            expect(pokemons).toEqual(mockedResponse)
        }
    })

    describe('Find a pokemon with its id', () => {
        it('should return pokemon if exists', async () => {
            const mockedResponse = pikachu;
            (axios.get as jest.Mock).mockResolvedValue({ data: mockedResponse });

            const pokemonGateway = new JsonServerPokemonGateway(new FolderStorageGateway())
            const pokemon = await pokemonGateway.find(1)
            expect(pokemon).toEqual(pikachu)
        })
        it('should throw an error if doesn\'t exist', () => {
            (axios.get as jest.Mock).mockRejectedValueOnce(new Error());

            const pokemonGateway = new JsonServerPokemonGateway(new FolderStorageGateway())
            expect(async () => await pokemonGateway.find(999)).rejects.toThrow(PokemonNotFoundError)
        })
    })
})

