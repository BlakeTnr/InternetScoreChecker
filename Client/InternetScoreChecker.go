package main

import (
	"fmt"
)

func main() {
	const numberOfWebsitesToCheck, passCheckThreshhold int = 3, 2
	result := runInternetCheck(numberOfWebsitesToCheck, passCheckThreshhold)
	fmt.Println(result)
}
