const clock = document.querySelector(".clock");
const date = clock.querySelector(".clock-date");
const time = clock.querySelector(".clock-time");

function getTime() {
  const today = new Date();
  const YEAR = today.getFullYear();
  const MONTH = today.getMonth();
  const DATE = today.getDate();
  const HOUR =
    today.getHours() < 10
      ? "0" + String(today.getHours())
      : String(today.getHours());
  const MINUTES =
    today.getMinutes() < 10
      ? "0" + String(today.getMinutes())
      : String(today.getMinutes());
  // date.innerText = String(today).split(" ").slice(0, 4).join(" ");
  date.innerText = `${YEAR}/${MONTH}/${DATE}`;
  time.innerText = `${HOUR}:${MINUTES}`;
}

function init() {
  getTime();
  setInterval(getTime, 10000);
}

init();
