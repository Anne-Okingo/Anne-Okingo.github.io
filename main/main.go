package main

import (
	"fmt"
	"log"
	"net/http"

	"my-portfolio/Backend/endpoint"
)

func main() {
	// without middleware
	// mux := http.NewServeMux()

	// mux.HandleFunc("/", handlers.HomeHandler)

	// port := ":3000"

	// fmt.Println("server runing @http://localhost:3000\n==============================")
	// err := http.ListenAndServe(port,mux)
	// if err != nil{
	// 	log.Fatal("Error server failed",err)
	// }

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
