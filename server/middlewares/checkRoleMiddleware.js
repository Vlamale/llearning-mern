const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')


module.exports = function (role) {
    try {
        return function (req, res, next) {
            if (req.method === 'OPTIONS') {
                next()
            }
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                throw ApiError.unauthorized()
            }
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            if (role !== decoded.role) {
                throw ApiError.noAccess()
            }
            req.user = decoded
            next()
        }
    } catch (err) {
        throw ApiError.unauthorized()
    }
}