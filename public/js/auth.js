async function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);

  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("https://your-backend-api.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Login successful:", result);
      // Handle successful login (e.g., redirect to another page)
    } else {
      const error = await response.json();
      console.error("Login failed:", error);
      // Handle login failure (e.g., display error message)
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle network or other errors
  }
}

// Attach the handleSubmit function to the window object for access in HTML
window.handleSubmit = handleSubmit;

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Toggle button text
    this.textContent = type === "password" ? "Show Password" : "Hide Password";
  });
