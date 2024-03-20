const rootReducer = (
  state = { blog: null, comments: [], loading: true },
  action
) => {
  switch (action.type) {
    case "SET_BLOG":
      return { ...state, blog: action.payload };
    case "SET_COMMENTS":
      return { ...state, comments: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const store = Redux.createStore(rootReducer);

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

const renderHtmlContent = (htmlContent) => {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: htmlContent },
  });
};

const Single = () => {
  const { blog, comments, loading } = ReactRedux.useSelector((state) => state);
  const dispatch = ReactRedux.useDispatch();
  const [formData, setFormData] = React.useState({
    Names: "",
    Email: "",
    Messages: "",
  });

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const blogId = searchParams.get("id");

    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_BLOG", payload: data });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((error) => console.error("Error fetching blog:", error));

    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}/comments`
    )
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_COMMENTS", payload: data }))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [dispatch]);

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const blogId = searchParams.get("id");

    const newComment = {
      name: formData.Names,
      email: formData.Email,
      content: formData.Messages,
    };

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
      .then((data) => {
        dispatch({ type: "SET_COMMENTS", payload: [...comments, data] });

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

  const handleLikeClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const blogId = searchParams.get("id");

    dispatch({ type: "INCREMENT_LIKES" });

    fetch(
      `https://rwemaremy-my-brand-back-end.onrender.com/api/blogs/${blogId}/likes`,
      {
        method: "POST",
      }
    )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error("Error updating likes:", error));
  };

  return (
    <div className="wrapper">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>{blog.title}</h2>
          <img src={blog.image} alt={blog.title} />
          <div className="textbox">
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
};

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Single />
  </ReactRedux.Provider>,
  document.querySelector("#comments_Add_jsx")
);
