import { CreatePokemonDto } from './../dto/create-pokemon.dto';
import { Pokemon } from '../entities/pokemon.entity';

export interface PokemonGateway {
    list(): Promise<Array<Pokemon>>
    find(id: number): Promise<Pokemon>
    create(createPokemonDto: CreatePokemonDto): Promise<Pokemon>
}