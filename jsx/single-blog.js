// Define loader component
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

// Define renderHtmlContent function outside Single component
const renderHtmlContent = (htmlContent) => {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: htmlContent },
  });
};

function Single() {
  const [blog, setBlog] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [formData, setFormData] = React.useState({
    Names: "",
    Email: "",
    Messages: "",
  });
  const [loading, setLoading] = React.useState(true); // State to track loading status

  // Function to fetch blog details and comments
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const blogId = searchParams.get("id");

    // Fetch blog details
    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => console.error("Error fetching blog:", error));

    // Fetch comments
    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}/comments`
    )
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  // Function to handle form data changes
  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const blogId = searchParams.get("id");

    const newComment = {
      name: formData.Names,
      email: formData.Email,
      content: formData.Messages,
    };

    // Submit new comment
    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to submit comment");
        }
      })
      .then(() => {
        swal({
          title: "Done!",
          text: "Comment Sent!!",
          icon: "success",
          button: "OK!",
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Ooops!", "Something went wrong", "warning");
      });
  };

  // Function to handle like button click
  const handleLikeClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const blogId = searchParams.get("id");

    // Increment likes count
    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}/likes`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update likes count in the UI
        setBlog((prevBlog) => ({
          ...prevBlog,
          likes: data.likes,
        }));
      })
      .catch((error) => console.error("Error updating likes:", error));
  };

  return (
    <div className="wrapper">
      {loading ? ( // Show loader if loading is true
        <Loader />
      ) : (
        <>
          <h2>{blog.title}</h2>
          <img src={blog.image} alt={blog.title} />
          <div className="textbox">
            {/* Use renderHtmlContent function here */}
            {renderHtmlContent(blog.content)}
            <div className="like">
              <div className="likes likes-btn" onClick={handleLikeClick}>
                <img src="./assets/heart.png" />
                <p id="single-display">{blog.likes}</p>
              </div>
              <div className="likes comment">
                <img src="./assets/message.png" />
                <p id="comment-number">{comments.length}</p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <h1 className="comment-header">Comments</h1>
            <div className="comment-box" id="comment-box">
              {comments.map((comment, index) => (
                <div className="comment-box" key={index}>
                  <div className="comment-content">
                    <p>{comment.content}</p>
                    <p>
                      {comment.name} / {comment.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <form className="contact" onSubmit={handleSubmit}>
        <br />
        <h1>Comment</h1>
        <label htmlFor="names">Name</label>
        <input
          type="text"
          onChange={handleFormDataChange}
          className="name"
          id="names"
          name="Names"
        />
        <label htmlFor="emails">Email</label>
        <input
          onChange={handleFormDataChange}
          name="Email"
          type="email"
          className="email"
          id="emails"
          placeholder="rwemaremy21@gmail.com"
        />
        <label htmlFor="messages">Message</label>
        <textarea
          className="messages space"
          onChange={handleFormDataChange}
          id="messages"
          name="Messages"
        />
        <br />
        <button type="submit" className="send-comment">
          Send
        </button>
      </form>
    </div>
  );
}

ReactDOM.render(<Single />, document.querySelector("#comments_Add_jsx"));
