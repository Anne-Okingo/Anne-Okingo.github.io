# Alice Anne Awuor Okingo - Portfolio

A modern, full-stack portfolio website built with Go (Golang) and HTML/CSS/JavaScript. This project showcases my work in Software Development, Data Science, and Tech for Social Good.

## Features

-   **Modern UI/UX**: Clean, minimalist design using custom CSS variables and glassmorphism effects.
-   **Dark/Light Mode**: Fully themeable interface with persistent user preference (localStorage).
-   **Interactive Portfolio**: Filterable project gallery (Design, Data Science, Tech for Social Good) with embedded Figma prototypes.
-   **Animations**: Smooth scroll reveal animations using Intersection Observer.
-   **Backend**: Go-based server handling static file serving and contact form submissions via SMTP.
-   **Responsive**: Optimized for mobile, tablet, and desktop devices.

## Tech Stack

-   **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Google Fonts (Acme, Inter, Outfit), FontAwesome.
-   **Backend**: Go (Golang).
-   **Deployment**: Ready for platforms like Render or Heroku.

## Getting Started

### Prerequisites

-   [Go](https://go.dev/dl/) (1.18 or higher)
-   Git

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Anne-Okingo/Anne-Okingo.github.io.git
    cd Anne-Okingo.github.io
    ```

2.  Setup Environment Variables:
    Copy the example environment file and configure your email credentials for the contact form.
    ```bash
    cp .env.example .env
    ```
    Open `.env` and fill in your details:
    ```
    EMAIL_SENDER=your-email@gmail.com
    EMAIL_PASSWORD=your-app-password
    SMTP_HOST=smtp.gmail.com
    ```

3.  Run the application:
    ```bash
    go run main.go
    ```

4.  Visit `http://localhost:3000` in your browser.

## Project Structure

-   `main.go`: Entry point, server configuration, and route definitions.
-   `Backend/`: Contains handlers for email logic (`contact.go`).
-   `css/custom.css`: Main stylesheet containing the design system and component styles.
-   `js/custom.js`: Logic for theme toggling, animations, and portfolio filtering.
-   `index.html`: Main single-page application structure.

## License

This project is open source and available under the [MIT License](LICENSE).
