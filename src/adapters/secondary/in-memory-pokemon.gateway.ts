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

    feedWith(...pokemons: Array<Pokemon>) {
        this.pokemons = pokemons
    }
}