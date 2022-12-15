import { Pokemon } from './../../core/entities/pokemon';
import { PokemonGateway } from './../../core/gateways/pokemon-gateway';

export class InMemoryPokemonGateway implements PokemonGateway {
    private pokemons: Array<Pokemon> = []

    list(): Promise<Array<Pokemon>> {
        return Promise.resolve(this.pokemons)
    }

    feedWith(...pokemons: Array<Pokemon>) {
        this.pokemons = pokemons
    }
}