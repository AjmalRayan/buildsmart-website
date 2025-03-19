// Select all slides
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

// Function to rotate the slider
function rotateSlider() {
    slides.forEach((slide, index) => {
        const angle = (360 / slides.length) * (index - currentIndex);
        slide.style.transform = `rotateY(${angle}deg) translateZ(400px)`;
    });

    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
}

// Auto-rotate every 3 seconds
setInterval(rotateSlider, 2000);
