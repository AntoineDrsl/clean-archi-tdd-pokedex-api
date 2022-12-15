import { CreatePokemonDto } from './../../dto/create-pokemon.dto';
import { PokemonGateway } from './../../gateways/pokemon.gateway';
import { Pokemon } from './../../entities/pokemon.entity';

export const createPokemon = (createPokemonDto: CreatePokemonDto, pokemonGateway: PokemonGateway): Promise<Pokemon> => {
    return pokemonGateway.create(createPokemonDto)
}