const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");
console.log(blogId);
const allblog = "https://rwemaremy-my-brand-back-end.onrender.com";

const theblog = document.querySelector(".queries1");

// Fetch blog details
fetch(allblog + `/api/queries`)
  .then((res) => res.json())
  .then((give) => {
    theblog.innerHTML = `
      <div class="cards"> 
        <div class="card--wrapper">
          <div class="queries1">
            <h3>${give.author}</h3>
            <h3>${give.email}</h3>
            <p>${give.content}</p>
            <h3>${give.date}</h3>
          </div>
        </div>
      </div>`;
  })
  .catch((error) => console.error("Error fetching blog details:", error));
