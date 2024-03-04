const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
const allblog = "https://rwemaremy-my-brand-back-end.onrender.com";
const selectblog = allblog.find((blog) => blog.id == blogId);

const theblog = "";
fetch(url + "/api/blogs/:id")
  .then((res) => res.json())
  .then((give) => {
    give.innerHTML = `
<h2>${selectblog.title}</h2>
<img src=${selectblog.image}>
<div class="textbox">

    <p>
${selectblog.content}
    </p>
    <div class="like">
    <div class="likes">
         <img src="./assets/heart.png" onclick="liking()"><p id="single-display"></p>
    </div>

    <div class="likes">
        <p> <img src="./assets/message.png">2k</p>
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
