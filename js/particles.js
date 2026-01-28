// Particle Image Effect
class Particle {
    constructor(x, y, color) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = x;
        this.targetY = y;
        this.color = color;
        this.size = 2;
        this.baseSize = 2;
        this.speed = 0.05;
        this.opacity = 0;
        this.fadeSpeed = 0.02;
    }

    update() {
        // Move towards target position
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        // Fade in
        if (this.opacity < 1) {
            this.opacity += this.fadeSpeed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const sourceImage = document.getElementById('sourceImage');
let particles = [];
let animationId;

// Set canvas size
function resizeCanvas() {
    const maxWidth = 500;
    const maxHeight = 500;
    canvas.width = maxWidth;
    canvas.height = maxHeight;
}

// Extract pixels from image
function initParticles() {
    particles = [];
    
    // Draw image to canvas temporarily
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    const scale = Math.min(canvas.width / sourceImage.width, canvas.height / sourceImage.height);
    const width = sourceImage.width * scale;
    const height = sourceImage.height * scale;
    const offsetX = (canvas.width - width) / 2;
    const offsetY = (canvas.height - height) / 2;
    
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(sourceImage, offsetX, offsetY, width, height);
    
    // Get pixel data
    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    // Sample particles (not every pixel, for performance)
    const gap = 4; // Sample every 4th pixel
    
    for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
            const index = (y * canvas.width + x) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const alpha = pixels[index + 3];
            
            // Only create particle if pixel is not transparent
            if (alpha > 128) {
                const color = { r, g, b };
                particles.push(new Particle(x, y, color));
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(16, 24, 24, 0.1)'; // Dark theme background with slight trail
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
    
    animationId = requestAnimationFrame(animate);
}

// Start when image loads
sourceImage.onload = function() {
    resizeCanvas();
    initParticles();
    animate();
};

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// If image is already loaded
if (sourceImage.complete) {
    sourceImage.onload();
}