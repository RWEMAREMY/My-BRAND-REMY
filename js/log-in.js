const login = document.querySelector("#login");
const logName = document.querySelector("#logName");
const logNameErrors = document.querySelector("#logNameErrors");
const logpassword = document.querySelector("#logpassword");
const logpasswordErrors = document.querySelector("#logpasswordErrors");

// log in
login.addEventListener("submit", (e) => {
  e.preventDefault();

  if (logName.value.trim() === "") {
    logNameErrors.innerHTML = "please enter the name!";
    return false;
  } else if (logName.value.length < 3) {
    logNameErrors.innerHTML = "name should have 3 character and over";
    return false;
  } else {
    logNameErrors.innerHTML = "";
    if (logpassword.value.trim() === "") {
      logpasswordErrors.innerHTML = "please enter the message!";
      return false;
    } else if (logpassword.value.length < 4) {
      logpasswordErrors.innerHTML =
        "your password should be atleast 4 characters and above!";
      return false;
    } else {
      // window.location.href="dashboard.html"
      logpasswordErrors.innerHTML = "";
      const inEmail = logName.value.trim();
      const firstPass = logpassword.value.trim();
      const body = { email: inEmail, password: firstPass };
      function loginUser(body) {
        // Assuming you're using fetch for API calls
        fetch("https://rwemaremy-my-brand-back-end.onrender.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
        .then(res=>res.json())
          .then((response) => {
            if (response.status) {
              // User logged in successfully
              console.log("User logged in successfully");
              alert("logged in successfully");
              const resData= response.token
             localStorage.setItem("token", resData);
            
            } else {
              // Login failed
              console.error("Login failed");
              alert("oops invalid credentials!!!");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
  window.location.href = "dashboard.html";
      loginUser(body);
    }
  }
});
function uservalid() {
  var form = document.getElementById("login");
  var email = document.getElementById("logName").value;
  var text = document.getElementById("logNameErrors");

  var pattern = /^[a-z]{3,}$/;
  if (email.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    text.innerHTML = "";
    text.style.color = "black";
  } else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    text.innerHTML = "ooops your username please";
    text.style.color = "#ff0000";
  }
}
function passwordvalid() {
  var form = document.getElementById("login");
  var email = document.getElementById("logpassword").value;
  var text = document.getElementById("logpasswordErrors");
  if (email >= 4) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    text.innerHTML = "valid";
    text.style.color = "#00ff00";
  } else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    text.innerHTML = "it should have 4 character and over";
    text.style.color = "#ff0000";
  }
}
