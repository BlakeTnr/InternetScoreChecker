package main

import "fmt"

const internetScoringServer = "localhost"
const datasetRange = 35

func main() {
	const numberOfWebsitesToCheck, passCheckThreshhold int = 3, 2
	result := runInternetCheck(numberOfWebsitesToCheck, passCheckThreshhold, datasetRange)
	if result {
		fmt.Println("Final result: Passed")
		reportScore(internetScoringServer)
	} else {
		fmt.Println("Final result: Failed")
	}
}
