export var clients = []

export class Client {
    remoteAddress: String
    lastCheckTime: number
    checkSum: number

    constructor(remoteAddress, lastCheckTime) {
        this.remoteAddress = remoteAddress
        this.lastCheckTime = lastCheckTime
        this.checkSum = 0;
        clients.push(this)
    }

    updateLastCheckTime = function() {
        this.lastCheckTime = Math.floor(new Date().getTime()/1000)
        this.checkSum += 1;
    }
}

export function getClientByRemoteAddress(remoteAddress) {
    for(const client of clients) {
        if(client.remoteAddress == remoteAddress) {
            return client
        }
    }
    return null
}

export function getClientByIP(ip) {
    for(const client of clients) {
        const clientIP = remoteAddressToIPV4Address(client.remoteAddress)
        if(clientIP == ip) {
            return client;
        }
    }
    return null
}

export function remoteAddressToIPV4Address(remoteAddress) {
    try {
        // Regex = \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
        const regex = "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b"
        const ipv4Address = remoteAddress.match(regex)[0]
        return ipv4Address
    } catch {
        return null
    }
}