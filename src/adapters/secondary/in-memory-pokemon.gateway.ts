import { StorageGateway } from './../../core/gateways/storage.gateway';
import { CreatePokemonDto } from './../../core/dto/create-pokemon.dto';
import { PokemonNotFoundError } from '../../core/errors/pokemon-not-found.error';
import { Pokemon } from '../../core/entities/pokemon.entity';
import { PokemonGateway } from '../../core/gateways/pokemon.gateway';

export class InMemoryPokemonGateway implements PokemonGateway {
    private pokemons: Array<Pokemon> = []
    private storageGateway: StorageGateway

    constructor(storageGateway: StorageGateway) {
        this.storageGateway = storageGateway
    }

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
        const id = lastPokemon ? lastPokemon.id + 1 : 1

        const pokemon: Pokemon = {
            id: id,
            image: `uploads/${id}.png`,
            ...createPokemonDto,
        }
        this.pokemons.push(pokemon)

        this.storageGateway.upload(`uploads/${id}.png`)

        return Promise.resolve(pokemon)
    }

    feedWith(...pokemons: Array<Pokemon>) {
        this.pokemons = pokemons
    }
}