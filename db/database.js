const sequelize = require('sequelize')
const path = require('path')

const connection = require('./connection')

let database

switch (process.env.NODE_ENV) {
    case 'production':
        database = new sequelize(
            connection.production.database,
            connection.production.username,
            connection.production.password,{
                host: connection.production.host,
                dialect: connection.production.dialect,
                pool:{
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            }
        )
        break;
    default:
        database = new sequelize(
            connection.development.database,
            connection.development.username,
            connection.development.password,{
                host: connection.development.host,
                dialect: connection.development.dialect,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                },
            },
        )
        break;
}

module.exports = database