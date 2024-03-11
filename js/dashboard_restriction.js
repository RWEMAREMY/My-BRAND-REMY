function checkAuthentication() {
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect to login page if token is not present
    window.location.href = "/log-in.html";
  }
}

// Call checkAuthentication when the dashboard page loads
window.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
});