package endpoint

import (
	"net/http"

	"my-portfolio/Backend/handlers"
)

// Allowed routes
var allowedRoutes = map[string]bool{
	"/": true,
}

// RouteChecker is a middleware that checks allowed routes
func RouteChecker(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if _, ok := allowedRoutes[r.URL.Path]; !ok {
			handlers.NotFoundHandler(w, r)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// RegisterRoutes manages the routes
func RegisterRoutes(mux *http.ServeMux) {
	// Simplified route registration without static file handling
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		handlers.HomeHandler(w, r)
	})
}

// package endpoint

// import (
// 	"net/http"

// 	"my-portfolio/Backend/handlers"
// )

// func RegisterRoutes(mux *http.ServeMux) {
// 	mux.HandleFunc("/", handlers.HomeHandler)
// }
