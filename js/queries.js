const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");

const url = "https://rwemaremy-my-brand-back-end.onrender.com";

// Fetch blog details
fetch(`https://rwemaremy-my-brand-back-end.onrender.com/api/queries`)
  .then((res) => res.json())
  .then((query) => {
    console.log(query);
    const theblog = document.querySelector(".card--wrapper");

    query.forEach((element) => {
      const queryElement = document.createElement("div");

      queryElement.innerHTML = `
  <div class="cards"> 
        <div class="queries1" key=${element._id} >
       <div> <p> ${element.content}</p>  <br>
        
       <div> <h3>${element.author} /  ${element.email}</h3> </div>

       <span class="delete-btn"   id="delete"  key=${element._id}><i class="fa-solid fa-trash" 
       style="color: #d11515;"></i></span>
        
       </div>
        
      </div>
     
   `;
      theblog.appendChild(queryElement);
    });

    const blogger = document.querySelectorAll(".delete-btn");

    blogger.forEach((blg) => {
      blg.addEventListener("click", (e) => {
        const clickedContainer = e.target.closest(".delete-btn");
        if (clickedContainer) {
          const id = clickedContainer.getAttribute("key");
          deleteBlog(id);
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
    const deleteBlog = (blogId) => {
      const url = "https://rwemaremy-my-brand-back-end.onrender.com";
      fetch(`${url}/api/queries/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            // Show confirmation dialog
            swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this query!",
              icon: "warning",
              buttons: ["Cancel", "Delete"],
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  // If user confirms deletion
                  return fetch(`${url}/api/queries/${blogId}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  });
                } else {
                  // If user cancels deletion
                  swal("Our query is safe!", {
                    icon: "info",
                  });
                  throw new Error("Query deletion cancelled");
                }
              })
              .then((deleteResponse) => {
                if (deleteResponse.ok) {
                  // If query deletion is successful
                  swal("Poof! Our query has been deleted!", {
                    icon: "success",
                    timer: 3000, // Show success message for 3 seconds
                  }).then(() => {
                    window.location.reload();
                  });
                } else {
                  console.error(
                    "Error deleting query:",
                    deleteResponse.statusText
                  );
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            console.error("Error deleting query:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    // console.log(theblog);
  })
  .catch((error) => console.error("Error fetching query details:", error));

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
