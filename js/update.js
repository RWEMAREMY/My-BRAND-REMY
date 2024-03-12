const update = document.querySelector("#newupdate");
const formCreateBlog = document.querySelector("#form");
const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
const titleupdate = document.querySelector("#newtitleupdate");
// const contentupdates = document.querySelector(".contentupdate");
const contents = quill.getText();
let blogshtml = "";
// titleupdate.value = selectblog.title;
//  contentupdates.value = selectblog.content;

formCreateBlog.addEventListener("submit", (e) => {
  e.preventDefault();
  // e.stopPropagation();

  let isValid = true;

  if (titleupdate.value === "") {
    isValid = false;
    titleError.textContent = "Title is required.";
  }

  if (contents.value === "") {
    isValid = false;
    contentError.textContent = "Content is required.";
  }

  if (isValid) {
    const updatedData = {
      title: titleupdate.value,
      // content: contents.value,
      content: quill.getText().trim(),
    };
    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blog}`,
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
        // Handle the updated blog data here

        swal({
          title: "Done!",
          text: "Blog Edited successfully!!",
          icon: "success",
          button: "OK!",
          updatedBlog,
        }).then(() => {
          window.location.href = "article.html";
        });
        // For example, you can update the UI with the updated data
        // window.location.href = "article.html";
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        // Handle error, show error message to the user, etc.
      });
  }
});

const urlParams = new URLSearchParams(window.location.search);
const blog = urlParams.get("id");
console.log(blog);
// Fetch the specific blog's details using the blog ID
fetch(`https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blog}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((blog) => {
    // Populate the input fields with the existing data
    document.getElementById("newtitleupdate").value = blog.title;
    // contents.value = blog.content;
    quill.setText(blog.content);
    // Store the blog object for reference when updating
    window.blog = blog;
  })

  .catch((error) => console.error("Error fetching blog details:", error));

// Function to update the blog with edited data
function updateBlog() {
  const updateData = {
    title: document.getElementById("title").value,
    // content: contents.value,
    content: quill.getText(),
  };

  fetch(`https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blog}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      showToast("Blog edited successfully!");
      window.location.href = "update.html";

      title.value = "";
      rich.value = "";
    })
    .catch((error) => console.error("Error editing blog:", error));
}
