import { pikachu } from './../../core/faker/pokemon.faker';
import { CreatePokemonDto } from './../../core/dto/create-pokemon.dto';
import { PokemonNotFoundError } from '../../core/errors/pokemon-not-found.error';
import { Pokemon } from '../../core/entities/pokemon.entity';
import { PokemonGateway } from '../../core/gateways/pokemon.gateway';

export class InMemoryPokemonGateway implements PokemonGateway {
    private pokemons: Array<Pokemon> = []

    list(): Promise<Array<Pokemon>> {
        return Promise.resolve(this.pokemons)
    }

    find(id: number): Promise<Pokemon> {
        const pokemon = this.pokemons.find(pokemon => pokemon.id == id)
        if(!pokemon) {
            throw new PokemonNotFoundError
        }
        return Promise.resolve(pokemon)
    }

    create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        const sortedList = this.pokemons.sort((a, b) => a.id - b.id)
        const lastPokemon = sortedList[sortedList.length - 1]

        const pokemon: Pokemon = {
            id: lastPokemon ? lastPokemon.id + 1 : 1,
            ...createPokemonDto,
        }
        this.pokemons.push(pokemon)
        return Promise.resolve(pokemon)
    }

    feedWith(...pokemons: Array<Pokemon>) {
        this.pokemons = pokemons
    }
}