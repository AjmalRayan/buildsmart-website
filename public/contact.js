document.getElementById('contact').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;   // ✅ Get the form element directly

    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value
    };

    // ✅ Simulate successful message submission
    setTimeout(() => {
        alert(`✅ Message sent successfully!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);

        // ✅ Clear the form properly
        form.reset();
    }, 500);  // Simulate a 0.5-second delay for realism
});
