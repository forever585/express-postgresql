const bcrypt = require('bcryptjs')

const BcryptService = () => {
    const password = user => {
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(user.password, salt)
        return hash
    }

    const comparePassword = (password, hash) => {
        bcrypt.compare(password, hash)
    }

    return {
        password,
        comparePassword
    }
}

module.exports = BcryptService