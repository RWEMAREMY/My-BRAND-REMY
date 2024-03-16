fetch("https://rwemaremy-my-brand-back-end.onrender.com/api/blogs")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return res.json();
  })
  .then((data) => console.log())
  .catch((error) =>
    console.error("There was a problem with the fetch operation:", error)
  );

// likes on dashboard
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://rwemaremy-my-brand-back-end.onrender.com/api/blogs")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((blogs) => {
      // Assuming you only want to display the like count once, outside the loop
      const totalLikes = blogs.reduce((total, blog) => total + blog.likes, 0);

      const blogElement = document.createElement("div");
      // console.log(blogElement);
      blogElement.innerHTML = `
                <span class="title">
                    <img src="./assets/dash2.png"><p>likes <br>${totalLikes}</p>
                </span>
            `;
      const blogsContainer = document.querySelector("#likescount"); // Corrected selector to target by ID
      // console.log(blogsContainer);
      blogsContainer.appendChild(blogElement);
    })
    .catch((error) => console.error("Error fetching blogs:", error));
});

// blogs on dashboard
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://rwemaremy-my-brand-back-end.onrender.com/api/blogs")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((blogs) => {
      const totalBlogs = blogs.length;

      const blogElement = document.createElement("div");
      blogElement.innerHTML = `
        <span class="title">
          <img src="./assets/dash1.svg"><p>BLOGS <br>${totalBlogs}</p>
        </span>
      `;

      const blogsContainer = document.querySelector("#blogscount");

      blogsContainer.appendChild(blogElement);
    })
    .catch((error) => console.error("Error fetching blogs:", error));
});

// querries on dashboard
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://rwemaremy-my-brand-back-end.onrender.com/api/queries")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((queries) => {
      const totalQueries = queries.length;

      const blogElement = document.createElement("div");
      blogElement.innerHTML = `
      <span class="title">
      <img src="./assets/dash3.png"><p>querries<br>${totalQueries}</p>
  </span>
      `;

      const blogsContainer = document.querySelector("#Queriescount");

      blogsContainer.appendChild(blogElement);
    })
    .catch((error) => console.error("Error fetching blogs:", error));
});

// Function to logout
function logoutUser() {
  // Clear token from local storage
  localStorage.removeItem("token");
  // Redirect to login page
  window.location.href = "/log-in.html";
}

// function checkAuthentication() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     // Redirect to login page if token is not present
//     window.location.href = "/log-in.html";
//   }
// }

// // Call checkAuthentication when the dashboard page loads
// window.addEventListener("DOMContentLoaded", () => {
//   checkAuthentication();
// });
