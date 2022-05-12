import json
from multiprocessing.connection import Connection
import requests
from ping3 import ping
inputListLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\GO\\InternetScoreChecker\\Client\\top2000.json"

badSites = []
def check(site):
    print(site["domain"] + ": " + str(site["rank"]))
    r = ping(site["domain"])

    if r == False:
        print("Bad site detected: " + site["domain"])
        global badSites
        badSites.append(site)

def main():
    inputListFile = open(inputListLocation, "r")
    
    inputJson = json.loads(inputListFile.readline())
    topSites = inputJson["top_sites"]

    for site in topSites:
        check(site)

    global badSites
    for badSite in badSites:
        topSites.remove(badSite)
    

    print(topSites)
    outputFile = open("outputLocation.txt", "w+")
    json.dump(topSites, outputFile)
    outputFile.close

    inputListFile.close()

main()