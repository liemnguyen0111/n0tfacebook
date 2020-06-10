const socket = io();

document.getElementById("signin").addEventListener("submit", (event) => {
  event.preventDefault();

  signIn(event.target.username.value, event.target.password.value);
});

let signIn = async (val1, val2) => {
  axios
    .get(`/api/users/${val1}/${val2}/login`)
    .then(async ({ data }) => {
      if (!data) {
        document.getElementById("loginError").innerHTML =
          "Wrong username or password, please try again";
      } else {
        await sessionSet(data);
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
    })
    .catch((err) => console.error(err));
};

document.getElementById("signup").addEventListener("submit", (event) => {
  event.preventDefault();
  if (ValidateEmail(event.target.email.value)) {
    let newUser = {
      username: event.target.username.value,
      password: event.target.password.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      age: event.target.age.value,
      email: event.target.email.value,
      activated: 0,
    };
    axios
      .post("/api/users/register", newUser)
      .then(() => {
        socket.emit(
          "newUserSignUp",
          `User ${event.target.firstName.value} ${event.target.lastName.value} has joined NotFaceBook!`
        );
      })
      .catch((err) => console.log(err));
    document.getElementById("signupForm").innerHTML = `
    <h1>Success!</h1>
    `;
    document.getElementById("signupForm").classList.add("signupSuccess");
    setTimeout(() => {
      signIn(event.target.username.value, event.target.password.value);
    }, 2000);
  } else {
    document.getElementById("invalid").innerText = `Invalid! Please try again.`;
  }
});

document.getElementById("email").addEventListener("keyup", (event) => {
  let time;
  clearInterval(time);
  time = setTimeout(() => {
    if (
      ValidateEmail(document.getElementById("email").value) ||
      !/\S/.test(document.getElementById("email").value)
    ) {
      document.getElementById("emailError").innerHTML = ``;
    } else {
      document.getElementById("emailError").innerHTML = "Invalid email !";
    }
  }, 1000);
});

function ValidateEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

let sessionSet = async (data) => {
  var date = await new Date();
  var utcDate = await new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours() + 1);
  var usDate = await new Date(utcDate);
  document.cookie = await `name=${data}; expires = ${usDate.toUTCString()}`;
  if (data !== "undefined") {
    window.location.replace("/");
  }
};

window.addEventListener("focus", (event) => {
  sessionSet(document.cookie.split("=")[1]);
});
