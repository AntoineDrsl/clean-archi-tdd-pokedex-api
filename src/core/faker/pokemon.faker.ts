import { PokemonTypeEnum } from '../enums/pokemon-type.enum';
import { Pokemon } from '../entities/pokemon.entity';

export const pikachu: Pokemon = {
    id: 1,
    name: 'Pikachu',
    description: 'Un beau pokemon',
    image: 'pikachu.png',
    types: [PokemonTypeEnum.ELECTRIK],
}
 
export const roucoups: Pokemon = {
    id: 2,
    name: 'Roucoups',
    description: 'Un pokemon moins cool',
    image: 'roucoups.png',
    types: [PokemonTypeEnum.VOL, PokemonTypeEnum.NORMAL],
}

export const abo: Pokemon = {
    id: 3,
    name: 'Abo',
    description: 'Un pokemon serpent',
    image: 'abo.png',
    types: [PokemonTypeEnum.POISON],
}