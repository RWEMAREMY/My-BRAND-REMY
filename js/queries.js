const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");

const url = "https://rwemaremy-my-brand-back-end.onrender.com";



// Fetch blog details
fetch(url + `/api/queries`)
  .then((res) => res.json())
  .then((query) => {
    console.log(query);
    const theblog = document.querySelector(".card--wrapper");
 query.forEach(element => {
  const queryElement= document.createElement("div");
  queryElement.innerHTML = `
  <div class="cards"> 
        <div class="queries1">
       <div> <p> ${element.content}</p>  <br>
        
       <div> <h3>${element.author} /  ${element.email}</h3> </div>
        </div>
        
      </div>
     
   `;
   theblog.appendChild(queryElement);
 });
    // console.log(theblog);

  })
  .catch((error) => console.error("Error fetching blog details:", error));
