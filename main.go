package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"my-portfolio/Backend/handlers"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Serve all files in current directory
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	// Register contact handler
	http.HandleFunc("/contact", handlers.ContactHandler)

	fmt.Println("Portfolio server running at http://localhost:3000")
	fmt.Println("Your website is now live with full CSS styling!")
	log.Fatal(http.ListenAndServe(":3000", nil))
}