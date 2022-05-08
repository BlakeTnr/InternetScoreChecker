package main

import (
	"encoding/json"
	"fmt"
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

// Starts at 0, Max is 999
func getWebsiteByRanking(number int) interface{} {
	// Add error handling?

	byteValue := readWebsiteData("./top1000websites.json")

	var result map[string][]map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)

	sitesArray := result["top_sites"]
	site := sitesArray[number]["domain"]
	fmt.Println(site) // Debug line
	return site
}
