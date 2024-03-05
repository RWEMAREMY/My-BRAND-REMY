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
    <div class="blog-container "key=${blog._id} > 
        <div class="blog-wrapper ">
            <img class="adminImgView" src=${blog.image}>
            <br>
            <h3>${blog.title}</h3>
            <br>
            <div class="blog-heart"><img class="adminImgLikes" src="./assets/heart.png">${blog.likes}</div>
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
    
  });
});

const removeBlog = document.querySelectorAll("#delete");
removeBlog.forEach((removeButton) => {
  removeButton.addEventListener("click", (e) => {
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
});