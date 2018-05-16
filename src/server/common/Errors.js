export class NotFoundError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, NotFoundError)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}