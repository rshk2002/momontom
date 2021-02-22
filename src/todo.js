// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const todoForm = document.querySelector(".todoForm"),
  todoInput = todoForm.querySelector("input"),
  pending = document.querySelector(".pendingList"),
  finished = document.querySelector(".finishedList");

const PENDING_LS = "PENDING",
  FINISHED_LS = "FINISHED";

let pendingList, finishedList;

function buildObj(id, text) {
  const obj = {
    id: id,
    text: text
  };
  return obj;
}

function addFinishedList(obj) {
  finishedList.push(obj);
}

function addPendingList(obj) {
  pendingList.push(obj);
}

function delPendingList(id) {
  pendingList = pendingList.filter((elem) => elem.id !== id);
}
function delFinishedList(id) {
  finishedList = finishedList.filter((elem) => elem.id !== id);
}

function findPendingObj(id) {
  const obj = pendingList.find((elem) => elem.id === id);
  return obj;
}

function findFinishedObj(id) {
  const obj = finishedList.find((elem) => elem.id === id);
  return obj;
}

function removeElement(el) {
  el.remove();
}

function handleDel(e) {
  const li = e.target.parentElement;
  const state = li.parentElement.className;
  const id = li.id;

  removeElement(li);

  if (state === "pendingList") {
    delPendingList(id);
  } else if (state === "finishedList") {
    delFinishedList(id);
  }

  saveTodos();
}

function handleFin(e) {
  console.log("fin", e.target.parentElement.id);
  const li = e.target.parentElement;
  const id = li.id;
  const obj = findPendingObj(id);

  removeElement(li);
  paintFinished(obj.id, obj.text);
  delPendingList(id);
  addFinishedList(obj);
  saveTodos();
}

function handleBack(e) {
  console.log("back", e.target.parentElement.id);
  const li = e.target.parentElement;
  const id = li.id;
  const obj = findFinishedObj(id);

  removeElement(li);
  paintPending(obj.id, obj.text);
  delFinishedList(id);
  addPendingList(obj);
  saveTodos();
}

function buildCommonElement(id, text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  li.setAttribute("id", id);
  delBtn.innerText = "❌";
  span.innerText = text;
  delBtn.addEventListener("click", handleDel);

  li.appendChild(span);
  li.appendChild(delBtn);

  pending.appendChild(li);

  return li;
}

function paintFinished(id, text) {
  const li = buildCommonElement(id, text);
  const backBtn = document.createElement("button");

  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBack);
  li.appendChild(backBtn);
  finished.appendChild(li);
}

function paintPending(id, text) {
  const li = buildCommonElement(id, text);
  const finBtn = document.createElement("button");

  finBtn.innerText = "✔️";
  finBtn.addEventListener("click", handleFin);
  li.appendChild(finBtn);
  pending.appendChild(li);
}

function saveTodos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
}

function handleSubmit(event) {
  console.log(event)
  console.log('submit')
  event.preventDefault();
  const todoText = todoInput.value;
  const newId = String(Date.now());
  todoInput.value = "";
  paintPending(newId, todoText);
  addPendingList(buildObj(newId, todoText));
  saveTodos();
}

function restoreTodos() {
  pendingList.forEach((elem) => {
    paintPending(elem.id, elem.text);
  });

  finishedList.forEach((elem) => {
    paintFinished(elem.id, elem.text);
  });
}

function loadTodos() {
  const loadedPendings = localStorage.getItem(PENDING_LS);
  const loadedFinisheds = localStorage.getItem(FINISHED_LS);
  pendingList = JSON.parse(loadedPendings) || [];
  finishedList = JSON.parse(loadedFinisheds) || [];
}

function init() {
  console.log('init')
  loadTodos();
  restoreTodos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
