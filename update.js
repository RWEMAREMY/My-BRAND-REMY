const update = document.querySelector("#newupdate");
const formCreateBlog=document.querySelector("#form");
const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
const allblog = JSON.parse(localStorage.getItem("blogs")) || [];
let selectblog = allblog.find((blg) => blg.id == blogId);
const titleupdate = document.querySelector("#newtitleupdate");
const contentupdates = document.querySelector(".contentupdate");
titleupdate.value = selectblog.title;
contentupdates.value = selectblog.content;

formCreateBlog.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    let isValid = true;
  
    if (titleupdate.value === "") {
      isValid = false;
      titleError.textContent = "Title is required.";
    }
  
    if (contentupdates.value === "") {
      isValid = false;
      contentError.textContent = "Content is required.";
    } 
  
    if (isValid) {
      // Form submission logic goes here
      console.log("Form submitted successfully!");
    }
    // const contentTags = contentupdates.value.replace(/<p>/g, "").replace(/<\/p>/g, "");
     
    const allBlog = JSON.parse(localStorage.getItem("blogs")) || [];
  

    selectblog = {...selectblog, title: titleupdate.value, description: contentTags.value};
    const updatedBlogs = allBlog.map((blog) => {
      if (blog.id == blogId) {
        return selectblog;
      }
      return blog;
    });
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    // console.log(singleBlog);
    window.location.href = "./article.html";
  
  });