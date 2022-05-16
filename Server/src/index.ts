const express = require('express')
const consoleFlags = require("./consoleFlags")
const app = express()
const port = 80
const teams = consoleFlags.teamsEnabled()
import { getTeamsScores } from "./teams"
import { Client, clients, getClientByIP } from './client'

function remoteAddressToIPV4Address(remoteAddress) {
    try {
        // Regex = \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
        const regex = "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b"
        const ipv4Address = remoteAddress.match(regex)[0]
        return ipv4Address
    } catch {
        return null
    }
}

function updateCheck(client) {
    for(var i=0; i<clients.length; i++) {
        if(clients[i].ip == client.ip) {
            clients.splice(i, 1)
        }
    }
    clients.push(client)
}

app.get('/', (req, res) => {
    /*
    const client = new Client(getClientIPV4Address(req), null)
    client.updateLastCheckTime()
    updateCheck(client)
    res.send(client)
    */
    const ip = remoteAddressToIPV4Address(req.socket.requestAddress)
    var client = getClientByIP(ip)
    if(client != null) {
        client.updateLastCheckTime()
        console.log("Updated " + ip)
        res.send("Updated " + ip)
    } else {
        client = new Client(ip, null) // on new client add to clients
        client.updateLastCheckTime()
        console.log("Created " + ip)
        res.send("Created " + ip)
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