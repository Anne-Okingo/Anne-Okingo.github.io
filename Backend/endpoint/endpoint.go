package endpoint

import (
	"net/http"

	"my-portfolio/Backend/handlers"
)

// Allowed routes
var allowedRoutes = map[string]bool{
	"/": true,
	"/contact": true,
}

// RouteChecker is a middleware that checks allowed routes
func RouteChecker(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow static files
		if r.URL.Path != "/" && r.URL.Path != "/contact" {
			next.ServeHTTP(w, r)
			return
		}
		
		if _, ok := allowedRoutes[r.URL.Path]; !ok {
			handlers.NotFoundHandler(w, r)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// RegisterRoutes manages the routes
func RegisterRoutes(mux *http.ServeMux) {
	// Static file server for assets
	fs := http.FileServer(http.Dir("./"))
	mux.Handle("/css/", fs)
	mux.Handle("/js/", fs)
	mux.Handle("/img/", fs)
	mux.Handle("/lib/", fs)
	mux.Handle("/Alice", fs)
	
	// Route handlers
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			handlers.HomeHandler(w, r)
		} else {
			fs.ServeHTTP(w, r)
		}
	})
	mux.HandleFunc("/contact", handlers.ContactHandler)
}