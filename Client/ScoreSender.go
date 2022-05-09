package main

import (
	"net/http"
)

func IPToURL(ip string) string {
	return "http://" + ip + "/"
}

func reportScore(internetScoringServer string) {
	http.Get(IPToURL(internetScoringServer))
}
