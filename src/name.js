const greetings = document.querySelector(".greetings");
const nameForm = document.querySelector(".nameForm");
const nameInput = nameForm.querySelector("input");

let userName;

function submitHandler(e) {
  e.preventDefault();
  userName = nameInput.value;
  setUserName();
}

function setUserName() {
  greetings.innerHTML = `<h2>Hello, ${userName}<h2>`;

  localStorage.setItem("userName", userName);
  nameInput.value = "";
}

function init() {
  userName = localStorage.getItem("userName");

  if (userName) {
    setUserName();
  } else {
    nameForm.addEventListener("submit", submitHandler);
  }
}

init();
