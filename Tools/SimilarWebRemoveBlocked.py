import json

inputListLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\GO\\InternetScoreChecker\\Client\\top2000.json"
blockListLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\GO\\InternetScoreChecker\\Tools\\Blocklists\\adult\\domains"
outputLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\GO\\InternetScoreChecker\\Tools\\Blocklists\\adult\\"

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
    outputFile = open("outputLocation.txt", "w+")
    json.dump(topSites, outputFile)
    outputFile.close

    inputListFile.close()
    blockListFile.close()

main()