const express = require('express')
const consoleFlags = require("./consoleFlags")
const app = express()
const port = 80
const teams = consoleFlags.teamsEnabled()

var clients = []

function getClientIPV4Address(req) {
    try {
        const remoteAddress = req.socket.remoteAddress
        // Regex = \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
        const regex = "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b"
        const ipv4Address = remoteAddress.match(regex)[0]
        return ipv4Address
    } catch {
        return null
    }
}

class Client {
    constructor(ip, lastCheckTime) {
        this.ip = ip
        this.lastCheckTime = lastCheckTime
        this.checkSum = 0;
        clients.push(this)
    }

    updateLastCheckTime = function() {
        this.lastCheckTime = Math.floor(new Date().getTime()/1000)
        this.checkSum += 1;
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

// IP is used to know if it exists or not
function getExistingClient(ip) {
    for(let i=0; i<clients.length; i++) {
        if(ip == clients[i].ip) {
            return clients[i];
        }
    }
    return null
}

app.get('/', (req, res) => {
    /*
    const client = new Client(getClientIPV4Address(req), null)
    client.updateLastCheckTime()
    updateCheck(client)
    res.send(client)
    */
    const ip = getClientIPV4Address(req)
    var client = getExistingClient(ip)
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

class Team {
    constructor(teamNumber) {
        this.teamNumber = teamNumber
    }

    updateLastCheckTime = function() {
        this.lastCheckTime = Math.floor(new Date().getTime()/1000)
        this.checkSum += 1;
    }
}

function getTeamsScores(clients, teamSchema, teamsAmount) {
    var teamsScores = []
    for(team=1; team<teamsAmount+1; team++) { // +1 to offset starting at team 1
        const result = getTeamScore(clients, teamSchema, team);
        var team = new Team(team)
        team.score = result
        teamsScores.push(team)
    }
    return teamsScores
}

function getTeamScore(clients, teamSchema, teamNumber) {
    for(const box of teamSchema) {
        console.log(box)
        const ip = consoleFlags.convertXtoNum(box, teamNumber)
        console.log(ip)
        const containsIP = clientsContainsIP(clients, ip)
        console.log(containsIP)
        if(!containsIP) {
            return false
        }
    }
    return true
}

function clientsContainsIP(clients, ip) {
    for(const client of clients) {
        if(client.ip == ip) {
            return true
        }
    }
    return false
}

app.set('trust proxy', true)

app.listen(port, () => {
    console.log(`InternetScoreTracker server running on port ${port}`)
})