const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
const allblog = JSON.parse(localStorage.getItem("blogs")) || [];
const selectblog = allblog.find((blog) => blog.id == blogId);

const theblog = document.querySelector(".wrapper");
theblog.innerHTML = `
<h2>${selectblog.title}</h2>
<img src="./assets/blog3.jpg" alt="photo">
<div class="textbox">

    <p>
${selectblog.content}
    </p>
    <div class="like">
    <div class="likes">
        <p> <img src="./assets/heart.png">4k</p>
    </div>
    <div class="likes">
        <p> <img src="./assets/message.png">2k</p>
    </div>

</div>
    <h1>Comment</h1>
    
       
    </div>


    `;
