const userService = require('../service/userService')

class UserController {
    async registration(req, res, next) {
        try {
            const { nickName, email, password, language, role } = req.body
            const userData = await userService.registration(nickName, email, password, language, role)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30, 
                httpOnly: true,
                secure: true
            })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30, 
                httpOnly: true,
                secure: true
            })
            return res.json(userData)
        } catch(err) {
            next(err)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch(err) {
            next(err)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (err) {
            next(err)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30, 
                httpOnly: true,
                secure: true
            })
            return res.json(userData)
        } catch(err) {
            next(err)
        }
    }

    async sendMail(req, res, next) {
        try {
            const {userId} = req.params
            await userService.sendMail(userId)
            return res.status(200)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new UserController()