// slide 60 - create a new teams database to use in place of the teams.json file

const express = require('express')
const app = express()
//I don't need this anymore
const teams = require('./teams.json')
const bodyParser = require('body-parser')

const models = require('./models')


app.get('/teams', (req, res) => {
    //use the TeamsModel here with the findAll() function (slide 56)
    res.send()
})

app.get('/teams/:filter', (req, res) => {
    //JR's code sni ppet - he will help with this later
    const match = await models.Teams.findOne({
        where: { [Op.or]: [{ id: identifier }, { abbreviation: identifier }] }
      })
    //use the TeamsModel here with the findOne() function (slide 57)
    let rpf = req.params.filter
    let specificTeam = teams.filter((team) => {
        
        return team.id == rpf || team.abbreviation === rpf || team.division == rpf
    })
//return only 
    res.send(specificTeam)
})

app.post('/teams', bodyParser.json(), (req, res) => {
    //use the TeamsModel here (slide 58)
    const body = req.body

    if (!body.id || !body.location || !body.mascot || !body.abbreviation || !body.conference || !body.division) {
        res.status(400).send('The following attributes are required: id, location, mascot, abbreviation, conference, division')
    } else {

        let newTeams = teams.concat(body)
        console.log({
            newTeams
        })
        res.status(201).send(newTeams)
    }
})

app.all('*', (req, res) => {
    res.send('You got nothin: Try again!')
})

app.listen(3000, () => {
    console.log('SUCCESS!')
})