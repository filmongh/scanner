import QrScanner from "./libs/qr-scanner.min.js";

QrScanner.WORKER_PATH = "./libs/qr-scanner-worker.min.js";

const getUrlParams = () => {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let id = url.searchParams.get("id");

  return id;
};

const getUrlParams1 = () => {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let store = url.searchParams.get("store");

  return store;
};

localStorage.setItem("user", getUrlParams());
localStorage.setItem("store", getUrlParams1());


let user = window.localStorage.user;

// Set a Cookie user
function setCookie(cName, cValue, expDays) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + user + "; " + expires + "; path=/";
}

// Apply setCookie
setCookie('user', user, 30);

let store =  window.localStorage.store

function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + store + "; " + expires + "; path=/";
}

// Apply setCookie
setCookie('store', store, 30);



const onResult = (result) => {
  // const resultEl = document.getElementById("result");
  const resultUrl = new URL(result);
  resultUrl.searchParams.set("id", localStorage.getItem("user"));
  resultUrl.searchParams.set("store", localStorage.getItem("store"));
  // resultEl.innerHTML = result;
  // resultEl.href = resultUrl;

 // window.open(resultUrl) - not working properly in ios
 // window.location.assign(resultUrl) 
  window.location = resultUrl

  qrScanner.stop();
};

const videoEl = document.getElementById("main_scanner");
const qrScanner = new QrScanner(videoEl, (result) => onResult(result));

const startButton = document.getElementById("btn_start");
startButton.onclick = () => {
  qrScanner.start();
};

const stopButton = document.getElementById("btn_stop");
stopButton.onclick = () => {
  qrScanner.stop();
};