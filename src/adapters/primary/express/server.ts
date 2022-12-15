import { app } from './app';
import { PokemonNotFoundError } from './../../../core/errors/pokemon-not-found.error';

const port = 3001

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})