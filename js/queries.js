const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");

const url = "https://rwemaremy-my-brand-back-end.onrender.com";

// Fetch blog details
fetch(`https://rwemaremy-my-brand-back-end.onrender.com/api/queries`)
  .then((res) => res.json())
  .then((query) => {
    console.log(query);
    const theblog = document.querySelector(".card--wrapper");
    query.forEach((element) => {
      const queryElement = document.createElement("div");
      queryElement.innerHTML = `
  <div class="cards"> 
        <div class="queries1">
       <div> <p> ${element.content}</p>  <br>
        
       <div> <h3>${element.author} /  ${element.email}</h3> </div>

       <span class="delete-btn"   id="delete" ><i class="fa-solid fa-trash" 
       style="color: #d11515;"></i></span>
        
       </div>
        
      </div>
     
   `;
      theblog.appendChild(queryElement);
    });

    // console.log(theblog);
  })
  .catch((error) => console.error("Error fetching blog details:", error));

function checkAuthentication() {
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect to login page if token is not present
    window.location.href = "/log-in.html";
  }
}

// Call checkAuthentication when the dashboard page loads
window.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
});
