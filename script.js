const openMenu=document.querySelector('.openmenu');
const menu=document.querySelector('.menu');
const Fname=document.querySelector('#Fname');
const contact=document.querySelector('.contact');
const Email=document.querySelector('.Email');
const textarea=document.querySelector('#textarea');
const blogs=document.querySelector('.blogs');
const nameError=document.querySelector('#nameError');
const  messageError=document.querySelector('#messageError');
const contactus=document.querySelector('#contactus');
const login=document.querySelector('#login');
const logName=document.querySelector("#logName");
const logNameErrors=document.querySelector("#logNameErrors");
const logpassword=document.querySelector("#logpassword");
const logpasswordErrors=document.querySelector("#logpasswordErrors");
const blogcontainer=document.querySelector('.blog-container');




openMenu.addEventListener('click',()=>{
    menu.classList.toggle('show')
})

 
contactus.addEventListener('submit',(e)=>{
   e.preventDefault();
   if(Fname.value.trim()===""){
      
      nameError.innerHTML='please enter the name!';
   }
   
   else if(Fname.value.length<3){
     
      nameError.innerHTML="name should have 3 character and over";
   }
   else{
      nameError.innerHTML="";
   }
   
   if(textarea.value.trim()===""){
      messageError.innerHTML='please enter the message!';
   }else if (textarea.value.length < 10) {
      messageError.innerHTML = "your message should be atleast 10 characters";
    } else {
      messageError.innerHTML = "";
    }

      
  
});

Fname.value==='';
textarea.value==='';

function validate(){
if(Fname.value===""){
nameError.innerHTML='please enter the name!';
}
if (textarea.value ==="") {
 
   return false;
}
else{
    alert("your message is sent!!!")
  true;
}
}

function emailvalid(){
   var form=document.getElementById("form");
   var email=document.getElementById("emails").value;
   var text=document.getElementById("errors");

var pattern=/^[^ ]+@[^ ]+\.[a-z]{1,3}$/;
if(email.match(pattern))
{
form.classList.add("valid");
form.classList.remove("invalid");
text.innerHTML="";
text.style.color="#00ff00";
}
else{

   form.classList.remove("valid");
   form.classList.add("invalid");
   text.innerHTML="Please enter a valid email";
text.style.color="#ff0000";
}
}
function fnamevalid(){
   var form=document.getElementById("form");
   var email=document.getElementById("Fname").value;
   var text=document.getElementById("nameError");

var pattern = /^[a-z]{3,}$/;
if(email.match(pattern))
{
form.classList.add("valid");
form.classList.remove("invalid");
text.innerHTML="";
text.style.color="#00ff00";
}
else{

   form.classList.remove("valid");
   form.classList.add("invalid");
   text.innerHTML="ooops fix your name";
text.style.color="#ff0000";
}
}



function messagevalid(){
   var form=document.getElementById("form");
   var email=document.getElementById("textarea").value;
   var text=document.getElementById("messageError");

var pattern = /^[a-zA-Z\s\S]{10,}$/;
if(email.match(pattern))
{
form.classList.add("valid");
form.classList.remove("invalid");
text.innerHTML="";
text.style.color="#00ff00";
}
else{

   form.classList.remove("valid");
   form.classList.add("invalid");
   text.innerHTML="your text it has to be over 10 chacters";
text.style.color="#ff0000";
}
}
//slider------------------------------------------
var hoovered=false;

const scroll=()=>{
   if (blogs.scrollLeft + blogs.clientWidth >= blogs.scrollWidth) {
      blogs.scrollLeft = 0;
    }
if(!hoovered){
   blogs.scrollLeft+=600;
}
}
setInterval(scroll,2000);

// blogcontainer.addEventListener("mouseenter", ()=>{
   
//    hoovered=true;
// });
// blogcontainer.addEventListener("mouseenter", ()=>{

//    hoovered=false;
// });

