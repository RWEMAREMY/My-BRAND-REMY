const container = document.querySelector("#blogger");
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
            <t class="text">${result}</t>
            <div class="blog-heart"><img src="./assets/heart.png">${blog.likes}</div>
        </div>
   
    </div>   `;
});

container.innerHTML = blogshtml;

const blogger = document.querySelectorAll(".blog-container");
blogger.forEach((blg) => {
  blg.addEventListener("click", (e) => {
    const id = e.target.closest(".blog-container").getAttribute("key");
    window.location.href = `./single-blog.html?id=${id}`;
  });
});
