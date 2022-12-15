import { PokemonNotFoundError } from './../../../core/errors/pokemon-not-found.error';
import { findPokemon } from './../../../core/usecases/find-pokemon/find-pokemon';
import { listPokemons } from './../../../core/usecases/list-pokemons/list-pokemons';
import express from 'express'
import { pokemonGateway } from '../dependencies';

export const app = express()

app.use(express.json())

// Routes
app.get('/pokemons', async (req: any, res: any) => {
    const pokemons = await listPokemons(pokemonGateway())
    res.send(JSON.stringify(pokemons))
})
app.get('/pokemons/:id', async (req: any, res: any, next: any) => {
    try {
        const pokemon = await findPokemon(req.params.id, pokemonGateway())
        res.send(JSON.stringify(pokemon))
    } catch (error) {
        next(error)
    } 
})

// Error handler
app.use(async (err: any, req: any, res: any, next: any) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(err.code ?? 500).send({ message: err.message })
})


