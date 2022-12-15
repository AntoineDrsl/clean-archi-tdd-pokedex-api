import { listPokemons } from './../../../core/usecases/list-pokemons/list-pokemons';
import express from 'express'
import { pokemonGateway } from '../dependencies';

export const app = express()

app.use(express.json())

app.get('/pokemons', async (req: any, res: any) => {
    const pokemons = await listPokemons(pokemonGateway())
    res.send(JSON.stringify(pokemons))
})