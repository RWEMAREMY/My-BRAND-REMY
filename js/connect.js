fetch("https://rwemaremy-my-brand-back-end.onrender.com/api/blogs")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return res.json();
  })
  .then((data) => console.log(data))
  .catch((error) =>
    console.error("There was a problem with the fetch operation:", error)
  );
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
      console.log(blogElement);
      blogElement.innerHTML = `
                <span class="title">
                    <img src="./assets/dash2.png"><p>likes <br>${totalLikes}</p>
                </span>
            `;
      const blogsContainer = document.querySelector("#likescount"); // Corrected selector to target by ID
      console.log(blogsContainer);
      blogsContainer.appendChild(blogElement);
    })
    .catch((error) => console.error("Error fetching blogs:", error));
});
