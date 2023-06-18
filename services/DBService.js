const database = require('../db/database')

const DBService = ( env, migrate) => {
    const authDB = () => database.authenticate()
    const dropDB = () => database.drop()
    const syncDB = () => database.sync()

    const successDBStart = () => {
        console.info('Database connection successfully established')
    }

    const errorDBStart = (err) => {
        console.log('Unable to connect database: ', err)
    }

    const wrongEnv = () => {
        console.warn(`NODE_ENV can be only "development" or "production"`)
        return process.exit(1)
    }

    const startMigrateTrue = async () => {
        try {
            await syncDB()
            successDBStart()
        } catch (err){
            errorDBStart(err)
        }
    }

    const startMigrateFalse = async () => {
        try {
            await dropDB()
            await syncDB()
            successDBStart()
        }catch(err){
            errorDBStart(err)
        }
    }

    const startDev = async () => {
        try{
            await authDB();
            if(migrate) return startMigrateTrue()
            return startMigrateFalse()
        } catch (err){
            return errorDBStart(err)
        }
    }

    const startStage = async () => {
        try{
            await authDB()
            if(migrate) return startMigrateTrue()
            return startMigrateFalse()
        }catch (err){
            return errorDBStart(err)
        }
    }

    const startProd = async () => {
        try{
            await authDB()
            await startMigrateFalse()
        } catch (err){
            errorDBStart(err)
        }
    }

    const start = async () => {
        switch (env) {
            case 'development':
                await startDev()
                break
            case 'production':
                await startProd()
                break
            default:
                await wrongEnv()
        }
    }

    return {
        start
    }
}

module.exports = DBService