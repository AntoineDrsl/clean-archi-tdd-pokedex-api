export class PokemonNotFoundError extends Error {
    code: number = 404

    constructor() {
        super('Pokemon not found')
    }
}