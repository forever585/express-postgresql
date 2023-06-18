const Sequelize = require('sequelize')
const bcryptService = require('../services/BcryptService')

const sequelize = require('../db/database')

const hooks = {
    beforeCreate(user) {
        user.password = bcryptService().password(user)
    }
}

const tableName = 'users'

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncreament: true,
        field: 'id'
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        field: 'username'
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        field: 'email',
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        field: 'isVerified'
    }
}, { hooks, tableName })


User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.password
    return values
}

module.exports = { User }