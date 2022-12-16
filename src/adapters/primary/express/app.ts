import { CreatePokemonDto } from './../../../core/dto/create-pokemon.dto';
import { PokemonTypeEnum } from './../../../core/enums/pokemon-type.enum';
import { pokemonGateway } from './../dependencies';
import { createPokemon } from './../../../core/usecases/create-pokemon/create-pokemon';
import { findPokemon } from './../../../core/usecases/find-pokemon/find-pokemon';
import { listPokemons } from './../../../core/usecases/list-pokemons/list-pokemons';
import express from 'express'
import bodyParser from 'body-parser'
import formidable from 'formidable'

export const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.get('/pokemons', async (req: any, res: any, next: any) => {
    try {
        const pokemons = await listPokemons(pokemonGateway())
        res.send(JSON.stringify(pokemons))
    } catch (error) {
        next(error)
    }
})
app.get('/pokemons/:id', async (req: any, res: any, next: any) => {
    try {
        const pokemon = await findPokemon(req.params.id, pokemonGateway())
        res.send(JSON.stringify(pokemon))
    } catch (error) {
        next(error)
    }
})
app.post('/pokemons', async (req: any, res: any, next: any) => {
    try {
        // Parse form data
        const form = formidable({ multiples: true })
        const body: any = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve({ ...fields, image: files.image })
            });
        });

        // Validation
        if(!body.name || typeof body.name !== 'string') {
            throw new Error('Name is required')
        }
        if(!body.image) {
            throw new Error('Image is required')
        }
        if(!body.description || typeof body.description !== 'string') {
            throw new Error('Description is required')
        }
        if(!body.types || !Array.isArray(body.types)) {
            throw new Error('Types are required')
        }
        body.types.forEach((type: string) => {
            if(!Object.values(PokemonTypeEnum).includes(type as PokemonTypeEnum)) {
                throw new Error(`Type ${type} doesn\'t exist`)
            }
        })

        // Create pokemon
        const createPokemonDto: CreatePokemonDto = {
            name: body.name,
            description: body.description,
            types: body.types,
        }
        const pokemons = await createPokemon(createPokemonDto, pokemonGateway(body.image))
        res.send(JSON.stringify(pokemons))
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


