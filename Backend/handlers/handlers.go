package handlers

import (
	"net/http"

	"my-portfolio/Backend/renders"
)

// HomeHandler handles the homepage route '/'
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		renders.RenderTemplate(w, "index.html", nil)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// func ContactHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodPost {
// 		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
// 		return
// 	}
// 	// parsing form data

// 	err := r.ParseForm()
// 	if err != nil {
// 		http.Error(w, "Failled to parse form data", http.StatusBadRequest)
// 		return
// 	}
// 	// extract form values

// 	name := r.FormValue("name")
// 	email := r.FormValue("email")
// 	subject := r.FormValue("subject")
// 	message := r.FormValue("message")

// 	if name == "" || email == "" || subject == "" || message == "" {
// 		http.Error(w, "Error all fields are required", http.StatusBadRequest)
// 		return
// 	}

// 	// try sending email
// 	err = sendEmail(name, email, subject, message)
// 	if err != nil {
// 		http.Error(w, "Failed to send email", http.StatusInternalServerError)
// 		return
// 	}

// 	// send success when done successfully
// 	w.Header().Set("Content-Type", "text/html; charset=utf-8")
// 	w.WriteHeader(http.StatusOK)
// 	fmt.Println(w, "<h1>Thank you! Your message has been sent successfully.</h1>")
// }

// func sendEmail(name, email, subject, message string) error {
// 	m := gomail.NewMessage()

// 	// Sender
// 	m.SetHeader("From", email) 

// 	// Recipient
// 	m.SetHeader("To", "annekadiso@gmail.com") 

// 	// Email subject and body
// 	m.SetHeader("Subject", fmt.Sprintf("Contact Form: %s", subject))
// 	m.SetBody("text/plain", fmt.Sprintf(
// 		"Name: %s\nEmail: %s\nSubject: %s\nMessage: %s",
// 		name, email, subject, message,
// 	))

// 	// SMTP settings
// 	d := gomail.NewDialer("smtp.example.com", 587, "annekadiso@gmail.com", "your-email-password")
// 	// Replace `smtp.example.com`, port, email, and password with your SMTP provider's details

// 	// Send email
// 	return d.DialAndSend(m)
// }

// NotFoundHandler handles unknown routes; 404 status
func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	renders.RenderTemplate(w, "notfound.page.html", nil)
}

// BadRequestHandler handles bad requests routes
func BadRequestHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusBadRequest)
	renders.RenderTemplate(w, "badrequest.page.html", nil)
}

// ServerErrorHandler handles server failures that result in status 500
func ServerErrorHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusInternalServerError)
	renders.RenderTemplate(w, "servererror.page.html", nil)
}
