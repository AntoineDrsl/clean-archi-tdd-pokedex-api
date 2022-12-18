import { PokemonNotFoundError } from './../../core/errors/pokemon-not-found.error';
import { StorageGateway } from './../../core/gateways/storage.gateway';
import { CreatePokemonDto } from './../../core/dto/create-pokemon.dto';
import { Pokemon } from './../../core/entities/pokemon.entity';
import { PokemonGateway } from './../../core/gateways/pokemon.gateway';
import axios from 'axios'

export class JsonServerPokemonGateway implements PokemonGateway {
    private storageGateway: StorageGateway

    constructor(storageGateway: StorageGateway) {
        this.storageGateway = storageGateway
    }

    async list(): Promise<Array<Pokemon>> {
        const res = await axios.get('http://localhost:3000/pokemons')
        const pokemons = res.data
        return pokemons as Array<Pokemon>
    }

    async find(id: number): Promise<Pokemon> {
        try {
            const res = await axios.get(`http://localhost:3000/pokemons/${id}`)
            const pokemon = res.data
            return pokemon as Pokemon
        } catch(err) {
            throw new PokemonNotFoundError
        }
    }

    create(createPokemonDto: CreatePokemonDto): Promise<any> {
        return Promise.resolve()
    }

}