class UserDto {
    static tokenData (userData) {
        return {
            nickName: userData.nickName,
            email: userData.email,
            language: userData.language,
            role: userData.role,
            _id: userData._id,
            isActivated: userData.isActivated
        }
    }
}

module.exports = UserDto