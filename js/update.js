const update = document.querySelector("#newupdate");
const formCreateBlog = document.querySelector("#form");
const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
const titleupdate = document.querySelector("#newtitleupdate");
const content = document.querySelector("#summernote");
let blogshtml = "";

formCreateBlog.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  if (titleupdate.value === "") {
    isValid = false;
    titleError.textContent = "Title is required.";
  }

  if (isValid) {
    const updatedData = {
      title: titleupdate.value,
      content: content.value, // Using Quill to get content
    };
    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}`, // Use blogId instead of undefined variable 'blog'
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update blog");
        }
        return res.json();
      })
      .then((updatedBlog) => {
        swal({
          title: "Done!",
          text: "Blog Edited successfully!!",
          icon: "success",
          button: "OK!",
          updatedBlog,
        }).then(() => {
          window.location.href = "article.html";
        });
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      });
  }
});

const urlParams = new URLSearchParams(window.location.search);
const blog = urlParams.get("id");

fetch(`https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blog}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((blog) => {
    document.getElementById("newtitleupdate").value = blog.title;
    let fetchedContent = blog.content;
    $(document).ready(function () {
      $("#summernote").summernote({
        toolbar: [
          ["style", ["bold", "italic", "underline", "clear"]],
          ["font", ["strikethrough", "superscript", "subscript"]],
          ["fontsize", ["fontsize"]],
          ["color", ["color"]],
          ["para", ["ul", "ol", "paragraph"]],
          ["height", ["height"]],
          ["misc", ["fullscreen", "codeview"]],
        ],
      });

      $("#summernote").summernote("code", fetchedContent);
    });
    window.blog = blog;
  })
  .catch((error) => console.error("Error fetching blog details:", error));

// Remove the updateBlog function if it's not used elsewhere
