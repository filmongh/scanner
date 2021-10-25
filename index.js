import QrScanner from "./libs/qr-scanner.min.js";

QrScanner.WORKER_PATH = "./libs/qr-scanner-worker.min.js";

const getUrlParams = () => {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let userId = url.searchParams.get("id");

  return userId;
};

const getUrlParams1 = () => {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let storeId = url.searchParams.get("storeId");

  return storeId;
};


localStorage.setItem("userId", getUrlParams());
localStorage.setItem("storeId", getUrlParams1());

const onResult = (result) => {
  // const resultEl = document.getElementById("result");
  const resultUrl = new URL(result);
  resultUrl.searchParams.set("id", localStorage.getItem("userId"));

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