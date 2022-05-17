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

    getLowestCheckTime(teamClients) { // Not finished
        const currentTime = Math.floor(new Date().getTime()/1000)
        var lowestCheckTime = currentTime
        for(const client of teamClients) {
            if(client.lastCheckTime < lowestCheckTime) {
                lowestCheckTime = client.lastCheckTime
            }
        }
        return lowestCheckTime
    }
}

class TeamRoundResult {
    team: Team
    lowestCheckTime: number
    
    constructor(team, lowestCheckTime) {
        this.team = team
        this.lowestCheckTime = lowestCheckTime
    }
}

export function getTeamsScores(clients, teamSchema, teamsAmount: number) {
    var teamsScores = []
    for(var teamNum=1; teamNum<(teamsAmount+1); teamNum++) { // +1 to offset starting at team 1
        const team = new Team(teamNum, teamSchema)

        if(!team.hasAllSchemaClients(clients)) {
            const teamRoundResult = new TeamRoundResult(team, null)
            teamsScores.push(teamRoundResult)
        } else {
            const teamClients = team.getTeamClients(clients)
            const lowestCheckTime = team.getLowestCheckTime(teamClients)
            const teamRoundResult = new TeamRoundResult(team, lowestCheckTime)
            teamsScores.push(teamRoundResult)
        }
    }
    return teamsScores
}