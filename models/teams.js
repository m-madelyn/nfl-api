const Sequelize = require('sequelize')

module.exports = (connection) => {
    return connection.define('teams', {
        id: {
            type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true,
        },
        //are commas needed when there is only one item?
        location: { type: Sequelize.STRING, },
        mascot: { type: Sequelize.STRING, },
        abbreviation: { type: Sequelize.STRING, unique: true },
        conference: { type: Sequelize.STRING, },
        division: { type: Sequelize.STRING, },
    })

}

