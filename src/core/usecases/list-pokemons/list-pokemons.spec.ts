import { Pokemon } from './../../entities/pokemon';
import { InMemoryPokemonGateway } from './../../../adapters/secondary/in-memory-pokemon-gateway';
import { listPokemons } from './list-pokemons';
import { PokemonTypeEnum } from '../../enums/pokemon-type.enum';

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
        const pikachu: Pokemon = {
            id: 1,
            name: 'Pikachu',
            description: 'Un beau pokemon',
            image: 'assets/pikachu.png',
            types: [PokemonTypeEnum.ELECTRIK],
        }
         
        const roucoups: Pokemon = {
            id: 2,
            name: 'Roucoups',
            description: 'Un pokemon moins cool',
            image: 'assets/roucoups.png',
            types: [PokemonTypeEnum.VOL, PokemonTypeEnum.NORMAL],
        }

        pokemonGateway.feedWith(pikachu, roucoups)
        const pokemons = await listPokemons(pokemonGateway)
        const expectedPokemons: Array<Pokemon> = [pikachu, roucoups]
        expect(pokemons).toEqual(expectedPokemons)
    })
})