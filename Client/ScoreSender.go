package main

import (
	"fmt"
	"net/http"
)

func IPToURL(ip string) string {
	return "http://" + ip + "/"
}

func reportScore(internetScoringServer string) {
	_, err := http.Get(IPToURL(internetScoringServer))
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("No InternetScoringServer connection error")
	}
}
