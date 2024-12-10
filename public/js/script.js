document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    alert(data.message);
});


// Form Validation
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
  
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();  // Prevents the default form submission
  
      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Name Validation: Ensure it's not empty
      if (!name) {
        alert("Name is required.");
        return;  // Stop the form from submitting
      }
  
      // Email Validation: Check if it's a valid email format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      // Password Validation: Ensure it's at least 6 characters long
      if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }
  
      // If all validations pass, show success message
      alert("Sign Up Successful!");
      // You can replace this with actual logic (e.g., send data to a server)
    });
  });
  
  