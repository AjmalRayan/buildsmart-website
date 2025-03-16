// Initialize Swiper for all image sliders
document.addEventListener("DOMContentLoaded", function () {
    const swipers = document.querySelectorAll(".swiper-container");

    swipers.forEach((swiperEl) => {
        new Swiper(swiperEl, {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            loop: true,
            autoplay: {
                delay: 3000,
            },
        });
    });


    const stepImages = {
        1: "images/step-one.webp",
        2: "images/step-two.webp",
        3: "images/step-three.webp",
        4: "images/step-four.webp",
        5: "images/step-five.webp",
        6: "images/step-six.webp",
        7: "images/step-seven.webp"
    };
    
    let currentStep = 1;
    let interval;
    
    function changeStep(step) {
        currentStep = step;
        const imageElement = document.getElementById('process-image');
        
        // Fade out effect
        imageElement.style.opacity = 0;
    
        setTimeout(() => {
            imageElement.src = stepImages[step]; // Change image
            imageElement.style.opacity = 1; // Fade in effect
        }, 300);
    
        updateActiveStep(step);
    }
    
    function updateActiveStep(step) {
        document.querySelectorAll(".step-circle").forEach(circle => {
            circle.classList.remove("active");
        });
    
        document.getElementById(`step-${step}`).classList.add("active");
    }
    
    // Auto-cycle every 2 seconds
    function autoCycleSteps() {
        interval = setInterval(() => {
            currentStep = currentStep < 7 ? currentStep + 1 : 1;
            changeStep(currentStep);
        }, 4000);
    }
    
    autoCycleSteps();
    

});
