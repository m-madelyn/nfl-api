const express = require('express')
//creating an instance of an express app
const app = express()
//imports read only data file
const teams = require('./teams.json')
//takes string and turns it into json
const bodyParser = require('body-parser')

//any request that matches the path
app.get('/teams', (req, res) => {
    res.send(teams)
})

app.get('/teams/:filter', (req, res) => {
    let rpf = req.params.filter
    let specificTeam = teams.filter((team) => {
        
        return team.id == rpf || team.abbreviation === rpf || team.division == rpf
    })
//return only 
    res.send(specificTeam)
})

app.post('/teams', bodyParser.json(), (req, res) => {
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