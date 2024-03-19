const { createStore, applyMiddleware } = Redux;
const { Provider, useDispatch, useSelector } = ReactRedux;
const thunk = ReduxThunk.default;

const initialState = {
  blogs: [],
};

const SET_BLOGS = "SET_BLOGS";

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(blogReducer, applyMiddleware(thunk));

const getAllPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://rwemaremy-my-brand-back-end.onrender.com/api/blogs"
      );
      dispatch({ type: SET_BLOGS, payload: res.data });
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };
};

const addThreeDotsAfterLength = (text, maxLength) => {
  if (text.length <= maxLength) {
    return { __html: text };
  }
  const truncatedText = text.substring(0, maxLength) + "...";
  return { __html: truncatedText };
};

const handleBlogClick = (e) => {
  const id = e.currentTarget.getAttribute("data-id");
  window.location.href = `./single-blog.html?id=${id}`;
};

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [hoovered, setHovered] = React.useState(false); // State to track hover

  React.useEffect(() => {
    dispatch(getAllPosts());

    // Scroll effect
    const intervalId = setInterval(() => {
      const blogsContainer = document.getElementById("blogs");
      if (blogsContainer) {
        blogsContainer.scrollLeft += window.innerWidth; // Scroll one window width
      }
    }, 80); // Scroll every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval
  }, [dispatch]);

  return (
    <div
      className="blogs"
      id="blogs"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        overflowX: "auto",
        scrollBehavior: "smooth",
        width: "90rem",
        whiteSpace: "wrap", // Prevents wrapping of blogs
      }}
    >
      {blogs.length === 0 ? (
        <div>Loading...</div>
      ) : (
        blogs.map((blog) => (
          <div
            className="blog-container"
            key={blog._id}
            data-id={blog._id}
            onClick={handleBlogClick}
            style={{ flex: "0 0 auto", marginRight: "20px" }} // Adjust spacing between blogs
          >
            <div className="blog-wrapper">
              <img src={blog.image} className="image" alt={blog.title} />
              <br />
              <h3>{blog.title}</h3>
              <p
                dangerouslySetInnerHTML={addThreeDotsAfterLength(
                  blog.content,
                  90
                )}
              />
             
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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("blogger")
);
