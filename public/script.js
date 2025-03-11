document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded!");

    let currentExpandedTitle = "Design"; // Default expanded category

    function toggleAccordion(title) {
        console.log(`Toggling: ${title}`);

        let isAlreadyExpanded = title === currentExpandedTitle;

        document.querySelectorAll(".accordion-content").forEach(content => {
            content.style.maxHeight = null;
        });

        document.querySelectorAll(".accordion-header .icon").forEach(icon => {
            icon.textContent = "+";
        });

        if (!isAlreadyExpanded) {
            let allMatchingHeaders = document.querySelectorAll(`.accordion-header[data-title="${title}"]`);
            allMatchingHeaders.forEach(header => {
                let content = header.nextElementSibling;
                let icon = header.querySelector(".icon");

                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = "-";
            });

            currentExpandedTitle = title;
        } else {
            currentExpandedTitle = null;
        }
    }

    toggleAccordion(currentExpandedTitle);

    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", function () {
            let title = this.dataset.title;
            if (!title) return;
            toggleAccordion(title);
        });
    });

    // Modal Functionality
    const modal = document.getElementById("quoteModal");
    const consultationBtn = document.getElementById("consultationButton");
    const specButtons = document.querySelectorAll(".get-detailed-spec-btn");
    const closeBtn = document.querySelector(".close-btn");
    const enquireForm = document.getElementById("enquireForm");
    const constructionForm = document.getElementById("constructionForm");

    if (consultationBtn) {
        consultationBtn.addEventListener("click", function () {
            modal.style.display = "flex";
        });
    }

    specButtons.forEach(button => {
        button.addEventListener("click", function () {
            modal.style.display = "flex";
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    function sendFormData(formType, formData) {
        fetch("http://localhost:6012/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ formType, ...formData })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            alert("Message sent successfully!");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong. Try again.");
        });
    }
    
    if (enquireForm) {
        enquireForm.addEventListener("submit", function (event) {
            event.preventDefault();
    
            const formData = {
                name: document.getElementById("enquire-name").value.trim(),
                mobile: document.getElementById("enquire-mobile").value.trim(),
                email: document.getElementById("enquire-email").value.trim(),
                siteLocation: document.getElementById("enquire-site-location").value.trim(),
                city: document.getElementById("enquire-city").value.trim(),
                message: document.getElementById("enquire-message").value.trim()
            };
    
            sendFormData("enquireForm", formData);
        });
    }
    
    if (constructionForm) {
        constructionForm.addEventListener("submit", function (event) {
            event.preventDefault();
    
            const formData = {
                name: document.getElementById("name").value.trim(),
                mobile: document.getElementById("mobile").value.trim(),
                email: document.getElementById("email").value.trim(),
                location: document.getElementById("location").value.trim()
            };
    
            sendFormData("constructionForm", formData);
        });
    }
    
    






    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Hero Section Slideshow
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

    // Counter Animation
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

    // Service Box Click Event
    const serviceBoxes = document.querySelectorAll(".service");
    serviceBoxes.forEach(service => service.classList.remove("active"));

    serviceBoxes.forEach(service => {
        service.addEventListener("click", function () {
            serviceBoxes.forEach(s => s.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Reveal Sections on Scroll
    function revealSection() {
        const section = document.querySelector(".services-section");
        if (!section) return; // Exit if section doesn't exist
    
        let sectionTop = section.getBoundingClientRect().top;
        let triggerPoint = window.innerHeight - 100;
    
        if (sectionTop < triggerPoint) {
            section.classList.add("show");
        }
    }
    
    window.addEventListener("scroll", revealSection);
    revealSection();

    // Lightbox Functionality
    function openLightbox(img) {
        var lightbox = document.getElementById("lightbox");
        var lightboxImg = document.getElementById("lightbox-img");

        if (lightbox && lightboxImg) {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        }
    }

    function closeLightbox() {
        var lightbox = document.getElementById("lightbox");
        if (lightbox) {
            lightbox.style.display = "none";
        }
    }

    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
});
