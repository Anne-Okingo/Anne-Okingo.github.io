package main

import (
	"fmt"
	"log"
	"net/http"
	"my-portfolio/Backend/endpoint"
)

func main() {
	// Register routes directly with the default HTTP multiplexer
	endpoint.RegisterRoutes(http.DefaultServeMux)

	// Add middleware if necessary
	handler := endpoint.RouteChecker(http.DefaultServeMux)

	// Start the server
	fmt.Println("server running @http://localhost:3000\n=====================================")
	if err := http.ListenAndServe(":3000", handler); err != nil {
		log.Fatal("Server failed:", err)
	}
}
