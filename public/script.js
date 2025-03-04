document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    let images = document.querySelectorAll(".slideshow img");
    let dots = document.querySelectorAll(".dot");
    let heroText = document.querySelector(".hero-text");
    let heroTagline = document.querySelector(".hero-tagline");
    let section = document.querySelector(".services-section");
    const serviceBoxes = document.querySelectorAll(".service");
    const modal = document.getElementById("quoteModal");
    const btn = document.getElementById("consultationButton"); // Change this ID to your actual button's ID
    const closeBtn = document.querySelector(".close-btn");

    let texts = [
        "GET YOUR DREAM HOME CONSTRUCTED BY THE EXPERTS",
        "BUILDING STRONG, BEAUTIFUL HOMES",
        "MOST TRUSTED COMPANY",
        "ULTRA-MODERN HOMES FOR A LUXURY LIFESTYLE",
        "LUXURY VILLAS, CRAFTED WITH PRECISION"
    ];

    let taglines = [
        "A RESIDENTIAL CONSTRUCTION COMPANY",
        "WE TURN BLUEPRINTS INTO REALITY",
        "4 YEARS OF EXPERIENCE<br><span class='since-2021'>SINCE 2021</span>",
        "MODERN ARCHITECTURE & PREMIUM DESIGN",
        "WE BUILD BUILDINGS PROFESSIONALLY"
    ];

    let currentIndex = 0;
    let interval;

    function changeSlide(index) {
        if (images.length === 0 || dots.length === 0) return; // Check if images/dots exist

        // Remove "active" class from all images and dots
        images.forEach(img => img.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        // Add "active" class to the selected image and dot
        images[index].classList.add("active");
        dots[index].classList.add("active");

        // Update the text and tagline
        heroText.textContent = texts[index];
        heroTagline.innerHTML = taglines[index];

        // Apply font styles for better visibility
        heroText.style.color = "rgba(255, 255, 255, 0.95)"; // Bright white color
        heroText.style.fontWeight = "900"; // Extra bold
        heroText.style.textShadow = "4px 4px 20px rgba(255, 255, 255, 1), 3px 3px 15px rgba(0, 0, 0, 0.9)"; // Adds depth
        heroText.style.transition = "all 0.5s ease-in-out";

        heroTagline.style.color = "#fff"; // Bright white color
        heroTagline.style.fontWeight = "800"; // Bold
        heroTagline.style.textShadow = "4px 4px 20px rgba(255, 255, 255, 1), 3px 3px 15px rgba(0, 0, 0, 0.9)"; // Adds depth
        heroTagline.style.transition = "all 0.5s ease-in-out";

        // Update current index
        currentIndex = index;
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % images.length;
        changeSlide(nextIndex);
    }

    function jumpToSlide(index) {
        clearInterval(interval); // Stop auto-slide when clicking a dot
        changeSlide(index);
        startAutoSlide(); // Restart auto-slide
    }

    function startAutoSlide() {
        if (images.length > 0) {
            interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
        }
    }

    // Attach click event to dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", function () {
                jumpToSlide(index);
            });
        });
    }

    // Start the auto-slide on page load
    startAutoSlide();

    // **Counter Animation**
    counters.forEach(counter => {
        counter.innerText = "0";
        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });

    // **Service Box Click Event (Now Without Default Active)**
    serviceBoxes.forEach(service => service.classList.remove("active"));
        serviceBoxes.forEach(service => {
        service.addEventListener("click", function () {
            // Remove "active" class from all services
            serviceBoxes.forEach(s => s.classList.remove("active"));

            // Add "active" class to clicked service
            this.classList.add("active");
        });
    });
    
    
    function revealSection() {
        let sectionTop = section.getBoundingClientRect().top;
        let triggerPoint = window.innerHeight - 100;

        if (sectionTop < triggerPoint) {
            section.classList.add("show");
        }
    }

    window.addEventListener("scroll", revealSection);
    revealSection();


    // Open modal on button click
btn.addEventListener("click", function() {
    modal.style.display = "flex";
});
if (modal && closeBtn) {
    console.log("Modal and close button found!");

    // Close modal when clicking the 'X' button
    closeBtn.addEventListener("click", function () {
        console.log("Close button clicked");
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            console.log("Clicked outside modal");
            modal.style.display = "none";
        }
    });
} else {
    console.log("Modal or close button not found!");
}

function openLightbox(img) {
    console.log("Opening Lightbox...", img.src); // Debugging log
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightbox-img");

    if (lightbox && lightboxImg) {
        lightbox.style.display = "flex"; // Show lightbox
        lightboxImg.src = img.src; // Set clicked image source
    } else {
        console.error("Lightbox elements not found!");
    }
}

function closeLightbox() {
    console.log("Closing Lightbox...");
    var lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.style.display = "none"; // Hide lightbox
    } else {
        console.error("Lightbox not found!");
    }
}

// Attach event listeners
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

});

