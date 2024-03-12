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
                     <img src="./assets/message.png"><p id="comment-number"></p>
                </div>
            </div>
            <br><br><br><br>
            <h1 class="comment-header">Comments</h1>
            <div class="comment-box " id="comment-box">
                <!-- Comments will be displayed here -->
            </div>
        </div>
    `;

    const countelement = document.getElementById("single-display");
    const allblogs = "https://rwemaremy-my-brand-back-end.onrender.com";
    theblog.addEventListener("click", async function (event) {
      window.location.reload();
      const target = event.target;
      if (target.classList.contains("likes-btn")) {
        const blogId = searchParams.get("id");
        fetch(
          `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}/likes`,
          {
            method: "POST",
          }
        );
        const data = await response.json;
        countelement.textContent = data.likes;
      }
    });

    theblog.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("comment")) {
        location.href = "#comment-box";
        console.log("clicked");
      }
      const commentnumber = document.getElementById("comment-number");
      let count = 0;
      if (commentnumber) {
        // commentnumber.textContent = theblog.blog.comments.toString();
        // count++;
        // localStorage.setItem("count", `${count}`);
      }
    });

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
          <p>${comment.content}</p> \n
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

function validateForm() {
  const nameInput = document.getElementById("names");
  const emailInput = document.getElementById("emails");
  const messageInput = document.getElementById("messages");
  if (
    nameInput.checkValidity() &&
    emailInput.checkValidity() &&
    messageInput.checkValidity()
  ) {
    return true; // Proceed with form submission if all fields are valid
  } else {
    // If any field is invalid, display appropriate error messages
    if (!nameInput.checkValidity()) {
      alert("Please enter your name.");
    }
    if (!emailInput.checkValidity()) {
      alert("Please enter a valid email address.");
    }
    if (!messageInput.checkValidity()) {
      alert("Please enter your message.");
    }
    return false; // Prevent form submission
  }
}

const names = document.querySelector(".name");
const emails = document.querySelector(".email");
const messages = document.querySelector(".messages");
const form = document.querySelector(".contact");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var Cname = names.value.trim();
  var Cemail = emails.value.trim();
  var Cmessage = messages.value.trim();
  const data = {
    name: Cname,
    email: Cemail,
    content: Cmessage,
  };
  console.log(blogId);
  function postComment(data) {
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
          swal({
            title: "Done!",
            text: "Comment Sent!!",
            icon: "success",
            button: "OK!",
          }).then(() => {
            window.location.reload();
          });
        } else {
          // Failed to create comment
          swal("Ooops!", "Something is wrong with empty fields", "warning");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  postComment(data);
});
