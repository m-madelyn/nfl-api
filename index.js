const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const models = require('./models')
const Op = require('sequelize').Op //sequelize operators


app.get('/teams', async (req, res) => {
    const teams = await models.Teams.findAll()
    res.send(teams)
})

app.get('/teams/:identifier', async (req, res) => {
    const {
        identifier
    } = req.params
    const match = await models.Teams.findOne({
        where: {
            [Op.or]: [{
                id: identifier
            }, {
                abbreviation: identifier
            }, {
                division: identifier
            }]
        }
    })

    if (match) {
        res.send(match)
    } else {
        res.status(404).send('The following attributes are required: id, abbreviation, division')
    }

})

app.post('/teams', bodyParser.json(), async (req, res) => {
    const { id, location, slug, mascot, abbreviation, conference, division } = req.body

    if (!id || !location || !mascot || !abbreviation || !conference || !division) {
        res.status(400).send('The following attributes are required: id, location, mascot, abbreviation, conference, division')
    } 
    
    models.Teams.findOne({where: {mascot}}).then((team) => {
        if (!team) {
            res.status(400).send(`Unknown team slug: ${mascot}`)
    } else {
        models.Teams.create({location, slug, mascot, abbreviation, conference, division}).then((newTeam) => {
        res.status(201).send(newTeam)
        console.log({newTeam})
        })
    }
})
})

app.all('*', (req, res) => {
    res.send('You got nothin: Try again!')
})

app.listen(3000, () => {
    console.log('SUCCESS!')
})