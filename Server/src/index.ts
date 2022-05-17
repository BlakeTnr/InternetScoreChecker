const express = require('express')
const consoleFlags = require("./consoleFlags")
const app = express()
const port = 80
const teams = consoleFlags.teamsEnabled()
import { getTeamsScores } from "./teams"
import { Client, clients, getClientByIP, getClientByRemoteAddress, remoteAddressToIPV4Address } from './client'

app.get('/', (req, res) => {
    const address = req.socket.remoteAddress
    var client = getClientByRemoteAddress(address)
    if(client != null) {
        client.updateLastCheckTime()
        console.log("Updated " + address)
        res.send("Updated " + address)
    } else {
        client = new Client(address, null) // on new client add to clients
        client.updateLastCheckTime()
        console.log("Created " + address)
        res.send("Created " + address)
    }
})

app.get('/rawscores', (req, res) => {
    // Ask Vasu what format he format makes scores easiest for him to read
    res.send(clients)
})

app.get('/teamscores', (req, res) => {
    if(!teams) {
        res.send("Teams not enabled!")
        return
    }
    
    res.send(getTeamsScores(clients, consoleFlags.handleTeamsFlag(), consoleFlags.getTeamsAmount()))
})

app.set('trust proxy', true)

app.listen(port, () => {
    console.log(`InternetScoreTracker server running on port ${port}`)
})