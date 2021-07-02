window.seletedText = "";
console.log("background Running!");

chrome.runtime.onMessage.addListener(receiver);

function receiver(message,sender,sendResponse){
  window.seletedText = message.text;
}