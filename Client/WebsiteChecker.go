package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

func runInternetCheck(numberOfChecks int, checksNeededToPass int, datasetRange int) bool {
	score := getScore(numberOfChecks, datasetRange)
	return score >= checksNeededToPass
}

func runChecks() { // Add run checks script to seperate getSocer. Have this return a object of the domain and ifSuccessful.
	
}

func getScore(numberOfChecks int, datasetRange int) int {
	rand.Seed(time.Now().UnixNano())
	var score int
	var randomNumbers = getRandomDiffNubmers(numberOfChecks, datasetRange)
	for i := 0; i < numberOfChecks; i++ {
		randomIndex := randomNumbers[i]
		fmt.Println(randomIndex)
		domain := getWebsiteByIndex(randomIndex)
		result := canReachWebsite(domainToUrl(domain))
		if result {
			fmt.Println(domain + " " + "Passed")
			score++
		} else {
			fmt.Println(domain + " " + "Failed")
		}
	}
	fmt.Println("Score: " + strconv.FormatInt(int64(score), 10))
	return score
}

func domainToUrl(domain string) string {
	url := "https://www." + domain + "/"
	return url
}

func canReachWebsite(url string) bool {
	response, err := http.Get(url)
	if err != nil {
		return false
	}
	defer response.Body.Close()
	return true
}
