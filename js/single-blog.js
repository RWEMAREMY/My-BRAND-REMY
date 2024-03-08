const currentUrl = new URL(window.location.href);
const Names = document.querySelector(".name");
const email = document.querySelector(".email");
const content = document.querySelector(".message");
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");

const allblog = "https://rwemaremy-my-brand-back-end.onrender.com";

const theblog = document.querySelector(".wrapper");
// Fetch blog details
fetch(allblog + `/api/blogs/${blogId}`)
  .then((res) => res.json())
  .then((give) => {
    theblog.innerHTML = `
        <h2>${give.title}</h2>
        <img src=${give.image}>
        <div class="textbox">
            <p>${give.content}</p>
            <div class="like">
                <div class="likes likes-btn">
                    <img src="./assets/heart.png" ><p id="single-display">${give.likes}</p>
                </div>
                <div class="likes comment ">
                    <p> <img src="./assets/message.png"></p>
                </div>
            </div>
            <br><br><br><br>
            <h1 class="comment-header">Comments</h1>
            <div class="comment-box " id="comment-box">
                <!-- Comments will be displayed here -->
            </div>
        </div>
    `;

    const allblog = "https://rwemaremy-my-brand-back-end.onrender.com";
    theblog.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("likes-btn")) {
        const blogId = searchParams.get("id");
        fetch(
          `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}/likes`,
          {
            method: "POST",
          }
        );
        const singleDisplay = document.getElementById("single-display");
        let count = 0;
        if (singleDisplay) {
          singleDisplay.textContent = theblog.blog.likes.toString();
          count++;
          location.reload();
          localStorage.setItem("count", `${count}`);
        }
      }
    });

    theblog.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("comment")) {
        //  window.location.href = "#comment-box";
        console.log("clicked");
      }
    });
    // Fetch comments
    const id = searchParams.get("id");
    fetch(allblog + `/api/blogs/${id}/comments`)
      .then((res) => res.json())
      .then((comments) => {
        const commentBox = document.getElementById("comment-box");
        comments.forEach((comment) => {
          const commentElement = document.createElement("div");
          commentElement.innerHTML = `
         
          <div class="comment-box">
          <div class="comment-content">
          <p>${comment.content}</p>
          <p>${comment.name}  /   ${comment.email}
                  </div >
                  </div>
              `;
          commentBox.appendChild(commentElement);
        });
      })
      .catch((error) => console.error("Error fetching comments:", error));

    const data = {
      name: Names,
      email: email,
      content: content,
    };

    function postComment(blogId, data) {
      // Assuming you're using fetch for API calls
      fetch(
        `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => {
          if (response.ok) {
            // Comment created successfully
            console.log("Comment created successfully");
          } else {
            // Failed to create comment
            console.error("Failed to create comment");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // Replace '123' with the actual ID of the blog post
  })

  .catch((error) => console.error("Error fetching blog:", error));
