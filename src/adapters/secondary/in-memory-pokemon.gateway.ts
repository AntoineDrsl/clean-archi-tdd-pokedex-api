import { StorageGateway } from './../../core/gateways/storage.gateway';
import { CreatePokemonDto } from './../../core/dto/create-pokemon.dto';
import { PokemonNotFoundError } from '../../core/errors/pokemon-not-found.error';
import { Pokemon } from '../../core/entities/pokemon.entity';
import { PokemonGateway } from '../../core/gateways/pokemon.gateway';
import { File } from '../../core/entities/file.entity';

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

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        const sortedList = this.pokemons.sort((a, b) => a.id - b.id)
        const lastPokemon = sortedList[sortedList.length - 1]
        const id = lastPokemon ? lastPokemon.id + 1 : 1

        const sanitizedName = createPokemonDto.name.toLowerCase().replace(' ', '-')
        const file: File = await this.storageGateway.upload(sanitizedName)

        const pokemon: Pokemon = {
            id: id,
            image: file.name,
            ...createPokemonDto,
        }
        this.pokemons.push(pokemon)

        return Promise.resolve(pokemon)
    }

    feedWith(...pokemons: Array<Pokemon>) {
        this.pokemons = pokemons
    }
}