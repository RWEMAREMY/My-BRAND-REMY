const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
console.log(blogId);
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
                <div class="likes">
                    <img src="./assets/heart.png" onclick="liking()"><p id="single-display">${give.likes}</p>
                </div>
                <div class="likes comment">
                    <p> <img src="./assets/message.png"></p>
                </div>
            </div>
            <br><br><br><br>
            <h1 class="comment-header">Comments</h1>
            <div class="comment-box" id="comment-box">
                <!-- Comments will be displayed here -->
            </div>
        </div>
    `;

    // Fetch comments
    fetch(allblog + `/api/blogs/${blogId}/comments`)
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
  })
  .catch((error) => console.error("Error fetching blog:", error));

