import { JsonServerPokemonGateway } from './../secondary/json-server-pokemon.gateway';
import { FakeStorageGateway } from './../secondary/fake-storage.gateway';
import { FolderStorageGateway } from './../secondary/folder-storage.gateway';
import { pikachu, roucoups } from '../../core/faker/pokemon.faker';
import { InMemoryPokemonGateway } from '../secondary/in-memory-pokemon.gateway';
import { File } from 'formidable';

export const pokemonGateway = (file?: File) => {
    // JSON server & folder storage
    const pokemonGateway: JsonServerPokemonGateway = new JsonServerPokemonGateway(new FolderStorageGateway(file))

    // In memory & fake storage
    // const pokemonGateway: InMemoryPokemonGateway = new InMemoryPokemonGateway(new FakeStorageGateway())
    // pokemonGateway.feedWith(pikachu, roucoups)

    // In memory & folder storage
    // const pokemonGateway: InMemoryPokemonGateway = new InMemoryPokemonGateway(new FolderStorageGateway(file))
    // pokemonGateway.feedWith(pikachu, roucoups)

    return pokemonGateway
}