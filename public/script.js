document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded!");

    let currentExpandedTitle = "Design"; // Default expanded category

    function toggleAccordion(title) {
        console.log(`Toggling: ${title}`);

        // Check if the clicked title is already expanded
        let isAlreadyExpanded = title === currentExpandedTitle;

        // Collapse all sections
        document.querySelectorAll(".accordion-content").forEach(content => {
            content.style.maxHeight = null;
        });

        document.querySelectorAll(".accordion-header .icon").forEach(icon => {
            icon.textContent = "+";
        });

        // If the clicked section is not the currently expanded one, expand it
        if (!isAlreadyExpanded) {
            let allMatchingHeaders = document.querySelectorAll(`.accordion-header[data-title="${title}"]`);
            allMatchingHeaders.forEach(header => {
                let content = header.nextElementSibling;
                let icon = header.querySelector(".icon");

                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = "-";
            });

            // Update the current expanded title
            currentExpandedTitle = title;
        } else {
            // If clicked again, reset current expanded title to allow re-expansion later
            currentExpandedTitle = null;
        }
    }

    // Expand default category on page load
    toggleAccordion(currentExpandedTitle);

    // **Accordion Functionality (Synchronized Expansion)**
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", function () {
            console.log("Accordion clicked:", this);

            let title = this.dataset.title; // Get the title of the clicked section

            if (!title) {
                console.log("Error: No title found!");
                return;
            }

            toggleAccordion(title); // Call the function to toggle the accordion
        });
    });



    // **Modal Functionality (Handles Both Buttons)**
    const modal = document.getElementById("quoteModal");
    const consultationBtn = document.getElementById("consultationButton"); // "GET FREE CONSULTATION" button
    const specButtons = document.querySelectorAll(".get-detailed-spec-btn"); // "GET DETAILED SPECIFICATION" buttons
    const closeBtn = document.querySelector(".close-btn");
    const quoteForm = document.getElementById("quoteForm");

    if (!modal) {
        console.error("Modal element NOT FOUND!");
        return;
    }

    // Open modal when clicking "GET FREE CONSULTATION"
    if (consultationBtn) {
        consultationBtn.addEventListener("click", function () {
            console.log("Consultation Button Clicked: Opening Modal");
            modal.style.display = "flex";
        });
    }

    // Open modal when clicking "GET DETAILED SPECIFICATION"
    specButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Specification Button Clicked: Opening Modal");
            modal.style.display = "flex";
        });
    });

    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            console.log("Close Button Clicked: Hiding Modal");
            modal.style.display = "none";
        });
    }




    if (quoteForm) {
        quoteForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form values correctly
            const name = document.getElementById("name").value.trim();
            const mobile = document.getElementById("mobile").value.trim();
            const email = document.getElementById("email").value.trim();
            const location = document.getElementById("location").value.trim();

            // Create form data object
            const formData = {
                name: name,
                mobile: mobile,
                email: email,
                location: location
            };

            // Send data to the server using fetch API
            fetch("/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert("Message Sent Successfully!");
                quoteForm.reset(); // Clear the form after submission
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Try again.");
            });
        });
    }




















    // Close modal when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            console.log("Clicked outside modal: Hiding Modal");
            modal.style.display = "none";
        }
    });


    // **Hero Section Slideshow**
    let images = document.querySelectorAll(".slideshow img");
    let dots = document.querySelectorAll(".dot");
    let heroText = document.querySelector(".hero-text");
    let heroTagline = document.querySelector(".hero-tagline");

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
        if (images.length === 0 || dots.length === 0) return;

        images.forEach(img => img.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        images[index].classList.add("active");
        dots[index].classList.add("active");

        heroText.textContent = texts[index];
        heroTagline.innerHTML = taglines[index];

        currentIndex = index;
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % images.length;
        changeSlide(nextIndex);
    }

    function jumpToSlide(index) {
        clearInterval(interval);
        changeSlide(index);
        startAutoSlide();
    }

    function startAutoSlide() {
        if (images.length > 0) {
            interval = setInterval(nextSlide, 5000);
        }
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", function () {
                jumpToSlide(index);
            });
        });
    }

    startAutoSlide();

    // **Counter Animation**
    const counters = document.querySelectorAll(".counter");
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

    // **Service Box Click Event**
    const serviceBoxes = document.querySelectorAll(".service");
    serviceBoxes.forEach(service => service.classList.remove("active"));

    serviceBoxes.forEach(service => {
        service.addEventListener("click", function () {
            serviceBoxes.forEach(s => s.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // **Reveal Sections on Scroll**
    let section = document.querySelector(".services-section");
    function revealSection() {
        let sectionTop = section.getBoundingClientRect().top;
        let triggerPoint = window.innerHeight - 100;

        if (sectionTop < triggerPoint) {
            section.classList.add("show");
        }
    }
    window.addEventListener("scroll", revealSection);
    revealSection();


    // **Lightbox Functionality**
    function openLightbox(img) {
        console.log("Opening Lightbox...", img.src);
        var lightbox = document.getElementById("lightbox");
        var lightboxImg = document.getElementById("lightbox-img");

        if (lightbox && lightboxImg) {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        } else {
            console.error("Lightbox elements not found!");
        }
    }

    function closeLightbox() {
        console.log("Closing Lightbox...");
        var lightbox = document.getElementById("lightbox");
        if (lightbox) {
            lightbox.style.display = "none";
        } else {
            console.error("Lightbox not found!");
        }
    }

    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
});

