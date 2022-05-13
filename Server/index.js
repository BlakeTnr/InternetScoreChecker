const express = require('express')
const app = express()
const port = 80

var clients = []

function getClientIPV4Address(req) {
    try {
        const remoteAddress = req.socket.remoteAddress
        // Regex = \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
        const regex = "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b"
        console.log(regex)
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
    const ip = req.socket.remoteAddrss
    var client = getExistingClient(ip)
    if(client != null) {
        client.updateLastCheckTime()
        res.send("Already exists")
    } else {
        client = new Client(getClientIPV4Address(req), null) // on new client add to clients
        client.updateLastCheckTime()
        res.send("Creating")
    }
})

app.get('/scores', (req, res) => {
    // Ask Vasu what format he format makes scores easiest for him to read
    res.send(clients)
})

app.set('trust proxy', true)

app.listen(port, () => {
    console.log(`InternetScoreTracker server running on port ${port}`)
})