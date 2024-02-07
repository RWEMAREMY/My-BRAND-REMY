const update = document.querySelector("#newupdate");
const formCreateBlog=document.querySelector("#form");
const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
const allblog = JSON.parse(localStorage.getItem("blogs")) || [];
const selectblog = allblog.find((blg) => blg.id == blogId);
const titleupdate = document.querySelector("#newtitleupdate");
const contentupdates = document.querySelector(".contentupdate");
titleupdate.value = chosenBlog.title;
contentupdates.value = chosenBlog.content;

formCreateBlog.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    let isValid = true;
  
    if (title.value === "") {
      isValid = false;
      titleError.textContent = "Title is required.";
    } else {
      titleError.textContent = "";
    }
  
    if (content.value === "") {
      isValid = false;
      contentError.textContent = "Content is required.";
    } else {
      contentError.textContent = "";
    }
  
    if (isValid) {
      // Form submission logic goes here
      console.log("Form submitted successfully!");
    }
  
    const rareId = uuidv4();
    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const contentTags = content.value.replace(/<p>/g, "").replace(/<\/p>/g, "");
    const singleBlog = {
      id: rareId,
      title: title.value,
      author: author.value,
      date: date.value,
      content: contentTags,
      // img: image.scr,
      comments: [],
      likes: 0,
    };
    allBlogs.push(singleBlog);
    localStorage.setItem("blogs", JSON.stringify(allBlogs));
    // console.log(singleBlog);
    window.location.href = `${window.location.href}?id=${rareId}`;
  
  });