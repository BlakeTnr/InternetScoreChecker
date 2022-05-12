package main

import "fmt"

const internetScoringServer = "localhost"

func main() {
	const numberOfWebsitesToCheck, passCheckThreshhold int = 3, 2
	result := runInternetCheck(numberOfWebsitesToCheck, passCheckThreshhold)
	if result {
		fmt.Println("Final result: Passed")
		reportScore(internetScoringServer)
	} else {
		fmt.Println("Final result: Failed")
	}
}
