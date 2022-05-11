import json

inputListLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\Go\\InternetScoreChecker\\Client\\top2000.json"
blockListLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\Go\\InternetScoreChecker\\Tools\\Blocklists\\adult\\domains"

def main():
    inputListFile = open(inputListLocation, "r")
    blockListFile = open(blockListLocation, "r")
    
    inputJson = json.loads(inputListFile.readline())
    topSites = inputJson["top_sites"]

    for blockedDomain in blockListFile:
        for site in topSites:
            domain = site["domain"]
            if(domain == blockedDomain.strip()):
                print(domain + " has been removed")
                topSites.remove(site)

    print(topSites)

    inputListFile.close()
    blockListFile.close()

main()