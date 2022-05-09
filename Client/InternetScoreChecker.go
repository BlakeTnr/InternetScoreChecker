package main

const internetScoringServer = "localhost"

func main() {
	const numberOfWebsitesToCheck, passCheckThreshhold int = 3, 2
	result := runInternetCheck(numberOfWebsitesToCheck, passCheckThreshhold)
	if result {
		reportScore(internetScoringServer)
	}
}
