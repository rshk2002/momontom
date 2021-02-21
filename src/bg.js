const body = document.querySelector("body");
const IMG_NUM = 4; //0-3

function paintImg(imgNum) {
  const img = new Image();
  console.log(img);
  img.src = `./images/${imgNum + 1}.jpg`;
  img.classList.add("bg-img");
  body.appendChild(img);
}

function generageRandom() {
  const n = Math.floor(Math.random() * IMG_NUM);
  return n;
}

function init() {
  const randomNum = generageRandom();
  paintImg(randomNum);
}

init();
