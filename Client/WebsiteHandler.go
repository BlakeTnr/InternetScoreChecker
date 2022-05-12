package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func readWebsiteData(fileLocation string) []byte {
	data, err := os.Open(fileLocation)
	check(err)
	defer data.Close()

	byteValue, _ := ioutil.ReadAll(data)
	return byteValue
}

func getWebsiteByIndex(number int) string {
	// Add error handling?

	byteValue := readWebsiteData("./manuallyReviewed.json")

	var result []map[string]string
	json.Unmarshal([]byte(byteValue), &result)

	sitesArray := result[number]
	site := sitesArray["domain"]
	return site
}
