import { convertXtoNum, getTeamsAmount } from './consoleFlags'
import { getClientByIP, Client } from './index'

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
            if(teamClients == null) {
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

    getScore(allClients) {
        return this.hasAllSchemaClients(allClients)
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
    console.log(teamsAmount)
    for(var teamNum=1; teamNum<(teamsAmount+1); teamNum++) { // +1 to offset starting at team 1
        console.log(teamsAmount+1)
        const team = new Team(teamNum, teamSchema)
        const score = team.getScore(clients);
        const teamRoundResult = new TeamRoundResult(team, score)
        teamsScores.push(teamRoundResult)
    }
    return teamsScores
}