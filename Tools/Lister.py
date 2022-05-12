import json
import time
inputListLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\GO\\InternetScoreChecker\\Client\\top2000.json"

def main():
    inputListFile = open(inputListLocation, "r")
    
    inputJson = json.loads(inputListFile.readline())
    topSites = inputJson["top_sites"]

    for site in topSites:
        print(site["domain"] + " : " + str(site["rank"]))
        time.sleep(0.5)

    inputListFile.close()

main()