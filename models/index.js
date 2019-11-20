//done

const Sequelize = require('sequelize') //importing sequelize node modules
const allConfigs = require('../config/sequelize') //importing env variables needed to set up DB connection
const TeamsModel = require('./teams') //importing function that defines a table for 'teams'


//drilling down to the development_db config (username, pw, db)
const config = allConfigs['development']

//creates connection to database using the sequelize.js file
const connection = new Sequelize(config.database, config.username, config.password, {

    host: config.host,
    dialect: config.dialect
})
connection.authenticate()

//exports an instance of the TeamsModel

const Teams = TeamsModel(connection, Sequelize)


module.exports = {
    //export for WEB APP Teams
    Teams,
    
}