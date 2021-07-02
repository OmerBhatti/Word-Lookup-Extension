const query = (selector) => {
  return document.querySelector(selector);
};
const queryAll = (selector) => {
  return document.querySelectorAll(selector);
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var bgPage = chrome.extension.getBackgroundPage();
var word = bgPage.seletedText.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

function WordData() {
    var data = JSON.parse(this.responseText);
    if (data.message) {
        query("#error").innerHTML = `No Definition found for <b>${word.capitalize()}</b>`;
    } else {
        query("#result").style.display="block";
        query("#selected").innerText = data[0].word.capitalize();
        query("#audio").src = data[0].phonetics[0].audio;
        query("#phonetic").innerText = data[0].phonetics[0].text;
        query("#meaning").innerText = data[0].meanings[0].definitions[0].definition;
        query("#type").innerText = data[0].meanings[0].partOfSpeech.capitalize();

        query("#speak").addEventListener("click",()=>{
            query("#audio").play();
        })
  }
}

if (word.length > 0) {
  var url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;
  var callAPI = new XMLHttpRequest();
  callAPI.addEventListener("load", WordData);
  callAPI.open("GET", url);
  callAPI.send();
}
