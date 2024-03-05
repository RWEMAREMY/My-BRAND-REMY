const container = document.querySelector("#blogger");
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
        return string.length > length
          ? string.slice(0, length) + "..."
          : string;
      }
      blogshtml += `  
    <div class="blog-container "key=${blog._id} > 
        <div class="blog-wrapper ">
            <img src=${blog.image}>
            <br>
            <h3>${blog.title}</h3>
            <br>
            <t class="text">${result}</t>
            <div class="blog-heart"><img src="./assets/heart.png">${blog.likes}</div>
        </div>
   
    </div>   `;
      container.innerHTML = blogshtml;
      const blogger = document.querySelectorAll(".blog-container");
blogger.forEach((blg) => {
  blg.addEventListener("click", (e) => {
    const id = e.target.closest(".blog-container").getAttribute("key");
    window.location.href = `./single-blog.html?id=${id}`;
  });
});
      console.log(blog);
    });
  });


