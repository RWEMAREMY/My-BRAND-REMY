const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");

const allblog = "https://rwemaremy-my-brand-back-end.onrender.com";

const theblog = document.querySelector(".queries1");

// Fetch blog details
fetch(allblog + `/api/queries`)
  .then((res) => res.json())
  .then((query) => {
    theblog.innerHTML = `
    <div class="cards"> 
          <div class="queries1">
            <h3>${query.author}</h3>
            <h3>${query.email}</h3>
            <p>${query.content}</p>
            <h3>${query.date}</h3>
          </div>
        </div>
     `;
  })
  .catch((error) => console.error("Error fetching blog details:", error));
