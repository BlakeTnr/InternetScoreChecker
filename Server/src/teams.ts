import { convertXtoNum, getTeamsAmount } from './consoleFlags'
import { Client, getClientByIP } from './client'

class Team {
    teamNumber: number
    teamSchema: Array<String>

    constructor(teamNumber, teamSchema) {
        this.teamNumber = teamNumber
        this.teamSchema = teamSchema
    }

    // Gets all clients, if client couldn't be found it is pushed as null to the returned array
    getTeamClients(allClients) {
        var teamClients = []
        for(const box of this.teamSchema) {
            const ip = convertXtoNum(box, this.teamNumber)
            const client = getClientByIP(ip)
            teamClients.push(client)
        }
        return teamClients
    }

    hasAllSchemaClients(allClients) {
        const teamClients = this.getTeamClients(allClients)
        for(const client of teamClients) {
            if(client == null) {
                return false
            }
        }
        return true
    }

    teamHasIP(ip, allClients): boolean {
        const teamClients = this.getTeamClients(allClients)
        for(const client of teamClients) {
            if(client.ip == ip) {
                return true
            }
        }
        return false
    }

    getLowestChecksumTime(teamClients) { // Not finished
        for(const client of teamClients) {
            client.
        }
    }

    getScore(allClients) {
        if(!this.hasAllSchemaClients(allClients)) {
            return false
        }

        
    }
}

class TeamRoundResult {
    team: Team
    score: boolean
    
    constructor(team, score) {
        this.team = team
        this.score = score
    }
}

export function getTeamsScores(clients, teamSchema, teamsAmount: number) {
    var teamsScores = []
    for(var teamNum=1; teamNum<(teamsAmount+1); teamNum++) { // +1 to offset starting at team 1
        const team = new Team(teamNum, teamSchema)
        const score = team.getScore(clients);
        const teamRoundResult = new TeamRoundResult(team, score)
        teamsScores.push(teamRoundResult)
    }
    return teamsScores
}