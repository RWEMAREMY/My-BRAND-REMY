
import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";
const editor=document.querySelector('#textarea');
const message=document.querySelector('#message');
const form=document.querySelector('#form');
const send=document.getElementById('send');
const title=document.querySelector('#title');
const content=document.querySelector('.content');
const uniqueId = uuidv4();
const file=document.getElementById('files');


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


form.addEventListener('submit',(e)=>{
e.preventDefault();

const singleId = uuidv4();



const allblog=JSON.parse(localStorage.getItem("blogs")) || [];
const Tags = editor.value.replace(/<p>/g, "").replace(/<\/p>/g, "");
const singleBlog = {
      id:singleId,
    title: title.value ,
    content:  Tags,
    image: file,//imageUrl
    createBy: "remy",
    comments: [],
    likes: 0,
  };
  console.log(singleBlog);
if(singleBlog.content=== ''){
  message.innerHTML="No content please!";
  return false;
}
else if(singleBlog.content.length<20){
  message.innerHTML="The content should be having over 20 characters!";
  return false;

  }
 
  else{
    alert("blog added!");


    }
  
allblog.push(singleBlog);

localStorage.setItem("blogs", JSON.stringify(allblog))
  
editor.value.innerHTML=='';
title.value='';
message.innerHTML='';
window.location.href="article.html" 
});


  
  
   
















