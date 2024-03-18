const App = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [hoovered, setHoovered] = React.useState(false);

  const renderHtmlContent = (htmlContent) => {
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: htmlContent },
    });
  };

  const getAllPosts = async () => {
    try {
      const res = await axios.get(
        "https://rwemaremy-my-brand-back-end.onrender.com/api/blogs"
      );

      console.log(res);
      setBlogs(res.data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  React.useEffect(() => {
    getAllPosts();
  }, []);

  const scroll = () => {
    if (document.getElementById("blogs")) {
      const blogsElement = document.getElementById("blogs");
      if (
        blogsElement.scrollLeft + blogsElement.clientWidth >=
        blogsElement.scrollWidth
      ) {
        blogsElement.scrollLeft = 0;
      }
      if (!hoovered) {
        blogsElement.scrollLeft += 100;
      } else {
        blogsElement.scrollLeft -= 100;
      }
    }
  };

  React.useEffect(() => {
    const interval = setInterval(scroll, 70);

    return () => clearInterval(interval);
  }, [hoovered]);

  // Function to handle click on blog container
  const handleBlogClick = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    window.location.href = `./single-blog.html?id=${id}`;
  };

  // Function to add three dots after a certain length of text
  const addThreeDotsAfterLength = (string, length) => {
    return string.length > length ? string.slice(0, length) + "..." : string;
  };

  return (
    <div
      id="blogs"
      className="blogs"
      onMouseEnter={() => setHoovered(true)}
      onMouseLeave={() => setHoovered(false)}
    >
      {blogs.length === 0 ? (
        <div>Loading...</div>
      ) : (
        blogs.map((blog) => (
          <div
            className="blog-container"
            key={blog._id}
            data-id={blog._id} // Set data-id attribute for each blog container
            onClick={handleBlogClick} // Attach click event listener
          >
            <div className="blog-wrapper">
              <img src={blog.image} className="image" alt={blog.title} />
              <br />
              <h3>{blog.title}</h3>
              <p>
                {renderHtmlContent(addThreeDotsAfterLength(blog.content, 90))}
              </p>
              <div className="blog-heart">
                <img
                  className="image-heart"
                  src="./assets/heart.png"
                  alt="Heart"
                />
                {blog.likes}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("blogger"));
