function validateForm(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!fullName || !email || !subject || !message) {
        formMessage.textContent = 'All fields are required!';
        return false;
    }
    
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address!';
        return false;
    }
    
    // If validation passes
    formMessage.style.color = '#28a745';
    formMessage.textContent = 'Form submitted successfully!';
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    return true;
}