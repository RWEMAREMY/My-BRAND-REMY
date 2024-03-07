const container = document.querySelector("#blogge");
const url = "https://rwemaremy-my-brand-back-end.onrender.com";
let blogshtml = "";

fetch(url + "/api/blogs")
  .then((res) => res.json())
  .then((give) => {
    give.forEach((blog) => {
      let length = 90;
      let string = blog.content;
      let result = addThreeDotsAfterLength(string, length);

      function addThreeDotsAfterLength(string, length) {
        return string.length > length ? string.slice(0, length) + "..." : string;
      }

      blogshtml += `  
      <div class="blog-container" key=${blog._id}> 
          <div class="blog-wrapper">
              <img class="adminImgView" src=${blog.image}>
              <br>
              <h3>${blog.title}</h3>
              <br>
              <div class="blog-heart"><img class="adminImgLikes" src="./assets/heart.png">${blog.likes}</div>
          </div>
          <span class="delete-btn"   id="delete"><i class="fa-solid fa-trash" style="color: #d11515;"></i></span>
          <span class="update-blog" id="update" ><i class="fa-solid fa-arrows-rotate" style="color: black;"></i></span>
      </div>`;
    });

    container.innerHTML = blogshtml;

    const blogger = document.querySelectorAll(".blog-container");

    blogger.forEach((blg) => {
      blg.addEventListener("click", (e) => {
        const clickedContainer = e.target.closest(".blog-container");
        if (clickedContainer) {
          const id = clickedContainer.getAttribute("key");
          deleteBlog(id);
          // Use the id as needed
        } else {
          console.error("No blog container found in the clicked element chain.");
        }
      });
   
   
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const blogId = button.getAttribute('key');
        
        
      });
    });
  });
const token=localStorage.getItem("token");

const deleteBlog = (blogId) => {
  const url = "https://rwemaremy-my-brand-back-end.onrender.com";
  fetch(url + `/api/blogs/${blogId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(token)}`,
    },
  }).then(response => {
    if (response.ok) {
      console.log("Blog deleted successfully");
    } else {
      console.error("Error deleting blog:", response.statusText);
    }
  }).catch(error => {
    console.error("Error:", error);
  });
};

const editblog = document.querySelectorAll(".update-blog");
editblog.forEach((editbutton) => {
  editbutton.addEventListener("click", (e) => {
    const id = e.target.getAttribute("key");
    console.log(id);
    // Redirect to update page with id
    window.location.href = `./update.html?id=${id}`;
  });
});
});