export var clients = []

export class Client {
    ip: String
    lastCheckTime: number
    checkSum: number

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

export function getClientByIP(ip) {
    for(const client of clients) {
        if(client.ip == ip) {
            return client
        }
    }
    return null
}