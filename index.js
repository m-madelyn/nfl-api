const express = require('express')
const app = express()
const teams = require('./teams.json')
const bodyParser = require('body-parser')

app.get('/teams', (req, res) => {
    res.send(teams)
})

app.get('/teams/:filter', (req, res) => {
    let specificTeam = teams.filter((team) => {
        return team.id == req.params.filter || team.abbreviation === req.params.filter
    })

    res.send(specificTeam)
})

app.post('/teams', bodyParser.json(), (req, res) => {
    const body = req.body

    if (!body.id || !body.location || !body.mascot || !body.abbreviation || !body.conference || !body.division) {
        res.status(400).send('The following attributes are required: id, location, mascot, abbreviation, conference, division')
    } else {

        teams.push(body)
        console.log({
            body
        })
        res.status(201).send(body)
    }
})

app.all('*', (req, res) => {
    res.send('You got nothin: Try again!')
})

app.listen(3000, () => {
    console.log('SUCCESS!')
})