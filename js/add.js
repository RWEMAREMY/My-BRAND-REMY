import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";
const editor = document.querySelector("#textarea");
const message = document.querySelector("#message");
const titlerror = document.querySelector(".messagestitle");
const form = document.querySelector("#form");
const send = document.getElementById("send");
const title = document.querySelector("#title");
const content = document.querySelector(".content");
const uniqueId = uuidv4();
const fileInput = document.getElementById("files");

// const imageInput = document.querySelector(".update-image");
// const fileInput = document.querySelector("#image-file");
// let imageUrl = "";

// imageInput.addEventListener("click", () => {
//   fileInput.click();
// });

// fileInput.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();

//   reader.onloadend = () => {
//     imageInput.style.backgroundImage = url(${reader.result});
//     imageUrl = reader.result;
//   };

//   reader.readAsDataURL(file);
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const singleId = uuidv4();

//   const allblog = JSON.parse(localStorage.getItem("blogs")) || [];
//   const Tags = editor.value.replace(/<p>/g, "").replace(/<\/p>/g, "");
//   const singleBlog = {
//     id: singleId,
//     title: title.value,
//     content: Tags,
//     image: file, //imageUrl
//     createBy: "remy",
//     comments: [],
//     likes: 0,
//   };
//   console.log(singleBlog);
//   if (singleBlog.content === "") {
//     message.innerHTML = "No content please!";
//     return false;
//   } else if (singleBlog.content.length < 20) {
//     message.innerHTML = "The content should be having over 20 characters!";
//     return false;
//   } else {
//     alert("blog added!");
//   }

//   allblog.push(singleBlog);

//   localStorage.setItem("blogs", JSON.stringify(allblog));

//   editor.value.innerHTML == "";
//   title.value = "";
//   message.innerHTML = "";
//   window.location.href = "article.html";
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let isValid = true;

  if (title.value === "") {
    isValid = false;
    titlerror.innerText = "Title is required.";
  } else {
    titlerror.innerText = "";
  }

  if (content.value === "") {
    isValid = false;
    message.innerText = "Content is required.";
  } else {
    message.innerText = "";
  }
  // if (author.value === "") {
  //   isValid = false;
  //   authorError.innerText = "author is required.";
  // } else {
  //   authorError.innerText = "";
  // }
  // if (date.value === "") {
  //   isValid = false;
  //   dateError.innerText = "data is required.";
  // } else {
  //   dateError.innerText = "";
  // }

  if (isValid) {
    createBlog();
  }
});
async function createBlog() {
  //console.log(content.value);
  const contentTags = content.value.replace(/<p>/g, "").replace(/<\/p>/g, "");
  const contents = contentTags;
  //console.log(contents);
  const titles = title.value;
  //console.log(titles);
  const token = localStorage.getItem("token");
  console.log(token);
  if (!fileInput.files || !fileInput.files[0]) {
    console.error("Please select image");
    return;
  }
  const formData = new FormData();
  formData.append("title", titles);
  formData.append("content", contents);
  formData.append("image", fileInput.files[0]);

  const url = "https://rwemaremy-my-brand-back-end.onrender.com";

  const response = await fetch(url + "/api/blogs", {
    method: "POST",
    headers: {
      Authorization: `Bearer${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    window.location.href = "log-in.html";
    throw new Error(response.statusText);
  }
  const data = await response.json();
  alert("Blog created successfully!!");
  window.location.href = "article.html";
}
