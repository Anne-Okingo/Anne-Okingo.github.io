package main

// import (
//     "fmt"
//     "log"
//     "net/http"
//     "os"
//     "gopkg.in/gomail.v2"
//     "html/template"
// )

// type ContactForm struct {
//     Name    string
//     Email   string
//     Subject string
//     Message string
// }

// func main() {
//     http.HandleFunc("/send", handleContact)
//     fmt.Println("Server is running on port 8080...")
//     log.Fatal(http.ListenAndServe(":8080", nil))
// }

// func handleContact(w http.ResponseWriter, r *http.Request) {
//     if r.Method != "POST" {
//         http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
//         return
//     }

//     // Parse form data
//     form := ContactForm{
//         Name:    r.FormValue("name"),
//         Email:   r.FormValue("email"),
//         Subject: r.FormValue("subject"),
//         Message: r.FormValue("message"),
//     }

//     // Validate form data
//     if form.Name == "" || form.Email == "" || form.Message == "" {
//         http.Error(w, "Please fill all required fields", http.StatusBadRequest)
//         return
//     }

//     // Send email
//     if err := sendEmail(form); err != nil {
//         log.Printf("Error sending email: %v", err)
//         http.Error(w, "Failed to send message", http.StatusInternalServerError)
//         return
//     }

//     w.WriteHeader(http.StatusOK)
//     fmt.Fprint(w, "Message sent successfully!")
// }

// func sendEmail(form ContactForm) error {
//     // Create email template
//     emailTemplate := `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <style>
//             body { font-family: Arial, sans-serif; }
//             .container { padding: 20px; }
//             .header { color: #333; }
//             .content { margin: 20px 0; }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <h2 class="header">New Contact Form Submission</h2>
//             <div class="content">
//                 <p><strong>Name:</strong> {{.Name}}</p>
//                 <p><strong>Email:</strong> {{.Email}}</p>
//                 <p><strong>Subject:</strong> {{.Subject}}</p>
//                 <p><strong>Message:</strong></p>
//                 <p>{{.Message}}</p>
//             </div>
//         </div>
//     </body>
//     </html>
//     `

//     // Parse and execute template
//     tmpl, err := template.New("email").Parse(emailTemplate)
//     if err != nil {
//         return err
//     }

//     var emailBody bytes.Buffer
//     if err := tmpl.Execute(&emailBody, form); err != nil {
//         return err
//     }

//     // Configure email
//     m := gomail.NewMessage()
//     m.SetHeader("From", "your-email@example.com")
//     m.SetHeader("To", "your-email@example.com")
//     m.SetHeader("Subject", "New Contact Form: "+form.Subject)
//     m.SetBody("text/html", emailBody.String())

//     // Configure SMTP settings
//     d := gomail.NewDialer("smtp.gmail.com", 587, "your-email@example.com", "your-app-password")

//     // Send email
//     return d.DialAndSend(m)
// }