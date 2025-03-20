// Scroll-triggered Progress Bar
window.onscroll = () => {
    const scrollPosition = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollPosition / scrollHeight) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
};



// 📌 Counter Animation Functionality
const counters = document.querySelectorAll('.counter');

const animateCounters = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            counter.innerText = '0';

            const target = +counter.getAttribute('data-target');

            const updateCounter = () => {
                const count = +counter.innerText;
                const increment = target / 150; // Adjust speed of counting

                if (count < target) {
                    counter.innerText = `${Math.ceil(count + increment)}`;
                    setTimeout(updateCounter, 10); // Repeat every 10ms
                } else {
                    counter.innerText = target;  // Ensure the final value is correct
                }
            };

            updateCounter();
        }
    });
};

const container = document.querySelector('.before-after-container');
const beforeImage = document.querySelector('.before-image');
const slider = document.querySelector('.rider');

let isDragging = false;

// Function to set the slider position
function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(x - rect.left, rect.width));
    const percentage = (offsetX / rect.width) * 100;

    beforeImage.style.width = `${percentage}%`;
    slider.style.left = `${percentage}%`;
}

// Use unique variable names to avoid conflicts
const comparisonSlider = document.querySelector('.rider');
const beforeContainer = document.querySelector('.before-container');
const sliderBar = document.querySelector('.slider-bar');

comparisonSlider.addEventListener('input', (e) => {
    const sliderValue = e.target.value;
    beforeContainer.style.width = `${sliderValue}%`;
    sliderBar.style.left = `${sliderValue}%`;
});





