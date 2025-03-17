// Simple image slider effect
const sliders = document.querySelectorAll(".design-image-slider");
sliders.forEach(slider => {
    let images = slider.querySelectorAll("img");
    let index = 0;
    setInterval(() => {
        images[index].style.display = "none";
        index = (index + 1) % images.length;
        images[index].style.display = "block";
    }, 2000);
});