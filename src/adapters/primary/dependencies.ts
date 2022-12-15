import { PokemonTypeEnum } from './../../core/enums/pokemon-type.enum';
import { Pokemon } from './../../core/entities/pokemon';
import { InMemoryPokemonGateway } from './../secondary/in-memory-pokemon-gateway';

export const pokemonGateway = () => {
    const pokemonGateway: InMemoryPokemonGateway = new InMemoryPokemonGateway()

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

    return pokemonGateway
}