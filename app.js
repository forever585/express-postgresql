//Third Party Libraries
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const http = require('http')
const mapRoutes = require('express-routes-mapper')

//Server Configuration
const config = require('./config')
const auth = require('./auth/policies')
const dbService = require('./services/DBService')
const DBService = require('./services/DBService')
const { assignWith } = require('lodash')

//Environment
const env = process.env.NODE_ENV

//Application
const app = express()
const server = http.Server(app)
const mappedGuestRoutes = mapRoutes(config.guestRoutes, 'controllers/')
const db = DBService(env, config.migrate).start()

//Allow Cross Orign Requests
app.use(cors())

//Secure App
app.use(helmet({
    dnsPrefethControl: false,
    frameguard: false,
    ieNoOpen: false
}))

//Parsing Request Body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all('/user/*', (req, res, next) => auth(req, res, next))
app.all('/admin/*', (req, res, next) => auth(req, res, next))

app.use('/', mappedGuestRoutes)

server.listen(config.port, () => {
    if( env !== 'production' && env !== 'development'){
        console.error(`NODE_ENV is set to ${env}, but this only can be `)
        process.exit(1)
    }
    return db
})