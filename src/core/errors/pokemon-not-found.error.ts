export class PokemonNotFoundError extends Error {
    constructor() {
        super('Pokemon not found')
    }
}