package main

import (
	"math/rand"
	"time"
)

func listContainsInt(element int, list []int) bool {
	var present bool
	for i := 0; i < len(list); i++ {
		if list[i] == element {
			present = true
			break
		}
	}
	return present
}

func getRandomDiffNubmers(numberOfInts int, randomRange int) []int {
	var list []int

	for {
		rand.Seed(time.Now().UnixNano())
		var random = rand.Intn(randomRange)
		if(listContainsInt(random, list)) {
			continue
		}
		list = append(list, random)
		
		if len(list) >= numberOfInts {
			break
		}
	}

	return list
}