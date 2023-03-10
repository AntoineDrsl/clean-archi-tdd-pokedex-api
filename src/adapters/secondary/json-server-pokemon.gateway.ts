import { jsonServerUrl } from './../../core/utils/json-server-url';
import { PokemonNotFoundError } from './../../core/errors/pokemon-not-found.error';
import { StorageGateway } from './../../core/gateways/storage.gateway';
import { CreatePokemonDto } from './../../core/dto/create-pokemon.dto';
import { Pokemon } from './../../core/entities/pokemon.entity';
import { PokemonGateway } from './../../core/gateways/pokemon.gateway';
import axios from 'axios'
import { File } from '../../core/entities/file.entity';

export class JsonServerPokemonGateway implements PokemonGateway {
    private storageGateway: StorageGateway

    constructor(storageGateway: StorageGateway) {
        this.storageGateway = storageGateway
    }

    async list(): Promise<Array<Pokemon>> {
        const res = await axios.get(`${jsonServerUrl}/pokemons`)
        const pokemons = res.data
        return pokemons as Array<Pokemon>
    }

    async find(id: number): Promise<Pokemon> {
        try {
            const res = await axios.get(`${jsonServerUrl}/pokemons/${id}`)
            const pokemon = res.data
            return pokemon as Pokemon
        } catch(err) {
            throw new PokemonNotFoundError
        }
    }

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        const sanitizedName = createPokemonDto.name.toLowerCase().replace(' ', '-')
        const file: File = await this.storageGateway.upload(sanitizedName)

        const res = await axios.post(`${jsonServerUrl}/pokemons`, {
            ...createPokemonDto,
            image: file.name
        })
        const pokemon = res.data
        return pokemon as Pokemon
    }

}