const update = document.querySelector("#newupdate");
const formCreateBlog = document.querySelector("#form");
const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
const titleupdate = document.querySelector("#newtitleupdate");
const contentupdates = document.querySelector(".contentupdate");
// titleupdate.value = selectblog.title;
// contentupdates.value = selectblog.content;

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
    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((give) => {
        console.log(give);
      });
  }
});
