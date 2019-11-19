
//need to install sequelize
const Sequelize = require('sequelize')

const allConfigs = require('../config/sequelize')
const TeamsModel = require('./teams')//equivelent to writing all SQL code

//drilling down to the development/db configuration (username, pw, db)
const config = allConfigs['development']
//creates connection to database using the sequelize.js file

const connection = new Sequelize(config.database, config.username, config.password, {
 //why is this separate from the rest?
  host: config.host,
  dialect: config.dialect,
})  
connection.authenticate()

// exports an instance of the team model
//do we need Sequelize in both places? (ie, teams.js and Teams variable)
const Teams = TeamsModel (connection, Sequelize)

module.exports = {
    Teams,
}

