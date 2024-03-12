document.addEventListener("DOMContentLoaded", function () {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);
  const blogId = searchParams.get("id");

  const url = "https://rwemaremy-my-brand-back-end.onrender.com";

  // Fetch blog details
  fetch(`https://rwemaremy-my-brand-back-end.onrender.com/api/comments`)
    .then((res) => res.json())
    .then((comments) => {
      console.log(comments);
      const commentBox = document.getElementById("comment-box");
      if (!commentBox) {
        console.error("Comment box element not found in the document.");
        return;
      }

      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.innerHTML = `
            <div class="comment-box">
       
              <div class="comment-content queries2" key=${comment._id}>
                <p>${comment.content}</p> &nbsp;&nbsp;&nbsp;
                <p>${comment.name} / ${comment.email}</p> 
    
              </div>
              <div >
              <p>    <span class="delete-btn" id="delete" key=${comment._id}>
              <i class="fa-solid fa-trash" style="color: #d11515;"></i> </span></P>
              </div>         
             
            </div>
       
            
          `;
        commentBox.appendChild(commentElement);
      });

      const blogger = document.querySelectorAll(".delete-btn");

      blogger.forEach((blg) => {
        blg.addEventListener("click", (e) => {
          const clickedContainer = e.target.closest(".delete-btn");
          if (clickedContainer) {
            const id = clickedContainer.getAttribute("key");

            deletequery(id);
            // Use the id as needed
          } else {
            console.error(
              "No blog container found in the clicked element chain."
            );
          }
        });

        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            const blogId = button.getAttribute("key");
          });
        });
      });
      const token = localStorage.getItem("token");
      const deletequery = (blogId) => {
        const url = "https://rwemaremy-my-brand-back-end.onrender.com";
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
            fetch(`${url}/api/comments/${blogId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
              .then((response) => {
                if (response.ok) {
                  swal("Poof! Our Comments has been deleted!😢", {
                    icon: "success",
                    timer: 3000,
                  }).then(() => {
                    location.reload();
                  });
                } else {
                  console.error(
                    "Error deleting comments:",
                    response.statusText
                  );
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            swal("Our Comment is safe! 👍");
          }
        });
      };
    });
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
});
