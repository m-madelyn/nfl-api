
const express = require('express')
const app = express()
const teams = require('./teams.json')

app.get('/teams', (req, res) => {
    res.send(teams)
})

app.get('/teams/:filter', (req, res) => {
    let specificTeam = teams.filter((team) => {
        return team.id == req.params.filter || team.abbreviation === req.params.filter
    })

    res.send(specificTeam)
})

app.all('*', (req, res) => {
    res.send('You got nothin: Try again!')
})

app.listen(3000, () => {
    console.log('SUCCESS!')
})