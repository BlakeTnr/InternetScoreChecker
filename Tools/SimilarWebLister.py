import json
from multiprocessing.connection import Connection
import requests
from ping3 import ping
import time
inputListLocation = "C:\\Users\\Blake\\Desktop\\Files\\Programming\\Projects\\Learning\\GO\\InternetScoreChecker\\Client\\top2000.json"

def main():
    delay = float(input("Delay: "))
    inputListFile = open(inputListLocation, "r")
    
    inputJson = json.loads(inputListFile.readline())
    topSites = inputJson["top_sites"]

    for site in topSites:
        print(site["domain"])
        time.sleep(delay)

    inputListFile.close()

main()