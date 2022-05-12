import json
import time
inputListLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\GO\\InternetScoreChecker\\Client\\top2000.json"

def main():
    inputListFile = open(inputListLocation, "r")
    
    inputJson = json.loads(inputListFile.readline())
    topSites = inputJson["top_sites"]

    whitelistedSites = []
    for site in topSites:
        print(site["domain"] + " : " + str(site["rank"]))
        response = input("Keep this site? [Y] (D if done): ")

        if(response.lower() == "y" or response.lower() == ""):
            whitelistedSites.append(site)
            print("Added\n")
            continue

        if(response.lower() == "n"):
            print("Ignored\n")
            continue
        
        if(response.lower() == "d"):
            break
        

    inputListFile.close()
    outputFile = open("outputLocation.txt", "w+")
    json.dump(whitelistedSites, outputFile)
    outputFile.close
    print("Done!")

main()