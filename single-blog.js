const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
console.log(blogId);
const allblog = "https://rwemaremy-my-brand-back-end.onrender.com";

const theblog = document.querySelector(".wrapper");
fetch(allblog + `/api/blogs/${blogId}`)
  .then((res) => res.json())
  .then((give) => {
    theblog.innerHTML = `
<h2>${give.title}</h2>
<img src=${give.image}>
<div class="textbox">

    <p>
${give.content}
    </p>
    <div class="like">
    <div class="likes">
         <img src="./assets/heart.png" onclick="liking()"><p id="single-display">${give.likes}</p>
    </div>
    <div class="likes comment">
        <p> <img src="./assets/message.png"></p>
    </div>

</div>
    
    <br><br><br><br>
<h1>Comment</h1>   
    </div>
  


    `;
    var count = 0;
    var output = document.getElementById("single-display");
    function liking() {
      count += 1;
      output.innerHTML = count;
    }
  });
