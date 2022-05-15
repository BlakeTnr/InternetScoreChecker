const consoleFlags = require('./consoleFlags')
const index = require('./index')

class TeamClients {
    teamNumber: Number
    teamSchema: Array<String>

    constructor(teamNumber, teamSchema) {
        this.teamNumber = teamNumber
        this.teamSchema = teamSchema
    }

    // Returns nulls in spaces where box couldn't be found
    getTeamClients(allClients) {
        var teamClients = []
        for(const box of this.teamSchema) {
            const ip = consoleFlags.convertXtoNum(box, this.teamNumber)
            const client = index.getClientByIP(ip)
            teamClients.push(client)
        }
        return teamClients
    }

    teamHasIP(ip) {
        const teamClients = this.getTeamClients()
        for(const client of teamClients) {
            if(client.ip == ip) {
                return true
            }
        }
        return false
    }
}

class Team {
    constructor(teamNumber, teamClients : TeamClients) {
        this.teamNumber = teamNumber
        this.teamSchema = teamSchema
        this.clients = clients
    }

    getScore = function() {
        for(const box of teamSchema) {
            const ip = consoleFlags.convertXtoNum(box)
            const containsIP = clientsContainsIP(clients, ip)
            if(!containsIP) {
                return false
            }
        }
        return true
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