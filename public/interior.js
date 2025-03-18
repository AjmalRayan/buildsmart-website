document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".staggered");
    const counters = document.querySelectorAll(".counter");
    let started = false;

    // Scroll Reveal Animation
    function revealOnScroll() {
        items.forEach((item) => {
            const itemPosition = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemPosition < windowHeight - 50) {
                item.classList.add("visible");
            }
        });
    }

    // Animated Counters
    function startCounting() {
        counters.forEach(counter => {
            counter.innerText = "0";
            const target = +counter.getAttribute("data-target");
            const duration = 2000; // Total animation duration (in ms)
            const steps = duration / 16; // Approximate frame rate at 60fps
            const step = target / steps;

            let count = 0;
            const updateCounter = () => {
                if (count < target) {
                    count += step;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // Function to check if counter-section is visible
    function checkScroll() {
        const section = document.querySelector(".counter-section");
        if (!section) return; // Avoid errors if section is missing

        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight && !started) {
            startCounting();
            started = true;
        }
    }

    // Debounce Function (Improves Performance)
    function debounce(func, delay = 100) {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func();
            }, delay);
        };
    }

    // Event Listeners
    window.addEventListener("scroll", debounce(revealOnScroll));
    window.addEventListener("scroll", debounce(checkScroll));

    revealOnScroll(); // Run once on page load
    checkScroll(); // Check if counters should start immediately

    // Form Submission Handling
    const addForm = document.getElementById("addForm");
    if (addForm) {
        addForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Your request has been submitted successfully!");
        });
    }
});
