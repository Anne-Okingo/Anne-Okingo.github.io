package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Serve all files in current directory
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	fmt.Println("Portfolio server running at http://localhost:3000")
	fmt.Println("Your website is now live with full CSS styling!")
	log.Fatal(http.ListenAndServe(":3000", nil))
}