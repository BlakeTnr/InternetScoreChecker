// Console flags is bad system, use config instead

/*
Example usage:
nodemon index.js teams=10.x.1.2,10.x.1.1 teamsamount=2
*/
// This returns an array with values like 10.x.1.1 & 10.x.1.2
// returns null if not found
export function handleTeamsFlag() {
    const args = process.argv.slice(2)
    
    for(const arg of args) {
        if(arg.toLowerCase().startsWith("teams=")) {
            const argParsed = arg.replace("teams=", "")
            const argArray = argParsed.split(",")
            return argArray
        }
    }
    return null
}

export function getTeamsAmount() {
    const args = process.argv.slice(2)
    
    for(const arg of args) {
        if(arg.toLowerCase().startsWith("teamsamount=")) {
            const argParsed = arg.toLowerCase().replace("teamsamount=", "") //replace with regex
            return argParsed
        }
    }
    return null
}

export function teamsEnabled() {
    try {
        return handleTeamsFlag().length != 0
    } catch(Error) {
        return false
    }
}

export function convertXtoNum(ip, number) {
    return ip.replace("x", number)
}