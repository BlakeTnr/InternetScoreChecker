package main

import (
	"fmt"
	"net/http"
	"strconv"
)

func runInternetCheck(numberOfChecks int, checksNeededToPass int) bool {
	score := getScore(numberOfChecks)
	return score >= checksNeededToPass
}

func getScore(numberOfChecks int) int {
	var score int
	for i := 0; i < numberOfChecks; i++ {
		domain := getWebsiteByIndex(i)
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
