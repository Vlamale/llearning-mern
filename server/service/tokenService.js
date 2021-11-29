const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '24h' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' })
        if (!accessToken || !refreshToken) {
            return null
        }
        return { accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ userId, refreshToken })
        return token
    }

    async removeToken(refreshToken) {
        const token = await Token.deleteOne({refreshToken})
        return token
    }

    verifyAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            return userData
        } catch (err) {
            return null
        }
    }

    verifyRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
            return userData
        } catch (err) {
            return null
        }
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ refreshToken })
        return tokenData
    }
}

module.exports = new TokenService()