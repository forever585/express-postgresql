const development = {
    database: 'postgres',
    username: 'postgres',
    password: '1634',
    host: 'localhost',
    dialect: 'postgresql'
}

const production = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgresql'
}

module.exports = {
    development,
    production
}