package handlers

import (
	"fmt"
	"log"
	"net/http"
	"net/smtp"

	"github.com/jordan-wright/email"
)

type ContactForm struct {
	Name    string
	Email   string
	Subject string
	Message string
}

// Contact form submission handler
func ContactHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("erro1")
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid Method", http.StatusMethodNotAllowed)
		return
	}

	// Parsing form data
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error parsing form data", http.StatusInternalServerError)
		return
	}

	// Create the form struct
	form := ContactForm{
		Name:    r.FormValue("name"),
		Email:   r.FormValue("email"),
		Subject: r.FormValue("subject"),
		Message: r.FormValue("message"),
	}

	// Send email
	err := SendEmail(form)
	if err != nil {
		log.Printf("Error sending email: %v", err)
		http.Error(w, "Working on the Email.... try again later", http.StatusInternalServerError)
		return
	}

	// Response to the client
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Message Sent Successfully!")
}

// sendEmail sends an email using the form data
func SendEmail(form ContactForm) error {
	e := email.NewEmail()

	// Set email details
	e.From = "Anne Okingo <annekadiso@gmail.com>"
	e.To = []string{"annekadiso@gmail.com"} // Replace with your email
	e.Subject = fmt.Sprintf("New Contact Form Submission: %s", form.Subject)
	e.HTML = []byte(fmt.Sprintf(`
        <h1>New Message from %s</h1>
        <p><strong>Email:</strong> %s</p>
        <p><strong>Subject:</strong> %s</p>
        <p><strong>Message:</strong> %s</p>
    `, form.Name, form.Email, form.Subject, form.Message))

	// SMTP authentication
	auth := smtp.PlainAuth("", "annekadiso@gmail.com", "your-app-password-here", "smtp.gmail.com")

	// Send the email using SMTP
	err := e.Send("smtp.gmail.com:587", auth)
	if err != nil {
		log.Printf("SMTP error: %v", err) // Log the error for debugging
		return err
	}

	return nil
}
