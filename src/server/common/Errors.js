export class NotFoundError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, NotFoundError)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

export class TimeoutError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, TimeoutError)
        Object.setPrototypeOf(this, TimeoutError.prototype)
    }
}