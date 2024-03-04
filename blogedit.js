const container = document.querySelector("#blogge");
const allblog = JSON.parse(localStorage.getItem("blogs")) || [];
let blogshtml = "";
allblog.forEach((blog) => {
  let length = 90;
  let string = blog.content;
  let result = addThreeDotsAfterLength(string, length);
  function addThreeDotsAfterLength(string, length) {
    return string.length > length ? string.slice(0, length) + "..." : string;
  }
  blogshtml += `  
    <div class="blog-container "key=${blog.id} > 
        <div class="blog-wrapper ">
            <img src="./assets/blog image.png">
            <br>
            <h3>${blog.title}</h3>
            <br>
            <div class="blog-heart"><img src="./assets/heart.png">${blog.likes}</div>
           </div>
             <span id="delete" key=${blog.id}><i class="fa-solid fa-trash" style="color: #d11515;">
            </i></span>
            <span id="update" key=${blog.id}>
             <i class="fa-solid fa-arrows-rotate" style="color: #black;">
            </i></span>
           
        </div>
       
    </div>  `;
});

container.innerHTML = blogshtml;

const blogger = document.querySelectorAll(".blog-container");
blogger.forEach((blg) => {
  blg.addEventListener("click", (e) => {
    const id = e.target.closest(".blog-container").getAttribute("key");
    window.location.href = `./single-blog.html?id=${id}`;
  });
});

const removeBlog = document.querySelectorAll("#delete");
removeBlog.forEach((removeButton) => {
  removeButton.addEventListener("click", (e) => {
    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    e.preventDefault();
    e.stopPropagation();

    const id = e.target.getAttribute("key");

    const updatedBlogs = allBlogs.filter((blog) => blog.id != id);

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    location.reload();
  });
});

const editblog = document.querySelectorAll("#update");
editblog.forEach((editbutton) => {
  editbutton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.closest(".blog-container").getAttribute("key");
    location.reload();
    window.location.href =` ./update.html?id=${id}`;
  });
});