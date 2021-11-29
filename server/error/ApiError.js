module.exports = class ApiError extends Error {
    status
    errors
    message

    constructor (status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
        this.message = message
    }

    static badRequest (message, errors = []) {
        return new ApiError(404, message, errors)
    }

    static internal (message) {
        return new ApiError(500, message)
    }

    static unauthorized () {
        return new ApiError(401, 'Пользователь не авторизован!')
    }

    static noAccess () {
        return new ApiError(403, 'Нет доступа!')
    }
}