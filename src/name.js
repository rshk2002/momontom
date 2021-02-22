const greetings = document.querySelector(".greetings");
const nameForm = document.querySelector(".nameForm");
const nameInput = nameForm.querySelector("input");

let userName;


function saveUserName(){
  console.log('save')
  localStorage.setItem("userName", userName);
}

function showUserName() {
  greetings.innerHTML = `<h2>Hello, ${userName}<h2>`;
}

function submitHandler(e) {
  console.log('submit');
  e.preventDefault();
  userName = nameInput.value;
  showUserName();
  saveUserName();
  nameInput.value = "";
}

function init() {
  userName = localStorage.getItem("userName");

  if (userName) {
    showUserName();
  } else {
    nameForm.addEventListener("submit", submitHandler);
  }
}

init();
