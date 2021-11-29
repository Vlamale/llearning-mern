const bcrypt = require('bcrypt')
const uuid = require('uuid')
const ApiError = require('../error/ApiError')
const User = require("../models/User")
const mailService = require('../service/mailService')
const tokenService = require('../service/tokenService')
const UserDto = require('../dtos/userDto')

class UserService {

    async registration(nickName, email, password, language, role) {
            const candidate = await User.findOne({ email })

            if (!email || !password) {
                throw ApiError.badRequest('Не заполнены обязательные поля!')
            }
            if (candidate) {
                throw ApiError.badRequest('Пользователь с таким email уже существует!')
            }
            const hashPassword = await bcrypt.hash(password, 3)
            const activationLink = uuid.v4()
            const user = await User.create({
                nickName,
                email,
                password: hashPassword,
                language,
                role,
                activationLink
            })
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
            
            const userDto = UserDto.tokenData(user)
            
            const tokens = tokenService.generateToken(userDto)
            if (!tokens) {
                await User.deleteOne(email)
                throw ApiError.internal('Непредвиденная ошибка!')
            }
            await tokenService.saveToken(userDto._id, tokens.refreshToken)

            return { ...tokens, user: userDto }
    }

    async login(email, password) {
        if (!email || !password) {
            throw ApiError.badRequest('Введите email и пароль!')
        }

        const user = await User.findOne({email})
        if (!user) {
            throw ApiError.badRequest('Пользователя с таким email не существует!')
        }

        const isPassEqual = await bcrypt.compare(password, user.password)

        if (!isPassEqual) {
            throw ApiError.badRequest('Неверный пароль!')
        }

        const userDto = UserDto.tokenData(user)
        const tokens = tokenService.generateToken(userDto)
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async activate (activationLink) {
        const user = await User.findOne({activationLink})
        if (!user) {
            throw ApiError.badRequest('Некоректная ссылка активации!')
        }
        user.isActivated = true
        await user.save()
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized()
        }
        const oldTokenData = tokenService.verifyRefreshToken(refreshToken)
        const tokenFronDb = await tokenService.findToken(refreshToken)
        if (!oldTokenData || !tokenFronDb) {
            throw ApiError.unauthorized()
        }
        const user = await User.findOne({_id: oldTokenData._id})
        const userDto = UserDto.tokenData(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(user._id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async sendMail(userId) {
        const user = await User.findById(userId)
        const activationLink = uuid.v4()
        await mailService.sendActivationMail(user.email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
    }
}

module.exports = new UserService()